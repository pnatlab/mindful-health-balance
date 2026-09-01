import assert from "node:assert/strict";
import fs from "node:fs";
import {
  PARSER_LINES_V3_PROMPT,
  createLocalOllamaVisionProvider,
  isLoopbackEndpoint,
  parseParserLinesV2,
  validateVisionObservation
} from "../tools/browser_vision_probe/localVisionProvider.mjs";

const runtimeVisionModule = await import("../js/localVisionProvider.mjs");
const runtimeMealNameModule = await import("../js/mealNameProposal.mjs");
assert.equal(runtimeVisionModule.createLocalOllamaVisionProvider, createLocalOllamaVisionProvider);
assert.equal(runtimeVisionModule.DEFAULT_LOCAL_OLLAMA_MODEL, "gemma3:12b", "the runtime Vision module exports the shared local-model contract");
assert.equal(typeof runtimeMealNameModule.createLocalOllamaMealNameProposalAdapter, "function", "Meal Name proposals import with their real Vision-provider dependency");

assert.equal(isLoopbackEndpoint("http://127.0.0.1:11434"), true);
assert.equal(isLoopbackEndpoint("http://localhost:11434"), true);
assert.equal(isLoopbackEndpoint("http://192.168.1.20:11434"), false);
assert.equal(isLoopbackEndpoint("https://example.com"), false);
assert.equal(isLoopbackEndpoint("not-a-url"), false);

const validLines = "DISH: fried rice\nCOMPONENTS: rice, egg\nMEAL_TYPES: stir_fried\nUNCERTAIN: protein type\nNOT_OBSERVABLE: sauce identity, seasoning amount";
const validProposal = parseParserLinesV2(validLines);
assert.equal(validateVisionObservation(validProposal).valid, true);
assert.equal(validateVisionObservation(parseParserLinesV2("DISH: rice bowl\nCOMPONENTS: meat\nMEAL_TYPES: other\nUNCERTAIN: animal protein species\nNOT_OBSERVABLE: Sauce Identity, seasoning amount")).valid, true);
assert.equal(validateVisionObservation(parseParserLinesV2("DISH: rice bowl\nCOMPONENTS: meat\nMEAL_TYPES: other\nUNCERTAIN: animal protein species\nNOT_OBSERVABLE: ingredient amount")).valid, false);
assert.equal(parseParserLinesV2("DISH: only one line"), null);
assert.equal(validateVisionObservation({ ...validProposal, meal_type_candidates: [{ meal_type: "min_prepared", confidence: "unknown" }] }).valid, false);
assert.equal(validateVisionObservation({ ...validProposal, visible_components: [{ label: "sodium 200 mg", confidence: "unknown" }] }).valid, false);
assert.equal(validateVisionObservation({ ...validProposal, dish_candidates: [{ label: "named_dish_id=fried_rice_pork_vegetable_egg", confidence: "unknown" }] }).valid, false);

const remoteProvider = createLocalOllamaVisionProvider({ endpoint: "https://example.com" });
assert.equal((await remoteProvider.isAvailable()).status, "unavailable");
assert.equal((await remoteProvider.observeMeal(null)).status, "unavailable");

const missingModelProvider = createLocalOllamaVisionProvider({
  fetchImpl: async () => ({ ok: true, json: async () => ({ models: [{ name: "other:latest" }] }) })
});
assert.equal((await missingModelProvider.isAvailable()).status, "model_missing");

const unavailableProvider = createLocalOllamaVisionProvider({ fetchImpl: async () => { throw new Error("offline"); } });
assert.equal((await unavailableProvider.isAvailable()).status, "provider_unreachable");

const timeoutProvider = createLocalOllamaVisionProvider({
  fetchImpl: async () => { const error = new Error("timed out"); error.name = "AbortError"; throw error; }
});
assert.equal((await timeoutProvider.isAvailable()).status, "timeout");

const invalidOutputProvider = createLocalOllamaVisionProvider({
  fetchImpl: async () => ({ ok: true, json: async () => ({ response: "not parser lines" }) })
});
assert.equal((await invalidOutputProvider.observeMeal(new Blob(["image bytes"]))).status, "invalid_output");

const validOutputProvider = createLocalOllamaVisionProvider({
  fetchImpl: async () => ({ ok: true, json: async () => ({
    response: validLines,
    total_duration: 10,
    load_duration: 2
  }) })
});
const transientResult = await validOutputProvider.observeMeal(new Blob(["image bytes"]));
assert.equal(transientResult.status, "success");
assert.equal(transientResult.observation.schema_version, "mhb.vision-meal-observation/v1");
assert.equal(transientResult.observation.provider.strategy_id, "parser-lines-v3");
assert.equal(JSON.stringify(transientResult).includes("images"), false);
assert.equal(JSON.stringify(transientResult).includes("aW1hZ2UgYnl0ZXM="), false);
assert.equal(PARSER_LINES_V3_PROMPT.includes("animal protein species"), true);
assert.equal(PARSER_LINES_V3_PROMPT.includes("Do not output canonical MHB IDs"), true);

const providerSource = fs.readFileSync(new URL("../js/localVisionProvider.mjs", import.meta.url), "utf8");
assert.equal(/heic|heif|image\/jpeg/i.test(providerSource), false, "the provider remains format-neutral");

console.log("Local vision provider tests passed.");
