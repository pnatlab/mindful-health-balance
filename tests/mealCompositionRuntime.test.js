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
  assert.equal(mealRuntime.getFoodReferenceLibrary().length, 26);
  assert.equal(mealRuntime.getFoodReferenceById("fish_sauce").is_condiment, true);
  assert.equal(mealRuntime.getFoodReferenceById("rice").sodium_estimate_min_mg, null);
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
  const secondMeal = store.createMeal({ date: TEST_DATE, meal_label: "dinner", items: [largeItem] });
  const otherDateMeal = store.createMeal({ date: OTHER_DATE, meal_label: "unnamed", items: [smallItem] });
  assert.equal(store.getMealRecords().length, 3);
  assert.equal(store.getMealsForDate(TEST_DATE).length, 2);
  assert.equal(store.getMealsForDate(OTHER_DATE).length, 1);

  const updatedMeal = store.updateMeal(firstMeal.meal_id, { meal_note: "kept as plain text" });
  assert.equal(updatedMeal.meal_id, firstMeal.meal_id);
  assert.equal(updatedMeal.meal_note, "kept as plain text");
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
  assert.equal(Object.isFrozen(mealRuntime.getFoodReferenceById("rice")), true);
  assert.equal(mealRuntime.getFoodReferenceById("rice").sodium_estimate_min_mg, null);
}

run();
console.log("Meal Composition runtime tests passed.");
