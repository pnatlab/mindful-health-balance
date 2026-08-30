# v1.9.9 — Mindful Practice Context

## Intent

v1.9.9 adds a small optional practice context layer before Mind Note. The purpose is to let the user record how they lightly placed the mind before writing one line, without turning Mindful Health Balance into a dhamma teaching system, spiritual scoring system, or meditation performance tracker.

The feature is inspired by Buddhist practice context, but it is presented as four simple daily bases rather than a raw list of traditional objects. v1.9.9 intentionally exposes only lightweight daily-use groups in the main UI.

## UI Placement

The card appears on `Mind Note 2/2` before the Mind Note text area.

On desktop, Mind Note 2/2 uses a balanced two-column layout:

- left: Practice Context / ภาวนาก่อนวางใจ
- right: Mind Note / วางใจหนึ่งบรรทัด

On mobile, Practice Context stacks above Mind Note.

The desktop layout lets the Mind Note card stretch visually beside Practice Context. The Mind Note textarea has more vertical room than the earlier compact form so the right side feels like a real place to set down one line or one short paragraph.

Visible labels:

- TH: `ภาวนาก่อนวางใจ`
- EN: `Practice before Mind Note`
- ZH: `记录前的练习`

The helper copy keeps the action light: choose a simple base, then write one line.

Practice Context uses progressive disclosure:

- default state shows the title, visual orb, helper, and root chips
- type chips appear after a root is selected
- duration appears only after a concrete practice type is selected
- `No practice` keeps duration hidden

## Visual Anchor

The Practice Context card includes a small breathing-orb visual summary. It may show the selected practice type and total minutes, such as `Breath awareness · 15 min`.

This orb is a visual anchor only. It is not a score, streak, achievement, spiritual status, or practice-quality indicator.

## Practice Groups

The UI groups practice roots into four simple bases plus an optional none/other group:

- `body`: notice standing, notice walking, notice sitting, notice lying down, notice the breath, notice body movement
- `feeling_tone`: reflect on enoughness, reflect on lightness, recollect gratitude, recollect calm, recollect a good moment, reflect on impermanence
- `mind_thought`: notice the mind, notice thoughts, repeat Buddho, use a gentle phrase, notice a scattered mind, notice a calm mind
- `dhamma`: reflect on the three characteristics, think and notice defilement, recollect a good action, recollect kept virtue, see and release, think and notice wanting
- `other_or_none`: no practice, other, just resting

These groups are descriptive anchors only. They are not used to infer spiritual attainment, personality, or practice quality.

Practice type chips are phrased as small actions, not abstract categories. The `feeling_tone` group intentionally avoids direct negative-feeling choices such as "unpleasant" or "distress" in the visible UI; it frames the practice as wholesome recollection or wisdom-oriented reflection so the app does not invite the user to fixate on suffering.

Legacy roots such as `breath_body_base`, `heart_quality`, `recollection_trust`, `letting_go`, `elements_simplicity`, and `visual_steadiness` remain safe to import/normalize from old workbooks/current-form data, but they are not shown as selectable roots in the v1.9.9 daily UI.

## Data Fields

v1.9.9 adds backward-compatible optional `Daily_Log` columns:

- `Practice_Root`
- `Practice_Type`
- `Practice_Minutes`
- `Practice_Context_JSON`
- `Practice_Note`

`Practice_Minutes` stores total minutes derived from the UI's hours + minutes inputs.

`Practice_Context_JSON` stores a compact object:

```json
{
  "root": "mind_thought",
  "type": "observe_mind",
  "minutes": 15,
  "note": "ไปให้อาหารปลาที่วัด",
  "source": "four_bases_daily_context",
  "reflectDaily": false
}
```

`Practice_Note` stores a short plain-text note for the practice situation, good action, or wholesome context the user wants to remember. It is duplicated into `Practice_Context_JSON.note` intentionally: `Practice_Note` is easy to read in Excel, while the JSON note keeps the structured context portable.

The note is not a merit score, spiritual assessment, proof of being good, therapy field, or daily Reflection input by default. It is stored for future weekly/monthly Field Review.

`reflectDaily: false` is intentional. It keeps practice context out of automatic/general daily signal composition. The current runtime can still read it when the user explicitly selects the `practice_context` Reflection Root.

## Reflection Boundary

The general/Auto Daily Reflection does not use practice context as an automatic signal. The current runtime now also offers an explicit `practice_context` Reflection Root; only that deliberate selection may read the recorded practice context for the current reflection.

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
- old rows with legacy hidden roots normalize to the closest conservative visible root where possible, or to `other_or_none` when the mapping would overclaim
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
