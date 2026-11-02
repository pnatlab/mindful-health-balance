'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const runtime = require('../js/mealCompositionRuntime.js');
const bridge = require('../js/mealExcelBridge.js');
const root = path.resolve(__dirname, '..');
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');
const plain = (value) => JSON.parse(JSON.stringify(value));
const meal = (id, overrides = {}) => ({ meal_id: id, date: '2026-11-02', meal_name: 'Rice', record_schema_version: '2', items: [], ...overrides });
function memory(raw = null, fail = false) {
  const values = new Map(raw === null ? [] : [[runtime.MEAL_RECORDS_KEY, raw]]);
  const writes = [];
  return { writes, getItem(key) { if (fail && key === runtime.MEAL_RECORDS_KEY) throw Error('security'); return values.get(key) ?? null; },
    setItem(key, value) { writes.push(key); values.set(key, value); }, removeItem(key) { writes.push(key); values.delete(key); },
    raw: () => values.get(runtime.MEAL_RECORDS_KEY) ?? null };
}
function inspect(raw, fail) { return runtime.createMealStore(memory(raw, fail)).inspectStorage(); }
function project(records) { return bridge.buildMealLogExport(inspect(JSON.stringify(records))); }
const item = runtime.createMealItem({ food_id: 'egg', meal_item_id: 'item-1', source_reference: 'historical evidence' });
const legacy = { meal_id: 'legacy', date: '2026-11-01', items: [item], meal_note: 'Keep hidden note', named_dish_id: 'historical', condiment_knowledge: 'unknown' };
const records = [meal('c', { time: '15:00' }), meal('b'), legacy, meal('a')];
const raw = JSON.stringify(records);
const storage = memory(raw), inspection = runtime.createMealStore(storage).inspectStorage();
const before = JSON.stringify(inspection);
const result = bridge.buildMealLogExport(inspection);
assert.equal(result.ok, true);
assert.deepEqual(result.headers, ['Meal_ID','Date','Food_Name','Meal_Type','Meal_Period','Custom_Meal_Period','Meal_Time','Created_At','Updated_At','Record_Schema_Version','Item_Count']);
assert.deepEqual(result.rows.map((row) => row.Meal_ID), ['legacy', 'a', 'b', 'c']);
assert.equal(result.rows.filter((row) => row.Food_Name === 'Rice').length, 3, 'repeated names and dates remain separate meals');
assert.deepEqual(result.rows[0], { Meal_ID:'legacy', Date:'2026-11-01', Food_Name:'', Meal_Type:'', Meal_Period:'', Custom_Meal_Period:'', Meal_Time:'', Created_At:'', Updated_At:'', Record_Schema_Version:'', Item_Count:1 });
assert.equal(result.rows[1].Item_Count, 0);
assert.equal(result.rows[1].Record_Schema_Version, '2');
assert.equal(result.rows[1].Meal_Type, '', 'read defaults must not fill omitted export metadata');
assert.equal(storage.raw(), raw); assert.deepEqual(storage.writes, []); assert.equal(JSON.stringify(inspection), before);
assert.doesNotMatch(JSON.stringify(result), /historical evidence|Keep hidden note|named_dish_id|sodium|confidence/);
assert.deepEqual(project([...records].reverse()), result, 'ordering is independent of persisted array order');
assert.equal(project([meal('x',{ created_at:'2026-11-02T17:00:00Z', updated_at:'later' })]).rows[0].Meal_Time, '');
assert.equal(project([meal('x',{ meal_label:'custom', custom_meal_label:'Picnic', meal_type:'grilled' })]).rows[0].Custom_Meal_Period, 'Picnic');
for (const raw of [null, '[]']) assert.deepEqual(bridge.buildMealLogExport(inspect(raw)), { ok:true, headers:[...bridge.HEADERS], rows:[] });
for (const [label, value] of [
  ['malformed JSON','{bad'], ['non-array','{}'], ['null','null'], ['unsupported',JSON.stringify([meal('x',{record_schema_version:'3'})])],
  ['shape',JSON.stringify([null])], ['blank name',JSON.stringify([meal('x',{meal_name:' '})])],
  ['mixed invalid',JSON.stringify([meal('valid'),{meal_id:'broken'}])],
  ['invalid legacy date',JSON.stringify([{...legacy,date:'2026-02-30'}])],
  ['metadata object',JSON.stringify([meal('x',{meal_type:{invalid:true}})])],
  ['Excel text limit',JSON.stringify([meal('x',{meal_name:'x'.repeat(32768)})])],
  ['partially invalid items',JSON.stringify([{...legacy,items:[item,null]}])],
  ['ambiguous key','[{"meal_id":"hidden","meal_id":"x","date":"2026-11-02","meal_name":"Rice","items":[],"record_schema_version":"2"}]'],
  ['escaped duplicate key','[{"meal_id":"hidden","meal_\\u0069d":"x","date":"2026-11-02","meal_name":"Rice","items":[],"record_schema_version":"2"}]']
]) {
  const state = inspect(value), outcome = bridge.buildMealLogExport(state);
  assert.equal(outcome.ok, false, label); assert.equal(outcome.rows, undefined, 'no partial row result');
}
assert.equal(bridge.buildMealLogExport(inspect(null,true)).code, 'storage_read_failed');
assert.equal(project([meal('same'),meal('same')]).code, 'duplicate_meal_id');
assert.equal(project([meal('same'),{...legacy,meal_id:'same'}]).code, 'duplicate_meal_id');
assert.equal(project([meal('x',{meal_name:'A quote " and { braces } : text'})]).ok, true);

// Execute the actual application functions with synthetic keyed storage. Only DOM
// rendering and SheetJS transport are mocked; workbook builders and imports run.
function app(options = {}) {
  const storage = memory(options.meals === undefined ? null : options.meals, options.readFailure);
  if (options.daily !== undefined) storage.setItem('mindfulHealthDailyLog', options.daily);
  storage.setItem('mindfulHealthLanguage', options.language || 'en');
  storage.writes.length = 0;
  const status = { textContent:'old success' }, alerts = [];
  const xlsx = { utils: {
    book_new: () => ({ SheetNames:[], Sheets:{} }),
    json_to_sheet(rows, settings = {}) { return { rows:plain(rows), headers:plain(settings.header || Object.keys(rows[0] || {})), '!ref':'A1:K1' }; },
    book_append_sheet(book, sheet, name) { book.SheetNames.push(name); book.Sheets[name] = sheet; },
    sheet_to_json: (sheet, settings = {}) => settings.header === 1 ? [sheet.headers || ['Date', 'Water_ml']] : plain(sheet.rows || [])
  },
  writeFile(book) { if(options.writeFailure) throw Error('generation failed'); xlsx.book = book; return options.downloadPromise; },
  read: () => options.importBook
  };
  const context = { console:{...console,warn(){}}, Date, structuredClone, setTimeout, clearTimeout, localStorage:storage,
    alert:(text)=>alerts.push(text), confirm:()=>true,
    document:{ addEventListener() {}, querySelector:()=>status },
    FileReader:class { readAsArrayBuffer() { this.onload({ target:{result:new ArrayBuffer(0)} }); } },
    window:{ MHBMealRuntime:runtime, MHBMealExcelBridge:bridge, XLSX:xlsx }, XLSX:xlsx
  };
  vm.createContext(context);
  for (const file of ['js/config/workbookSchema.js','js/config/reflectionRootMatrix.js','js/dailyLogStorageIntegrity.js','script.js']) vm.runInContext(read(file),context,{filename:file});
  vm.runInContext('renderDailyLogTable = () => {};',context);
  storage.writes.length = 0; // Exclude existing application draft initialization.
  return { context, storage, status, alerts, xlsx,
    export:()=>context.exportMasterExcel(),
    import:()=>context.importMasterExcel({target:{files:[{}],dataset:{},value:'test.xlsx'}})
  };
}
(async () => {
  const daily = JSON.stringify([{ Date:'2026-11-02',Water_ml:1500,Mind:'Okay',Sleep:'Low',Load_Score:7 },{Date:'2026-11-03',Water_ml:1000}]);
  const originalSheets = ['Daily_Log','Summary','Reflections','Field_Context','Field_Review','Column_Guide','AI_Context'];
  for (const [label, dailyRaw, meals, expected] of [
    ['daily only',daily,'[]','exportedDailyOnly'], ['meal only','[]',raw,'exportedMealsOnly'],
    ['both',daily,raw,'exportedDailyAndMeals'], ['neither','[]','[]','noExportableData']
  ]) {
    const f=app({daily:dailyRaw,meals}); const snapshot=f.storage.raw(); await f.export();
    assert.equal(f.status.textContent,vm.runInContext(`t('${expected}')`,f.context),label);
    assert.equal(f.storage.raw(),snapshot); assert.deepEqual(f.storage.writes,[], 'export is entirely read-only');
    if(label==='neither') { assert.equal(f.xlsx.book,undefined);continue; }
    const book=f.xlsx.book;
    assert.deepEqual(book.SheetNames,[...originalSheets,'Meal_Log']);
    assert.deepEqual(book.Sheets.Daily_Log.headers,plain(f.context.window.DAILY_LOG_COLUMNS));
    assert.deepEqual(book.Sheets.Meal_Log.headers,[...bridge.HEADERS]);
    assert.equal(book.Sheets.Meal_Log.rows.length,label==='daily only'?0:4);
    assert.equal(book.Sheets.Daily_Log.rows.length,label==='meal only'?0:2);
    const summary=book.Sheets.Summary.rows[0];
    assert.equal(summary.Total_Logs,label==='meal only'?0:2);
    assert.equal(summary.Average_Water_ml,label==='meal only'?0:1250);
    assert.equal(summary.High_Load_Days,label==='meal only'?0:1);
    assert.equal(book.Sheets.Field_Review.rows[0].Total_Days,label==='meal only'?0:2);
    if(label==='meal only') {
      assert.equal(summary.Most_Common_Mind,'');
      assert.equal(book.Sheets.Field_Review.rows[0].Review_Period_Start,'');
      assert.deepEqual(book.Sheets.Reflections.rows,[]);
    }
    const guide=book.Sheets.Column_Guide.rows.filter(row=>row.Sheet==='Meal_Log');
    assert.deepEqual(guide.map(row=>row.Column),[...bridge.HEADERS]);
    assert.match(guide.find(row=>row.Column==='Food_Name').Meaning,/blank for legacy/);
    assert.match(guide.find(row=>row.Column==='Item_Count').Meaning,/Historical metadata only/);
    assert.match(guide[0].AI_Read_Note,/cannot restore full Meal records/);
  }
  const profile=app({daily:'[]',meals:raw});
  profile.storage.setItem('mhb_user_intention_profile_v1',JSON.stringify({schemaVersion:'1.0',displayName:'Synthetic',updatedAt:'2026-11-02T12:00:00Z'}));
  await profile.export();
  assert.ok(profile.xlsx.book.SheetNames.includes('User_Intention_Profile'),'optional profile preserved');

  for(const [label,overrides,key] of [
    ['malformed meals',{meals:'{bad'},'mealExportIntegrityFailed'],
    ['unsupported',{meals:JSON.stringify([meal('future',{record_schema_version:'3'})])},'mealExportIntegrityFailed'],
    ['duplicate',{meals:JSON.stringify([meal('x'),meal('x')])},'mealExportDuplicate'],
    ['read denied',{readFailure:true},'mealExportIntegrityFailed'],
    ['write failed',{writeFailure:true},'excelExportFailed']
  ]) {
    const f=app({daily,meals:raw,...overrides}); const snapshot=f.storage.raw(); await f.export();
    assert.equal(f.status.textContent,vm.runInContext(`t('${key}')`,f.context),label);
    assert.equal(f.xlsx.book,undefined);assert.equal(f.storage.raw(),snapshot);assert.deepEqual(f.storage.writes,[]);
  }
  const factoryFailure=app({daily,meals:raw});factoryFailure.context.getMealCompositionStore=()=>{throw Error('storage API inaccessible');};await factoryFailure.export();
  assert.equal(factoryFailure.status.textContent,vm.runInContext("t('mealExportIntegrityFailed')",factoryFailure.context));
  const badDaily=app({daily:'{bad',meals:raw});await badDaily.export();
  assert.equal(badDaily.xlsx.book,undefined,'existing Daily Log integrity block is preserved');
  let resolveDownload;const pending=new Promise(resolve=>{resolveDownload=resolve;});
  const download=app({meals:raw,daily:'[]',downloadPromise:pending});const saving=download.export();
  assert.equal(download.status.textContent,'','no success before download initiation resolves');resolveDownload();await saving;
  assert.match(download.status.textContent,/download started/);
  const rejected=app({meals:raw,downloadPromise:Promise.reject(Error('download rejected'))});await rejected.export();
  assert.equal(rejected.status.textContent,vm.runInContext("t('excelExportFailed')",rejected.context));

  for(const hasMealSheet of [true,false]) {
    const book={Sheets:{Daily_Log:{rows:[{Date:'2026-11-03',Water_ml:900}]},...(hasMealSheet?{Meal_Log:{rows:[{Meal_ID:'not-a-browser-meal'}]}}:{})}};
    const f=app({meals:raw,importBook:book});f.import();
    assert.equal(f.storage.raw(),raw);assert.deepEqual(f.storage.writes,['mindfulHealthDailyLog']);
    assert.equal(JSON.parse(f.storage.getItem('mindfulHealthDailyLog'))[0].Water_ml,900);
    assert.equal(f.status.textContent.includes('Meal_Log was not imported'),hasMealSheet);
  }
  const missingDaily=app({meals:raw,importBook:{Sheets:{Meal_Log:{rows:[]}}}});missingDaily.import();
  assert.match(missingDaily.alerts[0],/Meal_Log was not imported/);assert.equal(missingDaily.storage.raw(),raw);assert.deepEqual(missingDaily.storage.writes,[]);
  for(const language of ['th','en','zh']) {
    const f=app({language,meals:raw});await f.export();assert.doesNotMatch(f.status.textContent,/exportedMealsOnly/);
    const imported=app({language,meals:raw,importBook:{Sheets:{Daily_Log:{rows:[]},Meal_Log:{rows:[]}}}});imported.import();
    assert.match(imported.status.textContent,/Meal_Log/);assert.doesNotMatch(imported.status.textContent,/mealLogNotImported/);
  }
  const adapter=read('js/mealExcelBridge.js');
  assert.doesNotMatch(adapter,/localStorage|fetch\(|ollama|createMeal\(|deriveMealEstimate|setItem\(/i,'adapter has no I/O or inference path');
  const exportSource=read('script.js').match(/async function exportMasterExcel\(\)[^]*?\n\}/)[0];
  assert.doesNotMatch(exportSource,/setItem|setDailyLog|setMealRecords|createMeal\(|deriveMeal|buildReflection\(/);
  console.log('Meal Excel adapter, workbook builders, export outcomes, import exclusion and safety tests passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
