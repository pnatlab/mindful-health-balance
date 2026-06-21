# v1.9.8c - Reflection Sentence Smoothing

## Intent

v1.9.8c smooths the sentence flow of the v1.9.8 input-grounded reflection composer.

After v1.9.8, Reflection/NuTuenSai became more grounded because it could name 2-4 user input anchors. Some rich-input days, however, could read like a system joining phrases together with repeated connectors. v1.9.8c keeps the same anchors and intent logic, but improves how those anchors are written.

## Design Principle

Do not connect every input anchor with an explicit connector word.

Use:

- shorter sentences
- light line breaks
- varied connector shapes
- implicit context
- one input-grounded reading sentence after the anchor context

Avoid:

- repeated `ร่วมกับ`
- repeated `with`
- overly long single-sentence anchor lists
- heading-like sections
- bullet-like reflection output
- making the reflection generic again

## Behavior

The composer now separates:

1. input anchor context
2. day reading / gentle interpretation

For rich input, the anchor context can split across two short paragraphs. The output remains plain text and keeps existing Reflection/NuTuenSai paragraph rhythm.

## Guardrails

- Anchor ranking is unchanged.
- Reflection intent meaning is unchanged.
- Breathing markers remain sparse.
- No schema changes.
- No Daily_Log column changes.
- No export/import changes.
- No localStorage changes.
- No save behavior changes.
- No external API, LLM, ML, chatbot behavior, medical claims, diet advice, training advice, or productivity pressure.
