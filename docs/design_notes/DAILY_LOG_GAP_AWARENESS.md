# MHB 2.2 - Daily Log Gap Awareness

## Status

Implemented across MHB 2.2A and MHB 2.2B. Runtime-derived only; no schema, workbook, or persistence change.

## Purpose

Daily Log Gap Awareness lets MHB notice the time between the current date and the latest earlier saved `Daily_Log.Date`. Reflection may use that result to welcome a returning user at an appropriate pace.

The gap is time context only. It is not evidence about motivation, discipline, health, or the meaning of time away from the app.

## Runtime Contract

`getDailyLogGapContext()` reads existing `Daily_Log` rows, reuses current row/date normalization, and derives:

- whether an earlier log exists
- the latest earlier logged date
- calendar days since that date
- calendar days between that date and today
- whether at least one calendar day sits between the two saved dates

The result is exposed in the Reflection signal context. MHB 2.2B maps it to a deterministic rhythm state and uses it once in the Reflection opening; the remaining Reflection logic is unchanged.

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

## Reflection Use

Reflection may say "Welcome back" or "Start with what is true today" once before returning attention to today's recorded data. This changes cadence only. It does not change root selection, facts, evidence, interpretation, or the meaning of missing dates.
