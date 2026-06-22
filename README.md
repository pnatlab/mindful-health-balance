# Mindful Health Balance by MSxAI

A local-first self-care reflection dashboard for tracking hydration, recovery, activity load, sleep, drinks, and mind state without fear-based health optimization.

Mindful Health Balance is designed as a small daily rhythm tool: it helps the user see what happened today, save it as structured local data, and optionally review the pattern through a gentle NuTuenSai reflection layer.

> Self-care begins from seeing, not forcing.

## What This App Is

Mindful Health Balance is a static, local-first web app that helps users gently observe daily patterns around:

- hydration
- caffeine and sugary drinks
- recovery and activity/load
- sleep
- mind state
- personal reflection

It is designed as a user-owned personal rhythm dataset, not as a medical tool. The app turns small daily signals into structured, reviewable records while preserving human agency.

## What This App Is Not

- Not a medical diagnosis tool
- Not a therapy tool
- Not a crisis support tool
- Not a replacement for healthcare professionals
- Not an automatic health optimizer
- Not a performance scoring system
- Not an AI system that decides what the user's life means

## Current Version

**v1.9.9 — Mindful Practice Context**

Latest refinements include:

- Mindful Practice Context card before Mind Note, with optional practice root/type and duration fields
- Reflection sentence smoothing to reduce repeated connectors and split rich anchor context into calmer sentences
- Reflection breathing markers: very small emoji pause markers for readability without section headings
- Input-grounded Reflection/NuTuenSai overview that selects 2-4 meaningful anchors from today's input
- Symbolic Daily Signal Cockpit for four daily signals: inner state, water, drinks, and work/activity
- Save from Today’s Signals 1/2 or Mind Note 2/2, with Reflection/NuTuenSai as an optional layer
- Mobile cockpit navigation with active-detail scrolling and a back-to-cockpit control
- Mobile-first header/settings hierarchy so daily input appears earlier
- LLI Continuity Reflection Layer using the previous 1-3 saved logs as light context only
- Structured sleep hours and optional run detail stored as backward-compatible fields
- Portable Excel field memory foundation with `Summary`, `Field_Context`, `Field_Review`, and `Column_Guide`

This is still a v1.9.x stabilization and usability line. It is not v2.0, not an AI companion, not a machine learning system, and not a medical review layer.

## Features

- Local-first daily log stored in the browser
- Daily Signal Cockpit with readable status for four core signals
- Hydration tracking with gentle adaptive guidance
- Drink profile with a visible drink insight callout for caffeine, sweetness, hydration support, and soda context
- Activity and recovery load presets, including work, sport, light recovery, and AI-assisted coding context
- Optional sleep hours that derive the existing sleep category
- Optional run detail JSON for distance, duration, pace, and sweat context
- Optional mindful practice context stored for future Field Review, not daily Reflection interpretation
- Optional Mind Note layer
- NuTuenSai reflection layer
- Previous-log continuity note that remains supportive and non-diagnostic
- Excel export/import for a user-owned portable workbook
- Thai / English / Chinese UI
- Light / dark / auto theme
- Welcome threshold and app info/settings controls

## Local-First Data Boundary

Mindful Health Balance is local-first and user-controlled.

- Daily data is stored in browser `localStorage` on the user's device.
- There is no backend and no automatic upload.
- The exported Excel workbook belongs to the user.
- AI can only read the workbook when the user intentionally exports and shares it.
- Reflection text is rule-based and descriptive; it is not diagnosis, treatment, therapy, or health-risk prediction.

If the app folder or browser origin changes, existing browser storage may not follow. Export the workbook before moving the app, then import it again after opening from the new location.

## How To Use

1. Open `index.html` in a browser.
2. Fill today's signals in the Daily Signal Cockpit.
3. Save today's log when ready.
4. Optionally add practice context and a Mind Note.
5. Optionally open Reflection/NuTuenSai before saving or reviewing.
6. Export or import the Excel workbook when needed.

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

`Daily_Log` keeps canonical English headers for machine readability. `Column_Guide` explains key columns in Thai and English without changing the canonical headers.

`Summary` contains JavaScript-calculated static export values, not Excel formulas and not AI analysis. `Summary_Note` is a static guardrail note that frames the workbook as pattern review, not health judgment.

## Documentation

- [English User Guide](USER_GUIDE_EN.md)
- [Thai User Guide / คู่มือภาษาไทย](USER_GUIDE_TH.md)
- [Context Bundle](docs/MINDFUL_HEALTH_BALANCE_CONTEXT_BUNDLE.md)
- [Design Notes Index](docs/design_notes/README.md)
- [AI-Ready Reflection System Definition](docs/design_notes/AI_READY_REFLECTION_SYSTEM_DEFINITION.md)
- [Portable Field Memory Design](docs/design_notes/PORTABLE_FIELD_MEMORY_DESIGN.md)
- [Input-grounded Reflection Composer v1.9.8](docs/design_notes/INPUT_GROUNDED_REFLECTION_COMPOSER_V1_9_8.md)
- [Reflection Breathing Markers v1.9.8b](docs/design_notes/REFLECTION_BREATHING_MARKERS_V1_9_8B.md)
- [Reflection Sentence Smoothing v1.9.8c](docs/design_notes/REFLECTION_SENTENCE_SMOOTHING_V1_9_8C.md)
- [Mindful Practice Context v1.9.9](docs/design_notes/MINDFUL_PRACTICE_CONTEXT_V1_9_9.md)
- [Symbolic Signal Cockpit Polish v1.9.7](docs/design_notes/SYMBOLIC_SIGNAL_COCKPIT_POLISH_V1_9_7.md)

Thai documentation, field notes, and original design context remain available in `USER_GUIDE_TH.md`, the app UI, and the design notes.

## Version History / Design Trace

- **v1.9.9 — Mindful Practice Context**: adds optional practice root/type/duration before Mind Note, stored for future Field Review while excluded from daily Reflection.
- **v1.9.8c — Reflection Sentence Smoothing**: reduces repeated connectors and uses short paragraphs so input-grounded reflection reads more naturally.
- **v1.9.8b — Reflection Breathing Markers**: adds minimal emoji pause markers to improve reflection readability without creating emoji headings or new signal categories.
- **v1.9.8 — Input-grounded Natural Reflection Composer**: Reflection selects 2-4 meaningful input anchors and embeds them in a natural NuTuenSai overview.
- **v1.9.7 — Symbolic Signal Cockpit Polish**: symbolic node cockpit, compact center token, mobile visual hierarchy, and gentle cockpit interaction polish.
- **v1.9.6 — Compact Signal Cockpit Layout**: Today’s Signals 1/2 became a two-card layout with Daily Signal Cockpit and Active Signal Detail.
- **v1.9.5 — LLI Continuity Reflection Layer**: Reflection reads the previous 1-3 logs as supportive context while keeping today's input primary.
- **v1.9.4 — Reflection Input Integration Pass**: Reflection uses today's `Sleep_Hours`, `Run_Detail_JSON`, running subtype, AI-assisted work, hydration, and drink context more clearly.
- **v1.9.3 — Structured Sleep & Run Detail**: Added optional `Sleep_Hours` and `Run_Detail_JSON` while preserving `Sleep`, `Activities`, and old workbook compatibility.
- **v1.9.2 — Today Input Step Flow**: Split the Today view into Today’s Signals 1/2 and Mind Note 2/2, while allowing Save to Daily Log from Today or Reflection.
- **v1.9 — Portable Field Memory Foundation**: Added AI-readable Excel context sheets, `Field_Review`, `Column_Guide`, and clearer export summary semantics.
- **v1.8 — Activity / Profession-aware Load Presets**: Added activity roots for physical, cognitive, clinical, market, outdoor, sport, and recovery contexts.
- **v1.7 — Minimal Layered UI**: Organized the app into Today, Reflection/NuTuenSai, and Log views.
- **v1.6 — NuTuenSai Reflection Processing Layer**: Added rule-based reflection over hydration, drink, recovery, energy/sleep, and mind-note signals.
- **v1.5 — Structured Drink & Energy Profile**: Added structured drink context, sugar/caffeine scores, hydration support, and energy causes.
- **v1.4.x — Welcome / Theme Foundation**: Added lavender glass welcome UI, dark mode, and auto theme by local time.

For detailed design rationale, see the [Design Notes Index](docs/design_notes/README.md).

## Status

Mindful Health Balance is a personal research/prototype app.

- Static web app
- Local-first
- User-owned data
- Rule-based reflection
- Non-medical
- Not a therapy or diagnosis tool
- Not a machine learning model

## License / Ownership

License not specified yet.
