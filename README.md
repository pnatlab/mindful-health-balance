# Mindful Health Balance by MSxAI

**A local-first personal rhythm research prototype for user-owned, AI-readable self-reflection data.**

Mindful Health Balance is a user-owned field memory that helps AI read daily self-care context without taking ownership of the user's meaning. It records honest daily signals — hydration, drinks, sleep, load/recovery, mind state, practice context, Mind Note, and Reflection — as structured local data that can later be reviewed by the user or intentionally shared with AI.

> Self-care begins from seeing, not forcing.

## What This App Is

Mindful Health Balance is a static, local-first web app for building a personal rhythm dataset. It helps users observe daily patterns around:

- hydration and water rhythm
- caffeine, sweetness, and drink context
- sleep, energy, load, activity, and recovery
- ordered overall mind state
- Mind Note and support need
- optional mindful practice context
- generated Reflection/NuTuenSai text

The app is designed around honest data, human agency, and non-coercive UX. It does not ask the user to complete every field. Blank fields mean not recorded or uncertain, not failure.

## What This App Is Not

- Not a medical diagnosis tool
- Not therapy or crisis support
- Not a replacement for healthcare professionals
- Not a spiritual scoring system
- Not a merit, virtue, productivity, or performance score
- Not an automatic health optimizer
- Not an AI system that decides what the user's life means
- Not a chatbot, machine-learning model, or hidden profiling system
- Not a production SaaS platform with accounts, cloud backend, or subscriptions

The fact that it is not SaaS is intentional. Its value is in the design of a user-owned personal data layer: local-first, inspectable, portable, and safe for AI-assisted reflection.

## Current Version

**v1.9.9 — Mindful Practice Context and User-Owned Field Memory Refinement**

Latest refinements include:

- Mindful Practice Context before Mind Note using four simple bases: Body, Feeling tone, Mind / Thought, and Dhamma
- `Practice_Note` for a short practice note, good action, or wholesome context, stored in `Daily_Log` and duplicated in `Practice_Context_JSON.note`
- Source-aware same-day save merge, so saving Today’s Signals does not erase saved Mind Note, Practice Context, or Reflection
- Daily Save Status Bar showing the three saved layers: Today’s Signals, Mind Note, and Reflection
- Honest data microcopy: honest data matters more than complete data
- Ordered Overall Mind scale from very heavy to relaxed, with Neutral as the middle point
- Reflection anti-repetition layer that reduces repeated recovery/load/sleep/support statements
- NuTuenSai voice cadence in Thai Reflection without turning the app into a chatbot
- Low-data micro-continuity that may use one previous-log cue as background only
- Input-grounded Reflection composer that remains deterministic, rule-based, and local-first
- Practice Context and Practice Note stored for future Field Review, not daily Reflection interpretation

This is still a v1.9.x stabilization and usability line. It is not v2.0, not an AI companion, not a medical review layer, and not a production SaaS release.

## Core Principle

**Honest data matters more than complete data.**

Users do not need to fill every field. A blank field means not recorded, not observed, or not certain. This keeps future human or AI review more reliable because the workbook reflects what actually happened instead of what the user felt pressured to complete.

## Personal Data Layer / Field Memory

The exported workbook is not just a spreadsheet dump. It is a portable field memory: raw inputs, derived cues, generated reflections, and AI-reading notes are kept distinguishable so future review can preserve context instead of flattening the user into scores.

Workbook layers include:

- `Daily_Log`: structured daily signals and optional practice/Mind Note/Reflection fields
- JSON fields such as `Drink_Profile_JSON`, `Run_Detail_JSON`, and `Practice_Context_JSON`: portable context bundles
- `Reflections`: generated companion text, separate from raw input
- `Summary`: static export summary, not Excel formulas and not AI analysis
- `Field_Context`: guardrails for human/AI readers
- `Field_Review`: lightweight pattern review
- `Column_Guide`: AI-readable explanation of workbook columns, units, allowed interpretation, and forbidden interpretation
- `AI_Context`: workbook-level semantic guardrails, including that this is self-care data and not finance/expense data

AI can only read the workbook when the user intentionally exports and shares it. There is no backend, account system, automatic upload, or hidden sync.

`Mindful_Health_Balance_Master.xlsx` is designed to be AI-readable as well as human-readable. `Column_Guide` and `AI_Context` help language models understand units and boundaries, for example that `Water_ml` means milliliters of water, not money or expenses. LLM outputs should still be treated as drafts for the user to audit.

## Three-Layer Save Model

Daily logging is organized into three save layers:

1. **Today’s Signals**: water, drinks, sleep, energy, ordered mind state, load/recovery, activity, and run detail
2. **Mind Note**: Practice Context, `Practice_Note`, Mind Note text, feeling, and support need
3. **Reflection**: generated or edited Reflection/NuTuenSai text, reminder, and tomorrow focus

Each layer can be saved separately. Same-day save uses a source-aware safe merge:

- Saving Today’s Signals updates only Today’s Signals and preserves Mind Note, Practice Context, Practice Note, and Reflection.
- Saving Mind Note updates Practice Context, Practice Note, and Mind Note while preserving existing Reflection.
- Saving from Reflection uses `Save Today’s Reflection` and stores the current day with the generated or edited Reflection layer.

The Daily Save Status Bar shows which of the three layers have already been saved today. It is orientation only, not a completion score.

## Practice Context

v1.9.9 adds an optional Practice Context card before Mind Note. It uses lightweight daily-use roots rather than a full religious or technical practice catalog:

- Body
- Feeling tone
- Mind / Thought
- Dhamma
- No practice / Other

Practice fields:

- `Practice_Root`
- `Practice_Type`
- `Practice_Minutes`
- `Practice_Context_JSON`
- `Practice_Note`

`Practice_Note` can store a short note such as “fed fish at the temple,” “recollected a good action,” “chose not to react,” or “used a gentle phrase.” It is context, not a merit score or spiritual assessment.

Practice Context and Practice Note are stored for future weekly/monthly Field Review. Daily Reflection/NuTuenSai intentionally does not interpret them yet.

## Reflection/NuTuenSai

Reflection/NuTuenSai is deterministic and rule-based. It may reference current-day signals such as water, sleep hours, drink context, load/activity, run detail, Mind Note, and light continuity context from previous logs.

Current reflection behavior:

- selects 2-4 meaningful input anchors for an input-grounded overview
- keeps previous logs as background only, never as a replacement for today’s truth
- uses a short low-data branch when today has little new input
- applies NuTuenSai voice cadence in Thai with sparse `หนู`, `ค่ะ`, and `นะคะ`
- reduces repeated themes through an anti-repetition layer
- keeps medical, therapy, diet, training, spiritual, and productivity claims out of scope

Reflection output is companion text, not raw evidence. It is optional and is saved only when the user chooses to save today’s Reflection.

## Features

- Local-first daily log stored in the browser
- Daily Signal Cockpit for Today’s Signals 1/2
- Mini step switcher for Today’s Signals 1/2 and Mind Note 2/2
- Same-day current form draft autosave in localStorage
- Daily Save Status Bar for Today’s Signals, Mind Note, and Reflection
- Restore Today’s Log to load a saved Daily_Log row back into the current form without saving or changing the log
- Hydration tracking with gentle adaptive guidance
- Drink Profile with caffeine, sweetness, milk, hydration support, and soda/sweetness context
- Activity and recovery load presets, including work, sport, light recovery, and AI-assisted coding context
- Optional sleep hours and run detail JSON
- Optional Practice Context and Practice Note before Mind Note
- Optional Mind Note, feeling, and support need
- Rule-based NuTuenSai Reflection
- Excel export/import for a user-owned portable workbook
- Thai / English / Chinese UI
- Light / dark / auto theme

## Local-First Data Boundary

Mindful Health Balance is local-first and user-controlled.

- Daily data is stored in browser `localStorage` on the user's device.
- Current form edits are autosaved locally as a same-day draft; if the draft is missing but today already has a saved Daily Log row, the app can load that row back into the form on startup.
- `Save to Daily Log` is still required to write or update a saved row in the Daily Log table.
- There is no backend and no automatic upload.
- The exported Excel workbook belongs to the user.
- AI can only read the workbook when the user intentionally exports and shares it.
- Reflection text is rule-based and descriptive; it is not diagnosis, treatment, therapy, or health-risk prediction.

If the app folder or browser origin changes, existing browser storage may not follow. Export the workbook before moving the app, then import it again after opening from the new location.

## How To Use

1. Open `index.html` in a browser.
2. Fill what is true enough in Today’s Signals.
3. Save Today’s Signals when ready.
4. Optionally add Practice Context, Practice Note, and Mind Note.
5. Optionally open Reflection/NuTuenSai, review or edit the generated Reflection, and click `Save Today’s Reflection`.
6. If the current form is cleared by mistake, use `Restore Today’s Log` to load today’s saved row back into the form. If there is no row for today, the app asks before loading the latest saved row.
7. Export or import the Excel workbook when needed.

No backend, server, build step, or framework is required for normal use.

## Workbook Export

`Export Master Excel` creates:

```text
Mindful_Health_Balance_Master.xlsx
```

The workbook currently includes:

- `Daily_Log`
- `Summary`
- `Reflections`
- `Field_Context`
- `Field_Review`
- `Column_Guide`
- `AI_Context`

`Daily_Log` keeps canonical English headers for machine readability. `Column_Guide` explains key columns in Thai and English, including units and forbidden interpretations, without changing the canonical headers. `AI_Context` tells AI readers that the workbook is a self-care reflection log, not a finance, expense, accounting, trading, or spending workbook.

## Documentation

- [English User Guide](USER_GUIDE_EN.md)
- [Thai User Guide / คู่มือภาษาไทย](USER_GUIDE_TH.md)
- [Context Bundle](docs/MINDFUL_HEALTH_BALANCE_CONTEXT_BUNDLE.md)
- [Design Notes Index](docs/design_notes/README.md)
- [AI-Ready Reflection System Definition](docs/design_notes/AI_READY_REFLECTION_SYSTEM_DEFINITION.md)
- [Portable Field Memory Design](docs/design_notes/PORTABLE_FIELD_MEMORY_DESIGN.md)
- [Input-grounded Reflection Composer v1.9.8](docs/design_notes/INPUT_GROUNDED_REFLECTION_COMPOSER_V1_9_8.md)
- [Mindful Practice Context v1.9.9](docs/design_notes/MINDFUL_PRACTICE_CONTEXT_V1_9_9.md)
- [Symbolic Signal Cockpit Polish v1.9.7](docs/design_notes/SYMBOLIC_SIGNAL_COCKPIT_POLISH_V1_9_7.md)

Thai documentation, field notes, and original design context remain available in `USER_GUIDE_TH.md`, the app UI, and the design notes.

## Version History / Design Trace

- **v1.9.9 — Mindful Practice Context and User-Owned Field Memory Refinement**: adds Practice Context, `Practice_Note`, honest data copy, source-aware safe merge, three-layer save status, ordered mind scale, NuTuenSai voice cadence, low-data micro-continuity, and Reflection anti-repetition.
- **v1.9.8c — Reflection Sentence Smoothing**: reduces repeated connectors and uses short paragraphs so input-grounded reflection reads more naturally.
- **v1.9.8b — Reflection Breathing Markers**: adds minimal emoji pause markers to improve reflection readability without creating emoji headings or new signal categories.
- **v1.9.8 — Input-grounded Natural Reflection Composer**: Reflection selects 2-4 meaningful input anchors and embeds them in a natural NuTuenSai overview.
- **v1.9.7 — Symbolic Signal Cockpit Polish**: symbolic node cockpit, compact center token, mobile visual hierarchy, and gentle cockpit interaction polish.
- **v1.9.6 — Compact Signal Cockpit Layout**: Today’s Signals 1/2 became a two-card layout with Daily Signal Cockpit and Active Signal Detail.
- **v1.9.5 — LLI Continuity Reflection Layer**: Reflection reads the previous 1-3 logs as supportive context while keeping today's input primary.
- **v1.9.4 — Reflection Input Integration Pass**: Reflection uses today's `Sleep_Hours`, `Run_Detail_JSON`, running subtype, AI-assisted work, hydration, and drink context more clearly.
- **v1.9.3 — Structured Sleep & Run Detail**: Added optional `Sleep_Hours` and `Run_Detail_JSON` while preserving `Sleep`, `Activities`, and old workbook compatibility.
- **v1.9.2 — Today Input Step Flow**: Split the Today view into Today’s Signals 1/2 and Mind Note 2/2, while allowing Daily Log saves from Today and Reflection saves from Reflection/NuTuenSai.
- **v1.9 — Portable Field Memory Foundation**: Added AI-readable Excel context sheets, `Field_Review`, `Column_Guide`, and clearer export summary semantics.
- **v1.8 — Activity / Profession-aware Load Presets**: Added activity roots for physical, cognitive, clinical, market, outdoor, sport, and recovery contexts.
- **v1.7 — Minimal Layered UI**: Organized the app into Today, Reflection/NuTuenSai, and Log views.
- **v1.6 — NuTuenSai Reflection Processing Layer**: Added rule-based reflection over hydration, drink, recovery, energy/sleep, and mind-note signals.
- **v1.5 — Structured Drink & Energy Profile**: Added structured drink context, sugar/caffeine scores, hydration support, and energy causes.
- **v1.4.x — Welcome / Theme Foundation**: Added lavender glass welcome UI, dark mode, and auto theme by local time.

For detailed design rationale, see the [Design Notes Index](docs/design_notes/README.md).

## Status

Mindful Health Balance is a personal research-grade prototype.

- Static web app
- Local-first
- User-owned data
- AI-readable workbook
- Rule-based reflection
- Non-medical
- Not therapy, diagnosis, spiritual scoring, or production SaaS
- Not a machine learning model

## License / Ownership

License not specified yet.
