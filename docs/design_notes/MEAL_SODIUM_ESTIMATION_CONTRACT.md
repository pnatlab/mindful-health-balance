# MHB 2.3F-C - Meal Sodium Estimation Contract

## Status

- Status: **Contract Locked for MHB 2.3F Implementation**.
- Research basis: MHB 2.3F-R is complete.
- Decision status: human architecture decisions in this note are approved.
- Runtime implementation: not yet performed.
- Current public runtime remains **MHB 2.3 - Gentle Meal Composition**.

This contract turns the evidence findings in [MEAL_SODIUM_ESTIMATION_RESEARCH.md](MEAL_SODIUM_ESTIMATION_RESEARCH.md) into the canonical architecture boundary for a future sodium-estimation implementation. It does not add an estimate, change UI behavior, change storage, or set a medical target.

> MHB should ask which evidence is strong enough to justify a number, and what that number represents. It must not seek a number for every meal.

## Canonical Architecture: Evidence-routed Base Estimate

Each Meal Instance has at most one sodium **base estimate**. The engine selects the strongest matching approved evidence and does not silently combine alternate bases.

The canonical precedence is:

1. Exact package or product evidence.
2. Exact restaurant menu evidence.
3. Human-approved named-dish reference.
4. Component-only evidence.
5. Unknown.

This is evidence matching, not a rigid label order. An exact-package basis is valid only when the product and serving match. An exact-restaurant basis is valid only when the restaurant item, serving, and relevant version match. When a purported match is insufficient, the engine must fall back to a lower supported basis or `unknown`; it must not force the match.

## One Base Per Meal

The one-base rule is the canonical anti-double-count boundary.

- A meal with `dish_inclusive` evidence must not add rice, protein, soy sauce, fish sauce, oyster sauce, or other components already included by that named-dish reference.
- A meal with exact package or restaurant evidence must not rebuild the declared product/menu item from its constituent items.
- `component_only` may sum only supported items the user actually recorded, while preserving unsupported recorded items and unknown condiment information as uncertainty.
- A future explicit add-on, such as fish sauce added after service, may be included only when the selected base is documented as excluding it.
- If the inclusive/exclusive boundary is unclear, the add-on must not be added.

The future first implementation uses one base only. `addon_condiment` remains a future extension rather than an automatic second base.

## Estimate Basis and Coverage Are Separate

`estimate_basis`, or an implementation-equivalent field, explains where the number came from. Its initial semantic vocabulary is:

| Basis | Meaning |
| --- | --- |
| `package_exact` | Declared value for the matching product and serving. |
| `restaurant_exact` | Declared value for the matching restaurant menu item and serving. |
| `dish_inclusive` | Approved named prepared-dish reference whose documented basis includes the stated recipe-level scope. |
| `component_only` | Sum of supported Food Reference items the user recorded. |
| `unknown` | No approved evidence basis can justify a numeric estimate. |

`addon_condiment` may be introduced later only with an explicit exclusion boundary. It is not part of the first runtime implementation.

Coverage remains a different fact: it reports coverage of the **recorded evidence**, not proof that MHB reconstructed every part of a meal. The existing vocabulary remains canonical:

- `complete`
- `partial`
- `unknown`

For example, `component_only` with `partial` coverage can show the supported values for recorded items without claiming to know the sodium of the whole dish. A direct dish reference must not be called `complete` merely because it produces a number. The implementation-level mapping of direct evidence to coverage must preserve this distinction.

## Meal Type Is Context Only

`stir_fried`, `boiled`, `curry`, `fried`, `grilled`, `steamed`, `broth_based`, `minimally_prepared`, and `other` are routing, matching, and clarification context only.

Meal Type must never:

- map directly to a sodium value or range;
- imply a hidden condiment quantity;
- create a default estimate;
- imply a health, food-quality, or medical judgment.

It may help surface a named-dish candidate for human confirmation. It is not numeric evidence.

## Named-Dish Evidence Boundary

Named-dish references are allowed only after a separate evidence audit and human approval for each stable dish identity. Candidate names such as `pad_krapao`, `fried_rice`, `pad_see_ew`, `rad_na`, `noodle_soup`, `chicken_rice`, `curry`, `soup`, and `yum` are not an approved runtime data set.

Every approved named-dish reference must record:

- stable identity and match boundary;
- exact source and provenance;
- source serving basis and preparation boundary;
- sodium value or evidence-supported range;
- confidence;
- `estimate_basis`;
- explicit double-count and add-on boundary.

No generic Western proxy may stand in for a Thai dish whose preparation or serving semantics differ.

## Unknown Condiment Boundary

The following meanings are non-negotiable:

- no condiment record does not mean no condiment was used;
- `condiment_knowledge: "unknown"` does not mean zero sodium;
- unknown condiment information does not justify a standard hidden-condiment amount;
- Meal Type does not justify a hidden sauce or seasoning estimate.

An inclusive named-dish reference may be used according to its documented source basis. Without such a basis, MHB may show component-only evidence for what was recorded or return `unknown`. It must not manufacture a hidden-condiment range.

## Confidence and Portion Rules

Confidence keeps the existing evidence-quality vocabulary:

- `high`
- `medium`
- `low`
- `unknown`

Confidence is not food quality, health quality, or a score. It must fail conservatively against the weakest relevant evidence dimension, including source quality, match quality, serving match, preparation match, source agreement, and basis clarity. The runtime must not average confidence or convert it to a 0-100 value.

Food Reference instances with explicit serving and supported scaling may continue to use the existing hybrid portion model. Named-dish evidence must not be scaled automatically by `small`, `regular`, `large`, or `custom`.

A named-dish reference can scale only when all of the following are documented:

- the source serving is clear;
- the conversion is clear;
- the assumption is auditable;
- the reference explicitly allows scaling.

Otherwise, preserve the source serving or do not produce an estimate.

There is no universal range-width threshold in MHB 2.3F. A wide but meaningful, evidenced range may be valid; a wide range without a clear match or basis must remain `unknown`. The Thai named-dish pilot will inform later case-by-case human review rather than a hard-coded percentage rule.

## Minimum Provenance Contract

Every future estimate must be traceable through these semantic responsibilities. Exact field names remain an implementation detail.

```text
estimate_basis
source_type
source_reference
source_accessed_or_version
matched_identity
serving_basis
conversion_assumption_if_any
sodium_min
sodium_max
confidence
coverage
unknown_flags
add_on_boundary
```

The UI may show a concise explanation, while storage, audit, and future portability surfaces retain the trace needed to distinguish a declared package, a declared restaurant meal, an approved dish reference, and component-only evidence.

## User-facing Language Contract

Sodium language must remain factual, source-bound, uncertainty-visible, concise, non-medical, and non-scoring.

Permitted semantic patterns include:

- direct evidence: “Estimated from a reference for this recorded item.”
- component-only partial evidence: “This estimate comes from recorded items with supported data; some parts of the meal are still unknown.”
- named-dish evidence: “Estimated from a reference for this named dish and matching serving.”
- unknown: “There is not enough evidence to estimate sodium for this meal reliably.”

The future implementation must not describe sodium as high, low, over, good, bad, risky, or safe from an estimate alone.

## LLM and Vision Boundary

LLM and vision systems may only act as routing or support layers. Future uses may include normalizing dish text, suggesting a dish candidate from a photo, asking for clarification, or explaining a deterministic result.

They must never generate a sodium number, invent hidden ingredients, assign confidence, create provenance, or bypass the deterministic evidence engine. Any AI-suggested dish identity requires user confirmation before it can become the canonical match.

## Explicitly Rejected Approaches

The following are forbidden in MHB 2.3F:

- a Meal Type lookup table;
- a default hidden-condiment amount or hidden sauce band;
- arbitrary percentage ranges;
- LLM-generated or photo-generated sodium numbers;
- automatic dish, component, and condiment summation without an explicit basis boundary;
- generic Western proxies for Thai dishes;
- blogs, SEO pages, or other weak secondary sources as canonical evidence;
- medical sodium targets or alerts;
- nutrition, sodium, food, or meal scores.

## Next Slice: MHB 2.3F-D

The next slice is **MHB 2.3F-D - Thai Named-Dish Evidence Pilot**. It will audit a small, human-reviewable set of approximately 5-10 named Thai dishes. It remains docs and evidence work only.

Each candidate must be traceable, serving-specific, human-reviewed, and bounded against universal dish assumptions. Human approval of that subset must occur before the later MHB 2.3F-I runtime implementation.

## Implementation Boundary

This contract does not change the current MHB 2.3 runtime. It does not alter Food Reference evidence, Meal Type semantics, `condiment_knowledge`, sodium calculations, Meal storage, UI, Reflection, workbook schema, import/export, Daily_Log, or the public version.

