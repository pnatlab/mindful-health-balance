# MHB Practice Reflection Layer — Research & Boundary Note

สถานะ: research/design note only
ขอบเขต: `practice_context` เท่านั้น
Runtime: ยังไม่ implement ในเอกสารฉบับนี้

## 1. Purpose

Practice Reflection Layer คือแนวทางในอนาคตสำหรับให้ MHB อ่าน “การภาวนา / การดูแลใจ” ในฐานะบริบทที่ผู้ใช้บันทึกไว้ ไม่ใช่สิ่งที่ระบบใช้ตัดสินคุณภาพของผู้ปฏิบัติ

เป้าหมายคือช่วยให้ NuTuenSai:

- เห็นสิ่งที่เกิดขึ้นจริงในข้อมูลของวันนี้
- เห็นจังหวะความต่อเนื่องในช่วงสั้น ๆ โดยไม่ทำให้กลายเป็น leaderboard
- ชวนกลับมาดูแลใจอย่างเล็กและอ่อนโยนเมื่อเหมาะสม
- ใช้ sleep, load, water และ mind เป็นบริบทประกอบเท่าที่จำเป็น
- รักษา human agency และให้ความหมายสุดท้ายเป็นของผู้ใช้

ชั้นนี้จึงเป็นการออกแบบ attention และภาษา ไม่ใช่การเพิ่ม spiritual analytics หรือระบบประเมินความก้าวหน้าทางธรรม

## 2. Non-goals / Safety Boundary

ระบบต้องไม่ถูกวางตัวเป็น:

- ครูกรรมฐาน ครูวิปัสสนา หรือผู้สอนธรรมะ
- เครื่องวัดความก้าวหน้าทางธรรม
- spiritual score, practice score หรือ performance score
- ผู้ตัดสินว่าการปฏิบัติถูกหรือผิด ดีหรือไม่ดี สำเร็จหรือล้มเหลว
- ผู้วินิจฉัยสุขภาพจิตหรือสภาวะทางจิต
- ผู้แทนคำแนะนำจากครู อาจารย์ แพทย์ หรือผู้เชี่ยวชาญ
- ผู้รู้สาเหตุว่าการภาวนาทำให้ใจ การนอน หรือ load เปลี่ยนอย่างไร

MHB ไม่ควรใช้คำสอนเฉพาะของครูบาอาจารย์หรืออ้างเสียงของครูแทน หากยังไม่มี source และ citation ที่ชัดเจน การสกัดหลักใน note นี้เป็นเพียงหลักภาษาและหลักการออกแบบทั่วไป ไม่ใช่การรับรองสายปฏิบัติใดสายหนึ่ง

Boundary หลัก:

> การภาวนาใน MHB เป็นข้อมูลบริบทที่ผู้ใช้เป็นเจ้าของ ไม่ใช่คะแนน ไม่ใช่หลักฐานความก้าวหน้า และไม่ใช่คำสั่งให้ปฏิบัติแบบใดแบบหนึ่ง

## 3. Thai Vipassana-Informed Reflection Principles

หัวข้อนี้ใช้คำว่า “informed” ในความหมายว่าเป็นกรอบการออกแบบภาษาที่อ่อนโยนและสอดคล้องกับหลักทั่วไปที่ผู้ใช้ชาวไทยคุ้นเคย ไม่ใช่การอ้างว่า MHB สรุปคำสอนของครูหรือสำนักใด

### หลักทั่วไปที่ใช้เป็นกรอบภาษา

1. **กลับมารู้กายรู้ใจตามจริง** — สะท้อนสิ่งที่ผู้ใช้บันทึก ไม่เพิ่มความหมายที่ข้อมูลไม่รองรับ
2. **เห็นโดยไม่บังคับ** — ใช้ถ้อยคำชวนสังเกต ไม่ใช้คำสั่งให้ควบคุมใจหรือทำให้ได้ผลลัพธ์
3. **เริ่มเล็กและสม่ำเสมอได้** — ให้พื้นที่กับ practice สั้น ๆ ที่เกิดขึ้นจริง โดยไม่เปรียบเทียบกับมาตรฐานภายนอก
4. **ภาวนาไม่ใช่ performance** — นาทีหรือจำนวนวันที่มี practice เป็นบริบท ไม่ใช่คะแนนความสามารถ
5. **การขาดช่วงไม่ใช่ความล้มเหลว** — การไม่มีข้อมูลอาจเป็นจุดให้กลับมาเริ่มใหม่ หรืออาจเป็นเพียงวันที่ไม่ได้บันทึก
6. **ใจหนักหรือฟุ้งซ่านก็เป็นข้อมูล** — ไม่แปลง mind note เป็น diagnosis และไม่ตำหนิผู้ใช้
7. **เห็นแล้วค่อยวาง** — ใช้เป็นโทนที่ลดการเร่งแก้ ไม่ใช่คำสอนที่ระบบอ้างแทนผู้รู้

### สิ่งที่หลักเหล่านี้ไม่อนุญาต

- ไม่เลียนเสียงครูบาอาจารย์
- ไม่สร้างคำคมธรรมะขึ้นเองแล้วใส่ชื่อครู
- ไม่ใช้หลักทั่วไปเพื่อยืนยันว่าผู้ใช้ “ปฏิบัติถูกทาง”
- ไม่เปลี่ยนความอ่อนโยนให้เป็นการสั่งหรือการประเมิน

## 4. Two-Layer Reflection Model

Practice Reflection Layer แบ่งเป็นสองชั้นเพื่อไม่ให้ reflection วันนี้ปนกับการอ่านความต่อเนื่องระยะสั้น

### Layer 1 — Today Practice Reflection

อ่านข้อมูลของวันนี้เป็นหลัก:

- วันนี้มี practice ที่บันทึกไว้หรือไม่
- มี `Practice_Minutes` เท่าใด ถ้ามีค่าที่ valid
- มี `Practice_Type`, `Practice_Note` หรือ structured context อะไร
- ใจโดยรวมที่ผู้ใช้บันทึกไว้เป็นอย่างไร
- sleep/load/water อยู่รอบ ๆ วันนั้นอย่างไร โดยเป็นบริบทประกอบเท่านั้น

หน้าที่ของ layer นี้:

- ถ้ายังไม่มี practice หรือไม่มีข้อมูล: เชิญชวนให้กลับมาเริ่มเล็ก ๆ โดยไม่ทำให้การไม่บันทึกเป็นความผิด
- ถ้ามีเวลาสั้น: รับรู้ว่ามีพื้นที่ที่ผู้ใช้กลับมาดูแลใจ โดยไม่ตัดสินว่าน้อยเกินไป
- ถ้ามี practice: สะท้อนว่ามันเป็นพื้นที่ของวัน ไม่ใช่ performance
- ถ้ามี practice มากแต่ mind/load หนัก: ไม่ชมเป็น productivity และไม่สรุปว่าฝึกมากแล้วใจต้องเบา

### Layer 2 — 7-Day Practice Continuity Reflection

อ่านช่วงสั้นของข้อมูลล่าสุดเพื่อเห็น “จังหวะความต่อเนื่อง”:

- จำนวนวันที่มี practice ที่บันทึกไว้
- นาทีรวมและค่าเฉลี่ย เมื่อข้อมูลตัวเลข valid พอ
- วันที่ practice บางลงหรือไม่มีข้อมูล
- รูปแบบเช่น ทำสั้นแต่หลายวัน, ทำหนักวันเดียว, หรือห่างหลายวัน
- sleep/load/mind เป็นบริบทประกอบเมื่อมีข้อมูลชัด ไม่ใช่เหตุผลที่ระบบฟันธง

หน้าที่ของ layer นี้:

- ชวนเห็นจังหวะและทางกลับมาเริ่มใหม่
- ชวนสร้างวินัยเล็ก ๆ โดยไม่สร้าง guilt
- ไม่จัดอันดับ ไม่เปรียบเทียบกับผู้ใช้อื่น และไม่สรุปผลทางธรรม
- ไม่บอกว่าจิตดีขึ้นเพราะทำมากขึ้น หรือแย่ลงเพราะขาดช่วง

หลักการแสดงผล: เริ่มจาก today layer หากผู้ใช้เปิด reflection วันนี้ และแสดง 7-day continuity เป็นบริบทเสริมแบบสั้น ไม่ให้ continuity กลบข้อมูลหรือความหมายที่ผู้ใช้เขียนในวันนี้

## 5. Data Inputs

รายการต่อไปนี้เป็น candidate inputs เท่านั้น ต้องตรวจยืนยันกับ `DAILY_LOG_COLUMNS`, current normalization และ existing export contract ก่อน implement จริง

| Input | Role | Boundary |
|---|---|---|
| `Date` | เรียงแถวและกำหนดช่วง lookback | ต้อง parse อย่าง defensive; วันที่ผิดไม่ควรเดา |
| `Practice_Root` | ตรวจว่าแถวมีเจตนา/บริบท practice หรือไม่ ถ้าระบบใช้ field นี้ | ไม่ใช่คะแนนหรือระดับการปฏิบัติ |
| `Practice_Type` | รายละเอียดชนิด practice ที่ผู้ใช้เลือก/บันทึก | แสดงเป็น context ไม่แปลความว่าเหมาะหรือไม่เหมาะ |
| `Practice_Minutes` | จำนวนเวลาที่บันทึกเป็นตัวเลข | ใช้รวม/เฉลี่ยเมื่อ valid; ไม่ใช้วัดคุณภาพ |
| `Practice_Note` | note ที่ผู้ใช้เป็นเจ้าของ | ไม่สรุปใจแทน และต้องระวังข้อความอ่อนไหว |
| `Practice_Context_JSON` | structured practice context ถ้ามี | ต้อง normalize และไม่เดา key ที่ไม่มี |
| `Mind_State` หรือชื่อ field ปัจจุบัน | บริบทใจแบบ category ถ้ามี | ห้ามแปลงเป็น diagnosis |
| `Mind_Note_Text`, `Mind_Note_Feeling`, `Mind_Note_Support` | ความหมายที่ผู้ใช้เขียน/เลือกเอง | ให้ผู้ใช้เป็นเจ้าของความหมายสุดท้าย |
| `Sleep_Hours` | recovery context | ไม่ใช้สร้าง claim เรื่อง sleep disorder |
| `Water_ml` | physical baseline context | ไม่ใช้สร้าง medical advice |
| `Load_Score` และ/หรือ activity note | load/activity context | ไม่แปลงเป็น productivity score |
| `Reflection_Root` | ตรวจว่าผู้ใช้เลือก `practice_context` หรือไม่ | เป็น user intention metadata ไม่ใช่ระบบเลือกแทน |

ชื่อ `Activity_Notes`, `Mind_State` และชื่อ field ที่เป็น category ต้อง confirm กับ current schema ก่อน hard-code เพราะเอกสารเดิมมีทั้ง field รุ่นเก่าและรุ่นใหม่ในบางบริบท

## 6. 7-Day Lookback Semantics

### หน่วยของ lookback

หลักที่แนะนำ:

1. Prefer **last 7 `Daily_Log` rows sorted by valid `Date`** เมื่อระบบต้องอ่านสิ่งที่บันทึกไว้จริง
2. ใช้ **last 7 calendar days** ได้เมื่อ date parsing เชื่อถือได้และ product intent ต้องการเห็นวันที่ว่างด้วย
3. ต้องประกาศใน implementation ว่าเลือก semantics แบบใด ไม่สลับไปมาโดยเงียบ ๆ

ข้อเสนอสำหรับ phase แรก: ใช้ 7 แถวล่าสุดที่มีวันที่ valid และแสดงวันที่ของช่วงให้ผู้ใช้เห็น เพราะสอดคล้องกับ field memory และไม่ทำให้วันที่ไม่มีแถวถูกตีความว่าเป็นวันที่ผู้ใช้ไม่ปฏิบัติ

### Missing data policy

- ไม่มีแถว: `ไม่มีข้อมูลในช่วงที่เลือก` ไม่ใช่ `ไม่ภาวนา`
- มีแถวแต่ `Practice_Minutes` ว่าง: `ยังไม่ได้บันทึกเวลา` ไม่ใช่ศูนย์
- ค่า `0` ที่บันทึกเป็นตัวเลขชัดเจน: ถือเป็นข้อมูลศูนย์ได้ แต่ต้องรักษาความหมายว่าเป็นสิ่งที่ผู้ใช้บันทึก ไม่ใช่ failure
- `Practice_Note` ว่าง: ไม่ควรเติมเรื่องราวแทน
- วันที่ parse ไม่ได้: ไม่นำไปจัดลำดับโดยเดา และควรอยู่ใน missing/needs-review path
- ข้อมูลเก่าที่ไม่มี practice fields: ยังอ่านได้ตาม legacy normalization และไม่นับว่าเป็นการขาด practice

### Derived summaries ที่อนุญาตในอนาคต

- `practice_days_recorded`: จำนวนแถวที่มีหลักฐาน practice ตาม policy ที่ประกาศ
- `practice_minutes_total`: รวมเฉพาะตัวเลข valid
- `practice_minutes_average`: เฉลี่ยเฉพาะวันที่มีตัวเลข valid
- `continuity_shape`: ป้ายคำอธิบายเชิงบรรยาย เช่น `สั้นแต่ปรากฏหลายวัน`

ชื่อเหล่านี้เป็น derived view เท่านั้น ไม่ควรเพิ่มลง schema โดยอัตโนมัติใน phase แรก และไม่ควรแสดงเป็น score

## 7. Reflection Cases

| Case | What the system may notice | Gentle direction | Must stay silent about |
|---|---|---|---|
| ไม่มี practice วันนี้ | ยังไม่มีข้อมูล practice วันนี้ | ชวนกลับมาเริ่มเล็ก ๆ เมื่อพร้อม; บอกว่าเป็นข้อมูลของวันนี้ | ความขยัน, ความล้มเหลว, คะแนนทางธรรม |
| มี practice สั้น | มีเวลาสั้นที่ถูกบันทึก | รับรู้พื้นที่เล็ก ๆ ที่เกิดขึ้นจริง โดยไม่เทียบมาตรฐาน | น้อยเกินไป, ต้องเพิ่มเวลา |
| มี practice ต่อเนื่องเล็ก ๆ | มีหลักฐานในหลายวันของช่วงสั้น | ชวนเห็นจังหวะความต่อเนื่องและรักษาความเบา | จิตก้าวหน้า, ทำมากแล้วดีกว่า |
| practice ยาวแต่ mind/load หนัก | practice กับบริบทหนักปรากฏในวันเดียวกัน | ชวนวางใจและดูแลพื้นที่ของวัน; ไม่เร่งสรุป | practice ทำให้ใจดีขึ้น/ไม่ดีขึ้น, สุขภาพจิต |
| ไม่มี practice หลายวัน | ข้อมูล practice ในช่วงนั้นบางหรือห่าง | ชวนกลับมาเริ่มใหม่โดยไม่ตีตราช่วงที่หาย | ขาดวินัย, ถอยหลังทางธรรม |
| data thin / date unreliable | หลักฐานไม่พอสำหรับ continuity | บอกตรง ๆ ว่ายังอ่านได้เบา ๆ และรอข้อมูลเพิ่ม | สรุป pattern, average หรือ intent ที่ไม่มีหลักฐาน |

### Case composition examples

ตัวอย่างที่อนุญาต:

> วันนี้ยังไม่มีข้อมูลการภาวนาที่บันทึกไว้ หนูเลยยังไม่สรุปว่าเป็นอย่างไรนะคะ ถ้าพี่อยากกลับมาดูแลใจ อาจเริ่มจากช่วงสั้น ๆ ที่พอวางลงได้ก่อน

> ในช่วงที่อ่านได้ มีการกลับมาภาวนาสั้น ๆ หลายวัน หนูขอชวนมองเป็นจังหวะความต่อเนื่อง ไม่ใช่ตัวเลขที่ต้องทำให้สูงขึ้นนะคะ

ตัวอย่างที่ไม่อนุญาต:

> พี่ภาวนาน้อยเกินไป จึงควรเพิ่มเวลาเพื่อให้จิตดีขึ้น

เหตุผลคือประโยคหลังเปลี่ยนข้อมูลให้เป็นคำตัดสิน คำสั่ง และ causal/spiritual claim

## 8. Wording Rules

### คำและโครงประโยคที่ควรใช้

- “ชวนกลับมา”
- “เริ่มเล็ก ๆ”
- “ไม่ต้องทำให้สมบูรณ์”
- “เป็นข้อมูล ไม่ใช่ความผิด”
- “เห็นจังหวะ”
- “ดูแลใจ”
- “เมื่อพร้อม”
- “อาจลองสังเกต”
- “ความหมายยังอยู่กับพี่”
- “อ่านร่วมกับบริบทของวัน”

### คำและโครงประโยคที่ไม่ควรใช้ใน UI output

- “ต้อง” ในความหมายสั่งให้ปฏิบัติ
- “ผิด”
- “ล้มเหลว”
- “ขาดวินัย”
- “จิตดีขึ้นแน่นอน”
- “ปฏิบัติถูก/ผิด”
- “บรรลุ”
- “ก้าวหน้า/ถอยหลังทางธรรม”
- “ภาวนาดี” หรือ “ภาวนาไม่พอ”
- “การภาวนาทำให้...” หรือถ้อยคำ causal อื่น
- “คะแนนภาวนา”, “ระดับจิต”, “วัดผลการปฏิบัติ”

Boundary copy ควรสั้นและไม่ซ้ำทุกบรรทัด เช่น:

> การอ่านนี้เป็นเพียงบริบทจากสิ่งที่พี่บันทึกไว้ ไม่ใช่คะแนน คำสอน การวินิจฉัย หรือคำแนะนำจากผู้เชี่ยวชาญนะคะ

ภาษา EN/ZH ในอนาคตต้องรักษาความหมายเดียวกัน โดยไม่แปลให้แข็งเป็น command หรือใช้คำที่สื่อ spiritual ranking

## 9. Future Implementation Plan

### P0 — Docs and boundary lock

เอกสารฉบับนี้ ล็อก non-goals, data semantics, 7-day lookback และ test cases ก่อนแตะ runtime

### P1 — Today practice context helper

เพิ่ม pure helper ที่อ่าน current row แล้วคืน structured segments สำหรับ today layer โดยไม่สร้าง score และไม่แก้ Daily_Log

### P2 — 7-row practice continuity helper

เพิ่ม helper ที่รับ normalized rows และคืน evidence summary พร้อม missing-data state, date range และ derived wording ที่ตรวจได้

### P3 — `practice_context` reflection composer adjustment

เชื่อม today/continuity segments เข้า Reflection อย่าง conservative: root opening หนึ่งครั้ง, concrete practice detail เท่าที่มี, continuity เป็น supporting context และ boundary หนึ่งครั้ง

### P4 — Export/schema audit

ตรวจว่าจำเป็นต้องเพิ่ม derived field หรือไม่ โดย preference คือไม่เพิ่ม schema หาก view สามารถคำนวณจาก Daily_Log เดิมได้ และต้องรักษา old workbook compatibility

ทุก phase ต้องคง:

- `Practice_Root`, `Practice_Type`, `Practice_Minutes`, `Practice_Context_JSON`, `Practice_Note` ตาม schema ที่มี
- Reflection root metadata เดิม
- save/import/export behavior เดิมจนกว่าจะมี contract ใหม่
- no LLM, no diagnosis, no medical advice, no spiritual score

## 10. QA Checklist

Manual QA ในอนาคตควรครอบคลุม:

- เลือก `practice_context` โดยไม่มี practice data
- มี practice 5 นาที
- มี practice 15 นาที
- มี practice ต่อเนื่องหลายวันใน 7-row window
- มีวันว่างและวัน missing field ปะปน
- มี practice ยาวพร้อม mind/load หนัก
- ไม่มี Mind Note หรือมี note ที่ผู้ใช้เป็นเจ้าของเอง
- วันที่ผิดรูปแบบหรือ rows เรียงไม่ตรง
- legacy rows ที่ไม่มี practice columns
- TH/EN/ZH smoke test
- save/export root metadata ยังไม่เปลี่ยน
- ไม่มี spiritual scoring, guilt wording, diagnosis, causal claim หรือ performance judgment
- Today layer ไม่ถูก continuity layer กลบ
- 7-day summary ไม่พูดเกินจำนวน rows/data ที่อ่านได้

## Current Scope Lock

เอกสารฉบับนี้เป็น docs-only research/design note เท่านั้น ยังไม่แก้:

- `script.js`
- `index.html`
- `js/config/workbookSchema.js`
- `js/config/reflectionRootMatrix.js`
- export/import behavior
- Daily_Log schema
- Reflection runtime หรือ UI
