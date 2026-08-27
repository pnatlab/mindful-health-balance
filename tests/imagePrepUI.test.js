const assert = require("node:assert/strict");
const imagePrepUI = require("../js/imagePrep/imagePrepUI.js");

assert.equal(imagePrepUI.normalizeLanguage("en"), "en");
assert.equal(imagePrepUI.normalizeLanguage("unexpected"), "th");
assert.equal(imagePrepUI.getQueryOptions({ search: "?token=abc&language=zh&theme=dark" }).language, "zh");
assert.equal(imagePrepUI.formatDimensions(1200, 1600), "1200 x 1600");
assert.match(imagePrepUI.formatBytes(1024 * 1024), /1\.00 MB/);

for (const language of imagePrepUI.SUPPORTED_LANGUAGES) {
  const copy = imagePrepUI.TEXT[language];
  for (const key of ["title", "select", "preparing", "ready", "use", "replace", "cancel", "failure", "privacy", "runtimeRequired", "runtimeHelper"]) {
    assert.equal(typeof copy[key], "string", `${language} has ${key} copy`);
  }
}

const source = require("node:fs").readFileSync(require("node:path").join(__dirname, "../js/imagePrep/imagePrepUI.js"), "utf8");
assert.doesNotMatch(source, /localVisionProvider|observeMeal|named_dish_id|sodium|localStorage|indexedDB/i);
console.log("Image preparation UI tests passed.");
