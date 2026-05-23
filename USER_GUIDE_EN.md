# Mindful Health Balance by MSxAI User Guide

## 1. What This App Is

Mindful Health Balance by MSxAI is a self-care reflection tool for gently noticing daily health patterns. It is not designed to judge you, pressure you, or make you rush to fix numbers.

The app helps you observe gentle pattern awareness across:

- Hydration
- Caffeine and sugary drinks
- Load and recovery
- Energy, sleep, and mind state

This app is not a medical tool, not a diagnosis system, and not a replacement for professional care or medical follow-up.

## 2. When To Use It

You can use the app lightly at three natural moments:

- Morning / start of day: choose Energy, Mind, and Sleep
- During the day: log water, drinks, and the main activities that used energy
- End of day: generate an End-of-Day Reflection and save it to the Daily Log

You do not need to keep the app open all day. It is meant to be a gentle mirror at the beginning, middle, and end of the day.

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

## 7. 3-Layer UI: Today / Reflection / Log

After the Welcome Glass, the app is organized into three views:

- `Today` for current-day input: Energy, Mind, Sleep, Hydration, Drink Profile, Load & Recovery, Mind Note, and Reset Current Form
- `Reflection/NuTuenSai` for the NuTuenSai note, generated reflection preview/editing, and Save to Daily Log
- `Log` for the Daily Log Table, Export Master Excel, Import Master Excel, and Clear Daily Log

Switching views does not reset current inputs and does not delete saved Daily Logs.

## 8. Today State

Choose the current state as honestly and simply as possible:

- Energy: Low / Medium / Good
- Overall Mind Today: Neutral / Worried / Pressured / Scattered
- Sleep: Low / Okay / Good

This gives the day context. For example, a low-sleep day or a scattered-mind day should not be used to judge the whole picture.

The small blue heart beside `Overall Mind Today` marks the main mind observation for the day. `Feeling of This Note` in Mind Note is the feeling of that specific note, not a judgment of the whole day.

On the Today page, this card includes a small sun or moon visual based on the browser's local time. It is only a gentle energy-rhythm cue and does not affect saved data or processing.

You can also choose optional `Energy Cause` chips, such as low sleep, heavy exercise, deep work, stress, low water, low food, or unknown.

## 9. Hydration

Use Hydration to roughly log plain water:

- `+250 ml` for a small glass or a small extra amount
- `+500 ml` for a larger glass or bottle
- `+Half bottle` for an approximate half bottle
- `Reset` when you want to start the water count over

Hydration is about steadiness, not forcing a large amount at once. Small sips across the day are enough.

Starting in v1.9.x, the Hydration card shows a flexible estimated target based on the day's load. A rest day can stay near the base target, while running, sport, outdoor heat, sweating, deep work, or higher load may show a slightly higher estimated range with a cue to sip gradually.

This guidance uses existing activity, load, sleep, and caffeine signals. It does not add new input fields. It is self-care guidance only, not medical advice, not diagnosis, and not an exact requirement. The user should still listen to their own body first.

## 10. Drinks / Drink Profile

Drink Profile is for drinks other than plain water, such as coffee, tea, cocoa, sweet drinks, or juice. Plain water should be logged in the Hydration card so it does not need to be entered twice.

Add drinks only as needed. Each drink can include:

- Drink Type
- Sweetness
- Approx. caffeine
- Milk
- Amount

Click `Add Drink` to add the drink to today’s list, or `Clear Drinks` to start the drink list over.

The app calculates Sugar Score, Caffeine Score, Milk Drink Count, and Hydration Support Count to help reveal patterns gently. A simple rule of thumb remains: a sweet drink behaves more like a sweet treat than like plain water.

If sugar or caffeine is high on a given day, the point is not guilt. The point is to notice the pattern and adjust the next drink or return to water and rest.

## 11. Load & Recovery

Load & Recovery is not only about exercise. It also includes work that uses focus, posture, standing, decision energy, outdoor effort, and body energy.

Activity / profession-aware presets include:

- Office work / meetings & documents
- Outdoor work / heat & physical effort
- Deep work / coding
- Dentist / detailed clinical cases
- Doctor / clinical shift or patient care
- Photographer / long shoot
- Investor / market watch & analysis
- Badminton
- Heavy pingpong
- Easy run
- Long run
- Lots of walking
- Low sleep
- Rest day

The app summarizes load into three levels:

- Light Load: there is still room for recovery
- Moderate Load: the day used some energy, so recovery windows matter
- High Load: the body or mind has used a lot, so recovery should have more space

Recovery is part of performance. It is not a reward you earn only after pushing hard.

## 12. Mindful Reminder

The Mindful Reminder shows a short NuTuenSai note based on today’s key signals, such as low water, high caffeine, low sleep, high load, or a pressured mind state.

NuTuenSai is a gentle reflection layer for noticing patterns. It is not a doctor, therapist, diagnosis tool, or medical advice.

The goal is to help you return to consistency, not to scare you or make you fix everything in one day.

## 13. Signal-Based Reflection

From v1.6 onward, Mindful Reminder and End-of-Day Reflection are generated from relationships between signals rather than single numbers alone.

The main signals are:

- Hydration Signal
- Drink Load Signal
- Recovery Load Signal
- Energy & Sleep Signal
- Mind Note Signal

The app does not use these signals to diagnose or judge health. It uses them to reflect patterns gently. For example, low sleep with high load may point toward recovery first, while low water with high caffeine may invite steadier water and rest.

## 14. Mind Note

Mind Note is a small space for one line of inner context. It is not a therapy tool, not crisis support, and not a medical tool.

Use it lightly:

- Write one short line about what your mind is holding today
- Choose `Feeling of This Note`, such as neutral, worried, pressured, tired, scattered, or grateful
- Choose a support need, such as rest first, see the pattern, reduce pressure, hydrate gently, or leave it for now
- Keep it short if that feels right
- Use it to notice patterns between mind state, hydration, load, recovery, and sleep

## 15. Reflection Generator

Click `Generate End-of-Day Reflection` to create a NuTuenSai-style reflection for the day.

The reflection includes:

- What went well today
- What may need adjustment
- Recovery Note
- Hydration Note
- Tomorrow Focus
- NuTuenSai Reminder

The generated reflection is a preview. You can lightly edit the wording before saving it if you want the reflection to better match the real day.

## 16. Save To Daily Log

Click `Save to Daily Log` to save the current day into the Daily Log table.

The saved row comes from the current app state, including Energy, Mind, Sleep, water, drinks, activities, load, Tomorrow Focus, NuTuenSai Reminder, Mind Note, and generated reflection.

If the same date already exists, the app asks before replacing that row.

## 17. Daily Log Table

The Daily Log Table shows saved days in the browser. It helps you review patterns across multiple days, such as high-load days, low-sleep days, low-water days, or pressured-mind days.

This table is not a judgment table. It is a local mirror for seeing life rhythm over time.

## 18. Clear Daily Log

Click `Clear Daily Log` only when you want to remove all saved logs from this browser.

This clears historical Daily Log data from localStorage in the current browser. It does not affect any exported Excel files you already downloaded.

## 19. Export / Import Master Excel

### Export Master Excel

Click `Export Master Excel` to download:

```text
Mindful_Health_Balance_Master.xlsx
```

The file includes five sheets:

- Daily_Log
- Summary
- Reflections
- Field_Context
- Field_Review

Use this file as a master backup or open it in Excel when you want to review a longer period.

Starting in v1.9, `Field_Context` explains that the workbook is a local-first self-care log owned by the user. If the user chooses to share it with an AI/LLM, the AI should read it for pattern reflection only, not for diagnosis or medical advice.

`Field_Review` is a lightweight descriptive summary of available entries, such as review period, average water, high-load days, common mind/support patterns, and days with Mind Note or Reflection. It is for gentle pattern reflection, not disease diagnosis or health-risk prediction.

### Import Master Excel

Click `Import Master Excel` to load a saved master file back into the app.

The app reads the `Daily_Log` sheet and restores the rows into the Daily Log Table. If existing Daily Log data is already present, the app asks before overwriting it.

The core data is local-only in the browser/localStorage. There is no auto-upload.

## 20. How To Open The App

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

## 21. Important Reminders

- This app helps you notice patterns. It does not judge health.
- You do not need to enter everything perfectly.
- Do not use the app to pressure yourself.
- If you have real symptoms or health concerns, seek professional care.
- The goal is not to make numbers look good quickly. The goal is to build a system that can last.
- The app is local-only and does not auto-upload your data.
- It is not a medical tool, not a diagnosis system, not therapy, and not crisis support.

## 22. Core Sentence Of The System

Mindful Health Balance by MSxAI is a gentle mirror for noticing how hydration, coffee, sweet drinks, load, recovery, sleep, and mind state connect, without rushing to fix numbers from fear.
