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
- Not a chatbot, AI authority, or hidden profiling system
- Not a production SaaS platform with accounts, cloud backend, or subscriptions

The fact that it is not SaaS is intentional. Its value is in the design of a user-owned personal data layer: local-first, inspectable, portable, and safe for AI-assisted reflection.

## Current Version

**MHB 2.3 — Gentle Meal Composition**

Latest refinements include:

- a calm, collapsible Meal Composer inside Today for recording multiple optional meals without turning the app into a nutrition dashboard
- an experimental, optional local Vision helper that accepts PNG, JPEG, WebP, HEIC, and HEIF, then proposes visible Meal Type/components for human review before adding anything to the draft
- a small read-only local Vision vocabulary view that shows observed labels, counts, and mapping status without adding Food References or changing meals
- separate local Meal records with create, edit, and gentle targeted delete behavior; meal data does not expand `Daily_Log`
- hybrid portions, optional preparation, first-class condiments, and source-bound sodium ranges with incomplete evidence shown as unknown or partial rather than zero
- a Dynamic Daily Meal Reflection Panel derived from saved meals only, using recorded-fact language without scores, guilt, or medical targets
- runtime-only awareness of the time since the latest earlier `Daily_Log` date, used once in the Reflection opening without schema changes, saved counters, streaks, rewards, or penalties
- Gentle Mind Note with an Observe → Keep → Release writing invitation, balanced feeling groups, and softer support/practice wording without changing stored columns or historical compatibility
- Mindful Practice Context before Mind Note using four simple bases: Body, Feeling tone, Mind / Thought, and Dhamma
- five main views: Today, Reflection/NuTuenSai, Field Review / ประมวลข้อมูล, Log, and Intention Profile
- Field Review / ประมวลข้อมูล tab for deterministic multi-day review from saved `Daily_Log`
- timeframe selector for 7 days, 14 days, 30 days, or all available saved rows
- Guided Field Rooms for hydration, recovery, load, drinks, Mind Note, and missing data, using one-card-at-a-time Guided Reading rather than chat simulation
- current-reading indicator, light read progress, left/right navigation grammar, and related-room transition cards for Guided Field Rooms
- Field Review remains local-first, read-only, non-medical, non-chatbot, and non-LLM
- Signal Engine for bounded numeric-to-numeric relationship review from `Daily_Log`, now shown as top relationship rows with semantic pair accents, a deterministic NuTuenSai Meaning Dictionary, raw column audit lines, pair-specific `MHB · NuTuenSai` meaning details, and a Gentle Next Observation layer, with no LLM, chart, matrix, or category mapping
- User Intention Profile for optional display name, addressing style, preferred tone, user context note, do-not-assume boundary, and optional birth date/year
- profile-aware Today/Hydration welcome text that uses only saved display name and address style
- optional `User_Intention_Profile` workbook sheet, exported only when a saved profile exists and imported only after preview + human confirmation
- `Practice_Note` for a short practice note, good action, or wholesome context, stored in `Daily_Log` and duplicated in `Practice_Context_JSON.note`
- Source-aware same-day save merge, so saving Today’s Signals does not erase saved Mind Note, Practice Context, or Reflection
- Daily Save Status Bar showing the three saved layers: Today’s Signals, Mind Note, and Reflection
- Honest data microcopy: honest data matters more than complete data
- Ordered Overall Mind scale from very heavy to relaxed, with Neutral as the middle point
- Reflection anti-repetition layer that reduces repeated recovery/load/sleep/support statements
- NuTuenSai voice cadence in Thai Reflection without turning the app into a chatbot
- Low-data micro-continuity that may use one previous-log cue as background only
- Input-grounded Reflection composer that remains deterministic, rule-based, and local-first
- Practice Context and Practice Note stored for Field Review context and bounded `practice_context` Reflection, never as spiritual scoring

MHB 2.3 keeps the MHB 2.2 Reflection rhythm and the locked MHB 2.0 foundation unchanged while adding the first usable Gentle Meal Composition slice. Meal records remain separate from `Daily_Log`, daily meal summaries are derived rather than persisted, and missing nutrition evidence remains visible. It is not an AI companion, nutrition dashboard, calorie tracker, medical review layer, causation analysis, or production SaaS release.

## Main Navigation

The app currently has five main views:

- `Today`: current-day signals, hydration, drinks, load/recovery, the collapsible Meal Composer, Practice Context, and Mind Note
- `Reflection/NuTuenSai`: deterministic Reflection generation, review, editing, and save
- `Field Review / ประมวลข้อมูล`: Guided Field Rooms and Signal Engine over saved `Daily_Log`
- `Log`: Daily Log Table, Export Master Excel, Import Master Excel, and Clear Daily Log
- `Intention Profile`: optional local profile for display name, addressing, tone, user context, and do-not-assume boundaries

## Core Principle

**Honest data matters more than complete data.**

Users do not need to fill every field. A blank field means not recorded, not observed, or not certain. This keeps future human or AI review more reliable because the workbook reflects what actually happened instead of what the user felt pressured to complete.

## Personal Data Layer / Field Memory

The exported workbook is not just a spreadsheet dump. It is a portable field memory: raw inputs, derived cues, generated reflections, and AI-reading notes are kept distinguishable so future review can preserve context instead of flattening the user into scores.

Workbook layers include:

- `Daily_Log`: structured daily signals and optional practice/Mind Note/Reflection Root fields
- JSON fields such as `Drink_Profile_JSON`, `Run_Detail_JSON`, and `Practice_Context_JSON`: portable context bundles
- `Reflections`: generated companion text plus user-selected Reflection Root metadata, separate from raw input
- `Summary`: static export summary, not Excel formulas and not AI analysis
- `Field_Context`: guardrails for human/AI readers
- `Field_Review`: lightweight pattern review
- `Column_Guide`: AI-readable explanation of workbook columns, units, allowed interpretation, and forbidden interpretation
- `AI_Context`: workbook-level semantic guardrails, including that this is self-care data and not finance/expense data
- `User_Intention_Profile`: optional single-row profile sheet when the user has saved an Intention Profile

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

Practice Context and Practice Note are stored for Field Review and for bounded `practice_context` Reflection when that root is selected. The app reads them as gentle context only, never as merit, spiritual progress, discipline, or practice quality.

## Gentle Mind Note

MHB 2.1 reframes Mind Note around **Observe → Keep → Release**. The page asks what the user may want to keep with today rather than asking them to find a problem. Positive, neutral, learning, uncertain, and difficult moments receive equal permission.

Feeling choices are presented in three light groups: gentle/supportive, neutral/noticing, and heavy/needs space. Existing stored values remain compatible, while optional labels such as peaceful, proud, learning, and thinking broaden what can be recorded. `วันนี้ใจอยากได้อะไร` / `What might support the mind today?` replaces the problem-oriented Support Need heading and adds gentle options without changing the `Mind_Note_Support` column.

This is a UX, copy, and presentation change only. `Daily_Log`, workbook export/import, Reflection, Signal Engine, Field Review, and historical rows keep their existing contracts.

## Gentle Meal Composition

MHB 2.3 adds a compact Meal Composer inside Today. It begins with the broad kind of meal the user recognizes, then lets them record only the visible or remembered components. A user does not need to reconstruct a recipe or know every condiment. They can adjust an approximate portion or optional preparation, save multiple meals for the same day, and later edit or remove a targeted meal. Condiments remain first-class optional items rather than hidden note text; an explicit “condiments unknown” note is distinct from simply not recording one.

Meal records are stored locally under a separate versioned source and do not become columns in `Daily_Log`. Sodium appears only as an evidence-backed range. Items without supported evidence remain unknown, and a meal with mixed known and unknown items is shown as partial rather than as a complete total.

For the two human-approved Thai FCD fried-rice references, Meal Composer may offer a compact reference card after matching components are recorded. A suggestion does not change the meal or sodium estimate: the user must explicitly confirm it. The visible value remains a reference per 100 g, not an estimate for the user's whole plate; a conflicting recorded component pauses that reference and safely returns the meal to its component-only or unknown path.

The bounded local Vision prototype can send a user-selected PNG, JPEG, WebP, HEIC, or HEIF only to an available Ollama model on this device. For a larger phone image, `Prepare a photo for AI` opens a separate local preparation page that creates a temporary JPEG before returning it to the existing photo helper; no image is saved with the meal. Its observations remain temporary until the user reviews them. Applying selected observations adds only accepted, safely mapped values to the existing draft; it does not save the meal, set a named-dish identity, or create sodium evidence. Manual Meal Composer remains available when the provider is absent or a result is rejected.

For local Image Prep and Vision on macOS, build once with `./tools/build_mhb_macos_app.sh`, then double-click `dist/Mindful Health Balance.app`. The personal local launcher has no Developer ID or App Store signature; it opens MHB only at canonical `http://127.0.0.1:4173` without exposing the server to the network. If another service owns that port, the launcher stops rather than silently switching to a separate browser-storage context; close that known service and try again. `Start Mindful Health Balance.command` remains the fallback and debugging entry. Opening `index.html` directly still supports manual MHB, but shows a reminder that photo capabilities need the Local Launcher. Manual fallback: `python3 -m http.server 4173 --bind 127.0.0.1`, then open `http://127.0.0.1:4173/index.html`.

The Daily Meal Reflection Panel is rebuilt from saved meals whenever the recorded day changes. It says `recorded meals`, never claims that unrecorded food was not eaten, and does not score, diagnose, prescribe, or set a medical sodium target. Meal data is not yet connected to the main Reflection renderer or workbook export/import.

## Reflection/NuTuenSai

Reflection/NuTuenSai is deterministic and rule-based. It may reference current-day signals such as water, sleep hours, drink context, load/activity, run detail, Mind Note, and light continuity context from previous logs.

Current reflection behavior:

- selects 2-4 meaningful input anchors for an input-grounded overview
- keeps previous logs as background only, never as a replacement for today’s truth
- uses a short low-data branch when today has little new input
- applies NuTuenSai voice cadence in Thai with sparse `หนู`, `ค่ะ`, and `นะคะ`
- reduces repeated themes through an anti-repetition layer
- supports a manual Reflection Root picker so the user can choose a gentle reading focus, such as hydration, sleep/recovery, load/activity, drinks, mind state, or practice context
- when a non-auto root is selected, generated Reflection uses concise root-specific NuTuenSai segments; `auto` stays close to the existing rule-based composer
- each non-auto root restores 1-2 relevant concrete detail anchors, such as water amount, sleep hours, activity labels, drink names, Mind Note, or practice note, without returning to a data dump
- saves `Reflection_Root` metadata as user-selected intention context for export/audit; it is not a score, diagnosis, or AI recommendation
- keeps medical, therapy, diet, training, spiritual, and productivity claims out of scope

Reflection output is companion text, not raw evidence. It is optional and is saved only when the user chooses to save today’s Reflection.

## User Intention Profile

Intention Profile is an optional local profile layer for how the app addresses the user and frames deterministic wording. It can store:

- display name
- address style: `senior_name`, `polite_name`, or `name_only`
- preferred tone
- optional birth date or birth year
- User Context Note
- Do Not Assume Note

The profile is stored in this browser first. It can change greeting/addressing and limited Reflection wording, but it must not change source facts, calculations, Field Review evidence, Reflection Root selection, Signal Engine results, or safety boundaries. User notes are plain user-owned context; they are not hidden system instructions and are not parsed as commands. Custom addressing has been removed from the visible UI; legacy custom profiles normalize safely to `senior_name`.

The Today/Hydration area can show a profile-aware welcome such as `สวัสดีค่ะ พี่ pnat 🩵`. This uses only display name and address style. It is not personality analysis.

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
- Optional Gentle Mind Note, balanced feeling choices, and softly worded support options
- Rule-based NuTuenSai Reflection
- Rule-based Field Review from saved `Daily_Log`
- User Intention Profile for optional addressing, tone, user context, and do-not-assume boundaries
- Excel export/import for a user-owned portable workbook
- Thai / English / Chinese UI
- Light / dark / auto theme

## Local-First Data Boundary

Mindful Health Balance is local-first and user-controlled.

- Daily data is stored in browser `localStorage` on the user's device.
- Current form edits are autosaved locally as a same-day draft; if the draft is missing but today already has a saved Daily Log row, the app can load that row back into the form on startup.
- `Save to Daily Log` is still required to write or update a saved row in the Daily Log table.
- If the stored Daily Log cannot be read, MHB preserves the original local value and pauses Daily Log save, import, clear, restore, and export. The Log view offers a local raw backup step before an explicit Master Excel recovery; it never silently resets or uploads the data.
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
7. Open Field Review to review saved `Daily_Log` patterns across 7, 14, 30, or all available days.
8. Optionally open Intention Profile to save local addressing and communication preferences.
9. Export or import the Excel workbook when needed.

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
- `User_Intention_Profile` (optional; only when a saved profile exists)

`Daily_Log` keeps canonical English headers for machine readability. `Column_Guide` explains key columns in Thai and English, including units and forbidden interpretations, without changing the canonical headers. `AI_Context` tells AI readers that the workbook is a self-care reflection log, not a finance, expense, accounting, trading, or spending workbook.

`User_Intention_Profile` is not exported as an empty sheet. It appears only when the user has saved an Intention Profile. It is a portable user-owned context sheet, not an account, identity verification sheet, medical profile, or AI instruction engine. The protected `.xltx` template is not the current master data file; normal user backup/export uses `Mindful_Health_Balance_Master.xlsx`.

Workbook import keeps existing Daily Log behavior and adds a human-reviewed profile bridge: if the workbook has a valid `User_Intention_Profile` sheet, the app previews the candidate profile and asks before replacing the local profile. Cancel leaves the local profile unchanged. Confirm replaces the profile as a whole snapshot; v1 does not merge field-by-field. Workbooks without the profile sheet keep the local profile unchanged, and invalid profile candidates do not need to break the rest of workbook import.

## Field Review

The Field Review tab is part of the locked MHB 2.0 release. It reads saved `Daily_Log` rows from localStorage and shows deterministic Guided Field Rooms for hydration, recovery, load, drinks, Mind Note, and missing/blank data. The default timeframe is 30 days so Field Review and Signal Engine have a better chance of enough paired data; users can still switch to 7 days, 14 days, or all available data. The selected timeframe changes the reading tone lightly: 7 days is an early signal, 14 days is an emerging rhythm, 30 days is a month-level rhythm, and all available data is a long-view reflection.

Field Review does not call an LLM, does not provide a free-form question box, and does not change export/import/save/restore behavior.

The Field Review header is now a compact Daily_Log context block: it keeps the `LOCAL FIELD REVIEW` label, selected timeframe controls, source-bound overview chips, and boundary copy in one tighter section. The separate CSS rhythm strip was removed to reduce visual noise. It does not add a chart library; the visual layer still reflects saved `Daily_Log` evidence only.

Field Review cards also use NuTuenSai Field Room background images for hydration, sleep/recovery, load/recovery, drinks context, Mind Note, and missing/blank data. These images are presentation assets only; they do not change review logic, source boundaries, or workbook data.

Guided Field Rooms now use a Guided Reading flow rather than a chat simulation. The user chooses a reading angle: overview, evidence, next gentle attention, or show all. The room shows one reading card at a time, a current-reading indicator, light read progress with `✓ / ○`, compact angle chips, and deterministic controls for back, choose angle, end reading, and next angle. The navigation grammar is simple: left means going back, right means ending or continuing. Related-room cards are transitions to other rooms, not AI recommendations. Reading state is session-only.

The sidebar separates the six Guided Field Rooms from the English-only `Signal Engine` entry so the relationship engine reads as a special module, not a seventh reflection room.

Field Review also includes a conservative `Signal Engine` room. It calculates numeric-to-numeric Pearson relationships from selected `Daily_Log` rows only, ranks up to five valid relationships by absolute `r`, and opens a centered meaning detail signed `MHB · NuTuenSai`. Row titles use human-readable signal labels first, with pair-specific semantic icons/accents, a plain signal sentence, visible evidence chips for `r` and paired days, a compact same/opposite/unclear legend, and an `r` helper for non-technical readers. Raw column pairs such as `Water_ml ↔ Load_Score` remain visible as technical evidence. The meaning layer uses the deterministic NuTuenSai Meaning Voice Matrix: pair, direction, strength, and paired-row count choose the voice, not LLM generation. A Gentle Next Observation block turns the relationship into a self-observation prompt, not advice, diagnosis, or causation. It uses minimum-n rules before showing `r`, does not map category fields yet, and always frames correlation as not causation, diagnosis, or medical advice.

The cards are descriptive pattern summaries. Missing data means not recorded, not failure. Numeric fields keep their workbook boundaries: for example, `Water_ml` is plain water in milliliters, not money or expense data.

## Documentation

- [English User Guide](USER_GUIDE_EN.md)
- [Thai User Guide / คู่มือภาษาไทย](USER_GUIDE_TH.md)
- [🇨🇳 简体中文用户指南](USER_GUIDE_ZH.md)
- [Context Bundle](docs/MINDFUL_HEALTH_BALANCE_CONTEXT_BUNDLE.md)
- [Design Notes Index](docs/design_notes/README.md)
- [AI-Ready Reflection System Definition](docs/design_notes/AI_READY_REFLECTION_SYSTEM_DEFINITION.md)
- [Portable Field Memory Design](docs/design_notes/PORTABLE_FIELD_MEMORY_DESIGN.md)
- [Input-grounded Reflection Composer v1.9.8](docs/design_notes/INPUT_GROUNDED_REFLECTION_COMPOSER_V1_9_8.md)
- [Mindful Practice Context v1.9.9](docs/design_notes/MINDFUL_PRACTICE_CONTEXT_V1_9_9.md)
- [Gentle Mind Note UX](docs/design_notes/GENTLE_MIND_NOTE_UX.md)
- [Field Review Slice A — Rule-Based Daily Log Review](docs/design_notes/FIELD_REVIEW_SLICE_A_RULE_BASED.md)
- [Symbolic Signal Cockpit Polish v1.9.7](docs/design_notes/SYMBOLIC_SIGNAL_COCKPIT_POLISH_V1_9_7.md)

Thai documentation, field notes, and original design context remain available in `USER_GUIDE_TH.md`, the app UI, and the design notes.

## Version History / Design Trace

- **MHB 2.3 — Current release / Gentle Meal Composition**: adds the Today Meal Composer, multiple local meals per day, edit/delete, uncertainty-aware sodium ranges, and a derived Daily Meal Reflection Panel without changing `Daily_Log` or workbook contracts.
- **MHB 2.2 — Daily Log Gap Awareness**: derives the latest earlier log date and the time between saved dates at runtime, then uses a five-state rhythm only to shape one gentle Reflection opening. It does not add schema fields, persistence, streaks, rewards, penalties, or new interpretation.
- **MHB 2.1 — Gentle Mind Note**: refreshed Mind Note around Observe → Keep → Release, balanced feeling groups, and gentler support/practice wording without changing schema, export/import, Reflection, or historical data compatibility.
- **MHB 2.0 — Locked foundation**: Field Review, Guided Field Rooms, Signal Engine, User Intention Profile, Excel profile bridge, and profile-aware Today welcome remain the release baseline under MHB 2.3.
- **MHB 2.0 design trace**: Earlier internal slices such as Field Review Slice A, Field Review UI v2/v2.1/v2.2/v2.3, Guided Reading, and User Intention Profile U0-U4 are historical implementation steps inside the MHB 2.0 release, not separate current versions.
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
