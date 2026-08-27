# MHB 2.4A - Local Vision Meal Capture Feasibility Probe

## Status

**Decision: needs_more_probe.**

This is a docs-first, local-only feasibility slice. It does not add a vision feature to MHB, change the Meal Composer, alter the sodium engine, or change MHB's public version. Current public runtime remains **MHB 2.3 - Gentle Meal Composition**.

The local environment can host an Ollama probe, but the installed Gemma model metadata did not confirm image capability and no authorized local meal-photo corpus was available. A real observation-quality conclusion would therefore be premature.

## Purpose

Test whether a local multimodal model can propose structured, uncertainty-aware observations that reduce manual Meal Composer input. Vision may observe and suggest; the user confirms meaning; deterministic MHB code owns named-dish confirmation, consistency checks, and sodium evidence routing.

Vision is never a sodium, calorie, macro, medical, hidden-condiment, or recipe-reconstruction source.

## Current Architecture Boundary

The existing MHB path remains authoritative:

`candidate -> explicit user confirmation -> named_dish_id -> consistency check -> deterministic evidence routing`

Any future vision output enters only as a candidate source. It must not persist a meal, set `named_dish_id`, create components, or select a sodium evidence base without user confirmation. A failed or unavailable vision provider must leave the manual Meal Composer immediately usable.

## Local Environment Audit (2026-08-27)

| Item | Finding |
| --- | --- |
| OS / architecture | macOS Darwin 25.5.0, Apple Silicon arm64 |
| Hardware | MacBook Air, Apple M5 (10 cores), 24 GB unified memory |
| Ollama client | 0.32.15 |
| Local endpoint | `http://127.0.0.1:11434`; reachable locally during audit |
| Loaded models | None (`ollama ps` was empty) |
| Installed models | `gemma3:12b`, `gpt-oss:20b`, `qwen3:8b`, `scb10x/typhoon2.5-qwen3-4b:latest` |
| Primary model | `gemma3:12b`, 12.2B, Q4_K_M, local size 8.1 GB |
| Gemma metadata capability | Local `/api/tags` reported `completion` only; it did not report a vision/image capability |
| Image input support | Not confirmed. No image request was sent because no approved corpus was present. |
| Model options observed | Modelfile defaults include temperature 1, top-k 64, and top-p 0.95. The harness sets temperature 0 by default for repeatability; its context limit was not surfaced by the local metadata inspected and must be recorded in a live probe. |

The installed tag is exactly `gemma3:12b`; no model was downloaded, pulled, modified, or loaded for this task. The local API is suitable as a future optional adapter boundary, not a MHB core dependency.

## Corpus Status

No approved Thai meal-photo corpus exists in this repository. The six local PNG files found are Field Review illustrations, not meal photos, so they were not used. The attached Meal Composer mockup/reference image is likewise visual inspiration, not an observation ground-truth image.

A follow-up probe needs 12-20 authorized local photos, including fried rice, krapao with egg, noodle dishes, soup, curry with rice, fried food, vegetable-forward food, ambiguous protein, visible versus hidden sauces, and one or two low-quality images. Each photo needs a compact human annotation:

- visible components expected;
- elements that are not safely observable;
- a dish identity when one is genuinely visible;
- acceptable broader meal family when exact identity is not supportable.

Photos must remain local. Do not add the corpus to the repository unless the owner separately approves retention and access policy.

## Target Observation Contract

The proposed probe normalizes only this shape:

```json
{
  "dish_candidates": [{ "label": "fried rice", "confidence": "medium" }],
  "visible_components": [{ "label": "rice", "confidence": "high" }],
  "meal_type_candidates": ["stir_fried"],
  "uncertain_observations": ["the protein is unclear"],
  "not_observable": ["seasoning amount", "hidden sauce"]
}
```

`label` remains a raw observation. The model does not create canonical MHB food IDs or named-dish IDs. A deterministic mapper may later offer compatible MHB candidates, and the current explicit confirmation path remains required.

Forbidden output includes sodium, calories, macros, gram weights, health or medical claims, hidden ingredients, hidden sauces, condiment amounts, and inferred recipes. Any such output is a boundary failure, not evidence.

## Probe Method and Harness

`tools/visionMealCaptureProbe.js` is an isolated Node harness using only built-in APIs. It is not loaded by the app. It defaults to a dry-run corpus inventory and only calls Ollama when `--execute` is supplied. It accepts only an `http` localhost endpoint and never sends image bytes to a remote host.

The intended live run is:

```sh
node tools/visionMealCaptureProbe.js \
  --corpus /absolute/path/to/approved-local-meal-photos \
  --execute \
  --model gemma3:12b \
  --strategy prompt-json,parser-lines \
  --repeat 3 \
  --temperature 0 \
  --output /private/tmp/mhb-vision-probe-results.json
```

It compares two constrained output approaches:

1. `prompt-json`: asks for the observation schema and requests Ollama JSON formatting.
2. `parser-lines`: asks for five fixed, parser-friendly lines and normalizes those lines into the same schema.

The harness records derived observations, parser/validation outcomes, and latency. It intentionally does not write base64 image data or raw model response text to its report. It rejects remote endpoints and flags forbidden output, invalid meal-type vocabulary, malformed JSON, endpoint errors, and timeouts.

## Findings

No live generation was run. Accordingly, all observation-quality metrics remain unmeasured:

| Measure | Result |
| --- | --- |
| Valid structured-output rate | Not measured |
| Dish recognition quality | Not measured |
| Visible-component precision / recall | Not measured |
| Uncertainty honesty | Not measured |
| Hidden-ingredient hallucination rate | Not measured |
| Forbidden-output rate | Not measured |
| Repeatability | Not measured |
| First / subsequent latency | Not measured |
| Peak memory, memory pressure, swap | Not measured |

The model's metadata is an additional feasibility concern: the local API declared completion capability, not vision capability. A future probe must verify a real image request against an authorized corpus before treating `gemma3:12b` as a viable VLM. The 8.1 GB model size on a 24 GB unified-memory machine is plausible for an experiment, but runtime memory, load time, and responsiveness are deliberately not claimed without measurement.

## Vocabulary and Confirmation Implications

The current vocabulary already distinguishes observable Meal Type and Food Components from sodium evidence. Likely gaps to audit with real samples include generic visible pork versus `pork_lean`, fried egg versus generic `egg`, noodle varieties, curry-specific identities, and visible sauce versus unknown seasoning.

Vision should prefill only after the user confirms individual observations. A future non-production flow could be:

`local image -> VisionMealObservation -> candidate normalization -> user review -> optional Meal Type / component prefill -> named-dish candidate -> explicit confirmation -> existing consistency check`

Named-dish confirmation is separate even if the model says "fried rice." A model suggestion cannot set `named_dish_id`, and a visual similarity must not produce sodium routing.

## Provider Boundary

Future integration should depend on a provider-neutral interface conceptually equivalent to:

```text
analyzeMealImage(image, options) -> VisionMealObservation
```

An `OllamaGemmaVisionProvider` may be one optional implementation; another local VLM may be substituted after the same probe. The Meal Composer must not know a model tag, prompt, API format, or model-specific confidence behavior.

## Privacy and Failure Behavior

The experimental boundary is local-only: no cloud upload, external API, telemetry, remote image host, or production dependency. The future adapter should expose clear states for unavailable Ollama, missing model, unsupported image, unreadable image, timeout, malformed structured output, model memory failure, and low-confidence observation. Each state falls back to manual entry without blocking a meal record.

## Conditions Before a Bounded Prototype

1. Confirm a locally installed vision-capable model with an actual image request; do not assume the tag implies image support.
2. Obtain an authorized, local 12-20 image corpus with human observation annotations.
3. Run both structured-output strategies and 2-3 repeats on a representative subset using conservative model settings.
4. Review useful observation rate, false visible-component claims, hidden-ingredient/forbidden-output failures, output repair burden, latency, and memory pressure.
5. Decide whether raw labels can be safely mapped to current MHB vocabulary without collapsing meaningful uncertainty.
6. Human-review the results before any production camera/upload UI, provider adapter, or runtime wiring.

## Recommended Next Slice

**MHB 2.4B - Local Vision Meal Observation Pilot**: supply the authorized corpus, verify a local VLM's actual image capability, execute the harness, and record measured quality and performance. Do not implement production UI or evidence routing unless that pilot shows useful, uncertainty-honest observations and a safe local fallback.
