# MHB 2.4E - Bounded Vision Review and Meal Composer Prefill Prototype

## Status

**Bounded user-facing prototype inside MHB 2.3.** Current public runtime remains **MHB 2.3 - Gentle Meal Composition**. The prototype does not change Meal records, workbook schemas, `Daily_Log`, Reflection, named-dish evidence, sodium values, or the canonical meal-save boundary.

Core sentence: **The eye may suggest what it sees. The human decides what enters the meal.**

## Purpose and Authority Chain

The prototype reduces manual component discovery while preserving the MHB 2.4C authority chain:

```text
local image -> optional loopback provider -> validated VisionMealObservation
            -> per-field human review -> accepted prefill -> Meal Composer draft
            -> existing deterministic named-dish candidate
            -> separate explicit named-dish confirmation -> evidence router
```

Vision observes and proposes. The human accepts, omits, or resolves mappings. Meal Composer owns the draft. Existing deterministic runtime owns candidates and consistency. Approved evidence sources own sodium facts.

## UX Placement

The helper appears as a compact secondary row after Meal Type and before the Food Component library. Manual composition remains fully visible and usable. The action is localized as a gentle request for local AI help rather than an analyzer or chatbot.

The prototype accepts PNG, JPEG, WebP, HEIC, and HEIF through a browser file picker. PNG/JPEG/WebP pass through unchanged. MHB 2.4F added local transient HEIC/HEIF normalization after the direct browser/File-to-base64 test with an authorized original returned HTTP 400 `Failed to load image or audio file`. Camera capture remains outside scope. A bounded thumbnail is supplementary and exists only for the transient session.

`js/mealVisionImageNormalizer.js` is the provider-neutral format boundary. PNG/JPEG/WebP pass through as the same Blob. HEIC/HEIF is decoded locally by the vendored MIT `@keeratita/heic-converter@0.3.0` browser distribution, rendered to a bounded JPEG Blob, and then passed to the unchanged provider. Native browser decode failed on the authorized iPhone sample, so the converter is lazy-loaded only for HEIC/HEIF. The provider receives only a successfully normalized Blob and remains format-agnostic. See `LOCAL_VISION_HEIC_NORMALIZATION.md` for the asset, license, orientation, and QA record.

Measured local latency requires honest `checking` and `observing` states without fake percentages, countdowns, rewards, or blocked manual draft state.

## Provider Ownership

`js/localVisionProvider.mjs` is the single provider source of truth. The 2.4D diagnostic import under `tools/browser_vision_probe/` re-exports that module rather than retaining a copy.

The provider remains lazy and optional. It is dynamically imported only after the user selects a supported image. It allows loopback HTTP endpoints only, uses local Ollama with `gemma3:12b`, parser-lines-v3, temperature `0`, deterministic validation, and transient diagnostics. MHB startup and manual Meal Composer do not require Ollama, Gemma, Python, or a bridge.

## Review Semantics

A valid observation is not applied automatically. The review surface separates:

- broad dish text, explicitly marked as review context rather than reference identity;
- one selected Meal Type suggestion or an explicit omit option;
- visible components with individually reviewable mappings;
- uncertain observations; and
- constrained facts that cannot be observed from the image.

Safe exact component suggestions start selected to reduce taps, but remain checkboxes the user may omit. Ambiguous labels start unselected and require a Food Reference choice. Unsupported labels remain visible as observation text and create no canonical item.

## Mapping Rules

`js/mealVisionReview.js` owns deterministic observation-to-review mapping only. It contains no provider transport, storage, named-dish, sodium, or evidence routing.

| Observation | Review mapping |
| --- | --- |
| Rice, noodles, egg, shrimp, squid, fish, beef, tofu, fruit, explicit mixed/leafy vegetables | Safe exact suggestion; user may accept or omit |
| Generic pork | User must explicitly choose the available lean-pork reference or omit |
| Generic chicken | User chooses chicken versus chicken breast or omits |
| Generic seafood | User chooses shrimp, squid, fish, or omits |
| Generic vegetables/greens | User chooses mixed versus leafy vegetables or omits |
| Garnish and unsupported labels | Observation text only; no prefill |

The mapper never chooses the nearest Food Reference, and model output never supplies a canonical ID.

## Conservative Merge

Applying a reviewed proposal invokes ordinary Meal Composer draft methods only:

- accepted Meal Type fills only an `unspecified` draft;
- an existing human-selected Meal Type wins a conflict;
- accepted missing Food References are added once;
- existing items are not duplicated;
- existing portion, preparation, label, time, and condiment knowledge remain unchanged; and
- no Meal Instance or saved record is created.

After apply, the transient image/review session is cleared and the selected values become ordinary draft fields. No AI ownership/provenance field is added to meal storage.

## Save, Named-Dish, and Sodium Firewalls

`Use selected items in this meal` means prefill, not save. The existing `Keep this meal` action remains the only canonical Meal Instance boundary.

Dish candidate text never sets `named_dish_id`. Accepted components and Meal Type may cause the existing deterministic runtime to offer a named-dish candidate; the user must then use the existing, separate confirmation card. Vision does not call the evidence router or supply sodium. Any later sodium change comes only from existing accepted component evidence or a separately confirmed named dish.

## Transient State and Failure

The UI keeps a non-persisted `visionSession` containing the browser File reference, provider phase, temporary object URL, observation, review selection, and failure status. It is never written to localStorage. Selecting another image, clearing the helper, saving/resetting the draft, changing date, or reloading removes the session; object URLs are revoked.

Stale asynchronous responses are ignored using a request token. Provider unavailable, model missing, timeout, unsupported image, parser failure, and invalid output apply nothing and preserve the draft. AI output fails closed while meal logging fails open.

## Privacy and Accessibility

- Images are sent only to the loopback provider and never to cloud fallback, telemetry, workbook, `Daily_Log`, Reflection, Meal records, or Git.
- The UI states that analysis uses a model on the current device without promising absolute privacy.
- File input, review checkboxes/radios/selects, retry, clear, and apply are keyboard accessible.
- Observing state uses `aria-busy`; state/error text uses polite status semantics.
- Selected state is communicated by native controls and text, not color alone.
- Motion is supplementary and disabled under `prefers-reduced-motion`.

## Verification Scope

Automated coverage includes provider endpoint/validation tests, exact/ambiguous/unsupported mappings, no auto-apply, conservative merge, duplicate prevention, quantity and condiment preservation, no save on apply, no vision-set named dish, separate deterministic candidate flow, localization, and existing runtime/UI regressions.

Browser acceptance covers local provider availability, actual local image observation, review before apply, omit/resolve/apply, existing-draft preservation, separate named-dish confirmation, calm failure fallback where practical, reload-cleared transient state, dark mode, narrow viewport, console, and local-only network behavior.

## Known Limitations

- The prototype uses a local file picker only; no camera capture.
- `gemma3:12b` retains the systematic species and dish-family errors measured in 2.4B.
- Mapping vocabulary is deliberately small and conservative.
- There is no cancellation request transport; clearing the UI invalidates a stale response but the local provider request may finish in the background.
- GitHub Pages and non-loopback provider paths remain outside this local-origin prototype.

## Next Recommendation

Human-review the 2.4E interaction and mapping burden before broadening the vocabulary or calling the capability stable. A later slice may refine review ergonomics and cancellation, but must preserve separate named-dish confirmation, explicit meal save, and deterministic evidence ownership.
