(function initializeMealVisionImageNormalizer(globalScope) {
  const PASSTHROUGH_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);
  const HEIC_TYPES = new Set(["image/heic", "image/heif", "image/heic-sequence", "image/heif-sequence"]);

  function extensionOf(image) {
    const match = String(image?.name || "").toLowerCase().match(/\.([a-z0-9]+)$/);
    return match ? match[1] : "";
  }

  function detectVisionImageFormat(image) {
    const type = String(image?.type || "").toLowerCase();
    const extension = extensionOf(image);
    if (PASSTHROUGH_TYPES.has(type)) return type;
    if (type === "image/jpg") return "image/jpeg";
    if (HEIC_TYPES.has(type) || extension === "heic") return "image/heic";
    if (extension === "heif") return "image/heif";
    if (!type && extension === "png") return "image/png";
    if (!type && ["jpg", "jpeg"].includes(extension)) return "image/jpeg";
    if (!type && extension === "webp") return "image/webp";
    return type || "unknown";
  }

  function getVisionImageCapability(image) {
    const format = detectVisionImageFormat(image);
    if (PASSTHROUGH_TYPES.has(format)) return Object.freeze({ status: "passthrough", format });
    if (format === "image/heic" || format === "image/heif") {
      return Object.freeze({ status: "requires_local_conversion", format });
    }
    return Object.freeze({ status: "unsupported_format", format });
  }

  async function normalizeVisionImage(image, options = {}) {
    if (!image || typeof image.arrayBuffer !== "function") {
      return Object.freeze({ status: "image_error", image: null, sourceFormat: "unknown", normalizedFormat: "" });
    }

    const capability = getVisionImageCapability(image);
    if (capability.status === "passthrough") {
      return Object.freeze({
        status: "ready",
        image,
        sourceFormat: capability.format,
        normalizedFormat: capability.format,
        converted: false
      });
    }

    if (capability.status === "requires_local_conversion" && typeof options.heicConverter === "function") {
      try {
        const converted = await options.heicConverter(image);
        const convertedCapability = getVisionImageCapability(converted);
        if (convertedCapability.status !== "passthrough") {
          return Object.freeze({ status: "unsupported_format", image: null, sourceFormat: capability.format, normalizedFormat: "" });
        }
        return Object.freeze({
          status: "ready",
          image: converted,
          sourceFormat: capability.format,
          normalizedFormat: convertedCapability.format,
          converted: true
        });
      } catch {
        return Object.freeze({ status: "conversion_failed", image: null, sourceFormat: capability.format, normalizedFormat: "" });
      }
    }

    return Object.freeze({ status: "unsupported_format", image: null, sourceFormat: capability.format, normalizedFormat: "" });
  }

  const api = Object.freeze({ detectVisionImageFormat, getVisionImageCapability, normalizeVisionImage });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  globalScope.MHBMealVisionImageNormalizer = api;
})(typeof window !== "undefined" ? window : globalThis);
