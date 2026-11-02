const assert = require('node:assert/strict');
const { test } = require('node:test');
const { syntheticApp } = require('./helpers/syntheticApp.js');
const daily = JSON.stringify([{ Date: '2026-10-31', Water_ml: 1000 }, { Date: '2026-11-01', Water_ml: 1200 }]);
const book = (rows = [], meals = true) => ({ Sheets: { Daily_Log: { rows }, ...(meals ? { Meal_Log: { rows: [{ Meal_ID: 'synthetic-meal' }] } } : {}) } });

test('populated Daily Log cannot be replaced by a Meal-only workbook', () => {
  const f = syntheticApp({ daily, book: book() }); f.import();
  assert.equal(f.values.get('mindfulHealthDailyLog'), daily);
  assert.deepEqual(f.writes, []);
  assert.equal(f.confirmations.length, 0);
  assert.match(f.status(), /not replaced/);
});

test('import parses and previews counts/exclusions before consent; cancellation writes nothing', () => {
  for (const meals of [true, false]) {
    const f = syntheticApp({ daily, book: book([{ Date: '2026-11-03', Water_ml: 900 }], meals), confirm: () => false });
    f.import();
    assert.ok(f.order.indexOf('parse') < f.order.indexOf('confirm'));
    assert.match(f.confirmations[0], /browser: 2 rows/);
    assert.match(f.confirmations[0], /file: 1 rows/);
    assert.match(f.confirmations[0], /Replace the entire/);
    assert.match(f.confirmations[0], meals ? /Meal_Log was not imported/ : /no Meal_Log/);
    assert.equal(f.values.get('mindfulHealthDailyLog'), daily);
    assert.deepEqual(f.writes, []);
  }
});

test('valid import replaces only Daily Log and preserves Reflection/Profile boundaries', () => {
  const incoming = book([{ Date: '2026-11-03', Water_ml: 900 }]);
  incoming.Sheets.Reflections = { rows: [{ Date: '2026-11-03', Reflection_Text: 'Synthetic reflection' }] };
  incoming.Sheets.User_Intention_Profile = { headers: ['Profile_Schema_Version', 'Display_Name'], rows: [{ Profile_Schema_Version: '1.0', Display_Name: 'Synthetic' }] };
  for (const acceptProfile of [true, false]) {
    const f = syntheticApp({ daily, book: incoming, values: { mhb_meal_records_v1: 'synthetic untouched meal bytes' },
      confirm: (_message, count) => count === 1 || acceptProfile });
    f.import();
    assert.equal(f.daily().length, 1);
    assert.equal(f.daily()[0].Reflection_Text, 'Synthetic reflection');
    assert.equal(f.confirmations.length, 2, 'profile retains its separate confirmation');
    assert.equal(f.values.has('mhb_user_intention_profile_v1'), acceptProfile);
    assert.equal(f.values.get('mhb_meal_records_v1'), 'synthetic untouched meal bytes');
    assert.ok(!f.writes.includes('mhb_meal_records_v1'));
    assert.match(f.status(), /Daily Log imported \(1 rows\)/);
  }
});

test('empty local plus header-only incoming stays empty without claiming restored rows', () => {
  const f = syntheticApp({ book: book() }); f.import();
  assert.deepEqual(f.daily(), []);
  assert.match(f.confirmations[0], /file: 0 rows/);
  assert.match(f.status(), /Daily Log imported \(0 rows\)/);
});

test('malformed workbooks fail before consent or writes', () => {
  for (const options of [
    { parseFailure: true, book: book() }, { book: { Sheets: {} } },
    { book: { Sheets: { Daily_Log: { headers: ['Water_ml'], rows: [] } } } },
    { book: book([{ Water_ml: 900 }]) }, { book: book([{ Date: '2026-02-30' }]) },
    { book: book([{ Date: '2026-11-03', Water_ml: { invalid: true } }]) }
  ]) {
    const f = syntheticApp({ daily, ...options }); f.import();
    assert.equal(f.values.get('mindfulHealthDailyLog'), daily);
    assert.equal(f.confirmations.length, 0);
    assert.deepEqual(f.writes, []);
  }
});

test('import write failure never reports success or attempts the optional profile', () => {
  const incoming = book([{ Date: '2026-11-03' }]);
  incoming.Sheets.User_Intention_Profile = { headers: ['Profile_Schema_Version', 'Display_Name'], rows: [{ Profile_Schema_Version: '1.0', Display_Name: 'Synthetic' }] };
  const f = syntheticApp({ daily, book: incoming });
  f.failures.write = 'mindfulHealthDailyLog'; f.import();
  assert.equal(f.values.get('mindfulHealthDailyLog'), daily);
  assert.equal(f.confirmations.length, 1);
  assert.deepEqual(f.writes, []);
  assert.match(f.status(), /could not be confirmed/);
  assert.doesNotMatch(f.status(), /imported/);
});

test('profile failure is reported separately after a verified Daily Log import', () => {
  const incoming = book([{ Date: '2026-11-03' }]);
  incoming.Sheets.User_Intention_Profile = { headers: ['Profile_Schema_Version', 'Display_Name'], rows: [{ Profile_Schema_Version: '1.0', Display_Name: 'Synthetic' }] };
  const f = syntheticApp({ daily, book: incoming }); f.failures.write = 'mhb_user_intention_profile_v1'; f.import();
  assert.equal(f.daily()[0].Date, '2026-11-03');
  assert.match(f.status(), /Daily Log imported/);
  assert.match(f.status(), /Intention Profile save could not be confirmed/);
  assert.doesNotMatch(f.status(), /Master Excel imported|Intention Profile imported/);
});

test('an exception after verified Daily import reports partial completion accurately', () => {
  const f = syntheticApp({ daily, book: book([{ Date: '2026-11-03' }]) });
  f.run('confirmAndReplaceUserIntentionProfile = () => { throw new Error("Synthetic later-step error"); };');
  f.import();
  assert.equal(f.daily()[0].Date, '2026-11-03');
  assert.match(f.status(), /Daily Log imported.*later import step did not complete/);
  assert.match(f.status(), /Meal_Log was not imported/);
  assert.deepEqual(f.alerts, []);
});

test('malformed canonical Daily Log still requires an exact raw recovery backup', () => {
  const f = syntheticApp({ daily: '{synthetic invalid JSON', book: book([{ Date: '2026-11-03' }]) });
  f.import(); assert.deepEqual(f.writes, []); assert.equal(f.confirmations.length, 0);
  f.run('backupMalformedDailyLogRaw();');
  const key = f.run('dailyLogRecoveryBackupKey');
  assert.equal(f.values.get(key), '{synthetic invalid JSON');
  f.import(true); assert.equal(f.daily()[0].Date, '2026-11-03');
  assert.match(f.confirmations[0], /row count is unreadable.*raw backup/);
  assert.equal(f.values.get(key), '{synthetic invalid JSON');
});

test('header-only recovery cannot replace unreadable storage whose row count is unknown', () => {
  const f = syntheticApp({ daily: '{malformed synthetic', book: book() });
  f.run('backupMalformedDailyLogRaw();'); f.writes.length = 0; f.import(true);
  assert.equal(f.values.get('mindfulHealthDailyLog'), '{malformed synthetic');
  assert.deepEqual(f.writes, []); assert.equal(f.confirmations.length, 0);
  assert.match(f.status(), /not replaced/);
});

test('a concurrent change after import preview blocks replacement', () => {
  let f;
  f = syntheticApp({ daily, book: book([{ Date: '2026-11-03' }]), confirm: () => {
    f.values.set('mindfulHealthDailyLog', '[{"Date":"2026-11-04"}]'); return true;
  } });
  f.import(); assert.equal(f.daily()[0].Date, '2026-11-04');
  assert.deepEqual(f.writes, []); assert.match(f.status(), /changed during/);
});

test('a clean recording date follows the local calendar after midnight', () => {
  const f = syntheticApp();
  f.setNow('2026-11-02T12:00:00Z');
  f.run('resetTodayStepIfDateChanged();');
  assert.equal(f.run('appState.date'), '2026-11-02');
  assert.equal(f.model.getDate(), '2026-11-02');
  assert.match(f.node('#currentDate').textContent, /November 2/);
  assert.equal(f.node('#useTodayRecordingDate').hidden, true);
});

test('a saved clean form rolls forward without moving historical rows', () => {
  const f = syntheticApp({ daily }); const before = f.values.get('mindfulHealthDailyLog');
  f.setNow('2026-11-02T12:00:00Z'); f.run('refreshRecordingDate();');
  assert.equal(f.run('appState.date'), '2026-11-02');
  assert.equal(f.run('appState.waterMl'), 0);
  assert.equal(f.values.get('mindfulHealthDailyLog'), before);
});

test('overnight drafts keep contents/date until the save-time choice', () => {
  for (const useToday of [true, false]) {
    const f = syntheticApp({ confirm: () => useToday });
    f.run('appState.waterMl = 700; saveCurrentForm();');
    f.model.setDraftMeta({ mealName: 'Synthetic rice', time: '' });
    f.setNow('2026-11-02T12:00:00Z');
    f.run('refreshRecordingDate(); refreshRecordingDate();');
    assert.equal(f.confirmations.length, 0, 'focus/visibility never asks or reassigns a dirty draft');
    assert.equal(f.run('appState.date'), '2026-11-01');
    assert.equal(f.model.getDate(), '2026-11-01');
    assert.match(f.node('#currentDate').textContent, /November 1/);
    f.save();
    const expected = useToday ? '2026-11-02' : '2026-11-01';
    assert.equal(f.daily()[0].Date, expected);
    assert.equal(f.daily()[0].Water_ml, 700);
    assert.match(f.confirmations[0], /OK: use Today.*Daily Log and meal/);
    const result = f.model.saveDraft();
    assert.equal(result.ok, true); assert.equal(result.meal.date, expected);
    assert.equal(result.meal.time, ''); assert.deepEqual(result.meal.items, []);
    assert.equal(result.meal.created_at, '2026-11-02T12:00:00.000Z');
    assert.equal(JSON.parse(f.values.get(`mindfulHealthBalance:${expected}`)).date, expected);
    f.run('refreshRecordingDate();');
    assert.equal(f.confirmations.length, 1, 'the date choice is not repeated');
  }
});

test('a meal-only draft also holds its date and accepts an explicit Today choice', () => {
  const f = syntheticApp(); f.model.setDraftMeta({ mealName: 'Rice' });
  f.setNow('2026-11-02T12:00:00Z'); f.run('refreshRecordingDate();');
  assert.equal(f.model.getDate(), '2026-11-01');
  assert.equal(f.run('prepareRecordingDateForSave()'), true);
  assert.equal(f.model.saveDraft().meal.date, '2026-11-02');
  assert.equal(f.model.getMeals()[0].meal_name, 'Rice');
});

test('the actual Meal UI Save hook uses the chosen date and preserves human text without ingredients', () => {
  for (const today of [true, false]) {
    const f = syntheticApp({ confirm: () => today }), mounted = f.mountMealUI();
    mounted.type('Human food name'); f.setNow('2026-11-02T12:00:00Z');
    mounted.click('data-save-meal');
    const saved = JSON.parse(f.values.get('mhb_meal_records_v1'))[0];
    assert.equal(saved.date, today ? '2026-11-02' : '2026-11-01');
    assert.equal(saved.meal_name, 'Human food name'); assert.deepEqual(saved.items, []);
    assert.equal(saved.time, ''); assert.equal(saved.named_dish_id, '');
    assert.doesNotMatch(JSON.stringify(saved), /evidence|sodium/);
    assert.deepEqual(f.daily(), []);
    assert.equal(f.run('appState.date'), saved.date);
    mounted.panel.destroy();
  }
});

test('actual overnight Meal UI editing preserves legacy hidden history and date', () => {
  const runtime = require('../js/mealCompositionRuntime.js');
  const legacy = { meal_id: 'legacy', date: '2026-11-01', meal_name: 'Old name',
    items: [runtime.createMealItem({ food_id: 'egg', meal_item_id: 'kept-item', source_reference: 'Synthetic evidence' })],
    meal_note: 'Keep note', named_dish_id: 'old-reference', condiment_knowledge: 'unknown', created_at: 'old' };
  const f = syntheticApp({ values: { mhb_meal_records_v1: JSON.stringify([legacy]) } }), mounted = f.mountMealUI();
  mounted.click('data-edit-meal', { editMeal: 'legacy' }); mounted.type('Human edit');
  f.setNow('2026-11-02T12:00:00Z'); mounted.click('data-save-meal');
  const saved = JSON.parse(f.values.get('mhb_meal_records_v1'))[0];
  for (const field of ['meal_id', 'date', 'items', 'meal_note', 'named_dish_id', 'condiment_knowledge', 'created_at']) assert.deepEqual(saved[field], legacy[field]);
  assert.equal(saved.meal_name, 'Human edit');
  assert.equal(saved.record_schema_version, undefined);
  mounted.panel.destroy();
});

test('explicit historical recording dates survive rollover and language rendering', () => {
  const f = syntheticApp();
  f.run('setRecordingDate("2026-10-20", { explicit: true }); appState.waterMl = 500;');
  f.model.setDraftMeta({ mealName: 'Historical meal' });
  f.setNow('2026-11-02T12:00:00Z');
  for (const language of ['th', 'en', 'zh']) {
    f.run(`currentLanguage = '${language}'; refreshRecordingDate(); renderDate();`);
    assert.equal(f.run('appState.date'), '2026-10-20');
    assert.equal(f.model.getDate(), '2026-10-20');
  }
  f.save(); assert.equal(f.daily()[0].Date, '2026-10-20');
  assert.equal(f.model.saveDraft().meal.date, '2026-10-20');
  assert.equal(f.confirmations.length, 0);
});

test('a draft left open over several days still requires a date decision before saving', () => {
  const f = syntheticApp(); f.run('appState.waterMl = 500;');
  f.setNow('2026-11-02T12:00:00Z'); f.run('refreshRecordingDate();');
  f.setNow('2026-11-03T12:00:00Z'); f.run('refreshRecordingDate();');
  assert.equal(f.run('appState.date'), '2026-11-01');
  f.save();
  assert.equal(f.daily()[0].Date, '2026-11-03');
  assert.equal(f.confirmations.length, 1);
});

test('restoring Daily inputs cannot independently change an explicitly selected date', () => {
  const f = syntheticApp(); f.run('setRecordingDate("2026-10-20", { explicit: true });');
  f.context.restoreSource = { Date: '2026-10-18', Water_ml: 600 };
  f.run('loadDailyLogRowIntoCurrentState(restoreSource); renderDate();');
  assert.equal(f.run('appState.date'), '2026-10-20');
  assert.equal(f.model.getDate(), '2026-10-20');
  assert.equal(f.run('appState.waterMl'), 600);
  assert.deepEqual(f.daily(), []);
});

test('editing a saved meal pins the date and cannot silently move record identity', () => {
  const f = syntheticApp(); f.model.setDraftMeta({ mealName: 'Original' });
  const created = f.model.saveDraft().meal;
  f.model.editMeal(created.meal_id); f.model.setDraftMeta({ mealName: 'Edited' });
  f.setNow('2026-11-02T12:00:00Z');
  f.run('prepareRecordingDateForSave({ editingMeal: true });');
  assert.equal(f.run('setRecordingDate(todayIso, { preserveDraft: true })'), false);
  assert.match(f.status(), /Save or cancel/);
  const edited = f.model.saveDraft().meal;
  assert.equal(edited.meal_id, created.meal_id);
  assert.equal(edited.created_at, created.created_at);
  assert.equal(edited.date, '2026-11-01');
  assert.equal(f.confirmations.length, 0);
});

test('repeated local-day boundaries respect timezone and DST calendar dates', () => {
  const { execFileSync } = require('node:child_process');
  for (const [zone, before, after] of [
    ['Asia/Bangkok', '2026-11-01T16:59:00Z', '2026-11-01T17:01:00Z'],
    ['America/Los_Angeles', '2026-11-02T07:59:00Z', '2026-11-02T08:01:00Z'],
    ['UTC', '2026-11-01T23:59:00Z', '2026-11-02T00:01:00Z']
  ]) {
    const code = `const {syntheticApp}=require('./tests/helpers/syntheticApp.js'); const f=syntheticApp({now:'${before}'}); f.setNow('${after}'); f.run('refreshRecordingDate(); refreshRecordingDate();'); console.log(f.run('appState.date'));`;
    assert.equal(execFileSync(process.execPath, ['-e', code], { cwd: require('node:path').join(__dirname, '..'), env: { ...process.env, TZ: zone }, encoding: 'utf8' }).trim(), '2026-11-02', zone);
  }
});

test('a failed save replaces stale success and preserves the in-memory draft', () => {
  const f = syntheticApp();
  f.run('appState.waterMl = 500;'); f.save();
  assert.match(f.status(), /Saved to Daily Log/);
  const before = f.values.get('mindfulHealthDailyLog');
  f.run('appState.waterMl = 800;'); f.failures.write = 'mindfulHealthDailyLog';
  assert.doesNotThrow(() => f.save());
  assert.doesNotMatch(f.status(), /Saved to Daily Log/);
  assert.equal(f.run('appState.waterMl'), 800);
  assert.equal(f.values.get('mindfulHealthDailyLog'), before);
});

test('quota/security/unavailable writes fail explicitly and allow retry without losing draft', () => {
  for (const [name, key] of [['QuotaExceededError', 'mindfulHealthDailyLog'], ['SecurityError', 'mindfulHealthDailyLog'], ['SecurityError', '*']]) {
    const f = syntheticApp(); f.run('appState.waterMl = 450;'); f.save();
    const before = f.values.get('mindfulHealthDailyLog');
    f.run('appState.waterMl = 900; appState.mindNoteText = "Keep this draft";');
    f.failures.write = key; f.failures.name = name;
    assert.doesNotThrow(() => f.save());
    assert.doesNotMatch(f.status(), /Saved to Daily Log/);
    assert.match(f.status(), /could not/);
    assert.equal(f.values.get('mindfulHealthDailyLog'), before);
    assert.equal(f.run('appState.mindNoteText'), 'Keep this draft');
    f.failures.write = null; f.save();
    assert.match(f.status(), /Saved to Daily Log/);
    assert.equal(f.daily()[0].Water_ml, 900);
  }
});

test('inaccessible canonical storage blocks saves/imports/clearing without writing anything', () => {
  const f = syntheticApp({ daily, book: book([{ Date: '2026-11-03' }]) });
  f.run('appState.waterMl = 800;'); f.node('#saveStatus').textContent = 'Saved to Daily Log';
  f.failures.read = 'mindfulHealthDailyLog';
  assert.doesNotThrow(() => { f.save(); f.import(); f.run('clearDailyLog();'); });
  assert.equal(f.values.get('mindfulHealthDailyLog'), daily);
  assert.deepEqual(f.writes, []);
  assert.doesNotMatch(f.status(), /Saved to Daily Log|imported/);
  assert.equal(f.run('appState.waterMl'), 800);
  f.failures.read = null; f.save();
  assert.match(f.status(), /Saved to Daily Log/);
});

test('a missing storage API during a save fails closed instead of throwing or reporting success', () => {
  const f = syntheticApp({ daily }); f.run('appState.waterMl = 800;');
  f.context.localStorage = undefined;
  assert.doesNotThrow(() => f.save());
  assert.match(f.status(), /could not be confirmed/);
  assert.equal(f.values.get('mindfulHealthDailyLog'), daily);
  assert.equal(f.run('appState.waterMl'), 800);
});

test('malformed Daily Log fails closed, preserves draft, and retries after explicit backed-up recovery', () => {
  const f = syntheticApp({ daily: '{malformed synthetic', book: book([{ Date: '2026-10-30' }]) });
  f.run('appState.waterMl = 800;'); f.node('#saveStatus').textContent = 'Saved to Daily Log';
  f.save();
  assert.match(f.status(), /unreadable/);
  assert.equal(f.values.get('mindfulHealthDailyLog'), '{malformed synthetic');
  assert.equal(f.run('appState.waterMl'), 800);
  assert.deepEqual(f.writes, []);
  f.run('backupMalformedDailyLogRaw();'); f.import(true); f.save();
  assert.match(f.status(), /Saved to Daily Log/);
  assert.equal(f.daily().length, 2);
});

test('no-op writes and unverifiable readback cannot produce success feedback', () => {
  for (const key of ['mindfulHealthDailyLog', 'mindfulHealthBalance:2026-11-01']) {
    const f = syntheticApp(); f.run('appState.waterMl = 800;'); f.failures.ignore = key;
    f.node('#saveStatus').textContent = 'Saved to Daily Log'; f.save();
    assert.doesNotMatch(f.status(), /Saved to Daily Log/);
    assert.match(f.status(), /could not/);
    assert.deepEqual(f.daily(), []);
    assert.equal(f.run('appState.waterMl'), 800);
  }
  const f = syntheticApp(); f.run('appState.waterMl = 800;');
  const write = f.storage.setItem;
  f.storage.setItem = (key, value) => { write(key, value); if (key === 'mindfulHealthDailyLog') f.failures.read = key; };
  f.save();
  assert.match(f.status(), /could not be confirmed/);
  assert.doesNotMatch(f.status(), /Saved to Daily Log/);
  assert.equal(f.run('appState.waterMl'), 800);
});

test('TH/EN/ZH import and failed-save feedback use translated current-attempt messages', () => {
  for (const language of ['th', 'en', 'zh']) {
    const f = syntheticApp({ language, daily, book: book() }); f.import();
    assert.equal(f.status(), f.run('t("importEmptyBlocked") + " " + t("mealLogNotImported")'));
    f.failures.write = 'mindfulHealthDailyLog'; f.save();
    assert.equal(f.status(), f.run('t("dailyLogSaveFailed")'));
    assert.doesNotMatch(f.status(), /dailyLogSaveFailed/);
  }
});

test('the actual language handler renders the recording date without changing its authority', () => {
  const f = syntheticApp();
  f.run('appState.waterMl = 700;');
  f.setNow('2026-11-02T12:00:00Z'); f.run('refreshRecordingDate();');
  f.run('applyTranslations = () => {}; renderDrinkOptions = () => {}; renderActivityOptions = () => {}; renderEnergyCauseOptions = () => {}; renderPracticeOptions = () => {}; applyThemePreference = () => {}; renderFieldReview = () => {}; bindEvents();');
  for (const language of ['th', 'en', 'zh']) {
    f.listeners['.language-toggle:click']({ target: { closest: () => ({ dataset: { lang: language } }) } });
    assert.equal(f.run('appState.date'), '2026-11-01');
    assert.equal(f.model.getDate(), '2026-11-01');
    assert.match(f.node('#currentDate').textContent, /1/);
  }
});
