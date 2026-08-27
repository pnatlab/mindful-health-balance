(function initializeImagePrepBridge(globalScope) {
  const READY_MESSAGE_TYPE = "mhb.image-prep.ready/v1";
  const CANCELLED_MESSAGE_TYPE = "mhb.image-prep.cancelled/v1";
  const IMAGE_PREP_PAGE = "image-prep.html";
  const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
  const FORBIDDEN_ENVELOPE_KEYS = new Set(["dish_label", "meal_type", "food_id", "named_dish_id", "sodium", "calories", "macros", "notes"]);

  function createToken() {
    if (globalScope.crypto?.randomUUID) return globalScope.crypto.randomUUID();
    return `mhb-image-prep-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function asText(value) {
    return value === undefined || value === null ? "" : String(value).trim();
  }

  function isImageBlob(value) {
    return typeof globalScope.Blob === "function" && value instanceof globalScope.Blob && ALLOWED_IMAGE_TYPES.has(value.type);
  }

  function createPreparedImageEnvelope(normalized, options = {}) {
    if (!normalized?.image || !isImageBlob(normalized.image)) return null;
    const diagnostics = normalized.diagnostics || {};
    return Object.freeze({
      id: asText(options.id) || createToken(),
      source_format: asText(normalized.sourceFormat),
      normalized_format: asText(normalized.normalizedFormat),
      normalized_width: Number.isInteger(diagnostics.normalized_width) ? diagnostics.normalized_width : null,
      normalized_height: Number.isInteger(diagnostics.normalized_height) ? diagnostics.normalized_height : null,
      prepared_at: asText(options.preparedAt) || new Date().toISOString(),
      image_blob: normalized.image
    });
  }

  function validatePreparedImageEnvelope(envelope) {
    if (!envelope || typeof envelope !== "object") return false;
    if (Object.keys(envelope).some((key) => FORBIDDEN_ENVELOPE_KEYS.has(key))) return false;
    if (!asText(envelope.id) || !asText(envelope.source_format)) return false;
    if (envelope.normalized_format !== "image/jpeg" || !isImageBlob(envelope.image_blob)) return false;
    if (envelope.image_blob.type !== "image/jpeg") return false;
    if (!Number.isInteger(envelope.normalized_width) || envelope.normalized_width < 1 || envelope.normalized_width > 1600) return false;
    if (!Number.isInteger(envelope.normalized_height) || envelope.normalized_height < 1 || envelope.normalized_height > 1600) return false;
    return Boolean(asText(envelope.prepared_at));
  }

  function buildImagePrepUrl(options = {}) {
    const base = options.baseUrl || globalScope.location?.href || IMAGE_PREP_PAGE;
    const url = new URL(IMAGE_PREP_PAGE, base);
    url.searchParams.set("token", asText(options.token));
    url.searchParams.set("language", asText(options.language) || "th");
    url.searchParams.set("theme", asText(options.theme) || "auto");
    return url.href;
  }

  function createImagePrepBridge(options = {}) {
    const windowRef = options.windowRef || globalScope;
    const origin = options.origin || windowRef.location?.origin;
    const onPrepared = typeof options.onPrepared === "function" ? options.onPrepared : () => {};
    const onCancelled = typeof options.onCancelled === "function" ? options.onCancelled : () => {};
    let activeToken = "";
    let prepWindow = null;

    function onMessage(event) {
      if (!activeToken || event.origin !== origin || event.source !== prepWindow) return;
      const message = event.data;
      if (!message || message.token !== activeToken) return;
      if (message.type === READY_MESSAGE_TYPE && validatePreparedImageEnvelope(message.envelope)) {
        activeToken = "";
        prepWindow = null;
        onPrepared(message.envelope);
      }
      if (message.type === CANCELLED_MESSAGE_TYPE) {
        activeToken = "";
        prepWindow = null;
        onCancelled();
      }
    }

    windowRef.addEventListener?.("message", onMessage);

    return Object.freeze({
      open(optionsForOpen = {}) {
        if (prepWindow && !prepWindow.closed) return true;
        activeToken = createToken();
        const url = buildImagePrepUrl({
          baseUrl: optionsForOpen.baseUrl || windowRef.location?.href,
          token: activeToken,
          language: optionsForOpen.language,
          theme: optionsForOpen.theme
        });
        prepWindow = windowRef.open?.(url, "mhb-image-prep", "popup,width=760,height=820,resizable=yes,scrollbars=yes") || null;
        if (!prepWindow) activeToken = "";
        return Boolean(prepWindow);
      },
      destroy() {
        activeToken = "";
        prepWindow = null;
        windowRef.removeEventListener?.("message", onMessage);
      }
    });
  }

  const api = Object.freeze({
    READY_MESSAGE_TYPE,
    CANCELLED_MESSAGE_TYPE,
    buildImagePrepUrl,
    createImagePrepBridge,
    createPreparedImageEnvelope,
    validatePreparedImageEnvelope
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  globalScope.MHBImagePrepBridge = api;
})(typeof window !== "undefined" ? window : globalThis);
