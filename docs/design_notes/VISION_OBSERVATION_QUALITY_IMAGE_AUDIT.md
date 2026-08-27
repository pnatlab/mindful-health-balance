# MHB 2.4G - Vision Observation Quality & Image Input Audit

**Status:** completed controlled local audit, 2026-08-27  
**Decision:** `F. mixed_constraints_need_targeted_refinement`  
**Primary finding:** the current `1600 px` / JPEG `0.90` image policy is sufficient for this bounded prototype. The material errors observed in this audit are principally model visual-identity errors and one parser/validation failure, not a demonstrated HEIC normalization or resize failure.

## Purpose and Boundary

This audit investigated why some observations from the optional local Vision helper are not useful or name a dish/component incorrectly. It tested the existing browser path only:

```text
authorized local HEIC
-> local transient HEIC-to-JPEG normalization
-> local Ollama / gemma3:12b
-> parser-lines-v2 parsing and deterministic validation
-> transient VisionMealObservation
```

It did not change Meal Composer behavior, saved meals, mapping policy, named-dish selection, sodium routing, workbook data, or Reflection. Vision remains a proposal source, not nutrition evidence.

## Privacy and Human Reference

Five representative images were selected from the already authorized nine-image personal local corpus. This note deliberately refers to them as samples A-E; it does not retain file names, image bytes, base64, or raw model prose. Every request targeted `http://127.0.0.1:11434` only, using `gemma3:12b`, temperature `0`, and no cloud service.

The pre-existing human annotation was reviewed before scoring. It records only broad visible meal family, clearly visible edible components, plausible Meal Types, and what cannot be visually established. In particular, recipe knowledge, hidden seasoning, sauce identity, portion weight, and ambiguous animal species were not treated as visual facts.

The five samples intentionally covered: an ambiguous cooked-protein rice plate, a grilled-fish plate that the model had called chicken, a visually clear fried-rice family image, a mixed stir-fried noodle plate, and a noodle/seafood image that had previously failed validation.

## Controlled Method

The baseline used the production normalizer and unchanged P0 `parser-lines-v2` prompt. Each of the five images was converted independently at four maximum dimensions, with JPEG quality held at `0.90`:

| Variant | Maximum dimension | Typical output size | Median provider latency |
| --- | ---: | ---: | ---: |
| V1 current | 1600 px | 0.42 MB | 6.95 s |
| V2 | 2048 px | 0.66 MB | 6.74 s |
| V3 | 2560 px | 0.94 MB | 6.77 s |
| V4 source-bounded | 4096 px | 2.14 MB | 6.99 s |

The V1 first request included a cold decoder/model path (9.57 s); later requests were normally near the 6-7 s range. Normalization median time after the first decoder load was roughly 0.5-1.1 s and did not dominate inference.

For a three-image quality subset, V1 resolution stayed fixed while JPEG quality changed from `0.85` to `0.90` to `0.95`. P1 added a request to prefer broad visible family over named dishes; P2 requested that unclear animal species be put in `UNCERTAIN`. Both prompt variants were evaluated at V1/0.90 on three problematic images. Finally, those same three images were run twice more with P0/temperature 0. Total local image-inference requests: **38**.

## HEIC Normalization Fidelity

The original HEIC rendering and the locally normalized JPEG were inspected at the current V1 policy. The normalized result remained upright, retained the full portrait framing and aspect ratio, and showed no material visible color shift, crop, mirroring, or compression artifact that would explain the observed identity errors. This was a visual QA check, not a pixel-for-pixel fidelity benchmark.

Native browser decoding of the HEIC is still unavailable on this machine; the local vendored decoder is therefore necessary for HEIC input. The successful JPEG path is not evidence that every iPhone image will be identical, but this sample provides no reason to treat normalization as the primary error source.

## Resolution and Quality Findings

Increasing image size changed some incidental labels but did not produce a consistent improvement in broad meal structure, species correctness, or validation success.

- The ambiguous rice plate stayed a rice-bowl/meat-family observation at every tier. At higher tiers the model sometimes became *less* specific (`meat`) rather than more reliable; the unresolved species claim did not become a justified fact.
- The grilled-fish sample was called chicken at every tier, including source-bounded resolution. The correct grilled Meal Type persisted, but extra pixels did not repair the species error.
- The fried-rice family remained correct at every tier. Higher resolution did not reliably improve the ambiguous protein label.
- The stir-fried noodle sample kept a useful stir-fry/cabbage/shrimp structure at every tier, but alternated among unsupported or false extra labels such as fried dough or fish cake.
- The noodle/seafood sample returned `invalid_not_observable` at all four sizes. This is a parser/validation failure pattern, not a resolution-sensitive outcome.

JPEG quality had the expected file-size effect but no material pilot-level quality effect. At V1, `0.85` produced approximately 0.26-0.39 MB outputs, `0.90` approximately 0.34-0.49 MB, and `0.95` approximately 0.50-0.69 MB for the subset. Quality `0.95` occasionally surfaced a small extra visible item, but did not correct a dish family or species error. It is not sufficient evidence to increase the production quality setting.

## Observation Quality

The audit separates seeing broad structure from naming a precise dish:

| Dimension | Finding |
| --- | --- |
| Broad meal structure | Useful for 4 of 5 V1 samples; rice, grilled/stir-fried context, and major plate structure were often visible. |
| Dish family | Fried-rice and stir-fried family were stable where visually clear. Grilled-fish was consistently misclassified as chicken; the invalid noodle sample produced no actionable family. |
| Exact dish identity | Not dependable enough to be a source of canonical identity. This reinforces the named-dish firewall. |
| Meal Type | The primary preparation was correct/plausible for the four valid V1 observations, though extra types such as `other`, `fried`, or `minimally_prepared` were sometimes over-inclusive. |
| Uncertainty | P1 improved one ambiguous-protein output by using `meat` plus uncertainty. P2 sometimes added an uncertainty note while retaining an unsupported species label, so it did not reliably resolve overconfidence. |

### Component Metrics

For the V1 baseline, a conservative de-duplicated comparison against the visible-only annotation yielded **12 TP, 4 FP, and 12 FN**: precision **75%**, recall **50%**. This is a small, deliberately difficult five-image subset, not a general model benchmark. Species claims were counted separately as errors whenever the human reference allowed only generic cooked protein.

The largest misses were an egg or noodle surface that was visible to the human reviewer but not proposed, plus the entire invalid observation. The most consequential false positives were chicken for visibly grilled fish and repeated non-evidenced food labels on the mixed noodle plate.

### Raw Observation vs Mapping

The mapping layer was not the source of the visual species/dish-family errors. It correctly refuses to turn natural-language labels into Food References without a safe semantic match:

| Mapping class seen in the subset | Examples | Meaning |
| --- | --- | --- |
| Safe exact | `rice`, `shrimp` | Can be offered as a canonical component for human acceptance. |
| Needs user choice | `pork`, `chicken`, `greens`, `vegetables` | Cannot silently become a narrower Food Reference. |
| Unsupported | `meat`, `salad`, `sauce`, `lime`, `green beans`, `fried dough` | Remains observation text or is omitted; it cannot create a reference record. |

Thus mapping reduces unsafe prefill rather than causing the model to see the wrong animal. It is still a secondary utility constraint: only a minority of correctly seen raw labels are safe automatic suggestions under the current small Food Reference vocabulary.

## Parser and Validation Finding

One noodle/seafood sample failed strict validation at every resolution, P0 repeat, P1, and P2 with `invalid_not_observable`. That repeatable outcome locates a separate failure mode at the model-output/strict-enum boundary. Fail-closed behavior worked as intended: no invalid proposal became actionable. It does mean that prompt wording alone has not yet shown a reliable remedy.

This should be addressed as a bounded observation-contract/prompt study, not by silently broadening validation or repairing prohibited output.

## Repeatability, Performance, and Memory

Three problematic samples were each observed three times in total at V1/P0/temperature 0 (baseline plus two repeats). Their relevant pattern was stable:

- the ambiguous rice plate continued to assert pork rather than resolving the species boundary;
- the grilled-fish plate continued to assert chicken;
- the noodle/seafood image continued to fail validation.

The final warm repeat batch was faster (roughly 3.2-3.9 s per request), which is consistent with model warm-up rather than a change in observation quality. Sequential variants completed without a crash, visible browser memory escalation, retained preview, or changed Meal Composer state. No image or object URL was persisted by the audit harness.

## Prefill Utility

The four valid V1 observations had mixed utility:

- **High:** the fried-rice-family image could save several manual recognition clicks while still leaving protein and exact named-dish identity to the user.
- **Medium:** the ambiguous rice and mixed noodle images can suggest rice/shrimp or broad preparation, but require review because protein/vegetable mappings are ambiguous and some extras are false.
- **Low:** the grilled-fish image risks increasing correction burden because its animal species is wrong despite a plausible grilled Meal Type.
- **Not useful:** the strict-invalid image must remain unapplied, with manual composition available immediately.

This supports the current review-before-apply design. It does not support auto-prefill of unreviewed observations, named-dish assignment, or sodium routing.

## Root-Cause Assessment

1. **Primary: model visual limitation.** Repeated, resolution-invariant species and dish-family mistakes remained at temperature 0. More pixels did not make those claims trustworthy.
2. **Secondary: parser/validation contract friction.** One image consistently failed only at `not_observable` validation. The safe failure is correct, but reduces usable observations.
3. **Secondary: vocabulary/mapping coverage.** Many raw labels are deliberately `needs_user_choice` or unsupported. This limits automatic prefill utility but prevents unsafe Food Reference claims.
4. **Not demonstrated as primary:** HEIC-to-JPEG conversion, orientation, crop, color, 1600px resolution, or JPEG quality 0.90.

## Recommendation

Keep the current production-normalizer policy at **1600 px / JPEG 0.90**. Do not increase dimensions or quality merely because an image looks sharper to a human: V4 increased typical request bytes by about five times without a consistent observation benefit.

Do not change the production P0 prompt from this pilot. P1 has a promising broad-structure direction, but needs a separate controlled contract study. P2 showed that an uncertainty note can coexist with an unsupported specific species claim, which is not the behavior MHB wants.

The smallest justified next slice is:

**MHB 2.4H - Observation Prompt and Strict-Validation Refinement**

It should use a small controlled set to test whether a tightened `NOT_OBSERVABLE` instruction and explicit “generic protein only when species is unclear” rule can improve actionable-valid output without relaxing the fail-closed boundary. A cross-model comparison is **not justified yet**: first resolve the identified prompt/contract friction while retaining the existing model as the controlled baseline.

## Reproducibility and Limits

`tools/vision_quality_audit/` is an isolated local browser harness. It uses the existing normalizer and parser/validator, retains results only in page memory, and does not mutate the app. It intentionally requires a human to choose authorized local files; it does not know a corpus path and does not write results.

Limits of this audit:

- only five personal images were used for the image-variant comparison;
- labels and metrics are descriptive, not a statistically generalizable accuracy benchmark;
- no pixel-level HEIC/JPEG fidelity measurement was performed;
- no other model was tested by design;
- first-request timing includes local decoder/model warm-up.

Current public runtime remains **MHB 2.3 - Gentle Meal Composition**. This audit adds no production feature, version change, sodium logic, named-dish behavior, or persistence path.
