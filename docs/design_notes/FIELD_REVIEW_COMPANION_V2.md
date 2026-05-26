# Field Review Companion (Mindful Health Balance v2.0)

Field Review Companion คือทิศทางต่อจาก Mindful Health Balance v1.9 ที่เปลี่ยน Excel field memory ให้กลายเป็นประสบการณ์ทบทวนแบบสนทนาอย่างมีขอบเขต

เส้นทางของระบบคือ:

```text
Daily self-care logging
-> Exported Excel as Portable Field Memory
-> Field Review Companion
-> Guided NuTuenSai-style reflection
```

## Purpose

เอกสารนี้บันทึกทิศทางอนาคตของ Mindful Health Balance v2.0 เท่านั้น ยังไม่ใช่คำสั่ง implement และยังไม่เปลี่ยน code, UI, export/import logic, localStorage schema หรือ Excel workbook structure ใน v1.9

เป้าหมายของ Field Review Companion คือช่วยให้ผู้ใช้ทบทวนข้อมูลที่ตนเอง export ออกมาแล้วอย่างมีขอบเขต โดยยังรักษาหลัก local-first, user-owned data และ non-medical reflection ไว้เหมือนเดิม

## Core Idea

Mindful Health Balance v1.9 ทำให้ Excel workbook เป็น Portable Field Memory ที่ทั้งมนุษย์และ AI อ่านได้ชัดขึ้นผ่าน `Field_Context` และ `Field_Review`

Mindful Health Balance v2.0 ควรต่อยอดจากจุดนี้ด้วย Field Review Companion ซึ่งเป็น companion สำหรับอ่าน field memory ที่ผู้ใช้ตั้งใจนำเข้ามาทบทวนเอง ไม่ใช่ระบบที่แอบ sync, auto-upload หรือเฝ้าดูผู้ใช้ตลอดเวลา

Field Review Companion ควรช่วยผู้ใช้เห็นความสัมพันธ์ระหว่าง:

- Hydration
- Drinks, caffeine, sugar, and hydration support
- Load and recovery
- Energy, sleep, and Energy Cause
- Mind state and Mind Note
- Support need
- Tomorrow Focus
- NuTuenSai Reminder and Reflection text

การอ่านทั้งหมดควรเป็น descriptive pattern reflection ไม่ใช่ diagnosis, medical advice, therapy interpretation หรือ health-risk prediction

## Guided Reflection First

v2.0 ควรเริ่มจาก guided reflection ก่อน open-ended chatbot

เหตุผลคือข้อมูลใน field memory เป็นข้อมูลละเอียดเกี่ยวกับร่างกาย ใจ พลังงาน และพฤติกรรมประจำวัน ถ้าเปิดเป็น chatbot อิสระเร็วเกินไป ระบบอาจเผลอ:

- ตีความเกินข้อมูล
- สรุปเชิงแพทย์หรือจิตวิทยา
- ทำให้ผู้ใช้รู้สึกถูกประเมิน
- ทำให้ AI ดูเหมือนรู้ชีวิตผู้ใช้มากกว่าผู้ใช้เอง
- เพิ่มแรงกดดันจาก pattern ที่ยังมีข้อมูลไม่พอ

Guided reflection ควรวางคำถามและคำตอบในกรอบที่ปลอดภัยกว่า เช่น:

- ช่วงนี้มี pattern อะไรที่น่าสังเกตแบบเบา ๆ
- วันที่ load สูงมักมี hydration หรือ recovery ตามทันไหม
- วันที่ใจเป็น support signal มีอะไรช่วยพยุงระบบบ้าง
- วันที่ Energy Cause กับ Energy level ดูเป็น layered signal ควรอ่านอย่างไรโดยไม่ตัดสิน
- Tomorrow Focus ที่ซ้ำบ่อยอาจกำลังบอกว่าอะไรต้องการพื้นที่

## Companion Behavior

Field Review Companion ควรมีบุคลิกแบบ NuTuenSai-style reflection:

- อ่อนโยน
- ชัดเจน
- ไม่ดุ
- ไม่เร่งแก้เลข
- ไม่ทำให้ผู้ใช้กลัว
- ไม่ยึดตัวเลขเป็นความสำเร็จหรือล้มเหลว
- เคารพ agency ของผู้ใช้
- ชวนเห็น pattern มากกว่าสรุปแทนผู้ใช้

ตัวอย่างท่าทีที่ควรใช้:

```text
ข้อมูลช่วงนี้เหมือนชวนสังเกตว่า...
อาจมี pattern เบา ๆ ระหว่าง...
ถ้าจะทดลองปรับ แค่หนึ่งจุดเล็ก ๆ อาจพอ...
ทั้งสองสัญญาณอยู่ร่วมกันได้ ไม่จำเป็นต้องรีบตัดสินว่าวันนั้นดีหรือแย่
```

ตัวอย่างท่าทีที่ควรหลีกเลี่ยง:

```text
คุณควร...
นี่แปลว่าคุณมีภาวะ...
เสี่ยง...
ผิดปกติ...
ต้องทำให้ได้...
AI เห็นชัดว่าปัญหาของคุณคือ...
```

## User Control

Field Review Companion ต้องคงหลัก user control เป็นศูนย์กลาง:

- ผู้ใช้เลือกเองว่าจะ export workbook เมื่อไหร่
- ผู้ใช้เลือกเองว่าจะนำ workbook กลับมา review เมื่อไหร่
- ผู้ใช้เลือกเองว่าจะให้ AI อ่านข้อมูลชุดใด
- ระบบไม่ควร auto-upload หรือ auto-sync ข้อมูล
- ระบบไม่ควรสร้าง long-term profile โดยไม่อธิบายและไม่ขอ consent
- ผู้ใช้สามารถหยุด review หรือไม่ตอบคำถามต่อได้เสมอ

AI หรือ companion มีหน้าที่ช่วยสะท้อน ไม่ใช่มีอำนาจสรุปชีวิตผู้ใช้

## Possible v2.0 Review Modes

โหมดที่อาจพิจารณาในอนาคต:

- Weekly Field Review: ทบทวน 7 วันแบบ descriptive summary
- Load and Recovery Review: ดูวันที่ load สูงกับ recovery signal
- Hydration Rhythm Review: ดูน้ำ กาแฟ คาเฟอีน และ load ร่วมกัน
- Mind Support Review: ดูวันที่ mind state เป็น support factor เช่น `Feeling good` หรือ `Relaxed`
- Energy Cause Layer Review: อ่านวันที่ Energy Cause กับ Energy level ดูสวนกันแบบ layered signal
- Tomorrow Focus Review: ดู Tomorrow Focus ที่ซ้ำบ่อยโดยไม่ทำให้กลายเป็น checklist กดดัน

ทุกโหมดควรเป็น optional และควรสื่อชัดว่าเป็น reflection support เท่านั้น

## Data Boundary

v2.0 ไม่ควรเปลี่ยนหลักสำคัญของ v1.9 โดยไม่ตั้งใจ:

- ไม่เปลี่ยน `Daily_Log` casually
- ไม่เปลี่ยน `Summary`, `Reflections`, `Field_Context`, หรือ `Field_Review` โดยไม่มี compatibility plan
- ไม่เพิ่ม required input เพียงเพื่อให้ AI อ่านง่ายขึ้น
- ไม่สร้าง hidden score หรือ health-risk score
- ไม่ทำให้ workbook อ่านยากสำหรับมนุษย์
- ไม่ทำให้ Excel export กลายเป็น black-box dataset

ถ้าจะเพิ่มข้อมูลสำหรับ v2.0 ควรอธิบายว่า:

- เพิ่มเพื่อช่วยผู้ใช้ทบทวนอะไร
- ผู้ใช้เห็นข้อมูลนั้นได้อย่างไร
- AI ควรอ่านอย่างไร
- ขอบเขต non-medical คืออะไร
- backward compatibility จะรักษาอย่างไร

## Relationship To v1.9

v1.9 คือ Portable Field Memory Foundation

v2.0 ไม่ควรรีบแทนที่ v1.9 แต่ควรยืนอยู่บนรากเดิม:

- v1.9 ทำให้ข้อมูลพกพาได้
- v1.9 ทำให้ AI อ่าน boundary ได้
- v1.9 ทำให้ workbook มี context และ review summary
- v2.0 ค่อยเพิ่มประสบการณ์ review ที่มีโครง ไม่ใช่เปิด chatbot อิสระทันที

Field Review Companion จึงเป็นชั้นทบทวนหลัง export ไม่ใช่การเปลี่ยนแอป logging ให้กลายเป็นระบบวิเคราะห์สุขภาพอัตโนมัติ

## Future Implementation Notes

เมื่อถึงเวลาทำจริง ควรเริ่มจาก prototype ที่เล็กและตรวจสอบง่าย:

- อ่าน workbook ที่ผู้ใช้เลือกเอง
- แสดง summary แบบ descriptive เท่านั้น
- มี guided prompts จำนวนจำกัด
- มี non-medical reminder ในหน้า review
- ใช้ภาษาที่ไม่ตัดสิน
- ไม่บันทึกอะไรเพิ่มโดยไม่ให้ผู้ใช้รู้
- ไม่เปิด open-ended chatbot ก่อน guardrails ชัด

Open-ended chatbot อาจเป็น phase หลังจาก guided review ทำงานนิ่งแล้ว และต้องยังยึดหลัก user-owned, local-first, non-medical, and user-agency-first เหมือนเดิม

## Guardrail Sentence

Field Review Companion should help the user review their own field memory with more clarity and gentleness, without turning the app or AI into a medical authority, therapist, surveillance system, or judge of the user's life.
