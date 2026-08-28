(function initializeVisionObservationVocabulary(globalScope) {
  const VOCABULARY_EVIDENCE_KEY = "mhb_vision_observation_vocabulary_v1";
  const MAPPING_STATUSES = Object.freeze(["mapped", "needs_review", "unsupported"]);

  function normalizeObservedLabel(value) {
    return String(value || "").trim().replace(/\s+/g, " ").toLocaleLowerCase();
  }

  function cleanObservedLabel(value) {
    return String(value || "").trim().replace(/\s+/g, " ");
  }

  function createObservedVocabularyEntry(label, mapping = {}) {
    const observedLabel = cleanObservedLabel(label);
    const normalizedLabel = normalizeObservedLabel(observedLabel);
    const mappingStatus = MAPPING_STATUSES.includes(mapping.mapping_status) ? mapping.mapping_status : "unsupported";
    const mappedFoodReferenceId = mappingStatus === "mapped" ? cleanObservedLabel(mapping.mapped_food_reference_id) : "";
    if (!normalizedLabel || (mappingStatus === "mapped" && !mappedFoodReferenceId)) return null;
    return Object.freeze({
      observed_label: observedLabel,
      normalized_label: normalizedLabel,
      mapping_status: mappingStatus,
      mapped_food_reference_id: mappedFoodReferenceId || null
    });
  }

  function normalizeStoredEntry(entry) {
    const observation = createObservedVocabularyEntry(entry?.observed_label || entry?.normalized_label, entry);
    const seenCount = Number(entry?.seen_count);
    if (!observation || !Number.isInteger(seenCount) || seenCount < 1) return null;
    return Object.freeze({ ...observation, seen_count: seenCount });
  }

  function createVisionVocabularyEvidenceStore(storage, options = {}) {
    const storageKey = options.storageKey || VOCABULARY_EVIDENCE_KEY;

    function read() {
      try {
        const parsed = JSON.parse(storage?.getItem?.(storageKey) || "[]");
        return Array.isArray(parsed) ? parsed.map(normalizeStoredEntry).filter(Boolean) : [];
      } catch {
        return [];
      }
    }

    function write(entries) {
      try {
        storage?.setItem?.(storageKey, JSON.stringify(entries));
      } catch {
        // Field-learning evidence must never block the review or manual meal path.
      }
    }

    function record(entry) {
      const observation = createObservedVocabularyEntry(entry?.observed_label, entry);
      if (!observation) return null;
      const entries = read();
      const index = entries.findIndex((item) => item.normalized_label === observation.normalized_label);
      const updated = Object.freeze({
        ...observation,
        seen_count: index >= 0 ? entries[index].seen_count + 1 : 1
      });
      if (index >= 0) entries[index] = updated;
      else entries.push(updated);
      write(entries);
      return updated;
    }

    function recordMany(entries) {
      return Object.freeze((Array.isArray(entries) ? entries : []).map(record).filter(Boolean));
    }

    function list() {
      return Object.freeze(read().sort((left, right) => right.seen_count - left.seen_count || left.normalized_label.localeCompare(right.normalized_label)));
    }

    function listGaps() {
      return Object.freeze(list().filter((entry) => entry.mapping_status !== "mapped"));
    }

    return Object.freeze({ record, recordMany, list, listGaps });
  }

  const api = Object.freeze({
    VOCABULARY_EVIDENCE_KEY,
    MAPPING_STATUSES,
    normalizeObservedLabel,
    createObservedVocabularyEntry,
    createVisionVocabularyEvidenceStore
  });
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  globalScope.MHBVisionObservationVocabulary = api;
})(typeof window !== "undefined" ? window : globalThis);
