# Script Modularization Plan

Patch type: Architecture audit / modularization planning only  
Status: Design note only. No runtime extraction yet.  
Scope: `script.js`, future implementation planning for a static/local-first GitHub Pages app.

## 1. Current state

`script.js` is currently a monolithic runtime file. It still works, and the monolith has been useful while Mindful Health Balance moved quickly from the v1.9 practice-context layer into v2.0 Field Review, Signal Engine, and Root-aware Reflection. The tradeoff is that the file now contains several layers that change for different reasons:

- app constants, storage keys, and workbook schema
- Daily_Log state, localStorage read/write, import/export, and old-record normalization
- translations / i18n for TH / EN / ZH
- Today input rendering and event handling
- Mind Note, Practice context, activity, drink, sleep, and hydration helpers
- Reflection / NuTuenSai composer
- Reflection Root Matrix and root-aware reflection helpers
- Field Review and Guided Field Rooms
- Signal Engine, Pearson correlation, Meaning Voice Matrix, and next observations
- Column_Guide / AI_Context generation
- generic utility helpers
- app initialization and DOM event binding

This structure is not broken, but it has started to create risk around:

- debugging: unrelated behavior lives close together and can be difficult to isolate
- regression: a small edit near shared helpers can affect Reflection, export, and Field Review at once
- extension: new features such as Root-aware Reflection and Signal Engine add more weight to one file
- reviewing diffs: Codex and human review must scan a large runtime file for targeted changes
- onboarding future assistants/Codex: subsystem boundaries are implicit rather than visible
- testing independently: root-aware Reflection, Signal Engine, export/import, and Field Review cannot be reasoned about as cleanly separated units yet

For MHB, modularization is not only code cleanup. It is also a boundary-preserving step: the system is easier to audit when source data, meaning rules, export schema, and UI rendering are not tangled together.

## 2. Responsibility map

This map is based on the current `script.js` structure and function/config anchors.

| Area | Current responsibility | Examples currently in `script.js` |
| --- | --- | --- |
| Constants and storage keys | LocalStorage keys, current form state keys, theme/language keys | `STORAGE_PREFIX`, `DAILY_LOG_KEY`, `LANGUAGE_KEY`, `THEME_KEY` |
| Daily log columns / workbook schema | Canonical Daily_Log columns and workbook helper headers | `DAILY_LOG_COLUMNS`, `COLUMN_GUIDE_HEADERS`, `AI_CONTEXT_HEADERS` |
| Reflection Root Matrix | Root config, labels, signal groups, boundary tags | `REFLECTION_ROOT_MATRIX`, `getReflectionRootConfig`, `getReflectionRootSignalGroups` |
| Translations / i18n | TH / EN / ZH UI copy, option labels, reflection text, Signal Engine copy | `translations`, `t`, `applyTranslations` |
| State management | App state, current view, active rooms, selected root, save/load state | `defaultState`, `appState`, `currentView`, `selectedReflectionRoot`, `loadState` |
| Today input rendering | Today cards, signal cockpit, drinks, activities, energy, sleep, run details | `renderDrinkOptions`, `renderActivityOptions`, `updateTodaySignalCockpitUI` |
| Mind Note / Practice context | Mind Note fields, practice roots/types, legacy practice normalization | `practiceGroups`, `normalizePracticeRoot`, `buildPracticeContextObject`, `getMindNoteSignal` |
| Reflection generator | Signal building, input-grounded composer, preview, pulse generation | `buildSignals`, `buildReflectionFromSignals`, `generateReflectionWithPulse` |
| Root-aware Reflection composer | Manual root picker, root openings, attention policies, detail anchors, dedupe | `REFLECTION_ROOT_ATTENTION_POLICY`, `buildRootSpecificDetailAnchors`, `composeRootAwareReflection` |
| Daily_Log save/restore | Build row, merge saved layers, normalize legacy rows, restore current form | `buildDailyLogRow`, `mergeDailyLogRow`, `normalizeLogRow`, `restoreCurrentFormFromDailyLog` |
| Field Review | Timeframe data selection, summary cards, overview, room card readings | `buildFieldReview`, `getFieldReviewRows`, `getFieldReviewStats`, `renderFieldReviewOverview` |
| Guided Field Rooms | Room order, selector, focus chips, room conversation workspace | `FIELD_REVIEW_ROOM_ORDER`, `renderFieldRoomSelector`, `renderFieldRoomWorkspace` |
| Signal Engine | Candidate pairs, labels, Pearson helpers, voice matrix, row/detail rendering | `SIGNAL_RELATIONSHIP_PAIRS`, `calculatePearsonCorrelation`, `renderSignalRelationshipEngine` |
| Excel export/import | Master workbook export, import normalization, SheetJS formatting | `exportMasterExcel`, `importMasterExcel`, `applySheetReadability` |
| Column_Guide / AI_Context | Human/AI-readable workbook semantics and boundary notes | `COLUMN_SEMANTIC_GUIDE`, `buildColumnGuideRows`, `buildAIContextRows` |
| Utility helpers | Formatting, escaping, list joining, parsing, numeric helpers, localization | `escapeHtml`, `pickColumns`, `joinListNaturally`, `normalizeExcelDate` |
| App initialization / events | DOM ready boot, event listeners, view switching, language/theme controls | `document.addEventListener("DOMContentLoaded", ...)`, `bindEvents`, `syncUI` |

## 3. Dependency notes

The current file has many implicit dependency directions. A future extraction should preserve these directions instead of creating circular dependencies.

| Section | Main dependencies | Notes |
| --- | --- | --- |
| Storage keys and schema config | none or near-none | Best first extraction candidate because it is mostly pure constants. |
| Translations / i18n | `currentLanguage`, fallback to Thai, DOM text attributes | High impact; changing load order or missing keys can break visible UI. |
| State management | storage keys, schema columns, translation-aware defaults | Must remain backward-compatible with old localStorage rows. |
| Today input rendering | DOM IDs in `index.html`, `appState`, translations, option configs | Extraction should happen only after stable shared state access exists. |
| Practice / Mind Note helpers | app state, translations, Daily_Log fields, legacy normalization | Touches both Today UI and export/import semantics. |
| Reflection composer | `buildSignals`, translations, root helpers, activity/drink/sleep helpers | High narrative risk; should be extracted late and tested with root matrix cases. |
| Root-aware Reflection | root matrix, selected root state, translations, signal builders | Good extraction target after config/schema because it is a clearer subsystem. |
| Daily_Log save/restore | schema columns, localStorage, practice/root metadata, normalization helpers | Must never break old records or optional missing fields. |
| Field Review | Daily_Log rows, timeframe selector, translations, room configs | Depends on storage and UI rendering; should stay stable while Signal Engine is extracted. |
| Guided Field Rooms | Field Review stats, room configs, DOM workspace | UI-heavy and should be extracted after low-risk configs. |
| Signal Engine | Daily_Log rows, numeric fields, translations, pair metadata, Pearson helpers | Strong subsystem boundary; can be split into config/core/render pieces. |
| Excel export/import | `DAILY_LOG_COLUMNS`, Column_Guide config, SheetJS global `XLSX` | Schema drift is the biggest risk. Export/import QA must be strict. |
| Column_Guide / AI_Context | workbook schema, semantic guide, root metadata, boundary policy | Should stay source-bound and stable across extraction. |
| Utility helpers | used almost everywhere | Split carefully into pure utilities and UI utilities to avoid hidden circular use. |
| App initialization | all render/update functions, DOM IDs | Should remain last or become a thin orchestrator. |

## 4. Modularization principles

- Extract low-risk pure config first.
- Keep runtime behavior unchanged during each extraction slice.
- Avoid changing public UI while moving code.
- Prefer one responsibility per file or module.
- Avoid circular dependencies; data/config should flow into renderers/composers, not the other way around.
- Keep i18n fallback stable, especially Thai fallback behavior.
- Keep Excel schema backward-compatible.
- Never break old Daily_Log records or legacy workbook import normalization.
- Keep source-bound / boundary-aware semantics intact.
- Keep Reflection Root, Signal Engine, Column_Guide, and AI_Context auditable.
- Do not introduce a build tool unless explicitly approved later.
- Keep GitHub Pages compatibility as a first-class constraint.
- Test every extraction slice manually, even when the change appears mechanical.

## 5. Proposed target structure

### Option A - Conservative no-build split

This option keeps the app as plain browser scripts and uses multiple `<script>` tags in `index.html`. It does not require a bundler.

```text
js/
  config/
    storageKeys.js
    workbookSchema.js
    reflectionRootMatrix.js
    signalRelationshipConfig.js
  i18n/
    translations.js
  core/
    state.js
    storage.js
    utils.js
    localization.js
  today/
    todayInput.js
    mindNote.js
    practiceContext.js
    activityRunDetails.js
  reflection/
    signalBuilders.js
    composer.js
    rootComposer.js
    detailAnchors.js
  fieldReview/
    fieldReview.js
    guidedRooms.js
  signalEngine/
    correlation.js
    meaningVoiceMatrix.js
    signalEngine.js
  export/
    excelExport.js
    excelImport.js
    columnGuide.js
    aiContext.js
  app.js
```

Pros:

- Lowest conceptual change from the current static app.
- Compatible with GitHub Pages without a build step.
- Easier to review as a sequence of mechanical extractions.
- Existing globals can be preserved during transition.
- Good fit for a local-first app where simplicity matters.

Cons:

- Loading order becomes important and easy to break.
- Globals remain visible unless wrapped carefully.
- No static import/export checking.
- Circular dependencies can still happen through global names.
- `index.html` script tags become part of the architecture contract.

### Option B - ES module split

This option moves to `<script type="module">` and uses `import` / `export`.

```text
js/
  main.js
  i18n.js
  storage.js
  schema.js
  today/
    index.js
  reflection/
    index.js
    rootMatrix.js
    rootComposer.js
  fieldReview/
    index.js
  signalEngine/
    index.js
    correlation.js
  export/
    index.js
    columnGuide.js
```

Pros:

- Clearer dependency graph.
- Fewer accidental globals.
- Easier to test pure functions later.
- Better long-term maintainability if the app keeps growing.
- Natural path toward future test tooling.

Cons:

- Larger refactor surface.
- Browser module path rules are stricter.
- GitHub Pages works with ES modules, but local file testing and relative paths must be checked.
- Existing globals, event handlers, and third-party globals such as `XLSX` need careful handling.
- Higher regression risk for i18n, initialization order, and export/import.

## 6. Recommended approach for MHB

Recommended approach: start with a conservative no-build split, then move toward a hybrid architecture only after low-risk pieces are stable.

For the next implementation phase, MHB should not jump directly to full ES modules. The app is local-first, static, and already deployed in a GitHub Pages-compatible shape. A sudden module conversion could create more risk than value right now, especially around language fallback, old localStorage rows, Excel export/import, and NuTuenSai narrative behavior.

A safer path:

1. Extract pure config into plain no-build files while keeping globals stable.
2. Keep `app.js` or the remaining `script.js` as the orchestrator.
3. Verify each extraction with `node --check`, `git diff --check`, and manual browser QA.
4. Once config and subsystem helpers are separated, decide whether ES modules are worth the migration.

This keeps the spirit of MHB intact: meaning-first, evidence-visible, source-bound, and low-regression.

## 7. Extraction priority

### Slice M0 - Audit only

Current patch. Create this planning note and link it from the design notes README. No runtime changes.

### Slice M1 - Extract workbook schema/config

Extract:

- `DAILY_LOG_COLUMNS`
- `COLUMN_GUIDE_HEADERS`
- `AI_CONTEXT_HEADERS`
- schema-related constants that do not depend on DOM state

Reason:

- Mostly pure config.
- Low runtime behavior risk.
- Makes export/import and docs easier to audit.

Implementation note, 2026-07-08:

- Workbook schema/config was extracted to `js/config/workbookSchema.js`.
- The app still uses a no-build script loading strategy for GitHub Pages compatibility.
- `index.html` loads `js/config/workbookSchema.js` before `script.js`.
- `script.js` binds the same public constant names from `window` for backward-compatible call sites.
- Daily_Log column order is preserved.
- Reflection root metadata fields remain present: `Reflection_Root`, `Reflection_Root_Label`, `Reflection_Root_Source`, and `Reflection_Root_Declaration`.
- No runtime behavior change is intended.

### Slice M2 - Extract Reflection Root Matrix

Extract:

- `REFLECTION_ROOT_MATRIX`
- `REFLECTION_ROOT_SIGNAL_GROUPS`
- root helper functions such as `getReflectionRootConfig`, `getReflectionRootSignalGroups`, and boundary tag helpers

Reason:

- Root-aware Reflection is now a major subsystem.
- Matrix logic is mostly config plus pure helper behavior.
- Helps future Slice D/E work without editing the whole runtime file.

Implementation note, 2026-07-08:

- Reflection Root Matrix and pure root helpers were extracted to `js/config/reflectionRootMatrix.js`.
- The app still uses no-build script loading for GitHub Pages compatibility.
- `index.html` loads `js/config/reflectionRootMatrix.js` after workbook schema config and before `script.js`.
- Root constants and helpers remain globally available through `window.*` and are rebound in `script.js` for backward-compatible call sites.
- Root keys, labels, declarations, signal groups, and boundary tags are preserved.
- `auto` remains `future_policy_only` and does not perform automatic root selection.
- No runtime behavior change is intended.

### Slice M3 - Extract Signal Engine config/helpers

Extract:

- relationship pair config
- display/meaning labels
- pair meta/accent config
- Pearson helper functions
- Meaning Voice Matrix config
- next observation config

Keep UI rendering together at first unless a smaller safe split is obvious.

Reason:

- Signal Engine is a clear subsystem.
- Pearson correlation and voice matrix need auditability.
- Good place to separate calculation, meaning, and rendering over time.

### Slice M4 - Extract Field Review / Guided Field Rooms

Extract:

- Field Review stats and timeframe helpers
- Guided Field Rooms room order/config
- room card builders
- room workspace renderers

Reason:

- Field Review is UI-heavy and depends on Daily_Log data.
- It should be extracted after schema/root/signal config is stable.

### Slice M5 - Extract i18n

Extract:

- `translations`
- `t`
- language fallback helpers
- option label helpers only after dependencies are clear

Reason:

- Translations are large and central.
- This is high value but high regression risk.
- Missing keys or wrong fallback could break TH/EN/ZH across the app.

### Slice M6 - Extract Excel export/import

Extract:

- export workbook assembly
- import normalization
- Column_Guide and AI_Context generation
- SheetJS readability helpers

Reason:

- Export/import is high-stakes for user-owned field memory.
- Should happen after schema config is separate and well verified.

### Slice M7 - Extract Reflection composer

Extract:

- signal builders
- input-grounded composer
- root-aware composer
- detail anchors
- de-dup / smoothing helpers

Reason:

- This is the NuTuenSai voice core.
- It carries the highest narrative drift risk.
- It should be extracted only after root helper and test matrix behavior are stable.

## 8. Risk register

| Risk | Why it matters | Mitigation | Suggested slice |
| --- | --- | --- | --- |
| Script loading order breaks app | No-build split depends on globals being available before use | Keep dependency order documented in `index.html`; extract config first; test app load after every slice | M1-M4 |
| Global variables not available | Existing functions assume shared global scope | Preserve global names during early slices; avoid renaming while moving | M1-M3 |
| Translations missing after split | Missing keys can silently degrade UI and Reflection copy | Keep Thai fallback; add smoke test for TH/EN/ZH; extract i18n late | M5 |
| Export workbook schema drift | Workbook is user-owned field memory and AI-readable context | Extract schema first; compare exported sheet names/headers before and after | M1, M6 |
| Old localStorage records fail | Users may have older Daily_Log rows without new fields | Keep normalization backward-compatible; test restore old rows | M1, M6 |
| Reflection output changes unexpectedly | NuTuenSai voice and boundary wording can drift | Extract composer late; use fixed manual QA examples for each root | M7 |
| Signal Engine calculation changes | Pearson r/ranking/min-n must remain stable | Separate config from calculation; add before/after sample checks | M3 |
| Field Review renders blank | UI-heavy extraction can break DOM bindings | Extract after low-risk pieces; test timeframe, rooms, and Signal Engine entry | M4 |
| GitHub Pages loads modules differently | Static hosting path behavior matters | Prefer no-build split first; test deployed-relative paths before ES modules | M1-M4 |
| Mobile UI accidentally affected | Render extraction can change class/markup assumptions | Avoid UI markup changes during extraction; mobile smoke test each slice | M4-M7 |
| Narrative drift in Reflection | User trust depends on gentle, bounded meaning | Keep boundary policy near composer tests; review wording after each change | M7 |
| Circular dependencies | Split files can start depending on each other indirectly | Keep config/core utilities dependency-free; document dependency direction | all slices |

## 9. Regression checklist

Run this checklist after each extraction slice, even when the patch is intended to be mechanical.

- App loads in a local browser.
- Today tab works.
- Save Today's Signals works.
- Mind Note save works.
- Generate Reflection works.
- Reflection Root picker still appears.
- Each root generates Reflection.
- Save Reflection works.
- Reflection root metadata still persists if present.
- Daily_Log table displays.
- Export Master Excel works.
- Import Master Excel works.
- Column_Guide sheet is present.
- AI_Context sheet is present.
- Field Review renders.
- Guided Field Rooms render.
- Signal Engine renders.
- Pearson r logic is unchanged.
- Signal Engine r/n/raw audit lines remain visible.
- Language switch TH / EN / ZH works.
- Light / dark / auto theme works.
- Old localStorage logs remain readable.
- GitHub Pages path compatibility is checked.
- Mobile layout remains usable.
- Browser console has no new errors.
- `node --check` passes for changed JavaScript files.
- `git diff --check` passes.

## 10. MSxAI / NuTuenSai boundary note

Modularization is not only a technical cleanup. For MHB, it is an alignment-preserving architecture step.

ภาษาไทย:

การแยก module ไม่ใช่แค่จัดโค้ดให้สวย แต่เป็นการลดความเสี่ยงที่ระบบจะเล่าเกินข้อมูล และช่วยให้ boundary ของ NuTuenSai ตรวจสอบได้ง่ายขึ้น

Why this matters:

- It reduces narrative drift by keeping Reflection voice logic inspectable.
- It separates boundary policy from UI noise.
- It lets Codex and human reviewers inspect one subsystem at a time.
- It makes Reflection Root, Signal Engine, export schema, and AI_Context easier to audit.
- It protects human agency because the system remains source-bound and explainable.
- It makes future changes feel less like rewriting the whole app and more like tuning a known instrument.

## 11. Out of scope

This audit does not:

- split files
- edit `script.js`
- edit `index.html` script loading
- edit CSS or UI
- change Reflection output
- change Signal Engine behavior
- change Field Review behavior
- change export/import behavior
- add a build tool
- add npm dependencies
- add TypeScript
- add a test framework
- remove runtime code
- commit or push

Future modularization should be done as explicit extraction slices with before/after QA, not as a broad rewrite.
