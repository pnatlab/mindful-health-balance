# Field Review Timeframe Layer v2.0

## 1. Intent

Timeframe Layer is a future v2.0 concept for Field Review Companion / NuTuenSai Log Reader.

Its role is to help the companion choose how to read logs based on both:

- amount of available data
- real date coverage

The system should not always answer as if every review is "the latest 14 days". More data should not automatically produce deeper analysis, and fewer logs should not be stretched into a strong pattern.

Core idea:

- More data should not always produce deeper analysis automatically.
- The system should first determine the appropriate review timeframe.
- The app should avoid saying "14 days" if the data is actually 14 logs spread across several months.
- Use honest wording such as "14 latest logs" when needed.
- Use "days", "weeks", or "months" only when date coverage supports it.

## 2. Inputs For Timeframe Detection

Possible inputs:

- `Total_Logs`
- `Unique_Days`
- `Date_Range_Days`
- `Latest_Date`
- `Earliest_Date`
- `Logs_Per_Week` estimate
- gaps between logs
- whether dates are valid or missing

Use both row count and date range. Do not rely on row count alone.

## 3. Suggested Timeframe Modes

### insufficient_data

Use when there are 0-3 logs or not enough valid dates.

Tone:

- greeting
- gentle start
- light orientation

Avoid:

- claiming a pattern
- comparing days strongly
- producing advice that sounds certain

### daily_start

Use when there are around 4-10 logs or a short early-use period.

Tone:

- early daily rhythm
- simple self-care cue
- low-pressure reflection

Avoid:

- over-analysis
- trend claims
- strong summary language

### short_review

Use around 11-21 logs or roughly 1-3 weeks of usable data.

Tone:

- short pattern review
- gentle relationship between water, load, recovery, drinks, and mind

Wording:

- Use "ช่วง 14 บันทึกล่าสุด" / "the latest 14 logs" when row-based.
- Use "ช่วง 14 วันล่าสุด" / "the latest 14 days" only when unique dates and date range support it.

### weekly_rhythm

Use when there are several weeks of data, such as 22-45 logs or a date range around 3-6 weeks.

Tone:

- week-level rhythm
- load/recovery relationship across weeks

Focus:

- weekly load/recovery rhythm
- high-load weeks
- recovery after heavier days
- not single-day judgment

### monthly_pattern

Use when the date range is around 60-90+ days or there are enough logs across months.

Tone:

- broad monthly pattern
- trend and cluster language

Focus:

- trends
- clusters
- consistency
- recovery rhythm
- hydration rhythm
- mind pattern across time

### long_term_archive

Use when data spans several months or more.

Tone:

- gentle long-term reflection
- broad memory
- user-owned archive review

Focus:

- broad pattern memory
- seasons of load and recovery
- changes in rhythm

Avoid:

- precise diagnosis
- health prediction
- personality inference
- productivity pressure

## 4. UX Greeting Examples

### TH

insufficient_data:

```text
สวัสดีค่ะ ตอนนี้บันทึกยังมีไม่มากนัก หนูจะอ่านเป็นจุดเริ่มต้นเบา ๆ ก่อน ยังไม่สรุป pattern ใหญ่ค่ะ
```

daily_start:

```text
หนูเริ่มเห็นจังหวะรายวันบางอย่างแล้วนะคะ ยังไม่ต้องสรุปยาว แค่ค่อย ๆ ดูว่าน้ำ การพัก และ load เชื่อมกันยังไงเบา ๆ
```

short_review:

```text
สวัสดีค่ะ วันนี้หนูอ่าน log ช่วง 14 บันทึกล่าสุดแล้วนะคะ หนูจะไม่ตัดสินสุขภาพจากตัวเลขวันเดียว แต่ช่วยดู pattern เบา ๆ ได้
```

weekly_rhythm:

```text
ตอนนี้ log เริ่มพอให้ดูจังหวะรายสัปดาห์ได้แล้วนะคะ หนูจะไม่ตัดสินจากวันใดวันหนึ่ง แต่ช่วยดูว่า week ไหนใช้พลังมาก และ week ไหน recovery กลับมาดีขึ้น
```

monthly_pattern:

```text
ตอนนี้ข้อมูลเริ่มยาวพอให้ดูภาพระดับเดือนได้แล้วค่ะ หนูจะอ่านเป็นแนวโน้มกว้าง ๆ เช่น น้ำสม่ำเสมอขึ้นไหม load กระจุกช่วงไหน และ recovery กลับมาทันหรือเปล่า
```

### EN

insufficient_data:

```text
Welcome back. There is not much log data yet, so NuTuenSai will read this as a gentle starting point rather than a large pattern.
```

daily_start:

```text
NuTuenSai can start to see a few daily rhythms. No need for a long conclusion yet; we can gently notice how water, rest, and load connect.
```

short_review:

```text
Today I am reading the latest 14 logs. I will not judge health from a single number, but I can help reflect on light patterns.
```

weekly_rhythm:

```text
The logs are starting to support a weekly rhythm review. I will not judge one day alone; I can help notice which weeks used more energy and where recovery returned.
```

monthly_pattern:

```text
The data is now broad enough for a monthly-level view. I will read it as wide trends, such as hydration consistency, load clusters, and whether recovery has room to catch up.
```

## 5. Button Sets By Timeframe

### insufficient_data

- เริ่มดูข้อมูลที่มี
- ดูน้ำ
- ดูการพัก
- เพิ่มบันทึกต่อ

### short_review

- น้ำและ hydration
- sleep / recovery
- drink load
- activity load
- mind pattern
- สรุป 14 บันทึกล่าสุด

### weekly_rhythm

- ดู pattern รายสัปดาห์
- week ที่ load สูง
- recovery หลังวันหนัก
- น้ำกับคาเฟอีน
- mind rhythm

### monthly_pattern

- ภาพรวมรายเดือน
- hydration trend
- load กระจุกช่วงไหน
- recovery rhythm
- mind pattern ระยะยาว

## 6. Guardrails

- Do not diagnose.
- Do not infer health status.
- Do not overstate patterns from sparse data.
- Do not say "days" if the data is only logs.
- Do not assume missing days mean failure.
- Do not treat gaps as bad behavior.
- Do not produce productivity pressure.
- Return agency to the user.
- Use "pattern signal", not "truth".
- Use language such as "may suggest", "ดูเหมือน", and "อาจเป็นสัญญาณ".

## 7. Relation To Existing v1.9.x Workbook

This layer can use:

- `Daily_Log` as the raw source
- `Summary` for basic totals such as `Total_Logs`, `Unique_Days`, and `Average_Water_ml`
- `Field_Review` for descriptive review context
- `Column_Guide` for schema meaning and AI reading notes
- `Reflection Signal Matrix` for guardrails
- `Activity Load Root Matrix` for activity-aware language

The Timeframe Layer should sit above workbook parsing. It decides the frame of reading before choosing focus buttons or reflection wording.

## 8. Future Implementation Sketch

Pseudo helper:

```js
detectReviewTimeframe(rows)
```

Example return for 14 logs covering 14 real days:

```js
{
  mode: "short_review",
  totalLogs: 14,
  uniqueDays: 14,
  dateRangeDays: 14,
  label: "14 latest logs",
  canSayDays: true
}
```

Example return for 14 logs spread across about 90 days:

```js
{
  mode: "monthly_pattern",
  totalLogs: 14,
  uniqueDays: 14,
  dateRangeDays: 90,
  label: "14 logs across about 3 months",
  canSayDays: false
}
```

Possible detection flow:

1. Parse valid dates from `Daily_Log`.
2. Count total rows and unique dates.
3. Compute earliest date, latest date, and date range.
4. Estimate logs per week.
5. Look for large gaps.
6. Choose mode.
7. Generate honest label.
8. Build focus buttons for that mode.

## 9. Scope Boundary

This is a v2.0 roadmap note only.

Do not implement this in v1.9.x unless explicitly requested later.

Do not change:

- export/import
- app UI
- workbook schema
- log behavior
- localStorage keys
- reflection generation logic

## Guardrail Sentence

Field Review Companion should first choose an honest timeframe, then reflect patterns gently inside that frame.
