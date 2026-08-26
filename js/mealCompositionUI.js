(function initializeMealCompositionUI(globalScope) {
  const SUPPORTED_LANGUAGES = ["th", "en", "zh"];
  const CATEGORY_ORDER = [
    "grain",
    "animal_protein",
    "plant_protein",
    "egg",
    "vegetable",
    "fruit",
    "soup",
    "condiment",
    "processed_food",
    "dessert"
  ];

  const TEXT = {
    th: {
      kicker: "MEAL COMPOSITION",
      title: "มื้ออาหารวันนี้",
      intro: "ค่อย ๆ ประกอบสิ่งที่กินไว้เท่าที่จำได้ก็พอ",
      open: "เปิดประกอบมื้อ",
      close: "เก็บพื้นที่ประกอบมื้อ",
      recordedCount: (count) => `${count} มื้อที่บันทึกไว้`,
      chooseFood: "เลือกสิ่งที่อยู่ในมื้อนี้",
      chooseFoodHelper: "ค้นหาหรือเลือกตามหมวด แล้วค่อยปรับรายละเอียดเท่าที่จำได้",
      searchLabel: "ค้นหาอาหารหรือเครื่องปรุง",
      searchPlaceholder: "ค้นหา เช่น ไข่ ผัก น้ำปลา",
      allCategories: "ทั้งหมด",
      addFood: (name) => `เพิ่ม ${name} ลงมื้อนี้`,
      noFoodFound: "ยังไม่พบรายการที่ตรงกับคำค้นนี้",
      currentMeal: "มื้อนี้กำลังประกอบอยู่",
      draftKicker: "มื้อที่กำลังประกอบ",
      currentMealEmpty: "เลือกอาหารหรือเครื่องปรุงด้านบนเพื่อเริ่มประกอบมื้อนี้",
      mealLabel: "เรียกมื้อนี้ว่า",
      mealTime: "เวลา (ถ้าอยากเก็บไว้)",
      portion: "ปริมาณโดยประมาณ",
      preparation: "วิธีเตรียม (ถ้าจำได้)",
      removeItem: (name) => `เอา ${name} ออกจากมื้อนี้`,
      remove: "เอาออก",
      save: "เก็บมื้อนี้",
      saveChanges: "เก็บการแก้ไข",
      cancelEdit: "ยกเลิกการแก้ไข",
      saved: "เก็บมื้อนี้ไว้แล้วค่ะ",
      updated: "อัปเดตมื้อนี้แล้วค่ะ",
      deleted: "เอามื้อนี้ออกจากบันทึกแล้วค่ะ",
      saveNeedsItem: "เลือกอย่างน้อยหนึ่งรายการก่อนเก็บมื้อนี้นะคะ",
      invalidCustom: "ใส่จำนวนเท่าของหนึ่งหน่วยที่มากกว่า 0",
      draftEstimateTitle: "ภาพคร่าว ๆ ของมื้อนี้",
      estimateComplete: (range) => `ค่าประมาณโซเดียม: ${range}`,
      estimatePartial: (range) => `ค่าประมาณจากรายการที่มีข้อมูล: ${range}`,
      estimateUnknown: "รายการในมื้อนี้ยังไม่มีค่าประมาณโซเดียมที่รองรับพอ",
      estimatePartialNote: "บางรายการยังไม่มีค่าประมาณ จึงยังไม่ใช่ภาพครบทั้งมื้อ",
      evidenceRange: (range, serving) => `ประมาณ ${range} / ${serving}`,
      evidenceUnknown: "ยังไม่มีค่าประมาณที่รองรับพอ",
      savedMeals: "มื้อที่บันทึกไว้วันนี้",
      savedMealsEmpty: "ยังไม่มีมื้อที่บันทึกไว้วันนี้",
      editMeal: "แก้ไขมื้อนี้",
      deleteMeal: "เอามื้อนี้ออก",
      deleteConfirm: "เอามื้อนี้ออกจากบันทึกไหม",
      dailyReflectionKicker: "ภาพของมื้อที่บันทึกไว้",
      dailyReflectionTitle: "ค่อย ๆ มองมื้ออาหารของวันนี้",
      emptyReflection: [
        "วันนี้ยังไม่มีมื้อที่บันทึกไว้",
        "ถ้าอยากเก็บภาพคร่าว ๆ ของมื้อไหนไว้ เริ่มจากตรงนี้ได้เลย"
      ],
      dailyCount: (count) => `วันนี้มี ${count} มื้อที่บันทึกไว้ค่ะ`,
      composition: (parts) => `ในมื้อที่บันทึกไว้ มี${parts.join(" ")}ปรากฏอยู่ค่ะ`,
      animalProtein: "โปรตีนสัตว์",
      plantProtein: "โปรตีนพืช",
      vegetables: "ผัก",
      condimentPresence: (count) => `มีเครื่องปรุงใน ${count} มื้อที่บันทึกไว้`,
      dailySodiumComplete: (range) => `ค่าประมาณโซเดียมจากรายการที่มีข้อมูลครบอยู่ที่ ${range}`,
      dailySodiumPartial: (range) => `ค่าประมาณโซเดียมจากรายการที่รองรับได้อยู่ที่ ${range} และยังมีบางรายการที่ข้อมูลไม่ครบ`,
      dailySodiumUnknown: "รายการที่บันทึกไว้ยังไม่มีค่าประมาณโซเดียมที่รองรับพอ จึงอ่านภาพรวมแบบเบา ๆ ก่อนค่ะ",
      labels: {
        breakfast: "เช้า",
        lunch: "กลางวัน",
        dinner: "เย็น",
        snack: "ของว่าง",
        late_meal: "มื้อดึก",
        unnamed: "ไม่ระบุ"
      },
      portions: { small: "น้อย", regular: "ปกติ", large: "เยอะ", custom: "กำหนดเอง" },
      preparations: {
        "": "ยังไม่ระบุ",
        boiled: "ต้ม",
        steamed: "นึ่ง",
        grilled: "ย่าง",
        stir_fried: "ผัด",
        fried: "ทอด",
        roasted: "อบ",
        raw: "สด",
        soup: "ซุป",
        unknown: "ไม่แน่ใจ"
      },
      categories: {
        grain: "ข้าว / แป้ง",
        animal_protein: "โปรตีนสัตว์",
        plant_protein: "โปรตีนพืช",
        egg: "ไข่",
        vegetable: "ผัก",
        fruit: "ผลไม้",
        soup: "ซุป",
        condiment: "เครื่องปรุง",
        processed_food: "อาหารแปรรูป",
        dessert: "ของหวาน",
        other: "อื่น ๆ"
      }
    },
    en: {
      kicker: "MEAL COMPOSITION",
      title: "Today's meals",
      intro: "Gently assemble what you remember eating. A rough picture is enough.",
      open: "Open meal composer",
      close: "Close meal composer",
      recordedCount: (count) => `${count} recorded ${count === 1 ? "meal" : "meals"}`,
      chooseFood: "Choose what was in this meal",
      chooseFoodHelper: "Search or browse by category, then adjust only what you remember.",
      searchLabel: "Search foods or condiments",
      searchPlaceholder: "Search, for example egg, vegetables, fish sauce",
      allCategories: "All",
      addFood: (name) => `Add ${name} to this meal`,
      noFoodFound: "No reference item matches this search yet.",
      currentMeal: "This meal is taking shape",
      draftKicker: "MEAL IN PROGRESS",
      currentMealEmpty: "Choose a food or condiment above to begin this meal.",
      mealLabel: "Meal label",
      mealTime: "Time (optional)",
      portion: "Approximate portion",
      preparation: "Preparation (optional)",
      removeItem: (name) => `Remove ${name} from this meal`,
      remove: "Remove",
      save: "Keep this meal",
      saveChanges: "Keep changes",
      cancelEdit: "Cancel editing",
      saved: "This meal has been kept.",
      updated: "This meal has been updated.",
      deleted: "This meal was removed from the record.",
      saveNeedsItem: "Choose at least one item before keeping this meal.",
      invalidCustom: "Enter a serving multiplier greater than 0.",
      draftEstimateTitle: "A rough view of this meal",
      estimateComplete: (range) => `Estimated sodium: ${range}`,
      estimatePartial: (range) => `Estimate from supported items: ${range}`,
      estimateUnknown: "The items in this meal do not yet have enough supported sodium estimates.",
      estimatePartialNote: "Some items remain unknown, so this is not a complete view of the meal.",
      evidenceRange: (range, serving) => `About ${range} / ${serving}`,
      evidenceUnknown: "No sufficiently supported estimate yet",
      savedMeals: "Meals recorded today",
      savedMealsEmpty: "No meals have been recorded today yet.",
      editMeal: "Edit this meal",
      deleteMeal: "Remove this meal",
      deleteConfirm: "Remove this meal from the record?",
      dailyReflectionKicker: "A view from recorded meals",
      dailyReflectionTitle: "A gentle look at today's meals",
      emptyReflection: [
        "There are no recorded meals today yet.",
        "If you would like to keep a rough picture of a meal, you can begin here."
      ],
      dailyCount: (count) => `There ${count === 1 ? "is" : "are"} ${count} recorded ${count === 1 ? "meal" : "meals"} today.`,
      composition: (parts) => `The recorded meals include ${parts.join(", ")}.`,
      animalProtein: "animal protein",
      plantProtein: "plant protein",
      vegetables: "vegetables",
      condimentPresence: (count) => `Condiments appear in ${count} recorded ${count === 1 ? "meal" : "meals"}.`,
      dailySodiumComplete: (range) => `The supported sodium estimate for the recorded items is ${range}.`,
      dailySodiumPartial: (range) => `Supported items give a sodium estimate of ${range}; some recorded items still have incomplete evidence.`,
      dailySodiumUnknown: "The recorded items do not yet have enough supported sodium estimates, so this view stays light for now.",
      labels: {
        breakfast: "Breakfast",
        lunch: "Lunch",
        dinner: "Dinner",
        snack: "Snack",
        late_meal: "Late meal",
        unnamed: "Unspecified"
      },
      portions: { small: "Small", regular: "Regular", large: "Large", custom: "Custom" },
      preparations: {
        "": "Not recorded",
        boiled: "Boiled",
        steamed: "Steamed",
        grilled: "Grilled",
        stir_fried: "Stir-fried",
        fried: "Fried",
        roasted: "Roasted",
        raw: "Raw",
        soup: "Soup",
        unknown: "Not sure"
      },
      categories: {
        grain: "Rice / staples",
        animal_protein: "Animal protein",
        plant_protein: "Plant protein",
        egg: "Egg",
        vegetable: "Vegetables",
        fruit: "Fruit",
        soup: "Soup",
        condiment: "Condiments",
        processed_food: "Processed foods",
        dessert: "Dessert",
        other: "Other"
      }
    },
    zh: {
      kicker: "MEAL COMPOSITION",
      title: "今天的餐食",
      intro: "记得多少，就轻轻拼出多少；留下大致的样子就够了。",
      open: "打开餐食组合区",
      close: "收起餐食组合区",
      recordedCount: (count) => `已记录 ${count} 餐`,
      chooseFood: "选择这一餐里记录的食物",
      chooseFoodHelper: "可以搜索或按类别浏览，只调整自己还记得的部分。",
      searchLabel: "搜索食物或调味品",
      searchPlaceholder: "例如：鸡蛋、蔬菜、鱼露",
      allCategories: "全部",
      addFood: (name) => `把${name}加入这一餐`,
      noFoodFound: "暂时没有符合这次搜索的参考条目。",
      currentMeal: "正在轻轻拼出这一餐",
      draftKicker: "正在组合",
      currentMealEmpty: "从上方选择一种食物或调味品，就可以开始记录这一餐。",
      mealLabel: "这一餐的名称",
      mealTime: "时间（可留空）",
      portion: "大致份量",
      preparation: "烹调方式（可留空）",
      removeItem: (name) => `从这一餐移除${name}`,
      remove: "移除",
      save: "留下这一餐",
      saveChanges: "保存修改",
      cancelEdit: "取消修改",
      saved: "这一餐已经留下来了。",
      updated: "这一餐已经更新。",
      deleted: "这一餐已从记录中移除。",
      saveNeedsItem: "请先选择至少一项，再留下这一餐。",
      invalidCustom: "请输入大于 0 的份量倍数。",
      draftEstimateTitle: "这一餐的大致样子",
      estimateComplete: (range) => `钠含量估算：${range}`,
      estimatePartial: (range) => `有资料支持的条目估算：${range}`,
      estimateUnknown: "这一餐里的条目目前还没有足够可靠的钠含量估算。",
      estimatePartialNote: "有些条目仍缺少估算资料，因此这还不是整餐的完整图像。",
      evidenceRange: (range, serving) => `约 ${range} / ${serving}`,
      evidenceUnknown: "目前还没有足够可靠的估算",
      savedMeals: "今天已记录的餐食",
      savedMealsEmpty: "今天还没有记录餐食。",
      editMeal: "修改这一餐",
      deleteMeal: "移除这一餐",
      deleteConfirm: "要把这一餐从记录中移除吗？",
      dailyReflectionKicker: "从已记录餐食看到的样子",
      dailyReflectionTitle: "轻轻看看今天的餐食",
      emptyReflection: [
        "今天还没有记录餐食。",
        "如果想留下某一餐的大致样子，可以从这里开始。"
      ],
      dailyCount: (count) => `今天有 ${count} 餐被记录下来。`,
      composition: (parts) => `已记录的餐食里出现了${parts.join("、")}。`,
      animalProtein: "动物蛋白",
      plantProtein: "植物蛋白",
      vegetables: "蔬菜",
      condimentPresence: (count) => `已记录的 ${count} 餐中出现了调味品。`,
      dailySodiumComplete: (range) => `已记录条目中有资料支持的钠含量估算为 ${range}。`,
      dailySodiumPartial: (range) => `有资料支持的条目给出 ${range} 的钠含量估算；部分已记录条目仍缺少完整资料。`,
      dailySodiumUnknown: "已记录条目目前还没有足够可靠的钠含量估算，因此先轻轻看看整体就好。",
      labels: {
        breakfast: "早餐",
        lunch: "午餐",
        dinner: "晚餐",
        snack: "点心",
        late_meal: "较晚的一餐",
        unnamed: "不注明"
      },
      portions: { small: "少量", regular: "一般", large: "较多", custom: "自定义" },
      preparations: {
        "": "未记录",
        boiled: "水煮",
        steamed: "蒸",
        grilled: "烤",
        stir_fried: "炒",
        fried: "油炸",
        roasted: "烘烤",
        raw: "生食",
        soup: "汤",
        unknown: "不确定"
      },
      categories: {
        grain: "米饭 / 主食",
        animal_protein: "动物蛋白",
        plant_protein: "植物蛋白",
        egg: "鸡蛋",
        vegetable: "蔬菜",
        fruit: "水果",
        soup: "汤",
        condiment: "调味品",
        processed_food: "加工食品",
        dessert: "甜点",
        other: "其他"
      }
    }
  };

  const FOOD_ICONS = Object.freeze({
    rice: "🍚",
    brown_rice: "🍚",
    noodles: "🍜",
    chicken_breast: "🍗",
    chicken: "🍗",
    pork_lean: "🥩",
    beef: "🥩",
    fish: "🐟",
    shrimp: "🍤",
    squid: "🦑",
    egg: "🥚",
    tofu: "◻",
    tempeh: "◻",
    mixed_vegetables: "🥬",
    leafy_vegetables: "🥬",
    fruit: "🍎",
    clear_soup: "🥣",
    fish_sauce: "🥄",
    soy_sauce: "🥄",
    oyster_sauce: "🥄",
    seasoning_powder: "🥄",
    soup_base: "🥣",
    dipping_sauce: "🥄",
    processed_sausage: "◌",
    fried_snack: "◇",
    dessert: "🍮"
  });

  function normalizeLanguage(language) {
    return SUPPORTED_LANGUAGES.includes(language) ? language : "th";
  }

  function getText(language) {
    return TEXT[normalizeLanguage(language)];
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatNumber(value, language) {
    const locale = language === "en" ? "en-US" : language === "zh" ? "zh-CN" : "th-TH";
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value);
  }

  function formatRange(min, max, language) {
    if (!Number.isFinite(min) || !Number.isFinite(max)) return "";
    return `${formatNumber(min, language)}–${formatNumber(max, language)} mg`;
  }

  function buildDailyReflectionLines(summary, language = "th") {
    const copy = getText(language);
    if (!summary || summary.recorded_meal_count === 0) return [...copy.emptyReflection];

    const lines = [copy.dailyCount(summary.recorded_meal_count)];
    const composition = [];
    if (summary.animal_protein_meals > 0) composition.push(copy.animalProtein);
    if (summary.plant_protein_meals > 0) composition.push(copy.plantProtein);
    if (summary.vegetable_present_meals > 0) composition.push(copy.vegetables);
    if (composition.length) lines.push(copy.composition(composition));
    if (summary.meals_with_recorded_condiments > 0) {
      lines.push(copy.condimentPresence(summary.meals_with_recorded_condiments));
    }

    const range = formatRange(summary.estimated_sodium_min_mg, summary.estimated_sodium_max_mg, language);
    if (summary.sodium_estimate_coverage === "complete" && range) {
      lines.push(copy.dailySodiumComplete(range));
    } else if (summary.sodium_estimate_coverage === "partial" && range) {
      lines.push(copy.dailySodiumPartial(range));
    } else {
      lines.push(copy.dailySodiumUnknown);
    }
    return lines.slice(0, 4);
  }

  function createEmptyDraft() {
    return {
      mealId: "",
      mealLabel: "unnamed",
      time: "",
      items: []
    };
  }

  function cloneItem(item) {
    return { ...item };
  }

  function createMealComposerModel(options = {}) {
    const runtime = options.runtime;
    if (!runtime) throw new Error("Meal Composition runtime is required.");
    const store = options.store || runtime.createMealStore(options.storage, {
      normalizeDate: options.normalizeDate,
      now: options.now,
      createId: options.createId,
      warn: options.warn,
      library: options.library || runtime.getFoodReferenceLibrary(),
      language: normalizeLanguage(options.language)
    });
    const library = options.library || runtime.getFoodReferenceLibrary();
    let date = String(options.date || "").trim();
    let language = normalizeLanguage(options.language);
    let draft = createEmptyDraft();

    function resetDraft() {
      draft = createEmptyDraft();
      return getDraft();
    }

    function getDraft() {
      return {
        ...draft,
        items: draft.items.map(cloneItem)
      };
    }

    function addFood(foodId) {
      const reference = runtime.getFoodReferenceById(foodId);
      if (!reference) return null;
      const item = store.createMealItem({
        food_id: reference.food_id,
        portion_label: "regular",
        preparation: reference.preparation_default || ""
      });
      if (!item) return null;
      draft.items.push(item);
      return cloneItem(item);
    }

    function updateDraftItem(mealItemId, updates = {}) {
      const index = draft.items.findIndex((item) => item.meal_item_id === mealItemId);
      if (index < 0) return null;
      const existing = draft.items[index];
      const reference = runtime.getFoodReferenceById(existing.food_id);
      const item = runtime.createMealItem({
        ...existing,
        ...updates,
        meal_item_id: existing.meal_item_id,
        food_id: existing.food_id,
        display_name_snapshot: existing.display_name_snapshot
      }, reference, { language });
      if (!item) return null;
      draft.items[index] = item;
      return cloneItem(item);
    }

    function removeDraftItem(mealItemId) {
      const length = draft.items.length;
      draft.items = draft.items.filter((item) => item.meal_item_id !== mealItemId);
      return draft.items.length !== length;
    }

    function setDraftMeta(updates = {}) {
      if (Object.prototype.hasOwnProperty.call(updates, "mealLabel")) {
        draft.mealLabel = ["breakfast", "lunch", "dinner", "snack", "late_meal", "unnamed"].includes(updates.mealLabel)
          ? updates.mealLabel
          : "unnamed";
      }
      if (Object.prototype.hasOwnProperty.call(updates, "time")) draft.time = String(updates.time || "").trim();
      return getDraft();
    }

    function saveDraft() {
      if (!date || !draft.items.length) return null;
      const input = {
        date,
        time: draft.time,
        meal_label: draft.mealLabel,
        items: draft.items.map(cloneItem),
        meal_note: ""
      };
      const wasEditing = Boolean(draft.mealId);
      const meal = wasEditing ? store.updateMeal(draft.mealId, input) : store.createMeal(input);
      if (!meal) return null;
      resetDraft();
      return { meal, wasEditing };
    }

    function editMeal(mealId) {
      const meal = store.getMealsForDate(date).find((record) => record.meal_id === mealId);
      if (!meal) return null;
      draft = {
        mealId: meal.meal_id,
        mealLabel: meal.meal_label,
        time: meal.time,
        items: meal.items.map(cloneItem)
      };
      return getDraft();
    }

    function deleteMeal(mealId) {
      const deleted = store.deleteMeal(mealId);
      if (deleted && draft.mealId === mealId) resetDraft();
      return deleted;
    }

    return Object.freeze({
      getLibrary: () => library,
      getLanguage: () => language,
      setLanguage: (nextLanguage) => { language = normalizeLanguage(nextLanguage); },
      getDate: () => date,
      setDate: (nextDate) => {
        const normalized = String(nextDate || "").trim();
        if (normalized !== date) {
          date = normalized;
          resetDraft();
        }
      },
      getDraft,
      resetDraft,
      addFood,
      updateDraftItem,
      removeDraftItem,
      setDraftMeta,
      saveDraft,
      editMeal,
      deleteMeal,
      getMeals: () => store.getMealsForDate(date),
      getDraftEstimate: () => runtime.deriveMealEstimate({ items: draft.items }),
      getDailySummary: () => runtime.deriveDailyMealSummary(date, store.getMealsForDate(date), library)
    });
  }

  function getFoodIcon(reference) {
    return FOOD_ICONS[reference?.food_id] || "·";
  }

  function getCategoryKeys(library) {
    const found = new Set(library.map((reference) => reference.category || "other"));
    return [...CATEGORY_ORDER.filter((category) => found.has(category)), ...[...found].filter((category) => !CATEGORY_ORDER.includes(category))];
  }

  function renderOptions(entries, selected) {
    return Object.entries(entries).map(([value, label]) => `
      <option value="${escapeHtml(value)}"${value === selected ? " selected" : ""}>${escapeHtml(label)}</option>
    `).join("");
  }

  function createMealComposerUI(options = {}) {
    const root = options.root;
    if (!root) return null;
    const runtime = options.runtime;
    const model = options.model || createMealComposerModel(options);
    const confirmAction = options.confirmAction || ((message) => globalScope.confirm(message));
    let language = normalizeLanguage(options.language);
    let isOpen = false;
    let category = "grain";
    let search = "";
    let status = "";

    const headerTitle = root.querySelector("[data-meal-title]");
    const headerIntro = root.querySelector("[data-meal-intro]");
    const countBadge = root.querySelector("[data-meal-count]");
    const toggle = root.querySelector("[data-meal-toggle]");
    const workspace = root.querySelector("[data-meal-workspace]");
    const content = root.querySelector("[data-meal-content]");
    const reflection = root.querySelector("[data-meal-reflection]");
    const statusNode = root.querySelector("[data-meal-status]");

    function foodName(reference) {
      return runtime.getFoodDisplayName(reference, language);
    }

    function scrollBehavior() {
      return globalScope.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ? "auto" : "smooth";
    }

    function itemServingBasis(reference, item) {
      let base = reference?.default_serving_label || "1 serving";
      if (reference?.default_serving_unit === "tbsp") base = "1 tbsp";
      if (reference?.default_serving_unit === "egg") {
        base = language === "th" ? "ไข่ต้มฟองใหญ่ 1 ฟอง" : language === "zh" ? "1 枚大号水煮蛋" : "1 large boiled egg";
      }
      return item.serving_multiplier === 1 ? base : `${formatNumber(item.serving_multiplier, language)} × ${base}`;
    }

    function renderHeader() {
      const copy = getText(language);
      const count = model.getMeals().length;
      headerTitle.textContent = copy.title;
      headerIntro.textContent = copy.intro;
      countBadge.textContent = copy.recordedCount(count);
      toggle.textContent = isOpen ? copy.close : copy.open;
      toggle.setAttribute("aria-expanded", String(isOpen));
      workspace.hidden = !isOpen;
    }

    function renderFoodPicker() {
      const copy = getText(language);
      const library = model.getLibrary();
      const normalizedSearch = search.trim().toLocaleLowerCase(language === "zh" ? "zh-CN" : language === "en" ? "en-US" : "th-TH");
      const filtered = library.filter((reference) => {
        const matchesCategory = normalizedSearch || category === "all" || reference.category === category;
        const haystack = [reference.display_name_th, reference.display_name_en, reference.display_name_zh, reference.food_id]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase();
        return matchesCategory && (!normalizedSearch || haystack.includes(normalizedSearch));
      });
      const categoryButtons = ["all", ...getCategoryKeys(library)].map((key) => {
        const label = key === "all" ? copy.allCategories : copy.categories[key] || copy.categories.other;
        return `<button type="button" class="meal-category-chip${category === key ? " is-active" : ""}" data-meal-category="${escapeHtml(key)}" aria-pressed="${category === key}">${escapeHtml(label)}</button>`;
      }).join("");
      const foodButtons = filtered.map((reference) => {
        const name = foodName(reference);
        const detail = copy.categories[reference.category] || copy.categories.other;
        return `
          <button type="button" class="meal-food-option" data-add-food="${escapeHtml(reference.food_id)}" aria-label="${escapeHtml(copy.addFood(name))}">
            <span class="meal-food-icon" aria-hidden="true">${escapeHtml(getFoodIcon(reference))}</span>
            <span class="meal-food-copy">
              <strong>${escapeHtml(name)}</strong>
              <span>${escapeHtml(detail)}</span>
            </span>
            <span class="meal-food-add" aria-hidden="true">+</span>
          </button>
        `;
      }).join("");
      return `
        <section class="meal-picker" aria-labelledby="mealPickerTitle">
          <div class="meal-section-heading">
            <div>
              <h3 id="mealPickerTitle">${escapeHtml(copy.chooseFood)}</h3>
              <p>${escapeHtml(copy.chooseFoodHelper)}</p>
            </div>
            <label class="meal-search">
              <span class="sr-only">${escapeHtml(copy.searchLabel)}</span>
              <input type="search" data-meal-search value="${escapeHtml(search)}" placeholder="${escapeHtml(copy.searchPlaceholder)}" autocomplete="off">
            </label>
          </div>
          <div class="meal-category-list" role="group" aria-label="${escapeHtml(copy.chooseFood)}">${categoryButtons}</div>
          <div class="meal-food-grid">${foodButtons || `<p class="meal-inline-empty">${escapeHtml(copy.noFoodFound)}</p>`}</div>
        </section>
      `;
    }

    function renderDraftItem(item) {
      const copy = getText(language);
      const reference = runtime.getFoodReferenceById(item.food_id);
      const name = foodName(reference) || item.display_name_snapshot;
      const known = Number.isFinite(item.sodium_estimate_min_mg) && Number.isFinite(item.sodium_estimate_max_mg);
      const evidence = known
        ? copy.evidenceRange(formatRange(item.sodium_estimate_min_mg, item.sodium_estimate_max_mg, language), itemServingBasis(reference, item))
        : copy.evidenceUnknown;
      const customControl = item.portion_label === "custom"
        ? `<label class="meal-custom-portion"><span>${escapeHtml(copy.portion)}</span><input type="number" min="0.1" step="0.1" value="${escapeHtml(item.serving_multiplier)}" data-meal-custom-multiplier="${escapeHtml(item.meal_item_id)}"></label>`
        : "";
      return `
        <article class="meal-draft-item" data-draft-item="${escapeHtml(item.meal_item_id)}">
          <div class="meal-draft-item-heading">
            <span class="meal-food-icon" aria-hidden="true">${escapeHtml(getFoodIcon(reference))}</span>
            <div>
              <h4>${escapeHtml(name)}</h4>
              <p>${escapeHtml(evidence)}</p>
            </div>
            <button type="button" class="meal-remove-button" data-remove-draft-item="${escapeHtml(item.meal_item_id)}" aria-label="${escapeHtml(copy.removeItem(name))}">${escapeHtml(copy.remove)}</button>
          </div>
          <div class="meal-item-controls">
            <label>
              <span>${escapeHtml(copy.portion)}</span>
              <select data-meal-portion="${escapeHtml(item.meal_item_id)}">${renderOptions(copy.portions, item.portion_label)}</select>
            </label>
            <label>
              <span>${escapeHtml(copy.preparation)}</span>
              <select data-meal-preparation="${escapeHtml(item.meal_item_id)}">${renderOptions(copy.preparations, item.preparation)}</select>
            </label>
            ${customControl}
          </div>
        </article>
      `;
    }

    function renderDraft() {
      const copy = getText(language);
      const draft = model.getDraft();
      const estimate = model.getDraftEstimate();
      let estimateText = copy.estimateUnknown;
      let estimateNote = "";
      const range = formatRange(estimate.estimated_sodium_min_mg, estimate.estimated_sodium_max_mg, language);
      if (estimate.sodium_estimate_coverage === "complete" && range) estimateText = copy.estimateComplete(range);
      if (estimate.sodium_estimate_coverage === "partial" && range) {
        estimateText = copy.estimatePartial(range);
        estimateNote = copy.estimatePartialNote;
      }
      const items = draft.items.length
        ? draft.items.map(renderDraftItem).join("")
        : `<p class="meal-inline-empty meal-draft-empty">${escapeHtml(copy.currentMealEmpty)}</p>`;
      return `
        <section class="meal-draft" aria-labelledby="mealDraftTitle">
          <div class="meal-section-heading meal-draft-heading">
            <div>
              <p class="section-kicker">${draft.mealId ? escapeHtml(copy.editMeal) : escapeHtml(copy.draftKicker)}</p>
              <h3 id="mealDraftTitle">${escapeHtml(copy.currentMeal)}</h3>
            </div>
            <div class="meal-meta-controls">
              <label><span>${escapeHtml(copy.mealLabel)}</span><select data-meal-label>${renderOptions(copy.labels, draft.mealLabel)}</select></label>
              <label><span>${escapeHtml(copy.mealTime)}</span><input type="time" data-meal-time value="${escapeHtml(draft.time)}"></label>
            </div>
          </div>
          <div class="meal-draft-list">${items}</div>
          <div class="meal-draft-footer">
            <div class="meal-estimate" aria-live="polite">
              <span>${escapeHtml(copy.draftEstimateTitle)}</span>
              <strong>${escapeHtml(estimateText)}</strong>
              ${estimateNote ? `<small>${escapeHtml(estimateNote)}</small>` : ""}
            </div>
            <div class="meal-draft-actions">
              ${draft.mealId ? `<button type="button" class="ghost-button" data-cancel-meal-edit>${escapeHtml(copy.cancelEdit)}</button>` : ""}
              <button type="button" class="primary-button" data-save-meal${draft.items.length ? "" : " disabled"}>${escapeHtml(draft.mealId ? copy.saveChanges : copy.save)}</button>
            </div>
          </div>
        </section>
      `;
    }

    function renderSavedMeals() {
      const copy = getText(language);
      const meals = model.getMeals();
      const cards = meals.length ? meals.map((meal) => {
        const names = meal.items.map((item) => foodName(runtime.getFoodReferenceById(item.food_id)) || item.display_name_snapshot);
        return `
          <article class="meal-saved-item">
            <div>
              <p class="meal-saved-meta">${escapeHtml(meal.time || "·")} · ${escapeHtml(copy.labels[meal.meal_label] || copy.labels.unnamed)}</p>
              <h4>${escapeHtml(names.join(" · "))}</h4>
            </div>
            <div class="meal-saved-actions">
              <button type="button" class="meal-text-button" data-edit-meal="${escapeHtml(meal.meal_id)}">${escapeHtml(copy.editMeal)}</button>
              <button type="button" class="meal-text-button meal-text-button--remove" data-delete-meal="${escapeHtml(meal.meal_id)}">${escapeHtml(copy.deleteMeal)}</button>
            </div>
          </article>
        `;
      }).join("") : `<p class="meal-inline-empty">${escapeHtml(copy.savedMealsEmpty)}</p>`;
      return `
        <section class="meal-saved" aria-labelledby="mealSavedTitle">
          <div class="meal-section-heading"><h3 id="mealSavedTitle">${escapeHtml(copy.savedMeals)}</h3></div>
          <div class="meal-saved-list">${cards}</div>
        </section>
      `;
    }

    function renderReflection() {
      const copy = getText(language);
      const lines = buildDailyReflectionLines(model.getDailySummary(), language);
      reflection.innerHTML = `
        <p class="section-kicker">${escapeHtml(copy.dailyReflectionKicker)}</p>
        <h3>${escapeHtml(copy.dailyReflectionTitle)}</h3>
        <div class="meal-reflection-copy">${lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}</div>
      `;
    }

    function render() {
      renderHeader();
      if (isOpen) content.innerHTML = `${renderFoodPicker()}${renderDraft()}${renderSavedMeals()}`;
      renderReflection();
      statusNode.textContent = status;
    }

    root.addEventListener("click", (event) => {
      const action = event.target.closest("button");
      if (!action) return;
      if (action.matches("[data-meal-toggle]")) {
        isOpen = !isOpen;
        render();
        if (isOpen) workspace.focus({ preventScroll: true });
        return;
      }
      if (action.dataset.mealCategory) {
        category = action.dataset.mealCategory;
        render();
        return;
      }
      if (action.dataset.addFood) {
        model.addFood(action.dataset.addFood);
        status = "";
        render();
        root.querySelector(".meal-draft")?.scrollIntoView({ behavior: scrollBehavior(), block: "nearest" });
        return;
      }
      if (action.dataset.removeDraftItem) {
        model.removeDraftItem(action.dataset.removeDraftItem);
        render();
        return;
      }
      if (action.hasAttribute("data-save-meal")) {
        const result = model.saveDraft();
        status = result ? (result.wasEditing ? getText(language).updated : getText(language).saved) : getText(language).saveNeedsItem;
        render();
        return;
      }
      if (action.hasAttribute("data-cancel-meal-edit")) {
        model.resetDraft();
        status = "";
        render();
        return;
      }
      if (action.dataset.editMeal) {
        if (model.editMeal(action.dataset.editMeal)) {
          status = "";
          isOpen = true;
          render();
          root.querySelector(".meal-draft")?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
        }
        return;
      }
      if (action.dataset.deleteMeal && confirmAction(getText(language).deleteConfirm)) {
        if (model.deleteMeal(action.dataset.deleteMeal)) status = getText(language).deleted;
        render();
      }
    });

    root.addEventListener("input", (event) => {
      if (event.target.matches("[data-meal-search]")) {
        search = event.target.value;
        const cursor = event.target.selectionStart;
        render();
        const nextSearch = root.querySelector("[data-meal-search]");
        nextSearch?.focus();
        nextSearch?.setSelectionRange(cursor, cursor);
      }
    });

    root.addEventListener("change", (event) => {
      if (event.target.matches("[data-meal-label]")) model.setDraftMeta({ mealLabel: event.target.value });
      if (event.target.matches("[data-meal-time]")) model.setDraftMeta({ time: event.target.value });
      if (event.target.matches("[data-meal-portion]")) {
        const itemId = event.target.dataset.mealPortion;
        const portionLabel = event.target.value;
        model.updateDraftItem(itemId, {
          portion_label: portionLabel,
          serving_multiplier: portionLabel === "custom" ? 1 : undefined
        });
      }
      if (event.target.matches("[data-meal-preparation]")) {
        model.updateDraftItem(event.target.dataset.mealPreparation, { preparation: event.target.value });
      }
      if (event.target.matches("[data-meal-custom-multiplier]")) {
        const itemId = event.target.dataset.mealCustomMultiplier;
        const updated = model.updateDraftItem(itemId, { portion_label: "custom", serving_multiplier: event.target.value });
        status = updated ? "" : getText(language).invalidCustom;
      }
      render();
    });

    render();

    return Object.freeze({
      render,
      setLanguage(nextLanguage) {
        language = normalizeLanguage(nextLanguage);
        model.setLanguage(language);
        render();
      },
      setDate(nextDate) {
        model.setDate(nextDate);
        render();
      },
      open() {
        isOpen = true;
        render();
      },
      getModel: () => model
    });
  }

  const api = Object.freeze({
    SUPPORTED_LANGUAGES,
    TEXT,
    normalizeLanguage,
    formatRange,
    buildDailyReflectionLines,
    createMealComposerModel,
    createMealComposerUI
  });

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  globalScope.MHBMealUI = api;
})(typeof window !== "undefined" ? window : globalThis);
