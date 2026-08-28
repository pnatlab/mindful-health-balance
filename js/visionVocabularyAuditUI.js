(function initializeVisionVocabularyAuditUI(globalScope) {
  const FILTERS = Object.freeze(["all", "mapped", "needs_review", "unsupported"]);

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

  const api = Object.freeze({ FILTERS, sortVocabularyEntries, createVocabularyAuditSnapshot, filterVocabularyEntries });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  globalScope.MHBVisionVocabularyAuditUI = api;
})(typeof window !== "undefined" ? window : globalThis);
