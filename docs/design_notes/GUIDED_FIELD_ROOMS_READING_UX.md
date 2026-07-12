# Guided Field Rooms Reading UX

## Status

- Patch: Guided Field Rooms reading rollout
- Scope: Field Review guided rooms only
- Excluded: Signal Engine
- Runtime state: session-only
- Content/calculation changes: none

## Purpose

The Hydration guided reading pilot is extended to all Guided Field Rooms so the review experience uses one interaction language across rooms. The model remains deterministic, local-first, and user-led. It is not an LLM chat interface.

## Included Rooms

- Hydration
- Sleep / Recovery
- Load / Recovery
- Drinks Context
- Mind Note
- Missing / Blank Data

Signal Engine remains on its existing co-movement reader interface because it has a different evidence model and interaction pattern.

## Interaction Model

Each guided room follows the same session-only flow:

1. Introduction
2. Choice of reading angle
3. One active reading card
4. Back / next angle / choose angle / end reading
5. Closing card
6. Return to reading or restart the current room

Read progress uses light check marks only to show what has been opened. It is not a score.

## Navigation Hierarchy

Guided room controls use semantic visual roles so users can read direction at a glance:

- Back: neutral, one-step return within the current reading flow.
- Next angle: primary blue action for moving forward in the current room.
- Choose angle: mint/teal action for returning to the angle menu.
- End reading: muted lavender/blue-gray exit action, never danger styling.
- Related rooms: separate section with room identity icons and cross-room labels.

Related-room buttons stay separate from reading navigation because they move to another room rather than within the current reading flow.

## Preserved Boundaries

This rollout does not change:

- Room calculations
- Evidence text
- Reading text
- Next-observation text
- Timeframe selection
- Cross-room navigation targets
- Background artwork
- Daily_Log schema
- Reflection
- Export/import
- Signal Engine logic or visuals

The change is presentation and navigation state only.
