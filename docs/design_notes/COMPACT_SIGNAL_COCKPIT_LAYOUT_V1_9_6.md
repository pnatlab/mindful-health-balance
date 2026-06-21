# v1.9.6 — Compact Signal Cockpit Layout

## Intent

v1.9.6 reduces the visual weight of Today’s Signals 1/2 by changing the first step from four large cards shown at once into a compact two-card layout:

1. Daily Signal Cockpit
2. Active Signal Detail

This is a layout and usability experiment for v1.9.x. It does not change the data model, reflection logic, Excel export/import, localStorage schema, or saved row structure.

## Layout Decision

Today’s Signals 1/2 still contains the same four daily signals:

- Inner State
- Water
- Drinks
- Work / Activity

The cockpit card stays visible so the user can always see all four signals and notice which ones are empty, started, or readable. The active detail card shows only one signal at a time.

This keeps the page lighter without hiding the existence of any input area.

## Cockpit Labels

The cockpit uses gentler, user-facing labels:

- TH: ภาวะใจวันนี้, น้ำ, เครื่องดื่ม, งาน / กิจกรรม
- EN: Inner State, Water, Drinks, Work / Activity
- ZH: 内在状态, 饮水, 饮品, 工作 / 活动

The cockpit intentionally uses `งาน / กิจกรรม` instead of `Load` because it is softer and easier to understand. Internally, the app still uses `Activities`, `Load_Score`, `Load_Level`, and the existing load helpers.

## Status Levels

Each cockpit item may show:

- Empty / ยังว่าง / 未填写
- Started / เริ่มมีข้อมูล / 已开始
- Readable / พออ่านได้แล้ว / 可阅读

These statuses are visual input-awareness cues only. They are not scores, completion badges, diagnosis, judgment, or performance measurement.

## Active Detail Behavior

The active detail area reuses the existing input sections:

- Today State detail
- Hydration detail
- Drinks detail
- Load & Recovery detail

Only one is visible at a time on Today’s Signals 1/2. Mind Note 2/2 remains unchanged.

## Boundaries

This patch must not:

- add Daily_Log columns
- change export/import behavior
- change localStorage data schema
- change reflection logic
- change Mind Note 2/2
- make Reflection mandatory before saving
- add medical, training, or diagnostic meaning

## v2 Direction

This layout may inform a future v2 signal cockpit or guided review flow, but v1.9.6 remains a UI-only experiment inside the existing local-first app.
