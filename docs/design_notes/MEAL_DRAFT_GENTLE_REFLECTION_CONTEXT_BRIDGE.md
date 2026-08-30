# MHB 2.6I - Meal Draft Gentle Reflection Context Bridge

## Purpose

Slice 1 lets a user carry one human-confirmed, unsaved Meal Composer draft into Reflection as quiet context and return to the same draft. Slice 2 also lets normal Reflection recall a bounded, read-only summary of canonical meals recorded for the current local day. Neither slice integrates meal data into the Reflection generator.

> Meal Composition owns the meal. Reflection may borrow a human-confirmed snapshot to mirror it gently.

## Contract

The bridge begins only after explicit user action and only when the draft contains at least one actual Meal Item. Meal Type alone, image selection, raw Vision observations, unapplied review proposals, unsupported labels, and vocabulary evidence are ineligible. A Vision suggestion becomes eligible only after human Apply has created an ordinary Meal Item.

`buildMealDraftReflectionSnapshot()` makes an immutable clone of bounded draft facts: draft identity when present, label, Meal Type, time, explicit unknown-condiment state, confirmed item identity/display/portion/preparation fields, and a snapshot timestamp. It excludes raw Vision output, vocabulary history, sodium/nutrition inference, hidden model prose, and unconfirmed named-dish inference.

## Lifecycle

```text
Meal draft with at least one Meal Item
  -> explicit gentle-reflection action
  -> immutable snapshot in top-level memory
  -> existing Reflection page
  -> existing Reflection generation completes
  -> small context cue appears
  -> return to the unchanged Meal Composer draft
  -> snapshot is discarded
```

The snapshot is memory-only. Reload discards it naturally. Clear Reflection hides the cue but retains the snapshot so another explicit generation may reveal the cue again. Returning to Today/Meal Composer, replacing the snapshot, or another relevant lifecycle reset ends it. There is no stale reconciliation; reflecting an edited draft requires another explicit action.

## Reflection Boundary

Meal context does not enter `buildSignals()`, Reflection Root configuration, root weighting, Auto behavior, NuTuenSai reminder, Tomorrow Focus, continuity, Daily Log gap, generated Reflection text, root metadata, Daily Log, or Excel.

The cue appears only after the existing Reflection generation moment succeeds. It contains only confirmed item labels, selected Meal Type when present, an explicit unsaved status, and a return action. It is a secondary footnote, not a Reflection Root, whole-day signal, nutrition judgment, recommendation, or second meal record.

## Persistence and Authority

- Meal Composition remains the only owner that can save or mutate Meal Instances and Meal Items.
- Reflection never saves, edits, scores, or corrects the borrowed meal context.
- The bridge adds no localStorage/sessionStorage key, schema field, Daily Log column, workbook sheet, or history.
- Saving Daily Reflection persists only the existing Reflection fields; the cue and snapshot are excluded.

## Accessibility and Presentation

The Meal Composer action is a secondary semantic button and is disabled without a confirmed item. Reflection receives focus at its existing heading. The cue is a labeled contextual aside, wraps compactly on narrow screens, uses existing light/dark tokens, and provides a keyboard-accessible return button. Returning reopens the Meal Composer and restores focus to the bridge action without changing the draft.

## Slice 2 - Saved Meal Context Recall

After a normal successful Reflection generation, and only when no active Slice 1 snapshot exists, Reflection may read canonical records for the app's current local date through the Meal runtime store. The resulting `saved_today` context is a fresh, read-only view of recorded meals, not an assertion of everything the user consumed.

The bounded adapter exposes only date, recorded meal count, sorted meal identity/label/type/time, and confirmed item IDs with display snapshots. It excludes raw Vision output, rejected proposals, observation vocabulary, sodium/nutrition estimates, named-dish metadata, notes, and raw Meal records. For presentation it deduplicates by canonical Food Reference ID, orders IDs deterministically, shows at most four labels, and reports any remainder as an item count. This presentation dedupe never mutates canonical records.

The saved cue has no return action and appears in the same secondary area below Clear Reflection. Clear hides it; a later generation reads the canonical store again, so meals saved between generations are reflected only on that later read. An active explicit Slice 1 snapshot wins visually and suppresses saved-today recall to keep provenance clear.

Saved meal recall is evidence of what was recorded, not proof of everything the user consumed. It is not a Root, whole-day signal, generator input, generated Reflection content, Daily Log data, Excel data, recommendation, score, or health interpretation.
