(function initializeVisionVocabularyAuditUI(globalScope) {
  const FILTERS = Object.freeze(["all", "mapped", "needs_review", "unsupported"]);
  const SUPPORTED_LANGUAGES = Object.freeze(["th", "en", "zh"]);
  const TEXT = Object.freeze({
    th: Object.freeze({
      title: "ร่องรอยจากตาของ MHB",
      helper: "ประวัติสิ่งที่ระบบเคยเห็นจากรูปอาหาร · อ่านอย่างเดียว",
      expand: "แสดงร่องรอยจากตาของ MHB",
      collapse: "พับร่องรอยจากตาของ MHB",
      all: "ทั้งหมด",
      mapped: "รู้จักแล้ว",
      needsReview: "ต้องเลือกให้ชัดก่อน",
      unsupported: "ยังไม่มีในระบบ",
      seen: (count) => `พบ ${count} ครั้ง`,
      mapsTo: (name) => `รู้จักแล้ว → ${name}`,
      empty: "ยังไม่มีร่องรอยจากการดูรูปอาหาร"
    }),
    en: Object.freeze({
      title: "Traces from MHB's local eye",
      helper: "A read-only history of what the system has seen from food photos.",
      expand: "Show traces from MHB's local eye",
      collapse: "Collapse traces from MHB's local eye",
      all: "All",
      mapped: "Known already",
      needsReview: "Needs a clearer choice",
      unsupported: "Not in the system yet",
      seen: (count) => `Seen ${count} times`,
      mapsTo: (name) => `Known already → ${name}`,
      empty: "There are no traces from food-photo observation yet."
    }),
    zh: Object.freeze({
      title: "MHB 本机之眼留下的痕迹",
      helper: "系统从食物照片中看到的只读历史记录。",
      expand: "显示 MHB 本机之眼留下的痕迹",
      collapse: "收起 MHB 本机之眼留下的痕迹",
      all: "全部",
      mapped: "已识别",
      needsReview: "需要进一步选择",
      unsupported: "系统尚未支持",
      seen: (count) => `见过 ${count} 次`,
      mapsTo: (name) => `已识别 → ${name}`,
      empty: "还没有来自食物照片观察的痕迹。"
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

  function normalizeEntry(entry) {
    const label = String(entry?.observed_label || "").trim();
    const normalizedLabel = String(entry?.normalized_label || "").trim();
    const status = FILTERS.includes(entry?.mapping_status) && entry.mapping_status !== "all" ? entry.mapping_status : "unsupported";
    const seenCount = Number(entry?.seen_count);
    if (!label || !normalizedLabel || !Number.isInteger(seenCount) || seenCount < 1) return null;
    return Object.freeze({
      observed_label: label,
      normalized_label: normalizedLabel,
      mapping_status: status,
      mapped_food_reference_id: status === "mapped" ? String(entry?.mapped_food_reference_id || "").trim() || null : null,
      seen_count: seenCount
    });
  }

  function sortVocabularyEntries(entries) {
    return Object.freeze((Array.isArray(entries) ? entries : []).map(normalizeEntry).filter(Boolean).sort((left, right) => right.seen_count - left.seen_count || left.normalized_label.localeCompare(right.normalized_label)));
  }

  function createVocabularyAuditSnapshot(store) {
    let sourceEntries = [];
    try {
      sourceEntries = store?.list?.() || [];
    } catch {
      sourceEntries = [];
    }
    const entries = sortVocabularyEntries(sourceEntries);
    const summary = entries.reduce((counts, entry) => {
      counts.total += 1;
      counts[entry.mapping_status] += 1;
      return counts;
    }, { total: 0, mapped: 0, needs_review: 0, unsupported: 0 });
    return Object.freeze({ entries, summary: Object.freeze(summary) });
  }

  function filterVocabularyEntries(entries, filter = "all") {
    const normalizedFilter = FILTERS.includes(filter) ? filter : "all";
    return Object.freeze((Array.isArray(entries) ? entries : []).filter((entry) => normalizedFilter === "all" || entry.mapping_status === normalizedFilter));
  }

  function createVisionVocabularyAuditPanel(options = {}) {
    const root = options.root;
    if (!root) return null;

    const store = options.store;
    const runtime = options.runtime || {};
    const panelId = String(options.panelId || "visionVocabularyAuditDetails").trim() || "visionVocabularyAuditDetails";
    let language = normalizeLanguage(options.language);
    let expanded = false;
    let filter = "all";

    function getText() {
      return TEXT[language];
    }

    function statusLabel(entry, copy) {
      if (entry.mapping_status === "mapped") {
        const reference = runtime.getFoodReferenceById?.(entry.mapped_food_reference_id);
        const displayName = reference ? runtime.getFoodDisplayName?.(reference, language) : "";
        return displayName ? copy.mapsTo(displayName) : copy.mapped;
      }
      if (entry.mapping_status === "needs_review") return copy.needsReview;
      return copy.unsupported;
    }

    function render() {
      const copy = getText();
      const snapshot = createVocabularyAuditSnapshot(store);
      const filters = [
        ["all", copy.all, snapshot.summary.total],
        ["mapped", copy.mapped, snapshot.summary.mapped],
        ["needs_review", copy.needsReview, snapshot.summary.needs_review],
        ["unsupported", copy.unsupported, snapshot.summary.unsupported]
      ];
      const entries = filterVocabularyEntries(snapshot.entries, filter);
      const body = entries.length ? entries.map((entry) => `
        <li class="vision-vocabulary-audit-item">
          <div><strong>${escapeHtml(entry.observed_label)}</strong><span>${escapeHtml(copy.seen(entry.seen_count))}</span></div>
          <p>${escapeHtml(statusLabel(entry, copy))}</p>
        </li>
      `).join("") : `<p class="vision-vocabulary-audit-empty">${escapeHtml(copy.empty)}</p>`;

      root.innerHTML = `
        <section class="vision-vocabulary-audit glass-card" aria-labelledby="visionVocabularyAuditTitle">
          <div class="vision-vocabulary-audit-heading">
            <div>
              <h2 id="visionVocabularyAuditTitle">${escapeHtml(copy.title)}</h2>
              <p>${escapeHtml(copy.helper)}</p>
            </div>
            <button type="button" class="meal-text-button vision-vocabulary-audit-toggle" data-vision-vocabulary-audit-toggle aria-expanded="${expanded}" aria-controls="${escapeHtml(panelId)}">${escapeHtml(expanded ? copy.collapse : copy.expand)}</button>
          </div>
          <p class="vision-vocabulary-audit-count"><strong>${snapshot.summary.total}</strong> ${escapeHtml(copy.all)}</p>
          <div id="${escapeHtml(panelId)}" class="vision-vocabulary-audit-details"${expanded ? "" : " hidden"}>
            <div class="vision-vocabulary-audit-summary" aria-label="${escapeHtml(copy.all)}">
              ${filters.map(([, label, count]) => `<span><strong>${count}</strong> ${escapeHtml(label)}</span>`).join("")}
            </div>
            <div class="vision-vocabulary-audit-filters" aria-label="${escapeHtml(copy.title)}">
              ${filters.map(([value, label, count]) => `<button type="button" class="meal-text-button${filter === value ? " is-active" : ""}" data-vision-vocabulary-audit-filter="${value}" aria-pressed="${filter === value}">${escapeHtml(label)} (${count})</button>`).join("")}
            </div>
            <ul class="vision-vocabulary-audit-list">${body}</ul>
          </div>
        </section>
      `;
    }

    root.addEventListener("click", (event) => {
      const action = event.target.closest("button");
      if (!action || !root.contains(action)) return;
      if (action.hasAttribute("data-vision-vocabulary-audit-toggle")) {
        expanded = !expanded;
        render();
        root.querySelector("[data-vision-vocabulary-audit-toggle]")?.focus();
        return;
      }
      if (action.dataset.visionVocabularyAuditFilter) {
        filter = action.dataset.visionVocabularyAuditFilter;
        render();
      }
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

  const api = Object.freeze({ FILTERS, TEXT, sortVocabularyEntries, createVocabularyAuditSnapshot, filterVocabularyEntries, createVisionVocabularyAuditPanel });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  globalScope.MHBVisionVocabularyAuditUI = api;
})(typeof window !== "undefined" ? window : globalThis);
