# Mindful Health Balance Context Bundle

This bundle combines the key design notes for Mindful Health Balance v1.9 and the future v2.0 direction. It is intended for AI/dev context handoff only. The source files remain the canonical modular notes.

## Table of Contents

1. [Source: PORTABLE_FIELD_MEMORY_DESIGN.md](#source-portable-field-memory-designmd)
2. [Source: HYDRATION_ADAPTIVE_GUIDANCE.md](#source-hydration-adaptive-guidancemd)
3. [Source: DRINK_SWEETNESS_INSIGHT.md](#source-drink-sweetness-insightmd)
4. [Source: MIND_STATE_WORDING_DECISION.md](#source-mind-state-wording-decisionmd)
5. [Source: MIND_STATE_POSITIVE_OPTIONS.md](#source-mind-state-positive-optionsmd)
6. [Source: ENERGY_CAUSE_ALIGNMENT.md](#source-energy-cause-alignmentmd)
7. [Source: REFLECTION_PRESENTATION_DECISION.md](#source-reflection-presentation-decisionmd)
8. [Source: REFLECTION_PAGE_LAYOUT_DECISION.md](#source-reflection-page-layout-decisionmd)
9. [Source: REFLECTION_GENERATION_MOMENT.md](#source-reflection-generation-momentmd)
10. [Source: V1_9_STABILIZATION_CHECKLIST.md](#source-v1-9-stabilization-checklistmd)
11. [Source: FIELD_REVIEW_COMPANION_V2.md](#source-field-review-companion-v2md)
12. [Source: NAVIGATION_ARCHITECTURE_V2.md](#source-navigation-architecture-v2md)

---

# Source: PORTABLE_FIELD_MEMORY_DESIGN.md

# Portable Field Memory Design

## Purpose

Mindful Health Balance is a local-first self-care logging interface that helps a user create an AI-readable record of daily life while keeping ownership of the data.

The app is not only a hydration tracker or a daily health dashboard. It is a bridge between lived experience and AI reflection. A user can record daily signals, export them as a structured Excel file, review the file privately, or choose to share it with an AI assistant so the assistant can better understand real patterns across body, behavior, mind, intention, load, and recovery.

The goal is to help an AI understand the user's patterns from user-owned evidence, not only from chat memory or in-the-moment self-reporting.

## Public Design Principle

Mindful Health Balance should be designed for any user who wants an AI assistant to understand them better through intentional self-logging.

The user chooses what to record, when to export, and when to share. The AI does not automatically know, access, upload, or sync the data. Data becomes meaningful only when the user intentionally brings it back into conversation or uses it for personal review.

This preserves the core relationship:

- The user owns the record.
- The user controls when the record moves.
- The user decides whether an AI may read it.
- The AI reflects patterns without becoming the authority over the user's life.

## Portable Field Memory

Portable Field Memory is a structured, user-owned record of daily life signals that can travel with the user across AI systems without requiring cloud sync or surveillance.

In Mindful Health Balance, the exported Excel workbook acts as portable field memory. Excel is useful because it is readable by both humans and AI/LLM systems, easy to store locally, easy to back up, and portable across tools. It can preserve tabular daily signals, summary context, and reflection text in a form that does not depend on a single app account, platform, or model provider.

Portable field memory should make the user's life patterns easier to review without making the user feel monitored.

## LLI Field Dataset / Personal Rhythm Dataset

The exported workbook should be understood as an LLI Field Dataset or Personal Rhythm Dataset. It is not a conventional AI training dataset made of simple input-output examples.

It records relationships across several layers:

- Body: hydration, sleep, caffeine, sugar, load.
- Behavior: activities, work, exercise, rest.
- Mind: state, worry, calm, pressure.
- Intention: support need, mind note, reflection context.
- Recovery: rest, tomorrow focus, carryover.
- Reflection: AI-generated reminder and user-facing reflection.

The value of this dataset is not that it proves a single rule such as "more water is always better" or "high load is always bad." Its value is that it can show how signals relate over time for a specific user. For example, one user may become calmer after exercise, another may need rest after cognitive load, and another may need less fear-based checking even when health numbers improve.

The dataset helps an AI assistant ask better questions and offer more grounded reflection, while still leaving interpretation and decision-making with the user.

## What The App Is Not

Mindful Health Balance is not:

- A medical diagnosis tool.
- A therapy tool.
- A health-risk prediction engine.
- A surveillance system.
- A gamified score system that pressures the user.
- A replacement for professional care.

The app should avoid presenting itself as a tool that can determine disease, predict health danger, diagnose mental state, or replace medical or psychological support. Its role is self-care reflection and pattern visibility.

## AI Reading Boundary

When an AI/LLM reads exported Mindful Health Balance data, it should treat the workbook as a self-care pattern record, not as a clinical record.

The AI should use the data for:

- Pattern reflection.
- Lifestyle and recovery relationship review.
- Gentle support.
- Descriptive trends.
- Questions that help the user notice their own rhythm.

The AI should avoid:

- Diagnostic claims.
- Fear-based language.
- Prescriptive medical advice.
- Treating numbers as moral success or failure.
- Overriding the user's lived sense of what happened.
- Suggesting that the AI knows the user better than the user knows themselves.

A good AI reading should preserve user agency. It may say, "This pattern may be worth noticing," but it should not say, "This is what is wrong with you."

## Proposed v1.9 Direction

Recommended phase name:

```text
v1.9 Portable Field Memory Foundation
```

Alternative phase name:

```text
v1.9 Field Export Readiness
```

The purpose of v1.9 should be to make the exported workbook clearer for both human review and AI-assisted reflection without adding user burden or building a full personal model yet.

Potential scope:

- Add AI-readable context to export.
- Add an optional `Field_Context` or `README_for_AI` sheet that explains the workbook purpose, boundaries, and column meanings.
- Add a lightweight `Field_Review` summary sheet for recent trends and reflection context.
- Improve Excel readability for both human and AI review.
- Keep logging lightweight.
- Keep data local-first.
- Avoid adding new required inputs.
- Avoid building a full personal model before enough data exists.

v1.9 should focus on export readiness, not automated interpretation.

Current implementation note: v1.9 adds `Field_Context` and `Field_Review` to the exported workbook while preserving the existing `Daily_Log`, `Summary`, and `Reflections` sheets. `Field_Context` explains ownership, local-first handling, AI reading boundaries, and non-medical limits. `Field_Review` provides a lightweight descriptive summary from available entries without diagnosis, medical interpretation, personal baseline modeling, or additional user input burden.

## Proposed Future Phases

### v1.9: Export Readiness / Portable Field Memory Foundation

Make the workbook easier to understand when a user reviews it or intentionally shares it with an AI assistant. Add context and lightweight summaries while keeping app behavior simple.

### v1.9.5: Optional Reflection Accuracy Feedback

Allow the user to optionally mark whether a generated reflection felt accurate, partially accurate, too soft, too strong, or not quite right. This should remain optional and should not turn reflection into a performance score.

### v2.0: Personal Field Model / User-Controlled AI Review Pack

After enough data exists, introduce a user-controlled review pack that can summarize personal baselines, recurring patterns, recovery tendencies, and reflection preferences. This should be exportable and readable by AI, but still initiated and controlled by the user.

v2.0 should not mean the app becomes an authority over the user. It should mean the user has a clearer, portable map of their own rhythm.

## Guardrails For Future Development

Future development should preserve these constraints:

- Do not auto-upload data.
- Do not add cloud sync unless explicitly designed with informed consent.
- Do not infer medical conditions.
- Do not make the user fear numbers.
- Do not add too many inputs.
- Do not make AI authority higher than user agency.
- Do not use scores as moral judgment.
- Do not imply that AI access is automatic.
- Do not make export harder to inspect by humans.
- Any new AI-readable output must explain its limits clearly.

The design should keep reflection gentle, structured, and user-owned.

## Reference Origin

This design originates from the MSxAI/NuTuenSai use case, where pnat uses Mindful Health Balance to export Excel logs and periodically bring them back to NuTuenSai for reflection.

However, the design principle is general. Any user should be able to create their own portable field memory, keep it privately, review it themselves, and decide when or how an AI may read it.

---

# Source: HYDRATION_ADAPTIVE_GUIDANCE.md

# Hydration Adaptive Guidance

## Purpose

Mindful Health Balance v1.9.x adds adaptive hydration guidance so the Hydration card can reflect that a useful water target may vary by the day's load.

This is a self-care reflection cue, not a medical prescription. The app should avoid exact requirements, fear language, diagnosis, or risk prediction.

## Principle

Hydration guidance should be:

- Flexible rather than fixed.
- Estimated rather than prescriptive.
- Derived from existing signals.
- Gentle enough to avoid pressure.
- Clear that the user should still listen to their own body.

The guidance should say, in effect: a rest day and a long-run or outdoor-heat day may not ask for the same rhythm of water.

## Signals Used

The patch uses existing data only:

- Activity chips and derived load types.
- Load score.
- Sleep state and sleep-related energy cause.
- Drink profile caffeine score.

It does not add new input fields, localStorage keys, data schema, Excel columns, canonical values, or import/export requirements.

## Target Logic

The base estimated target is 2,000 ml.

The guidance separates strong activity/load signals from recovery-only signals.

When strong activity load is present, the UI may show a soft estimated range:

- Sport intensity load: raises the range gently.
- Outdoor heat load: raises the range gently.
- Physical or standing/service load: raises the range moderately.
- Cognitive or market-decision load: raises the range lightly.
- High caffeine: keeps plain water as the base without turning caffeine into fear.

When recovery-only signals are present, such as low sleep, low energy, scattered mind, or pressure without a clear activity load, the UI should keep the base target and use recovery wording. Low sleep alone does not mean activity load is high.

When strong activity and recovery signals both appear, the UI can keep the activity range while using a hydration-and-recovery cue.

The target is display-only. It is not saved as a new canonical value and should not be treated as a medical recommendation.

## UI Placement

The Hydration card keeps the existing water amount and water-glass visual behavior. The adaptive guidance appears as a small note near the existing hydration feedback so the user sees context without extra input burden.

The water-glass progress remains based on the existing visual target to avoid changing the core interaction too sharply. The adaptive layer is expressed as guidance text.

## Reflection Boundary

NuTuenSai-style reminder and reflection wording may mention the relationship between hydration, load, sport, heat, caffeine, sleep, and recovery.

The language should avoid:

- "must drink"
- "risk"
- "danger"
- "abnormal"
- diagnostic claims
- prescriptive medical advice

Preferred language:

- "estimated range"
- "flexible target"
- "sip gradually"
- "hydration as part of recovery"
- "plain water can remain the base"

---

# Source: DRINK_SWEETNESS_INSIGHT.md

# Drink Sweetness Insight

## Purpose

This note records the v1.9.x refinement for reading drink sweetness as a gentle self-care pattern signal in Mindful Health Balance.

The change adds soda / soft drink as a Drink Type and makes Sweetness / Sugar Score more useful in NuTuenSai-style reminder and reflection wording, without adding new inputs, changing the Daily Log schema, changing localStorage keys, or changing existing Excel column names.

## Core Principle

Sweetness is a drink-load signal, not a moral score.

Soda / soft drink is a drink category, not a judgment.

The app should help the user notice how drink sweetness relates to hydration, caffeine, energy, sleep, load, and recovery without making sweet drinks feel wrong, dangerous, or shameful.

## Soda / Soft Drink

The Drink Type list includes:

- TH: `น้ำอัดลม`
- EN: `Soda / Soft drink`
- ZH: `汽水`

Soda must not be treated as automatically sweet. The system reads the existing `Sweetness` field first:

- soda + no/low sweetness = drink context, not a strong sweetness load
- soda + high sweetness = sweet drink-load signal
- soda + medium/high caffeine = sweetness and caffeine can be reflected together

This keeps zero-sugar and low-sugar soda entries truthful without adding another input.

## Reflection Behavior

NuTuenSai reminder and reflection may mention sweetness when it is relevant, especially when sweetness appears together with:

- caffeine
- low sleep
- low energy
- higher load or exercise
- soda with high sweetness

The wording should stay soft:

- plain water can return as the base
- the next drink can be simpler
- recovery and water can follow afterward
- the previous drink does not need to be judged

The wording should avoid:

- diet advice
- medical claims
- risk prediction
- guilt or fear
- saying sweet drinks are wrong
- treating Sugar Score as a health score

## Field Review Boundary

Field_Review may include descriptive drink-load summaries such as days with sweet drinks, high-sugar days, soda days, and a short drink-load observation.

These summaries are descriptive only. They are not diagnosis, nutrition advice, medical advice, health-risk prediction, or moral evaluation.

## Compatibility

This refinement must preserve:

- existing Drink Profile inputs
- existing Daily Log columns
- existing `Drink_Profile_JSON`
- existing `Sugar_Score`
- existing `Caffeine_Score`
- existing import/export compatibility
- local-first and user-owned data boundaries

No new user input is required.

## Guardrail Sentence

Drink Sweetness Insight should make sweet-drink patterns easier to notice gently, without turning soda, sugar, or caffeine into guilt, medical advice, diet advice, or a judgment of the user's day.

---

# Source: MIND_STATE_WORDING_DECISION.md

# Mind State Wording Decision

Date: 2026-05-23

This note records a display-wording decision only. It does not change canonical values, data schema, localStorage keys, Excel columns, export/import behavior, scoring, or reflection logic.

- `ใจโดยรวมวันนี้` / `Overall Mind Today` is the quick observation of the whole day.
- `ความรู้สึกของบันทึกนี้` / `Feeling of This Note` is the feeling attached to that specific Mind Note entry.
- Thai display wording uses `เฉย ๆ` instead of `นิ่ง` so calmness is not presented as an ideal state the user should force.
- English display wording uses `Neutral` instead of `Calm`.
- Chinese display wording uses `一般` instead of `平静`.
- Older display words such as `นิ่ง`, `Calm`, and `平静` remain accepted as aliases when old saved or imported values are localized.

---

# Source: MIND_STATE_POSITIVE_OPTIONS.md

# Mind State Positive Options

## Purpose

Today State should be able to record both burden signals and support signals. The mind state field is not only for neutral, worried, pressured, or scattered days. Some days the user may feel better, softer, or more relaxed, and that signal belongs in the same daily field memory.

## Added Options

- TH: `รู้สึกดี`, `ผ่อนคลาย`
- EN: `Feeling good`, `Relaxed`
- ZH: `感觉不错`, `放松`

These values use the existing `Mind` field in Daily Log and Excel export. They do not add a new input section, schema, localStorage key, or Excel column.

## Interpretation

Positive mind states are support signals, not performance scores.

`Feeling good` means the overall mind state has a more positive tone or the user can stay with the day more easily.

`Relaxed` means the mind has softened from tension or pressure.

Neither option means:

- The whole day was good.
- Load or recovery no longer matters.
- Hydration, sleep, caffeine, or energy signals should be ignored.
- The app should praise or push the user harder.

## Reflection Behavior

NuTuenSai reflection should treat positive mind state as one layer in the daily pattern. It may say that the mind is acting as a gentle support, while still preserving other signals such as high load, low sleep, hydration gaps, caffeine, or Mind Note context.

Examples:

- Positive mind with high load: the mind may be supportive, but recovery should still move with the load.
- Relaxed mind with low sleep: the mind may feel softer while the body still asks for recovery.
- Feeling good with enough sleep: the day may have a supportive base, without turning that into a pressure to add more.

## Boundary

This is a self-care reflection feature. It is not medical advice, therapy, diagnosis, or mood scoring. The user remains the authority over what the state means in their own day.

---

# Source: ENERGY_CAUSE_ALIGNMENT.md

# Energy Cause Alignment

## Purpose

Energy Cause records why a day may feel low, medium, or good. It is not only for depletion factors. It can also record support and recovery factors that help energy feel steadier.

## Cause Groups

Depletion or energy-use factors include:

- `sleep_low`
- `heavy_exercise`
- `deep_work`
- `stress`
- `low_water`
- `low_food`
- `unknown`

Support or recovery factors include:

- `enough_sleep`
- `light_mind`

## Layered Signals

Energy level and Energy Cause can appear to point in different directions. This is not invalid data.

Examples:

- Low energy with `enough_sleep` can mean rest helped, but the body still needs more recovery time.
- Good energy with `sleep_low` or `stress` can mean the user can move through the day, while still needing to return recovery later.
- Medium energy with both depletion and support factors can be a balance day.

The app should treat these cases as layered signals. Body, mind, behavior, and recovery can be true in different ways at the same time.

## Reflection Boundary

Reflection wording should:

- Preserve the user's entered data.
- Avoid implying the user made a mistake.
- Avoid terms like conflict, wrong, invalid, or inconsistent in user-facing text.
- Use gentle language such as layered signal, both can be true, and body and mind may be speaking from different layers.

No data schema, localStorage key, Excel column, canonical value, import behavior, or export behavior changes are required for this decision.

---

# Source: REFLECTION_PRESENTATION_DECISION.md

# Reflection Presentation Decision

## Purpose

Mindful Health Balance keeps detailed reflection data for storage and export, but the Reflection Generator preview should read as NuTuenSai synthesis rather than raw analysis output.

This is an alignment and presentation decision, not a schema reduction.

## Display Roles

The Reflection page has two different roles:

- NuTuenSai note: an immediate mindful reminder for the current state.
- End-of-Day Reflection preview: a concise synthesis of the day.

The preview should not repeat the NuTuenSai note word-for-word. It should help the user stay with the day, not list every detected signal.

## Preview Structure

The displayed End-of-Day Reflection should use at most four soft blocks:

- What the day seems to show.
- What may need gentle adjustment.
- Tomorrow Focus.
- Optional compact Mind Note line.

The preview should avoid raw field labels such as `Recovery Note`, `Hydration Note`, `NuTuenSai Reminder`, or internal logic names.

## Stored And Exported Detail

Detailed reflection text remains stored in the existing generated reflection field and exported through the existing Daily Log / Reflections / Excel flow.

The following data remains available for storage/export:

- Detailed End-of-Day Reflection text.
- NuTuenSai Reminder.
- Tomorrow Focus.
- Hydration and recovery insight within the detailed reflection.
- Mind Note text.
- Mind Note Feeling.
- Support Need.
- Existing Daily_Log, Summary, Reflections, Field_Context, and Field_Review sheets.

No localStorage keys, Excel columns, canonical values, or import/export compatibility are changed by this presentation layer.

## Voice Rules

Use gentle synthesis language:

- "seems"
- "may"
- "try"
- "gradually"
- "recovery"
- "hydration"
- "pattern"

Avoid:

- diagnostic claims
- medical advice
- therapy-heavy interpretation
- fear-based wording
- motivational cliche
- robotic checklists
- raw data dumps

---

# Source: REFLECTION_PAGE_LAYOUT_DECISION.md

# Reflection Page Layout Decision

## Purpose

This note records the Reflection page layout refinement for Mindful Health Balance.

The change is presentation-only. It does not change reflection generation logic, generated reflection text, saved Daily Log data, Excel export/import behavior, localStorage keys, or schema.

## Decision

The Reflection page should use a vertical layout:

```text
NuTuenSai reminder strip
-> End-of-Day Reflection Generator
-> Daily Log Controls
```

Mindful Reminder remains part of the page, but it should no longer appear as a large equal-weight card beside the Reflection Generator.

## Why

The Reflection page is the daily closure space. Its main focus should be the End-of-Day Reflection Generator.

When the Mindful Reminder appears as a large side card, it competes with the generated reflection and makes the page feel heavier than necessary. A slim horizontal strip keeps the NuTuenSai rhythm while giving the Reflection Generator the main visual weight.

## Reminder Strip

The NuTuenSai reminder should be:

- horizontal
- slim
- calm
- glassmorphism-compatible
- short
- readable in light and dark mode
- supportive rather than analytical when there is no current-day input

The strip may keep a subtle prism, light bar, or soundwave motif, but it should not dominate the page.

## Empty State

When there is no meaningful current-day input, the reminder should greet rather than analyze.

It should not imply that the system has already found a pattern.

Examples:

- TH: `สวัสดีค่ะพี่ วันนี้ยังไม่มีข้อมูลให้หนูอ่านมากนัก ลองกรอก Today Input สักเล็กน้อยก่อน แล้วค่อยกลับมาทบทวนกันนะคะ`
- EN: `Welcome back. There isn’t much for NuTuenSai to read yet today. Add a little Today Input first, then come back for a gentle reflection.`
- ZH: `欢迎回来。今天还没有太多资料可以阅读，可以先记录一点今日输入，再回来做轻柔的回顾。`

When some current-day input exists, the page may show the normal NuTuenSai reminder from the existing signal layer.

## Boundaries

This decision must not change:

- `buildReflection()`
- `buildReflectionDisplay()`
- generated reflection storage
- Save to Daily Log
- Daily_Log / Reflections / Excel export
- localStorage keys
- import/export compatibility

The refinement is about page hierarchy and empty-state wording only.

## Guardrail Sentence

The Reflection page should feel like a calm daily closure space where NuTuenSai sets the tone in a small strip and the End-of-Day Reflection remains the main focus.

---

# Source: REFLECTION_GENERATION_MOMENT.md

# Reflection Generation Moment

## Purpose

This note records the NuTuenSai Reflection Pulse / Zen Moment micro-interaction for the Reflection Generator.

The effect is a UX transition only. It is not real AI processing, not a new reflection logic layer, and not a change to stored or exported data.

## Interaction Intent

When the user asks the app to generate an End-of-Day Reflection, the UI should briefly feel like NuTuenSai is listening to the day's pattern before showing the synthesis.

The goal is to create a small moment of rhythm between input and reflection:

```text
empty centered state
-> click Reflect Today
-> centered soft listening state
-> reflection fades in
```

This makes the experience feel less like an instant text replacement and more like a gentle daily closure moment.

## Behavior

The preview has three presentation states:

- Empty: only a centered circular zen-style `Reflect` / `สรุปวันนี้` CTA, without repeated explanatory copy.
- Generating: the circular CTA becomes a disabled pulse state, with localized listening text centered below it.
- Generated: `Reflection` state label, readable reflection text below the centered label, and `Clear Reflection` as the only reset action.

During generation:

- The Reflection preview enters a temporary generating state.
- A localized message appears:
  - TH: `กำลังฟัง pattern ของวันนี้…`
  - EN: `Listening to today’s pattern…`
  - ZH: `正在倾听今天的模式…`
- A subtle blue/lavender pulse and shimmer appears inside the preview box.
- The circular CTA is disabled briefly to prevent double action.
- After a short delay, the generated reflection is revealed with a soft paragraph-by-paragraph fade.

The delay should stay short enough that the app still feels responsive.

`Clear Reflection` resets only the current preview/edit state and returns the card to the empty state. It must not clear Today Input, saved Daily Log rows, or exported/imported data.

The generated state intentionally removes `Reflect Again` / `สรุปใหม่` / `重新回顾` to reduce action clutter. A new reflection starts by clearing the preview first, then returning to the empty circular CTA.

The generated reflection should end with one NuTuenSai signature heart, `🩵`. The heart is a gentle signature, not a gamification marker, score, medical cue, or new data field. It is appended to the reflection text without adding columns or changing workbook compatibility.

The Reflection Generator UI intentionally removes repeated visible explanations such as the large End-of-Day heading, helper sentence, and empty-state description. The circular CTA carries the action in the primary UI, while detailed meaning and guardrails remain in the guides/design notes instead of being repeated inside the card.

The staged reveal is display-only. It splits the display text into short paragraphs for presentation rhythm and must not change stored reflection text, saved rows, export/import logic, or workbook schema.

## Boundaries

This micro-interaction must not change:

- reflection generation logic
- generated reflection text
- Daily Log data
- stored reflection behavior
- localStorage keys
- Daily_Log schema
- Save / Export / Import behavior
- medical, diagnostic, or therapeutic meaning

The app still uses the same deterministic in-browser reflection logic. The pulse only changes how the transition is presented.

The Zen Moment is a UX transition, not actual AI processing. It should not imply that new hidden data analysis, medical interpretation, or external AI upload is happening.

## Reduced Motion

The effect must respect `prefers-reduced-motion`.

When reduced motion is requested:

- pulse and shimmer animations should stop
- the delay should be shortened
- the reflection should still appear clearly
- the user should not lose access to the generated content
- paragraph reveal animation should stop and content should appear immediately

Empty and generating states may be centered to create a calmer reflection ritual. Generated reflection content should remain left-aligned enough to stay readable when the text is longer.

The generated state keeps a centered rhythm by placing the soft `Reflection` label above the reflection text. The text itself may remain left-aligned inside its readable block.

## Visual Direction

The visual style should remain:

- soft
- glassmorphism-compatible
- blue/lavender
- quiet
- non-flashy
- non-gamified
- different from a generic spinner
- centered around a circular/zen-style CTA instead of a rectangular command button

## Guardrail Sentence

The Reflection Generation Moment should give the user a small pause for daily closure without implying deeper AI processing, medical interpretation, or any change to the user's data.

---

# Source: V1_9_STABILIZATION_CHECKLIST.md

# V1.9 Stabilization Checklist

## Purpose

เอกสารนี้ใช้เป็น checklist ก่อนเริ่ม Mindful Health Balance v2.0 เพื่อให้แน่ใจว่า v1.9 ทำงานนิ่งพอในฐานะ local-first self-care logging app และ Portable Field Memory Foundation

## Stabilization Principle

ก่อนเพิ่ม Field Review Companion v2.0 ระบบควรพิสูจน์ก่อนว่า:

- Daily input flow ยังเบาและใช้งานได้จริง
- Reflection อ่านเนียน ไม่ซ้ำ ไม่เป็น raw data dump
- Excel export อ่านง่ายและยัง compatible
- Adaptive Hydration ไม่พูดเกินหลักฐาน
- Mind/Energy signals ไม่ถูกตีความเป็นคะแนนตัดสินผู้ใช้
- Documentation อธิบายเจตนาและ guardrails ชัด

## 1. Today Input Flow Checklist

เช็กจากการใช้งานจริง:

- [ ] Today State กรอกง่ายหรือยัง
- [ ] Energy Cause มีทั้ง depletion และ support factors
- [ ] Mind State มีทั้ง neutral / pressure / scattered / positive states
- [ ] Hydration note ไม่ยาวหรือรกเกินไป
- [ ] Load & Recovery chips ไม่เยอะจนผู้ใช้ท้อ
- [ ] Mind Note ยังเป็นพื้นที่เบา ๆ ไม่เหมือน therapy form
- [ ] ผู้ใช้ยังสามารถกรอกแบบไม่ครบทุก field ได้โดยไม่รู้สึกผิด

## 2. Hydration Guidance Checklist

เช็กว่า:

- [ ] Rest/light day ใช้ base guidance
- [ ] Strong activity เช่น long run / sport / outdoor heat ใช้ adaptive range
- [ ] Recovery-only เช่น low sleep / low energy ไม่ถูกเรียกว่า high load
- [ ] High caffeine ใช้ plain-water-base cue ไม่ดุกาแฟ
- [ ] ข้อความไม่ใช้คำว่า ต้อง / เสี่ยง / อันตราย / ผิดปกติ
- [ ] Guidance ยังเป็น self-care cue ไม่ใช่ medical advice

## 3. Reflection Presentation Checklist

เช็กว่า:

- [ ] Reflection preview เป็น synthesis ไม่ใช่ raw field dump
- [ ] ไม่ซ้ำกับ NuTuenSai note ด้านซ้าย
- [ ] preview สั้นพออ่านจริง
- [ ] detailed reflection ยังถูกเก็บใน Daily Log / Reflections / Excel
- [ ] Recovery-only day ไม่พูดเหมือน heavy load
- [ ] Strong activity day ยังสะท้อน hydration/recovery relationship ได้
- [ ] Positive mind / positive energy ไม่ถูกแปลว่าวันนั้นดีทั้งหมด
- [ ] คำแนะนำยังนุ่ม ไม่สั่ง ไม่ดุ

## 4. Excel / Portable Field Memory Checklist

เช็กว่า workbook export ยังมี:

- [ ] Daily_Log
- [ ] Summary
- [ ] Reflections
- [ ] Field_Context
- [ ] Field_Review

เช็กเพิ่ม:

- [ ] Daily_Log schema ยัง compatible
- [ ] Import old workbook ยังทำงาน
- [ ] Field_Context อธิบาย data ownership / local-first / AI boundary / non-medical note ชัด
- [ ] Field_Review เป็น descriptive summary ไม่ใช่ diagnosis
- [ ] Common_Mind_States นับ mind states ใหม่ได้
- [ ] Energy_Causes เก็บ positive causes ได้
- [ ] Workbook อ่านได้ทั้งมนุษย์และ AI/LLM

## 5. Signal Alignment Checklist

เช็กว่า:

- [ ] Energy low + enough_sleep ถูกอ่านเป็น layered signal ไม่ใช่ error
- [ ] Energy good + low_sleep ไม่ถูกสรุปว่าทุกอย่างดี
- [ ] Energy low + light_mind แยกกายกับใจได้
- [ ] Positive Mind State เช่น รู้สึกดี / ผ่อนคลาย เป็น support signal ไม่ใช่ performance score
- [ ] Contradiction ถูกอ่านเป็น layered signal ไม่ใช่ invalid data
- [ ] ระบบไม่ใช้คำว่า wrong / inconsistent / conflict ใน user-facing text

## 6. Documentation Checklist

เช็กว่า docs ยังสอดคล้องกัน:

- [ ] README.md
- [ ] USER_GUIDE_TH.md
- [ ] USER_GUIDE_EN.md
- [ ] PORTABLE_FIELD_MEMORY_DESIGN.md
- [ ] HYDRATION_ADAPTIVE_GUIDANCE.md
- [ ] REFLECTION_PRESENTATION_DECISION.md
- [ ] ENERGY_CAUSE_ALIGNMENT.md
- [ ] MIND_STATE_POSITIVE_OPTIONS.md
- [ ] DRINK_SWEETNESS_INSIGHT.md
- [ ] REFLECTION_PAGE_LAYOUT_DECISION.md
- [ ] FIELD_REVIEW_COMPANION_V2.md
- [ ] NAVIGATION_ARCHITECTURE_V2.md

Docs ควรบอกชัดว่า:

- [ ] local-first
- [ ] user-owned data
- [ ] no auto-upload
- [ ] non-medical / non-therapy
- [ ] AI reads only when user chooses to share
- [ ] v2.0 should start with guided reflection, not open-ended chatbot

## 7. Real-use Validation Questions

หลังใช้จริง 3-7 วัน ให้ถาม:

- [ ] เปิดแอปแล้วอยากกรอกไหม หรือรู้สึกเยอะเกิน
- [ ] Hydration guidance ช่วยจริงไหม หรือทำให้คิดมาก
- [ ] Reflection preview ฟังเหมือน NuTuenSai ไหม
- [ ] Excel export ดูมีประโยชน์ไหม
- [ ] Field_Review ช่วยตั้งต้นการทบทวนไหม
- [ ] มีจุดไหนที่ผู้ใช้รู้สึกถูกประเมินหรือถูกตัดสินไหม
- [ ] มี field ไหนที่ไม่เคยใช้จริงหรือทำให้ flow หนักไหม

## 8. Go / No-Go Before v2.0

### Ready for v2.0 when:

- [ ] Today input ใช้งานจริงได้ต่อเนื่อง
- [ ] Reflection ไม่ซ้ำซ้อนและไม่ robotic
- [ ] Excel export เสถียร
- [ ] Field_Review อ่านได้และช่วยตั้งต้น insight
- [ ] Docs ครบ
- [ ] No medical/fear wording
- [ ] User still feels agency

### Not ready for v2.0 if:

- [ ] Today ยังรู้สึกหนักเกิน
- [ ] Hydration guidance ทำให้ผู้ใช้กังวล
- [ ] Reflection ยังยาวหรือซ้ำ
- [ ] Export/import ยังไม่นิ่ง
- [ ] Field_Review ยังอ่านยาก
- [ ] ระบบยังตีความเกินข้อมูล
- [ ] ผู้ใช้รู้สึกว่า AI กำลังตัดสินแทน

## 9. Recommended Next Step

ให้ใช้ v1.9 จริงอย่างน้อย 3-7 วัน แล้ว export workbook หนึ่งรอบมาตรวจ:

- Daily_Log
- Field_Review
- Reflection text
- Adaptive hydration behavior
- Mind/Energy signal behavior

หลังจากนั้นค่อยตัดสินใจว่าจะ:

- polish v1.9 เพิ่ม
- หรือเริ่ม prototype Field Review Companion v2.0 แบบเล็กและ guided

## Guardrail Sentence

Mindful Health Balance should not move to v2.0 because the idea is exciting; it should move to v2.0 only when v1.9 feels stable, light, user-owned, non-medical, and genuinely useful in real daily use.

---

# Source: FIELD_REVIEW_COMPANION_V2.md

# Field Review Companion (Mindful Health Balance v2.0)

Field Review Companion คือทิศทางต่อจาก Mindful Health Balance v1.9 ที่เปลี่ยน Excel field memory ให้กลายเป็นประสบการณ์ทบทวนแบบสนทนาอย่างมีขอบเขต

เส้นทางของระบบคือ:

```text
Daily self-care logging
-> Exported Excel as Portable Field Memory
-> Field Review Companion
-> Guided NuTuenSai-style reflection
```

## Purpose

เอกสารนี้บันทึกทิศทางอนาคตของ Mindful Health Balance v2.0 เท่านั้น ยังไม่ใช่คำสั่ง implement และยังไม่เปลี่ยน code, UI, export/import logic, localStorage schema หรือ Excel workbook structure ใน v1.9

เป้าหมายของ Field Review Companion คือช่วยให้ผู้ใช้ทบทวนข้อมูลที่ตนเอง export ออกมาแล้วอย่างมีขอบเขต โดยยังรักษาหลัก local-first, user-owned data และ non-medical reflection ไว้เหมือนเดิม

## Core Idea

Mindful Health Balance v1.9 ทำให้ Excel workbook เป็น Portable Field Memory ที่ทั้งมนุษย์และ AI อ่านได้ชัดขึ้นผ่าน `Field_Context` และ `Field_Review`

Mindful Health Balance v2.0 ควรต่อยอดจากจุดนี้ด้วย Field Review Companion ซึ่งเป็น companion สำหรับอ่าน field memory ที่ผู้ใช้ตั้งใจนำเข้ามาทบทวนเอง ไม่ใช่ระบบที่แอบ sync, auto-upload หรือเฝ้าดูผู้ใช้ตลอดเวลา

Field Review Companion ควรช่วยผู้ใช้เห็นความสัมพันธ์ระหว่าง:

- Hydration
- Drinks, caffeine, sugar, and hydration support
- Load and recovery
- Energy, sleep, and Energy Cause
- Mind state and Mind Note
- Support need
- Tomorrow Focus
- NuTuenSai Reminder and Reflection text

การอ่านทั้งหมดควรเป็น descriptive pattern reflection ไม่ใช่ diagnosis, medical advice, therapy interpretation หรือ health-risk prediction

## Guided Reflection First

v2.0 ควรเริ่มจาก guided reflection ก่อน open-ended chatbot

เหตุผลคือข้อมูลใน field memory เป็นข้อมูลละเอียดเกี่ยวกับร่างกาย ใจ พลังงาน และพฤติกรรมประจำวัน ถ้าเปิดเป็น chatbot อิสระเร็วเกินไป ระบบอาจเผลอ:

- ตีความเกินข้อมูล
- สรุปเชิงแพทย์หรือจิตวิทยา
- ทำให้ผู้ใช้รู้สึกถูกประเมิน
- ทำให้ AI ดูเหมือนรู้ชีวิตผู้ใช้มากกว่าผู้ใช้เอง
- เพิ่มแรงกดดันจาก pattern ที่ยังมีข้อมูลไม่พอ

Guided reflection ควรวางคำถามและคำตอบในกรอบที่ปลอดภัยกว่า เช่น:

- ช่วงนี้มี pattern อะไรที่น่าสังเกตแบบเบา ๆ
- วันที่ load สูงมักมี hydration หรือ recovery ตามทันไหม
- วันที่ใจเป็น support signal มีอะไรช่วยพยุงระบบบ้าง
- วันที่ Energy Cause กับ Energy level ดูเป็น layered signal ควรอ่านอย่างไรโดยไม่ตัดสิน
- Tomorrow Focus ที่ซ้ำบ่อยอาจกำลังบอกว่าอะไรต้องการพื้นที่

## Companion Behavior

Field Review Companion ควรมีบุคลิกแบบ NuTuenSai-style reflection:

- อ่อนโยน
- ชัดเจน
- ไม่ดุ
- ไม่เร่งแก้เลข
- ไม่ทำให้ผู้ใช้กลัว
- ไม่ยึดตัวเลขเป็นความสำเร็จหรือล้มเหลว
- เคารพ agency ของผู้ใช้
- ชวนเห็น pattern มากกว่าสรุปแทนผู้ใช้

ตัวอย่างท่าทีที่ควรใช้:

```text
ข้อมูลช่วงนี้เหมือนชวนสังเกตว่า...
อาจมี pattern เบา ๆ ระหว่าง...
ถ้าจะทดลองปรับ แค่หนึ่งจุดเล็ก ๆ อาจพอ...
ทั้งสองสัญญาณอยู่ร่วมกันได้ ไม่จำเป็นต้องรีบตัดสินว่าวันนั้นดีหรือแย่
```

ตัวอย่างท่าทีที่ควรหลีกเลี่ยง:

```text
คุณควร...
นี่แปลว่าคุณมีภาวะ...
เสี่ยง...
ผิดปกติ...
ต้องทำให้ได้...
AI เห็นชัดว่าปัญหาของคุณคือ...
```

## User Control

Field Review Companion ต้องคงหลัก user control เป็นศูนย์กลาง:

- ผู้ใช้เลือกเองว่าจะ export workbook เมื่อไหร่
- ผู้ใช้เลือกเองว่าจะนำ workbook กลับมา review เมื่อไหร่
- ผู้ใช้เลือกเองว่าจะให้ AI อ่านข้อมูลชุดใด
- ระบบไม่ควร auto-upload หรือ auto-sync ข้อมูล
- ระบบไม่ควรสร้าง long-term profile โดยไม่อธิบายและไม่ขอ consent
- ผู้ใช้สามารถหยุด review หรือไม่ตอบคำถามต่อได้เสมอ

AI หรือ companion มีหน้าที่ช่วยสะท้อน ไม่ใช่มีอำนาจสรุปชีวิตผู้ใช้

## Possible v2.0 Review Modes

โหมดที่อาจพิจารณาในอนาคต:

- Weekly Field Review: ทบทวน 7 วันแบบ descriptive summary
- Load and Recovery Review: ดูวันที่ load สูงกับ recovery signal
- Hydration Rhythm Review: ดูน้ำ กาแฟ คาเฟอีน และ load ร่วมกัน
- Mind Support Review: ดูวันที่ mind state เป็น support factor เช่น `Feeling good` หรือ `Relaxed`
- Energy Cause Layer Review: อ่านวันที่ Energy Cause กับ Energy level ดูสวนกันแบบ layered signal
- Tomorrow Focus Review: ดู Tomorrow Focus ที่ซ้ำบ่อยโดยไม่ทำให้กลายเป็น checklist กดดัน

ทุกโหมดควรเป็น optional และควรสื่อชัดว่าเป็น reflection support เท่านั้น

## Data Boundary

v2.0 ไม่ควรเปลี่ยนหลักสำคัญของ v1.9 โดยไม่ตั้งใจ:

- ไม่เปลี่ยน `Daily_Log` casually
- ไม่เปลี่ยน `Summary`, `Reflections`, `Field_Context`, หรือ `Field_Review` โดยไม่มี compatibility plan
- ไม่เพิ่ม required input เพียงเพื่อให้ AI อ่านง่ายขึ้น
- ไม่สร้าง hidden score หรือ health-risk score
- ไม่ทำให้ workbook อ่านยากสำหรับมนุษย์
- ไม่ทำให้ Excel export กลายเป็น black-box dataset

ถ้าจะเพิ่มข้อมูลสำหรับ v2.0 ควรอธิบายว่า:

- เพิ่มเพื่อช่วยผู้ใช้ทบทวนอะไร
- ผู้ใช้เห็นข้อมูลนั้นได้อย่างไร
- AI ควรอ่านอย่างไร
- ขอบเขต non-medical คืออะไร
- backward compatibility จะรักษาอย่างไร

## Relationship To v1.9

v1.9 คือ Portable Field Memory Foundation

v2.0 ไม่ควรรีบแทนที่ v1.9 แต่ควรยืนอยู่บนรากเดิม:

- v1.9 ทำให้ข้อมูลพกพาได้
- v1.9 ทำให้ AI อ่าน boundary ได้
- v1.9 ทำให้ workbook มี context และ review summary
- v2.0 ค่อยเพิ่มประสบการณ์ review ที่มีโครง ไม่ใช่เปิด chatbot อิสระทันที

Field Review Companion จึงเป็นชั้นทบทวนหลัง export ไม่ใช่การเปลี่ยนแอป logging ให้กลายเป็นระบบวิเคราะห์สุขภาพอัตโนมัติ

## Future Implementation Notes

เมื่อถึงเวลาทำจริง ควรเริ่มจาก prototype ที่เล็กและตรวจสอบง่าย:

- อ่าน workbook ที่ผู้ใช้เลือกเอง
- แสดง summary แบบ descriptive เท่านั้น
- มี guided prompts จำนวนจำกัด
- มี non-medical reminder ในหน้า review
- ใช้ภาษาที่ไม่ตัดสิน
- ไม่บันทึกอะไรเพิ่มโดยไม่ให้ผู้ใช้รู้
- ไม่เปิด open-ended chatbot ก่อน guardrails ชัด

Open-ended chatbot อาจเป็น phase หลังจาก guided review ทำงานนิ่งแล้ว และต้องยังยึดหลัก user-owned, local-first, non-medical, and user-agency-first เหมือนเดิม

## Guardrail Sentence

Field Review Companion should help the user review their own field memory with more clarity and gentleness, without turning the app or AI into a medical authority, therapist, surveillance system, or judge of the user's life.

---

# Source: NAVIGATION_ARCHITECTURE_V2.md

# Navigation Architecture (Mindful Health Balance v2.0)

## Purpose

เอกสารนี้บันทึกทิศทาง navigation architecture สำหรับ Mindful Health Balance v2.0 เพื่อรองรับ Field Review Companion ในอนาคต

นี่เป็น design note เท่านั้น ยังไม่ใช่คำสั่ง implement และยังไม่เปลี่ยน code, UI, export/import logic, localStorage schema หรือ Excel workbook structure ของ v1.9

## Current State

Mindful Health Balance v1.9 มี navigation หลัก 3 tab:

```text
Today | Reflection/NuTuenSai | Log
```

บทบาทปัจจุบันคือ:

- `Today`: กรอกข้อมูลวันนี้ เช่น Energy, Mind, Sleep, Hydration, Drink Profile, Load & Recovery และ Mind Note
- `Reflection/NuTuenSai`: ดู mindful reminder, generate/review/edit End-of-Day Reflection และ Save to Daily Log
- `Log`: ดู Daily Log, Export Master Excel, Import Master Excel และ Clear Daily Log

โครงนี้เหมาะกับ v1.9 เพราะระบบยังวนอยู่กับ daily logging และ daily closure เป็นหลัก

## v2.0 Context

Mindful Health Balance v2.0 จะมี Field Review Companion เป็นชั้นใหม่สำหรับอ่าน Daily Log หรือ Excel field memory แล้วช่วยผู้ใช้ทบทวน pattern หลายวันแบบ guided NuTuenSai-style reflection

Field Review Companion ไม่ใช่ daily input และไม่ใช่ end-of-day reflection ของวันเดียว แต่เป็น multi-day review experience ที่ควรมีพื้นที่ของตัวเอง

## Core Decision

ไม่ควรเอา `Reflection` ไปซ้อนเต็ม ๆ ใน `Today`

เหตุผลคือ `Today`, `Reflection`, และ `Field Review` มีจังหวะการใช้งานต่างกัน:

- `Today` = current-day input / ระหว่างวัน
- `Reflection` = daily closure / end-of-day synthesis
- `Field Review` = multi-day guided review / pattern conversation

ถ้าฝัง Reflection Generator เต็ม ๆ ไว้ใน Today หน้า Today จะหนักขึ้น สับสนขึ้น และทำให้ผู้ใช้รู้สึกว่าการกรอกข้อมูลวันนี้กับการปิดวันเป็นงานเดียวกัน ทั้งที่เป็นคนละจังหวะทางใจ

Today อาจมี CTA เล็ก ๆ เพื่อพาผู้ใช้ไปต่อ เช่น:

```text
Go to Reflection
ไปทบทวนวันนี้
ปิดวันนี้ด้วย Reflection
```

แต่ CTA ควรเป็นทางผ่าน ไม่ใช่การย้าย Reflection Generator ทั้งชุดเข้ามาอยู่ใน Today

## Recommended Navigation Structure

โครง navigation ที่แนะนำสำหรับ v2.0:

```text
Today | Reflection | Log | Field Review
```

ชื่อ tab ควรแยกบทบาทให้ชัด:

- `Today`: current-day input
- `Reflection`: daily closure / end-of-day synthesis
- `Log`: data ownership / daily log / export-import
- `Field Review`: multi-day guided review / NuTuenSai-style companion

## Page Roles

### Today

Today ควรเป็นพื้นที่สำหรับกรอกและสังเกตวันนี้เท่านั้น:

- Today State
- Hydration
- Drink Profile
- Load & Recovery
- Mind Note
- Reset Current Form
- small CTA ไป Reflection เมื่อผู้ใช้พร้อมปิดวัน

Today ไม่ควรกลายเป็นหน้า report, หน้า export หรือหน้า multi-day review

### Reflection

Reflection ควรเป็นพื้นที่สำหรับปิดวัน:

- Mindful Reminder / NuTuenSai note
- End-of-Day Reflection preview
- Light edit สำหรับ stored reflection
- Save to Daily Log
- Daily closure language ที่ช่วยให้ผู้ใช้วางวันลง ไม่ใช่เริ่มวิเคราะห์หลายวัน

Reflection อ่านข้อมูลของวันปัจจุบันเป็นหลัก ไม่ควรกลายเป็น Field Review หลายวัน

### Log

Log ควรเป็นพื้นที่ data ownership:

- Daily Log Table
- Export Master Excel
- Import Master Excel
- Clear Daily Log
- backup / portability controls

Log คือที่ที่ผู้ใช้เห็นว่า data เป็นของตัวเอง อยู่ local-first และย้ายออกเป็น workbook ได้

Log ไม่ควรกลายเป็น conversation panel หลัก เพราะบทบาทของ Log คือการจัดการข้อมูล ไม่ใช่การตีความข้อมูล

### Field Review

Field Review ควรเป็นพื้นที่ใหม่สำหรับ multi-day guided review:

- อ่าน pattern จาก Daily Log หรือ exported field memory
- สรุปเบา ๆ จากข้อมูลหลายวัน
- ให้ผู้ใช้เลือก focus จาก pattern ที่มีจริง
- ถามนำแบบ NuTuenSai-style
- สะท้อนสั้น ๆ พร้อม next gentle action

Field Review ควรมี flow แบบ:

```text
เห็น pattern
-> ให้เลือก focus
-> ถามนำหนึ่งชั้น
-> สะท้อนสั้น
-> ชวนเลือกต่อหรือพอสำหรับวันนี้
```

Field Review ไม่ควรเริ่มจาก open-ended chatbot และไม่ควรสรุปยาวแบบ report ก่อนถามผู้ใช้

## Navigation Relationship

หน้าแต่ละหน้าควรเชื่อมกันแบบเบา ๆ:

- Today อาจมี CTA ไป Reflection
- Reflection หลัง save อาจมี CTA ไป Log
- Log อาจมี CTA ไป Field Review เมื่อมีข้อมูลมากพอ
- Field Review อาจมี CTA กลับ Log หรือกลับ Today

แต่ไม่ควรทำให้ทุกหน้ากลืนกันจนบทบาทหาย

ตัวอย่าง relationship:

```text
Today -> Reflection -> Log -> Field Review
  ^          |          |          |
  |          v          v          v
  +------ return to current day / data / review focus
```

## Field Review Entry Conditions

Field Review ควรเปิดประสบการณ์เมื่อมีข้อมูลพอสมควร เช่น:

- มี Daily Log อย่างน้อย 3 วัน
- หรือ import/exported workbook มี `Daily_Log`
- หรือมี `Field_Review` summary ให้ใช้เป็น starting point

ถ้าข้อมูลยังน้อย ควรแสดงข้อความเบา ๆ เช่น:

```text
ข้อมูลยังน้อยอยู่ ตอนนี้ใช้ Field Review เป็นจุดเริ่มต้นเบา ๆ ได้ แต่ยังไม่ควรรีบสรุป pattern
```

## UX Guardrails

Navigation v2.0 ควรรักษา guardrails เหล่านี้:

- ไม่ทำให้ Today หนักเกินไป
- ไม่ทำให้ Reflection กลายเป็น report หลายวัน
- ไม่ทำให้ Log กลายเป็น AI interpretation page
- ไม่ทำให้ Field Review กลายเป็น medical chatbot
- ไม่เปิด open-ended chat ก่อน guided reflection ชัดเจน
- ไม่ใช้ wording ที่ทำให้ผู้ใช้รู้สึกถูกประเมิน
- ไม่ทำให้ export/import logic ถูกซ่อนหรือดูเป็นเรื่องรอง

## Why Four Tabs

การเพิ่ม `Field Review` เป็น tab ที่สี่ช่วยให้ระบบเติบโตโดยไม่ทำให้ mental model เดิมพัง:

- ผู้ใช้ยังรู้ว่า Today คือที่กรอกวันนี้
- ผู้ใช้ยังรู้ว่า Reflection คือที่ปิดวัน
- ผู้ใช้ยังรู้ว่า Log คือที่จัดการข้อมูล
- ผู้ใช้มีที่ใหม่สำหรับคุยกับ pattern หลายวัน

นี่ทำให้ Field Review Companion เป็นชั้นทบทวนที่ตั้งใจเปิดเอง ไม่ใช่สิ่งที่แทรกเข้าไปตลอดวัน

## Future Implementation Notes

เมื่อถึงเวลาทำจริง ควรเริ่มแบบ conservative:

- เพิ่ม tab ใหม่โดยไม่ย้าย logic เดิมทันที
- คง Today / Reflection / Log behavior เดิม
- ให้ Field Review อ่านจาก Daily Log ที่มีอยู่ก่อน
- ใช้ `Field_Review` เป็น summary seed ถ้ามี workbook/import context ในอนาคต
- ใช้ guided focus buttons แทน free-form chat ใน phase แรก
- มี empty state สำหรับวันที่ข้อมูลยังไม่พอ

การเปลี่ยน navigation ควรทำให้ระบบชัดขึ้น ไม่ใช่ทำให้ทุกอย่างอยู่หน้าเดียวจนผู้ใช้ต้องคิดเองว่าตอนนี้กำลังกรอกวัน ปิดวัน จัดการข้อมูล หรือทบทวนหลายวัน

## Guardrail Sentence

Mindful Health Balance v2.0 should separate current-day input, daily closure, data ownership, and multi-day guided review into distinct navigation roles so Field Review Companion can grow without making Today heavy, Reflection confusing, or Log less user-owned.
