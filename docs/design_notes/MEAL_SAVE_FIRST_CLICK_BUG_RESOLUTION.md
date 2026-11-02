# MHB — First-Click Meal Save Bug Resolution

## 1. Context

Meal Moment is name-first: a person enters or explicitly accepts a food name, then chooses Save. A name proposal or draft does not itself authorize a Meal record.

## 2. Observed Failure

During isolated browser QA, entering a food name and clicking Save produced no saved Meal card or confirmation. No application page error was observed. Those observations did not by themselves establish whether validation, persistence, or event delivery had failed.

## 3. Root Cause

The browser diagnosis observed this sequence:

Food Name input → pointer down on Save → input blur/change → unconditional `render()` → Save button DOM replacement → click not delivered → Save handler not invoked.

In [`createMealComposerUI`](../../js/mealCompositionUI.js), the name's `input` handler already updates the draft. The shared `change` handler previously called `render()` even for Food Name, and `render()` replaced the form content before the pending click. Consequently, the first attempt did not reach `saveMealMoment()`, validation, or Meal storage.

## 4. Resolution

The Food Name `change` event now returns without rebuilding the form. Draft updates continue through the input handler; validation and explicit human Save remain in place. The canonical Meal storage contract and schema are unchanged.

## 5. Regression Evidence

**Automated tests:** The focused regression in [`tests/mealCompositionUI.test.js`](../../tests/mealCompositionUI.test.js) was reported failing before the repair and passing afterward. It checks that name change does not replace form content, does not save automatically, and that first Save and a subsequent edit retain one record and its ID. Focused Meal tests and the 58 R1/R2 integrity cases were reported passing; the integrity coverage is in [`tests/postS4DataIntegrity.test.js`](../../tests/postS4DataIntegrity.test.js) and [`tests/postS4IntegrityR2.test.js`](../../tests/postS4IntegrityR2.test.js).

**Reported browser QA:** A disposable Chrome profile showed one Save handler invocation, one Meal storage write, one saved card, and visible confirmation after one click. Editing retained the Meal ID and produced no duplicate. This note records that prior QA report; this documentation review did not repeat the browser run.

## 6. Data Safety

The reported browser QA used disposable Chrome profiles and synthetic Meal data. Real user browser storage was not accessed. The repair required no Meal schema migration.

## 7. Relationship to R1/R2

The unconditional event-handling render existed in committed HEAD `346dd19`. Source comparison indicates that R1/R2 did not introduce it; the committed baseline was not independently exercised in a browser.

## 8. Remaining Verification Boundary

**Excel Import browser E2E: NOT VERIFIED.** The external SheetJS dependency was unavailable while external requests were blocked in the isolated test environment. The synthetic import tests do not establish browser end-to-end behavior.

## 9. Closure

The targeted Meal Save repair passed the reported focused tests and isolated browser verification. These checks do not constitute comprehensive verification of all MHB functionality.
