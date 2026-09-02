import {
  DEFAULT_LOCAL_OLLAMA_MODEL,
  normalizeEndpoint,
  validateVisionObservation
} from "./localVisionProvider.mjs";

export const MEAL_NAME_PROPOSAL_INPUT_SCHEMA = "mhb.meal-name-proposal-input/v1";
export const MEAL_NAME_PROPOSAL_SCHEMA = "mhb.meal-name-proposal/v1";
export const MEAL_NAME_PROPOSAL_PROMPT_ID = "meal-name-lines-v1";
export const DEFAULT_NAMING_TIMEOUT_MS = 8000;

const MAX_DISH_CANDIDATES = 4;
const MAX_VISIBLE_COMPONENTS = 12;
const MAX_UNCERTAINTIES = 8;
const MAX_TEXT_CODE_POINTS = 80;
const MAX_BASIS_IDS = 4;
const LANGUAGES = new Set(["th", "en", "zh"]);
const NOT_OBSERVABLE = new Set(["sauce_identity", "seasoning_amount", "cooking_method"]);
const MAPPING_STATUSES = new Set(["mapped", "needs_review", "unsupported"]);
const WIRE_KEYS = ["STATUS", "CANDIDATE_1", "BASIS_1", "CANDIDATE_2", "BASIS_2"];
const BASIS_ID_PATTERN = /^(dish|component|uncertainty)-\d+$/;
const FORBIDDEN_CANDIDATE = /(?:https?:\/\/|www\.|<\/?[a-z][^>]*>|[{}\[\]`;]|\b(?:food_id|named_dish_id|meal_name|schema_version|candidate_\d|basis_\d|status)\s*[:=]|\b[a-z][a-z0-9]*(?:_[a-z0-9]+){1,}\b|\b(?:sodium|calorie(?:s)?|macro(?:s)?|nutrition(?:al)?|medical|diagnos(?:is|tic)|therapy|healthy|health(?:\s+(?:score|claim|effect))?|protein[- ]high|low[- ]fat|recommend(?:ation|ed)?|should|must|score|rating|definitely|certainly|guaranteed|proven|exact|100%)\b|โซเดียม|แคลอรี|แคลอรี่|แคลอรีสูง|โปรตีนสูง|สุขภาพ|เพื่อสุขภาพ|โภชนาการ|ไขมันต่ำ|น้ำตาลต่ำ|ลดน้ำหนัก|การแพทย์|วินิจฉัย|รักษา|ควร|แนะนำ|คะแนน|รับประกัน|แน่นอน|ชัวร์|低钠|高蛋白|卡路里|热量|营养|健康|医疗|诊断|治疗|建议|推荐|评分|保证|一定|肯定)/iu;
const SPECIES = Object.freeze([
  { id: "pork", patterns: [/\bpork\b/iu, /หมู/u, /猪肉/u] },
  { id: "chicken", patterns: [/\bchicken\b/iu, /ไก่/u, /鸡肉/u] },
  { id: "beef", patterns: [/\bbeef\b/iu, /เนื้อวัว/u, /牛肉/u] }
]);

function text(value) {
  return String(value ?? "").trim();
}

function codePoints(value) {
  return [...String(value || "")];
}

function cloneFrozen(value) {
  if (Array.isArray(value)) return Object.freeze(value.map(cloneFrozen));
  if (value && typeof value === "object") {
    return Object.freeze(Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, cloneFrozen(entry)])));
  }
  return value;
}

function normalizeLanguage(value) {
  return LANGUAGES.has(value) ? value : "th";
}

function boundedEvidenceText(value, diagnostics) {
  const source = text(value).replace(/[\r\n\t]+/g, " ").replace(/\s{2,}/g, " ");
  const points = codePoints(source);
  if (points.length <= MAX_TEXT_CODE_POINTS) return source;
  diagnostics.textTruncations += 1;
  return points.slice(0, MAX_TEXT_CODE_POINTS).join("");
}

function boundedEntries(entries, limit, mapEntry, diagnostics, key) {
  const source = Array.isArray(entries) ? entries : [];
  if (source.length > limit) diagnostics.arrayTruncations[key] = source.length - limit;
  return source.slice(0, limit).map(mapEntry).filter(Boolean);
}

function mapReviewStatus(value) {
  if (value === "safe_exact") return "mapped";
  if (value === "needs_user_choice") return "needs_review";
  return "unsupported";
}

function hasAnimalSpeciesUncertainty(uncertainties) {
  return uncertainties.some((entry) => /animal\s+protein\s+species|protein\s+species|ชนิด.*(?:สัตว์|โปรตีน)|(?:สัตว์|โปรตีน).*ชนิด|动物蛋白.*物种|肉类.*物种/iu.test(entry.label));
}

function evidenceLabels(input) {
  return [
    ...(input?.dishCandidates || []).map((entry) => entry.label),
    ...(input?.visibleComponents || []).map((entry) => entry.observedLabel)
  ].join("\n");
}

function matchedSpecies(value) {
  return SPECIES.filter((species) => species.patterns.some((pattern) => pattern.test(value))).map((species) => species.id);
}

function comparisonText(value, language) {
  return text(value).normalize("NFKC").replace(/\s+/g, " ").toLocaleLowerCase(language);
}

function isValidBasisSyntax(value) {
  if (value === "none") return true;
  const ids = value.split(",").map((entry) => entry.trim()).filter(Boolean);
  return ids.length > 0 && ids.length <= MAX_BASIS_IDS && ids.every((entry) => BASIS_ID_PATTERN.test(entry)) && new Set(ids).size === ids.length;
}

function parseBasis(value) {
  return value === "none" ? [] : value.split(",").map((entry) => entry.trim());
}

function createProposal(input, status, candidates = [], diagnostics = {}) {
  return cloneFrozen({
    schemaVersion: MEAL_NAME_PROPOSAL_SCHEMA,
    requestId: text(input?.requestId),
    observationId: text(input?.observationId),
    language: normalizeLanguage(input?.language),
    status,
    candidates,
    diagnostics
  });
}

function createAdapterResult(status, input, proposal, diagnostics = {}) {
  return cloneFrozen({ status, proposal, diagnostics });
}

function createAbortContext(timeoutMs, externalSignal) {
  const controller = new AbortController();
  let timedOut = false;
  const onExternalAbort = () => controller.abort();
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  externalSignal?.addEventListener?.("abort", onExternalAbort, { once: true });
  return {
    signal: controller.signal,
    didTimeout: () => timedOut,
    cancel: () => {
      clearTimeout(timer);
      externalSignal?.removeEventListener?.("abort", onExternalAbort);
    }
  };
}

function now() {
  return globalThis.performance?.now?.() ?? Date.now();
}

export function buildMealNameProposalInput({ observation, review, requestId, language = "th" } = {}) {
  const validation = validateVisionObservation(observation);
  const observationId = text(observation?.observation_id);
  if (!validation.valid || !observationId || !review || text(review.observationId) !== observationId) return null;

  const diagnostics = { textTruncations: 0, arrayTruncations: {} };
  const dishCandidates = boundedEntries(observation.dish_candidates, MAX_DISH_CANDIDATES, (entry, index) => {
    const label = boundedEvidenceText(entry?.label, diagnostics);
    return label ? { evidenceId: `dish-${index}`, label } : null;
  }, diagnostics, "dishCandidates");
  const visibleComponents = boundedEntries(observation.visible_components, MAX_VISIBLE_COMPONENTS, (entry, index) => {
    const reviewEntry = review.components?.[index];
    const observedLabel = boundedEvidenceText(entry?.label, diagnostics);
    const mappingStatus = mapReviewStatus(reviewEntry?.mappingStatus);
    if (!observedLabel || !MAPPING_STATUSES.has(mappingStatus)) return null;
    return {
      evidenceId: `component-${index}`,
      observedLabel,
      mappingStatus,
      ...(mappingStatus === "mapped" && text(reviewEntry?.selectedFoodId) ? { mappedFoodReferenceId: text(reviewEntry.selectedFoodId) } : {})
    };
  }, diagnostics, "visibleComponents");
  const uncertainties = boundedEntries(observation.uncertain_observations, MAX_UNCERTAINTIES, (entry, index) => {
    const label = boundedEvidenceText(entry?.label || entry, diagnostics);
    return label ? { evidenceId: `uncertainty-${index}`, topic: text(entry?.topic) || "component_identity", label } : null;
  }, diagnostics, "uncertainties");
  const notObservable = (Array.isArray(observation.not_observable) ? observation.not_observable : [])
    .map((entry) => text(entry).toLowerCase().replace(/\s+/g, "_"))
    .filter((entry) => NOT_OBSERVABLE.has(entry));
  const specificityConstraints = hasAnimalSpeciesUncertainty(uncertainties) ? ["animal_species_unknown"] : [];

  return cloneFrozen({
    schemaVersion: MEAL_NAME_PROPOSAL_INPUT_SCHEMA,
    requestId: text(requestId) || `naming-${observationId}`,
    observationId,
    language: normalizeLanguage(language),
    dishCandidates,
    visibleComponents,
    uncertainties,
    notObservable,
    specificityConstraints,
    diagnostics: {
      textTruncations: diagnostics.textTruncations,
      arrayTruncations: diagnostics.arrayTruncations,
      evidenceComplete: diagnostics.textTruncations === 0 && Object.keys(diagnostics.arrayTruncations).length === 0
    }
  });
}

export function buildMealNameProposalPrompt(input) {
  const sections = [
    `PROMPT_VERSION: ${MEAL_NAME_PROPOSAL_PROMPT_ID}`,
    "Task: propose a short, natural meal name in the requested language using only the bounded evidence below.",
    "Return zero, one, or two candidates. Broad names are preferred when the evidence is uncertain.",
    "Do not add hidden ingredients, recipe facts, nutrition, sodium, calories, health claims, medical language, recommendations, canonical IDs, or certainty claims.",
    "Respect uncertainty and NOT_OBSERVABLE limits. If no defensible name is available, return insufficient_evidence.",
    `Requested language: ${normalizeLanguage(input?.language)}.`,
    ...(input?.specificityConstraints?.includes("animal_species_unknown")
      ? [
        "CRITICAL SPECIES RULE: animal species is unknown. A candidate must not name pork, chicken, or beef.",
        "Do not use: pork, chicken, beef, หมู, ไก่, เนื้อวัว, 猪肉, 鸡肉, 牛肉.",
        "Before returning the five lines, check each candidate for those terms. Use a broader meat wording or insufficient_evidence instead."
      ]
      : []),
    "Return exactly five lines and no prose:",
    "STATUS: ok or insufficient_evidence",
    "CANDIDATE_1: short name or none",
    "BASIS_1: comma-separated evidence IDs or none",
    "CANDIDATE_2: short name or none",
    "BASIS_2: comma-separated evidence IDs or none",
    "DISH EVIDENCE:"
  ];
  for (const entry of input?.dishCandidates || []) sections.push(`[${entry.evidenceId}] ${entry.label}`);
  sections.push("VISIBLE COMPONENT EVIDENCE:");
  for (const entry of input?.visibleComponents || []) sections.push(`[${entry.evidenceId}] ${entry.observedLabel} (${entry.mappingStatus})`);
  sections.push("UNCERTAINTY EVIDENCE:");
  for (const entry of input?.uncertainties || []) sections.push(`[${entry.evidenceId}] ${entry.label}`);
  sections.push(`NOT_OBSERVABLE: ${(input?.notObservable || []).join(", ") || "none"}`);
  sections.push(`SPECIFICITY_CONSTRAINTS: ${(input?.specificityConstraints || []).join(", ") || "none"}`);
  return sections.join("\n");
}

export function parseMealNameProposalLines(responseText) {
  const lines = text(responseText).split(/\r?\n/);
  if (lines.length !== WIRE_KEYS.length) return null;
  const fields = new Map();
  for (let index = 0; index < WIRE_KEYS.length; index += 1) {
    const line = lines[index];
    const separator = line.indexOf(":");
    if (separator < 1) return null;
    const key = line.slice(0, separator).trim().toUpperCase();
    const value = line.slice(separator + 1).trim();
    if (key !== WIRE_KEYS[index] || fields.has(key)) return null;
    fields.set(key, value);
  }
  const status = fields.get("STATUS");
  const candidateOne = fields.get("CANDIDATE_1");
  const candidateTwo = fields.get("CANDIDATE_2");
  const basisOne = fields.get("BASIS_1");
  const basisTwo = fields.get("BASIS_2");
  if (!new Set(["ok", "insufficient_evidence"]).has(status)) return null;
  if (![candidateOne, candidateTwo].every((value) => value === "none" || Boolean(value))) return null;
  if (![basisOne, basisTwo].every(isValidBasisSyntax)) return null;
  return cloneFrozen({
    status,
    slots: [
      { slot: 1, text: candidateOne, basisEvidenceIds: parseBasis(basisOne) },
      { slot: 2, text: candidateTwo, basisEvidenceIds: parseBasis(basisTwo) }
    ]
  });
}

export function validateMealNameProposal(parsed, input) {
  if (!parsed || !input || text(parsed.status) === "") {
    return cloneFrozen({ valid: false, proposal: createProposal(input, "error", [], { code: "malformed_response" }), issues: ["malformed_response"] });
  }
  const evidenceIds = new Set([
    ...(input.dishCandidates || []).map((entry) => entry.evidenceId),
    ...(input.visibleComponents || []).map((entry) => entry.evidenceId),
    ...(input.uncertainties || []).map((entry) => entry.evidenceId)
  ]);
  const slots = Array.isArray(parsed.slots) ? parsed.slots : [];
  const first = slots[0] || { text: "none", basisEvidenceIds: [] };
  const second = slots[1] || { text: "none", basisEvidenceIds: [] };
  const consistencyIssues = [];
  if (parsed.status === "insufficient_evidence" && (first.text !== "none" || second.text !== "none" || first.basisEvidenceIds.length || second.basisEvidenceIds.length)) consistencyIssues.push("insufficient_has_candidates");
  if (parsed.status === "ok" && first.text === "none") consistencyIssues.push("ok_missing_candidate_one");
  if (first.text === "none" && second.text !== "none") consistencyIssues.push("candidate_two_without_one");
  if (first.text === "none" && first.basisEvidenceIds.length) consistencyIssues.push("candidate_one_basis_without_text");
  if (second.text === "none" && second.basisEvidenceIds.length) consistencyIssues.push("candidate_two_basis_without_text");
  if (consistencyIssues.length) {
    return cloneFrozen({ valid: false, proposal: createProposal(input, "error", [], { code: "validation_failed" }), issues: consistencyIssues });
  }
  if (parsed.status === "insufficient_evidence") {
    return cloneFrozen({ valid: true, proposal: createProposal(input, "insufficient_evidence", [], { code: "" }), issues: [] });
  }

  const accepted = [];
  const issues = [];
  const seen = new Set();
  const supportedSpecies = matchedSpecies(evidenceLabels(input));
  for (const entry of [first, second]) {
    if (entry.text === "none") continue;
    const candidateText = text(entry.text);
    const candidateIssues = [];
    if (!candidateText || codePoints(candidateText).length > MAX_TEXT_CODE_POINTS) candidateIssues.push("invalid_candidate_length");
    if (/[\u0000-\u001F\u007F]/u.test(candidateText)) candidateIssues.push("invalid_candidate_control_character");
    if (FORBIDDEN_CANDIDATE.test(candidateText)) candidateIssues.push("forbidden_candidate_content");
    if (!entry.basisEvidenceIds.length || entry.basisEvidenceIds.some((id) => !evidenceIds.has(id))) candidateIssues.push("invalid_basis_reference");
    const species = matchedSpecies(candidateText);
    if (input.specificityConstraints?.includes("animal_species_unknown") && species.some((id) => !supportedSpecies.includes(id))) candidateIssues.push("unsupported_species_specificity");
    const comparison = comparisonText(candidateText, input.language);
    if (seen.has(comparison)) candidateIssues.push("duplicate_candidate");
    if (candidateIssues.length) {
      issues.push(...candidateIssues.map((issue) => `candidate_${entry.slot}_${issue}`));
      continue;
    }
    seen.add(comparison);
    accepted.push({ candidateId: `candidate-${entry.slot}`, text: candidateText, basisEvidenceIds: entry.basisEvidenceIds });
  }

  if (!accepted.length) {
    return cloneFrozen({ valid: false, proposal: createProposal(input, "error", [], { code: "validation_failed" }), issues: [...new Set(issues)] });
  }
  return cloneFrozen({ valid: true, proposal: createProposal(input, "ok", accepted, { code: "", discardedCandidateCount: issues.length ? 2 - accepted.length : 0 }), issues: [...new Set(issues)] });
}

export function createLocalOllamaMealNameProposalAdapter(options = {}) {
  const endpoint = normalizeEndpoint(options.endpoint || "http://127.0.0.1:11434");
  const model = text(options.model || DEFAULT_LOCAL_OLLAMA_MODEL);
  const fetchImpl = options.fetchImpl || fetch;
  const availabilityTimeoutMs = options.availabilityTimeoutMs || 2000;
  const namingTimeoutMs = options.namingTimeoutMs || DEFAULT_NAMING_TIMEOUT_MS;
  const trace = typeof options.onTrace === "function" ? options.onTrace : () => {};

  async function isAvailable({ signal } = {}) {
    if (!endpoint) return createAdapterResult("provider_unavailable", null, null, { code: "provider_unavailable" });
    const abort = createAbortContext(availabilityTimeoutMs, signal);
    try {
      const response = await fetchImpl(`${endpoint}/api/tags`, { signal: abort.signal });
      const body = await response.json();
      if (!response.ok) return createAdapterResult("provider_unavailable", null, null, { code: "provider_unavailable" });
      const models = Array.isArray(body.models) ? body.models : [];
      return models.some((entry) => entry?.name === model)
        ? createAdapterResult("ready", null, null, { model, endpointScope: "localhost" })
        : createAdapterResult("model_missing", null, null, { code: "model_missing" });
    } catch (error) {
      const code = abort.didTimeout() ? "timeout" : error?.name === "AbortError" ? "cancelled" : "provider_unavailable";
      return createAdapterResult(code, null, null, { code });
    } finally {
      abort.cancel();
    }
  }

  async function propose(input, { signal } = {}) {
    if (!input || input.schemaVersion !== MEAL_NAME_PROPOSAL_INPUT_SCHEMA) {
      return createAdapterResult("validation_failed", input, createProposal(input, "error", [], { code: "validation_failed" }), { code: "validation_failed" });
    }
    if (!endpoint) return createAdapterResult("provider_unavailable", input, createProposal(input, "error", [], { code: "provider_unavailable" }), { code: "provider_unavailable" });
    const abort = createAbortContext(namingTimeoutMs, signal);
    const startedAt = now();
    try {
      trace("naming_request_started", { requestId: input.requestId, observationId: input.observationId, language: input.language });
      const response = await fetchImpl(`${endpoint}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abort.signal,
        body: JSON.stringify({
          model,
          prompt: buildMealNameProposalPrompt(input),
          stream: false,
          options: { temperature: 0 }
        })
      });
      const body = await response.json();
      trace("naming_response_received", { requestId: input.requestId, observationId: input.observationId, ok: response.ok, responseLength: text(body?.response).length, latencyMs: Math.round(now() - startedAt) });
      if (!response.ok || body.error) {
        return createAdapterResult("provider_unavailable", input, createProposal(input, "error", [], { code: "provider_unavailable" }), { code: "provider_unavailable", latencyMs: Math.round(now() - startedAt) });
      }
      const parsed = parseMealNameProposalLines(body.response);
      trace("naming_parse_result", { requestId: input.requestId, observationId: input.observationId, valid: Boolean(parsed) });
      if (!parsed) {
        return createAdapterResult("malformed_response", input, createProposal(input, "error", [], { code: "malformed_response" }), { code: "malformed_response", latencyMs: Math.round(now() - startedAt) });
      }
      const validation = validateMealNameProposal(parsed, input);
      trace("naming_validation_result", {
        requestId: input.requestId,
        observationId: input.observationId,
        valid: validation.valid,
        candidateCount: validation.proposal?.candidates?.length || 0,
        status: validation.proposal?.status || "error",
        issueCodes: validation.issues || []
      });
      if (!validation.valid) {
        return createAdapterResult("validation_failed", input, validation.proposal, { code: "validation_failed", latencyMs: Math.round(now() - startedAt), validationIssues: validation.issues });
      }
      const status = validation.proposal.status === "insufficient_evidence" ? "insufficient_evidence" : "success";
      return createAdapterResult(status, input, validation.proposal, { code: "", latencyMs: Math.round(now() - startedAt), providerId: "ollama-local", modelId: model, promptId: MEAL_NAME_PROPOSAL_PROMPT_ID, endpointScope: "localhost" });
    } catch (error) {
      const code = abort.didTimeout() ? "timeout" : error?.name === "AbortError" ? "cancelled" : "provider_unavailable";
      return createAdapterResult(code, input, createProposal(input, "error", [], { code }), { code, latencyMs: Math.round(now() - startedAt) });
    } finally {
      abort.cancel();
    }
  }

  return Object.freeze({ isAvailable, propose, endpointScope: endpoint ? "localhost" : "", model, namingTimeoutMs });
}

export function createMealNameProposalRequestCoordinator(adapter) {
  let active = null;

  async function request(input) {
    if (!adapter?.propose || !input) return createAdapterResult("validation_failed", input, createProposal(input, "error", [], { code: "validation_failed" }), { code: "validation_failed" });
    active?.controller.abort();
    const controller = new AbortController();
    const token = { controller, requestId: text(input.requestId), observationId: text(input.observationId), language: normalizeLanguage(input.language) };
    active = token;
    const result = await adapter.propose(input, { signal: controller.signal });
    if (active !== token || result?.proposal?.observationId !== token.observationId || result?.proposal?.requestId !== token.requestId || result?.proposal?.language !== token.language) {
      return createAdapterResult("stale_response", input, createProposal(input, "error", [], { code: "stale_response" }), { code: "stale_response" });
    }
    active = null;
    return result;
  }

  function cancel() {
    if (!active) return false;
    active.controller.abort();
    active = null;
    return true;
  }

  return Object.freeze({ request, cancel });
}

export function createMealNameProposalSession() {
  let state = {
    phase: "idle",
    requestId: "",
    observationId: "",
    language: "th",
    candidates: [],
    selection: "",
    customText: ""
  };

  function snapshot() {
    return cloneFrozen(state);
  }

  function belongsToCurrent(proposal) {
    return proposal
      && text(proposal.requestId) === state.requestId
      && text(proposal.observationId) === state.observationId
      && normalizeLanguage(proposal.language) === state.language;
  }

  function begin(input) {
    state = {
      phase: "pending",
      requestId: text(input?.requestId),
      observationId: text(input?.observationId),
      language: normalizeLanguage(input?.language),
      candidates: [],
      selection: "",
      customText: ""
    };
    return snapshot();
  }

  function resolve(result) {
    const proposal = result?.proposal;
    if (state.phase !== "pending" || !belongsToCurrent(proposal)) return snapshot();
    if (result?.status === "success" && proposal.status === "ok" && proposal.candidates?.length) {
      state = { ...state, phase: "ready", candidates: proposal.candidates, selection: "skip", customText: "" };
      return snapshot();
    }
    state = {
      ...state,
      phase: result?.status === "insufficient_evidence" ? "insufficient" : "failed",
      candidates: [],
      selection: "",
      customText: ""
    };
    return snapshot();
  }

  function choose(value) {
    if (!["ready", "insufficient", "failed"].includes(state.phase)) return snapshot();
    const isCandidate = state.candidates.some((candidate) => candidate.candidateId === value);
    state = { ...state, selection: isCandidate || value === "custom" || value === "skip" ? value : state.selection };
    return snapshot();
  }

  function setCustomText(value) {
    if (!["ready", "insufficient", "failed"].includes(state.phase)) return snapshot();
    state = { ...state, customText: String(value ?? "") };
    return snapshot();
  }

  function confirm() {
    if (!["ready", "insufficient", "failed"].includes(state.phase)) return null;
    const candidate = state.candidates.find((entry) => entry.candidateId === state.selection);
    const textValue = candidate ? candidate.text : state.selection === "custom" ? text(state.customText) : "";
    if (!textValue) return null;
    state = { ...state, phase: "settled", selection: "", customText: "" };
    return Object.freeze({ text: textValue, source: candidate ? "candidate" : "custom" });
  }

  function settle() {
    if (state.phase === "idle") return snapshot();
    state = { ...state, phase: "settled", selection: "", customText: "" };
    return snapshot();
  }

  function reset() {
    state = { phase: "idle", requestId: "", observationId: "", language: "th", candidates: [], selection: "", customText: "" };
    return snapshot();
  }

  return Object.freeze({ snapshot, begin, resolve, choose, setCustomText, confirm, settle, reset });
}
