# Activity Load Root Matrix

## Purpose

This note documents how selected activity chips can be read as higher-level Activity Load Roots for NuTuenSai reflection.

Activity Load Roots refine reflection wording only. They do not add inputs, change Load Score / Load Level, change localStorage keys, change Daily_Log columns, or change Excel export/import structure.

## Core Principle

Activities should help the system understand the root of today's load without labeling the user's identity.

The same Load Score can come from different roots:

- clinical precision
- standing/service work
- deep cognitive focus
- market decision loops
- heat/sweat
- sport/training
- walking/body use
- low sleep as legacy/import recovery signal and Today State > Energy Cause signal
- rest/light recovery base

Reflection should name the day context gently and avoid profession-specific medical, financial, diagnostic, or productivity advice.

## Activity-To-Root Mapping

| Activity Chip / Key | Activity Load Root | Meaning | Preferred Tone | Avoid |
| --- | --- | --- | --- | --- |
| `dentalFocus` | `clinical_focus` | Precision, hands, eyes, nervous-system focus, responsibility toward another person. | Rest hands, eyes, and nervous system quietly. | Diagnosing stress or saying clinical work is dangerous. |
| `clinicalShift` | `clinical_focus` | Clinical attention, patient-care responsibility, sustained precision. | Give quiet recovery the same space as detailed work. | Medical advice about the work itself. |
| `photoshoot` | `service_standing` | Standing, walking, carrying gear, posture, holding space for others. | Recovery can include back, legs, shoulders, and eyes. | Treating it as only exercise or only office work. |
| `officeWork` | `cognitive_deepwork` | Sustained focus, screen time, meetings, mental loops. | Rest eyes, reduce loops, return space to the brain. | Productivity praise that pushes more work. |
| `lightCodingAiAssist` | `cognitive_deepwork` | Light coding / AI-assisted work; context guidance, output review, and small ongoing decisions. Score 1, lighter than `deepWork`. | Read as light cognitive/context-guiding load, not full deep work every time. | Calling it empty time, full deep work by default, or productivity pressure. |
| `deepWork` | `cognitive_deepwork` | Deep focus, coding, screen attention, decision fatigue. | Lower mental loops and recover attention. | Treating focus fatigue as weakness. |
| `marketWatch` | `market_decision` | Attention, uncertainty, decision pressure, screen/market loop. | Short screen breaks and not carrying the market into sleep. | Financial advice, buy/sell suggestions, market prediction. |
| `outdoorWork` | `outdoor_heat` | Heat, sweat, physical effort, hydration context. | Sip water in small rounds and pause from heat/body load. | Medical dehydration warning. |
| `badminton` | `sport_sweat` | Sport, sweat, training load. | Recovery is part of training. | Push harder, train more, aggressive hydration command. |
| `heavyPingPong` | `sport_sweat` | Higher sport intensity and sweat/training load. | Recovery follows effort. | Overtraining encouragement. |
| `easyRun` | `sport_sweat` | Exercise load, even when light/moderate. | Let hydration and recovery follow activity. | Treating easy run as no load at all. |
| `shortQualityRun` | `sport_sweat` | Short quality / progression / fast-ish run where intensity matters more than distance. | Recovery follows intensity, not only distance. | Calling it a long run, pushing speed, or turning it into a training command. |
| `longRun` | `sport_sweat` | Strong endurance load and likely higher sweat context. | Recovery is part of training; hydration may sit in a higher cue-based range without forcing 4.0 L. | Aggressive water or performance commands. |
| `longWalk` | `walking_physical` | Legs, feet, back, general body use. | Give back, legs, feet, and water rhythm space. | Overstating as high-intensity sport. |
| `lowSleep` | `recovery_low_sleep` | Legacy/import recovery signal. In the current UI, low sleep belongs in Today State > Energy Cause, not Load & Recovery. | Rest before adding another round if old workbooks contain this value. | Showing it as a new activity chip or calling it high activity load. |
| `rest` | `rest_base` | Rest day / วันพัก. | Keep a rest rhythm without adding productivity pressure. | Pushing productivity because the day is open. |
| `lightRecoveryDay` | `rest_base` | Light recovery day / วันเบา / ฟื้นตัว. | Read as a light recovery mode and support signal. | Treating it as diagnosis or letting it override stronger activity. |

## Priority Rules

One day can have multiple roots.

Priority for primary reflection:

```text
outdoor_heat
-> sport_sweat
-> clinical_focus
-> market_decision
-> service_standing
-> cognitive_deepwork
-> walking_physical
-> recovery_low_sleep
-> rest_base
```

Rules:

- `recovery_low_sleep` can coexist as a recovery modifier for legacy/imported activity values, while new UI should use Energy Cause for low sleep.
- `rest_base` should not override stronger activity roots. `rest` and `lightRecoveryDay` are recovery modes, not identity or diagnosis.
- If no activity or no clear root exists, use existing fallback reflection behavior.
- Roots refine wording only; they do not change scoring or saved data.

## Expected Reflection Tone

Activity Root Summary is the short UX copy layer used when the app needs a tighter sentence in the reminder strip, Reflection preview, or compact daily feedback. It is a language modifier, not a profile inference.

The app should not say:

- "You are a doctor."
- "You are a photographer."
- "Your job caused stress."
- "Your profession is risky."

The app should say:

- "Today used sustained precision."
- "Today used energy through standing and moving."
- "Today used attention and decision energy."
- "Today used real physical effort."

| Root | Short Summary Layer | Longer Reflection Layer | Tomorrow / Recovery Focus |
| --- | --- | --- | --- |
| `clinical_focus` | "Today used sustained precision." | "Today used sustained precision, hands, eyes, and nervous-system focus." | Quiet recovery for hands, eyes, and nervous-system focus. |
| `service_standing` | "Today used energy through standing, moving, and holding space for others." | "Today may have used energy through standing, moving, carrying gear, and holding space for others." | Back, legs, shoulders, eyes, and distributed water. |
| `cognitive_deepwork` | "Today used sustained focus and screen attention." | "Today used sustained focus and screen attention." | Rest eyes, reduce mental loops, return space to the brain. |
| `market_decision` | "Today used attention and decision energy." | "Today's load may come from attention and decision pressure more than body movement." | Screen breaks and not carrying the market into sleep. |
| `outdoor_heat` | "Today included heat, sweat, or body effort." | "Today included heat, sweat, or body effort." | Small water rounds and heat/body pauses. |
| `sport_sweat` | "Today used real physical effort." | "Today used real physical effort." | Recovery is part of training. |
| `walking_physical` | "Today used the body through walking or movement." | "Today used the body through walking or movement." | Back, legs, feet, and water spread across the day. |
| `recovery_low_sleep` | "Today is a low-sleep recovery signal." | "This is a recovery signal, not a high activity-load signal." | Rest before adding another round. |
| `rest_base` | "Today is a rest/light recovery rhythm." | "Today can keep a light rhythm without adding main load." | Do not add productivity pressure or override stronger activity. |

## Longer Reflection Tone

| Root | Expected NuTuenSai Reflection | Tomorrow / Recovery Focus |
| --- | --- | --- |
| `clinical_focus` | "Today used sustained precision, hands, eyes, and nervous-system focus." | Quiet recovery for hands, eyes, and nervous-system focus. |
| `service_standing` | "Today may have used energy through standing, moving, carrying gear, and holding space for others." | Back, legs, shoulders, eyes, and distributed water. |
| `cognitive_deepwork` | "Today used sustained focus and screen attention." | Rest eyes, reduce mental loops, return space to the brain. |
| `market_decision` | "Today's load may come from attention and decision pressure more than body movement." | Screen breaks and not carrying the market into sleep. |
| `outdoor_heat` | "Today included heat, sweat, or body effort." | Small water rounds and heat/body pauses. |
| `sport_sweat` | "Today used real physical effort." | Recovery is part of training. |
| `walking_physical` | "Today used the body through walking or movement." | Back, legs, feet, and water spread across the day. |
| `recovery_low_sleep` | "This is a recovery signal, not a high activity-load signal." | Rest before adding another round. |
| `rest_base` | "Today can keep a rest/light recovery rhythm." | Do not add productivity pressure or override stronger activity. |

## Test Scenarios

| Scenario | Expected Result | Guardrail |
| --- | --- | --- |
| `photoshoot` selected | `service_standing` wording appears. | Do not call it only exercise. |
| `marketWatch` selected | `market_decision` wording appears. | No financial advice or prediction. |
| `dentalFocus` selected | `clinical_focus` wording appears. | No diagnosis or medical risk wording. |
| `clinicalShift` selected | `clinical_focus` wording appears. | No claim that clinical work is dangerous. |
| `outdoorWork` selected | `outdoor_heat` wording appears. | No dehydration warning. |
| `longRun` selected | `sport_sweat` wording appears; hydration may guide toward a higher range while treating around 3.0 L as a good zone. | No push-harder or force-more-water language. |
| `shortQualityRun` selected | Short quality run wording appears before generic `sport_sweat`. | Do not call it easy run or long run. |
| `lightCodingAiAssist` selected | Light coding / AI-assisted work wording appears before generic `cognitive_deepwork`. | Do not call it empty time or full deep work by default. |
| `deepWork` selected | `cognitive_deepwork` wording appears. | No productivity praise that pushes more. |
| old workbook value `lowSleep` only | `recovery_low_sleep` wording appears for compatibility. | Do not show low sleep as a new UI activity chip or call it high activity load. |
| `rest` only | Rest-day wording appears. | Do not push productivity. |
| `lightRecoveryDay` only | Light recovery wording appears. | Do not diagnose or over-explain. |
| `shortQualityRun` + `lightRecoveryDay` | Short quality run remains the main load; recovery mode acts as a modifier. | Do not let recovery mode erase intensity-based load. |
| No activity selected | Existing fallback behavior remains. | Do not invent a root. |

## Compatibility Boundary

Activity Load Roots must not change:

- activity chip UI
- `Activities` saved value
- `Load_Score`
- `Load_Level`
- `Daily_Log` columns
- `Field_Review` columns
- localStorage keys
- Excel export/import structure

They are a reflection wording layer only.

## Guardrail Sentence

Activity Load Roots should make reflection more context-aware without turning work, sport, recovery, or rest into diagnosis, identity labels, financial advice, medical advice, or productivity pressure.
