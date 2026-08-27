const assert = require("node:assert/strict");
const bridge = require("../js/imagePrep/imagePrepBridge.js");

function jpegBlob() {
  return new Blob(["prepared local image"], { type: "image/jpeg" });
}

function run() {
  const normalized = {
    image: jpegBlob(),
    sourceFormat: "image/heic",
    normalizedFormat: "image/jpeg",
    diagnostics: { normalized_width: 1200, normalized_height: 1600 }
  };
  const envelope = bridge.createPreparedImageEnvelope(normalized, {
    id: "prepared-1",
    preparedAt: "2026-08-28T00:00:00.000Z"
  });
  assert.equal(bridge.validatePreparedImageEnvelope(envelope), true);
  assert.equal(envelope.source_format, "image/heic");
  assert.equal(envelope.normalized_format, "image/jpeg");
  assert.equal(envelope.normalized_width, 1200);
  assert.equal("named_dish_id" in envelope, false);
  assert.equal("sodium" in envelope, false);
  assert.equal("meal_type" in envelope, false);
  assert.equal(bridge.validatePreparedImageEnvelope({ ...envelope, named_dish_id: "fried_rice_vegetable" }), false);
  assert.equal(bridge.validatePreparedImageEnvelope({ ...envelope, image_blob: new Blob(["x"], { type: "image/png" }) }), false);

  const preparedUrl = new URL(bridge.buildImagePrepUrl({
    baseUrl: "http://127.0.0.1:4173/index.html",
    token: "token-1",
    language: "en",
    theme: "dark"
  }));
  assert.equal(preparedUrl.pathname, "/image-prep.html");
  assert.equal(preparedUrl.searchParams.get("token"), "token-1");
  assert.equal(preparedUrl.searchParams.get("language"), "en");

  const listeners = new Map();
  let opened = null;
  const windowRef = {
    location: { origin: "http://127.0.0.1:4173", href: "http://127.0.0.1:4173/index.html" },
    addEventListener(type, listener) { listeners.set(type, listener); },
    removeEventListener(type) { listeners.delete(type); },
    open(url) { opened = { url }; return opened; }
  };
  let received = null;
  const pageBridge = bridge.createImagePrepBridge({ windowRef, onPrepared: (value) => { received = value; } });
  assert.equal(pageBridge.open({ language: "th" }), true);
  assert.equal(pageBridge.open({ language: "th" }), true, "one active preparation window is reused");
  const token = new URL(opened.url).searchParams.get("token");
  listeners.get("message")({
    origin: "http://127.0.0.1:4173",
    source: opened,
    data: { type: bridge.READY_MESSAGE_TYPE, token, envelope }
  });
  assert.equal(received, envelope);

  received = null;
  pageBridge.open({ language: "th" });
  listeners.get("message")({
    origin: "https://example.com",
    source: opened,
    data: { type: bridge.READY_MESSAGE_TYPE, token: "wrong", envelope }
  });
  assert.equal(received, null, "foreign-origin messages are ignored");
  pageBridge.destroy();

  const source = require("node:fs").readFileSync(require("node:path").join(__dirname, "../js/imagePrep/imagePrepBridge.js"), "utf8");
  assert.doesNotMatch(source, /localStorage|indexedDB|Daily_Log|workbook/i);
  console.log("Image preparation bridge tests passed.");
}

run();
