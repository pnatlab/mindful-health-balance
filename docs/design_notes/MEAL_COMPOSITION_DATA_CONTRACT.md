# MHB 2.3A - Meal Composition Data Contract

## 1. Status

- Phase: MHB 2.3A
- Patch type: docs-only architecture and data-contract design
- Status: Draft for Human Review
- Runtime implementation: none
- UI implementation: none
- Daily_Log or workbook change: none

**MHB 2.3 - Gentle Meal Composition is a planned candidate direction, not the current runtime. The current app version remains MHB 2.2.**

## 2. Purpose

Meal Composition should let a user assemble a rough picture of one meal from food items and ingredients, save more than one meal in a day, and later review a daily or multi-day food picture without turning food into a score.

The design priority is honest uncertainty before visual richness:

> One meal is information, not a score.

The feature may help a user notice meal composition, food variety, preparation, approximate sodium distribution, and meal timing. It must not become a calorie tracker, macro tracker, diet score, sodium score, medical nutrition planner, weight-loss coach, or food-compliance system.

The intended flow is:

```text
Food Reference
    -> choose food and condiment items
    -> Meal Item Instances
    -> Meal Instance
    -> optional additional meals
    -> derived Daily Meal Summary
    -> bounded future Reflection / Field Review
```

Meal logging remains optional. A day without meal records means only that no meal data was recorded.

## 3. Design Principles

The contract should remain:

- local-first and user-owned
- source-bound and inspectable
- approximate where the source is approximate
- multilingual at the display layer
- readable by humans, Excel, parsers, and a user-chosen Local LLM workflow
- backward-compatible with workbooks that contain no meal sheets
- non-scoring, non-diagnostic, and free from guilt

The contract must not silently turn:

- unknown into zero
- a blank condiment list into "no condiment"
- a sodium estimate into a medical recommendation
- a larger portion into a moral judgment
- a preparation method into a healthy/unhealthy label
- an absent meal record into fasting, restriction, or skipped eating

## 4. Data Layers

The proposed model has three ownership layers.

### Layer A - Food Item / Ingredient Reference

A reusable reference describes what an item generally is and what evidence supports its estimate. It is not a record of what the user ate in a particular meal.

Examples include rice, chicken breast, egg, fish, tofu, vegetables, soup, fish sauce, soy sauce, fried food, and dessert. Condiments are first-class food references.

### Layer B - Meal Instance

A meal instance records one composition at one date/time. It contains meal item instances with the user's selected portion and preparation for that meal.

The same food reference may appear in many meals without being overwritten.

### Layer C - Daily Meal Summary

A daily summary is derived from meal instances for one date. It provides a compact reading surface for future Today, Reflection, Field Review, or workbook summary use.

The default direction is to derive this layer rather than persist it. Persistence should be introduced only if a later implementation proves that performance, auditability, or workbook use requires a snapshot.

## 5. Food Reference Candidate Contract

### 5.1 Required candidates for an initial contract

| Field | Type | Purpose |
| --- | --- | --- |
| `food_id` | stable string ID | Canonical identity used by meal item instances. Must not depend on a translated display name. |
| `display_name_th` | text | Thai display name. Blank is allowed only if the initial library explicitly chooses another canonical display language. |
| `display_name_en` | text | English display name and portable fallback for parsers/Excel. |
| `category` | enum | Broad descriptive class such as grain, animal_protein, plant_protein, vegetable, fruit, soup, condiment, processed_food, dessert, or other. |
| `default_serving_label` | text | Human-readable unit such as bowl, piece, spoon, cup, or serving. |
| `default_serving_amount` | number | Amount represented by one reference serving. |
| `default_serving_unit` | enum/text | Unit that gives `default_serving_amount` meaning. |
| `sodium_estimate_min_mg` | number or blank | Lower supported estimate for the reference serving. Blank means unavailable, not zero. |
| `sodium_estimate_max_mg` | number or blank | Upper supported estimate for the reference serving. Blank means unavailable, not zero. |
| `sodium_confidence` | enum | `high`, `medium`, `low`, or `unknown`. |
| `source_type` | enum | Provenance class defined in Section 12. |
| `schema_version` | version string/integer | Version of the food-reference contract, independent from Daily_Log and profile schema versions. |

These fields form the smallest useful contract because identity, serving meaning, uncertainty, provenance class, and version must survive export/import.

### 5.2 Optional candidates for an initial contract

| Field | Type | Purpose |
| --- | --- | --- |
| `display_name_zh` | text | Simplified Chinese display name. Recommended when the first library is localized in parallel. |
| `source_reference` | text | Human-readable database name, package label note, restaurant reference, or URL/reference identifier. |
| `preparation_default` | enum | Default preparation when it is part of the reference estimate. |
| `is_processed` | boolean or blank | Descriptive flag; blank means not classified. Must not become a score. |
| `is_condiment` | boolean | Makes condiment discovery and summaries explicit. |
| `is_plant_protein` | boolean or blank | Descriptive grouping for later review. |
| `is_animal_protein` | boolean or blank | Descriptive grouping for later review. |
| `notes` | text | Human-readable estimate boundary or serving clarification; never executable instructions. |

Category may make some boolean flags redundant. The implementation contract should decide whether flags improve querying enough to justify duplication.

### 5.3 Future candidates

These should not be required in the first implementation:

- `source_name`
- `source_url_or_reference` as a separate structured field
- `source_updated_at`
- brand or restaurant identity
- region/cuisine tags
- multiple serving definitions per food
- preparation-specific estimate variants
- user-created aliases
- superseded/deprecated reference links

They may improve auditability later, but requiring them now would make the first library and import flow larger than necessary.

## 6. Sodium Estimation Contract

### 6.1 Representation

The preferred representation is a range plus confidence and provenance:

```text
sodium_estimate_min_mg
sodium_estimate_max_mg
sodium_confidence
source_type
source_reference (optional)
```

A single exact-looking value must not be generated from weak support. For example, a restaurant mixed dish should not be presented as `1,327 mg` unless a reliable declared source actually provides that value for the selected serving.

### 6.2 Confidence semantics

| Confidence | Meaning |
| --- | --- |
| `high` | The estimate closely matches the selected item and serving, such as a current package label or restaurant-declared value. It is still not a clinical measurement. |
| `medium` | A reasonably matched reference exists, but brand, preparation, or serving variation remains. |
| `low` | A broad estimate is available for a mixed dish, restaurant item, or uncertain portion. The range should remain visibly wide enough to express that uncertainty. |
| `unknown` | There is not enough support to provide a range. Both estimate values should remain blank. |

### 6.3 Source-dependent behavior

- A package label may support higher confidence when the serving and product match.
- A single ingredient may have a more stable reference estimate, while preparation still matters.
- Restaurant and mixed dishes commonly need lower confidence and wider ranges.
- Condiments, dipping sauces, seasoning powder, and soup base can shift the meal estimate substantially.
- User-selected portion and preparation may widen or scale the range.
- A package or restaurant declaration may be exact in its source but still depend on the declared serving.

### 6.4 Range rules

- Both bounds blank means unknown.
- One bound without the other is invalid for a complete range and requires normalization or rejection in a future import contract.
- `min` must be less than or equal to `max`.
- Zero is valid only when a source supports zero for the stated serving; it is not the fallback for blank.
- Summing meal ranges means summing known lower bounds and known upper bounds separately.
- If one or more materially relevant items are unknown, the meal estimate must disclose incomplete coverage rather than imply a complete total.
- A midpoint may be derived for internal display convenience only after human approval. It must not replace the visible range or be stored as a more authoritative value.

No medical sodium target, daily limit, diagnosis, or clinical recommendation belongs in MHB 2.3A.

## 7. Portion Model

### Option A - Qualitative size

Values: `small`, `regular`, `large`.

| Dimension | Assessment |
| --- | --- |
| Ease of use | Highest |
| Estimate quality | Low to medium; mapping differs by item |
| Portability | Good if size semantics are documented |
| UI complexity | Low |
| False precision risk | Low, but hidden size-to-number assumptions can be unclear |

### Option B - Serving multiplier

Values such as `0.5`, `1`, `1.5`, or `2` servings.

| Dimension | Assessment |
| --- | --- |
| Ease of use | Medium |
| Estimate quality | Medium when the reference serving is clear |
| Portability | High |
| UI complexity | Low to medium |
| False precision risk | Medium if users interpret the multiplier as measured intake |

### Option C - Hybrid model (preferred direction)

Store a serving multiplier as the portable value and offer simple UI choices mapped to documented multipliers. An optional explicit amount may be deferred.

Candidate item fields:

```text
portion_label: small | regular | large | custom
serving_multiplier: 0.5 | 1 | 1.5 | 2 | other positive number
```

The display label supports low-friction entry; the multiplier supports export and estimate scaling. A future UI must make clear that these are rough portions, not weighed measurements. The exact mapping remains a human-review decision because `small` and `large` may need category-specific defaults.

## 8. Preparation Contract

Candidate enum:

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

Preparation is descriptive. It may affect sodium estimates when seasoning, broth, batter, or sauce is part of the preparation, and it may support future reflection about meal composition. It must not be converted into a moral score.

`unknown` is a valid explicit state. A blank value means preparation was not recorded. A future normalizer may distinguish blank from explicit unknown if that difference is useful.

Preparation alone cannot safely determine sodium. For example, `grilled` does not mean low sodium, and `soup` does not establish a fixed sodium amount.

## 9. Condiments as First-Class Items

Condiments must be selectable food references rather than hidden only in meal free text. Candidate items include:

- fish sauce
- soy sauce
- oyster sauce
- seasoning powder
- soup base
- dipping sauce

This matters because a meal's sodium estimate may depend more on seasoning and broth than on its main protein. Treating condiments as item instances also preserves provenance, portion, uncertainty, and import/export visibility.

Free-text meal notes may still describe an unknown sauce, but that note must not silently generate a sodium estimate. A future UI may offer meal presets that include condiment defaults, provided the user can inspect and adjust them.

## 10. Meal Instance Contract

Candidate structure for one completed composition:

| Field | Requirement | Purpose |
| --- | --- | --- |
| `meal_id` | Required | Stable local identifier; must survive export/import. |
| `date` | Required | Local calendar date in the same canonical date style used by MHB. |
| `time` | Optional | Local time if the user records it; blank must remain valid. |
| `meal_label` | Required enum | `breakfast`, `lunch`, `dinner`, `snack`, `late_meal`, `custom`, or `unnamed`. |
| `custom_meal_label` | Conditional optional | Display text used only when `meal_label` is `custom`. |
| `items` | Required collection | One or more meal item instances for a saved composition. |
| `meal_note` | Optional | User-owned plain text; never parsed as executable instruction. |
| `estimated_sodium_min_mg` | Derived or snapshot candidate | Sum of supported item lower bounds, with incomplete-coverage status when needed. |
| `estimated_sodium_max_mg` | Derived or snapshot candidate | Sum of supported item upper bounds, with incomplete-coverage status when needed. |
| `estimate_confidence` | Derived candidate | Conservative meal-level confidence, never higher than materially important low-confidence components. |
| `created_at` | System-managed | Audit timestamp. |
| `updated_at` | System-managed | Audit timestamp for explicit edits. |

The first implementation should decide whether meal-level sodium totals are derived on read or saved as an auditable snapshot. If saved, the underlying item ranges and provenance remain authoritative and must travel with the meal.

An `unnamed` meal supports users who do not organize eating into breakfast/lunch/dinner. Multiple meal instances per date are allowed, and meal logging may remain blank for the entire day.

## 11. Meal Item Instance Contract

Food Reference and Meal Item Instance have different ownership.

| Field | Requirement | Purpose |
| --- | --- | --- |
| `meal_item_id` | Required | Stable identity within a meal. |
| `meal_id` | Required in tabular storage | Parent relationship. |
| `food_id` | Required for reference-backed item | Links to Food Reference without copying ownership. |
| `display_name_snapshot` | Optional candidate | Preserves what the user saw if a reference name later changes. |
| `portion_label` | Optional | Human-facing rough size. |
| `serving_multiplier` | Required for estimated reference item | Scales the documented serving. |
| `preparation` | Optional enum | Actual preparation selected for this meal. |
| `user_adjustment` | Optional plain text | A bounded note such as less sauce; it must not become automatic numeric inference. |
| `sodium_estimate_min_mg` | number or blank | Item estimate after portion/preparation adjustment, if supported. |
| `sodium_estimate_max_mg` | number or blank | Item estimate after portion/preparation adjustment, if supported. |
| `confidence` | enum | Confidence for this item instance. |
| `source_type` | Recommended snapshot | Provenance used for this estimate. |
| `source_reference` | Optional snapshot | Human-auditable source reference. |

Changing an item instance must never overwrite the Food Reference. A user selecting `large`, adding sauce, or choosing `fried` changes only that meal item instance.

A future custom-food flow may allow an instance without a canonical `food_id`, but that policy should be decided before implementation. If allowed, custom identity and provenance must remain explicit.

## 12. Source and Provenance

Candidate `source_type` enum:

```text
reference_database
package_label
restaurant_declared
user_entered
system_default
unknown
```

Minimum viable provenance is `source_type` plus one optional human-readable `source_reference` field. This answers two practical questions without over-design:

1. Where did this estimate come from?
2. How much confidence should a reader place in it?

Future structured provenance may add `source_name`, `source_url_or_reference`, and `source_updated_at`. Those fields should remain optional until the reference-library ownership and update process are approved.

`user_entered` is not inherently less valid than a system default; confidence depends on what the user entered and its source. `system_default` must identify itself and must not appear as measured truth.

## 13. Daily Meal Summary

The preferred direction is a derived summary from all meal instances on one date.

### Meaningful initial candidates

| Field | Assessment |
| --- | --- |
| `meal_count` | Useful count of recorded meal instances; must be described as recorded meals, not meals actually eaten. |
| `estimated_sodium_min_mg` | Useful only with coverage disclosure. |
| `estimated_sodium_max_mg` | Useful only with coverage disclosure. |
| `sodium_estimate_coverage` | Recommended derived metadata such as complete, partial, or unknown. |
| `animal_protein_meals` | Potentially useful descriptive presence count. |
| `plant_protein_meals` | Potentially useful descriptive presence count. |
| `vegetable_present_meals` | Potentially useful if based on explicit item categories. |
| `fried_food_meals` | Descriptive preparation count; must not become judgment. |
| `processed_food_meals` | Potentially useful but depends on clear classification ownership. |

### Candidates to defer or clarify

| Field | Concern |
| --- | --- |
| `sweet_drink_meals` | May duplicate the existing Drinks contract and create ownership ambiguity. Prefer linking by date/time only after a clear rule exists. |
| `condiment_heavy_meals` | `heavy` is judgment-prone and requires an unapproved threshold. Prefer `meals_with_recorded_condiments` or defer. |

Forbidden summary fields include `meal_score`, `health_score`, `diet_score`, `sodium_score`, `good_meal_count`, and `bad_meal_count`.

Daily summary values must distinguish recorded presence from actual absence. For example, zero vegetable-present meals among two recorded meals means no vegetable item was recorded in those meal records; it does not prove the user ate no vegetables that day.

## 14. Relationship to Daily_Log

The current `Daily_Log` contract is one row per date. Meal Composition supports multiple meal instances and multiple item instances per date.

### Option A - Store meal summary fields in Daily_Log

Possible examples: meal count and daily sodium range.

Advantages:

- simple access for existing Reflection and Field Review paths
- one-row daily export remains convenient
- Local LLM can see a compact daily picture

Risks:

- expands a stable schema
- loses meal/item detail unless another source also exists
- creates duplication when detailed meal records are stored elsewhere
- requires summary refresh whenever a meal changes
- makes import conflict and backward compatibility more complex

### Option B - Keep meal records separate and derive daily information (preferred ownership model)

Meal and item records are the source of truth. Daily_Log may query or reference a derived summary without owning meal data.

Advantages:

- naturally supports multiple meals and items per day
- keeps Daily_Log backward-compatible
- preserves item provenance and uncertainty
- avoids stale duplicated summaries
- provides clearer workbook and Local LLM audit paths
- allows future Field Review to select meal-specific or daily views

Risks:

- requires joins by date or meal ID
- import/export validation becomes relational
- current Reflection code would need a bounded adapter later

Preferred direction: Option B. Do not add Daily_Log meal columns in the first implementation unless a later human-approved contract identifies a minimal, non-duplicative reference field. Daily summaries should initially be derived from the separate meal source.

## 15. Workbook Shape Options

No workbook shape is final in MHB 2.3A.

### Option 1 - Relational sheets

Candidate sheets:

```text
Food_Reference
Meals
Meal_Items
```

Advantages:

- strongest separation of canonical reference and user-owned instances
- avoids repeating full food metadata for every meal item
- clear provenance and update boundaries
- supports multiple meals/items naturally
- good parser and Local LLM contract when relationships are documented

Trade-offs:

- requires joins across sheets
- less immediately readable for casual Excel users
- import must validate IDs, parent relationships, duplicates, and missing references
- Food Reference export policy must decide whether to include the whole library or only referenced items

### Option 2 - Flattened `Meal_Log`

One row per meal item, with repeated meal fields:

```text
Meal_ID
Date
Time
Meal_Label
Meal_Item_ID
Food_ID
Food_Name
Portion_Label
Serving_Multiplier
Preparation
Sodium_Min_mg
Sodium_Max_mg
Confidence
Source_Type
Source_Reference
```

Advantages:

- easy to filter and inspect in one Excel sheet
- one row is independently useful to many parsers and Local LLMs
- simpler export surface

Trade-offs:

- repeats meal and food display data
- weaker canonical-reference ownership
- edits can create inconsistent duplicate meal metadata
- import needs grouping and conflict rules
- source updates are difficult to distinguish from meal-time snapshots

Provisional preference: relational sheets better preserve source-bound ownership, while a flattened export is easier for humans. Human review should decide whether v1 prioritizes canonical clarity or single-sheet portability. A later contract may also consider relational canonical sheets plus a derived, read-only flattened view, but that may be too large for MHB 2.3.

Old workbooks without meal sheets must remain valid. Meal sheets, if implemented, must be optional and must not alter existing Daily_Log/profile import behavior.

## 16. Missing and Unknown Values

The following rules are mandatory for any later implementation:

- Unknown is not zero.
- Blank is not healthy, low, or absent.
- Missing condiment data does not mean no condiment was used.
- Unknown sodium does not mean low sodium.
- An unrecorded meal does not mean a skipped meal.
- An absent food category does not prove it was not eaten.
- A partial meal estimate must disclose partial coverage.
- Unsupported values must not be silently replaced with invented defaults.
- A broad, low-confidence range is preferable to false precision when some support exists.
- Explicit `unknown` is preferable when support is insufficient.

Future import should reject structurally impossible ranges and preserve valid partial records without inventing missing estimates.

## 17. Future Reflection Boundary

Meal Composition may later support Reflection wording about:

- recorded meal composition
- food variety visible in the records
- approximate sodium distribution and its uncertainty
- preparation methods
- meal timing or rhythm

Reflection must remain source-bound and may say that the data is incomplete. It must not label food or meals as healthy/unhealthy, good/bad, clean/cheat, failed diet, sodium failure, kidney-safe, or medically appropriate.

Raw meal notes must remain user-owned text and must not become executable prompt instructions. Meal data must not change Reflection Root or override health and safety boundaries without a separate human-approved contract.

## 18. Future Field Review Boundary

A future Field Review may describe observations such as:

- 12 meal records were saved in the selected seven-day window
- much of the supported sodium estimate came from recorded soup or condiment items
- plant-protein items appeared in three recorded meals

Every statement must retain the recorded-data qualifier and estimate uncertainty. Field Review must not add scoring, ranking, shame language, disease inference, medical claims, or causal claims.

Timeframes such as 7, 14, or 30 days should operate on recorded meal instances, not imply complete dietary coverage.

## 19. Conceptual UI Direction

This note does not define UI. A later design phase may explore:

- entry from Today into a Meal Composer workspace
- 2D composition before any more complex visual form
- selecting or placing food and condiment items
- one completed composition becoming one meal instance
- optional, effectively unbounded meal count per day within practical local storage limits
- leaving all meal fields blank without penalty

There is no 3D requirement. No HTML, CSS, JavaScript, visual component, or interaction contract is implemented by MHB 2.3A.

## 20. Non-Goals

MHB 2.3A does not define or implement:

- calorie or macro tracking
- medical sodium targets
- weight-loss plans
- food compliance or adherence
- meal, diet, health, or sodium scores
- final food database contents
- final workbook schema
- runtime storage keys
- Daily_Log columns
- export/import behavior
- Reflection or Field Review logic
- a custom-food editor
- package scanning
- restaurant search
- cloud sync or account identity

## 21. Suggested Implementation Slices After Approval

A bounded sequence could be:

1. Approve reference, meal, and item ownership plus portion/sodium semantics.
2. Lock local runtime storage and normalization contract without UI polish.
3. Build a small static Food Reference pilot including first-class condiments.
4. Build a 2D Meal Composer and multiple-meal Today flow.
5. Add optional workbook export, then separately design import confirmation/conflict behavior.
6. Add bounded Daily Meal Summary.
7. Evaluate Reflection and Field Review only after real user-entered meal data exists.

Items such as custom foods, large reference-library management, package/restaurant integrations, advanced provenance, and long-range food review may be better deferred to MHB 2.4.

## 22. Human Review Questions

1. Should meal records remain a separate source from Daily_Log, with Daily_Log reading only derived information?
2. Should the first portion model use qualitative sizes, serving multipliers, or the proposed hybrid?
3. Should sodium display use range only, or range plus a visibly secondary derived midpoint?
4. Should Food Reference live in repo-managed static JSON, an optional workbook sheet, or both with explicit ownership?
5. Should users be able to create custom food items in the first runtime version?
6. May a package-label value override a system estimate when serving and product match, and how should that override be audited?
7. How wide or explicit should low-confidence ranges be for restaurant and mixed dishes?
8. Must users select condiments each time, or may inspectable meal presets include editable condiment items?
9. Should Daily Meal Summary always be derived, or should export preserve a dated summary snapshot?
10. How much sodium language belongs in daily Reflection before it becomes too numeric or clinical?
11. How should 7/14/30-day Field Review describe recorded food patterns while making incomplete logging visible?
12. Which capabilities should move to MHB 2.4 so MHB 2.3 remains a bounded Meal Composer rather than a nutrition platform?

## 23. Decision Summary

The strongest provisional direction is:

- separate Food Reference from user-owned Meal Item Instances
- treat condiments as first-class items
- represent sodium as range + confidence + provenance
- use a low-friction hybrid portion model
- keep Meal Instances separate from Daily_Log
- derive Daily Meal Summary initially
- preserve unknown and partial coverage explicitly
- defer final workbook shape and advanced food-library ownership to human review

These are design recommendations, not current runtime facts or an approved implementation contract.
