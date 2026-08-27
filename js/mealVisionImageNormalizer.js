(function initializeMealVisionImageNormalizer(globalScope) {
  const PASSTHROUGH_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);
  const HEIC_TYPES = new Set(["image/heic", "image/heif", "image/heic-sequence", "image/heif-sequence"]);
  const DEFAULT_MAX_DIMENSION = 1600;
  const DEFAULT_JPEG_QUALITY = 0.9;
  const HEIC_DECODE_QUALITY = 0.92;
  const FAILURE_STAGES = new Set(["decoder_failed", "allocation_failed", "bitmap_decode_failed", "canvas_failed", "jpeg_encode_failed", "unknown_image_error"]);
  const converterModuleUrl = typeof document !== "undefined" && document.currentScript?.src
    ? new URL("./vendor/heic-converter/index.mjs", document.currentScript.src).href
    : "";

  function extensionOf(image) {
    const match = String(image?.name || "").toLowerCase().match(/\.([a-z0-9]+)$/);
    return match ? match[1] : "";
  }

  function detectVisionImageFormat(image) {
    const type = String(image?.type || "").toLowerCase();
    const extension = extensionOf(image);
    if (PASSTHROUGH_TYPES.has(type)) return type;
    if (type === "image/jpg") return "image/jpeg";
    if (["image/heif", "image/heif-sequence"].includes(type) || extension === "heif") return "image/heif";
    if (HEIC_TYPES.has(type) || extension === "heic") return "image/heic";
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

  function scaledDimensions(width, height, maxDimension) {
    const largest = Math.max(width, height);
    if (!largest || largest <= maxDimension) return { width, height };
    const scale = maxDimension / largest;
    return { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) };
  }

  function canvasToJpeg(canvas, quality) {
    if (typeof canvas.convertToBlob === "function") return canvas.convertToBlob({ type: "image/jpeg", quality });
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("JPEG encoding failed")), "image/jpeg", quality);
    });
  }

  function stageError(stage, error) {
    const wrapped = new Error(error?.message || stage);
    wrapped.mhbImageStage = stage;
    return wrapped;
  }

  function failureStage(error, fallback = "unknown_image_error") {
    if (FAILURE_STAGES.has(error?.mhbImageStage)) return error.mhbImageStage;
    if (error?.name === "RangeError" || /alloc|memory|heap/i.test(String(error?.message || ""))) return "allocation_failed";
    return fallback;
  }

  async function resizeJpegBlob(blob, options = {}) {
    if (typeof globalScope.createImageBitmap !== "function") return { blob, diagnostics: {} };
    let bitmap;
    try {
      bitmap = await globalScope.createImageBitmap(blob, { imageOrientation: "from-image" });
    } catch (error) {
      throw stageError(failureStage(error, "bitmap_decode_failed"), error);
    }
    try {
      const maxDimension = options.maxDimension || DEFAULT_MAX_DIMENSION;
      const target = scaledDimensions(bitmap.width, bitmap.height, maxDimension);
      if (target.width === bitmap.width && target.height === bitmap.height) {
        return { blob, diagnostics: { source_width: bitmap.width, source_height: bitmap.height, normalized_width: bitmap.width, normalized_height: bitmap.height } };
      }
      let canvas;
      try {
        canvas = typeof globalScope.OffscreenCanvas === "function"
          ? new globalScope.OffscreenCanvas(target.width, target.height)
          : globalScope.document?.createElement("canvas");
        if (!canvas) throw stageError("canvas_failed", new Error("Canvas is unavailable"));
        canvas.width = target.width;
        canvas.height = target.height;
        const context = canvas.getContext("2d", { alpha: false });
        if (!context) throw stageError("canvas_failed", new Error("Canvas context is unavailable"));
        context.drawImage(bitmap, 0, 0, target.width, target.height);
      } catch (error) {
        throw stageError(failureStage(error, "canvas_failed"), error);
      }
      try {
        const resized = await canvasToJpeg(canvas, options.quality || DEFAULT_JPEG_QUALITY);
        return {
          blob: resized,
          diagnostics: { source_width: bitmap.width, source_height: bitmap.height, normalized_width: target.width, normalized_height: target.height }
        };
      } catch (error) {
        throw stageError(failureStage(error, "jpeg_encode_failed"), error);
      }
    } finally {
      bitmap?.close();
    }
  }

  async function convertHeicLocally(image, options = {}) {
    if (!converterModuleUrl) throw new Error("Local HEIC converter is unavailable");
    const startedAt = globalScope.performance?.now?.() || Date.now();
    let converter;
    let decodedJpeg;
    try {
      converter = await import(converterModuleUrl);
      decodedJpeg = await converter.convertHeic(image, { to: "jpeg", quality: HEIC_DECODE_QUALITY });
    } catch (error) {
      throw stageError(failureStage(error, "decoder_failed"), error);
    }
    const resized = await resizeJpegBlob(decodedJpeg, options);
    const endedAt = globalScope.performance?.now?.() || Date.now();
    return {
      blob: resized.blob,
      diagnostics: {
        ...resized.diagnostics,
        source_size_bytes: image.size || null,
        normalized_size_bytes: resized.blob.size || null,
        conversion_latency_ms: Math.round(endedAt - startedAt)
      }
    };
  }

  async function normalizeVisionImage(image, options = {}) {
    if (!image || typeof image.arrayBuffer !== "function") {
      return Object.freeze({ status: "image_error", image: null, sourceFormat: "unknown", normalizedFormat: "", converted: false, diagnostics: Object.freeze({}) });
    }

    const capability = getVisionImageCapability(image);
    if (capability.status === "passthrough") {
      return Object.freeze({
        status: "ready",
        image,
        sourceFormat: capability.format,
        normalizedFormat: capability.format,
        converted: false,
        diagnostics: Object.freeze({ source_size_bytes: image.size || null, normalized_size_bytes: image.size || null })
      });
    }

    if (capability.status === "requires_local_conversion") {
      const heicConverter = options.heicConverter || convertHeicLocally;
      try {
        const output = await heicConverter(image, {
          maxDimension: options.maxDimension || DEFAULT_MAX_DIMENSION,
          quality: options.quality || DEFAULT_JPEG_QUALITY
        });
        const converted = output?.blob || output;
        const convertedCapability = getVisionImageCapability(converted);
        if (convertedCapability.status !== "passthrough") {
          return Object.freeze({ status: "unsupported_format", image: null, sourceFormat: capability.format, normalizedFormat: "", converted: false, diagnostics: Object.freeze({}) });
        }
        return Object.freeze({
          status: "ready",
          image: converted,
          sourceFormat: capability.format,
          normalizedFormat: convertedCapability.format,
          converted: true,
          diagnostics: Object.freeze({
            ...(output?.diagnostics || {}),
            source_size_bytes: output?.diagnostics?.source_size_bytes || image.size || null,
            normalized_size_bytes: output?.diagnostics?.normalized_size_bytes || converted.size || null
          })
        });
      } catch (error) {
        return Object.freeze({
          status: "conversion_failed",
          image: null,
          sourceFormat: capability.format,
          normalizedFormat: "",
          converted: false,
          diagnostics: Object.freeze({ failure_stage: failureStage(error, "decoder_failed"), error_name: String(error?.name || "Error") })
        });
      }
    }

    return Object.freeze({ status: "unsupported_format", image: null, sourceFormat: capability.format, normalizedFormat: "", converted: false, diagnostics: Object.freeze({}) });
  }

  const api = Object.freeze({
    DEFAULT_JPEG_QUALITY,
    DEFAULT_MAX_DIMENSION,
    detectVisionImageFormat,
    getVisionImageCapability,
    normalizeVisionImage
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  globalScope.MHBMealVisionImageNormalizer = api;
})(typeof window !== "undefined" ? window : globalThis);
