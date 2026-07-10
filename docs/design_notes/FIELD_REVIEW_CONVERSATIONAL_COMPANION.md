# Field Review Conversational Companion

Status: UX/design note only

## 1. Purpose

Field Review Conversational Companion คือ guided conversation layer สำหรับอ่าน `Daily_Log` อย่างอ่อนโยนใน Field Review ของ MHB โดยมีคำถาม ทางเลือก และคำตอบที่ถูกกำหนดไว้ล่วงหน้า

ชั้นนี้ต่อยอดจาก Guided Field Rooms ที่มีอยู่แล้ว ไม่ได้เปลี่ยน Field Review ให้เป็น open-ended chat ประสบการณ์ที่ตั้งใจคือให้ผู้ใช้เลือก “มุมที่อยากอ่าน” ของข้อมูลตนเองได้ทีละจุด แล้วหยุดได้ทันทีเมื่อพอ

หลักสำคัญ:

- deterministic และ source-bound จาก `Daily_Log` ในช่วงเวลาที่เลือก
- local-first และ user-led
- NuTuenSai ชวนดูข้อมูล ไม่สรุปชีวิตแทนผู้ใช้
- choice cards อยู่ติดกับคำถามหรือคำตอบที่มันต่อยอด ไม่ลอยแยกเป็น filter ทั่วไป
- ทุกจุดที่ชวนอ่านต่อมีทางออก `พอแล้ว / จบบทสนทนา`

## 2. Non-goals / Boundary

Conversational Companion ต้องไม่เป็น:

- chatbot เปิดอิสระหรือช่องถามตอบ free-form
- LLM conversation หรือระบบสร้างคำตอบจากข้อความนอก source-bound rules
- medical advice, diagnosis หรือ therapy assessment
- productivity score, spiritual score หรือการจัดอันดับชีวิต
- ระบบสั่งให้ผู้ใช้ทำตามหรือแทนการตัดสินใจของผู้ใช้
- causal engine ที่สรุปว่า signal หนึ่งเป็นสาเหตุของอีก signal หนึ่ง
- funnel ที่ทำให้ผู้ใช้รู้สึกว่าต้องอ่านจนจบทุกทาง

ผู้ใช้เลือกมุม เลือกหยุด และเลือกความหมายสุดท้ายเอง NuTuenSai มีหน้าที่จัดโครงของการสังเกต ไม่ใช่เป็นผู้รู้หรือผู้ตัดสิน

## 3. Interaction Model

### Primary flow

```text
NuTuenSai Question Card
  -> Choice Cards attached to the question
  -> Deterministic Answer Card
  -> Next Choice Cards attached below that answer
  -> Exit Choice at every choice group
  -> NuTuenSai Closing Note
```

### Component roles

| Component | Role | Placement rule |
|---|---|---|
| Question Card | ถามหนึ่งคำถามที่มีขอบเขตตาม active room | เริ่มต้นของแต่ละ step |
| Choice Cards | ให้ผู้ใช้เลือก perspective ที่ระบบรองรับ | ติดใต้คำถามนั้นโดยตรง |
| Answer Card | แสดง evidence และ deterministic NuTuenSai reading | ต่อจาก choice ที่เลือก |
| Next Choice Cards | ชวนเลือกมุมถัดไป เช่น หลักฐานหรือสิ่งที่อยากสังเกตต่อ | ติดใต้ Answer Card เดียวกัน |
| Exit Choice | ทางเลือกหยุดอย่างชัดเจน | อยู่ในทุก choice group |
| Closing Note | ปิดการอ่านแบบไม่มี guilt | แทน next choices เมื่อ user exit |

Initial choices may sit between question and answer because they answer that specific question. Once an answer is visible, any continuation choices belong directly beneath that answer. Neither set should be moved to a distant toolbar, sidebar-only filter, or generic control area.

### Conversation rhythm

1. User enters a room or selects a Signal Engine row.
2. NuTuenSai asks one predefined room-aware question.
3. User chooses one locked perspective.
4. Runtime selects a matching authored answer from the already available evidence.
5. User may choose one next perspective, open a related room, or end.
6. Exit ends the local conversation state; it does not erase the selected timeframe, active room, or source data.

The conversation is a short branching reader, not an infinite chat transcript.

## 4. Conversation State

Future runtime may hold a small explicit UI state object. This is design-only and does not prescribe storage yet.

```js
{
  activeRoom: "hydration", // hydration | recovery | load | drinks | mind_note | missing | signal_engine
  activeQuestion: "hydration_opening",
  selectedPerspective: "overview",
  conversationStep: 1,
  isConversationEnded: false,
  closingNoteShown: false
}
```

State principles:

- `activeRoom` remains distinct from the selected Field Review timeframe.
- `selectedPerspective` is a UI choice, not a new user fact or a score.
- `conversationStep` is bounded by the authored branch map; it is not a token/chat history counter.
- `isConversationEnded` suppresses further continuation prompts for that local conversation only.
- `closingNoteShown` prevents duplicate closings after exit or repeated render.
- no free-text prompt, hidden model state, or autonomous follow-up is introduced.

## 5. Choice Types

The following choice types form the initial reusable vocabulary. A room may expose only the choices it can answer honestly from its available evidence.

| Choice key | Thai-first label | Meaning |
|---|---|---|
| `overview` | ภาพรวม | deterministic summary of the selected room/window |
| `evidence` | หลักฐานจากข้อมูล | evidence lines, dates, counts, or saved fields that support the reading |
| `next_observation` | รอบถัดไปลองสังเกต | bounded self-observation wording, never an order or diagnosis |
| `all_available` | ดูทั้งหมด | a compact ordered set of available room perspectives, not a data dump |
| `related_room` | เปิดห้องที่เกี่ยวข้อง | navigates to another existing room; does not create a new analysis |
| `exit` | พอแล้ว / จบบทสนทนา | stops the local conversation and shows closing note |

Room-specific choices can be more concrete, but must map back to an authored perspective and must never omit `exit`.

## 6. Exit / Closing Rule

When the user selects `พอแล้ว / จบบทสนทนา`:

1. Set `isConversationEnded` for the local branch.
2. Stop rendering continuation suggestions or implied tasks.
3. Show one short NuTuenSai Closing Note.
4. Keep the active room and selected timeframe visible so the user may return later by choice.
5. Do not say the user has missed data, left work unfinished, or failed to complete review.

Suggested Thai closing note:

> พอแค่นี้ก่อนก็ได้ค่ะพี่ วันนี้เราไม่ได้ต้องสรุปทุกอย่าง แค่เห็นจังหวะหนึ่งของร่างกายและใจให้ชัดขึ้นก็พอแล้ว 🩵

Closing copy should be localized for EN/ZH with the same meaning: it is okay to stop; no conclusion is required.

## 7. Room-specific Conversation Examples

Examples below are authored interaction shapes. They are not runtime copy requirements and must only render claims supported by selected `Daily_Log` rows.

### Hydration

**Question Card**

> พี่อยากให้หนูอ่านจังหวะน้ำจากมุมไหนคะ

**Choice Cards**

- ภาพรวม
- หลักฐานจากข้อมูล
- รอบถัดไปลองสังเกต
- ดูทั้งหมด
- พอแล้ว

**Answer behavior**

- Overview: water pattern in the selected timeframe, with load/drink context only when recorded.
- Evidence: visible dates/counts/recorded water values, never a hydration diagnosis.
- Next observation: language such as “อาจลองสังเกต” and “ค่อย ๆ กลับฐาน” without command wording.
- Next choices remain attached under the answer, including exit.

### Recovery

**Question Card**

> พี่อยากให้หนูอ่านการพักจากมุมไหนคะ

**Choice Cards**

- ภาพรวม
- วันที่บาง
- ดูคู่กับภาระของวัน
- รอบถัดไปลองสังเกต
- พอแล้ว

**Answer behavior**

- “วันที่บาง” means recorded sleep/recovery evidence is limited or lower in the selected data; it is not a sleep disorder statement.
- Load and caffeine may be contextual evidence only, never proof that they caused sleep change.
- Exit remains visible whether data is plentiful or thin.

### Load

**Question Card**

> พี่อยากให้หนูอ่านภาระของช่วงนี้จากมุมไหนคะ

**Choice Cards**

- ภาพรวม
- วันที่ load สูง
- ดูคู่กับการพัก
- เปิดห้องน้ำ
- พอแล้ว

**Answer behavior**

- Load is read as activity/body-use/work context, not productivity or performance judgment.
- Related-room choice only changes active room and carries the same timeframe; it does not declare a relationship or instruction.

### Signal Engine

Signal Engine remains a pair-level evidence reader, not a Field Room that invents conversation meaning. Its question card may offer:

- ความหมายที่อ่านได้
- หลักฐาน `r` และ paired days
- รอบถัดไปลองสังเกต
- ดูคู่สัญญาณอื่น
- พอแล้ว

The answer must preserve visible `r`, paired-day count, raw audit line, correlation boundary, and the existing Meaning Voice Matrix. `exit` closes only the conversational layer, not the selected relationship detail.

## 8. Wording Rules

### Allowed wording

- “พี่อยากให้หนูอ่านจากมุมไหนคะ”
- “ถ้าพี่อยากดูต่อ”
- “รอบถัดไปอาจลองสังเกต”
- “พอแค่นี้ก่อนได้”
- “ข้อมูลยังบาง หนูจะอ่านเบา ๆ นะคะ”
- “อ่านร่วมกับบริบทของวัน”
- “ยังไม่ควรสรุปเกินข้อมูล”

### Forbidden wording in UI output

- “ต้อง”
- “ควรทำทันที”
- “ผิดปกติ”
- “แย่”
- “ขาดวินัย”
- “สาเหตุคือ”
- “ระบบแนะนำให้”
- “สรุปว่าพี่เป็น...”
- medical, diagnostic, causal, or score/ranking claims

The source-bound answer may be concise. Warmth should come from clarity, permission to stop, and respect for uncertainty, not from adding speculative text.

## 9. Implementation Plan

### C0 — Docs-only design note

Current patch. Lock the interaction model, state boundary, exit rule, and wording before runtime changes.

### C1 — Static conversation copy map for one room

Start with Hydration only. Create a deterministic map of question keys, perspectives, answer builders, and exit copy without changing other rooms.

### C2 — Render context-attached choice cards

Render initial choice cards directly under a Question Card and continuation choices directly beneath its Answer Card. Preserve existing guided room behavior while introducing only the new branch surface.

### C3 — Exit and closing-note state

Add bounded `isConversationEnded` / `closingNoteShown` behavior. Verify every choice group can exit and no answer path loops indefinitely.

### C4 — Expand deliberately

Add Recovery, Load, Drinks, Mind Note, Missing Data, then Signal Engine only after each map proves its source/evidence boundary.

### C5 — Regression QA

Run Field Review, Guided Rooms, Signal Engine, timeframe, language, mobile, and source-bound wording checks before expansion or refactor.

## 10. QA Checklist

- Field Review loads with no runtime error.
- Hydration room conversation starts from a bounded Question Card.
- Choice cards appear adjacent to the question or answer they continue.
- Selecting a choice updates only the authored answer for that perspective.
- Next choices appear under the answer and include exit.
- Exit works from every choice group.
- Closing Note appears once and continuation suggestions stop.
- No infinite loop, hidden follow-up, or requirement to read every branch.
- No LLM, free-form chatbot, medical/causal overclaim, diagnosis, or scoring behavior.
- Signal Engine still loads with `r`, paired days, audit line, and boundary intact.
- Timeframe selector still works and choices read only the selected window.
- TH/EN/ZH smoke test if any runtime copy is added.
- Mobile layout keeps choices close to their context and keeps exit reachable.

## Scope Lock

This document does not change `script.js`, `index.html`, `js/config/*`, CSS, schema, export/import, Field Review runtime, or Signal Engine runtime. It introduces no feature, runtime JSON, or persistent conversation history.
