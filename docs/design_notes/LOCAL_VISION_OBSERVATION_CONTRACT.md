# MHB 2.4C - Local Vision Observation Contract and Optional Provider Adapter Design

## Status

**Contract locked for a future bounded local-provider prototype. Runtime implementation is not performed in this slice.**

This contract follows MHB 2.4A and the measured MHB 2.4B pilot. `gemma3:12b` can observe images locally, but its systematic species and dish-family errors mean vision remains a transient proposal source. Current public runtime remains **MHB 2.3 - Gentle Meal Composition**.

## Canonical Authority Chain

```text
Image
  -> Optional Local Vision Provider
  -> VisionMealObservation
  -> Deterministic validation
  -> Human review
  -> Accepted Meal Composer prefill
  -> Existing deterministic runtime
  -> Named-Dish candidate
  -> Separate explicit human confirmation
  -> named_dish_id
  -> Evidence router
  -> Traceable sodium evidence
```

| Owner | Responsibility | Never owns |
| --- | --- | --- |
| Vision provider | Visible observations, broad proposals, uncertainty | Meal identity, persistence, sodium, provenance, hidden facts |
| Human | Accepts, corrects, omits proposals; confirms dish identity | Automatic evidence routing by image alone |
| Deterministic MHB runtime | Validates accepted state, creates structured named-dish candidates, checks consistency, routes approved evidence | Vision inference or evidence creation |
| Evidence source | Approved sodium/provenance facts | Meal observation |

Vision must never set `named_dish_id`, select Thai FCD evidence, produce sodium/calorie/macro facts, infer hidden condiments as fact, estimate condiment quantity, create Meal Items silently, or persist a proposal.

## VisionMealObservation v1

`VisionMealObservation` is a transient, normalized proposal artifact. It is not a Meal Instance, Meal Item, Food Reference, Named-Dish Reference, workbook row, Reflection input, or sodium evidence.

```js
{
  schema_version: "mhb.vision-meal-observation/v1",
  observation_id: "transient-local-id",
  provider: {
    provider_id: "ollama-local",
    model_id: "gemma3:12b",
    strategy_id: "parser-lines-v2",
    endpoint_scope: "localhost"
  },
  status: "valid", // valid | invalid
  dish_candidates: [
    { label: "fried rice", confidence: "medium" }
  ],
  visible_components: [
    { label: "rice", confidence: "high" }
  ],
  meal_type_candidates: [
    { meal_type: "stir_fried", confidence: "medium" }
  ],
  uncertain_observations: [
    { topic: "component_identity", label: "visible protein is ambiguous" }
  ],
  not_observable: ["sauce_identity", "seasoning_amount"],
  validation: {
    issues: []
  },
  diagnostics: {
    observed_at: "transient timestamp",
    latency_ms: 6900,
    provider_timing: { total_duration_ns: 0, load_duration_ns: 0 }
  }
}
```

The provider must normalize its response to this shape before it becomes actionable. Provider/model/timing data may help the review UI and troubleshooting, but must not enter canonical meal storage. Raw image bytes and raw model prose are outside this object and must not be persisted in MHB.

### Contract Rules

- `meal_type_candidates[].meal_type` must be one of the existing MHB Meal Type values.
- Candidate labels remain descriptive text, never a Food Reference ID or a named-dish ID.
- Confidence is limited to `high`, `medium`, `low`, or `unknown`; it expresses observation uncertainty, not food quality or evidence quality.
- `not_observable` is a constrained image-limit vocabulary, initially `sauce_identity`, `seasoning_amount`, and `cooking_method`. It must not carry nutrition fields.
- `status: "invalid"` retains only safe diagnostics and validation issue codes. Its proposed observations are not actionable.
- No field is an instruction to mutate a Meal Composer draft.

## Validation: Fail Closed for AI, Fail Open for Meal Logging

Before a proposal can reach review, deterministic validation must reject malformed or boundary-violating provider output. It checks at minimum:

1. schema/version, required arrays, allowed scalar types, and non-empty usable content;
2. existing MHB Meal Type vocabulary;
3. allowed confidence vocabulary;
4. prohibited sodium, nutrition, medical, score, portion-weight, recipe, hidden-ingredient, and hidden-condiment assertions;
5. unsupported canonical IDs, including Food Reference IDs and `named_dish_id` values supplied as facts;
6. local-provider metadata and endpoint scope; and
7. empty, timeout, or provider-error results.

The validator may normalize benign formatting into the contract shape, but must not repair a prohibited assertion by deleting it and then treating the result as valid. A failing result becomes `invalid_output` with issue codes and is not shown as an actionable prefill.

This is intentionally asymmetric:

- **AI validation fails closed:** invalid AI output is rejected.
- **Meal logging fails open:** the existing manual Meal Composer stays usable, retains its draft, and remains saveable.

## Human Review and Acceptance Semantics

Every proposed component and Meal Type is individually reviewable. The human may accept it, replace/correct it, or omit it. A proposal is not canonical merely because it was emitted or displayed.

The review result is a separate transient `AcceptedVisionMealPrefill` concept:

```js
{
  source_observation_id: "transient-local-id",
  accepted_meal_type: "stir_fried", // optional
  accepted_food_ids: ["rice", "egg"], // optional, user-selected only
  omitted_proposal_indexes: [1],
  corrected_food_ids: ["fish"]
}
```

This is an interaction payload, not a persistence schema. A future UI may use it to invoke existing Meal Composer draft APIs for only the accepted Food References. It must not overwrite existing draft items, create a meal, or save a meal. **"เก็บมื้อนี้" remains the only canonical save boundary.** Closing, rejecting, or losing a transient proposal changes no meal record and reload must not resurrect it.

### Mapping Boundary

| Vision label class | Review behavior |
| --- | --- |
| Rice, egg, noodles, shrimp, squid, clearly visible fish | Safe exact suggestion; user still chooses whether to add it |
| Greens, scallion, generic vegetables, generic seafood | Safe broader suggestion or user choice; no automatic Food Reference selection |
| Generic pork | Needs user choice; it cannot establish `pork_lean` |
| Chicken versus fish, pork versus beef, ambiguous proteins | Cannot map safely; retain observation text or ask the user, do not choose |
| Sauce or seasoning | Do not map to a component unless the user explicitly records it |
| Any raw dish label | Candidate text only; never a named-dish mapping |

`prefill` means accepted suggestions can reduce manual taps. It never means auto-save, inferred components, or hidden state changes.

## Named-Dish Firewall

Vision saying "fried rice" or a more specific Thai label has no authority over `named_dish_id`.

The only allowed route remains:

```text
accepted components / Meal Type
  -> existing deterministic named-dish candidate helper
  -> existing explicit named-dish confirmation UI
  -> named_dish_id
```

There is no raw-label-to-`named_dish_id` table, no vision-confidence substitute for confirmation, and no vision-originated sodium path. The current named-dish consistency check remains the gate that can suspend evidence when accepted components conflict with a previously confirmed identity.

## Optional Provider Boundary

The MHB core must not import, start, or require Ollama, Gemma, Python, a model, or a network service. A future provider layer is optional and conceptually exposes:

```text
isAvailable() -> ProviderAvailability
observeMeal(image, options) -> VisionMealObservation | ProviderFailure
```

Provider state vocabulary:

`unavailable`, `checking`, `ready`, `observing`, `success`, `invalid_output`, `model_missing`, `provider_unreachable`, `image_error`, `timeout`, and `cancelled`.

Availability detects capability only; it does not block Meal Composer startup or manual logging. A provider failure preserves any draft and offers a calm return to manual composition. No fake progress or reward language is appropriate for the 2.4B latency profile.

## Reference Adapter: Local Ollama / Gemma

The future reference adapter is `OllamaGemmaVisionProvider`, not a permanent core dependency or a model-selection system.

| Adapter property | Locked initial value |
| --- | --- |
| Provider | Local Ollama |
| Reference model | `gemma3:12b` |
| Endpoint | Explicit `http://127.0.0.1:11434` or `http://localhost:11434` only |
| Request | Non-streaming local `/api/generate` with image bytes and constrained prompt |
| Strategy | `parser-lines-v2`-equivalent normalization |
| Temperature | 0 |
| Actionable output | Only after deterministic v1 validation |

Ollama documents `/api/generate` image input as base64 data for image-capable models, plus response timing fields that the probe already captures. Future code should keep these provider details inside the adapter rather than spreading model/prompt/API assumptions into Meal Composer. [Ollama generate API](https://docs.ollama.com/api/generate)

## Privacy and Local-Only Contract

- Image bytes may go only to an explicit localhost provider; remote hosts, LAN hosts, HTTPS cloud endpoints, and fallback endpoints are rejected.
- No cloud upload fallback, telemetry carrying photos, remote image hosting, or automatic corpus reuse is allowed.
- Personal meal photos remain ignored/outside Git and must never enter workbook data, `Daily_Log`, Meal Instance storage, Meal Items, Reflection data, or exports.
- No raw image bytes or raw model transcript is required for MHB persistence. A future debug mode, if approved separately, must be temporary/local and off by default.
- Future implementations may create an in-memory or temporary derived image for the local provider. It must be deleted after success/failure/cancel according to the browser/runtime's practical capabilities and must never be copied into app storage automatically.

## Browser-to-Ollama Risk

The successful Node probe does not establish browser integration safety. Ollama runs locally by default, but its CORS defaults allow loopback origins and additional origins require `OLLAMA_ORIGINS`; a GitHub Pages origin is not implicitly an allowed origin. [Ollama FAQ](https://docs.ollama.com/faq)

Before a browser UI slice, conduct a separate local integration probe that verifies:

1. CORS preflight and actual requests from the deployed and local MHB origins;
2. HTTPS-page to `http://localhost` browser security behavior on target browsers;
3. explicit user-controlled origin configuration, without loosening origins broadly by default;
4. availability checks that do not send an image;
5. endpoint allowlisting and rejection of non-loopback values; and
6. failure paths when a browser cannot reach Ollama although the local CLI can.

Do not add a Python bridge or startup manager to work around these unknowns. Whether a thin local bridge is needed is a separate human-reviewed architecture decision.

## Performance and Future UX Boundary

MHB 2.4B measured `parser-lines-v2` at about 6.6-8.0 seconds in the corpus run (6.9-second median), with warm repeats sometimes faster. A future experience therefore needs an explicit, optional action such as "Let AI look at this photo," a calm observing state, and a manual path that remains available. It must preserve draft state, avoid fake progress, and never turn observation into scoring or reward.

No image capture, picker, preview, prefill, or loading UI is implemented by this contract.

## Future Acceptance Plan

A bounded provider/prototype implementation must verify:

1. MHB works normally without Ollama or a model.
2. Remote endpoints are rejected.
3. Invalid model output cannot create a prefill.
4. A valid observation stays transient until per-field human acceptance.
5. Accepted observations prefill only selected existing Meal Composer fields.
6. Rejecting a proposal changes no canonical meal state.
7. Vision cannot set `named_dish_id` or create sodium evidence.
8. User correction overrides the proposal without hidden reconciliation.
9. Existing explicit named-dish confirmation remains separate.
10. Meal save stays explicit and existing Meal Composition tests stay passing.
11. Reload does not restore an unaccepted observation.
12. Provider failure or cancellation does not erase a draft.
13. Photos, bytes, and raw transcripts do not enter Git, workbook, `Daily_Log`, Meal records, or exports.
14. Keyboard/focus/announcement behavior and a no-provider manual fallback are accessible and understandable.

## Recommended Next Slice

**MHB 2.4D - Browser-to-Local-Ollama Integration Probe.** Validate CORS, localhost allowlisting, browser security behavior, availability detection, and fail-open behavior from an MHB browser origin before building a production image-capture or review UI.
