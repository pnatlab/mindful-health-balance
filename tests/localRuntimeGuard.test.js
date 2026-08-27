const assert = require("node:assert/strict");
const guard = require("../js/localRuntimeGuard.js");
const mealUI = require("../js/mealCompositionUI.js");
const imagePrepUI = require("../js/imagePrep/imagePrepUI.js");

assert.equal(guard.detectLocalRuntime({ protocol: "file:" }).isFileMode, true);
assert.equal(guard.detectLocalRuntime({ protocol: "file:" }).supportsVisionAndImagePrep, false);
assert.equal(guard.detectLocalRuntime({ protocol: "http:" }).isFileMode, false);
assert.equal(guard.detectLocalRuntime({ protocol: "http:" }).supportsVisionAndImagePrep, true);
assert.equal(guard.detectLocalRuntime({ protocol: "https:" }).supportsVisionAndImagePrep, true);

for (const language of mealUI.SUPPORTED_LANGUAGES) {
  assert.equal(typeof mealUI.TEXT[language].visionRuntimeRequired, "string");
  assert.equal(typeof mealUI.TEXT[language].visionRuntimeHelper, "string");
}
for (const language of imagePrepUI.SUPPORTED_LANGUAGES) {
  assert.equal(typeof imagePrepUI.TEXT[language].runtimeRequired, "string");
  assert.equal(typeof imagePrepUI.TEXT[language].runtimeHelper, "string");
}

const composerSource = require("node:fs").readFileSync(require("node:path").join(__dirname, "../js/mealCompositionUI.js"), "utf8");
assert.match(composerSource, /supportsVisionAndImagePrep/);
assert.match(composerSource, /data-image-prep-open/);
assert.match(composerSource, /if \(!runtimeEnvironment\.supportsVisionAndImagePrep\) return;/);
assert.match(composerSource, /if \(!runtimeEnvironment\.supportsVisionAndImagePrep\) \{/);
console.log("Local runtime guard tests passed.");
