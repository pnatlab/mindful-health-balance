const STORAGE_PREFIX = "mindfulHealthBalance";
const DAILY_LOG_KEY = "mindfulHealthDailyLog";
const DAILY_LOG_COLUMNS = [
  "Date",
  "Energy",
  "Mind",
  "Sleep",
  "Water_ml",
  "Drinks",
  "Sweet_Drinks_Count",
  "Activities",
  "Load_Score",
  "Load_Level",
  "Hydration_Status",
  "Tomorrow_Focus",
  "NuTuenSai_Reminder"
];

const drinkOptions = [
  { label: "กาแฟดำ", sweet: false },
  { label: "กาแฟใส่นม", sweet: true },
  { label: "โกโก้", sweet: true },
  { label: "น้ำชมพู/เครื่องดื่มหวาน", sweet: true },
  { label: "น้ำมะนาวไม่หวาน", sweet: false },
  { label: "น้ำเปล่า", sweet: false }
];

const activityOptions = [
  { label: "Rest day", score: -1 },
  { label: "Easy run", score: 1 },
  { label: "Long run", score: 3 },
  { label: "ปิงปองหนัก", score: 3 },
  { label: "เดินเยอะ", score: 1 },
  { label: "Deep work / coding นาน", score: 2 },
  { label: "นอนน้อย", score: 2 }
];

const todayIso = new Date().toLocaleDateString("en-CA");

const defaultState = {
  date: todayIso,
  waterMl: 0,
  drinks: [],
  activities: [],
  selectedState: {
    energy: "",
    mind: "",
    sleep: ""
  },
  loadScore: 0,
  loadLevel: "Load เบา",
  hydrationStatus: "วันนี้น้ำยังน้อยไปนิด ค่อย ๆ จิบเพิ่มนะ",
  generatedReflection: ""
};

let appState = loadState();

document.addEventListener("DOMContentLoaded", () => {
  renderDate();
  renderDrinkOptions();
  renderActivityOptions();
  bindEvents();
  syncUI();
  renderDailyLogTable();
});

function storageKey() {
  return `${STORAGE_PREFIX}:${todayIso}`;
}

function loadState() {
  const saved = localStorage.getItem(storageKey());
  if (!saved) {
    return structuredClone(defaultState);
  }

  try {
    return { ...structuredClone(defaultState), ...JSON.parse(saved), date: todayIso };
  } catch {
    return structuredClone(defaultState);
  }
}

function renderDate() {
  const currentDate = document.querySelector("#currentDate");
  currentDate.textContent = new Date().toLocaleDateString("th-TH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function renderDrinkOptions() {
  const list = document.querySelector("#drinksList");
  list.innerHTML = drinkOptions.map((drink) => `
    <label class="toggle-card" data-drink="${drink.label}">
      <input type="checkbox" value="${drink.label}">
      <span>${drink.label}</span>
    </label>
  `).join("");
}

function renderActivityOptions() {
  const list = document.querySelector("#activitiesList");
  list.innerHTML = activityOptions.map((activity) => `
    <button type="button" class="activity-button" data-activity="${activity.label}">
      ${activity.label}
    </button>
  `).join("");
}

function bindEvents() {
  document.querySelectorAll(".choice-group").forEach((group) => {
    group.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-value]");
      if (!button) return;
      appState.selectedState[group.dataset.field] = button.dataset.value;
      if (group.dataset.field === "sleep" && button.dataset.value !== "น้อย") {
        appState.activities = appState.activities.filter((item) => item !== "นอนน้อย");
      }
      syncUI();
    });
  });

  document.querySelectorAll("[data-water]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.waterMl += Number(button.dataset.water);
      syncUI();
    });
  });

  document.querySelector("#resetWater").addEventListener("click", () => {
    appState.waterMl = 0;
    syncUI();
  });

  document.querySelector("#drinksList").addEventListener("change", (event) => {
    const input = event.target.closest("input[type='checkbox']");
    if (!input) return;
    appState.drinks = input.checked
      ? unique([...appState.drinks, input.value])
      : appState.drinks.filter((drink) => drink !== input.value);
    syncUI();
  });

  document.querySelector("#activitiesList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-activity]");
    if (!button) return;
    const activity = button.dataset.activity;
    const isSelected = appState.activities.includes(activity);

    if (activity === "Rest day") {
      appState.activities = isSelected ? [] : ["Rest day"];
    } else {
      appState.activities = appState.activities.filter((item) => item !== "Rest day");
      appState.activities = isSelected
        ? appState.activities.filter((item) => item !== activity)
        : [...appState.activities, activity];
    }

    if (activity === "นอนน้อย") {
      appState.selectedState.sleep = isSelected ? "" : "น้อย";
    }

    syncUI();
  });

  document.querySelector("#generateReflection").addEventListener("click", () => {
    appState.generatedReflection = buildReflection();
    syncUI();
  });

  document.querySelector("#reflectionOutput").addEventListener("input", (event) => {
    appState.generatedReflection = event.target.value;
  });

  document.querySelector("#saveDailyLog").addEventListener("click", saveToDailyLog);
  document.querySelector("#clearDailyLog").addEventListener("click", clearDailyLog);
  document.querySelector("#exportMasterExcel").addEventListener("click", exportMasterExcel);
  document.querySelector("#importMasterExcel").addEventListener("click", () => {
    document.querySelector("#importExcelFile").click();
  });
  document.querySelector("#importExcelFile").addEventListener("change", importMasterExcel);
}

function syncUI() {
  appState.loadScore = calculateLoadScore();
  appState.loadLevel = getLoadLevel(appState.loadScore);
  appState.hydrationStatus = getHydrationStatus(appState.waterMl);

  document.querySelector("#waterMl").textContent = appState.waterMl.toLocaleString("th-TH");
  document.querySelector("#hydrationFeedback").textContent = appState.hydrationStatus;
  document.querySelector("#loadScore").textContent = appState.loadScore;
  document.querySelector("#loadLevel").textContent = appState.loadLevel;
  document.querySelector("#loadFeedback").textContent = getLoadFeedback();
  document.querySelector("#mindfulReminder").textContent = getMindfulReminder();
  document.querySelector("#reflectionOutput").value = appState.generatedReflection;

  updateStateButtons();
  updateDrinkUI();
  updateActivityUI();
}

function updateStateButtons() {
  document.querySelectorAll(".choice-group").forEach((group) => {
    const selectedValue = appState.selectedState[group.dataset.field];
    group.querySelectorAll("button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === selectedValue);
    });
  });
}

function updateDrinkUI() {
  document.querySelectorAll(".toggle-card").forEach((label) => {
    const input = label.querySelector("input");
    const checked = appState.drinks.includes(input.value);
    input.checked = checked;
    label.classList.toggle("is-active", checked);
  });

  document.querySelector("#sweetCount").textContent = `หวาน ${countSweetDrinks()}`;
  document.querySelector("#drinksFeedback").textContent = getDrinksFeedback();
}

function updateActivityUI() {
  document.querySelectorAll("[data-activity]").forEach((button) => {
    button.classList.toggle("is-active", appState.activities.includes(button.dataset.activity));
  });
}

function calculateLoadScore() {
  return appState.activities.reduce((total, selected) => {
    const activity = activityOptions.find((item) => item.label === selected);
    return total + (activity ? activity.score : 0);
  }, 0);
}

function getLoadLevel(score) {
  if (score >= 6) return "Load สูง";
  if (score >= 3) return "Load กลาง";
  return "Load เบา";
}

function getHydrationStatus(waterMl) {
  if (waterMl <= 750) return "วันนี้น้ำยังน้อยไปนิด ค่อย ๆ จิบเพิ่มนะ";
  if (waterMl <= 1500) return "กำลังดีขึ้นแล้ว อย่าอัดทีเดียว";
  if (waterMl <= 2200) return "น้ำวันนี้เริ่มสมดุลแล้ว";
  return "พอแล้ว ไม่ต้องเร่งดื่มเกินจำเป็น";
}

function countSweetDrinks() {
  return appState.drinks.filter((drink) => {
    const drinkMeta = drinkOptions.find((item) => item.label === drink);
    return drinkMeta?.sweet;
  }).length;
}

function getDrinksFeedback() {
  const sweetCount = countSweetDrinks();
  if (sweetCount >= 2) return "แก้วหวาน = ของหวาน ไม่ใช่น้ำ วันนี้ลดแก้วถัดไปก็พอ";
  if (appState.drinks.some((drink) => ["กาแฟใส่นม", "โกโก้", "น้ำชมพู/เครื่องดื่มหวาน"].includes(drink))) {
    return "ลดหวานก่อน ลดกลัวทีหลัง";
  }
  if (appState.drinks.includes("กาแฟดำ")) return "กาแฟได้ แต่อย่าให้แทนน้ำ";
  if (appState.drinks.includes("น้ำเปล่า")) return "น้ำเปล่ายังเป็นฐานที่เรียบง่ายและไว้ใจได้";
  return "เลือกเครื่องดื่มวันนี้เพื่อดู reminder แบบเบา ๆ";
}

function getLoadFeedback() {
  const hasHeavyCombo = appState.activities.includes("Long run") && appState.activities.includes("ปิงปองหนัก");
  const highLoadWithLowSleep = appState.loadScore >= 6 && appState.activities.includes("นอนน้อย");

  if (hasHeavyCombo || highLoadWithLowSleep) {
    return "วันนี้ร่างกายถูกใช้เยอะแล้ว พรุ่งนี้ให้ recovery เป็นส่วนหนึ่งของ performance";
  }
  if (appState.loadScore >= 6) {
    return "วันนี้ load สูงกว่า recovery ได้ง่าย อย่า push เพิ่มแล้ว ให้การพักเป็นงานหลัก";
  }
  if (appState.loadScore >= 3) {
    return "Load วันนี้อยู่ระดับกลาง ฟังสัญญาณร่างกายแล้วค่อยเพิ่มหรือลด";
  }
  return "Load เบา วันนี้ยังมีพื้นที่ให้ recovery แบบสบาย ๆ";
}

function getMindfulReminder() {
  if (appState.selectedState.mind === "กดดัน") {
    return "อย่ารีบแก้เลขด้วยความกลัว ค่อย ๆ สร้างระบบที่อยู่ได้จริง";
  }
  if (appState.selectedState.mind === "กังวล") {
    return "ค่ารอบเดียวคือข้อมูล ไม่ใช่คำตัดสินชีวิต";
  }
  if (appState.selectedState.sleep === "น้อย") {
    return "อย่าตัดสินสุขภาพตัวเองจากวันที่นอนน้อย";
  }
  if (appState.loadScore >= 6) {
    return "Recovery คือส่วนหนึ่งของ training";
  }
  return "พี่ไม่จำเป็นต้องกลับไปกลัว แค่ต้องกลับมาสม่ำเสมอ";
}

function buildReflection() {
  const sweetCount = countSweetDrinks();
  const goodThings = [];
  const adjustments = [];

  if (appState.waterMl > 0) goodThings.push(`เห็นภาพน้ำวันนี้แล้ว (${appState.waterMl} ml)`);
  if (appState.drinks.includes("น้ำเปล่า")) goodThings.push("มีน้ำเปล่าเป็นฐานของวัน");
  if (appState.selectedState.energy || appState.selectedState.mind || appState.selectedState.sleep) {
    goodThings.push("เช็ก state ตัวเองก่อนรีบสรุป");
  }
  if (!goodThings.length) goodThings.push("เริ่มเปิดพื้นที่ให้ตัวเองสังเกต pattern");

  if (sweetCount >= 2) adjustments.push("ลดแก้วหวานถัดไปหนึ่งจุดก็พอ ไม่ต้องหักดิบ");
  if (appState.waterMl <= 750) adjustments.push("ค่อย ๆ เพิ่มการจิบน้ำระหว่างวัน โดยไม่ต้องอัดทีเดียว");
  if (appState.loadScore >= 6) adjustments.push("หยุด push เพิ่ม แล้ววาง recovery เป็นงานหลัก");
  if (!adjustments.length) adjustments.push("รักษาจังหวะที่พอดี และไม่ต้องเพิ่มอะไรเพราะความกลัว");

  return [
    `วันนี้ทำได้ดี: ${goodThings.join(" / ")}`,
    `สิ่งที่ควรปรับ: ${adjustments.join(" / ")}`,
    `Recovery Note: ${getRecoveryNote()}`,
    `Hydration Note: ${appState.hydrationStatus}`,
    `Tomorrow Focus: ${getTomorrowFocus()}`,
    `NuTuenSai Reminder: ${getMindfulReminder()}`,
    "",
    "วันนี้พี่ไม่ได้ต้องแก้ทุกอย่าง แค่เห็น pattern ชัดขึ้นก็ถือว่าระบบทำงานแล้ว",
    "เป้าหมายไม่ใช่เลขดีเร็ว แต่คือระบบที่ไม่พังซ้ำเพราะการรีบแก้"
  ].join("\n");
}

function getRecoveryNote() {
  if (appState.loadScore >= 6) return "Recovery คือส่วนหนึ่งของ performance วันนี้พอแล้วกับการใช้ร่างกายหนัก ๆ";
  if (appState.selectedState.sleep === "น้อย") return "อย่าตัดสินสุขภาพตัวเองจากวันที่นอนน้อย ให้การพักช่วยปรับภาพรวมก่อน";
  if (appState.loadScore >= 3) return "Load กลาง ๆ ต้องมีช่วงผ่อน ไม่ต้องเติมงานหนักเพราะรู้สึกว่ายังทำได้";
  return "วันนี้เหมาะกับการรักษาจังหวะเบา ๆ และสะสมความสม่ำเสมอ";
}

function getTomorrowFocus() {
  if (appState.loadScore >= 6 || appState.selectedState.sleep === "น้อย") {
    return "Recovery ก่อน แล้วค่อยดูว่าร่างกายพร้อมแค่ไหน";
  }
  if (appState.waterMl <= 1500) return "วางจุดจิบน้ำเล็ก ๆ ให้กระจายทั้งวัน";
  if (countSweetDrinks() >= 1) return "ลดหวานหนึ่งจุด โดยไม่ต้องทำให้วันนี้กลายเป็นบทลงโทษ";
  return "รักษาระบบที่อยู่ได้จริงต่ออีกหนึ่งวัน";
}

function buildDailyLogRow() {
  const reflection = appState.generatedReflection || buildReflection();
  const tomorrowFocus = getTomorrowFocus();
  const reminder = getMindfulReminder();

  return {
    Date: appState.date,
    Energy: appState.selectedState.energy,
    Mind: appState.selectedState.mind,
    Sleep: appState.selectedState.sleep,
    Water_ml: appState.waterMl,
    Drinks: appState.drinks.join(" | "),
    Sweet_Drinks_Count: countSweetDrinks(),
    Activities: appState.activities.join(" | "),
    Load_Score: appState.loadScore,
    Load_Level: appState.loadLevel,
    Hydration_Status: appState.hydrationStatus,
    Tomorrow_Focus: tomorrowFocus,
    NuTuenSai_Reminder: reminder,
    Reflection_Text: reflection
  };
}

function saveToday() {
  if (!appState.generatedReflection) {
    appState.generatedReflection = buildReflection();
  }
  localStorage.setItem(storageKey(), JSON.stringify(appState));
  document.querySelector("#saveStatus").textContent = "บันทึกวันนี้แล้ว พี่ไม่ต้องแบกต่อในหัวแล้วนะ";
  syncUI();
}

function getDailyLog() {
  const saved = localStorage.getItem(DAILY_LOG_KEY);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setDailyLog(rows) {
  const cleanRows = rows
    .filter((row) => row && row.Date)
    .map(normalizeLogRow)
    .sort((a, b) => String(a.Date).localeCompare(String(b.Date)));
  localStorage.setItem(DAILY_LOG_KEY, JSON.stringify(cleanRows));
  renderDailyLogTable();
}

function normalizeLogRow(row) {
  const normalized = {};
  DAILY_LOG_COLUMNS.forEach((column) => {
    normalized[column] = row[column] ?? "";
  });

  normalized.Date = normalizeExcelDate(normalized.Date);
  normalized.Water_ml = Number(normalized.Water_ml) || 0;
  normalized.Sweet_Drinks_Count = Number(normalized.Sweet_Drinks_Count) || 0;
  normalized.Load_Score = Number(normalized.Load_Score) || 0;
  normalized.Reflection_Text = row.Reflection_Text ?? row.Reflection ?? "";
  return normalized;
}

function normalizeExcelDate(value) {
  if (value instanceof Date) return value.toLocaleDateString("en-CA");
  if (typeof value === "number" && window.XLSX?.SSF) {
    const parsed = XLSX.SSF.parse_date_code(value);
    if (parsed) {
      const month = String(parsed.m).padStart(2, "0");
      const day = String(parsed.d).padStart(2, "0");
      return `${parsed.y}-${month}-${day}`;
    }
  }
  return String(value || "").trim();
}

function saveToDailyLog() {
  if (!appState.generatedReflection) {
    appState.generatedReflection = buildReflection();
  }

  const row = buildDailyLogRow();
  const rows = getDailyLog();
  const existingIndex = rows.findIndex((item) => item.Date === row.Date);

  if (existingIndex >= 0) {
    const shouldReplace = confirm("มี log ของวันนี้อยู่แล้ว ต้องการ replace/update row เดิมไหม?");
    if (!shouldReplace) {
      document.querySelector("#saveStatus").textContent = "ยังไม่บันทึกทับ row เดิม พี่ไม่ต้องรีบตัดสินใจก็ได้";
      return;
    }
    rows[existingIndex] = row;
  } else {
    rows.push(row);
  }

  saveToday();
  setDailyLog(rows);
  document.querySelector("#saveStatus").textContent = "บันทึกลง Daily Log แล้ว พี่ไม่ต้องแบกต่อในหัวแล้วนะ";
  syncUI();
}

function clearDailyLog() {
  const rows = getDailyLog();
  if (rows.length && !confirm("ต้องการล้าง Daily Log ทั้งหมดใน browser นี้ไหม?")) {
    return;
  }

  localStorage.removeItem(DAILY_LOG_KEY);
  renderDailyLogTable();
  document.querySelector("#saveStatus").textContent = "ล้าง Daily Log ใน browser นี้แล้ว";
}

function renderDailyLogTable() {
  const rows = getDailyLog();
  const body = document.querySelector("#dailyLogBody");
  const emptyState = document.querySelector("#emptyLogState");
  const logCount = document.querySelector("#logCount");

  if (!body || !emptyState || !logCount) return;

  logCount.textContent = `${rows.length} ${rows.length === 1 ? "log" : "logs"}`;
  body.innerHTML = rows.map((row) => `
    <tr>
      ${DAILY_LOG_COLUMNS.map((column) => `<td>${escapeHtml(row[column])}</td>`).join("")}
    </tr>
  `).join("");
  emptyState.classList.toggle("is-hidden", rows.length > 0);
}

function exportMasterExcel() {
  if (!window.XLSX) {
    alert("ยังโหลด SheetJS ไม่สำเร็จ ลองเช็กอินเทอร์เน็ตแล้วกดอีกครั้ง");
    return;
  }

  const rows = getDailyLog();
  if (!rows.length) {
    alert("ยังไม่มี Daily Log ให้ export เริ่มจาก Save to Daily Log ก่อนนะ");
    return;
  }

  const workbook = XLSX.utils.book_new();
  const dailyRows = rows.map((row) => pickColumns(row, DAILY_LOG_COLUMNS));
  const reflectionRows = rows.map((row) => ({
    Date: row.Date,
    Reflection_Text: row.Reflection_Text || ""
  }));
  const dailySheet = XLSX.utils.json_to_sheet(dailyRows, { header: DAILY_LOG_COLUMNS });
  const summarySheet = XLSX.utils.json_to_sheet([buildMasterSummary(rows)]);
  const reflectionSheet = XLSX.utils.json_to_sheet(reflectionRows, { header: ["Date", "Reflection_Text"] });

  XLSX.utils.book_append_sheet(workbook, dailySheet, "Daily_Log");
  XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");
  XLSX.utils.book_append_sheet(workbook, reflectionSheet, "Reflections");
  XLSX.writeFile(workbook, "Mindful_Health_Balance_Master.xlsx");
  document.querySelector("#saveStatus").textContent = "Export Master Excel แล้ว ไฟล์จะถูกดาวน์โหลดลงเครื่องพี่";
}

function buildMasterSummary(rows) {
  const totalDays = rows.length;
  const averageWater = totalDays
    ? Math.round(rows.reduce((sum, row) => sum + (Number(row.Water_ml) || 0), 0) / totalDays)
    : 0;

  return {
    Total_Days: totalDays,
    Average_Water_ml: averageWater,
    High_Load_Days: rows.filter((row) => row.Load_Level === "Load สูง" || Number(row.Load_Score) >= 6).length,
    Low_Sleep_Days: rows.filter((row) => row.Sleep === "น้อย").length,
    Sweet_Drink_Days: rows.filter((row) => Number(row.Sweet_Drinks_Count) > 0).length,
    Most_Common_Mind: getMostCommon(rows.map((row) => row.Mind).filter(Boolean)),
    Overall_Message: "ข้อมูลนี้ช่วยดู pattern และ balance recovery ไม่ใช่การตัดสินสุขภาพจากวันใดวันหนึ่ง"
  };
}

function getMostCommon(values) {
  if (!values.length) return "";
  const counts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function importMasterExcel(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;

  if (getDailyLog().length && !confirm("มี Daily Log อยู่แล้ว ต้องการ overwrite ด้วยข้อมูลจากไฟล์นี้ไหม?")) {
    document.querySelector("#saveStatus").textContent = "ยังไม่ import ทับ Daily Log เดิม";
    return;
  }

  const reader = new FileReader();
  reader.onload = (loadEvent) => {
    try {
      const workbook = XLSX.read(loadEvent.target.result, { type: "array", cellDates: true });
      const dailySheet = workbook.Sheets.Daily_Log;
      if (!dailySheet) {
        alert("ไม่พบ Sheet Daily_Log ในไฟล์นี้");
        return;
      }

      const importedRows = XLSX.utils.sheet_to_json(dailySheet, { defval: "" }).map(normalizeLogRow);
      const reflectionMap = readReflectionMap(workbook);
      const rowsWithReflections = importedRows.map((row) => ({
        ...row,
        Reflection_Text: reflectionMap[row.Date] || row.Reflection_Text || ""
      }));

      setDailyLog(rowsWithReflections);
      document.querySelector("#saveStatus").textContent = `Import Master Excel แล้ว (${rowsWithReflections.length} rows)`;
    } catch (error) {
      alert("อ่านไฟล์ Excel ไม่สำเร็จ ลองตรวจไฟล์อีกครั้ง");
    }
  };
  reader.readAsArrayBuffer(file);
}

function readReflectionMap(workbook) {
  const sheet = workbook.Sheets.Reflections;
  if (!sheet) return {};

  return XLSX.utils.sheet_to_json(sheet, { defval: "" }).reduce((acc, row) => {
    const date = normalizeExcelDate(row.Date);
    if (date) acc[date] = row.Reflection_Text || "";
    return acc;
  }, {});
}

function pickColumns(row, columns) {
  return columns.reduce((acc, column) => {
    acc[column] = row[column] ?? "";
    return acc;
  }, {});
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function unique(items) {
  return [...new Set(items)];
}
