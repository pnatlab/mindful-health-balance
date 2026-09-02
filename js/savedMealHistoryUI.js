(function initializeSavedMealHistoryUI(globalScope) {
  const SUPPORTED_LANGUAGES = Object.freeze(["th", "en", "zh"]);
  const MAX_VISIBLE_ITEMS = 6;
  const TEXT = Object.freeze({
    th: Object.freeze({
      title: "มื้อที่บันทึกไว้",
      helper: "ประวัติมื้อที่ผ่านการบันทึกแล้ว · อ่านอย่างเดียว",
      expand: "แสดงมื้อที่บันทึกไว้",
      collapse: "พับมื้อที่บันทึกไว้",
      count: (count) => `${count} มื้อ`,
      empty: "ยังไม่มีมื้อที่บันทึกไว้",
      itemCount: (count) => `${count} รายการ`,
      moreItems: (count) => `และอีก ${count} รายการ`,
      labels: Object.freeze({ breakfast: "มื้อเช้า", lunch: "มื้อกลางวัน", dinner: "มื้อเย็น", snack: "ของว่าง", late_meal: "มื้อดึก", custom: "มื้อที่ตั้งเอง", unnamed: "ไม่ระบุ" }),
      mealTypes: Object.freeze({ unspecified: "", stir_fried: "ผัด", boiled: "ต้ม", curry: "แกง", fried: "ทอด", grilled: "ย่าง", steamed: "นึ่ง", broth_based: "อาหารน้ำ", minimally_prepared: "สด / เตรียมน้อย", other: "อื่น ๆ" })
    }),
    en: Object.freeze({
      title: "Saved Meal History",
      helper: "A read-only history of meals that were explicitly saved.",
      expand: "Show saved meal history",
      collapse: "Collapse saved meal history",
      count: (count) => `${count} ${count === 1 ? "meal" : "meals"}`,
      empty: "There are no saved meals yet.",
      itemCount: (count) => `${count} ${count === 1 ? "item" : "items"}`,
      moreItems: (count) => `and ${count} more ${count === 1 ? "item" : "items"}`,
      labels: Object.freeze({ breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner", snack: "Snack", late_meal: "Late meal", custom: "Custom meal", unnamed: "Unspecified" }),
      mealTypes: Object.freeze({ unspecified: "", stir_fried: "Stir-fried", boiled: "Boiled", curry: "Curry", fried: "Fried", grilled: "Grilled", steamed: "Steamed", broth_based: "Broth-based", minimally_prepared: "Minimally prepared", other: "Other" })
    }),
    zh: Object.freeze({
      title: "已保存的餐食记录",
      helper: "已明确保存的餐食只读记录。",
      expand: "显示已保存的餐食记录",
      collapse: "收起已保存的餐食记录",
      count: (count) => `${count} 餐`,
      empty: "还没有已保存的餐食。",
      itemCount: (count) => `${count} 项`,
      moreItems: (count) => `另有 ${count} 项`,
      labels: Object.freeze({ breakfast: "早餐", lunch: "午餐", dinner: "晚餐", snack: "加餐", late_meal: "夜餐", custom: "自定义餐食", unnamed: "未指定" }),
      mealTypes: Object.freeze({ unspecified: "", stir_fried: "炒", boiled: "煮", curry: "咖喱", fried: "炸", grilled: "烤", steamed: "蒸", broth_based: "汤类", minimally_prepared: "简单处理", other: "其他" })
    })
  });

  function normalizeLanguage(language) {
    return SUPPORTED_LANGUAGES.includes(language) ? language : "th";
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function cleanText(value) {
    return String(value ?? "").trim();
  }

  function sortSavedMealsNewestFirst(records) {
    return Object.freeze((Array.isArray(records) ? records : []).filter((meal) => meal && typeof meal === "object").slice().sort((left, right) => {
      const leftKey = `${cleanText(left.date)}|${cleanText(left.time)}|${cleanText(left.created_at)}|${cleanText(left.meal_id)}`;
      const rightKey = `${cleanText(right.date)}|${cleanText(right.time)}|${cleanText(right.created_at)}|${cleanText(right.meal_id)}`;
      return rightKey.localeCompare(leftKey);
    }));
  }

  function formatDate(date, language) {
    const value = cleanText(date);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const [year, month, day] = value.split("-").map(Number);
    const locale = language === "zh" ? "zh-CN" : language === "en" ? "en-GB" : "th-TH";
    return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, day)));
  }

  function projectSavedMeal(meal, runtime, language) {
    const items = (Array.isArray(meal?.items) ? meal.items : []).map((item) => {
      const snapshot = cleanText(item?.display_name_snapshot);
      if (snapshot) return snapshot;
      const reference = runtime?.getFoodReferenceById?.(cleanText(item?.food_id));
      return cleanText(runtime?.getFoodDisplayName?.(reference, language));
    }).filter(Boolean);
    return Object.freeze({
      mealId: cleanText(meal?.meal_id),
      date: cleanText(meal?.date),
      time: cleanText(meal?.time),
      mealName: cleanText(meal?.meal_name),
      mealLabel: cleanText(meal?.meal_label) || "unnamed",
      customMealLabel: cleanText(meal?.custom_meal_label),
      mealType: cleanText(meal?.meal_type) || "unspecified",
      items: Object.freeze(items),
      itemCount: Array.isArray(meal?.items) ? meal.items.length : 0
    });
  }

  function createSavedMealHistoryPanel(options = {}) {
    const root = options.root;
    if (!root) return null;

    const getMeals = typeof options.getMeals === "function" ? options.getMeals : () => [];
    const runtime = options.runtime || {};
    const panelId = cleanText(options.panelId) || "savedMealHistoryDetails";
    let language = normalizeLanguage(options.language);
    let expanded = false;

    function render() {
      const copy = TEXT[language];
      let records = [];
      try {
        records = getMeals() || [];
      } catch {
        records = [];
      }
      const meals = sortSavedMealsNewestFirst(records).map((meal) => projectSavedMeal(meal, runtime, language));
      const body = meals.length
        ? meals.map((meal) => {
          const label = meal.mealLabel === "custom" ? meal.customMealLabel : copy.labels[meal.mealLabel] || copy.labels.unnamed;
          const mealType = copy.mealTypes[meal.mealType] || "";
          const facts = [label, mealType].filter(Boolean);
          const visibleItems = meal.items.slice(0, MAX_VISIBLE_ITEMS);
          const additionalItemCount = Math.max(0, meal.items.length - visibleItems.length);
          return `
            <li class="saved-meal-history-item">
              <div class="saved-meal-history-item__meta">${escapeHtml([formatDate(meal.date, language), meal.time].filter(Boolean).join(" · "))}</div>
              ${meal.mealName ? `<strong class="saved-meal-history-item__name">${escapeHtml(meal.mealName)}</strong>` : ""}
              ${facts.length ? `<span class="saved-meal-history-item__facts">${escapeHtml(facts.join(" · "))}</span>` : ""}
              ${visibleItems.length ? `<span class="saved-meal-history-item__items">${escapeHtml(visibleItems.join(" · "))}${additionalItemCount ? ` · ${escapeHtml(copy.moreItems(additionalItemCount))}` : ""}</span>` : ""}
              <span class="saved-meal-history-item__count">${escapeHtml(copy.itemCount(meal.itemCount))}</span>
            </li>
          `;
        }).join("")
        : "";

      root.innerHTML = `
        <section class="saved-meal-history glass-card" aria-labelledby="savedMealHistoryTitle">
          <div class="saved-meal-history-heading">
            <div>
              <h2 id="savedMealHistoryTitle">${escapeHtml(copy.title)}</h2>
              <p>${escapeHtml(copy.helper)}</p>
            </div>
            <button type="button" class="meal-text-button saved-meal-history-toggle" data-saved-meal-history-toggle aria-expanded="${expanded}" aria-controls="${escapeHtml(panelId)}">${escapeHtml(expanded ? copy.collapse : copy.expand)}</button>
          </div>
          <p class="saved-meal-history-count"><strong>${meals.length}</strong> ${escapeHtml(copy.count(meals.length))}</p>
          <div id="${escapeHtml(panelId)}" class="saved-meal-history-details"${expanded ? "" : " hidden"}>
            ${meals.length ? `<ul class="saved-meal-history-list">${body}</ul>` : `<p class="saved-meal-history-empty">${escapeHtml(copy.empty)}</p>`}
          </div>
        </section>
      `;
    }

    root.addEventListener("click", (event) => {
      const action = event.target.closest("button");
      if (!action || !root.contains(action) || !action.hasAttribute("data-saved-meal-history-toggle")) return;
      expanded = !expanded;
      render();
      root.querySelector("[data-saved-meal-history-toggle]")?.focus();
    });

    render();
    return Object.freeze({
      render,
      setLanguage(nextLanguage) {
        language = normalizeLanguage(nextLanguage);
        render();
      }
    });
  }

  const api = Object.freeze({ TEXT, MAX_VISIBLE_ITEMS, sortSavedMealsNewestFirst, projectSavedMeal, createSavedMealHistoryPanel });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  globalScope.MHBSavedMealHistoryUI = api;
})(typeof window !== "undefined" ? window : globalThis);
