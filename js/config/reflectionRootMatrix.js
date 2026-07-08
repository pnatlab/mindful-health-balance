(() => {
const REFLECTION_ROOT_MATRIX = {
  hydration: {
    key: "hydration",
    labels: {
      th: "น้ำ",
      en: "Hydration",
      zh: "饮水"
    },
    declaration: {
      th: "วันนี้หนูขออ่านผ่านแกน “น้ำ” เป็นหลักนะคะ",
      en: "Today, I’ll read mainly through the hydration root.",
      zh: "今天先从饮水这个主轴来温柔观察。"
    },
    primary: ["Water_ml", "Hydration_Support_Count", "Drink_Type"],
    supporting: ["Load_Score", "Caffeine_Score", "Activity_Context", "Run_Detail_JSON"],
    background: ["Sleep_Hours", "Energy", "Mind_State"],
    lowWeight: ["Practice_Minutes"],
    boundaryTags: ["no_medical_advice", "no_diagnosis", "no_causation"],
    status: "active"
  },
  sleep_recovery: {
    key: "sleep_recovery",
    labels: {
      th: "การพัก / การนอน",
      en: "Sleep / Recovery",
      zh: "睡眠 / 恢复"
    },
    declaration: {
      th: "วันนี้หนูขออ่านผ่านแกน “การพัก” เป็นหลักนะคะ",
      en: "Today, I’ll read mainly through the sleep and recovery root.",
      zh: "今天先从睡眠与恢复这个主轴来温柔观察。"
    },
    primary: ["Sleep_Hours", "Recovery_Signal"],
    supporting: ["Caffeine_Score", "Sugar_Score", "Load_Score", "Energy"],
    background: ["Water_ml", "Mind_State", "Practice_Minutes"],
    lowWeight: ["Drink_Type"],
    boundaryTags: ["no_medical_advice", "no_diagnosis", "no_sleep_disorder_claim", "no_causation"],
    status: "active"
  },
  load_activity: {
    key: "load_activity",
    labels: {
      th: "กิจกรรม / ภาระของวัน",
      en: "Load / Activity",
      zh: "活动 / 负荷"
    },
    declaration: {
      th: "วันนี้หนูขออ่านผ่านแกน “กิจกรรม / ภาระของวัน” เป็นหลักนะคะ",
      en: "Today, I’ll read mainly through the load and activity root.",
      zh: "今天先从活动与负荷这个主轴来温柔观察。"
    },
    primary: ["Load_Score", "Activity_Context", "Run_Detail_JSON"],
    supporting: ["Water_ml", "Sleep_Hours", "Caffeine_Score", "Energy"],
    background: ["Mind_State", "Practice_Minutes"],
    lowWeight: ["Sugar_Score", "Drink_Type"],
    boundaryTags: ["no_productivity_score", "no_performance_judgment", "no_causation"],
    status: "active"
  },
  drinks_caffeine_sweetness: {
    key: "drinks_caffeine_sweetness",
    labels: {
      th: "เครื่องดื่ม / คาเฟอีน / ความหวาน",
      en: "Drinks / Caffeine / Sweetness",
      zh: "饮品 / 咖啡因 / 甜度"
    },
    declaration: {
      th: "วันนี้หนูขออ่านผ่านแกน “เครื่องดื่ม” เป็นหลักนะคะ",
      en: "Today, I’ll read mainly through the drinks, caffeine, and sweetness root.",
      zh: "今天先从饮品、咖啡因与甜度这个主轴来温柔观察。"
    },
    primary: ["Caffeine_Score", "Sugar_Score", "Drink_Type", "Sweet_Drinks_Count"],
    supporting: ["Sleep_Hours", "Load_Score", "Energy", "Water_ml"],
    background: ["Mind_State", "Practice_Minutes"],
    lowWeight: ["Practice_Note"],
    boundaryTags: ["no_diet_judgment", "no_medical_advice", "no_causation", "no_expense_interpretation"],
    status: "active"
  },
  mind_state: {
    key: "mind_state",
    labels: {
      th: "ใจ / บริบทใจ",
      en: "Mind State",
      zh: "心的状态"
    },
    declaration: {
      th: "วันนี้หนูขออ่านผ่านแกน “บริบทใจ” เป็นหลักนะคะ",
      en: "Today, I’ll read mainly through the mind-state root.",
      zh: "今天先从心的状态这个主轴来温柔观察。"
    },
    primary: ["Mind_State", "Mind_Note", "Mind_Note_Support", "Feeling_Options"],
    supporting: ["Sleep_Hours", "Load_Score", "Practice_Minutes", "Energy"],
    background: ["Water_ml", "Caffeine_Score", "Sugar_Score"],
    lowWeight: ["Drink_Type", "Run_Detail_JSON"],
    boundaryTags: [
      "no_mental_health_diagnosis",
      "no_personality_inference",
      "no_therapy_assessment",
      "preserve_user_owned_meaning"
    ],
    status: "active"
  },
  practice_context: {
    key: "practice_context",
    labels: {
      th: "การภาวนา / บริบทการดูแลใจ",
      en: "Practice Context",
      zh: "练习 / 自我照顾"
    },
    declaration: {
      th: "วันนี้หนูขออ่านผ่านแกน “บริบทการภาวนา / การดูแลใจ” เป็นหลักนะคะ",
      en: "Today, I’ll read mainly through the practice-context root.",
      zh: "今天先从练习与自我照顾这个主轴来温柔观察。"
    },
    primary: ["Practice_Minutes", "Practice_Note", "Practice_Context"],
    supporting: ["Mind_State", "Sleep_Hours", "Load_Score"],
    background: ["Water_ml", "Caffeine_Score", "Energy"],
    lowWeight: ["Drink_Type", "Sugar_Score"],
    boundaryTags: ["no_spiritual_score", "no_success_failure_judgment", "no_causation", "preserve_user_owned_meaning"],
    status: "active"
  },
  auto: {
    key: "auto",
    labels: {
      th: "อัตโนมัติ",
      en: "Auto",
      zh: "自动"
    },
    declaration: {
      th: "วันนี้หนูจะรอแกนที่พี่เลือกหรือข้อมูลที่ชัดก่อนนะคะ",
      en: "Today, I’ll wait for a selected or clearly supported root before reading.",
      zh: "今天会先等待明确选择或有足够依据的主轴。"
    },
    primary: [],
    supporting: [],
    background: [],
    lowWeight: [],
    boundaryTags: ["no_summarize_everything", "no_hidden_root_guessing", "source_bound_only"],
    status: "future_policy_only"
  }
};

const REFLECTION_ROOT_SIGNAL_GROUPS = ["primary", "supporting", "background", "lowWeight"];

function cloneReflectionRootArray(values = []) {
  return Array.isArray(values) ? [...values] : [];
}

function normalizeReflectionRoot(root) {
  return typeof root === "string" && root.trim() ? root.trim() : "auto";
}

function isSupportedReflectionRoot(root) {
  return Object.prototype.hasOwnProperty.call(REFLECTION_ROOT_MATRIX, normalizeReflectionRoot(root));
}

function getReflectionRootConfig(root) {
  const rootKey = normalizeReflectionRoot(root);
  return REFLECTION_ROOT_MATRIX[rootKey] || REFLECTION_ROOT_MATRIX.auto || null;
}

function getReflectionRootLanguage(lang) {
  if (lang) return lang;
  try {
    return currentLanguage || "en";
  } catch (error) {
    return "en";
  }
}

function getReflectionRootLabel(root, lang) {
  const config = getReflectionRootConfig(root);
  const language = getReflectionRootLanguage(lang);
  return config?.labels?.[language] || config?.labels?.en || config?.key || normalizeReflectionRoot(root);
}

function getReflectionRootDeclaration(root, lang) {
  const config = getReflectionRootConfig(root);
  const language = getReflectionRootLanguage(lang);
  return config?.declaration?.[language] || config?.declaration?.en || "";
}

function getReflectionRootSignalGroups(root) {
  const config = getReflectionRootConfig(root);
  return REFLECTION_ROOT_SIGNAL_GROUPS.reduce((groups, groupKey) => {
    groups[groupKey] = cloneReflectionRootArray(config?.[groupKey]);
    return groups;
  }, {});
}

function getReflectionRootSignalWeights(root) {
  const groups = getReflectionRootSignalGroups(root);
  return REFLECTION_ROOT_SIGNAL_GROUPS.reduce((weights, groupKey) => {
    groups[groupKey].forEach((signalKey) => {
      if (!weights[signalKey]) {
        weights[signalKey] = groupKey;
      }
    });
    return weights;
  }, {});
}

function getReflectionRootBoundaryTags(root) {
  const config = getReflectionRootConfig(root);
  return cloneReflectionRootArray(config?.boundaryTags);
}

window.REFLECTION_ROOT_MATRIX = REFLECTION_ROOT_MATRIX;
window.REFLECTION_ROOT_SIGNAL_GROUPS = REFLECTION_ROOT_SIGNAL_GROUPS;
window.cloneReflectionRootArray = cloneReflectionRootArray;
window.normalizeReflectionRoot = normalizeReflectionRoot;
window.isSupportedReflectionRoot = isSupportedReflectionRoot;
window.getReflectionRootConfig = getReflectionRootConfig;
window.getReflectionRootLanguage = getReflectionRootLanguage;
window.getReflectionRootLabel = getReflectionRootLabel;
window.getReflectionRootDeclaration = getReflectionRootDeclaration;
window.getReflectionRootSignalGroups = getReflectionRootSignalGroups;
window.getReflectionRootSignalWeights = getReflectionRootSignalWeights;
window.getReflectionRootBoundaryTags = getReflectionRootBoundaryTags;
})();
