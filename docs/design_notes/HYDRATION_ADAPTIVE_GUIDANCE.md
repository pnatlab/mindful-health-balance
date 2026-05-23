# Hydration Adaptive Guidance

## Purpose

Mindful Health Balance v1.9.x adds adaptive hydration guidance so the Hydration card can reflect that a useful water target may vary by the day's load.

This is a self-care reflection cue, not a medical prescription. The app should avoid exact requirements, fear language, diagnosis, or risk prediction.

## Principle

Hydration guidance should be:

- Flexible rather than fixed.
- Estimated rather than prescriptive.
- Derived from existing signals.
- Gentle enough to avoid pressure.
- Clear that the user should still listen to their own body.

The guidance should say, in effect: a rest day and a long-run or outdoor-heat day may not ask for the same rhythm of water.

## Signals Used

The patch uses existing data only:

- Activity chips and derived load types.
- Load score.
- Sleep state and sleep-related energy cause.
- Drink profile caffeine score.

It does not add new input fields, localStorage keys, data schema, Excel columns, canonical values, or import/export requirements.

## Target Logic

The base estimated target is 2,000 ml.

The guidance separates strong activity/load signals from recovery-only signals.

When strong activity load is present, the UI may show a soft estimated range:

- Sport intensity load: raises the range gently.
- Outdoor heat load: raises the range gently.
- Physical or standing/service load: raises the range moderately.
- Cognitive or market-decision load: raises the range lightly.
- High caffeine: keeps plain water as the base without turning caffeine into fear.

When recovery-only signals are present, such as low sleep, low energy, scattered mind, or pressure without a clear activity load, the UI should keep the base target and use recovery wording. Low sleep alone does not mean activity load is high.

When strong activity and recovery signals both appear, the UI can keep the activity range while using a hydration-and-recovery cue.

The target is display-only. It is not saved as a new canonical value and should not be treated as a medical recommendation.

## UI Placement

The Hydration card keeps the existing water amount and water-glass visual behavior. The adaptive guidance appears as a small note near the existing hydration feedback so the user sees context without extra input burden.

The water-glass progress remains based on the existing visual target to avoid changing the core interaction too sharply. The adaptive layer is expressed as guidance text.

## Reflection Boundary

NuTuenSai-style reminder and reflection wording may mention the relationship between hydration, load, sport, heat, caffeine, sleep, and recovery.

The language should avoid:

- "must drink"
- "risk"
- "danger"
- "abnormal"
- diagnostic claims
- prescriptive medical advice

Preferred language:

- "estimated range"
- "flexible target"
- "sip gradually"
- "hydration as part of recovery"
- "plain water can remain the base"
