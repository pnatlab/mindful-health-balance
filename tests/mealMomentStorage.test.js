const assert = require('node:assert/strict');
const runtime = require('../js/mealCompositionRuntime.js');
const ui = require('../js/mealCompositionUI.js');
const date = '2026-11-02';
const key = runtime.MEAL_RECORDS_KEY;
function storage(initial = null) {
  let raw = initial;
  return { getItem: () => raw, setItem: (_key, value) => { raw = value; }, snapshot: () => raw };
}
let sequence = 0;
const options = { createId: () => `moment_${++sequence}`, now: () => '2026-11-02T01:00:00.000Z' };
const memory = storage();
const store = runtime.createMealStore(memory, options);
assert.equal(memory.snapshot(), null, 'startup never writes');
for (const invalidDate of ['', ' ', 'not-a-date', '2026-02-30']) assert.equal(store.createMeal({date:invalidDate,meal_name:'Test'}).ok,false);
assert.equal(store.createMeal({date:'2024-02-29',meal_name:'Leap day'}).ok,true);
// Keep subsequent first-save assertions isolated.
memory.setItem(key, '[]');
for (const meal_name of ['', '  ', '\n\t']) {
  assert.equal(store.createMeal({date, meal_name}).code, 'name_required');
  assert.equal(memory.snapshot(), '[]');
}
const created = store.createMeal({date, meal_name: '  ข้าวร้านเดิม  '});
assert.equal(created.ok, true);
assert.equal(created.meal.record_schema_version, '2');
assert.equal(runtime.MEAL_SCHEMA_VERSION, '1', 'Food Reference version remains separate');
assert.deepEqual([created.meal.meal_name, created.meal.meal_type, created.meal.meal_label, created.meal.time, created.meal.items, created.meal.named_dish_id], ['ข้าวร้านเดิม', 'unspecified', 'unnamed', '', [], '']);
assert.equal(runtime.createMealStore(memory).getMealRecords().length, 1);
const edited = store.updateMeal(created.meal.meal_id, {meal_name:'New name', meal_id:'replacement', created_at:'replacement', record_schema_version:'99'});
assert.equal(edited.ok, true);
assert.equal(edited.meal.meal_id, created.meal.meal_id);
assert.equal(edited.meal.created_at, created.meal.created_at);
assert.equal(edited.meal.record_schema_version, '2');
for (const time of ['00:00','09:05','23:59','']) assert.equal(store.updateMeal(created.meal.meal_id,{time}).ok,true);
for (const time of ['9:05','24:00','12:60','12:30:00','noon']) {
  const before = memory.snapshot();
  assert.equal(store.updateMeal(created.meal.meal_id,{time}).code,'invalid_time');
  assert.equal(store.createMeal({date, meal_name:'Test',time}).code,'invalid_time');
  assert.equal(memory.snapshot(),before);
}
assert.equal(store.createMeal({date, meal_name:'No inferred ingredients',items:[runtime.createMealItem({food_id:'rice'})]}).ok,false);
assert.equal(store.createMeal({date, meal_name:'No inferred dish',named_dish_id:'fried_rice_vegetable'}).ok,false);
assert.equal(runtime.deriveMealEstimate({...created.meal,named_dish_id:'fried_rice_vegetable'}).estimated_sodium_min_mg,null);

// Exact lexical preservation: future entries, malformed entries, duplicate keys,
// escaped commas/brackets, and integers outside JavaScript's safe numeric range.
const item = runtime.createMealItem({food_id:'egg',portion_label:'large',preparation:'boiled'});
const legacy = {meal_id:'legacy',date,items:[{...item,extra_evidence:{value:12,unit:'mg'}}],meal_label:'custom', time:'around noon', custom_meal_label:'Picnic',meal_note:'keep my note',named_dish_id:'future_reference',condiment_knowledge:'unknown',created_at:'original',updated_at:'original',extra_metadata:{keep:true}};
const legacyText = JSON.stringify(legacy,null,2);
const unsupportedText = ' {"meal_id":"future","record_schema_version":"900", "n":9007199254740993,"n":-0,"text":"a,]\\\"b"} ';
const malformedText = ' {"meal_id":"broken","items":[null]} ';
const array = storage(`[${legacyText},${unsupportedText},${malformedText},null,1e999]`);
const mixed = runtime.createMealStore(array,options);
const beforeRead = array.snapshot();
assert.equal(mixed.getMealRecords().length,1);
assert.equal(mixed.getMealRecords()[0].meal_name,'');
assert.equal(array.snapshot(),beforeRead,'read does not migrate');
assert.equal(mixed.createMeal({date,meal_name:'Another meal'}).ok,true);
assert.ok(array.snapshot().includes(legacyText));
assert.ok(array.snapshot().includes(unsupportedText));
assert.ok(array.snapshot().includes(malformedText));
assert.ok(array.snapshot().includes('null,1e999'));
const originalItemsText = /"items":\s*(\[[\s\S]*?\n  \]),/.exec(legacyText)[1];
const legacyEdit = mixed.updateMeal('legacy',{meal_name:'Human supplied name'});
assert.equal(legacyEdit.ok,true);
const rawLegacy = JSON.parse(array.snapshot())[0];
assert.deepEqual(rawLegacy.items,legacy.items);
assert.equal(rawLegacy.created_at,'original');
assert.equal(rawLegacy.record_schema_version,undefined,'legacy metadata edit never upgrades version');
for (const field of ['meal_note','named_dish_id','condiment_knowledge','custom_meal_label','extra_metadata']) assert.deepEqual(rawLegacy[field],legacy[field]);
assert.ok(array.snapshot().includes(originalItemsText),'historical item JSON remains byte-for-byte unchanged during name edit');
assert.ok(array.snapshot().includes(unsupportedText));
assert.equal(mixed.updateMeal('future',{meal_name:'Overwrite?'}).ok,false);
const beforeBulk = array.snapshot();
assert.equal(mixed.setMealRecords([]).ok,false,'bulk replacement cannot erase preserved records');
assert.equal(array.snapshot(),beforeBulk);
assert.equal(mixed.deleteMeal('legacy').ok,true);
assert.ok(array.snapshot().includes(unsupportedText));
assert.ok(array.snapshot().includes(malformedText));

for (const raw of ['', '{bad json', '{}', 'null']) {
  const bad = storage(raw);
  const blocked = runtime.createMealStore(bad,options);
  for (const outcome of [blocked.createMeal({date,meal_name:'Test'}),blocked.updateMeal('legacy',{meal_name:'Test'}),blocked.deleteMeal('legacy')]) assert.equal(outcome.ok,false);
  assert.equal(bad.snapshot(),raw);
}
for (const errorName of ['QuotaExceededError','SecurityError']) {
  const bad = {getItem:()=>null,setItem:()=>{const error=new Error(errorName);error.name=errorName;throw error;}};
  const model = ui.createMealComposerModel({runtime,storage:bad,date,...options});
  model.setDraftMeta({mealName:'Keep this draft',time:'12:30'});
  const before = model.getDraft();
  assert.deepEqual(model.saveDraft(),{ok:false,code:'storage_write_failed'});
  assert.deepEqual(model.getDraft(),before);
}
const denied = runtime.createMealStore({getItem:()=>{throw new Error('security');},setItem:()=>assert.fail('must not write')});
assert.equal(denied.createMeal({date,meal_name:'Test'}).code,'storage_read_failed');
const duplicate = storage(JSON.stringify([legacy,legacy]));
const duplicateStore = runtime.createMealStore(duplicate,options);
assert.equal(duplicateStore.getMealRecords().length,0,'ambiguous identities are not presented as distinct valid meals');
assert.equal(duplicateStore.updateMeal('legacy',{meal_name:'Test'}).ok,false);
assert.equal(duplicateStore.deleteMeal('legacy').ok,false);
const ambiguous = storage(`[${JSON.stringify({...legacy,meal_id:'ambiguous'}).slice(0,-1)},"meal_note":"duplicate"}]`);
assert.equal(runtime.createMealStore(ambiguous,options).updateMeal('ambiguous',{meal_name:'Test'}).ok,false);

// Editing through the active model changes metadata only, including legacy custom occasions.
const editMemory=storage(JSON.stringify([legacy]));
const model=ui.createMealComposerModel({runtime,storage:editMemory,date,...options});
model.editMeal('legacy');
assert.equal(model.saveDraft().code,'name_required');
model.setDraftMeta({mealName:'Name added'});
assert.equal(model.saveDraft().ok,true);
const savedLegacy=JSON.parse(editMemory.snapshot())[0];
assert.deepEqual(savedLegacy.items,legacy.items);
assert.equal(savedLegacy.custom_meal_label,'Picnic');
assert.equal(savedLegacy.meal_note,'keep my note');
assert.equal(savedLegacy.time,'around noon','untouched historical time is not silently rewritten');
assert.equal(savedLegacy.named_dish_id,'future_reference');
let reads=0;
const raced=runtime.createMealStore({getItem:()=>++reads===1?null:'[]',setItem:()=>assert.fail('changed storage must not be overwritten')},options);
assert.equal(raced.createMeal({date,meal_name:'Race'}).code,'storage_changed');
const deniedEdit=storage(JSON.stringify([created.meal]));
const failingEdit=runtime.createMealStore({getItem:()=>deniedEdit.snapshot(),setItem:()=>{throw new Error('quota');}},options);
assert.equal(failingEdit.updateMeal(created.meal.meal_id,{meal_name:'Change'}).code,'storage_write_failed');
assert.equal(failingEdit.deleteMeal(created.meal.meal_id).code,'storage_write_failed');
assert.equal(JSON.parse(deniedEdit.snapshot())[0].meal_name,created.meal.meal_name);
console.log('Meal Moment storage safety tests passed.');
