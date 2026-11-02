const assert = require('node:assert/strict');
const { test } = require('node:test');
const { syntheticApp } = require('./helpers/syntheticApp.js');
const mealKey = 'mhb_meal_records_v1';
const dailyKey = 'mindfulHealthDailyLog';
const sourceKey = 'mindfulHealthBalance:2026-11-01';
const targetKey = 'mindfulHealthBalance:2026-11-02';
const daily = JSON.stringify([{ Date: '2026-10-30', Water_ml: 400 }, { Date: '2026-10-31', Water_ml: 600 }]);
const book = (rows = [], meals = true) => ({ Sheets: { Daily_Log: { rows }, ...(meals ? { Meal_Log: { rows: [] } } : {}) } });

function asynchronousImports(options = {}) {
  const f = syntheticApp(options), reads = [];
  f.context.FileReader = class {
    readAsArrayBuffer(file) { reads.push({ reader: this, file }); }
  };
  f.context.XLSX.read = data => data;
  return { ...f, reads,
    select(name) { f.context.importMasterExcel({ target: { files: [{ name }], value: name, dataset: {} } }); },
    complete(index, workbook) { reads[index].reader.onload({ target: { result: workbook } }); },
    error(index) { reads[index].reader.onerror(); }
  };
}

test('R2 reproduction: a Meal-only Today save preserves both Daily drafts byte-for-byte', () => {
  const source = '{ "date":"2026-11-01", "waterMl":350, "mindNoteText":"Synthetic original draft" }';
  const target = '{ "date":"2026-11-02", "waterMl":1700, "mindNoteText":"Synthetic destination draft" }';
  const f = syntheticApp({ values: { [sourceKey]: source, [targetKey]: target } }), ui = f.mountMealUI();
  f.run('selectedReflectionRoot="sleep_recovery";');
  ui.type('Synthetic meal'); f.setNow('2026-11-02T12:00:00Z'); ui.click('data-save-meal');
  assert.equal(f.values.get(sourceKey), source);
  assert.equal(f.values.get(targetKey), target);
  assert.deepEqual(f.writes.filter(key => key !== mealKey), []);
  assert.equal(JSON.parse(f.values.get(mealKey))[0].date, '2026-11-02');
  assert.equal(f.run('appState.waterMl'), 350, 'unsaved Daily form remains in memory');
  assert.equal(f.run('appState.date'),'2026-11-01');assert.equal(f.run('selectedReflectionRoot'),'sleep_recovery');
  ui.panel.destroy();
});

test('R2 reproduction: invalid numeric cells fail before consent or replacement', () => {
  const f = syntheticApp({ daily, book: book([{ Date: '2026-11-02', Water_ml: 'banana' }]) });
  f.import();
  assert.equal(f.values.get(dailyKey), daily);
  assert.deepEqual(f.writes, []); assert.equal(f.confirmations.length, 0);
  assert.match(f.status(), /Daily_Log.*2.*Water_ml/);
});

test('R2 reproduction: a superseded read cannot replace a newer authorized import', () => {
  const f = asynchronousImports({ daily });
  f.select('older.xlsx'); f.select('newer.xlsx');
  f.complete(1, book([{ Date: '2026-11-02', Water_ml: 800 }]));
  const imported = f.values.get(dailyKey), status = f.status();
  f.complete(0, book([{ Date: '2026-11-01', Water_ml: 200 }]));
  assert.equal(f.values.get(dailyKey), imported);
  assert.equal(f.status(), status);
  assert.equal(f.confirmations.length, 1);
  assert.deepEqual(f.writes, [dailyKey]);
});

test('R2 reproduction: restore reports in-memory success and draft write failure together', () => {
  const f = syntheticApp({ daily: JSON.stringify([{ Date: '2026-11-01', Water_ml: 700 }]) });
  f.run('appState.waterMl = 0; renderPracticeTypeOptions = () => {}; resetDrinkProfileForm = () => {};');
  f.failures.write = sourceKey; f.run('restoreCurrentFormFromDailyLog();');
  assert.equal(f.run('appState.waterMl'), 700);
  assert.match(f.status(), /restored.*could not.*draft/i);
  assert.equal(f.values.has(sourceKey), false);
  assert.equal(f.daily()[0].Water_ml, 700);
});

test('Meal rollover with blank Daily form never creates or replaces a Daily draft', () => {
  for (const existing of [undefined, '{ "date":"2026-11-02", "waterMl":1700 }']) {
    const values = existing ? { [targetKey]: existing } : {};
    const f = syntheticApp({ values }), ui = f.mountMealUI();
    ui.type('Rice'); f.model.setDraftMeta({ mealType: 'grilled', mealLabel: 'custom', customMealLabel: 'Picnic', time: '09:30' });
    f.setNow('2026-11-02T12:00:00Z'); ui.click('data-save-meal');
    const meal = JSON.parse(f.values.get(mealKey))[0];
    assert.equal(meal.date, '2026-11-02'); assert.equal(meal.meal_name, 'Rice');
    assert.deepEqual([meal.meal_type, meal.custom_meal_label, meal.time, meal.items], ['grilled', 'Picnic', '09:30', []]);
    assert.equal(f.values.get(targetKey), existing); assert.equal(f.values.has(sourceKey), false);
    assert.deepEqual(f.writes, [mealKey]); assert.deepEqual(f.daily(), []);
    assert.match(ui.content(), /Saved for 2026-11-02/);
    ui.panel.destroy();
  }
});

test('keeping the selected Meal date leaves both Daily drafts unchanged', () => {
  const source = JSON.stringify({ date: '2026-11-01', waterMl: 700 });
  const destination = JSON.stringify({ date: '2026-11-02', waterMl: 1700 });
  const f = syntheticApp({ confirm: () => false, values: { [sourceKey]: source, [targetKey]: destination } }), ui = f.mountMealUI();
  ui.type('Original date meal'); f.setNow('2026-11-02T12:00:00Z'); ui.click('data-save-meal');
  assert.equal(JSON.parse(f.values.get(mealKey))[0].date, '2026-11-01');
  assert.equal(f.values.get(sourceKey), source); assert.equal(f.values.get(targetKey), destination);
  assert.deepEqual(f.writes, [mealKey]);
  for (let n = 0; n < 3; n++) f.run('refreshRecordingDate();');
  assert.equal(f.run('appState.date'), '2026-11-01'); assert.equal(f.confirmations.length, 1);
  ui.panel.destroy();
});

test('canceling a Daily collision preserves both raw drafts and the original date', () => {
  const source = '{ "date":"2026-11-01", "waterMl":700 }';
  const destination = '{ "date":"2026-11-02", "waterMl":1700 }';
  const f = syntheticApp({ values: { [sourceKey]: source, [targetKey]: destination }, confirm: (_text, count) => count === 1 });
  f.setNow('2026-11-02T12:00:00Z'); f.save();
  assert.equal(f.confirmations.length, 2); assert.match(f.confirmations[1], /Daily draft already exists/);
  assert.equal(f.values.get(sourceKey), source); assert.equal(f.values.get(targetKey), destination);
  assert.equal(f.run('appState.date'), '2026-11-01'); assert.equal(f.run('appState.waterMl'), 700);
  assert.deepEqual(f.writes, []); assert.deepEqual(f.daily(), []);
});

test('Daily collision resolution opens the existing destination for review without saving it', () => {
  const source = '{ "date":"2026-11-01", "waterMl":700 }';
  const destination = '{ "date":"2026-11-02", "waterMl":1700 }';
  const f = syntheticApp({ values: { [sourceKey]: source, [targetKey]: destination } });
  f.setNow('2026-11-02T12:00:00Z'); f.save();
  assert.equal(f.values.get(sourceKey), source); assert.equal(f.values.get(targetKey), destination);
  assert.deepEqual(f.writes, []); assert.deepEqual(f.daily(), []);
  assert.equal(f.run('appState.date'), '2026-11-02'); assert.equal(f.model.getDate(), '2026-11-02');
  assert.equal(f.run('appState.waterMl'), 1700); assert.match(f.status(), /Review it and choose Save/);
  f.save(); assert.equal(f.daily()[0].Water_ml, 1700, 'a new explicit Save persists the reviewed destination');
  assert.equal(f.values.get(sourceKey), source);
});

test('Daily collision keeps changed in-memory source recoverable before opening destination', () => {
  for (const failSourceWrite of [false, true]) {
    const source = JSON.stringify({ date: '2026-11-01', waterMl: 700 });
    const destination = JSON.stringify({ date: '2026-11-02', waterMl: 1700 });
    const f = syntheticApp({ values: { [sourceKey]: source, [targetKey]: destination } });
    f.run('appState.waterMl=900;'); f.setNow('2026-11-02T12:00:00Z');
    if (failSourceWrite) f.failures.write = sourceKey;
    f.save();
    assert.equal(f.values.get(targetKey), destination); assert.deepEqual(f.daily(), []);
    if (failSourceWrite) {
      assert.equal(f.run('appState.date'), '2026-11-01'); assert.equal(f.run('appState.waterMl'), 900);
      assert.equal(f.values.get(sourceKey), source); assert.match(f.status(), /could not/);
    } else {
      assert.equal(JSON.parse(f.values.get(sourceKey)).waterMl, 900);
      assert.equal(f.run('appState.waterMl'), 1700); assert.deepEqual(f.writes, [sourceKey, 'mindfulHealthCurrentFormCleared:2026-11-01']);
    }
  }
});

test('date selection without collision does not persist a destination, blank or populated', () => {
  for (const water of [0, 700]) {
    const f = syntheticApp(); f.run(`appState.waterMl=${water};`);
    assert.equal(f.run('setRecordingDate("2026-11-02", { preserveDraft:true })'), true);
    assert.equal(f.run('appState.waterMl'), water); assert.equal(f.values.has(targetKey), false);
    assert.deepEqual(f.writes, []); assert.equal(f.confirmations.length, 0);
  }
});

test('unreadable destination blocks Daily date changes but cannot block a Meal-only save', () => {
  const destination = '{synthetic malformed draft';
  const f = syntheticApp({ values: { [targetKey]: destination } });
  assert.equal(f.run('setRecordingDate("2026-11-02")'), false);
  assert.equal(f.values.get(targetKey), destination); assert.deepEqual(f.writes, []);
  const ui = f.mountMealUI(); ui.type('Manual name'); f.setNow('2026-11-02T12:00:00Z'); ui.click('data-save-meal');
  assert.equal(JSON.parse(f.values.get(mealKey))[0].date, '2026-11-02');
  assert.equal(f.values.get(targetKey), destination); assert.deepEqual(f.writes, [mealKey]);
  ui.panel.destroy();
});

test('historical date, existing Meal edit, language and repeated boundaries preserve Daily drafts', () => {
  const f = syntheticApp(), ui = f.mountMealUI();
  f.run('setRecordingDate("2026-10-20",{explicit:true});'); ui.type('Historical'); ui.click('data-save-meal');
  const created = JSON.parse(f.values.get(mealKey))[0]; f.writes.length = 0;
  ui.click('data-edit-meal', { editMeal: created.meal_id }); ui.type('Human edit');
  f.setNow('2026-11-02T12:00:00Z');
  for (const lang of ['th','en','zh']) { ui.panel.setLanguage(lang); f.run('refreshRecordingDate(); refreshRecordingDate();'); }
  ui.click('data-save-meal');
  const updated = JSON.parse(f.values.get(mealKey))[0];
  assert.equal(updated.date, created.date); assert.equal(updated.meal_id, created.meal_id); assert.equal(updated.created_at, created.created_at);
  assert.deepEqual(f.writes, [mealKey]); assert.equal(f.confirmations.length, 0);
  ui.panel.destroy();
});

test('numeric validation covers the existing numeric Column_Guide fields', () => {
  const f = syntheticApp();
  const columns = f.run('DAILY_LOG_COLUMNS.filter(column=>COLUMN_SEMANTIC_GUIDE[`Daily_Log.${column}`]?.dataType==="number")');
  assert.deepEqual(Array.from(columns), ['Sleep_Hours','Water_ml','Sweet_Drinks_Count','Sugar_Score','Caffeine_Score','Milk_Drink_Count','Hydration_Support_Count','Load_Score','Practice_Minutes']);
  for (const column of columns) {
    const fixture = syntheticApp({ daily, book: book([{ Date: '2026-11-02', [column]: 'invalid numeric' }]) });
    fixture.import(); assert.equal(fixture.values.get(dailyKey), daily); assert.equal(fixture.confirmations.length, 0);
    assert.match(fixture.status(), new RegExp(column)); assert.deepEqual(fixture.writes, []);
  }
});

test('numbers, supported numeric strings and optional blanks keep existing normalization', () => {
  for (const value of [900, '900', ' 900.5 ', '1e3', '-2.5']) {
    const f = syntheticApp({ book: book([{ Date:'2026-11-02', Water_ml:value, Sleep_Hours:'6.5', Practice_Minutes:'15', Sugar_Score:1.5 }]) });
    f.import(); assert.equal(f.daily()[0].Water_ml, Number(value)); assert.equal(f.daily()[0].Sleep_Hours, 6.5);
    assert.equal(f.daily()[0].Practice_Minutes, 15); assert.equal(f.daily()[0].Sugar_Score, 1.5);
  }
  for (const blank of ['', '  ', null, undefined]) {
    const f=syntheticApp({ book:book([{Date:'2026-11-02',Sleep_Hours:blank,Practice_Minutes:blank}]) }); f.import();
    assert.equal(f.daily()[0].Sleep_Hours, ''); assert.equal(f.daily()[0].Practice_Minutes, '');
  }
});

test('later malformed/nonfinite cells reject the entire workbook without cell-value disclosure', () => {
  for (const value of [NaN, Infinity, -Infinity, 'NaN', 'Infinity', true, '1,200', '<script>bad</script>']) {
    const f = syntheticApp({ daily, values:{[mealKey]:'unchanged synthetic meal bytes'}, book:book([{Date:'2026-11-01',Water_ml:100},{Date:'2026-11-02',Water_ml:value}]) });
    f.import(); assert.equal(f.values.get(dailyKey),daily); assert.equal(f.values.get(mealKey),'unchanged synthetic meal bytes');
    assert.equal(f.confirmations.length,0); assert.deepEqual(f.writes,[]); assert.match(f.status(), /row 3.*Water_ml/);
    assert.doesNotMatch(f.status(), /<script>|banana|Infinity|NaN/);
  }
});

test('sleep/practice range checks follow existing normalizers; no new score ranges are added', () => {
  for (const [column,value] of [['Sleep_Hours',-1],['Sleep_Hours',16.01],['Practice_Minutes',-1],['Practice_Minutes',1441]]) {
    const f=syntheticApp({daily,book:book([{Date:'2026-11-02',[column]:value}])}); f.import();
    assert.equal(f.values.get(dailyKey),daily); assert.equal(f.confirmations.length,0);
  }
  const f=syntheticApp({book:book([{Date:'2026-11-02',Sleep_Hours:16,Practice_Minutes:1440,Load_Score:-0.5}])});f.import();
  assert.equal(f.daily()[0].Load_Score,-0.5); assert.equal(f.daily()[0].Practice_Minutes,1440);
});

test('numeric error uses real worksheet row metadata and localized TH/EN/ZH text', () => {
  for (const language of ['th','en','zh']) {
    const row={Date:'2026-11-02',Water_ml:'bad'};Object.defineProperty(row,'__rowNum__',{value:8});
    const f=syntheticApp({language,daily,book:book([row])});const parse=f.context.XLSX.utils.sheet_to_json;
    f.context.XLSX.utils.sheet_to_json=(sheet,settings)=>settings.header===1?parse(sheet,settings):[row];
    f.import();assert.equal(f.status(),f.run('t("importInvalidNumeric",{sheet:"Daily_Log",row:9,column:"Water_ml"})'));
    assert.equal(f.confirmations.length,0); assert.deepEqual(f.writes,[]);
  }
});

test('latest selection wins in either read-completion order, even with identical names', () => {
  for (const order of [[0,1],[1,0]]) {
    const f=asynchronousImports({daily,values:{[mealKey]:'unchanged'}});f.select('same.xlsx');f.select('same.xlsx');
    for (const index of order) f.complete(index,book([{Date:index?'2026-11-02':'2026-11-01',Water_ml:index?800:200}]));
    assert.equal(f.daily()[0].Water_ml,800);assert.equal(f.confirmations.length,1);
    assert.deepEqual(f.writes,[dailyKey]);assert.equal(f.values.get(mealKey),'unchanged');
    const status=f.status();f.error(0);f.reads[0].reader.onabort();f.complete(1,book([{Date:'2026-11-03',Water_ml:999}]));
    assert.equal(f.status(),status);assert.equal(f.daily()[0].Water_ml,800);assert.deepEqual(f.writes,[dailyKey]);
  }
});

test('canceling the current selection cannot revive an older pending read', () => {
  const f=asynchronousImports({daily,confirm:()=>false});f.select('old.xlsx');f.select('new.xlsx');
  f.complete(1,book([{Date:'2026-11-02'}]));f.complete(0,book([{Date:'2026-11-01'}]));f.error(0);
  assert.equal(f.values.get(dailyKey),daily);assert.deepEqual(f.writes,[]);assert.equal(f.confirmations.length,1);
  assert.match(f.status(),/cancelled/);
});

test('canceling a later selection preserves an already authorized completed import', () => {
  const f=asynchronousImports({daily,confirm:(_text,count)=>count===1});f.select('first.xlsx');f.complete(0,book([{Date:'2026-11-02',Water_ml:800}]));
  const saved=f.values.get(dailyKey);f.select('second.xlsx');f.complete(1,book([{Date:'2026-11-03',Water_ml:900}]));
  assert.equal(f.values.get(dailyKey),saved);assert.deepEqual(f.writes,[dailyKey]);assert.equal(f.confirmations.length,2);
});

test('sanitized workbook identity is bound to confirmation and stale consent cannot write', () => {
  let f;f=asynchronousImports({daily,confirm:()=>{f.select('new.xlsx');return true;}});
  f.select('folder/old\n\u202E<script>.xlsx');f.complete(0,book([{Date:'2026-11-02'}]));
  assert.match(f.confirmations[0],/Workbook: old<script>\.xlsx/);assert.doesNotMatch(f.confirmations[0],/folder\/|\u202E/);
  assert.equal(f.values.get(dailyKey),daily);assert.deepEqual(f.writes,[]);
});

test('restore faults keep actual form values visible, canonical bytes intact, and allow retry', () => {
  const saved=JSON.stringify([{Date:'2026-11-01',Water_ml:700,Mind_Note_Text:'Synthetic saved note'}]);
  for (const fault of ['quota','security','no-op','readback']) {
    const f=syntheticApp({daily:saved});f.useProductionFormSync();
    f.run('appState.waterMl=0; renderPracticeTypeOptions=()=>{}; resetDrinkProfileForm=()=>{};');
    const originalWrite=f.storage.setItem;
    if (fault==='quota'||fault==='security') {f.failures.write=sourceKey;f.failures.name=fault==='quota'?'QuotaExceededError':'SecurityError';}
    if (fault==='no-op') f.failures.ignore=sourceKey;
    if (fault==='readback') f.storage.setItem=(key,value)=>{originalWrite(key,value);if(key===sourceKey)f.values.set(key,'{}');};
    f.run('restoreCurrentFormFromDailyLog();');
    assert.equal(f.node('#waterMl').textContent,'700');assert.equal(f.node('#mindNoteText').value,'Synthetic saved note');
    assert.equal(f.values.get(dailyKey),saved);assert.match(f.status(),/restored.*could not.*draft/i);
    f.failures.write=null;f.failures.ignore=null;f.storage.setItem=originalWrite;
    f.run('restoreCurrentFormFromDailyLog();');
    assert.equal(JSON.parse(f.values.get(sourceKey)).waterMl,700);assert.equal(f.values.get(dailyKey),saved);
    assert.equal(f.status(),f.run('t("restoreCurrentFormDone")'));
  }
});

test('production focus/visibility callbacks do not prompt or mutate either overnight draft', () => {
  const source=JSON.stringify({date:'2026-11-01',waterMl:700}),target=JSON.stringify({date:'2026-11-02',waterMl:1700});
  const f=syntheticApp({values:{[sourceKey]:source,[targetKey]:target}}),ui=f.mountMealUI();ui.type('Keep name');
  for(const name of ['applyThemePreference','applyTranslations','renderDrinkOptions','renderActivityOptions','renderEnergyCauseOptions','renderPracticeOptions',
    'bindEvents','loadUserIntentionProfileIntoForm','initializeMealComposerUI','initializeSavedMealHistoryPanel','initializeVisionVocabularyAuditPanel',
    'initWelcome','startThemeAutoRefresh','updateTodayStateOrb','startTodayStateOrbRefresh'])f.context[name]=()=>{};
  f.listeners.DOMContentLoaded();f.setNow('2026-11-02T12:00:00Z');
  for(let n=0;n<3;n++){f.listeners.visibilitychange();f.listeners.focus();f.listeners.focusin();}
  assert.deepEqual(f.writes,[]);assert.equal(f.confirmations.length,0);
  assert.equal(f.values.get(sourceKey),source);assert.equal(f.values.get(targetKey),target);
  assert.equal(f.model.getDraft().mealName,'Keep name');assert.equal(f.run('appState.date'),'2026-11-01');
  ui.panel.destroy();
});

test('a Daily destination read fault cannot force a later Meal to use yesterday silently', () => {
  const f=syntheticApp({values:{[targetKey]:'{broken draft'}}),ui=f.mountMealUI();
  f.setNow('2026-11-02T12:00:00Z');f.run('refreshRecordingDate();');
  ui.type('Manual meal');ui.click('data-save-meal');
  assert.equal(JSON.parse(f.values.get(mealKey))[0].date,'2026-11-02');
  assert.equal(f.confirmations.length,1);assert.equal(f.values.get(targetKey),'{broken draft');
  assert.deepEqual(f.writes,[mealKey]);ui.panel.destroy();
});

test('an unreadable destination blocks clean Daily saves until the date transition can complete', () => {
  for (const fault of ['malformed', 'read']) {
    const f = syntheticApp({ values: fault === 'malformed' ? { [targetKey]: '{broken draft' } : {} });
    if (fault === 'read') f.failures.read = targetKey;
    f.setNow('2026-11-02T12:00:00Z');
    for (let n = 0; n < 2; n++) {
      f.save();
      assert.deepEqual(f.writes, []); assert.deepEqual(f.daily(), []);
      assert.equal(f.run('appState.date'), '2026-11-01');
      assert.equal(f.status(), f.run('t("recordingDateDraftUnavailable")'));
      assert.equal(f.confirmations.length, 0);
    }
    f.failures.read = null;
    if (fault === 'malformed') f.values.delete(targetKey); // synthetic external recovery only
    f.save();
    assert.equal(f.run('appState.date'), '2026-11-02'); assert.equal(f.daily()[0].Date, '2026-11-02');
  }
});

test('restore and filename copy remains localized in TH/EN/ZH', () => {
  for(const language of ['th','en','zh']){
    const f=asynchronousImports({language,book:book([{Date:'2026-11-02'}])});f.select('synthetic.xlsx');f.complete(0,book([{Date:'2026-11-02'}]));
    assert.ok(f.confirmations[0].includes(f.run('t("importWorkbookName",{name:"synthetic.xlsx"})')));
    f.values.set(dailyKey,JSON.stringify([{Date:'2026-11-01',Water_ml:700}]));f.failures.write=sourceKey;
    f.run('renderPracticeTypeOptions=()=>{}; resetDrinkProfileForm=()=>{}; restoreCurrentFormFromDailyLog();');
    assert.equal(f.status(),f.run('t("restoreDraftSaveFailed")'));
  }
});

test('valid Excel date cells and serials still reach numeric validation without rejection', () => {
  const f=syntheticApp({book:book([{Date:'2026-11-02',Water_ml:500}])});
  const row={Date:f.run('new Date("2026-11-02T12:00:00Z")'),Water_ml:500};
  const parse=f.context.XLSX.utils.sheet_to_json;f.context.XLSX.utils.sheet_to_json=(sheet,settings)=>settings.header===1?parse(sheet,settings):[row];
  f.import();assert.equal(f.daily()[0].Date,'2026-11-02');assert.equal(f.daily()[0].Water_ml,500);
  const s=syntheticApp({book:book([{Date:46328,Water_ml:600}])});s.context.XLSX.SSF={parse_date_code:()=>({y:2026,m:11,d:2})};s.import();
  assert.equal(s.daily()[0].Date,'2026-11-02');assert.equal(s.daily()[0].Water_ml,600);
});

test('authorized import followed by Daily save and Meal_Log export preserves both authorities', async () => {
  const runtime=require('../js/mealCompositionRuntime.js');
  const legacy={meal_id:'legacy',date:'2026-10-30',items:[runtime.createMealItem({food_id:'egg'})]};
  const meals=JSON.stringify([legacy,{meal_id:'m1',date:'2026-11-01',meal_name:'Synthetic meal',record_schema_version:'2',items:[]}]);
  const f=asynchronousImports({daily,values:{[mealKey]:meals}});f.select('valid.xlsx');f.complete(0,book([{Date:'2026-11-02',Water_ml:'800'}]));
  f.run('appState.waterMl=500;');f.save();
  assert.equal(f.daily().length,2);assert.equal(f.values.get(mealKey),meals);
  const count=f.writes.length,x=f.context.XLSX;
  x.utils.book_new=()=>({SheetNames:[],Sheets:{}});
  x.utils.json_to_sheet=(rows,settings={})=>({rows,headers:settings.header||Object.keys(rows[0]||{}),'!ref':'A1:K1'});
  x.utils.book_append_sheet=(b,s,n)=>{b.SheetNames.push(n);b.Sheets[n]=s;};x.writeFile=b=>{x.generated=b;};
  await f.context.exportMasterExcel();
  assert.equal(x.generated.Sheets.Daily_Log.rows.length,2);assert.equal(x.generated.Sheets.Meal_Log.rows.length,2);
  assert.equal(x.generated.Sheets.Meal_Log.rows[0].Food_Name,'');
  assert.deepEqual(f.writes.slice(count),[]);assert.equal(f.values.get(mealKey),meals);
});
