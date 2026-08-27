# MHB 2.4B - Local Vision Meal Observation Pilot

## Status and Decision

**Decision: feasible_with_constraints.**

The installed local `gemma3:12b` accepted image payloads and produced useful broad meal observations on an authorized nine-image personal corpus. It is feasible as an optional, user-reviewed observation assistant, not as an authoritative meal identifier, component mapper, or nutrition source.

The pilot does not add production UI, startup dependencies, storage fields, named-dish assignment, sodium routing, workbook behavior, Reflection behavior, or a public-version change. Current public runtime remains **MHB 2.3 - Gentle Meal Composition**.

## Authorized Corpus and Privacy

The corpus is the user's authorized local folder:

`/Users/peeranatmuangsamrit/Desktop/MindfulSystem_xAi/apps/mindful-health-balance/ตัวอย่างรูปทดสอบอ่านภาพ/`

It contains nine personal HEIC meal photographs. It is authorized only for this MHB 2.4B local feasibility evaluation; it is not a public dataset, production dataset, benchmark, or generally reusable corpus. The exact folder has a targeted `.gitignore` entry and is not staged.

Originals were not modified. Quick Look created nine temporary PNG derivatives in `/private/tmp/mhb-24b-quicklook/`; the original HEIC files are Display P3 RGB, either 4032x3024 or 5712x4284 pixels, while the orientation-corrected PNG derivatives are 1200x1600. `sips` produced black JPEG previews for this corpus, so it was not used for inference. Temporary annotations and normalized results also remain under `/private/tmp`; no raw image bytes or raw model response text were committed.

## Environment and Capability Gate

| Item | Finding |
| --- | --- |
| Host | Apple M5 MacBook Air, arm64, 24 GB unified memory |
| Local provider | Ollama 0.32.15 at `http://127.0.0.1:11434` only |
| Model | `gemma3:12b`, 12.2B Q4_K_M; reported local model size 8.1 GB |
| Smoke test | One authorized PNG, `prompt-json`, temperature 0 |
| Gate result | **vision_confirmed**: the local endpoint accepted an image and returned a parseable structured response |
| Smoke latency | 20.8 s wall-clock, including 3.6 s model load duration |

The model tag alone was not treated as evidence. Image capability was established by the live local smoke request. The smoke output nevertheless contained an invalid Meal Type and prohibited-field wording, so capability success did not qualify it for integration.

## Human Evaluation Reference

Human annotations were written to `/private/tmp/mhb-24b-annotations.json`, not the repository. They capture only image-visible facts: a broad dish/family, visible components, deliberately unobservable components, plausible Meal Types, and ambiguity notes. They contain no sodium, recipe, source, or named-dish evidence.

Set A includes rice-plus-protein meals, fried rice, rice porridge, sauced/stir-fried noodle dishes, a rice bowl with soup, a table grill assortment, visible seafood, vegetable-forward dishes, and ambiguous sauces/proteins. It is intentionally small and not statistically representative.

## Probe Design

All requests used `temperature: 0` and the existing local-only harness:

`node tools/visionMealCaptureProbe.js`

Requests were sent only to `127.0.0.1`; no cloud service, external API, or remote image host was used.

1. Smoke: 1 image x `prompt-json` x 1 run.
2. Baseline corpus run: 9 images x `prompt-json` and `parser-lines` x 1 run = 18 requests.
3. Baseline repeatability: 3 representative images x both baseline strategies x 2 additional runs = 12 requests.
4. Prompt revision `parser-lines-v2`: 9 images x 1 run = 9 requests.
5. Revised repeatability: 3 representative images x `parser-lines-v2` x 2 additional runs = 6 requests.

**Total live local image requests: 46.** The harness has no app import path, accepts only an HTTP localhost endpoint, records no image bytes/raw response text in results, records Ollama timing fields, and now accepts local symbolic links for non-duplicated repeat subsets.

## Structured-Output Results

The baseline prompt asked the model not to estimate nutrition, but it often copied forbidden nutrition words into `NOT_OBSERVABLE`; this is still a contract violation because the target observation format must not contain them.

| Strategy | Requests | Parsed / normalized | Strict-valid | Forbidden-output violations | Invalid Meal Type entries | Median latency |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `prompt-json` | 9 | 9 | 0/9 | 9/9 | 7 | 23.5 s |
| `parser-lines` | 9 | 9 | 4/9 | 5/9 | 0 | 11.8 s |
| `parser-lines-v2` | 9 | 9 | 9/9 | 0/9 | 0 | 6.9 s |

`parser-lines-v2` is a constrained prompt revision, not a model change. It says that components must be edible items only, removes unavailable nutrition fields from its own wording, forbids those concepts anywhere in output, and restricts `NOT_OBSERVABLE` to image limits such as sauce identity or seasoning amount. It is the only strategy suitable for any further prototype investigation.

## Dish Observation Quality

Using `parser-lines-v2` and broad human-acceptable dish families:

- 2/9 were exact or acceptably specific broad dishes: fried rice and rice porridge.
- 6/9 were correct at a useful meal-family level: rice bowl, grilled-protein meal, stir-fried noodles, cooked-meat rice bowl, and table grill assortment.
- 1/9 was wrong at dish-family level: a seafood noodle dish was called a fried cake/savory pancake.

The model can reduce search burden by proposing broad labels. It cannot establish a canonical dish identity. In particular, a phrase such as "fried rice" remains a user-review candidate and must never set `named_dish_id` or select a Thai FCD base.

## Visible Components

A conservative manual review of the `parser-lines-v2` results against the nine visible-only annotations found:

- 29 true visible-component matches;
- 7 false components; and
- 13 missed expected visible components.

This is **80.6% pilot precision** and **69.0% pilot recall** (n=9 images; descriptive only, not a statistical quality claim). Broad matches were allowed only when the human annotation itself intentionally used a broad visible category.

Important false or unsafe specifics included fish called chicken, raw pork called beef, fried dough substituted for noodles, and a seafood noodle dish called oyster/fried cake. The prompt revision successfully removed utensils, plates, bowls, and furniture from component lists, but it cannot make protein species reliable.

## Uncertainty and Hidden-Inference Findings

`parser-lines-v2` consistently kept `NOT_OBSERVABLE` to sauce identity and seasoning amount. It returned useful uncertainty for shredded garnish, seafood type, meat type, and vegetable type on several ambiguous images, while four outputs used the weak phrase "some components." The latter is structurally honest but not sufficiently actionable without a better review UI.

No result asserted fish sauce, soy sauce, oyster sauce, a hidden-condiment quantity, a sodium number, calories, macros, health effects, or a recipe as fact. Baseline strategies did, however, mention unavailable nutrition fields in `NOT_OBSERVABLE` 14 times across 18 requests, so those requests remain boundary failures rather than being retroactively treated as pass.

## Meal Type Findings

`parser-lines-v2` produced only valid MHB Meal Type enum values. About 6/9 were correct or plausibly useful as multi-part meal context; 3/9 were wrong or over-specific, notably using `fried` where `stir_fried` better describes fried rice/noodles and using `steamed` for porridge. Meal Type can be proposed for review, never auto-set as a canonical meal fact.

## Repeatability

For three representative images and every tested strategy, two additional temperature-0 runs reproduced the same dish labels, components, Meal Types, uncertainty strings, and image-limit strings as the corresponding corpus run. `parser-lines-v2` was therefore **stable** on the repeat subset.

This is beneficial for a review interface but does not repair systematic errors: a repeatable wrong label remains wrong. No claim is made about stability beyond this three-image subset.

## Performance and System Impact

| Strategy | Wall-clock latency range | Median |
| --- | ---: | ---: |
| `prompt-json` baseline | 18.4-34.2 s | 23.5 s |
| `parser-lines` baseline | 7.6-14.7 s | 11.8 s |
| `parser-lines-v2` | 6.6-8.0 s | 6.9 s |
| `parser-lines-v2` warm repeats | 3.4-7.8 s | not generalized |

During active generation, Ollama reported `gemma3:12b` loaded at 8.9 GB, 100% GPU, context 4096. It was unloaded after the pilot. System-wide memory-free snapshots were 65% before the smoke test and 80-85% after runs; these are snapshots, not peak measurements. Post-run swap usage was 6.68 GB, but no pre-run swap baseline or per-process RSS peak was captured, so the pilot does **not** attribute that swap usage to Ollama. No thermal/throttling measurement was available.

The 6-8 second warmed v2 latency is feasible for an explicit optional "look at this photo" state, not an instant inline action. Any prototype needs an honest loading state and immediate manual-entry fallback.

## Vocabulary and Mapping Feasibility

| Observation class | Mapping assessment | Reason |
| --- | --- | --- |
| Rice, egg, noodles, shrimp, squid, fish when visually clear | `safe_exact_map` candidate after user review | Matching Food References exist, but the user still owns confirmation. |
| Greens, scallion, generic vegetables, generic seafood | `safe_broader_map` or `needs_user_choice` | `mixed_vegetables` / `leafy_vegetables` may be reasonable suggestions, not identity. |
| Generic pork | `needs_user_choice` | MHB has `pork_lean`; a visual "pork" claim cannot establish lean-cut semantics. |
| Chicken versus fish; pork versus beef; named regional dishes | `cannot_map_safely` without user correction | The pilot demonstrated confident but incorrect species/dish labels. |
| Sauce/seasoning | no component map | It remains unobserved unless the user records it. |

The gaps are three distinct things: vocabulary gaps (generic versus specific proteins and garnishes), evidence gaps (none are resolved by an image), and UI representation gaps (the review surface must let the user accept, edit, or omit each proposal). No Food Reference changes are proposed in this slice.

## Prefill and Human-Confirmation Implications

The result supports a strictly bounded future flow:

`image -> VisionMealObservation -> user review -> accepted Meal Type/components prefill -> deterministic named-dish candidate -> separate explicit named-dish confirmation`

Vision observations must be editable, individually optional, and not persisted until the user chooses to use them. Generic labels need a user choice when they do not map safely. Named-dish confirmation remains a separate action even when an observation says fried rice; neither an image result nor an accepted component prefill may set `named_dish_id`.

This preserves MHB's existing authority chain: the user owns observations and identity confirmation; deterministic runtime owns consistency and evidence routing; vision owns neither sodium nor provenance.

## Failure Modes and Conditions Before a Prototype

The provider must fail open to manual Meal Composer entry when Ollama is unavailable, the model is missing/unloaded, an image is unreadable, output is malformed, validation fails, or latency is unacceptable. It must locally reject remote endpoints and forbidden fields before a proposal is displayed.

Before any bounded prototype, require:

1. `parser-lines-v2`-equivalent strict validation with temperature 0 and no automatic repair of boundary violations.
2. User review for every proposed component and Meal Type; no automatic persistence.
3. No raw-label-to-`named_dish_id` mapping; retain the current separate confirmation and consistency check.
4. A UI that makes ambiguous/protein-specific labels easy to revise or omit.
5. A second authorized local corpus before treating these nine-image results as broadly representative.
6. Explicit optional-provider/failure states, local-only privacy disclosure, and measured loading behavior.

## Recommended Next Slice

**MHB 2.4C - Local Vision Observation Contract and Optional Provider Adapter Design.** It should lock a validated `VisionMealObservation` contract, user-review semantics, provider-failure behavior, and local-only boundary before any production capture/upload UI. It must not add sodium estimation or automatic named-dish identity.
