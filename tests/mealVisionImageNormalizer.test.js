const assert = require("node:assert/strict");
const normalizer = require("../js/mealVisionImageNormalizer.js");

function namedBlob(name, type) {
  const blob = new Blob(["local image bytes"], { type });
  Object.defineProperty(blob, "name", { value: name });
  return blob;
}

async function run() {
  const jpeg = namedBlob("meal.jpg", "image/jpeg");
  const png = namedBlob("meal.png", "image/png");
  const webp = namedBlob("meal.webp", "image/webp");
  for (const image of [jpeg, png, webp]) {
    const result = await normalizer.normalizeVisionImage(image);
    assert.equal(result.status, "ready");
    assert.equal(result.image, image, "supported formats pass through without copying");
    assert.equal(result.converted, false);
  }

  const heic = namedBlob("meal.HEIC", "image/heic");
  assert.equal(normalizer.getVisionImageCapability(heic).status, "requires_local_conversion");
  const mimeLessHeif = namedBlob("meal.heif", "");
  assert.equal(normalizer.detectVisionImageFormat(mimeLessHeif), "image/heif");
  assert.equal(normalizer.detectVisionImageFormat(namedBlob("meal.heic", "")), "image/heic");
  assert.equal(normalizer.detectVisionImageFormat(namedBlob("meal.bin", "image/heic")), "image/heic");
  assert.equal(normalizer.detectVisionImageFormat(namedBlob("meal.bin", "image/heif")), "image/heif");
  assert.equal(normalizer.detectVisionImageFormat(namedBlob("meal.bin", "image/heic-sequence")), "image/heic");
  assert.equal(normalizer.detectVisionImageFormat(namedBlob("meal.bin", "image/heif-sequence")), "image/heif");

  const convertedJpeg = namedBlob("meal.jpg", "image/jpeg");
  let converterInput = null;
  const converted = await normalizer.normalizeVisionImage(heic, {
    heicConverter: async (input, options) => {
      converterInput = input;
      assert.equal(options.maxDimension, 1600);
      assert.equal(options.quality, 0.9);
      return { blob: convertedJpeg, diagnostics: { normalized_width: 1200, normalized_height: 1600, conversion_latency_ms: 25 } };
    }
  });
  assert.equal(converted.status, "ready");
  assert.equal(converted.image, convertedJpeg);
  assert.equal(converted.converted, true);
  assert.equal(converted.sourceFormat, "image/heic");
  assert.equal(converted.normalizedFormat, "image/jpeg");
  assert.equal(converted.diagnostics.normalized_width, 1200);
  assert.equal(converterInput, heic, "the original File is passed through untouched");
  assert.equal(heic.type, "image/heic");

  const failedConversion = await normalizer.normalizeVisionImage(heic, { heicConverter: async () => { throw new Error("local converter unavailable"); } });
  assert.equal(failedConversion.status, "conversion_failed");
  assert.equal(failedConversion.image, null);
  assert.equal((await normalizer.normalizeVisionImage(namedBlob("meal.gif", "image/gif"))).status, "unsupported_format");
  assert.equal((await normalizer.normalizeVisionImage(null)).status, "image_error");
  assert.equal(normalizer.DEFAULT_MAX_DIMENSION, 1600);
  assert.equal(normalizer.DEFAULT_JPEG_QUALITY, 0.9);

  const source = require("node:fs").readFileSync(require("node:path").join(__dirname, "../js/mealVisionImageNormalizer.js"), "utf8");
  assert.ok(!/localStorage|indexedDB|Daily_Log|workbook/i.test(source), "the normalizer has no persistence path");

  console.log("Meal Vision image normalizer tests passed.");
}

run();
