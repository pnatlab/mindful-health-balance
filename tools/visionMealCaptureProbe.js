#!/usr/bin/env node
(function () {
  "use strict";

  const fs = require("fs");
  const path = require("path");

  const ALLOWED_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
  const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);
  const MEAL_TYPES = new Set([
    "stir_fried", "boiled", "curry", "fried", "grilled", "steamed",
    "broth_based", "minimally_prepared", "other", "unspecified"
  ]);
  const REQUIRED_KEYS = ["dish_candidates", "visible_components", "meal_type_candidates", "uncertain_observations", "not_observable"];
  const FORBIDDEN_OUTPUT = /\b(sodium|calories?|macros?|medical|health\s*score|gram\s*(weight|amount)|hidden\s*(ingredient|seasoning|sauce)|condiment\s*quantity)\b/i;

  function parseArgs(argv) {
    const result = { endpoint: "http://127.0.0.1:11434", model: "gemma3:12b", repeat: 1, temperature: 0, strategies: ["prompt-json", "parser-lines"] };
    for (let index = 0; index < argv.length; index += 1) {
      const token = argv[index];
      if (token === "--execute") result.execute = true;
      else if (token === "--corpus") result.corpus = argv[++index];
      else if (token === "--endpoint") result.endpoint = argv[++index];
      else if (token === "--model") result.model = argv[++index];
      else if (token === "--repeat") result.repeat = Number(argv[++index]);
      else if (token === "--temperature") result.temperature = Number(argv[++index]);
      else if (token === "--strategy") result.strategies = String(argv[++index]).split(",").map((value) => value.trim()).filter(Boolean);
      else if (token === "--output") result.output = argv[++index];
      else if (token === "--help" || token === "-h") result.help = true;
      else throw new Error(`Unknown argument: ${token}`);
    }
    return result;
  }

  function printHelp() {
    console.log("Usage: node tools/visionMealCaptureProbe.js [--corpus <directory>] [--execute] [--model <tag>] [--endpoint <local-url>] [--strategy prompt-json,parser-lines] [--repeat 1] [--temperature 0] [--output <file>]");
    console.log("Without --execute, the script only inventories an approved local corpus. --execute sends image bytes only to a localhost Ollama endpoint.");
  }

  function assertLocalEndpoint(endpoint) {
    const parsed = new URL(endpoint);
    if (parsed.protocol !== "http:" || !LOCAL_HOSTS.has(parsed.hostname)) {
      throw new Error("The probe accepts only an http localhost Ollama endpoint. It never uploads images to a remote service.");
    }
    return parsed.toString().replace(/\/$/, "");
  }

  function listImages(corpusPath) {
    if (!corpusPath) return [];
    if (!fs.existsSync(corpusPath)) throw new Error(`Corpus directory does not exist: ${corpusPath}`);
    return fs.readdirSync(corpusPath, { withFileTypes: true })
      .filter((entry) => (entry.isFile() || entry.isSymbolicLink()) && ALLOWED_IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
      .map((entry) => path.join(corpusPath, entry.name))
      .sort();
  }

  function buildPrompt(strategy) {
    const boundary = "Observe only what is visibly supported by the image. Never estimate sodium, calories, macros, grams, health effects, hidden ingredients, hidden sauces, seasoning amounts, or a recipe. If uncertain, say so. Do not output canonical MHB IDs.";
    if (strategy === "parser-lines-v2") {
      return `Observe only visibly supported food facts. Components must be edible food or drink only; never list plates, bowls, utensils, furniture, or other scene objects. Do not name unavailable nutrition fields, health effects, quantities, recipe ingredients, hidden sauces, or hidden seasoning anywhere in the response. Do not output canonical MHB IDs. If uncertain, say so briefly.\nReturn exactly five lines:\nDISH: comma-separated broad visible dish labels or unknown\nCOMPONENTS: comma-separated edible visible components or unknown\nMEAL_TYPES: comma-separated values from ${[...MEAL_TYPES].join(", ")}\nUNCERTAIN: comma-separated visually uncertain observations\nNOT_OBSERVABLE: comma-separated image limits such as sauce identity, seasoning amount, or cooking method`;
    }
    if (strategy === "parser-lines") {
      return `${boundary}\nReturn exactly five lines:\nDISH: comma-separated visible dish labels or unknown\nCOMPONENTS: comma-separated visible components or unknown\nMEAL_TYPES: comma-separated values from ${[...MEAL_TYPES].join(", ")}\nUNCERTAIN: comma-separated uncertainties\nNOT_OBSERVABLE: comma-separated items not safely observable`;
    }
    return `${boundary}\nReturn valid JSON only with exactly these keys: dish_candidates, visible_components, meal_type_candidates, uncertain_observations, not_observable. dish_candidates and visible_components are arrays of {label, confidence}, where confidence is high, medium, low, or unknown. meal_type_candidates is an array using only: ${[...MEAL_TYPES].join(", ")}. uncertain_observations and not_observable are string arrays.`;
  }

  function parseJsonObservation(text) {
    const value = JSON.parse(text);
    for (const key of REQUIRED_KEYS) {
      if (!Array.isArray(value[key])) throw new Error(`Missing array field: ${key}`);
    }
    return value;
  }

  function parseLineObservation(text) {
    const fields = Object.fromEntries(text.split(/\r?\n/).map((line) => {
      const separator = line.indexOf(":");
      return separator > -1 ? [line.slice(0, separator).trim().toUpperCase(), line.slice(separator + 1).trim()] : ["", ""];
    }));
    const list = (value) => String(value || "").split(",").map((entry) => entry.trim()).filter((entry) => entry && entry.toLowerCase() !== "unknown");
    return {
      dish_candidates: list(fields.DISH).map((label) => ({ label, confidence: "unknown" })),
      visible_components: list(fields.COMPONENTS).map((label) => ({ label, confidence: "unknown" })),
      meal_type_candidates: list(fields.MEAL_TYPES).filter((type) => MEAL_TYPES.has(type)),
      uncertain_observations: list(fields.UNCERTAIN),
      not_observable: list(fields.NOT_OBSERVABLE)
    };
  }

  function validateObservation(observation) {
    const serialized = JSON.stringify(observation);
    const invalidMealTypes = observation.meal_type_candidates.filter((type) => !MEAL_TYPES.has(type));
    return {
      forbidden_output: FORBIDDEN_OUTPUT.test(serialized),
      invalid_meal_types: invalidMealTypes,
      valid: !FORBIDDEN_OUTPUT.test(serialized) && invalidMealTypes.length === 0
    };
  }

  async function runObservation(endpoint, model, imagePath, strategy, temperature) {
    const startedAt = Date.now();
    const image = fs.readFileSync(imagePath).toString("base64");
    const payload = {
      model,
      prompt: buildPrompt(strategy),
      images: [image],
      stream: false,
      options: { temperature }
    };
    if (strategy === "prompt-json") payload.format = "json";
    const response = await fetch(`${endpoint}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(120000)
    });
    const body = await response.json();
    if (!response.ok || body.error) throw new Error(body.error || `Ollama returned HTTP ${response.status}`);
    const observation = strategy === "prompt-json" ? parseJsonObservation(body.response) : parseLineObservation(body.response);
    return {
      file: path.basename(imagePath),
      strategy,
      latency_ms: Date.now() - startedAt,
      ollama_timing_ns: {
        total_duration: body.total_duration || null,
        load_duration: body.load_duration || null,
        prompt_eval_duration: body.prompt_eval_duration || null,
        eval_duration: body.eval_duration || null
      },
      observation,
      validation: validateObservation(observation)
    };
  }

  async function main() {
    const options = parseArgs(process.argv.slice(2));
    if (options.help) return printHelp();
    const endpoint = assertLocalEndpoint(options.endpoint);
    const images = listImages(options.corpus);
    const inventory = { corpus_path: options.corpus || null, image_count: images.length, files: images.map((file) => path.basename(file)) };

    if (!options.execute) {
      console.log(JSON.stringify({ status: "dry_run", endpoint, model: options.model, temperature: options.temperature, inventory, note: "No image bytes were sent. Pass --execute only with an approved local corpus." }, null, 2));
      return;
    }
    if (!images.length) throw new Error("No supported images found. Do not run a live probe until an approved local meal-photo corpus is available.");
    if (!Number.isInteger(options.repeat) || options.repeat < 1 || options.repeat > 3) throw new Error("--repeat must be an integer from 1 to 3 for this pilot.");
    if (!Number.isFinite(options.temperature) || options.temperature < 0 || options.temperature > 1) throw new Error("--temperature must be a number from 0 to 1.");

    const results = [];
    for (const imagePath of images) {
      for (const strategy of options.strategies) {
        for (let repeatIndex = 1; repeatIndex <= options.repeat; repeatIndex += 1) {
          try {
            results.push({ repeat: repeatIndex, ...(await runObservation(endpoint, options.model, imagePath, strategy, options.temperature)) });
          } catch (error) {
            results.push({ file: path.basename(imagePath), strategy, repeat: repeatIndex, error: error.message });
          }
        }
      }
    }
    const report = { status: "completed", endpoint, model: options.model, temperature: options.temperature, inventory, results, privacy: "Raw image bytes and raw model text are not written to this report." };
    if (options.output) fs.writeFileSync(options.output, `${JSON.stringify(report, null, 2)}\n`, "utf8");
    console.log(JSON.stringify(report, null, 2));
  }

  main().catch((error) => {
    console.error(`Vision meal capture probe failed: ${error.message}`);
    process.exitCode = 1;
  });
}());
