# Reflection Generation Moment

## Purpose

This note records the NuTuenSai Reflection Pulse / Zen Moment micro-interaction for the Reflection Generator.

The effect is a UX transition only. It is not real AI processing, not a new reflection logic layer, and not a change to stored or exported data.

## Interaction Intent

When the user asks the app to generate an End-of-Day Reflection, the UI should briefly feel like NuTuenSai is listening to the day's pattern before showing the synthesis.

The goal is to create a small moment of rhythm between input and reflection:

```text
empty centered state
-> click Reflect Today
-> centered soft listening state
-> reflection fades in
```

This makes the experience feel less like an instant text replacement and more like a gentle daily closure moment.

## Behavior

The preview has three presentation states:

- Empty: only a centered circular zen-style `Reflect` / `สรุปวันนี้` CTA, without repeated explanatory copy.
- Generating: the circular CTA becomes a disabled pulse state, with localized listening text centered below it.
- Generated: `Reflection` state label, readable reflection text below the centered label, and `Clear Reflection` as the only reset action.

During generation:

- The Reflection preview enters a temporary generating state.
- A localized message appears:
  - TH: `กำลังฟัง pattern ของวันนี้…`
  - EN: `Listening to today’s pattern…`
  - ZH: `正在倾听今天的模式…`
- A subtle blue/lavender pulse and shimmer appears inside the preview box.
- The circular CTA is disabled briefly to prevent double action.
- After a short delay, the generated reflection is revealed with a soft paragraph-by-paragraph fade.

The delay should stay short enough that the app still feels responsive.

`Clear Reflection` resets only the current preview/edit state and returns the card to the empty state. It must not clear Today Input, saved Daily Log rows, or exported/imported data.

The generated state intentionally removes `Reflect Again` / `สรุปใหม่` / `重新回顾` to reduce action clutter. A new reflection starts by clearing the preview first, then returning to the empty circular CTA.

The generated reflection should end with one NuTuenSai signature heart, `🩵`. The heart is a gentle signature, not a gamification marker, score, medical cue, or new data field. It is appended to the reflection text without adding columns or changing workbook compatibility.

The Reflection Generator UI intentionally removes repeated visible explanations such as the large End-of-Day heading, helper sentence, and empty-state description. The circular CTA carries the action in the primary UI, while detailed meaning and guardrails remain in the guides/design notes instead of being repeated inside the card.

The staged reveal is display-only. It splits the display text into short paragraphs for presentation rhythm and must not change stored reflection text, saved rows, export/import logic, or workbook schema.

## Boundaries

This micro-interaction must not change:

- reflection generation logic
- generated reflection text
- Daily Log data
- stored reflection behavior
- localStorage keys
- Daily_Log schema
- Save / Export / Import behavior
- medical, diagnostic, or therapeutic meaning

The app still uses the same deterministic in-browser reflection logic. The pulse only changes how the transition is presented.

The Zen Moment is a UX transition, not actual AI processing. It should not imply that new hidden data analysis, medical interpretation, or external AI upload is happening.

## Reduced Motion

The effect must respect `prefers-reduced-motion`.

When reduced motion is requested:

- pulse and shimmer animations should stop
- the delay should be shortened
- the reflection should still appear clearly
- the user should not lose access to the generated content
- paragraph reveal animation should stop and content should appear immediately

Empty and generating states may be centered to create a calmer reflection ritual. Generated reflection content should remain left-aligned enough to stay readable when the text is longer.

The generated state keeps a centered rhythm by placing the soft `Reflection` label above the reflection text. The text itself may remain left-aligned inside its readable block.

## Visual Direction

The visual style should remain:

- soft
- glassmorphism-compatible
- blue/lavender
- quiet
- non-flashy
- non-gamified
- different from a generic spinner
- centered around a circular/zen-style CTA instead of a rectangular command button

## Guardrail Sentence

The Reflection Generation Moment should give the user a small pause for daily closure without implying deeper AI processing, medical interpretation, or any change to the user's data.
