# MHB Meal Name AI Proposal - Phase A Mini-Spec

## Status

**Architecture decision only. Not implemented.**

This note defines a possible future local-AI aid for proposing a human-readable Meal Name after a valid image observation. It does not change the current public **MHB 2.3 - Gentle Meal Composition** runtime, Vision prompt, parser, Meal schema, Meal Name behavior, storage, Reflection, Daily Log, or Excel.

Core ownership sentence:

> AI may suggest how the meal could be named, but the human remains the owner of what the record is called.

## Current Runtime Truth

The current image path is:

```text
PNG / JPEG / WebP / HEIC / HEIF selected by the user
  -> provider-neutral local image normalization
  -> optional loopback Ollama provider at 127.0.0.1:11434
  -> gemma3:12b with parser-lines-v3 and temperature 0
  -> strict five-line parser and deterministic validation
  -> transient mhb.vision-meal-observation/v1
  -> deterministic review model
  -> per-field human review
  -> Apply
  -> ordinary Meal Items added to the unsaved Meal Composer draft
  -> separate existing Save action
```

PNG, JPEG, and WebP pass through the normalizer. HEIC and HEIF are decoded locally and returned as a bounded transient raster Blob. The provider is format-neutral and receives no canonical meal state.

The current observation contains only:

- broad dish candidates;
- visible components;
- Meal Type candidates;
- uncertain observations; and
- bounded `NOT_OBSERVABLE` markers for sauce identity, seasoning amount, and cooking method.

Malformed output, forbidden assertions, invalid enums, an empty observation, a missing model, an unavailable provider, timeout, image failure, or unsupported image format fails closed. Manual Meal Composition remains available.

Vision arrival does not mutate the draft. `applyVisionReviewToDraft()` is the first point at which reviewed component choices may call `model.addFood()`. Apply is still not Meal Save. Vision cannot set `meal_name`, `named_dish_id`, sodium evidence, or a saved Meal record.

The current Meal Name contract is also already explicit:

- canonical field: optional `meal_name` on the Meal Instance;
- draft field: `mealName`, held in the existing in-memory Meal Composer draft;
- ownership: human-authored contextual identity;
- hygiene: outer whitespace trimming only;
- save rule: at least one Meal Item is still required;
- lifecycle: edit restores it, successful save resets it with the draft, and legacy records without it remain valid;
- rendering: it becomes the saved-card heading when present; and
- bounded Reflection adapters may clone it as read-only identity, but it never enters the Reflection generator or signals.

`meal_name` is distinct from `meal_label`, `custom_meal_label`, and `named_dish_id`. It is not proof of complete composition, nutrition, sodium, recipe identity, or canonical dish classification.

## Authority Map

| Layer | Owns | Must not own |
| --- | --- | --- |
| Image normalizer | A transient provider-ready image Blob | Meal facts, naming, persistence |
| Vision observation provider | Visible image-local proposals and uncertainty | Meal Items, Meal Name, named dish, sodium, save |
| Future naming adapter | A transient bounded candidate set | Canonical Meal Name or any canonical record |
| Human | Candidate choice, custom wording, edit, skip, Apply, and Save decisions | Nothing is silently decided on the human's behalf |
| Meal Composer draft | Human-confirmed `mealName` and Meal Items before save | Reflection or Daily Log authority |
| Meal runtime | Canonical Meal Instance and Meal Item persistence after Save | Image inference |
| Named-dish runtime | Separate deterministic candidates and explicit confirmation | Free-text Meal Name interpretation |
| Reflection | Existing deterministic whole-day mirror and bounded post-generation meal cues | Name proposal, Meal mutation, naming persistence |
| Daily Log / Excel | Their existing schemas and explicit user-owned records | AI Meal Name candidates or unsaved meal context |

The future naming stage may read a bounded copy of a valid observation. It must never mutate Vision review, Food Reference, observation vocabulary, sodium, nutrition, Named Dish Reference, Reflection, Daily Log, or Excel.

## Architecture Options

### Option A - Extend the Existing Vision Prompt and Parser

One image call would return dish context, visible components, uncertainty, and up to two Meal Name candidates.

Advantages:

- one model request and one image decoding path;
- lower best-case latency than two serial calls; and
- no second provider availability check.

Risks:

- couples open-ended natural naming to the hardened five-line observation grammar;
- expands parser and validator responsibility at the most safety-sensitive image boundary;
- a naming-format failure could reject an otherwise useful observation, or observation leniency could be introduced to rescue naming;
- makes observation and naming failure difficult to isolate and audit;
- increases regression risk for the current review, vocabulary, and manual fallback contracts; and
- makes later replacement of the naming strategy harder because it is embedded in the image parser.

### Option B - Separate Naming Proposal Stage

The existing image call remains unchanged. After it produces a valid observation and deterministic review metadata, a second local text-only call receives a bounded evidence object and proposes zero to two names.

Advantages:

- preserves `parser-lines-v3` and `mhb.vision-meal-observation/v1` unchanged;
- observation remains useful when naming fails;
- naming transport, parser, validator, timeout, diagnostics, and tests are independent;
- the second call does not need the image or base64 data;
- authority and human-decision checkpoints remain visible in code; and
- the naming adapter can later be replaced without migrating Meal or Vision schemas.

Costs:

- a second local inference adds latency and model work;
- the flow needs cancellation and stale-request protection; and
- UI must let the user continue immediately rather than waiting for naming.

## Decision

**Recommend Option B.**

The current observation contract is deliberately narrow and already field-tested. Naming is a different task: it turns bounded evidence into optional natural-language identity. Independent failure is more valuable than saving one model call.

The first implementation should reuse the currently configured local model through a separate text-only adapter, use a shorter timeout than image observation, and remain loopback-only. This is a deployment convenience, not a permanent requirement that naming and Vision use the same model.

```text
normalized image
  -> unchanged Vision observation call
  -> unchanged deterministic validation
  -> bounded naming-input builder
  -> separate local text-only naming call
  -> strict naming parser and validator
  -> transient candidate set
  -> explicit human choice, custom text, or skip
  -> ordinary draft.mealName only after confirmation
  -> unchanged ingredient review and Apply
  -> unchanged explicit Meal Save
```

The naming request must never receive the image, hidden model text, raw provider response, prior meal names, personal history, Daily Log, Reflection, sodium, nutrition, or unrelated context.

## Proposed Input Contract

The naming input should be built only after the existing observation validator succeeds. The builder may combine the validated observation with deterministic review classification, but it must not treat review defaults as human acceptance.

```js
{
  schemaVersion: "mhb.meal-name-proposal-input/v1",
  requestId: "transient-naming-...",
  observationId: "transient-...",
  language: "th", // th | en | zh
  dishCandidates: [
    { evidenceId: "dish-0", label: "rice with braised meat" }
  ],
  visibleComponents: [
    {
      evidenceId: "component-0",
      observedLabel: "rice",
      mappingStatus: "mapped", // mapped | needs_review | unsupported
      mappedFoodReferenceId: "rice",
      mappedDisplayLabel: "ข้าว"
    }
  ],
  uncertainties: [
    { evidenceId: "uncertainty-0", topic: "component_identity", label: "animal protein species" }
  ],
  notObservable: ["sauce_identity", "seasoning_amount"],
  specificityConstraints: ["animal_species_unknown"]
}
```

Rules:

- arrays are bounded before transport;
- every text value is single-line, length-bounded, and copied from validated evidence or deterministic localization;
- mapped Food Reference data describes only an existing deterministic mapping, not a new mapping decision;
- `needs_review` and `unsupported` labels remain explicitly non-canonical;
- `specificityConstraints` are deterministic consequences of explicit uncertainty, never model confidence scores;
- current draft `mealName`, historical names, saved meals, and user profile are excluded;
- current human-selected Meal Type is deferred from the first slice to keep input image-local; and
- no field may carry sodium, nutrition, health interpretation, recipe completion, or personal longitudinal context.

Recommended initial bounds are at most 4 dish labels, 12 visible component labels, 8 uncertainty entries, and the existing 3 `notObservable` tokens, with each source label capped at 80 Unicode code points. Truncation must be explicit in diagnostics, not silently presented as complete evidence.

## Proposed Output Contract

The wire format should follow the project's strict line-parser convention rather than accept free JSON. Exactly five lines are sufficient:

```text
STATUS: ok
CANDIDATE_1: ข้าวราดเนื้อตุ๋น
BASIS_1: dish-0, component-0
CANDIDATE_2: ข้าวเนื้อตุ๋น
BASIS_2: dish-0
```

`none` is allowed for candidate and basis lines. `STATUS` accepts only `ok` or `insufficient_evidence`. The adapter, not the model, creates transport-level `error` results.

After parsing, the transient application object is:

```js
{
  schemaVersion: "mhb.meal-name-proposal/v1",
  requestId: "transient-naming-...",
  observationId: "transient-...",
  status: "ok", // ok | insufficient_evidence | error
  candidates: [
    {
      candidateId: "candidate-1",
      text: "ข้าวราดเนื้อตุ๋น",
      basisEvidenceIds: ["dish-0", "component-0"]
    }
  ],
  diagnostics: {
    code: "",
    providerId: "ollama-local",
    endpointScope: "localhost"
  }
}
```

Zero, one, or two candidates are valid. `insufficient_evidence` has zero candidates. `error` is generated only for provider, timeout, parser, or validation failure and also has zero candidates. No candidate object, basis, diagnostic, or model response is persisted.

## Deterministic Validation

The future validator must:

1. Require exactly the five named lines, once each, with no extra prose.
2. Accept only the documented statuses and zero to two candidates.
3. Require candidate 1 before candidate 2 and a non-empty basis for every candidate.
4. Require every basis ID to exist in the input evidence object.
5. Preserve accepted display text exactly after outer-whitespace trimming.
6. Reject control characters, multiline text, markup, URLs, canonical IDs, field assignments, and more than 80 Unicode code points.
7. Compare candidates using NFKC, collapsed whitespace, and locale-aware case folding only for duplicate detection; never rewrite the displayed candidate with that comparison form.
8. Reject duplicates after comparison normalization.
9. Reject health, nutrition, sodium, calorie, macro, medical, scoring, recommendation, and certainty-inflating claims using bounded TH/EN/ZH policy terms plus structural prompt constraints.
10. Reject a species-specific name when an explicit species-unknown constraint exists and the same species is not explicitly present in validated evidence.
11. Reject basis references to `needs_review` alternatives as though the human had selected one.
12. Reject empty `ok` output; convert weak evidence to `insufficient_evidence` rather than fabricate names.

A deterministic validator cannot prove that every natural-language dish name is true. Prompt constraints, basis traceability, the local proposal-quality probe, and the human checkpoint remain necessary. Honest generality is preferred: `ข้าวราดเนื้อตุ๋น` is safer than selecting pork or beef when species is uncertain.

## Acceptable Naming Semantics

Candidates may:

- provide a short, natural meal identity in the active UI language;
- use a broad dish family supported by dish context;
- mention visible components that are present in bounded evidence; and
- remain general when preparation, species, sauce, or ingredients are uncertain.

Candidates must not:

- claim recipe completeness or hidden ingredients;
- state or imply health, nutrition, sodium, calorie, or medical meaning;
- map to Food Reference or Named Dish Reference;
- imply that all Meal Items have been identified;
- convert frequency or model confidence into truth; or
- use specificity contradicted by uncertainty or `NOT_OBSERVABLE` markers.

Acceptable direction includes `ข้าวขาหมู`, `ข้าวหมูตุ๋นใส่ไข่`, or `ข้าวราดเนื้อตุ๋น` only when the bounded evidence supports that specificity. Unacceptable direction includes `ข้าวขาหมูเพื่อสุขภาพ`, `เมนูโปรตีนสูง`, `ข้าวขาหมูโซเดียมต่ำ`, or any species-specific title under explicit species uncertainty.

## UX State and Flow

Keep one transient naming session tied to one `observationId`:

| Phase | Meaning |
| --- | --- |
| `idle` | No naming request belongs to the current observation. |
| `pending` | A bounded local naming request is running. |
| `ready` | One or two validated candidates are available. |
| `insufficient` | The model returned no defensible candidate. |
| `failed` | Provider, timeout, parser, or validator failed. |
| `settled` | The human chose a candidate, confirmed custom text, or skipped for this observation. |

`settled` is session bookkeeping only. The only durable draft effect is an explicitly confirmed string passed through the existing `setDraftMeta({ mealName })` path. Candidate provenance is not added to the Meal schema.

Recommended interaction:

1. The existing image observation validates and its review model is prepared.
2. If the draft already has any human-authored Meal Name, do not auto-open naming and proceed directly to ingredient review.
3. Otherwise start one cancellable naming request for this observation. Keep a visible `Continue without a name` action available; naming must not trap ingredient review behind model latency.
4. On `ready`, open a lightweight semantic dialog before ingredient confirmation. Identify the choices as AI suggestions.
5. Present candidate 1, candidate 2 when available, and `Write my own name` as radio-style choices with one explicit `Use this name` action.
6. Custom text uses the same length and text-hygiene boundary as `meal_name`. Candidate editing is deferred; the custom path is the unambiguous override in the first implementation.
7. Only `Use this name` calls the existing draft setter. Candidate selection alone has no write effect.
8. Close, Escape, or `Skip for now` settles this observation as skipped and reveals the existing ingredient review unchanged. Backdrop click does not dismiss accidentally.
9. `insufficient` or `failed` does not open an empty choice dialog. Show at most a quiet localized status in the Vision area and continue to review.
10. Apply and Save remain separate existing user actions. Naming never invokes either.

The dialog may reuse the Drink acknowledgement modal's accessibility behavior: `role="dialog"`, `aria-modal="true"`, labelled title and description, focus entry, focus trap, Escape, non-dismissing backdrop, and focus return. It should use a naming-specific state helper and markup; Drink business state must not be reused.

## Lifecycle and Ownership Rules

- A modal opens at most once automatically for one observation.
- Rerendering, panel navigation, or returning to Meal Composer does not reopen a skipped session.
- Replacing the image or rerunning Vision cancels the pending request and discards candidates tied to the old `observationId`.
- A newly confirmed name, including an AI candidate the human chose, becomes ordinary human-owned draft text. A later Vision run cannot silently replace it.
- Editing a saved meal with a name suppresses automatic naming. An explicit future `Suggest another name` action may be assessed separately.
- An existing draft name always wins, regardless of whether it was originally typed or chosen from a proposal.
- Reload discards the image, observation, naming session, and candidates under the current transient draft contract.
- A historical unnamed meal remains unchanged.
- Zero candidates, provider failure, timeout, and skip never block ingredient review, manual composition, or save.
- Confidence, frequency, repeated proposals, or previous choices never auto-promote a name.

## Boundary Regression Locks

Future implementation must prove that AI candidates do not enter:

- `draft.mealName` before explicit confirmation;
- Meal Items or Food Reference mappings;
- `named_dish_id` or deterministic named-dish candidates;
- sodium, nutrition, or evidence routing;
- observation vocabulary promotion;
- saved Meal records before the existing Save action;
- `buildSignals()`, Reflection Roots, Reflection generation, NuTuenSai, or Tomorrow Focus;
- Daily Log or `Reflection_Text`; or
- Excel import/export.

Skipping naming must preserve every current Vision review and Meal Composer path.

## Failure and Edge-Case Decisions

| Case | Required behavior |
| --- | --- |
| Provider unavailable or model missing | No candidates; proceed to review/manual flow. |
| Timeout | Cancel naming only; do not cancel the valid observation. |
| Malformed or forbidden output | Reject all candidates fail-closed; preserve observation. |
| Zero candidates / ambiguous image | Record transient `insufficient`; do not force a name. |
| Duplicate candidates | Keep one only if it independently validates; zero or one remains valid. |
| Overlong candidate | Reject that candidate; never truncate into a different name. |
| Species uncertainty conflict | Reject the specific candidate; allow an honest broader candidate. |
| Custom name | Confirm through the existing Meal Name hygiene path; no inferred items. |
| User skips | Mark this observation settled; do not reopen automatically. |
| Existing human name | Suppress automatic naming and never overwrite. |
| Existing saved meal edit | Preserve restored name and suppress automatic naming. |
| Image replaced / Vision rerun | Cancel and invalidate old request by request and observation IDs. |
| Language change during request | Discard stale-language response; a new request requires explicit retry or a new observation. |
| Mobile or dark mode | Same choices and semantics; only presentation adapts. |

## Future Test Matrix

### Contract and Validator

- exact five-line parsing; valid zero, one, and two candidate outcomes;
- missing, duplicate, extra, reordered, and malformed fields;
- status/candidate consistency;
- length, control-character, markup, URL, canonical-ID, and forbidden-claim rejection;
- Unicode Thai preservation and duplicate comparison without display rewriting;
- basis IDs constrained to the exact request;
- species uncertainty conflict and honest broad-name acceptance;
- duplicate candidates and no forced second candidate.

### Adapter and Local-Only Boundary

- loopback endpoint allowlist, local model availability, timeout, cancellation, and stale request rejection;
- no image/base64, personal context, history, sodium, Reflection, or Daily Log in naming input;
- no raw provider response exposed to UI or persistence;
- naming failure leaves the validated observation and review intact;
- no remote/cloud endpoint or new network dependency.

### Human Selection and UX

- modal only after valid observation and before ingredient Apply;
- existing draft name suppresses automatic modal;
- candidate selection alone does not write;
- explicit confirmation writes exactly one ordinary draft name;
- custom name, skip, Close, Escape, and insufficient/failure paths;
- no repeated modal for the same observation;
- focus trap, focus return, accessible names, keyboard flow, and non-dismissing backdrop;
- TH/EN/ZH copy, 390 px layout, desktop, light, and dark mode.

### Authority Regression

- no Meal Item, `named_dish_id`, sodium, nutrition, vocabulary promotion, or saved Meal before existing Apply/Save boundaries;
- no Reflection Root, `buildSignals()`, generator, NuTuenSai, Daily Log, or Excel change;
- existing parser-lines-v3, Vision review, Meal Name save/edit/reset, Reflection bridges, malformed-storage guard, and launcher tests remain green;
- choosing a name does not satisfy the existing at-least-one-Meal-Item save rule;
- replacing an image or rerunning Vision cannot overwrite a confirmed name.

## Local Proposal-Quality Probe Before UI Integration

Run the naming adapter before adding the dialog:

1. Use a small fixed set of separately authorized or de-identified meal images. Do not use protected personal images as committed fixtures.
2. Capture only the validated observation and deterministic review classification for each image.
3. Freeze those bounded input objects as synthetic/de-identified test fixtures where authorization permits.
4. Run the text-only naming adapter with fixed model, prompt version, temperature, timeout, and language.
5. Have a human record descriptive outcomes: useful, too generic, too specific, unsupported inference, awkward language, duplicate, or no-name-appropriate.
6. Review species and hidden-ingredient conflicts separately from naming style.
7. Keep prompts, responses, and measurements local; do not upload images or proposal text.

This is a proposal-quality probe, not an accuracy benchmark. A human-readable preference is not ground truth, and an acceptable broad name may be intentionally less specific than the actual dish.

No authorized meal-image fixtures are currently tracked in the repository. Existing design notes describe a separately authorized field corpus; any reuse requires confirming that its authorization still covers this new naming probe. Otherwise use newly authorized, de-identified images and keep them outside protected personal data paths.

## Implementation Slices After Human Approval

The smallest safe sequence is:

1. **Phase B1:** pure input builder, strict parser/validator, local text-only adapter, synthetic tests, and local proposal-quality probe; no UI and no draft write.
2. **Phase B2:** transient naming session and accessible optional dialog; explicit confirmation may call the existing Meal Name setter; no schema or save change.
3. **Phase C:** field acceptance and wording refinement only after observed local use; no authority expansion by default.

Each phase should remain independently reversible. Phase A authorizes none of them by itself.

## Phase B1 Implementation Evidence

**Implemented engine only; no UI or draft write.**

`js/mealNameProposal.mjs` now owns the following local, transient operations:

- `buildMealNameProposalInput()` accepts a valid `VisionMealObservation` plus matching deterministic review metadata, then produces the bounded `mhb.meal-name-proposal-input/v1` object.
- `buildMealNameProposalPrompt()` owns prompt identifier `meal-name-lines-v1`. It takes no image, base64, raw provider response, stored meal, Daily Log, Reflection, profile, sodium, nutrition, or history data.
- `parseMealNameProposalLines()` accepts only the ordered five-line wire shape.
- `validateMealNameProposal()` checks candidate/basis consistency, input-scoped evidence IDs, length, structural safety, TH/EN/ZH prohibited-claim terms, duplicate comparison, and the species-uncertainty guard.
- `createLocalOllamaMealNameProposalAdapter()` performs a text-only loopback Ollama request with `gemma3:12b`, temperature `0`, and an 8-second naming timeout. It reuses the existing loopback endpoint guard and the shared exported default-model constant, without changing `parser-lines-v3`.
- `createMealNameProposalRequestCoordinator()` provides the smallest future-facing request/observation/language identity check plus cancellation and stale-response rejection. It owns no UI state.

The B1 input intentionally omits mapped display labels and all human-selected Meal Type data. Mapping status and a mapped Food Reference ID are preserved only when the existing deterministic review already provides them; `needs_review` and `unsupported` remain non-canonical. This keeps the first naming input image-local and avoids treating review defaults as human acceptance.

Adapter results use explicit transport statuses: `success`, `insufficient_evidence`, `provider_unavailable`, `model_missing`, `timeout`, `cancelled`, `malformed_response`, `validation_failed`, and coordinator-generated `stale_response`. A malformed or unsafe `ok` response becomes `validation_failed` with a transient proposal whose status is `error`; it is not silently converted to insufficient evidence. If candidate 1 is valid and candidate 2 fails validation, candidate 1 remains available.

The engine is not loaded by `index.html`, does not trigger from Meal Composer, and has no path to `draft.mealName`, Meal Items, Save, `named_dish_id`, sodium, Reflection, Daily Log, Excel, or browser storage.

### Synthetic Proposal-Quality Probe

No newly authorized image corpus was available for this purpose, so B1 used the included `tools/mealNameProposalQualityProbe.mjs` with five de-identified bounded contexts only. It called the local `gemma3:12b` provider on 2026-09-01 with `meal-name-lines-v1`, Thai output, temperature `0`, and the 8-second limit. No images, base64, personal history, or raw model text were stored.

| Synthetic context | Result | Candidate / review category | Latency |
| --- | --- | --- | --- |
| rice + braised meat, species uncertain | success | `ข้าวหน้าเนื้อ` / useful; broad rather than species-specific | 3,619 ms |
| rice + pork + egg | success | `ข้าวหมูไข่` / useful | 4,449 ms |
| noodles + shrimp | success | `บะหมี่กุ้ง` / useful | 3,946 ms |
| rice + mixed vegetables | success | `ข้าวผักรวม` / useful | 4,107 ms |
| ambiguous food | insufficient_evidence | no candidate / appropriately_absent | 3,351 ms |

The first probe run showed that the model could append a sixth `LANGUAGE` line when language was positioned after the required output format. The prompt was corrected so language is now an instruction before that format. The same initial run tried `ข้าวหมู` under explicit species uncertainty; the validator rejected it. B1 then added the explicit prompt rule to use broad meat wording or insufficient evidence in that state. The final probe returned a broad name and all five cases completed with a valid contract result.

The synthetic probe is sufficient to support a cautious B2 interaction prototype, provided it remains optional, skippable, and non-blocking. It does not establish image-field usefulness. A separately authorized, de-identified image-local field probe remains required before treating naming quality as field-accepted.

## Phase B2 Implementation Evidence

**Implemented optional inline naming aid; not image-field accepted.**

`js/mealCompositionUI.js` starts one local naming request only after the existing Vision observation has passed its deterministic validation and the existing review model has been created. It passes the observation and review to the B1 bounded-input builder through `mealNameProposalFactory`; the image, raw provider output, and user history are not sent again. The existing `parser-lines-v3` image path remains unchanged.

The B2 session is created by `createMealNameProposalSession()` in `js/mealNameProposal.mjs`. Its state is memory-only: `idle`, `pending`, `ready`, `insufficient`, `failed`, or `settled`, plus request/observation/language identity, candidate selection, and custom text while the inline review is active. Replacing or clearing the image, rerunning Vision, changing language, changing date, destroying the composer, or reloading cancels/discards this state. Late or mismatched results are ignored.

The inline section appears first inside the Vision Review surface and uses the same full-width reading order in every state: Meal Name, broad food similarity, meal characteristic, then visible components. It may show a quiet pending state, one or two validated candidates, a human custom-name path, an explicit no-name choice, or a quiet insufficient/failure message. An existing draft name, including one restored during edit or previously human-confirmed from a proposal, always wins and suppresses automatic naming.

The data dependency remains: **Vision validation -> bounded naming input -> naming adapter**. The presentation sequence was revised after field use: the old naming-first blocking modal/gate created unnecessary coordination cost and reliability friction. The current flow is **Vision validation -> Vision Review visible immediately -> non-blocking inline naming proposal**. Naming never hides ingredient review, and a naming failure is only a quiet local state rather than an error modal.

Selecting a candidate only changes transient inline state. The sole B2 write occurs when the person presses the existing Vision Apply action: a selected validated candidate or non-empty custom text then calls the existing `model.setDraftMeta({ mealName })` path before the normal human-reviewed ingredient Apply runs. The explicit no-name choice leaves `draft.mealName` unchanged. Naming never invokes Meal Save, and ingredient selection remains separate human review.

The inline UI uses a labelled `fieldset`, native radio controls, a labelled custom text input, and does not steal focus when asynchronous candidates arrive. TH, EN, and ZH copy is owned by the existing Meal Composer localization map. It has no modal backdrop, focus trap, Escape handler, or review-visibility gate.

An enabled rendered AI Meal Name candidate must correspond 1:1 with a validated selectable candidate in transient naming session state. The renderer uses the same stable `candidateId` for the label state, radio value, session lookup, and checked state. Rejected or raw provider candidates never enter this rendered list. The selected visual treatment follows the session selection for AI candidates as well as custom and skip choices.

No Meal schema field, candidate provenance, `named_dish_id`, Meal Item, sodium/nutrition evidence, observation vocabulary, Reflection, Daily Log, Excel, localStorage, or session storage contract changes in B2. The B1 synthetic proposal-quality probe remains the only evidence to date. Before declaring the feature fit for field acceptance, run the separately authorized, de-identified image-local probe described above and record human review of usefulness, specificity, unsupported inference, language, and appropriate absence.

## B2 Runtime Trace and Authorized Local Image Probe

On 2026-09-01, an explicitly authorized local-only debug probe used three existing repository meal images without copying, uploading, or storing image/base64 evidence. The canonical app origin was `http://127.0.0.1:4173`; the text-only provider remained loopback Ollama at `127.0.0.1:11434` with `gemma3:12b`.

The trace is opt-in only through `?mhbNamingTrace=1` (or an injected test option). It emits safe metadata only: request/observation identity, language, candidate count, status, validator issue codes, visibility gates, and measured latency. It never logs image bytes, raw model output, browser storage, or personal context.

The observed failure was not a missing dynamic import, stale session, modal render failure, or timeout. For two valid observations with `animal_species_unknown`, the model returned an otherwise valid five-line response but used an unsupported species-specific candidate. The deterministic validator correctly rejected it with `candidate_1_unsupported_species_specificity`; under the current inline flow this leaves the ingredient review available and shows only a quiet naming-failure state. The prompt already described the constraint, but that wording was not sufficiently reliable in the live local run.

`meal-name-lines-v1` now repeats the species-unknown rule as a concrete final-output check and names the prohibited TH/EN/ZH species terms. The validator remains unchanged as the final authority. A focused regression assertion keeps this explicit prompt guard present. Re-running the previously rejected authorized images produced validated broad candidates for human inline review.

This small probe remains descriptive rather than an accuracy benchmark or field acceptance. It found useful and sometimes over-general naming behavior; no proposal becomes canonical until a person explicitly confirms it. B2 therefore remains an optional prototype pending broader authorized field review.
