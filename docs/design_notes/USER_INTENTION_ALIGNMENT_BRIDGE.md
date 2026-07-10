# User Intention Alignment Bridge

## Purpose

User Intention Profile is not only a place to store a name or adjust an AI personality. In Mindful Health Balance, it is a user-owned alignment contract that helps the system carry human intention safely across:

Human Intention -> Rule-based Reflection -> Excel Field Memory -> Future Local LLM Draft -> Human Audit

The profile can tell MHB:

- how the user wants to be addressed
- what communication tone is preferred
- what voluntary context the user wants the system to know
- what the system must not assume on the user's behalf
- which kinds of profile data may be used in which scope

The system must never claim that it fully knows the user. Profile preferences may adjust wording, address, and communication style, but they must not change source facts, health data, selected roots, signal calculations, or the user's final meaning.

## Layer A - Identity and Addressing

This layer is for direct UI address only. It is not identity verification and must not imply that MHB knows the user's full identity.

Candidate fields:

- `display_name`
- `address_style`
- `greeting_style`
- `preferred_language`

Allowed use:

- Welcome screen
- Reflection opening
- selected Field Review questions
- selected closing notes

Fallback behavior:

- No profile: use `พี่`.
- `display_name` exists but no `address_style`: use a safe default such as `พี่ {name}`.
- `address_style` exists but no `display_name`: fall back to `พี่`.
- Malformed template: ignore the template and fall back safely.

Examples:

- Profile available: `สวัสดีค่ะพี่ pnat วันนี้หนูจะอ่านเท่าที่พี่บันทึกไว้นะคะ`
- No profile: `สวัสดีค่ะ วันนี้หนูจะอ่านเท่าที่พี่บันทึกไว้นะคะ`

The name should be used sparingly. Repeating a name in every paragraph can feel mechanical and may make the reflection too heavy.

## Layer B - Reflection Style Preference

This layer can shape the surface voice of NuTuenSai, but it cannot change the meaning of the data.

Candidate fields:

- `preferred_tone`
- `response_density`
- `warmth_level`
- `closing_style`
- `user_context_note`
- `do_not_assume_note`

Allowed use:

- choose between concise, gentle, or data-first phrasing
- adjust whether the closing is warm, compact, or evidence-oriented
- respect user-written boundaries such as "do not assume this means I failed"
- keep reflections closer to the tone the user voluntarily requests

Boundary:

- It may change wording.
- It may not change source facts.
- It may not change Signal Engine calculations.
- It may not change correlation bands.
- It may not change health thresholds.
- It may not change the selected Reflection Root.
- It may not create diagnosis, personality inference, or identity inference.

Example:

- `preferred_tone = concise` may shorten the reflection.
- It must not remove evidence, hide uncertainty, or turn a weak signal into a strong one.

## Layer C - AI Use Boundary

This layer defines how profile data may be carried into future AI-readable contexts.

Candidate fields:

- `allowed_use_scope`
- `source_bound_only`
- `human_review_required`
- `profile_schema_version`
- `updated_at`

Suggested semantics:

- `allowed_use_scope`: `ui_display`, `reflection_context`, `guardrail`
- `source_bound_only`: `true`
- `human_review_required`: `true`
- `profile_schema_version`: `1.0`

The profile can support a future Local LLM Lab only as an alignment packet. Any LLM output remains a draft and must be reviewed by the human decision owner before being treated as meaning.

## Authority Order

MHB should preserve this authority order:

1. Safety / Boundary
2. Source Data
3. User-selected Reflection Root
4. User Profile Preference
5. Wording

Profile preference lives in the language and addressing layer. It does not outrank source data, safety boundaries, or the user's selected root.

Examples:

- If the user prefers a warm tone, NuTuenSai may phrase the reflection more gently.
- If the water data is blank, the profile must not make the system infer hydration status.
- If `do_not_assume_note` says not to interpret missed practice as failure, the system must treat that as a boundary.
- If the selected root is `hydration`, `preferred_tone` must not switch the root to `mind_state`.

## Daily Reflection Pilot

U3.1 may pilot limited profile use in the Daily Reflection only after local profile persistence is implemented.

### Opening

If profile data is valid:

> สวัสดีค่ะพี่ pnat วันนี้หนูจะอ่านเท่าที่พี่บันทึกไว้แบบเบา ๆ นะคะ

If no profile exists:

Use the current Reflection opening.

### Mid-reflection Addressing

The name should not appear in every paragraph. Use it at most about once when it adds warmth, clarity, or conversational continuity.

Allowed:

- one greeting
- one gentle transition
- one closing note

Avoid:

- name in every sentence
- name used to imply surveillance or deep identity knowledge
- name used in diagnosis, scoring, or causal claims

### Closing

`closing_style` may choose a deterministic closing variant with safe fallback.

Candidate styles:

- `soft_encouragement`
- `concise`
- `data_first`

Examples:

- `soft_encouragement`: `พอเห็นจังหวะนี้แล้ว พี่ค่อย ๆ กลับมาดูแลตัวเองทีละช่วงก็พอค่ะ`
- `concise`: `วันนี้อ่านได้เท่านี้พอค่ะ ค่อยกลับมาดู pattern ต่อรอบหน้า`
- `data_first`: `จากข้อมูลที่มี วันนี้เหมาะกับการดู pattern ต่ออีกเล็กน้อยโดยไม่สรุปเกินหลักฐานค่ะ`

The pilot must not let profile data change Reflection facts, selected root, source evidence, or boundaries.

## Excel Contract Direction

Future AI-readable profile export may use a more explicit sheet contract than the simple U1 proposal.

Suggested future sheet name:

- `User_Intention_Profile`

Future-safe columns:

- `Profile_Key`
- `Profile_Value`
- `Value_Type`
- `Use_Scope`
- `Language`
- `Updated_At`
- `Active`
- `Note`

Column meanings:

- `Profile_Key`: stable machine-readable key.
- `Profile_Value`: the value explicitly entered or selected by the user.
- `Value_Type`: `text`, `enum`, `boolean`, `date`, `template`, or `version`.
- `Use_Scope`: `ui_display`, `reflection_context`, `guardrail`, `ai_boundary`, or `internal_note`.
- `Language`: `th`, `en`, `zh`, or `neutral`.
- `Updated_At`: human-readable and parser-readable audit timestamp.
- `Active`: lets the user disable a field without deleting it.
- `Note`: human-readable explanation and boundary.

Implementation may begin with the simpler U1 key-value schema, but this contract records the future-safe direction for Excel as a portable alignment packet.

## Local LLM Bridge

MHB does not need to call an LLM directly. The static app can export an AI-readable workbook that a future Local LLM Lab may read.

A future Local LLM Lab context packet may be organized as four blocks:

```text
[User Intention Profile]
[AI Context]
[Selected Health Context]
[User Question]
```

Example Local LLM instruction:

```text
Use profile data only to adjust addressing and communication style.
Do not use profile data to alter source facts, infer identity,
diagnose health, or override the user's current instruction.
Treat do_not_assume_note as a hard boundary.
Return a draft for human review.
```

The profile is a boundary and style layer, not hidden memory that can override the user. `do_not_assume_note` should be treated as a hard boundary when generating a draft.

## Missing Profile Behavior

Missing profile data must be quiet and safe.

- No profile sheet: use default NuTuenSai voice.
- No `display_name`: use `พี่`.
- No `preferred_tone`: use NuTuenSai default tone.
- Malformed field: ignore that field.
- Partial profile: use only valid fields.
- Empty profile: do not error.
- Blank profile: do not infer why it is blank.

The app should not pressure the user to fill profile fields before using Today, Reflection, Field Review, export, or import.

## Non-goals

User Intention Profile must not become:

- a personality model
- a psychological profile
- identity inference
- a medical profile
- hidden prompt injection
- LLM memory without user review
- a mechanism that changes calculations or source truth
- mandatory personalization

## Roadmap

- A0 - Alignment bridge design note.
- U3 - Local Profile Persistence.
- U3.1 - Daily Reflection Personalization Pilot.
- U4 - Excel Export / Import.
- U4.1 - Local LLM Bridge Contract.
- U5 - Limited Expansion to Welcome / Field Review.
- U6 - Cross-system QA.

## QA Questions

Future implementation should answer:

- If the profile is blank, does Reflection stay the same as the current default?
- Does the name appear only where it helps and not in every paragraph?
- Do preferences change wording only, not source facts?
- Is `do_not_assume_note` respected as a boundary?
- Does malformed profile data fall back safely?
- Do Signal Engine, selected root, and source facts remain unchanged?
- Is the Excel profile readable by both humans and parsers?
- Does any Local LLM draft remain source-bound and human-reviewed?

## Implementation Guardrails

Do not implement runtime behavior from this note until a dedicated patch is approved.

When implementation begins:

- keep profile optional
- preserve old workbooks
- preserve Daily_Log schema unless a dedicated schema patch is approved
- keep profile values user-owned
- keep LLM output as draft
- keep pnat / the user as decision owner
- never let profile preference override safety, source data, or user-selected root
