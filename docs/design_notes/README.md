# Mindful Health Balance Design Notes

This folder contains design notes for Mindful Health Balance history, the current MHB 2.2 runtime direction, and bounded future work.

Source files are currently kept flat in this folder for path stability. This README groups them by topic for easier reading, but it is organizational only. Do not treat this grouping as a physical folder migration yet.

Future folder migration may happen later as a dedicated docs patch.

## 00 Foundation

Core identity, public definition, portable field memory, local-first behavior, and AI-ready reflection boundaries. The current positioning is a local-first personal rhythm research prototype and user-owned field memory for AI-assisted self-reflection.

- [AI_READY_REFLECTION_SYSTEM_DEFINITION.md](AI_READY_REFLECTION_SYSTEM_DEFINITION.md) - Public-facing definition of the app as an AI-ready, local-first self-care reflection system.
- [PORTABLE_FIELD_MEMORY_DESIGN.md](PORTABLE_FIELD_MEMORY_DESIGN.md) - Foundation for the exported workbook as portable, user-owned field memory.
- [USER_INTENTION_PROFILE_LAYER.md](USER_INTENTION_PROFILE_LAYER.md) - Defines the optional, user-owned intention profile layer for safe personalization without changing user data ownership.
- [USER_INTENTION_PROFILE_SCHEMA_UI_PROPOSAL.md](USER_INTENTION_PROFILE_SCHEMA_UI_PROPOSAL.md) - Locks the future optional profile sheet contract, UI structure, and backward-compatible import/export policy before runtime work.
- [USER_INTENTION_ALIGNMENT_BRIDGE.md](USER_INTENTION_ALIGNMENT_BRIDGE.md) - Defines the user-owned alignment contract that bridges profile intention, rule-based reflection, Excel field memory, future local LLM drafts, and human audit.

## 01 Excel Export / Portable Workbook

Excel export structure, Summary sheet behavior, Column_Guide, and human/AI-readable workbook design.

- [EXCEL_SUMMARY_REFINEMENT.md](EXCEL_SUMMARY_REFINEMENT.md) - Clarifies Summary sheet fields such as Total_Logs, Unique_Days, and Summary_Note.
- [EXCEL_COLUMN_GUIDE_DESIGN.md](EXCEL_COLUMN_GUIDE_DESIGN.md) - Defines Column_Guide as a Thai/English schema guide that preserves canonical headers.
- [LEGACY_WORKBOOK_NORMALIZATION.md](LEGACY_WORKBOOK_NORMALIZATION.md) - Defines import normalization for old workbook placeholder artifacts without modifying source files.

## 02 Reflection UX

Today and Reflection page hierarchy, preview synthesis, NuTuenSai note strip, zen generation moment, and display-only UX decisions.

- [REFLECTION_PRESENTATION_DECISION.md](REFLECTION_PRESENTATION_DECISION.md) - Explains why the preview is a concise synthesis instead of a raw field dump.
- [REFLECTION_PAGE_LAYOUT_DECISION.md](REFLECTION_PAGE_LAYOUT_DECISION.md) - Records the Reflection page layout decision with the reminder strip and focused generator.
- [REFLECTION_GENERATION_MOMENT.md](REFLECTION_GENERATION_MOMENT.md) - Documents the zen/circular Reflection Generator moment and Clear Reflection behavior.
- [TODAY_INPUT_STEP_FLOW_DECISION.md](TODAY_INPUT_STEP_FLOW_DECISION.md) - Documents the v1.9.2 two-step Today Input flow and Clear Current Form placement.
- [INPUT_AWARE_CARD_STATE.md](INPUT_AWARE_CARD_STATE.md) - Defines the Blue Active Card Layer for visual-only input-aware Today cards.
- [STRUCTURED_SLEEP_RUN_DETAIL_V1_9_3.md](STRUCTURED_SLEEP_RUN_DETAIL_V1_9_3.md) - Records the v1.9.3 decision for optional Sleep_Hours and Run_Detail_JSON inside existing Today cards.
- [LLI_CONTINUITY_REFLECTION_LAYER_V1_9_5.md](LLI_CONTINUITY_REFLECTION_LAYER_V1_9_5.md) - Defines the v1.9.5 Previous Log Context / LLI continuity layer for reading the latest 1-3 prior logs as supportive context.
- [INPUT_GROUNDED_REFLECTION_COMPOSER_V1_9_8.md](INPUT_GROUNDED_REFLECTION_COMPOSER_V1_9_8.md) - Defines the v1.9.8 rule-based composer, NuTuenSai voice cadence, low-data micro-continuity, and anti-repetition layer.
- [DAILY_LOG_GAP_AWARENESS.md](DAILY_LOG_GAP_AWARENESS.md) - Defines MHB 2.2 runtime-only awareness of time between saved Daily_Log dates without streaks, rewards, penalties, or schema changes.
- [REFLECTION_BREATHING_MARKERS_V1_9_8B.md](REFLECTION_BREATHING_MARKERS_V1_9_8B.md) - Defines the v1.9.8b soft emoji breathing markers for reflection readability without section headings.
- [REFLECTION_SENTENCE_SMOOTHING_V1_9_8C.md](REFLECTION_SENTENCE_SMOOTHING_V1_9_8C.md) - Defines the v1.9.8c connector hygiene layer that splits rich anchor context into more natural sentences.
- [ROOT_BASED_REFLECTION_WEIGHTING.md](ROOT_BASED_REFLECTION_WEIGHTING.md) - Defines the future Root-Based Reflection Composer / NuTuenSai Attention Weighting Layer without runtime changes.
- [PRACTICE_REFLECTION_LAYER_RESEARCH.md](PRACTICE_REFLECTION_LAYER_RESEARCH.md) - Defines the research boundary and future two-layer practice reflection model for today context and 7-day continuity without runtime changes.
- [MINDFUL_PRACTICE_CONTEXT_V1_9_9.md](MINDFUL_PRACTICE_CONTEXT_V1_9_9.md) - Defines the v1.9.9 optional practice context and Practice_Note layer before Mind Note, stored for Field Review context and excluded from daily Reflection.
- [COMPACT_SIGNAL_COCKPIT_LAYOUT_V1_9_6.md](COMPACT_SIGNAL_COCKPIT_LAYOUT_V1_9_6.md) - Defines the v1.9.6 two-card Today Input 1/2 cockpit layout experiment.
- [SYMBOLIC_SIGNAL_COCKPIT_POLISH_V1_9_7.md](SYMBOLIC_SIGNAL_COCKPIT_POLISH_V1_9_7.md) - Defines the v1.9.7 symbolic constellation polish for the Today cockpit.

## 03 Signal Logic

Signal interpretation rules, hydration/drink/energy/mind/activity mapping, and reflection guardrails.

- [HYDRATION_ADAPTIVE_GUIDANCE.md](HYDRATION_ADAPTIVE_GUIDANCE.md) - Defines adaptive hydration guidance and the separation of activity load from recovery-only signals.
- [DRINK_SWEETNESS_INSIGHT.md](DRINK_SWEETNESS_INSIGHT.md) - Defines sweetness and soda as drink-load context, not moral or medical judgment.
- [ENERGY_CAUSE_ALIGNMENT.md](ENERGY_CAUSE_ALIGNMENT.md) - Explains layered interpretation for energy causes and seemingly mixed signals.
- [MIND_STATE_WORDING_DECISION.md](MIND_STATE_WORDING_DECISION.md) - Records wording choices for public-safe mind state language.
- [MIND_NOTE_FEELING_OPTIONS.md](MIND_NOTE_FEELING_OPTIONS.md) - Defines Mind Note Feeling options such as uneasy and feeling_good.
- [MIND_STATE_POSITIVE_OPTIONS.md](MIND_STATE_POSITIVE_OPTIONS.md) - Defines positive mind states as support signals, not performance scores.
- [REFLECTION_SIGNAL_MATRIX.md](REFLECTION_SIGNAL_MATRIX.md) - Matrix of reflection behavior across signal layers and combinations.
- [ACTIVITY_LOAD_ROOT_MATRIX.md](ACTIVITY_LOAD_ROOT_MATRIX.md) - Defines Activity Load Roots and short Activity Root Summary wording.

## 04 v2 Roadmap

Field Review Slice A, future Field Review Companion, timeframe-aware review, v2 navigation, and guided review direction.

- [FIELD_REVIEW_SLICE_A_RULE_BASED.md](FIELD_REVIEW_SLICE_A_RULE_BASED.md) - Locks MHB 2.0 Slice A as rule-based Daily_Log review and documents the current bounded Signal Engine relationship layer.
- [SIGNAL_ENGINE_CORRELATION_REFERENCE.md](SIGNAL_ENGINE_CORRELATION_REFERENCE.md) - Locks conservative Pearson correlation interpretation bands for Signal Engine before the future Meaning Voice Matrix.
- [SIGNAL_ENGINE_MEANING_VOICE_MATRIX.md](SIGNAL_ENGINE_MEANING_VOICE_MATRIX.md) - Defines the deterministic pair/direction/strength/n voice matrix for Signal Engine meaning details.
- [FIELD_REVIEW_COMPANION_V2.md](FIELD_REVIEW_COMPANION_V2.md) - Roadmap for a guided Field Review Companion rather than an open-ended chatbot.
- [FIELD_REVIEW_CONVERSATIONAL_COMPANION.md](FIELD_REVIEW_CONVERSATIONAL_COMPANION.md) - Defines the deterministic choice-card conversation model, exit rule, and closing note for future Guided Field Rooms.
- [FIELD_REVIEW_TIMEFRAME_LAYER_V2.md](FIELD_REVIEW_TIMEFRAME_LAYER_V2.md) - Roadmap for choosing day/week/month/long-term review frames honestly.
- [NAVIGATION_ARCHITECTURE_V2.md](NAVIGATION_ARCHITECTURE_V2.md) - Proposed v2 navigation structure including Field Review.

## 05 Architecture / Implementation Planning

Runtime architecture, modularization planning, and implementation-safety notes for future MHB refactors.

- [SCRIPT_MODULARIZATION_PLAN.md](SCRIPT_MODULARIZATION_PLAN.md) - Audits the current monolithic `script.js` responsibilities and proposes a conservative GitHub Pages-compatible modularization path.

## 99 Stabilization

Pre-v2 stability checklist for v1.9.x.

- [V1_9_STABILIZATION_CHECKLIST.md](V1_9_STABILIZATION_CHECKLIST.md) - Checklist for validating v1.9.x before implementing v2.0 features.

## Future Folder Migration Note

Physical folder grouping is intentionally postponed to avoid breaking existing links and context bundle references.

If the repo later migrates these files into subfolders, update README links, context bundle source references, and any checklist references in a dedicated migration patch.
