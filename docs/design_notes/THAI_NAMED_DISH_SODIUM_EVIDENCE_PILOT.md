# MHB 2.3F-D - Thai Named-Dish Sodium Evidence Pilot

## Pilot Purpose

This research-only pilot tests whether a small set of common Thai dishes can meet the named-dish standard locked in [MEAL_SODIUM_ESTIMATION_CONTRACT.md](MEAL_SODIUM_ESTIMATION_CONTRACT.md). It does not approve runtime data or add a sodium estimate to MHB.

> A named dish is not evidence because its name is familiar. It becomes evidence only when identity, serving, source, and estimate boundary are traceable enough to justify a number.

Current public runtime remains **MHB 2.3 - Gentle Meal Composition**.

## Contract Constraints

This pilot follows the locked MHB 2.3F constraints:

- one evidence-routed base estimate per Meal Instance;
- Meal Type is context only, never a sodium lookup;
- no condiment record and unknown condiment knowledge do not create a number;
- `estimate_basis` is separate from coverage;
- named-dish evidence requires later human approval before runtime use;
- a source-supported single value is retained as a value, not padded into an arbitrary range;
- source, serving, confidence, and inclusive/exclusive boundaries must remain inspectable;
- no LLM-generated value, hidden-condiment default, score, target, or medical interpretation.

## Source Strategy and Quality

The primary source was the [Thai Food Composition Database (Thai FCD), Online v3, August 2025](https://inmu.mahidol.ac.th/thaifcd/), maintained by the Institute of Nutrition, Mahidol University. The database records below use `source_type: reference_database`, were inspected by exact food ID and nutrient row on 2026-08-27, and report mixed-food values per **100 g edible portion**.

The pilot also checked the 2023 [Bangkok online food-delivery laboratory study](https://pubmed.ncbi.nlm.nih.gov/36901000/) and the 2025 [Thai cuisine nutrient-profile study](https://he01.tci-thaijo.org/index.php/JNAT/article/view/276675). They establish that real prepared-food variation and serving definition matter, but neither supplies a portable, exact matching basis for these individual candidate records. They are context sources, not canonical numeric sources in this pilot.

No exact restaurant menu declaration that matched a Thai restaurant, dish, serving, and current formula was found in this bounded audit. Restaurant evidence is therefore not proposed for this pilot.

## Selected Dish Set

Eight candidates were selected to test different evidence conditions, not to fill every Thai dish class.

| Candidate | Why selected | Pilot result |
| --- | --- | --- |
| Rice and stir-fried chicken with holy basil leaves | Common made-to-order meal; tests a specific protein-plus-rice identity. | Direct Thai FCD identity exists, but sodium is missing. |
| Fried rice with pork, vegetable and egg | Common one-dish meal with explicit protein, vegetable, and egg identity. | Direct Thai FCD sodium value exists. |
| Fried rice with vegetables | Common vegetarian-style one-dish identity. | Direct Thai FCD sodium value exists. |
| Green curry, chicken | A curry with explicit protein identity, distinct from generic curry. | Direct Thai FCD sodium value exists. |
| Rice vermicelli, pad see ew | A noodle dish with an explicit noodle form. | Direct Thai FCD identity exists, but sodium is missing. |
| Wide rice noodles, rad na, chicken/pork | A named noodle dish with protein family stated. | Direct Thai FCD identity exists, but sodium is missing. |
| Generic noodle soup | Tests the broth-consumption problem. | No exact generic entry selected; identity is too broad. |
| Chicken rice | Tests rice, chicken, broth, and dipping-sauce boundaries. | No exact entry selected; the sauce boundary is too important to infer. |

The pilot intentionally does not include generic `yum` or generic `curry`: both labels require a narrower identity before a single source can be matched honestly.

## Dish-by-dish Evidence Matrix

`recommended_min` and `recommended_max` below preserve a source-declared value only. They are not a proposed restaurant-portion estimate and are not approved runtime values.

| Dish ID candidate | Identity and serving boundary | Source and sodium evidence | Recommended value | Basis / confidence / status | Inclusive boundary and implementation recommendation |
| --- | --- | --- | --- | --- | --- |
| `rice_chicken_holy_basil` | Thai FCD `T54`: ข้าวราดไก่ผัดใบกะเพรา / Rice and stir fried chicken with holy basil leaves. Rice and chicken are named; fried egg and external condiments are not. Source basis: 100 g edible portion. | [Thai FCD food ID 1561](https://inmu.mahidol.ac.th/thaifcd/foodsearch/food_name_result_std_pdf/?dbcode=STD&food_id=1561), `Sodium: -` per 100 g, accessed 2026-08-27. | No number. | `unknown` / `unknown` / `keep_unknown`. | No base can be created from a missing sodium value. Do not reconstruct sauce or infer a value from `stir_fried`. |
| `fried_rice_pork_vegetable_egg` | Thai FCD `T56`: ข้าวผัดหมู / Fried rice with pork, vegetable and egg. Source basis: 100 g edible portion. It is a prepared, inclusive one-dish record; no plate mass is given. | [Thai FCD food ID 1554](https://inmu.mahidol.ac.th/thaifcd/foodsearch/food_name_result_std_pdf/?dbcode=STD&food_id=1554), `Sodium: 141 mg` per 100 g, accessed 2026-08-27. | 141-141 mg per 100 g. `scaling_allowed: no`. | `dish_inclusive` / `medium` / `ready_for_human_review`. | Rice, pork, vegetable, egg, and source preparation are represented by the dish record. Future runtime must choose this base alone and must not sum those components or source-prepared condiments again. External add-ons are unclear and must not be added. |
| `fried_rice_vegetable` | Thai FCD `T204`: ข้าวผัดผัก / Fried rice, with vegetables. Source basis: 100 g edible portion. Protein, egg, and external add-ons are not named. | [Thai FCD food ID 1553](https://inmu.mahidol.ac.th/thaifcd/foodsearch/food_name_result_std_pdf/?dbcode=STD&food_id=1553), `Sodium: 268 mg` per 100 g, accessed 2026-08-27. | 268-268 mg per 100 g. `scaling_allowed: no`. | `dish_inclusive` / `medium` / `ready_for_human_review`. | The base covers the source's prepared vegetable fried rice only. It must not be combined with reconstructed rice, vegetables, or unrecorded seasoning. A user record that states egg or meat is a different identity and should not match this entry. |
| `green_curry_chicken` | Thai FCD `T184`: แกงเขียวหวาน, ไก่ / Curry, green, chicken. Source basis: 100 g edible portion. Rice is not named; dish-side condiments and actual serving mass are not documented. | [Thai FCD food ID 1456](https://inmu.mahidol.ac.th/thaifcd/foodsearch/food_name_result_std_pdf/?dbcode=STD&food_id=1456), `Sodium: 420 mg` per 100 g, accessed 2026-08-27. | 420-420 mg per 100 g. `scaling_allowed: no`. | `dish_inclusive` / `medium` / `ready_for_human_review`. | Covers the source-prepared curry and chicken, not an assumed rice serving. Do not sum its source ingredients. A future implementation needs a clear UI match boundary before treating a meal containing rice as this one base. |
| `pad_see_ew_rice_vermicelli` | Thai FCD entry: เส้นหมี่, ผัดซีอิ๊ว / Rice vermicelli, pad see ew. The entry does not identify protein, egg, or exact sauce formulation. Source basis: 100 g edible portion. | [Thai FCD food ID 1587](https://inmu.mahidol.ac.th/thaifcd/foodsearch/food_name_result_std_pdf/?dbcode=STD&food_id=1587), `Sodium: -` per 100 g, accessed 2026-08-27. | No number. | `unknown` / `unknown` / `keep_unknown`. | A preparation label and food name cannot replace the missing value. Keep unknown. |
| `rad_na_wide_noodle_chicken_or_pork` | Thai FCD entry: ก๋วยเตี๋ยวเส้นใหญ่, ราดหน้า, ไก่/หมู / Wide rice noodles, rad na, chicken/pork. It merges protein variants and does not resolve gravy volume. Source basis: 100 g edible portion. | [Thai FCD food ID 1531](https://inmu.mahidol.ac.th/thaifcd/foodsearch/food_name_result_std_pdf/?dbcode=STD&food_id=1531), `Sodium: -` per 100 g, accessed 2026-08-27. | No number. | `unknown` / `unknown` / `keep_unknown`. | The identity is already a protein-family merge and sodium is missing. Do not infer from gravy or soy sauce. Split protein variants only if a future source supports them. |
| `noodle_soup_generic` | “Noodle soup” does not fix noodle, protein, broth, bowl size, how much broth was consumed, or add-on seasoning. | Thai FCD public name search did not yield an exact generic selected record in this audit. INMU recipe material confirms broth composition can matter, but provides no portable sodium value for generic noodle soup. | No number. | `unknown` / `unknown` / `defer_from_pilot`. | Must be split to a specific dish, protein, noodle, and broth-consumption basis before further research. |
| `chicken_rice_generic` | “Chicken rice” can include seasoned rice, chicken, broth, cucumber, and a separate dipping sauce. The user may consume any of these in different amounts. | No exact Thai FCD selected record found in this audit. INMU material identifies chicken-rice dipping sauce as a distinct sodium-bearing item, not a generic assumed amount. | No number. | `unknown` / `unknown` / `defer_from_pilot`. | Split into a specific meal identity and record whether sauce is source-included, separate, or unknown. Do not create a chicken-rice number from its name. |

## Serving and Portion Findings

The three numeric Thai FCD records share a clear source basis of 100 g edible portion. This is enough to preserve the source value, but not enough to present a plate, bowl, or MHB `small` / `regular` / `large` estimate.

- Original serving: 100 g edible portion.
- Weight or volume for a usual meal: not provided by the selected FCD entries.
- Normalized serving: none.
- Conversion assumption: none.
- `scaling_allowed`: `no` for all three proposed records.

The delivery study sampled 600 items from 15 Bangkok restaurants, which reinforces that restaurant portions are a different evidence basis. Its portions must not be used to convert a Thai FCD 100-g food record without an exact restaurant and serving match.

## Inclusive, Exclusive, and Double-count Boundaries

The proposed numeric records are `dish_inclusive` bases. Their source-prepared ingredients and seasoning are already part of the 100-g food record.

| Candidate | Would a component sum double-count? | Boundary decision |
| --- | --- | --- |
| `fried_rice_pork_vegetable_egg` | Yes. | Use the dish base alone. Rice, pork, vegetable, egg, and source preparation cannot also be summed. External condiment inclusion is unclear, so do not add it. |
| `fried_rice_vegetable` | Yes. | Use the dish base alone. Meat or egg records are a different identity, not additions to this base. |
| `green_curry_chicken` | Yes for the curry and chicken components. | Use the curry base alone for an exact curry record. Rice is not named by the entry, but should not be automatically inferred or added in the first implementation. |
| All nonnumeric candidates | Not applicable. | No base exists, so MHB remains component-only or unknown under the locked contract. |

No candidate has a sufficiently explicit outside-the-base condiment boundary to justify an `addon_condiment` calculation. That extension remains deferred.

## Confidence Decisions

The three source-valued candidates are `medium`, not `high`:

- Thai FCD is an authoritative institutional source with a stable food ID and 100-g basis.
- The dish identity is specific enough to avoid generic Meal Type matching.
- The source does not supply a usual plate/bowl mass, restaurant match, external-condiment boundary, or a comparable second source for a supported range.

Nonnumeric or overly broad candidates are `unknown`. A low-confidence number is not better than no number when the numeric source is absent.

## Source Conflicts and Restaurant Findings

The FCD record for fried rice with pork, vegetable and egg is a 100-g source value. The Bangkok delivery study includes laboratory analysis of popular delivery-menu items, including similarly named menu items, but its restaurant-specific portions and formulations are not a comparable serving basis. These sources must not be combined into a min-max range.

Likewise, the Thai cuisine nutrient-profile study is recipe- and common-serving research across food categories, not an exact source record for any candidate above. It supports the need for serving-specific matching but is not a canonical runtime number here.

No `restaurant_exact` or `package_exact` candidate is proposed by this pilot.

## Thai FCD Findings

Thai FCD is sufficiently useful for an evidence-routed named-dish layer only when the exact entry contains sodium data. It returned three promising direct values and three exact-but-missing numeric entries for this pilot.

This distinction is material: a source database entry with a familiar dish name and `Sodium: -` is evidence that MHB should preserve `unknown`, not permission to substitute a recipe or Meal Type estimate.

## Human Review Output

### A. Ready for Human Approval

The following records are ready for a narrow human decision, not runtime implementation:

- `fried_rice_pork_vegetable_egg`: Thai FCD `T56`, 141 mg per 100 g, `dish_inclusive`, medium confidence, no scaling.
- `fried_rice_vegetable`: Thai FCD `T204`, 268 mg per 100 g, `dish_inclusive`, medium confidence, no scaling.
- `green_curry_chicken`: Thai FCD `T184`, 420 mg per 100 g, `dish_inclusive`, medium confidence, no scaling.

### B. Ready with Conservative Range

None. Each numeric candidate has one direct, source-declared value per 100 g. Creating a range would be arbitrary because the candidate sources are not serving-comparable.

### C. Keep Unknown

- `rice_chicken_holy_basil`
- `pad_see_ew_rice_vermicelli`
- `rad_na_wide_noodle_chicken_or_pork`

These entries have an exact or near-exact dish identity but no sodium value in the inspected Thai FCD nutrient row.

### D. Defer or Split Identity

- `noodle_soup_generic`: split noodle, protein, broth, and consumption boundary.
- `chicken_rice_generic`: split seasoned rice, chicken, broth, and dipping-sauce inclusion.
- Generic `yum` and generic `curry`: do not enter a future pilot without a dish subtype and source-specific identity.

## Human Review Questions

1. Should MHB accept Thai FCD source values per 100 g as named-dish references when no consumer-portion conversion is shown, with `scaling_allowed: no`?
2. Should the first named-dish subset contain all three proposed records, or begin only with the two fried-rice identities whose source records describe an inclusive one-dish meal?
3. For `green_curry_chicken`, should a future UI match only a curry record without rice, or defer it until a source defines the full served meal boundary?
4. What user-visible wording best states a 100-g source basis without implying an estimate for the user's whole plate?
5. Should a future evidence pass seek a second comparable source for each direct FCD record before any range is shown, while retaining a single source value where it is the only traceable evidence?

## Proposed Implementation Subset

No runtime implementation is approved by this note. If human review accepts the 100-g, no-scaling policy, the proposed next implementation subset is limited to:

1. `fried_rice_pork_vegetable_egg`
2. `fried_rice_vegetable`
3. `green_curry_chicken`, only if its curry-only identity boundary is accepted

Each must remain `dish_inclusive`, retain Thai FCD food ID and version provenance, and enforce the one-base/no-component-sum rule. The remaining candidates remain unknown or deferred.

## Research Limitations and Next Step

- This pilot tested a small evidence landscape, not a national Thai-food database.
- Thai FCD food records provide 100-g values but not a universal restaurant plate or bowl serving.
- The selected records do not document all external condiments or user consumption behavior.
- Restaurant exact evidence was not identified in this bounded audit.
- No clinical thresholds, medical advice, scoring, or runtime behavior is proposed.

Next step: Human Approval of the proposed subset and serving policy. Only after approval should MHB consider **MHB 2.3F-I - runtime implementation**. Without that approval, every candidate in this note remains research evidence only.
