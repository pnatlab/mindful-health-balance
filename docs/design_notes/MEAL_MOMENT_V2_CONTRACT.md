# Meal Moment v2 — approved S0–S4 contract

Approved product decision: a meal is a human-authorized record of what the person ate, not a required decomposition of its ingredients. Minimum sufficient data, maximum continuity.

## Scope and authority

S0 documents this contract; S1 implements safe local persistence; S2 implements manual entry and saved presentation. S3 adds optional local Vision name suggestions with explicit name-only acceptance. S4 adds an export-only Meal_Log worksheet. S5 (human field acceptance) remains deferred. The public release badge is not changed by this bounded implementation.

`mhb_meal_records_v1` remains the only canonical Meal store. There is no second store, bulk migration, startup rewrite, automatic repair, or automatic save. Daily Log, workbook import, Reflection generator/Roots/signals, and AI provider/parser/model authority remain unchanged.

## New record contract

- `record_schema_version: "2"` identifies new Meal Moments. Food Reference `MEAL_SCHEMA_VERSION: "1"` remains independent.
- Required: stable `meal_id`, normalized valid ISO local-calendar `date`, and trimmed nonblank human-entered or explicitly human-accepted/edited `meal_name`.
- Optional classification uses existing `meal_type`; default `unspecified`.
- Optional occasion uses existing `meal_label`; default `unnamed`. `custom_meal_label` remains supported.
- Optional `time` defaults to `""`; newly supplied time must match 24-hour `HH:mm`. No current-time inference.
- `items: []`; no ingredient creation, named-dish reference, sodium evidence, or inferred classification/occasion/time.
- `created_at` and `updated_at` are system save metadata, not meal time.

An unversioned legacy composition still requires its historical ID/date and at least one valid item for read projection. No fallback food name is persisted. Unsupported versions are not treated as v2 or legacy.

## Safe read and mutation

Reads are projections only. Targeted writes preserve untouched array entries as their exact original JSON substrings, including unsupported/malformed records, formatting, duplicate properties, and numeric spellings that JSON.parse/JSON.stringify could otherwise change. The outer array delimiters may be reconstructed; preserved entry tokens are unchanged.

A legacy metadata edit patches only explicitly changed top-level fields plus `updated_at`. Unchanged properties retain their original JSON text, including nested Meal Items and evidence. IDs, `created_at`, and record version cannot be replaced by updates. Editing another record never upgrades a legacy record.

An unsupported/malformed target, ambiguous duplicate identity/property, unreadable/non-array canonical JSON, denied storage access, missing storage API, changed storage snapshot, or failed storage write returns an explicit `{ ok: false, code }` outcome. No repair/reset occurs. Valid unrelated records can still be saved when unsupported entries can be preserved exactly. Whole-store `setMealRecords` replacement is disabled with `bulk_write_disabled`; callers must use targeted mutations.

Successful mutations return `{ ok: true, meal }` (create/update) or `{ ok: true, mealId }` (delete). Failed saves retain the draft and show failure, never successful-save feedback. There is no cross-tab transaction lock: a pre-write comparison detects an intervening change but cannot make localStorage compare-and-set atomic.

## Active manual entry

Today opens a compact Food Name field, optional existing photo entry with inline name suggestions, a collapsed native Additional details disclosure, and Save. Food Name alone is sufficient. No ingredient, portion, preparation, sodium, named-dish, or draft-Reflection action is required or shown in the active manual form.

Saving an unnamed historical record through this form requires a human-entered name. The form edits metadata only and preserves hidden items, evidence, notes, confirmed references, condiment knowledge, and custom occasions. Untouched historical time is retained; newly supplied time is validated.

Post-S4 recording-date repair: `appState.date` owns the shared selected date shown in the header and passed to Meal Composer. Local calendar rollover is checked at focus/visibility/control/save boundaries, not by a polling loop. Clean forms follow Today; unsaved Daily/Meal drafts retain date and content until an explicit choice. An overnight Meal Save can use Today via a target date bound only to that pending Save, without moving a dirty Daily form or writing either source or destination Daily draft. The Meal confirmation shows its actual saved date; after success a clean Daily form may follow Today by reading the destination. Deliberately kept dates remain selected. Shared date transitions never persist blank/destination Daily drafts; a conflicting destination requires explicit consent to retain the source and open the existing destination for review, pausing the current Daily Save. Cancel leaves both drafts intact. Existing Meal edits pin their saved date and must finish/cancel before a shared date change. The model's preserve-draft date option increments its existing revision and the UI invalidates Vision/naming sessions; successful Save also invalidates pending callbacks. Meal persistence/schema and historical item preservation remain unchanged. Unsaved Meal drafts are still in-memory; date-scoped Daily drafts are not a cross-day recovery system. See [the integrity addendum](DAILY_LOG_PERSISTENCE_INTEGRITY_AUDIT.md) for R2 collision and write-failure decisions.

Saved cards and History show names prominently, with optional recorded metadata. Unnamed historical records use a read-only component display fallback. Historical details remain inspectable. Name-only records have no zero-item message, empty plate, or sodium implication.

Today counts include both accepted record forms. Saved Reflection cues display at most four name/fallback entries; individual displayed names are bounded to 160 Unicode code points with a visible ellipsis, without changing storage. Item fallback is retained for unnamed historical meals. These are post-generation presentation facts, never generator input or saved Reflection text. The old transient item-based draft helper remains internal and is deferred from active entry.

## Optional Vision name acceptance — S3

The existing prepared-image handoff runs one local Vision observation through the unchanged provider/parser/schema. The retained deterministic review model supplies bounded naming evidence internally. The existing `mealNameProposal.mjs` adapter then makes one text-only local naming request through the existing model; validated candidates appear inline beside Food Name. No additional image inference is added.

Arrival/display is transient and never overwrites Food Name or writes the Meal store. Explicit candidate selection uses the existing proposal session to copy only its name into the ordinary editable Food Name field, including when that field already has text. A separate explicit Save persists the final human wording through the unchanged v2 runtime. No accepted-proposal status or AI evidence is persisted. Classification, occasion, date, time, notes and all historical fields remain under their existing authority.

The active ingredient review/Apply UI is removed. Its internal review builder and historical modules remain reusable, but no active path calls ingredient application. New records still have `items: []` and no named-dish reference. S2's disabled Apply transition is superseded by this name-only boundary.

Existing request IDs, naming coordinator cancellation, and proposal session resets are extended with a transient model draft revision. Image replacement/new request, explicit retry, date change, edit/cancel/reset, successful Save, destruction and language change invalidate old work. The preparation bridge listener/token is also destroyed at invalidation. Late callbacks cannot publish candidates for another draft; candidate buttons carry their naming request ID. Async updates replace only AI slots, preserving the native Food Name input and ongoing typing/IME. Selection returns focus to Food Name. One persistent polite status region announces changed states.

Insufficient evidence, invalid naming output, unavailable providers, cancellation and stale results leave manual entry usable. There is no automatic retry. Explicit naming retry reuses the validated observation; only a deliberate image retry reruns observation. The single normal preparation entry and explicit native file fallback remain.

## Excel Meal_Log — S4 export-only boundary

The existing Export Master Excel action appends `Meal_Log` to each newly generated workbook. It uses `getMealCompositionStore().inspectStorage()` and the pure `js/mealExcelBridge.js` adapter. Only saved canonical Meal Instances are eligible. No drafts, AI sessions, Vision vocabulary, Reflection or Daily Log data supplies Meal rows, and no export path writes Meal storage.

| Stable header | Saved field / mapping |
| --- | --- |
| Meal_ID | meal_id, stable record identity |
| Date | runtime-normalized ISO YYYY-MM-DD calendar text |
| Food_Name | meal_name, blank when absent in legacy history |
| Meal_Type | meal_type |
| Meal_Period | meal_label |
| Custom_Meal_Period | custom_meal_label |
| Meal_Time | time, or blank |
| Created_At | created_at, or blank |
| Updated_At | updated_at, or blank |
| Record_Schema_Version | record_schema_version, blank for unversioned history |
| Item_Count | count of existing accepted Meal Items, historical metadata only |

One row represents one saved Meal Instance. Date, time and names may repeat; no merge or deduplication occurs. Ordering reuses the runtime's date/time/creation/ID order. Original metadata blanks remain blank rather than receiving UI normalization defaults. No name fallback, timestamps-as-meal-time, sodium, ingredient/evidence detail, images or AI confidence are exported. The worksheet is a readable contextual projection, not a complete Meal backup.

Export inspects every original array entry, not only the filtered UI projection. Unreadable/non-array JSON, unsupported or invalid records, duplicate Meal IDs, ambiguous duplicate properties, nonrepresentable metadata, invalid ISO dates, or filtered invalid items block the entire export action with a non-destructive localized message. Empty/missing valid storage is allowed. No records are silently skipped, repaired or rewritten. Stored metadata beyond Excel's text-cell limit also blocks projection.

Export is eligible with saved Daily Log rows, saved Meals, or both. With Meals only, Daily_Log and Reflections contain headers only; existing Summary/Field_Review empty-input behavior is preserved, with zero counts and blank period bounds. No synthetic daily row or signal is created. Existing sheets, their order/calculations and optional User_Intention_Profile remain intact; Meal_Log is appended. Column_Guide explains each Meal column and its export-only authority. No Master workbook or template is opened or changed.

Import reads/validates Daily_Log before a row-count/replacement preview and retains the optional profile's separate confirmation/outcome. Meal_Log is never parsed into Meal records, merged, cached or written to browser Meal storage. Before consent, TH/EN/ZH copy states whether it is present/excluded and cannot restore full Meals; absence also leaves Meals unchanged. A Meal-only workbook's empty Daily_Log cannot replace a populated local Daily Log. Empty-to-empty import stays empty. Required Daily persistence is verified before success and malformed-storage raw-backup recovery remains guarded. See [the Excel boundary](EXCEL_COLUMN_GUIDE_DESIGN.md) for the current import repair; earlier replacement behavior is historical.

Success messaging distinguishes Daily-only, Meal-only and combined exports and appears only after workbook generation and download initiation return successfully. This cannot confirm that a human retained the downloaded file. The existing SheetJS browser-library availability requirement remains unchanged.

## Review boundary

Older application code rejects name-only records and may discard them on subsequent writes; downgrade writes are unsupported once v2 records exist. Human review and field acceptance remain required before publication.
