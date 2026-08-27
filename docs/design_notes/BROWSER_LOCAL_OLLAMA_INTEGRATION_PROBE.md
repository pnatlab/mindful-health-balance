# MHB 2.4D - Browser-to-Local-Ollama Integration Probe

## Status and Decision

**Decision: `direct_browser_local_provider_feasible`.**

An isolated browser probe running from a local MHB HTTP origin reached the installed local Ollama server, detected the installed `gemma3:12b` model, sent one authorized temporary PNG, and returned a validated, transient `VisionMealObservation`. No production Meal Composer path, prefill, named-dish routing, sodium runtime, workbook, or public version was changed. Current public runtime remains **MHB 2.3 - Gentle Meal Composition**.

This decision is limited to the direct local-origin path. It does not establish GitHub Pages compatibility or make vision observations authoritative.

## Authority Boundary

The MHB 2.4C contract remains unchanged:

```text
Image -> optional local provider -> VisionMealObservation -> validation
      -> future human review -> future accepted prefill -> existing Meal Composer
      -> deterministic named-dish candidate -> separate human confirmation
      -> evidence router
```

This probe stops after `VisionMealObservation -> validation`. The harness has no import of Meal Composer code and cannot set `named_dish_id`, alter a draft, create Meal Items, save a meal, or call sodium evidence routing.

## Primary Origin and Origin Matrix

| Browser origin | Result | Scope |
| --- | --- | --- |
| `http://127.0.0.1:4173` | Passed availability GET and image POST | Primary probe target |
| `file:` | Not tested | Not a production target |
| `http://localhost:<port>` | Not separately tested | Loopback allowlist supports it; still needs a browser check before relying on it |
| GitHub Pages HTTPS origin | Deferred | Secondary finding only; not an acceptance blocker |

The local page was served temporarily with `python3 -m http.server 4173 --bind 127.0.0.1`. It was not added to MHB startup or navigation.

## Ollama CORS and Availability Findings

No `OLLAMA_ORIGINS` value was changed and Ollama was not restarted. From `http://127.0.0.1:4173`, the browser completed both:

1. `GET http://127.0.0.1:11434/api/tags` for low-cost availability detection; and
2. `POST http://127.0.0.1:11434/api/generate` with one local image and a JSON body.

This confirms practical CORS acceptance for the tested local origin, including the JSON POST path that requires browser CORS handling. Ollama documents loopback CORS defaults and `OLLAMA_ORIGINS` as the configuration point for additional origins. A hosted origin must not be treated as equivalent without its own browser/security probe. [Ollama FAQ](https://docs.ollama.com/faq)

The probe's availability contract is bounded and image-free:

| Condition | Browser result |
| --- | --- |
| Ollama running and `gemma3:12b` listed | `ready` |
| Server reachable but requested model absent | `model_missing` |
| Loopback server unavailable | `provider_unreachable` |
| Bounded request abort | `timeout` |
| Non-loopback endpoint | `unavailable`, before any request |

## Experimental Provider and Harness

The experimental-only files are intentionally outside the MHB runtime:

- `tools/browser_vision_probe/localVisionProvider.mjs`: browser-facing optional provider and deterministic helpers.
- `tools/browser_vision_probe/index.html`: isolated local test page; it is not linked from MHB.
- `tests/localVisionProvider.test.mjs`: Node tests for endpoint, parser, validation, and failure behavior.

The adapter uses the 2.4B reference configuration only: local Ollama, `gemma3:12b`, non-streaming `/api/generate`, temperature `0`, and `parser-lines-v2`. Ollama's generate API supports base64 image input and returns timing data used only as transient diagnostics. [Ollama generate API](https://docs.ollama.com/api/generate)

The model tag remains a reference configuration, not a dependency of MHB or a model-selection feature.

## Endpoint Security

`isLoopbackEndpoint()` parses the URL and permits only `http:` endpoints whose hostname is exactly `localhost`, `127.0.0.1`, or `::1`. It rejects malformed URLs, LAN addresses, arbitrary hostnames, remote URLs, and HTTPS cloud endpoints. It is not a `startsWith()` check.

The browser failure probe confirmed that `https://example.com` returns `unavailable` before a provider request. A loopback but closed `http://127.0.0.1:9` returns the bounded `provider_unreachable` state.

## Live Image Request

One already-authorized, orientation-corrected PNG derivative was selected from the private temporary probe directory through the isolated browser file input:

- Source location: private `/private/tmp` derivative; no corpus filename is recorded in the repository
- Request target: `http://127.0.0.1:11434/api/generate`
- Model: `gemma3:12b`
- Strategy: `parser-lines-v2`
- Browser result: `success`
- Validation: valid, no issues
- Browser wall-clock latency: `11,121 ms`
- Ollama `total_duration`: `10,975,364,375 ns`
- Ollama `load_duration`: `4,472,369,833 ns`

The result contained broad labels, visible components, existing Meal Type values, uncertainty, and image limits only. It was returned as `mhb.vision-meal-observation/v1` with a transient ID. It did not contain image bytes, base64, raw response text, canonical Food Reference IDs, `named_dish_id`, nutritional claims, or sodium evidence.

The response is a transport/contract success, not a visual-accuracy result. Its broad labels remain subject to the systematic identity errors measured in 2.4B and are not eligible to prefill a meal in this slice.

## Deterministic Normalization and Validation

The provider owns prompt, endpoint, request body, parser, normalizer, timeout, and provider timing. It normalizes the model's five parser-lines-v2 fields into the locked v1 shape:

- `schema_version`, transient observation ID, and local provider metadata;
- `dish_candidates`, `visible_components`, and existing `meal_type_candidates`;
- `uncertain_observations` and constrained `not_observable`; and
- validation/issues plus safe timing diagnostics.

Validation fails closed for malformed responses, invalid Meal Types, invalid image-limit vocabulary, invalid confidence labels, empty observations, and assertions involving nutrition, grams, medical/health claims, recipes, hidden ingredients/condiments, Food Reference IDs, or `named_dish_id`. It does not remove a forbidden assertion and then treat the response as valid.

## Failure and Manual-Fallback Behavior

The isolated browser probe demonstrated `model_missing`, remote-endpoint rejection, and `provider_unreachable`. Automated tests also cover timeout and malformed-output rejection. Browser console inspection found no unexpected errors or warnings.

The manual Meal Composer remains unaffected by construction: the harness is not linked from the app, imports no app state, uses no localStorage, and makes no save call. Therefore a provider failure cannot erase or change an MHB draft in this slice. Draft-preservation under a future integrated review UI remains a mandatory 2.4E acceptance test.

This is the intended asymmetry:

- invalid AI output fails closed and remains non-actionable;
- normal manual meal logging fails open and remains available without any provider.

## Privacy and Local Handling

- The browser test sent one authorized temporary image only to `127.0.0.1`.
- The personal original corpus stays ignored; the PNG derivative remained in `/private/tmp`.
- The harness does not persist selected files, object URLs, image bytes, base64, raw model prose, or observations in localStorage, the workbook, `Daily_Log`, Meal Instances, Meal Items, or exports.
- No remote endpoint, cloud API, third-party API, telemetry, or external CDN was used.

Future UI work must keep file references in memory only and release object URLs after use. It must retain the same loopback allowlist and must not add a remote fallback.

## GitHub Pages and Local-Bridge Finding

GitHub Pages was deliberately deferred. Its HTTPS origin may need explicit Ollama CORS configuration and browser-specific verification; no broad `OLLAMA_ORIGINS=*` configuration is justified by this probe. Direct local-origin operation works, so **no Python service or local bridge is needed for the primary local prototype path**.

A future hosted-origin decision should be a separate, security-reviewed probe rather than silently widening the local service's allowed origins.

## Conditions Before MHB 2.4E

1. Keep the provider optional, unloaded by default, and unavailable without affecting Meal Composer.
2. Use the same loopback URL validator and bounded availability check.
3. Retain parser-lines-v2-equivalent strict validation at temperature `0`.
4. Build per-field human review: accept, correct, or omit every Meal Type and component.
5. Keep observation acceptance separate from meal save.
6. Keep deterministic named-dish discovery and its existing explicit confirmation as a later, separate step.
7. Verify an existing draft survives provider failures, cancellation, invalid output, and page review dismissal.
8. Do not add photos, transcripts, base64, or vision results to canonical storage without a separately approved contract.

## Recommended Next Slice

**MHB 2.4E - Bounded Vision Review and Meal Composer Prefill Prototype.** It may add an optional local image action, honest observing/failure states, and per-field review before applying only accepted values to a draft. It must not auto-confirm named dishes, route sodium from vision, or change the explicit meal-save boundary.
