# Today Input Step Flow Decision

Implementation status:
Implemented in v1.9.2 — Today Input Step Flow as a v1.9.x stabilization / usability patch. This is not v2.0 and does not add Field Review Companion, AI log reading, baseline modeling, schema changes, or export/import changes.

## 1. Intent

Today Input should be split into 2 steps to reduce page length and help users enter the day in a lighter rhythm.

Core flow:

- Today = input / current form
- Reflection/NuTuenSai = review + reflection + save
- Log = saved records

Important:
Today page should not contain Save Daily Log. Save Daily Log remains in Reflection/NuTuenSai.

## 2. Step Structure

### Today Input 1/2

Contains:

- Today State
- Hydration
- Drinks
- Load & Recovery

Purpose:
Collect body, energy, hydration, drink, activity, and recovery context.

Buttons:

- Secondary: เคลียร์หน้าปัจจุบัน / Clear Current Form / 清除当前表单
- Primary: ถัดไป: บันทึกภาวะใจ / Next: Mind Note / 下一步：心情记录

Reason:
Clear Current Form resets the current unsaved form, so it should live on step 1/2 where the main input starts. This lets users clear early without needing to enter the Mind Note step.

### Today Input 2/2

Contains:

- Mind Note
- Current Form summary

Purpose:
Let the user place the current mind note before reviewing or saving.

Buttons:

- Secondary: กลับไปหน้า 1/2 / Back to 1/2 / 返回 1/2
- Primary: ไป Reflection/NuTuenSai / Go to Reflection/NuTuenSai / 前往 Reflection/NuTuenSai

Important:

- Do not show เคลียร์หน้าปัจจุบัน on Today 2/2.
- Keep step 2/2 calm and focused.
- ไป Reflection/NuTuenSai is a navigation shortcut only, not a save action.

## 3. State Model

Use UI-only state:

```js
let todayInputStep = 1; // 1 | 2
```

Do not store this in Daily_Log.
Do not add it to export/import.
Do not change app data schema.

Recommended:

- Memory-only for v1.9.x implementation
- Optional future sessionStorage by date only if needed
- Do not use existing data localStorage keys for UI step state

## 4. Step Behavior

Default:

- Opening Today tab normally starts at Today Input 1/2.

If user moves to 2/2 or enters Mind Note:

- Returning to Today tab during the same day and before Save Daily Log may open Today Input 2/2.
- This helps the user continue the mind note flow.

After successful Save Daily Log:

- Reset Today Input step to 1/2.

After Clear Current Form:

- Reset Today Input step to 1/2.

After new date / date rollover:

- Reset Today Input step to 1/2.

Step 2 must always allow going back to 1/2.

Input-aware visual feedback:

- Main Today cards may show a soft blue active layer when they have current-form input.
- This active layer is visual feedback only.
- It is not a score, completion state, success state, diagnosis, or judgment.
- It must not be stored in Daily_Log, localStorage data schema, or Excel export.

## 5. Reflection/NuTuenSai Navigation

ไป Reflection/NuTuenSai should:

- switch to Reflection/NuTuenSai tab
- not save data
- not generate reflection automatically unless existing behavior already does so
- preserve current form state
- let user generate/check reflection and then Save Daily Log from the Reflection page

Reflection/NuTuenSai should also provide small secondary shortcuts in Daily Log Controls:

- กลับ Today 1/2 / Back to Today 1/2 / 返回 Today 1/2
- กลับ Mind Note 2/2 / Back to Mind Note 2/2 / 返回 Mind Note 2/2

These shortcuts are navigation only. They should switch back to the requested Today step, preserve the current form and any generated reflection preview, and must not save, clear, or generate reflection automatically. Save Daily Log remains the only primary action in Reflection/NuTuenSai.

## 6. Clear Current Form Placement

Decision:
เคลียร์หน้าปัจจุบัน belongs only on Today Input 1/2.

Reason:

- It is a reset action for the whole current unsaved form.
- It should be available early.
- It should not sit beside the Reflection shortcut on 2/2.
- It reduces risk of accidental clearing.
- It keeps Today 2/2 as a quiet transition into reflection.

If user reaches 2/2 and wants to clear:

- user can press กลับไปหน้า 1/2
- then press เคลียร์หน้าปัจจุบัน

This extra step is acceptable because clearing is a stronger/destructive action.

## 7. Guardrails

- Do not imply Mind Note is required.
- Do not imply going to Reflection saves data.
- Do not hide current form reset entirely; it remains visible on step 1/2.
- Do not place three main action buttons on one Today step.
- Do not change Daily_Log columns.
- Do not change Excel export/import.
- Do not change localStorage data schema.
- Do not create pressure to complete both steps.
- Keep wording gentle and optional.

## 8. Implementation Sketch

Possible helpers:

```js
let todayInputStep = 1;

function setTodayInputStep(step) {}
function shouldOpenTodayStepTwo() {}
function resetTodayInputStep() {}
function goToReflectionFromToday() {}
```

Possible conditions:

- `hasMindNoteInput(appState)` checks mind note text, feeling, or support need.
- after `saveToDailyLog()` call `resetTodayInputStep()`.
- after `resetCurrentForm()` call `resetTodayInputStep()`.
- when date changes, reset step.

## 9. Testing Checklist

Future implementation should test:

- default Today opens 1/2
- Next goes to 2/2
- Back returns to 1/2
- Mind Note content preserved
- switching tabs preserves form state
- returning to Today with unsaved Mind Note opens 2/2
- Save Daily Log resets step to 1/2
- Clear Current Form exists only on 1/2
- Clear Current Form resets current form and step to 1/2
- date rollover resets step to 1/2
- Reflection shortcut does not save
- Daily_Log schema unchanged
- export/import unchanged
- mobile layout
- dark/light mode
- TH/EN/ZH labels

## 10. Scope Boundary

This note is design-only.
Do not implement in this patch.
No code, UI, export, or import changes.
