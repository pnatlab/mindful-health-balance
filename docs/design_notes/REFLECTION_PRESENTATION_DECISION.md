# Reflection Presentation Decision

## Purpose

Mindful Health Balance keeps detailed reflection data for storage and export, but the Reflection Generator preview should read as NuTuenSai synthesis rather than raw analysis output.

This is an alignment and presentation decision, not a schema reduction.

## Display Roles

The Reflection page has two different roles:

- NuTuenSai note: an immediate mindful reminder for the current state.
- End-of-Day Reflection preview: a concise synthesis of the day.

The preview should not repeat the NuTuenSai note word-for-word. It should help the user stay with the day, not list every detected signal.

## Preview Structure

The displayed End-of-Day Reflection should use at most four soft blocks:

- What the day seems to show.
- What may need gentle adjustment.
- Tomorrow Focus.
- Optional compact Mind Note line.

The preview should avoid raw field labels such as `Recovery Note`, `Hydration Note`, `NuTuenSai Reminder`, or internal logic names.

## Stored And Exported Detail

Detailed reflection text remains stored in the existing generated reflection field and exported through the existing Daily Log / Reflections / Excel flow.

The following data remains available for storage/export:

- Detailed End-of-Day Reflection text.
- NuTuenSai Reminder.
- Tomorrow Focus.
- Hydration and recovery insight within the detailed reflection.
- Mind Note text.
- Mind Note Feeling.
- Support Need.
- Existing Daily_Log, Summary, Reflections, Field_Context, and Field_Review sheets.

No localStorage keys, Excel columns, canonical values, or import/export compatibility are changed by this presentation layer.

## Voice Rules

Use gentle synthesis language:

- "seems"
- "may"
- "try"
- "gradually"
- "recovery"
- "hydration"
- "pattern"

Avoid:

- diagnostic claims
- medical advice
- therapy-heavy interpretation
- fear-based wording
- motivational cliche
- robotic checklists
- raw data dumps

## Transient Meal Context Cue

MHB 2.6I may show a compact source-fact cue after normal Reflection generation when the user explicitly arrived with an eligible Meal draft snapshot. The cue is not part of the preview synthesis or stored detail. It does not alter generated text, root metadata, NuTuenSai reminder, Tomorrow Focus, Daily Log, or Excel.

Only confirmed item labels, selected Meal Type when present, unsaved status, and the return action are shown. No meal advice, nutrition/sodium interpretation, raw Vision label, or good/bad judgment belongs in this cue.
