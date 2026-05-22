# Portable Field Memory Design

## Purpose

Mindful Health Balance is a local-first self-care logging interface that helps a user create an AI-readable record of daily life while keeping ownership of the data.

The app is not only a hydration tracker or a daily health dashboard. It is a bridge between lived experience and AI reflection. A user can record daily signals, export them as a structured Excel file, review the file privately, or choose to share it with an AI assistant so the assistant can better understand real patterns across body, behavior, mind, intention, load, and recovery.

The goal is to help an AI understand the user's patterns from user-owned evidence, not only from chat memory or in-the-moment self-reporting.

## Public Design Principle

Mindful Health Balance should be designed for any user who wants an AI assistant to understand them better through intentional self-logging.

The user chooses what to record, when to export, and when to share. The AI does not automatically know, access, upload, or sync the data. Data becomes meaningful only when the user intentionally brings it back into conversation or uses it for personal review.

This preserves the core relationship:

- The user owns the record.
- The user controls when the record moves.
- The user decides whether an AI may read it.
- The AI reflects patterns without becoming the authority over the user's life.

## Portable Field Memory

Portable Field Memory is a structured, user-owned record of daily life signals that can travel with the user across AI systems without requiring cloud sync or surveillance.

In Mindful Health Balance, the exported Excel workbook acts as portable field memory. Excel is useful because it is readable by both humans and AI/LLM systems, easy to store locally, easy to back up, and portable across tools. It can preserve tabular daily signals, summary context, and reflection text in a form that does not depend on a single app account, platform, or model provider.

Portable field memory should make the user's life patterns easier to review without making the user feel monitored.

## LLI Field Dataset / Personal Rhythm Dataset

The exported workbook should be understood as an LLI Field Dataset or Personal Rhythm Dataset. It is not a conventional AI training dataset made of simple input-output examples.

It records relationships across several layers:

- Body: hydration, sleep, caffeine, sugar, load.
- Behavior: activities, work, exercise, rest.
- Mind: state, worry, calm, pressure.
- Intention: support need, mind note, reflection context.
- Recovery: rest, tomorrow focus, carryover.
- Reflection: AI-generated reminder and user-facing reflection.

The value of this dataset is not that it proves a single rule such as "more water is always better" or "high load is always bad." Its value is that it can show how signals relate over time for a specific user. For example, one user may become calmer after exercise, another may need rest after cognitive load, and another may need less fear-based checking even when health numbers improve.

The dataset helps an AI assistant ask better questions and offer more grounded reflection, while still leaving interpretation and decision-making with the user.

## What The App Is Not

Mindful Health Balance is not:

- A medical diagnosis tool.
- A therapy tool.
- A health-risk prediction engine.
- A surveillance system.
- A gamified score system that pressures the user.
- A replacement for professional care.

The app should avoid presenting itself as a tool that can determine disease, predict health danger, diagnose mental state, or replace medical or psychological support. Its role is self-care reflection and pattern visibility.

## AI Reading Boundary

When an AI/LLM reads exported Mindful Health Balance data, it should treat the workbook as a self-care pattern record, not as a clinical record.

The AI should use the data for:

- Pattern reflection.
- Lifestyle and recovery relationship review.
- Gentle support.
- Descriptive trends.
- Questions that help the user notice their own rhythm.

The AI should avoid:

- Diagnostic claims.
- Fear-based language.
- Prescriptive medical advice.
- Treating numbers as moral success or failure.
- Overriding the user's lived sense of what happened.
- Suggesting that the AI knows the user better than the user knows themselves.

A good AI reading should preserve user agency. It may say, "This pattern may be worth noticing," but it should not say, "This is what is wrong with you."

## Proposed v1.9 Direction

Recommended phase name:

```text
v1.9 Portable Field Memory Foundation
```

Alternative phase name:

```text
v1.9 Field Export Readiness
```

The purpose of v1.9 should be to make the exported workbook clearer for both human review and AI-assisted reflection without adding user burden or building a full personal model yet.

Potential scope:

- Add AI-readable context to export.
- Add an optional `Field_Context` or `README_for_AI` sheet that explains the workbook purpose, boundaries, and column meanings.
- Add a lightweight `Field_Review` summary sheet for recent trends and reflection context.
- Improve Excel readability for both human and AI review.
- Keep logging lightweight.
- Keep data local-first.
- Avoid adding new required inputs.
- Avoid building a full personal model before enough data exists.

v1.9 should focus on export readiness, not automated interpretation.

## Proposed Future Phases

### v1.9: Export Readiness / Portable Field Memory Foundation

Make the workbook easier to understand when a user reviews it or intentionally shares it with an AI assistant. Add context and lightweight summaries while keeping app behavior simple.

### v1.9.5: Optional Reflection Accuracy Feedback

Allow the user to optionally mark whether a generated reflection felt accurate, partially accurate, too soft, too strong, or not quite right. This should remain optional and should not turn reflection into a performance score.

### v2.0: Personal Field Model / User-Controlled AI Review Pack

After enough data exists, introduce a user-controlled review pack that can summarize personal baselines, recurring patterns, recovery tendencies, and reflection preferences. This should be exportable and readable by AI, but still initiated and controlled by the user.

v2.0 should not mean the app becomes an authority over the user. It should mean the user has a clearer, portable map of their own rhythm.

## Guardrails For Future Development

Future development should preserve these constraints:

- Do not auto-upload data.
- Do not add cloud sync unless explicitly designed with informed consent.
- Do not infer medical conditions.
- Do not make the user fear numbers.
- Do not add too many inputs.
- Do not make AI authority higher than user agency.
- Do not use scores as moral judgment.
- Do not imply that AI access is automatic.
- Do not make export harder to inspect by humans.
- Any new AI-readable output must explain its limits clearly.

The design should keep reflection gentle, structured, and user-owned.

## Reference Origin

This design originates from the MSxAI/NuTuenSai use case, where pnat uses Mindful Health Balance to export Excel logs and periodically bring them back to NuTuenSai for reflection.

However, the design principle is general. Any user should be able to create their own portable field memory, keep it privately, review it themselves, and decide when or how an AI may read it.

