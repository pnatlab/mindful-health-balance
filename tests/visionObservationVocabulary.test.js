const assert = require("node:assert/strict");
const vocabulary = require("../js/visionObservationVocabulary.js");
const visionReview = require("../js/mealVisionReview.js");

function createMemoryStorage() {
  const values = new Map();
  return {
    getItem(key) { return values.get(key) || null; },
    setItem(key, value) { values.set(key, value); },
    snapshot(key) { return values.get(key) || null; }
  };
}

const rice = vocabulary.createObservedVocabularyEntry(" Rice ", {
  mapping_status: "mapped",
  mapped_food_reference_id: "rice"
});
assert.deepEqual(rice, {
  observed_label: "Rice",
  normalized_label: "rice",
  mapping_status: "mapped",
  mapped_food_reference_id: "rice"
});
assert.equal(vocabulary.normalizeObservedLabel("  SEAFOOD  "), "seafood");
assert.equal(vocabulary.createObservedVocabularyEntry("seafood", { mapping_status: "needs_review" }).mapping_status, "needs_review");
assert.equal(vocabulary.createObservedVocabularyEntry("mushroom", { mapping_status: "unsupported" }).mapping_status, "unsupported");
assert.equal(vocabulary.createObservedVocabularyEntry("", { mapping_status: "unsupported" }), null);
assert.equal(vocabulary.createObservedVocabularyEntry("pork", { mapping_status: "mapped" }), null, "mapped entries require a real canonical ID");

const storage = createMemoryStorage();
const store = vocabulary.createVisionVocabularyEvidenceStore(storage);
store.record({ observed_label: "Seafood", mapping_status: "needs_review" });
store.record({ observed_label: " seafood ", mapping_status: "needs_review" });
store.record({ observed_label: "Mushroom", mapping_status: "unsupported" });
const entries = store.list();
assert.equal(entries.length, 2, "case variants share one evidence entry");
assert.equal(entries[0].normalized_label, "seafood");
assert.equal(entries[0].seen_count, 2);
assert.deepEqual(store.listGaps().map((entry) => entry.normalized_label), ["seafood", "mushroom"]);
assert.equal(storage.snapshot(vocabulary.VOCABULARY_EVIDENCE_KEY).includes("named_dish_id"), false);
assert.equal(storage.snapshot(vocabulary.VOCABULARY_EVIDENCE_KEY).includes("sodium"), false);

const unavailableStore = vocabulary.createVisionVocabularyEvidenceStore({
  getItem() { throw new Error("storage unavailable"); },
  setItem() { throw new Error("storage unavailable"); }
});
assert.equal(unavailableStore.record({ observed_label: "mushroom", mapping_status: "unsupported" }).seen_count, 1);

const observedEntries = visionReview.createObservedVocabularyEntries({
  visible_components: [{ label: "rice" }, { label: "seafood" }, { label: "mushroom" }]
}, vocabulary);
assert.deepEqual(observedEntries.map((entry) => [entry.normalized_label, entry.mapping_status, entry.mapped_food_reference_id]), [
  ["rice", "mapped", "rice"],
  ["seafood", "needs_review", null],
  ["mushroom", "unsupported", null]
]);

const source = require("node:fs").readFileSync(require("node:path").join(__dirname, "../js/visionObservationVocabulary.js"), "utf8");
assert.doesNotMatch(source, /Meal_Item|Daily_Log|workbook|sodium|named_dish|localVisionProvider/i);
console.log("Vision observation vocabulary tests passed.");
