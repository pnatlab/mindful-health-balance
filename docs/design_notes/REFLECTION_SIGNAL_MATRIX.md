# Reflection Signal Matrix

This matrix summarizes how Mindful Health Balance reads user signals and reflects them through NuTuenSai voice. It is a design/testing reference only. It is not a medical rule system, diagnosis model, or therapy framework.

## 1. Core Reflection Principles

- Reflect patterns, not diagnose.
- Do not assume fear unless the user selected worried/pressured or wrote it in a note.
- Low data should produce a gentle greeting or neutral reminder, not analysis.
- Positive signals are support signals, not proof the whole day is good.
- Recovery signals and activity load must be separated.
- Sweetness and caffeine are drink-load signals, not moral scores.
- Mind Note Feeling belongs to the note, not necessarily the whole day.
- v1.9.4 Reflection Input Integration uses current-day input only; it does not read previous Daily Log rows or perform longitudinal comparison.
- v1.9.5 LLI Continuity Reflection may read only the latest 1-3 previous Daily Log rows as supportive context; current-day input remains primary.

## 2. Single Signal Matrix

| Signal Layer | User Input / Condition | System Meaning | Preferred Reflection Tone | Avoid |
| --- | --- | --- | --- | --- |
| Hydration | water = 0 or very low | Water rhythm is not visible yet or may need a gentle base. | Invite small sips or a simple water cue. | Urgency, risk language, medical dehydration claims. |
| Hydration | water near base | Water is present enough to support the day. | Notice a usable base and steady rhythm. | Demanding more water by default. |
| Hydration | water enough | Hydration can be read as a supportive base. | Keep the rhythm; pair with load/recovery if relevant. | Treating water as proof the whole day is fine. |
| Hydration | water high but no load | Water may be more than enough for a light day. | Neutral observation; no need to chase more. | Warning language or exact medical advice. |
| Hydration | long run / heavy sweat + around 3.0 L | Water is already in a good zone for a high-sweat day, but body cues may still matter. | Good zone; add small sips only if sweat remains high, thirst persists, or urine color is dark. | Treating 3.0 L as failure or forcing 4.0 L. |
| Hydration | water >= 4.0 L | Intake is already high. | Spread through the day and observe body cues; do not force more. | Encouraging more water or medical warning language. |
| Sleep | low sleep | Recovery signal. | Recovery-first, gentle pacing. | Blame, failure, or health judgment. |
| Sleep | `Sleep_Hours < 5` | Structured sleep duration derives the existing low sleep category. | Recovery-first, still gentle and non-diagnostic. | Treating hours as medical diagnosis or failure. |
| Sleep | `Sleep_Hours 5 to < 7` | Structured sleep duration derives the existing okay sleep category. | Balanced observation; enough to orient recovery. | Overstating precision from a self-reported number. |
| Sleep | `Sleep_Hours >= 7` | Structured sleep duration derives the existing good sleep category. | Support signal; still read energy/load/mind layers. | Saying the whole day is fine because sleep hours are good. |
| Sleep | okay sleep | Some recovery base exists. | Balanced, observational tone. | Overstating sleep quality. |
| Sleep | good sleep | Recovery support signal. | Notice support while still reading other layers. | Assuming energy, mind, or load must be good. |
| Energy | low | Body/system may have lower resources. | Care and recovery cue. | Blame or productivity pressure. |
| Energy | medium | Mixed or balanced energy. | Keep observing layers. | Forcing a strong conclusion. |
| Energy | good | Energy is available today. | Use energy gently; still protect recovery. | Assuming no fatigue or no need for rest. |
| Overall Mind Today | neutral | Overall mind is not strongly burdened or positive. | Simple steady observation. | Treating neutral as ideal calm. |
| Overall Mind Today | worried | Worry is a care signal. | "A signal to care, not an order to rush." | Diagnosis, anxiety labeling, fear amplification. |
| Overall Mind Today | pressured | Pressure is present. | Reduce pressure; no need to fix everything. | Productivity praise that reinforces pressure. |
| Overall Mind Today | scattered | Attention/mind may be dispersed. | Gentle grounding and small rhythm cues. | Over-analysis or labeling the user. |
| Overall Mind Today | feeling good | Mind can support the system. | Support signal, not performance score. | Saying the whole day was good. |
| Overall Mind Today | relaxed | Mind has softened. | Supportive context; still read body/load. | Ignoring sleep, energy, or load. |
| Mind Note Feeling | neutral | The note tone is light or plain. | Let the note stay simple. | Forcing meaning. |
| Mind Note Feeling | uneasy | The note carries uneasiness or a stuck feeling. | Gently set down; no need to fix immediately. | Calling it anxiety, diagnosis, or abnormal. |
| Mind Note Feeling | worried | This note has worry. | Notice worry as care signal. | Treating worry as a command to act. |
| Mind Note Feeling | pressured | This note has pressure. | Lower pressure by one step. | Reinforcing urgency. |
| Mind Note Feeling | tired | This note carries tiredness. | Recovery and softness. | Calling it failure or weakness. |
| Mind Note Feeling | scattered | This note feels dispersed. | Small grounding cue. | Over-interpreting mental state. |
| Mind Note Feeling | feeling_good | This note has a good feeling tone. | Small support signal. | Claiming the whole day is perfect. |
| Mind Note Feeling | grateful | Gratitude is present in the note. | Support signal that can coexist with load. | Gratitude cancels fatigue. |
| Energy Cause | low sleep | Energy may be affected by sleep debt. | Recovery-first. | "You failed to sleep enough." |
| Energy Cause | enough sleep | Sleep may be supportive. | Support layer; still read energy/load. | "Sleep solved everything." |
| Energy Cause | low food | Fuel/resource signal. | Gentle resource cue. | Diet judgment. |
| Energy Cause | low water | Hydration may affect energy. | Water base cue. | Medical warning. |
| Energy Cause | heavy exercise | Physical load. | Recovery is part of training. | Push harder or drink aggressively. |
| Energy Cause | deep work | Cognitive load. | Rest eyes, reduce loops, recover focus. | Productivity praise only. |
| Energy Cause | stress | Pressure/load signal. | Lower pressure and recover. | Diagnosing stress response. |
| Energy Cause | light mind | Mind may support energy. | Layered support signal. | Ignoring body fatigue. |
| Energy Cause | unknown | Unclear cause. | Curiosity without forcing explanation. | Making up a cause. |
| Drink | no extra drink | Drink load is light. | Plain water remains a simple base. | Moral praise or purity framing. |
| Drink | high caffeine | Alertness support with possible water-base cue. | Coffee/caffeine not judged; return water as base. | "Coffee is wrong." |
| Drink | sweet drink moderate | Some sweetness load. | No guilt; next drink can be simpler. | Diet advice or sugar fear. |
| Drink | sweet drink high | Sweetness is part of drink load. | Return to water/recovery base gently. | Medical risk language. |
| Drink | soda low/no sweetness | Soda is drink context, not sweetness load. | Read sweetness field first. | Assuming all soda is sweet. |
| Drink | soda high sweetness | Soda adds sweetness load. | No judgment; next drink can return to water/rest. | Guilt or "bad drink" wording. |
| Drink | caffeine + sweetness | Alertness and sweetness signals both present. | Invite plain water back as base. | Diet/medical tone. |
| Load | rest day | Low activity load. | Preserve rhythm and recovery. | Push productivity. |
| Load | light load | The day has space. | Small steady rhythm is enough. | Over-instructing. |
| Load | medium load | Some energy use. | Balance with recovery. | Treating as high load. |
| Load | high load | Recovery can be outrun. | Recovery follows load. | Shame or "too much" judgment. |
| Load | sport / sweat | Strong activity hydration signal. | Hydration and recovery move with activity. | Aggressive water commands. |
| Load | outdoor heat | Heat/sweat context. | Small sips and pauses. | Risk/fear wording. |
| Load | deep work / cognitive load | Focus, eyes, and mental loops use energy. | Rest eyes, reduce loops, recover attention. | Treating it as only mental weakness. |
| Load | low sleep as recovery signal | Low sleep belongs in Today State > Energy Cause in the current UI; legacy imported `lowSleep` activity values remain readable. | Base hydration plus rest. | Showing low sleep as a new activity chip or calling it high activity load. |
| Load | light recovery day | Recovery mode / support signal. | Light, descriptive, not diagnostic. | Letting it override a stronger activity selected with it. |

## 2.2 Continuity Signal Matrix

Continuity signals are supportive context only. They should not become diagnosis, coaching, or a claim about the user's identity.

| Continuity Signal | Previous Log Condition | Current-Day Use | Preferred Reflection Tone | Avoid |
| --- | --- | --- | --- | --- |
| `sleepDebtHint` | 1-3 previous rows include repeated low or low-ish sleep. | Read today's energy/recovery more gently. | "ต่อจาก log ก่อนหน้า..." / recovery support. | Blame or medical sleep claims. |
| `sleepRecoverySupport` | Previous low sleep, today sleep is better. | Treat better sleep as a small support signal. | "นอนดีขึ้นเมื่อเทียบกับ log ก่อนหน้า..." | Saying recovery is complete. |
| `loadStreak` | Previous rows include repeated high load. | Current day may need recovery context. | "เมื่ออ่านต่อจากวันที่มี load ต่อเนื่อง..." | Productivity pressure. |
| `runRecoveryCarryover` | Previous row has running/sport load and today still has load/recovery signal. | Let recovery follow previous effort. | "ถ้าวันก่อนหน้ามี run/load..." | Training plan or pace judgment. |
| `hydrationShift` | Today's water differs meaningfully from recent rows. | Notice water rhythm gently. | "จังหวะปรับฐาน" / small steady sip cue. | Treating water as a score to beat. |
| `mindCarryover` | Previous pressure/worry/scatteredness and today still has pressure. | Gently set down pressure. | Carryover as a signal, not identity. | "You are anxious." |
| `mindSoftening` | Previous pressure, today mind is softer/positive. | Read as support signal. | Softening, not a big conclusion. | Saying everything is fixed. |
| `cognitiveLoadContinuity` | Previous rows include deep work, market watch, or light coding / AI-assisted work. | Nervous-system recovery may matter. | Context-load continuity. | Calling AI-assisted work a rest day or pushing output. |

## 2.1 Activity Load Root Matrix

Activity Load Roots refine the reflection tone behind selected activity chips. They are presentation/reflection context only and do not change Load Score, Load Level, saved activities, or export/import schema.

Activity Root Summary is the short copy layer used when the UI needs a compact sentence. It should describe how today's energy was used, not infer identity or profession.

| Activity Scenario | Root | Expected Reflection Tone | Avoid |
| --- | --- | --- | --- |
| `photoshoot` | `service_standing` | Standing, moving, carrying gear, and holding space for others; recovery includes back, legs, shoulders, and eyes. | Treating it as only exercise or only office work. |
| `marketWatch` | `market_decision` | Attention and decision pressure; short screen breaks and not carrying the market into sleep. | Financial advice, buy/sell suggestions, or market prediction. |
| `dentalFocus` / `clinicalShift` | `clinical_focus` | Sustained precision, hands, eyes, and nervous-system focus; quiet recovery deserves space. | Diagnosis, medical-risk wording, or saying clinical work is dangerous. |
| `outdoorWork` | `outdoor_heat` | Heat, sweat, and body effort; small water rounds and heat/body pauses. | Medical dehydration warning. |
| `badminton` / `heavyPingPong` / `easyRun` / `shortQualityRun` / `longRun` | `sport_sweat` | Physical effort and training load; recovery is part of training. `shortQualityRun` should read as intensity-based short running load, not easy run or long run. | Push harder, aggressive hydration commands, or prescriptive training advice. |
| running chip + `Run_Detail_JSON` | `sport_sweat` with optional structured context | Distance, duration, derived pace, and sweat can refine current-day load/hydration/recovery wording. | Training plan, pace judgment, race prediction, or performance coaching. |
| `deepWork` / `officeWork` / `lightCodingAiAssist` | `cognitive_deepwork` | Sustained or light cognitive focus and screen attention; `lightCodingAiAssist` is score 1 and reads as context guidance, output review, and small ongoing decisions rather than full deep work by default. | Productivity praise that pushes more work, or treating AI-assisted work as empty time. |
| `longWalk` | `walking_physical` | Body use through walking/movement; give back, legs, feet, and water rhythm space. | Overstating it as high-intensity sport. |
| old workbook value `lowSleep` only | `recovery_low_sleep` | Recovery signal, not high activity load; rest before adding another round. | Showing low sleep as a new Load & Recovery chip or calling it a heavy activity day. |
| `rest` only | `rest_base` | Rest rhythm and recovery base. | Pushing productivity because the day is open. |
| `lightRecoveryDay` only | `rest_base` | Light recovery mode and support signal. | Diagnosis wording or letting it erase stronger activity load. |

| Root | Preferred Short Summary | Avoid |
| --- | --- | --- |
| `clinical_focus` | "Today used sustained precision." | "You are a doctor/dentist." |
| `service_standing` | "Today used energy through standing, moving, and holding space for others." | "You are a photographer." |
| `cognitive_deepwork` | "Today used sustained focus and screen attention." | Productivity praise that pushes more work. |
| `market_decision` | "Today used attention and decision energy." | Financial advice or market prediction. |
| `outdoor_heat` | "Today included heat, sweat, or body effort." | Medical dehydration warning. |
| `sport_sweat` | "Today used real physical effort." | Push harder / train more. |
| `walking_physical` | "Today used the body through walking or movement." | Treating it as high-intensity sport. |
| `recovery_low_sleep` | "Today is a low-sleep recovery signal." | Calling it high activity load. |
| `rest_base` | "Today is a rest/light recovery rhythm." | Pushing productivity because there is space or overriding stronger activity. |

## 3. Combination Matrix

| Scenario | Input Combination | Expected NuTuenSai Reflection | UX Risk | Guardrail |
| --- | --- | --- | --- | --- |
| Low data / almost empty input | No meaningful Today Input | Greeting / gentle prompt to add Today Input. | Assuming fear, diagnosis, or personal story. | Stay neutral; do not analyze what is not there. |
| Water low + no other signal | Low water only | Gentle sip cue; small water rhythm. | Medical fear or urgent tone. | Use self-care cue, not warning. |
| Water low + caffeine high | Low water + high caffeine | Plain water can return as base; caffeine not judged. | "Coffee is wrong." | Separate caffeine context from moral judgment. |
| Low sleep + low energy | Sleep low + energy low | Recovery-first; body resources may be low. | Blame or "you failed." | Care cue, not performance judgment. |
| Low sleep + feeling good / relaxed | Sleep low + positive mind | Mind may be support signal, while body still needs recovery. | "The whole day is fine." | Let both signals coexist. |
| Good energy + stress | Energy good + stress cause | Layered signal: energy can carry, recovery still matters. | Contradiction/error wording. | "Both can be true." |
| Low energy + enough sleep | Energy low + enough sleep cause | Enough sleep may support, but body may still need recovery. | "Sleep did not work" or "data conflict." | Read as layered signal. |
| Mind Note Feeling = uneasy | Mind Note Feeling `uneasy` | Note carries uneasiness; gently set it down. | Calling it anxiety/diagnosis. | Keep it note-level and non-medical. |
| Mind Note Feeling = feeling_good | Mind Note Feeling `feeling_good` | Good feeling is a small support signal. | Whole-day-perfect wording. | Support signal, not proof. |
| Sweet soda + caffeine | Soda + high sweetness + caffeine | Drink gave alertness/sweetness; return to water base. | Guilt, diet, or medical tone. | Drink-load signal, not moral score. |
| High load + enough water | High load + water enough | Hydration can be base; recovery follows load. Long run/heavy sweat may use a higher range, but 3.0 L can already be a good zone. | Telling user to drink more aggressively. | Pair water with recovery and body cues. |
| Rest day + positive mind | Rest/light day + feeling good/relaxed | Steady/supportive day; preserve rhythm. | Pushing productivity. | Do not turn support into pressure. |
| Scattered mind + low water | Scattered mind + low water | Small water rhythm plus gentle grounding. | Over-analysis. | Keep cue small and practical. |
| Pressured mind + deep work | Pressured + deep work/cognitive load | Reduce pressure, recover focus, no need to fix all at once. | Productivity praise reinforcing pressure. | Recovery and pressure reduction first. |
| Grateful note + high load | Grateful note + high load | Gratitude as support, still protect recovery. | Gratitude cancels fatigue. | Support and fatigue can coexist. |

## 4. Public Voice Guardrails

Avoid phrases like:

- `พี่ไม่จำเป็นต้องกลับไปกลัว`
- `go back to fear`
- `you are anxious`
- `you need to`
- `this is risky`
- `healthy/unhealthy`
- `good/bad user`
- any diagnosis or medical inference

Preferred phrases:

- `วันนี้ไม่ต้องสรุปตัวเองเร็ว...`
- `ค่อย ๆ กลับมาดูจังหวะเล็ก ๆ...`
- `เป็นสัญญาณให้ดูแล ไม่ใช่คำสั่งให้รีบแก้`
- `อ่านเป็น pattern ไม่ใช่คำตัดสิน`
- `support signal, not performance score`
- `drink-load signal, not moral score`

## 5. Minimal Test Checklist

- [ ] Generate with almost no input.
- [ ] Generate after water only.
- [ ] Generate with low sleep + low energy.
- [ ] Generate with good energy + stress.
- [ ] Generate with `feeling_good` note.
- [ ] Generate with `uneasy` note.
- [ ] Generate with soda + high sweetness.
- [ ] Generate with high load + water enough.
- [ ] Switch TH/EN/ZH and verify tone.
- [ ] Confirm no medical/guilt/fear wording appears in low-data state.

## 6. Notes For Future v2.0

This matrix can later become the basis for Field Review Companion. It may evolve into manual test cases, automated reflection snapshots, or guided review scenarios.

It should remain descriptive, not prescriptive. Even if v2.0 adds multi-day review, the system should still avoid diagnosis, medical inference, hidden scoring, and AI authority over the user's own interpretation.

Human agency must remain central: the app and NuTuenSai can help notice patterns, but the user remains the person who decides what the pattern means in real life.
