# v1.9.9 — Mindful Practice Context

## Intent

v1.9.9 adds a small optional practice context layer before Mind Note. The purpose is to let the user record how they lightly placed the mind before writing one line, without turning Mindful Health Balance into a dhamma teaching system, spiritual scoring system, or meditation performance tracker.

The feature is inspired by the traditional Theravada 40 kammaṭṭhāna framework, but it is presented as modern grouped practice contexts rather than a raw list of forty objects.

## UI Placement

The card appears on `Mind Note 2/2` before the Mind Note text area.

On desktop, Mind Note 2/2 uses a balanced two-column layout:

- left: Practice Context / ภาวนาก่อนวางใจ
- right: Mind Note / วางใจหนึ่งบรรทัด

On mobile, Practice Context stacks above Mind Note.

Visible labels:

- TH: `ภาวนาก่อนวางใจ`
- EN: `Practice before Mind Note`
- ZH: `记录前的练习`

The helper copy keeps the action light: choose a simple base, then write one line.

## Visual Anchor

The Practice Context card includes a small breathing-orb visual summary. It may show the selected practice type and total minutes, such as `Breath awareness · 15 min`.

This orb is a visual anchor only. It is not a score, streak, achievement, spiritual status, or practice-quality indicator.

## Practice Groups

The UI groups practice roots into public-safe daily options:

- `breath_body_base`: breath awareness, body awareness, walking awareness
- `heart_quality`: loving-kindness, compassion, appreciative joy, equanimity
- `recollection_trust`: recollection of Buddha, Dhamma, Sangha, virtue, generosity, peace
- `letting_go`: impermanence, letting it be lighter, seeing without following
- `elements_simplicity`: elements of the body, food as it is, simple body awareness
- `visual_steadiness`: light, color, open space
- `other_or_none`: no practice, other

These groups are descriptive anchors only. They are not used to infer spiritual attainment, personality, or practice quality.

## Data Fields

v1.9.9 adds four backward-compatible optional `Daily_Log` columns:

- `Practice_Root`
- `Practice_Type`
- `Practice_Minutes`
- `Practice_Context_JSON`

`Practice_Minutes` stores total minutes derived from the UI's hours + minutes inputs.

`Practice_Context_JSON` stores a compact object:

```json
{
  "root": "heart_quality",
  "type": "metta",
  "minutes": 15,
  "source": "40_kammatthana_modern_group",
  "reflectDaily": false
}
```

`reflectDaily: false` is intentional. It marks this field as future Field Review context, not a daily Reflection signal in v1.9.9.

## Reflection Boundary

Daily Reflection/NuTuenSai does not use practice context in v1.9.9.

The app must not:

- say the user meditated well or poorly
- judge practice minutes
- recommend a practice type
- infer spiritual progress
- make dhamma interpretation claims
- use practice context as a medical, therapy, productivity, or identity signal

Practice context is stored for future weekly/monthly Field Review only.

## Export / Import

Exports include the new optional columns in `Daily_Log` and document them in `Column_Guide`.

Imports remain backward compatible:

- old workbooks without practice fields normalize missing values to empty
- new workbooks preserve practice fields
- malformed or legacy artifact text in practice text/JSON fields is ignored rather than interpreted

## Guardrails

- Optional, never required
- No streaks
- No achievements
- No score
- No good/bad practice wording
- No teaching-heavy prompts
- No daily Reflection interpretation in v1.9.9
- No new dependency

The user owns the practice context as part of their personal rhythm dataset.
