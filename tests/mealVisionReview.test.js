const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const runtime = require("../js/mealCompositionRuntime.js");
const mealUI = require("../js/mealCompositionUI.js");
const visionReview = require("../js/mealVisionReview.js");
const vocabulary = require("../js/visionObservationVocabulary.js");

function createMemoryStorage() {
  const values = new Map();
  return {
    getItem(key) { return values.get(key) || null; },
    setItem(key, value) { values.set(key, value); }
  };
}

function createModel() {
  let id = 0;
  return mealUI.createMealComposerModel({
    runtime,
    storage: createMemoryStorage(),
    date: "2026-08-27",
    language: "th",
    normalizeDate: (value) => String(value || "").trim(),
    now: () => "2026-08-27T12:00:00.000Z",
    createId: (prefix) => `${prefix}_vision_${++id}`,
    warn: () => {}
  });
}

function observation(overrides = {}) {
  return {
    observation_id: "transient-test",
    dish_candidates: [{ label: "fried rice" }],
    meal_type_candidates: [{ meal_type: "stir_fried" }],
    visible_components: [{ label: "rice" }, { label: "egg" }, { label: "pork" }, { label: "scallions" }],
    uncertain_observations: [{ label: "protein preparation" }],
    not_observable: ["sauce_identity", "seasoning_amount"],
    ...overrides
  };
}

const model = createModel();
const review = visionReview.createVisionReviewModel(observation());

assert.equal(model.getDraft().items.length, 0, "valid observation must not auto-apply");
assert.equal(model.getMeals().length, 0);
assert.deepEqual(visionReview.classifyVisionComponent("rice"), {
  status: "safe_exact", label: "rice", foodId: "rice", choices: ["rice"]
});
assert.deepEqual(visionReview.classifyVisionComponent("pork"), {
  status: "needs_user_choice", label: "pork", foodId: "", choices: ["pork_lean"]
}, "generic Vision pork remains a human-choice review and does not infer fatty or crispy pork");
assert.equal(visionReview.classifyVisionComponent("seafood").status, "needs_user_choice");
assert.equal(visionReview.classifyVisionComponent("scallions").status, "unsupported");
assert.deepEqual(visionReview.createObservedVocabularyEntries(observation({ visible_components: [{ label: "rice" }, { label: "seafood" }, { label: "scallions" }] }), vocabulary).map((entry) => entry.mapping_status), ["mapped", "needs_review", "unsupported"]);

const eggReview = review.components.find((entry) => entry.label === "egg");
eggReview.accepted = false;
const porkReview = review.components.find((entry) => entry.label === "pork");
assert.equal(porkReview.accepted, false);
assert.equal(porkReview.selectedFoodId, "");
assert.deepEqual(visionReview.getAcceptedFoodIds(review), ["rice"]);
porkReview.selectedFoodId = "pork_lean";
porkReview.accepted = true;
assert.deepEqual(visionReview.getAcceptedFoodIds(review), ["rice", "pork_lean"]);

model.setDraftMeta({ mealLabel: "lunch", mealType: "grilled", condimentKnowledge: "unknown", time: "12:20" });
const existingRice = model.addFood("rice");
model.updateDraftItem(existingRice.meal_item_id, { portion_label: "custom", serving_multiplier: 2 });
eggReview.accepted = true;
const result = visionReview.applyVisionReviewToDraft(model, review);
const mergedDraft = model.getDraft();

assert.equal(result.mealTypeConflict, true);
assert.equal(mergedDraft.mealType, "grilled", "existing human meal type wins");
assert.equal(mergedDraft.mealLabel, "lunch");
assert.equal(mergedDraft.mealName, "", "Vision does not populate a human-authored Meal Name");
assert.equal(mergedDraft.time, "12:20");
assert.equal(mergedDraft.condimentKnowledge, "unknown");
assert.equal(mergedDraft.items.filter((item) => item.food_id === "rice").length, 1, "prefill must not duplicate existing items");
assert.equal(mergedDraft.items.find((item) => item.food_id === "rice").serving_multiplier, 2, "existing quantity is preserved");
assert.ok(mergedDraft.items.some((item) => item.food_id === "egg"));
assert.ok(mergedDraft.items.some((item) => item.food_id === "pork_lean"));
assert.equal(mergedDraft.namedDishId, "", "vision cannot set named_dish_id");
assert.equal(model.getMeals().length, 0, "prefill is not meal save");

const candidateModel = createModel();
const candidateReview = visionReview.createVisionReviewModel(observation({
  visible_components: [{ label: "rice" }, { label: "pork" }, { label: "mixed vegetables" }, { label: "egg" }]
}));
const candidatePork = candidateReview.components.find((entry) => entry.label === "pork");
candidatePork.selectedFoodId = "pork_lean";
candidatePork.accepted = true;
visionReview.applyVisionReviewToDraft(candidateModel, candidateReview);
assert.equal(candidateModel.getDraft().namedDishId, "", "named-dish confirmation remains separate");
assert.equal(candidateModel.getNamedDishCandidates()[0]?.candidate_id, "fried_rice_pork_vegetable_egg");

for (const language of ["th", "en", "zh"]) {
  const copy = mealUI.TEXT[language];
  for (const key of ["visionAction", "visionPreparing", "visionObserving", "visionReviewTitle", "visionApply", "visionUnavailable", "visionInvalid", "visionImageError"]) {
    assert.ok(copy[key], `${language} copy must include ${key}`);
  }
}

const reviewSource = fs.readFileSync(path.join(__dirname, "../js/mealVisionReview.js"), "utf8");
assert.equal(/named_dish_id|sodium_estimate|evidence_router/i.test(reviewSource), false, "review mapper must not own identity or sodium evidence");
assert.equal(/meal_name|mealName/i.test(reviewSource), false, "Vision review cannot populate a human-authored Meal Name");
assert.equal(/pork_fatty|pork_crispy/.test(reviewSource), false, "Food Reference expansion does not add a Vision mapping");

console.log("Meal Vision review and prefill tests passed.");
