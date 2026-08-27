const assert = require("node:assert/strict");
const normalizer = require("../js/mealVisionImageNormalizer.js");

function namedBlob(name, type) {
  const blob = new Blob(["local image bytes"], { type });
  Object.defineProperty(blob, "name", { value: name });
  return blob;
}

async function run() {
  const png = namedBlob("meal.png", "image/png");
  const pngResult = await normalizer.normalizeVisionImage(png);
  assert.equal(pngResult.status, "ready");
  assert.equal(pngResult.image, png, "supported formats pass through without copying");
  assert.equal(pngResult.converted, false);

  const heic = namedBlob("meal.HEIC", "image/heic");
  assert.equal(normalizer.getVisionImageCapability(heic).status, "requires_local_conversion");
  assert.equal((await normalizer.normalizeVisionImage(heic)).status, "unsupported_format");

  const mimeLessHeif = namedBlob("meal.heif", "");
  assert.equal(normalizer.detectVisionImageFormat(mimeLessHeif), "image/heif");

  const convertedJpeg = namedBlob("meal.jpg", "image/jpeg");
  const converted = await normalizer.normalizeVisionImage(heic, { heicConverter: async () => convertedJpeg });
  assert.equal(converted.status, "ready");
  assert.equal(converted.image, convertedJpeg);
  assert.equal(converted.converted, true);

  const failedConversion = await normalizer.normalizeVisionImage(heic, { heicConverter: async () => { throw new Error("local converter unavailable"); } });
  assert.equal(failedConversion.status, "conversion_failed");
  assert.equal((await normalizer.normalizeVisionImage(null)).status, "image_error");

  console.log("Meal Vision image normalizer tests passed.");
}

run();
