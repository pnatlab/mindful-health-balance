# Hydration Guided Reading UX

## Status

- Patch: Hydration guided reading pilot
- Scope: Field Review Hydration room only
- Runtime state: session-only
- Content/calculation changes: hydration adequacy reading only

## Purpose

Hydration is the first Field Review room to move from a chat-like visual simulation toward a gentle guided reading flow. The room remains deterministic, local-first, and rule-based. It does not become an LLM chat interface.

## UX Direction

The Hydration room keeps its existing introduction and boundary copy, then shows one reading step at a time:

1. Room introduction
2. Main question
3. Choice buttons
4. One active reading card
5. Navigation: back, next angle, choose angle, end reading
6. Closing card with restart options

Read progress is shown lightly to help the user see which angles have already been opened. This progress is not a score.

## Copy Responsibilities

- Overview: names the adequacy level and the number of recorded days within their context-aware reference ranges. It does not repeat average/min/max values.
- Evidence: shows average, min, max, and below/in-range/above day counts as compact audit data.
- Next observation: offers one sentence inviting the user to read out-of-range days with load, sleep, and activity, without expecting identical intake every day.
- Show all: combines the adequacy level, evidence, and next observation without repeating the in-range count from the overview.

## Boundaries

The guided-reading pilot originally changed presentation and session navigation only. The current Hydration room now also reads adequacy against the existing context-aware hydration ranges. Average intake and the number of recorded days within their reference ranges lead the overview; min/max remain evidence and are not used to infer instability.

This does not change:

- Daily hydration guidance ranges
- Source Water_ml values
- Average/min/max calculations
- Load, sleep, activity, or recovery calculations
- Daily_Log schema
- Reflection
- Signal Engine
- Other Field Review rooms

## Future Review

After manual QA, this pattern can be evaluated before applying it to Recovery, Load, Drinks, Mind Note, Missing Data, or Signal Engine.
