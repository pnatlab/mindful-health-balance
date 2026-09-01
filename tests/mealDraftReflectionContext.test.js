"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const context = require("../js/mealDraftReflectionContext.js");
const mealRuntime = require("../js/mealCompositionRuntime.js");
const mealUI = require("../js/mealCompositionUI.js");
const visionReview = require("../js/mealVisionReview.js");

const root = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

function createStorage() {
  const values = new Map();
  return {
    getItem(key) { return values.get(key) || null; },
    setItem(key, value) { values.set(key, value); }
  };
}

function createModel() {
  let id = 0;
  return mealUI.createMealComposerModel({
    runtime: mealRuntime,
    storage: createStorage(),
    date: "2026-08-30",
    language: "th",
    normalizeDate: (value) => String(value || "").trim(),
    createId: (prefix) => `${prefix}_${++id}`,
    now: () => "2026-08-30T12:00:00.000Z",
    warn: () => {}
  });
}

assert.equal(context.isMealDraftReflectionEligible({ items: [] }), false, "empty draft is ineligible");
assert.equal(context.isMealDraftReflectionEligible({ mealType: "grilled", items: [] }), false, "Meal Type alone is ineligible");
assert.equal(context.isMealDraftReflectionEligible({
  items: [],
  visionObservation: { visible_components: [{ label: "raw model label" }] },
  visionReview: { components: [{ label: "unapplied proposal" }] }
}), false, "raw Vision state cannot make a draft eligible");

const model = createModel();
model.setDraftMeta({ mealName: "ข้าวร้านประจำก่อนวิ่ง", mealLabel: "lunch", mealType: "grilled", condimentKnowledge: "unknown", time: "12:30" });
const rice = model.addFood("rice");
assert.ok(rice, "an actual Meal Item can be added");
assert.equal(context.isMealDraftReflectionEligible(model.getDraft()), true, "one actual Meal Item is eligible");

const sourceDraft = model.getDraft();
sourceDraft.namedDishId = "unconfirmed_named_dish";
sourceDraft.visionObservation = { raw: "must not cross" };
sourceDraft.items[0].sodium_estimate_min_mg = 999;
const snapshot = context.buildMealDraftReflectionSnapshot(sourceDraft, { now: () => "2026-08-30T12:31:00.000Z" });

assert.equal(Object.isFrozen(snapshot), true);
assert.equal(Object.isFrozen(snapshot.items), true);
assert.equal(Object.isFrozen(snapshot.items[0]), true);
assert.deepEqual(Object.keys(snapshot), [
  "kind", "version", "mealId", "mealName", "mealLabel", "mealType", "time", "condimentKnowledge", "items", "createdAt"
]);
assert.equal(snapshot.mealName, "ข้าวร้านประจำก่อนวิ่ง", "the bounded snapshot keeps the human-authored identity only as read-only context");
assert.deepEqual(Object.keys(snapshot.items[0]), [
  "mealItemId", "foodId", "displayNameSnapshot", "portionLabel", "servingMultiplier", "preparation", "userAdjustment"
]);
assert.equal("namedDishId" in snapshot, false, "named-dish inference is excluded");
assert.equal("visionObservation" in snapshot, false, "raw Vision output is excluded");
assert.equal(Object.keys(snapshot.items[0]).some((key) => /sodium|nutrition|calorie|score/i.test(key)), false, "nutrition inference is excluded");
assert.equal(snapshot.createdAt, "2026-08-30T12:31:00.000Z");

model.addFood("fish");
sourceDraft.items[0].display_name_snapshot = "changed outside snapshot";
assert.equal(snapshot.items.length, 1, "later draft edits do not change the snapshot");
assert.notEqual(snapshot.items[0].displayNameSnapshot, sourceDraft.items[0].display_name_snapshot, "snapshot holds no live item reference");
assert.throws(() => { snapshot.items[0].foodId = "changed"; }, TypeError);

const visionModel = createModel();
const applied = visionReview.applyVisionReviewToDraft(visionModel, {
  mealTypes: [],
  components: [{ accepted: true, selectedFoodId: "egg", choices: ["egg"] }]
});
assert.deepEqual(applied.addedFoodIds, ["egg"]);
assert.equal(context.isMealDraftReflectionEligible(visionModel.getDraft()), true, "a human-applied Vision item is an actual Meal Item");
assert.deepEqual(context.buildMealDraftReflectionSnapshot(visionModel.getDraft()).items.map((item) => item.foodId), ["egg"]);

let bridge = context.beginBridge(snapshot);
assert.equal(bridge.cueVisible, false, "cue begins hidden");
bridge = context.revealCue(bridge);
assert.equal(bridge.cueVisible, true, "successful generation can reveal the cue");
bridge = context.hideCue(bridge);
assert.equal(bridge.cueVisible, false, "clear hides cue");
assert.equal(bridge.snapshot, snapshot, "clear retains the snapshot for regeneration");
assert.equal(context.revealCue(bridge).cueVisible, true, "regeneration reveals the same cue");
assert.equal(context.clearBridge().snapshot, null, "return ends the transient lifecycle");

const freshModel = createModel();
freshModel.addFood("mixed_vegetables");
const freshSnapshot = context.buildMealDraftReflectionSnapshot(freshModel.getDraft());
assert.notEqual(freshSnapshot, snapshot);
assert.deepEqual(context.beginBridge(freshSnapshot).snapshot.items.map((item) => item.foodId), ["mixed_vegetables"], "a later explicit bridge replaces old context");

const helperSource = read("js/mealDraftReflectionContext.js");
const script = read("script.js");
const html = read("index.html");
const uiSource = read("js/mealCompositionUI.js");
const rootConfig = read("js/config/reflectionRootMatrix.js");
const buildSignalsBlock = script.match(/function buildSignals\(\) \{[\s\S]*?\n\}/)?.[0] || "";
const buildDailyLogRowBlock = script.match(/function buildDailyLogRow\([^]*?\n\}/)?.[0] || "";

assert.doesNotMatch(helperSource, /localStorage|sessionStorage|Daily_Log|Reflection_Text|setItem\(/, "bridge helper introduces no persistence");
assert.match(uiSource, /data-reflect-meal-draft/);
assert.match(uiSource, /isReflectionEligible\(draft\)/);
assert.match(script, /onReflectDraft: beginMealDraftReflection/);
assert.match(script, /setActiveView\("reflection"\)/);
assert.match(script, /mealComposerUI\?\.open\(\)/);
assert.match(script, /MEAL_DRAFT_REFLECTION_CONTEXT\?\.revealCue/);
assert.match(script, /MEAL_DRAFT_REFLECTION_CONTEXT\?\.hideCue/);
assert.match(script, /MEAL_DRAFT_REFLECTION_CONTEXT\?\.clearBridge/);
assert.ok(html.indexOf("id=\"clearReflection\"") < html.indexOf("id=\"mealReflectionContextCue\""), "cue is placed below Clear Reflection");
assert.match(html, /id="mealReflectionContextCue"[^>]*hidden/);
assert.doesNotMatch(buildSignalsBlock, /meal|snapshot|Meal/i, "main signal graph remains meal-free");
assert.doesNotMatch(buildDailyLogRowBlock, /mealDraftReflection|mealReflectionContext|snapshot/i, "Daily Log row remains bridge-free");
assert.doesNotMatch(rootConfig, /meal_draft|meal_context|meal_composition/i, "no Meal Reflection Root is added");
assert.doesNotMatch(script.match(/function buildReflection\(\)[^]*?\n\}/)?.[0] || "", /mealDraftReflection|mealReflectionContext|snapshot/i, "main generator remains bridge-free");

for (const language of ["th", "en", "zh"]) {
  assert.ok(mealUI.TEXT[language].reflectMealDraft);
  assert.ok(mealUI.TEXT[language].reflectMealDraftHelper);
}
for (const key of ["mealReflectionCueTitle", "mealReflectionCueUnsaved", "mealReflectionCueReturn"]) {
  assert.equal((script.match(new RegExp(`${key}:`, "g")) || []).length, 3, `${key} exists in TH/EN/ZH`);
}

assert.match(html, /<button type="button" class="subtle-link-button" id="returnToMealDraft">/);
assert.match(html, /id="reflectionViewTitle"[^>]*tabindex="-1"/);
assert.match(read("style.css"), /@media \(max-width: 520px\)[^]*?\.meal-reflection-context-cue/);

console.log("Meal Draft Reflection context bridge tests passed.");
