(function initializeMealDraftReflectionContext(globalScope) {
  const SNAPSHOT_KIND = "meal_draft_reflection_snapshot";
  const SNAPSHOT_VERSION = 1;

  function cleanText(value) {
    return String(value || "").trim();
  }

  function cloneConfirmedItem(item) {
    if (!item || typeof item !== "object") return null;
    const mealItemId = cleanText(item.meal_item_id);
    const foodId = cleanText(item.food_id);
    if (!mealItemId || !foodId) return null;

    return Object.freeze({
      mealItemId,
      foodId,
      displayNameSnapshot: cleanText(item.display_name_snapshot),
      portionLabel: cleanText(item.portion_label),
      servingMultiplier: Number.isFinite(Number(item.serving_multiplier)) ? Number(item.serving_multiplier) : null,
      preparation: cleanText(item.preparation),
      userAdjustment: cleanText(item.user_adjustment)
    });
  }

  function getConfirmedDraftItems(draft) {
    return (Array.isArray(draft?.items) ? draft.items : []).map(cloneConfirmedItem).filter(Boolean);
  }

  function isMealDraftReflectionEligible(draft) {
    return getConfirmedDraftItems(draft).length > 0;
  }

  function buildMealDraftReflectionSnapshot(draft, options = {}) {
    const items = getConfirmedDraftItems(draft);
    if (!items.length) return null;
    const now = typeof options.now === "function" ? options.now : () => new Date().toISOString();

    return Object.freeze({
      kind: SNAPSHOT_KIND,
      version: SNAPSHOT_VERSION,
      mealId: cleanText(draft?.mealId),
      mealLabel: cleanText(draft?.mealLabel),
      mealType: cleanText(draft?.mealType),
      time: cleanText(draft?.time),
      condimentKnowledge: draft?.condimentKnowledge === "unknown" ? "unknown" : "",
      items: Object.freeze(items),
      createdAt: cleanText(now())
    });
  }

  function createBridgeState(snapshot = null, cueVisible = false) {
    const validSnapshot = snapshot?.kind === SNAPSHOT_KIND ? snapshot : null;
    return Object.freeze({
      snapshot: validSnapshot,
      cueVisible: Boolean(validSnapshot && cueVisible)
    });
  }

  function beginBridge(snapshot) {
    return createBridgeState(snapshot, false);
  }

  function revealCue(state) {
    return createBridgeState(state?.snapshot, true);
  }

  function hideCue(state) {
    return createBridgeState(state?.snapshot, false);
  }

  function clearBridge() {
    return createBridgeState();
  }

  const api = Object.freeze({
    SNAPSHOT_KIND,
    SNAPSHOT_VERSION,
    isMealDraftReflectionEligible,
    buildMealDraftReflectionSnapshot,
    createBridgeState,
    beginBridge,
    revealCue,
    hideCue,
    clearBridge
  });

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  globalScope.MHBMealDraftReflectionContext = api;
})(typeof window !== "undefined" ? window : globalThis);
