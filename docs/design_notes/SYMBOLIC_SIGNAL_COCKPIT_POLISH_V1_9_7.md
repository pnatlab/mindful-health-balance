# v1.9.7 — Symbolic Signal Cockpit Polish

## Intent

v1.9.7 polishes the v1.9.6 Compact Signal Cockpit into a calmer symbolic cockpit. The goal is to make Today Input 1/2 feel more like an MSxAI field interface than a standard menu list, while keeping the same data and behavior.

This patch is visual and interaction-focused only.

## Design Direction

The cockpit becomes a small signal constellation:

- Inner State at the top
- Drinks and Water on the left/right
- Work / Activity at the bottom
- Daily Balance Orb in the center

The layout suggests that the four daily signals are connected without turning the app into a game, KPI dashboard, or scorecard.

## Daily Balance Orb

The center orb reflects how many of the four signals currently have input:

- 0/4: still listening for signals
- 1/4: today is starting to appear
- 2-3/4: today is readable enough
- 4/4: ready for Reflection

This is not a completion score or judgment. It is a soft input-awareness cue that helps prevent forgotten input.

## Default Active Signal

Hydration / Water is the default active detail panel on Today Input 1/2.

Reason:

- the water glass is the strongest visual identity of the app
- the first self-care cue is to return to today's water base
- opening Today should immediately answer "where is water today?"
- the other signals remain visible in the cockpit and can be selected normally

Resetting the current form, saving the day, or rolling over to a new date should return the active detail panel to Hydration.

## Signal Nodes

Each node keeps:

- icon
- label
- short summary
- status
- signal dots

Signal dots are a gentle completeness cue, not a performance score.

Node states:

- empty: lower opacity and quiet border
- partial: soft blue awareness layer
- readable: subtle ring
- active: slight scale and slow breathing halo

## Motion

Motion is intentionally slow and subtle:

- active node breathing glow
- short fade/slide for detail panel changes
- no fast bouncing
- no gamified reward animation

`prefers-reduced-motion` must be respected.

## Scope Boundary

This patch does not change:

- Daily_Log columns
- Excel export/import
- localStorage data schema
- reflection logic
- Today Input 2/2
- Save to Daily Log
- scoring logic

It is a UI polish layer over the existing v1.9.6 cockpit state.
