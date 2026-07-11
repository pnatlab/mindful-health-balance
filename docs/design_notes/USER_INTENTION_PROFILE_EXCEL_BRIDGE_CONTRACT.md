# User Intention Profile Excel Bridge Contract

## 1. Status

- Slice: U4.1
- Patch type: docs-only data contract
- Status: Final contract for U4.2 export and U4.3 import implementation
- Runtime implementation: none in this patch
- Workbook implementation: none in this patch

This contract follows U4.0 and locks the v1 workbook bridge direction for human review before implementation.

## 2. Purpose

The User Intention Profile Excel bridge makes the browser-saved profile portable as user-owned context. The browser and workbook are storage and transport surfaces. The user remains the owner. AI is a consumer, not an owner.

The profile may be used only for:

- Addressing.
- Deterministic tone.
- Explicit user context.
- Explicit do-not-assume boundary.

The profile must not change facts, evidence, Reflection Root, calculations, Daily_Log, Signal Engine behavior, export schema outside this sheet, or safety boundaries.

## 3. Final Sheet Definition

Sheet name:

`User_Intention_Profile`

Shape:

- Fixed single-row sheet.
- One workbook may contain at most one profile row.
- The sheet is optional.
- The sheet represents a saved user profile snapshot, not a fallback/default profile.

Rationale:

- The current runtime stores one profile object.
- The profile belongs to one user context.
- A single row is easy to inspect in Excel.
- A single row is simpler to export/import.
- A single row is readable by a future Local LLM bridge.
- Key-value schema is deferred to avoid over-design in v1.

## 4. Column Contract

Column order is fixed in v1:

| Order | Workbook column | Runtime field | Required | Notes |
| --- | --- | --- | --- | --- |
| 1 | `Profile_Schema_Version` | `schemaVersion` | Yes | Workbook representation of current runtime profile schema version. |
| 2 | `Display_Name` | `displayName` | No | User-provided display name. Blank means no display name. |
| 3 | `Address_Style` | `addressStyle` | No | Active enum only: `senior_name`, `polite_name`, `name_only`. |
| 4 | `Preferred_Tone` | `preferredTone` | No | Active enum or blank. |
| 5 | `User_Context_Note` | `userContextNote` | No | User-provided context note. Must not become executable instruction. |
| 6 | `Do_Not_Assume_Note` | `doNotAssumeNote` | No | User-owned boundary note. Must not become unbounded prompt logic. |
| 7 | `Birth_Date` | `birthDate` | No | `YYYY-MM-DD` only. No age inference. |
| 8 | `Birth_Year` | `birthYear` | No | Year-only value. No age inference. |
| 9 | `Updated_At` | `updatedAt` | No | Timestamp from saved browser profile. |

Do not export:

| Field | Reason |
| --- | --- |
| `customAddressStyle` | Compatibility-only runtime field. Exporting it could revive removed custom addressing. |
| `source_bound_only` | Future design direction, not a current runtime fact. |
| `human_review_required` | Future design direction, not a current runtime fact. |
| `profile_schema_version` | Future design direction; v1 uses `Profile_Schema_Version`. |

## 5. Export Contract

Export is user-initiated only.

U4.2 export must follow these rules:

- Export `User_Intention_Profile` only when a saved profile exists in localStorage.
- Do not create an empty `User_Intention_Profile` sheet when no saved profile exists.
- Do not export the default profile object created by runtime fallback.
- Export only values actually saved by the user or system-managed values created by save.
- Export `User_Context_Note`, `Do_Not_Assume_Note`, `Birth_Date`, and `Birth_Year` only when saved values exist.
- Do not derive age from `Birth_Date` or `Birth_Year`.
- Do not add hidden inference fields.
- Do not change Daily_Log, Column_Guide, AI_Context, Reflections, Summary, or other existing workbook sheets.
- Existing workbooks without this sheet must remain valid.

If no saved profile exists, export proceeds without the `User_Intention_Profile` sheet.

## 6. Import Contract

Import is user-initiated only.

U4.3 import must follow these rules:

- Import must not overwrite the local browser profile automatically.
- When a valid profile candidate exists, show a preview and ask for human confirmation before replacing local profile.
- v1 uses replace semantics, not merge semantics.
- Workbook without `User_Intention_Profile` keeps the local profile unchanged.
- Empty `User_Intention_Profile` sheet keeps the local profile unchanged and reports that no profile is available to import.
- A partial row is normalized as a full profile snapshot; blank cells become blank values.
- Unknown columns are ignored and reported as warnings.
- Duplicate profile rows are rejected.
- Invalid `Address_Style` is rejected, except legacy `custom` which normalizes to `senior_name` with a warning.
- Invalid `Preferred_Tone` is rejected.
- Malformed `Birth_Date`, `Birth_Year`, or `Profile_Schema_Version` is rejected.
- Newer unsupported schema version is rejected.
- Older supported schema version may normalize through compatibility rules.

Import must never silently change the local profile.

## 7. Validation and Normalization Rules

### Profile_Schema_Version

- v1 value: `1`.
- Missing, malformed, or unsupported version rejects the import candidate.
- Runtime `schemaVersion` maps to workbook `Profile_Schema_Version`.

### Display_Name

- Text value.
- Blank is valid.
- Must be treated as user-provided display text only.

### Address_Style

Active allowed values:

- `senior_name`
- `polite_name`
- `name_only`

Compatibility rule:

- Legacy `custom` normalizes to `senior_name` with a warning.

Rejected values:

- Any other nonblank value.

### Preferred_Tone

Allowed values:

- blank
- `gentle`
- `concise`
- `data_first`
- `friendly`
- `mindful`

Any other value rejects the import candidate.

### User_Context_Note

- Text value.
- Blank is valid.
- Must not be executed as instruction.

### Do_Not_Assume_Note

- Text value.
- Blank is valid.
- Future use must remain bounded and deterministic.

### Birth_Date

- Blank is valid.
- Nonblank value must be valid `YYYY-MM-DD`.
- Invalid calendar dates reject the import candidate.
- Must not be used to infer age or health.

### Birth_Year

- Blank is valid.
- Nonblank value must be a supported year value according to runtime validation.
- Must not be used to infer age or health.

### Updated_At

- Blank is valid.
- Nonblank value should be preserved as saved metadata.
- A malformed nonblank timestamp produces a warning and the value is ignored.
- It does not reject an otherwise valid profile candidate.

## 8. Versioning Contract

Workbook field name:

`Profile_Schema_Version`

Current v1 value:

`1`

Rules:

- Do not add a second version column in v1.
- Do not export future-only `profile_schema_version`.
- U4.2 maps runtime `schemaVersion` to `Profile_Schema_Version`.
- U4.3 maps `Profile_Schema_Version` back to runtime `schemaVersion`.
- Newer unsupported versions reject import.
- Older supported versions may be normalized only through explicit compatibility rules.

## 9. Backward Compatibility

- Workbooks without `User_Intention_Profile` remain valid.
- Importing a workbook without this sheet does not clear the local profile.
- Exporting without a saved local profile does not create this sheet.
- Old browser profiles with `addressStyle: "custom"` normalize to `senior_name`; workbook v1 should not export custom addressing.
- Unknown workbook columns are ignored with warnings.
- Duplicate profile rows are rejected to preserve the one-profile snapshot model.

## 10. Privacy and AI Boundary

The profile is user-owned data.

Browser and workbook are storage/transport surfaces. AI is a consumer, not an owner.

Allowed use:

- Addressing.
- Deterministic tone.
- Explicit user context.
- Explicit do-not-assume boundary.

Forbidden use:

- Changing facts.
- Changing evidence.
- Changing Reflection Root.
- Changing calculations.
- Inferring age, health, identity, personality, diagnosis, or mental state.
- Treating raw notes as executable commands.
- Overriding source data or safety boundaries.

AI output remains a draft for human review.

## 11. Non-goals

U4.1 does not implement:

- Source code changes.
- UI changes.
- Export/import runtime behavior.
- Workbook schema code changes.
- Workbook creation.
- Migration script.
- Local LLM integration.
- Automatic sync.
- Account, cloud, login, or identity system.
- Medical, predictive, diagnostic, or scoring behavior.

## 12. Acceptance Criteria

U4.2 export and U4.3 import should be considered aligned with this contract only if:

- The sheet is named `User_Intention_Profile`.
- The sheet uses the fixed column order listed in this contract.
- Runtime fields map exactly to the workbook columns listed here.
- `customAddressStyle`, `source_bound_only`, `human_review_required`, and `profile_schema_version` are not exported.
- Export omits the sheet when no saved profile exists.
- Import never overwrites local profile without human confirmation.
- v1 import uses replace semantics, not merge.
- Missing sheet and empty sheet keep local profile unchanged.
- Invalid, duplicate, unsupported, or malformed profile candidates are rejected according to this contract.
- Legacy `custom` addressing normalizes to `senior_name` with warning.
- Workbook version field is `Profile_Schema_Version`.
- Older workbooks without the sheet continue working.

## 13. Next Steps

Next implementation slice:

U4.2 — Implement User Intention Profile Export.

U4.2 should implement export only. U4.3 should implement import after export behavior is reviewed.

Do not implement either slice until the human reviewer approves this contract.
