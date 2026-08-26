# MHB 2.3 - Meal Composition Data Contract

## 1. Status

- Phase: MHB 2.3
- Patch type: docs-only contract lock
- Status: **Contract Locked for MHB 2.3 Implementation**
- Runtime implementation: none in this patch
- UI implementation: none in this patch
- Daily_Log, workbook, export/import, and schema change: none in this patch

**MHB 2.3 Meal Composition contract is locked for implementation, but MHB 2.3 is not yet the current runtime. MHB 2.2 remains the current runtime.**

This note records the human-approved architectural decisions for Meal Composition. Exact implementation names, local storage keys, workbook columns, validation details, and UI layout remain implementation work, not unresolved product direction.

## 2. Purpose and Product Boundary

Meal Composition lets a user assemble a rough picture of one meal from food items and ingredients, save multiple optional meals in a day, and later read only what has been recorded.

> One meal is information, not a score.

The feature supports gentle, source-bound observation of recorded meal composition, food variety, preparation, approximate sodium distribution, and meal rhythm. It is not a calorie tracker, macro tracker, diet score, sodium score, medical nutrition planner, weight-loss coach, food-compliance system, or adherence tracker.

Meal logging remains optional. A day without meal records means only that no meal data was recorded.

## 3. Locked Decisions

| Decision | Locked contract |
| --- | --- |
| Meal data ownership | Meal records separate from Daily_Log: a canonical source outside `Daily_Log`. |
| Portion | Hybrid portion: user-facing `small`, `regular`, `large`, or `custom`, backed by a portable `serving_multiplier`. |
| Sodium | Sodium range + confidence + provenance; the visible range is primary and a midpoint is never a substitute. |
| Workbook | Relational workbook canonical direction: `Food_Reference`, `Meals`, and `Meal_Items` sheets. |
| Daily summary | Derived from that date's Meal Instances and not persisted by default. |
| Condiments | First-class Food References and Meal Items, never free-text only. |
| Daily meal panel | A Dynamic Daily Meal Reflection Panel re-renders from the current derived summary after meal changes. |
| Daily Reflection | A bounded adapter provides derived meal facts to the existing daily Reflection without changing its root or health interpretation. |

## 4. Canonical Data Ownership

The data flow is:

```text
Food Reference
    -> Meal Item Instances
    -> Meal Instances
    -> Derived Daily Meal Summary
    -> Dynamic Daily Meal Reflection Panel
    -> Bounded Daily Reflection context
```

### Food Reference

A Food Reference is reusable canonical reference data. It describes an item generally, its reference serving, and the evidence supporting any estimate.

### Meal Item Instance

A Meal Item Instance is a user-owned occurrence of a Food Reference in one meal. Portion, preparation, sauce, and user adjustment belong here. Editing an instance must never overwrite its Food Reference.

### Meal Instance

A Meal Instance is one completed composition at one date, with optional time, label, note, and one or more Meal Item Instances. Multiple Meal Instances may share a date.

### Derived Daily Meal Summary

A Daily Meal Summary is derived from the Meal Instances recorded for one local date. It is an adapter/read surface, not an additional source of truth.

### `Daily_Log` boundary

Meal records are separate from `Daily_Log`. `Daily_Log` does not own Meal Items or Meal Instances, and multiple meals must not be forced into a single Daily_Log row. Daily_Log, Reflection, and future Field Review read meal information only through derived summary or bounded adapter layers.

This preserves multiple meals per day, avoids schema growth and stale duplicate summaries, keeps existing workbooks backward-compatible, and retains provenance and uncertainty at the item level.

## 5. Food Reference Contract

### Required fields

| Field | Purpose |
| --- | --- |
| `food_id` | Stable canonical identity. It must not depend on a translated display name. |
| `display_name_th` | Thai display name. |
| `display_name_en` | English display name and portable fallback. |
| `category` | Broad descriptive category, such as grain, animal_protein, plant_protein, vegetable, fruit, soup, condiment, processed_food, dessert, or other. |
| `default_serving_label` | Human-readable reference unit such as bowl, piece, spoon, cup, or serving. |
| `default_serving_amount` | Amount represented by one reference serving. |
| `default_serving_unit` | Unit giving the serving amount meaning. |
| `sodium_estimate_min_mg` | Lower supported estimate for one reference serving, or blank when unknown. |
| `sodium_estimate_max_mg` | Upper supported estimate for one reference serving, or blank when unknown. |
| `sodium_confidence` | `high`, `medium`, `low`, or `unknown`. |
| `source_type` | Minimum provenance class defined in Section 10. |
| `schema_version` | Version of the Food Reference contract, independent from Daily_Log and profile schemas. |

### Optional fields

| Field | Purpose |
| --- | --- |
| `display_name_zh` | Simplified Chinese display name. |
| `source_reference` | Human-readable database, package label, restaurant declaration, or other reference. |
| `preparation_default` | Default preparation only when it is part of the estimate. |
| `is_processed` | Descriptive classification, never a score. |
| `is_condiment` | Explicit condiment discovery and summary support. |
| `is_plant_protein` | Descriptive grouping for derived facts. |
| `is_animal_protein` | Descriptive grouping for derived facts. |
| `notes` | Human-readable serving or estimate boundary; never executable instruction. |

Future Food Reference expansion, such as brands, restaurant identity, regional tags, multiple serving definitions, aliases, and source update management, is outside the first MHB 2.3 implementation.

## 6. Portion Contract

The portion model is locked as hybrid:

```text
portion_label: small | regular | large | custom
serving_multiplier: portable positive multiplier
```

`portion_label` makes entry quick and non-technical. `serving_multiplier` supports estimate scaling, local storage, and workbook transport. It represents a rough reference-serving relationship, not a weighed measurement.

The exact multiplier mapping by food category and the exact allowed custom input shape are implementation-specific decisions. The UI must not require grams and must not imply measured precision.

## 7. Preparation Contract

The initial preparation vocabulary may use:

```text
boiled
steamed
grilled
stir_fried
fried
roasted
raw
soup
unknown
```

Preparation is descriptive. It may affect an estimate when broth, batter, sauce, or seasoning is relevant, and may later support source-bound reflection. It must not become a moral score. `unknown` is an explicit state; blank means not recorded. Preparation alone does not establish sodium level.

## 8. Condiments Are First-Class

Condiments are Food References and Meal Item Instances in their own right. Initial references may include:

```text
fish_sauce
soy_sauce
oyster_sauce
seasoning_powder
soup_base
dipping_sauce
```

This is required because seasoning, broth, and dipping sauces may contribute more supported sodium estimate than the main protein. Free-text notes may supplement a meal, but they must not silently generate a numeric estimate. Meal presets may include inspectable, editable condiment items in a later UI specification.

## 9. Meal and Meal Item Instance Contract

### Meal Instance

| Field | Purpose |
| --- | --- |
| `meal_id` | Stable local identifier that can survive export/import. |
| `date` | Required local calendar date using MHB's canonical date normalization. |
| `time` | Optional local time. |
| `meal_label` | `breakfast`, `lunch`, `dinner`, `snack`, `late_meal`, `custom`, or `unnamed`. |
| `custom_meal_label` | Optional display label when `meal_label` is `custom`. |
| `items` | One or more Meal Item Instances. |
| `meal_note` | Optional user-owned text; never executable instruction. |
| `estimated_sodium_min_mg` | Derived from item estimates or retained as an auditable snapshot only after a later implementation decision. |
| `estimated_sodium_max_mg` | Derived from item estimates or retained as an auditable snapshot only after a later implementation decision. |
| `estimate_confidence` | Conservative derived confidence. |
| `created_at` | System-managed audit timestamp. |
| `updated_at` | System-managed audit timestamp for explicit edits. |

`unnamed` allows a user to record a meal without imposing breakfast/lunch/dinner structure.

### Meal Item Instance

| Field | Purpose |
| --- | --- |
| `meal_item_id` | Stable identity within a meal. |
| `meal_id` | Parent relationship in tabular storage. |
| `food_id` | Link to the Food Reference. |
| `display_name_snapshot` | Optional display snapshot if a reference name later changes. |
| `portion_label` | User-facing rough portion. |
| `serving_multiplier` | Portable estimate multiplier. |
| `preparation` | Preparation selected for this occurrence. |
| `user_adjustment` | Optional bounded note such as less sauce; no automatic numeric inference. |
| `sodium_estimate_min_mg` | Instance estimate after supported portion/preparation adjustment, or blank. |
| `sodium_estimate_max_mg` | Instance estimate after supported portion/preparation adjustment, or blank. |
| `confidence` | Instance confidence. |
| `source_type` | Provenance snapshot used for the instance estimate. |
| `source_reference` | Optional auditable source snapshot. |

## 10. Sodium Estimate and Provenance Contract

The canonical sodium representation is:

```text
sodium_estimate_min_mg
sodium_estimate_max_mg
sodium_confidence
source_type
source_reference
```

Visible sodium uses the range as primary. A future midpoint may be a clearly secondary derived convenience value, but may never replace the displayed range or be stored as more authoritative evidence.

Allowed candidate `source_type` values are:

```text
reference_database
package_label
restaurant_declared
user_entered
system_default
unknown
```

- Package labels may have higher confidence when the product and serving match.
- A single ingredient may have a more stable reference estimate, while portion and preparation still matter.
- Restaurant and mixed dishes commonly need wider, lower-confidence ranges.
- `user_entered` is not automatically invalid; confidence depends on its evidence.
- `system_default` must remain identifiable as a system estimate, not measured truth.

There is no medical sodium target, daily limit, diagnosis, or clinical recommendation in MHB 2.3.

### Mandatory estimate rules

- `unknown` is not zero.
- Both bounds blank mean the estimate is unknown.
- One bound without the other is structurally incomplete and needs explicit normalization or rejection in the future implementation contract.
- `min` must be less than or equal to `max`.
- Zero is valid only when supported for the stated serving.
- Derived meal/day ranges sum known lower and upper bounds separately.
- A materially unknown item makes coverage partial or unknown; it must not be presented as a complete total.
- Wider supported ranges are more honest than false precision.

## 11. Derived Daily Meal Summary

The Daily Meal Summary is derived, not persisted by default. It re-computes from Meal Instances for the selected date, so it cannot become a second stale truth.

Candidate derived facts are:

| Field | Meaning |
| --- | --- |
| `recorded_meal_count` | Count of Meal Instances recorded for that date. |
| `estimated_sodium_min_mg` | Lower bound from supported recorded items, with coverage context. |
| `estimated_sodium_max_mg` | Upper bound from supported recorded items, with coverage context. |
| `sodium_estimate_coverage` | `complete`, `partial`, or `unknown` coverage of recorded items. |
| `animal_protein_meals` | Recorded meals containing explicitly classified animal-protein items. |
| `plant_protein_meals` | Recorded meals containing explicitly classified plant-protein items. |
| `vegetable_present_meals` | Recorded meals containing explicitly classified vegetable items. |
| `fried_food_meals` | Recorded meals containing items recorded with fried preparation. |
| `processed_food_meals` | Recorded meals containing explicitly classified processed-food items. |
| `meals_with_recorded_condiments` | Recorded meals containing condiment items. |

Each field describes recorded data only. For example, zero `vegetable_present_meals` means no vegetable item was recorded among recorded meals; it does not prove that no vegetables were eaten.

Forbidden fields include `meal_score`, `health_score`, `diet_score`, `sodium_score`, `good_meal_count`, and `bad_meal_count`.

## 12. Dynamic Daily Meal Reflection Panel

The future Meal Composer workspace includes a Dynamic Daily Meal Reflection Panel beneath the composition area.

Whenever the user adds, edits, or deletes a meal; changes portion or preparation; or adds/removes a condiment, the system must derive that day's Daily Meal Summary again and re-render the panel. The summary remains derived and is not duplicated into persistent storage by default.

The panel is a daily reflection surface. It is not a score, diet dashboard, or medical warning panel.

It may state bounded facts such as:

- how many meals are recorded today
- recorded protein categories or vegetables
- whether supported sodium estimates are partly associated with recorded soup or condiment items
- whether some recorded items do not have enough estimate support

It must not say that a day or meal was good/bad, that sodium was bad, that a diet failed, or that a health score changed.

## 13. Daily Reflection Integration

Meal Composition has a bounded adapter responsibility:

```text
Meal Records
    -> derive Daily Meal Summary
    -> build bounded meal reflection context for a date
    -> existing Daily Reflection
```

The eventual adapter provides only derived facts needed for language, including:

- recorded meal count
- sodium estimate range and coverage
- recorded protein categories and vegetable presence
- recorded fried/processed presence
- recorded condiment/soup contribution
- optional meal timing when recorded
- unknown and confidence flags

Raw Meal objects, free-text notes, and unsupported inferences must not be passed wholesale into Reflection. Meal data must not override the user-selected Reflection Root, change deterministic health interpretation, or override safety/source-data authority.

Reflection language remains factual, gentle, concise, non-scoring, non-diagnostic, free from guilt, and visibly uncertain where coverage is incomplete.

### Source-bound language rules

- Say: “There are 2 meals recorded today.” Do not say: “You ate 2 meals today.”
- Say: “Among the meals recorded, no vegetable item appears yet.” Do not say: “You did not eat vegetables today.”
- Do not infer no condiments from missing condiment records.
- Do not infer low sodium from unknown sodium.
- Return attention to the day’s recorded information; do not imply a requirement to log all meals.

## 14. Future Field Review Boundary

Future Field Review may describe selected-window recorded facts, for example meal-record count, plant-protein appearance, or the supported share of sodium estimate associated with recorded soup/condiment items.

It must retain recorded-data qualifiers and estimate uncertainty. It must not score, rank, make causal or disease inferences, or use moral judgment. Field Review integration is deferred until bounded Daily Reflection integration is implemented and evaluated.

## 15. Workbook Direction

Relational sheets are the canonical workbook direction:

```text
Food_Reference
Meals
Meal_Items
```

These sheets preserve canonical reference ownership, user-owned occurrences, relationships, provenance, and uncertainty. Meal sheets are optional additions; existing workbooks without them remain valid and current profile/Daily_Log behavior remains unchanged.

A flattened `Meal_Log` may be added later only as a derived, read-only convenience view. It is not a canonical source and must not become an alternate import authority.

Exact relational column order, export timing, import validation/conflict behavior, referenced-library export policy, and workbook schema versioning belong to the next implementation contract.

## 16. Missing and Unknown Rules

The following are mandatory:

- unknown ≠ zero
- blank is not healthy, low, or absent
- blank condiment is not no condiment
- unknown sodium is not low sodium
- unrecorded ≠ not eaten or skipped
- an absent food category is not proof it was not eaten
- partial estimate coverage must be disclosed
- unsupported values must not silently receive invented defaults
- free-text notes must not become hidden numeric or AI inference

## 17. MHB 2.3 Intended Scope

The intended bounded MHB 2.3 implementation includes:

- a small static Food Reference pilot
- first-class condiments
- local Meal Instance storage with multiple meals per day
- hybrid portion handling
- sodium range, confidence, and provenance
- a 2D Meal Composer launched from Today
- a Dynamic Daily Meal Reflection Panel
- derived Daily Meal Summary
- bounded Daily Reflection integration
- optional relational workbook export/import after the runtime contract is stable

Meal Composition belongs under Today as a daily input flow alongside Water, Drinks, Activity, and Mind Note. It does not add a top-level navigation tab in the first implementation.

## 18. Deferred Features and Implementation Questions

### Deferred to MHB 2.4+ or later backlog

- package barcode scanning
- restaurant search or API integration
- large/cloud nutrition databases
- automatic photo food recognition
- calorie or macro tracking
- medical sodium targets or kidney-specific prescription
- long-range advanced food analytics
- AI-generated food inference
- automatic condiment guessing
- flattened `Meal_Log` as a canonical source
- 3D Meal Composer

### Remaining implementation-specific questions

- exact enum and workbook column naming
- first Food Reference pilot item list
- category-specific portion multiplier mapping
- local storage key and storage version
- custom-food editor timing and bounded contract, if included
- relational workbook column order and referenced-library export policy
- import validation, conflict, preview, and confirmation behavior
- exact visual layout and interaction details of the Meal Composer and panel
- exact Daily Reflection wording and localization

These questions must not reopen the locked ownership, portion, sodium, workbook, daily-summary, condiment, panel, or bounded-adapter decisions above.

## 19. Non-Goals

MHB 2.3 does not implement a calorie/macro tracker, medical recommendation engine, diet compliance system, food score, hidden food inference, automatic synchronization, or user obligation to log every meal.

This contract does not itself change runtime storage, Daily_Log, workbook schema, export/import, Reflection logic, Field Review, Signal Engine, User Intention Profile, UI, or current-version label.

## 20. Implementation Acceptance Direction

The implementation is aligned with this contract only when:

- Meal records remain separate from `Daily_Log`.
- The hybrid portion model retains both simple labels and portable multipliers without false precision.
- Sodium remains range + confidence + provenance, with partial coverage visible.
- Condiments are selectable first-class items.
- Daily summary and the daily panel derive from current Meal Instances rather than create duplicated persistent facts.
- Daily Reflection receives only bounded derived context and preserves its existing root/safety authority.
- Workbook canonical ownership remains relational.
- User-facing text never converts unrecorded data into claims about what was eaten or omitted.

## 21. Documentation Impact

Runtime documentation update not required; design contract only. README and user guides continue to describe the current MHB 2.2 runtime. The design-notes index identifies this file as a locked MHB 2.3 candidate with implementation pending.
