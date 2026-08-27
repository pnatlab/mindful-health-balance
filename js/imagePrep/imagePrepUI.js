(function initializeImagePrepUI(globalScope) {
  const SUPPORTED_LANGUAGES = Object.freeze(["th", "en", "zh"]);
  const TEXT = Object.freeze({
    th: Object.freeze({
      title: "เตรียมรูปสำหรับ AI",
      intro: "ค่อย ๆ เตรียมรูปในเครื่องนี้ก่อนส่งให้ตัวช่วยจากรูปดู",
      select: "เลือกรูป",
      preparing: "กำลังเตรียมรูปในเครื่องนี้…",
      ready: "รูปพร้อมใช้แล้ว",
      source: "ต้นฉบับ",
      normalized: "รูปที่เตรียมแล้ว",
      use: "ใช้รูปนี้กับมื้อนี้",
      useHelper: "เมื่อกลับไป MHB จะใช้รูปนี้กับตัวช่วยจากรูปก่อนให้ตรวจรายการ",
      replace: "เลือกรูปใหม่",
      cancel: "ยกเลิกและกลับ",
      failure: "ยังเตรียมภาพนี้ไม่ได้ค่ะ ลองเลือกรูปอื่นได้",
      standalone: "หน้านี้ต้องเปิดจาก Meal Composer เพื่อส่งรูปกลับไปยังมื้อที่กำลังประกอบ",
      previewAlt: "รูปอาหารที่เตรียมไว้ชั่วคราวสำหรับตัวช่วยจากรูป",
      privacy: "รูปนี้เตรียมในเครื่องและจะไม่ถูกเก็บไว้กับมื้อ",
      local: "LOCAL IMAGE PREPARATION"
    }),
    en: Object.freeze({
      title: "Prepare a photo for AI",
      intro: "Prepare the photo on this device before the photo helper looks at it.",
      select: "Choose an image",
      preparing: "Preparing the photo on this device…",
      ready: "This photo is ready",
      source: "Original",
      normalized: "Prepared image",
      use: "Use this image with this meal",
      useHelper: "Back in MHB, the photo helper will look at this image before you review its observations.",
      replace: "Choose another image",
      cancel: "Cancel and return",
      failure: "This photo could not be prepared. Choose another image to continue.",
      standalone: "Open this page from Meal Composer to return a prepared image to the meal draft.",
      previewAlt: "Meal photo prepared temporarily for the photo helper",
      privacy: "This image is prepared on this device and is not stored with the meal.",
      local: "LOCAL IMAGE PREPARATION"
    }),
    zh: Object.freeze({
      title: "为 AI 准备照片",
      intro: "先在这台设备上准备照片，再交给照片助手查看。",
      select: "选择图片",
      preparing: "正在这台设备上准备照片…",
      ready: "照片已准备好",
      source: "原始图片",
      normalized: "已准备的图片",
      use: "将这张图片用于这一餐",
      useHelper: "回到 MHB 后，照片助手会先查看这张图片，再由你核对观察结果。",
      replace: "选择另一张图片",
      cancel: "取消并返回",
      failure: "暂时无法准备这张图片。请选择另一张图片继续。",
      standalone: "请从 Meal Composer 打开此页面，才能把准备好的图片交回餐食草稿。",
      previewAlt: "为照片助手临时准备的餐食照片",
      privacy: "图片仅在这台设备上准备，不会随餐食保存。",
      local: "LOCAL IMAGE PREPARATION"
    })
  });

  function normalizeLanguage(value) {
    return SUPPORTED_LANGUAGES.includes(value) ? value : "th";
  }

  function formatDimensions(width, height) {
    return Number.isInteger(width) && Number.isInteger(height) ? `${width} x ${height}` : "-";
  }

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes < 0) return "-";
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  function getQueryOptions(locationRef) {
    const query = new URLSearchParams(locationRef?.search || "");
    return Object.freeze({
      token: String(query.get("token") || ""),
      language: normalizeLanguage(query.get("language")),
      theme: ["light", "dark"].includes(query.get("theme")) ? query.get("theme") : "auto"
    });
  }

  function createImagePrepUI(options = {}) {
    const root = options.root;
    const normalizer = options.normalizer || globalScope.MHBMealVisionImageNormalizer;
    const bridge = options.bridge || globalScope.MHBImagePrepBridge;
    const windowRef = options.windowRef || globalScope;
    const locationRef = options.locationRef || windowRef.location;
    if (!root || !normalizer || !bridge) return null;

    const query = getQueryOptions(locationRef);
    const copy = TEXT[query.language];
    const requestFrame = options.requestFrame || ((callback) => windowRef.requestAnimationFrame?.(callback) || windowRef.setTimeout(callback, 0));
    let requestId = 0;
    let previewUrl = "";
    let prepared = null;
    let phase = "idle";

    function revokePreview() {
      if (previewUrl && windowRef.URL?.revokeObjectURL) windowRef.URL.revokeObjectURL(previewUrl);
      previewUrl = "";
    }

    function render() {
      const diagnostics = prepared?.diagnostics || {};
      const ready = phase === "ready" && prepared?.image;
      const failure = phase === "failure";
      root.innerHTML = `
        <main class="image-prep-shell" data-image-prep-phase="${phase}">
          <section class="image-prep-card" aria-labelledby="imagePrepTitle" aria-busy="${phase === "preparing"}">
            <p class="section-kicker">${copy.local}</p>
            <h1 id="imagePrepTitle">${copy.title}</h1>
            <p class="image-prep-intro">${copy.intro}</p>
            <p class="image-prep-privacy">${copy.privacy}</p>
            ${ready ? `
              <img class="image-prep-preview" src="${previewUrl}" alt="${copy.previewAlt}">
              <div class="image-prep-summary" aria-label="${copy.ready}">
                <div><span>${copy.source}</span><strong>${prepared.sourceFormat || "-"} · ${formatDimensions(diagnostics.source_width, diagnostics.source_height)} · ${formatBytes(diagnostics.source_size_bytes)}</strong></div>
                <div><span>${copy.normalized}</span><strong>${prepared.normalizedFormat || "image/jpeg"} · ${formatDimensions(diagnostics.normalized_width, diagnostics.normalized_height)} · ${formatBytes(diagnostics.normalized_size_bytes)}</strong></div>
              </div>
              <p class="image-prep-use-helper">${copy.useHelper}</p>
            ` : ""}
            <p class="image-prep-status" role="status" aria-live="polite">${phase === "preparing" ? copy.preparing : failure ? copy.failure : !query.token ? copy.standalone : ""}</p>
            <div class="image-prep-actions">
              ${ready ? `<button type="button" class="primary-button" data-image-prep-use>${copy.use}</button>` : ""}
              <label class="ghost-button image-prep-file-action"><span>${ready ? copy.replace : copy.select}</span><input type="file" data-image-prep-file accept="image/png,image/jpeg,image/webp,image/heic,image/heif,.heic,.heif"></label>
              <button type="button" class="meal-text-button" data-image-prep-cancel>${copy.cancel}</button>
            </div>
          </section>
        </main>
      `;
    }

    function send(message) {
      if (!query.token || !windowRef.opener || windowRef.opener.closed) return false;
      windowRef.opener.postMessage({ ...message, token: query.token }, locationRef.origin);
      return true;
    }

    function cancel() {
      requestId += 1;
      revokePreview();
      prepared = null;
      send({ type: bridge.CANCELLED_MESSAGE_TYPE });
      windowRef.close?.();
      render();
    }

    async function prepareImage(file) {
      requestId += 1;
      const activeRequestId = requestId;
      revokePreview();
      prepared = null;
      phase = "preparing";
      render();
      await new Promise((resolve) => requestFrame(resolve));
      if (activeRequestId !== requestId) return;
      let normalized;
      try {
        normalized = await normalizer.normalizeVisionImage(file, { forceJpeg: true });
      } catch (error) {
        if (activeRequestId !== requestId) return;
        phase = "failure";
        render();
        return;
      }
      if (activeRequestId !== requestId) return;
      if (normalized.status !== "ready" || !normalized.image || normalized.normalizedFormat !== "image/jpeg") {
        phase = "failure";
        render();
        return;
      }
      prepared = normalized;
      previewUrl = windowRef.URL?.createObjectURL ? windowRef.URL.createObjectURL(normalized.image) : "";
      phase = "ready";
      render();
    }

    root.addEventListener("change", (event) => {
      if (!event.target.matches("[data-image-prep-file]")) return;
      const file = event.target.files?.[0];
      if (file) prepareImage(file);
    });

    root.addEventListener("click", (event) => {
      const action = event.target.closest("button");
      if (!action) return;
      if (action.hasAttribute("data-image-prep-cancel")) {
        cancel();
        return;
      }
      if (action.hasAttribute("data-image-prep-use") && prepared) {
        const envelope = bridge.createPreparedImageEnvelope(prepared);
        if (!envelope || !send({ type: bridge.READY_MESSAGE_TYPE, envelope })) {
          phase = "failure";
          render();
          return;
        }
        revokePreview();
        prepared = null;
        windowRef.close?.();
      }
    });

    if (query.theme !== "auto") windowRef.document?.body && (windowRef.document.body.dataset.theme = query.theme);
    render();
    return Object.freeze({
      prepareImage,
      cancel,
      destroy() {
        requestId += 1;
        revokePreview();
      }
    });
  }

  const api = Object.freeze({ TEXT, SUPPORTED_LANGUAGES, createImagePrepUI, formatBytes, formatDimensions, getQueryOptions, normalizeLanguage });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  globalScope.MHBImagePrepUI = api;
})(typeof window !== "undefined" ? window : globalThis);
