# Mind Note Feeling Options

## Purpose

This note records the addition of `uneasy` as a Mind Note Feeling option.

Mind Note Feeling describes the feeling tone of one specific Mind Note. It is not the same as the overall mind state of the whole day.

## Added Option

- TH: `ไม่สบายใจ`
- EN: `Uneasy`
- ZH: `心里不舒服`
- Canonical value: `uneasy`

`uneasy` means the note carries something stuck, uncomfortable, unsettled, or not fully clear. It does not have to mean anxiety, pressure, fatigue, or any medical/therapy category.

## Data Boundary

This option uses the existing Mind Note Feeling field:

- No new input section
- No new localStorage key
- No new Daily_Log column
- No Excel schema change
- No import/export behavior change

Saved rows continue to use the existing `Mind_Note_Feeling` column.

## Reflection Wording

When Mind Note Feeling is `uneasy`, NuTuenSai-style wording may gently say that the note carries uneasiness and can be placed down slowly.

Preferred tone:

- notice the feeling without diagnosing it
- treat it as a note-level feeling tone
- do not imply the user must fix it immediately
- do not use medical, therapy-heavy, guilt, or fear wording

Example:

```text
This note carries some uneasiness. The system can treat it as something to gently place down, not something that must be fixed immediately.
```

## Guardrail Sentence

`Uneasy` should make Mind Note Feeling easier to record when something feels unsettled, without turning the note into a diagnosis, therapy interpretation, or pressure to fix the feeling right away.
