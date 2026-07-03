# Signal Engine UX Audit - Non-Technical User Review

Patch type: Signal Engine UX/UI audit only.

This note reviews the current Signal Engine from the perspective of non-technical users. It does not propose hiding `r`, removing auditability, changing Pearson calculation, changing ranking, adding charts, adding LLM, or changing runtime behavior.

## 1. Executive Summary

- Signal Engine is now correctly separated from the six Guided Field Rooms, which helps users understand it as an engine-level module rather than a seventh reflection room.
- The current meaning-first titles are a strong improvement: users can read "น้ำดื่ม ↔ กิจกรรม/งานของวัน" before seeing `Water_ml ↔ Load_Score`.
- Keeping `r`, `n paired days`, and raw column audit lines visible is important and should stay. The issue is not presence, but reading order and explanation.
- For non-technical users, `r` can still feel like a research/statistics artifact if it appears before a plain-language explanation of what it means.
- NuTuenSai meaning helps translate the result, but the page could better teach the user how to read evidence chips: direction, strength, tentative/observed, and near-zero.
- Health-anxious users may still over-read strong relationships as warning signs unless the boundary is repeated close to the selected meaning.
- The next safest improvement is small UX copy/layout polish: add a plain-language `r` helper, compact legend, clearer badge labels, and make raw audit lines visually secondary while preserving them.

## 2. What Already Works

### Signal Engine separation

The sidebar now separates Guided Field Rooms from `Signal Engine`. This is important because Signal Engine is not a reflection room. It is a deterministic relationship engine that reads co-moving numeric signals.

### Meaning-first titles

Relationship rows and detail titles use human-readable labels first. This helps users start with meaning:

- น้ำดื่ม ↔ กิจกรรม/งานของวัน
- ชั่วโมงนอน ↔ เครื่องดื่มคาเฟอีน
- บริบทความหวาน ↔ ชั่วโมงนอน

Raw column names still appear as audit evidence, which preserves traceability.

### `r` and `n` remain visible

The page keeps `r` and paired-row count visible. This is correct because Signal Engine needs computational evidence and auditability. Users should be able to see what the system is using, even if they do not know statistics.

### Selected row active state

The selected row has a soft blue active state. This gives the user a reasonable sense of "this is what the right panel is explaining."

### NuTuenSai explanation

The detail panel gives a source-bound NuTuenSai meaning rather than only reporting `r`. This makes the engine warmer and less like a research table.

### No causation boundary

The boundary line is present and important:

- correlation is not causation
- not diagnosis
- not medical advice

This must remain visible.

## 3. Non-Technical User Friction Points

### Persona A: user who does not know statistics

This user wants to know, "What is my data saying?" They may not know where to look first.

Likely friction:

- `r = +0.51` appears important but unexplained.
- "moderate", "weak", and "strong" can feel like grades.
- Raw audit lines may look like code and pull attention away from the meaning title.
- The user may read the row as a dashboard score instead of a gentle self-reflection signal.

### Persona B: user who has heard "correlation" but does not understand `r`

This user may understand that correlation is a relationship but not understand positive/negative values.

Likely friction:

- Positive and negative direction may be confused with good/bad.
- `r` may feel precise enough to over-trust.
- "observed pattern" vs "tentative signal" may not immediately communicate the role of `n`.
- The user may ask, "Is +0.51 a lot?" and need a mini legend.

### Persona C: health-anxious user

This user may turn any pattern into a health warning.

Likely friction:

- Strong relationships may feel alarming.
- A relationship involving sleep, caffeine, sweetness, or load may be read as medical risk.
- The detail panel can still feel official because it has numbers, badges, and a signature.
- Boundary text may be read once and then ignored if not placed close enough to the meaning.

## 4. Potential Misunderstanding Risks

### High `r` may be read as cause

Even with boundary copy, a user may read "strong" as "X causes Y." This is especially likely for pairs such as:

- ชั่วโมงนอน ↔ เครื่องดื่มคาเฟอีน
- บริบทความหวาน ↔ ชั่วโมงนอน
- กิจกรรม/งานของวัน ↔ ชั่วโมงนอน

### Weak/strong may feel like good/bad

"Weak" and "strong" can accidentally sound like evaluation. Users may think:

- strong = important / dangerous
- weak = bad data / useless

The UI should explain that weak/moderate/strong describes how tightly two signals moved together, not whether the behavior is good or bad.

### Health-anxious users may read it as warning

When health-adjacent fields are involved, users may interpret correlation as risk prediction. The page should keep saying:

- reads co-movement
- not medical advice
- not diagnosis
- not risk prediction

### Near-zero may be misunderstood

Near-zero can be misread as:

- "this does not matter"
- "my data is useless"
- "there is no relationship"

MHB's better phrasing is:

- "ยังไม่ชัด"
- "ยังไม่ควรสรุป"
- "not enough co-moving rhythm is visible in this selected window"

Near-zero is unclear, not weak evidence.

### Research dashboard feeling

The current row list has multiple badges: `r`, paired days, direction, strength. That is useful but can feel like a research dashboard if the meaning sentence is not visually dominant.

## 5. Recommended UI Adjustments

### Add a plain-language `r` helper

Keep `r` visible, but add a small helper near it:

> `r` บอกทิศทางและความแน่นของการเคลื่อนไหวร่วมกัน ไม่ใช่เหตุและผล

EN:

> `r` shows direction and tightness of co-movement, not cause and effect.

This would reduce intimidation without hiding the evidence.

### Make `r` an evidence chip

Display `r` as a clear evidence chip, but visually lower than the meaning title:

1. Human-readable title
2. NuTuenSai meaning
3. Evidence chips: `r`, `n`, direction, strength
4. Raw audit line

The current structure is close, but the detail panel could make "meaning first, evidence second" even clearer.

### Add a compact mini legend

A small collapsed or inline legend could explain:

- same direction = signals rise/fall together
- opposite direction = one rises while the other tends to fall
- unclear = not enough visible co-moving rhythm

This should be short and non-technical.

### Split each row into three layers

Recommended row structure:

1. Meaning title: น้ำดื่ม ↔ กิจกรรม/งานของวัน
2. Plain signal sentence: เคลื่อนไหวทางเดียวกันระดับหนึ่งในข้อมูลที่เลือก
3. Evidence chips: `r = +0.51`, `14 paired days`, tentative/observed

Raw audit line remains, but visually smaller.

### Add "How to read this" collapsed note

A small note above the relationship list:

> วิธีอ่าน: ดูชื่อสัญญาณก่อน แล้วอ่านความหมายด้านขวา ค่า `r` เป็นหลักฐานคำนวณ ไม่ใช่คำตัดสินหรือเหตุและผล

This helps Persona A and B immediately.

### Prefer "co-moving signal" / "จังหวะร่วมกัน"

Some places can use "จังหวะร่วมกัน" instead of "pattern" when the goal is to avoid over-certainty.

Possible wording:

- "สัญญาณที่เคลื่อนไหวร่วมกัน"
- "จังหวะร่วมกันในข้อมูลที่เลือก"
- "co-moving signal"

### Keep selected row visually clear

The active row is already clearer than before. If screenshots still feel ambiguous, increase:

- left accent line
- active border contrast
- selected glow

Keep it soft blue / icy blue.

### Near-zero visual treatment

Near-zero rows should feel neutral, not failed. If shown:

- use soft neutral badge
- label "ยังไม่ชัด"
- do not call it weak
- do not use warning or error styling

## 6. Recommended Copy Changes

### `r` helper

TH:

> `r` บอกทิศทางและความแน่นของการเคลื่อนไหวร่วมกัน ไม่ใช่เหตุและผล

EN:

> `r` shows direction and tightness of co-movement, not cause and effect.

### Section title

Current panel title can remain, but a smaller helper could say:

TH:

> เลือกสัญญาณด้านซ้ายเพื่ออ่านความหมายจากข้อมูลที่บันทึกไว้

EN:

> Select a signal pair to read what moved together in the saved data.

### Tentative signal

Current "tentative signal" is useful, but may need plain Thai:

TH:

> สัญญาณเบื้องต้น

Helper:

> ข้อมูลครบยังไม่มากพอ จึงควรอ่านเบา ๆ

EN:

> Early signal

Helper:

> Paired data is still limited, so read this lightly.

### Observed pattern

TH:

> pattern ที่เห็นจากข้อมูลที่บันทึกไว้

Helper:

> เห็นซ้ำในข้อมูลมากขึ้น แต่ยังไม่ใช่เหตุและผล

EN:

> Observed pattern

Helper:

> Seen across more paired data, still not causation.

### Near-zero

TH:

> ยังไม่เห็นจังหวะร่วมกันชัด

Helper:

> ค่าใกล้ศูนย์หมายถึงยังไม่ควรสรุป ไม่ใช่หลักฐานอ่อน ๆ

EN:

> Still unclear

Helper:

> Near-zero means no clear co-moving rhythm yet, not weak evidence.

### Boundary line

Current boundary is good. A slightly warmer version could be:

TH:

> ความสัมพันธ์นี้ไม่ใช่เหตุและผล ไม่ใช่การวินิจฉัย และไม่ใช่คำแนะนำทางการแพทย์

EN:

> This relationship is not causation, diagnosis, or medical advice.

### Empty / thin data state

TH:

> ข้อมูลคู่ตัวเลขยังบางอยู่ หนูยังไม่ควรอ่านความสัมพันธ์หนัก ๆ ค่ะ

EN:

> Paired numeric data is still thin, so NuTuenSai should not read relationships strongly yet.

## 7. Comparison Notes

These are high-level conceptual references from the project prompt, not verified product claims.

### Exist.io

Exist-style quantified-self experiences make correlations explorable rather than presenting them like a research paper. MHB can learn from that by making relationship rows clickable and readable as exploratory signals.

MHB should differ by staying more source-bound and gentle:

- no optimization pressure
- no productivity judgment
- no open-ended AI interpretation

### Bearable

Bearable-style health tracking contexts suggest that users need meaning before technical detail. In MHB, the NuTuenSai meaning should remain the main reading layer, while `r`, `n`, and raw columns remain evidence.

MHB should differ by avoiding symptom-risk framing and keeping "not diagnosis / not medical advice" visible.

### Guava Health

Health insight products need strong boundary management because users may over-read trends as medical meaning. Signal Engine should keep explaining that it reads co-movement only.

MHB should differ by being:

- local-first
- source-bound from `Daily_Log`
- meaning-first but audit-visible
- correlation-aware but causation-resistant
- NuTuenSai-voiced rather than clinically authoritative

## 8. Priority Plan

### P0: Must preserve / do not change

- Keep `r` visible.
- Keep `n paired days` visible.
- Keep raw column audit line visible.
- Keep human-readable title as headline.
- Keep correlation-is-not-causation boundary.
- Keep no diagnosis / no medical advice.
- Keep deterministic logic.
- Do not add LLM, free-form ask, chart library, or category mapping.

### P1: Small UI copy/layout polish

- Add plain-language `r` helper.
- Add compact mini legend for same/opposite/unclear.
- Make row reading order more meaning-first.
- Make raw audit line visually secondary.
- Improve tentative/observed wording.
- Keep selected row contrast clear.
- Add near-zero neutral copy.

### P2: Optional future enhancements

- Collapsible "How to read this" panel.
- Tooltip or inline helper for `r`.
- Pair-specific microcopy under each row.
- Small non-chart visual cue for direction, such as a soft arrow or wave.
- Manual QA snapshot tests for all six pair categories.

### Out of scope

- Changing Pearson calculation.
- Changing top-5 ranking.
- Adding Spearman or category mapping.
- Adding charts or matrices.
- Adding LLM/free-form questions.
- Turning Signal Engine into medical, productivity, or risk scoring.

## 9. Implementation Proposal For Next Patch

Next patch should be conservative:

- no calculation change
- no ranking change
- no min-n change
- no voice matrix logic change unless copy-only
- add `r` helper near evidence
- add compact legend
- make raw audit line visually more secondary
- improve badge labels for tentative/observed/near-zero
- adjust selected row contrast only if screenshots still look ambiguous
- keep all boundary text visible

Suggested next patch name:

`MHB Signal Engine UX Polish - r helper + compact legend`

Implementation status:

- Implemented the plain-language `r` helper near the selected relationship evidence.
- Implemented a compact same-direction / opposite-direction / unclear legend.
- Rebalanced relationship rows and detail panels toward meaning-first reading order while keeping `r`, paired days, and raw audit lines visible.
- No Pearson calculation, ranking, minimum-n rule, voice matrix classification, LLM, chart, free-form ask, or category mapping was added or changed by this polish.

## 10. Final Recommendation

Recommended next three improvements:

1. Add a plain-language `r` helper close to the evidence chips so non-technical users know what the number means.
2. Add a compact legend for same direction, opposite direction, and unclear so direction/strength badges feel less like research labels.
3. Rebalance row/detail hierarchy so meaning stays first, evidence stays visible, and raw audit line remains clearly secondary.

Signal Engine is already moving in the right direction. The next step is not more analysis power; it is helping ordinary users read the existing evidence gently, without turning co-movement into cause, diagnosis, warning, or score.
