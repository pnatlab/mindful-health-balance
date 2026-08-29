const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const audit = require("../js/visionVocabularyAuditUI.js");

let listCalls = 0;
const store = {
  list() {
    listCalls += 1;
    return [
      { observed_label: "Mushroom", normalized_label: "mushroom", mapping_status: "unsupported", mapped_food_reference_id: null, seen_count: 3 },
      { observed_label: "Rice", normalized_label: "rice", mapping_status: "mapped", mapped_food_reference_id: "rice", seen_count: 7 },
      { observed_label: "Seafood", normalized_label: "seafood", mapping_status: "needs_review", mapped_food_reference_id: null, seen_count: 3 }
    ];
  },
  record() { throw new Error("Audit UI must not write evidence"); },
  recordMany() { throw new Error("Audit UI must not write evidence"); }
};

const snapshot = audit.createVocabularyAuditSnapshot(store);
assert.equal(listCalls, 1, "the audit reads the store once");
assert.deepEqual(snapshot.entries.map((entry) => entry.normalized_label), ["rice", "mushroom", "seafood"], "entries sort by count, then label");
assert.deepEqual(snapshot.summary, { total: 3, mapped: 1, needs_review: 1, unsupported: 1 });
assert.deepEqual(audit.filterVocabularyEntries(snapshot.entries, "mapped").map((entry) => entry.normalized_label), ["rice"]);
assert.deepEqual(audit.filterVocabularyEntries(snapshot.entries, "needs_review").map((entry) => entry.normalized_label), ["seafood"]);
assert.deepEqual(audit.filterVocabularyEntries(snapshot.entries, "unsupported").map((entry) => entry.normalized_label), ["mushroom"]);
assert.equal(audit.filterVocabularyEntries(snapshot.entries, "not-a-status").length, 3);

const emptySnapshot = audit.createVocabularyAuditSnapshot({ list: () => [] });
assert.deepEqual(emptySnapshot, { entries: [], summary: { total: 0, mapped: 0, needs_review: 0, unsupported: 0 } });
const unavailableSnapshot = audit.createVocabularyAuditSnapshot({ list() { throw new Error("storage unavailable"); } });
assert.equal(unavailableSnapshot.entries.length, 0, "storage failures remain non-blocking");

let auditClickHandler;
const panelRoot = {
  innerHTML: "",
  addEventListener(type, handler) {
    if (type === "click") auditClickHandler = handler;
  },
  contains() {
    return true;
  },
  querySelector() {
    return { focus() {} };
  }
};
audit.createVisionVocabularyAuditPanel({
  root: panelRoot,
  store,
  language: "th",
  runtime: {
    getFoodReferenceById(id) {
      return id === "rice" ? { id } : null;
    },
    getFoodDisplayName() {
      return "ข้าว";
    }
  }
});
assert.match(panelRoot.innerHTML, /aria-expanded="false"/);
assert.match(panelRoot.innerHTML, /visionVocabularyAuditDetails[^>]* hidden/);
auditClickHandler({
  target: {
    closest() {
      return { hasAttribute: (name) => name === "data-vision-vocabulary-audit-toggle", dataset: {} };
    }
  }
});
assert.match(panelRoot.innerHTML, /aria-expanded="true"/);
assert.match(panelRoot.innerHTML, /รู้จักแล้ว → ข้าว/);
auditClickHandler({
  target: {
    closest() {
      return { hasAttribute: () => false, dataset: { visionVocabularyAuditFilter: "unsupported" } };
    }
  }
});
assert.match(panelRoot.innerHTML, /Mushroom/);
assert.doesNotMatch(panelRoot.innerHTML, /Seafood/);

for (const language of ["th", "en", "zh"]) {
  const copy = audit.TEXT[language];
  for (const key of ["title", "helper", "expand", "collapse", "all", "mapped", "needsReview", "unsupported", "empty"]) {
    assert.ok(copy[key], `${language} includes ${key}`);
  }
}

const source = fs.readFileSync(path.join(__dirname, "../js/visionVocabularyAuditUI.js"), "utf8");
assert.doesNotMatch(source, /recordMany|\.record\(|setItem|localStorage|addFood|Meal_Item|named_dish|sodium|workbook|Daily_Log/i);
assert.match(source, /data-vision-vocabulary-audit-toggle/);
assert.match(source, /aria-expanded/);
assert.match(source, /aria-controls/);
assert.match(source, /data-vision-vocabulary-audit-filter/);

const mealSource = fs.readFileSync(path.join(__dirname, "../js/mealCompositionUI.js"), "utf8");
assert.doesNotMatch(mealSource, /visionAudit|visionVocabularyAudit|data-vision-audit/i, "Meal Composer no longer owns the historical audit panel");

const htmlSource = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");
assert.ok(htmlSource.indexOf('id="visionVocabularyAudit"') > htmlSource.indexOf('id="dailyLogBody"'), "audit root follows the Daily Log table");

const appSource = fs.readFileSync(path.join(__dirname, "../script.js"), "utf8");
assert.match(appSource, /initializeVisionVocabularyAuditPanel\(\)/);
assert.match(appSource, /createVisionVocabularyAuditPanel/);
console.log("Vision vocabulary audit UI tests passed.");
