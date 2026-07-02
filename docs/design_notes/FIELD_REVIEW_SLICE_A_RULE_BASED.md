# Field Review Slice A — Rule-Based Daily Log Review

## Purpose

Field Review Slice A is the first conservative MHB 2.0 review layer.

It reads saved `Daily_Log` rows and summarizes descriptive self-care patterns with deterministic rules. It is a local-first review surface for user-owned field memory, not a chatbot, medical assistant, diagnosis tool, therapy tool, finance analysis tool, productivity score, spiritual score, or auto-decision system.

## Scope

Slice A is rule-based only.

- Source: `Daily_Log` is the primary source.
- Data path: browser `localStorage` rows are normalized with the existing app schema before review.
- Output: review cards are descriptive pattern summaries.
- Missing data: blank fields mean not recorded, not observed, or not certain. Missing data is not failure.
- Numeric fields: read numeric fields according to `Column_Guide` and `AI_Context` boundaries. For example, `Water_ml` is plain water intake in milliliters, not money, baht, expense, price, cost, spending, revenue, or financial behavior.

## Explicit Non-Goals

Slice A does not include:

- free-form ask
- LLM calls
- cloud AI
- diagnosis or medical advice
- therapy interpretation
- finance, expense, accounting, trading, or spending interpretation
- productivity scoring
- spiritual scoring, merit scoring, or practice-quality judgment
- correlation UI, helpers, coefficients, matrix, chart, or calculation
- relationship/causation claims

## Review Card Boundary

Review cards may summarize:

- hydration pattern
- sleep and recovery pattern
- load and recovery pattern
- drinks, caffeine, and sweetness pattern
- Mind Note and support need pattern
- missing or blank data pattern

Each card should include a short summary, evidence from available rows, and a gentle note. Wording should preserve agency and use language such as "may", "appears", "suggests", "can be read as", "อาจ", "ดูเหมือน", and "เป็นสัญญาณ".

Avoid wording that sounds like command, diagnosis, risk prediction, moral judgment, or proof that the user is doing well or badly.

## Future Backlog

Future slices are separate from Slice A:

- Slice A+: stronger preset source-bound questions after the review cards are stable.
- Slice B: guided source-bound question presets.
- Slice C: local context packet export for an external Local LLM Lab.
- Slice D: free-form Ask My Log only after guardrails, source boundaries, and deterministic review behavior are proven.

## Future Slice A+/B — Signal Relationships / Correlation Review

Correlation Review is a future feature, not Slice A.

The safer naming should be:

- TH: สัญญาณที่เคลื่อนไหวร่วมกัน
- EN: Signals moving together
- EN alternate: Signal Relationships

Correlation is not causation. If this feature is added later, the UI must avoid implying cause and effect, diagnosis, risk prediction, health status, personality inference, or medical advice.

Numeric variables that may be considered in the future:

- `Water_ml`
- `Sleep_Hours`
- `Sweet_Drinks_Count`
- `Sugar_Score`
- `Caffeine_Score`
- `Milk_Drink_Count`
- `Hydration_Support_Count`
- `Load_Score`
- `Practice_Minutes`

Category variables such as `Energy`, `Mind`, `Sleep`, `Load_Level`, and `Mind_Note_Support` require explicit mapping before any relationship review. The app must not guess category order or let an AI infer mappings from text.

Possible future methods:

- Pearson for numeric-to-numeric variables.
- Spearman for explicitly mapped ordinal variables.

Minimum n rule:

- `n < 10`: do not show correlation.
- `n 10-29`: show as tentative signal only.
- `n >= 30`: show as observed pattern, still not cause and effect.

If implemented later, correlation must be deterministic calculation only. Do not let an LLM compute correlation from text by itself.

This patch must not implement correlation UI, helpers, calculations, coefficients, category mappings, relationship matrices, charts, or free-form relationship questions.

## Guardrail Sentence

Field Review Slice A should help the user review saved Daily Log patterns gently and locally, without turning Mindful Health Balance into a chatbot, diagnosis system, finance analyzer, productivity judge, spiritual scorer, or correlation/causation engine.
