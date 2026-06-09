# v1.9.3 — Structured Sleep & Run Detail

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

The panel should be compact and optional.

Suggested UI:

- Title TH: รายละเอียดการวิ่งวันนี้ (เติมถ้ามี)
- Distance: ระยะทาง (km)
- Duration: เวลา (นาที)
- Sweat: เหงื่อ with low / medium / high options
- Avg pace may be derived/displayed if distance + duration are available

New optional field:

- `Run_Detail_JSON`

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
