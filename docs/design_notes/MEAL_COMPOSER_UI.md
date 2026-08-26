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
