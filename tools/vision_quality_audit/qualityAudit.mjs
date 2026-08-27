import {
  PARSER_LINES_V2_PROMPT,
  normalizeEndpoint,
  parseParserLinesV2,
  validateVisionObservation
} from "../../js/localVisionProvider.mjs";

const DEFAULT_ENDPOINT = "http://127.0.0.1:11434";
const DEFAULT_MODEL = "gemma3:12b";

export const RESOLUTION_TIERS = Object.freeze([
  Object.freeze({ id: "v1_current_1600", maxDimension: 1600 }),
  Object.freeze({ id: "v2_2048", maxDimension: 2048 }),
  Object.freeze({ id: "v3_2560", maxDimension: 2560 }),
  Object.freeze({ id: "v4_source_bounded", maxDimension: 4096 })
]);

export const PROMPTS = Object.freeze({
  p0_current: PARSER_LINES_V2_PROMPT,
  p1_broad_structure: `${PARSER_LINES_V2_PROMPT}\nPrefer a broad visible meal family over an exact named dish when the image does not clearly support that specificity.`,
  p2_protein_uncertainty: `${PARSER_LINES_V2_PROMPT}\nWhen animal-protein species is not visually clear, put the ambiguity in UNCERTAIN instead of selecting a species.`
});

function withTimeout(timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return { signal: controller.signal, clear: () => clearTimeout(timer) };
}

async function imageToBase64(image) {
  const bytes = new Uint8Array(await image.arrayBuffer());
  let binary = "";
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
}

export async function observeNormalizedImage(image, options = {}) {
  const endpoint = normalizeEndpoint(options.endpoint || DEFAULT_ENDPOINT);
  const model = String(options.model || DEFAULT_MODEL).trim();
  const promptId = options.promptId || "p0_current";
  const prompt = PROMPTS[promptId];
  const timeoutMs = options.timeoutMs || 120000;
  if (!endpoint || !prompt || !image || typeof image.arrayBuffer !== "function") {
    return Object.freeze({ status: "invalid_request", observation: null, validation: null, diagnostics: Object.freeze({}) });
  }

  const timeout = withTimeout(timeoutMs);
  const startedAt = performance.now();
  try {
    const response = await fetch(`${endpoint}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: timeout.signal,
      body: JSON.stringify({
        model,
        prompt,
        images: [await imageToBase64(image)],
        stream: false,
        options: { temperature: 0 }
      })
    });
    const body = await response.json();
    if (!response.ok || body.error) {
      return Object.freeze({
        status: "provider_error",
        observation: null,
        validation: null,
        diagnostics: Object.freeze({ latency_ms: Math.round(performance.now() - startedAt), detail: body.error || `HTTP ${response.status}` })
      });
    }
    const observation = parseParserLinesV2(body.response);
    const validation = validateVisionObservation(observation);
    return Object.freeze({
      status: validation.valid ? "success" : "invalid_output",
      observation: validation.valid ? observation : null,
      validation,
      diagnostics: Object.freeze({
        latency_ms: Math.round(performance.now() - startedAt),
        provider_timing: Object.freeze({ total_duration_ns: body.total_duration || null, load_duration_ns: body.load_duration || null })
      })
    });
  } catch (error) {
    return Object.freeze({
      status: error?.name === "AbortError" ? "timeout" : "provider_error",
      observation: null,
      validation: null,
      diagnostics: Object.freeze({ latency_ms: Math.round(performance.now() - startedAt), detail: error?.message || "" })
    });
  } finally {
    timeout.clear();
  }
}

export function publicResult({ file, tier, quality, promptId, normalization, observationResult }) {
  return Object.freeze({
    file,
    tier: tier.id,
    max_dimension: tier.maxDimension,
    quality,
    prompt_id: promptId,
    normalization: Object.freeze({
      status: normalization.status,
      source_format: normalization.sourceFormat,
      normalized_format: normalization.normalizedFormat,
      converted: normalization.converted,
      diagnostics: normalization.diagnostics
    }),
    result: Object.freeze({
      status: observationResult.status,
      observation: observationResult.observation,
      validation: observationResult.validation,
      diagnostics: observationResult.diagnostics
    })
  });
}
