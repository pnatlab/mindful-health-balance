# Navigation Architecture (Mindful Health Balance v2.0)

## Purpose

เอกสารนี้บันทึกทิศทาง navigation architecture สำหรับ Mindful Health Balance v2.0 เพื่อรองรับ Field Review Companion ในอนาคต

นี่เป็น design note เท่านั้น ยังไม่ใช่คำสั่ง implement และยังไม่เปลี่ยน code, UI, export/import logic, localStorage schema หรือ Excel workbook structure ของ v1.9

## Current State

Mindful Health Balance v1.9 มี navigation หลัก 3 tab:

```text
Today | Reflection/NuTuenSai | Log
```

บทบาทปัจจุบันคือ:

- `Today`: กรอกข้อมูลวันนี้ เช่น Energy, Mind, Sleep, Hydration, Drink Profile, Load & Recovery และ Mind Note
- `Reflection/NuTuenSai`: ดู mindful reminder, generate/review/edit End-of-Day Reflection และ Save to Daily Log
- `Log`: ดู Daily Log, Export Master Excel, Import Master Excel และ Clear Daily Log

โครงนี้เหมาะกับ v1.9 เพราะระบบยังวนอยู่กับ daily logging และ daily closure เป็นหลัก

## v2.0 Context

Mindful Health Balance v2.0 จะมี Field Review Companion เป็นชั้นใหม่สำหรับอ่าน Daily Log หรือ Excel field memory แล้วช่วยผู้ใช้ทบทวน pattern หลายวันแบบ guided NuTuenSai-style reflection

Field Review Companion ไม่ใช่ daily input และไม่ใช่ end-of-day reflection ของวันเดียว แต่เป็น multi-day review experience ที่ควรมีพื้นที่ของตัวเอง

## Core Decision

ไม่ควรเอา `Reflection` ไปซ้อนเต็ม ๆ ใน `Today`

เหตุผลคือ `Today`, `Reflection`, และ `Field Review` มีจังหวะการใช้งานต่างกัน:

- `Today` = current-day input / ระหว่างวัน
- `Reflection` = daily closure / end-of-day synthesis
- `Field Review` = multi-day guided review / pattern conversation

ถ้าฝัง Reflection Generator เต็ม ๆ ไว้ใน Today หน้า Today จะหนักขึ้น สับสนขึ้น และทำให้ผู้ใช้รู้สึกว่าการกรอกข้อมูลวันนี้กับการปิดวันเป็นงานเดียวกัน ทั้งที่เป็นคนละจังหวะทางใจ

Today อาจมี CTA เล็ก ๆ เพื่อพาผู้ใช้ไปต่อ เช่น:

```text
Go to Reflection
ไปทบทวนวันนี้
ปิดวันนี้ด้วย Reflection
```

แต่ CTA ควรเป็นทางผ่าน ไม่ใช่การย้าย Reflection Generator ทั้งชุดเข้ามาอยู่ใน Today

## Recommended Navigation Structure

โครง navigation ที่แนะนำสำหรับ v2.0:

```text
Today | Reflection | Log | Field Review
```

ชื่อ tab ควรแยกบทบาทให้ชัด:

- `Today`: current-day input
- `Reflection`: daily closure / end-of-day synthesis
- `Log`: data ownership / daily log / export-import
- `Field Review`: multi-day guided review / NuTuenSai-style companion

## Page Roles

### Today

Today ควรเป็นพื้นที่สำหรับกรอกและสังเกตวันนี้เท่านั้น:

- Today State
- Hydration
- Drink Profile
- Load & Recovery
- Mind Note
- Reset Current Form
- small CTA ไป Reflection เมื่อผู้ใช้พร้อมปิดวัน

Today ไม่ควรกลายเป็นหน้า report, หน้า export หรือหน้า multi-day review

### Reflection

Reflection ควรเป็นพื้นที่สำหรับปิดวัน:

- Mindful Reminder / NuTuenSai note
- End-of-Day Reflection preview
- Light edit สำหรับ stored reflection
- Save to Daily Log
- Daily closure language ที่ช่วยให้ผู้ใช้วางวันลง ไม่ใช่เริ่มวิเคราะห์หลายวัน

Reflection อ่านข้อมูลของวันปัจจุบันเป็นหลัก ไม่ควรกลายเป็น Field Review หลายวัน

### Log

Log ควรเป็นพื้นที่ data ownership:

- Daily Log Table
- Export Master Excel
- Import Master Excel
- Clear Daily Log
- backup / portability controls

Log คือที่ที่ผู้ใช้เห็นว่า data เป็นของตัวเอง อยู่ local-first และย้ายออกเป็น workbook ได้

Log ไม่ควรกลายเป็น conversation panel หลัก เพราะบทบาทของ Log คือการจัดการข้อมูล ไม่ใช่การตีความข้อมูล

### Field Review

Field Review ควรเป็นพื้นที่ใหม่สำหรับ multi-day guided review:

- อ่าน pattern จาก Daily Log หรือ exported field memory
- สรุปเบา ๆ จากข้อมูลหลายวัน
- ให้ผู้ใช้เลือก focus จาก pattern ที่มีจริง
- ถามนำแบบ NuTuenSai-style
- สะท้อนสั้น ๆ พร้อม next gentle action

Field Review ควรมี flow แบบ:

```text
เห็น pattern
-> ให้เลือก focus
-> ถามนำหนึ่งชั้น
-> สะท้อนสั้น
-> ชวนเลือกต่อหรือพอสำหรับวันนี้
```

Field Review ไม่ควรเริ่มจาก open-ended chatbot และไม่ควรสรุปยาวแบบ report ก่อนถามผู้ใช้

## Navigation Relationship

หน้าแต่ละหน้าควรเชื่อมกันแบบเบา ๆ:

- Today อาจมี CTA ไป Reflection
- Reflection หลัง save อาจมี CTA ไป Log
- Log อาจมี CTA ไป Field Review เมื่อมีข้อมูลมากพอ
- Field Review อาจมี CTA กลับ Log หรือกลับ Today

แต่ไม่ควรทำให้ทุกหน้ากลืนกันจนบทบาทหาย

ตัวอย่าง relationship:

```text
Today -> Reflection -> Log -> Field Review
  ^          |          |          |
  |          v          v          v
  +------ return to current day / data / review focus
```

## Field Review Entry Conditions

Field Review ควรเปิดประสบการณ์เมื่อมีข้อมูลพอสมควร เช่น:

- มี Daily Log อย่างน้อย 3 วัน
- หรือ import/exported workbook มี `Daily_Log`
- หรือมี `Field_Review` summary ให้ใช้เป็น starting point

ถ้าข้อมูลยังน้อย ควรแสดงข้อความเบา ๆ เช่น:

```text
ข้อมูลยังน้อยอยู่ ตอนนี้ใช้ Field Review เป็นจุดเริ่มต้นเบา ๆ ได้ แต่ยังไม่ควรรีบสรุป pattern
```

## UX Guardrails

Navigation v2.0 ควรรักษา guardrails เหล่านี้:

- ไม่ทำให้ Today หนักเกินไป
- ไม่ทำให้ Reflection กลายเป็น report หลายวัน
- ไม่ทำให้ Log กลายเป็น AI interpretation page
- ไม่ทำให้ Field Review กลายเป็น medical chatbot
- ไม่เปิด open-ended chat ก่อน guided reflection ชัดเจน
- ไม่ใช้ wording ที่ทำให้ผู้ใช้รู้สึกถูกประเมิน
- ไม่ทำให้ export/import logic ถูกซ่อนหรือดูเป็นเรื่องรอง

## Why Four Tabs

การเพิ่ม `Field Review` เป็น tab ที่สี่ช่วยให้ระบบเติบโตโดยไม่ทำให้ mental model เดิมพัง:

- ผู้ใช้ยังรู้ว่า Today คือที่กรอกวันนี้
- ผู้ใช้ยังรู้ว่า Reflection คือที่ปิดวัน
- ผู้ใช้ยังรู้ว่า Log คือที่จัดการข้อมูล
- ผู้ใช้มีที่ใหม่สำหรับคุยกับ pattern หลายวัน

นี่ทำให้ Field Review Companion เป็นชั้นทบทวนที่ตั้งใจเปิดเอง ไม่ใช่สิ่งที่แทรกเข้าไปตลอดวัน

## Future Implementation Notes

เมื่อถึงเวลาทำจริง ควรเริ่มแบบ conservative:

- เพิ่ม tab ใหม่โดยไม่ย้าย logic เดิมทันที
- คง Today / Reflection / Log behavior เดิม
- ให้ Field Review อ่านจาก Daily Log ที่มีอยู่ก่อน
- ใช้ `Field_Review` เป็น summary seed ถ้ามี workbook/import context ในอนาคต
- ใช้ guided focus buttons แทน free-form chat ใน phase แรก
- มี empty state สำหรับวันที่ข้อมูลยังไม่พอ

การเปลี่ยน navigation ควรทำให้ระบบชัดขึ้น ไม่ใช่ทำให้ทุกอย่างอยู่หน้าเดียวจนผู้ใช้ต้องคิดเองว่าตอนนี้กำลังกรอกวัน ปิดวัน จัดการข้อมูล หรือทบทวนหลายวัน

## Guardrail Sentence

Mindful Health Balance v2.0 should separate current-day input, daily closure, data ownership, and multi-day guided review into distinct navigation roles so Field Review Companion can grow without making Today heavy, Reflection confusing, or Log less user-owned.
