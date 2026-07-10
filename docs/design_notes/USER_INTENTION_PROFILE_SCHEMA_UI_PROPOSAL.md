# User Intention Profile Sheet / Schema and UI Proposal

Status: U1 docs-only schema and UI proposal

Scope: Define the future optional `User_Intention_Profile` workbook contract and the minimal "ทำความรู้จักกันก่อน" UI structure before any runtime, storage, workbook, export, or import change.

Related note: [USER_INTENTION_PROFILE_LAYER.md](USER_INTENTION_PROFILE_LAYER.md)

## 1. Purpose

U1 locks the proposed sheet contract, allowed profile keys, import/export semantics, and UI structure before MHB implements a User Intention Profile Layer.

The purpose is to make optional profile context inspectable and reversible without changing the meaning of `Daily_Log`, Reflection, Field Review, Signal Engine, or existing workbook sheets. It is a user-intention layer: a person can voluntarily tell MHB how to address them and what not to infer. It is not a system for building an identity, health, or psychological profile.

## 2. Sheet Name and Contract

Proposed sheet name: `User_Intention_Profile`

Contract principles:

- The sheet is optional.
- An older workbook without this sheet must import without error.
- An empty sheet means no profile, not an incomplete profile.
- The sheet is not an account, login, identity proof, or medical profile.
- It does not alter `Daily_Log` columns or the semantics of existing sheets.
- Values remain user-owned and are exported only through a deliberate user action.

## 3. Sheet Columns

The first version should use a simple key-value model so it remains easy to inspect in Excel and easy to extend without changing `Daily_Log`.

| Column | Meaning | Contract |
| --- | --- | --- |
| `Profile_Key` | Stable, machine-readable key. | Must be from the allowed key list or treated as unsupported on import. |
| `Profile_Value` | Optional user-provided value. | Blank means not provided; never infer a replacement. |
| `Visibility` | Intended context boundary for the key. | A descriptive use boundary, not an access-control or consent-engine claim. |
| `Updated_At` | User-visible update timestamp. | Used for audit/readability and duplicate resolution policy. |
| `Note` | Short explanation of the key or its boundary. | Must not contain a system-generated diagnosis or inference. |

### Visibility Vocabulary

| Value | Intended use |
| --- | --- |
| `ui_display` | Optional display-only use, such as a preferred name or address pattern. |
| `reflection_context` | A user-provided context that may be read only within future boundary-aware reflection policy. |
| `guardrail` | A user-provided "do not assume" boundary. |
| `optional_private` | Optional information retained locally unless the user deliberately exports it. |
| `internal_note` | Human-readable implementation or migration note; not a hidden inference channel. |

## 4. Allowed Profile Keys

All keys are optional. A blank `Profile_Value` is not a failure and must not result in a guessed value.

| Key | Suggested visibility | Meaning and boundary |
| --- | --- | --- |
| `display_name` | `ui_display` | Name the person wants shown in selected UI copy; not verified identity. |
| `address_style` | `ui_display` | Preferred template such as `พี่ {name}`, `คุณ {name}`, `{name}`, or a future validated custom form. |
| `birth_date` | `optional_private` | Full date only when the person deliberately provides a valid date. Not for age, health, identity, or psychological inference. |
| `birth_year` | `optional_private` | Year-only alternative. Use when the person provides a year but not a complete date. |
| `preferred_tone` | `reflection_context` | Voluntary writing-tone preference, not a personality or mental-health model. |
| `user_context_note` | `reflection_context` | Context the person wants available to future bounded reflection. |
| `do_not_assume_note` | `guardrail` | What NuTuenSai should not conclude, label, or infer. |
| `updated_at` | `internal_note` | Optional profile-level metadata only if a future implementation needs an explicit profile update marker in addition to row-level `Updated_At`. |

`birth_date` and `birth_year` should not normally both carry independent facts. If `birth_date` exists, `birth_year` is redundant unless a future migration/fallback contract explicitly needs it. If only a year is provided, store `birth_year` and leave `birth_date` blank.

## 5. Birth Date / Year Policy

Birth information is optional context with a deliberately narrow policy.

### UI Direction

Use a custom three-part picker rather than a large free-text date field:

- Day
- Month
- Year

The controls should be scroll/select friendly, work on mobile, and visibly permit an empty state. The person may choose a year only without having to invent a day or month.

### Normalization

- When day, month, and year are all valid, normalize to `YYYY-MM-DD` in `birth_date`.
- When only a valid year is supplied, store `birth_year` only.
- When day/month/year is incomplete, do not infer missing portions and do not write `birth_date`.
- Invalid combinations, such as 31 February, must be rejected or left unsaved as `birth_date` with a gentle field-level explanation.
- Do not silently convert an invalid date to a nearby valid date.

### Boundary

Birth information must not be used to calculate health status, produce medical advice, infer age in Reflection, infer psychological or identity traits, or automatically display an age. Any future use beyond storage would require a separate user-facing design decision and boundary review.

## 6. UI Structure / Wireframe

The future page should feel like an optional introduction, not registration.

### Welcome Entry

```text
[ เริ่มวันนี้ ]
[ ทำความรู้จักกันก่อน ]
```

Both paths are valid. The second path never blocks the first.

### Profile Page

```text
ทำความรู้จักกันก่อน

Card 1: Intro / AI-safe copy
Card 2: ชื่อที่อยากให้เรียก + รูปแบบคำเรียก + preview
Card 3: วันเกิด / ปีเกิด (optional) + โทนที่ชอบ
Card 4: สิ่งที่อยากให้ระบบรับรู้
Card 5: สิ่งที่ไม่อยากให้ระบบสรุปแทน
Card 6: บันทึก / ข้ามก่อน / ล้างข้อมูลนี้ / กลับหน้าเริ่มต้น
```

### Card 1 -- Intro / AI-safe Copy

Use this copy as the primary card:

### ทำความรู้จักกันก่อน

แอปนี้ช่วยจัดข้อมูลของพี่ให้ AI อ่านได้ปลอดภัยขึ้น โดยยังให้ข้อมูลและความหมายสุดท้ายเป็นของพี่เสมอ

NuTuenSai จะอ่านเฉพาะข้อมูลที่พี่บันทึกไว้ ไม่เดาใจ ไม่วินิจฉัย ไม่ให้คะแนน และไม่สรุปแทนพี่

พี่จะบอกชื่อ โทนที่ชอบ หรือสิ่งที่ไม่อยากให้ระบบสรุปแทนก็ได้
ทุกอย่างเป็น optional และแก้ไขได้เสมอ 🩵

### Card 2 -- Name and Address

Fields:

- `ชื่อที่อยากให้เรียก`
- `รูปแบบคำเรียก`
  - `พี่ {name}`
  - `คุณ {name}`
  - `{name}`
  - `custom` (future validated custom form)

Preview:

> ตัวอย่าง: พี่ pnat อยากให้หนูอ่านจังหวะน้ำจากมุมไหนคะ

If the name is blank, the preview must use the normal fallback rather than display `{name}`.

### Card 3 -- Optional Personal Context

Fields:

- `วันเกิด / ปีเกิด ถ้าอยากให้บันทึกไว้`
- Three-part day/month/year picker direction
- `โทนที่ชอบ`

The date controls should sit behind an explicit optional label. They must not occupy the visual importance of the name or boundary fields.

### Card 4 -- What NuTuenSai Should Know

Textarea label:

> สิ่งที่อยากให้ระบบรับรู้

This maps to `user_context_note` and should gently remind the person to include only what they want to provide.

### Card 5 -- What NuTuenSai Should Not Assume

Textarea label:

> สิ่งที่ไม่อยากให้ระบบสรุปแทน

This maps to `do_not_assume_note`. It is a user-owned guardrail, not a request for the system to reason around the boundary.

### Card 6 -- Actions

- `บันทึกข้อมูลนี้`
- `ข้ามก่อน`
- `ล้างข้อมูลนี้`
- `กลับหน้าเริ่มต้น`

`ข้ามก่อน` and `กลับหน้าเริ่มต้น` must be as understandable as save. `ล้างข้อมูลนี้` should affect profile context only and may require a clear, calm confirmation in a future runtime slice.

## 7. UI Copy Rules

The page should be short, warm, and non-technical.

Use phrases such as:

- `ข้อมูลที่อยากให้ระบบรู้จัก`
- `ข้อมูลที่พี่เลือกบอกระบบ`
- `ข้ามก่อนก็ได้`
- `แก้ไขได้เสมอ`

Avoid calling the surface a "profile" in primary Thai UI unless a technical setting page needs the term.

Never use:

- `จำเป็นต้องกรอก`
- `ยืนยันตัวตน`
- `โปรไฟล์สุขภาพ`
- `ระบบจะรู้จักคุณ`
- `เพื่อวิเคราะห์ตัวตน`
- `กรอกให้ครบ`

## 8. Save / Update / Clear Semantics

This section is future behavior specification only.

### Save

- Save only values that the person intentionally provides.
- Blank values must not create a claim, placeholder, or inferred value.
- Update visible `Updated_At` only when the person saves a real profile update.
- A save should be atomic from the user's point of view: the UI should not show a half-saved address pattern with an old name.

### Update

- Update a known `Profile_Key`; do not create uncontrolled duplicate rows for the same key.
- Once saved, a changed display name may update permitted UI copy immediately.
- A changed `address_style` must pass fallback validation before it changes display text.

### Clear

- Clearing profile context does not delete `Daily_Log`.
- It does not delete Reflection or Field Review data.
- It removes only local `User_Intention_Profile` values or the equivalent future local profile state.
- After clear, UI falls back naturally to `พี่`.

## 9. Export / Import Semantics

### Export

Recommended policy: create `User_Intention_Profile` only when at least one profile value exists or the person explicitly saves profile data. This avoids adding an empty sheet to workbooks for people who chose to skip onboarding.

When the sheet is present, export only allowed keys and their explicit values. Do not export derived age, inferred traits, hidden history, or a copy of unrelated Daily_Log data.

### Import

- A workbook without the sheet must import normally.
- An empty sheet must result in no profile.
- Unsupported or malformed `Profile_Key` values should be ignored with a future user-readable import note; they must not become runtime fields automatically.
- Duplicate known keys require a deterministic policy: prefer the row with the latest valid `Updated_At`; if timestamps are missing or tied, use the final valid row in workbook order and record the policy in implementation documentation.
- Invalid `birth_date` values must not be normalized by guessing.
- Missing, blank, or malformed `address_style` must fall back to `พี่` rather than break copy.

## 10. Personalization Use Cases

Limited display-name use may be appropriate in:

- Welcome copy.
- Selected Reflection openings.
- Selected Field Review questions.
- Selected closing notes.

It is not appropriate in:

- Every sentence or every card.
- Signal Engine calculations or relationship ranking.
- Medical wording, diagnosis, health thresholds, or treatment framing.
- Scores, productivity interpretation, or spiritual interpretation.
- Hidden inference or a change to the truth of user-recorded data.

## 11. Backward Compatibility

Future implementation must preserve these conditions:

- Old workbooks without `User_Intention_Profile` work unchanged.
- An empty profile works unchanged.
- Blank or malformed `address_style` falls back safely.
- Removing a profile sheet from a workbook results in no profile rather than an import error.
- `Daily_Log` schema does not change.
- Existing workbook sheets do not change until their dedicated implementation phase.
- A user can continue using MHB fully with no profile at all.

## 12. Future Implementation Plan

### U1 -- Schema/UI Proposal

Current patch. Define the contract, keys, sheet behavior, and UI before implementation.

### U2 -- UI-only Static Profile Page Scaffold

Build the visible optional page and navigation path without persistence, export, or personalization effects.

### U3 -- Local Profile State Save / Update / Clear

Add local-only profile state with safe fallback, clear behavior, and no impact on Daily_Log.

### U4 -- Workbook Export / Import Sheet

Implement `User_Intention_Profile` export/import with old-workbook compatibility and schema documentation.

### U5 -- Limited Name Use

Apply display name/address style only in selected Welcome, Reflection, and Field Review copy.

### U6 -- QA: Old Workbook, Privacy, and Copy

Test migrations, empty states, duplicate keys, clear behavior, export/import, privacy copy, and non-inference boundaries.

## 13. Future QA Checklist

- [ ] Skip profile.
- [ ] Save `display_name` only.
- [ ] Save `address_style` without a name.
- [ ] Reject or safely fall back from invalid custom `address_style`.
- [ ] Save a full valid `birth_date`.
- [ ] Save `birth_year` only.
- [ ] Keep an incomplete birth date blank rather than guessing.
- [ ] Reject an invalid date.
- [ ] Save `preferred_tone` only.
- [ ] Save `do_not_assume_note` only.
- [ ] Clear profile context without touching Daily_Log, Reflection, or Field Review.
- [ ] Import an old workbook without a profile sheet.
- [ ] Import a workbook with a valid profile sheet.
- [ ] Export without a profile.
- [ ] Export with a profile.
- [ ] Fall back to `พี่` cleanly.
- [ ] Make no medical, identity, or psychological claims.
- [ ] Preserve user ownership and avoid data-ownership confusion.

## Out of Scope for U1

- Runtime page, picker, local profile state, or personalization.
- New workbook sheet or changes to export/import code.
- Changes to `script.js`, `style.css`, `index.html`, or configuration files.
- Identity verification, accounts, cloud sync, analytics, or a backend.
- Medical, psychological, age, or identity inference.
