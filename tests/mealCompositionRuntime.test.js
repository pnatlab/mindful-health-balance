const assert = require("node:assert/strict");
const mealRuntime = require("../js/mealCompositionRuntime.js");

const TEST_DATE = "2026-08-26";
const OTHER_DATE = "2026-08-27";

function createReference(overrides = {}) {
  return {
    food_id: "known_test_food",
    display_name_th: "อาหารทดสอบ",
    display_name_en: "Test food",
    category: "animal_protein",
    default_serving_label: "1 serving",
    default_serving_amount: 1,
    default_serving_unit: "serving",
    sodium_estimate_min_mg: 10,
    sodium_estimate_max_mg: 20,
    sodium_confidence: "high",
    source_type: "reference_database",
    source_reference: "test fixture",
    is_animal_protein: true,
    schema_version: "1",
    ...overrides
  };
}

function createMemoryStorage(initialValue = null) {
  let value = initialValue;
  return {
    getItem() { return value; },
    setItem(_key, nextValue) { value = nextValue; },
    snapshot() { return value; }
  };
}

function createStore(storage, library, warnings) {
  let id = 0;
  return mealRuntime.createMealStore(storage, {
    library,
    normalizeDate: (value) => String(value || "").trim(),
    createId: (prefix) => `${prefix}_${++id}`,
    now: () => "2026-08-26T12:00:00.000Z",
    warn: (message) => warnings.push(message)
  });
}

function run() {
  const productionLibrary = mealRuntime.getFoodReferenceLibrary();
  const evidenceIds = new Set(["egg", "fish_sauce", "soy_sauce", "oyster_sauce"]);
  const eggReference = mealRuntime.getFoodReferenceById("egg");
  const fishSauceReference = mealRuntime.getFoodReferenceById("fish_sauce");
  const soySauceReference = mealRuntime.getFoodReferenceById("soy_sauce");
  const oysterSauceReference = mealRuntime.getFoodReferenceById("oyster_sauce");
  const leanPorkReference = mealRuntime.getFoodReferenceById("pork_lean");
  const fattyPorkReference = mealRuntime.getFoodReferenceById("pork_fatty");
  const crispyPorkReference = mealRuntime.getFoodReferenceById("pork_crispy");

  assert.equal(productionLibrary.length, 28);
  assert.equal(new Set(productionLibrary.map((reference) => reference.food_id)).size, productionLibrary.length, "Food Reference IDs remain unique");
  assert.deepEqual(productionLibrary.filter((reference) => reference.sodium_estimate_min_mg !== null).map((reference) => reference.food_id), ["egg", "fish_sauce", "soy_sauce", "oyster_sauce"]);
  assert.deepEqual([leanPorkReference.food_id, leanPorkReference.display_name_th, leanPorkReference.display_name_en, leanPorkReference.display_name_zh], ["pork_lean", "หมูไม่ติดมัน", "Lean pork", "瘦猪肉"], "the existing lean-pork identity remains unchanged");
  assert.deepEqual([fattyPorkReference.food_id, fattyPorkReference.display_name_th, fattyPorkReference.display_name_en, fattyPorkReference.display_name_zh], ["pork_fatty", "หมูติดมัน", "Fatty pork", "肥猪肉"]);
  assert.deepEqual([crispyPorkReference.food_id, crispyPorkReference.display_name_th, crispyPorkReference.display_name_en, crispyPorkReference.display_name_zh], ["pork_crispy", "หมูกรอบ", "Crispy pork", "脆皮猪肉"]);
  [fattyPorkReference, crispyPorkReference].forEach((reference) => {
    assert.equal(reference.category, "animal_protein");
    assert.equal(reference.is_animal_protein, true);
    assert.deepEqual([reference.sodium_estimate_min_mg, reference.sodium_estimate_max_mg, reference.sodium_confidence, reference.source_type], [null, null, "unknown", "unknown"], "new pork labels carry no automatic sodium evidence");
  });
  assert.ok(mealRuntime.createMealItem({ food_id: "pork_fatty" }), "fatty pork uses the ordinary Meal Item contract");
  assert.ok(mealRuntime.createMealItem({ food_id: "pork_crispy" }), "crispy pork uses the ordinary Meal Item contract");
  assert.deepEqual([eggReference.sodium_estimate_min_mg, eggReference.sodium_estimate_max_mg, eggReference.sodium_confidence], [60, 62, "high"]);
  assert.deepEqual([eggReference.default_serving_label, eggReference.default_serving_amount, eggReference.default_serving_unit, eggReference.preparation_default], ["1 large boiled egg", 1, "egg", "boiled"]);
  assert.match(eggReference.source_reference, /USDA FoodData Central FDC 173424/);
  assert.match(eggReference.source_reference, /Ramathibodi\/Mahidol 2025/);
  assert.deepEqual([fishSauceReference.sodium_estimate_min_mg, fishSauceReference.sodium_estimate_max_mg, fishSauceReference.sodium_confidence], [1410, 1480, "medium"]);
  assert.deepEqual([fishSauceReference.default_serving_label, fishSauceReference.default_serving_amount, fishSauceReference.default_serving_unit], ["1 tbsp", 1, "tbsp"]);
  assert.match(fishSauceReference.source_reference, /USDA FoodData Central FDC 174531/);
  assert.match(fishSauceReference.source_reference, /Thai Kitchen Premium Fish Sauce/);
  assert.deepEqual([soySauceReference.sodium_estimate_min_mg, soySauceReference.sodium_estimate_max_mg, soySauceReference.sodium_confidence], [879, 920, "medium"]);
  assert.deepEqual([soySauceReference.default_serving_label, soySauceReference.default_serving_amount, soySauceReference.default_serving_unit], ["1 tbsp", 1, "tbsp"]);
  assert.match(soySauceReference.source_reference, /USDA FoodData Central FDC 174277/);
  assert.match(soySauceReference.source_reference, /Kikkoman regular soy sauce/);
  assert.deepEqual([oysterSauceReference.sodium_estimate_min_mg, oysterSauceReference.sodium_estimate_max_mg, oysterSauceReference.sodium_confidence], [490, 870, "low"]);
  assert.deepEqual([oysterSauceReference.default_serving_label, oysterSauceReference.default_serving_amount, oysterSauceReference.default_serving_unit], ["1 tbsp", 1, "tbsp"]);
  assert.match(oysterSauceReference.source_reference, /USDA FoodData Central FDC 174529/);
  assert.match(oysterSauceReference.source_reference, /Lee Kum Kee Panda Oyster Sauce specification/);
  [eggReference, fishSauceReference, soySauceReference, oysterSauceReference].forEach((reference) => {
    assert.equal(reference.source_type, "reference_database");
  });
  productionLibrary.filter((reference) => !evidenceIds.has(reference.food_id)).forEach((reference) => {
    assert.deepEqual([reference.sodium_estimate_min_mg, reference.sodium_estimate_max_mg, reference.sodium_confidence, reference.source_type, reference.source_reference], [null, null, "unknown", "unknown", ""]);
  });
  productionLibrary.forEach((reference) => {
    assert.equal(Object.keys(reference).some((key) => /score|good|bad|healthy|cheat|medical|target/i.test(key)), false);
    assert.equal(Object.hasOwn(reference, "sodium_daily_limit_mg"), false);
  });

  const eggItem = mealRuntime.createMealItem({ food_id: "egg", portion_label: "regular" });
  const fishSauceHalfItem = mealRuntime.createMealItem({ food_id: "fish_sauce", portion_label: "small" });
  const fishSauceItem = mealRuntime.createMealItem({ food_id: "fish_sauce", portion_label: "regular" });
  const fishSauceLargeItem = mealRuntime.createMealItem({ food_id: "fish_sauce", portion_label: "large" });
  const soySauceItem = mealRuntime.createMealItem({ food_id: "soy_sauce", portion_label: "regular" });
  const oysterSauceItem = mealRuntime.createMealItem({ food_id: "oyster_sauce", portion_label: "regular" });
  const riceUnknownItem = mealRuntime.createMealItem({ food_id: "rice", portion_label: "regular" });
  assert.deepEqual([fishSauceHalfItem.sodium_estimate_min_mg, fishSauceHalfItem.sodium_estimate_max_mg], [705, 740]);
  assert.deepEqual([fishSauceLargeItem.sodium_estimate_min_mg, fishSauceLargeItem.sodium_estimate_max_mg], [2115, 2220]);
  assert.equal(mealRuntime.deriveMealEstimate({ items: [eggItem] }).sodium_estimate_coverage, "complete");
  assert.equal(mealRuntime.deriveMealEstimate({ items: [eggItem] }).estimate_confidence, "high");
  assert.equal(mealRuntime.deriveMealEstimate({ items: [soySauceItem] }).estimate_confidence, "medium");
  assert.equal(mealRuntime.deriveMealEstimate({ items: [oysterSauceItem] }).estimate_confidence, "low");
  assert.equal(mealRuntime.deriveMealEstimate({ items: [eggItem, soySauceItem] }).estimate_confidence, "medium");
  assert.equal(mealRuntime.deriveMealEstimate({ items: [eggItem, oysterSauceItem] }).estimate_confidence, "low");
  assert.equal(mealRuntime.deriveMealEstimate({ items: [eggItem, riceUnknownItem] }).sodium_estimate_coverage, "partial");
  assert.equal(mealRuntime.deriveMealEstimate({ items: [eggItem, riceUnknownItem] }).estimate_confidence, "unknown");
  assert.equal(mealRuntime.deriveMealEstimate({ items: [riceUnknownItem] }).sodium_estimate_coverage, "unknown");
  assert.deepEqual(mealRuntime.deriveMealEstimate({ items: [fishSauceItem, soySauceItem] }), {
    estimated_sodium_min_mg: 2289,
    estimated_sodium_max_mg: 2400,
    sodium_estimate_coverage: "complete",
    estimate_confidence: "medium",
    estimate_basis: "component_only",
    named_dish_id: "",
    known_item_count: 2,
    unknown_item_count: 0,
    source_basis: null,
    provenance: null
  });
  const productionStore = createStore(createMemoryStorage(), productionLibrary, []);
  const immutableMeal = productionStore.createMeal({ date: TEST_DATE, meal_label: "lunch", items: [productionStore.createMealItem({ food_id: "fish_sauce" })] });
  const immutableItem = immutableMeal.items[0];
  const immutableUpdatedMeal = productionStore.updateMealItem(immutableMeal.meal_id, immutableItem.meal_item_id, { portion_label: "small", preparation: "soup" });
  assert.deepEqual([immutableUpdatedMeal.items[0].sodium_estimate_min_mg, immutableUpdatedMeal.items[0].sodium_estimate_max_mg], [705, 740]);
  assert.deepEqual([fishSauceReference.sodium_estimate_min_mg, fishSauceReference.sodium_estimate_max_mg, fishSauceReference.source_reference], [1410, 1480, "USDA FoodData Central FDC 174531; Thai Kitchen Premium Fish Sauce (McCormick)."]);
  const evidenceDailySummary = mealRuntime.deriveDailyMealSummary(TEST_DATE, [
    { meal_id: "evidence_egg", date: TEST_DATE, meal_label: "breakfast", items: [eggItem], created_at: "2026-08-26T07:00:00.000Z", updated_at: "2026-08-26T07:00:00.000Z" },
    { meal_id: "evidence_condiments", date: TEST_DATE, meal_label: "lunch", items: [fishSauceHalfItem, soySauceItem], created_at: "2026-08-26T12:00:00.000Z", updated_at: "2026-08-26T12:00:00.000Z" },
    { meal_id: "evidence_partial", date: TEST_DATE, meal_label: "dinner", items: [oysterSauceItem, riceUnknownItem], created_at: "2026-08-26T18:00:00.000Z", updated_at: "2026-08-26T18:00:00.000Z" }
  ]);
  assert.deepEqual([evidenceDailySummary.estimated_sodium_min_mg, evidenceDailySummary.estimated_sodium_max_mg, evidenceDailySummary.sodium_estimate_coverage, evidenceDailySummary.estimate_confidence], [2134, 2592, "partial", "unknown"]);

  const animal = createReference();
  const vegetable = createReference({
    food_id: "vegetable_test_food",
    display_name_th: "ผักทดสอบ",
    display_name_en: "Test vegetable",
    category: "vegetable",
    is_animal_protein: false
  });
  const condiment = createReference({
    food_id: "condiment_test_food",
    display_name_th: "เครื่องปรุงทดสอบ",
    display_name_en: "Test condiment",
    category: "condiment",
    is_animal_protein: false,
    is_condiment: true
  });
  const unknown = {
    ...createReference({ food_id: "unknown_test_food", display_name_th: "อาหารไม่ทราบค่า", display_name_en: "Unknown food" }),
    sodium_estimate_min_mg: null,
    sodium_estimate_max_mg: null,
    sodium_confidence: "unknown",
    source_type: "unknown"
  };
  const library = [animal, vegetable, condiment, unknown];
  const warnings = [];
  const storage = createMemoryStorage();
  const store = createStore(storage, library, warnings);

  assert.deepEqual(store.getMealRecords(), []);
  storage.setItem(mealRuntime.MEAL_RECORDS_KEY, "{bad json");
  assert.deepEqual(store.getMealRecords(), []);
  assert.equal(warnings.length, 1);
  storage.setItem(mealRuntime.MEAL_RECORDS_KEY, JSON.stringify([]));

  const smallItem = store.createMealItem({ food_id: animal.food_id, portion_label: "small" });
  const regularItem = store.createMealItem({ food_id: animal.food_id, portion_label: "regular" });
  const largeItem = store.createMealItem({ food_id: animal.food_id, portion_label: "large" });
  const customItem = store.createMealItem({ food_id: animal.food_id, portion_label: "custom", serving_multiplier: 2 });
  assert.equal(smallItem.serving_multiplier, 0.5);
  assert.equal(regularItem.serving_multiplier, 1);
  assert.equal(largeItem.serving_multiplier, 1.5);
  assert.equal(customItem.serving_multiplier, 2);
  assert.equal(store.createMealItem({ food_id: animal.food_id, portion_label: "custom", serving_multiplier: 0 }), null);

  const firstMeal = store.createMeal({ date: TEST_DATE, meal_label: "lunch", items: [regularItem] });
  const secondMeal = store.createMeal({
    date: TEST_DATE,
    meal_label: "dinner",
    meal_type: "stir_fried",
    condiment_knowledge: "unknown",
    items: [largeItem]
  });
  const otherDateMeal = store.createMeal({ date: OTHER_DATE, meal_label: "unnamed", items: [smallItem] });
  assert.equal(store.getMealRecords().length, 3);
  assert.equal(store.getMealsForDate(TEST_DATE).length, 2);
  assert.equal(store.getMealsForDate(OTHER_DATE).length, 1);
  assert.equal(firstMeal.meal_type, "unspecified");
  assert.equal(firstMeal.named_dish_id, "");
  assert.equal(firstMeal.condiment_knowledge, "");
  assert.equal(secondMeal.meal_type, "stir_fried");
  assert.equal(secondMeal.condiment_knowledge, "unknown");

  const legacyMeal = mealRuntime.normalizeMealRecord({
    meal_id: "legacy_meal",
    date: TEST_DATE,
    meal_label: "unnamed",
    items: [regularItem],
    created_at: "2026-08-26T06:00:00.000Z",
    updated_at: "2026-08-26T06:00:00.000Z"
  });
  assert.equal(legacyMeal.meal_type, "unspecified");
  assert.equal(legacyMeal.named_dish_id, "");
  assert.equal(legacyMeal.condiment_knowledge, "");

  const updatedMeal = store.updateMeal(firstMeal.meal_id, { meal_note: "kept as plain text", meal_type: "broth_based" });
  assert.equal(updatedMeal.meal_id, firstMeal.meal_id);
  assert.equal(updatedMeal.meal_note, "kept as plain text");
  assert.equal(updatedMeal.meal_type, "broth_based");
  assert.equal(store.deleteMeal(otherDateMeal.meal_id), true);
  assert.deepEqual(store.getMealRecords().map((meal) => meal.meal_id), [firstMeal.meal_id, secondMeal.meal_id]);

  const vegetableItem = store.createMealItem({ food_id: vegetable.food_id, portion_label: "regular" });
  const condimentItem = store.createMealItem({ food_id: condiment.food_id, portion_label: "regular" });
  const unknownItem = store.createMealItem({ food_id: unknown.food_id, portion_label: "regular" });
  const afterAdd = store.addMealItem(firstMeal.meal_id, { food_id: vegetable.food_id, portion_label: "regular" });
  assert.equal(afterAdd.items.length, 2);
  const addedVegetableItem = afterAdd.items.find((item) => item.food_id === vegetable.food_id);
  const afterItemUpdate = store.updateMealItem(firstMeal.meal_id, addedVegetableItem.meal_item_id, { preparation: "fried" });
  assert.equal(afterItemUpdate.items.find((item) => item.meal_item_id === addedVegetableItem.meal_item_id).preparation, "fried");
  const afterFoodChange = store.updateMealItem(firstMeal.meal_id, addedVegetableItem.meal_item_id, { food_id: animal.food_id });
  assert.equal(afterFoodChange.items.find((item) => item.meal_item_id === addedVegetableItem.meal_item_id).display_name_snapshot, animal.display_name_th);
  const secondWithItems = store.updateMeal(secondMeal.meal_id, { items: [regularItem, vegetableItem, condimentItem, unknownItem] });
  const changedItemMeal = store.updateMealItem(secondMeal.meal_id, vegetableItem.meal_item_id, { preparation: "fried" });
  assert.equal(changedItemMeal.items.find((item) => item.meal_item_id === vegetableItem.meal_item_id).preparation, "fried");
  const afterItemDelete = store.deleteMealItem(secondMeal.meal_id, condimentItem.meal_item_id);
  assert.equal(afterItemDelete.items.some((item) => item.meal_item_id === condimentItem.meal_item_id), false);

  const completeEstimate = mealRuntime.deriveMealEstimate({ items: [regularItem] });
  const partialEstimate = mealRuntime.deriveMealEstimate({ items: [regularItem, unknownItem] });
  const unknownEstimate = mealRuntime.deriveMealEstimate({ items: [unknownItem] });
  assert.equal(completeEstimate.sodium_estimate_coverage, "complete");
  assert.equal(completeEstimate.estimate_confidence, "high");
  assert.equal(partialEstimate.sodium_estimate_coverage, "partial");
  assert.equal(partialEstimate.estimate_confidence, "unknown");
  assert.equal(unknownEstimate.sodium_estimate_coverage, "unknown");
  assert.equal(mealRuntime.normalizeMealItem({ ...regularItem, sodium_estimate_min_mg: 30, sodium_estimate_max_mg: 20 }), null);

  const futureMeal = mealRuntime.normalizeMealRecord({
    meal_id: "future_meal",
    date: OTHER_DATE,
    meal_label: "unnamed",
    items: [regularItem],
    created_at: "2026-08-27T00:00:00.000Z",
    updated_at: "2026-08-27T00:00:00.000Z"
  });
  const summary = mealRuntime.deriveDailyMealSummary(TEST_DATE, [...store.getMealRecords(), futureMeal], library);
  assert.equal(summary.recorded_meal_count, 2);
  assert.equal(summary.animal_protein_meals, 2);
  assert.equal(summary.vegetable_present_meals, 1);
  assert.equal(summary.fried_food_meals, 2);
  assert.equal(summary.meals_with_recorded_condiments, 0);
  assert.equal(summary.sodium_estimate_coverage, "partial");
  assert.equal(summary.unknown_estimate_item_count, 1);

  const context = mealRuntime.buildMealReflectionContext(TEST_DATE, store.getMealRecords(), library);
  assert.equal(context.hasMealData, true);
  assert.equal(context.recordedMealCount, 2);
  assert.equal(Object.hasOwn(context, "meal_note"), false);
  assert.equal(Object.hasOwn(context, "items"), false);
  assert.equal(Object.keys(context).some((key) => /score|good|bad|healthy|cheat/i.test(key)), false);

  const malformedRecord = { meal_id: "bad", date: TEST_DATE, items: [] };
  storage.setItem(mealRuntime.MEAL_RECORDS_KEY, JSON.stringify([store.getMealRecords()[0], malformedRecord]));
  assert.equal(store.getMealRecords().length, 1);
  assert.equal(store.getMealRecords()[0].meal_id, firstMeal.meal_id);
  assert.equal(warnings.some((message) => message.includes("Malformed meal records")), true);

  storage.setItem(mealRuntime.MEAL_RECORDS_KEY, JSON.stringify([secondWithItems]));
  const reloadedStore = createStore(storage, library, []);
  assert.equal(reloadedStore.getMealRecords()[0].meal_id, secondMeal.meal_id);
  assert.equal(reloadedStore.getMealRecords()[0].meal_type, "stir_fried");
  assert.equal(reloadedStore.getMealRecords()[0].condiment_knowledge, "unknown");
  assert.equal(Object.isFrozen(mealRuntime.getFoodReferenceById("rice")), true);
  assert.equal(Object.isFrozen(fishSauceReference), true);
  assert.equal(mealRuntime.getFoodReferenceById("rice").sodium_estimate_min_mg, null);

  const namedDishLibrary = mealRuntime.getNamedDishReferenceLibrary();
  assert.equal(namedDishLibrary.length, 2);
  assert.deepEqual(namedDishLibrary.map((reference) => reference.dish_id), ["fried_rice_pork_vegetable_egg", "fried_rice_vegetable"]);
  assert.equal(mealRuntime.getNamedDishReferenceById("green_curry_chicken"), null);
  namedDishLibrary.forEach((reference) => {
    assert.equal(reference.estimate_basis, "dish_inclusive");
    assert.equal(reference.confidence, "medium");
    assert.equal(reference.scaling_allowed, false);
    assert.equal(reference.source_type, "reference_database");
    assert.match(reference.source_reference, /Thai Food Composition Database v3/);
    assert.match(reference.source_url, /food_id=155[34]/);
    assert.equal(Object.keys(reference).some((key) => /score|good|bad|healthy|cheat|medical|target/i.test(key)), false);
  });
  assert.deepEqual(
    [mealRuntime.getNamedDishReferenceById("fried_rice_pork_vegetable_egg").sodium_estimate_min_mg, mealRuntime.getNamedDishReferenceById("fried_rice_pork_vegetable_egg").sodium_estimate_max_mg],
    [141, 141]
  );
  assert.deepEqual(
    [mealRuntime.getNamedDishReferenceById("fried_rice_vegetable").sodium_estimate_min_mg, mealRuntime.getNamedDishReferenceById("fried_rice_vegetable").sodium_estimate_max_mg],
    [268, 268]
  );

  const namedDishMeal = {
    meal_id: "named_dish_meal",
    date: TEST_DATE,
    meal_label: "lunch",
    named_dish_id: "fried_rice_pork_vegetable_egg",
    items: [riceUnknownItem, regularItem, eggItem, fishSauceItem],
    created_at: "2026-08-26T12:00:00.000Z",
    updated_at: "2026-08-26T12:00:00.000Z"
  };
  const namedDishEstimate = mealRuntime.deriveMealEstimate(namedDishMeal);
  assert.deepEqual(
    [namedDishEstimate.estimated_sodium_min_mg, namedDishEstimate.estimated_sodium_max_mg, namedDishEstimate.sodium_estimate_coverage, namedDishEstimate.estimate_confidence, namedDishEstimate.estimate_basis],
    [141, 141, "partial", "medium", "dish_inclusive"]
  );
  assert.deepEqual(namedDishEstimate.source_basis, { label: "100 g edible portion", amount: 100, unit: "g", scaling_allowed: false });
  assert.equal(namedDishEstimate.provenance.matched_identity, "fried_rice_pork_vegetable_egg");
  assert.match(namedDishEstimate.provenance.source_url, /food_id=1554/);
  assert.equal(namedDishEstimate.estimated_sodium_max_mg, 141);

  const namedDishCandidateItems = ["rice", "pork_lean", "mixed_vegetables", "egg"]
    .map((foodId) => mealRuntime.createMealItem({ food_id: foodId }));
  assert.deepEqual(
    mealRuntime.getNamedDishCandidates({ meal_type: "stir_fried", items: namedDishCandidateItems }).map((candidate) => candidate.candidate_id),
    ["fried_rice_pork_vegetable_egg"]
  );
  assert.deepEqual(mealRuntime.getNamedDishCandidates({ meal_type: "stir_fried", items: [mealRuntime.createMealItem({ food_id: "rice" })] }), []);
  assert.deepEqual(mealRuntime.getNamedDishCandidates({ meal_type: "stir_fried", items: namedDishCandidateItems }).map((candidate) => candidate.match_status), ["compatible"]);
  assert.equal(mealRuntime.getNamedDishCandidates({ meal_type: "stir_fried", items: namedDishCandidateItems })[0].reason, "structured_components");

  const compatibleNamedDish = {
    named_dish_id: "fried_rice_vegetable",
    meal_type: "stir_fried",
    items: [mealRuntime.createMealItem({ food_id: "rice" }), mealRuntime.createMealItem({ food_id: "mixed_vegetables" })]
  };
  assert.equal(mealRuntime.evaluateNamedDishConsistency(compatibleNamedDish).status, "compatible");
  assert.equal(mealRuntime.deriveMealEstimate(compatibleNamedDish).estimate_basis, "dish_inclusive");
  const softConflictMeal = { ...compatibleNamedDish, meal_type: "boiled" };
  assert.equal(mealRuntime.evaluateNamedDishConsistency(softConflictMeal).status, "soft_conflict");
  assert.equal(mealRuntime.evaluateNamedDishConsistency(softConflictMeal).evidence_usable, true);
  assert.equal(mealRuntime.deriveMealEstimate(softConflictMeal).estimate_basis, "dish_inclusive");
  const evidenceConflictMeal = {
    ...compatibleNamedDish,
    items: [...compatibleNamedDish.items, mealRuntime.createMealItem({ food_id: "pork_lean" }), mealRuntime.createMealItem({ food_id: "egg" })]
  };
  const evidenceConflict = mealRuntime.evaluateNamedDishConsistency(evidenceConflictMeal);
  assert.equal(evidenceConflict.status, "evidence_conflict");
  assert.equal(evidenceConflict.evidence_usable, false);
  assert.deepEqual(evidenceConflict.conflicting_components, ["pork_lean", "egg"]);
  assert.equal(mealRuntime.deriveMealEstimate(evidenceConflictMeal).estimate_basis, "component_only");
  assert.deepEqual([mealRuntime.deriveMealEstimate(evidenceConflictMeal).estimated_sodium_min_mg, mealRuntime.deriveMealEstimate(evidenceConflictMeal).estimated_sodium_max_mg], [60, 62]);
  assert.equal(mealRuntime.deriveMealEstimate(compatibleNamedDish).estimate_basis, "dish_inclusive");

  const mealTypeOnlyEstimate = mealRuntime.deriveMealEstimate({ meal_type: "stir_fried", items: [regularItem] });
  const componentsOnlyEstimate = mealRuntime.deriveMealEstimate({ items: [regularItem, eggItem] });
  const unsupportedDishEstimate = mealRuntime.deriveMealEstimate({ named_dish_id: "green_curry_chicken", items: [eggItem] });
  assert.equal(mealTypeOnlyEstimate.estimate_basis, "component_only");
  assert.equal(componentsOnlyEstimate.estimate_basis, "component_only");
  assert.deepEqual([unsupportedDishEstimate.estimated_sodium_min_mg, unsupportedDishEstimate.estimated_sodium_max_mg, unsupportedDishEstimate.estimate_basis], [60, 62, "component_only"]);
  assert.deepEqual([mealRuntime.deriveMealEstimate({ named_dish_id: "unapproved_dish", items: [riceUnknownItem] }).sodium_estimate_coverage, mealRuntime.deriveMealEstimate({ named_dish_id: "unapproved_dish", items: [riceUnknownItem] }).estimate_basis], ["unknown", "unknown"]);

  ["small", "regular", "large"].forEach((portionLabel) => {
    const item = mealRuntime.createMealItem({ food_id: "fish_sauce", portion_label: portionLabel });
    const estimate = mealRuntime.deriveMealEstimate({ ...namedDishMeal, items: [item] });
    assert.deepEqual([estimate.estimated_sodium_min_mg, estimate.estimated_sodium_max_mg], [141, 141]);
  });
  const customDishEstimate = mealRuntime.deriveMealEstimate({
    ...namedDishMeal,
    items: [mealRuntime.createMealItem({ food_id: "fish_sauce", portion_label: "custom", serving_multiplier: 2 })]
  });
  assert.deepEqual([customDishEstimate.estimated_sodium_min_mg, customDishEstimate.estimated_sodium_max_mg], [141, 141]);

  const namedDishDailySummary = mealRuntime.deriveDailyMealSummary(TEST_DATE, [
    namedDishMeal,
    { ...namedDishMeal, meal_id: "named_dish_vegetable", named_dish_id: "fried_rice_vegetable", items: [vegetableItem] },
    { ...namedDishMeal, meal_id: "component_meal", named_dish_id: "", items: [eggItem] }
  ]);
  assert.deepEqual(
    [namedDishDailySummary.estimated_sodium_min_mg, namedDishDailySummary.estimated_sodium_max_mg, namedDishDailySummary.sodium_estimate_coverage, namedDishDailySummary.estimate_confidence],
    [469, 471, "partial", "medium"]
  );
  assert.deepEqual(namedDishDailySummary.estimate_bases, ["component_only", "dish_inclusive"]);
  assert.deepEqual(namedDishDailySummary.named_dish_ids, ["fried_rice_pork_vegetable_egg", "fried_rice_vegetable"]);
  const namedDishContext = mealRuntime.buildMealReflectionContext(TEST_DATE, [namedDishMeal]);
  assert.deepEqual(namedDishContext.estimateBases, ["dish_inclusive"]);
  assert.deepEqual(namedDishContext.namedDishIds, ["fried_rice_pork_vegetable_egg"]);
  assert.equal(Object.keys(namedDishContext).some((key) => /score|medical|target|high|low/i.test(key)), false);

  const namedDishStorage = createMemoryStorage();
  const namedDishStore = createStore(namedDishStorage, library, []);
  const persistedNamedDish = namedDishStore.createMeal({
    date: TEST_DATE,
    meal_label: "lunch",
    named_dish_id: "fried_rice_vegetable",
    items: [vegetableItem]
  });
  assert.equal(persistedNamedDish.named_dish_id, "fried_rice_vegetable");
  const reloadedNamedDishStore = createStore(namedDishStorage, library, []);
  assert.equal(reloadedNamedDishStore.getMealRecords()[0].named_dish_id, "fried_rice_vegetable");
}

run();
console.log("Meal Composition runtime tests passed.");
