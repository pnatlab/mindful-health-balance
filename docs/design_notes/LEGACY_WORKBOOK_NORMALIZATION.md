# Legacy Workbook Normalization

## Purpose

Older Mindful Health Balance workbooks may contain placeholder or legacy artifact values in fields that should be text, list, JSON, note, or reflection content. One observed example is `28` appearing in fields such as activity, note, or reflection columns.

The app should not delete or modify the source workbook. Instead, import creates a normalized in-app row that preserves the current schema and ignores obvious artifacts where they would otherwise be mistaken for meaningful self-care signals.

## Normalization Approach

During import, the app reads workbook data by header name and maps each row into the current `DAILY_LOG_COLUMNS` shape. Missing optional fields such as `Sleep_Hours` and `Run_Detail_JSON` normalize to empty values.

For text-like fields only, obvious artifact values are treated as missing:

- `28`
- empty values
- placeholder-like values such as `undefined`, `null`, `NaN`, or `[object Object]`

This applies to fields such as:

- `Activities`
- `Drink_Profile_JSON`
- `Run_Detail_JSON`
- `Energy_Causes`
- `Mind_Note_Text`
- `Mind_Note_Feeling`
- `Mind_Note_Support`
- legacy `Support_Need`
- `Reflection_Text`
- reminder / tomorrow / hydration text fields

Numeric fields are not cleaned this way. Values such as `Water_ml`, `Load_Score`, drink scores, and other numeric columns still use their existing numeric normalization.

## Export Behavior

If a legacy workbook is imported and then exported again, the new workbook uses the current schema. Obvious artifacts ignored during import are not carried forward as meaningful text. The original workbook file remains unchanged.

## Guardrails

- Do not treat legacy artifacts as lifestyle, mind, activity, or reflection signals.
- Do not delete the source workbook.
- Do not add new columns for this pass.
- Do not use this as Previous Log Context or longitudinal analysis.
- Keep normalization descriptive and compatibility-focused.
