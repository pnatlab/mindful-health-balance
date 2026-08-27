# MHB 2.3F-R - Meal Sodium Estimation Research & Evidence Model

## Status and Scope

- Status: research and evidence architecture only; no runtime, UI, workbook, or version change.
- Current public runtime: **MHB 2.3 - Gentle Meal Composition**.
- Intended next step: MHB 2.3F-C, a bounded human contract decision before implementation.

This note asks when MHB has enough evidence to produce a sodium estimate for a real meal, especially food purchased from made-to-order shops, restaurants, or delivery services. It does not set daily sodium targets, prescribe a diet, diagnose a condition, or make a food-quality judgment.

> Estimate from evidence, not from meal appearance or category alone.

> When a meal is only partly known, preserve partial knowledge instead of collapsing it into one confident number.

## Current MHB Baseline

Meal records are canonical and separate from `Daily_Log`. A Meal Item Instance owns its selected Food Reference, portion, preparation, and any supported snapshot estimate. The current runtime derives meal and day ranges by summing known item ranges only:

- `complete`: every recorded item has a supported range;
- `partial`: at least one recorded item has a range and at least one does not;
- `unknown`: no recorded item has a supported range.

Derived confidence is deliberately conservative: incomplete coverage produces `unknown`; complete coverage takes the weakest relevant item confidence. `meal_type` records broad observable form only, and `condiment_knowledge: "unknown"` is an explicit statement that all condiments are not known. Neither field currently supplies a number. Blank condiment knowledge means no such statement was recorded, not that a meal had no condiment.

The current Food Reference pilot has exactly four human-reviewed sodium references: large boiled egg, regular fish sauce, regular soy sauce, and generic oyster sauce. The other pilot references remain unknown. This is the correct baseline for MHB 2.3F-R: known estimates are source-bound, ranges are visible, and unknown is not converted to zero.

## Research Sources and Evidence Landscape

| Source | What it supports | Limits for MHB meal estimates |
| --- | --- | --- |
| [Thai Food Composition Database v3, INMU/Mahidol (2025)](https://inmu.mahidol.ac.th/thaifcd/) | Official Thai food-composition reference; searchable food data reviewed under FAO/INFOODS guidance. | Each eventual use must retain the exact food name, preparation, and serving basis. Database availability does not make an unverified dish match universal. |
| [FAO catalogue entry for Thai FCD](https://www.fao.org/food-composition/tables-and-databases/detail/%28thailand--2025%29-thai-food-composition-database/en) | Confirms the current 2025 Thai FCD provenance and online searchable form. | Catalogue metadata is not food-specific sodium evidence. |
| [Nutrient Profiles of Thai Cuisine, JNAT (2025)](https://he01.tci-thaijo.org/index.php/JNAT/article/view/276675) | Shows Thai cooked-food analysis across 2,347 recipes and that serving definition matters; categories were separated because profiles differed. | Computed recipe/category findings are useful for research context, not a universal lookup for a shop meal. |
| [Ready-cooked foods sampled in southern Thailand](https://pubmed.ncbi.nlm.nih.gov/17392077/) | Compared samples of dish types bought from four shops and reported substantial differences between component-database calculations and cooked-meal values. | Regional, historical, and limited sample; supports caution rather than a reusable national number. |
| [Bangkok delivery-menu laboratory study](https://pubmed.ncbi.nlm.nih.gov/36901000/) | Analysed 600 menu items from 15 restaurants for popular delivery foods, demonstrating restaurant-specific ready-to-eat evidence can exist. | Study population/menu period does not automatically identify a user's current restaurant portion. |
| [Papaya-salad seasoning study](https://pubmed.ncbi.nlm.nih.gov/33612589/) | Demonstrates sauce/vendor formulation can materially alter sodium in a prepared Thai dish. | One dish and intervention setting; it does not justify a universal hidden-condiment adjustment. |
| Existing [Food Reference evidence audit](MEAL_COMPOSITION_FOOD_REFERENCE_EVIDENCE_AUDIT.md) | Documents the four approved reference ranges and their USDA/manufacturer/Mahidol provenance. | It intentionally does not approve broad mixed-dish or restaurant estimates. |

Sources were accessed 2026-08-27. These are evidence-landscape sources, not a newly approved runtime data set.

## Thai Dish Findings

The evidence landscape is promising but uneven.

- Thai FCD is the preferred first place to investigate a specifically named Thai dish or component. A future curatorial pass must inspect the actual entry and its serving/preparation boundary, not infer an entry from the database's existence.
- The 2025 Thai-cuisine study supports a dish-family research vocabulary, but its recipe-derived, common-serving values are not a direct estimate for a particular delivery order.
- The southern ready-cooked-food study is especially important: it found meaningful divergence between single-ingredient calculations and values from cooked meals. For MHB, this rejects treating a visible component list as a reconstruction of unknown sauce or stock.
- Evidence for made-to-order dishes such as pad krapao, fried rice, pad see ew, rad na, noodle soup, chicken rice, fried pork rice, curries, soups, and yum should be curated dish by dish. This pass did not establish one authoritative, comparable, current reference set covering all of them.

Therefore no broad dish or meal type is ready to become a generic runtime sodium value. A named-dish pilot may be feasible later, but only after a separate evidence audit records identity, serving, source, estimate basis, and variation boundary for each pilot dish.

## Meal Type Is Context, Not a Lookup Key

`stir_fried`, `boiled`, `curry`, `fried`, `grilled`, `steamed`, and `broth_based` describe what the user recognizes. They can assist a future interface in choosing a named-dish evidence candidate or asking a clarification. They cannot independently select a sodium range.

The research gives no support for rules such as `stir_fried = 900 mg` or `curry = 1200 mg`. Preparation and ingredient mix can explain variation, but Meal Type alone does not establish recipe, sauce, portion, restaurant, or broth consumption. It should remain a supporting match field, never an estimate source.

## Unknown Condiment and Partial-Knowledge Rules

Three states must remain distinct:

| User record | What MHB may say | What MHB must not infer |
| --- | --- | --- |
| Explicit condiment item(s) | Include only the documented item estimate, if supported. | That those are the only condiments in the meal. |
| No condiment item | No condiment information was recorded. | No condiment, no sodium, or a fixed hidden-condiment amount. |
| `condiment_knowledge: "unknown"` | Condiments are incompletely known; component-only coverage is limited. | `0 mg`, a standard sauce quantity, or a full meal estimate from Meal Type. |

If an exact, inclusive dish reference is selected later, unknown condiments can be represented by that reference's documented basis rather than guessed separately. This is not the same as adding an invented condiment band. If no inclusive dish reference exists, MHB should retain a component-only partial estimate or `unknown`.

## Portion and Serving Boundaries

MHB's `small`, `regular`, `large`, and `custom` multipliers are appropriate for Food Reference instances only when the reference serving is explicit and scaling is defensible. They are not automatically valid for a prepared-dish reference.

- Normalize a dish reference only where the source gives a clear serving mass/volume and MHB can record the conversion and its assumptions.
- Preserve the source serving when a dish is defined as one plate, bowl, or restaurant portion without a supported conversion.
- Do not apply a global `small/regular/large` multiplier to every dish estimate. A restaurant plate and a reference plate may not be comparable.
- A future dish reference needs its own serving basis, plus an explicit statement of whether a user portion label can scale it. Until then, a user-facing portion control must not create a more precise-looking dish number.

## Range Construction

A range is justified only when its endpoints have provenance. Potential bases are multiple comparable sources, documented recipe/restaurant variation, clearly different source servings after a recorded conversion, or a source's own range. It is not justified by an arbitrary percentage, a fixed “uncertainty multiplier,” or Meal Type.

Wide ranges are not automatically honest or useful. If the match, serving, or estimate basis cannot be explained, `unknown` is preferable to a large numeric band that users could mistake for a measured result. The contract decision should define a review rule for “too broad to display,” but should not pick a numeric threshold without pilot evidence.

## Evidence Hierarchy Candidates

The following is a research hypothesis, not a locked contract:

1. Exact product/package declaration for the exact product and declared serving.
2. Restaurant-declared nutrition for the exact restaurant item and serving.
3. A direct, authoritative named-dish reference with compatible preparation and serving.
4. Human-reviewed comparable named-dish references with an explicit, evidence-supported range.
5. Explicit Food Reference component estimates, summed only for the items actually recorded.
6. Unknown.

Meal Type alone, generic dish family, no-condiment records, and LLM-generated values are excluded as numeric evidence classes. A future system may choose either a direct dish basis or component basis for one meal; it must not silently combine them.

## Evidence Combination and Double Counting

A named-dish reference may already include rice, protein, sauce, stock, and kitchen condiments. Adding documented components or condiments on top of such a value can double-count sodium. The future data model needs an inspectable estimate basis before it combines anything:

| Candidate basis | Conceptual coverage | Combination rule |
| --- | --- | --- |
| `package_exact` | The declared product serving. | Do not add its constituent ingredients. |
| `restaurant_exact` | The declared restaurant item serving. | Add only an explicit, separately consumed add-on that is known to be outside the menu item. |
| `dish_inclusive` | A named prepared dish including recipe-level seasoning stated by the source. | Do not add recorded recipe components or presumed condiments. |
| `component_only` | Only selected, supported Food Reference items. | Sum supported items; disclose unknown items and condiments. |
| `addon_condiment` | A condiment the user added separately after service. | May be added only to a base documented as excluding the add-on. |

The system should keep one base estimate per meal. If the evidence cannot establish whether an explicit condiment is already included in a dish reference, do not add it. Preserve the ambiguity and flag it for the user or curator instead.

## Confidence and Coverage Options

### Confidence

The existing `high`, `medium`, `low`, and `unknown` vocabulary is understandable and should be retained unless human review finds a material need to change it. It should be determined by the weakest relevant dimension, not an average:

- source quality and traceability;
- exactness of dish/product/restaurant match;
- serving match;
- preparation match;
- whether basis coverage is explicit;
- source agreement or documented variation.

Any unknown material to the claimed estimate should cap confidence rather than being averaged away. A direct package declaration may be `high` only when the product and serving match. A restaurant label or exact named-dish source may be `medium` or lower when the user cannot establish portion or preparation. Comparable dish ranges normally remain `low`.

### Coverage

The current `complete`, `partial`, and `unknown` vocabulary remains useful if it continues to mean coverage of **recorded facts**, not certainty that MHB reconstructed the entire meal. Rather than adding a large new coverage taxonomy, research recommends a separate `estimate_basis`/method label for a future runtime:

- `component_only`: coverage describes how much of the recorded component list has supported values;
- `dish_inclusive`, `restaurant_exact`, or `package_exact`: provenance describes what the source represents, while unknown user-side details remain visible.

This avoids calling a dish estimate “complete” merely because it produces a number, and avoids calling a direct labelled product “partial” merely because its recipe is unavailable. Whether an inclusive direct dish source may ever display a distinct `direct` state remains a human contract decision.

## Minimum Provenance Chain

A future estimate record should be able to answer, without reading application code:

```text
estimate_method / estimate_basis
source_type + source_reference (+ source version or access date when available)
dish/product identity and matching notes
source serving basis and any conversion assumption
range, confidence, and coverage statement
explicit add-on boundary and unknown-item/condiment flags
```

The user-facing surface can remain short. Audit and export surfaces need enough detail to distinguish “known component range” from “exact restaurant item” or “curated dish reference.”

## Human-Readable Language

Appropriate presentation depends on evidence basis:

- Direct source: “Estimated range from this recorded product/menu reference: …”
- Component-only partial: “This range comes from the recorded items with supported data; some parts of the meal are still unknown.”
- Curated dish reference: “Estimated from a documented reference for this named dish and serving; the reference basis is shown with the estimate.”
- Unknown: “There is not enough evidence to estimate sodium for this meal reliably.”

Avoid `high`, `low`, `good`, `bad`, `over`, `under`, or medical thresholds in the user-facing copy. Confidence is evidence quality, not food quality.

## LLM and Vision Boundary

An LLM must not be the source of a sodium number, a hidden-ingredient assumption, or a confidence claim. At most, a future assistant could help normalize user text to a candidate dish, ask for confirmation, or explain a deterministic evidence result. A number must come from the selected evidence record and deterministic calculation.

Similarly, a future photo workflow could suggest candidate food/dish identities for user confirmation, then route to the same evidence hierarchy. Image recognition or a visual Meal Type must never become canonical sodium evidence.

## Architecture Candidates for MHB 2.3F-C

| Candidate | Model | Strengths | Limits |
| --- | --- | --- | --- |
| A. Component evidence only | Extend supported Food References; sum only selected known items. | Simplest, highly interpretable, no hidden assumptions or double counting. | Many restaurant meals remain partial or unknown; limited usefulness for named dishes. |
| B. Evidence-routed base estimate | Use one exact package, restaurant, or curated named-dish basis when available; otherwise component-only. | Supports strong named-dish evidence without Meal Type lookup; clear provenance and precedence. | Requires a curated dish-reference pilot and serving-match policy. |
| C. Evidence-routed base plus explicit add-ons | Candidate B plus separately consumed condiments only when the base documents their exclusion. | Handles an added fish sauce/soy sauce record while protecting against double count. | Highest metadata and UX burden; cannot be implemented safely until estimate-basis boundaries are curated. |

### Recommended Direction

Choose **Candidate B** as the first implementation direction, with Candidate C deferred until the data model can state whether a base includes or excludes an add-on. It preserves MHB's current component-only estimate, allows a later curated named-dish pilot, and refuses meal-type/category-only values. It is more useful than Candidate A for well-documented packaged or restaurant meals, without making the first slice responsible for hidden-condiment inference.

## Rejected Approaches

- A fixed sodium value or range for every Meal Type or dish family.
- A standard hidden-condiment amount when no condiment was recorded or `condiment_knowledge` is unknown.
- Arbitrary percentage bands around a guessed midpoint.
- Automatic component-plus-dish summation without an inclusive/exclusive basis contract.
- Using a generic Western dish as a substitute for a Thai dish with different preparation semantics.
- Treating broad secondary references, blogs, or LLM output as canonical numeric evidence.
- Expanding to medical targets, food scores, or dietary recommendations.

## Human Review Decisions for 2.3F-C

1. Approve or decline a curated named-dish evidence layer after a dish-by-dish evidence audit.
2. Decide whether a direct inclusive dish source receives a distinct user-visible coverage state or keeps the existing coverage vocabulary plus an estimate-basis label.
3. Lock the precedence rule: one base estimate per meal, then when (if ever) documented external add-ons may be included.
4. Define the evidence/serving match required before a user portion may scale a dish reference.
5. Define when a source-supported range is too broad to display and should remain unknown, based on pilot evidence rather than a universal percentage.
6. Confirm the minimum provenance fields and the user-facing level of detail.
7. Decide whether restaurant-declared menu data is a first pilot source class and how its product/version changes are handled.
8. Confirm that Meal Type, unknown-condiment state, LLM normalization, and future vision are routing/support fields only, never numeric evidence.

## Research Limitations

- This pass surveyed the evidence landscape; it did not extract or approve sodium ranges for named Thai dishes.
- Thai FCD searchability and academic analyses do not remove the need to check exact dish identity, preparation, and serving.
- Restaurant, recipe, and delivery data can be location- and time-specific.
- Some studies show variation but do not expose a portable, current per-dish data set suitable for runtime.
- No clinical thresholds or recommendations are part of this research.

## Original Suggested Next Step: MHB 2.3F-C

This research recommendation called for a focused human review of Candidate B before any implementation. The approved result is recorded in the contract-lock addendum below.

## 2.3F-C Contract Lock Addendum

Research is complete. Human review approved Candidate B, the evidence-routed base-estimate architecture. The canonical locked decisions now live in [MEAL_SODIUM_ESTIMATION_CONTRACT.md](MEAL_SODIUM_ESTIMATION_CONTRACT.md).

This addendum does not revise the research findings or introduce runtime behavior. The next evidence step is MHB 2.3F-D, a small Thai named-dish evidence pilot before any implementation proposal.
