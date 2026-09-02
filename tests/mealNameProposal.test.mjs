import assert from "node:assert/strict";
import fs from "node:fs";
import {
  DEFAULT_NAMING_TIMEOUT_MS,
  MEAL_NAME_PROPOSAL_PROMPT_ID,
  buildMealNameProposalInput,
  buildMealNameProposalPrompt,
  createLocalOllamaMealNameProposalAdapter,
  createMealNameProposalRequestCoordinator,
  createMealNameProposalSession,
  parseMealNameProposalLines,
  validateMealNameProposal
} from "../js/mealNameProposal.mjs";

function observation(overrides = {}) {
  return {
    observation_id: "observation-a",
    dish_candidates: [{ label: "rice with braised meat", confidence: "unknown" }],
    visible_components: [{ label: "rice", confidence: "unknown" }, { label: "meat", confidence: "unknown" }],
    meal_type_candidates: [{ meal_type: "other", confidence: "unknown" }],
    uncertain_observations: [{ topic: "component_identity", label: "animal protein species" }],
    not_observable: ["sauce_identity", "seasoning_amount"],
    ...overrides
  };
}

function review(overrides = {}) {
  return {
    observationId: "observation-a",
    components: [
      { mappingStatus: "safe_exact", selectedFoodId: "rice" },
      { mappingStatus: "needs_user_choice", selectedFoodId: "" }
    ],
    ...overrides
  };
}

function input(overrides = {}) {
  return buildMealNameProposalInput({ observation: observation(), review: review(), requestId: "request-a", language: "th", ...overrides });
}

function response({ status = "ok", candidateOne = "ข้าวราดเนื้อตุ๋น", basisOne = "dish-0, component-0", candidateTwo = "none", basisTwo = "none" } = {}) {
  return `STATUS: ${status}\nCANDIDATE_1: ${candidateOne}\nBASIS_1: ${basisOne}\nCANDIDATE_2: ${candidateTwo}\nBASIS_2: ${basisTwo}`;
}

const baseInput = input();
assert.equal(baseInput.schemaVersion, "mhb.meal-name-proposal-input/v1");
assert.equal(baseInput.requestId, "request-a");
assert.equal(baseInput.observationId, "observation-a");
assert.deepEqual(baseInput.visibleComponents.map((entry) => entry.mappingStatus), ["mapped", "needs_review"]);
assert.equal(baseInput.visibleComponents[0].mappedFoodReferenceId, "rice");
assert.equal("mappedFoodReferenceId" in baseInput.visibleComponents[1], false, "needs-review evidence stays non-canonical");
assert.deepEqual(baseInput.specificityConstraints, ["animal_species_unknown"]);
assert.deepEqual(baseInput.notObservable, ["sauce_identity", "seasoning_amount"]);
assert.equal(buildMealNameProposalInput({ observation: observation({ not_observable: ["hidden_ingredient"] }), review: review(), requestId: "bad" }), null, "invalid observations are rejected before naming input exists");
assert.equal(buildMealNameProposalInput({ observation: observation(), review: { ...review(), observationId: "other" }, requestId: "bad" }), null, "review metadata must belong to the same observation");

const longText = "a".repeat(90);
const boundedInput = buildMealNameProposalInput({
  observation: observation({
    dish_candidates: Array.from({ length: 5 }, (_, index) => ({ label: index === 0 ? longText : `dish ${index}`, confidence: "unknown" })),
    visible_components: Array.from({ length: 13 }, (_, index) => ({ label: `component ${index}`, confidence: "unknown" })),
    uncertain_observations: Array.from({ length: 9 }, (_, index) => ({ topic: "component_identity", label: `uncertainty ${index}` }))
  }),
  review: review({ components: Array.from({ length: 13 }, () => ({ mappingStatus: "unsupported", selectedFoodId: "" })) }),
  requestId: "bounded"
});
assert.equal([...boundedInput.dishCandidates[0].label].length, 80);
assert.equal(boundedInput.dishCandidates.length, 4);
assert.equal(boundedInput.visibleComponents.length, 12);
assert.equal(boundedInput.uncertainties.length, 8);
assert.deepEqual(boundedInput.diagnostics.arrayTruncations, { dishCandidates: 1, visibleComponents: 1, uncertainties: 1 });
assert.equal(boundedInput.diagnostics.textTruncations, 1);
assert.equal(boundedInput.diagnostics.evidenceComplete, false);

const isolatedInput = buildMealNameProposalInput({
  observation: observation({ image: "base64-private-image", raw_provider_response: "private raw provider response", dailyLog: "private history" }),
  review: review(),
  requestId: "isolated"
});
const isolatedSerialized = JSON.stringify(isolatedInput);
assert.doesNotMatch(isolatedSerialized, /base64-private-image|private raw provider response|private history/);
assert.doesNotMatch(buildMealNameProposalPrompt(isolatedInput), /base64-private-image|private raw provider response|private history/);
assert.match(buildMealNameProposalPrompt(baseInput), /must not name pork, chicken, or beef/i);

const parsedTwo = parseMealNameProposalLines(response({ candidateTwo: "ข้าวเนื้อตุ๋น", basisTwo: "dish-0" }));
assert.equal(parsedTwo.status, "ok");
assert.equal(parsedTwo.slots.length, 2);
assert.equal(parsedTwo.slots[0].text, "ข้าวราดเนื้อตุ๋น");
assert.equal(validateMealNameProposal(parseMealNameProposalLines(response({ basisOne: "none" })), baseInput).valid, false, "a candidate cannot omit its basis");
assert.ok(parseMealNameProposalLines(response({ status: "insufficient_evidence", candidateOne: "none", basisOne: "none" })));
assert.equal(parseMealNameProposalLines("STATUS: ok\nCANDIDATE_1: x\nBASIS_1: dish-0\nCANDIDATE_2: none"), null);
assert.equal(parseMealNameProposalLines("CANDIDATE_1: x\nSTATUS: ok\nBASIS_1: dish-0\nCANDIDATE_2: none\nBASIS_2: none"), null);
assert.equal(parseMealNameProposalLines(`${response()}\nEXTRA: prose`), null);
assert.equal(parseMealNameProposalLines("STATUS: ok\nCANDIDATE_1: x\nCANDIDATE_1: dish-0\nCANDIDATE_2: none\nBASIS_2: none"), null);
assert.equal(parseMealNameProposalLines(response({ basisOne: "dish-a" })), null);

const broadValidation = validateMealNameProposal(parseMealNameProposalLines(response()), baseInput);
assert.equal(broadValidation.valid, true, "a broad Thai name remains valid under species uncertainty");
assert.equal(broadValidation.proposal.candidates[0].text, "ข้าวราดเนื้อตุ๋น");
assert.equal(validateMealNameProposal(parseMealNameProposalLines(response({ candidateOne: "ข้าวขาหมู" })), baseInput).valid, false, "species-specific pork is rejected under explicit uncertainty");
const explicitPorkInput = input({
  observation: observation({ visible_components: [{ label: "rice", confidence: "unknown" }, { label: "pork", confidence: "unknown" }] }),
  review: review()
});
assert.equal(validateMealNameProposal(parseMealNameProposalLines(response({ candidateOne: "ข้าวขาหมู" })), explicitPorkInput).valid, true, "explicit validated species evidence may support a species-specific candidate");
assert.equal(validateMealNameProposal(parseMealNameProposalLines(response({ candidateOne: "เมนูเพื่อสุขภาพ" })), baseInput).valid, false);
assert.equal(validateMealNameProposal(parseMealNameProposalLines(response({ candidateOne: "ข้าวโซเดียมต่ำ" })), baseInput).valid, false);
assert.equal(validateMealNameProposal(parseMealNameProposalLines(response({ candidateOne: "<b>ข้าว</b>" })), baseInput).valid, false);
assert.equal(validateMealNameProposal(parseMealNameProposalLines(response({ candidateOne: "https://example.com" })), baseInput).valid, false);
assert.equal(validateMealNameProposal(parseMealNameProposalLines(response({ basisOne: "dish-99" })), baseInput).valid, false);
assert.equal(validateMealNameProposal(parseMealNameProposalLines(response({ candidateTwo: "ข้าวราดเนื้อตุ๋น", basisTwo: "dish-0" })), baseInput).proposal.candidates.length, 1, "duplicates are discarded without discarding candidate one");
const preservedText = validateMealNameProposal(parseMealNameProposalLines(response({ candidateOne: "  ข้าว  เนื้อตุ๋น  " })), baseInput);
assert.equal(preservedText.proposal.candidates[0].text, "ข้าว  เนื้อตุ๋น", "display text is only outer-trimmed");
assert.equal(validateMealNameProposal(parseMealNameProposalLines(response({ candidateOne: "ก".repeat(81) })), baseInput).valid, false);
assert.equal(validateMealNameProposal(parseMealNameProposalLines(response({ status: "ok", candidateOne: "none", basisOne: "none" })), baseInput).valid, false);
assert.equal(validateMealNameProposal(parseMealNameProposalLines(response({ status: "insufficient_evidence", candidateOne: "none", basisOne: "none" })), baseInput).proposal.status, "insufficient_evidence");
const partialValidation = validateMealNameProposal(parseMealNameProposalLines(response({ candidateTwo: "เมนูเพื่อสุขภาพ", basisTwo: "dish-0" })), baseInput);
assert.equal(partialValidation.valid, true);
assert.equal(partialValidation.proposal.candidates.length, 1, "candidate one remains when candidate two is unsafe");

let requestBody = null;
const successAdapter = createLocalOllamaMealNameProposalAdapter({
  fetchImpl: async (_url, options) => {
    requestBody = JSON.parse(options.body);
    return { ok: true, json: async () => ({ response: response(), total_duration: 10 }) };
  }
});
const success = await successAdapter.propose(baseInput);
assert.equal(success.status, "success");
assert.equal(success.proposal.status, "ok");
assert.equal(requestBody.model, "gemma3:12b");
assert.equal(requestBody.options.temperature, 0);
assert.equal("images" in requestBody, false, "naming transport is text-only");
assert.doesNotMatch(JSON.stringify(requestBody), /base64|image_blob|dailyLog|Reflection_Text/);
assert.match(requestBody.prompt, new RegExp(MEAL_NAME_PROPOSAL_PROMPT_ID));
assert.equal(successAdapter.namingTimeoutMs, DEFAULT_NAMING_TIMEOUT_MS);
assert.match(buildMealNameProposalPrompt(baseInput), /CRITICAL SPECIES RULE/);
assert.match(buildMealNameProposalPrompt(baseInput), /หมู, ไก่, เนื้อวัว/);
const readyAdapter = createLocalOllamaMealNameProposalAdapter({
  fetchImpl: async () => ({ ok: true, json: async () => ({ models: [{ name: "gemma3:12b" }] }) })
});
assert.equal((await readyAdapter.isAvailable()).status, "ready");
const missingModelAdapter = createLocalOllamaMealNameProposalAdapter({
  fetchImpl: async () => ({ ok: true, json: async () => ({ models: [{ name: "other:latest" }] }) })
});
assert.equal((await missingModelAdapter.isAvailable()).status, "model_missing");
assert.equal((await createLocalOllamaMealNameProposalAdapter({ endpoint: "https://example.com" }).isAvailable()).status, "provider_unavailable");

const insufficientAdapter = createLocalOllamaMealNameProposalAdapter({
  fetchImpl: async () => ({ ok: true, json: async () => ({ response: response({ status: "insufficient_evidence", candidateOne: "none", basisOne: "none" }) }) })
});
assert.equal((await insufficientAdapter.propose(baseInput)).status, "insufficient_evidence");
const unavailableAdapter = createLocalOllamaMealNameProposalAdapter({ fetchImpl: async () => { throw new Error("offline"); } });
assert.equal((await unavailableAdapter.propose(baseInput)).status, "provider_unavailable");
const malformedAdapter = createLocalOllamaMealNameProposalAdapter({ fetchImpl: async () => ({ ok: true, json: async () => ({ response: "not naming lines" }) }) });
assert.equal((await malformedAdapter.propose(baseInput)).status, "malformed_response");
const invalidAdapter = createLocalOllamaMealNameProposalAdapter({ fetchImpl: async () => ({ ok: true, json: async () => ({ response: response({ candidateOne: "ข้าวโซเดียมต่ำ" }) }) }) });
assert.equal((await invalidAdapter.propose(baseInput)).status, "validation_failed");
assert.equal((await createLocalOllamaMealNameProposalAdapter({ endpoint: "https://example.com" }).propose(baseInput)).status, "provider_unavailable");

const abortingFetch = (_url, options) => new Promise((_resolve, reject) => {
  options.signal.addEventListener("abort", () => {
    const error = new Error("aborted");
    error.name = "AbortError";
    reject(error);
  }, { once: true });
});
const timeoutAdapter = createLocalOllamaMealNameProposalAdapter({ fetchImpl: abortingFetch, namingTimeoutMs: 5 });
assert.equal((await timeoutAdapter.propose(baseInput)).status, "timeout");
const cancellationAdapter = createLocalOllamaMealNameProposalAdapter({ fetchImpl: abortingFetch, namingTimeoutMs: 1000 });
const cancellationController = new AbortController();
const cancelledPromise = cancellationAdapter.propose(baseInput, { signal: cancellationController.signal });
cancellationController.abort();
assert.equal((await cancelledPromise).status, "cancelled");

const deferred = [];
const coordinator = createMealNameProposalRequestCoordinator({
  propose(proposalInput) {
    return new Promise((resolve) => deferred.push({ proposalInput, resolve }));
  }
});
const inputB = { ...baseInput, requestId: "request-b", observationId: "observation-b", language: "en" };
const requestA = coordinator.request(baseInput);
const requestB = coordinator.request(inputB);
deferred[1].resolve({ status: "success", proposal: { schemaVersion: "mhb.meal-name-proposal/v1", requestId: "request-b", observationId: "observation-b", language: "en", status: "ok", candidates: [], diagnostics: {} }, diagnostics: {} });
assert.equal((await requestB).status, "success");
deferred[0].resolve({ status: "success", proposal: { schemaVersion: "mhb.meal-name-proposal/v1", requestId: "request-a", observationId: "observation-a", language: "th", status: "ok", candidates: [], diagnostics: {} }, diagnostics: {} });
assert.equal((await requestA).status, "stale_response", "an older observation cannot surface after a newer request");
const languageMismatch = createMealNameProposalRequestCoordinator({
  async propose(proposalInput) {
    return { status: "success", proposal: { schemaVersion: "mhb.meal-name-proposal/v1", requestId: proposalInput.requestId, observationId: proposalInput.observationId, language: "en", status: "ok", candidates: [], diagnostics: {} }, diagnostics: {} };
  }
});
assert.equal((await languageMismatch.request(baseInput)).status, "stale_response", "language identity is part of stale-response protection");

const namingSession = createMealNameProposalSession();
namingSession.begin(baseInput);
assert.equal(namingSession.snapshot().phase, "pending");
assert.equal(namingSession.resolve({
  status: "success",
  proposal: {
    schemaVersion: "mhb.meal-name-proposal/v1",
    requestId: baseInput.requestId,
    observationId: baseInput.observationId,
    language: baseInput.language,
    status: "ok",
    candidates: [{ candidateId: "candidate-1", text: "ข้าวราดเนื้อตุ๋น", basisEvidenceIds: ["dish-0"] }]
  }
}).phase, "ready");
assert.equal(namingSession.snapshot().selection, "skip", "ready sessions default to no name until a human explicitly chooses a candidate or custom text");

const twoCandidateSession = createMealNameProposalSession();
twoCandidateSession.begin(baseInput);
twoCandidateSession.resolve({
  status: "success",
  proposal: {
    schemaVersion: "mhb.meal-name-proposal/v1",
    requestId: baseInput.requestId,
    observationId: baseInput.observationId,
    language: baseInput.language,
    status: "ok",
    candidates: [
      { candidateId: "candidate-1", text: "ข้าวราดเนื้อตุ๋น", basisEvidenceIds: ["dish-0"] },
      { candidateId: "candidate-2", text: "ข้าวกับเนื้อตุ๋น", basisEvidenceIds: ["dish-0"] }
    ]
  }
});
assert.equal(twoCandidateSession.choose("candidate-1").selection, "candidate-1", "candidate one maps to its stable session identity, including the first list position");
assert.equal(twoCandidateSession.choose("candidate-2").selection, "candidate-2", "candidate two remains selected after the immediate session snapshot used for rerender");
assert.equal(twoCandidateSession.snapshot().selection, "candidate-2");
assert.equal(twoCandidateSession.choose("custom").selection, "custom");
assert.equal(twoCandidateSession.choose("skip").selection, "skip", "custom and skip remain selectable beside validated candidates");

const partialCandidateSession = createMealNameProposalSession();
partialCandidateSession.begin(baseInput);
partialCandidateSession.resolve({
  status: "success",
  proposal: {
    schemaVersion: "mhb.meal-name-proposal/v1",
    requestId: baseInput.requestId,
    observationId: baseInput.observationId,
    language: baseInput.language,
    status: "ok",
    candidates: [{ candidateId: "candidate-2", text: "ข้าวกับเนื้อตุ๋น", basisEvidenceIds: ["dish-0"] }]
  }
});
assert.equal(partialCandidateSession.choose("candidate-2").selection, "candidate-2", "a valid second-slot candidate remains selectable when candidate one was rejected");
namingSession.choose("custom");
namingSession.setCustomText("  ข้าวขาหมูไม่หนัง ใส่ไข่  ");
assert.deepEqual(namingSession.confirm(), { text: "ข้าวขาหมูไม่หนัง ใส่ไข่", source: "custom" }, "only an explicit confirmation returns text for the caller to write");
assert.equal(namingSession.snapshot().phase, "settled");
namingSession.begin(baseInput);
namingSession.resolve({
  status: "success",
  proposal: {
    requestId: baseInput.requestId,
    observationId: baseInput.observationId,
    language: baseInput.language,
    status: "ok",
    candidates: [{ candidateId: "candidate-1", text: "ข้าวราดเนื้อตุ๋น", basisEvidenceIds: ["dish-0"] }]
  }
});
namingSession.choose("candidate-1");
assert.equal(namingSession.confirm().text, "ข้าวราดเนื้อตุ๋น");
namingSession.begin(baseInput);
assert.equal(namingSession.resolve({ status: "success", proposal: { ...baseInput, observationId: "other", status: "ok", candidates: [] } }).phase, "pending", "a mismatched observation cannot make the current session ready");
namingSession.settle();
assert.equal(namingSession.snapshot().phase, "settled");
assert.equal(namingSession.resolve({
  status: "success",
  proposal: { ...baseInput, status: "ok", candidates: [{ candidateId: "candidate-1", text: "ข้าวราดเนื้อตุ๋น", basisEvidenceIds: ["dish-0"] }] }
}).phase, "settled", "a settled observation cannot reopen its naming dialog");
namingSession.begin(baseInput);
assert.equal(namingSession.resolve({
  status: "insufficient_evidence",
  proposal: { ...baseInput, status: "insufficient_evidence", candidates: [] }
}).phase, "insufficient", "insufficient evidence settles without candidates or a dialog");
namingSession.begin(baseInput);
assert.equal(namingSession.resolve({
  status: "timeout",
  proposal: { ...baseInput, status: "error", candidates: [] }
}).phase, "failed", "provider failures remain transient and cannot produce a ready dialog");

const proposalSource = fs.readFileSync(new URL("../js/mealNameProposal.mjs", import.meta.url), "utf8");
const indexSource = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
const mealUiSource = fs.readFileSync(new URL("../js/mealCompositionUI.js", import.meta.url), "utf8");
const scriptSource = fs.readFileSync(new URL("../script.js", import.meta.url), "utf8");
assert.doesNotMatch(proposalSource, /localStorage|sessionStorage|setDraftMeta|saveDraft|addFood|Reflection_Text|Daily_Log|workbook/i);
assert.doesNotMatch(proposalSource, /images\s*:/i, "the adapter has no image transport field");
assert.doesNotMatch(proposalSource, /(?:createMeal|updateMeal|deleteMeal)\s*\(/, "the adapter cannot mutate canonical meals");
assert.match(mealUiSource, /mealNameProposalFactory/, "B2 owns the naming UI integration within Meal Composer");
assert.match(scriptSource, /mealNameProposalFactory/, "B2 supplies the local proposal module to Meal Composer only");
assert.doesNotMatch(indexSource, /mealNameProposal/i, "B2 does not add a separate global naming page or markup");
console.log("Meal Name proposal input, parser, validator, adapter, and transient session tests passed.");
