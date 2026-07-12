# Hydration Guided Reading UX

## Status

- Patch: Hydration guided reading pilot
- Scope: Field Review Hydration room only
- Runtime state: session-only
- Content/calculation changes: none

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

## Boundaries

This pilot changes presentation and session navigation only. It does not change:

- Hydration statistics
- Average/min/max values
- Low/high water day counts
- Evidence text
- Next-observation text
- Daily_Log schema
- Reflection
- Signal Engine
- Other Field Review rooms

## Future Review

After manual QA, this pattern can be evaluated before applying it to Recovery, Load, Drinks, Mind Note, Missing Data, or Signal Engine.
