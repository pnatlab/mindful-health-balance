# v1.9.8 - Input-grounded Natural Reflection Composer

## Intent

v1.9.8 adds a conservative reflection composer layer so NuTuenSai reflection reads more naturally while still showing traces of the user's own input.

The goal is not to make the app a chatbot. The goal is to make rule-based reflection feel more grounded: the user should be able to see why a sentence appeared, because it gently references today's water, sleep, drink context, activity/load, run detail, Mind Note, or recent continuity signal.

## Design Principle

Reflection should be natural, but visibly grounded in the user's own inputs.

In Thai sense: Reflection ควรเป็นธรรมชาติ แต่ต้องมองเห็นร่องรอยของ input ที่ผู้ใช้กรอกไว้ในประโยคอย่างพอดี

## Composer Flow

The composer is an additive layer around the existing reflection flow:

1. Collect input anchors from existing signals.
2. Rank the strongest anchors.
3. Derive a primary reflection intent.
4. Compose one natural input-grounded overview.
5. Keep existing detailed reflection notes, guardrails, and exports unchanged.

It does not replace the existing signal matrix, hydration guidance, drink insight, continuity layer, or Daily Log save flow.

## Input Anchors

The composer may collect anchors from:

- water amount and hydration status
- `Sleep_Hours` and derived sleep category
- drink context such as caffeine, sweetness, and water interaction
- activity/load/recovery chips
- run detail such as distance, duration, and sweat when meaningful
- Mind Note feeling, support need, or short note text
- previous-log continuity as light context only

Only 2-4 anchors should be selected for the natural overview. The composer should never dump every input back to the user.

## Reflection Intents

The composer derives one primary intent and may keep a secondary intent internally:

- `restore_baseline`
- `reduce_guilt`
- `notice_pattern`
- `protect_agency`
- `pause_not_push`
- `soft_continue`

Intent guides wording only. It is not a diagnosis, label, score, or hidden user profile.

## Output Placement

The input-grounded overview appears near the top of the Reflection/NuTuenSai output, before the older detailed notes.

The compact preview can also use the same layer lightly, so preview and detailed reflection feel related without becoming long or repetitive.

## Guardrails

- Current-day input remains primary.
- Previous logs remain supportive context only.
- No new Daily_Log columns.
- No export/import change.
- No localStorage schema change.
- No external API, LLM, chatbot, ML, or baseline model.
- No medical, diagnostic, dietary, training, or productivity-pressure claims.
- Human agency remains central: the app helps notice patterns; it does not decide what the user's life means.

## Testing Focus

Future tests should verify:

- low water + coffee + low sleep mentions those anchors without shame
- high water + long run reads water through activity/sweat context
- sweet drink + pressured Mind Note reduces guilt rather than giving diet advice
- sleep improvement after previous low sleep reads as support, not a large conclusion
- no drink context does not force a drink note
- incomplete data produces a gentle starting point
- malformed or missing structured fields do not break reflection
