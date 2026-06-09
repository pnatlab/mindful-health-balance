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
