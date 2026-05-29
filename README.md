# Mindful Health Balance by MSxAI v1.9 Portable Field Memory Foundation

Mindful Health Balance by MSxAI เป็นเว็บแอปแบบ static สำหรับ self-care reflection ของ pnat เพื่อช่วยดู pattern และ balance recovery ในชีวิตประจำวัน โดยเน้น 4 แกนหลัก:

- Hydration / น้ำ
- Caffeine & Sugary Drinks / กาแฟและเครื่องดื่มหวาน
- Load & Recovery / การออกกำลังและการพัก
- Mind State / ความเครียดและการกดดันตัวเอง

แนวคิดหลักของแอปคือ “ไม่ใช่การรีบแก้เลข แต่คือการสร้างระบบที่อยู่ได้จริง” แอปนี้ตั้งใจช่วยให้เห็นภาพรวมของวันแบบอ่อนโยน ไม่ดุ ไม่ทำให้กลัว และไม่ทำให้รู้สึกผิดกับสุขภาพ

ตั้งแต่ v1.3 รองรับ UI 3 ภาษา:

- TH / ภาษาไทย
- EN / English
- 中文 / Chinese (Simplified)

ภาษาที่เลือกจะถูกบันทึกไว้ใน browser/localStorage key:

```text
mindfulHealthLanguage
```

## v1.4 Lavender Glass Welcome UI

v1.4 เพิ่ม Welcome Glass / NuTuenSai Welcome Threshold เป็นหน้ากระจกต้อนรับก่อนเข้า dashboard เพื่อให้ผู้ใช้เริ่มการบันทึกสุขภาพจากความอ่อนโยนและ human agency ไม่ใช่จากความกลัวหรือความรู้สึกว่าต้องรีบแก้ตัวเลข

หน้าต้อนรับนี้ใช้โทน lavender glass, white mist และ soft loop motif เพื่อช่วยวางจังหวะก่อนเริ่มดู hydration, recovery, daily load และ mind state แบบเบา ๆ

เมื่อกดเริ่มดูแลวันนี้หรือเข้าสู่ dashboard แอปจะจำเฉพาะ session ของวันนั้นไว้ด้วย key:

```text
mindfulHealthWelcomeSeen:<date>
```

ข้อมูลนี้เป็นเพียงสถานะ UI ของ welcome threshold ไม่เกี่ยวกับ Daily Log, localStorage สุขภาพ, Import หรือ Export

## v1.4.1 Dark Lavender Mode

v1.4.1 เพิ่มโหมดสว่าง/โหมดมืด โดยยังรักษาโทน glassmorphism, calm wellness-tech และความอ่อนโยนของระบบไว้

ค่าธีมที่เลือกจะถูกบันทึกไว้ใน browser/localStorage key:

```text
mindfulHealthTheme
```

การเปลี่ยนธีมเปลี่ยนเฉพาะการแสดงผล ไม่กระทบ Daily Log, Import หรือ Export

## v1.4.2 Auto Theme by Local Time

v1.4.2 เพิ่ม Auto theme ที่ใช้เวลาบนเครื่องผู้ใช้เพื่อเลือกธีมอัตโนมัติ:

- 07:00-18:59 = Light mode
- 19:00-06:59 = Dark mode

ผู้ใช้ยังสามารถเลือก Light หรือ Dark เองได้ ถ้าเลือกเองแอปจะคงธีมนั้นไว้ ไม่เปลี่ยนตามเวลา

theme preference ถูกบันทึกใน browser/localStorage key:

```text
mindfulHealthTheme
```

## v1.5 Structured Drink & Energy Profile

v1.5 เพิ่ม Drink Profile แบบ structured เพื่อให้เห็น pattern ของ sugar, caffeine, milk drink และ hydration support ชัดขึ้น โดยยังตั้งใจให้กรอกเท่าที่จำเป็น ไม่ใช่เพิ่มภาระให้ผู้ใช้

Hydration card ใช้บันทึกน้ำเปล่าและปริมาณน้ำเป็น `ml` ส่วน Drink Profile ใช้บันทึกเครื่องดื่มอื่นที่ไม่ใช่น้ำเปล่า เช่น กาแฟ ชา โกโก้ น้ำหวาน หรือน้ำผลไม้ เพื่อไม่ให้ผู้ใช้ต้องกรอกน้ำเปล่าซ้ำสองที่

เพื่อรักษา backward compatibility แอปยังรู้จักค่า `water` ใน log/import เดิมได้ แต่ UI ใหม่จะไม่แสดง `water` เป็นตัวเลือก Drink Type ใหม่ และ `Hydration_Support_Count` จะนับเฉพาะเครื่องดื่มที่ช่วย hydration แบบอ่อน ๆ เช่น lemon water หรือ coconut water เท่านั้น

v1.9.x เพิ่ม `น้ำอัดลม` เป็น Drink Type และปรับ Drink Sweetness Insight ให้ Sweetness / Sugar Score เป็น drink-load signal สำหรับ reflection แบบนุ่ม ๆ ไม่ใช่ moral score, diet advice หรือ medical advice น้ำอัดลมเป็นเพียงหมวดเครื่องดื่ม ระบบอ่านความหวานจากช่อง Sweetness เป็นหลัก จึงรองรับทั้ง zero/low sugar และหวานมากโดยไม่ตัดสินจาก category เพียงอย่างเดียว

ข้อมูล Daily Log และ Master Excel เพิ่ม columns:

- `Drink_Profile_JSON`
- `Sugar_Score`
- `Caffeine_Score`
- `Milk_Drink_Count`
- `Hydration_Support_Count`
- `Energy_Causes`

แอปยังรองรับ log เดิมที่ไม่มี columns เหล่านี้ โดย import แล้วตั้งค่า default เป็นค่าว่างหรือ `0` เพื่อรักษา backward compatibility

## v1.6 NuTuenSai Reflection Processing Layer

v1.6 เพิ่ม NuTuenSai Reflection Processing Layer เพื่อให้ Mindful Reminder, End-of-Day Reflection, Tomorrow Focus และ NuTuenSai Reminder อ่านความสัมพันธ์ของ signal มากขึ้น ไม่ตอบจากตัวเลขเดี่ยว ๆ

ระบบจัด input ที่มีอยู่เป็น 5 signals:

- Hydration Signal
- Drink Load Signal
- Recovery Load Signal
- Energy & Sleep Signal
- Mind Note Signal

Layer นี้ยังคงเป็น self-care reflection layer ไม่ใช่ medical diagnosis tool, therapy tool หรือคำแนะนำแทนแพทย์ เป้าหมายคือช่วยให้เห็น pattern ของน้ำ เครื่องดื่ม การพัก พลังงาน การนอน และใจอย่างมีโครงสร้าง โดยไม่เพิ่มแรงกดดันและไม่เปลี่ยน data schema

## v1.7 Minimal Layered UI

v1.7 จัดหน้าแอปใหม่เป็น Minimal Layered UI ภายใน single-page app เดิม โดยยังรักษา Welcome Glass / NuTuenSai Welcome Threshold เป็นประตูเข้าระบบก่อน dashboard

หลังผ่าน Welcome แล้ว แอปแบ่งเป็น 3 view:

- `Today` สำหรับกรอกข้อมูลวันนี้ เช่น Today State, Hydration, Drink Profile, Load & Recovery, Mind Note และ Reset Current Form
- `Reflection` สำหรับดู NuTuenSai reminder strip, generate/review/edit End-of-Day Reflection และ Save to Daily Log
- `Log` สำหรับดู Daily Log Table, Export Master Excel, Import Master Excel และ Clear Daily Log

การเปลี่ยน view เปลี่ยนเฉพาะ layout การแสดงผล ไม่เปลี่ยน data schema, canonical value, Save / Export / Import logic หรือ NuTuenSai Reflection Processing Layer

## v1.8 Activity / Profession-aware Load Presets

v1.8 เพิ่ม Activity / Profession-aware Load Presets ใน Load & Recovery เพื่อให้ระบบสะท้อนชนิดของ load ได้ละเอียดขึ้น เช่น physical load, cognitive load, clinical focus, service/standing load, market decision load, outdoor heat load, sport intensity load และ sleep debt load

load type เหล่านี้ถูก derive จาก activity chips ที่เลือกในวันนั้น ไม่ได้เพิ่ม column ใหม่ใน Daily Log หรือ Master Excel และไม่เปลี่ยน data schema, Save / Export / Import logic หรือ canonical value เดิม

เป้าหมายของ v1.8 คือช่วยให้ NuTuenSai Reflection Processing Layer เข้าใจว่า load ไม่ได้มาจากกีฬาเท่านั้น งานที่ใช้สมาธิ ความละเอียด การยืน เดิน แบกของ การเฝ้าตลาด หรืองานกลางแจ้งก็ใช้พลังได้เหมือนกัน โดยยังคงเป็น self-care reflection dashboard ไม่ใช่ medical tool, therapy tool หรือ performance tracking

### v1.8 Today Visual Identity Refinement

หน้า `Today` ถูกปรับให้รู้สึกเป็น personal health journal มากขึ้น โดยให้ Hydration เป็น water-glass visual anchor และเพิ่ม sun/moon rhythm object ใน Today State ตามเวลาท้องถิ่นของ browser เพื่อสื่อพลังงานของวันแบบเบา ๆ การปรับนี้เป็น UI-only ไม่เปลี่ยน input, scoring, data schema, localStorage, Save / Export / Import หรือ reflection logic

## v1.9 Portable Field Memory Foundation

v1.9 เพิ่ม AI-readable Excel context และ lightweight `Field_Review` ให้ไฟล์ `Export Master Excel` เพื่อให้ workbook อ่านได้ชัดขึ้นทั้งสำหรับมนุษย์และ AI/LLM โดยยังคง local-first, user-owned และไม่เพิ่ม input ใหม่

Excel export ยังรักษา sheet เดิม (`Daily_Log`, `Summary`, `Reflections`) และเพิ่ม:

- `Field_Context` สำหรับอธิบายเจตนาของไฟล์, data ownership, local-first boundary, AI reading boundary และ non-medical note
- `Field_Review` สำหรับสรุป descriptive pattern เบา ๆ จากข้อมูลที่มี เช่น ช่วงวันที่, ค่าเฉลี่ยน้ำ, high load days, mind/support ที่พบบ่อย, drink-load summary และจำนวนวันที่มี note/reflection

`Field_Review` เป็น summary เพื่อ pattern reflection เท่านั้น ไม่ใช่ diagnosis, medical advice, therapy interpretation หรือ health-risk prediction ผู้ใช้ยังเป็นเจ้าของไฟล์และเลือกเองว่าจะ export, เก็บ, review หรือ share ให้ AI อ่านเมื่อไหร่

### v1.9.x Adaptive Hydration Guidance

Hydration card เพิ่ม adaptive guidance แบบ display-only เพื่อสะท้อนว่าเป้าหมายน้ำเป็นช่วงยืดหยุ่นตามบริบทของวัน ไม่ใช่ตัวเลขตายตัว ระบบใช้ signals ที่มีอยู่แล้ว เช่น activity/load type, outdoor heat, sport intensity, sleep debt และ caffeine เพื่อแสดง estimated range หรือ recovery cue แบบอ่อนโยน

ฟีเจอร์นี้แยก strong activity load ออกจาก recovery-only signal เช่น นอนน้อย พลังงานต่ำ หรือใจฟุ้ง ถ้ามีแค่สัญญาณ recovery ระบบจะไม่สรุปว่าเป็นวันที่ activity load สูง แต่จะชวนวางน้ำเป็นฐานคู่กับการพัก โดยไม่เพิ่ม input ใหม่ ไม่เปลี่ยน data schema, localStorage, Save / Import / Export compatibility หรือ scoring logic และไม่ใช่ medical advice

## วิธีเปิดใช้งาน

เปิดไฟล์ `index.html` ด้วย browser ได้ทันที ไม่ต้องใช้ backend, server หรือ framework

```text
~/Desktop/MindfulSystem_xAi/apps/mindful-health-balance/index.html
```

## User Guides

- Thai: `USER_GUIDE_TH.md`
- English: `USER_GUIDE_EN.md`

## สิ่งที่แอปทำได้

- เลือก Today State: Energy, Mind, Sleep
- บันทึก positive mind state เช่น รู้สึกดีหรือผ่อนคลาย เป็น support signal ไม่ใช่คะแนน performance
- นับปริมาณน้ำเป็น ml พร้อม adaptive guidance ที่เน้นช่วงยืดหยุ่นตาม load ของวัน ไม่ใช่การดื่มให้เยอะที่สุด
- เลือกเครื่องดื่มของวัน และดู reminder เรื่องเครื่องดื่มหวาน/กาแฟแบบไม่กดดัน
- เพิ่ม Drink Profile แบบพอดี เพื่อดู sugar/caffeine/milk/hydration support รวมถึงน้ำอัดลมและ sweetness context โดยไม่ตัดสินเครื่องดื่ม
- เลือก Energy Cause แบบ optional เพื่อช่วยตีความพลังงานของวัน รวมทั้งเหตุที่ทำให้พลังงานลดลงและเหตุที่ช่วยพยุงพลังงาน เช่น นอนพอหรือใจเบา
- สะท้อน Energy Cause แบบ layered signal เมื่อ Energy level กับเหตุของพลังงานดูสวนกัน โดยไม่ถือว่าเป็นข้อมูลผิด
- เลือกกิจกรรมเพื่อคำนวณ Load Score และ Load Level
- เลือก Activity / Profession-aware Load Presets เพื่อให้ reflection เห็นชนิดของความเหนื่อย เช่น งานใช้สมาธิ งานคลินิก งานกลางแจ้ง กีฬา หรือวันที่นอนน้อย
- สร้าง End-of-Day Reflection ในโทน NuTuenSai โดยหน้า preview แสดง synthesis สั้น ๆ ขณะที่รายละเอียดเต็มยังอยู่ใน Daily Log / Reflections / Excel
- Save to Daily Log เพื่อบันทึกข้อมูลวันนี้เป็น 1 row ในตาราง
- Clear Daily Log เพื่อล้างตารางย้อนหลังใน browser นี้
- Export Master Excel เป็นไฟล์รวมข้อมูลทั้งหมด
- Import Master Excel เพื่อนำข้อมูลจากไฟล์ `.xlsx` กลับเข้าตาราง
- เปลี่ยนภาษา UI ได้ระหว่าง TH / EN / 中文 โดยไม่ลบ Daily Log เดิม
- Mind Note Layer สำหรับวางบันทึกใจหนึ่งบรรทัดคู่กับข้อมูลสุขภาพของวัน

## Mind Note Layer

Mind Note Layer เป็นพื้นที่บันทึกใจแบบเบา ๆ ที่ได้แรงบันดาลใจจากแนวคิด MindHome by MSxAI แต่แอปนี้ยังเป็น self-care reflection dashboard สำหรับดู pattern และ balance recovery เป็นหลัก

ใช้ Mind Note เพื่อจดสั้น ๆ ว่าวันนี้ใจถืออะไรอยู่ เลือกความรู้สึก และเลือก support need ที่ต้องการตอนนี้ ข้อมูลนี้ช่วยเชื่อม hydration, recovery, load, sleep และ mind state เข้าด้วยกัน

Mind Note ไม่ใช่ therapy tool, diagnosis tool, crisis support หรือ medical advice

## ข้อมูลอยู่ที่ไหน

ข้อมูลหลักถูกเก็บไว้ใน browser/localStorage ของเครื่องผู้ใช้เท่านั้น โดย Daily Log Table ในหน้าเว็บอ่านจาก localStorage key:

```text
mindfulHealthDailyLog
```

ไม่มีระบบ auto-upload และไม่มีการส่งข้อมูลไปที่ backend ใด ๆ

ถ้าย้ายโฟลเดอร์หรือเปิดจาก path ใหม่ ข้อมูล localStorage เดิมอาจไม่ตามมา ควร `Export Master Excel` ก่อนย้าย แล้ว `Import Master Excel` กลับหลังเปิดจาก path ใหม่

## Daily Log Table

Daily Log Table คือบันทึกย้อนหลังในหน้าเว็บ ใช้ดู pattern และ balance recovery แบบค่อย ๆ สะสม ไม่จำเป็นต้องกรอกละเอียดเกินไป

ปุ่ม `Save to Daily Log` จะบันทึก state ปัจจุบันเป็น 1 row ถ้ามี date เดิมอยู่แล้ว browser จะถามก่อน replace/update row เดิม

## Master Excel Export

ปุ่ม `Export Master Excel` จะสร้างไฟล์ชื่อ:

```text
Mindful_Health_Balance_Master.xlsx
```

ไฟล์ Excel มี 5 sheets:

- `Daily_Log`
- `Summary`
- `Reflections`
- `Field_Context`
- `Field_Review`

ไฟล์ Excel จะถูกดาวน์โหลดลงเครื่องผู้ใช้โดยตรงผ่าน browser

## Import Master Excel

ปุ่ม `Import Master Excel` ให้เลือกไฟล์ `.xlsx` แล้วอ่านข้อมูลจาก Sheet `Daily_Log` กลับเข้า localStorage หลัง import ตารางในหน้าเว็บจะ refresh ทันที

ถ้ามี Daily Log เดิมอยู่แล้ว browser จะถามก่อน overwrite

## ข้อจำกัดของ static app

เว็บแอปนี้เป็น static app ที่ทำงานใน browser เท่านั้น browser จึงไม่สามารถเขียนทับไฟล์ Excel ในโฟลเดอร์โดยตรงอัตโนมัติได้

ถ้าต้องการเขียนไฟล์จริงอัตโนมัติในอนาคต ต้องทำเป็น local app, Node server หรือ Electron

ระบบ export ใช้ SheetJS ผ่าน CDN ฝั่ง browser:

```text
https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js
```

## Technical Note

ใน v1.3 option บางส่วนยังใช้ label ภาษาไทยเป็น canonical value ภายใน state เพื่อรักษาความเข้ากันได้กับข้อมูลเดิมใน localStorage, Daily Log, Import และ Export

หากจะ refactor canonical state ในอนาคต ควรทำเป็น Canonical State Refactor release พร้อม migration layer เพื่อไม่ให้ข้อมูลเดิมของผู้ใช้เสีย compatibility

## หมายเหตุสำคัญ

แอปนี้ไม่ใช่ medical diagnosis tool และไม่ใช้แทนแพทย์ การตรวจตามนัด หรือคำแนะนำจากบุคลากรทางการแพทย์

ควรใช้แอปนี้เพื่อช่วยดู pattern, hydration, recovery, load และ mind state ในชีวิตประจำวันเท่านั้น ไม่ควรใช้เพื่อสรุปสุขภาพจากข้อมูลวันเดียว หรือใช้แทนการติดตามกับแพทย์
