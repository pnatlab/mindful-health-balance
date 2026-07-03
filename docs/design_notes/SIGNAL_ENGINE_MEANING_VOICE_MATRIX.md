# Signal Engine Meaning Voice Matrix

This note defines the test/design matrix for the NuTuenSai Meaning Voice Matrix in the MHB Signal Relationship Engine.

It depends on:

- `docs/design_notes/SIGNAL_ENGINE_CORRELATION_REFERENCE.md`

This is the source-of-truth design/test reference for runtime wording. It must not change Pearson calculation, top-5 ranking, minimum-n rules, export/import, or workbook schema.

## Scope

Signal Engine reads numeric-to-numeric co-movement from `Daily_Log` as exploratory self-reflection. It does not generate LLM text. The Meaning Voice Matrix should choose deterministic, pair-specific NuTuenSai wording from:

- relationship pair
- direction band
- strength band
- paired-row count band

It must keep raw column names as audit evidence, but the primary user-facing wording should use human-readable meaning phrases.

## Meaning Dictionary

Use these human meanings as the primary language layer:

| Raw field | Meaning phrase |
| --- | --- |
| `Water_ml` | ปริมาณน้ำที่พี่บันทึกไว้ |
| `Load_Score` | กิจกรรม งาน หรือแรงใช้ของวัน |
| `Sleep_Hours` | ชั่วโมงนอนที่บันทึกไว้ |
| `Caffeine_Score` | เครื่องดื่มที่มีคาเฟอีน / caffeine load |
| `Sugar_Score` | เครื่องดื่มหรือบริบทความหวาน |
| `Practice_Minutes` | เวลาภาวนาที่บันทึกไว้ ไม่ใช่คะแนนภาวนา |

## Correlation Bands To Use

Use the conservative bands from `SIGNAL_ENGINE_CORRELATION_REFERENCE.md`:

- `|r| < 0.20`: near-zero / unclear / ยังไม่ชัด
- `0.20 <= |r| < 0.40`: weak / สัญญาณเบา ๆ
- `0.40 <= |r| < 0.70`: moderate / เห็นจังหวะร่วมกันระดับหนึ่ง
- `|r| >= 0.70`: strong / เห็นจังหวะร่วมกันค่อนข้างชัด

Direction:

- `r > 0` and `|r| >= 0.20`: same direction / เคลื่อนไหวทางเดียวกัน
- `r < 0` and `|r| >= 0.20`: opposite direction / เคลื่อนไหวสวนทางกัน
- `|r| < 0.20`: unclear / ยังไม่ชัด

Sample size:

- `n < 10`: do not show `r`; data too thin
- `10 <= n < 30`: tentative signal
- `n >= 30`: observed pattern

## Voice Category Matrix

Each relationship pair needs these voices:

| Category | Trigger | Required tone |
| --- | --- | --- |
| same-weak | `r > 0`, `0.20 <= |r| < 0.40` | Same direction, light signal, do not overstate |
| same-moderate | `r > 0`, `0.40 <= |r| < 0.70` | Same direction, visible rhythm, still contextual |
| same-strong | `r > 0`, `|r| >= 0.70` | Same direction, fairly clear rhythm, still not causation |
| opposite-weak | `r < 0`, `0.20 <= |r| < 0.40` | Opposite direction, light signal, no causal claim |
| opposite-moderate | `r < 0`, `0.40 <= |r| < 0.70` | Opposite direction, visible rhythm, watch gently |
| opposite-strong | `r < 0`, `|r| >= 0.70` | Opposite direction, fairly clear rhythm, still not causation |
| near-zero | `|r| < 0.20` | Unclear voice, not weak evidence |
| tentative-n | `10 <= n < 30` | Add tentative wording even if strength is moderate/strong |
| observed-n | `n >= 30` | May say observed pattern, still not cause/effect |

## Pair Coverage

The matrix covers all six candidate pairs used by the Signal Engine. The UI may show only the top five valid rows by absolute `r`, but the voice library should cover all six.

### 1. Water_ml ↔ Load_Score

Primary meaning:

- `Water_ml`: ปริมาณน้ำที่พี่บันทึกไว้
- `Load_Score`: กิจกรรม งาน หรือแรงใช้ของวัน

| Voice | Template intent |
| --- | --- |
| same-weak | ปริมาณน้ำที่บันทึกไว้กับกิจกรรม/งานของวันเคลื่อนไหวไปทางเดียวกันแบบเบา ๆ อาจเป็นจุดให้สังเกตวันที่ใช้แรงมากขึ้น แต่ยังถือเป็นสัญญาณเริ่มต้น |
| same-moderate | เห็นจังหวะร่วมกันระดับหนึ่ง: วันที่กิจกรรม งาน หรือแรงใช้ของวันสูงขึ้น มักมาพร้อมปริมาณน้ำที่บันทึกไว้สูงขึ้นด้วย ควรอ่านร่วมกับบริบทของวัน |
| same-strong | เห็นจังหวะร่วมกันค่อนข้างชัดระหว่างกิจกรรม/งานของวันกับปริมาณน้ำที่บันทึกไว้ แต่ยังเป็น co-movement ไม่ใช่เหตุและผล |
| opposite-weak | สัญญาณเบา ๆ ว่าวันที่กิจกรรม/งานสูงขึ้นอาจไม่ได้มาพร้อมน้ำที่สูงขึ้นในช่วงนี้ ควรดูร่วมกับอากาศ กิจกรรมจริง และการพัก |
| opposite-moderate | เห็นจังหวะสวนทางระดับหนึ่งระหว่างกิจกรรม/งานของวันกับปริมาณน้ำที่บันทึกไว้ เป็นจุดชวนสังเกต ไม่ใช่ข้อสรุป |
| opposite-strong | เห็นจังหวะสวนทางค่อนข้างชัดในข้อมูลที่เลือก แต่ต้องย้ำว่าเป็นความสัมพันธ์จาก Daily_Log ไม่ใช่เหตุและผล |
| near-zero | ยังไม่เห็นจังหวะร่วมกันชัดระหว่างปริมาณน้ำกับกิจกรรม/งานของวัน |
| tentative-n | ถ้า `n` อยู่ 10-29 ให้ใช้คำว่า "ในข้อมูลช่วงนี้" และ "สัญญาณเบื้องต้น" |
| observed-n | ถ้า `n >= 30` ใช้คำว่า "observed pattern / pattern ที่เห็นจากข้อมูลที่บันทึกไว้" แต่ยังไม่ใช้ causal wording |

### 2. Sleep_Hours ↔ Load_Score

Primary meaning:

- `Sleep_Hours`: ชั่วโมงนอนที่บันทึกไว้
- `Load_Score`: กิจกรรม งาน หรือแรงใช้ของวัน

| Voice | Template intent |
| --- | --- |
| same-weak | ชั่วโมงนอนที่บันทึกไว้กับกิจกรรม/งานของวันเคลื่อนไหวไปทางเดียวกันแบบเบา ๆ อาจสะท้อนวันที่มีทั้งแรงใช้และพื้นที่พัก |
| same-moderate | เห็นจังหวะร่วมกันระดับหนึ่งระหว่างชั่วโมงนอนกับกิจกรรม/งานของวัน ควรอ่านเป็นบริบทชีวิต ไม่ใช่คะแนน recovery |
| same-strong | เห็นจังหวะร่วมกันค่อนข้างชัด แต่ยังต้องถือเป็น pattern จาก Daily_Log ไม่ใช่สูตรว่าพักเท่าไรจึงรับ load ได้ |
| opposite-weak | ชั่วโมงนอนกับกิจกรรม/งานของวันสวนทางกันเบา ๆ อาจเป็นจุดให้สังเกต recovery |
| opposite-moderate | วันที่กิจกรรม งาน หรือแรงใช้ของวันสูงขึ้น มักมาพร้อมชั่วโมงนอนที่ลดลงระดับหนึ่งในข้อมูลที่เลือก |
| opposite-strong | เห็นจังหวะสวนทางค่อนข้างชัดระหว่างชั่วโมงนอนกับกิจกรรม/งานของวัน แต่ห้ามตีความเป็น risk หรือ diagnosis |
| near-zero | ความสัมพันธ์ระหว่างชั่วโมงนอนกับกิจกรรม/งานของวันยังไม่ชัดพอ |
| tentative-n | แม้ `|r|` จะสูง ให้บอกว่ายังเป็น tentative signal ถ้า `n < 30` |
| observed-n | ถ้า `n >= 30` อาจบอกว่าเป็น observed pattern ที่ยังต้องอ่านร่วมกับบริบท |

### 3. Sleep_Hours ↔ Caffeine_Score

Primary meaning:

- `Sleep_Hours`: ชั่วโมงนอนที่บันทึกไว้
- `Caffeine_Score`: เครื่องดื่มที่มีคาเฟอีน / caffeine load

| Voice | Template intent |
| --- | --- |
| same-weak | ชั่วโมงนอนกับเครื่องดื่มคาเฟอีนเคลื่อนไหวไปทางเดียวกันแบบเบา ๆ ให้ถือเป็นบริบทของวัน ไม่ใช่คำตัดสินเรื่องการพัก |
| same-moderate | เห็นจังหวะร่วมกันระดับหนึ่งระหว่างชั่วโมงนอนกับ caffeine load อาจเกี่ยวกับเวลา งาน หรือรูปแบบวัน |
| same-strong | เห็นจังหวะร่วมกันค่อนข้างชัด แต่ยังไม่บอกว่าคาเฟอีนเกี่ยวกับการนอนในเชิงเหตุและผล |
| opposite-weak | สัญญาณเบา ๆ ว่าชั่วโมงนอนน้อยลงอาจมาพร้อม caffeine load ที่สูงขึ้นบางส่วน |
| opposite-moderate | เห็นจังหวะสวนทางระดับหนึ่ง: วันที่ชั่วโมงนอนลดลงมักมาพร้อมเครื่องดื่มคาเฟอีนมากขึ้นในข้อมูลที่เลือก |
| opposite-strong | เห็นจังหวะสวนทางค่อนข้างชัด แต่ต้องหลีกเลี่ยงคำแนะนำทางการแพทย์หรือ sleep diagnosis |
| near-zero | ยังไม่เห็นความสัมพันธ์ชัดระหว่างชั่วโมงนอนกับเครื่องดื่มที่มีคาเฟอีน |
| tentative-n | ใช้คำว่า "อาจเป็นจุดให้สังเกต" ไม่ใช่ข้อสรุป |
| observed-n | ใช้คำว่า "pattern ที่เห็นซ้ำในข้อมูล" และยังย้ำ no causation |

### 4. Sugar_Score ↔ Sleep_Hours

Primary meaning:

- `Sugar_Score`: เครื่องดื่มหรือบริบทความหวาน
- `Sleep_Hours`: ชั่วโมงนอนที่บันทึกไว้

| Voice | Template intent |
| --- | --- |
| same-weak | บริบทความหวานกับชั่วโมงนอนเคลื่อนไหวไปทางเดียวกันแบบเบา ๆ ควรอ่านร่วมกับพลังงานและบริบทเครื่องดื่ม |
| same-moderate | เห็นจังหวะร่วมกันระดับหนึ่ง แต่ต้องระวังเพราะความหวานและการนอนมีปัจจัยอื่นของวันเกี่ยวข้อง |
| same-strong | เห็นจังหวะร่วมกันค่อนข้างชัดในข้อมูลที่เลือก แต่ไม่ใช้เป็นข้อสรุปเรื่องการกินหรือการนอน |
| opposite-weak | สัญญาณเบา ๆ ว่าบริบทความหวานอาจสวนทางกับชั่วโมงนอนบางส่วน |
| opposite-moderate | วันที่บริบทความหวานสูงขึ้นมักเคลื่อนไหวสวนทางกับชั่วโมงนอนระดับหนึ่ง อาจชวนดูวันที่นอนน้อย พลังงานแกว่ง หรือเครื่องดื่มหวานเข้ามาพยุงวัน |
| opposite-strong | เห็นจังหวะสวนทางค่อนข้างชัด แต่ห้ามสรุปว่าอย่างใดเป็นเหตุของอีกอย่าง |
| near-zero | ยังไม่เห็นความสัมพันธ์ชัดระหว่างบริบทความหวานกับชั่วโมงนอน |
| tentative-n | ใช้ wording ว่า "ข้อมูลช่วงนี้ยังบาง" หรือ "ถือเป็นสัญญาณเบื้องต้น" |
| observed-n | ใช้ wording ว่า "เห็นซ้ำในข้อมูลที่บันทึกไว้" แต่ยังไม่ตัดสินดี/ไม่ดี |

### 5. Caffeine_Score ↔ Load_Score

Primary meaning:

- `Caffeine_Score`: เครื่องดื่มที่มีคาเฟอีน / caffeine load
- `Load_Score`: กิจกรรม งาน หรือแรงใช้ของวัน

| Voice | Template intent |
| --- | --- |
| same-weak | เครื่องดื่มคาเฟอีนกับกิจกรรม/งานของวันเคลื่อนไหวไปทางเดียวกันแบบเบา ๆ อ่านเป็นบริบทการพยุงพลัง |
| same-moderate | วันที่มี caffeine load สูงขึ้นมักอยู่ใกล้วันที่กิจกรรม งาน หรือแรงใช้ของวันสูงขึ้นระดับหนึ่ง |
| same-strong | เห็นจังหวะร่วมกันค่อนข้างชัดระหว่าง caffeine load กับกิจกรรม/งานของวัน แต่ยังไม่ตัดสินว่าดีหรือไม่ดี |
| opposite-weak | สัญญาณเบา ๆ ว่า caffeine load ไม่ได้สูงตามกิจกรรม/งานของวันในช่วงนี้ |
| opposite-moderate | เห็นจังหวะสวนทางระดับหนึ่งระหว่าง caffeine load กับกิจกรรม/งานของวัน ควรอ่านเป็นบริบทเฉพาะช่วงข้อมูล |
| opposite-strong | เห็นจังหวะสวนทางค่อนข้างชัด แต่ยังไม่สรุปเป็นรูปแบบถาวรหรือคำแนะนำ |
| near-zero | ยังไม่เห็นว่าเครื่องดื่มคาเฟอีนกับกิจกรรม/งานของวันเคลื่อนไหวร่วมกันชัดพอ |
| tentative-n | ควรมีคำว่า tentative หรือสัญญาณเบื้องต้น |
| observed-n | อาจใช้ observed pattern แต่ยังต้องบอกว่าไม่ใช่คำแนะนำเรื่องคาเฟอีน |

### 6. Practice_Minutes ↔ Sleep_Hours

Primary meaning:

- `Practice_Minutes`: เวลาภาวนาที่บันทึกไว้ ไม่ใช่คะแนนภาวนา
- `Sleep_Hours`: ชั่วโมงนอนที่บันทึกไว้

| Voice | Template intent |
| --- | --- |
| same-weak | เวลาภาวนาที่บันทึกไว้กับชั่วโมงนอนเคลื่อนไหวไปทางเดียวกันแบบเบา ๆ อ่านเป็นบริบทการดูแลตัวเอง |
| same-moderate | เห็นจังหวะร่วมกันระดับหนึ่งระหว่างเวลาภาวนากับชั่วโมงนอน แต่ไม่ตีความเป็นคุณภาพการภาวนาหรือคุณภาพการพัก |
| same-strong | เห็นจังหวะร่วมกันค่อนข้างชัดในข้อมูลที่เลือก แต่ยังเป็น co-movement และไม่ใช่ spiritual score |
| opposite-weak | สัญญาณเบา ๆ ว่าเวลาภาวนากับชั่วโมงนอนอาจสวนทางกันบางส่วนในช่วงนี้ |
| opposite-moderate | เห็นจังหวะสวนทางระดับหนึ่ง แต่ควรอ่านเป็นบริบทของวัน เช่น เวลา ความเหนื่อย หรือพื้นที่ดูแลตัวเอง |
| opposite-strong | เห็นจังหวะสวนทางค่อนข้างชัด แต่ห้ามสรุปเรื่องคุณภาพการพักหรือการภาวนา |
| near-zero | ยังไม่เห็นจังหวะร่วมกันชัดระหว่างเวลาภาวนากับชั่วโมงนอน |
| tentative-n | ใช้ถ้อยคำว่า "บริบทประกอบ" และ "ยังไม่ใช่ข้อสรุป" |
| observed-n | ถ้า `n >= 30` ยังต้องย้ำว่าไม่ใช่คะแนนการภาวนาหรือคุณภาพการพัก |

## Forbidden Wording Checklist

Meaning voices must not include:

- "ทำให้"
- "เป็นสาเหตุ"
- "causes"
- "leads to"
- diagnosis wording
- risk prediction
- medical advice
- good/bad judgment
- performance score wording
- productivity score wording
- spiritual score wording
- finance, expense, purchase, or price interpretation
- authoritative advice such as "must", "ต้องทำ", or fixed behavioral commands

## Allowed Wording Checklist

Meaning voices may use:

- "มักมาพร้อม"
- "อาจอยู่ในวันเดียวกันบ่อยขึ้น"
- "เป็นสัญญาณให้สังเกต"
- "ควรอ่านร่วมกับบริบทของวัน"
- "ในข้อมูลที่พี่บันทึกไว้"
- "ในข้อมูลที่เลือก"
- "สัญญาณเบา ๆ"
- "เห็นจังหวะร่วมกันระดับหนึ่ง"
- "เห็นจังหวะร่วมกันค่อนข้างชัด แต่ยังไม่ใช่เหตุและผล"
- "tentative signal"
- "observed pattern"
- "not causation"
- "not diagnosis or medical advice"

## Runtime Implementation Notes

When this matrix becomes runtime code:

- Do not change Pearson calculation.
- Do not change top-5 ranking.
- Do not change minimum-n behavior.
- Do not map category fields such as `Energy`, `Mind`, `Sleep`, `Load_Level`, or `Mind_Note_Support`.
- Select voice by pair key, direction, strength band, and n band.
- Near-zero must always use unclear voice, not weak voice.
- `n 10-29` must remain tentative even if `|r|` is moderate or strong.
- `n >= 30` may use observed-pattern wording but still cannot imply cause/effect.
- Keep raw column audit line visible in UI.
- Keep boundary text visible: "Correlation is not causation."
- Keep all wording deterministic; do not call an LLM.

## Test Expectations

Runtime tests or manual QA should verify:

- all six candidate pairs have voice coverage
- same-direction weak/moderate/strong voices are distinct
- opposite-direction weak/moderate/strong voices are distinct
- near-zero does not reuse weak wording
- tentative n wording overrides overconfidence
- observed n wording still avoids causation
- `Practice_Minutes` is never a spiritual score
- no forbidden wording appears in generated meaning text
