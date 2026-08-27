# MHB 2.4H - Observation Prompt and Strict-Validation Refinement

**Status:** completed controlled local refinement, 2026-08-27  
**Decision:** `A. adopt_refined_prompt`  
**Adopted strategy:** `parser-lines-v3`  
**Schema:** `mhb.vision-meal-observation/v1` unchanged

## Purpose and Fixed Boundary

MHB 2.4G found that the current image pipeline (`1600 px`, JPEG `0.90`) was sufficient for the pilot; extra image resolution did not reliably improve species or dish-family accuracy. This slice therefore held image preparation, `gemma3:12b`, and temperature `0` fixed and refined only the constrained observation prompt.

The authority chain is unchanged:

```text
Vision observes and proposes
-> deterministic parsing and validation
-> human review
-> accepted draft prefill
-> separate named-dish confirmation
-> deterministic evidence routing
```

No Vision output can set `named_dish_id`, select a Food Reference, create sodium evidence, save a meal, or alter the mapping layer. The model remains an optional local helper.

## Prompt Versions

P0 is retained as the historical `parser-lines-v2` baseline. The controlled candidates were:

| ID | Exact additive instruction after P0 | Intent |
| --- | --- | --- |
| P3 | `Prefer a broad visible meal family over an exact named dish when the image does not clearly support that specificity. For animal protein, name pork, chicken, beef, or a fish species only when the image itself makes that species visually unmistakable. Otherwise use the broad visible label meat, fish, seafood, or animal protein in COMPONENTS and write animal protein species in UNCERTAIN. Do not list a specific species and animal protein species uncertainty together.` | Prefer generic visible protein and uncertainty to unsupported species claims. |
| P4 / adopted v3 | P3 plus: `In NOT_OBSERVABLE, write only zero or more exact tokens from this list: sauce_identity, seasoning_amount, cooking_method. Never use spaces, prose, synonyms, or any other token there; use unknown when none applies.` | Avoid avoidable enum friction without accepting new semantic concepts. |

The production provider now sends P4 as `PARSER_LINES_V3_PROMPT` and reports `strategy_id: "parser-lines-v3"`. Prompt version changes do not change the v1 observation object shape.

## Controlled Method

Five de-identified images from the already authorized local corpus were used at the same `1600 px` / JPEG `0.90` setting. The subset included the recurring grilled-fish/chicken error, an ambiguous cooked-protein rice plate, a mixed noodle plate, the previous `invalid_not_observable` noodle/seafood image, and a useful fried-rice-family image.

Request matrix:

- five images each for P0, P3, and P4: 15 requests;
- three problematic images with P4 repeated twice: 6 requests;
- **21 local Ollama requests total**, all to `http://127.0.0.1:11434` with `gemma3:12b`, temperature `0`.

No image bytes, base64, raw provider prose, or identifying filenames are committed. Summary values only are recorded here.

## Results

| Measure | P0 baseline | P3 | P4 / adopted v3 |
| --- | ---: | ---: | ---: |
| Strict-valid observations | 4/5 | 5/5 | 5/5 |
| `invalid_not_observable` | 1 | 0 | 0 |
| Forbidden assertions | 0 | 0 | 0 |
| Unsupported mammal-species claims on ambiguous images | 3 | 0 in `COMPONENTS` | 0 in `COMPONENTS` |
| Generic protein plus visible uncertainty | 1/5 | 3/5 | 5/5 |
| Allowed Meal Type structure | 4 valid results | 5/5 | 5/5 |
| Broad meal-family utility | 4/5 useful | 5/5 actionable proposals | 5/5 actionable proposals |

P4 was repeated twice on the three original problem cases. Each repeat stayed strict-valid, retained broad meal structure, used `animal protein species` rather than a specific mammal label, and returned only allowed `NOT_OBSERVABLE` tokens. Its warm request times were roughly 3.7-4.3 seconds; timing is descriptive only.

### Species and Uncertainty

P0 asserted `pork` or `chicken` for three visually ambiguous animal-protein cases, including the repeatedly wrong grilled-fish/chicken result. P4 removed those specific mammal claims from `COMPONENTS` and consistently used a generic protein label plus `animal protein species` uncertainty.

This is a safety improvement, not proof of visual truth. One mixed noodle image still used an incorrect broad fish/seafood-category observation, and the model can still miss visible components. The refinement makes uncertainty easier than a narrow species claim; it does not make the model a reliable food classifier.

### Components, Meal Type, and Utility

Using the same visible-only human reference and broad-category credit defined for this small audit, P0 had **12 TP / 4 FP / 12 FN** (75% precision, 50% recall). P4 had **15 TP / 5 FP / 9 FN** (75% precision, 62.5% recall). The P4 gain comes largely from turning the formerly strict-invalid noodle image into a reviewable broad observation; it is not a claim of exact component recognition.

Meal Type values remained within the existing vocabulary. P4 retained useful broad structure such as a rice bowl, fried rice, stir-fry, or grilled meal, while avoiding exact regional dish reconstruction. The review/mapping layer still controls whether an observation can become a Food Reference prefill.

## NOT_OBSERVABLE Validation

The P0 failure was repeatable at the strict `NOT_OBSERVABLE` boundary. P4 reduced it from one failing image to zero in this controlled set by directly constraining output to the existing three-token vocabulary.

P4 also tended to list all three permitted image-limit tokens for several images. That is contract-valid but sometimes broader than the human reviewer would need. It does not create meal facts or evidence, yet it is a residual observation-quality limitation; strict-valid rate must not be read as perfect uncertainty usefulness.

The parser and validator were **not relaxed**. Existing benign formatting normalization remains limited to case and whitespace/underscore equivalents, for example `Sauce Identity` -> `sauce_identity`. A concept such as `ingredient amount` still fails `invalid_not_observable`; it is not silently mapped to another meaning. No new alias or semantic-repair table was needed for adoption.

Forbidden nutrition, calorie, macro, gram-weight, medical, recipe, hidden-ingredient, canonical-ID, and `named_dish_id` assertions still fail closed.

## Adoption Decision

`parser-lines-v3` is adopted because it met the bounded criteria in this pilot:

1. strict-valid output improved from 4/5 to 5/5;
2. `invalid_not_observable` fell from 1 to 0;
3. unsupported mammal-species claims in components fell from 3 to 0;
4. broad meal structure remained useful;
5. forbidden assertions remained zero; and
6. parser behavior did not become brittle in repeated P4 runs.

The change is intentionally small: prompt wording and provider strategy metadata only. `VisionMealObservation` remains v1; named-dish and sodium firewalls, Food Reference mapping, review semantics, image normalization, persistence, and manual fallback are unchanged.

## Tests and Limitations

Provider tests now verify:

- harmless `NOT_OBSERVABLE` formatting normalizes successfully;
- unknown concepts still reject;
- generic `meat` plus species uncertainty is valid;
- nutrition and `named_dish_id` remain forbidden; and
- successful provider metadata identifies `parser-lines-v3`.

This is a five-image, one-model local experiment. It does not establish general accuracy, and it does not remove the systematic residual error in fish/seafood family recognition. Further prompt tuning should not expand the validator or create automatic mapping.

## Next Recommendation

The prompt/validation friction has a bounded improvement. Because a residual visual protein-family error remains repeatable after this refinement, a future **controlled local model-comparison study is now justified** if human approval chooses to spend the scope on it. It must hold this v3 contract, the same local corpus protocol, and all evidence firewalls fixed; it is not part of this slice.

Current public runtime remains **MHB 2.3 - Gentle Meal Composition**. This is an internal optional-Vision refinement, not a version bump or a production nutrition feature.
