(function initializeMealExcelBridge(globalScope) {
  "use strict";

  const HEADERS = Object.freeze([
    "Meal_ID", "Date", "Food_Name", "Meal_Type", "Meal_Period", "Custom_Meal_Period",
    "Meal_Time", "Created_At", "Updated_At", "Record_Schema_Version", "Item_Count"
  ]);
  const TEXT_FIELDS = Object.freeze([
    "meal_id", "meal_name", "meal_type", "meal_label", "custom_meal_label", "time",
    "created_at", "updated_at", "record_schema_version"
  ]);
  const EXPORT_NOTE = "Saved meal-level export only. Browser Meal storage is canonical. Meal_Log is not imported and cannot restore full Meal records.";

  function failure(code, issues = []) { return { ok: false, code, issues }; }

  // inspectStorage already validates JSON. Inspect its original object token so
  // duplicate properties cannot be silently resolved by JSON.parse's last value.
  function hasDuplicateProperties(raw) {
    const keys = new Set();
    let depth = 0;
    for (let i = 0; i < raw.length; i += 1) {
      const char = raw[i];
      if (char === '"') {
        const start = i++;
        for (; i < raw.length; i += 1) {
          if (raw[i] === "\\") i += 1;
          else if (raw[i] === '"') break;
        }
        if (depth === 1 && /^\s*:/.test(raw.slice(i + 1))) {
          const key = JSON.parse(raw.slice(start, i + 1));
          if (keys.has(key)) return true;
          keys.add(key);
        }
      } else if (char === "{" || char === "[") depth += 1;
      else if (char === "}" || char === "]") depth -= 1;
    }
    return false;
  }

  function isIsoDate(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = new Date(`${value}T00:00:00Z`);
    return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
  }

  // Pure projection of the full runtime inspection, never the filtered UI list.
  // Raw metadata preserves blanks; normalized records establish acceptance,
  // canonical date/identity and the runtime's deterministic ordering.
  function buildMealLogExport(inspection) {
    if (!inspection?.ok) return failure(inspection?.code || "meal_read_unavailable");
    if (!Array.isArray(inspection.entries) || !Array.isArray(inspection.records)) return failure("invalid_inspection");
    const issues = [];
    const ids = new Set();
    const rowsById = new Map();
    inspection.entries.forEach((entry, index) => {
      const value = entry?.value;
      const record = entry?.record;
      const id = typeof value?.meal_id === "string" ? value.meal_id.trim() : "";
      if (id && ids.has(id)) issues.push({ index, mealId: id, code: "duplicate_meal_id" });
      ids.add(id);
      if (!record || !id || record.meal_id !== id || !Array.isArray(record.items) || !isIsoDate(record.date) || typeof entry.raw !== "string") {
        issues.push({ index, mealId: id, code: value?.record_schema_version !== undefined && value.record_schema_version !== "2" ? "unsupported_record_version" : "invalid_record" });
        return;
      }
      try {
        if (hasDuplicateProperties(entry.raw)) {
          issues.push({ index, mealId: id, code: "ambiguous_record_properties" });
          return;
        }
      } catch (_error) {
        issues.push({ index, mealId: id, code: "invalid_inspection" });
        return;
      }
      // Normalization may tolerate historical omissions, but cannot make an
      // object-valued field or a filtered invalid item into a complete export.
      if (TEXT_FIELDS.some((field) => value[field] != null && (typeof value[field] !== "string" || value[field].length > 32767))
        || (value.items !== undefined && !Array.isArray(value.items))
        || (value.items || []).length !== record.items.length) {
        issues.push({ index, mealId: id, code: "invalid_record" });
        return;
      }
      rowsById.set(id, {
        Meal_ID: record.meal_id,
        Date: record.date,
        Food_Name: value.meal_name ?? "",
        Meal_Type: value.meal_type ?? "",
        Meal_Period: value.meal_label ?? "",
        Custom_Meal_Period: value.custom_meal_label ?? "",
        Meal_Time: value.time ?? "",
        Created_At: value.created_at ?? "",
        Updated_At: value.updated_at ?? "",
        Record_Schema_Version: value.record_schema_version ?? "",
        Item_Count: record.items.length
      });
    });
    if (issues.length) return failure(issues.some((issue) => issue.code === "duplicate_meal_id") ? "duplicate_meal_id" : "meal_records_invalid", issues);
    if (inspection.records.length !== inspection.entries.length
      || new Set(inspection.records.map((record) => record?.meal_id)).size !== inspection.entries.length
      || inspection.records.some((record) => !rowsById.has(record?.meal_id))) return failure("invalid_inspection");
    return { ok: true, headers: [...HEADERS], rows: inspection.records.map((record) => rowsById.get(record.meal_id)) };
  }

  function getColumnGuideEntries() {
    const descriptions = [
      ["รหัสมื้ออาหาร", "Meal ID", "Stable saved Meal Instance identity. Dates and food names may repeat."],
      ["วันที่", "Date", "Recorded calendar date as ISO YYYY-MM-DD text. No inferred meal date."],
      ["ชื่ออาหาร", "Food name", "Saved human-authorized food name. May be blank for legacy meals; no fallback name is invented."],
      ["ประเภทอาหาร", "Meal type", "Recorded food classification, or blank. No classification inference."],
      ["ช่วงของมื้อ", "Meal period", "Recorded meal occasion, or blank."],
      ["ช่วงของมื้อที่ตั้งเอง", "Custom meal period", "Human-entered custom occasion, or blank."],
      ["เวลามื้ออาหาร", "Meal time", "Recorded meal time, or blank. Never derived from save timestamps."],
      ["เวลาสร้างบันทึก", "Created at", "Original record creation metadata, or blank. Not meal time."],
      ["เวลาแก้ไขบันทึก", "Updated at", "Original record update metadata, or blank. Not meal time."],
      ["รุ่นข้อมูลมื้ออาหาร", "Record schema version", "Saved record version. Blank for unversioned legacy records."],
      ["จำนวนรายการเดิม", "Item count", "Count of existing Meal Items. Historical metadata only; not portions, nutrient evidence or meal quality."]
    ];
    return HEADERS.map((column, index) => ({ column, thai: descriptions[index][0], english: descriptions[index][1], meaning: descriptions[index][2], aiNote: EXPORT_NOTE, canonical: false }));
  }

  const api = Object.freeze({ HEADERS, buildMealLogExport, getColumnGuideEntries });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  globalScope.MHBMealExcelBridge = api;
})(typeof window !== "undefined" ? window : globalThis);
