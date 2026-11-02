# Meal Moment v2 — approved S0–S3 contract

Approved product decision: a meal is a human-authorized record of what the person ate, not a required decomposition of its ingredients. Minimum sufficient data, maximum continuity.

## Scope and authority

S0 documents this contract; S1 implements safe local persistence; S2 implements manual entry and saved presentation. S3 adds optional local Vision name suggestions with explicit name-only acceptance. S4 (Excel Meal_Log) and S5 (human field acceptance) remain deferred. The public release badge is not changed by this bounded implementation.

`mhb_meal_records_v1` remains the only canonical Meal store. There is no second store, bulk migration, startup rewrite, automatic repair, or automatic save. Daily Log, workbook, Reflection generator/Roots/signals, and AI provider/parser/model authority remain unchanged.

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

Saved cards and History show names prominently, with optional recorded metadata. Unnamed historical records use a read-only component display fallback. Historical details remain inspectable. Name-only records have no zero-item message, empty plate, or sodium implication.

Today counts include both accepted record forms. Saved Reflection cues display at most four name/fallback entries; individual displayed names are bounded to 160 Unicode code points with a visible ellipsis, without changing storage. Item fallback is retained for unnamed historical meals. These are post-generation presentation facts, never generator input or saved Reflection text. The old transient item-based draft helper remains internal and is deferred from active entry.

## Optional Vision name acceptance — S3

The existing prepared-image handoff runs one local Vision observation through the unchanged provider/parser/schema. The retained deterministic review model supplies bounded naming evidence internally. The existing `mealNameProposal.mjs` adapter then makes one text-only local naming request through the existing model; validated candidates appear inline beside Food Name. No additional image inference is added.

Arrival/display is transient and never overwrites Food Name or writes the Meal store. Explicit candidate selection uses the existing proposal session to copy only its name into the ordinary editable Food Name field, including when that field already has text. A separate explicit Save persists the final human wording through the unchanged v2 runtime. No accepted-proposal status or AI evidence is persisted. Classification, occasion, date, time, notes and all historical fields remain under their existing authority.

The active ingredient review/Apply UI is removed. Its internal review builder and historical modules remain reusable, but no active path calls ingredient application. New records still have `items: []` and no named-dish reference. S2's disabled Apply transition is superseded by this name-only boundary.

Existing request IDs, naming coordinator cancellation, and proposal session resets are extended with a transient model draft revision. Image replacement/new request, explicit retry, date change, edit/cancel/reset, successful Save, destruction and language change invalidate old work. The preparation bridge listener/token is also destroyed at invalidation. Late callbacks cannot publish candidates for another draft; candidate buttons carry their naming request ID. Async updates replace only AI slots, preserving the native Food Name input and ongoing typing/IME. Selection returns focus to Food Name. One persistent polite status region announces changed states.

Insufficient evidence, invalid naming output, unavailable providers, cancellation and stale results leave manual entry usable. There is no automatic retry. Explicit naming retry reuses the validated observation; only a deliberate image retry reruns observation. The single normal preparation entry and explicit native file fallback remain.

## Transport and review boundary

Excel export/import does not transport Meal Moments in S0–S3. Existing workbooks/templates are untouched. Older application code rejects name-only records and may discard them on subsequent writes; downgrade writes are unsupported once v2 records exist. Human review is required before publication.
