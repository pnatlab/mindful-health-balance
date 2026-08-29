# Daily Log Persistence Integrity Audit

## Purpose

This forensic note records the investigation of a field incident in which the Log view showed approximately one recent row while a protected Master workbook still contained the historical Daily Log. Importing that workbook restored approximately 77 visible rows. The audit does not modify runtime behavior, browser data, storage schemas, launcher behavior, or the protected workbook.

The governing rule is: a missing row in the current view is not automatically a deleted row. Storage partition, parsing, key drift, and overwrite paths must be separated before any recovery or migration patch.

## Protected Evidence

`Mindful_Health_Balance_Master.xlsx` is ignored by Git and treated as a protected user artifact. The audit inspected a temporary read-only copy and verified the source SHA-256 before and after inspection. No personal row content was used as a fixture or copied into this note.

The protected workbook contains eight sheets: `Daily_Log`, `Summary`, `Reflections`, `Field_Context`, `Field_Review`, `Column_Guide`, `AI_Context`, and `User_Intention_Profile`. `Daily_Log` contains 77 data rows, 77 unique dates, 33 current headers, and a date range from 2026-05-20 through 2026-08-21. This metadata is consistent with the reported successful recovery.

## Current Data Architecture

The canonical runtime Daily Log is the JSON array in browser `localStorage` under:

`mindfulHealthDailyLog`

The key is scoped to the browser origin. It is separate from the date-scoped current-form draft keys, meal records, vocabulary evidence, and workbook files. No `sessionStorage` or IndexedDB layer participates in Daily Log persistence.

Current flow:

```text
localStorage[mindfulHealthDailyLog] at the current origin
  -> getDailyLog()
  -> Daily Log table / Field Review / export

Save Today
  -> getDailyLog()
  -> exact Date lookup
  -> append new date or confirm and merge same date
  -> normalize/sort
  -> replace the JSON array at the same localStorage key

Master Excel import
  -> parse Daily_Log and optional Reflections/User_Intention_Profile sheets
  -> normalize rows
  -> confirm if local rows already exist
  -> replace the Daily Log JSON array at the current origin

Master Excel export
  -> read the current origin's Daily Log array
  -> build a downloadable workbook
```

Excel is a portable export/backup/recovery bridge, not the live canonical store and not an automatic sync source. Import persists parsed rows back into the current origin's browser storage.

## Origin and Port Evidence

Browser storage is origin-scoped. Scheme, hostname, and port all participate in origin identity.

An isolated temporary Chrome profile produced this result using a synthetic probe key:

| Navigation | Probe result |
| --- | --- |
| `http://127.0.0.1:4173`, then reload | original value remained |
| `http://127.0.0.1:4174` | no 4173 value |
| `http://localhost:4173` | no `127.0.0.1:4173` value |
| `file://...` | separate from the HTTP values |
| return to `http://127.0.0.1:4173` | original 4173 value remained |

Therefore a Daily Log saved at `127.0.0.1:4173` is not visible at `127.0.0.1:4174`, `localhost:4173`, or file mode. Chrome's exact persistence policy for file URLs is implementation-dependent, so file mode must not be treated as a portable canonical origin.

## Launcher History

The Daily Log key has been `mindfulHealthDailyLog` since the initial commit. Git history shows no rename or old-key migration gap.

The bounded launcher port sequence `4173 4174 4175 4176` was introduced in commit `e0c9d7f` (MHB 2.5 local launcher). Commit `927a465` extracted the same behavior into the shared launcher used by both the `.command` and generated `.app`; it did not change Daily Log storage.

The launcher always uses hostname `127.0.0.1`, but it can select a fallback port when an earlier port is occupied. It chooses the first free port while iterating. This means it can open a different storage partition even when historical rows remain intact in another port's partition. A later launch may also return to 4173 after an earlier collision disappears.

Recent documentation, branding, Meal Composer, Vision, and Drink acknowledgement commits did not change the Daily Log key, load/save functions, or import/export functions.

## Startup and Save Safety

Startup reads the date-scoped current-form draft, may restore today's saved Daily Log row into that draft, renders the interface, and renders the Daily Log table. Normal startup does not call `setDailyLog()` and does not persist an empty Daily Log before reading storage.

Saving a new date reads the complete array, appends one row, normalizes/sorts it, and writes the complete array back. An isolated 77-row fixture plus one new date produced 78 rows with all historical identities preserved. Saving the same date updates the matching row after confirmation and does not intentionally remove other dates.

Dates use local-calendar `YYYY-MM-DD` identity via `toLocaleDateString("en-CA")`. Same-day matching is exact string equality. Imported duplicate dates are not deduplicated: import preserves both, and a later same-date save updates only the first match.

## Import and Recovery Semantics

Import is confirmed replacement, not merge or append. If local rows exist, the user is asked whether to overwrite them with the workbook. On confirmation, all parsed workbook rows replace the current origin's Daily Log array. A synthetic 77-row import persisted across a new storage read, and a subsequent new-day save produced 78 rows without losing imported history.

The recovery symptom is consistent with this sequence:

1. MHB opens at an origin without the historical partition.
2. A new row is saved there, so the Log view shows approximately one row.
3. Master Excel import is confirmed.
4. The workbook's 77 rows replace that origin's one-row array and remain visible.

This mechanism explains the observed behavior without requiring deletion of the original partition.

## Secondary Risk: Malformed Storage

`getDailyLog()` returns an empty array when JSON parsing fails or the stored value is not an array. Reading alone does not overwrite the malformed value. However, a later Save or confirmed Import writes a new array to the same key, which can overwrite the only malformed copy without preserving forensic evidence.

This fail-open path was reproduced in isolated storage and is a real integrity risk, but there is no evidence that malformed JSON caused this incident.

## Classification and Confidence

Classification: **DATA VISIBILITY / STORAGE PARTITION is the most likely incident class**.

Confidence in the browser mechanism: **HIGH**. Exact port and hostname isolation were reproduced in a temporary profile.

Confidence that origin switching was the historical incident's exact cause: **MEDIUM**. The symptom and launcher behavior match, but no browser-origin snapshot from the incident remains. True deletion, manual Clear Daily Log, malformed storage, or a different browser profile cannot be conclusively excluded from current evidence.

## Recommended Phase B

The smallest safe Phase B should prevent silent origin changes before considering storage migration:

1. Give the shared launcher a stable remembered MHB origin and reuse it on later launches.
2. If that origin is unavailable, fail clearly instead of silently opening another port's empty partition.
3. Provide a read-only recovery diagnostic that lists the current origin and local Daily Log count without clearing, importing, or promoting data.
4. Handle malformed Daily Log storage fail-closed: preserve the raw value and block overwrite until the user exports/reviews recovery options.

Cross-origin migration, file-backed canonical storage, import merge semantics, and duplicate-date cleanup require separate contracts. They should not be bundled into the launcher safety patch.

## Boundaries

Phase B must not rename the storage key, silently copy or merge personal logs, alter workbook rows, clear any origin, change date identity, or turn Excel into an automatic sync source. Any recovery action must remain explicit and human-owned.

## Unresolved Evidence

The incident origin, port, hostname, browser profile, and raw storage value were not captured before recovery. Those facts are no longer recoverable from the workbook alone. If the symptom recurs, record the full address bar origin, browser/profile, local Daily Log count, and whether ports 4173-4176 are occupied before importing or saving anything.
