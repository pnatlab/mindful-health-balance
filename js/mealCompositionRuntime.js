(function initializeMealCompositionRuntime(globalScope) {
  const MEAL_RECORDS_KEY = "mhb_meal_records_v1";
  const MEAL_SCHEMA_VERSION = "1"; // Food Reference schema; independent from Meal records.
  const MEAL_RECORD_SCHEMA_VERSION = "2";

  function isValidMealDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = new Date(`${value}T00:00:00.000Z`);
    return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
  }

  function isValidMealTime(value) {
    return value === "" || /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);
  }
  const MEAL_LABELS = new Set(["breakfast", "lunch", "dinner", "snack", "late_meal", "custom", "unnamed"]);
  const MEAL_TYPES = new Set(["unspecified", "stir_fried", "boiled", "curry", "fried", "grilled", "steamed", "broth_based", "minimally_prepared", "other"]);
  const CONDIMENT_KNOWLEDGE = new Set(["", "unknown"]);
  const PORTION_LABELS = new Set(["small", "regular", "large", "custom"]);
  const PREPARATIONS = new Set(["boiled", "steamed", "grilled", "stir_fried", "fried", "roasted", "raw", "soup", "unknown"]);
  const CONFIDENCE_LEVELS = new Set(["high", "medium", "low", "unknown"]);
  const SOURCE_TYPES = new Set(["reference_database", "package_label", "restaurant_declared", "user_entered", "system_default", "unknown"]);
  const PORTION_MULTIPLIERS = Object.freeze({ small: 0.5, regular: 1, large: 1.5 });
  const ESTIMATE_BASES = new Set(["dish_inclusive", "component_only", "unknown"]);

  function createUnknownFoodReference(foodId, names, category, servingLabel) {
    return {
      food_id: foodId,
      display_name_th: names.th,
      display_name_en: names.en,
      display_name_zh: names.zh,
      category,
      default_serving_label: servingLabel,
      default_serving_amount: 1,
      default_serving_unit: "serving",
      sodium_estimate_min_mg: null,
      sodium_estimate_max_mg: null,
      sodium_confidence: "unknown",
      source_type: "unknown",
      source_reference: "",
      preparation_default: "",
      is_processed: category === "processed_food",
      is_condiment: category === "condiment",
      is_plant_protein: category === "plant_protein",
      is_animal_protein: category === "animal_protein",
      notes: "No sodium value is included until a supported reference is approved.",
      schema_version: MEAL_SCHEMA_VERSION
    };
  }

  function createEvidenceBackedFoodReference(foodId, names, category, servingLabel, evidence) {
    return {
      ...createUnknownFoodReference(foodId, names, category, servingLabel),
      ...evidence
    };
  }

  const FOOD_REFERENCE_PILOT = [
    createUnknownFoodReference("rice", { th: "ข้าว", en: "Rice", zh: "米饭" }, "grain", "1 bowl"),
    createUnknownFoodReference("brown_rice", { th: "ข้าวกล้อง", en: "Brown rice", zh: "糙米饭" }, "grain", "1 bowl"),
    createUnknownFoodReference("noodles", { th: "ก๋วยเตี๋ยว / เส้น", en: "Noodles", zh: "面条" }, "grain", "1 bowl"),
    createUnknownFoodReference("chicken_breast", { th: "อกไก่", en: "Chicken breast", zh: "鸡胸肉" }, "animal_protein", "1 serving"),
    createUnknownFoodReference("chicken", { th: "ไก่", en: "Chicken", zh: "鸡肉" }, "animal_protein", "1 serving"),
    createUnknownFoodReference("pork_lean", { th: "หมูไม่ติดมัน", en: "Lean pork", zh: "瘦猪肉" }, "animal_protein", "1 serving"),
    createUnknownFoodReference("pork_fatty", { th: "หมูติดมัน", en: "Fatty pork", zh: "肥猪肉" }, "animal_protein", "1 serving"),
    createUnknownFoodReference("pork_crispy", { th: "หมูกรอบ", en: "Crispy pork", zh: "脆皮猪肉" }, "animal_protein", "1 serving"),
    createUnknownFoodReference("beef", { th: "เนื้อวัว", en: "Beef", zh: "牛肉" }, "animal_protein", "1 serving"),
    createUnknownFoodReference("fish", { th: "ปลา", en: "Fish", zh: "鱼" }, "animal_protein", "1 serving"),
    createUnknownFoodReference("shrimp", { th: "กุ้ง", en: "Shrimp", zh: "虾" }, "animal_protein", "1 serving"),
    createUnknownFoodReference("squid", { th: "ปลาหมึก", en: "Squid", zh: "鱿鱼" }, "animal_protein", "1 serving"),
    createEvidenceBackedFoodReference("egg", { th: "ไข่", en: "Egg", zh: "鸡蛋" }, "egg", "1 large boiled egg", {
      default_serving_amount: 1,
      default_serving_unit: "egg",
      sodium_estimate_min_mg: 60,
      sodium_estimate_max_mg: 62,
      sodium_confidence: "high",
      source_type: "reference_database",
      source_reference: "USDA FoodData Central FDC 173424; Ramathibodi/Mahidol 2025 Thai FCD cross-check.",
      preparation_default: "boiled",
      notes: "Evidence range applies to one large boiled egg; sauces and seasoning are separate Meal Items."
    }),
    createUnknownFoodReference("tofu", { th: "เต้าหู้", en: "Tofu", zh: "豆腐" }, "plant_protein", "1 serving"),
    createUnknownFoodReference("tempeh", { th: "เทมเป้", en: "Tempeh", zh: "天贝" }, "plant_protein", "1 serving"),
    createUnknownFoodReference("mixed_vegetables", { th: "ผักรวม", en: "Mixed vegetables", zh: "混合蔬菜" }, "vegetable", "1 serving"),
    createUnknownFoodReference("leafy_vegetables", { th: "ผักใบ", en: "Leafy vegetables", zh: "叶菜" }, "vegetable", "1 serving"),
    createUnknownFoodReference("fruit", { th: "ผลไม้", en: "Fruit", zh: "水果" }, "fruit", "1 serving"),
    createUnknownFoodReference("clear_soup", { th: "ซุปใส", en: "Clear soup", zh: "清汤" }, "soup", "1 bowl"),
    createEvidenceBackedFoodReference("fish_sauce", { th: "น้ำปลา", en: "Fish sauce", zh: "鱼露" }, "condiment", "1 tbsp", {
      default_serving_amount: 1,
      default_serving_unit: "tbsp",
      sodium_estimate_min_mg: 1410,
      sodium_estimate_max_mg: 1480,
      sodium_confidence: "medium",
      source_type: "reference_database",
      source_reference: "USDA FoodData Central FDC 174531; Thai Kitchen Premium Fish Sauce (McCormick).",
      notes: "Evidence range applies to regular fish sauce. Reduced-sodium products require a future Meal Item package-label override."
    }),
    createEvidenceBackedFoodReference("soy_sauce", { th: "ซีอิ๊ว", en: "Soy sauce", zh: "酱油" }, "condiment", "1 tbsp", {
      default_serving_amount: 1,
      default_serving_unit: "tbsp",
      sodium_estimate_min_mg: 879,
      sodium_estimate_max_mg: 920,
      sodium_confidence: "medium",
      source_type: "reference_database",
      source_reference: "USDA FoodData Central FDC 174277; Kikkoman regular soy sauce sodium comparison.",
      notes: "Evidence range applies to regular soy sauce. Reduced-sodium products require a future Meal Item package-label override."
    }),
    createEvidenceBackedFoodReference("oyster_sauce", { th: "ซอสหอยนางรม", en: "Oyster sauce", zh: "蚝油" }, "condiment", "1 tbsp", {
      default_serving_amount: 1,
      default_serving_unit: "tbsp",
      sodium_estimate_min_mg: 490,
      sodium_estimate_max_mg: 870,
      sodium_confidence: "low",
      source_type: "reference_database",
      source_reference: "USDA FoodData Central FDC 174529; Lee Kum Kee Panda Oyster Sauce specification (2020-07-15).",
      notes: "Evidence range preserves visible formulation variation. A future Meal Item package-label override must not overwrite this canonical Food Reference."
    }),
    createUnknownFoodReference("seasoning_powder", { th: "ผงปรุงรส", en: "Seasoning powder", zh: "调味粉" }, "condiment", "1 spoon"),
    createUnknownFoodReference("soup_base", { th: "น้ำซุป", en: "Soup base", zh: "汤底" }, "condiment", "1 serving"),
    createUnknownFoodReference("dipping_sauce", { th: "น้ำจิ้ม", en: "Dipping sauce", zh: "蘸酱" }, "condiment", "1 spoon"),
    createUnknownFoodReference("processed_sausage", { th: "ไส้กรอก", en: "Sausage", zh: "香肠" }, "processed_food", "1 serving"),
    createUnknownFoodReference("fried_snack", { th: "ของทอด", en: "Fried snack", zh: "油炸小吃" }, "processed_food", "1 serving"),
    createUnknownFoodReference("dessert", { th: "ของหวาน", en: "Dessert", zh: "甜点" }, "dessert", "1 serving")
  ].map((reference) => Object.freeze(reference));

  const FOOD_REFERENCE_BY_ID = new Map(FOOD_REFERENCE_PILOT.map((reference) => [reference.food_id, reference]));
  Object.freeze(FOOD_REFERENCE_PILOT);

  // These references are separate from Food Reference items. They are only used after an explicit, approved dish match.
  const NAMED_DISH_REFERENCE_LIBRARY = [
    {
      dish_id: "fried_rice_pork_vegetable_egg",
      display_name_th: "ข้าวผัดหมู ผัก และไข่",
      display_name_en: "Fried rice with pork, vegetable and egg",
      display_name_zh: "猪肉蔬菜鸡蛋炒饭",
      source_type: "reference_database",
      source_reference: "Thai Food Composition Database v3, food ID 1554, Thai FCD code T56: Fried rice with pork, vegetable and egg.",
      source_url: "https://inmu.mahidol.ac.th/thaifcd/foodsearch/food_name_result_std_pdf/?dbcode=STD&food_id=1554",
      source_version: "Thai Food Composition Database v3, August 2025",
      accessed_date: "2026-08-27",
      source_serving_label: "100 g edible portion",
      source_serving_amount: 100,
      source_serving_unit: "g",
      sodium_estimate_min_mg: 141,
      sodium_estimate_max_mg: 141,
      estimate_basis: "dish_inclusive",
      confidence: "medium",
      scaling_allowed: false,
      inclusive_boundary: "Includes the source-prepared fried rice, pork, vegetable, egg, and seasoning represented by the Thai FCD record. External add-ons are not established and must not be added in this slice.",
      notes: "Use only after an explicit user-confirmed named_dish_id. This 100 g reference is not a whole-plate estimate."
    },
    {
      dish_id: "fried_rice_vegetable",
      display_name_th: "ข้าวผัดผัก",
      display_name_en: "Fried rice with vegetables",
      display_name_zh: "蔬菜炒饭",
      source_type: "reference_database",
      source_reference: "Thai Food Composition Database v3, food ID 1553, Thai FCD code T204: Fried rice with vegetables.",
      source_url: "https://inmu.mahidol.ac.th/thaifcd/foodsearch/food_name_result_std_pdf/?dbcode=STD&food_id=1553",
      source_version: "Thai Food Composition Database v3, August 2025",
      accessed_date: "2026-08-27",
      source_serving_label: "100 g edible portion",
      source_serving_amount: 100,
      source_serving_unit: "g",
      sodium_estimate_min_mg: 268,
      sodium_estimate_max_mg: 268,
      estimate_basis: "dish_inclusive",
      confidence: "medium",
      scaling_allowed: false,
      inclusive_boundary: "Includes the source-prepared fried rice, vegetables, and seasoning represented by the Thai FCD record. Meat, egg, and external add-ons are outside this identity and must not be added in this slice.",
      notes: "Use only after an explicit user-confirmed named_dish_id. This 100 g reference is not a whole-plate estimate."
    }
  ].map((reference) => Object.freeze(reference));
  const NAMED_DISH_REFERENCE_BY_ID = new Map(NAMED_DISH_REFERENCE_LIBRARY.map((reference) => [reference.dish_id, reference]));
  Object.freeze(NAMED_DISH_REFERENCE_LIBRARY);

  function isBlank(value) {
    return value === undefined || value === null || String(value).trim() === "";
  }

  function asTrimmedText(value) {
    return isBlank(value) ? "" : String(value).trim();
  }

  function asFiniteNonNegativeNumber(value) {
    if (isBlank(value)) return null;
    const number = Number(value);
    return Number.isFinite(number) && number >= 0 ? number : null;
  }

  function asPositiveFiniteNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) && number > 0 ? number : null;
  }

  function normalizeSodiumRange(minValue, maxValue) {
    const min = asFiniteNonNegativeNumber(minValue);
    const max = asFiniteNonNegativeNumber(maxValue);
    const hasMin = !isBlank(minValue);
    const hasMax = !isBlank(maxValue);

    if (!hasMin && !hasMax) {
      return { valid: true, known: false, min: null, max: null };
    }

    if (min === null || max === null || min > max) {
      return { valid: false, known: false, min: null, max: null };
    }

    return { valid: true, known: true, min, max };
  }

  function normalizeFoodReference(reference) {
    if (!reference || typeof reference !== "object") return null;
    const foodId = asTrimmedText(reference.food_id);
    const displayNameTh = asTrimmedText(reference.display_name_th);
    const displayNameEn = asTrimmedText(reference.display_name_en);
    const range = normalizeSodiumRange(reference.sodium_estimate_min_mg, reference.sodium_estimate_max_mg);
    const confidence = CONFIDENCE_LEVELS.has(reference.sodium_confidence) ? reference.sodium_confidence : "unknown";
    const sourceType = SOURCE_TYPES.has(reference.source_type) ? reference.source_type : "unknown";

    if (!foodId || !displayNameTh || !displayNameEn || !range.valid) return null;

    return Object.freeze({
      food_id: foodId,
      display_name_th: displayNameTh,
      display_name_en: displayNameEn,
      display_name_zh: asTrimmedText(reference.display_name_zh),
      category: asTrimmedText(reference.category) || "other",
      default_serving_label: asTrimmedText(reference.default_serving_label) || "1 serving",
      default_serving_amount: asPositiveFiniteNumber(reference.default_serving_amount) || 1,
      default_serving_unit: asTrimmedText(reference.default_serving_unit) || "serving",
      sodium_estimate_min_mg: range.min,
      sodium_estimate_max_mg: range.max,
      sodium_confidence: range.known ? confidence : "unknown",
      source_type: sourceType,
      source_reference: asTrimmedText(reference.source_reference),
      preparation_default: PREPARATIONS.has(reference.preparation_default) ? reference.preparation_default : "",
      is_processed: Boolean(reference.is_processed),
      is_condiment: Boolean(reference.is_condiment),
      is_plant_protein: Boolean(reference.is_plant_protein),
      is_animal_protein: Boolean(reference.is_animal_protein),
      notes: asTrimmedText(reference.notes),
      schema_version: asTrimmedText(reference.schema_version) || MEAL_SCHEMA_VERSION
    });
  }

  function getFoodReferenceLibrary() {
    return FOOD_REFERENCE_PILOT;
  }

  function getFoodReferenceById(foodId) {
    return FOOD_REFERENCE_BY_ID.get(asTrimmedText(foodId)) || null;
  }

  function getNamedDishReferenceLibrary() {
    return NAMED_DISH_REFERENCE_LIBRARY;
  }

  function getNamedDishReferenceById(dishId) {
    return NAMED_DISH_REFERENCE_BY_ID.get(asTrimmedText(dishId)) || null;
  }

  function getMealItemReference(item) {
    return getFoodReferenceById(item?.food_id);
  }

  function evaluateNamedDishConsistency(meal) {
    const namedDishId = asTrimmedText(meal?.named_dish_id);
    const reference = getNamedDishReferenceById(namedDishId);
    const items = Array.isArray(meal?.items) ? meal.items.map(normalizeMealItem).filter(Boolean) : [];
    const itemIds = new Set(items.map((item) => item.food_id));
    const itemReferences = items.map(getMealItemReference).filter(Boolean);
    const softConflicts = [];
    const evidenceConflicts = [];

    if (!namedDishId) {
      return Object.freeze({
        status: "no_reference",
        named_dish_id: "",
        soft_conflicts: Object.freeze([]),
        evidence_conflicts: Object.freeze([]),
        matching_components: Object.freeze([]),
        conflicting_components: Object.freeze([]),
        evidence_usable: false
      });
    }
    if (!reference) {
      return Object.freeze({
        status: "unsupported",
        named_dish_id: namedDishId,
        soft_conflicts: Object.freeze([]),
        evidence_conflicts: Object.freeze(["unapproved_named_dish"]),
        matching_components: Object.freeze([]),
        conflicting_components: Object.freeze([]),
        evidence_usable: false
      });
    }

    if (meal?.meal_type && meal.meal_type !== "unspecified" && meal.meal_type !== "stir_fried") {
      softConflicts.push("meal_type_not_stir_fried");
    }

    if (reference.dish_id === "fried_rice_vegetable") {
      const conflicting = itemReferences.filter((itemReference) => itemReference.is_animal_protein || itemReference.category === "egg");
      if (conflicting.length) {
        evidenceConflicts.push("vegetable_fried_rice_has_meat_or_egg");
      }
    }
    if (reference.dish_id === "fried_rice_pork_vegetable_egg") {
      const conflicting = itemReferences.filter((itemReference) => itemReference.is_animal_protein && itemReference.food_id !== "pork_lean");
      if (conflicting.length) {
        evidenceConflicts.push("pork_fried_rice_has_other_animal_protein");
      }
    }

    const matchingComponents = reference.dish_id === "fried_rice_pork_vegetable_egg"
      ? ["rice", "pork_lean", "egg"].filter((foodId) => itemIds.has(foodId))
      : ["rice"].filter((foodId) => itemIds.has(foodId));
    const conflictingComponents = itemReferences
      .filter((itemReference) => reference.dish_id === "fried_rice_vegetable"
        ? itemReference.is_animal_protein || itemReference.category === "egg"
        : itemReference.is_animal_protein && itemReference.food_id !== "pork_lean")
      .map((itemReference) => itemReference.food_id);
    const status = evidenceConflicts.length ? "evidence_conflict" : softConflicts.length ? "soft_conflict" : "compatible";

    return Object.freeze({
      status,
      named_dish_id: reference.dish_id,
      soft_conflicts: Object.freeze(softConflicts),
      evidence_conflicts: Object.freeze(evidenceConflicts),
      matching_components: Object.freeze(matchingComponents),
      conflicting_components: Object.freeze(conflictingComponents),
      evidence_usable: evidenceConflicts.length === 0
    });
  }

  function getNamedDishCandidates(meal) {
    const items = Array.isArray(meal?.items) ? meal.items.map(normalizeMealItem).filter(Boolean) : [];
    const itemIds = new Set(items.map((item) => item.food_id));
    const itemReferences = items.map(getMealItemReference).filter(Boolean);
    const hasVegetable = itemReferences.some((reference) => reference.category === "vegetable");
    const hasAnimalProtein = itemReferences.some((reference) => reference.is_animal_protein);
    const hasEgg = itemReferences.some((reference) => reference.category === "egg");
    const candidates = [];

    if (itemIds.has("rice") && itemIds.has("pork_lean") && hasVegetable && itemIds.has("egg")) {
      candidates.push(Object.freeze({
        candidate_id: "fried_rice_pork_vegetable_egg",
        match_status: "compatible",
        matching_components: Object.freeze(["rice", "pork_lean", "vegetable", "egg"]),
        conflicting_components: Object.freeze([]),
        reason: "structured_components"
      }));
    }
    if (itemIds.has("rice") && hasVegetable && !hasAnimalProtein && !hasEgg) {
      candidates.push(Object.freeze({
        candidate_id: "fried_rice_vegetable",
        match_status: "compatible",
        matching_components: Object.freeze(["rice", "vegetable"]),
        conflicting_components: Object.freeze([]),
        reason: "structured_components"
      }));
    }
    return Object.freeze(candidates);
  }

  function getFoodDisplayName(reference, language = "th") {
    if (!reference) return "";
    const key = language === "zh" ? "display_name_zh" : language === "en" ? "display_name_en" : "display_name_th";
    return reference[key] || reference.display_name_en || reference.display_name_th || "";
  }

  function getServingMultiplier(portionLabel, customMultiplier) {
    if (portionLabel === "custom") return asPositiveFiniteNumber(customMultiplier);
    return PORTION_MULTIPLIERS[portionLabel] || null;
  }

  function createLocalId(prefix = "meal") {
    if (globalScope.crypto && typeof globalScope.crypto.randomUUID === "function") {
      return `${prefix}_${globalScope.crypto.randomUUID()}`;
    }
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  }

  function createMealItem(input = {}, reference = getFoodReferenceById(input.food_id), options = {}) {
    if (!reference) return null;
    const portionLabel = PORTION_LABELS.has(input.portion_label) ? input.portion_label : "regular";
    const servingMultiplier = getServingMultiplier(portionLabel, input.serving_multiplier);
    const preparation = PREPARATIONS.has(input.preparation) ? input.preparation : "";
    if (!servingMultiplier) return null;

    const referenceRange = normalizeSodiumRange(reference.sodium_estimate_min_mg, reference.sodium_estimate_max_mg);
    const itemRange = referenceRange.known
      ? { min: referenceRange.min * servingMultiplier, max: referenceRange.max * servingMultiplier }
      : { min: null, max: null };

    return normalizeMealItem({
      meal_item_id: input.meal_item_id || options.createId?.("meal_item") || createLocalId("meal_item"),
      food_id: reference.food_id,
      display_name_snapshot: asTrimmedText(input.display_name_snapshot) || getFoodDisplayName(reference, options.language || "th"),
      portion_label: portionLabel,
      serving_multiplier: servingMultiplier,
      preparation,
      user_adjustment: asTrimmedText(input.user_adjustment),
      sodium_estimate_min_mg: itemRange.min,
      sodium_estimate_max_mg: itemRange.max,
      confidence: referenceRange.known ? reference.sodium_confidence : "unknown",
      source_type: reference.source_type,
      source_reference: reference.source_reference
    });
  }

  function normalizeMealItem(item) {
    if (!item || typeof item !== "object") return null;
    const itemId = asTrimmedText(item.meal_item_id);
    const foodId = asTrimmedText(item.food_id);
    const portionLabel = PORTION_LABELS.has(item.portion_label) ? item.portion_label : "regular";
    const servingMultiplier = getServingMultiplier(portionLabel, item.serving_multiplier);
    const preparation = PREPARATIONS.has(item.preparation) ? item.preparation : "";
    const range = normalizeSodiumRange(item.sodium_estimate_min_mg, item.sodium_estimate_max_mg);

    if (!itemId || !foodId || !servingMultiplier || !range.valid) return null;

    return {
      meal_item_id: itemId,
      food_id: foodId,
      display_name_snapshot: asTrimmedText(item.display_name_snapshot),
      portion_label: portionLabel,
      serving_multiplier: servingMultiplier,
      preparation,
      user_adjustment: asTrimmedText(item.user_adjustment),
      sodium_estimate_min_mg: range.min,
      sodium_estimate_max_mg: range.max,
      confidence: range.known && CONFIDENCE_LEVELS.has(item.confidence) ? item.confidence : "unknown",
      source_type: SOURCE_TYPES.has(item.source_type) ? item.source_type : "unknown",
      source_reference: asTrimmedText(item.source_reference)
    };
  }

  function normalizeMealRecord(meal, options = {}) {
    if (!meal || typeof meal !== "object" || Array.isArray(meal)) return null;
    const version = meal.record_schema_version;
    if (version !== undefined && version !== MEAL_RECORD_SCHEMA_VERSION) return null;
    const normalizeDate = typeof options.normalizeDate === "function" ? options.normalizeDate : (value) => asTrimmedText(value);
    const mealId = asTrimmedText(meal.meal_id);
    const date = asTrimmedText(normalizeDate(meal.date));
    const label = MEAL_LABELS.has(meal.meal_label) ? meal.meal_label : "unnamed";
    const mealType = MEAL_TYPES.has(meal.meal_type) ? meal.meal_type : "unspecified";
    const condimentKnowledge = CONDIMENT_KNOWLEDGE.has(meal.condiment_knowledge) ? meal.condiment_knowledge : "";
    const items = Array.isArray(meal.items) ? meal.items.map(normalizeMealItem).filter(Boolean) : [];

    if (!mealId || !date) return null;
    if (version === MEAL_RECORD_SCHEMA_VERSION) {
      if (!isValidMealDate(date)) return null;
      if (typeof meal.meal_name !== "string" || !meal.meal_name.trim() || !isValidMealTime(asTrimmedText(meal.time))) return null;
      // Meal Moments cannot route ingredient or named-dish evidence.
      if ((meal.items !== undefined && (!Array.isArray(meal.items) || meal.items.length)) || asTrimmedText(meal.named_dish_id)) return null;
    } else if (!items.length) return null;

    return {
      ...(version === MEAL_RECORD_SCHEMA_VERSION ? { record_schema_version: version } : {}),
      meal_id: mealId,
      date,
      time: asTrimmedText(meal.time),
      meal_label: label,
      custom_meal_label: label === "custom" ? asTrimmedText(meal.custom_meal_label) : "",
      // Human-authorized identity; legacy records may remain unnamed. Never inference.
      meal_name: asTrimmedText(meal.meal_name),
      // These fields only preserve what the user chose to describe. They never estimate ingredients or sodium.
      meal_type: mealType,
      // An unknown ID is retained for forward compatibility, but only an approved library record can route an estimate.
      named_dish_id: asTrimmedText(meal.named_dish_id),
      condiment_knowledge: condimentKnowledge,
      items,
      meal_note: asTrimmedText(meal.meal_note),
      created_at: asTrimmedText(meal.created_at),
      updated_at: asTrimmedText(meal.updated_at)
    };
  }

  function sortMealRecords(records = []) {
    return [...records].sort((left, right) => {
      const leftKey = `${left.date}|${left.time || ""}|${left.created_at || ""}|${left.meal_id}`;
      const rightKey = `${right.date}|${right.time || ""}|${right.created_at || ""}|${right.meal_id}`;
      return leftKey.localeCompare(rightKey);
    });
  }

  function deriveConservativeConfidence(items, coverage) {
    if (coverage !== "complete") return "unknown";
    const levels = items.map((item) => item.confidence);
    if (!levels.length || levels.includes("unknown")) return "unknown";
    if (levels.includes("low")) return "low";
    if (levels.includes("medium")) return "medium";
    return "high";
  }

  function deriveMealEstimate(meal) {
    if (meal?.record_schema_version === MEAL_RECORD_SCHEMA_VERSION) {
      return deriveMealEstimate({ items: [] });
    }
    const namedDishId = asTrimmedText(meal?.named_dish_id);
    const namedDish = getNamedDishReferenceById(namedDishId);
    const namedDishConsistency = evaluateNamedDishConsistency(meal);
    if (namedDish && namedDishConsistency.evidence_usable) {
      return {
        estimated_sodium_min_mg: namedDish.sodium_estimate_min_mg,
        estimated_sodium_max_mg: namedDish.sodium_estimate_max_mg,
        // A direct 100 g dish reference is still not evidence of the user's whole meal or all external add-ons.
        sodium_estimate_coverage: "partial",
        estimate_confidence: namedDish.confidence,
        estimate_basis: namedDish.estimate_basis,
        named_dish_id: namedDish.dish_id,
        known_item_count: 1,
        unknown_item_count: 0,
        source_basis: Object.freeze({
          label: namedDish.source_serving_label,
          amount: namedDish.source_serving_amount,
          unit: namedDish.source_serving_unit,
          scaling_allowed: namedDish.scaling_allowed
        }),
        provenance: Object.freeze({
          source_type: namedDish.source_type,
          source_reference: namedDish.source_reference,
          source_url: namedDish.source_url,
          source_version: namedDish.source_version,
          accessed_date: namedDish.accessed_date,
          matched_identity: namedDish.dish_id,
          inclusive_boundary: namedDish.inclusive_boundary,
          add_on_boundary: "No add-on condiment is included in this implementation slice."
        })
      };
    }

    const items = Array.isArray(meal?.items) ? meal.items.map(normalizeMealItem).filter(Boolean) : [];
    let min = 0;
    let max = 0;
    let knownItemCount = 0;
    let unknownItemCount = 0;

    items.forEach((item) => {
      const range = normalizeSodiumRange(item.sodium_estimate_min_mg, item.sodium_estimate_max_mg);
      if (range.known) {
        min += range.min;
        max += range.max;
        knownItemCount += 1;
      } else {
        unknownItemCount += 1;
      }
    });

    const sodiumEstimateCoverage = knownItemCount === 0
      ? "unknown"
      : unknownItemCount > 0
        ? "partial"
        : "complete";

    return {
      estimated_sodium_min_mg: knownItemCount ? min : null,
      estimated_sodium_max_mg: knownItemCount ? max : null,
      sodium_estimate_coverage: sodiumEstimateCoverage,
      estimate_confidence: deriveConservativeConfidence(items, sodiumEstimateCoverage),
      estimate_basis: knownItemCount ? "component_only" : "unknown",
      named_dish_id: "",
      known_item_count: knownItemCount,
      unknown_item_count: unknownItemCount,
      source_basis: null,
      provenance: null
    };
  }

  function mealContains(meal, predicate, library = getFoodReferenceLibrary()) {
    const referenceById = library instanceof Map
      ? library
      : new Map((Array.isArray(library) ? library : []).map((reference) => [reference.food_id, reference]));
    return Array.isArray(meal?.items) && meal.items.some((item) => predicate(referenceById.get(item.food_id), item));
  }

  function deriveDailyMealSummary(date, meals = [], library = getFoodReferenceLibrary()) {
    const selectedMeals = sortMealRecords(meals
      .map((meal) => normalizeMealRecord(meal))
      .filter((meal) => meal && meal.date === date));
    const mealEstimates = selectedMeals.map(deriveMealEstimate);
    const knownMealEstimateCount = mealEstimates.filter((estimate) => estimate.known_item_count > 0).length;
    const hasPartialOrUnknownCoverage = mealEstimates.some((estimate) => estimate.sodium_estimate_coverage !== "complete");
    const sodiumEstimateCoverage = knownMealEstimateCount === 0
      ? "unknown"
      : hasPartialOrUnknownCoverage
        ? "partial"
        : "complete";
    const estimatedSodiumMin = mealEstimates.reduce((sum, estimate) => sum + (estimate.estimated_sodium_min_mg || 0), 0);
    const estimatedSodiumMax = mealEstimates.reduce((sum, estimate) => sum + (estimate.estimated_sodium_max_mg || 0), 0);
    const hasCategory = (category) => selectedMeals.filter((meal) => mealContains(meal, (reference) => reference?.category === category, library)).length;
    const hasFlag = (flag) => selectedMeals.filter((meal) => mealContains(meal, (reference) => Boolean(reference?.[flag]), library)).length;
    const hasPreparation = (preparation) => selectedMeals.filter((meal) => mealContains(meal, (_reference, item) => item.preparation === preparation, library)).length;
    const unknownEstimateItemCount = mealEstimates.reduce((sum, estimate) => sum + estimate.unknown_item_count, 0);
    const proteinCategories = [];
    if (hasFlag("is_animal_protein") || hasCategory("animal_protein")) proteinCategories.push("animal_protein");
    if (hasFlag("is_plant_protein") || hasCategory("plant_protein")) proteinCategories.push("plant_protein");

    const estimateBases = [...new Set(mealEstimates.map((estimate) => estimate.estimate_basis).filter((basis) => basis !== "unknown"))].sort();
    const namedDishIds = [...new Set(mealEstimates.map((estimate) => estimate.named_dish_id).filter(Boolean))].sort();
    const knownEstimates = mealEstimates.filter((estimate) => estimate.known_item_count > 0);
    const dailyConfidence = sodiumEstimateCoverage === "complete"
      ? deriveConservativeConfidence(selectedMeals.flatMap((meal) => meal.items), sodiumEstimateCoverage)
      : knownEstimates.length && knownEstimates.every((estimate) => estimate.estimate_basis === "dish_inclusive" || estimate.estimate_confidence !== "unknown")
        ? deriveConservativeConfidence(knownEstimates.map((estimate) => ({ confidence: estimate.estimate_confidence })), "complete")
        : "unknown";

    return {
      date: asTrimmedText(date),
      recorded_meal_count: selectedMeals.length,
      estimated_sodium_min_mg: knownMealEstimateCount ? estimatedSodiumMin : null,
      estimated_sodium_max_mg: knownMealEstimateCount ? estimatedSodiumMax : null,
      sodium_estimate_coverage: sodiumEstimateCoverage,
      estimate_confidence: dailyConfidence,
      estimate_bases: estimateBases,
      named_dish_ids: namedDishIds,
      animal_protein_meals: hasCategory("animal_protein"),
      plant_protein_meals: hasCategory("plant_protein"),
      vegetable_present_meals: hasCategory("vegetable"),
      fried_food_meals: hasPreparation("fried"),
      processed_food_meals: hasCategory("processed_food"),
      meals_with_recorded_condiments: hasFlag("is_condiment") || hasCategory("condiment"),
      recorded_protein_categories: proteinCategories,
      unknown_estimate_item_count: unknownEstimateItemCount
    };
  }

  function buildMealReflectionContext(date, meals = [], library = getFoodReferenceLibrary()) {
    const summary = deriveDailyMealSummary(date, meals, library);
    return {
      date: summary.date,
      hasMealData: summary.recorded_meal_count > 0,
      recordedMealCount: summary.recorded_meal_count,
      sodiumRange: {
        minMg: summary.estimated_sodium_min_mg,
        maxMg: summary.estimated_sodium_max_mg,
        coverage: summary.sodium_estimate_coverage
      },
      estimateConfidence: summary.estimate_confidence,
      estimateBases: [...summary.estimate_bases],
      namedDishIds: [...summary.named_dish_ids],
      proteinCategories: [...summary.recorded_protein_categories],
      vegetablePresentMeals: summary.vegetable_present_meals,
      friedFoodMeals: summary.fried_food_meals,
      processedFoodMeals: summary.processed_food_meals,
      mealsWithRecordedCondiments: summary.meals_with_recorded_condiments,
      hasUnknownEstimateCoverage: summary.recorded_meal_count > 0 && summary.sodium_estimate_coverage !== "complete"
    };
  }

  function buildSavedMealReflectionContext(date, meals = [], library = getFoodReferenceLibrary(), options = {}) {
    const selectedDate = asTrimmedText(date);
    const maxVisibleItems = Math.max(1, Number.parseInt(options.maxVisibleItems, 10) || 4);
    const selectedMeals = sortMealRecords((Array.isArray(meals) ? meals : [])
      .map((meal) => normalizeMealRecord(meal))
      .filter((meal) => meal && meal.date === selectedDate));
    const references = library instanceof Map
      ? library
      : new Map((Array.isArray(library) ? library : []).map((reference) => [reference.food_id, reference]));
    const distinctItems = new Map();

    const boundedMeals = selectedMeals.map((meal) => {
      const confirmedItems = meal.items.map((item) => {
        const foodId = asTrimmedText(item.food_id);
        const itemSummary = Object.freeze({
          foodId,
          displayNameSnapshot: asTrimmedText(item.display_name_snapshot)
        });
        if (foodId && !distinctItems.has(foodId)) distinctItems.set(foodId, itemSummary);
        return itemSummary;
      });

      return Object.freeze({
        mealId: meal.meal_id,
        mealName: asTrimmedText(meal.meal_name),
        mealLabel: meal.meal_label,
        mealType: meal.meal_type,
        time: meal.time,
        confirmedItems: Object.freeze(confirmedItems)
      });
    });

    const sortedDistinctItems = [...distinctItems.values()]
      .filter((item) => references.has(item.foodId) || item.displayNameSnapshot)
      .sort((left, right) => left.foodId.localeCompare(right.foodId));
    const visibleItems = sortedDistinctItems.slice(0, maxVisibleItems);
    const presentation = [];
    const seenFallbackIds = new Set();
    boundedMeals.forEach((meal) => {
      if (meal.mealName) {
        const points = [...meal.mealName];
        presentation.push(Object.freeze({ text: points.length > 160 ? `${points.slice(0, 160).join("")}…` : meal.mealName }));
      } else {
        meal.confirmedItems.forEach((item) => {
          if (!seenFallbackIds.has(item.foodId) && (references.has(item.foodId) || item.displayNameSnapshot)) {
            seenFallbackIds.add(item.foodId);
            presentation.push(item);
          }
        });
      }
    });

    return Object.freeze({
      source: "saved_today",
      date: selectedDate,
      mealCount: boundedMeals.length,
      meals: Object.freeze(boundedMeals),
      visibleLabels: Object.freeze(presentation.slice(0, maxVisibleItems)),
      additionalLabelCount: Math.max(0, presentation.length - maxVisibleItems),
      visibleItems: Object.freeze(visibleItems),
      additionalItemCount: Math.max(0, sortedDistinctItems.length - visibleItems.length)
    });
  }

  function createMealStore(storage, options = {}) {
    const normalizeDate = typeof options.normalizeDate === "function" ? options.normalizeDate : (value) => asTrimmedText(value);
    const now = typeof options.now === "function" ? options.now : () => new Date().toISOString();
    const createId = typeof options.createId === "function" ? options.createId : createLocalId;
    const warn = typeof options.warn === "function" ? options.warn : () => {};
    const library = options.library || getFoodReferenceLibrary();
    const language = options.language || "th";
    const referenceById = new Map((Array.isArray(library) ? library : []).map((reference) => [reference.food_id, reference]));

    function normalizeRecord(record) {
      return normalizeMealRecord(record, { normalizeDate });
    }

    // Split only validated JSON containers, retaining every untouched source token.
    // This preserves future records, large numbers, duplicate keys and formatting
    // without round-tripping them through JSON.stringify.
    function splitMembers(source) {
      const text = source.trim();
      if (!text.slice(1, -1).trim()) return [];
      const members = [];
      let start = 1;
      let depth = 0;
      let quoted = false;
      let escaped = false;
      for (let i = 1; i < text.length - 1; i += 1) {
        const char = text[i];
        if (quoted) {
          if (escaped) escaped = false;
          else if (char === "\\") escaped = true;
          else if (char === '"') quoted = false;
        } else if (char === '"') quoted = true;
        else if (char === "{" || char === "[") depth += 1;
        else if (char === "}" || char === "]") depth -= 1;
        else if (char === "," && depth === 0) {
          members.push(text.slice(start, i));
          start = i + 1;
        }
      }
      members.push(text.slice(start, -1));
      return members;
    }

    function failure(code) { return { ok: false, code }; }

    function inspectStorage() {
      let raw;
      try {
        if (typeof storage?.getItem !== "function") return { ...failure("storage_read_failed"), records: [] };
        raw = storage.getItem(MEAL_RECORDS_KEY);
        if (raw === null) return { ok: true, raw, entries: [], records: [] };
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return { ...failure("storage_invalid"), records: [] };
        const tokens = splitMembers(raw);
        if (tokens.length !== parsed.length) return { ...failure("storage_invalid"), records: [] };
        const entries = parsed.map((value, index) => ({ value, raw: tokens[index], record: normalizeRecord(value) }));
        const idCounts = new Map();
        entries.forEach((entry) => {
          const id = asTrimmedText(entry.value?.meal_id);
          if (id) idCounts.set(id, (idCounts.get(id) || 0) + 1);
        });
        const records = sortMealRecords(entries.map((entry) => entry.record)
          .filter((record) => record && idCounts.get(record.meal_id) === 1));
        return { ok: true, raw, entries, records };
      } catch (error) {
        warn("Meal storage is unreadable; mutation is blocked.", error);
        return { ...failure(raw === undefined ? "storage_read_failed" : "storage_invalid"), records: [] };
      }
    }

    function getMealRecords() {
      return inspectStorage().records;
    }

    // Whole-store replacement cannot establish intent for omitted historical data.
    // Mutations use the targeted create/update/delete paths below instead.
    function setMealRecords() { return failure("bulk_write_disabled"); }

    function getMealsForDate(date) {
      const normalizedDate = asTrimmedText(normalizeDate(date));
      return getMealRecords().filter((meal) => meal.date === normalizedDate);
    }

    function persist(state, tokens, result = {}) {
      if (!state.ok) return failure(state.code);
      try {
        if (typeof storage?.setItem !== "function") return failure("storage_write_failed");
        if (storage.getItem(MEAL_RECORDS_KEY) !== state.raw) return failure("storage_changed");
        storage.setItem(MEAL_RECORDS_KEY, `[${tokens.join(",")}]`);
        return { ok: true, ...result };
      } catch (error) {
        warn("Unable to save meal records; the draft is retained.", error);
        return failure("storage_write_failed");
      }
    }

    function createMeal(input = {}) {
      const state = inspectStorage();
      if (!state.ok) return failure(state.code);
      if (typeof input.meal_name !== "string" || !input.meal_name.trim()) return failure("name_required");
      if (!isValidMealTime(asTrimmedText(input.time))) return failure("invalid_time");
      if (input.items?.length || asTrimmedText(input.named_dish_id)) return failure("historical_fields_read_only");
      const timestamp = now();
      const meal = normalizeRecord({
        record_schema_version: MEAL_RECORD_SCHEMA_VERSION,
        meal_id: asTrimmedText(input.meal_id) || createId("meal"),
        date: input.date,
        meal_name: input.meal_name,
        meal_type: input.meal_type,
        meal_label: input.meal_label,
        custom_meal_label: input.custom_meal_label,
        time: input.time,
        items: [],
        created_at: timestamp,
        updated_at: timestamp
      });
      if (!meal) return failure("invalid_record");
      if (state.entries.some((entry) => asTrimmedText(entry.value?.meal_id) === meal.meal_id)) return failure("duplicate_id");
      return persist(state, [...state.entries.map((entry) => entry.raw), JSON.stringify(meal)], { meal });
    }

    function findTarget(state, mealId) {
      const matches = state.entries.filter((entry) => asTrimmedText(entry.value?.meal_id) === mealId);
      return matches.length === 1 && matches[0].record ? matches[0] : null;
    }

    function patchRecord(raw, patch) {
      const seen = new Set();
      const members = splitMembers(raw).map((member) => {
        const match = member.match(/^\s*("(?:\\.|[^"\\])*")\s*:/);
        if (!match) throw new Error("Unreconcilable record property");
        const key = JSON.parse(match[1]);
        if (seen.has(key)) throw new Error("Ambiguous duplicate record property");
        seen.add(key);
        return Object.prototype.hasOwnProperty.call(patch, key) ? `${JSON.stringify(key)}:${JSON.stringify(patch[key])}` : member;
      });
      for (const [key, value] of Object.entries(patch)) {
        if (!seen.has(key)) members.push(`${JSON.stringify(key)}:${JSON.stringify(value)}`);
      }
      return `{${members.join(",")}}`;
    }

    function updateMeal(mealId, updates = {}) {
      const state = inspectStorage();
      if (!state.ok) return failure(state.code);
      const target = findTarget(state, mealId);
      if (!target) return failure("record_not_editable");
      const patch = { ...updates };
      for (const key of ["meal_id", "created_at", "record_schema_version"]) delete patch[key];
      if (Object.prototype.hasOwnProperty.call(patch, "meal_name")) {
        if (typeof patch.meal_name !== "string" || !patch.meal_name.trim()) return failure("name_required");
        patch.meal_name = patch.meal_name.trim();
      }
      if (Object.prototype.hasOwnProperty.call(patch, "time") && !isValidMealTime(asTrimmedText(patch.time))) return failure("invalid_time");
      if (Object.prototype.hasOwnProperty.call(patch, "time")) patch.time = asTrimmedText(patch.time);
      patch.updated_at = now();
      try {
        const nextRaw = patchRecord(target.raw, patch);
        const meal = normalizeRecord(JSON.parse(nextRaw));
        if (!meal) return failure("invalid_record");
        return persist(state, state.entries.map((entry) => entry === target ? nextRaw : entry.raw), { meal });
      } catch (error) {
        warn("Historical meal could not be safely reconciled; no data was written.", error);
        return failure("record_not_editable");
      }
    }

    function deleteMeal(mealId) {
      const state = inspectStorage();
      if (!state.ok) return failure(state.code);
      const target = findTarget(state, mealId);
      if (!target) return failure("record_not_editable");
      return persist(state, state.entries.filter((entry) => entry !== target).map((entry) => entry.raw), { mealId });
    }

    function addMealItem(mealId, input = {}) {
      const reference = referenceById.get(asTrimmedText(input.food_id));
      const item = createMealItem(input, reference, { createId, language });
      if (!item) return failure("invalid_item");
      return updateMeal(mealId, (function appendItem(meal) {
        return { items: [...meal.items, item] };
      })(getMealRecords().find((meal) => meal.meal_id === mealId) || { items: [] }));
    }

    function updateMealItem(mealId, mealItemId, updates = {}) {
      const meal = getMealRecords().find((record) => record.meal_id === mealId);
      const existingItem = meal?.items?.find((item) => item.meal_item_id === mealItemId);
      if (!meal || !existingItem) return failure("invalid_item");
      const nextFoodId = asTrimmedText(updates.food_id) || existingItem.food_id;
      const reference = referenceById.get(nextFoodId);
      const displayNameSnapshot = Object.prototype.hasOwnProperty.call(updates, "display_name_snapshot")
        ? updates.display_name_snapshot
        : nextFoodId === existingItem.food_id
          ? existingItem.display_name_snapshot
          : "";
      const item = createMealItem({
        ...existingItem,
        ...updates,
        display_name_snapshot: displayNameSnapshot,
        meal_item_id: existingItem.meal_item_id,
        food_id: nextFoodId
      }, reference, { createId, language });
      if (!item) return failure("invalid_item");
      return updateMeal(mealId, {
        items: meal.items.map((current) => current.meal_item_id === mealItemId ? item : current)
      });
    }

    function deleteMealItem(mealId, mealItemId) {
      const meal = getMealRecords().find((record) => record.meal_id === mealId);
      if (!meal) return failure("record_not_editable");
      const items = meal.items.filter((item) => item.meal_item_id !== mealItemId);
      if (items.length === meal.items.length || !items.length) return failure("invalid_item");
      return updateMeal(mealId, { items });
    }

    return Object.freeze({
      getMealRecords,
      inspectStorage,
      setMealRecords,
      getMealsForDate,
      createMeal,
      updateMeal,
      deleteMeal,
      createMealItem: (input) => createMealItem(input, referenceById.get(asTrimmedText(input?.food_id)), { createId, language }),
      addMealItem,
      updateMealItem,
      deleteMealItem
    });
  }

  const api = Object.freeze({
    MEAL_RECORDS_KEY,
    MEAL_SCHEMA_VERSION,
    MEAL_RECORD_SCHEMA_VERSION,
    isValidMealTime,
    MEAL_TYPES,
    PORTION_MULTIPLIERS,
    ESTIMATE_BASES,
    getFoodReferenceLibrary,
    getFoodReferenceById,
    getNamedDishReferenceLibrary,
    getNamedDishReferenceById,
    getNamedDishCandidates,
    evaluateNamedDishConsistency,
    getFoodDisplayName,
    normalizeFoodReference,
    normalizeSodiumRange,
    createLocalId,
    createMealItem,
    normalizeMealItem,
    normalizeMealRecord,
    sortMealRecords,
    createMealStore,
    deriveMealEstimate,
    deriveDailyMealSummary,
    buildMealReflectionContext,
    buildSavedMealReflectionContext
  });

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  globalScope.MHBMealRuntime = api;
})(typeof window !== "undefined" ? window : globalThis);
