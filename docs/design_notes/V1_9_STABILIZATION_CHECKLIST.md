# V1.9 Stabilization Checklist

## Purpose

เอกสารนี้ใช้เป็น checklist ก่อนเริ่ม Mindful Health Balance v2.0 เพื่อให้แน่ใจว่า v1.9 ทำงานนิ่งพอในฐานะ local-first self-care logging app และ Portable Field Memory Foundation

## Stabilization Principle

ก่อนเพิ่ม Field Review Companion v2.0 ระบบควรพิสูจน์ก่อนว่า:

- Daily input flow ยังเบาและใช้งานได้จริง
- Reflection อ่านเนียน ไม่ซ้ำ ไม่เป็น raw data dump
- Excel export อ่านง่ายและยัง compatible
- Adaptive Hydration ไม่พูดเกินหลักฐาน
- Mind/Energy signals ไม่ถูกตีความเป็นคะแนนตัดสินผู้ใช้
- Documentation อธิบายเจตนาและ guardrails ชัด

## 1. Today Input Flow Checklist

เช็กจากการใช้งานจริง:

- [ ] Today State กรอกง่ายหรือยัง
- [ ] Energy Cause มีทั้ง depletion และ support factors
- [ ] Mind State เป็น ordered descriptive scale จาก very heavy / uneasy / pressured / neutral / okay / positive states
- [ ] Hydration note ไม่ยาวหรือรกเกินไป
- [ ] Load & Recovery chips ไม่เยอะจนผู้ใช้ท้อ
- [ ] Mind Note ยังเป็นพื้นที่เบา ๆ ไม่เหมือน therapy form
- [ ] ผู้ใช้ยังสามารถกรอกแบบไม่ครบทุก field ได้โดยไม่รู้สึกผิด

## 2. Hydration Guidance Checklist

เช็กว่า:

- [ ] Rest/light day ใช้ base guidance
- [ ] Strong activity เช่น long run / sport / outdoor heat ใช้ adaptive range
- [ ] Recovery-only เช่น low sleep / low energy ไม่ถูกเรียกว่า high load
- [ ] High caffeine ใช้ plain-water-base cue ไม่ดุกาแฟ
- [ ] ข้อความไม่ใช้คำว่า ต้อง / เสี่ยง / อันตราย / ผิดปกติ
- [ ] Guidance ยังเป็น self-care cue ไม่ใช่ medical advice

## 3. Reflection Presentation Checklist

เช็กว่า:

- [ ] Reflection preview เป็น synthesis ไม่ใช่ raw field dump
- [ ] ไม่ซ้ำกับ NuTuenSai note ด้านซ้าย
- [ ] preview สั้นพออ่านจริง
- [ ] detailed reflection ยังถูกเก็บใน Daily Log / Reflections / Excel
- [ ] Recovery-only day ไม่พูดเหมือน heavy load
- [ ] Strong activity day ยังสะท้อน hydration/recovery relationship ได้
- [ ] Positive mind / positive energy ไม่ถูกแปลว่าวันนั้นดีทั้งหมด
- [ ] คำแนะนำยังนุ่ม ไม่สั่ง ไม่ดุ

## 4. Excel / Portable Field Memory Checklist

เช็กว่า workbook export ยังมี:

- [ ] Daily_Log
- [ ] Summary
- [ ] Reflections
- [ ] Field_Context
- [ ] Field_Review

เช็กเพิ่ม:

- [ ] Daily_Log schema ยัง compatible
- [ ] Import old workbook ยังทำงาน
- [ ] Field_Context อธิบาย data ownership / local-first / AI boundary / non-medical note ชัด
- [ ] Field_Review เป็น descriptive summary ไม่ใช่ diagnosis
- [ ] Common_Mind_States นับ mind states ใหม่ได้
- [ ] Energy_Causes เก็บ positive causes ได้
- [ ] Workbook อ่านได้ทั้งมนุษย์และ AI/LLM

## 5. Signal Alignment Checklist

เช็กว่า:

- [ ] Energy low + enough_sleep ถูกอ่านเป็น layered signal ไม่ใช่ error
- [ ] Energy good + low_sleep ไม่ถูกสรุปว่าทุกอย่างดี
- [ ] Energy low + light_mind แยกกายกับใจได้
- [ ] Supportive Mind State เช่น พอไหว / รู้สึกดี / ผ่อนคลาย เป็น support signal ไม่ใช่ performance score
- [ ] Contradiction ถูกอ่านเป็น layered signal ไม่ใช่ invalid data
- [ ] ระบบไม่ใช้คำว่า wrong / inconsistent / conflict ใน user-facing text

## 6. Documentation Checklist

เช็กว่า docs ยังสอดคล้องกัน:

- [ ] README.md
- [ ] USER_GUIDE_TH.md
- [ ] USER_GUIDE_EN.md
- [ ] PORTABLE_FIELD_MEMORY_DESIGN.md
- [ ] HYDRATION_ADAPTIVE_GUIDANCE.md
- [ ] REFLECTION_PRESENTATION_DECISION.md
- [ ] ENERGY_CAUSE_ALIGNMENT.md
- [ ] MIND_STATE_POSITIVE_OPTIONS.md
- [ ] DRINK_SWEETNESS_INSIGHT.md
- [ ] REFLECTION_PAGE_LAYOUT_DECISION.md
- [ ] FIELD_REVIEW_COMPANION_V2.md
- [ ] NAVIGATION_ARCHITECTURE_V2.md

Docs ควรบอกชัดว่า:

- [ ] local-first
- [ ] user-owned data
- [ ] no auto-upload
- [ ] non-medical / non-therapy
- [ ] AI reads only when user chooses to share
- [ ] v2.0 should start with guided reflection, not open-ended chatbot

## 7. Real-use Validation Questions

หลังใช้จริง 3-7 วัน ให้ถาม:

- [ ] เปิดแอปแล้วอยากกรอกไหม หรือรู้สึกเยอะเกิน
- [ ] Hydration guidance ช่วยจริงไหม หรือทำให้คิดมาก
- [ ] Reflection preview ฟังเหมือน NuTuenSai ไหม
- [ ] Excel export ดูมีประโยชน์ไหม
- [ ] Field_Review ช่วยตั้งต้นการทบทวนไหม
- [ ] มีจุดไหนที่ผู้ใช้รู้สึกถูกประเมินหรือถูกตัดสินไหม
- [ ] มี field ไหนที่ไม่เคยใช้จริงหรือทำให้ flow หนักไหม

## 8. Go / No-Go Before v2.0

### Ready for v2.0 when:

- [ ] Today input ใช้งานจริงได้ต่อเนื่อง
- [ ] Reflection ไม่ซ้ำซ้อนและไม่ robotic
- [ ] Excel export เสถียร
- [ ] Field_Review อ่านได้และช่วยตั้งต้น insight
- [ ] Docs ครบ
- [ ] No medical/fear wording
- [ ] User still feels agency

### Not ready for v2.0 if:

- [ ] Today ยังรู้สึกหนักเกิน
- [ ] Hydration guidance ทำให้ผู้ใช้กังวล
- [ ] Reflection ยังยาวหรือซ้ำ
- [ ] Export/import ยังไม่นิ่ง
- [ ] Field_Review ยังอ่านยาก
- [ ] ระบบยังตีความเกินข้อมูล
- [ ] ผู้ใช้รู้สึกว่า AI กำลังตัดสินแทน

## 9. Recommended Next Step

ให้ใช้ v1.9 จริงอย่างน้อย 3-7 วัน แล้ว export workbook หนึ่งรอบมาตรวจ:

- Daily_Log
- Field_Review
- Reflection text
- Adaptive hydration behavior
- Mind/Energy signal behavior

หลังจากนั้นค่อยตัดสินใจว่าจะ:

- polish v1.9 เพิ่ม
- หรือเริ่ม prototype Field Review Companion v2.0 แบบเล็กและ guided

## Guardrail Sentence

Mindful Health Balance should not move to v2.0 because the idea is exciting; it should move to v2.0 only when v1.9 feels stable, light, user-owned, non-medical, and genuinely useful in real daily use.
