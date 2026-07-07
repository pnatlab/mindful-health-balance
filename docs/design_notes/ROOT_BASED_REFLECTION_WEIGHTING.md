# Root-Based Reflection Weighting

Patch type: MHB Reflection Roadmap - design note and test matrix only  
Status: Reference for future implementation. No runtime behavior is changed by this note.

## Purpose

Mindful Health Balance v2.0 now has Daily_Log, Field Review, Guided Field Rooms, Signal Engine, Pearson correlation review, the Meaning Voice Matrix, Gentle Next Observation, and boundary-aware wording. The next Reflection evolution should make NuTuenSai more selective about what it reflects.

NuTuenSai reflection should not respond to every available data point equally. It should choose, or receive, a reflection root first, then read the day through that root while treating other signals as supporting or background context.

Thai policy sentence:

> NuTuenSai ไม่ใช่ตัวสรุปข้อมูลทุกช่อง แต่เป็นตัวช่วยจัดน้ำหนักความสนใจตามแกนสังเกตของวัน

Working names:

- Root-Based Reflection Composer
- NuTuenSai Attention Weighting Layer

This is not a scoring system. It is an internal attention policy for future Reflection composition.

## Core Principles

1. Choose or receive a reflection root before composing.
2. Prioritize signals related to that root.
3. Treat other signals as supporting or background context.
4. Avoid over-answering unrelated fields.
5. Preserve human agency and boundary-aware meaning.
6. Keep Reflection source-bound and conservative.
7. Do not convert attention weights into user-visible scores.

## Root Types

Initial root types:

| Root | Meaning |
| --- | --- |
| `hydration` | Read the day mainly through water intake and hydration support context. |
| `sleep_recovery` | Read the day mainly through sleep, rest, and recovery signals. |
| `load_activity` | Read the day mainly through activity, work, body-use, and load. |
| `drinks_caffeine_sweetness` | Read the day mainly through drink context, caffeine, and sweetness. |
| `mind_state` | Read the day mainly through user-owned mind note and emotional context. |
| `practice_context` | Read the day mainly through practice as self-care context. |
| `auto` | Future root selection policy. Auto is not a request to summarize everything. |

## Weight Categories

These weights are conceptual internal guidance only. They must not be shown to users.

| Category | Conceptual weight | Runtime meaning |
| --- | ---: | --- |
| Primary | 1.0 | Signals that define the root and deserve most attention. |
| Supporting | 0.6 | Signals that help explain the root gently without becoming the main topic. |
| Background | 0.3 | Context that can be mentioned only if it clarifies the reflection. |
| Low-weight / usually silent | 0.1 | Signals that should usually remain silent unless directly relevant. |

Policy:

- Do not display these weights in the UI.
- Do not call them scores.
- Do not rank the user or the day by these weights.
- Do not treat primary signals as causes of supporting signals.

## Root Matrices

### Hydration Root

Primary:

- `Water_ml`
- `Hydration_Support_Count`
- `Drink_Type` or drink context if available

Supporting:

- `Load_Score`
- `Caffeine_Score`
- Activity context
- Outdoor, heat, run, or body-use context if available

Background:

- `Sleep_Hours`
- `Energy`
- `Mind_State`

Low-weight / usually silent:

- `Practice_Minutes`, unless directly relevant to the user's note

Reflection direction:

Read the day through water as the main root, then use activity, work, caffeine, and body-use context as the scene around that root. Avoid saying that load caused water intake or that water intake determines health.

### Sleep / Recovery Root

Primary:

- `Sleep_Hours`
- Recovery signal, if available
- Low sleep markers, if any

Supporting:

- `Caffeine_Score`
- `Sugar_Score`
- `Load_Score`
- `Energy`

Background:

- `Water_ml`
- `Mind_State`
- `Practice_Minutes`

Low-weight / usually silent:

- Unrelated drink detail unless caffeine or sweetness is relevant

Reflection direction:

Read the day through rest and recovery first. Caffeine, sweetness, load, and energy can support the reading, but the reflection must avoid sleep disorder language, risk prediction, or medical advice.

### Load / Activity Root

Primary:

- `Load_Score`
- Activity context
- `Run_Detail_JSON`, if available

Supporting:

- `Water_ml`
- `Sleep_Hours`
- `Caffeine_Score`
- `Energy`

Background:

- `Mind_State`
- `Practice_Minutes`

Low-weight / usually silent:

- Detailed drink or practice context unless it directly clarifies the load story

Reflection direction:

Read the day through activity, work, or body-use load. Supporting signals should help ask whether care and recovery had enough room, not judge productivity or performance.

### Drinks / Caffeine / Sweetness Root

Primary:

- `Caffeine_Score`
- `Sugar_Score`
- `Drink_Type`
- `Sweet_Drinks_Count`, if available

Supporting:

- `Sleep_Hours`
- `Load_Score`
- `Energy`
- `Water_ml`

Background:

- `Mind_State`
- `Practice_Minutes`

Low-weight / usually silent:

- Unrelated practice or mind context unless the user explicitly connects it

Reflection direction:

Read drink context as a body/day context, not calories, caffeine milligrams, expenses, or moral judgment. Supporting signals can help notice whether drinks are appearing around low sleep, high load, or energy swings.

### Mind State Root

Primary:

- `Mind_State`
- `Mind_Note`
- `Mind_Note_Support`
- Feeling options, if available

Supporting:

- `Sleep_Hours`
- `Load_Score`
- `Practice_Minutes`
- `Energy`

Background:

- `Water_ml`
- `Caffeine_Score`
- `Sugar_Score`

Low-weight / usually silent:

- Detailed numeric drink or hydration data unless the user notes a direct connection

Reflection direction:

Mind Note is user-owned context. NuTuenSai may reflect what the user recorded, but must not summarize the user's mind for them, infer personality, diagnose mental health, or make therapy-like assessments.

### Practice Context Root

Primary:

- `Practice_Minutes`
- `Practice_Note`
- `Practice_Context`

Supporting:

- `Mind_State`
- `Sleep_Hours`
- `Load_Score`

Background:

- `Water_ml`
- `Caffeine_Score`
- `Energy`

Low-weight / usually silent:

- Drink or activity detail unless directly relevant

Reflection direction:

Practice is self-care context, not a spiritual score. NuTuenSai must not say practice was good or bad, successful or failed, enough or not enough. It can notice how practice appears beside the day's mind, rest, and load.

### Auto Root

Auto root should not mean "summarize everything."

Future auto policy may choose one root based on:

- strongest data gap
- strongest supportive signal
- repeated pattern
- user-selected focus, if available
- latest meaningful input
- explicitly recorded note emphasis

This note does not implement auto selection. It only defines the future policy that auto must still pick a primary attention root and avoid treating every field equally.

## Reflection Output Policy

Future root-aware Reflection output should use this structure:

1. Root declaration
   - Example: `วันนี้หนูขออ่านผ่านแกน “น้ำ” เป็นหลักนะคะ`
2. Primary reading
   - Reflect the root signal first.
3. Supporting context
   - Use one to three related signals as context, not as causes.
4. Boundary
   - No diagnosis, no medical advice, no overclaiming beyond the log.
5. Gentle next observation
   - Offer a soft observation prompt only when the data supports it.

## Anti-Patterns

Do not:

- answer every field equally
- turn Reflection into a data dump
- show internal weights as numbers in the UI
- make weight look like a score
- claim the root signal caused the supporting signals
- diagnose physical or mental health
- give medical advice
- make a spiritual score
- make a productivity score
- judge the day as good or bad
- use command language such as `ต้องทำ`, `must`, or `ควรต้อง`
- let an LLM guess the root without source-bound context
- let auto mode become an excuse to over-answer unrelated fields

Allowed language:

- `อ่านผ่านแกน...`
- `เป็นบริบทประกอบ`
- `ลองสังเกตต่อ`
- `ยังไม่ใช่ข้อสรุป`
- `อ่านร่วมกับบริบทของวัน`
- `ข้อมูลที่พี่บันทึกไว้`

Forbidden language:

- `ทำให้`
- `เป็นสาเหตุ`
- `รักษา`
- `แก้`
- `ต้อง`
- `must`
- `diagnosis`
- `risk prediction`
- `productivity score`
- `spiritual score`

## Relationship to Signal Engine

Signal Engine and Root-Based Reflection are related, but they operate at different levels.

| Layer | Signal Engine | Root-Based Reflection |
| --- | --- | --- |
| Unit of meaning | Pair-level relationship | Day-level or reflection-level attention |
| Shape | A ↔ B | Root signal + supporting context |
| Evidence | Pearson `r`, paired `n`, numeric-to-numeric only | Daily_Log fields and selected reflection root |
| Main question | Which signals move together? | Which signal should NuTuenSai attend to first? |
| Output style | Evidence-first meaning detail | Root-first reflection composition |
| Calculation | Pearson correlation | No new correlation required |

Shared policy:

- source-bound
- boundary-aware
- no diagnosis
- no causation claim
- no medical advice
- no performance or spiritual scoring

Signal Engine may later suggest a Reflection root, but only as navigation or user choice. For example, a Sleep ↔ Caffeine relationship could offer `sleep_recovery` or `drinks_caffeine_sweetness` as possible Reflection roots. It must not force the root or call it an AI recommendation.

## Future Implementation Slices

### Slice A - Docs / Test Matrix Only

Current patch. Create this design note and matrix. No runtime behavior changes.

### Slice B - Internal Root Matrix Helper

Add deterministic helper data such as:

- `REFLECTION_ROOT_MATRIX`
- `getReflectionRootSignalWeights(root)`
- `getSignalsForReflectionRoot(root)`

No UI change and no Reflection output change yet.

### Slice C - Manual Root Picker in Reflection

Add user-facing root choices:

- Auto
- Hydration
- Sleep
- Load
- Drinks
- Mind
- Practice

The picker gives the user agency and prevents hidden root selection from feeling mysterious.

### Slice D - Reflection Composer Uses Root Weights

Update Reflection composition so it:

- declares the selected root
- prioritizes primary signals
- uses only a few supporting signals
- keeps background signals quiet unless needed
- preserves existing NuTuenSai voice and boundaries

### Slice E - Optional Link from Field Review / Signal Engine

Allow bounded navigation from Field Review or Signal Engine into Reflection. Examples:

- Sleep ↔ Caffeine can offer `sleep_recovery` or `drinks_caffeine_sweetness`
- Water ↔ Load can offer `hydration` or `load_activity`
- Practice ↔ Sleep can offer `practice_context` or `sleep_recovery`

This must be presented as a selectable observation path, not an AI recommendation or conclusion.

## Test Matrix

### Case 1 - Hydration Root with Low Water + High Load

Root:

- `hydration`

Primary signals:

- low `Water_ml`
- `Hydration_Support_Count`, if present

Supporting signals:

- high `Load_Score`
- activity or body-use context, if present
- `Caffeine_Score`, if relevant

NuTuenSai should emphasize:

- water as the main observation root
- that high load can be context around water needs or preparation
- gentle observation of high-load days with lower recorded water

NuTuenSai should stay silent about:

- practice details unless user connected them
- mind interpretation unless the note explicitly mentions it

Forbidden wording:

- `งานทำให้พี่ดื่มน้ำน้อย`
- `ต้องดื่มน้ำมากขึ้น`
- kidney, urine, dehydration diagnosis, or medical advice

### Case 2 - Sleep Root with Low Sleep + High Caffeine

Root:

- `sleep_recovery`

Primary signals:

- low `Sleep_Hours`
- recovery marker, if available

Supporting signals:

- high `Caffeine_Score`
- high `Load_Score`, if present
- `Energy`, if present

NuTuenSai should emphasize:

- sleep/recovery as the main root
- caffeine as a supporting context, not a cause
- a gentle observation around rest space and caffeinated drinks

NuTuenSai should stay silent about:

- detailed hydration unless it clarifies the day
- practice unless the user recorded it as relevant

Forbidden wording:

- `คาเฟอีนทำให้นอนไม่หลับ`
- `พี่ควรเลิกคาเฟอีน`
- sleep disorder language

### Case 3 - Load Root with High Activity + Low Sleep

Root:

- `load_activity`

Primary signals:

- high `Load_Score`
- activity context or `Run_Detail_JSON`, if present

Supporting signals:

- low `Sleep_Hours`
- `Water_ml`
- `Energy`

NuTuenSai should emphasize:

- activity, work, or body-use load as the main frame
- whether rest and care had enough room around that load
- observation of load/recovery rhythm

NuTuenSai should stay silent about:

- detailed sweetness context unless it is connected to energy or load
- mind interpretation unless user wrote a note

Forbidden wording:

- `วันนี้พี่ทำงานดี/ไม่ดี`
- `load สูงคือ performance ดี`
- risk prediction or productivity judgment

### Case 4 - Drinks Root with High Caffeine + Low Sleep

Root:

- `drinks_caffeine_sweetness`

Primary signals:

- high `Caffeine_Score`
- `Drink_Type`, if available

Supporting signals:

- low `Sleep_Hours`
- `Load_Score`
- `Energy`

NuTuenSai should emphasize:

- drink context as the root
- caffeine load as recorded context
- sleep and load as supporting context

NuTuenSai should stay silent about:

- money, expense, price, calories, or exact caffeine milligrams
- moral judgment around drinks

Forbidden wording:

- `คาเฟอีนเป็นสาเหตุของการนอนน้อย`
- `เครื่องดื่มนี้ไม่ดี`
- `ต้องลดกาแฟ`

### Case 5 - Mind Root with Mind Note + High Load

Root:

- `mind_state`

Primary signals:

- `Mind_State`
- `Mind_Note`
- `Mind_Note_Support`

Supporting signals:

- high `Load_Score`
- low `Sleep_Hours`, if present
- `Practice_Minutes`, if present

NuTuenSai should emphasize:

- the user's own words and recorded mind context
- load as surrounding context
- agency and self-owned meaning

NuTuenSai should stay silent about:

- diagnosing mood
- personality inference
- unrelated drink detail

Forbidden wording:

- `พี่มีภาวะ...`
- `แปลว่าพี่เป็นคน...`
- therapy assessment or mental health diagnosis

### Case 6 - Practice Root with Practice Minutes + Neutral Mind

Root:

- `practice_context`

Primary signals:

- `Practice_Minutes`
- `Practice_Note`
- `Practice_Context`

Supporting signals:

- neutral `Mind_State`
- `Sleep_Hours`
- `Load_Score`

NuTuenSai should emphasize:

- practice as self-care context
- how practice sits beside the day
- neutrality without judgment

NuTuenSai should stay silent about:

- calling practice successful or unsuccessful
- using practice minutes as spiritual achievement
- claiming practice changed the mind state

Forbidden wording:

- `ภาวนาดี`
- `ภาวนาไม่พอ`
- `คะแนนภาวนา`
- `practice ทำให้ใจดีขึ้น`

### Case 7 - Auto Root with Multiple Signals but Hydration Strongest

Root:

- `auto`, future policy resolves to `hydration`

Primary signals:

- low `Water_ml`
- strong hydration-related note or gap

Supporting signals:

- high `Load_Score`
- high `Caffeine_Score`
- activity context

NuTuenSai should emphasize:

- that auto selected a hydration reading path because water is the clearest signal in the selected input
- the chosen root, not all available fields
- supporting context only where relevant

NuTuenSai should stay silent about:

- unrelated mind/practice details
- every metric that happens to exist

Forbidden wording:

- `วันนี้สรุปทุกอย่างได้ว่า...`
- `นี่คือสาเหตุหลัก`
- hidden AI-like root guessing without source explanation

### Case 8 - Missing Data Case

Root:

- any selected root, or `auto` with insufficient root evidence

Primary signals:

- missing or blank root fields

Supporting signals:

- any available context fields with clear data

NuTuenSai should emphasize:

- blank means not recorded, not failure
- the reflection can stay light when the root evidence is thin
- honest data is more important than complete data

NuTuenSai should stay silent about:

- making assumptions to fill blanks
- judging the user for not recording
- inferring hidden causes

Forbidden wording:

- `พี่ลืม`
- `ข้อมูลไม่ครบจึงประเมินไม่ได้เลย`
- `failure`
- any shame-based copy

## Runtime Non-Goals for This Note

This design note does not:

- change `script.js`
- change `style.css`
- change `index.html`
- change Reflection runtime output
- change Field Review
- change Signal Engine
- add a root picker
- add LLM behavior
- add scoring
- add diagnosis or advice

It is a source-of-truth draft for future implementation slices only.
