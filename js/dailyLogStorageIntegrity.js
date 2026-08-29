(() => {
  function inspect(storage, key) {
    const rawValue = storage.getItem(key);
    if (rawValue === null) {
      return { status: "missing", records: [], rawValue: null, errorCode: null };
    }

    try {
      const parsed = JSON.parse(rawValue);
      if (!Array.isArray(parsed)) {
        return { status: "malformed", records: [], rawValue, errorCode: "invalid_top_level" };
      }
      if (parsed.some((record) => !record || typeof record !== "object" || Array.isArray(record) || !String(record.Date || "").trim())) {
        return { status: "malformed", records: [], rawValue, errorCode: "invalid_record" };
      }
      return { status: "ok", records: parsed, rawValue, errorCode: null };
    } catch {
      return { status: "malformed", records: [], rawValue, errorCode: "json_parse" };
    }
  }

  function createRecoveryBackup(storage, key, now = new Date()) {
    const state = inspect(storage, key);
    if (state.status !== "malformed") {
      return { ok: false, reason: "not_malformed" };
    }

    const timestamp = now.toISOString().replace(/[:.]/g, "-");
    const baseKey = `${key}_recovery_backup_${timestamp}`;
    let backupKey = baseKey;
    let suffix = 1;
    while (storage.getItem(backupKey) !== null) {
      backupKey = `${baseKey}_${suffix}`;
      suffix += 1;
    }

    try {
      storage.setItem(backupKey, state.rawValue);
      return { ok: true, backupKey };
    } catch {
      return { ok: false, reason: "backup_write_failed" };
    }
  }

  window.MHBDailyLogStorageIntegrity = Object.freeze({ inspect, createRecoveryBackup });
})();
