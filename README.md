# Mindful Health Balance by MSxAI v1.3

Mindful Health Balance by MSxAI เป็นเว็บแอปแบบ static สำหรับ self-care reflection ของ pnat เพื่อช่วยดู pattern และ balance recovery ในชีวิตประจำวัน โดยเน้น 4 แกนหลัก:

- Hydration / น้ำ
- Caffeine & Sugary Drinks / กาแฟและเครื่องดื่มหวาน
- Load & Recovery / การออกกำลังและการพัก
- Mind State / ความเครียดและการกดดันตัวเอง

แนวคิดหลักของแอปคือ “ไม่ใช่การรีบแก้เลข แต่คือการสร้างระบบที่อยู่ได้จริง” แอปนี้ตั้งใจช่วยให้เห็นภาพรวมของวันแบบอ่อนโยน ไม่ดุ ไม่ทำให้กลัว และไม่ทำให้รู้สึกผิดกับสุขภาพ

v1.3 รองรับ UI 3 ภาษา:

- TH / ภาษาไทย
- EN / English
- 中文 / Chinese (Simplified)

ภาษาที่เลือกจะถูกบันทึกไว้ใน browser/localStorage key:

```text
mindfulHealthLanguage
```

## วิธีเปิดใช้งาน

เปิดไฟล์ `index.html` ด้วย browser ได้ทันที ไม่ต้องใช้ backend, server หรือ framework

```text
~/Desktop/MindfulSystem_xAi/apps/mindful-health-balance/index.html
```

## สิ่งที่แอปทำได้

- เลือก Today State: Energy, Mind, Sleep
- นับปริมาณน้ำเป็น ml พร้อม feedback ที่เน้นความพอดี ไม่ใช่การดื่มให้เยอะที่สุด
- เลือกเครื่องดื่มของวัน และดู reminder เรื่องเครื่องดื่มหวาน/กาแฟแบบไม่กดดัน
- เลือกกิจกรรมเพื่อคำนวณ Load Score และ Load Level
- สร้าง End-of-Day Reflection ในโทน NuTuenSai
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

ไฟล์ Excel มี 3 sheets:

- `Daily_Log`
- `Summary`
- `Reflections`

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

## หมายเหตุสำคัญ

แอปนี้ไม่ใช่ medical diagnosis tool และไม่ใช้แทนแพทย์ การตรวจตามนัด หรือคำแนะนำจากบุคลากรทางการแพทย์

ควรใช้แอปนี้เพื่อช่วยดู pattern, hydration, recovery, load และ mind state ในชีวิตประจำวันเท่านั้น ไม่ควรใช้เพื่อสรุปสุขภาพจากข้อมูลวันเดียว หรือใช้แทนการติดตามกับแพทย์
