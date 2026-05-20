const STORAGE_PREFIX = "mindfulHealthBalance";
const DAILY_LOG_KEY = "mindfulHealthDailyLog";
const LANGUAGE_KEY = "mindfulHealthLanguage";
const DAILY_LOG_COLUMNS = [
  "Date",
  "Energy",
  "Mind",
  "Sleep",
  "Water_ml",
  "Drinks",
  "Sweet_Drinks_Count",
  "Activities",
  "Load_Score",
  "Load_Level",
  "Hydration_Status",
  "Tomorrow_Focus",
  "NuTuenSai_Reminder",
  "Mind_Note_Text",
  "Mind_Note_Feeling",
  "Mind_Note_Support"
];

const translations = {
  th: {
    code: "th",
    locale: "th-TH",
    htmlLang: "th",
    eyebrow: "Personal mindful dashboard",
    title: "Mindful Health Balance by MSxAI",
    version: "v1.3 Mind Note Layer",
    subtitle: "ค่อย ๆ เห็นสมดุลของน้ำ การพัก การใช้พลัง และใจในแต่ละวัน",
    noticeTitle: "Self-care reflection tool",
    noticeText: "แอปนี้ช่วยดู pattern และ balance recovery เท่านั้น ไม่ใช่เครื่องมือวินิจฉัย และไม่ใช้แทนแพทย์หรือการติดตามตามนัด",
    todayState: "Today State",
    todayStateHeading: "วันนี้ร่างกายกับใจเป็นอย่างไร",
    energyLabel: "Energy",
    mindLabel: "Mind",
    sleepLabel: "Sleep",
    hydration: "Hydration",
    hydrationHeading: "น้ำวันนี้",
    halfBottle: "+ครึ่งขวด",
    resetButton: "Reset",
    drinks: "Drinks",
    drinksHeading: "เครื่องดื่มที่เลือกวันนี้",
    loadRecovery: "Load & Recovery",
    loadHeading: "วันนี้ใช้พลังไปกับอะไร",
    mindfulReminder: "Mindful Reminder",
    nuTuenSaiNote: "NuTuenSai note",
    reflectionGenerator: "Reflection Generator",
    endReflection: "End-of-Day Reflection",
    mindNoteKicker: "Mind Note — วางใจหนึ่งบรรทัด",
    mindNoteTitle: "Mind Note",
    mindNoteSubtitle: "วางสิ่งที่ใจถืออยู่เบา ๆ โดยไม่ต้องรีบแก้",
    mindNoteTextLabel: "วันนี้ใจถืออะไรอยู่",
    mindNotePlaceholder: "เช่น อยากให้เลขดีขึ้นเร็ว แต่ก็ไม่อยากกดดันตัวเอง",
    mindNoteFeelingLabel: "Mind Note Feeling",
    mindNoteSupportLabel: "Support Need",
    generateReflection: "Generate End-of-Day Reflection",
    reflectionPlaceholder: "กด Generate เพื่อสร้าง reflection จากข้อมูลวันนี้",
    localOnly: "Local only",
    dailyLogControls: "Daily Log Controls",
    controlsHelp: "บันทึกเป็นตารางใน browser/localStorage ของเครื่องนี้ แล้ว export เป็น Master Excel เมื่อพี่ต้องการ",
    saveDailyLog: "Save to Daily Log",
    clearDailyLog: "Clear Daily Log",
    exportMasterExcel: "Export Master Excel",
    importMasterExcel: "Import Master Excel",
    dailyLogTable: "Daily Log Table",
    tableHelper: "ตารางนี้คือบันทึกย้อนหลังใน browser นี้ ใช้ดู pattern แบบไม่ต้องกรอกละเอียดเกินไป",
    emptyLog: "ยังไม่มี log วันนี้ เริ่มจาก Save to Daily Log ได้เลย",
    sweetCount: "หวาน {count}",
    logCountSingular: "{count} log",
    logCountPlural: "{count} logs",
    drinksDefault: "เลือกเครื่องดื่มวันนี้เพื่อดู reminder แบบเบา ๆ",
    waterBase: "น้ำเปล่ายังเป็นฐานที่เรียบง่ายและไว้ใจได้",
    loadLightWithNote: "Load เบา วันนี้ยังมีพื้นที่ให้ recovery แบบสบาย ๆ",
    loadMediumWithNote: "Load วันนี้อยู่ระดับกลาง ฟังสัญญาณร่างกายแล้วค่อยเพิ่มหรือลด",
    loadHeavyCombo: "วันนี้ร่างกายถูกใช้เยอะแล้ว พรุ่งนี้ให้ recovery เป็นส่วนหนึ่งของ performance",
    saveTodayDone: "บันทึกวันนี้แล้ว พี่ไม่ต้องแบกต่อในหัวแล้วนะ",
    replaceConfirm: "มี log ของวันนี้อยู่แล้ว ต้องการ replace/update row เดิมไหม?",
    replaceCancelled: "ยังไม่บันทึกทับ row เดิม พี่ไม่ต้องรีบตัดสินใจก็ได้",
    savedDailyLog: "บันทึกลง Daily Log แล้ว พี่ไม่ต้องแบกต่อในหัวแล้วนะ",
    clearConfirm: "ต้องการล้าง Daily Log ทั้งหมดใน browser นี้ไหม?",
    clearedDailyLog: "ล้าง Daily Log ใน browser นี้แล้ว",
    sheetJsMissing: "ยังโหลด SheetJS ไม่สำเร็จ ลองเช็กอินเทอร์เน็ตแล้วกดอีกครั้ง",
    noDailyLog: "ยังไม่มี Daily Log ให้ export เริ่มจาก Save to Daily Log ก่อนนะ",
    exportedMaster: "Export Master Excel แล้ว ไฟล์จะถูกดาวน์โหลดลงเครื่องพี่",
    importOverwriteConfirm: "มี Daily Log อยู่แล้ว ต้องการ overwrite ด้วยข้อมูลจากไฟล์นี้ไหม?",
    importCancelled: "ยังไม่ import ทับ Daily Log เดิม",
    missingDailySheet: "ไม่พบ Sheet Daily_Log ในไฟล์นี้",
    importDone: "Import Master Excel แล้ว ({count} rows)",
    importFailed: "อ่านไฟล์ Excel ไม่สำเร็จ ลองตรวจไฟล์อีกครั้ง",
    overallMessage: "ข้อมูลนี้ช่วยดู pattern และ balance recovery ไม่ใช่การตัดสินสุขภาพจากวันใดวันหนึ่ง",
    reflection: {
      good: "วันนี้ทำได้ดี:",
      adjust: "สิ่งที่ควรปรับ:",
      recovery: "Recovery Note:",
      hydration: "Hydration Note:",
      tomorrow: "Tomorrow Focus:",
      reminder: "NuTuenSai Reminder:",
      mindNote: "Mind Note:",
      mindHolding: "สิ่งที่ใจถืออยู่วันนี้:",
      noMindNote: "วันนี้ใจยังไม่ต้องเขียนยาว แค่เห็นว่ามีพื้นที่ให้วางก็พอ",
      waterSeen: "เห็นภาพน้ำวันนี้แล้ว ({water} ml)",
      plainWaterBase: "มีน้ำเปล่าเป็นฐานของวัน",
      checkedState: "เช็ก state ตัวเองก่อนรีบสรุป",
      openedPattern: "เริ่มเปิดพื้นที่ให้ตัวเองสังเกต pattern",
      reduceSweet: "ลดแก้วหวานถัดไปหนึ่งจุดก็พอ ไม่ต้องหักดิบ",
      addSips: "ค่อย ๆ เพิ่มการจิบน้ำระหว่างวัน โดยไม่ต้องอัดทีเดียว",
      stopPush: "หยุด push เพิ่ม แล้ววาง recovery เป็นงานหลัก",
      keepBalance: "รักษาจังหวะที่พอดี และไม่ต้องเพิ่มอะไรเพราะความกลัว",
      closing1: "วันนี้พี่ไม่ได้ต้องแก้ทุกอย่าง แค่เห็น pattern ชัดขึ้นก็ถือว่าระบบทำงานแล้ว",
      closing2: "เป้าหมายไม่ใช่เลขดีเร็ว แต่คือระบบที่ไม่พังซ้ำเพราะการรีบแก้"
    },
    hydrationFeedback: {
      low: "วันนี้น้ำยังน้อยไปนิด ค่อย ๆ จิบเพิ่มนะ",
      rising: "กำลังดีขึ้นแล้ว อย่าอัดทีเดียว",
      balanced: "น้ำวันนี้เริ่มสมดุลแล้ว",
      enough: "พอแล้ว ไม่ต้องเร่งดื่มเกินจำเป็น"
    },
    drinksFeedback: {
      sweetMany: "แก้วหวาน = ของหวาน ไม่ใช่น้ำ วันนี้ลดแก้วถัดไปก็พอ",
      sweetSome: "ลดหวานก่อน ลดกลัวทีหลัง",
      blackCoffee: "กาแฟได้ แต่อย่าให้แทนน้ำ"
    },
    loadLevel: {
      light: "Load เบา",
      medium: "Load กลาง",
      high: "Load สูง"
    },
    loadFeedback: {
      high: "วันนี้ load สูงกว่า recovery ได้ง่าย อย่า push เพิ่มแล้ว ให้การพักเป็นงานหลัก",
      recoveryPerformance: "Recovery คือส่วนหนึ่งของ performance"
    },
    reminder: {
      pressured: "อย่ารีบแก้เลขด้วยความกลัว ค่อย ๆ สร้างระบบที่อยู่ได้จริง",
      worried: "ค่ารอบเดียวคือข้อมูล ไม่ใช่คำตัดสินชีวิต",
      lowSleep: "อย่าตัดสินสุขภาพตัวเองจากวันที่นอนน้อย",
      highLoad: "Recovery คือส่วนหนึ่งของ training",
      steady: "พี่ไม่จำเป็นต้องกลับไปกลัว แค่ต้องกลับมาสม่ำเสมอ"
    },
    mindNoteReminder: {
      pressured: "เห็นความกดดันแล้วนะพี่ วันนี้ไม่ต้องรีบแก้ทุกอย่าง แค่กลับมาสม่ำเสมอก็พอ",
      worried: "ความกังวลเป็นสัญญาณให้ดูแล ไม่ใช่คำสั่งให้เร่งแก้",
      hydrate_gently: "วันนี้จิบน้ำเบา ๆ ให้ระบบกลับมานิ่ง ไม่ต้องอัดน้ำเพื่อเอาชนะตัวเลข"
    },
    recoveryNote: {
      high: "Recovery คือส่วนหนึ่งของ performance วันนี้พอแล้วกับการใช้ร่างกายหนัก ๆ",
      lowSleep: "อย่าตัดสินสุขภาพตัวเองจากวันที่นอนน้อย ให้การพักช่วยปรับภาพรวมก่อน",
      medium: "Load กลาง ๆ ต้องมีช่วงผ่อน ไม่ต้องเติมงานหนักเพราะรู้สึกว่ายังทำได้",
      light: "วันนี้เหมาะกับการรักษาจังหวะเบา ๆ และสะสมความสม่ำเสมอ"
    },
    tomorrowFocus: {
      recovery: "Recovery ก่อน แล้วค่อยดูว่าร่างกายพร้อมแค่ไหน",
      water: "วางจุดจิบน้ำเล็ก ๆ ให้กระจายทั้งวัน",
      sweet: "ลดหวานหนึ่งจุด โดยไม่ต้องทำให้วันนี้กลายเป็นบทลงโทษ",
      steady: "รักษาระบบที่อยู่ได้จริงต่ออีกหนึ่งวัน"
    },
    options: {
      energy: { low: "ต่ำ", medium: "กลาง", good: "ดี" },
      mind: { calm: "นิ่ง", worried: "กังวล", pressured: "กดดัน", scattered: "ฟุ้ง" },
      sleep: { low: "น้อย", okay: "พอใช้", good: "ดี" },
      drinks: {
        blackCoffee: "กาแฟดำ",
        milkCoffee: "กาแฟใส่นม",
        cocoa: "โกโก้",
        sweetDrink: "น้ำชมพู/เครื่องดื่มหวาน",
        unsweetLime: "น้ำมะนาวไม่หวาน",
        water: "น้ำเปล่า"
      },
      activities: {
        rest: "Rest day",
        easyRun: "Easy run",
        longRun: "Long run",
        heavyPingPong: "ปิงปองหนัก",
        longWalk: "เดินเยอะ",
        deepWork: "Deep work / coding นาน",
        lowSleep: "นอนน้อย"
      },
      mindNote: {
        feeling: {
          calm: "นิ่ง",
          worried: "กังวล",
          pressured: "กดดัน",
          tired: "ล้า",
          scattered: "ฟุ้ง",
          grateful: "ขอบคุณ"
        },
        support: {
          rest_first: "พักก่อน",
          see_pattern: "เห็น pattern",
          reduce_pressure: "ลดความกดดัน",
          hydrate_gently: "จิบน้ำเบา ๆ",
          set_down: "วางไว้ก่อน"
        }
      }
    }
  },
  en: {
    code: "en",
    locale: "en-US",
    htmlLang: "en",
    eyebrow: "Personal mindful dashboard",
    title: "Mindful Health Balance by MSxAI",
    version: "v1.3 Mind Note Layer",
    subtitle: "Gently notice the balance of hydration, recovery, daily load, and mind state.",
    noticeTitle: "Self-care reflection tool",
    noticeText: "This app helps you notice patterns and balance recovery only. It is not a diagnosis tool and does not replace medical care or follow-up appointments.",
    todayState: "Today State",
    todayStateHeading: "How are your body and mind today?",
    energyLabel: "Energy",
    mindLabel: "Mind",
    sleepLabel: "Sleep",
    hydration: "Hydration",
    hydrationHeading: "Water today",
    halfBottle: "+half bottle",
    resetButton: "Reset",
    drinks: "Drinks",
    drinksHeading: "Drinks chosen today",
    loadRecovery: "Load & Recovery",
    loadHeading: "What used your energy today?",
    mindfulReminder: "Mindful Reminder",
    nuTuenSaiNote: "NuTuenSai note",
    reflectionGenerator: "Reflection Generator",
    endReflection: "End-of-Day Reflection",
    mindNoteKicker: "Mind Note — one line to set down",
    mindNoteTitle: "Mind Note",
    mindNoteSubtitle: "Set down what the mind is holding, without rushing to fix it.",
    mindNoteTextLabel: "What is the mind holding today?",
    mindNotePlaceholder: "For example: I want the numbers to improve quickly, but I do not want to pressure myself.",
    mindNoteFeelingLabel: "Mind Note Feeling",
    mindNoteSupportLabel: "Support Need",
    generateReflection: "Generate End-of-Day Reflection",
    reflectionPlaceholder: "Press Generate to create a reflection from today's inputs",
    localOnly: "Local only",
    dailyLogControls: "Daily Log Controls",
    controlsHelp: "Save today into a local browser table, then export a Master Excel file when you need it.",
    saveDailyLog: "Save to Daily Log",
    clearDailyLog: "Clear Daily Log",
    exportMasterExcel: "Export Master Excel",
    importMasterExcel: "Import Master Excel",
    dailyLogTable: "Daily Log Table",
    tableHelper: "This table is your browser-based history. Use it to see patterns without needing perfect entries.",
    emptyLog: "No log yet. Start with Save to Daily Log.",
    sweetCount: "Sweet {count}",
    logCountSingular: "{count} log",
    logCountPlural: "{count} logs",
    drinksDefault: "Choose today's drinks to see a gentle reminder.",
    waterBase: "Plain water is still the simple base you can trust.",
    loadLightWithNote: "Light load. There is room for easy recovery today.",
    loadMediumWithNote: "Moderate load today. Listen to your body before adding or reducing more.",
    loadHeavyCombo: "Your body has been used a lot today. Let recovery be part of performance tomorrow.",
    saveTodayDone: "Today is saved. You do not have to carry it all in your head now.",
    replaceConfirm: "A log for this date already exists. Replace/update the existing row?",
    replaceCancelled: "Not replacing the existing row. No need to rush the decision.",
    savedDailyLog: "Saved to Daily Log. You do not have to carry it all in your head now.",
    clearConfirm: "Clear all Daily Log data in this browser?",
    clearedDailyLog: "Daily Log in this browser has been cleared.",
    sheetJsMissing: "SheetJS has not loaded yet. Check your internet connection and try again.",
    noDailyLog: "There is no Daily Log to export yet. Start with Save to Daily Log.",
    exportedMaster: "Master Excel exported. The file will download to your device.",
    importOverwriteConfirm: "Daily Log data already exists. Overwrite it with this file?",
    importCancelled: "Import cancelled. Existing Daily Log was not overwritten.",
    missingDailySheet: "No Daily_Log sheet was found in this file.",
    importDone: "Master Excel imported ({count} rows).",
    importFailed: "Could not read the Excel file. Please check the file and try again.",
    overallMessage: "This data helps notice patterns and balance recovery. It is not a judgment from any single day.",
    reflection: {
      good: "What went well today:",
      adjust: "What to adjust:",
      recovery: "Recovery Note:",
      hydration: "Hydration Note:",
      tomorrow: "Tomorrow Focus:",
      reminder: "NuTuenSai Reminder:",
      mindNote: "Mind Note:",
      mindHolding: "What the mind was holding today:",
      noMindNote: "No long note needed today. Seeing that there is space to set it down is already enough.",
      waterSeen: "You saw today's water picture ({water} ml)",
      plainWaterBase: "Plain water was part of today's base",
      checkedState: "You checked your state before rushing to conclusions",
      openedPattern: "You made space to notice a pattern",
      reduceSweet: "Reduce the next sweet drink by one step. No need to go extreme.",
      addSips: "Add small sips across the day without forcing it all at once.",
      stopPush: "Stop pushing more today and make recovery the main task.",
      keepBalance: "Keep the balanced rhythm. Do not add more just because of fear.",
      closing1: "You do not have to fix everything today. Seeing the pattern more clearly already means the system is working.",
      closing2: "The goal is not a better number quickly. The goal is a system that does not break from rushing."
    },
    hydrationFeedback: {
      low: "Water is still a little low today. Add small sips gently.",
      rising: "Getting better. Do not force it all at once.",
      balanced: "Water today is starting to feel balanced.",
      enough: "That is enough. No need to drink more than necessary."
    },
    drinksFeedback: {
      sweetMany: "Sweet drinks count as dessert, not water. Reducing the next one is enough.",
      sweetSome: "Reduce sweetness first. Reduce fear later.",
      blackCoffee: "Coffee is okay, but do not let it replace water."
    },
    loadLevel: {
      light: "Light Load",
      medium: "Moderate Load",
      high: "High Load"
    },
    loadFeedback: {
      high: "Today load can easily outrun recovery. Do not push more. Let rest be the main task.",
      recoveryPerformance: "Recovery is part of performance."
    },
    reminder: {
      pressured: "Do not rush to fix numbers from fear. Build a system that can actually last.",
      worried: "One result is information, not a life sentence.",
      lowSleep: "Do not judge your health from a low-sleep day.",
      highLoad: "Recovery is part of training.",
      steady: "You do not need to go back to fear. Just come back to consistency."
    },
    mindNoteReminder: {
      pressured: "The pressure is noticed. Today does not need to fix everything; returning to consistency is enough.",
      worried: "Worry is a signal to care, not an order to rush.",
      hydrate_gently: "Hydrate gently today. Let the system settle without forcing the numbers."
    },
    recoveryNote: {
      high: "Recovery is part of performance. Today is enough for heavy body use.",
      lowSleep: "Do not judge your health from a low-sleep day. Let rest help rebalance the picture.",
      medium: "Moderate load needs a softer window. Do not add more just because you still can.",
      light: "Today is good for keeping a light rhythm and building consistency."
    },
    tomorrowFocus: {
      recovery: "Recovery first, then see how ready the body feels.",
      water: "Place small water-sipping moments across the day.",
      sweet: "Reduce sweetness by one step without turning today into punishment.",
      steady: "Keep the system sustainable for one more day."
    },
    options: {
      energy: { low: "Low", medium: "Medium", good: "Good" },
      mind: { calm: "Calm", worried: "Worried", pressured: "Pressured", scattered: "Scattered" },
      sleep: { low: "Low", okay: "Okay", good: "Good" },
      drinks: {
        blackCoffee: "Black coffee",
        milkCoffee: "Coffee with milk",
        cocoa: "Cocoa",
        sweetDrink: "Pink milk / sweet drink",
        unsweetLime: "Unsweetened lime water",
        water: "Plain water"
      },
      activities: {
        rest: "Rest day",
        easyRun: "Easy run",
        longRun: "Long run",
        heavyPingPong: "Heavy ping-pong",
        longWalk: "Lots of walking",
        deepWork: "Long deep work / coding",
        lowSleep: "Low sleep"
      },
      mindNote: {
        feeling: {
          calm: "Calm",
          worried: "Worried",
          pressured: "Pressured",
          tired: "Tired",
          scattered: "Scattered",
          grateful: "Grateful"
        },
        support: {
          rest_first: "Rest first",
          see_pattern: "See the pattern",
          reduce_pressure: "Reduce pressure",
          hydrate_gently: "Hydrate gently",
          set_down: "Set it down"
        }
      }
    }
  },
  zh: {
    code: "zh",
    locale: "zh-CN",
    htmlLang: "zh-CN",
    eyebrow: "个人正念健康仪表板",
    title: "Mindful Health Balance by MSxAI",
    version: "v1.3 心念记录层",
    subtitle: "温和地观察补水、恢复、每日负荷与内在状态的平衡。",
    noticeTitle: "自我照顾反思工具",
    noticeText: "这个应用只帮助你观察 pattern 和 balance recovery，不是诊断工具，也不能替代医生或复诊。",
    todayState: "今日状态",
    todayStateHeading: "今天身体和心的状态如何？",
    energyLabel: "Energy",
    mindLabel: "Mind",
    sleepLabel: "Sleep",
    hydration: "Hydration",
    hydrationHeading: "今天的饮水",
    halfBottle: "+半瓶",
    resetButton: "重置",
    drinks: "饮品",
    drinksHeading: "今天选择的饮品",
    loadRecovery: "Load & Recovery",
    loadHeading: "今天把能量用在哪里？",
    mindfulReminder: "正念提醒",
    nuTuenSaiNote: "NuTuenSai 提醒",
    reflectionGenerator: "反思生成器",
    endReflection: "每日结束反思",
    mindNoteKicker: "Mind Note — 轻轻放下一行",
    mindNoteTitle: "Mind Note",
    mindNoteSubtitle: "把心里拿着的东西轻轻放下，不需要急着修正。",
    mindNoteTextLabel: "今天心里轻轻承载着什么？",
    mindNotePlaceholder: "例如：我希望数字快点变好，但也不想给自己太大压力。",
    mindNoteFeelingLabel: "Mind Note 感受",
    mindNoteSupportLabel: "此刻需要的支持",
    generateReflection: "生成每日结束反思",
    reflectionPlaceholder: "点击 Generate，根据今天的数据生成反思",
    localOnly: "仅本机",
    dailyLogControls: "Daily Log 控制",
    controlsHelp: "把今天保存到本机浏览器表格，需要时再导出 Master Excel。",
    saveDailyLog: "保存到 Daily Log",
    clearDailyLog: "清空 Daily Log",
    exportMasterExcel: "导出 Master Excel",
    importMasterExcel: "导入 Master Excel",
    dailyLogTable: "Daily Log 表格",
    tableHelper: "这是保存在本浏览器里的历史记录，用来观察 pattern，不需要填写得完美。",
    emptyLog: "还没有记录。可以先点击 Save to Daily Log。",
    sweetCount: "甜饮 {count}",
    logCountSingular: "{count} 条记录",
    logCountPlural: "{count} 条记录",
    drinksDefault: "选择今天的饮品，看看温柔提醒。",
    waterBase: "白水仍然是简单、可靠的基础。",
    loadLightWithNote: "Load 较轻，今天还有空间好好恢复。",
    loadMediumWithNote: "今天是中等 Load。先听身体信号，再决定要不要增减。",
    loadHeavyCombo: "今天身体已经用了很多。明天让 recovery 成为 performance 的一部分。",
    saveTodayDone: "今天已保存。现在不用再把它都放在脑子里了。",
    replaceConfirm: "这个日期已经有记录了。要替换/更新原本的 row 吗？",
    replaceCancelled: "没有覆盖旧记录。不需要急着决定。",
    savedDailyLog: "已保存到 Daily Log。现在不用再把它都放在脑子里了。",
    clearConfirm: "要清空这个浏览器里的所有 Daily Log 吗？",
    clearedDailyLog: "这个浏览器里的 Daily Log 已清空。",
    sheetJsMissing: "SheetJS 还没有加载完成。请检查网络后再试一次。",
    noDailyLog: "目前没有 Daily Log 可导出。请先 Save to Daily Log。",
    exportedMaster: "Master Excel 已导出，文件会下载到你的设备。",
    importOverwriteConfirm: "已经有 Daily Log 数据。要用这个文件覆盖吗？",
    importCancelled: "已取消导入，没有覆盖原本的 Daily Log。",
    missingDailySheet: "这个文件里找不到 Daily_Log sheet。",
    importDone: "Master Excel 已导入（{count} rows）。",
    importFailed: "无法读取这个 Excel 文件。请检查文件后再试。",
    overallMessage: "这些数据帮助观察 pattern 和 balance recovery，不是用某一天来判断健康。",
    reflection: {
      good: "今天做得好的地方：",
      adjust: "可以调整的地方：",
      recovery: "恢复提醒：",
      hydration: "补水提醒：",
      tomorrow: "明天的重点：",
      reminder: "NuTuenSai 提醒：",
      mindNote: "心念记录：",
      mindHolding: "今天心里承载的是：",
      noMindNote: "今天不需要写很长。看见这里有空间可以先放下，就已经足够。",
      waterSeen: "今天已经看见饮水情况（{water} ml）",
      plainWaterBase: "今天有白水作为基础",
      checkedState: "在急着下结论前，先看见了自己的状态",
      openedPattern: "给自己留了空间去观察 pattern",
      reduceSweet: "下一杯甜饮少一点就够了，不需要极端。",
      addSips: "把小口喝水分散到一天里，不要一次硬灌。",
      stopPush: "今天不要再 push，把 recovery 当成主要任务。",
      keepBalance: "维持刚刚好的节奏，不要因为害怕而增加更多。",
      closing1: "今天不需要把所有事都修好。能更清楚看见 pattern，就说明系统已经在运作。",
      closing2: "目标不是数字很快变好，而是建立一个不会因为急着修正而反复崩掉的系统。"
    },
    hydrationFeedback: {
      low: "今天水还少了一点，慢慢小口补就好。",
      rising: "正在变好，不要一次喝太多。",
      balanced: "今天的饮水开始比较平衡了。",
      enough: "已经够了，不需要为了追求更多而硬喝。"
    },
    drinksFeedback: {
      sweetMany: "甜饮 = 甜点，不是水。今天下一杯少一点就够了。",
      sweetSome: "先减少甜，再减少害怕。",
      blackCoffee: "咖啡可以，但不要让它取代水。"
    },
    loadLevel: {
      light: "Load 轻",
      medium: "Load 中",
      high: "Load 高"
    },
    loadFeedback: {
      high: "今天 load 很容易超过 recovery。不要再 push，把休息当成主要任务。",
      recoveryPerformance: "Recovery 是 performance 的一部分。"
    },
    reminder: {
      pressured: "不要因为害怕而急着修正数字，慢慢建立能持续的系统。",
      worried: "一次数据是信息，不是对人生的判决。",
      lowSleep: "不要用睡少的一天来判断自己的健康。",
      highLoad: "Recovery 是 training 的一部分。",
      steady: "你不需要回到害怕，只需要回到稳定。"
    },
    mindNoteReminder: {
      pressured: "已经看见压力了。今天不需要修好一切，只要回到稳定就好。",
      worried: "担心是在提醒照顾自己，不是命令你立刻修正。",
      hydrate_gently: "今天温和补水，让系统慢慢稳定，不需要为了数字而勉强自己。"
    },
    recoveryNote: {
      high: "Recovery 是 performance 的一部分。今天身体已经用了很多。",
      lowSleep: "不要用睡少的一天来判断健康，让休息先帮整体恢复平衡。",
      medium: "中等 Load 也需要放松的窗口，不要因为还可以做就继续加。",
      light: "今天适合维持轻一点的节奏，慢慢累积稳定。"
    },
    tomorrowFocus: {
      recovery: "先 recovery，再看身体准备好了多少。",
      water: "把小口喝水安排在一天里几个自然的点。",
      sweet: "甜度少一步就好，不要把今天变成惩罚。",
      steady: "让这个系统再稳定地走一天。"
    },
    options: {
      energy: { low: "低", medium: "中", good: "好" },
      mind: { calm: "平静", worried: "担心", pressured: "有压力", scattered: "分散" },
      sleep: { low: "少", okay: "还可以", good: "好" },
      drinks: {
        blackCoffee: "黑咖啡",
        milkCoffee: "加奶咖啡",
        cocoa: "可可",
        sweetDrink: "粉红奶/甜饮",
        unsweetLime: "无糖柠檬水",
        water: "白水"
      },
      activities: {
        rest: "休息日",
        easyRun: "轻松跑",
        longRun: "长距离跑",
        heavyPingPong: "高强度乒乓球",
        longWalk: "走很多路",
        deepWork: "长时间 deep work / coding",
        lowSleep: "睡得少"
      },
      mindNote: {
        feeling: {
          calm: "平静",
          worried: "担心",
          pressured: "有压力",
          tired: "疲惫",
          scattered: "分散",
          grateful: "感谢"
        },
        support: {
          rest_first: "先休息",
          see_pattern: "看见模式",
          reduce_pressure: "减少压力",
          hydrate_gently: "温和补水",
          set_down: "先放下"
        }
      }
    }
  }
};

const drinkOptions = [
  { key: "blackCoffee", label: "กาแฟดำ", sweet: false },
  { key: "milkCoffee", label: "กาแฟใส่นม", sweet: true },
  { key: "cocoa", label: "โกโก้", sweet: true },
  { key: "sweetDrink", label: "น้ำชมพู/เครื่องดื่มหวาน", sweet: true },
  { key: "unsweetLime", label: "น้ำมะนาวไม่หวาน", sweet: false },
  { key: "water", label: "น้ำเปล่า", sweet: false }
];

const activityOptions = [
  { key: "rest", label: "Rest day", score: -1 },
  { key: "easyRun", label: "Easy run", score: 1 },
  { key: "longRun", label: "Long run", score: 3 },
  { key: "heavyPingPong", label: "ปิงปองหนัก", score: 3 },
  { key: "longWalk", label: "เดินเยอะ", score: 1 },
  { key: "deepWork", label: "Deep work / coding นาน", score: 2 },
  { key: "lowSleep", label: "นอนน้อย", score: 2 }
];

const todayIso = new Date().toLocaleDateString("en-CA");

const defaultState = {
  date: todayIso,
  waterMl: 0,
  drinks: [],
  activities: [],
  selectedState: {
    energy: "",
    mind: "",
    sleep: ""
  },
  loadScore: 0,
  loadLevel: "Load เบา",
  hydrationStatus: "วันนี้น้ำยังน้อยไปนิด ค่อย ๆ จิบเพิ่มนะ",
  generatedReflection: "",
  mindNoteText: "",
  mindNoteFeeling: "",
  mindNoteSupport: ""
};

let currentLanguage = loadLanguage();
let appState = loadState();

document.addEventListener("DOMContentLoaded", () => {
  applyTranslations();
  renderDate();
  renderDrinkOptions();
  renderActivityOptions();
  bindEvents();
  syncUI();
  renderDailyLogTable();
});

function storageKey() {
  return `${STORAGE_PREFIX}:${todayIso}`;
}

function loadLanguage() {
  const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
  return translations[savedLanguage] ? savedLanguage : "th";
}

function t(key, replacements = {}) {
  const value = key.split(".").reduce((entry, part) => entry?.[part], translations[currentLanguage]);
  const fallback = key.split(".").reduce((entry, part) => entry?.[part], translations.th) || key;
  return String(value || fallback).replace(/\{(\w+)\}/g, (_, token) => replacements[token] ?? "");
}

function applyTranslations() {
  document.documentElement.lang = translations[currentLanguage].htmlLang;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-option-group][data-option-key]").forEach((button) => {
    button.textContent = t(`options.${button.dataset.optionGroup}.${button.dataset.optionKey}`);
  });
  document.querySelectorAll("[data-mind-note-option]").forEach((button) => {
    button.textContent = t(`options.mindNote.${button.dataset.mindNoteOption}`);
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === currentLanguage);
  });
}

function loadState() {
  const saved = localStorage.getItem(storageKey());
  if (!saved) {
    return structuredClone(defaultState);
  }

  try {
    return { ...structuredClone(defaultState), ...JSON.parse(saved), date: todayIso };
  } catch {
    return structuredClone(defaultState);
  }
}

function renderDate() {
  const currentDate = document.querySelector("#currentDate");
  currentDate.textContent = new Date().toLocaleDateString(translations[currentLanguage].locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function renderDrinkOptions() {
  const list = document.querySelector("#drinksList");
  list.innerHTML = drinkOptions.map((drink) => `
    <label class="toggle-card" data-drink="${drink.label}">
      <input type="checkbox" value="${drink.label}">
      <span>${t(`options.drinks.${drink.key}`)}</span>
    </label>
  `).join("");
}

function renderActivityOptions() {
  const list = document.querySelector("#activitiesList");
  list.innerHTML = activityOptions.map((activity) => `
    <button type="button" class="activity-button" data-activity="${activity.label}">
      ${t(`options.activities.${activity.key}`)}
    </button>
  `).join("");
}

function bindEvents() {
  document.querySelector(".language-toggle").addEventListener("click", (event) => {
    const button = event.target.closest("[data-lang]");
    if (!button || !translations[button.dataset.lang]) return;
    currentLanguage = button.dataset.lang;
    localStorage.setItem(LANGUAGE_KEY, currentLanguage);
    applyTranslations();
    renderDate();
    renderDrinkOptions();
    renderActivityOptions();
    syncUI();
    renderDailyLogTable();
  });

  document.querySelectorAll(".choice-group").forEach((group) => {
    group.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-value]");
      if (!button) return;
      appState.selectedState[group.dataset.field] = button.dataset.value;
      if (group.dataset.field === "sleep" && button.dataset.value !== "น้อย") {
        appState.activities = appState.activities.filter((item) => item !== "นอนน้อย");
      }
      syncUI();
    });
  });

  document.querySelectorAll("[data-water]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.waterMl += Number(button.dataset.water);
      syncUI();
    });
  });

  document.querySelector("#resetWater").addEventListener("click", () => {
    appState.waterMl = 0;
    syncUI();
  });

  document.querySelector("#drinksList").addEventListener("change", (event) => {
    const input = event.target.closest("input[type='checkbox']");
    if (!input) return;
    appState.drinks = input.checked
      ? unique([...appState.drinks, input.value])
      : appState.drinks.filter((drink) => drink !== input.value);
    syncUI();
  });

  document.querySelector("#activitiesList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-activity]");
    if (!button) return;
    const activity = button.dataset.activity;
    const isSelected = appState.activities.includes(activity);

    if (activity === "Rest day") {
      appState.activities = isSelected ? [] : ["Rest day"];
    } else {
      appState.activities = appState.activities.filter((item) => item !== "Rest day");
      appState.activities = isSelected
        ? appState.activities.filter((item) => item !== activity)
        : [...appState.activities, activity];
    }

    if (activity === "นอนน้อย") {
      appState.selectedState.sleep = isSelected ? "" : "น้อย";
    }

    syncUI();
  });

  document.querySelector("#generateReflection").addEventListener("click", () => {
    appState.generatedReflection = buildReflection();
    syncUI();
  });

  document.querySelector("#reflectionOutput").addEventListener("input", (event) => {
    appState.generatedReflection = event.target.value;
  });

  document.querySelector("#mindNoteText").addEventListener("input", (event) => {
    appState.mindNoteText = event.target.value;
  });

  document.querySelectorAll("[data-mind-note-field]").forEach((button) => {
    button.addEventListener("click", () => {
      const field = button.dataset.mindNoteField;
      appState[field] = appState[field] === button.dataset.value ? "" : button.dataset.value;
      syncUI();
    });
  });

  document.querySelector("#saveDailyLog").addEventListener("click", saveToDailyLog);
  document.querySelector("#clearDailyLog").addEventListener("click", clearDailyLog);
  document.querySelector("#exportMasterExcel").addEventListener("click", exportMasterExcel);
  document.querySelector("#importMasterExcel").addEventListener("click", () => {
    document.querySelector("#importExcelFile").click();
  });
  document.querySelector("#importExcelFile").addEventListener("change", importMasterExcel);
}

function syncUI() {
  appState.loadScore = calculateLoadScore();
  appState.loadLevel = getLoadLevel(appState.loadScore);
  appState.hydrationStatus = getHydrationStatus(appState.waterMl);

  document.querySelector("#waterMl").textContent = appState.waterMl.toLocaleString(translations[currentLanguage].locale);
  document.querySelector("#hydrationFeedback").textContent = appState.hydrationStatus;
  document.querySelector("#loadScore").textContent = appState.loadScore;
  document.querySelector("#loadLevel").textContent = appState.loadLevel;
  document.querySelector("#loadFeedback").textContent = getLoadFeedback();
  document.querySelector("#mindfulReminder").textContent = getMindfulReminder();
  document.querySelector("#reflectionOutput").value = appState.generatedReflection;
  document.querySelector("#mindNoteText").value = appState.mindNoteText || "";

  updateStateButtons();
  updateMindNoteButtons();
  updateDrinkUI();
  updateActivityUI();
}

function updateStateButtons() {
  document.querySelectorAll(".choice-group").forEach((group) => {
    const selectedValue = appState.selectedState[group.dataset.field];
    group.querySelectorAll("button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === selectedValue);
    });
  });
}

function updateDrinkUI() {
  document.querySelectorAll(".toggle-card").forEach((label) => {
    const input = label.querySelector("input");
    const checked = appState.drinks.includes(input.value);
    input.checked = checked;
    label.classList.toggle("is-active", checked);
  });

  document.querySelector("#sweetCount").textContent = t("sweetCount", { count: countSweetDrinks() });
  document.querySelector("#drinksFeedback").textContent = getDrinksFeedback();
}

function updateActivityUI() {
  document.querySelectorAll("[data-activity]").forEach((button) => {
    button.classList.toggle("is-active", appState.activities.includes(button.dataset.activity));
  });
}

function updateMindNoteButtons() {
  document.querySelectorAll("[data-mind-note-field]").forEach((button) => {
    const field = button.dataset.mindNoteField;
    button.classList.toggle("is-active", appState[field] === button.dataset.value);
  });
}

function calculateLoadScore() {
  return appState.activities.reduce((total, selected) => {
    const activity = activityOptions.find((item) => item.label === selected);
    return total + (activity ? activity.score : 0);
  }, 0);
}

function getLoadLevel(score) {
  if (score >= 6) return t("loadLevel.high");
  if (score >= 3) return t("loadLevel.medium");
  return t("loadLevel.light");
}

function getHydrationStatus(waterMl) {
  if (waterMl <= 750) return t("hydrationFeedback.low");
  if (waterMl <= 1500) return t("hydrationFeedback.rising");
  if (waterMl <= 2200) return t("hydrationFeedback.balanced");
  return t("hydrationFeedback.enough");
}

function countSweetDrinks() {
  return appState.drinks.filter((drink) => {
    const drinkMeta = drinkOptions.find((item) => item.label === drink);
    return drinkMeta?.sweet;
  }).length;
}

function getDrinksFeedback() {
  const sweetCount = countSweetDrinks();
  if (sweetCount >= 2) return t("drinksFeedback.sweetMany");
  if (appState.drinks.some((drink) => ["กาแฟใส่นม", "โกโก้", "น้ำชมพู/เครื่องดื่มหวาน"].includes(drink))) {
    return t("drinksFeedback.sweetSome");
  }
  if (appState.drinks.includes("กาแฟดำ")) return t("drinksFeedback.blackCoffee");
  if (appState.drinks.includes("น้ำเปล่า")) return t("waterBase");
  return t("drinksDefault");
}

function getLoadFeedback() {
  const hasHeavyCombo = appState.activities.includes("Long run") && appState.activities.includes("ปิงปองหนัก");
  const highLoadWithLowSleep = appState.loadScore >= 6 && appState.activities.includes("นอนน้อย");

  if (hasHeavyCombo || highLoadWithLowSleep) {
    return t("loadHeavyCombo");
  }
  if (appState.loadScore >= 6) {
    return t("loadFeedback.high");
  }
  if (appState.loadScore >= 3) {
    return t("loadMediumWithNote");
  }
  return t("loadLightWithNote");
}

function getMindfulReminder() {
  const mindNoteReminder = getMindNoteReminder();
  if (mindNoteReminder) return mindNoteReminder;
  if (appState.selectedState.mind === "กดดัน") {
    return t("reminder.pressured");
  }
  if (appState.selectedState.mind === "กังวล") {
    return t("reminder.worried");
  }
  if (appState.selectedState.sleep === "น้อย") {
    return t("reminder.lowSleep");
  }
  if (appState.loadScore >= 6) {
    return t("reminder.highLoad");
  }
  return t("reminder.steady");
}

function getMindNoteReminder() {
  if (appState.mindNoteFeeling === "pressured") return t("mindNoteReminder.pressured");
  if (appState.mindNoteFeeling === "worried") return t("mindNoteReminder.worried");
  if (appState.mindNoteSupport === "hydrate_gently") return t("mindNoteReminder.hydrate_gently");
  return "";
}

function buildReflection() {
  const sweetCount = countSweetDrinks();
  const goodThings = [];
  const adjustments = [];

  if (appState.waterMl > 0) goodThings.push(t("reflection.waterSeen", { water: appState.waterMl }));
  if (appState.drinks.includes("น้ำเปล่า")) goodThings.push(t("reflection.plainWaterBase"));
  if (appState.selectedState.energy || appState.selectedState.mind || appState.selectedState.sleep) {
    goodThings.push(t("reflection.checkedState"));
  }
  if (!goodThings.length) goodThings.push(t("reflection.openedPattern"));

  if (sweetCount >= 2) adjustments.push(t("reflection.reduceSweet"));
  if (appState.waterMl <= 750) adjustments.push(t("reflection.addSips"));
  if (appState.loadScore >= 6) adjustments.push(t("reflection.stopPush"));
  if (!adjustments.length) adjustments.push(t("reflection.keepBalance"));

  return [
    `${t("reflection.good")} ${goodThings.join(" / ")}`,
    `${t("reflection.adjust")} ${adjustments.join(" / ")}`,
    `${t("reflection.recovery")} ${getRecoveryNote()}`,
    `${t("reflection.hydration")} ${appState.hydrationStatus}`,
    `${t("reflection.tomorrow")} ${getTomorrowFocus()}`,
    `${t("reflection.mindNote")} ${getMindNoteSummary()}`,
    `${t("reflection.mindHolding")} ${appState.mindNoteText?.trim() || t("reflection.noMindNote")}`,
    `${t("reflection.reminder")} ${getMindfulReminder()}`,
    "",
    t("reflection.closing1"),
    t("reflection.closing2")
  ].join("\n");
}

function getMindNoteSummary() {
  const parts = [];
  if (appState.mindNoteFeeling) parts.push(localizeMindNoteValue("Mind_Note_Feeling", appState.mindNoteFeeling));
  if (appState.mindNoteSupport) parts.push(localizeMindNoteValue("Mind_Note_Support", appState.mindNoteSupport));
  return parts.length ? parts.join(" / ") : t("reflection.noMindNote");
}

function getRecoveryNote() {
  if (appState.loadScore >= 6) return t("recoveryNote.high");
  if (appState.selectedState.sleep === "น้อย") return t("recoveryNote.lowSleep");
  if (appState.loadScore >= 3) return t("recoveryNote.medium");
  return t("recoveryNote.light");
}

function getTomorrowFocus() {
  if (appState.loadScore >= 6 || appState.selectedState.sleep === "น้อย") {
    return t("tomorrowFocus.recovery");
  }
  if (appState.waterMl <= 1500) return t("tomorrowFocus.water");
  if (countSweetDrinks() >= 1) return t("tomorrowFocus.sweet");
  return t("tomorrowFocus.steady");
}

function buildDailyLogRow() {
  const reflection = appState.generatedReflection || buildReflection();
  const tomorrowFocus = getTomorrowFocus();
  const reminder = getMindfulReminder();

  return {
    Date: appState.date,
    Energy: appState.selectedState.energy,
    Mind: appState.selectedState.mind,
    Sleep: appState.selectedState.sleep,
    Water_ml: appState.waterMl,
    Drinks: appState.drinks.join(" | "),
    Sweet_Drinks_Count: countSweetDrinks(),
    Activities: appState.activities.join(" | "),
    Load_Score: appState.loadScore,
    Load_Level: appState.loadLevel,
    Hydration_Status: appState.hydrationStatus,
    Tomorrow_Focus: tomorrowFocus,
    NuTuenSai_Reminder: reminder,
    Mind_Note_Text: appState.mindNoteText || "",
    Mind_Note_Feeling: appState.mindNoteFeeling || "",
    Mind_Note_Support: appState.mindNoteSupport || "",
    Reflection_Text: reflection
  };
}

function saveToday() {
  if (!appState.generatedReflection) {
    appState.generatedReflection = buildReflection();
  }
  localStorage.setItem(storageKey(), JSON.stringify(appState));
  document.querySelector("#saveStatus").textContent = t("saveTodayDone");
  syncUI();
}

function getDailyLog() {
  const saved = localStorage.getItem(DAILY_LOG_KEY);
  if (!saved) return [];

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setDailyLog(rows) {
  const cleanRows = rows
    .filter((row) => row && row.Date)
    .map(normalizeLogRow)
    .sort((a, b) => String(a.Date).localeCompare(String(b.Date)));
  localStorage.setItem(DAILY_LOG_KEY, JSON.stringify(cleanRows));
  renderDailyLogTable();
}

function normalizeLogRow(row) {
  const normalized = {};
  DAILY_LOG_COLUMNS.forEach((column) => {
    normalized[column] = row[column] ?? "";
  });

  normalized.Date = normalizeExcelDate(normalized.Date);
  normalized.Water_ml = Number(normalized.Water_ml) || 0;
  normalized.Sweet_Drinks_Count = Number(normalized.Sweet_Drinks_Count) || 0;
  normalized.Load_Score = Number(normalized.Load_Score) || 0;
  normalized.Reflection_Text = row.Reflection_Text ?? row.Reflection ?? "";
  return normalized;
}

function normalizeExcelDate(value) {
  if (value instanceof Date) return value.toLocaleDateString("en-CA");
  if (typeof value === "number" && window.XLSX?.SSF) {
    const parsed = XLSX.SSF.parse_date_code(value);
    if (parsed) {
      const month = String(parsed.m).padStart(2, "0");
      const day = String(parsed.d).padStart(2, "0");
      return `${parsed.y}-${month}-${day}`;
    }
  }
  return String(value || "").trim();
}

function saveToDailyLog() {
  if (!appState.generatedReflection) {
    appState.generatedReflection = buildReflection();
  }

  const row = buildDailyLogRow();
  const rows = getDailyLog();
  const existingIndex = rows.findIndex((item) => item.Date === row.Date);

  if (existingIndex >= 0) {
    const shouldReplace = confirm(t("replaceConfirm"));
    if (!shouldReplace) {
      document.querySelector("#saveStatus").textContent = t("replaceCancelled");
      return;
    }
    rows[existingIndex] = row;
  } else {
    rows.push(row);
  }

  saveToday();
  setDailyLog(rows);
  document.querySelector("#saveStatus").textContent = t("savedDailyLog");
  syncUI();
}

function clearDailyLog() {
  const rows = getDailyLog();
  if (rows.length && !confirm(t("clearConfirm"))) {
    return;
  }

  localStorage.removeItem(DAILY_LOG_KEY);
  renderDailyLogTable();
  document.querySelector("#saveStatus").textContent = t("clearedDailyLog");
}

function renderDailyLogTable() {
  const rows = getDailyLog();
  const body = document.querySelector("#dailyLogBody");
  const emptyState = document.querySelector("#emptyLogState");
  const logCount = document.querySelector("#logCount");

  if (!body || !emptyState || !logCount) return;

  logCount.textContent = rows.length === 1
    ? t("logCountSingular", { count: rows.length })
    : t("logCountPlural", { count: rows.length });
  body.innerHTML = rows.map((row) => `
    <tr>
      ${DAILY_LOG_COLUMNS.map((column) => `<td>${escapeHtml(localizeLogCell(column, row[column]))}</td>`).join("")}
    </tr>
  `).join("");
  emptyState.classList.toggle("is-hidden", rows.length > 0);
}

function exportMasterExcel() {
  if (!window.XLSX) {
    alert(t("sheetJsMissing"));
    return;
  }

  const rows = getDailyLog();
  if (!rows.length) {
    alert(t("noDailyLog"));
    return;
  }

  const workbook = XLSX.utils.book_new();
  const dailyRows = rows.map((row) => pickColumns(row, DAILY_LOG_COLUMNS));
  const reflectionRows = rows.map((row) => ({
    Date: row.Date,
    Mind_Note_Text: row.Mind_Note_Text || "",
    Mind_Note_Feeling: row.Mind_Note_Feeling || "",
    Mind_Note_Support: row.Mind_Note_Support || "",
    Reflection_Text: row.Reflection_Text || ""
  }));
  const dailySheet = XLSX.utils.json_to_sheet(dailyRows, { header: DAILY_LOG_COLUMNS });
  const summarySheet = XLSX.utils.json_to_sheet([buildMasterSummary(rows)]);
  const reflectionSheet = XLSX.utils.json_to_sheet(reflectionRows, {
    header: ["Date", "Mind_Note_Text", "Mind_Note_Feeling", "Mind_Note_Support", "Reflection_Text"]
  });

  XLSX.utils.book_append_sheet(workbook, dailySheet, "Daily_Log");
  XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");
  XLSX.utils.book_append_sheet(workbook, reflectionSheet, "Reflections");
  XLSX.writeFile(workbook, "Mindful_Health_Balance_Master.xlsx");
  document.querySelector("#saveStatus").textContent = t("exportedMaster");
}

function buildMasterSummary(rows) {
  const totalDays = rows.length;
  const averageWater = totalDays
    ? Math.round(rows.reduce((sum, row) => sum + (Number(row.Water_ml) || 0), 0) / totalDays)
    : 0;

  return {
    Total_Days: totalDays,
    Average_Water_ml: averageWater,
    High_Load_Days: rows.filter((row) => row.Load_Level === "Load สูง" || Number(row.Load_Score) >= 6).length,
    Low_Sleep_Days: rows.filter((row) => row.Sleep === "น้อย").length,
    Sweet_Drink_Days: rows.filter((row) => Number(row.Sweet_Drinks_Count) > 0).length,
    Most_Common_Mind: getMostCommon(rows.map((row) => row.Mind).filter(Boolean)),
    Overall_Message: t("overallMessage")
  };
}

function getMostCommon(values) {
  if (!values.length) return "";
  const counts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function importMasterExcel(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;

  if (getDailyLog().length && !confirm(t("importOverwriteConfirm"))) {
    document.querySelector("#saveStatus").textContent = t("importCancelled");
    return;
  }

  const reader = new FileReader();
  reader.onload = (loadEvent) => {
    try {
      const workbook = XLSX.read(loadEvent.target.result, { type: "array", cellDates: true });
      const dailySheet = workbook.Sheets.Daily_Log;
      if (!dailySheet) {
        alert(t("missingDailySheet"));
        return;
      }

      const importedRows = XLSX.utils.sheet_to_json(dailySheet, { defval: "" }).map(normalizeLogRow);
      const reflectionMap = readReflectionMap(workbook);
      const rowsWithReflections = importedRows.map((row) => ({
        ...row,
        Reflection_Text: reflectionMap[row.Date] || row.Reflection_Text || ""
      }));

      setDailyLog(rowsWithReflections);
      document.querySelector("#saveStatus").textContent = t("importDone", { count: rowsWithReflections.length });
    } catch (error) {
      alert(t("importFailed"));
    }
  };
  reader.readAsArrayBuffer(file);
}

function readReflectionMap(workbook) {
  const sheet = workbook.Sheets.Reflections;
  if (!sheet) return {};

  return XLSX.utils.sheet_to_json(sheet, { defval: "" }).reduce((acc, row) => {
    const date = normalizeExcelDate(row.Date);
    if (date) acc[date] = row.Reflection_Text || "";
    return acc;
  }, {});
}

function localizeLogCell(column, value) {
  if (value === undefined || value === null || value === "") return "";
  if (["Energy", "Mind", "Sleep"].includes(column)) return localizeStateValue(column, value);
  if (column === "Drinks") return localizeJoinedValues(value, drinkOptions, "drinks");
  if (column === "Activities") return localizeJoinedValues(value, activityOptions, "activities");
  if (column === "Load_Level") return localizeLoadLevel(value);
  if (column === "Hydration_Status") return localizeKnownText(value, "hydrationFeedback");
  if (column === "Tomorrow_Focus") return localizeKnownText(value, "tomorrowFocus");
  if (column === "NuTuenSai_Reminder") {
    const reminderText = localizeKnownText(value, "reminder");
    return reminderText === value ? localizeKnownText(value, "mindNoteReminder") : reminderText;
  }
  if (column === "Mind_Note_Feeling" || column === "Mind_Note_Support") return localizeMindNoteValue(column, value);
  return value;
}

function localizeMindNoteValue(column, value) {
  const group = column === "Mind_Note_Feeling" ? "feeling" : "support";
  const key = String(value || "").trim();
  if (!key) return "";
  if (translations.th.options.mindNote[group][key]) return t(`options.mindNote.${group}.${key}`);

  for (const lang of Object.keys(translations)) {
    const entries = translations[lang].options.mindNote[group];
    const found = Object.entries(entries).find(([, label]) => label === key);
    if (found) return t(`options.mindNote.${group}.${found[0]}`);
  }
  return value;
}

function localizeStateValue(column, value) {
  const stateMaps = {
    Energy: {
      "ต่ำ": "options.energy.low",
      "Low": "options.energy.low",
      "低": "options.energy.low",
      "กลาง": "options.energy.medium",
      "Medium": "options.energy.medium",
      "中": "options.energy.medium",
      "ดี": "options.energy.good",
      "Good": "options.energy.good",
      "好": "options.energy.good"
    },
    Mind: {
      "นิ่ง": "options.mind.calm",
      "Calm": "options.mind.calm",
      "平静": "options.mind.calm",
      "กังวล": "options.mind.worried",
      "Worried": "options.mind.worried",
      "担心": "options.mind.worried",
      "กดดัน": "options.mind.pressured",
      "Pressured": "options.mind.pressured",
      "有压力": "options.mind.pressured",
      "ฟุ้ง": "options.mind.scattered",
      "Scattered": "options.mind.scattered",
      "分散": "options.mind.scattered"
    },
    Sleep: {
      "น้อย": "options.sleep.low",
      "Low": "options.sleep.low",
      "少": "options.sleep.low",
      "พอใช้": "options.sleep.okay",
      "Okay": "options.sleep.okay",
      "还可以": "options.sleep.okay",
      "ดี": "options.sleep.good",
      "Good": "options.sleep.good",
      "好": "options.sleep.good"
    }
  };
  return stateMaps[column]?.[value] ? t(stateMaps[column][value]) : value;
}

function localizeJoinedValues(value, options, translationGroup) {
  return String(value)
    .split("|")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const option = options.find((item) => item.label === entry || t(`options.${translationGroup}.${item.key}`) === entry);
      return option ? t(`options.${translationGroup}.${option.key}`) : entry;
    })
    .join(" | ");
}

function localizeLoadLevel(value) {
  const loadMap = {
    "Load เบา": "loadLevel.light",
    "Light Load": "loadLevel.light",
    "Load 轻": "loadLevel.light",
    "Load กลาง": "loadLevel.medium",
    "Moderate Load": "loadLevel.medium",
    "Load 中": "loadLevel.medium",
    "Load สูง": "loadLevel.high",
    "High Load": "loadLevel.high",
    "Load 高": "loadLevel.high"
  };
  return loadMap[value] ? t(loadMap[value]) : value;
}

function localizeKnownText(value, group) {
  const normalized = String(value).trim();
  for (const lang of Object.keys(translations)) {
    const entries = translations[lang][group] || {};
    for (const [key, text] of Object.entries(entries)) {
      if (text === normalized) return t(`${group}.${key}`);
    }
  }
  return value;
}

function pickColumns(row, columns) {
  return columns.reduce((acc, column) => {
    acc[column] = row[column] ?? "";
    return acc;
  }, {});
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function unique(items) {
  return [...new Set(items)];
}
