# Reflection Page Layout Decision

## Purpose

This note records the Reflection page layout refinement for Mindful Health Balance.

The change is presentation-only. It does not change reflection generation logic, generated reflection text, saved Daily Log data, Excel export/import behavior, localStorage keys, or schema.

## Decision

The Reflection page should use a vertical layout:

```text
NuTuenSai reminder strip
-> End-of-Day Reflection Generator
-> Daily Log Controls
```

Mindful Reminder remains part of the page, but it should no longer appear as a large equal-weight card beside the Reflection Generator.

## Why

The Reflection page is the daily closure space. Its main focus should be the End-of-Day Reflection Generator.

When the Mindful Reminder appears as a large side card, it competes with the generated reflection and makes the page feel heavier than necessary. A slim horizontal strip keeps the NuTuenSai rhythm while giving the Reflection Generator the main visual weight.

## Reminder Strip

The NuTuenSai reminder should be:

- horizontal
- slim
- calm
- glassmorphism-compatible
- short
- readable in light and dark mode
- supportive rather than analytical when there is no current-day input

The strip may keep a subtle prism, light bar, or soundwave motif, but it should not dominate the page.

## Empty State

When there is no meaningful current-day input, the reminder should greet rather than analyze.

It should not imply that the system has already found a pattern.

Examples:

- TH: `สวัสดีค่ะ วันนี้ยังไม่มีข้อมูลให้ระบบอ่านมากนัก ลองกรอก Today Input สักเล็กน้อยก่อน แล้วค่อยกลับมาทบทวนกันนะคะ`
- EN: `Welcome back. There isn’t much for NuTuenSai to read yet today. Add a little Today Input first, then come back for a gentle reflection.`
- ZH: `欢迎回来。今天还没有太多资料可以阅读，可以先记录一点今日输入，再回来做轻柔的回顾。`

When some current-day input exists, the page may show the normal NuTuenSai reminder from the existing signal layer.

## Boundaries

This decision must not change:

- `buildReflection()`
- `buildReflectionDisplay()`
- generated reflection storage
- Save to Daily Log
- Daily_Log / Reflections / Excel export
- localStorage keys
- import/export compatibility

The refinement is about page hierarchy and empty-state wording only.

## Guardrail Sentence

The Reflection page should feel like a calm daily closure space where NuTuenSai sets the tone in a small strip and the End-of-Day Reflection remains the main focus.
