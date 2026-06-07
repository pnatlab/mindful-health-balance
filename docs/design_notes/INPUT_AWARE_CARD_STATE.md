# Input-Aware Card State

## Intent

The Blue Active Card Layer is a v1.9.2 Today Input UX refinement. It gives the main Today Input cards a soft visual response when the user has entered meaningful current-form data in that card.

This layer helps the interface feel aware of the user's input without adding new fields, changing the daily flow, or turning the app into a completion/checklist system.

## Scope

Input-aware state applies to:

- Today State
- Hydration
- Drinks
- Load & Recovery
- Mind Note

Current Form summary does not need active state because it is a status/summary surface, not a primary input card.

## Active Logic

A card becomes active only when it has meaningful user input:

- Today State: energy, overall mind, sleep, or energy cause selected
- Hydration: water amount is greater than 0
- Drinks: at least one drink has been added
- Load & Recovery: at least one activity or recovery chip is selected
- Mind Note: note text, note feeling, or support need exists

Default dropdown values, placeholder text, and unsubmitted drink form values should not activate a card.

## Visual Direction

The base app remains purple/lavender/glass. The active layer uses a soft blue awareness cue:

- subtle blue border
- gentle blue shadow/glow
- light blue tint or glint
- restrained dark-mode opacity

The blue layer means "this card has current input." It does not mean success, completion, correctness, diagnosis, risk, or judgment.

## Guardrails

- Visual-only state
- Do not store active state
- Do not export active state
- Do not change Daily_Log columns
- Do not change Excel import/export
- Do not change scoring or reflection logic
- Do not use green success, red/orange warning, strong pulse, badges, or completion text
- Keep light and dark mode calm and readable

## Implementation Notes

The implementation may use a class such as `.is-input-active` and a helper such as `updateInputActiveCards()`. This helper should read existing app state and run during normal UI sync.

The state should clear naturally when the current form is reset.
