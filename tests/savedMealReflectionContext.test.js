"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const runtime = require("../js/mealCompositionRuntime.js");

const root = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const date = "2026-08-30";
const previousDate = "2026-08-29";
const futureDate = "2026-08-31";

function item(foodId, displayNameSnapshot = "") {
  return runtime.createMealItem({ food_id: foodId, display_name_snapshot: displayNameSnapshot });
}

function meal(mealId, mealDate, items, overrides = {}) {
  return {
    meal_id: mealId,
    date: mealDate,
    meal_label: "lunch",
    meal_type: "grilled",
    time: "12:00",
    items,
    created_at: `${mealDate}T12:00:00.000Z`,
    updated_at: `${mealDate}T12:00:00.000Z`,
    ...overrides
  };
}

const rice = item("rice");
const egg = item("egg");
const vegetables = item("mixed_vegetables");
const fish = item("fish");
const crispyPork = item("pork_crispy");
const rawVision = { label: "unconfirmed vision label" };

const empty = runtime.buildSavedMealReflectionContext(date, []);
assert.equal(empty.source, "saved_today");
assert.equal(empty.date, date);
assert.equal(empty.mealCount, 0);
assert.deepEqual(empty.meals, []);
assert.deepEqual(empty.visibleItems, []);

const one = runtime.buildSavedMealReflectionContext(date, [
  meal("meal_today", date, [rice], { rawVision, named_dish_id: "not-for-context", meal_note: "private note" })
]);
assert.equal(one.mealCount, 1);
assert.deepEqual(Object.keys(one.meals[0]), ["mealId", "mealLabel", "mealType", "time", "confirmedItems"]);
assert.deepEqual(Object.keys(one.meals[0].confirmedItems[0]), ["foodId", "displayNameSnapshot"]);
assert.equal("rawVision" in one.meals[0], false);
assert.equal("namedDishId" in one.meals[0], false);
assert.equal("sodiumEstimate" in one.meals[0].confirmedItems[0], false);
assert.equal(Object.isFrozen(one), true);
assert.equal(Object.isFrozen(one.meals), true);
assert.equal(Object.isFrozen(one.meals[0]), true);
assert.equal(Object.isFrozen(one.visibleItems), true);
assert.equal(rawVision.label, "unconfirmed vision label", "read-only context does not mutate source records");

const filtered = runtime.buildSavedMealReflectionContext(date, [
  meal("meal_future", futureDate, [fish]),
  meal("meal_previous", previousDate, [egg]),
  meal("meal_today", date, [rice])
]);
assert.equal(filtered.mealCount, 1, "only the requested local date is included");
assert.deepEqual(filtered.visibleItems.map((entry) => entry.foodId), ["rice"]);

const aggregate = runtime.buildSavedMealReflectionContext(date, [
  meal("meal_later", date, [fish, rice], { time: "18:00", created_at: `${date}T18:00:00.000Z` }),
  meal("meal_earlier", date, [egg, vegetables, rice], { time: "07:00", created_at: `${date}T07:00:00.000Z` })
]);
assert.equal(aggregate.mealCount, 2);
assert.deepEqual(aggregate.meals.map((entry) => entry.mealId), ["meal_earlier", "meal_later"], "meal ordering remains deterministic");
assert.deepEqual(aggregate.visibleItems.map((entry) => entry.foodId), ["egg", "fish", "mixed_vegetables", "rice"], "presentation labels are deduped and ordered by canonical food ID");
assert.equal(aggregate.additionalItemCount, 0);
assert.equal(aggregate.meals[0].confirmedItems[0].foodId, "egg", "missing optional meal fields are not inferred into context");

const porkCueContext = runtime.buildSavedMealReflectionContext(date, [meal("meal_pork", date, [crispyPork])]);
const porkCueReference = runtime.getFoodReferenceById(porkCueContext.visibleItems[0].foodId);
assert.equal(runtime.getFoodDisplayName(porkCueReference, "th"), "หมูกรอบ", "saved-meal context continues to use the existing Food Reference display mechanism");

const capped = runtime.buildSavedMealReflectionContext(date, [
  meal("meal_many", date, [item("rice"), item("egg"), item("fish"), item("mixed_vegetables"), item("fruit")])
], runtime.getFoodReferenceLibrary(), { maxVisibleItems: 3 });
assert.equal(capped.visibleItems.length, 3);
assert.equal(capped.additionalItemCount, 2, "overflow is counted without changing canonical meals");

const script = read("script.js");
const html = read("index.html");
const helper = read("js/mealDraftReflectionContext.js");
const styles = read("style.css");
const buildSignalsBlock = script.match(/function buildSignals\(\) \{[\s\S]*?\n\}/)?.[0] || "";
const buildReflectionBlock = script.match(/function buildReflection\(\)[^]*?\n\}/)?.[0] || "";
const buildDailyLogRowBlock = script.match(/function buildDailyLogRow\([^]*?\n\}/)?.[0] || "";

assert.match(script, /buildSavedMealReflectionContext/);
assert.match(script, /getMealsForDate\(date\)/, "Reflection reads through the existing meal-store adapter");
assert.match(script, /if \(mealDraftReflectionBridgeState\?\.snapshot\)/, "the explicit transient snapshot keeps visual priority");
assert.match(script, /savedMealReflectionContext = null;/, "clear and transient lifecycle discard the saved cue cache");
assert.doesNotMatch(buildSignalsBlock, /meal|savedMealReflection|snapshot/i, "saved meals do not enter the signal graph");
assert.doesNotMatch(buildReflectionBlock, /savedMealReflection|mealReflectionContext|snapshot/i, "saved meals do not enter generated Reflection");
assert.doesNotMatch(buildDailyLogRowBlock, /savedMealReflection|mealReflectionContext|snapshot/i, "Daily Log rows remain unchanged");
assert.doesNotMatch(helper, /saved_today|buildSavedMealReflectionContext/, "Slice 1 stays transient-only");
assert.match(html, /<aside class="meal-reflection-context-cue[^>]*aria-labelledby=/, "the cue remains a labeled contextual aside");
assert.match(styles, /meal-reflection-context-cue\[data-context-source="saved_today"\]/, "saved context stays visually compact without an empty action column");
assert.match(styles, /@media \(max-width: 520px\)[^]*?meal-reflection-context-cue/, "narrow layouts retain cue wrapping rules");

for (const key of [
  "savedMealReflectionCueTitle",
  "savedMealReflectionCueCountOne",
  "savedMealReflectionCueCountMany",
  "savedMealReflectionCueMoreItems"
]) {
  assert.equal((script.match(new RegExp(`${key}:`, "g")) || []).length, 3, `${key} exists in TH/EN/ZH`);
}

console.log("Saved Meal Reflection context tests passed.");
