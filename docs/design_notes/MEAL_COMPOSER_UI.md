# MHB 2.3 - Meal Composer UI

## Status

- Status: implemented and browser-QA reviewed in MHB 2.3D
- Current release: **MHB 2.3 - Gentle Meal Composition**
- Placement: Today, inside `Today's Signals 1/2`
- Storage owner: `mhb_meal_records_v1`, separate from `Daily_Log`
- Workbook meal sheets: deferred
- Main Daily Reflection integration: deferred

## Intent

Meal Composer is a quiet place to assemble a rough record of one meal. It is not a nutrition dashboard, calorie tracker, diet checklist, or clinical food form.

The interaction model is:

```text
Choose meal type
  -> choose known meal components
  -> assemble one meal
  -> adjust approximate portion or optional preparation
  -> keep the meal
  -> derive the recorded-day picture again
```

One meal is information, not a score.

## Today Placement

The entry point is a summary-first card below the existing Today signal cards. It remains collapsed until the user chooses to open the workspace, so Today keeps its existing role and does not become a food dashboard.

The workspace contains four light regions:

1. Meal Type first: a broad, observable description such as stir-fried, curry, or broth-based;
2. category-led Meal Components discovery with optional search;
3. the current unsaved meal draft;
4. compact saved meals for the selected date.

The Dynamic Daily Meal Reflection Panel stays visible at the bottom. It is visually separate from the draft because it describes saved Meal records only.

## Interaction Contract

- Meal Type is the first interaction. It is optional, persists as `meal_type`, and defaults safely to `unspecified` for legacy records.
- Meal Components are secondary. The user selects only what they saw or remember; they never need to reconstruct a recipe.
- Food discovery starts with one compact component category rather than exposing the full pilot as a large inventory grid.
- Search can find references across categories.
- Condiments are selected exactly like other Food References, but are never required. An explicit `condiment_knowledge: "unknown"` statement is distinct from not recording a condiment and does not create an ingredient or sodium inference.
- Portion uses the runtime hybrid labels `small`, `regular`, `large`, and `custom`.
- Preparation remains optional; blank and explicit `unknown` retain different meanings.
- Saving creates a Meal Instance and resets only the composer draft.
- Editing preserves `meal_id` and updates the target Meal Instance.
- Deleting asks for gentle confirmation and removes only the target meal.
- Multiple meals per date are supported without imposing breakfast/lunch/dinner limits.

The UI module does not reimplement storage, sodium scaling, coverage, confidence, or daily-summary rules. Those remain owned by `js/mealCompositionRuntime.js`.

## Evidence and Unknown Values

Sodium detail appears after an item is selected, not throughout the food picker. The current evidence-backed references remain `egg`, `fish_sauce`, `soy_sauce`, and `oyster_sauce`; all other pilot references stay unknown unless a later evidence review approves them.

The draft summary uses `deriveMealEstimate()`. The daily panel uses `deriveDailyMealSummary()` over saved meals. Complete, partial, and unknown coverage remain visible:

- complete: all recorded items have supported ranges;
- partial: at least one range is supported and at least one recorded item is unknown;
- unknown: no supported range is available.

Unknown is never rendered as `0 mg`. No score, traffic-light state, medical sodium target, or food-quality label is introduced.

## Meal Type and Condiment Boundaries

`meal_type` describes only the broad form the user recognizes. It does not supply hidden recipe details, estimate sodium, select a Reflection Root, or create a food-quality conclusion. The Meal Type taxonomy stays intentionally small: unspecified, stir-fried, boiled, curry, fried, grilled, steamed, broth-based, minimally prepared, and other.

The optional unknown-condiment control preserves a user statement of uncertainty. A meal with no condiment item means only that none was recorded. Meal-Type-aware sodium estimation, restaurant-food assumptions, and any unknown-condiment estimate logic are intentionally deferred to **MHB 2.3F**.

### MHB 2.3E.1 Visual Polish

Meal Type keeps the same semantic button, `aria-pressed` selected state, and persisted value, but presents each option as a compact 2D illustrated card. Lightweight inline SVG line art is an orientation cue for meal form, not a food catalog or nutritional claim. Cards use the existing theme variables, a quiet selected check, keyboard-visible focus, and a responsive grid: five columns on wide layouts, four on tablet, and two on narrow screens. Motion is limited to a 1px hover lift and subtle selected-state transition, both disabled under reduced-motion preferences.

### MHB 2.3E.2 Component Discovery Polish

Meal Components use category-first progressive disclosure. The initial category remains compact, while `All` shows eight references before offering an explicit control for the remaining items. A non-empty search always searches across every category and is not capped by the `All` disclosure limit, so users can look for a known component without first choosing its internal category.

Each Food Reference card reflects how many matching Meal Item Instances are already in the current draft. The quiet selected tint and `In this meal` count are orientation cues; the add action remains available because duplicate Food References are intentionally supported as separate Meal Item Instances. Removing an item updates the count immediately and clears the selected state when the final matching instance leaves the draft. No selected state changes Food Reference ownership, sodium evidence, or saved-meal semantics.

The search field precedes category filters and component cards. Narrow layouts keep a compact two-column component grid down to 360px, then use one column below that threshold. This reduces scanning and vertical fatigue without adding another navigation layer.

### MHB 2.3E.3 Meal Presence Polish

The draft, save confirmation, and saved-meal cards share one lightweight symbolic plate. Its tokens are derived only from the Meal Item Instances currently being presented, using the existing Food Reference icon map and a neutral fallback when no icon exists. The visual never supplies an ingredient, amount, preparation, condiment, nutrition value, or sodium inference; component names remain available as text.

Saving uses a single render-frame acknowledgment rather than simulated progress. The save action briefly reads `Keeping this meal…`, then the persisted Meal Instance appears in a calm confirmation card and in the recorded-meal list. The confirmation states that the record now exists; it is not praise, an achievement, or a reward. Reduced-motion preferences remove the arrival and saving animations.

Saved meals use compact vertical cards with time when recorded, meal label, Meal Type, component names, the shared plate visual, and the existing edit/remove actions. The section states the number of **recorded meals**, never the number of meals eaten. Multiple cards remain independent, and reload reconstructs every visual from canonical saved Meal Instances instead of persisting presentation data.

### MHB 2.3F-UX Explicit Named-Dish Confirmation

When structured components exactly support one of the two approved fried-rice identities, Meal Composer may show a compact reference card. This is a deterministic `manual_structured` suggestion only: it does not persist, change the draft estimate, or enter the daily summary until the user explicitly selects the reference. Confirmation sets the optional `named_dish_id`; rejection is draft-only, and clearing a confirmation removes only that identity reference, never Meal Items.

The card identifies the Thai Food Composition Database and the source basis as 100 g. Its copy explicitly states that the number is not a whole-plate estimate. A confirmed reference remains visible when editing and after reload. Meal Type alone never produces a candidate.

Runtime consistency is checked again from the persisted Meal Instance. A non-stir-fried Meal Type is a soft conflict: the user retains the confirmed identity and the evidence may remain usable. An evidence conflict, such as pork or egg recorded with `fried_rice_vegetable`, suspends the named-dish base without deleting the meal or its components. The estimate then falls back to the existing component-only or unknown path. Components never auto-confirm a reference, no hidden components are created, and no additional named dish is introduced.

## Daily Meal Reflection Panel

The panel re-derives after create, edit, or delete. It may mention:

- recorded meal count;
- food categories visible in recorded meals;
- recorded condiment presence;
- supported sodium range and visible coverage limits.

Every sentence remains source-bound. It says `recorded meals`, not how many meals the user ate. Missing vegetable, condiment, or sodium data never becomes proof of absence, low intake, or a health conclusion.

The panel is a Today reading surface. `buildMealReflectionContext()` remains available, but meal facts are not yet injected into the main Reflection renderer and cannot select or override a Reflection Root.

## Presentation and Access

- TH is the semantic tone source; EN and Simplified Chinese preserve the same non-judgmental meaning.
- Semantic buttons and labeled form controls support keyboard use.
- Remove actions include text and accessible labels; there are no icon-only destructive controls.
- Desktop uses a compact multi-column picker; narrow screens stack controls without page overflow.
- Dark mode reuses existing MHB variables.
- Motion is limited to subtle hover/appearance behavior and is disabled under `prefers-reduced-motion`.

## Deferred Boundaries

This slice does not add:

- `Food_Reference`, `Meals`, or `Meal_Items` workbook sheets;
- workbook export/import for Meal records;
- user-facing meal wording in the main Daily Reflection;
- Field Review meal analysis;
- custom food editing, barcode/API lookup, image recognition, calories/macros, scores, or medical targets.

These require separate bounded contracts and regression review.

## MHB 2.4E Addendum - Bounded Local Vision Review

Meal Composer now contains an experimental, optional local Vision helper after Meal Type and before component discovery. A selected PNG/JPEG/WebP is passed through a provider-neutral image normalizer and sent only to the validated loopback provider. HEIC/HEIF selection fails calmly without draft mutation because the direct browser/Ollama probe did not support it and no conversion dependency is included. The resulting `VisionMealObservation` remains transient and is rendered as a review surface; it never mutates the draft on arrival.

The user may accept or omit safe component suggestions, resolve ambiguous labels through an explicit Food Reference choice, and choose at most one Meal Type suggestion because the current contract remains single-select. Dish text is informational only. Applying the review conservatively adds missing accepted items and fills only an unspecified Meal Type; existing human draft facts, quantities, preparation, condiment knowledge, label, and time win or remain unchanged.

Applying Vision review is not meal save and cannot set `named_dish_id`. Any named-dish candidate is derived later by the existing deterministic helper and still requires its separate confirmation card. Provider errors and invalid output leave the draft untouched and return calmly to normal manual composition.
