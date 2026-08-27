(function initializeMealVisionReview(globalScope) {
  const SAFE_EXACT_MAPPINGS = Object.freeze([
    { foodId: "noodles", patterns: [/\b(noodle|noodles|rice noodle|rice noodles)\b/i, /ก๋วยเตี๋ยว|เส้น/, /面条|米粉/] },
    { foodId: "rice", patterns: [/\brice\b/i, /ข้าว/, /米饭/] },
    { foodId: "egg", patterns: [/\b(egg|eggs|fried egg|boiled egg)\b/i, /ไข่/, /鸡蛋|煎蛋|水煮蛋/] },
    { foodId: "shrimp", patterns: [/\b(shrimp|prawn|prawns)\b/i, /กุ้ง/, /虾/] },
    { foodId: "squid", patterns: [/\b(squid|calamari)\b/i, /ปลาหมึก/, /鱿鱼/] },
    { foodId: "fish", patterns: [/\bfish\b/i, /ปลา/, /鱼/] },
    { foodId: "beef", patterns: [/\bbeef\b/i, /เนื้อวัว/, /牛肉/] },
    { foodId: "mixed_vegetables", patterns: [/\bmixed vegetables?\b/i, /ผักรวม/, /混合蔬菜/] },
    { foodId: "leafy_vegetables", patterns: [/\b(leafy vegetables?|leafy greens?)\b/i, /ผักใบ/, /叶菜/] },
    { foodId: "tofu", patterns: [/\btofu\b/i, /เต้าหู้/, /豆腐/] },
    { foodId: "fruit", patterns: [/\bfruit\b/i, /ผลไม้/, /水果/] }
  ]);

  const AMBIGUOUS_MAPPINGS = Object.freeze([
    { patterns: [/\bpork\b/i, /หมู/, /猪肉/], choices: ["pork_lean"] },
    { patterns: [/\bchicken\b/i, /ไก่/, /鸡肉/], choices: ["chicken", "chicken_breast"] },
    { patterns: [/\b(seafood|shellfish)\b/i, /อาหารทะเล|ทะเล/, /海鲜/], choices: ["shrimp", "squid", "fish"] },
    { patterns: [/\b(vegetable|vegetables|greens)\b/i, /ผัก/, /蔬菜|青菜/], choices: ["mixed_vegetables", "leafy_vegetables"] }
  ]);

  function normalizeLabel(value) {
    return String(value || "").trim().replace(/\s+/g, " ");
  }

  function matchesAny(label, patterns) {
    return patterns.some((pattern) => pattern.test(label));
  }

  function classifyVisionComponent(label) {
    const normalizedLabel = normalizeLabel(label);
    if (!normalizedLabel) return Object.freeze({ status: "unsupported", label: "", choices: Object.freeze([]) });

    const exact = SAFE_EXACT_MAPPINGS.find((entry) => matchesAny(normalizedLabel, entry.patterns));
    if (exact) {
      return Object.freeze({
        status: "safe_exact",
        label: normalizedLabel,
        foodId: exact.foodId,
        choices: Object.freeze([exact.foodId])
      });
    }

    const ambiguous = AMBIGUOUS_MAPPINGS.find((entry) => matchesAny(normalizedLabel, entry.patterns));
    if (ambiguous) {
      return Object.freeze({
        status: "needs_user_choice",
        label: normalizedLabel,
        foodId: "",
        choices: Object.freeze([...ambiguous.choices])
      });
    }

    return Object.freeze({ status: "unsupported", label: normalizedLabel, foodId: "", choices: Object.freeze([]) });
  }

  function createVisionReviewModel(observation) {
    const mealTypes = Array.isArray(observation?.meal_type_candidates) ? observation.meal_type_candidates : [];
    const components = Array.isArray(observation?.visible_components) ? observation.visible_components : [];
    return {
      observationId: String(observation?.observation_id || ""),
      dishCandidates: (observation?.dish_candidates || []).map((entry) => normalizeLabel(entry?.label)).filter(Boolean),
      mealTypes: mealTypes.map((entry, index) => ({
        mealType: String(entry?.meal_type || ""),
        accepted: index === 0
      })),
      components: components.map((entry, index) => {
        const mapping = classifyVisionComponent(entry?.label);
        return {
          reviewId: `vision-component-${index}`,
          label: mapping.label,
          mappingStatus: mapping.status,
          choices: [...mapping.choices],
          selectedFoodId: mapping.status === "safe_exact" ? mapping.foodId : "",
          accepted: mapping.status === "safe_exact"
        };
      }),
      uncertainObservations: (observation?.uncertain_observations || []).map((entry) => normalizeLabel(entry?.label || entry)).filter(Boolean),
      notObservable: (observation?.not_observable || []).map(normalizeLabel).filter(Boolean)
    };
  }

  function getAcceptedMealType(review) {
    return review?.mealTypes?.find((entry) => entry.accepted)?.mealType || "";
  }

  function getAcceptedFoodIds(review) {
    return (review?.components || []).flatMap((entry) => {
      if (!entry.accepted || !entry.selectedFoodId) return [];
      if (!entry.choices.includes(entry.selectedFoodId)) return [];
      return [entry.selectedFoodId];
    });
  }

  function applyVisionReviewToDraft(model, review) {
    if (!model || !review) return Object.freeze({ applied: false, addedFoodIds: Object.freeze([]), mealTypeApplied: false, mealTypeConflict: false });
    const before = model.getDraft();
    const acceptedMealType = getAcceptedMealType(review);
    let mealTypeApplied = false;
    let mealTypeConflict = false;

    if (acceptedMealType && before.mealType === "unspecified") {
      model.setDraftMeta({ mealType: acceptedMealType });
      mealTypeApplied = model.getDraft().mealType === acceptedMealType;
    } else if (acceptedMealType && before.mealType !== acceptedMealType) {
      mealTypeConflict = true;
    }

    const existingFoodIds = new Set(before.items.map((item) => item.food_id));
    const addedFoodIds = [];
    for (const foodId of getAcceptedFoodIds(review)) {
      if (existingFoodIds.has(foodId)) continue;
      if (model.addFood(foodId)) {
        existingFoodIds.add(foodId);
        addedFoodIds.push(foodId);
      }
    }

    return Object.freeze({
      applied: mealTypeApplied || addedFoodIds.length > 0,
      addedFoodIds: Object.freeze(addedFoodIds),
      mealTypeApplied,
      mealTypeConflict
    });
  }

  const api = Object.freeze({
    classifyVisionComponent,
    createVisionReviewModel,
    getAcceptedMealType,
    getAcceptedFoodIds,
    applyVisionReviewToDraft
  });

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  globalScope.MHBMealVisionReview = api;
})(typeof window !== "undefined" ? window : globalThis);
