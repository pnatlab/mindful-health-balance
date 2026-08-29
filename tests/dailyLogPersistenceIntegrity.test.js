const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const scriptSource = fs.readFileSync(path.join(root, "script.js"), "utf8");
const launcherSource = fs.readFileSync(path.join(root, "tools/mhb_local_launcher.sh"), "utf8");
const schemaSource = fs.readFileSync(path.join(root, "js/config/workbookSchema.js"), "utf8");
const schemaContext = { window: {} };
vm.runInNewContext(schemaSource, schemaContext);

const DAILY_LOG_KEY = "mindfulHealthDailyLog";
const DAILY_LOG_COLUMNS = schemaContext.window.DAILY_LOG_COLUMNS;

function createOriginStorageRegistry() {
  const partitions = new Map();
  return {
    forOrigin(origin) {
      if (!partitions.has(origin)) partitions.set(origin, new Map());
      const values = partitions.get(origin);
      return {
        getItem(key) { return values.has(key) ? values.get(key) : null; },
        setItem(key, value) { values.set(key, String(value)); },
        raw(key) { return values.get(key); }
      };
    }
  };
}

function getDailyLog(storage) {
  const saved = storage.getItem(DAILY_LOG_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setDailyLog(storage, rows) {
  const cleanRows = rows
    .filter((row) => row && row.Date)
    .map((row) => Object.fromEntries(DAILY_LOG_COLUMNS.map((column) => [column, row[column] ?? ""])))
    .sort((a, b) => String(a.Date).localeCompare(String(b.Date)));
  storage.setItem(DAILY_LOG_KEY, JSON.stringify(cleanRows));
}

function upsertDailyLog(storage, incoming) {
  const rows = getDailyLog(storage);
  const existingIndex = rows.findIndex((row) => row.Date === incoming.Date);
  if (existingIndex >= 0) rows[existingIndex] = { ...rows[existingIndex], ...incoming };
  else rows.push(incoming);
  setDailyLog(storage, rows);
}

function pickColumns(row) {
  return Object.fromEntries(DAILY_LOG_COLUMNS.map((column) => [column, row[column] ?? ""]));
}

function syntheticRows(count) {
  return Array.from({ length: count }, (_, index) => ({
    Date: new Date(Date.UTC(2026, 0, index + 1)).toISOString().slice(0, 10),
    Water_ml: 1000 + index
  }));
}

const registry = createOriginStorageRegistry();
const origin4173 = registry.forOrigin("http://127.0.0.1:4173");
setDailyLog(origin4173, [{ Date: "2026-08-01", Water_ml: 1200 }]);
assert.equal(getDailyLog(registry.forOrigin("http://127.0.0.1:4173")).length, 1, "reload on the same origin preserves the log");
assert.equal(getDailyLog(registry.forOrigin("http://127.0.0.1:4174")).length, 0, "4174 cannot see 4173 localStorage");
assert.equal(getDailyLog(registry.forOrigin("http://localhost:4173")).length, 0, "localhost cannot see 127.0.0.1 localStorage");
assert.equal(getDailyLog(registry.forOrigin("file:///mindful-health-balance/index.html")).length, 0, "file mode is a separate storage context");

const preservationStorage = registry.forOrigin("test://historical-preservation");
setDailyLog(preservationStorage, syntheticRows(77));
upsertDailyLog(preservationStorage, { Date: "2026-08-30", Water_ml: 2200 });
assert.equal(getDailyLog(preservationStorage).length, 78, "a new date preserves 77 historical rows");
assert.equal(getDailyLog(preservationStorage).filter((row) => row.Date !== "2026-08-30").length, 77);
upsertDailyLog(preservationStorage, { Date: "2026-08-30", Water_ml: 2300 });
assert.equal(getDailyLog(preservationStorage).length, 78, "same-date save updates one identity instead of duplicating it");
assert.equal(getDailyLog(preservationStorage).find((row) => row.Date === "2026-08-30").Water_ml, 2300);

const importStorage = registry.forOrigin("test://import-recovery");
setDailyLog(importStorage, [{ Date: "2026-08-29", Water_ml: 500 }]);
const importedRows = syntheticRows(77);
setDailyLog(importStorage, importedRows);
assert.equal(getDailyLog(importStorage).length, 77, "confirmed import replaces the current Daily Log array");
upsertDailyLog(importStorage, { Date: "2026-08-30", Water_ml: 1800 });
assert.equal(getDailyLog(importStorage).length, 78, "a later new-day save preserves imported history");

const roundTripStorage = registry.forOrigin("test://workbook-row-round-trip");
const canonicalRow = Object.fromEntries(DAILY_LOG_COLUMNS.map((column, index) => [column, column === "Date" ? "2026-08-10" : `value-${index}`]));
const exportRepresentation = pickColumns(canonicalRow);
setDailyLog(roundTripStorage, [exportRepresentation]);
assert.deepEqual(getDailyLog(roundTripStorage)[0], canonicalRow, "all current canonical Daily_Log fields survive the export/import row representation");

const duplicateStorage = registry.forOrigin("test://duplicate-date-identity");
setDailyLog(duplicateStorage, [
  { Date: "2026-08-01", Water_ml: 1000 },
  { Date: "2026-08-01", Water_ml: 1100 }
]);
assert.equal(getDailyLog(duplicateStorage).length, 2, "setDailyLog sorts but does not deduplicate imported same-date rows");
upsertDailyLog(duplicateStorage, { Date: "2026-08-01", Water_ml: 1200 });
assert.equal(getDailyLog(duplicateStorage).length, 2, "same-date save updates the first match and leaves an existing duplicate visible");

const malformedStorage = registry.forOrigin("test://malformed-storage");
malformedStorage.setItem(DAILY_LOG_KEY, "{not valid json");
assert.deepEqual(getDailyLog(malformedStorage), [], "malformed JSON is exposed to the runtime as an empty log");
assert.equal(malformedStorage.raw(DAILY_LOG_KEY), "{not valid json", "read failure alone does not overwrite the malformed value");
upsertDailyLog(malformedStorage, { Date: "2026-08-30", Water_ml: 900 });
assert.notEqual(malformedStorage.raw(DAILY_LOG_KEY), "{not valid json", "a subsequent save replaces malformed storage, documenting the fail-open risk");

assert.match(scriptSource, /const DAILY_LOG_KEY = "mindfulHealthDailyLog";/);
assert.match(scriptSource, /const rows = getDailyLog\(\);\s*const existingIndex = rows\.findIndex\(\(item\) => item\.Date === row\.Date\);/);
assert.match(scriptSource, /else \{\s*rows\.push\(row\);\s*\}/);
assert.match(scriptSource, /setDailyLog\(rowsWithReflections\);/, "import persists parsed workbook rows to browser storage");
assert.match(scriptSource, /const dailyRows = rows\.map\(\(row\) => pickColumns\(row, DAILY_LOG_COLUMNS\)\);/);
assert.match(scriptSource, /XLSX\.utils\.sheet_to_json\(dailySheet, \{ defval: "" \}\)/);
assert.match(scriptSource, /XLSX\.writeFile\(workbook, "Mindful_Health_Balance_Master\.xlsx"\);/);
assert.match(launcherSource, /HOST="127\.0\.0\.1"/);
assert.match(launcherSource, /PORT="4173"/);
assert.match(launcherSource, /will not switch to another port automatically/);
assert.doesNotMatch(launcherSource, /417[4-6]/);
assert.doesNotMatch(launcherSource, /localhost/);

console.log("Daily Log persistence integrity tests passed.");
