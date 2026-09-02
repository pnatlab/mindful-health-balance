# MHB 2.6B - Read-only Vision Vocabulary Audit UI

## Purpose

MHB 2.6B makes the existing local Vision vocabulary evidence visible without making it actionable. The small audit panel answers one quiet field-learning question: what normalized labels has the local Vision provider emitted, how often, and what did deterministic mapping currently conclude?

It is not an analytics dashboard, an AI administration surface, or a Food Reference editor.

## Placement and Data Source

The Log page shows this audit as a separate collapsed section after the read-only Saved Meal History projection. The Daily Log Table remains primary; Saved Meal History represents canonical human-authorized Meal records, while this panel remains a separate model-observation trace. It expands to show the same summary, filters, and list, without being mistaken for part of the meal currently being composed or for proof that a meal was saved.

The panel reads only from `mhb_vision_observation_vocabulary_v1` through `js/visionObservationVocabulary.js`. `js/visionVocabularyAuditUI.js` is a display-only adapter: it calls the store's `list()` method, safely handles read failure as an empty snapshot, sorts entries, creates summary counts, and filters an in-memory snapshot. It has no storage write API.

## Display Contract

Each row presents only:

- the normalized observation's human-facing `observed_label`
- `seen_count`
- the current mapping outcome

Mapped rows may show the existing canonical Food Reference display name. `needs_review` and `unsupported` rows show their status only; they never suggest a nearest Food Reference.

Entries sort by `seen_count` descending, then `normalized_label` alphabetically for deterministic ties. The compact summary and optional status filters use the same three statuses:

| Internal status | User-facing meaning |
| --- | --- |
| `mapped` | Known already |
| `needs_review` | Needs a clearer choice |
| `unsupported` | Not in the system yet |

The UI explicitly says that counts are not truth. A repeated label means only that a validated model observation emitted it, not that the user ate it or that MHB should add a Food Reference.

## Read-only and Canonical Boundaries

The panel has no add, edit, delete, approve, promote, remap, clear, or export controls. It cannot write vocabulary evidence, mutate Food References, add a Meal Item, alter the draft, save a meal, set `named_dish_id`, or route sodium evidence. Opening, filtering, and closing the panel do not affect the Meal Composer draft.

It does not display photos, base64, prompts, provider diagnostics, latency, model confidence, raw model prose, or raw uncertainty prose. The audit is therefore a local field-learning view, not a replay of a Vision session.

## Privacy, Failure, and Accessibility

The surface uses browser-local evidence only. It makes no network request, cloud request, telemetry call, or synchronization attempt. A missing or unreadable local store produces a calm empty state; the Meal Composer and optional Vision helper remain usable.

The panel uses semantic headings, a keyboard-operable disclosure button with `aria-expanded` and `aria-controls`, visible focus from the existing button system, textual status labels, and an empty state. It reflows to a single column at narrow widths and uses existing dark-theme contrast tokens.

## Limitations and Future Direction

This is visibility before action. The evidence can reveal vocabulary gaps, but it cannot establish their correctness or promote a label into MHB's canonical Food Reference library. Any future human promotion workflow needs a separate contract for evidence review, source validation, Food Reference governance, and explicit human action.

MHB 2.6B does not change the public MHB 2.3 version, Vision prompt/model/image policy, meal storage, sodium evidence, named-dish confirmation, workbook, Daily_Log, Reflection, or Signal Engine.
