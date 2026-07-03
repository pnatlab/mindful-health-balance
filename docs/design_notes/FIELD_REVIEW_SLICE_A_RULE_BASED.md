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
- causal relationship claims, chart/matrix relationship UI, category mapping, or LLM-based correlation
- relationship/causation claims

## Review Card Boundary

Review cards may summarize:

- hydration pattern
- sleep and recovery pattern
- load and recovery pattern
- drinks, caffeine, and sweetness pattern
- Mind Note and support need pattern
- missing or blank data pattern

Each card should use a three-layer structure:

1. Evidence line from available `Daily_Log` rows.
2. NuTuenSai-style deterministic reading.
3. Gentle next attention.

The voice layer is rule-based and template-driven. It may sound warmer than a dashboard, but it must not become live LLM generation, free-form chat, diagnosis, advice, correlation, or causation analysis.

Wording should preserve agency and use language such as "may", "appears", "suggests", "can be read as", "อาจ", "ดูเหมือน", and "เป็นสัญญาณ".

Avoid wording that sounds like command, diagnosis, risk prediction, moral judgment, or proof that the user is doing well or badly.

## Timeframe Voice

Slice A may vary tone by selected timeframe:

- 7 days: short window, early signal, no over-conclusion.
- 14 days: emerging rhythm, enough to notice some repetition.
- 30 days: month-level rhythm, still not diagnosis.
- All available: long-view reflection, while remembering that day contexts vary.

Timeframe voice should sit beside the evidence and should not replace numeric evidence.

## Visual Slice 1 — NuTuenSai Field Reflection Studio Shell

Visual Slice 1 may make Field Review feel less like a report page and more like a gentle NuTuenSai field reflection studio.

Allowed presentation changes:

- studio hero copy and CSS-only water-light/rhythm motif
- segmented timeframe control for 7 days, 14 days, 30 days, and all available
- soft overview chips derived from the same selected `Daily_Log` rows
- CSS-only selected-rhythm dot strip using selected rows as visual anchors
- lighter review card styling while keeping Evidence, NuTuenSai reads, and Next gentle attention visible
- NuTuenSai Field Room background images behind the six review cards, with readability overlays and safe fallback when images do not load
- guided Field Rooms workspace with a room selector, one active room panel, locked chat-style bubbles, focus chips, and suggested next-room navigation
- sidebar hierarchy that separates the six Guided Field Rooms from the English-only `Signal Engine` entry
- locked guided conversation flow where NuTuenSai asks predefined focus questions, the user chooses predefined chips, and the visible response changes deterministically
- conversation stack layout where the active room renders question, locked choices, source-bound response, and next-room continuation in that order
- bottom action area layout where locked choices and next-room navigation sit below the response, not between the question and answer
- Signal Relationship Engine as a seventh room for deterministic numeric-to-numeric Pearson relationship rows with a NuTuenSai Meaning Dictionary, visible `r`/paired-day evidence chips, compact same/opposite/unclear legend, raw column audit lines, and source-bound pair-specific meaning details

This visual slice must remain bounded. It must not add a chart library, relationship matrix, LLM call, free-form ask box, diagnosis wording, score/ranking system, finance interpretation, category mapping, or schema change.

The chat-like workspace is not a chatbot. Bubbles are rendered from deterministic source-bound card data only: selected `Daily_Log` window, evidence, NuTuenSai-style reading, and next gentle attention. Focus chips are locked questions, not prompts sent to an LLM. Suggested next/related room buttons only change the active room and do not create recommendations or new analysis.

## Future Backlog

Future slices are separate from Slice A:

- Slice A+: stronger preset source-bound questions after the review cards are stable.
- Slice B: guided source-bound question presets.
- Slice C: local context packet export for an external Local LLM Lab.
- Slice D: free-form Ask My Log only after guardrails, source boundaries, and deterministic review behavior are proven.

## Signal Relationships / Correlation Review

Signal Relationship Engine is now a conservative Slice A relationship layer for numeric-to-numeric fields only. It presents up to five valid relationship rows ranked by absolute `r`; row titles use a NuTuenSai Meaning Dictionary first, `r` and paired-day counts remain visible as evidence chips, raw column pairs remain visible as technical evidence, and selecting a row opens a deterministic Meaning Voice Matrix detail signed `MHB · NuTuenSai`. The UI may include a compact legend and plain-language `r` helper for non-technical users, but the calculation and classification stay unchanged. The runtime voice is selected by pair key, direction band, strength band, and paired-row count band. The meaning templates are authored rules, not LLM generation.

The safer naming should be:

- TH: สัญญาณที่เคลื่อนไหวร่วมกัน
- EN: Signals moving together
- EN alternate: Signal Relationships

Correlation is not causation. The UI must avoid implying cause and effect, diagnosis, risk prediction, health status, personality inference, or medical advice.

Numeric variables that may be considered:

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

Implemented method:

- Pearson for numeric-to-numeric variables.

Possible future methods:

- Spearman for explicitly mapped ordinal variables.

Minimum n rule:

- `n < 10`: do not show correlation.
- `n 10-29`: show as tentative signal only.
- `n >= 30`: show as observed pattern, still not cause and effect.

Correlation must be deterministic calculation only. Do not let an LLM compute correlation from text by itself.

This patch implements only relationship rows and meaning details for selected numeric pairs. It must not implement category mappings, relationship matrices, charts, Spearman, or free-form relationship questions.

## Guardrail Sentence

Field Review Slice A should help the user review saved Daily Log patterns gently and locally, without turning Mindful Health Balance into a chatbot, diagnosis system, finance analyzer, productivity judge, spiritual scorer, or causation engine.
