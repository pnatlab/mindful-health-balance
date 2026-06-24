# Mind State Wording Decision

Date: 2026-05-23
Updated: 2026-06-24

This note records a display-wording and scale-order decision only. It does not add data schema, localStorage keys, Excel columns, export/import behavior, scoring, streaks, or diagnosis.

- `ใจโดยรวมวันนี้` / `Overall Mind Today` is the quick observation of the whole day.
- `ความรู้สึกของบันทึกนี้` / `Feeling in this note` is the feeling attached to that specific Mind Note entry.
- The main `Mind` field is now an ordered descriptive scale, not a score:
  - TH: `หนักมาก` -> `ไม่สบายใจ` -> `กดดัน` -> `เฉย ๆ` -> `พอไหว` -> `รู้สึกดี` -> `ผ่อนคลาย`
  - EN: `Very heavy` -> `Uneasy` -> `Pressured` -> `Neutral` -> `Okay` -> `Feeling good` -> `Relaxed`
  - ZH: `很沉重` -> `不安` -> `有压力` -> `一般` -> `还可以` -> `感觉不错` -> `放松`
- `เฉย ๆ` / `Neutral` / `一般` is the middle point, not an ideal state and not a negative state.
- `พอไหว` / `Okay` / `还可以` is a light support signal, not proof that the whole day is fine.
- Older display words such as `นิ่ง`, `Calm`, `平静`, `กังวล`, `Worried`, `担心`, `ฟุ้ง`, `Scattered`, and `分散` remain accepted as aliases for old saved or imported values.
