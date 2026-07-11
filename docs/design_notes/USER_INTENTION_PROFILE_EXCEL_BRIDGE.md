# User Intention Profile Excel Bridge

## 1. Status

- Slice: U4.0
- Patch type: docs-only architecture note
- Status: Draft for Human Review
- Runtime implementation: none
- Workbook implementation: none

This note records the current User Intention Profile runtime state and the decisions that must be made before adding any Excel export/import bridge.

## 2. Purpose and Boundary

The Excel bridge would make the User Intention Profile portable as user-owned context. The browser and workbook would act as storage or transport surfaces; the user remains the owner of the profile. AI, NuTuenSai, Codex, or a future Local LLM Lab may consume the profile only within explicit scope.

The profile may support:

- Addressing and greeting style.
- Deterministic tone preferences.
- Explicit user-provided context.
- Explicit user-owned boundaries such as what not to assume.

The profile must not change:

- Source facts.
- Evidence selection.
- Health calculations.
- Signal Engine logic.
- Reflection Root selection.
- Daily_Log records.
- Safety boundaries.

The profile is an alignment aid, not an identity model, medical profile, psychological profile, or personality model.

## 3. Current Runtime Audit

Current runtime source checked:

- `script.js`
- `index.html`
- `docs/design_notes/USER_INTENTION_PROFILE_LAYER.md`
- `docs/design_notes/USER_INTENTION_PROFILE_SCHEMA_UI_PROPOSAL.md`
- `docs/design_notes/USER_INTENTION_ALIGNMENT_BRIDGE.md`

Current localStorage key:

`mhb_user_intention_profile_v1`

| Field | Status | Owner | Current use | Notes |
| --- | --- | --- | --- | --- |
| `schemaVersion` | Active system-managed | Runtime | Stored in local profile object via default profile | Uses `USER_INTENTION_PROFILE_SCHEMA_VERSION`; currently a browser profile version, not an Excel contract. |
| `displayName` | Active user-provided | User | Profile preview and Daily Reflection addressing | Blank means fallback to default voice. |
| `addressStyle` | Active user-provided enum | User | Profile preview and Daily Reflection addressing | Active values are `senior_name`, `polite_name`, and `name_only`. |
| `preferredTone` | Active user-provided enum | User | Daily Reflection opening/closing only | Active values normalize to blank, `gentle`, `concise`, `data_first`, `friendly`, or `mindful`. |
| `userContextNote` | Active user-provided, currently stored only | User | Saved/loaded in browser profile form | Not used in Reflection body in current runtime. Must not become a hidden prompt without bounded design. |
| `doNotAssumeNote` | Active user-provided, currently stored only | User | Saved/loaded in browser profile form | Not parsed into Reflection in current runtime. Future use should be deterministic and bounded. |
| `birthDate` | Active user-provided, currently stored only | User | Saved only when full valid date exists | Normalized as `YYYY-MM-DD`; not used for age, health, identity, or Reflection. |
| `birthYear` | Active user-provided, currently stored only | User | Saved only when year-only path is used | Not used for age, health, identity, or Reflection. |
| `updatedAt` | Active system-managed | Runtime | Set on successful save | ISO timestamp from browser runtime. |
| `customAddressStyle` | Compatibility-only | Runtime compatibility | Preserved in normalized object if old storage contains it | No active UI. No active Reflection custom path. |
| `custom` address style | Removed/deprecated | Historical runtime/UI | Legacy value normalizes to `senior_name` | Do not reintroduce into the Excel bridge automatically. |
| `source_bound_only` | Future-only | Future contract | Not present in current runtime profile object | Mentioned in alignment bridge design note as future direction. |
| `human_review_required` | Future-only | Future contract | Not present in current runtime profile object | Mentioned in alignment bridge design note as future direction. |
| `profile_schema_version` | Future-only | Future contract | Not present in current runtime profile object | Do not treat as runtime fact. |

## 4. Current Addressing and Clear Behavior

Active addressing enum:

- `senior_name` -> `พี่ {name}` in preview/opening; short address can be `พี่`.
- `polite_name` -> `คุณ {name}` in preview/opening; short address can be `คุณ`.
- `name_only` -> `{name}` in preview/opening; body prefers neutral wording.

Current fallback behavior:

- No profile or blank `displayName` -> default fallback uses `พี่`.
- Invalid or missing `addressStyle` -> `senior_name`.
- Legacy `addressStyle: "custom"` -> `senior_name`.
- Legacy aliases `sibling`, `formal`, and `name` normalize to `senior_name`, `polite_name`, and `name_only`.
- Malformed localStorage JSON returns a default blank profile and shows a non-destructive notice when the profile page asks for it.

Custom addressing status:

- The UI custom option has been removed.
- The custom input field has been removed.
- `customAddressStyle` remains only as a compatibility field when old localStorage exists.
- The current Excel bridge must not add custom addressing back unless a future human-approved design reintroduces a validated contract.

Clear behavior:

- Saved profile clear calls `localStorage.removeItem(USER_INTENTION_PROFILE_KEY)`.
- It resets the UI form to the default profile.
- It does not clear Daily_Log, Reflection, app settings, theme, language, workbook data, or export data.
- After clear, Reflection falls back to default behavior because no active profile is loaded.
- There is also a UI-only form clear helper for draft form values; it resets visible form controls and does not touch stored profile data.

Version behavior:

- Runtime stores `schemaVersion` in the browser profile object.
- The current runtime does not use an Excel-specific profile version field.
- A workbook bridge should not rename or add version fields until U4.1 decides the sheet shape and import/export semantics.

## 5. Ownership and Source-of-Truth Direction

### Confirmed From Runtime

- The browser localStorage profile is the only implemented storage for User Intention Profile.
- The profile is optional.
- Daily Reflection reads the profile only for Thai addressing and deterministic tone framing.
- User notes are protected from addressing replacement.
- Profile data does not change facts, root selection, evidence, calculations, export schema, or Field Review.

### Proposed For U4

- Treat Excel as a portable user-owned profile packet.
- Treat explicit export/import as a user-initiated bridge, not automatic synchronization.
- Preserve local-first behavior: workbook import/export should not imply cloud sync, account identity, or ownership transfer.
- Keep profile facts readable for humans and parsers.

### Open Decision For Human Review

The bridge should not choose an overwrite, merge, or synchronization policy automatically. Browser profile and workbook profile may diverge. U4.1 should decide how the app asks the user before replacing, merging, or ignoring profile data.

## 6. Candidate Excel Shape

### Option A: Fixed Single-Row Sheet

Example concept:

`User_Intention_Profile`

Columns could mirror runtime fields such as `Schema_Version`, `Display_Name`, `Address_Style`, `Preferred_Tone`, `User_Context_Note`, `Do_Not_Assume_Note`, `Birth_Date`, `Birth_Year`, and `Updated_At`.

Tradeoffs:

- Simplicity: high.
- Human readability: high for one profile.
- Backward compatibility: moderate; adding fields creates new columns.
- Unknown field handling: limited.
- Local LLM readability: high.
- Over-design risk: low.

### Option B: Key-Value Sheet

Example concept:

`User_Intention_Profile`

Columns could include `Profile_Key`, `Profile_Value`, `Value_Type`, `Use_Scope`, `Updated_At`, `Active`, and `Note`.

Tradeoffs:

- Simplicity: moderate.
- Human readability: moderate to high if kept short.
- Backward compatibility: high; new keys can be added without changing columns.
- Unknown field handling: easier to ignore or preserve.
- Local LLM readability: high if keys and scopes are clear.
- Over-design risk: moderate if too many metadata columns are added before runtime needs them.

U4.0 does not choose between these options.

## 7. Import/Export Questions

Before U4.1 implementation, the human reviewer should decide:

- If a workbook has a profile and local browser profile also exists, should import ask before overwrite?
- If a workbook has no profile sheet, should import preserve the local profile unchanged?
- Should partial profile data merge into local profile, replace the whole profile, or be ignored?
- How should malformed or unknown fields be handled?
- Should compatibility-only fields such as `customAddressStyle` be exported at all?
- Should `birthDate` and `birthYear` be included in v1, or deferred because they are currently unused?
- Should the workbook version field be `schemaVersion`, `Profile_Schema_Version`, or another explicit workbook column/key?
- Should `userContextNote` and `doNotAssumeNote` export by default, or require an explicit user choice?
- Should export create an empty `User_Intention_Profile` sheet when no profile exists?

These are policy decisions, not implementation details for Codex to infer.

## 8. Non-goals

U4.0 does not implement:

- Export/import code.
- Workbook sheet creation.
- Runtime UI changes.
- LocalStorage migration.
- Automatic synchronization.
- Local LLM integration.
- Account, login, cloud sync, or identity verification.
- Identity, health, personality, age, or psychological inference.

## 9. Open Questions for Human Review

1. Which Excel shape should U4.1 use first: fixed single-row or key-value?
2. Should profile export happen only when a saved browser profile exists?
3. Should importing a workbook profile ever overwrite local profile without explicit confirmation?
4. Should partial profile import merge or replace?
5. Should `birthDate` and `birthYear` be exported in v1 even though runtime does not use them?
6. Should `userContextNote` and `doNotAssumeNote` be considered sensitive enough to require a separate export confirmation?
7. Should compatibility-only `customAddressStyle` be omitted from export to avoid reviving custom addressing?
8. What workbook version field name should be used?
9. Should Local LLM readability be optimized now, or deferred until the Local LLM bridge contract is implemented?

## 10. Recommended Next Step

U4.1 — Final Profile Sheet Schema and Import/Export Contract.

Do not implement U4.1 until a human reviewer approves:

- Sheet shape.
- Field list.
- Version naming.
- Import conflict policy.
- Export behavior when no profile exists.
- Treatment of optional/private fields.

