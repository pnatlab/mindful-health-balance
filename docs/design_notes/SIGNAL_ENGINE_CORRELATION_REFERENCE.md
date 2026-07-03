# Signal Engine Correlation Reference

This note locks the conservative correlation interpretation bands for the Mindful Health Balance Signal Relationship Engine before building the future Meaning Voice Matrix.

Signal Engine uses Pearson correlation to read numeric-to-numeric signals from selected `Daily_Log` rows as exploratory self-reflection only. It is a deterministic relationship reader for saved personal log data.

Signal Engine is not:

- diagnosis
- medical advice
- causation
- prediction
- score or ranking system
- LLM interpretation

## MHB Policy

- "Correlation is not causation."
- "Signal Engine reads co-movement, not cause, diagnosis, or medical risk."
- "Near-zero values should be read as unclear, not as weak evidence."
- "Missing/blank data means not recorded, not failure."

## Core Interpretation Rules

### 1. Direction

Direction is read only when the absolute value is large enough to avoid over-reading noise.

- `r > 0` and `|r| >= 0.20`: same direction / เคลื่อนไหวทางเดียวกัน
- `r < 0` and `|r| >= 0.20`: opposite direction / เคลื่อนไหวสวนทางกัน
- `|r| < 0.20`: near zero / unclear / ยังไม่ชัด

### 2. Strength By Absolute r

MHB uses conservative descriptive bands:

- `|r| < 0.20`: near zero / unclear / ยังไม่ชัด
- `0.20 <= |r| < 0.40`: weak / ต่ำ / สัญญาณเบา ๆ
- `0.40 <= |r| < 0.70`: moderate / กลาง / เห็นจังหวะร่วมกันระดับหนึ่ง
- `|r| >= 0.70`: strong / สูง / เห็นจังหวะร่วมกันค่อนข้างชัด

Even when a relationship is described as strong, the UI must still say it is not cause and effect.

### 3. Sample Size / Paired Rows

Correlation must be read with paired-row count.

- `n < 10`: do not show `r`; data is too thin
- `10 <= n < 30`: label as tentative signal
- `n >= 30`: label as observed pattern

For MHB, `n` means rows where both numeric fields in the selected pair are present, finite, and usable.

## Rationale

There is no single universal threshold for interpreting correlation strength across every field and context. MHB uses conservative bands because `Daily_Log` is a self-care log, not a controlled study. The data can include noise, missing values, changing life context, and small sample sizes.

MHB uses `0.20` as the first threshold for reading a visible signal so that near-zero values are not over-interpreted as patterns. Values below `0.20` should be read as unclear, not as weak evidence.

MHB uses `0.40` as the moderate threshold and `0.70` as the strong threshold to avoid overstating relationship strength. These bands are intentionally simple, stable, and conservative for a local-first self-care app.

The coefficient `r` must always be read together with `n`. A moderate-looking `r` with only 10-29 paired days remains tentative. A larger `n` can make a pattern more stable, but it still does not make the relationship causal.

Correlation is not causation. Signal Engine reads co-movement only.

## References

These references inform the caution and threshold design. They are not copied into the app as universal law.

1. Schober, Boer, and Schwarte (2018), "Correlation Coefficients: Appropriate Use and Interpretation" (`Anesthesia & Analgesia`, DOI: https://doi.org/10.1213/ANE.0000000000002864).
   Key idea: correlation coefficients range from -1 to +1; strength increases as absolute value approaches 1; interpretation requires care and cutoff points should be used cautiously.

2. Mukaka (2012), "A guide to appropriate use of Correlation coefficient in medical research" (`Malawi Medical Journal`, PMC: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3576830/).
   Key idea: correlation is often misused; it assesses possible linear association and should be interpreted cautiously, especially in medical or health-related contexts.

3. Cohen-style effect size conventions / commonly cited guidelines.
   Key idea: small, moderate, and large thresholds are useful as rough conventions, but they are context-dependent and should not be treated as universal law.

## Future Meaning Voice Matrix

Before implementing 30 NuTuenSai meaning voices:

- pair-specific meaning must use these direction and strength bands
- near-zero must have its own unclear voice
- same-direction voices should be split into weak, moderate, and strong
- opposite-direction voices should be split into weak, moderate, and strong
- `n 10-29` must remain tentative even if `|r|` appears moderate or strong
- no medical, diagnosis, causal, risk prediction, performance judgment, productivity score, spiritual score, or finance interpretation wording

The future Meaning Voice Matrix should make the Signal Engine feel more human and NuTuenSai-like while preserving deterministic, source-bound, local-first behavior.
