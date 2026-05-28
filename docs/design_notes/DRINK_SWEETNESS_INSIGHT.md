# Drink Sweetness Insight

## Purpose

This note records the v1.9.x refinement for reading drink sweetness as a gentle self-care pattern signal in Mindful Health Balance.

The change adds soda / soft drink as a Drink Type and makes Sweetness / Sugar Score more useful in NuTuenSai-style reminder and reflection wording, without adding new inputs, changing the Daily Log schema, changing localStorage keys, or changing existing Excel column names.

## Core Principle

Sweetness is a drink-load signal, not a moral score.

Soda / soft drink is a drink category, not a judgment.

The app should help the user notice how drink sweetness relates to hydration, caffeine, energy, sleep, load, and recovery without making sweet drinks feel wrong, dangerous, or shameful.

## Soda / Soft Drink

The Drink Type list includes:

- TH: `น้ำอัดลม`
- EN: `Soda / Soft drink`
- ZH: `汽水`

Soda must not be treated as automatically sweet. The system reads the existing `Sweetness` field first:

- soda + no/low sweetness = drink context, not a strong sweetness load
- soda + high sweetness = sweet drink-load signal
- soda + medium/high caffeine = sweetness and caffeine can be reflected together

This keeps zero-sugar and low-sugar soda entries truthful without adding another input.

## Reflection Behavior

NuTuenSai reminder and reflection may mention sweetness when it is relevant, especially when sweetness appears together with:

- caffeine
- low sleep
- low energy
- higher load or exercise
- soda with high sweetness

The wording should stay soft:

- plain water can return as the base
- the next drink can be simpler
- recovery and water can follow afterward
- the previous drink does not need to be judged

The wording should avoid:

- diet advice
- medical claims
- risk prediction
- guilt or fear
- saying sweet drinks are wrong
- treating Sugar Score as a health score

## Field Review Boundary

Field_Review may include descriptive drink-load summaries such as days with sweet drinks, high-sugar days, soda days, and a short drink-load observation.

These summaries are descriptive only. They are not diagnosis, nutrition advice, medical advice, health-risk prediction, or moral evaluation.

## Compatibility

This refinement must preserve:

- existing Drink Profile inputs
- existing Daily Log columns
- existing `Drink_Profile_JSON`
- existing `Sugar_Score`
- existing `Caffeine_Score`
- existing import/export compatibility
- local-first and user-owned data boundaries

No new user input is required.

## Guardrail Sentence

Drink Sweetness Insight should make sweet-drink patterns easier to notice gently, without turning soda, sugar, or caffeine into guilt, medical advice, diet advice, or a judgment of the user's day.
