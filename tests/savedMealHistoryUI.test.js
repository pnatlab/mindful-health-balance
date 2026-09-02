const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const history = require("../js/savedMealHistoryUI.js");

const records = [
  {
    meal_id: "meal_older",
    date: "2026-08-30",
    time: "08:15",
    meal_label: "breakfast",
    meal_type: "boiled",
    meal_name: "",
    created_at: "2026-08-30T01:15:00.000Z",
    items: [{ food_id: "rice", display_name_snapshot: "ข้าว" }]
  },
  {
    meal_id: "meal_newer",
    date: "2026-09-02",
    time: "13:20",
    meal_label: "lunch",
    meal_type: "stir_fried",
    meal_name: "ข้าวผัดร้านประจำ",
    created_at: "2026-09-02T06:20:00.000Z",
    items: [{ food_id: "rice", display_name_snapshot: "ข้าว" }, { food_id: "egg", display_name_snapshot: "ไข่" }, { food_id: "pork", display_name_snapshot: "หมู" }],
    raw_vision: ["must not render"],
    vision_proposal: "must not render"
  }
];

assert.deepEqual(history.sortSavedMealsNewestFirst(records).map((meal) => meal.meal_id), ["meal_newer", "meal_older"], "saved meals sort newest-first without mutating canonical records");
const projected = history.projectSavedMeal(records[1], {
  getFoodReferenceById: () => ({ display_name_th: "fallback" }),
  getFoodDisplayName: () => "fallback"
}, "th");
assert.equal(projected.mealName, "ข้าวผัดร้านประจำ");
assert.deepEqual(projected.items, ["ข้าว", "ไข่", "หมู"], "canonical item display snapshots remain the only rendered components");
assert.equal(projected.raw_vision, undefined, "raw Vision content is not projected");

let clickHandler;
const root = {
  innerHTML: "",
  addEventListener(type, handler) {
    if (type === "click") clickHandler = handler;
  },
  contains() {
    return true;
  },
  querySelector() {
    return { focus() {} };
  }
};
let calls = 0;
const panel = history.createSavedMealHistoryPanel({
  root,
  getMeals() {
    calls += 1;
    return records;
  },
  language: "th"
});
assert.equal(calls, 1, "the panel reads the existing canonical reader once per render");
assert.match(root.innerHTML, /aria-expanded="false"/);
assert.match(root.innerHTML, /savedMealHistoryDetails[^>]* hidden/);
assert.match(root.innerHTML, />2<\/strong> 2 มื้อ/);
assert.doesNotMatch(root.innerHTML, /must not render/);

clickHandler({
  target: {
    closest() {
      return { hasAttribute: (name) => name === "data-saved-meal-history-toggle" };
    }
  }
});
assert.match(root.innerHTML, /aria-expanded="true"/);
assert.ok(root.innerHTML.indexOf("ข้าวผัดร้านประจำ") < root.innerHTML.indexOf("08:15"), "newest named meal renders before older unnamed meal");
assert.match(root.innerHTML, /ข้าว · ไข่ · หมู/);
assert.equal((root.innerHTML.match(/saved-meal-history-item__name/g) || []).length, 1, "unnamed historical meals do not receive a synthesized title");

panel.setLanguage("en");
assert.match(root.innerHTML, /Saved Meal History/);
for (const language of ["th", "en", "zh"]) {
  for (const key of ["title", "helper", "expand", "collapse", "empty", "count", "itemCount", "moreItems"]) {
    assert.ok(history.TEXT[language][key], `${language} includes ${key}`);
  }
}

const emptyRoot = { innerHTML: "", addEventListener() {}, contains() { return true; }, querySelector() { return { focus() {} }; } };
history.createSavedMealHistoryPanel({ root: emptyRoot, getMeals: () => [], language: "th" });
assert.match(emptyRoot.innerHTML, />0<\/strong> 0 มื้อ/);
assert.match(emptyRoot.innerHTML, /ยังไม่มีมื้อที่บันทึกไว้/);

const source = fs.readFileSync(path.join(__dirname, "../js/savedMealHistoryUI.js"), "utf8");
assert.doesNotMatch(source, /localStorage|setItem|removeItem|addFood|saveDraft|deleteMeal|updateMeal|named_dish|sodium|Daily_Log|Excel/i, "history adapter is strictly display-only and has no persistence or mutation path");
assert.match(source, /data-saved-meal-history-toggle/);
assert.match(source, /aria-expanded/);
assert.match(source, /aria-controls/);

const styleSource = fs.readFileSync(path.join(__dirname, "../style.css"), "utf8");
assert.match(styleSource, /\.saved-meal-history-details\[hidden\][\s\S]*?display: none/, "the collapsed saved-meal details remain visually hidden");

const htmlSource = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");
assert.ok(htmlSource.indexOf('id="savedMealHistory"') > htmlSource.indexOf('id="dailyLogBody"'), "saved meal history follows the Daily Log table");
assert.ok(htmlSource.indexOf('id="savedMealHistory"') < htmlSource.indexOf('id="visionVocabularyAudit"'), "saved meal history precedes Vision observation history");

const appSource = fs.readFileSync(path.join(__dirname, "../script.js"), "utf8");
assert.match(appSource, /createSavedMealHistoryPanel/);
assert.match(appSource, /getMeals: getMealRecords/);
assert.match(appSource, /if \(view === "log"\) \{\s*savedMealHistoryPanel\?\.render\(\);/, "Log open refreshes the read-only projection without adding write behavior");

console.log("Saved Meal History UI tests passed.");
