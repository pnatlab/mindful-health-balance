# MHB 2.3B - Meal Composition Runtime/Data Layer

## Status

Implemented as a non-user-facing runtime/data foundation. MHB 2.2 remains the current runtime version; no Meal Composer UI, workbook meal sheet, or user-facing Reflection wording is included in this slice.

## Purpose

MHB 2.3B establishes one local source for Meal Instances and Meal Item Instances before any Meal Composer presentation is added:

```text
Static Food Reference pilot
    -> local Meal Item Instances
    -> local Meal Instances
    -> derived Daily Meal Summary
    -> bounded Meal Reflection Context
```

`Daily_Log` remains separate. The summary and Reflection context are derived only and are never persisted as a second source of truth.

## Runtime Contract

- Storage key: `mhb_meal_records_v1`.
- Stored source: normalized Meal Instances with their normalized Meal Item Instances.
- Missing storage returns an empty list.
- Malformed storage JSON, unreadable storage, or malformed records fail soft: valid records remain readable, malformed records are skipped, a warning is emitted, and storage is not erased automatically.
- Records are sorted deterministically by date, time, creation time, and ID.
- `meal_id` and `meal_item_id` use local stable IDs. Browser `crypto.randomUUID()` is used when available, with a local fallback.
- Date entry reuses MHB's existing `normalizeExcelDate()` through the script adapter.

## Food Reference Pilot

The pilot contains 26 immutable static Food References across grain, animal protein, egg, plant protein, vegetable, fruit, soup, condiment, processed food, and dessert categories. Condiments are first-class references.

No sodium values are included in the pilot because this repository does not contain approved nutrition evidence for those values. Each pilot item deliberately uses unknown sodium range/confidence/source until a separate Food Reference Evidence Pass approves supported values. This keeps `unknown ≠ zero` true in runtime data.

## Portion and Preparation

The hybrid portion implementation uses:

```text
small   -> 0.5
regular -> 1.0
large   -> 1.5
custom  -> explicit positive finite multiplier
```

This is a global runtime pilot mapping, not a gram measurement or category-specific nutrition claim. The exact category mapping remains an implementation specification item.

Preparation accepts `boiled`, `steamed`, `grilled`, `stir_fried`, `fried`, `roasted`, `raw`, `soup`, `unknown`, or blank when not recorded. It carries no moral or medical interpretation.

## Derived Estimates and Summary

`deriveMealEstimate()` and `deriveDailyMealSummary()` sum supported lower and upper bounds separately. Coverage is:

- `complete` when all relevant recorded items have supported ranges
- `partial` when known and unknown estimates are mixed
- `unknown` when no supported range is available

Meal confidence is conservative: any incomplete coverage yields `unknown`; complete estimates use the lowest relevant confidence. Daily counts are meal-presence counts, never item totals. A meal with two animal-protein items remains one `animal_protein_meals` count.

## Reflection Boundary

`buildMealReflectionContext()` contains only bounded derived facts such as recorded meal count, range/coverage, confidence, visible categories, and recorded preparation/condiment presence. It never contains raw Meal objects, `meal_note`, `user_adjustment`, or score fields.

The adapter is not connected to Reflection rendering in MHB 2.3B. It cannot select or override a Reflection Root, alter deterministic health interpretation, or add medical claims.

## Deferred Work

- Meal Composer UI and Dynamic Daily Meal Reflection Panel presentation
- user-facing Reflection meal wording
- workbook export/import sheets
- Food Reference Evidence Pass and supported sodium estimates
- Field Review integration
- custom-food editor, barcode/API, calorie/macros, or food inference

## Documentation Impact

Runtime documentation update not required; implementation remains non-user-facing. This note records the data-layer implementation while README and user guides continue to describe MHB 2.2.
