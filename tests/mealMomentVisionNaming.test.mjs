import assert from 'node:assert/strict';
import fs from 'node:fs';
import runtime from '../js/mealCompositionRuntime.js';
import ui from '../js/mealCompositionUI.js';
import vision from '../js/mealVisionReview.js';
import * as naming from '../js/mealNameProposal.mjs';
import fixtures from './helpers/syntheticApp.js';

const date = '2026-11-02';
const image = () => new Blob(['synthetic image'], { type: 'image/png' });
const observation = (id = 'photo') => ({
  observation_id: id,
  dish_candidates: [{ label: 'Rice with egg', confidence: 'unknown' }],
  visible_components: [{ label: 'rice', confidence: 'unknown' }, { label: 'egg', confidence: 'unknown' }],
  meal_type_candidates: [{ meal_type: 'other', confidence: 'unknown' }],
  uncertain_observations: [], not_observable: ['seasoning_amount']
});
const wire = 'STATUS: ok\nCANDIDATE_1: Rice with egg\nBASIS_1: dish-0\nCANDIDATE_2: Rice and egg\nBASIS_2: component-0,component-1';
const deferred = () => { let resolve; const promise = new Promise((done) => { resolve = done; }); return { promise, resolve }; };
async function until(condition) {
  for (let i = 0; i < 100 && !condition(); i++) await new Promise((resolve) => setTimeout(resolve, 1));
  assert.ok(condition(), 'asynchronous fixture reached expected state');
}
const flush = () => new Promise((resolve) => setTimeout(resolve, 5));
function rootFixture() {
  const nodes = new Map(), handlers = {};
  let fullRenders = 0;
  const root = { contains: () => true, addEventListener: (type, handler) => { handlers[type] = handler; }, querySelector(selector) {
    if (!nodes.has(selector)) {
      let html = '';
      nodes.set(selector, { value: '', textContent: '', setAttribute() {}, focus() { root.focused = selector; }, scrollIntoView() {},
        get innerHTML() { return html; }, set innerHTML(value) { html = value; if (selector === '[data-meal-content]') fullRenders++; }
      });
    }
    return nodes.get(selector);
  } };
  root.click = (attribute, dataset = {}) => handlers.click({ target: { closest: () => ({ dataset, hasAttribute: (key) => key === attribute, matches: (key) => key === `[${attribute}]` }) }, preventDefault() {} });
  root.type = (value) => {
    root.querySelector('[data-meal-name]').value = value;
    handlers.input({ target: { value, matches: (key) => key === '[data-meal-name]' } });
  };
  root.image = () => handlers.change({ target: { files: [image()], matches: (key) => key === '[data-vision-image]' } });
  root.suggestions = () => root.querySelector('[data-meal-name-proposals]').innerHTML;
  root.photo = () => root.querySelector('[data-meal-photo-content]').innerHTML;
  root.content = () => root.querySelector('[data-meal-content]').innerHTML;
  root.renders = () => fullRenders;
  root.candidate = () => {
    const match = root.suggestions().match(/data-meal-name-accept="([^"]+)" data-naming-request="([^"]+)"/);
    return match ? { mealNameAccept: match[1], namingRequest: match[2] } : null;
  };
  return root;
}
function setup(options = {}) {
  let raw = options.initial || null, writes = 0, id = 0;
  const storage = { getItem: () => raw, setItem: (_key, value) => { if (options.writeFailure) throw Error('quota'); raw = value; writes++; } };
  const root = rootFixture(), bridges = [], bodies = [], transports = [];
  let observations = 0, normalizations = 0;
  const model = options.model || ui.createMealComposerModel({ runtime, storage, date, language: options.language || 'en', createId: () => `meal-${++id}`, now: () => `${date}T00:00:00Z` });
  const panel = ui.createMealComposerUI({ root, model, runtime, language: options.language || 'en', scheduleFrame: (fn) => fn(),
    beforeSave: options.beforeSave, onSaved: options.onSaved,
    visionReview: vision,
    visionImageNormalizer: { async normalizeVisionImage(blob) { normalizations++; return { status: 'ready', image: blob }; } },
    visionProviderFactory: async () => ({ isAvailable: async () => ({ status: options.visionUnavailable ? 'provider_unavailable' : 'ready' }),
      async observeMeal() { observations++; return options.visionGate ? await options.visionGate.promise : { status: 'success', observation: options.observation || observation() }; }
    }),
    imagePrepBridgeFactory: options.noBridge ? null : (callbacks) => {
      const bridge = { ...callbacks, destroyed: false, open: () => !options.popupBlocked, destroy() { bridge.destroyed = true; } };
      bridges.push(bridge); return bridge;
    },
    mealNameProposalFactory: async () => ({ ...naming, createLocalOllamaMealNameProposalAdapter: () => naming.createLocalOllamaMealNameProposalAdapter({
      fetchImpl: async (url, init) => {
        if (url.endsWith('/api/tags')) return { ok: !options.namingUnavailable, json: async () => ({ models: [{ name: 'gemma3:12b' }] }) };
        const body = JSON.parse(init.body); bodies.push(body);
        const transport = deferred(); transports.push(transport);
        // Deliberately ignore abort: the UI/coordinator must also reject late callbacks.
        const text = options.autoResponse === undefined ? await transport.promise : options.autoResponse;
        return { ok: true, json: async () => ({ response: text }) };
      }
    }) })
  });
  return { root, model, panel, bridges, bodies, transports, raw: () => raw, writes: () => writes,
    observations: () => observations, normalizations: () => normalizations,
    prepare() { root.click('data-image-prep-open'); bridges.at(-1).onPrepared({ image_blob: image() }); },
    async ready() { await until(() => Boolean(root.candidate())); },
    accept(candidate = root.candidate()) { root.click('data-meal-name-accept', candidate); }
  };
}

// The real bounded input, text adapter, parser, validator, coordinator and session are reused.
const main = setup();
main.root.type('My existing human name');
main.model.setDraftMeta({ mealType: 'grilled', mealLabel: 'custom', customMealLabel: 'Picnic', time: '12:30' });
const original = main.model.getDraft(), renders = main.root.renders();
main.prepare();
await until(() => main.transports.length === 1);
main.root.type('Human typing while AI is pending');
main.transports[0].resolve(wire);
await main.ready();
assert.equal(main.model.getDraft().mealName, 'Human typing while AI is pending', 'arrival never overwrites a human name');
assert.equal(main.root.querySelector('[data-meal-name]').value, 'Human typing while AI is pending');
assert.equal(main.root.renders(), renders, 'async progress never reconstructs the form or disrupts IME/focus');
assert.equal(main.writes(), 0);
assert.equal(main.observations(), 1);
assert.equal(main.normalizations(), 0, 'prepared image is not normalized a second time');
assert.equal(main.bodies.length, 1);
assert.equal('images' in main.bodies[0], false, 'naming request is text-only');
assert.equal(main.bodies[0].model, 'gemma3:12b');
assert.doesNotMatch(main.root.suggestions() + main.root.photo(), /data-vision-apply|data-vision-component|data-vision-meal-type/);
const firstCandidate = main.root.candidate();
main.accept();
assert.equal(main.model.getDraft().mealName, 'Rice with egg');
assert.equal(main.root.focused, '[data-meal-name]');
assert.deepEqual({ ...main.model.getDraft(), mealName: original.mealName }, original, 'acceptance changes only Food Name');
assert.equal(main.writes(), 0, 'acceptance does not save');
main.root.type('Final human wording');
main.root.click('data-save-meal');
assert.equal(main.writes(), 1);
const saved = main.model.getMeals()[0];
assert.equal(saved.meal_name, 'Final human wording');
assert.deepEqual(saved.items, []);
assert.equal(saved.named_dish_id, '', 'no named-dish reference');
assert.equal(saved.date, date);
assert.deepEqual([saved.meal_type, saved.meal_label, saved.time], ['grilled', 'custom', '12:30']);
assert.doesNotMatch(main.raw(), /sodium|evidence|proposal|candidateId/);
main.accept(firstCandidate);
assert.equal(main.model.getDraft().mealName, '', 'consumed candidate cannot reopen a completed draft');
assert.equal(ui.buildSavedMealTypeIndicatorModel(main.model.getMeals()).totalCount, 1);
main.panel.destroy();

// Name-only manual fallback works after every failure, without an automatic retry.
for (const [label, overrides, message] of [
  ['malformed', { autoResponse: 'broken naming wire' }, /could not be read/],
  ['insufficient', { autoResponse: 'STATUS: insufficient_evidence\nCANDIDATE_1: none\nBASIS_1: none\nCANDIDATE_2: none\nBASIS_2: none' }, /No suggestion available/],
  ['naming unavailable', { namingUnavailable: true }, /AI is unavailable/],
  ['Vision unavailable', { visionUnavailable: true }, /unavailable|connect|local AI/i],
  ['invalid observation', { observation: { ...observation(), not_observable: ['fabrication'] } }, /could not be read/]
]) {
  const f = setup(overrides); f.prepare();
  await until(() => message.test(f.root.querySelector('[data-meal-status]').textContent));
  assert.equal(f.root.candidate(), null, label);
  assert.equal(f.bodies.length, label === 'malformed' || label === 'insufficient' ? 1 : 0);
  await flush();
  assert.ok(f.observations() <= 1);
  f.root.type(`Manual: ${label}`); f.root.click('data-save-meal');
  assert.equal(f.model.getMeals()[0].meal_name, `Manual: ${label}`);
  assert.deepEqual(f.model.getMeals()[0].items, []);
  f.panel.destroy();
}

// Explicit name retry reuses the validated observation and invalidates old candidate controls.
const retry = setup({ autoResponse: wire }); retry.prepare(); await retry.ready();
const oldCandidate = retry.root.candidate();
retry.root.click('data-meal-name-retry');
await until(() => retry.root.candidate()?.namingRequest !== oldCandidate.namingRequest && Boolean(retry.root.candidate()));
retry.accept(oldCandidate); assert.equal(retry.model.getDraft().mealName, '');
retry.accept(); assert.equal(retry.model.getDraft().mealName, 'Rice with egg');
assert.equal(retry.observations(), 1); assert.equal(retry.bodies.length, 2);
retry.panel.destroy();

// Repeated prepared callbacks cannot create a second observation or naming request.
const consumed = setup({ autoResponse: wire }); consumed.prepare(); await consumed.ready();
consumed.bridges[0].onPrepared({ image_blob: image() }); await flush();
assert.equal(consumed.observations(), 1); assert.equal(consumed.bodies.length, 1);
consumed.root.type('Keep this name when closing'); consumed.root.click('data-vision-clear');
assert.equal(consumed.model.getDraft().mealName, 'Keep this name when closing');
assert.equal(consumed.root.focused, '[data-meal-name]');
assert.match(consumed.root.photo(), /Cancelled/); consumed.panel.destroy();

// Retrying a failed observation is a separate, explicit image action.
const failedImage = setup({ visionUnavailable: true }); failedImage.prepare();
await until(() => /data-vision-retry/.test(failedImage.root.photo()));
failedImage.root.click('data-vision-retry');
await until(() => failedImage.normalizations() === 1 && /data-vision-retry/.test(failedImage.root.photo()));
assert.equal(failedImage.observations(), 0); assert.equal(failedImage.bodies.length, 0);
failedImage.panel.destroy();

const legacy = { meal_id: 'legacy', date, meal_name: 'Original', meal_label: 'custom', custom_meal_label: 'Old occasion',
  items: [runtime.createMealItem({ food_id: 'egg', meal_item_id: 'keep-item', source_reference: 'keep evidence' })],
  named_dish_id: 'historical-dish', condiment_knowledge: 'unknown', meal_note: 'Keep this note', created_at: 'old', updated_at: 'old' };
const legacyRaw = JSON.stringify([legacy]);
const lifecycle = [
  ['date', (f) => f.panel.setDate('2026-11-03')],
  ['date preserving new draft', (f) => { f.root.type('Keep human text'); f.panel.setDate('2026-11-03', { preserveDraft: true }); assert.equal(f.model.getDraft().mealName, 'Keep human text'); }],
  ['edit', (f) => f.root.click('data-edit-meal', { editMeal: 'legacy' })],
  ['cancel edit', (f) => f.root.click('data-cancel-meal-edit')],
  ['reset', (f) => f.panel.resetDraft()],
  ['model reset', (f) => f.model.resetDraft()],
  ['save', (f) => { f.root.type('Saved while AI was pending'); f.root.click('data-save-meal'); }],
  ['destroy', (f) => f.panel.destroy()],
  ['language', (f) => f.panel.setLanguage('th')],
  ['image replacement', (f) => f.root.click('data-image-prep-open')],
  ['clear', (f) => f.root.click('data-vision-clear')]
];
for (const [label, invalidate] of lifecycle) {
  // Late naming responses cannot touch another draft, including reset through the exposed model.
  const f = setup({ initial: legacyRaw });
  f.prepare(); await until(() => f.transports.length === 1);
  invalidate(f);
  const draft = f.model.getDraft(), raw = f.raw();
  f.transports[0].resolve(wire); await flush();
  assert.deepEqual(f.model.getDraft(), draft, label);
  assert.equal(f.raw(), raw, label);
  assert.equal(f.bodies.length, 1, 'no implicit retry');
  // A forged stale candidate is rejected even when a fake DOM node survived a direct model reset.
  f.accept({ mealNameAccept: 'candidate-1', namingRequest: 'meal-name-photo-3' });
  assert.deepEqual(f.model.getDraft(), draft, label);
  f.panel.destroy();

  // The same invalidation also protects the image-preparation handoff itself.
  const prep = setup({ initial: legacyRaw }); prep.root.click('data-image-prep-open');
  const oldBridge = prep.bridges[0]; invalidate(prep);
  oldBridge.onPrepared({ image_blob: image() }); await flush();
  assert.equal(prep.observations(), 0, `prepared callback after ${label}`);
  prep.panel.destroy();

  // A late Vision completion must not start a text request for the next draft.
  const gate = deferred(), observing = setup({ initial: legacyRaw, visionGate: gate });
  observing.prepare(); await until(() => observing.observations() === 1);
  invalidate(observing); gate.resolve({ status: 'success', observation: observation() }); await flush();
  assert.equal(observing.bodies.length, 0, `Vision callback after ${label}`);
  observing.panel.destroy();
}

// Editing via AI naming uses the existing targeted metadata update, never a reconstructed meal.
const historic = setup({ initial: legacyRaw, autoResponse: wire });
historic.root.click('data-edit-meal', { editMeal: 'legacy' }); historic.prepare(); await historic.ready();
assert.equal(historic.model.getDraft().mealName, 'Original');
historic.accept(); historic.root.type('Human edit of suggestion'); historic.root.click('data-save-meal');
const updated = JSON.parse(historic.raw())[0];
for (const key of ['meal_id', 'created_at', 'items', 'named_dish_id', 'condiment_knowledge', 'meal_note', 'custom_meal_label']) assert.deepEqual(updated[key], legacy[key], key);
assert.equal(updated.meal_name, 'Human edit of suggestion');
assert.equal(updated.record_schema_version, undefined, 'historical record is not migrated');
historic.panel.destroy();

const failed = setup({ writeFailure: true, autoResponse: wire }); failed.prepare(); await failed.ready(); failed.accept(); failed.root.click('data-save-meal');
assert.equal(failed.model.getDraft().mealName, 'Rice with egg'); assert.equal(failed.writes(), 0);
failed.panel.destroy();

// Primary image action is single; blocked popups reveal the existing native fallback explicitly.
const fallback = setup({ popupBlocked: true });
assert.equal((fallback.root.content().match(/data-image-prep-open/g) || []).length, 1);
assert.doesNotMatch(fallback.root.content(), /data-vision-image/);
fallback.root.click('data-image-prep-open'); assert.match(fallback.root.photo(), /data-vision-image/);
fallback.root.image(); await until(() => fallback.transports.length === 1);
fallback.transports[0].resolve(wire); await fallback.ready();
assert.equal(fallback.normalizations(), 1); assert.equal(fallback.observations(), 1);
fallback.panel.destroy();
const cancelled = setup(); cancelled.root.click('data-image-prep-open'); cancelled.bridges[0].onCancelled();
assert.match(cancelled.root.photo(), /Cancelled/); assert.equal(cancelled.observations(), 0); cancelled.panel.destroy();

for (const language of ['th', 'en', 'zh']) {
  const f = setup({ language, autoResponse: wire }); f.prepare(); await f.ready();
  assert.match(f.root.suggestions(), new RegExp(ui.NAMING_TEXT[language].namingTitle));
  assert.match(f.root.suggestions(), new RegExp(ui.NAMING_TEXT[language].namingUse));
  assert.match(f.root.suggestions(), /<button type="button"[^>]+data-meal-name-accept/);
  f.panel.destroy();
}
const source = fs.readFileSync(new URL('../js/mealCompositionUI.js', import.meta.url), 'utf8');

// R2: the actual naming pipeline and Meal UI can save Today without writing
// either day's Daily draft, even while the selected Daily form stays historical.
const sourceDraft='{ "date":"2026-11-01", "waterMl":700 }';
const destinationDraft='{ "date":"2026-11-02", "waterMl":1700 }';
const app=fixtures.syntheticApp({values:{'mindfulHealthBalance:2026-11-01':sourceDraft,'mindfulHealthBalance:2026-11-02':destinationDraft}});
const named=setup({model:app.model,autoResponse:wire,beforeSave:input=>app.context.prepareRecordingDateForSave(input),onSaved:()=>app.context.refreshRecordingDate()});
app.context.fixtureMealPanel=named.panel;app.run('mealComposerUI=fixtureMealPanel;');
named.prepare();await named.ready();assert.deepEqual(app.writes,[]);
named.accept();named.root.type('Final human food name');assert.deepEqual(app.writes,[]);
app.setNow('2026-11-02T12:00:00Z');named.root.click('data-save-meal');
const namedRecord=JSON.parse(app.values.get('mhb_meal_records_v1'))[0];
assert.equal(namedRecord.date,'2026-11-02');assert.equal(namedRecord.meal_name,'Final human food name');assert.deepEqual(namedRecord.items,[]);
assert.equal(app.values.get('mindfulHealthBalance:2026-11-01'),sourceDraft);assert.equal(app.values.get('mindfulHealthBalance:2026-11-02'),destinationDraft);
assert.deepEqual(app.writes,['mhb_meal_records_v1']);named.panel.destroy();

assert.doesNotMatch(source, /applyVisionReviewToDraft|data-vision-apply/);
assert.ok(source.indexOf('data-meal-name-proposals>${') < source.indexOf('data-meal-photo-content>${'));
console.log('Meal Moment S3: naming, human authority, no ingredients, lifecycle, fallback and localization passed.');
