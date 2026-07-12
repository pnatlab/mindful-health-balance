# MSxAI Development Safety Reference for Mindful Health Balance

## 1. Purpose

This document is an MHB-specific reference to the MSxAI canonical development safety protocol.

This document does not duplicate or replace the canonical MSxAI Development Safety Protocol. It records only the project-specific safety and workflow extensions used by Mindful Health Balance.

Thai note: เอกสารนี้เป็นเพียง reference เฉพาะโปรเจกต์ MHB ไม่ใช่ protocol ฉบับใหม่

## 2. Canonical Protocol

Canonical local path:

`~/Desktop/MindfulSystem_xAi/docs/governance/CODEX_DEVELOPMENT_SAFETY_PROTOCOL.md`

This path is pnat's local workspace path. External GitHub clones may not contain this file or parent workspace structure.

Future agents working on this machine should read the canonical protocol before starting significant implementation or governance-sensitive work. If the canonical path is unavailable, follow the project-specific rules in this file and ask for clarification before making changes with unclear safety, scope, or publication impact.

## 3. MHB Development Defaults

Mindful Health Balance uses these project-specific development defaults:

- Human intention and system analysis come before implementation.
- Codex acts as a bounded implementation agent.
- NuTuenSai / System Analyst reviews scope, regression risk, and commit readiness.
- Human performs final QA.
- Human performs commit and push.
- Use exact-file staging.
- Avoid `git add .`.
- Prefer minimal patches.
- Do not refactor unrelated systems.
- Record meaningful architecture or UX decisions in Markdown design notes or project context docs.
- Keep MHB local-first, user-owned, and source-bound.
- MHB is not a medical, diagnostic, predictive, or scoring tool.

Thai note: งานพัฒนา MHB ต้องเริ่มจากเจตนามนุษย์และการวิเคราะห์ระบบก่อนลงมือแก้โค้ด

## 4. Risk-Proportionate Development Detail

Prompt detail, verification depth, and QA effort should be proportionate to the risk and scope of the task.

- High-risk runtime or data-contract changes require detailed boundaries, stronger verification, and broader regression review.
- Medium-risk changes require a clear bounded scope and proportionate verification.
- Low-risk or docs-only changes should use concise prompts, minimal verification, and avoid unnecessary over-design.

The goal is not maximum detail in every task. The goal is sufficient safety and clarity while respecting time, available budget, Codex usage limits, and the need to support multiple applications across the MSxAI ecosystem.

Thai note: ใช้ความละเอียดเท่าที่จำเป็นต่อระดับความเสี่ยงของงาน ไม่ใช่ละเอียดที่สุดเสมอไป

## 5. Documentation Alignment

Every meaningful implementation must include a documentation impact check before completion.

- User-visible behavior changes should update the relevant README and user guide.
- Architecture, schema, data-boundary, or significant UX-direction changes should update the relevant design note.
- Small visual or maintenance patches that do not change behavior may report that no documentation update is required.
- Current documentation must describe the current runtime clearly; historical design traces must not be presented as current behavior.
- Before a release is locked, `README.md`, `USER_GUIDE_TH.md`, and `USER_GUIDE_EN.md` should be reviewed against the current runtime.

Documentation effort should remain proportional to the risk and significance of the change. This policy requires checking documentation impact, not automatic documentation expansion for every small patch.

Default implementation prompts for MHB should include this documentation impact checklist:

- Check whether the change affects `README.md`, `USER_GUIDE_TH.md`, `USER_GUIDE_EN.md`, or a relevant design note.
- If documentation is affected, update only the related files within the same task scope.
- If documentation is not affected, briefly state why in the implementation report.

Thai note: ทุก implementation ต้องตรวจผลกระทบต่อเอกสาร แต่แก้เฉพาะเอกสารที่เกี่ยวข้องเมื่อมีผลกระทบจริง

## 6. Protected Local Resources

The following local resources are protected by default:

- `Mindful_Health_Balance_Master.xltx`
- Master Excel files containing personal or real user data
- Exported personal datasets
- Local outputs
- Private learning documents
- Files under local-only or ignored paths

Protected local resources must not be opened or edited unless clearly necessary and explicitly allowed. They must not be used as fixtures. They must not be staged or committed.

If these files appear in `git status`, treat them as local artifacts until a human explicitly authorizes otherwise.

## 7. Change and Commit Boundary

Codex may edit project files within the requested scope and report the result. Codex must not commit or push.

The human reviews the diff and QA results before publication. The human performs commit and push.

Git staging must name exact files. Unexpected files in the diff require stopping and reporting before continuing.

## 8. Relationship to the Canonical Protocol

This MHB document extends the canonical MSxAI protocol with project-specific constraints. It does not override the canonical principles of human agency, bounded implementation, minimal change, source-bound development, and human publication.

## 9. Closing Note

This reference exists to reduce context loss and help future humans or agents continue MHB work consistently. It does not introduce a new workflow.
