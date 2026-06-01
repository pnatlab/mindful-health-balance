# Mind Note Feeling Options

## Purpose

This note records the addition of `uneasy` and `feeling_good` as Mind Note Feeling options.

Mind Note Feeling describes the feeling tone of one specific Mind Note. It is not the same as the overall mind state of the whole day.

## Added Options

- TH: `ไม่สบายใจ`
- EN: `Uneasy`
- ZH: `心里不舒服`
- Canonical value: `uneasy`

`uneasy` means the note carries something stuck, uncomfortable, unsettled, or not fully clear. It does not have to mean anxiety, pressure, fatigue, or any medical/therapy category.

- TH: `รู้สึกดี`
- EN: `Feeling good`
- ZH: `感觉不错`
- Canonical value: `feeling_good`

`feeling_good` means this specific Mind Note carries a good, lighter, or supportive feeling tone. It does not claim that the whole day was good, does not replace recovery signals, and is not a performance score.

## Option Order

Mind Note Feeling should be ordered by semantic flow:

1. `calm` / Neutral / เฉย ๆ
2. `uneasy` / Uneasy / ไม่สบายใจ
3. `worried` / Worried / กังวล
4. `pressured` / Pressured / กดดัน
5. `tired` / Tired / ล้า
6. `scattered` / Scattered / ฟุ้ง
7. `feeling_good` / Feeling good / รู้สึกดี
8. `grateful` / Grateful / ขอบคุณ

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

When Mind Note Feeling is `feeling_good`, NuTuenSai-style wording may gently say that the note carries a good feeling as a small supportive signal, without claiming that the whole day was perfect.

Preferred tone:

- notice the feeling without diagnosing it
- treat it as a note-level feeling tone
- do not imply the user must fix it immediately
- do not use medical, therapy-heavy, guilt, or fear wording

Example:

```text
This note carries some uneasiness. The system can treat it as something to gently place down, not something that must be fixed immediately.
```

```text
This note carries a good feeling. The system can read it as a small supportive signal, not as a claim that the whole day was perfect.
```

## Guardrail Sentence

`Uneasy` should make Mind Note Feeling easier to record when something feels unsettled, without turning the note into a diagnosis, therapy interpretation, or pressure to fix the feeling right away.

`Feeling good` should let the note carry a simple positive tone without forcing the user to choose gratitude and without turning the note into a claim about the whole day.
