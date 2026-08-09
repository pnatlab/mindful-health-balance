# MHB 2.2 - Daily Log Gap Awareness

## Status

Implemented as MHB 2.2A. Runtime-derived only; no schema, workbook, or persistence change.

## Purpose

Daily Log Gap Awareness lets MHB notice the time between the current date and the latest earlier saved `Daily_Log.Date`. It exists so later Today or Reflection wording can welcome a returning user at an appropriate pace.

The gap is time context only. It is not evidence about motivation, discipline, health, or the meaning of time away from the app.

## Runtime Contract

`getDailyLogGapContext()` reads existing `Daily_Log` rows, reuses current row/date normalization, and derives:

- whether an earlier log exists
- the latest earlier logged date
- calendar days since that date
- calendar days between that date and today
- whether at least one calendar day sits between the two saved dates

The result is exposed in the Reflection signal context for bounded future wording. MHB 2.2A does not change the current Reflection text.

## Boundaries

- `Daily_Log` is the only source of truth.
- No gap field is saved to localStorage or a workbook.
- No new history, streak, score, badge, reward, penalty, reminder pressure, or completion state is created.
- A time gap is never described as failure, loss, or broken continuity.
- Missing or malformed dates are ignored safely.
- The helper does not change root selection, Reflection evidence, calculations, Signal Engine, Guided Field Rooms, or User Intention Profile.

## Example

For a current date of `2026-08-09` and latest earlier log date of `2026-08-06`:

- `daysSinceLastLog`: `3`
- `missedDays`: `2`
- `isReturningAfterGap`: `true`

This does not imply that the user should have logged on the two dates in between.

## Future Use

A later bounded patch may use this context for gentle welcome or Reflection framing such as "Welcome back" or "Start with what is true today." Any future wording must remain optional in tone, source-bound, and free from guilt.
