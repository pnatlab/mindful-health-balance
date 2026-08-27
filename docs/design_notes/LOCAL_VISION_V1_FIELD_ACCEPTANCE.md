# MHB 2.4J - Local Vision v1 Field Acceptance

## Status and Decision

**Decision: `field_use_ready_with_known_constraints`.**

The first local Vision path completed a real large-iPhone-HEIC workflow from browser selection through human-reviewed Meal Composer draft. No production code changed in this acceptance slice. The public runtime remains **MHB 2.3 - Gentle Meal Composition**.

This is field-readiness evidence for an optional local prototype, not a declaration that visual recognition is authoritative or that MHB 2.4 is stable.

## Purpose and Locked Path

The acceptance question was whether a normal large iPhone HEIC can reach a useful, correctable draft without manual conversion, state corruption, hidden persistence, or an evidence shortcut.

```text
large HEIC -> local JPEG normalization -> loopback Ollama / gemma3:12b
  -> parser-lines-v3 -> deterministic validation -> human review
  -> accepted draft fields -> existing deterministic runtime
```

The image policy remained `1600 px` maximum dimension and JPEG quality `0.90`. The provider remained loopback-only, the observation schema remained `mhb.vision-meal-observation/v1`, and temperature remained `0`.

## Environment

- Browser origin: `http://127.0.0.1:4173`
- Provider: `http://127.0.0.1:11434`
- Model: installed `gemma3:12b`
- Loaded model observation after QA: about 8.0 GB, 100% GPU, context 4096
- No `OLLAMA_ORIGINS` change, cloud endpoint, bridge, Python service, or remote fallback was used

Ollama availability was checked before image selection. The browser reached the existing direct local provider path without changing application startup requirements.

## Large HEIC Samples

Two authorized personal images from the ignored local corpus were used. This note de-identifies them and stores no image, base64, raw response, or personal filename.

| Sample | Source | Source bytes | Normalized output | Output bytes | Normalization latency |
| --- | --- | ---: | --- | ---: | ---: |
| A | `5712 x 4284` HEIC | 2,030,929 | `1200 x 1600` JPEG | 335,930 | 3,340 ms cold |
| B | `5712 x 4284` HEIC | 2,640,946 | `1200 x 1600` JPEG | 535,111 | 1,509 ms warm |

Both images normalized locally without manual conversion. The preview remained bounded and transient. The normalizer reported orientation-aware portrait geometry (`4284 x 5712` decoded to `1200 x 1600`); the established 2.4F/2.4I visual orientation check remains applicable to this unchanged converter and policy.

## End-to-End and Review Results

Sample A reached a valid review with broad `fried rice` context, Meal Type proposals, one safely mapped `rice` component, unsupported descriptive components, explicit animal-species uncertainty, and all three constrained `not_observable` values. Before human action, the draft remained empty, the saved-meal count remained zero, and no named-dish or sodium route was active.

The reviewer kept `rice`, omitted the image Meal Type, and applied the selection. Only rice entered the draft. The meal was not saved.

Sample B reached a valid review containing broad grilled-meal context, a safe `shrimp` mapping, an ambiguous `seafood` mapping, unsupported `meat`/vegetable text, and explicit species uncertainty. The reviewer selected `fish` for the ambiguous mapping, kept shrimp, omitted unsupported observations, and deliberately chose a conflicting `minimally_prepared` Meal Type proposal to exercise merge priority.

No artificial ambiguity was introduced; the model output supplied the real user-choice case.

## Draft Merge and Save Boundary

Before Sample B, the human-created draft contained:

- label `lunch` and time `12:34`;
- Meal Type `grilled`;
- rice plus a manually added egg at portion `large`; and
- `condiment_knowledge: unknown`.

After applying the reviewed observation:

- the existing human Meal Type remained `grilled`;
- label, time, egg portion, and condiment state remained unchanged;
- fish and shrimp were added;
- unsupported and unresolved observations were not added;
- no existing component was duplicated;
- no Meal Instance was created and the saved-meal count remained zero.

`Use selected items in this meal` remained a draft-only action. `Keep this meal` remained the only save boundary and was not activated during this acceptance.

## Named-Dish and Sodium Firewalls

Vision review never set or confirmed `named_dish_id`. Neither tested draft produced a deterministic approved named-dish candidate, so no candidate was forced for QA. The existing separate confirmation boundary remains intact by code and regression coverage.

Vision produced no sodium value. Rice alone remained unknown. The later `90-93 mg` partial estimate came only from the manually added large egg through the existing approved component reference. Fish and shrimp remained unknown. This confirms that draft sodium continued to come from deterministic Food Reference evidence rather than model output.

## Failure, Clear, Replace, and Reload

A deliberately invalid temporary HEIC fixture failed during local image preparation before provider inference. MHB showed calm preparation-failure copy and preserved all four draft items, label, time, Meal Type, egg quantity, and condiment state. Manual composition and the save control remained usable.

Closing the failed Vision session removed its transient result while preserving the draft. Selecting Sample B after Sample A did not display stale preview or observation state. After Vision apply but before meal save, a page reload restored current Meal Composer semantics: the unsaved draft and transient Vision proposal were gone, while the saved-meal count remained zero. No unaccepted observation was resurrected.

## Latency and Stability

The first review was observed about 152 seconds after selection; the warm second review was observed about 46 seconds after selection. These are browser-observed end-to-end bounds and include polling/automation overhead, so they should not be treated as a provider benchmark. They are materially slower and more variable than the earlier small pilot baseline.

Both large images completed without a crash, stuck preparation state, obvious preview accumulation, or second-run failure. The current experience is field-usable only as an explicit optional action with honest waiting copy. Latency remains a known constraint to observe in real use.

## Responsive, Dark, Console, and Network QA

- The tested page was in actual dark theme and review/draft text remained readable.
- At a `390 x 844` viewport, document and body scroll width remained exactly 390 px; the image action and meal-save controls remained visible and no horizontal overflow appeared.
- Browser console inspection returned no warnings or errors.
- Vision requests were constrained by the existing parsed loopback endpoint validator to `127.0.0.1`; no cloud or remote Vision request was configured or observed.

The responsive check covered the resulting helper/draft states. No additional model run was created solely to keep a review card open at the narrow viewport.

## Known Limitations

- `gemma3:12b` can still misidentify species, components, or dish family. Human review is the safety mechanism, not model accuracy.
- End-to-end latency varied substantially in this session.
- HEIC decoding still expands a full frame before resize and therefore retains the memory constraint documented in MHB 2.4I.
- Exact browser/provider timing metadata is not exposed in the production review UI; this acceptance records wall-clock observation only.
- No approved named-dish candidate naturally appeared in these two runs, so its separate confirmation UI was not forced with synthetic meal facts.

## Conditions for Field Use

Field use should remain local, optional, single-image, and explicitly reviewed. The user should keep or correct only visible observations, save the meal separately, and treat dish text as review context. Manual Meal Composer must remain the immediate fallback whenever latency, model output, or image preparation is not useful.

## Stop and Observe Recommendation

Pause Vision feature development after this acceptance. Use the current prototype in ordinary daily logging and keep optional, manual, local notes on:

- whether Vision was useful or not useful;
- corrections or omissions required;
- recurring mapping gaps;
- latency annoyance; and
- any image-preparation or provider failure recurrence.

Do not add telemetry. A future Vision patch should be scoped from repeated field evidence, not from another speculative tuning round.
