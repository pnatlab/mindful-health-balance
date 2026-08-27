# Mindful Health Balance by MSxAI User Guide

## 1. What This App Is

Mindful Health Balance by MSxAI is a local-first personal rhythm research prototype and user-owned field memory for AI-assisted self-reflection. It is not designed to judge you, pressure you, or make you rush to fix numbers.

The app helps you record honest daily signals as structured local data across:

- Hydration
- Caffeine and sugary drinks
- Load and recovery
- Energy, sleep, and mind state
- Practice context, Mind Note, and Reflection

This app is not a medical tool, not a diagnosis system, and not a replacement for professional care or medical follow-up.

This guide describes the current **MHB 2.3 — Gentle Meal Composition** release. It adds a local-first meal workspace on the MHB 2.2 foundation while keeping Meal records separate from `Daily_Log` and leaving the workbook and historical data unchanged.

Its value is not in being a production SaaS platform. Its value is in a portable, user-owned data layer that can later be reviewed by the user or intentionally shared with AI without handing agency to the system.

## 2. When To Use It

You can use the app lightly at three natural moments:

- Morning / start of day: choose Energy and Mind, then add Sleep Hours or a rough Sleep category
- During the day: log water, drinks, and the main activities that used energy
- End of day: click `Reflect` to create a Reflection and save it to the Daily Log

You do not need to keep the app open all day. It is meant to be a gentle mirror at the beginning, middle, and end of the day.

You do not need to complete every field. Honest and steady data is more valuable than forced completeness. A blank field means not recorded or uncertain, not a missing score.

## 3. Language Switching

The header includes language buttons:

```text
TH | EN | 中文
```

The selected language is saved in the browser through localStorage:

```text
mindfulHealthLanguage
```

Changing language only changes the interface text and future generated reflections. It does not delete saved Daily Logs, and it does not upload data anywhere.

## 4. Welcome Glass

When the app opens for the first session of the day, it shows a Lavender Glass welcome screen before entering the dashboard.

This welcome screen is a soft threshold before tracking. It is not a test, not a health assessment, and not a judgment of whether the day is good or bad.

Click `Begin Today` to enter the dashboard. After that, the app remembers that the welcome screen has been seen for the current day/session.

You can open it again from the dashboard by clicking `Open Welcome`.

## 5. Light / Dark / Auto Theme

The header includes theme controls:

```text
Auto | Light | Dark
```

The selected theme is saved locally in:

```text
mindfulHealthTheme
```

Changing theme affects only the visual appearance. It does not delete Daily Logs and does not affect Import / Export.

## 6. Auto Theme By Local Time

When `Auto` is selected, the app uses the time on your device:

- 07:00-18:59 = Light mode
- 19:00-06:59 = Dark mode

If you choose Light or Dark manually, that choice stays active until you switch back to Auto.

## 7. Main Views: Today / Reflection / Field Review / Log / Intention Profile

After the Welcome Glass, the app is organized into five main views:

- `Today` for current-day signals in two steps: `Today’s Signals 1/2` is Energy, Mind, Sleep Hours/Sleep, Hydration, Drink Profile, Load & Recovery, and a collapsible Meal Composer; `Mind Note 2/2` is Practice Context, Mind Note, and the shortcut to Reflection/NuTuenSai
- `Reflection/NuTuenSai` for the compact NuTuenSai note strip, generated reflection preview/editing, and `Save Today’s Reflection`
- `Field Review` for rule-based review from saved `Daily_Log`, with 7-day, 14-day, 30-day, and all-available timeframes
- `Log` for the Daily Log Table, Export Master Excel, Import Master Excel, and Clear Daily Log
- `Intention Profile` for optional user-provided addressing, tone, context, and do-not-assume boundaries

Switching views does not reset current inputs and does not delete saved Daily Logs.

### Intention Profile

`Intention Profile` is optional local data saved in this browser. It helps the app address the user and adjust deterministic wording more gently. It can include:

- display name
- address style: `senior_name`, `polite_name`, or `name_only`
- optional preferred tone
- optional birth date or birth year
- User Context Note
- Do Not Assume Note

The profile can be edited, cleared, or skipped. It affects greeting/addressing and limited wording only. It does not change source facts, calculations, evidence, Signal Engine results, or safety boundaries. Profile notes are user-owned text; they are not hidden system instructions.

Custom addressing has been removed from the visible UI. If an older profile contains `custom`, the app falls back safely to `senior_name`.

The Today/Hydration area may greet you using the saved display name and address style, such as `สวัสดีค่ะ พี่ pnat 🩵`. This is only addressing, not personality or health analysis.

Starting in v1.9.2 — Today Input Step Flow, `Clear Current Form` appears only on Today’s Signals 1/2. Today’s Signals 1/2 and Mind Note 2/2 now include `Save to Daily Log`, so you can save the Daily Log without visiting Reflection first. Going to Reflection/NuTuenSai is navigation only; it does not save data.

`Restore Today’s Log` appears beside `Clear Current Form`. It loads the saved Daily_Log row for today back into the current form, which is useful if the current form was cleared by mistake. It does not create a new row, save automatically, delete Daily Log data, or generate Reflection. If there is no row for today, the app asks before loading the latest saved row into today’s form.

During the day, the current form autosaves as a local browser draft when you enter or select data, so a reload can bring the form back. If the draft is missing but today already has a saved Daily_Log row, the app loads today’s row back into the form on startup, except after an intentional `Clear Current Form`. This draft is not a saved Daily_Log row until you click `Save to Daily Log` or `Save Today’s Reflection`.

Same-day saves use a source-aware safe merge. Saving Today’s Signals updates only that layer and preserves saved Practice Context, Practice Note, Mind Note, and Reflection. Saving Mind Note 2/2 updates Practice/Mind Note fields while preserving Reflection. Reflection uses `Save Today’s Reflection` when you want to save the generated or edited Reflection layer.

The Today page also has a small top step switcher for moving between `Today’s Signals 1/2` and `Mind Note 2/2`. The bottom buttons remain the main action controls after you finish each step.

The Daily Log status bar near the top shows which of the three layers have already been saved today: `Today’s Signals`, `Mind Note`, and `Reflection`. It is not a completion score. Sections can remain blank when they were not recorded or are uncertain.

Starting in v1.9.3 — Structured Sleep & Run Detail, the app adds optional `Sleep_Hours` and `Run_Detail_JSON` while keeping the existing `Sleep` and `Activities` fields for Daily Log and old Excel compatibility.

Starting in v1.9.4 — Reflection Input Integration Pass, Reflection/NuTuenSai reads today's `Sleep_Hours`, running detail, running subtype, light coding / AI-assisted work, and hydration context more clearly. It still uses only today's current input, does not read previous Daily Log rows, and does not provide training or medical advice.

Starting in v1.9.5 — LLI Continuity Reflection Layer, Reflection/NuTuenSai reads the latest 1-3 previous Daily Log rows as gentle supporting context. It may notice sleep debt, load continuity, run recovery carryover, hydration shifts, or cognitive-load continuity. Today's input remains primary, and the app does not create chatbot memory, weekly/monthly analytics, diagnosis, or coaching.

Starting in v1.9.6 — Compact Signal Cockpit Layout, Today’s Signals 1/2 uses two main cards: `Daily Signal Cockpit` for the status of all four signals, and `Active Signal Detail` for the selected signal. The cockpit signals are `Inner State`, `Water`, `Drinks`, and `Work / Activity`.

Cockpit statuses such as `Empty`, `Started`, and `Readable` are visual feedback only. They are not scores, judgments, or saved data changes.

Starting in v1.9.7 — Symbolic Signal Cockpit Polish, the cockpit becomes more like a signal constellation, with four nodes around a central `Daily Balance Orb`. The orb and signal dots show how much of today is readable in a gentle way, not as a KPI, score, or judgment.

Starting in v1.9.9 — Mindful Practice Context, Mind Note 2/2 includes an optional Practice Context card. In MHB 2.1 it uses the invitation `What could the mind rest with today?` while retaining the same optional practice root/type, rough duration, and `Practice_Note` across four simple bases: Body, Feeling tone, Mind / Thought, and Dhamma, plus No practice / Other. This data is stored in Daily Log/Excel for Field Review context and may be read in Reflection only when the `practice_context` root is selected. It is gentle context, not a practice score or judgment of practice quality.

In MHB 2.0 — Field Review, Signal Engine & User Intention Profile, the `Field Review` tab reads `Daily_Log` in localStorage through Guided Field Rooms and Signal Engine. It has no free-form ask and no LLM call. The Signal Engine shows bounded numeric-to-numeric Pearson relationship rows with a NuTuenSai Meaning Dictionary, raw column audit lines, pair-specific deterministic `MHB · NuTuenSai` meaning detail, and Gentle Next Observation prompts, without charts, matrices, or category mapping.

Starting in v1.9.8 — Input-grounded Natural Reflection Composer, Reflection/NuTuenSai selects 2-4 meaningful anchors from today's input, such as water, sleep hours, drink context, activity/load, run detail, Mind Note, or light continuity context. It uses those anchors to write one more natural overview sentence while staying rule-based, local-first, non-medical, and non-chatbot.

The latest Reflection layer also includes NuTuenSai voice cadence in Thai, low-data micro-continuity using previous logs as background only, and a rule-based anti-repetition layer so overlapping recovery/load/sleep/support cues do not repeat the same meaning several times.

Starting in v1.9.8b — Reflection Breathing Markers, Reflection/NuTuenSai may add a very small number of emoji pause markers, such as 🩵 or 💧, to make longer sentences easier to read. These markers are not headings, scores, diagnoses, or hidden categories.

Starting in v1.9.8c — Reflection Sentence Smoothing, the input-grounded overview avoids repeating connector words such as `with` across every anchor. Rich input may be split into short breathing paragraphs before the gentle reading sentence, while the same anchors and rule-based intent remain intact.

The Reflection/NuTuenSai page also includes small secondary shortcuts, `Back to Today 1/2` and `Back to Mind Note 2/2`, so you can add or adjust current input before saving. These shortcuts only navigate; they do not save, clear, or generate a new reflection.

Main Today cards also show a soft blue active layer when that card has current input. This is visual feedback only; it is not a score, completion state, diagnosis, or judgment.

## 8. Field Review

The `Field Review` tab is part of the locked MHB 2.0 release. It is rule-based only and reviews patterns from saved `Daily_Log` rows in this browser. The default window is 30 days so Signal Engine has a better chance of enough paired rows. You can still choose 7 days, 14 days, 30 days, or all available saved rows.

Review cards cover hydration, sleep/recovery, load/recovery, drinks/caffeine/sweetness, Mind Note/support need, and missing/blank data. Each card has three layers: evidence from `Daily_Log`, `NuTuenSai reads`, and `Next gentle attention`. If there are fewer than 3 rows, the page says the data is still thin and only shows early signals.

The card voice changes lightly by timeframe: 7 days is an early signal, 14 days is an emerging rhythm, 30 days is a month-level rhythm, and all available data is a long-view reflection that still respects each day's context.

Field Review now uses a compact Daily_Log context header with the `LOCAL FIELD REVIEW` label, selected timeframe controls, overview chips from real data, and boundary copy in one tighter section. The separate selected-rhythm strip has been removed to reduce visual noise. It does not add a chart library, and evidence remains source-bound to `Daily_Log`.

The six review cards now use NuTuenSai Field Room background images for hydration, sleep/recovery, load/recovery, drinks context, Mind Note, and missing/blank data. These images are presentation only; they do not change review logic and do not add LLM, free-form ask, or correlation behavior.

Field Review now uses `Guided Field Rooms` with a Guided Reading flow, not chat simulation. You choose a room, then choose a reading angle:

- Overview
- Evidence from data
- Next gentle attention
- Show all

Each room shows one reading card at a time. It includes a current-reading indicator, light `✓ / ○` progress that is not a score, compact angle chips, and deterministic controls for back, choose angle, enough for now, or read next angle. Reading progress is session-only; it is not saved to Daily Log or the workbook.

The navigation grammar is: left = go back or choose angle, right = end or continue. Related-room cards are transitions to other data rooms, not AI recommendations.

The sidebar separates the six Guided Field Rooms from the English-only `Signal Engine` entry so the engine reads as a special module, not a seventh reflection room.

The `Signal Engine` room adds a conservative relationship review. It calculates deterministic Pearson relationships for numeric-to-numeric `Daily_Log` fields only, such as `Water_ml`, `Sleep_Hours`, `Load_Score`, `Caffeine_Score`, `Sugar_Score`, and `Practice_Minutes`. It shows up to five valid rows ranked by absolute `r`; row titles use readable labels such as Water intake, Sleep hours, and Daily activity/load, with semantic pair icons/accents, a plain signal sentence, visible evidence chips for `r` and paired days, and a compact same/opposite/unclear legend. The raw column pair remains visible as technical evidence, and the detail panel includes an `r` helper for non-technical readers. Clicking a row opens a Meaning Voice Matrix detail signed `MHB · NuTuenSai`; the voice is selected by pair, direction, strength, and paired-row count. It also shows a Gentle Next Observation prompt that suggests what to observe next without turning correlation into advice or causation. It does not map category fields yet, and correlation is always shown as not causation.

This page is not a chatbot, does not call an LLM, does not include free-form ask, and does not diagnose or give medical advice. Blank fields mean not recorded, not failure or a missing score.

To review an exported workbook, import the Master Excel file from `Log` first. Field Review then reads the imported Daily Log from localStorage.

## 9. Today State

Choose the current state as honestly and simply as possible:

- Energy: Low / Medium / Good
- Overall Mind Today: Very heavy / Uneasy / Pressured / Neutral / Okay / Feeling good / Relaxed
- Sleep Hours: optional decimal hours, such as 6.5
- Sleep: derived as Low / Okay / Good from Sleep Hours, or chosen roughly if hours are not entered

Overall Mind Today is an ordered descriptive scale from heavier states toward lighter/supportive states. It is not a score. `Neutral` is the middle point, and choosing the closest true word is enough.

This gives the day context. For example, a low-sleep day or a pressured-mind day should not be used to judge the whole picture.

Sleep Hours derives the existing Sleep category with this rule: `< 5` hours = `Low`, `5 to < 7` hours = `Okay`, and `>= 7` hours = `Good`. This is self-reported recovery context, not diagnosis or health judgment.

The small blue heart beside `Overall Mind Today` marks the main mind observation for the day. `Feeling in this note` in Mind Note is the feeling of that specific note, not a judgment of the whole day.

`Okay`, `Feeling good`, and `Relaxed` let the dataset capture days where the mind is a support signal, not only days with pressure or uneasiness. The app treats these as supportive context, not a performance score and not proof that the whole day is fine. They should still be read together with hydration, sleep, load, energy, and Mind Note.

On the Today page, this card includes a small sun or moon visual based on the browser's local time. It is only a gentle energy-rhythm cue and does not affect saved data or processing.

You can also choose optional `Energy Cause` chips, such as low sleep, enough sleep, low food, low water, heavy exercise, deep work, stress, light mind, or unknown.

Energy Cause is not only for factors that lower energy. It can also record what supports a good-energy day, so the dataset can see both depletion factors and recovery/support factors.

Some days, Energy level and Energy Cause may seem to point in different directions, such as low energy with enough sleep or good energy with stress. The app treats this as a layered signal, not a data entry error: body, mind, and recovery may be speaking from different layers.

## 10. Hydration

Use Hydration to roughly log plain water:

- `+250 ml` for a small glass or a small extra amount
- `+500 ml` for a larger glass or bottle
- `+Half bottle` for an approximate half bottle
- `Reset` when you want to start the water count over

Hydration is about steadiness, not forcing a large amount at once. Small sips across the day are enough.

Starting in v1.9.x, the Hydration card shows a flexible estimated range based on the day's context: base water + activity/sweat load + body cues. A rest day may stay around 2.0-2.4 L, cognitive work around 2.4-2.8 L, easy run or lots of walking around 2.6-3.0 L, short quality run around 2.8-3.3 L, and long run / heavy sweat around 3.2-4.0 L, spread through the day.

On a long-run day, around 3.0 L is treated as a good zone, with gentle cues to notice sweat, thirst, or urine color. If intake reaches 4.0 L or more, the app does not push more; it reminds the user to spread intake and avoid forcing a large amount at once.

The system separates activity load from recovery-only signals such as low sleep, low energy, or a very heavy/uneasy/pressured overall mind state. If only a recovery signal is present, it should not describe the day as heavy activity load; it should keep hydration as a gentle base alongside rest. This guidance uses existing signals, adds no new inputs, and is not medical advice, diagnosis, or an exact requirement.

## 10.1 Meal Composer — Gently Assembling Today's Meals

Open `Today's meals` within Today’s Signals 1/2 and begin with the broad kind of meal it is, such as stir-fried, curry, or broth-based. Then choose only the components you saw or remember; you do not need to reconstruct the recipe or every condiment. You can adjust an approximate `Small / Regular / Large / Custom` portion and optional preparation only as far as you remember. A meal does not require a label or time, and the same day can hold any number of optional recorded meals.

Condiments can still be selected as food items when you know them, but they are never required. You may explicitly say that you do not know all condiments; this is different from simply not recording one, and it never turns an unknown sodium estimate into zero.

A saved meal can be edited without creating a duplicate, or removed by a targeted confirmation. Meal records stay in this browser under a source separate from `Daily_Log`; clearing the current Today form or saving a Daily Log row does not replace Meal record management.

Sodium is shown only as an evidence-backed range. When some items remain unsupported, the interface says the estimate is partial and never substitutes `0 mg` for unknown. The panel below the composer is derived again after a meal is saved, edited, or removed. It describes recorded facts without scores, food judgment, or medical targets. Meal data is not yet connected to the main Daily Reflection renderer or workbook export/import.

For a meal whose recorded components fit an approved reference, MHB may offer that reference as an optional card. It is only a suggestion: you must choose `Use this reference` before it can route the estimate. The displayed value is a reference per 100 g, not the sodium of your whole plate, and you can clear it at any time. If later components conflict with the reference boundary, MHB pauses the reference while still allowing the meal to be kept.

The optional photo helper is a bounded prototype for PNG, JPEG, WebP, HEIC, and HEIF using a model on this device only. For a larger phone image, choose `Prepare a photo for AI`: a separate local page prepares a temporary JPEG, lets you check it, and returns it to the photo helper without storing it with the meal. After choosing an image, review what the model observed, omit suggestions, and resolve ambiguous mappings before choosing `Use selected items in this meal`. This adds only accepted Meal Type/components to the existing draft. It does not save the meal, set `named_dish_id`, or create sodium evidence from the image; any reference dish still needs its separate confirmation. Manual composition remains available when the local model is unavailable.

For photo preparation and the local photo helper, open MHB by double-clicking `Start Mindful Health Balance.command`. This starts a loopback-only local runtime and opens the correct page automatically. If you open `index.html` directly, manual meal composition still works, while photo actions explain that the Local Launcher is needed. A manual fallback is `python3 -m http.server 4173 --bind 127.0.0.1`, then open `http://127.0.0.1:4173/index.html`.

## 11. Drinks / Drink Profile

Drink Profile is for drinks other than plain water, such as coffee, tea, cocoa, sweet drinks, juice, or soda / soft drinks. Plain water should be logged in the Hydration card so it does not need to be entered twice.

Add drinks only as needed. Each drink can include:

- Drink Type
- Sweetness
- Approx. caffeine
- Milk
- Amount

Click `Add Drink` to add the drink to today’s list, or `Clear Drinks` to start the drink list over.

The app calculates Sugar Score, Caffeine Score, Milk Drink Count, and Hydration Support Count to help reveal patterns gently. A simple rule of thumb remains: a sweet drink behaves more like a sweet treat than like plain water.

`Drink insight` appears as a small callout in the Drink Profile card so caffeine/sweetness guidance is easier to notice. It is a descriptive cue, not judgment, diet advice, or medical advice.

If sugar or caffeine is high on a given day, the point is not guilt. The point is to notice the pattern and adjust the next drink or return to water and rest.

Reflection/NuTuenSai may mention drink context when relevant, such as low water with caffeine or sweetness/caffeine as part of today’s energy context. The tone remains non-judgmental and does not force compensation.

Soda / soft drink is only a Drink Type. It does not mean the drink must be sweet, because zero-sugar or low-sugar options can exist. The app reads the Sweetness field first, so soda with low sweetness is treated as drink context, while soda with high sweetness is treated as a gentle drink-load signal, not diet advice, medical advice, or a judgment.

## 12. Load & Recovery

Load & Recovery is not only about exercise. It also includes work that uses focus, posture, standing, decision energy, outdoor effort, body energy, and the day's recovery mode.

`Low sleep` belongs in Today State > Energy Cause because it is an energy/recovery signal, not a main activity chip. If the day is intentionally lighter, choose `Rest day` or `Light recovery day` instead.

Activity / profession-aware presets include:

- Office work / meetings & documents
- Light coding / AI-assisted work
- Outdoor work / heat & physical effort
- Deep work / coding
- Dentist / detailed clinical cases
- Doctor / clinical shift or patient care
- Photographer / long shoot
- Investor / market watch & analysis
- Badminton
- Heavy pingpong
- Easy run
- Short quality run
- Long run
- Lots of walking
- Rest day
- Light recovery day

When a running activity is selected, such as Easy run, Short quality run, or Long run, the app shows an optional mini panel inside Load & Recovery. You can add distance, duration as hours + minutes, and sweat level. The export still stores total minutes as `durationMin` inside `Run_Detail_JSON`, and avg pace may be derived from distance and duration.

Run Detail is only load / hydration / recovery context. It is not training advice, pace judgment, or performance coaching.

The app summarizes load into three levels:

- Light Load: there is still room for recovery
- Moderate Load: the day used some energy, so recovery windows matter
- High Load: the body or mind has used a lot, so recovery should have more space

Recovery is part of performance. It is not a reward you earn only after pushing hard.

Starting in v1.9.x, the app uses Activity Load Roots to read the root of the day's selected activity and create a short Activity Root Summary for reminders/reflections:

- Clinical work / dentist / doctor: precision, hands, eyes, and sustained focus
- Photographer / long shoot: standing, moving, carrying gear, and holding space for others
- Investor / market watch: attention and decision load, not financial advice
- Office work / light coding / AI-assisted work / deep work: brain, eyes, screen time, and mental loops. `Light coding / AI-assisted work` emphasizes context guidance, output review, and small ongoing decisions, so it is lighter than full deep work.
- Outdoor work: heat, sweat, body effort, and hydration context
- Sport / running / sweat: physical/sweat load with recovery afterward
- Short quality run: an intensity-based short run, not an easy run and not a long run
- Lots of walking: back, legs, feet, and body use
- Low sleep: belongs in Energy Cause and is read as a recovery signal, not high activity load
- Rest day: a rest rhythm, not an invitation to add productivity pressure
- Light recovery day: a light recovery mode, not diagnosis, and it should not override a stronger activity selected with it

Activity roots refine reflection wording only. They do not change Load Score, Daily Log, Excel export/import, or schema. The app does not infer identity; it should not say you are a doctor, photographer, investor, or any profession. It only reads the selected activity as context for that day.

## 13. Mindful Reminder

The Mindful Reminder shows a short NuTuenSai note based on today’s key signals, such as low water, high caffeine, low sleep, high load, or a pressured mind state.

NuTuenSai is a gentle reflection layer for noticing patterns. It is not a doctor, therapist, diagnosis tool, or medical advice.

The goal is to help you return to consistency, not to scare you or make you fix everything in one day.

## 14. Signal-Based Reflection

From v1.6 onward, Mindful Reminder and End-of-Day Reflection are generated from relationships between signals rather than single numbers alone.

From v1.9.8 onward, the Reflection preview and detailed Reflection include an input-grounded overview. This overview names a few relevant anchors from the current day so the user can see the relationship between what was entered and what NuTuenSai reflects.

The main signals are:

- Hydration Signal
- Drink Load Signal
- Recovery Load Signal
- Energy & Sleep Signal
- Mind Note Signal

The app does not use these signals to diagnose or judge health. It uses them to reflect patterns gently. For example, low sleep with high load may point toward recovery first, while low water with high caffeine may invite steadier water and rest.

When the day has very little data, the app should greet gently or invite a little Today’s Signals before deeper reflection. It should not over-analyze low-data states or assume fear unless the user selected or wrote worry/pressure directly.

## 15. Mind Note

Mind Note is a quiet place to leave something from today: joyful, ordinary, uncertain, meaningful, difficult, or still unfolding. It does not ask you to search for a problem. It is not a therapy tool, crisis support, or a medical tool.

Before Mind Note, the `What could the mind rest with today?` card can record a light Practice Context if there was one today. The app stores this as `Practice_Root`, `Practice_Type`, `Practice_Minutes`, `Practice_Context_JSON`, and `Practice_Note`. It is optional and is not used to judge practice, spiritual progress, or daily reflection meaning. Type chips remain small invitations, not scores or requirements to choose correctly.

`Practice_Note` is an optional short note for a practice situation, good action, or wholesome context the user wants to remember, such as feeding fish at a temple, helping someone, recollecting a good action, or choosing not to react. It is field memory for Field Review and may be read only in a bounded `practice_context` Reflection when that root is explicitly selected. It is not a merit score, self-assessment, or measure of spiritual progress.

Use it lightly:

- Write something you want to keep with today, such as gratitude, an ordinary moment, something you are learning, uncertainty, or something you want to set down gently
- Choose `Feeling in this note` from the gentle/supportive, neutral/noticing, or heavy/needs-space group
- Choose `What might support the mind today?`, such as rest first, see the pattern, hydrate gently, continue gently, thank myself, or stay present
- Keep it short if that feels right
- Use it to notice patterns between mind state, hydration, load, recovery, and sleep

MHB 2.1 changed only Mind Note wording, grouping, and visual breathing room. MHB 2.2 adds runtime-only awareness of time between saved `Daily_Log` dates and uses it only to shape the Reflection opening. Existing values remain compatible, and Excel, Reflection interpretation, Field Review, and Signal Engine contracts are unchanged.

## 16. Reflection Generator

Click `Reflect` to create a NuTuenSai-style reflection for the day.

The reflection includes:

- What the day seems to show
- One gentle adjustment
- A short Tomorrow Focus
- A compact Mind Note line when available

The opening gently distinguishes a first record, a return from yesterday, or a return after some time without a saved entry. It mentions this at most once, then returns attention to what is recorded today. Time without a saved entry is not failure, does not require backfilling, and does not change facts or the selected Reflection Root.

The preview intentionally shows a synthesis instead of every detected field. This keeps it distinct from the NuTuenSai note strip above it and avoids a raw data dump. Details such as Recovery Note, Hydration Note, NuTuenSai Reminder, Mind Note, and Tomorrow Focus still remain in Daily Log / Reflections / Excel.

If you want to adjust the stored detail, use the small edit action to view and edit the stored reflection before saving.

During generation, a short zen listening moment appears. After a reflection exists, the preview shows the `Reflection` label and generated text. `Clear Reflection` is the only reset action; it clears only the current preview and does not delete Today’s Signals, Daily Log rows, or saved data.

Newly generated reflections end with one blue heart, `🩵`, as a light NuTuenSai signature. It is not a score or assessment.

Reflection Root lets you choose the gentle focus for that Reflection, such as hydration, sleep/recovery, load/activity, drinks, mind state, or practice context. When a non-auto root is selected, the generated Reflection uses concise root-specific NuTuenSai segments; Auto stays close to the existing rule-based composer. It is not a score, medical advice, or diagnosis.

Each root shapes the reflection slightly differently. For example, the hydration root gives more space to water and relevant context, while the mind root gives more space to Mind Note and user-owned meaning. Other data remains supporting context instead of being narrated equally.

Reflection brings back only 1-2 concrete details that fit the selected root, such as water amount, sleep hours, activity labels, drink names, Mind Note, or practice note. This keeps the reading grounded in the real day without returning to a data dump.

When you click `Save Today’s Reflection`, the app stores Reflection Root metadata such as `Reflection_Root`, `Reflection_Root_Label`, `Reflection_Root_Source`, and `Reflection_Root_Declaration`, so export/Excel can show the user-selected intention for that Reflection. These fields are reading context, not an AI-selected conclusion or importance score.

## 17. Save To Daily Log

Click `Save to Daily Log` from Today’s Signals 1/2 when you only want to record water, drinks, sleep, activity, and load signals without going to Reflection.

Click `Save to Daily Log` from Mind Note 2/2 when you want to save the current day with Mind Note fields while leaving Reflection empty.

Click `Save Today’s Reflection` from Reflection/NuTuenSai when you want to save today’s data with the generated or edited Reflection.

The saved row comes from the current app state, including Energy, Mind, Sleep, Sleep Hours, water, drinks, activities, Run Detail, load, Tomorrow Focus, NuTuenSai Reminder, Practice Context, Mind Note, Reflection, and Reflection Root metadata when saved from the Reflection page.

If the same date already exists, the app asks before updating this section and keeps other saved sections.

## 18. Daily Log Table

The Daily Log Table shows saved days in the browser. It helps you review patterns across multiple days, such as high-load days, low-sleep days, low-water days, or pressured-mind days.

MHB 2.2 can derive the latest earlier log date and the number of calendar days between saved entries from `Daily_Log.Date` at runtime. It does not save another counter, create a streak, offer rewards or penalties, or treat time away from logging as failure.

This table is not a judgment table. It is a local mirror for seeing life rhythm over time.

## 19. Clear Daily Log

Click `Clear Daily Log` only when you want to remove all saved logs from this browser.

This clears historical Daily Log data from localStorage in the current browser. It does not affect any exported Excel files you already downloaded.

## 20. Export / Import Master Excel

### Export Master Excel

Click `Export Master Excel` to download:

```text
Mindful_Health_Balance_Master.xlsx
```

The file includes these main sheets:

- Daily_Log
- Summary
- Reflections
- Field_Context
- Field_Review
- Column_Guide
- AI_Context
- User_Intention_Profile (optional)

Use this file as a master backup or open it in Excel when you want to review a longer period.

`Summary` is a JavaScript-calculated static export sheet, not Excel formulas and not AI analysis. It includes `Total_Logs` for row count, `Unique_Days` for unique logged dates, average water, high-load days, low-sleep days, sweet-drink days, most common mind state, and `Summary_Note`.

`Summary_Note` is a static guardrail message. It reminds readers that the workbook supports pattern review and recovery balance, not judgment of health from any single day.

`Column_Guide` is a column dictionary sheet. It explains canonical column names with meaning, unit, data type, allowed interpretation, forbidden interpretation, AI reading notes, labels, examples, and canonical status without changing the original `Daily_Log` headers, so import and future v2.0 parsers can keep using stable keys.

`AI_Context` is a workbook-level guide for AI/LLM readers. It states that this is a self-care reflection workbook, not a finance, expense, accounting, trading, or spending workbook. For example, `Water_ml` means milliliters of water, not money or expenses.

`Daily_Log` includes optional columns added over time, such as `Sleep_Hours`, `Run_Detail_JSON`, and Reflection Root metadata (`Reflection_Root`, `Reflection_Root_Label`, `Reflection_Root_Source`, `Reflection_Root_Declaration`). Existing fields remain, and older workbooks without these columns still import normally.

Starting in v1.9, `Field_Context` explains that the workbook is a local-first self-care log owned by the user. If the user chooses to share it with an AI/LLM, the AI should read it for pattern reflection only, not for diagnosis or medical advice.

LLM outputs from this workbook should still be audited by the user. The context sheets reduce misreading, but they do not make an AI interpretation authoritative.

`Field_Review` is a lightweight descriptive summary of available entries, such as review period, average water, high-load days, common mind/support patterns, drink-load summary, and days with Mind Note or Reflection. It is for gentle pattern reflection, not disease diagnosis or health-risk prediction.

`User_Intention_Profile` is exported only when a saved profile exists in this browser. If there is no saved profile, the app does not create an empty sheet. The profile sheet stores user-chosen name, address style, tone, notes, and boundaries. It is user-owned data, not an account, identity verification, medical profile, or hidden AI instruction engine.

The current master data file is `Mindful_Health_Balance_Master.xlsx`. `.xltx` is a template/local artifact, not the current master backup data file.

### Import Master Excel

Click `Import Master Excel` to load a saved master file back into the app.

The app reads the `Daily_Log` sheet and restores the rows into the Daily Log Table. If existing Daily Log data is already present, the app asks before overwriting it.

If the workbook contains a valid `User_Intention_Profile` sheet, the app shows a preview and asks before replacing the local profile:

- Cancel keeps the existing profile.
- Confirm replaces the whole profile snapshot from the workbook.
- v1 does not merge field-by-field.
- A workbook without the profile sheet leaves the local profile unchanged.
- An invalid profile candidate is skipped and should not break the rest of workbook import.

The core data is local-only in the browser/localStorage. There is no auto-upload.

## 21. How To Open The App

Open this folder:

```text
~/Desktop/MindfulSystem_xAi/apps/mindful-health-balance
```

Then double-click:

```text
index.html
```

The app is a static web app. It does not require a backend server or framework.

If `Export Master Excel` does not work, check that the browser can load the SheetJS CDN, because Excel export/import uses a browser-side library.

## 22. Important Reminders

- This app helps you notice patterns. It does not judge health.
- You do not need to enter everything perfectly.
- Do not use the app to pressure yourself.
- If you have real symptoms or health concerns, seek professional care.
- The goal is not to make numbers look good quickly. The goal is to build a system that can last.
- The app is local-only and does not auto-upload your data.
- AI reads exported data only when you choose to share the workbook.
- It is not a medical tool, not a diagnosis system, not therapy, not crisis support, not financial advice, and not a scoring/judgment app.
- Positive signals are support signals, not performance scores.
- Sweetness and caffeine are drink-load signals, not moral scores.
- Activity roots refine reflection wording; they do not infer identity.

## 23. Core Sentence Of The System

Mindful Health Balance by MSxAI is a gentle mirror for noticing how hydration, coffee, sweet drinks, load, recovery, sleep, and mind state connect, without rushing to judge yourself from one day of data.
