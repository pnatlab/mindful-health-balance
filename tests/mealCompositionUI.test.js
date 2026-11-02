const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const runtime = require('../js/mealCompositionRuntime.js');
const ui = require('../js/mealCompositionUI.js');
const vision = require('../js/mealVisionReview.js');
const date='2026-11-02';
function memory(initial=null) {
  let raw=initial;
  return {getItem:()=>raw,setItem:(_key,value)=>{raw=value;},snapshot:()=>raw};
}
function rootFixture() {
  const nodes=new Map();
  const handlers={};
  const root={handlers,contains:()=>true,addEventListener:(type,handler)=>{handlers[type]=handler;},querySelector(selector) {
    if(!nodes.has(selector)) nodes.set(selector,{innerHTML:'',textContent:'',setAttribute(){},focus(){root.focused=selector;},scrollIntoView(){}});
    return nodes.get(selector);
  }};
  root.content=()=>root.querySelector('[data-meal-content]').innerHTML;
  root.click=(attribute,dataset={})=>{
    const action={dataset,hasAttribute:(name)=>name===attribute,matches:(selector)=>selector===`[${attribute}]`};
    handlers.click({target:{closest:()=>action},preventDefault(){}});
  };
  root.input=(attribute,value)=>handlers.input({target:{value,matches:(selector)=>selector===`[${attribute}]`}});
  root.change=(attribute,value)=>handlers.change({target:{value,dataset:{},matches:(selector)=>selector===`[${attribute}]`}});
  return root;
}
function setup(initial=null,language='en',extras={}) {
  const storage=memory(initial);
  const root=rootFixture();
  let id=0;
  const model=ui.createMealComposerModel({runtime,storage,date,language,createId:()=>`meal_${++id}`,now:()=>`${date}T01:00:00.000Z`});
  const panel=ui.createMealComposerUI({root,model,runtime,language,storage,scheduleFrame:(callback)=>callback(),confirmAction:()=>true,...extras});
  panel.open();
  return {root,model,panel,storage};
}
const {root,model,panel,storage}=setup();
assert.ok(root.content().indexOf('data-meal-name')<root.content().indexOf('data-image-prep-open') || root.content().indexOf('data-meal-name')<root.content().indexOf('data-vision-image'));
assert.match(root.content(),/<details[^>]*data-meal-details>/,'additional details initially collapsed');
assert.match(root.content(),/data-meal-name required aria-required="true"/);
assert.match(root.content(),/data-meal-time value=""/);
assert.doesNotMatch(root.content(),/data-add-food|data-meal-portion|data-meal-preparation|data-confirm-named-dish|meal-estimate|data-reflect-meal-draft/,'active entry contains no composition or sodium prompts');
root.click('data-save-meal');
assert.equal(model.getMeals().length,0);
assert.match(root.content(),/role="alert">Enter a food name/);
assert.equal(root.focused,'[data-meal-name]');
root.input('data-meal-name','  ข้าวร้านเดิม  ');
root.change('data-meal-time','24:00');
root.click('data-save-meal');
assert.equal(model.getMeals().length,0);
assert.match(root.content(),/Enter time as HH:mm/);
assert.match(root.content(),/data-meal-details open/);
root.change('data-meal-time','');
root.click('data-save-meal');
assert.equal(model.getMeals().length,1);
assert.equal(model.getMeals()[0].meal_name,'ข้าวร้านเดิม');
assert.deepEqual(model.getMeals()[0].items,[]);
assert.match(root.content(),/<h4>ข้าวร้านเดิม<\/h4>/);
assert.doesNotMatch(root.content(),/0 items|meal-visual-plate|meal-named-dish-saved|meal-estimate/);
assert.equal(model.getDraft().mealName,'');
assert.equal(root.focused,'[data-meal-name]');
assert.match(root.querySelector('[data-meal-reflection]').innerHTML,/1 recorded meal/);
assert.deepEqual(ui.buildSavedMealTypeIndicatorModel(model.getMeals()).visibleMealTypes,['unspecified']);
assert.ok(storage.snapshot().includes('record_schema_version'));
root.click('data-edit-meal',{editMeal:'meal_1'});
root.input('data-meal-name','Edited');
root.click('data-save-meal');
assert.equal(model.getMeals()[0].meal_id,'meal_1');
assert.equal(model.getMeals()[0].created_at,`${date}T01:00:00.000Z`);
assert.equal(model.getMeals()[0].meal_name,'Edited');

// Native disclosure state survives render; metadata is optional and explicit.
root.handlers.toggle({target:{matches:(selector)=>selector==='[data-meal-details]',open:true}});
root.change('data-meal-moment-type','grilled');
root.change('data-meal-label','lunch');
root.change('data-meal-time','12:05');
root.input('data-meal-name','Second');
root.handlers.submit({target:{matches:()=>true},preventDefault(){}});
assert.equal(model.getMeals().length,2);
assert.deepEqual([model.getMeals()[1].meal_type,model.getMeals()[1].meal_label,model.getMeals()[1].time],['grilled','lunch','12:05']);
assert.match(root.content(),/<details[^>]*data-meal-details>/,'success resets optional disclosure');

const legacy={meal_id:'legacy',date,meal_label:'custom',custom_meal_label:'Picnic',meal_note:'Keep note',items:[runtime.createMealItem({food_id:'egg'})],created_at:'old',updated_at:'old'};
const historic=setup(JSON.stringify([legacy]));
assert.match(historic.root.content(),/<h4>Egg<\/h4>/,'unnamed history has a read-only item heading');
assert.match(historic.root.content(),/Historical details/);
assert.match(historic.root.content(),/Keep note/);
historic.root.click('data-edit-meal',{editMeal:'legacy'});
assert.equal(historic.model.getDraft().mealName,'','no synthetic name enters draft');
historic.root.click('data-save-meal');
assert.equal(historic.model.getMeals()[0].meal_name,'');
historic.root.input('data-meal-name','Human name');
historic.root.click('data-save-meal');
assert.equal(JSON.parse(historic.storage.snapshot())[0].custom_meal_label,'Picnic');
assert.deepEqual(JSON.parse(historic.storage.snapshot())[0].items,legacy.items);

// Persistence failures cannot clear the draft or show success feedback.
const failStorage={getItem:()=>null,setItem:()=>{throw new Error('quota');}};
const failRoot=rootFixture();
const failModel=ui.createMealComposerModel({runtime,storage:failStorage,date});
const failed=ui.createMealComposerUI({root:failRoot,model:failModel,runtime,language:'en',scheduleFrame:(fn)=>fn()});
failed.open();
failRoot.input('data-meal-name','Retain me');
failRoot.click('data-save-meal');
assert.equal(failModel.getDraft().mealName,'Retain me');
assert.match(failRoot.content(),/Could not save/);
assert.doesNotMatch(failRoot.content(),/meal-saved-confirmation/);
assert.equal(failRoot.querySelector('[data-meal-status]').textContent,'');
const blocked=setup('{malformed');
assert.match(blocked.root.content(),/Meal changes are paused/);
blocked.root.input('data-meal-name','Retain blocked draft');
blocked.root.click('data-save-meal');
assert.equal(blocked.storage.snapshot(),'{malformed');
assert.equal(blocked.model.getDraft().mealName,'Retain blocked draft');

// Historical ingredient Apply is absent and synthetic clicks remain inert.
const before=model.getDraft();
root.click('data-vision-apply');
assert.deepEqual(model.getDraft(),before);
assert.equal(model.getMeals().length,2);
assert.doesNotMatch(root.content(),/data-vision-apply/);
for (const language of ['th','en','zh']) {
  panel.setLanguage(language);
  assert.match(root.content(),new RegExp(ui.MOMENT_TEXT[language].mealName));
  for (const key of ['mealName','nameRequired','additionalDetails','storageFailed','storageBlocked','historicalDetails','customOccasion']) assert.equal(typeof ui.MOMENT_TEXT[language][key],'string');
}
const source=fs.readFileSync(path.join(__dirname,'../js/mealCompositionUI.js'),'utf8');
const activeRender=source.match(/function render\(\) \{[^]*?\n    \}/)[0];
assert.doesNotMatch(activeRender,/renderFoodPicker|renderNamedDishReference|renderMealType/);
assert.doesNotMatch(source,/data-vision-apply|applyVisionReviewToDraft/);
const manualSave=source.match(/function saveDraft\(\)[^]*?\n    \}/)[0];
assert.doesNotMatch(manualSave,/draft\.items|meal_note|named_dish_id|condiment_knowledge/,'active metadata edits never rebuild hidden history');
// Retained helper remains available for historical/module regression coverage.
const review=vision.createVisionReviewModel({observation_id:'synthetic',visible_components:[{label:'rice'}]});
assert.equal(review.components[0].selectedFoodId,'rice');
async function checkNameOnlyReview() {
  let observations=0;
  const observed=setup(null,'en',{
    visionReview:vision,
    visionImageNormalizer:{normalizeVisionImage:async(image)=>({status:'ready',image})},
    visionProviderFactory:async()=>({isAvailable:async()=>({status:'ready'}),observeMeal:async()=>{
      observations+=1;
      return {status:'success',observation:{observation_id:'synthetic-photo',dish_candidates:[{label:'Rice'}],visible_components:[{label:'rice'}],meal_type_candidates:[{meal_type:'stir_fried'}],uncertain_observations:[],not_observable:[]}};
    }})
  });
  observed.root.handlers.change({target:{files:[new Blob(['synthetic image'],{type:'image/png'})],dataset:{},matches:(selector)=>selector==='[data-vision-image]'}});
  await new Promise((resolve)=>setTimeout(resolve,10));
  assert.equal(observations,1);
  assert.doesNotMatch(observed.root.querySelector('[data-meal-photo-content]').innerHTML,/data-vision-apply|data-vision-component/);
  assert.match(observed.root.querySelector('[data-meal-name-proposals]').innerHTML,/AI is unavailable/);
  observed.root.click('data-vision-apply');
  assert.deepEqual(observed.model.getDraft().items,[],'review defaults cannot create ingredients');
  assert.equal(observed.model.getDraft().mealType,'unspecified');
  assert.equal(observed.model.getDraft().mealName,'');
  assert.equal(observed.model.getMeals().length,0,'observations and Apply never save');
  observed.root.input('data-meal-name','Human typed name');
  observed.root.click('data-save-meal');
  assert.equal(observed.model.getMeals().length,1,'manual save works independently after Vision');
  assert.deepEqual(observed.model.getMeals()[0].items,[]);
  assert.equal(observations,1,'no retry or additional inference');
  observed.panel.destroy();
}
checkNameOnlyReview().then(()=>console.log('Meal Moment manual UI and name-only Vision tests passed.')).catch((error)=>{console.error(error);process.exitCode=1;});
