const DEFAULT_ENDPOINT = "http://127.0.0.1:11434";
const DEFAULT_MODEL = "gemma3:12b";
const MEAL_TYPES = new Set([
  "stir_fried", "boiled", "curry", "fried", "grilled", "steamed",
  "broth_based", "minimally_prepared", "other", "unspecified"
]);
const CONFIDENCE = new Set(["high", "medium", "low", "unknown"]);
const NOT_OBSERVABLE = new Set(["sauce_identity", "seasoning_amount", "cooking_method"]);
const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);
const FORBIDDEN_OUTPUT = /\b(sodium|calories?|macros?|grams?|medical|health\s*(effect|score|claim)|recipe|hidden\s*(ingredient|sauce|seasoning)|condiment\s*quantity|named_dish_id|food_id)\b/i;

export const PARSER_LINES_V2_PROMPT = `Observe only visibly supported food facts. Components must be edible food or drink only; never list plates, bowls, utensils, furniture, or other scene objects. Do not name unavailable nutrition fields, health effects, quantities, recipe ingredients, hidden sauces, or hidden seasoning anywhere in the response. Do not output canonical MHB IDs. If uncertain, say so briefly.
Return exactly five lines:
DISH: comma-separated broad visible dish labels or unknown
COMPONENTS: comma-separated edible visible components or unknown
MEAL_TYPES: comma-separated values from ${[...MEAL_TYPES].join(", ")}
UNCERTAIN: comma-separated visually uncertain observations
NOT_OBSERVABLE: comma-separated image limits using only sauce identity, seasoning amount, or cooking method`;

export function isLoopbackEndpoint(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" && LOOPBACK_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

export function normalizeEndpoint(value = DEFAULT_ENDPOINT) {
  if (!isLoopbackEndpoint(value)) return null;
  return new URL(value).toString().replace(/\/$/, "");
}

function list(value) {
  return String(value || "").split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry && entry.toLowerCase() !== "unknown");
}

function lineMap(text) {
  const lines = String(text || "").trim().split(/\r?\n/).filter(Boolean);
  if (lines.length !== 5) return null;
  const values = new Map();
  for (const line of lines) {
    const separator = line.indexOf(":");
    if (separator < 1) return null;
    const key = line.slice(0, separator).trim().toUpperCase();
    if (values.has(key)) return null;
    values.set(key, line.slice(separator + 1).trim());
  }
  return values;
}

export function parseParserLinesV2(text) {
  const fields = lineMap(text);
  const required = ["DISH", "COMPONENTS", "MEAL_TYPES", "UNCERTAIN", "NOT_OBSERVABLE"];
  if (!fields || required.some((key) => !fields.has(key))) return null;
  return {
    dish_candidates: list(fields.get("DISH")).map((label) => ({ label, confidence: "unknown" })),
    visible_components: list(fields.get("COMPONENTS")).map((label) => ({ label, confidence: "unknown" })),
    meal_type_candidates: list(fields.get("MEAL_TYPES")).map((meal_type) => ({ meal_type, confidence: "unknown" })),
    uncertain_observations: list(fields.get("UNCERTAIN")).map((label) => ({ topic: "component_identity", label })),
    not_observable: list(fields.get("NOT_OBSERVABLE")).map((label) => label.toLowerCase().replace(/\s+/g, "_"))
  };
}

export function validateVisionObservation(proposal) {
  const issues = [];
  if (!proposal || typeof proposal !== "object") issues.push("malformed_output");
  for (const key of ["dish_candidates", "visible_components", "meal_type_candidates", "uncertain_observations", "not_observable"]) {
    if (!Array.isArray(proposal?.[key])) issues.push(`missing_${key}`);
  }
  const serialized = JSON.stringify(proposal || {});
  if (FORBIDDEN_OUTPUT.test(serialized)) issues.push("forbidden_assertion");
  if (proposal?.meal_type_candidates?.some((entry) => !MEAL_TYPES.has(entry?.meal_type))) issues.push("invalid_meal_type");
  if (proposal?.not_observable?.some((entry) => !NOT_OBSERVABLE.has(entry))) issues.push("invalid_not_observable");
  for (const group of [proposal?.dish_candidates, proposal?.visible_components, proposal?.meal_type_candidates]) {
    if (Array.isArray(group) && group.some((entry) => !CONFIDENCE.has(entry?.confidence))) issues.push("invalid_confidence");
  }
  if (!proposal?.dish_candidates?.length && !proposal?.visible_components?.length && !proposal?.meal_type_candidates?.length) issues.push("empty_observation");
  return Object.freeze({ valid: issues.length === 0, issues: Object.freeze([...new Set(issues)]) });
}

export function createProviderFailure(code, detail = "") {
  return Object.freeze({ status: code, observation: null, diagnostics: Object.freeze({ detail }) });
}

function withTimeout(timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return { signal: controller.signal, cancel: () => clearTimeout(timer) };
}

async function imageToBase64(image) {
  const bytes = new Uint8Array(await image.arrayBuffer());
  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  return btoa(binary);
}

export function createLocalOllamaVisionProvider(options = {}) {
  const endpoint = normalizeEndpoint(options.endpoint || DEFAULT_ENDPOINT);
  const model = String(options.model || DEFAULT_MODEL).trim();
  const fetchImpl = options.fetchImpl || fetch;
  const availabilityTimeoutMs = options.availabilityTimeoutMs || 2000;
  const observationTimeoutMs = options.observationTimeoutMs || 30000;

  async function isAvailable() {
    if (!endpoint) return createProviderFailure("unavailable", "Endpoint is not loopback HTTP.");
    const timeout = withTimeout(availabilityTimeoutMs);
    try {
      const response = await fetchImpl(`${endpoint}/api/tags`, { signal: timeout.signal });
      const body = await response.json();
      if (!response.ok) return createProviderFailure("provider_unreachable", `HTTP ${response.status}`);
      const models = Array.isArray(body.models) ? body.models : [];
      return models.some((entry) => entry?.name === model)
        ? Object.freeze({ status: "ready", model, endpoint_scope: "localhost" })
        : createProviderFailure("model_missing", model);
    } catch (error) {
      return createProviderFailure(error?.name === "AbortError" ? "timeout" : "provider_unreachable", error?.message || "");
    } finally {
      timeout.cancel();
    }
  }

  async function observeMeal(image) {
    if (!endpoint) return createProviderFailure("unavailable", "Endpoint is not loopback HTTP.");
    if (!image || typeof image.arrayBuffer !== "function") return createProviderFailure("image_error", "A browser File or Blob is required.");
    const timeout = withTimeout(observationTimeoutMs);
    const startedAt = performance.now();
    try {
      const response = await fetchImpl(`${endpoint}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: timeout.signal,
        body: JSON.stringify({ model, prompt: PARSER_LINES_V2_PROMPT, images: [await imageToBase64(image)], stream: false, options: { temperature: 0 } })
      });
      const body = await response.json();
      if (!response.ok || body.error) return createProviderFailure("provider_unreachable", body.error || `HTTP ${response.status}`);
      const proposal = parseParserLinesV2(body.response);
      const validation = validateVisionObservation(proposal);
      if (!validation.valid) return Object.freeze({
        status: "invalid_output",
        observation: null,
        validation,
        diagnostics: Object.freeze({ latency_ms: Math.round(performance.now() - startedAt) })
      });
      return Object.freeze({
        status: "success",
        observation: Object.freeze({
          schema_version: "mhb.vision-meal-observation/v1",
          observation_id: `transient-${Date.now()}`,
          provider: Object.freeze({ provider_id: "ollama-local", model_id: model, strategy_id: "parser-lines-v2", endpoint_scope: "localhost" }),
          status: "valid",
          ...proposal,
          validation,
          diagnostics: Object.freeze({
            latency_ms: Math.round(performance.now() - startedAt),
            provider_timing: Object.freeze({ total_duration_ns: body.total_duration || null, load_duration_ns: body.load_duration || null })
          })
        })
      });
    } catch (error) {
      return createProviderFailure(error?.name === "AbortError" ? "timeout" : "provider_unreachable", error?.message || "");
    } finally {
      timeout.cancel();
    }
  }

  return Object.freeze({ isAvailable, observeMeal });
}
