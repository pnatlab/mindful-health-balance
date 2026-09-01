import {
  buildMealNameProposalInput,
  createLocalOllamaMealNameProposalAdapter
} from "../js/mealNameProposal.mjs";

function observation(id, dish, components, uncertainty = []) {
  return {
    observation_id: id,
    dish_candidates: dish.map((label) => ({ label, confidence: "unknown" })),
    visible_components: components.map((label) => ({ label, confidence: "unknown" })),
    meal_type_candidates: [{ meal_type: "other", confidence: "unknown" }],
    uncertain_observations: uncertainty.map((label) => ({ topic: "component_identity", label })),
    not_observable: ["sauce_identity", "seasoning_amount"]
  };
}

function review(id, components) {
  return {
    observationId: id,
    components: components.map((mappingStatus, index) => ({
      reviewId: `vision-component-${index}`,
      mappingStatus,
      selectedFoodId: mappingStatus === "safe_exact" ? ["rice", "egg", "shrimp", "noodles", "mixed_vegetables"][index] || "" : ""
    }))
  };
}

const cases = [
  {
    id: "synthetic-braised-meat-uncertain",
    humanReviewCategory: "useful",
    input: buildMealNameProposalInput({
      observation: observation("synthetic-braised-meat-uncertain", ["rice with braised meat"], ["rice", "meat"], ["animal protein species"]),
      review: review("synthetic-braised-meat-uncertain", ["safe_exact", "needs_user_choice"]),
      requestId: "probe-1",
      language: "th"
    })
  },
  {
    id: "synthetic-pork-and-egg",
    humanReviewCategory: "useful",
    input: buildMealNameProposalInput({
      observation: observation("synthetic-pork-and-egg", ["rice with pork and egg"], ["rice", "pork", "egg"]),
      review: review("synthetic-pork-and-egg", ["safe_exact", "needs_user_choice", "safe_exact"]),
      requestId: "probe-2",
      language: "th"
    })
  },
  {
    id: "synthetic-shrimp-noodles",
    humanReviewCategory: "useful",
    input: buildMealNameProposalInput({
      observation: observation("synthetic-shrimp-noodles", ["noodle soup"], ["noodles", "shrimp"]),
      review: review("synthetic-shrimp-noodles", ["safe_exact", "safe_exact"]),
      requestId: "probe-3",
      language: "th"
    })
  },
  {
    id: "synthetic-rice-and-vegetables",
    humanReviewCategory: "useful",
    input: buildMealNameProposalInput({
      observation: observation("synthetic-rice-and-vegetables", ["rice with vegetables"], ["rice", "mixed vegetables"]),
      review: review("synthetic-rice-and-vegetables", ["safe_exact", "safe_exact"]),
      requestId: "probe-4",
      language: "th"
    })
  },
  {
    id: "synthetic-ambiguous-food",
    humanReviewCategory: "appropriately_absent",
    input: buildMealNameProposalInput({
      observation: observation("synthetic-ambiguous-food", ["unknown"], ["food"], ["dish identity unclear"]),
      review: review("synthetic-ambiguous-food", ["unsupported"]),
      requestId: "probe-5",
      language: "th"
    })
  }
];

const adapter = createLocalOllamaMealNameProposalAdapter();
const availability = await adapter.isAvailable();
if (availability.status !== "ready") {
  console.log(JSON.stringify({ corpusType: "synthetic_bounded_context", availability: availability.status, cases: [] }, null, 2));
  process.exitCode = 2;
} else {
  const results = [];
  for (const probe of cases) {
    const result = await adapter.propose(probe.input);
    results.push({
      id: probe.id,
      status: result.status,
      candidates: result.proposal?.candidates || [],
      validatorResult: result.proposal?.status || "error",
      latencyMs: result.diagnostics?.latencyMs ?? null,
      promptId: result.diagnostics?.promptId || "meal-name-lines-v1",
      humanReviewCategory: probe.humanReviewCategory
    });
  }
  console.log(JSON.stringify({
    corpusType: "synthetic_bounded_context",
    model: availability.diagnostics?.model || adapter.model,
    promptId: "meal-name-lines-v1",
    language: "th",
    cases: results
  }, null, 2));
}
