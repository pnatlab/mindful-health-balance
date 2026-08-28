# MHB 2.6A - Vision Observation Vocabulary & Field-Learning Layer

## Problem Discovered in Field Use

Vision can emit broad or unfamiliar visible labels such as `seafood`, `mushroom`, or `pork belly`. MHB must preserve the distinction between a model observation and the smaller, human-approved Food Reference vocabulary. Without a separate layer, a vocabulary gap can look like a model error, or an unsafe nearest-match can silently become a Meal Item.

## Three-Layer Separation

```text
Vision Observation -> mapping/review -> human-confirmed Meal Item -> canonical meal log
Vision Observation -> vocabulary evidence -> future human Food Reference review
```

| Layer | Meaning | Authority |
| --- | --- | --- |
| Vision Observation | A label the model proposed as visibly present | Local model, transient proposal |
| Observed Vocabulary Evidence | A local count of an observed label and its current mapping outcome | Deterministic organizer only |
| Food Reference | MHB's human-approved canonical food vocabulary | Human-reviewed runtime library |
| Meal Item | A food the human accepted into a particular meal | Meal Composer human action |

No label is promoted by frequency, and no raw label becomes a canonical Food Reference ID.

## Observation Contract

Each recorded component label is represented as:

```js
{
  observed_label: "Seafood",
  normalized_label: "seafood", // trim, collapse whitespace, case-normalize only
  mapping_status: "mapped" | "needs_review" | "unsupported",
  mapped_food_reference_id: null // non-null only for an existing exact canonical mapping
}
```

The contract does not contain an image, model confidence, nutrition, sodium, hidden ingredients, named-dish identity, Meal Item, or medical claim. Normalization prevents accidental case/whitespace duplication; it is not semantic repair. For example, `pork belly` is not normalized to `pork`, and `seafood` is not normalized to `shrimp`.

## Mapping and Evidence Accumulation

The existing `classifyVisionComponent()` remains the mapping authority. Its `safe_exact` result becomes `mapped`; `needs_user_choice` becomes `needs_review`; and `unsupported` stays `unsupported`. Existing explicit mapping policy remains intact, including its already-reviewed label patterns.

For every **validated** Vision observation that reaches review, `mhb_vision_observation_vocabulary_v1` records component-label evidence in a separate localStorage value. It aggregates only by normalized label, retaining the current deterministic mapping status and `seen_count`. `seen_count` means “model emitted this label in a validated observation,” not “the user ate this food,” not visual truth, and not a promotion threshold. Mapped labels may be recorded for audit completeness; future vocabulary-gap review uses the `needs_review` and `unsupported` subset.

This side record does not alter review selection, the draft, Meal Instances, Daily_Log, workbook, Reflection, Signal Engine, named-dish state, or sodium evidence. It is intentionally outside the meal-record store and is not exported.

## Human Agency and Privacy

The model observes. The system organizes local evidence. The human still selects any Food Reference, accepts a Meal Item, and separately confirms a named dish. A user choosing `shrimp` for raw `seafood` affects that meal only; it does not rewrite the evidence label or teach an automatic mapping.

Only small text labels, deterministic mapping outcomes, and counts are stored locally. No photo, base64 payload, raw model prose, meal identifier, or telemetry is retained. The store is a field-learning artifact, not autonomous learning.

## Known Limitations and Future Direction

Counts can include model mistakes and cannot establish a Food Reference candidate on their own. MHB 2.6B adds a read-only local audit panel for this evidence, but still has no end-user taxonomy-editing, promotion, or remapping UI by design. A future, separately approved human-review slice may define an evidence process for Food Reference additions. Food Reference expansion, meal context/amount, and taxonomy changes remain outside this layer.

## Documentation Impact Check

MHB 2.6A was an internal local evidence layer. MHB 2.6B adds a small user-facing read-only entry, so the README and user guides describe only that audit visibility and its non-promoting boundary.
