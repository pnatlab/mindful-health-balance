# MHB 2.2B - Reflection Rhythm Pass

## Status

Implemented inside MHB 2.2 and retained unchanged in the current MHB 2.3 runtime.

## Purpose

Reflection Rhythm uses the existing `signals.dailyLogGap` context to adjust the opening cadence when a user begins a new Reflection. It acknowledges the return once, then brings attention back to today's recorded data.

Gap awareness changes language rhythm, not interpretation.

## Deterministic States

| State | Rule |
| --- | --- |
| `first_record` | No earlier valid Daily Log date |
| `continuous` | `daysSinceLastLog === 1` |
| `short_return` | `daysSinceLastLog` is 2-3 |
| `returning` | `daysSinceLastLog` is 4-7 |
| `long_return` | `daysSinceLastLog > 7` |

The state comes only from `signals.dailyLogGap`. No second date calculator or saved rhythm state exists.

## Language Contract

- Mention the return at most once by default.
- If an exact number is shown, it uses `daysSinceLastLog`, not `missedDays`.
- Return attention to what is recorded today.
- Keep TH, EN, and Simplified Chinese semantically aligned without forcing literal translation.
- Preserve the existing profile-aware Thai address when available; otherwise use the established Thai fallback.

## Boundaries

- No streak, score, badge, reward, penalty, compliance, or engagement model.
- No guilt, backfilling request, compensation language, or judgment about missing dates.
- Missing days mean only that no Daily Log row was recorded.
- No health, motivation, identity, or behavior inference.
- No change to Reflection Root, facts, evidence, calculations, composer selection, closing interpretation, Signal Engine, Guided Field Rooms, or User Intention Profile.
- `Daily_Log.Date` remains the source of truth.
- Nothing is persisted to localStorage or the workbook for this layer.
