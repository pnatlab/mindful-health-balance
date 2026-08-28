const assert = require("node:assert/strict");
const mealRuntime = require("../js/mealCompositionRuntime.js");
const mealUI = require("../js/mealCompositionUI.js");

const TEST_DATE = "2026-08-26";

function createMemoryStorage() {
  const values = new Map();
  return {
    getItem(key) { return values.get(key) || null; },
    setItem(key, value) { values.set(key, value); },
    snapshot(key) { return values.get(key) || null; }
  };
}

function run() {
  const storage = createMemoryStorage();
  let id = 0;
  const model = mealUI.createMealComposerModel({
    runtime: mealRuntime,
    storage,
    date: TEST_DATE,
    language: "th",
    normalizeDate: (value) => String(value || "").trim(),
    now: () => "2026-08-26T12:00:00.000Z",
    createId: (prefix) => `${prefix}_${++id}`,
    warn: () => {}
  });

  const library = model.getLibrary();
  assert.deepEqual(mealUI.MEAL_TYPE_VISUAL_TONES, {
    unspecified: "cream",
    stir_fried: "leaf-gold",
    boiled: "orange",
    curry: "coral",
    fried: "amber",
    grilled: "terracotta",
    steamed: "soft-yellow",
    broth_based: "broth-green",
    minimally_prepared: "fresh-green",
    other: "warm-neutral"
  }, "Meal Type visual tones remain deterministic and presentation-only");
  assert.deepEqual(Object.keys(mealUI.MEAL_TYPE_VISUAL_TONES), Object.keys(mealUI.TEXT.th.mealTypes), "visual tones cover the existing canonical taxonomy exactly");
  assert.deepEqual(Object.keys(mealUI.MEAL_TYPE_ILLUSTRATIONS), Object.keys(mealUI.TEXT.th.mealTypes), "existing illustrations still cover the same taxonomy");
  let foodDisclosure = mealUI.createFoodItemsDisclosureState(0);
  assert.equal(foodDisclosure.expanded, false, "a new empty composer keeps food items collapsed");
  foodDisclosure = mealUI.reduceFoodItemsDisclosureState(foodDisclosure, { type: "toggle" });
  assert.equal(foodDisclosure.expanded, true, "manual toggle opens food items");
  foodDisclosure = mealUI.reduceFoodItemsDisclosureState(foodDisclosure, { type: "toggle" });
  assert.equal(foodDisclosure.expanded, false, "manual toggle closes food items");
  foodDisclosure = mealUI.reduceFoodItemsDisclosureState(foodDisclosure, { type: "meal_type_selected" });
  assert.equal(foodDisclosure.expanded, true, "meal type selection opens food items");
  foodDisclosure = mealUI.reduceFoodItemsDisclosureState(foodDisclosure, { type: "unrelated_image_selected" });
  assert.equal(foodDisclosure.expanded, true, "image selection does not collapse an open section");
  foodDisclosure = mealUI.reduceFoodItemsDisclosureState(foodDisclosure, { type: "reset", draftItemCount: 0 });
  assert.equal(foodDisclosure.expanded, false, "a clean reset may return food items to the compact state");
  assert.equal(mealUI.createFoodItemsDisclosureState(2).expanded, true, "a loaded draft keeps food items accessible");
  assert.equal(mealUI.hasMeaningfulVisionReview({ mealTypes: [], components: [] }), false);
  assert.equal(mealUI.hasMeaningfulVisionReview({ mealTypes: [{ mealType: "stir_fried" }], components: [] }), true);
  assert.equal(mealUI.hasMeaningfulVisionReview({ mealTypes: [], components: [{ label: "rice" }] }), true);
  let compositionDisclosure = mealUI.createCurrentCompositionDisclosureState(0);
  assert.equal(compositionDisclosure.expanded, false, "a clean draft keeps current composition collapsed");
  compositionDisclosure = mealUI.reduceCurrentCompositionDisclosureState(compositionDisclosure, { type: "meal_type_selected" });
  assert.equal(compositionDisclosure.expanded, false, "meal type intent does not open current composition");
  compositionDisclosure = mealUI.reduceCurrentCompositionDisclosureState(compositionDisclosure, { type: "unrelated_image_selected" });
  assert.equal(compositionDisclosure.expanded, false, "image selection does not open current composition");
  compositionDisclosure = mealUI.reduceCurrentCompositionDisclosureState(compositionDisclosure, { type: "vision_review_ready" });
  assert.equal(compositionDisclosure.expanded, false, "a Vision proposal does not open current composition");
  compositionDisclosure = mealUI.reduceCurrentCompositionDisclosureState(compositionDisclosure, { type: "draft_item_added", draftItemCount: 1 });
  assert.equal(compositionDisclosure.expanded, true, "the first actual draft item opens current composition");
  compositionDisclosure = mealUI.reduceCurrentCompositionDisclosureState(compositionDisclosure, { type: "toggle" });
  assert.equal(compositionDisclosure.expanded, false, "current composition can be collapsed manually");
  compositionDisclosure = mealUI.reduceCurrentCompositionDisclosureState(compositionDisclosure, { type: "vision_items_applied", draftItemCount: 1 });
  assert.equal(compositionDisclosure.expanded, true, "a human-applied Vision item opens current composition");
  compositionDisclosure = mealUI.reduceCurrentCompositionDisclosureState(compositionDisclosure, { type: "meal_type_selected" });
  assert.equal(compositionDisclosure.expanded, true, "later events do not collapse current composition");
  assert.equal(mealUI.createCurrentCompositionDisclosureState(2).expanded, true, "an existing draft keeps current composition accessible");
  compositionDisclosure = mealUI.reduceCurrentCompositionDisclosureState(compositionDisclosure, { type: "reset", draftItemCount: 0 });
  assert.equal(compositionDisclosure.expanded, false, "a clean reset returns current composition to the compact state");
  for (const language of ["th", "en", "zh"]) {
    assert.ok(mealUI.TEXT[language].foodItemCount(2));
    assert.ok(mealUI.TEXT[language].expandFoodPicker);
    assert.ok(mealUI.TEXT[language].collapseFoodPicker);
  }
  const initialComponents = mealUI.filterFoodReferences(library, { category: "grain", language: "th" });
  assert.equal(initialComponents.results.length, 3);
  assert.equal(initialComponents.remaining, 0);

  const compactAll = mealUI.filterFoodReferences(library, { category: "all", language: "th" });
  assert.equal(compactAll.results.length, mealUI.DEFAULT_COMPONENT_RESULT_LIMIT);
  assert.equal(compactAll.total, library.length);
  assert.equal(compactAll.remaining, library.length - mealUI.DEFAULT_COMPONENT_RESULT_LIMIT);
  assert.equal(mealUI.filterFoodReferences(library, { category: "all", showAll: true }).results.length, library.length);

  const condimentComponents = mealUI.filterFoodReferences(library, { category: "condiment", language: "th" });
  assert.ok(condimentComponents.results.length > 0);
  assert.ok(condimentComponents.results.every((reference) => reference.category === "condiment"));
  const crossCategorySearch = mealUI.filterFoodReferences(library, {
    category: "grain",
    search: "น้ำปลา",
    language: "th"
  });
  assert.deepEqual(crossCategorySearch.results.map((reference) => reference.food_id), ["fish_sauce"]);
  assert.equal(mealUI.filterFoodReferences(library, { category: "all", search: "not-in-library", language: "en" }).total, 0);

  const duplicateSelectionModel = mealUI.createMealComposerModel({
    runtime: mealRuntime,
    storage: createMemoryStorage(),
    date: TEST_DATE,
    language: "th",
    normalizeDate: (value) => String(value || "").trim(),
    now: () => "2026-08-26T11:00:00.000Z",
    createId: (prefix) => `${prefix}_selection_${++id}`,
    warn: () => {}
  });
  const firstRice = duplicateSelectionModel.addFood("rice");
  const secondRice = duplicateSelectionModel.addFood("rice");
  assert.equal(mealUI.countDraftFoodItems(duplicateSelectionModel.getDraft().items, "rice"), 2);
  duplicateSelectionModel.removeDraftItem(firstRice.meal_item_id);
  assert.equal(mealUI.countDraftFoodItems(duplicateSelectionModel.getDraft().items, "rice"), 1);
  duplicateSelectionModel.removeDraftItem(secondRice.meal_item_id);
  assert.equal(mealUI.countDraftFoodItems(duplicateSelectionModel.getDraft().items, "rice"), 0);

  assert.equal(model.getMeals().length, 0);
  assert.deepEqual(mealUI.buildDailyReflectionLines(model.getDailySummary(), "th"), [
    "วันนี้ยังไม่มีมื้อที่บันทึกไว้",
    "ถ้าอยากเก็บภาพคร่าว ๆ ของมื้อไหนไว้ เริ่มจากตรงนี้ได้เลย"
  ]);

  assert.equal(model.getDraft().mealType, "unspecified");
  assert.equal(model.getDraft().condimentKnowledge, "");
  model.setDraftMeta({ mealType: "stir_fried", condimentKnowledge: "unknown" });
  assert.equal(model.getDraft().mealType, "stir_fried");
  assert.equal(model.getDraft().condimentKnowledge, "unknown");
  const draftBeforeDisclosureToggle = model.getDraft();
  foodDisclosure = mealUI.reduceFoodItemsDisclosureState(foodDisclosure, { type: "toggle" });
  assert.deepEqual(model.getDraft(), draftBeforeDisclosureToggle, "collapsing presentation leaves meal type and condiment state untouched");
  compositionDisclosure = mealUI.reduceCurrentCompositionDisclosureState(compositionDisclosure, { type: "toggle" });
  assert.deepEqual(model.getDraft(), draftBeforeDisclosureToggle, "current composition disclosure does not mutate the draft");
  assert.equal(model.getMeals().length, 0, "collapsing presentation does not save a meal");

  const egg = model.addFood("egg");
  const rice = model.addFood("rice");
  const fishSauce = model.addFood("fish_sauce");
  assert.equal(model.getDraft().items.length, 3);
  const composingVisual = mealUI.buildMealVisualModel(model.getDraft().items, mealRuntime, "th");
  assert.equal(composingVisual.itemCount, 3);
  assert.deepEqual(composingVisual.componentNames, ["ไข่", "ข้าว", "น้ำปลา"]);
  assert.deepEqual(composingVisual.tokens.map((token) => token.foodId), ["egg", "rice", "fish_sauce"]);
  const fallbackVisual = mealUI.buildMealVisualModel([{
    food_id: "unmapped_food",
    display_name_snapshot: "รายการที่บันทึกไว้"
  }], mealRuntime, "th");
  assert.equal(fallbackVisual.itemCount, 1);
  assert.equal(fallbackVisual.tokens[0].icon, "·");
  assert.equal(fallbackVisual.tokens[0].name, "รายการที่บันทึกไว้");
  assert.equal(egg.sodium_estimate_min_mg, 60);
  assert.equal(rice.sodium_estimate_min_mg, null);
  assert.equal(fishSauce.sodium_estimate_min_mg, 1410);
  assert.equal(model.getDraftEstimate().sodium_estimate_coverage, "partial");

  const smallFishSauce = model.updateDraftItem(fishSauce.meal_item_id, { portion_label: "small" });
  assert.deepEqual([smallFishSauce.sodium_estimate_min_mg, smallFishSauce.sodium_estimate_max_mg], [705, 740]);
  assert.equal(model.updateDraftItem(rice.meal_item_id, { preparation: "fried" }).preparation, "fried");
  assert.equal(model.updateDraftItem(egg.meal_item_id, { portion_label: "custom", serving_multiplier: 1.2 }).serving_multiplier, 1.2);
  assert.equal(model.updateDraftItem(egg.meal_item_id, { portion_label: "custom", serving_multiplier: 0 }), null);
  model.updateDraftItem(egg.meal_item_id, { portion_label: "regular" });

  model.setDraftMeta({ mealLabel: "lunch", time: "12:30" });
  const firstSave = model.saveDraft();
  assert.equal(firstSave.wasEditing, false);
  assert.equal(model.getMeals().length, 1);
  assert.equal(model.getMeals()[0].meal_id, firstSave.meal.meal_id);
  assert.equal(firstSave.meal.meal_type, "stir_fried");
  assert.equal(firstSave.meal.condiment_knowledge, "unknown");
  assert.equal(model.getDailySummary().recorded_meal_count, 1);
  assert.equal(model.getDailySummary().sodium_estimate_coverage, "partial");
  const firstSavedCard = mealUI.buildSavedMealCardModel(firstSave.meal, mealRuntime, "th");
  assert.equal(firstSavedCard.mealId, firstSave.meal.meal_id);
  assert.equal(firstSavedCard.label, "กลางวัน");
  assert.equal(firstSavedCard.mealType, "ผัด");
  assert.equal(firstSavedCard.visual.itemCount, 3);
  assert.match(mealUI.buildDailyReflectionLines(model.getDailySummary(), "th").join(" "), /1 มื้อที่บันทึกไว้/);
  assert.match(mealUI.buildDailyReflectionLines(model.getDailySummary(), "en").join(" "), /1 recorded meal/);
  assert.match(mealUI.buildDailyReflectionLines(model.getDailySummary(), "zh").join(" "), /1 餐被记录下来/);

  model.addFood("soy_sauce");
  model.setDraftMeta({ mealLabel: "dinner", time: "18:45" });
  const secondSave = model.saveDraft();
  assert.equal(model.getMeals().length, 2);
  assert.equal(model.getDailySummary().recorded_meal_count, 2);
  assert.deepEqual([
    model.getDailySummary().estimated_sodium_min_mg,
    model.getDailySummary().estimated_sodium_max_mg
  ], [1644, 1722]);

  const firstId = firstSave.meal.meal_id;
  model.editMeal(firstId);
  assert.equal(model.getDraft().mealId, firstId);
  assert.equal(model.getDraft().mealType, "stir_fried");
  assert.equal(model.getDraft().condimentKnowledge, "unknown");
  model.setDraftMeta({ mealType: "broth_based", condimentKnowledge: "" });
  const itemCountBeforeEdit = model.getDraft().items.length;
  model.addFood("mixed_vegetables");
  const editSave = model.saveDraft();
  assert.equal(editSave.wasEditing, true);
  assert.equal(editSave.meal.meal_id, firstId);
  assert.equal(editSave.meal.meal_type, "broth_based");
  assert.equal(editSave.meal.condiment_knowledge, "");
  assert.equal(model.getMeals().length, 2);
  assert.equal(editSave.meal.items.length, itemCountBeforeEdit + 1);
  assert.equal(model.getDailySummary().vegetable_present_meals, 1);

  assert.equal(model.deleteMeal(secondSave.meal.meal_id), true);
  assert.equal(model.getMeals().length, 1);
  assert.equal(model.getMeals()[0].meal_id, firstId);
  assert.ok(storage.snapshot(mealRuntime.MEAL_RECORDS_KEY));

  const reloadedModel = mealUI.createMealComposerModel({
    runtime: mealRuntime,
    storage,
    date: TEST_DATE,
    language: "th",
    normalizeDate: (value) => String(value || "").trim(),
    now: () => "2026-08-26T14:00:00.000Z",
    createId: (prefix) => `${prefix}_reload_${++id}`,
    warn: () => {}
  });
  const reloadedCards = reloadedModel.getMeals().map((meal) => mealUI.buildSavedMealCardModel(meal, mealRuntime, "th"));
  assert.equal(reloadedCards.length, 1);
  assert.equal(reloadedCards[0].mealId, firstId);
  assert.equal(reloadedCards[0].visual.itemCount, model.getMeals()[0].items.length);

  const noCondimentStorage = createMemoryStorage();
  const noCondimentModel = mealUI.createMealComposerModel({
    runtime: mealRuntime,
    storage: noCondimentStorage,
    date: TEST_DATE,
    language: "th",
    normalizeDate: (value) => String(value || "").trim(),
    now: () => "2026-08-26T13:00:00.000Z",
    createId: (prefix) => `${prefix}_no_condiment`,
    warn: () => {}
  });
  noCondimentModel.setDraftMeta({ mealType: "curry" });
  noCondimentModel.addFood("egg");
  noCondimentModel.addFood("rice");
  const noCondimentSave = noCondimentModel.saveDraft();
  assert.equal(noCondimentSave.meal.condiment_knowledge, "");
  assert.equal(noCondimentSave.meal.items.some((item) => item.food_id === "fish_sauce"), false);
  assert.deepEqual([
    noCondimentModel.getDailySummary().estimated_sodium_min_mg,
    noCondimentModel.getDailySummary().estimated_sodium_max_mg,
    noCondimentModel.getDailySummary().sodium_estimate_coverage
  ], [60, 62, "partial"]);

  const namedDishModel = mealUI.createMealComposerModel({
    runtime: mealRuntime,
    storage: createMemoryStorage(),
    date: TEST_DATE,
    language: "th",
    normalizeDate: (value) => String(value || "").trim(),
    now: () => "2026-08-26T15:00:00.000Z",
    createId: (prefix) => `${prefix}_named_${++id}`,
    warn: () => {}
  });
  ["rice", "pork_lean", "mixed_vegetables", "egg"].forEach((foodId) => namedDishModel.addFood(foodId));
  assert.deepEqual(namedDishModel.getNamedDishCandidates().map((candidate) => candidate.candidate_id), ["fried_rice_pork_vegetable_egg"]);
  assert.equal(namedDishModel.getDraft().namedDishId, "");
  assert.equal(namedDishModel.getDraftEstimate().estimate_basis, "component_only");
  assert.equal(namedDishModel.confirmNamedDish("fried_rice_pork_vegetable_egg").namedDishId, "fried_rice_pork_vegetable_egg");
  assert.equal(namedDishModel.getDraftEstimate().estimate_basis, "dish_inclusive");
  assert.deepEqual([namedDishModel.getDraftEstimate().estimated_sodium_min_mg, namedDishModel.getDraftEstimate().estimated_sodium_max_mg], [141, 141]);
  const confirmedNamedDishSave = namedDishModel.saveDraft();
  assert.equal(confirmedNamedDishSave.meal.named_dish_id, "fried_rice_pork_vegetable_egg");
  namedDishModel.editMeal(confirmedNamedDishSave.meal.meal_id);
  assert.equal(namedDishModel.getDraft().namedDishId, "fried_rice_pork_vegetable_egg");
  namedDishModel.addFood("chicken");
  assert.equal(namedDishModel.getDraftNamedDishConsistency().status, "evidence_conflict");
  assert.equal(namedDishModel.getDraftEstimate().estimate_basis, "component_only");
  const suspendedEvidenceSave = namedDishModel.saveDraft();
  assert.equal(suspendedEvidenceSave.meal.named_dish_id, "fried_rice_pork_vegetable_egg");
  assert.equal(mealRuntime.deriveMealEstimate(suspendedEvidenceSave.meal).estimate_basis, "component_only");
  namedDishModel.editMeal(suspendedEvidenceSave.meal.meal_id);
  assert.equal(namedDishModel.clearNamedDishConfirmation().namedDishId, "");
  assert.equal(namedDishModel.getDraftEstimate().estimate_basis, "component_only");

  const rejectedCandidateModel = mealUI.createMealComposerModel({
    runtime: mealRuntime,
    storage: createMemoryStorage(),
    date: TEST_DATE,
    language: "th",
    normalizeDate: (value) => String(value || "").trim(),
    now: () => "2026-08-26T16:00:00.000Z",
    createId: (prefix) => `${prefix}_rejected_${++id}`,
    warn: () => {}
  });
  ["rice", "mixed_vegetables"].forEach((foodId) => rejectedCandidateModel.addFood(foodId));
  assert.deepEqual(rejectedCandidateModel.getNamedDishCandidates().map((candidate) => candidate.candidate_id), ["fried_rice_vegetable"]);
  rejectedCandidateModel.rejectNamedDishCandidate("fried_rice_vegetable");
  assert.deepEqual(rejectedCandidateModel.getNamedDishCandidates(), []);
  assert.equal(rejectedCandidateModel.getDraft().namedDishId, "");
  assert.equal(rejectedCandidateModel.saveDraft().meal.named_dish_id, "");

  const evidenceReferences = ["egg", "fish_sauce", "soy_sauce", "oyster_sauce"]
    .map((foodId) => mealRuntime.getFoodReferenceById(foodId));
  assert.deepEqual(evidenceReferences.map((reference) => [reference.food_id, reference.sodium_estimate_min_mg, reference.sodium_estimate_max_mg]), [
    ["egg", 60, 62],
    ["fish_sauce", 1410, 1480],
    ["soy_sauce", 879, 920],
    ["oyster_sauce", 490, 870]
  ]);

  const localeKeys = [
    "title",
    "intro",
    "open",
    "mealType",
    "chooseFood",
    "condimentUnknown",
    "currentMeal",
    "save",
    "saving",
    "savedConfirmationHelper",
    "savedMeals",
    "dailyReflectionTitle",
    "estimateUnknown",
    "searchPlaceholder",
    "noFoodFound",
    "namedDishSuggestion",
    "namedDishConfirm",
    "namedDishReject",
    "namedDishConfirmed",
    "namedDishClear",
    "namedDishSource",
    "namedDishBasisHelper",
    "namedDishSoftConflict",
    "namedDishEvidenceConflict",
    "namedDishFallback"
  ];
  mealUI.SUPPORTED_LANGUAGES.forEach((language) => {
    localeKeys.forEach((key) => assert.equal(typeof mealUI.TEXT[language][key], "string"));
    ["showMoreFoods", "selectedComponent", "addSelectedFood", "visualItemCount", "namedDishBasis"].forEach((key) => {
      assert.equal(typeof mealUI.TEXT[language][key], "function");
      assert.ok(mealUI.TEXT[language][key](2, 2));
    });
    ["small", "regular", "large", "custom"].forEach((key) => assert.ok(mealUI.TEXT[language].portions[key]));
    ["grain", "animal_protein", "plant_protein", "egg", "vegetable", "soup", "condiment"].forEach((key) => {
      assert.ok(mealUI.TEXT[language].categories[key]);
    });
    ["unspecified", "stir_fried", "curry", "broth_based"].forEach((key) => assert.ok(mealUI.TEXT[language].mealTypes[key]));
  });

  mealUI.SUPPORTED_LANGUAGES.forEach((language) => {
    assert.equal(mealUI.buildSaveFeedbackModel("saving", false, language).phase, "saving");
    assert.ok(mealUI.buildSaveFeedbackModel("saving", false, language).message);
    assert.equal(mealUI.buildSaveFeedbackModel("saved", false, language).phase, "saved");
    assert.equal(mealUI.buildSaveFeedbackModel("saved", true, language).message, mealUI.TEXT[language].updated);
  });

  const mealTypeKeys = Object.keys(mealUI.TEXT.th.mealTypes);
  assert.deepEqual(Object.keys(mealUI.MEAL_TYPE_ILLUSTRATIONS), mealTypeKeys);
  Object.values(mealUI.MEAL_TYPE_ILLUSTRATIONS).forEach((illustration) => {
    assert.match(illustration, /<svg /);
    assert.doesNotMatch(illustration, /sodium|score|medical|target/i);
  });

  const allUserCopy = mealUI.SUPPORTED_LANGUAGES.flatMap((language) => [
    ...mealUI.buildDailyReflectionLines(model.getDailySummary(), language),
    mealUI.TEXT[language].estimateUnknown,
    mealUI.TEXT[language].saving,
    mealUI.TEXT[language].saved,
    mealUI.TEXT[language].updated,
    mealUI.TEXT[language].savedConfirmationHelper,
    mealUI.TEXT[language].dailyCount(2),
    mealUI.TEXT[language].emptyReflection.join(" ")
  ]).join(" ");
  assert.doesNotMatch(allUserCopy, /meal score|diet score|health score|medical target|calorie|good meal|bad meal|achievement|reward|perfect meal/i);
  assert.doesNotMatch(allUserCopy, /วันนี้กิน\s*\d|today you ate\s*\d|今天吃了\s*\d/iu);
  assert.equal(Object.keys(model.getDailySummary()).some((key) => /score|medical|target/i.test(key)), false);
  assert.equal(Object.keys(model.getMeals()[0]).some((key) => /daily_log|medical|target|score/i.test(key)), false);
}

run();
console.log("Meal Composer UI model and copy tests passed.");
