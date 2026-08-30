# MHB 2.3B - Meal Composition Runtime/Data Layer

## Status

Implemented first as the MHB 2.3B runtime/data foundation and now consumed by the user-facing MHB 2.3D Meal Composer UI. The data ownership and derivation rules in this note remain unchanged; workbook meal sheets and user-facing main Reflection wording are still deferred.

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

The current library contains 28 immutable static Food References across grain, animal protein, egg, plant protein, vegetable, fruit, soup, condiment, processed food, and dessert categories. Condiments are first-class references.

After Human Evidence Review, exactly four references carry evidence-backed sodium ranges: one large boiled `egg` (60-62 mg, high confidence), regular `fish_sauce` (1,410-1,480 mg/tbsp, medium), regular `soy_sauce` (879-920 mg/tbsp, medium), and `oyster_sauce` (490-870 mg/tbsp, low). The singular `source_type` remains `reference_database` as the primary evidence class, while `source_reference` records the institutional or manufacturer cross-check used for the human-reviewed range. The other 24 references deliberately remain sodium-unknown. This preserves `unknown ≠ zero` and does not turn broad categories into confident-looking estimates.

MHB 2.6J adds `pork_fatty` and `pork_crispy` after field use exposed a vocabulary gap beside the preserved `pork_lean` reference. Both are ordinary animal-protein identities with unknown sodium, no automatic preparation or health meaning, and no Vision mapping. This is an additive vocabulary update only; it does not change Meal schema, storage, evidence routing, or named-dish matching.

The evidence-backed condiment references use `1 tbsp`, replacing the prior ambiguous `1 spoon`. A future package-specific label may override a generic estimate only on a Meal Item Instance; it must never overwrite the canonical Food Reference.

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

## Deferred Work After MHB 2.3D

- user-facing Reflection meal wording
- workbook export/import sheets
- additional Food Reference evidence beyond the four human-approved references
- Field Review integration
- custom-food editor, barcode/API, calorie/macros, or food inference

## Documentation Impact

MHB 2.3D makes this foundation user-facing through the Meal Composer and Dynamic Daily Meal Reflection Panel. README, TH/EN/ZH user guides, and `MEAL_COMPOSER_UI.md` describe that presentation; this note remains the canonical implementation boundary for storage and derived facts.

MHB 2.3E adds two backward-compatible Meal Instance descriptors: optional `meal_type` for the broad form a user recognizes, and `condiment_knowledge: "unknown"` only when the user explicitly does not know all condiments. Legacy records normalize to `meal_type: "unspecified"` and blank condiment knowledge. Neither field contributes a sodium value, changes coverage/confidence, or enters the main Reflection renderer.

## MHB 2.3F-I Implementation Addendum: Evidence-Routed Named-Dish Base

MHB 2.3F-I adds a bounded internal named-dish reference layer. It is separate from the immutable Food Reference library and does not change Meal Item ownership, Daily_Log, workbook behavior, UI selection, or the four existing Food Reference sodium values.

Only two human-approved Thai FCD references are present in runtime:

| `dish_id` | Thai FCD identity | Sodium source basis | Runtime estimate |
| --- | --- | --- | --- |
| `fried_rice_pork_vegetable_egg` | food ID 1554 / T56, Fried rice with pork, vegetable and egg | 100 g edible portion | 141-141 mg, `dish_inclusive`, medium confidence |
| `fried_rice_vegetable` | food ID 1553 / T204, Fried rice with vegetables | 100 g edible portion | 268-268 mg, `dish_inclusive`, medium confidence |

`named_dish_id` is an optional, additive Meal Instance field. It routes an estimate only when it exactly matches one of these approved records. Old meals normalize with an empty value; unknown or deferred IDs are retained but fall back to the existing component-only or unknown path. Meal Type and components never auto-match a named dish.

For an approved ID, `deriveMealEstimate()` uses the named-dish base alone. It does not sum recorded components or condiments, so source-prepared ingredients cannot be double-counted. External condiment add-ons remain out of scope. The result exposes `estimate_basis: dish_inclusive`, bounded source/provenance metadata, and `scaling_allowed: false`.

Both references remain at their declared 100-g basis. MHB does not apply `small`, `regular`, `large`, or custom Meal Item multipliers to them and does not present either number as a whole-plate estimate. Their coverage is intentionally `partial`: the direct source is meaningful, but it does not prove the user's consumed meal size or external add-ons. Confidence remains `medium` as an evidence-quality statement independent of coverage.

`deriveDailyMealSummary()` sums one derived base per meal and exposes the bounded `estimate_bases` and `named_dish_ids` arrays so mixed daily evidence does not lose basis visibility. `buildMealReflectionContext()` exposes those derived identifiers only; the existing Reflection renderer and copy remain unchanged.

`green_curry_chicken` and every other researched dish remain absent from runtime. Current public runtime remains **MHB 2.3 - Gentle Meal Composition**.

### MHB 2.3F-UX Confirmation and Consistency Addendum

`getNamedDishCandidates()` exposes only deterministic, structured-component suggestions for the two approved records. Suggestions are nonpersistent and cannot create a sodium estimate. The UI must call `confirmNamedDish()` before it writes `named_dish_id`; rejection and clearing leave Meal Items untouched.

`evaluateNamedDishConsistency()` is the runtime authority for whether a persisted ID can use its dish base. Soft conflicts preserve usability. Evidence conflicts suspend the dish base and make `deriveMealEstimate()` fall back to `component_only` or `unknown`; a stale ID therefore cannot bypass the one-base/evidence-boundary rule.
