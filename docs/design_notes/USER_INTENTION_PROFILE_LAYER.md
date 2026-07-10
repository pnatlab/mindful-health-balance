# User Intention Profile Layer

Status: U0 design note only

Scope: Optional user-intention context for a future Mindful Health Balance onboarding and profile layer.
This note does not add a screen, local storage key, workbook sheet, export/import behavior, or runtime personalization.

## Purpose

The User Intention Profile Layer gives a person an optional, user-owned way to tell MHB how they would like to be addressed and what boundaries they want NuTuenSai to keep in mind.

Its purpose is not to make the system know more by default. Its purpose is to let a person volunteer only the context that helps reflection stay respectful, readable, and aligned with their intent. This can make naming, tone, and "do not assume" boundaries clearer while keeping the person as the owner of both the data and its final meaning.

MHB remains a local-first, rule-based reflection system. NuTuenSai remains a bounded reflection voice, not an open-ended chatbot or an authority over the user.

## Non-goals and Boundary

This layer must not become:

- An account system, login, or identity-verification flow.
- A medical, psychological, or diagnostic profile.
- A hidden personalization system that controls, ranks, or steers the user.
- A required onboarding form or a condition for using the app.
- A source of medical advice, mental-health inference, causal claims, or identity claims.
- A way for MHB, pnat, NuTuenSai, or an AI assistant to claim ownership of the person's information.

All fields are optional. They remain local to the app unless the user intentionally exports and shares a workbook. The layer must not silently upload, sync, transmit, or disclose profile information.

The profile is context supplied by the user, not evidence that the system should infer more than the user said. A "do not assume" note is a guardrail, not a prompt for the system to fill in missing facts.

## Welcome Entry Point

A future Welcome screen may offer two equally valid paths:

- `เริ่มวันนี้`
- `ทำความรู้จักกันก่อน`

The second path opens an optional profile surface. Skipping it must always keep the full app usable. It should never appear as an error, incomplete state, or obligation.

The intended interaction is quiet and minimal: a person may enter only a name, only a preferred form of address, only a boundary note, or nothing at all.

## Primary Onboarding Copy

### ทำความรู้จักกันก่อน

แอปนี้ช่วยจัดข้อมูลของพี่ให้ AI อ่านได้ปลอดภัยขึ้น โดยยังให้ข้อมูลและความหมายสุดท้ายเป็นของพี่เสมอ

NuTuenSai จะอ่านเฉพาะข้อมูลที่พี่บันทึกไว้ ไม่เดาใจ ไม่วินิจฉัย ไม่ให้คะแนน และไม่สรุปแทนพี่

พี่จะบอกชื่อ โทนที่ชอบ หรือสิ่งที่ไม่อยากให้ระบบสรุปแทนก็ได้
ทุกอย่างเป็น optional และแก้ไขได้เสมอ 🩵

### Copy Rules

- Keep the first card short, calm, and minimal.
- Explain that the app organizes user-recorded data for AI-safe reflection; do not imply that AI automatically receives the data.
- Be professional and warm without using fear-heavy privacy wording.
- Say optional, editable, and skippable plainly.
- Do not present the profile as a test, assessment, consent trap, or prerequisite.
- Do not use copy that implies the system knows the user better than the user knows themselves.

## Optional Profile Fields

The following names are future proposal keys, not current runtime fields. Every field must be optional and safely blankable.

| Proposed key | Intent | Notes and boundary |
| --- | --- | --- |
| `display_name` | A name the person wants to see in selected UI copy. | Display only; not verified identity. |
| `address_style` | Preferred address pattern, such as `พี่ {name}`, `คุณ {name}`, or `{name}`. | Must have a safe fallback when either value is blank. |
| `birth_date` or `birth_year` | Optional context only if the user chooses to provide it. | Do not use for health, psychological, age, or identity inference. Prefer the least detailed field needed. |
| `preferred_tone` | A voluntary preference for reflection tone. | A style preference, not a diagnosis or personality model. |
| `user_context_note` | User-owned context they want available when reading their own data. | Must not invite unnecessary sensitive data. |
| `do_not_assume_note` | What NuTuenSai should not conclude, label, or infer. | A boundary cue; never a prompt to infer the opposite. |
| `updated_at` | Last user-visible update time. | Audit-friendly context, not activity surveillance. |

The future UI should describe `birth_date` and `birth_year` as optional and should not request either unless there is a clear, user-facing purpose that remains within MHB's non-medical boundary.

## Excel Sheet Proposal

Future implementation may add an optional workbook sheet named `User_Intention_Profile`.

This is a proposal only. U0 does not change the workbook.

The preferred first shape is a small key-value sheet:

| Column | Meaning |
| --- | --- |
| `Profile_Key` | Stable, machine-readable profile key. |
| `Profile_Value` | User-provided optional value. |
| `Visibility` | A future user-controlled sharing or display note, not an access-control claim. |
| `Updated_At` | User-visible update timestamp. |
| `Note` | Plain-language boundary or implementation note. |

Before any sheet is implemented, the workbook contract must define which values may be exported, what an empty profile means, how old workbooks without the sheet import safely, and how a person can remove exported profile values from a later workbook.

## UI Personalization Rules

Personalization must be small, reversible, and source-bound.

If both `display_name` and a valid `address_style` are present, selected copy may use them. For example:

> พี่ pnat อยากให้หนูอ่านจังหวะน้ำจากมุมไหนคะ

If either value is missing, MHB must fall back naturally:

> พี่อยากให้หนูอ่านจังหวะน้ำจากมุมไหนคะ

Rules:

- Never show dangling punctuation, an empty placeholder, or a malformed address.
- Do not use a name in every sentence; reserve it for moments where it improves warmth or clarity.
- Do not use a profile value to change calculations, Signal Engine ranking, health interpretation, or reflection truth claims.
- Do not use profile data to infer gender, family role, age, medical condition, psychological state, or spiritual identity.
- Keep the ordinary fallback voice fully usable when the profile is blank, missing, malformed, or from an older workbook.

## Update and Clear Rules

The person must always be able to:

- Edit any optional field.
- Clear a field or the whole profile.
- Leave every field blank.
- Skip the profile and continue using MHB.
- Use the app normally after clearing profile context.

Clearing a profile must remove its personalization effect immediately in the future UI. It must not delete Daily_Log history, Reflection history, or other user data. A future export/import flow must make the distinction between clearing the current local profile and editing a separately exported workbook understandable.

## Data Ownership and AI-safe Reading

The User Intention Profile Layer supports AI-safe reflection by making voluntary preferences and boundaries explicit. It does not give AI broader access to a person's data.

MHB should communicate these principles consistently:

- The person's information remains theirs, not pnat's.
- NuTuenSai reads only data that the person recorded or deliberately provided.
- The app is rule-based and local-first; it is not an unrestricted chatbot.
- Exporting or sharing remains an intentional user action.
- The final meaning of data remains with the person.

## Future Implementation Plan

### U0 — Docs-only Design Note

Current patch. Define purpose, boundary, copy, future fields, and backward-compatible implementation questions.

### U1 — Workbook Sheet and Schema Proposal

Decide the final optional `User_Intention_Profile` sheet contract, Column_Guide language, AI_Context boundaries, old-workbook behavior, and removal semantics before runtime work begins.

### U2 — Profile Page UI

Add a small optional profile page or Welcome entry path. Keep skip, edit, and clear actions prominent and do not require a profile to proceed.

### U3 — Local Profile Save, Update, and Clear

Implement a backward-compatible local-only storage model. Confirm that blank values and clear actions remove personalization without disturbing Daily_Log data.

### U4 — Export and Import

Add the optional workbook sheet only after U1/U3 are stable. Old workbooks without it must continue importing normally.

### U5 — Limited Name Use

Use display name and address style only in carefully chosen Welcome, Reflection, and Field Review copy. Maintain the generic fallback everywhere.

### U6 — Backward Compatibility and Privacy Copy QA

Test old logs, old workbooks, empty profile states, clear behavior, export/import, and language copy. Recheck that profile data remains user-owned and does not produce health, identity, or psychological claims.

## Future QA Checklist

- [ ] Skipping the profile keeps the whole app usable.
- [ ] `display_name` alone renders safely.
- [ ] `address_style` falls back safely when a name is missing.
- [ ] A fully blank profile renders no broken text.
- [ ] A person can clear one field and clear the whole profile.
- [ ] Updating the profile changes only the intended personalization.
- [ ] An old workbook without `User_Intention_Profile` still imports normally.
- [ ] Export/import works after the optional sheet is implemented.
- [ ] UI uses a name only where it is helpful and appropriate.
- [ ] No medical, identity, psychological, or spiritual claim is made from profile values.
- [ ] No data ownership confusion suggests that pnat or MHB owns user information.
- [ ] User data remains local until the user intentionally exports or shares it.

## Out of Scope for U0

- Runtime onboarding UI.
- Login, accounts, cloud sync, or analytics.
- New localStorage keys or profile persistence.
- Workbook schema, export, import, Column_Guide, or AI_Context changes.
- Reflection, Field Review, Signal Engine, or Welcome runtime changes.
- Automatic personality, health, identity, or preference inference.
