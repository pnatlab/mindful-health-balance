(function initializeDrinkReflectionAcknowledgement(globalScope) {
  function normalizeMessage(value) {
    return String(value || "").trim();
  }

  function createState({ isOpen = false, message = "", triggerCount = 0 } = {}) {
    return Object.freeze({
      isOpen: Boolean(isOpen),
      message: normalizeMessage(message),
      triggerCount: Number(triggerCount) || 0
    });
  }

  function openForSuccessfulAdd(state, { succeeded = false, reflectionText = "" } = {}) {
    const message = normalizeMessage(reflectionText);
    if (!succeeded || !message) return state;
    return createState({ isOpen: true, message, triggerCount: state.triggerCount + 1 });
  }

  function dismiss(state) {
    return createState({ isOpen: false, triggerCount: state.triggerCount });
  }

  const api = Object.freeze({ createState, openForSuccessfulAdd, dismiss });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  globalScope.MHBDrinkReflectionAcknowledgement = api;
})(typeof window !== "undefined" ? window : globalThis);
