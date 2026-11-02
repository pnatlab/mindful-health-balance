// Actual app functions, synthetic keyed storage, clock, DOM and workbook transport.
// Never connects to a browser, filesystem workbook, network or real localStorage.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const runtime = require('../../js/mealCompositionRuntime.js');
const ui = require('../../js/mealCompositionUI.js');

function syntheticApp(options = {}) {
  let now = options.now || '2026-11-01T12:00:00Z';
  class Clock extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return new Date(now).getTime(); }
  }
  const values = new Map(Object.entries({ mindfulHealthLanguage: options.language || 'en',
    mindfulHealthDailyLog: options.daily ?? '[]', ...options.values }));
  const writes = [], order = [], confirmations = [], alerts = [], listeners = {};
  const failures = { read: null, write: null, ignore: null, name: 'QuotaExceededError' };
  const storage = {
    getItem(key) { if (failures.read === key || failures.read === '*') throw Error('synthetic security restriction'); return values.get(key) ?? null; },
    setItem(key, value) {
      order.push('write:' + key);
      if (failures.write === key || failures.write === '*') {
        const error = Error('synthetic quota/security failure'); error.name = failures.name; throw error;
      }
      if (failures.ignore === key) return;
      writes.push(key); values.set(key, String(value));
    },
    removeItem(key) { if (failures.write === '*') throw Error('synthetic storage unavailable'); writes.push(key); values.delete(key); }
  };
  const nodes = new Map();
  function node(selector) {
    if (!nodes.has(selector)) nodes.set(selector, { textContent: '', value: '', dataset: {}, classList: { add() {}, remove() {}, toggle() {} },
      setAttribute() {}, addEventListener(type, handler) { listeners[selector + ':' + type] = handler; }, querySelectorAll: () => [], focus() {} });
    return nodes.get(selector);
  }
  const plain = value => structuredClone(value);
  const xlsx = { read() { order.push('parse'); if (options.parseFailure) throw Error('synthetic malformed workbook'); return options.book; }, utils: {
    sheet_to_json(sheet, settings = {}) {
      if (settings.header === 1) return [sheet.headers || ['Date', 'Water_ml'], ...(sheet.rows || []).map(row => Object.values(row))];
      return plain(sheet.rows || []);
    }
  } };
  const context = { console, Date: Clock, structuredClone, setTimeout, clearTimeout, localStorage: storage,
    alert: message => alerts.push(message), confirm(message) {
      order.push('confirm'); confirmations.push(message);
      return options.confirm ? options.confirm(message, confirmations.length) : true;
    },
    document: { hidden: false, addEventListener(type, handler) { listeners[type] = handler; }, querySelector: node, querySelectorAll: () => [] },
    FileReader: class { readAsArrayBuffer() { order.push('read'); this.onload({ target: { result: new ArrayBuffer(0) } }); } },
    XLSX: xlsx, window: { MHBMealRuntime: runtime, MHBMealExcelBridge: require('../../js/mealExcelBridge.js'), XLSX: xlsx,
      addEventListener(type, handler) { listeners[type] = handler; } }
  };
  vm.createContext(context);
  for (const file of ['js/config/workbookSchema.js', 'js/config/reflectionRootMatrix.js', 'js/dailyLogStorageIntegrity.js', 'script.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
  const run = code => vm.runInContext(code, context);
  const productionSyncUI = context.syncUI;
  run('renderDailyLogTable = () => {}; syncUI = () => {}; resetTodayInputStep = () => {}; writeProfileForm = () => {};');
  const model = ui.createMealComposerModel({ runtime, storage, date: run('appState.date'), now: () => new Clock().toISOString() });
  context.fixtureMealPanel = {
    getDraft: () => model.getDraft(), getDate: () => model.getDate(),
    hasUnsavedDraft: () => Boolean(model.getDraft().mealId || model.getDraft().mealName || model.getDraft().items.length || model.getDraft().time || model.getDraft().mealType !== 'unspecified' || model.getDraft().mealLabel !== 'unnamed'),
    setDate: (date, settings) => model.setDate(date, settings)
  };
  run('mealComposerUI = fixtureMealPanel;');
  writes.length = 0; order.length = 0;
  function mountMealUI() {
    const handlers = {}, elements = new Map();
    const root = { contains: () => true, addEventListener: (type, handler) => { handlers[type] = handler; }, querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector, { value: '', textContent: '', innerHTML: '', setAttribute() {}, focus() {}, scrollIntoView() {} });
      return elements.get(selector);
    } };
    const panel = ui.createMealComposerUI({ root, model, runtime, language: options.language || 'en', scheduleFrame: callback => callback(),
      beforeSave: input => context.prepareRecordingDateForSave(input), onSaved: () => context.refreshRecordingDate() });
    context.fixtureMealPanel = panel; run('mealComposerUI = fixtureMealPanel;');
    return { panel,
      content: () => root.querySelector('[data-meal-content]').innerHTML,
      status: () => root.querySelector('[data-meal-status]').textContent,
      type(value) { root.querySelector('[data-meal-name]').value = value; handlers.input({ target: { value, matches: selector => selector === '[data-meal-name]' } }); },
      click(attribute, dataset = {}) { handlers.click({ target: { closest: () => ({ dataset, hasAttribute: key => key === attribute, matches: key => key === `[${attribute}]` }) }, preventDefault() {} }); }
    };
  }
  return { context, run, storage, values, writes, failures, order, confirmations, alerts, listeners, node, model,
    mountMealUI,
    useProductionFormSync() {
      // Keep the production state-to-form assignments. Only unrelated composed
      // widgets are omitted from this small synthetic DOM (no browser claimed).
      for (const name of ['renderTodayHydrationWelcome','updateHydrationVisual','updateReflectionPreview','updateStateButtons',
        'updateSleepHoursUI','updateMindNoteButtons','updatePracticeUI','updateDrinkUI','updateActivityUI','updateRunDetailUI',
        'updateEnergyCauseUI','updateTodayInputStepUI','updateTodaySignalCockpitUI','updateInputActiveCards','updateDailySaveStatus']) context[name] = () => {};
      context.syncUI = productionSyncUI;
    },
    setNow(value) { now = value; },
    import(recovery = false) { context.importMasterExcel({ target: { files: [{}], value: 'synthetic.xlsx', dataset: recovery ? { dailyLogRecovery: 'true' } : {} } }); },
    save() { context.saveTodayLog(); },
    daily: () => JSON.parse(values.get('mindfulHealthDailyLog')),
    status: () => node('#saveStatus').textContent
  };
}
module.exports = { syntheticApp };
