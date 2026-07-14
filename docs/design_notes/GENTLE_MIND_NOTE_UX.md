# MHB 2.1 — Gentle Mind Note UX

## Status

Implemented UX and copy direction for MHB 2.1. No data-model migration.

## Intent

Mind Note should feel like a quiet place to leave something from today, not a form that asks the user to find and fix a problem.

The interaction model is:

`Observe → Keep → Release`

The page gives equal permission to gratitude, ordinary moments, uncertainty, learning, meaningful experiences, and difficult feelings. Blank input remains valid.

## Presentation Direction

- The writing invitation asks what the user may want to keep with today.
- Examples include positive, neutral, uncertain, and blank-day possibilities.
- Feeling choices are visually grouped as gentle/supportive, neutral/noticing, and heavy/needs space.
- Difficult feelings remain available but no longer lead the visual order.
- Support Need is presented as `วันนี้ใจอยากได้อะไร` / `What might support the mind today?`.
- Practice Context is an invitation to notice what the mind could rest with, not a correctness test.
- The existing dark, elegant visual identity remains, with more spacing and a larger writing area.

## Compatibility Boundary

Existing feeling and support values remain valid. New options are additive plain-text enum values in the existing fields; no columns or workbook contracts change.

This refresh does not change:

- `Daily_Log` schema or historical rows
- export/import structure
- Reflection or Reflection Root behavior
- Field Review or Signal Engine
- User Intention Profile
- calculations, evidence, or medical boundaries

Mind Note remains user-owned context. Its text is not a diagnosis, personality model, hidden instruction, or requirement to produce a positive interpretation.
