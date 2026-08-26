# MHB 2.3C-R - Food Reference Evidence Audit

## 1. Research Scope

- Status: **Research complete; human approval required before evidence implementation**
- Runtime source audited: `js/mealCompositionRuntime.js`
- Pilot size at audit time: **26 Food References**
- Scope: sodium evidence, serving basis, provenance, uncertainty, and implementation readiness
- Out of scope: runtime values, UI, workbook sheets, calories/macros, medical targets, and dietary advice
- Accessed date for web sources: **2026-08-26**

This audit does not attempt to fill every blank. A blank remains preferable when the current Food Reference is broader than the available evidence.

> The goal is not to know every food. The goal is to know exactly how much MHB is justified in claiming about each food.

MHB 2.2 remains the current runtime. MHB 2.3 is not yet the current release.

## 2. Research Strategy and Source Policy

The 26 runtime references were audited in five batches: staples; plain proteins; egg, tofu, tempeh, vegetables, and fruit; condiments; then soup, processed food, and broad high-uncertainty categories. Direct database matches were joined to their nutrient and portion records. Condiments were then cross-checked against manufacturer declarations to expose brand and formulation variation rather than conceal it.

Evidence was sought in this order:

1. official government or academic food-composition data;
2. a manufacturer or package declaration for an identified product;
3. a restaurant declaration for an identified dish;
4. an institutional table with traceable provenance;
5. a secondary source only as a cross-check.

The audit uses USDA FoodData Central SR Legacy because it provides downloadable, row-level food, nutrient, and portion data. Thai Food Composition Database Online v3 is the preferred Thai-food authority, but its interactive records were not reliably exportable item-by-item in this pass. Thai FCD therefore informs source policy and selected institutional cross-checks; it is not cited as if it supplied values that were not directly captured.

Manufacturer values apply to the named product and serving only. They do not become a universal value for all products in the same category.

## 3. Source Register and Hierarchy

| Code | Source | Type | Publication/update | Evidence captured |
| --- | --- | --- | --- | --- |
| `TFCD-2025` | [Thai Food Composition Database Online v3](https://inmu.mahidol.ac.th/thaifcd/) | `reference_database` | August 2025 | Official Thai source authority and citation policy; values require item-level capture before implementation. |
| `USDA-SR` | [USDA FoodData Central downloadable datasets](https://fdc.nal.usda.gov/download-datasets/) | `reference_database` | SR Legacy, April 2018 | Sodium per 100 g and official portion weights, joined from `food.csv`, `food_nutrient.csv`, `nutrient.csv`, and `food_portion.csv`. |
| `RAMA-2025` | [Ramathibodi/Mahidol nutrition lecture](https://www.ramacnec.com/AD/DocumentFile/20251105120154_File_07%20-%20%E0%B8%A7%E0%B8%99%E0%B8%B0%E0%B8%9E%E0%B8%A3%20Diet%20and%20Nutrition%20to%20Prevent%20CVD_6112568_Final.pdf) | `institutional_reference` | 2025; cites Thai FCD 2025 | Cross-checks: boiled egg 60 mg/egg; raw pork/chicken/fish 32 mg/40 g; processed-meat examples. |
| `MCC-FS` | [Thai Kitchen Premium Fish Sauce](https://www.mccormickforchefs.com/en-us/products/thai-kitchen/premium-fish-sauce) | `package_label` | page current when accessed | 1 tbsp, 1,480 mg sodium. |
| `KIK-REG` | [Kikkoman sodium comparison](https://kikkomanusa.com/foodservice/wp-content/uploads/sites/2/2021/11/kikkoman_recipes_kids_love_brochure-v2-2.pdf) | `package_label` | uploaded 2021 | Regular soy sauce, 920 mg/tbsp; less-sodium soy sauce, 575 mg/tbsp. |
| `KIK-LOW` | [Kikkoman Less Sodium Soy Sauce](https://kikkomanusa.com/foodservice/products/less-sodium-soy-sauce/less-sodium-soy-sauce-5-oz-bottle/) | `package_label` | page current when accessed | 1 tbsp (15 mL), 590 mg sodium; confirms formula-specific variation. |
| `LKK-SPEC` | [Lee Kum Kee Panda Oyster Sauce specification](https://www.webstaurantstore.com/documents/nutrition/ps_nf_1800660062_panda_os_5lb.pdf) | `package_label` | effective 2020-07-15 | 1 tbsp (19 g), 870 mg sodium; manufacturer technical specification hosted by distributor. |
| `LKK-UK` | [Lee Kum Kee Panda Oyster Sauce UK](https://uk.lkk.com/products/panda-brand-oyster-sauce) | `package_label` | page current when accessed | 1 tbsp (about 15 g), 1.73 g salt; retained as a formulation conflict, not converted into canonical sodium in this audit. |
| `KNR-CUBE` | [Knorr Chicken Bouillon Cubes](https://www.knorr.com/ca/en/p/poulet-cubes-de-bouillon.html/00055220000019) | `package_label` | page current when accessed | 720 mg sodium per declared portion; one cube prepares 750 mL broth. |
| `KNR-CONC` | [Knorr Concentrated Chicken Bouillon](https://www.knorr.com/ca/en/p/bouillon-de-poulet-concentre.html/00068400001621) | `package_label` | page current when accessed | 300 mg sodium per 1.5 tsp (7.5 mL), preparing 250 mL broth. |
| `KNR-POW` | [Knorr Instant Chicken Bouillon](https://www.knorr.com/ca/fr/p/poulet-bouillons-instantanes.html/00066345700159) | `package_label` | page current when accessed | 510 mg sodium per slightly rounded teaspoon, preparing 250 mL broth. |

USDA detail links in the food table use the stable FoodData Central ID form `https://fdc.nal.usda.gov/fdc-app.html#/food-details/{fdc_id}/nutrients`.

## 4. Serving Normalization Policy

- Preserve the source serving when its mass or volume is explicit.
- Use per-100-g evidence as the comparison basis for solid foods when the runtime's `1 serving` or `1 bowl` has no defined weight.
- Convert a source value only by `source sodium per 100 g x source portion grams / 100`.
- Round converted implementation candidates to the nearest whole milligram; the source value remains auditable.
- Do not convert a vague `spoon`, `bowl`, `piece`, or `serving` into grams or millilitres.
- For condiments, prefer `1 tbsp` or `1 tsp` over the current ambiguous `1 spoon`.
- A source-backed 100-g reference does not require the user to weigh food. It can remain an internal reference basis behind the hybrid portion model.

## 5. Confidence and Evidence Status

Confidence describes evidence quality, not food quality.

| Confidence | Audit meaning |
| --- | --- |
| `high` | Direct item and explicit serving with closely matching evidence; little unresolved category ambiguity. |
| `medium` | Direct evidence, but preparation, cut, brand, or serving variation remains. |
| `low` | A broad category or product family can only support a wide estimate. |
| `unknown` | Evidence is insufficient, incomparable, or mismatched to the current Food Reference. |

Evidence status:

- `ready`: current item can receive evidence after human approval with no semantic split.
- `ready_with_range`: comparable sources support a disclosed range.
- `needs_human_review`: evidence exists, but serving or item meaning must be narrowed first.
- `keep_unknown`: retain the item but do not assign sodium yet.
- `defer_from_pilot`: the current category is too broad to support a useful estimate in the first evidence slice.

## 6. Food-by-Food Evidence Table

Recommended ranges below are for the **recommended serving basis**, not automatically for the current runtime serving. `--` means no supported numeric recommendation.

In this table, every USDA link has `source_type: reference_database`; manufacturer source codes have `source_type: package_label`; `RAMA-2025` is an institutional cross-check. Publication/update information is kept in the source register above. Rows without a defensible source retain `source_type: unknown` for implementation purposes.

| Food ID / display name | Category | Current -> recommended serving | Source candidate(s) and captured sodium | Recommended min-max | Confidence / status | Uncertainty and implementation recommendation |
| --- | --- | --- | --- | --- | --- | --- |
| `rice` / Rice | grain | 1 bowl -> 100 g cooked plain white rice | [USDA 168878](https://fdc.nal.usda.gov/fdc-app.html#/food-details/168878/nutrients): 1 mg/100 g; 1 cup = 158 g | 1-1 mg/100 g | high / `needs_human_review` | Evidence is strong, but `rice` and `1 bowl` are underspecified. Narrow display/reference to plain cooked white rice or define bowl mass before implementation. |
| `brown_rice` / Brown rice | grain | 1 bowl -> 100 g cooked brown rice | [USDA 168875](https://fdc.nal.usda.gov/fdc-app.html#/food-details/168875/nutrients): 1 mg/100 g; 1 cup = 195 g | 1-1 mg/100 g | high / `needs_human_review` | Same serving issue as rice; added salt must remain a meal-item/recipe concern. |
| `noodles` / Noodles | grain | 1 bowl -> no generic basis | [USDA 168914](https://fdc.nal.usda.gov/fdc-app.html#/food-details/168914/nutrients): cooked rice noodles 19 mg/100 g; 1 cup = 176 g | -- | unknown / `defer_from_pilot` | Rice, wheat, egg, fresh, dried, and instant noodles are not one sodium reference. Split by noodle type before assigning evidence. |
| `chicken_breast` / Chicken breast | animal protein | 1 serving -> 100 g plain roasted meat only | [USDA 171477](https://fdc.nal.usda.gov/fdc-app.html#/food-details/171477/nutrients): 74 mg/100 g; half breast = 86 g (about 64 mg) | 74-74 mg/100 g | medium / `needs_human_review` | Strong for the named preparation, not for salted, brined, processed, or sauced chicken breast. Lock `plain roasted` or keep unknown. |
| `chicken` / Chicken | animal protein | 1 serving -> 100 g plain roasted meat | [USDA 171054](https://fdc.nal.usda.gov/fdc-app.html#/food-details/171054/nutrients): mixed light/dark meat, 86 mg/100 g; USDA breast comparator 74 mg/100 g | 74-86 mg/100 g | medium / `ready_with_range` | Range covers two comparable plain roasted references, not recipe variation. Preparation/seasoning still belongs to item instances. |
| `pork_lean` / Lean pork | animal protein | 1 serving -> 100 g cooked lean-only composite | [USDA 167855](https://fdc.nal.usda.gov/fdc-app.html#/food-details/167855/nutrients): 55 mg/100 g; 3 oz = 85 g (about 47 mg) | 55-55 mg/100 g | medium / `needs_human_review` | Direct evidence, but the runtime serving and cooking method are undefined. `RAMA-2025` gives 32 mg/40 g for raw pork/chicken/fish only as a preparation-state cross-check. |
| `beef` / Beef | animal protein | 1 serving -> 100 g cooked lean-only composite | [USDA 170208](https://fdc.nal.usda.gov/fdc-app.html#/food-details/170208/nutrients): 64 mg/100 g; 3 oz = 85 g (about 54 mg) | 64-64 mg/100 g | medium / `needs_human_review` | Cut, fat trim, curing, and added salt are unresolved by the generic ID. |
| `fish` / Fish | animal protein | 1 serving -> species-specific 100 g cooked reference | [USDA 171998](https://fdc.nal.usda.gov/fdc-app.html#/food-details/171998/nutrients): wild Atlantic salmon 56 mg/100 g; [USDA 171956](https://fdc.nal.usda.gov/fdc-app.html#/food-details/171956/nutrients): Pacific cod 78 mg/100 g | -- | unknown / `needs_human_review` | Two examples do not establish a universal fish range. Split at least oily fish/white fish or use named species. |
| `shrimp` / Shrimp | animal protein | 1 serving -> product/preparation-specific | [USDA 171971](https://fdc.nal.usda.gov/fdc-app.html#/food-details/171971/nutrients): cooked shrimp, may contain moisture-retention additives, 947 mg/100 g | -- | unknown / `keep_unknown` | Additives can materially dominate sodium. Do not use this value for untreated generic shrimp; a treatment/label distinction is required. |
| `squid` / Squid | animal protein | 1 serving -> preparation-specific | [USDA 171982](https://fdc.nal.usda.gov/fdc-app.html#/food-details/171982/nutrients): fried mixed-species squid, 306 mg/100 g | -- | unknown / `keep_unknown` | The available direct match is fried; it cannot represent raw, boiled, grilled, or stir-fried squid. |
| `egg` / Egg | egg | 1 egg -> 1 large boiled egg | [USDA 173424](https://fdc.nal.usda.gov/fdc-app.html#/food-details/173424/nutrients): 124 mg/100 g and 50 g/large egg = 62 mg; `RAMA-2025`: 60 mg/egg | 60-62 mg/egg | high / `ready_with_range` | Comparable institutional values support a narrow range. Added sauce or seasoning remains separate. |
| `tofu` / Tofu | plant protein | 1 serving -> 100 g firm tofu, calcium/magnesium prepared | [USDA 172448](https://fdc.nal.usda.gov/fdc-app.html#/food-details/172448/nutrients): 12 mg/100 g; half cup = 126 g (about 15 mg) | 12-12 mg/100 g | medium / `needs_human_review` | Firmness, coagulant, packing liquid, and seasoned products differ. Narrow the reference to plain firm tofu. |
| `tempeh` / Tempeh | plant protein | 1 serving -> 100 g cooked plain tempeh | [USDA 172467](https://fdc.nal.usda.gov/fdc-app.html#/food-details/172467/nutrients): 14 mg/100 g | 14-14 mg/100 g | medium / `needs_human_review` | No official household portion was captured; flavoured or marinated tempeh must not inherit this value. |
| `mixed_vegetables` / Mixed vegetables | vegetable | 1 serving -> 100 g frozen mixed vegetables, boiled/drained without salt | [USDA 170472](https://fdc.nal.usda.gov/fdc-app.html#/food-details/170472/nutrients): 35 mg/100 g; half cup = 91 g (about 32 mg) | 35-35 mg/100 g | medium / `needs_human_review` | The value is composition- and preparation-specific. Rename/narrow or retain unknown. |
| `leafy_vegetables` / Leafy vegetables | vegetable | 1 serving -> no generic basis | [USDA 168463](https://fdc.nal.usda.gov/fdc-app.html#/food-details/168463/nutrients): cooked spinach without salt, 70 mg/100 g | -- | unknown / `keep_unknown` | Spinach is not a valid proxy for every leafy vegetable. Split named vegetables before estimating. |
| `fruit` / Fruit | fruit | 1 serving -> named fruit and source portion | No comparable official generic fresh-fruit record supports the runtime category | -- | unknown / `defer_from_pilot` | `fruit` is a navigation category, not an estimable food. Use named fruits later or keep it as composition-only without sodium. |
| `clear_soup` / Clear soup | soup | 1 bowl -> named recipe/product and explicit volume | [USDA 171538](https://fdc.nal.usda.gov/fdc-app.html#/food-details/171538/nutrients): canned beef broth 372 mg/100 g; cup = 240 g (about 893 mg) | -- | unknown / `keep_unknown` | Homemade broth, restaurant soup, powder/cube concentration, solids, and broth consumed vary too much. The USDA broth is evidence of variability, not a generic clear-soup estimate. |
| `fish_sauce` / Fish sauce | condiment | 1 spoon -> 1 tbsp regular fish sauce | [USDA 174531](https://fdc.nal.usda.gov/fdc-app.html#/food-details/174531/nutrients): 7,851 mg/100 g and 18 g/tbsp = about 1,413 mg; `MCC-FS`: 1,480 mg/tbsp | 1,410-1,480 mg/tbsp | medium / `ready_with_range` | Two direct regular-product references support the range. Reduced-sodium formulas need a separate product/reference or package-label override. |
| `soy_sauce` / Soy sauce | condiment | 1 spoon -> 1 tbsp regular soy sauce | [USDA 174277](https://fdc.nal.usda.gov/fdc-app.html#/food-details/174277/nutrients): shoyu 5,493 mg/100 g and 16 g/tbsp = about 879 mg; `KIK-REG`: 920 mg/tbsp | 879-920 mg/tbsp | medium / `ready_with_range` | Range applies to regular soy sauce. `KIK-LOW` reports 590 mg/tbsp, proving reduced-sodium soy sauce needs a separate reference or label override. |
| `oyster_sauce` / Oyster sauce | condiment | 1 spoon -> 1 tbsp oyster sauce | [USDA 174529](https://fdc.nal.usda.gov/fdc-app.html#/food-details/174529/nutrients): 2,733 mg/100 g and 18 g/tbsp = about 492 mg; `LKK-SPEC`: 870 mg/19 g tbsp; `LKK-UK` reports 1.73 g salt/15 g tbsp | 490-870 mg/tbsp | low / `ready_with_range` | Direct products differ materially. The wide range is intentional. The UK salt declaration is retained as a conflict but not converted into the canonical range. Product label should override generic evidence when available. |
| `seasoning_powder` / Seasoning powder | condiment | 1 spoon -> identified product and labelled tsp/grams | `KNR-POW`: 510 mg per slightly rounded tsp for one cup prepared broth | -- | unknown / `keep_unknown` | Powder formulations and spoon mass vary. A named product can be high confidence; the generic runtime ID cannot. |
| `soup_base` / Soup base | condiment | 1 serving -> identified product form and preparation dilution | `KNR-CUBE`: 720 mg/cube, preparing 750 mL; `KNR-CONC`: 300 mg/7.5 mL, preparing 250 mL; `KNR-POW`: 510 mg/tsp, preparing 250 mL | -- | unknown / `keep_unknown` | Cube, concentrate, and powder are not comparable servings. Split by form/product before assigning evidence. |
| `dipping_sauce` / Dipping sauce | condiment | 1 spoon -> named sauce/product and tbsp/tsp | No single comparable source: fish sauce mixtures, soy-based sauces, sweet chilli sauces, and restaurant recipes are different products | -- | unknown / `defer_from_pilot` | Keep as non-numeric composition only or replace with named sauce references. Do not infer from free-text. |
| `processed_sausage` / Sausage | processed food | 1 serving -> named sausage and explicit piece/grams | [USDA 167694](https://fdc.nal.usda.gov/fdc-app.html#/food-details/167694/nutrients): cooked turkey/pork sausage 878 mg/100 g; patty 25 g = about 220 mg. `RAMA-2025`: fried pork sausage 442 mg/65 g; Chinese sausage 638 mg/50 g | -- | unknown / `needs_human_review` | The sources demonstrate substantial type variation and are not one comparable range. Split fresh breakfast-style, Thai pork sausage, Chinese sausage, and other types. |
| `fried_snack` / Fried snack | processed food | 1 serving -> named product and package/recipe serving | No defensible generic match | -- | unknown / `defer_from_pilot` | Category spans chips, crackers, dough, meat snacks, and freshly fried foods. Retain only as non-numeric composition or replace with named items. |
| `dessert` / Dessert | dessert | 1 serving -> named item and explicit serving | No defensible generic match | -- | unknown / `defer_from_pilot` | Dessert is too broad for sodium evidence. Named products/dishes may be researched later. |

## 7. Condiment Audit

Condiments should remain first-class items, but the generic pilot needs tighter serving and subtype semantics:

- **Fish sauce:** regular fish sauce has two close direct values, supporting a medium-confidence range of 1,410-1,480 mg/tbsp. A reduced-sodium product is a separate reference.
- **Soy sauce:** regular references support 879-920 mg/tbsp. An official reduced-sodium Kikkoman label reports 590 mg/tbsp, so product subtype cannot be ignored.
- **Oyster sauce:** direct sources span about 492-870 mg/tbsp, with regional label differences. A wide low-confidence range is more honest than one clean number.
- **Seasoning powder and soup base:** identified products have usable labels, but cube, powder, and liquid concentrate servings are not interchangeable. Generic values remain unknown.
- **Dipping sauce:** the category has no stable recipe or serving and should not receive a numeric estimate.

The first implementation should change `1 spoon` to an explicit `1 tbsp` only after human approval. Package-label entries should later be able to override generic evidence for the same recorded occurrence without overwriting the canonical generic Food Reference.

## 8. Items Ready for Implementation

### Ready without a semantic split

- None as a single exact value.

The audit deliberately avoids treating a source-specific number as universal.

### Ready with a supported range after human approval

- `egg`: 60-62 mg per large boiled egg, high confidence.
- `fish_sauce`: 1,410-1,480 mg per tbsp of regular fish sauce, medium confidence.
- `soy_sauce`: 879-920 mg per tbsp of regular soy sauce, medium confidence.
- `oyster_sauce`: 490-870 mg per tbsp, low confidence with visible product variation.
- `chicken`: 74-86 mg per 100 g of plain roasted meat, medium confidence, if the reference is explicitly narrowed to that preparation boundary.

These recommendations are research outputs only. Runtime implementation requires a separate human-approved evidence patch.

## 9. Items That Should Remain Unknown

Keep the current item but leave sodium unknown until its meaning is narrowed:

- `shrimp`, because additive treatment may dominate the estimate;
- `squid`, because captured evidence is preparation-specific;
- `leafy_vegetables`, because one spinach record cannot represent the category;
- `clear_soup`, because recipe, base, serving, and broth consumption vary;
- `seasoning_powder` and `soup_base`, because product form and dilution differ;
- `processed_sausage`, because named sausage types are not comparable.

`rice`, `brown_rice`, `chicken_breast`, `pork_lean`, `beef`, `fish`, `tofu`, `tempeh`, and `mixed_vegetables` have useful direct evidence but need a serving or semantic decision before implementation.

## 10. Items to Defer or Split

Defer numeric evidence for these broad category references in the first evidence implementation:

- `noodles`: split at least rice/wheat/instant or named noodle type;
- `fruit`: use named fruits or retain composition-only;
- `dipping_sauce`: use named sauce/product;
- `fried_snack`: use named product/dish;
- `dessert`: use named product/dish.

Deferral does not require removing the item from the UI pilot. It means the item must remain sodium-unknown and must not reduce estimate coverage as if a known zero had been recorded.

## 11. Source Conflicts

1. **Oyster sauce:** USDA yields about 492 mg per 18-g tbsp, while the LKK USA technical specification declares 870 mg per 19-g tbsp. The LKK UK page reports salt rather than sodium for a 15-g tbsp. These are formulation/market differences, not a reason to select one universal value.
2. **Soy sauce:** regular Kikkoman references are around 920 mg/tbsp, while the manufacturer's less-sodium formula is 590 mg/tbsp. A generic ID without subtype loses material evidence.
3. **Shrimp:** the USDA record explicitly notes possible moisture-retention additives and reports 947 mg/100 g. It is unsuitable as a proxy for untreated shrimp.
4. **Soup base:** labelled products range across cube, liquid concentrate, and powder, each with different dilution instructions. Values cannot be combined into a meaningful generic serving range.
5. **Sausage:** institutional and USDA examples differ by sausage type and serving. Their min/max would describe category diversity, not uncertainty around one food.

Conflicts are preserved rather than forcibly reconciled.

## 12. Proposed Implementation Subset

For the first human-reviewed evidence patch:

1. Implement `egg`, `fish_sauce`, `soy_sauce`, and `oyster_sauce` with the ranges and confidence above.
2. Change condiment serving labels from ambiguous `1 spoon` to explicit `1 tbsp` for those implemented references.
3. Narrow `chicken` to plain roasted meat before using 74-86 mg/100 g, or leave it unknown.
4. Keep all other pilot sodium values unknown until serving and item semantics are approved.
5. Preserve source codes/URLs and access date in runtime provenance or an accompanying static evidence record.

This subset provides useful condiment coverage without pretending that broad meal categories are measured facts.

## 13. Open Human-Review Questions

1. Should the first evidence implementation contain only `egg` plus the three condiment ranges?
2. May internal Food References use a 100-g evidence basis while the UI continues to show hybrid portions?
3. Should `rice` explicitly become plain cooked white rice, and should `1 bowl` receive a defined gram basis?
4. Should `chicken` be removed in favour of specific cuts, or retained as a low-detail composition item with unknown sodium?
5. Which fish species should enter the pilot first?
6. Should shrimp split into untreated and additive/label-declared products?
7. Should regular and reduced-sodium soy/fish sauce be separate Food References?
8. Should oyster sauce use the wide generic range or require product-label evidence?
9. Should soup base split into cube, powder, and liquid concentrate before UI work?
10. Should broad `fruit`, `fried_snack`, `dessert`, and `dipping_sauce` remain selectable but sodium-unknown, or be deferred from the first UI pilot?
11. Is Thai FCD item-level evidence capture required before approving plain Thai staples and proteins?

## 14. Research Limitations

- The Thai FCD interface did not provide a stable bulk item export in this pass. No Thai FCD value was inferred from search labels alone.
- USDA SR Legacy is auditable and useful for plain foods, but it is a US database and not a universal representation of Thai varieties, recipes, or products.
- Household measures such as bowl and spoon are not standardized in the current runtime.
- Manufacturer pages can change, and regional formulations may differ under the same product family.
- Restaurant and mixed-dish evidence was intentionally not generalized into Food References.
- No laboratory uncertainty distribution was available; ranges here are evidence-supported bounds, not statistical confidence intervals.
- This audit contains no daily sodium target, disease-specific guidance, or medical recommendation.

## 15. Implementation Boundary

This note changes no runtime data. `js/mealCompositionRuntime.js` remains an immutable 26-item pilot with unknown sodium values. Tests, workbook schemas, export/import, UI, Reflection, Field Review, and the version badge are unchanged.

Human approval is required before any range, serving basis, confidence, or source reference from this audit is added to runtime.
