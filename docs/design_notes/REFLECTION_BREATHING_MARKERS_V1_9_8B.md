# v1.9.8b - Reflection Breathing Markers

## Intent

v1.9.8b adds very small emoji breathing markers to Reflection/NuTuenSai output so longer input-grounded sentences are easier to read.

The markers behave like soft punctuation. They are not headings, categories, scores, diagnoses, sentiment labels, or chatbot decoration.

## Marker Set

The marker vocabulary is intentionally small:

- `🩵` for NuTuenSai warmth, agency, and guilt reduction
- `💧` for hydration or water/drink return-to-base
- `☕` for caffeine/drink context when it is central
- `🌙` for sleep, recovery, or rest
- `🌱` for gentle return or small next step
- `👣` for activity/load/recovery from physical effort when it fits

## Placement Rules

- Compact preview may use at most one marker.
- Detailed Reflection may use at most two breathing markers, leaving visual room for the existing NuTuenSai signature heart.
- Markers appear at the end of existing sentences or paragraphs.
- Markers must not introduce emoji section headings.
- Markers must not appear on every line.
- Low-data reflection may have zero markers.

## Guardrails

- Do not add new schema fields.
- Do not change Daily_Log columns.
- Do not change export/import.
- Do not change localStorage.
- Do not change save behavior.
- Do not change Reflection meaning or intent logic.
- Do not add chatbot tone, emoji spam, or medical/diet/training/productivity-pressure claims.

## Design Role

Breathing markers are a readability polish on top of v1.9.8 Input-grounded Natural Reflection Composer. The composer still selects input anchors and derives intent; the marker layer only gives the output a little more visual rhythm.
