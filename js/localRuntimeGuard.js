(function initializeLocalRuntimeGuard(globalScope) {
  function detectLocalRuntime(locationRef = globalScope.location) {
    const protocol = String(locationRef?.protocol || "").toLowerCase();
    const isFileMode = protocol === "file:";
    return Object.freeze({
      protocol,
      isFileMode,
      supportsVisionAndImagePrep: !isFileMode
    });
  }

  const api = Object.freeze({ detectLocalRuntime });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  globalScope.MHBLocalRuntimeGuard = api;
})(typeof window !== "undefined" ? window : globalThis);
