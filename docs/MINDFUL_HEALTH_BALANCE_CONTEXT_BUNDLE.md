# Mindful Health Balance Context Bundle

This bundle combines the key design notes for Mindful Health Balance v1.9 and the future v2.0 direction. It is intended for AI/dev context handoff only. The source files remain the canonical modular notes.

## Table of Contents

1. [AI_READY_REFLECTION_SYSTEM_DEFINITION.md](#source-ai-ready-reflection-system-definition-md)
2. [PORTABLE_FIELD_MEMORY_DESIGN.md](#source-portable-field-memory-design-md)
3. [EXCEL_SUMMARY_REFINEMENT.md](#source-excel-summary-refinement-md)
4. [EXCEL_COLUMN_GUIDE_DESIGN.md](#source-excel-column-guide-design-md)
5. [HYDRATION_ADAPTIVE_GUIDANCE.md](#source-hydration-adaptive-guidance-md)
6. [DRINK_SWEETNESS_INSIGHT.md](#source-drink-sweetness-insight-md)
7. [MIND_STATE_WORDING_DECISION.md](#source-mind-state-wording-decision-md)
8. [MIND_NOTE_FEELING_OPTIONS.md](#source-mind-note-feeling-options-md)
9. [MIND_STATE_POSITIVE_OPTIONS.md](#source-mind-state-positive-options-md)
10. [ENERGY_CAUSE_ALIGNMENT.md](#source-energy-cause-alignment-md)
11. [REFLECTION_PRESENTATION_DECISION.md](#source-reflection-presentation-decision-md)
12. [REFLECTION_PAGE_LAYOUT_DECISION.md](#source-reflection-page-layout-decision-md)
13. [REFLECTION_GENERATION_MOMENT.md](#source-reflection-generation-moment-md)
14. [TODAY_INPUT_STEP_FLOW_DECISION.md](#source-today-input-step-flow-decision-md)
15. [INPUT_AWARE_CARD_STATE.md](#source-input-aware-card-state-md)
16. [STRUCTURED_SLEEP_RUN_DETAIL_V1_9_3.md](#source-structured-sleep-run-detail-v1-9-3-md)
17. [REFLECTION_SIGNAL_MATRIX.md](#source-reflection-signal-matrix-md)
18. [ACTIVITY_LOAD_ROOT_MATRIX.md](#source-activity-load-root-matrix-md)
19. [V1_9_STABILIZATION_CHECKLIST.md](#source-v1-9-stabilization-checklist-md)
20. [FIELD_REVIEW_COMPANION_V2.md](#source-field-review-companion-v2-md)
21. [FIELD_REVIEW_TIMEFRAME_LAYER_V2.md](#source-field-review-timeframe-layer-v2-md)
22. [NAVIGATION_ARCHITECTURE_V2.md](#source-navigation-architecture-v2-md)

---

# Source: AI_READY_REFLECTION_SYSTEM_DEFINITION.md

# AI-Ready Reflection System Definition

## 1. Short Definition

Mindful Health Balance is a local-first self-care logging app that turns daily signals into a structured, user-owned workbook for personal reflection and optional AI-assisted review.

It is not a machine learning model, medical AI, diagnosis tool, or therapy chatbot. Its current role is to help the user organize daily context so that both the user and an AI assistant can review patterns more clearly and safely.

## 2. What It Is

Mindful Health Balance is:

- a local-first self-care logging app
- an AI-readable personal rhythm workbook
- a rule-based reflection layer
- a portable field memory / personal context export
- a user-controlled data handoff layer
- a preparation layer for future guided review

The app records daily signals such as hydration, drinks, sleep, energy, activity load, recovery, mind state, and reflection text. It then exports those signals into a structured workbook that can be read by the user, reviewed in spreadsheet form, or intentionally shared with an AI assistant.

The app is designed to make daily context clearer, not to make conclusions for the user.

## 3. What It Is Not

Mindful Health Balance is not:

- a medical tool
- a diagnosis system
- a therapy service
- a machine learning model
- AGI
- an autonomous agent
- a hidden profiling system
- an automatic data upload system
- a tool that tells the user what their life means

It does not train a model, learn weights, predict health outcomes, or replace professional care.

## 4. Why It Matters For AI

AI assistants often answer from short, incomplete chat context. This can make reflection feel generic, overconfident, or disconnected from the user's real daily rhythm.

Mindful Health Balance helps create structured daily context. The exported workbook gives an AI assistant clearer evidence if the user intentionally chooses to share it.

Better context can support better reflection, but the user remains the final interpreter.

The app does not make the AI model smarter. It gives the AI cleaner, more structured, user-approved context to read from.

## 5. Current Technical Category

The current app is best described as:

- a rule-based AI-ready reflection system
- a human-in-the-loop self-care logging tool
- an AI-readable personal rhythm dataset
- a local-first portable context layer

Current reflection behavior is deterministic and rule-based. It uses the app's logged signals and helper logic to produce self-care cues, reminder wording, workbook summaries, and reflection text.

It does not train a model, learn from the user automatically, predict health outcomes, or infer a private profile.

## 6. Future Direction

Future versions may explore a guided review layer, such as:

- Field Review Companion
- NuTuenSai Log Reader
- guided multi-day review
- personal rhythm baseline support
- statistical or baseline layers before any machine learning
- Timeframe Layer for day / week / month / long-term review

This future direction should remain cautious.

Any deeper AI review should be:

- user-initiated
- non-diagnostic
- local-first where possible
- based on user-owned data
- guided rather than open-ended medical or therapy chatbot behavior
- clear about the difference between pattern signals and conclusions

Future versions may explore more personal rhythm context only if enough user-owned data and guardrails exist.

## 7. Public Boundary

Mindful Health Balance follows these boundaries:

- local-first
- user-owned data
- no auto-upload
- AI reads data only when the user chooses to share, export, or import it into an AI workflow
- pattern reflection, not judgment
- support signal, not performance score
- drink-load signal, not moral score
- descriptive context, not diagnosis
- guided reflection, not medical advice
- user agency remains central

The workbook is meant to support clearer review, not to become an authority over the user's life.

## 8. One-Sentence Public Summary

Mindful Health Balance helps people record daily self-care signals in a structured, local-first format so they can review their own patterns-and optionally let an AI assistant reflect on the data with clearer context and safer boundaries.

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

# Source: EXCEL_SUMMARY_REFINEMENT.md

# Excel Summary Refinement

## Purpose

This note records the v1.9.x refinement of the Excel `Summary` sheet.

The `Summary` sheet is generated by JavaScript during `Export Master Excel`. It is written as static workbook values through SheetJS, not as Excel formulas and not as AI analysis.

## Refined Summary Columns

The Summary sheet now separates log count from day count:

| Column | Meaning |
| --- | --- |
| `Total_Logs` | Total number of rows in `Daily_Log` included in the export. |
| `Unique_Days` | Count of unique nonblank `Date` values. If no valid dates are available, it falls back to the row count. |
| `Average_Water_ml` | Rounded average of `Water_ml` across exported log rows, including zero values. |
| `High_Load_Days` | Count of rows with high load by `Load_Score >= 6` or localized high load labels. |
| `Low_Sleep_Days` | Count of rows with a low sleep signal from `Sleep`, `Energy_Causes`, or `Activities`. |
| `Sweet_Drink_Days` | Count of rows with sweet drink load using the same helper as `Field_Review`. |
| `Most_Common_Mind` | Most frequent nonblank raw `Mind` value. |
| `Summary_Note` | Static localized guardrail note. It is not data-derived analysis. |

## Total Logs vs Unique Days

`Total_Logs` and `Unique_Days` are separated to avoid implying that row count always equals day count.

Normal app saves replace an existing row with the same date, but imported workbooks or manual data can contain duplicate dates. In that case:

- `Total_Logs` counts all rows.
- `Unique_Days` counts distinct nonblank dates.

## Low Sleep Logic

`Low_Sleep_Days` uses `rowHasLowSleepSignal(row)`.

A row counts once if any low sleep signal is present:

- `Sleep`: `น้อย`, `Low`, `低`, or `少`
- `Energy_Causes`: `sleep_low`, `นอนน้อย`, `Low sleep`, or `睡得少`
- `Activities`: low sleep activity key/label such as `lowSleep`, `นอนน้อย`, `Low sleep`, or `睡得少`

This remains descriptive. It is not diagnosis, risk prediction, or medical advice.

## Sweet Drink Logic

`Sweet_Drink_Days` reuses `rowHasSweetDrinkLoad(row)`, the same helper used by `Field_Review`.

A row counts once if sweet drink load appears through:

- `Sweet_Drinks_Count`
- `Sugar_Score`
- `Drink_Profile_JSON` with normal/high sweetness

Soda is not counted automatically. Soda only contributes when its logged sweetness creates a sweet drink load signal.

## Summary Note

`Overall_Message` has been replaced by `Summary_Note` in the Summary sheet.

`Summary_Note` is a static localized guardrail message. It reminds readers that the workbook supports pattern reflection and recovery balance, not judgment from a single day.

## Compatibility Boundary

This refinement changes only the `Summary` sheet export output.

It does not change:

- `Daily_Log` columns
- saved log structure
- localStorage keys
- import behavior
- `Reflections`
- `Field_Context`
- `Field_Review`
- app UI

## Guardrail Sentence

The Summary sheet should be useful and honest: calculated where it claims to summarize data, and clearly labeled when it contains a static guardrail note.

---

# Source: EXCEL_COLUMN_GUIDE_DESIGN.md

# Excel Column Guide Design

## Purpose

`Column_Guide` is a new workbook sheet for Mindful Health Balance v1.9.x.

It makes the Excel export easier for Thai users to read while keeping the workbook machine-readable for AI, future v2.0 parsers, and Field Review Companion.

## Core Decision

Keep canonical sheet headers unchanged.

Do not rename `Daily_Log` headers such as:

- `Water_ml`
- `Sleep`
- `Sleep_Hours`
- `Mind`
- `Load_Score`
- `Drink_Profile_JSON`
- `Run_Detail_JSON`
- `Mind_Note_Feeling`

Do not add a Thai label row below the headers in `Daily_Log`.

Instead, add a separate `Column_Guide` sheet.

## Column Guide Schema

`Column_Guide` uses these columns:

| Column | Meaning |
| --- | --- |
| `Sheet` | Workbook sheet name where the column appears. |
| `Column` | Canonical column name. |
| `Thai_Label` | Human-readable Thai label. |
| `English_Label` | Human-readable English label. |
| `Meaning` | Plain description of what the column stores. |
| `AI_Reading_Note` | Safe reading guidance for AI/dev agents. |
| `Example_Value` | Example value for orientation. |
| `Is_Canonical` | Whether the column is part of the canonical machine-readable surface. |

## Included Sheets

The guide includes key columns from:

- `Daily_Log`
- `Summary`
- `Reflections`
- `Field_Context`
- `Field_Review`

`Daily_Log` remains the primary canonical data table for import and future parser stability.

Since v1.9.3, `Column_Guide` also documents optional structured fields:

- `Sleep_Hours`: self-reported sleep duration used to derive the existing `Sleep` category gently.
- `Run_Detail_JSON`: optional running context for load, hydration, and recovery. It is not training advice, pace judgment, or performance coaching.

## Reading Principles

Column notes should use language such as:

- pattern signal
- self-care cue
- descriptive summary
- not judgment
- user-owned context
- not diagnosis

Avoid:

- medical advice
- diagnosis
- therapy claims
- financial advice
- risk prediction
- good/bad user framing

## Excel Readability

The export may add safe SheetJS worksheet metadata:

- `!cols` for column widths
- `!autofilter` for simple filtering

This does not add a dependency and does not change cell values or schema.

Avoid fragile styling in v1.9.x:

- font styling
- colors/fills
- freeze panes
- custom themes

Those are not reliable enough with the current browser-side SheetJS usage and are not needed for schema clarity.

## Compatibility Boundary

This change does not alter:

- `Daily_Log` headers
- saved log structure
- localStorage keys
- import behavior
- `Summary` column semantics
- `Reflections`
- `Field_Context`
- `Field_Review`
- app UI
- user inputs

Old exported workbooks remain importable because import reads `Daily_Log`.

New exported workbooks remain importable because `Column_Guide` is an additional sheet and import still reads `Daily_Log`.

## Future v2.0 Use

Field Review Companion can use `Column_Guide` as schema context while still reading canonical column names.

This lets v2.0 combine:

- stable parser keys
- Thai user readability
- AI-readable meaning
- non-medical / non-diagnostic guardrails

## Guardrail Sentence

`Column_Guide` should explain the workbook without changing the workbook's canonical data surface.

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

The guidance uses a "base water + activity/sweat load + body cue" model.

Approximate ranges:

- Base / rest / light recovery: 2.0-2.4 L.
- Cognitive or decision load: 2.4-2.8 L.
- Easy run, walking, light sport, or moderate sweat: 2.6-3.0 L.
- Short quality run or sport sweat intensity: 2.8-3.3 L.
- Long run / heavy sport sweat / similar endurance load: 3.2-4.0 L.

Outdoor heat or clear heat/sweat context can gently raise the sport range, while keeping the language non-forceful and capped around 4.0 L.

High-water safety wording:

- If water is already around 3.0 L on a long-run day, treat it as a good zone and invite small extra sips only if sweat remains high or urine color is dark.
- If water is already around 4.0 L or more, do not push more. Invite spreading intake through the day and observing thirst, urine color, and sweat cues.

When recovery-only signals are present, such as low sleep, low energy, scattered mind, or pressure without a clear activity load, the UI should keep the base range and use recovery wording. Low sleep alone does not mean activity load is high.

When strong activity and recovery signals both appear, the UI can keep the activity/sweat range while using a hydration-and-recovery cue.

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

# Source: MIND_NOTE_FEELING_OPTIONS.md

# Mind Note Feeling Options

## Purpose

This note records the addition of `uneasy` and `feeling_good` as Mind Note Feeling options.

Mind Note Feeling describes the feeling tone of one specific Mind Note. It is not the same as the overall mind state of the whole day.

## Added Options

- TH: `ไม่สบายใจ`
- EN: `Uneasy`
- ZH: `心里不舒服`
- Canonical value: `uneasy`

`uneasy` means the note carries something stuck, uncomfortable, unsettled, or not fully clear. It does not have to mean anxiety, pressure, fatigue, or any medical/therapy category.

- TH: `รู้สึกดี`
- EN: `Feeling good`
- ZH: `感觉不错`
- Canonical value: `feeling_good`

`feeling_good` means this specific Mind Note carries a good, lighter, or supportive feeling tone. It does not claim that the whole day was good, does not replace recovery signals, and is not a performance score.

## Option Order

Mind Note Feeling should be ordered by semantic flow:

1. `calm` / Neutral / เฉย ๆ
2. `uneasy` / Uneasy / ไม่สบายใจ
3. `worried` / Worried / กังวล
4. `pressured` / Pressured / กดดัน
5. `tired` / Tired / ล้า
6. `scattered` / Scattered / ฟุ้ง
7. `feeling_good` / Feeling good / รู้สึกดี
8. `grateful` / Grateful / ขอบคุณ

## Data Boundary

This option uses the existing Mind Note Feeling field:

- No new input section
- No new localStorage key
- No new Daily_Log column
- No Excel schema change
- No import/export behavior change

Saved rows continue to use the existing `Mind_Note_Feeling` column.

## Reflection Wording

When Mind Note Feeling is `uneasy`, NuTuenSai-style wording may gently say that the note carries uneasiness and can be placed down slowly.

When Mind Note Feeling is `feeling_good`, NuTuenSai-style wording may gently say that the note carries a good feeling as a small supportive signal, without claiming that the whole day was perfect.

Preferred tone:

- notice the feeling without diagnosing it
- treat it as a note-level feeling tone
- do not imply the user must fix it immediately
- do not use medical, therapy-heavy, guilt, or fear wording

Example:

```text
This note carries some uneasiness. The system can treat it as something to gently place down, not something that must be fixed immediately.
```

```text
This note carries a good feeling. The system can read it as a small supportive signal, not as a claim that the whole day was perfect.
```

## Guardrail Sentence

`Uneasy` should make Mind Note Feeling easier to record when something feels unsettled, without turning the note into a diagnosis, therapy interpretation, or pressure to fix the feeling right away.

`Feeling good` should let the note carry a simple positive tone without forcing the user to choose gratitude and without turning the note into a claim about the whole day.

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

- TH: `สวัสดีค่ะ วันนี้ยังไม่มีข้อมูลให้ระบบอ่านมากนัก ลองกรอก Today Input สักเล็กน้อยก่อน แล้วค่อยกลับมาทบทวนกันนะคะ`
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

# Source: TODAY_INPUT_STEP_FLOW_DECISION.md

# Today Input Step Flow Decision

Implementation status:
Implemented in v1.9.2 — Today Input Step Flow as a v1.9.x stabilization / usability patch. This is not v2.0 and does not add Field Review Companion, AI log reading, baseline modeling, schema changes, or export/import changes.

## 1. Intent

Today Input should be split into 2 steps to reduce page length and help users enter the day in a lighter rhythm.

Core flow:

- Today = input / current form
- Reflection/NuTuenSai = review + reflection + save
- Log = saved records

Important:
Today page should not contain Save Daily Log. Save Daily Log remains in Reflection/NuTuenSai.

## 2. Step Structure

### Today Input 1/2

Contains:

- Today State
- Hydration
- Drinks
- Load & Recovery

Purpose:
Collect body, energy, hydration, drink, activity, and recovery context.

Buttons:

- Secondary: เคลียร์หน้าปัจจุบัน / Clear Current Form / 清除当前表单
- Primary: ถัดไป: บันทึกภาวะใจ / Next: Mind Note / 下一步：心情记录

Reason:
Clear Current Form resets the current unsaved form, so it should live on step 1/2 where the main input starts. This lets users clear early without needing to enter the Mind Note step.

### Today Input 2/2

Contains:

- Mind Note
- Current Form summary

Purpose:
Let the user place the current mind note before reviewing or saving.

Buttons:

- Secondary: กลับไปหน้า 1/2 / Back to 1/2 / 返回 1/2
- Primary: ไป Reflection/NuTuenSai / Go to Reflection/NuTuenSai / 前往 Reflection/NuTuenSai

Important:

- Do not show เคลียร์หน้าปัจจุบัน on Today 2/2.
- Keep step 2/2 calm and focused.
- ไป Reflection/NuTuenSai is a navigation shortcut only, not a save action.

## 3. State Model

Use UI-only state:

```js
let todayInputStep = 1; // 1 | 2
```

Do not store this in Daily_Log.
Do not add it to export/import.
Do not change app data schema.

Recommended:

- Memory-only for v1.9.x implementation
- Optional future sessionStorage by date only if needed
- Do not use existing data localStorage keys for UI step state

## 4. Step Behavior

Default:

- Opening Today tab normally starts at Today Input 1/2.

If user moves to 2/2 or enters Mind Note:

- Returning to Today tab during the same day and before Save Daily Log may open Today Input 2/2.
- This helps the user continue the mind note flow.

After successful Save Daily Log:

- Reset Today Input step to 1/2.

After Clear Current Form:

- Reset Today Input step to 1/2.

After new date / date rollover:

- Reset Today Input step to 1/2.

Step 2 must always allow going back to 1/2.

Input-aware visual feedback:

- Main Today cards may show a soft blue active layer when they have current-form input.
- This active layer is visual feedback only.
- It is not a score, completion state, success state, diagnosis, or judgment.
- It must not be stored in Daily_Log, localStorage data schema, or Excel export.

## 5. Reflection/NuTuenSai Navigation

ไป Reflection/NuTuenSai should:

- switch to Reflection/NuTuenSai tab
- not save data
- not generate reflection automatically unless existing behavior already does so
- preserve current form state
- let user generate/check reflection and then Save Daily Log from the Reflection page

Reflection/NuTuenSai should also provide small secondary shortcuts in Daily Log Controls:

- กลับ Today 1/2 / Back to Today 1/2 / 返回 Today 1/2
- กลับ Mind Note 2/2 / Back to Mind Note 2/2 / 返回 Mind Note 2/2

These shortcuts are navigation only. They should switch back to the requested Today step, preserve the current form and any generated reflection preview, and must not save, clear, or generate reflection automatically. Save Daily Log remains the only primary action in Reflection/NuTuenSai.

## 6. Clear Current Form Placement

Decision:
เคลียร์หน้าปัจจุบัน belongs only on Today Input 1/2.

Reason:

- It is a reset action for the whole current unsaved form.
- It should be available early.
- It should not sit beside the Reflection shortcut on 2/2.
- It reduces risk of accidental clearing.
- It keeps Today 2/2 as a quiet transition into reflection.

If user reaches 2/2 and wants to clear:

- user can press กลับไปหน้า 1/2
- then press เคลียร์หน้าปัจจุบัน

This extra step is acceptable because clearing is a stronger/destructive action.

## 7. Guardrails

- Do not imply Mind Note is required.
- Do not imply going to Reflection saves data.
- Do not hide current form reset entirely; it remains visible on step 1/2.
- Do not place three main action buttons on one Today step.
- Do not change Daily_Log columns.
- Do not change Excel export/import.
- Do not change localStorage data schema.
- Do not create pressure to complete both steps.
- Keep wording gentle and optional.

## 8. Implementation Sketch

Possible helpers:

```js
let todayInputStep = 1;

function setTodayInputStep(step) {}
function shouldOpenTodayStepTwo() {}
function resetTodayInputStep() {}
function goToReflectionFromToday() {}
```

Possible conditions:

- `hasMindNoteInput(appState)` checks mind note text, feeling, or support need.
- after `saveToDailyLog()` call `resetTodayInputStep()`.
- after `resetCurrentForm()` call `resetTodayInputStep()`.
- when date changes, reset step.

## 9. Testing Checklist

Future implementation should test:

- default Today opens 1/2
- Next goes to 2/2
- Back returns to 1/2
- Mind Note content preserved
- switching tabs preserves form state
- returning to Today with unsaved Mind Note opens 2/2
- Save Daily Log resets step to 1/2
- Clear Current Form exists only on 1/2
- Clear Current Form resets current form and step to 1/2
- date rollover resets step to 1/2
- Reflection shortcut does not save
- Daily_Log schema unchanged
- export/import unchanged
- mobile layout
- dark/light mode
- TH/EN/ZH labels

## 10. Scope Boundary

This note is design-only.
Do not implement in this patch.
No code, UI, export, or import changes.

---

# Source: INPUT_AWARE_CARD_STATE.md

# Input-Aware Card State

## Intent

The Blue Active Card Layer is a v1.9.2 Today Input UX refinement. It gives the main Today Input cards a soft visual response when the user has entered meaningful current-form data in that card.

This layer helps the interface feel aware of the user's input without adding new fields, changing the daily flow, or turning the app into a completion/checklist system.

## Scope

Input-aware state applies to:

- Today State
- Hydration
- Drinks
- Load & Recovery
- Mind Note

Current Form summary does not need active state because it is a status/summary surface, not a primary input card.

## Active Logic

A card becomes active only when it has meaningful user input:

- Today State: energy, overall mind, sleep, or energy cause selected
- Hydration: water amount is greater than 0
- Drinks: at least one drink has been added
- Load & Recovery: at least one activity or recovery chip is selected
- Mind Note: note text, note feeling, or support need exists

Default dropdown values, placeholder text, and unsubmitted drink form values should not activate a card.

## Visual Direction

The base app remains purple/lavender/glass. The active layer uses a soft blue awareness cue:

- subtle blue border
- gentle blue shadow/glow
- light blue tint or glint
- restrained dark-mode opacity

The blue layer means "this card has current input." It does not mean success, completion, correctness, diagnosis, risk, or judgment.

## Guardrails

- Visual-only state
- Do not store active state
- Do not export active state
- Do not change Daily_Log columns
- Do not change Excel import/export
- Do not change scoring or reflection logic
- Do not use green success, red/orange warning, strong pulse, badges, or completion text
- Keep light and dark mode calm and readable

## Implementation Notes

The implementation may use a class such as `.is-input-active` and a helper such as `updateInputActiveCards()`. This helper should read existing app state and run during normal UI sync.

The state should clear naturally when the current form is reset.

---

# Source: STRUCTURED_SLEEP_RUN_DETAIL_V1_9_3.md

# v1.9.3 — Structured Sleep & Run Detail

Implementation status: implemented in v1.9.3 as a conservative schema and UI patch.

## 1. Intent

v1.9.3 aims to add more precise input only where it has high value for reflection and recovery:

- sleep
- running load

Today Input 1/2 should still have exactly 4 cards:

1. Today State
2. Hydration
3. Drinks
4. Load & Recovery

Do not add a fifth card.

Core principle:

- Add structured input inside existing cards.
- Preserve old categorical fields.
- Derive old fields from new detail when possible.
- Keep old Excel workbook import compatible.
- Keep the app light, not a heavy tracking app.

## 2. Sleep Design Decision

Current:
Sleep is categorical:

- TH: น้อย / พอใช้ / ดี
- stored/exported as `Daily_Log.Sleep`

Problem:
Users may find categories hard to choose when sleep is around 5-6.5 hours.

Decision:
Add a compact numeric sleep input inside the Today State card:

- Label TH: นอนกี่ชั่วโมง
- Input allows decimal hours, e.g. `6.5`
- Unit: ชั่วโมง
- Derived badge: ระบบอ่านเป็น: พอใช้

New optional field:

- `Sleep_Hours`

Implementation note:
`Sleep_Hours` is exported as an optional `Daily_Log` column. When valid, it derives the existing categorical `Sleep` field; when empty, the older categorical fallback still works.

Derived rule:

- `< 5` hours -> `Sleep = น้อย`
- `5 to < 7` hours -> `Sleep = พอใช้`
- `>= 7` hours -> `Sleep = ดี`

Validation:

- Allow decimal numbers.
- Suggested valid range: `0-16`.
- Reject or ignore negative, text, or extreme values gently.
- Empty value is allowed.

Fallback:

- If `Sleep_Hours` is present and valid, derive `Sleep`.
- If `Sleep_Hours` is empty, keep existing `Sleep` behavior/fallback.
- Old workbooks without `Sleep_Hours` must still import normally.

Important:
Do not remove `Sleep`.
`Sleep` remains the canonical categorical field used by current Summary and Field_Review logic.

## 3. Run Detail Design Decision

Current running chips:

- `easyRun`
- `shortQualityRun`
- `longRun`

Decision:
Add an optional mini run detail panel inside the Load & Recovery card.
Show this panel only when one of the running chips is selected.
Place the panel directly under the sports/running activity chips, before the light/recovery group, so it reads as running detail rather than recovery detail.

The panel should be compact and optional.

Suggested UI:

- Title TH: รายละเอียดการวิ่งวันนี้ (เติมถ้ามี)
- Distance: ระยะทาง (km)
- Duration: เวลา as two compact inputs: ชั่วโมง + นาที
- Sweat: เหงื่อ with low / medium / high options
- Avg pace may be derived/displayed if distance + duration are available

New optional field:

- `Run_Detail_JSON`

Implementation note:
`Run_Detail_JSON` is exported as an optional `Daily_Log` column only when a running chip is selected. The current UI preserves typed run detail in the current form if the panel is temporarily hidden, but saved/exported rows leave `Run_Detail_JSON` empty when no running activity is selected.

Suggested JSON shape:

```json
{
  "type": "longRun",
  "distanceKm": 13,
  "durationMin": 95,
  "avgPace": "7:18",
  "sweat": "high"
}
```

Notes:

- UI accepts duration as hours + minutes so users do not need to convert a run like 1:50 into 110 minutes manually.
- Storage remains `durationMin` inside `Run_Detail_JSON`; no extra duration columns are added.
- `avgPace` can be derived from distance + duration if possible.
- If not enough data exists, leave it empty.
- Keep JSON compact and stable.

Do not add in v1.9.3:

- heart rate
- cadence
- split
- training zone
- VO2max
- race prediction

Guardrail:
This app is not a running/training app.
Run detail exists only to improve:

- load context
- hydration cue
- recovery reflection
- future AI-readable context

## 4. Schema Decision

Use option A.

Add to `Daily_Log` optional columns:

- `Sleep_Hours`
- `Run_Detail_JSON`

Keep existing fields:

- `Sleep`
- `Activities`
- `Load_Score`
- `Load_Level`
- `Hydration_Status`

Reason:

- minimal schema expansion
- backward compatible
- enough detail for future v2.0 review
- avoids making Excel too wide too soon

Rejected for v1.9.3:

Option B — separate run columns + JSON
Reason: more readable but schema grows too fast.

Option C — no schema change
Reason: too little machine-readable structure for future reflection/baseline.

## 5. Excel Compatibility

Old workbook behavior:

- Workbooks without `Sleep_Hours` and `Run_Detail_JSON` must import normally.
- Missing fields should normalize to empty values.

New workbook behavior:

- Export should include `Sleep_Hours` and `Run_Detail_JSON`.
- Import should preserve those fields.
- `Sleep` should remain populated as a categorical value.

Future implementation updates needed:

- `DAILY_LOG_COLUMNS`
- `buildDailyLogRow()`
- `normalizeLogRow()`
- `exportMasterExcel()`
- `importMasterExcel()` if needed
- Log table headers if hardcoded
- Column widths
- `Column_Guide`
- docs and context bundle

Summary:

- `Low_Sleep_Days` can continue using `Sleep` for v1.9.3.
- Optional future refinement: also count `Sleep_Hours < 5`.

Field_Review:

- Can remain mostly unchanged for first implementation.
- Optional future use: read `Sleep_Hours` and `Run_Detail_JSON` for richer review.

## 6. UI Constraints

Today 1/2 must remain 4 cards only.

Sleep detail:

- stays inside Today State card
- should be compact
- should not make the card feel like a long form

Run detail:

- stays inside Load & Recovery card
- appears only when running activity is selected
- should be optional
- should not turn the app into a running app

Use gentle wording:

- เติมถ้ามี
- optional
- ระบบใช้เพื่ออ่าน load/recovery เบา ๆ

## 7. Reflection And Hydration Future Benefit

This design prepares future improvements:

- `Sleep_Hours` can make sleep/recovery reflection more precise.
- `Run_Detail_JSON` can improve hydration tier for long run, sweat, and duration.
- `shortQualityRun` can be read as intensity-based load.
- `longRun` can be read as endurance load.

Not in first implementation:

- no training advice
- no performance coaching
- no pace judgment
- no medical interpretation
- no v2.0 companion logic
- no baseline/ML

Current v1.9.3 implementation stores the structured fields first and keeps reflection/hydration behavior conservative. `Sleep_Hours < 5` may support low-sleep counting through the derived `Sleep` value and Summary helper, but `Run_Detail_JSON` is mainly preserved for future hydration/reflection refinement.

## 8. Version Decision

This belongs to:
`v1.9.3 — Structured Sleep & Run Detail`

Reason:

- structured input/schema refinement
- backward compatible
- still v1.9.x
- not v2.0
- no AI companion
- no baseline model
- no ML
- no new review dashboard

## 9. Future Implementation Plan

If approved later:

1. Update docs/design note status if needed.
2. Add optional columns to `DAILY_LOG_COLUMNS`.
3. Add `Sleep_Hours` state and compact UI.
4. Add derive helper: `deriveSleepCategory(hours)`.
5. Add `Run_Detail_JSON` state and optional run detail panel.
6. Add helper: `normalizeRunDetail()`.
7. Update save/export/import/normalize flow.
8. Update log table headers and widths.
9. Update `Column_Guide`.
10. Update README / user guides.
11. Refresh context bundle.
12. Test old workbook import with missing new fields.
13. Test new workbook export/import.

## 10. Guardrails

- Do not add a fifth Today card.
- Do not remove existing `Sleep`.
- Do not remove existing `Activities`.
- Do not break old workbook import.
- Do not make the user fill all details.
- Do not turn the app into a running app.
- Do not add medical/diagnostic wording.
- Do not add dependency.
- Do not implement in this docs-only patch.

---

# Source: REFLECTION_SIGNAL_MATRIX.md

# Reflection Signal Matrix

This matrix summarizes how Mindful Health Balance reads user signals and reflects them through NuTuenSai voice. It is a design/testing reference only. It is not a medical rule system, diagnosis model, or therapy framework.

## 1. Core Reflection Principles

- Reflect patterns, not diagnose.
- Do not assume fear unless the user selected worried/pressured or wrote it in a note.
- Low data should produce a gentle greeting or neutral reminder, not analysis.
- Positive signals are support signals, not proof the whole day is good.
- Recovery signals and activity load must be separated.
- Sweetness and caffeine are drink-load signals, not moral scores.
- Mind Note Feeling belongs to the note, not necessarily the whole day.

## 2. Single Signal Matrix

| Signal Layer | User Input / Condition | System Meaning | Preferred Reflection Tone | Avoid |
| --- | --- | --- | --- | --- |
| Hydration | water = 0 or very low | Water rhythm is not visible yet or may need a gentle base. | Invite small sips or a simple water cue. | Urgency, risk language, medical dehydration claims. |
| Hydration | water near base | Water is present enough to support the day. | Notice a usable base and steady rhythm. | Demanding more water by default. |
| Hydration | water enough | Hydration can be read as a supportive base. | Keep the rhythm; pair with load/recovery if relevant. | Treating water as proof the whole day is fine. |
| Hydration | water high but no load | Water may be more than enough for a light day. | Neutral observation; no need to chase more. | Warning language or exact medical advice. |
| Hydration | long run / heavy sweat + around 3.0 L | Water is already in a good zone for a high-sweat day, but body cues may still matter. | Good zone; add small sips only if sweat remains high, thirst persists, or urine color is dark. | Treating 3.0 L as failure or forcing 4.0 L. |
| Hydration | water >= 4.0 L | Intake is already high. | Spread through the day and observe body cues; do not force more. | Encouraging more water or medical warning language. |
| Sleep | low sleep | Recovery signal. | Recovery-first, gentle pacing. | Blame, failure, or health judgment. |
| Sleep | `Sleep_Hours < 5` | Structured sleep duration derives the existing low sleep category. | Recovery-first, still gentle and non-diagnostic. | Treating hours as medical diagnosis or failure. |
| Sleep | `Sleep_Hours 5 to < 7` | Structured sleep duration derives the existing okay sleep category. | Balanced observation; enough to orient recovery. | Overstating precision from a self-reported number. |
| Sleep | `Sleep_Hours >= 7` | Structured sleep duration derives the existing good sleep category. | Support signal; still read energy/load/mind layers. | Saying the whole day is fine because sleep hours are good. |
| Sleep | okay sleep | Some recovery base exists. | Balanced, observational tone. | Overstating sleep quality. |
| Sleep | good sleep | Recovery support signal. | Notice support while still reading other layers. | Assuming energy, mind, or load must be good. |
| Energy | low | Body/system may have lower resources. | Care and recovery cue. | Blame or productivity pressure. |
| Energy | medium | Mixed or balanced energy. | Keep observing layers. | Forcing a strong conclusion. |
| Energy | good | Energy is available today. | Use energy gently; still protect recovery. | Assuming no fatigue or no need for rest. |
| Overall Mind Today | neutral | Overall mind is not strongly burdened or positive. | Simple steady observation. | Treating neutral as ideal calm. |
| Overall Mind Today | worried | Worry is a care signal. | "A signal to care, not an order to rush." | Diagnosis, anxiety labeling, fear amplification. |
| Overall Mind Today | pressured | Pressure is present. | Reduce pressure; no need to fix everything. | Productivity praise that reinforces pressure. |
| Overall Mind Today | scattered | Attention/mind may be dispersed. | Gentle grounding and small rhythm cues. | Over-analysis or labeling the user. |
| Overall Mind Today | feeling good | Mind can support the system. | Support signal, not performance score. | Saying the whole day was good. |
| Overall Mind Today | relaxed | Mind has softened. | Supportive context; still read body/load. | Ignoring sleep, energy, or load. |
| Mind Note Feeling | neutral | The note tone is light or plain. | Let the note stay simple. | Forcing meaning. |
| Mind Note Feeling | uneasy | The note carries uneasiness or a stuck feeling. | Gently set down; no need to fix immediately. | Calling it anxiety, diagnosis, or abnormal. |
| Mind Note Feeling | worried | This note has worry. | Notice worry as care signal. | Treating worry as a command to act. |
| Mind Note Feeling | pressured | This note has pressure. | Lower pressure by one step. | Reinforcing urgency. |
| Mind Note Feeling | tired | This note carries tiredness. | Recovery and softness. | Calling it failure or weakness. |
| Mind Note Feeling | scattered | This note feels dispersed. | Small grounding cue. | Over-interpreting mental state. |
| Mind Note Feeling | feeling_good | This note has a good feeling tone. | Small support signal. | Claiming the whole day is perfect. |
| Mind Note Feeling | grateful | Gratitude is present in the note. | Support signal that can coexist with load. | Gratitude cancels fatigue. |
| Energy Cause | low sleep | Energy may be affected by sleep debt. | Recovery-first. | "You failed to sleep enough." |
| Energy Cause | enough sleep | Sleep may be supportive. | Support layer; still read energy/load. | "Sleep solved everything." |
| Energy Cause | low food | Fuel/resource signal. | Gentle resource cue. | Diet judgment. |
| Energy Cause | low water | Hydration may affect energy. | Water base cue. | Medical warning. |
| Energy Cause | heavy exercise | Physical load. | Recovery is part of training. | Push harder or drink aggressively. |
| Energy Cause | deep work | Cognitive load. | Rest eyes, reduce loops, recover focus. | Productivity praise only. |
| Energy Cause | stress | Pressure/load signal. | Lower pressure and recover. | Diagnosing stress response. |
| Energy Cause | light mind | Mind may support energy. | Layered support signal. | Ignoring body fatigue. |
| Energy Cause | unknown | Unclear cause. | Curiosity without forcing explanation. | Making up a cause. |
| Drink | no extra drink | Drink load is light. | Plain water remains a simple base. | Moral praise or purity framing. |
| Drink | high caffeine | Alertness support with possible water-base cue. | Coffee/caffeine not judged; return water as base. | "Coffee is wrong." |
| Drink | sweet drink moderate | Some sweetness load. | No guilt; next drink can be simpler. | Diet advice or sugar fear. |
| Drink | sweet drink high | Sweetness is part of drink load. | Return to water/recovery base gently. | Medical risk language. |
| Drink | soda low/no sweetness | Soda is drink context, not sweetness load. | Read sweetness field first. | Assuming all soda is sweet. |
| Drink | soda high sweetness | Soda adds sweetness load. | No judgment; next drink can return to water/rest. | Guilt or "bad drink" wording. |
| Drink | caffeine + sweetness | Alertness and sweetness signals both present. | Invite plain water back as base. | Diet/medical tone. |
| Load | rest day | Low activity load. | Preserve rhythm and recovery. | Push productivity. |
| Load | light load | The day has space. | Small steady rhythm is enough. | Over-instructing. |
| Load | medium load | Some energy use. | Balance with recovery. | Treating as high load. |
| Load | high load | Recovery can be outrun. | Recovery follows load. | Shame or "too much" judgment. |
| Load | sport / sweat | Strong activity hydration signal. | Hydration and recovery move with activity. | Aggressive water commands. |
| Load | outdoor heat | Heat/sweat context. | Small sips and pauses. | Risk/fear wording. |
| Load | deep work / cognitive load | Focus, eyes, and mental loops use energy. | Rest eyes, reduce loops, recover attention. | Treating it as only mental weakness. |
| Load | low sleep as recovery signal | Low sleep belongs in Today State > Energy Cause in the current UI; legacy imported `lowSleep` activity values remain readable. | Base hydration plus rest. | Showing low sleep as a new activity chip or calling it high activity load. |
| Load | light recovery day | Recovery mode / support signal. | Light, descriptive, not diagnostic. | Letting it override a stronger activity selected with it. |

## 2.1 Activity Load Root Matrix

Activity Load Roots refine the reflection tone behind selected activity chips. They are presentation/reflection context only and do not change Load Score, Load Level, saved activities, or export/import schema.

Activity Root Summary is the short copy layer used when the UI needs a compact sentence. It should describe how today's energy was used, not infer identity or profession.

| Activity Scenario | Root | Expected Reflection Tone | Avoid |
| --- | --- | --- | --- |
| `photoshoot` | `service_standing` | Standing, moving, carrying gear, and holding space for others; recovery includes back, legs, shoulders, and eyes. | Treating it as only exercise or only office work. |
| `marketWatch` | `market_decision` | Attention and decision pressure; short screen breaks and not carrying the market into sleep. | Financial advice, buy/sell suggestions, or market prediction. |
| `dentalFocus` / `clinicalShift` | `clinical_focus` | Sustained precision, hands, eyes, and nervous-system focus; quiet recovery deserves space. | Diagnosis, medical-risk wording, or saying clinical work is dangerous. |
| `outdoorWork` | `outdoor_heat` | Heat, sweat, and body effort; small water rounds and heat/body pauses. | Medical dehydration warning. |
| `badminton` / `heavyPingPong` / `easyRun` / `shortQualityRun` / `longRun` | `sport_sweat` | Physical effort and training load; recovery is part of training. `shortQualityRun` should read as intensity-based short running load, not easy run or long run. | Push harder, aggressive hydration commands, or prescriptive training advice. |
| running chip + `Run_Detail_JSON` | `sport_sweat` with optional structured context | Distance, duration, derived pace, and sweat can support future load/hydration/recovery reading. | Training plan, pace judgment, race prediction, or performance coaching. |
| `deepWork` / `officeWork` / `lightCodingAiAssist` | `cognitive_deepwork` | Sustained or light cognitive focus and screen attention; `lightCodingAiAssist` is score 1 and reads as context guidance, output review, and small ongoing decisions rather than full deep work by default. | Productivity praise that pushes more work, or treating AI-assisted work as empty time. |
| `longWalk` | `walking_physical` | Body use through walking/movement; give back, legs, feet, and water rhythm space. | Overstating it as high-intensity sport. |
| old workbook value `lowSleep` only | `recovery_low_sleep` | Recovery signal, not high activity load; rest before adding another round. | Showing low sleep as a new Load & Recovery chip or calling it a heavy activity day. |
| `rest` only | `rest_base` | Rest rhythm and recovery base. | Pushing productivity because the day is open. |
| `lightRecoveryDay` only | `rest_base` | Light recovery mode and support signal. | Diagnosis wording or letting it erase stronger activity load. |

| Root | Preferred Short Summary | Avoid |
| --- | --- | --- |
| `clinical_focus` | "Today used sustained precision." | "You are a doctor/dentist." |
| `service_standing` | "Today used energy through standing, moving, and holding space for others." | "You are a photographer." |
| `cognitive_deepwork` | "Today used sustained focus and screen attention." | Productivity praise that pushes more work. |
| `market_decision` | "Today used attention and decision energy." | Financial advice or market prediction. |
| `outdoor_heat` | "Today included heat, sweat, or body effort." | Medical dehydration warning. |
| `sport_sweat` | "Today used real physical effort." | Push harder / train more. |
| `walking_physical` | "Today used the body through walking or movement." | Treating it as high-intensity sport. |
| `recovery_low_sleep` | "Today is a low-sleep recovery signal." | Calling it high activity load. |
| `rest_base` | "Today is a rest/light recovery rhythm." | Pushing productivity because there is space or overriding stronger activity. |

## 3. Combination Matrix

| Scenario | Input Combination | Expected NuTuenSai Reflection | UX Risk | Guardrail |
| --- | --- | --- | --- | --- |
| Low data / almost empty input | No meaningful Today Input | Greeting / gentle prompt to add Today Input. | Assuming fear, diagnosis, or personal story. | Stay neutral; do not analyze what is not there. |
| Water low + no other signal | Low water only | Gentle sip cue; small water rhythm. | Medical fear or urgent tone. | Use self-care cue, not warning. |
| Water low + caffeine high | Low water + high caffeine | Plain water can return as base; caffeine not judged. | "Coffee is wrong." | Separate caffeine context from moral judgment. |
| Low sleep + low energy | Sleep low + energy low | Recovery-first; body resources may be low. | Blame or "you failed." | Care cue, not performance judgment. |
| Low sleep + feeling good / relaxed | Sleep low + positive mind | Mind may be support signal, while body still needs recovery. | "The whole day is fine." | Let both signals coexist. |
| Good energy + stress | Energy good + stress cause | Layered signal: energy can carry, recovery still matters. | Contradiction/error wording. | "Both can be true." |
| Low energy + enough sleep | Energy low + enough sleep cause | Enough sleep may support, but body may still need recovery. | "Sleep did not work" or "data conflict." | Read as layered signal. |
| Mind Note Feeling = uneasy | Mind Note Feeling `uneasy` | Note carries uneasiness; gently set it down. | Calling it anxiety/diagnosis. | Keep it note-level and non-medical. |
| Mind Note Feeling = feeling_good | Mind Note Feeling `feeling_good` | Good feeling is a small support signal. | Whole-day-perfect wording. | Support signal, not proof. |
| Sweet soda + caffeine | Soda + high sweetness + caffeine | Drink gave alertness/sweetness; return to water base. | Guilt, diet, or medical tone. | Drink-load signal, not moral score. |
| High load + enough water | High load + water enough | Hydration can be base; recovery follows load. Long run/heavy sweat may use a higher range, but 3.0 L can already be a good zone. | Telling user to drink more aggressively. | Pair water with recovery and body cues. |
| Rest day + positive mind | Rest/light day + feeling good/relaxed | Steady/supportive day; preserve rhythm. | Pushing productivity. | Do not turn support into pressure. |
| Scattered mind + low water | Scattered mind + low water | Small water rhythm plus gentle grounding. | Over-analysis. | Keep cue small and practical. |
| Pressured mind + deep work | Pressured + deep work/cognitive load | Reduce pressure, recover focus, no need to fix all at once. | Productivity praise reinforcing pressure. | Recovery and pressure reduction first. |
| Grateful note + high load | Grateful note + high load | Gratitude as support, still protect recovery. | Gratitude cancels fatigue. | Support and fatigue can coexist. |

## 4. Public Voice Guardrails

Avoid phrases like:

- `พี่ไม่จำเป็นต้องกลับไปกลัว`
- `go back to fear`
- `you are anxious`
- `you need to`
- `this is risky`
- `healthy/unhealthy`
- `good/bad user`
- any diagnosis or medical inference

Preferred phrases:

- `วันนี้ไม่ต้องสรุปตัวเองเร็ว...`
- `ค่อย ๆ กลับมาดูจังหวะเล็ก ๆ...`
- `เป็นสัญญาณให้ดูแล ไม่ใช่คำสั่งให้รีบแก้`
- `อ่านเป็น pattern ไม่ใช่คำตัดสิน`
- `support signal, not performance score`
- `drink-load signal, not moral score`

## 5. Minimal Test Checklist

- [ ] Generate with almost no input.
- [ ] Generate after water only.
- [ ] Generate with low sleep + low energy.
- [ ] Generate with good energy + stress.
- [ ] Generate with `feeling_good` note.
- [ ] Generate with `uneasy` note.
- [ ] Generate with soda + high sweetness.
- [ ] Generate with high load + water enough.
- [ ] Switch TH/EN/ZH and verify tone.
- [ ] Confirm no medical/guilt/fear wording appears in low-data state.

## 6. Notes For Future v2.0

This matrix can later become the basis for Field Review Companion. It may evolve into manual test cases, automated reflection snapshots, or guided review scenarios.

It should remain descriptive, not prescriptive. Even if v2.0 adds multi-day review, the system should still avoid diagnosis, medical inference, hidden scoring, and AI authority over the user's own interpretation.

Human agency must remain central: the app and NuTuenSai can help notice patterns, but the user remains the person who decides what the pattern means in real life.

---

# Source: ACTIVITY_LOAD_ROOT_MATRIX.md

# Activity Load Root Matrix

## Purpose

This note documents how selected activity chips can be read as higher-level Activity Load Roots for NuTuenSai reflection.

Activity Load Roots refine reflection wording only. They do not add inputs, change Load Score / Load Level, change localStorage keys, change Daily_Log columns, or change Excel export/import structure.

## Core Principle

Activities should help the system understand the root of today's load without labeling the user's identity.

The same Load Score can come from different roots:

- clinical precision
- standing/service work
- deep cognitive focus
- market decision loops
- heat/sweat
- sport/training
- walking/body use
- low sleep as legacy/import recovery signal and Today State > Energy Cause signal
- rest/light recovery base

Reflection should name the day context gently and avoid profession-specific medical, financial, diagnostic, or productivity advice.

## Activity-To-Root Mapping

| Activity Chip / Key | Activity Load Root | Meaning | Preferred Tone | Avoid |
| --- | --- | --- | --- | --- |
| `dentalFocus` | `clinical_focus` | Precision, hands, eyes, nervous-system focus, responsibility toward another person. | Rest hands, eyes, and nervous system quietly. | Diagnosing stress or saying clinical work is dangerous. |
| `clinicalShift` | `clinical_focus` | Clinical attention, patient-care responsibility, sustained precision. | Give quiet recovery the same space as detailed work. | Medical advice about the work itself. |
| `photoshoot` | `service_standing` | Standing, walking, carrying gear, posture, holding space for others. | Recovery can include back, legs, shoulders, and eyes. | Treating it as only exercise or only office work. |
| `officeWork` | `cognitive_deepwork` | Sustained focus, screen time, meetings, mental loops. | Rest eyes, reduce loops, return space to the brain. | Productivity praise that pushes more work. |
| `lightCodingAiAssist` | `cognitive_deepwork` | Light coding / AI-assisted work; context guidance, output review, and small ongoing decisions. Score 1, lighter than `deepWork`. | Read as light cognitive/context-guiding load, not full deep work every time. | Calling it empty time, full deep work by default, or productivity pressure. |
| `deepWork` | `cognitive_deepwork` | Deep focus, coding, screen attention, decision fatigue. | Lower mental loops and recover attention. | Treating focus fatigue as weakness. |
| `marketWatch` | `market_decision` | Attention, uncertainty, decision pressure, screen/market loop. | Short screen breaks and not carrying the market into sleep. | Financial advice, buy/sell suggestions, market prediction. |
| `outdoorWork` | `outdoor_heat` | Heat, sweat, physical effort, hydration context. | Sip water in small rounds and pause from heat/body load. | Medical dehydration warning. |
| `badminton` | `sport_sweat` | Sport, sweat, training load. | Recovery is part of training. | Push harder, train more, aggressive hydration command. |
| `heavyPingPong` | `sport_sweat` | Higher sport intensity and sweat/training load. | Recovery follows effort. | Overtraining encouragement. |
| `easyRun` | `sport_sweat` | Exercise load, even when light/moderate. | Let hydration and recovery follow activity. | Treating easy run as no load at all. |
| `shortQualityRun` | `sport_sweat` | Short quality / progression / fast-ish run where intensity matters more than distance. | Recovery follows intensity, not only distance. | Calling it a long run, pushing speed, or turning it into a training command. |
| `longRun` | `sport_sweat` | Strong endurance load and likely higher sweat context. | Recovery is part of training; hydration may sit in a higher cue-based range without forcing 4.0 L. | Aggressive water or performance commands. |
| `longWalk` | `walking_physical` | Legs, feet, back, general body use. | Give back, legs, feet, and water rhythm space. | Overstating as high-intensity sport. |
| `lowSleep` | `recovery_low_sleep` | Legacy/import recovery signal. In the current UI, low sleep belongs in Today State > Energy Cause, not Load & Recovery. | Rest before adding another round if old workbooks contain this value. | Showing it as a new activity chip or calling it high activity load. |
| `rest` | `rest_base` | Rest day / วันพัก. | Keep a rest rhythm without adding productivity pressure. | Pushing productivity because the day is open. |
| `lightRecoveryDay` | `rest_base` | Light recovery day / วันเบา / ฟื้นตัว. | Read as a light recovery mode and support signal. | Treating it as diagnosis or letting it override stronger activity. |

## Priority Rules

One day can have multiple roots.

Priority for primary reflection:

```text
outdoor_heat
-> sport_sweat
-> clinical_focus
-> market_decision
-> service_standing
-> cognitive_deepwork
-> walking_physical
-> recovery_low_sleep
-> rest_base
```

Rules:

- `recovery_low_sleep` can coexist as a recovery modifier for legacy/imported activity values, while new UI should use Energy Cause for low sleep.
- `rest_base` should not override stronger activity roots. `rest` and `lightRecoveryDay` are recovery modes, not identity or diagnosis.
- If no activity or no clear root exists, use existing fallback reflection behavior.
- Roots refine wording only; they do not change scoring or saved data.

## Expected Reflection Tone

Activity Root Summary is the short UX copy layer used when the app needs a tighter sentence in the reminder strip, Reflection preview, or compact daily feedback. It is a language modifier, not a profile inference.

The app should not say:

- "You are a doctor."
- "You are a photographer."
- "Your job caused stress."
- "Your profession is risky."

The app should say:

- "Today used sustained precision."
- "Today used energy through standing and moving."
- "Today used attention and decision energy."
- "Today used real physical effort."

| Root | Short Summary Layer | Longer Reflection Layer | Tomorrow / Recovery Focus |
| --- | --- | --- | --- |
| `clinical_focus` | "Today used sustained precision." | "Today used sustained precision, hands, eyes, and nervous-system focus." | Quiet recovery for hands, eyes, and nervous-system focus. |
| `service_standing` | "Today used energy through standing, moving, and holding space for others." | "Today may have used energy through standing, moving, carrying gear, and holding space for others." | Back, legs, shoulders, eyes, and distributed water. |
| `cognitive_deepwork` | "Today used sustained focus and screen attention." | "Today used sustained focus and screen attention." | Rest eyes, reduce mental loops, return space to the brain. |
| `market_decision` | "Today used attention and decision energy." | "Today's load may come from attention and decision pressure more than body movement." | Screen breaks and not carrying the market into sleep. |
| `outdoor_heat` | "Today included heat, sweat, or body effort." | "Today included heat, sweat, or body effort." | Small water rounds and heat/body pauses. |
| `sport_sweat` | "Today used real physical effort." | "Today used real physical effort." | Recovery is part of training. |
| `walking_physical` | "Today used the body through walking or movement." | "Today used the body through walking or movement." | Back, legs, feet, and water spread across the day. |
| `recovery_low_sleep` | "Today is a low-sleep recovery signal." | "This is a recovery signal, not a high activity-load signal." | Rest before adding another round. |
| `rest_base` | "Today is a rest/light recovery rhythm." | "Today can keep a light rhythm without adding main load." | Do not add productivity pressure or override stronger activity. |

## Longer Reflection Tone

| Root | Expected NuTuenSai Reflection | Tomorrow / Recovery Focus |
| --- | --- | --- |
| `clinical_focus` | "Today used sustained precision, hands, eyes, and nervous-system focus." | Quiet recovery for hands, eyes, and nervous-system focus. |
| `service_standing` | "Today may have used energy through standing, moving, carrying gear, and holding space for others." | Back, legs, shoulders, eyes, and distributed water. |
| `cognitive_deepwork` | "Today used sustained focus and screen attention." | Rest eyes, reduce mental loops, return space to the brain. |
| `market_decision` | "Today's load may come from attention and decision pressure more than body movement." | Screen breaks and not carrying the market into sleep. |
| `outdoor_heat` | "Today included heat, sweat, or body effort." | Small water rounds and heat/body pauses. |
| `sport_sweat` | "Today used real physical effort." | Recovery is part of training. |
| `walking_physical` | "Today used the body through walking or movement." | Back, legs, feet, and water spread across the day. |
| `recovery_low_sleep` | "This is a recovery signal, not a high activity-load signal." | Rest before adding another round. |
| `rest_base` | "Today can keep a rest/light recovery rhythm." | Do not add productivity pressure or override stronger activity. |

## Test Scenarios

| Scenario | Expected Result | Guardrail |
| --- | --- | --- |
| `photoshoot` selected | `service_standing` wording appears. | Do not call it only exercise. |
| `marketWatch` selected | `market_decision` wording appears. | No financial advice or prediction. |
| `dentalFocus` selected | `clinical_focus` wording appears. | No diagnosis or medical risk wording. |
| `clinicalShift` selected | `clinical_focus` wording appears. | No claim that clinical work is dangerous. |
| `outdoorWork` selected | `outdoor_heat` wording appears. | No dehydration warning. |
| `longRun` selected | `sport_sweat` wording appears; hydration may guide toward a higher range while treating around 3.0 L as a good zone. | No push-harder or force-more-water language. |
| `shortQualityRun` selected | Short quality run wording appears before generic `sport_sweat`. | Do not call it easy run or long run. |
| `lightCodingAiAssist` selected | Light coding / AI-assisted work wording appears before generic `cognitive_deepwork`. | Do not call it empty time or full deep work by default. |
| `deepWork` selected | `cognitive_deepwork` wording appears. | No productivity praise that pushes more. |
| old workbook value `lowSleep` only | `recovery_low_sleep` wording appears for compatibility. | Do not show low sleep as a new UI activity chip or call it high activity load. |
| `rest` only | Rest-day wording appears. | Do not push productivity. |
| `lightRecoveryDay` only | Light recovery wording appears. | Do not diagnose or over-explain. |
| `shortQualityRun` + `lightRecoveryDay` | Short quality run remains the main load; recovery mode acts as a modifier. | Do not let recovery mode erase intensity-based load. |
| No activity selected | Existing fallback behavior remains. | Do not invent a root. |

## Compatibility Boundary

Activity Load Roots must not change:

- activity chip UI
- `Activities` saved value
- `Load_Score`
- `Load_Level`
- `Daily_Log` columns
- `Field_Review` columns
- localStorage keys
- Excel export/import structure

They are a reflection wording layer only.

## Guardrail Sentence

Activity Load Roots should make reflection more context-aware without turning work, sport, recovery, or rest into diagnosis, identity labels, financial advice, medical advice, or productivity pressure.

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

# Source: FIELD_REVIEW_TIMEFRAME_LAYER_V2.md

# Field Review Timeframe Layer v2.0

## 1. Intent

Timeframe Layer is a future v2.0 concept for Field Review Companion / NuTuenSai Log Reader.

Its role is to help the companion choose how to read logs based on both:

- amount of available data
- real date coverage

The system should not always answer as if every review is "the latest 14 days". More data should not automatically produce deeper analysis, and fewer logs should not be stretched into a strong pattern.

Core idea:

- More data should not always produce deeper analysis automatically.
- The system should first determine the appropriate review timeframe.
- The app should avoid saying "14 days" if the data is actually 14 logs spread across several months.
- Use honest wording such as "14 latest logs" when needed.
- Use "days", "weeks", or "months" only when date coverage supports it.

## 2. Inputs For Timeframe Detection

Possible inputs:

- `Total_Logs`
- `Unique_Days`
- `Date_Range_Days`
- `Latest_Date`
- `Earliest_Date`
- `Logs_Per_Week` estimate
- gaps between logs
- whether dates are valid or missing

Use both row count and date range. Do not rely on row count alone.

## 3. Suggested Timeframe Modes

### insufficient_data

Use when there are 0-3 logs or not enough valid dates.

Tone:

- greeting
- gentle start
- light orientation

Avoid:

- claiming a pattern
- comparing days strongly
- producing advice that sounds certain

### daily_start

Use when there are around 4-10 logs or a short early-use period.

Tone:

- early daily rhythm
- simple self-care cue
- low-pressure reflection

Avoid:

- over-analysis
- trend claims
- strong summary language

### short_review

Use around 11-21 logs or roughly 1-3 weeks of usable data.

Tone:

- short pattern review
- gentle relationship between water, load, recovery, drinks, and mind

Wording:

- Use "ช่วง 14 บันทึกล่าสุด" / "the latest 14 logs" when row-based.
- Use "ช่วง 14 วันล่าสุด" / "the latest 14 days" only when unique dates and date range support it.

### weekly_rhythm

Use when there are several weeks of data, such as 22-45 logs or a date range around 3-6 weeks.

Tone:

- week-level rhythm
- load/recovery relationship across weeks

Focus:

- weekly load/recovery rhythm
- high-load weeks
- recovery after heavier days
- not single-day judgment

### monthly_pattern

Use when the date range is around 60-90+ days or there are enough logs across months.

Tone:

- broad monthly pattern
- trend and cluster language

Focus:

- trends
- clusters
- consistency
- recovery rhythm
- hydration rhythm
- mind pattern across time

### long_term_archive

Use when data spans several months or more.

Tone:

- gentle long-term reflection
- broad memory
- user-owned archive review

Focus:

- broad pattern memory
- seasons of load and recovery
- changes in rhythm

Avoid:

- precise diagnosis
- health prediction
- personality inference
- productivity pressure

## 4. UX Greeting Examples

### TH

insufficient_data:

```text
สวัสดีค่ะ ตอนนี้บันทึกยังมีไม่มากนัก หนูจะอ่านเป็นจุดเริ่มต้นเบา ๆ ก่อน ยังไม่สรุป pattern ใหญ่ค่ะ
```

daily_start:

```text
หนูเริ่มเห็นจังหวะรายวันบางอย่างแล้วนะคะ ยังไม่ต้องสรุปยาว แค่ค่อย ๆ ดูว่าน้ำ การพัก และ load เชื่อมกันยังไงเบา ๆ
```

short_review:

```text
สวัสดีค่ะ วันนี้หนูอ่าน log ช่วง 14 บันทึกล่าสุดแล้วนะคะ หนูจะไม่ตัดสินสุขภาพจากตัวเลขวันเดียว แต่ช่วยดู pattern เบา ๆ ได้
```

weekly_rhythm:

```text
ตอนนี้ log เริ่มพอให้ดูจังหวะรายสัปดาห์ได้แล้วนะคะ หนูจะไม่ตัดสินจากวันใดวันหนึ่ง แต่ช่วยดูว่า week ไหนใช้พลังมาก และ week ไหน recovery กลับมาดีขึ้น
```

monthly_pattern:

```text
ตอนนี้ข้อมูลเริ่มยาวพอให้ดูภาพระดับเดือนได้แล้วค่ะ หนูจะอ่านเป็นแนวโน้มกว้าง ๆ เช่น น้ำสม่ำเสมอขึ้นไหม load กระจุกช่วงไหน และ recovery กลับมาทันหรือเปล่า
```

### EN

insufficient_data:

```text
Welcome back. There is not much log data yet, so NuTuenSai will read this as a gentle starting point rather than a large pattern.
```

daily_start:

```text
NuTuenSai can start to see a few daily rhythms. No need for a long conclusion yet; we can gently notice how water, rest, and load connect.
```

short_review:

```text
Today I am reading the latest 14 logs. I will not judge health from a single number, but I can help reflect on light patterns.
```

weekly_rhythm:

```text
The logs are starting to support a weekly rhythm review. I will not judge one day alone; I can help notice which weeks used more energy and where recovery returned.
```

monthly_pattern:

```text
The data is now broad enough for a monthly-level view. I will read it as wide trends, such as hydration consistency, load clusters, and whether recovery has room to catch up.
```

## 5. Button Sets By Timeframe

### insufficient_data

- เริ่มดูข้อมูลที่มี
- ดูน้ำ
- ดูการพัก
- เพิ่มบันทึกต่อ

### short_review

- น้ำและ hydration
- sleep / recovery
- drink load
- activity load
- mind pattern
- สรุป 14 บันทึกล่าสุด

### weekly_rhythm

- ดู pattern รายสัปดาห์
- week ที่ load สูง
- recovery หลังวันหนัก
- น้ำกับคาเฟอีน
- mind rhythm

### monthly_pattern

- ภาพรวมรายเดือน
- hydration trend
- load กระจุกช่วงไหน
- recovery rhythm
- mind pattern ระยะยาว

## 6. Guardrails

- Do not diagnose.
- Do not infer health status.
- Do not overstate patterns from sparse data.
- Do not say "days" if the data is only logs.
- Do not assume missing days mean failure.
- Do not treat gaps as bad behavior.
- Do not produce productivity pressure.
- Return agency to the user.
- Use "pattern signal", not "truth".
- Use language such as "may suggest", "ดูเหมือน", and "อาจเป็นสัญญาณ".

## 7. Relation To Existing v1.9.x Workbook

This layer can use:

- `Daily_Log` as the raw source
- `Summary` for basic totals such as `Total_Logs`, `Unique_Days`, and `Average_Water_ml`
- `Field_Review` for descriptive review context
- `Column_Guide` for schema meaning and AI reading notes
- `Reflection Signal Matrix` for guardrails
- `Activity Load Root Matrix` for activity-aware language

The Timeframe Layer should sit above workbook parsing. It decides the frame of reading before choosing focus buttons or reflection wording.

## 8. Future Implementation Sketch

Pseudo helper:

```js
detectReviewTimeframe(rows)
```

Example return for 14 logs covering 14 real days:

```js
{
  mode: "short_review",
  totalLogs: 14,
  uniqueDays: 14,
  dateRangeDays: 14,
  label: "14 latest logs",
  canSayDays: true
}
```

Example return for 14 logs spread across about 90 days:

```js
{
  mode: "monthly_pattern",
  totalLogs: 14,
  uniqueDays: 14,
  dateRangeDays: 90,
  label: "14 logs across about 3 months",
  canSayDays: false
}
```

Possible detection flow:

1. Parse valid dates from `Daily_Log`.
2. Count total rows and unique dates.
3. Compute earliest date, latest date, and date range.
4. Estimate logs per week.
5. Look for large gaps.
6. Choose mode.
7. Generate honest label.
8. Build focus buttons for that mode.

## 9. Scope Boundary

This is a v2.0 roadmap note only.

Do not implement this in v1.9.x unless explicitly requested later.

Do not change:

- export/import
- app UI
- workbook schema
- log behavior
- localStorage keys
- reflection generation logic

## Guardrail Sentence

Field Review Companion should first choose an honest timeframe, then reflect patterns gently inside that frame.

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
