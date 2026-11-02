# Excel Column Guide Design

## Current S4 addition — export-only Meal_Log

Generated workbooks now append Meal_Log, preserving existing sheet order, Daily_Log headers and all derived calculations. Export accepts saved Daily Log rows, saved Meals, or both; existing empty-input builders support meal-only exports without synthetic daily records.

Column_Guide adds eleven stable Meal_Log column entries, marked as export projections rather than workbook import authority. They explain saved meal-level identity/context, blank names for legacy meals, blank optional metadata, historical-only Item_Count, and that Meal_Log is neither imported nor sufficient to restore full Meals. Existing guide rows are unchanged. Full schema, canonical inspection and fail-closed policy are recorded in [MEAL_MOMENT_V2_CONTRACT.md](MEAL_MOMENT_V2_CONTRACT.md).

No workbook/template file is opened or modified. Import remains Daily_Log plus the existing optional profile boundary, with an explicit localized notice when Meal_Log is excluded. The earlier guide design below is retained.

Post-S4 import safety: parse and validate Daily_Log headers/rows before consent. The preview states existing/incoming row counts, whole-array replacement and Meal_Log presence/exclusion. Populated-to-empty replacement is blocked with no override; empty-to-empty stays zero rows. Cancel writes nothing. The required Daily Log write is checked against the inspected raw value and verified by readback before success; optional profile consent/outcome remains separate. There is no multi-key/cross-tab transaction guarantee. Malformed canonical storage still requires an exact raw backup and explicit recovery. No Meal import, workbook schema change or protected-file mutation is introduced.

R2 validates nonblank cells in the nine existing `number` columns before normalization and replacement consent: Sleep_Hours, Water_ml, Sweet_Drinks_Count, Sugar_Score, Caffeine_Score, Milk_Drink_Count, Hydration_Support_Count, Load_Score and Practice_Minutes. Finite numbers and existing finite numeric-text representations are supported, as are optional blanks. Existing duration bounds remain (sleep 0–16 hours; practice 0–1440 minutes); no extra ranges or Daily_Log schema are introduced. Invalid values fail with a localized Daily_Log row/column message, never cell contents, and no canonical write. The preview also identifies the sanitized selected filename as plain text. A new selection invalidates older pending reads and their statuses; one terminal callback may act per read. The actual validated workbook and its generation, rather than the filename, bind consent to the write. A completed authorized import is not rolled back if a later selection is canceled.

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
- `Meal_Log` (S4 export-only saved meal projection)

`Daily_Log` remains the primary canonical data table for import and future parser stability.

Since v1.9.3, `Column_Guide` also documents optional structured fields:

- `Sleep_Hours`: self-reported sleep duration used to derive the existing `Sleep` category gently.
- `Run_Detail_JSON`: optional running context for load, hydration, and recovery. It is not training advice, pace judgment, or performance coaching.
- `Practice_Root`, `Practice_Type`, `Practice_Minutes`, and `Practice_Context_JSON`: optional v1.9.9 mindful practice context stored for future Field Review. These fields are not daily Reflection inputs, not spiritual scoring, and not practice-quality judgment.

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
