# LLI Continuity Reflection Layer (v1.9.5)

## Purpose

v1.9.5 adds a lightweight continuity layer to Reflection/NuTuenSai so the current-day reflection can read gently against the most recent saved rhythm.

The layer reads only the previous 1-3 `Daily_Log` rows before the current date. It is deterministic, rule-based, and supportive. It is not chatbot memory, medical analysis, training advice, or long-term analytics.

## Weighting Principle

- Current Today Input remains primary.
- Previous 1-3 logs are context only.
- NuTuenSai / LLI tone shaping should keep the reflection soft, compact, and agency-preserving.

Approximate design weight:

- Current day input: 70%
- Previous 1-3 logs: 20%
- Tone shaping: 10%

## Signals

The continuity layer may notice:

- `sleepDebtHint`: recent rows show repeated low or low-ish sleep signals.
- `sleepRecoverySupport`: today has better sleep after recent low-sleep rows.
- `loadStreak`: recent rows show repeated high-load days.
- `runRecoveryCarryover`: the previous row has running/sport load and today still has load or recovery signals.
- `hydrationShift`: today's water is meaningfully higher or lower than recent rows.
- `mindCarryover`: pressure, worry, or scatteredness appears across recent logs and today.
- `mindSoftening`: recent pressure exists, while today's mind signal is softer.
- `cognitiveLoadContinuity`: recent rows include deep work, market watch, or light coding / AI-assisted work.

## Output Style

Continuity appears as one short note at most. It can appear in the Reflection preview and detailed Reflection, but it should not become a new report section unless the UI later needs one.

Preferred tone:

- "ต่อจาก log ก่อนหน้า..."
- "เมื่ออ่านต่อจาก..."
- "วันนี้ดูเหมือน..."
- "สัญญาณหลักอาจ..."

Avoid:

- "ระบบวิเคราะห์ว่า..."
- "คุณมีแนวโน้ม..."
- "สาเหตุคือ..."
- "ควรต้อง..."
- diagnosis
- training advice
- productivity pressure

## Boundaries

- Do not read more than the latest 1-3 previous logs in v1.9.5.
- Do not perform weekly/monthly analytics.
- Do not create a chatbot memory layer.
- Do not add schema columns.
- Do not change export/import structure.
- Do not change localStorage keys.
- Keep user agency central.

## Relationship To Current Input

Continuity should never override today's input. If today clearly says recovery, load, hydration, or mind pressure, that current-day signal remains primary. Previous logs only help the reflection sound more field-aware and less isolated.
