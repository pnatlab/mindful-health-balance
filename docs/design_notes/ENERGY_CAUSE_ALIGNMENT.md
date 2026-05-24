# Energy Cause Alignment

## Purpose

Energy Cause records why a day may feel low, medium, or good. It is not only for depletion factors. It can also record support and recovery factors that help energy feel steadier.

## Cause Groups

Depletion or energy-use factors include:

- `sleep_low`
- `heavy_exercise`
- `deep_work`
- `stress`
- `low_water`
- `low_food`
- `unknown`

Support or recovery factors include:

- `enough_sleep`
- `light_mind`

## Layered Signals

Energy level and Energy Cause can appear to point in different directions. This is not invalid data.

Examples:

- Low energy with `enough_sleep` can mean rest helped, but the body still needs more recovery time.
- Good energy with `sleep_low` or `stress` can mean the user can move through the day, while still needing to return recovery later.
- Medium energy with both depletion and support factors can be a balance day.

The app should treat these cases as layered signals. Body, mind, behavior, and recovery can be true in different ways at the same time.

## Reflection Boundary

Reflection wording should:

- Preserve the user's entered data.
- Avoid implying the user made a mistake.
- Avoid terms like conflict, wrong, invalid, or inconsistent in user-facing text.
- Use gentle language such as layered signal, both can be true, and body and mind may be speaking from different layers.

No data schema, localStorage key, Excel column, canonical value, import behavior, or export behavior changes are required for this decision.

