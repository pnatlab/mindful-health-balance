const STORAGE_PREFIX = "mindfulHealthBalance";
const DAILY_LOG_KEY = "mindfulHealthDailyLog";
const LANGUAGE_KEY = "mindfulHealthLanguage";
const WELCOME_KEY_PREFIX = "mindfulHealthWelcomeSeen";
const THEME_KEY = "mindfulHealthTheme";
const DAILY_LOG_COLUMNS = [
  "Date",
  "Energy",
  "Mind",
  "Sleep",
  "Water_ml",
  "Drinks",
  "Sweet_Drinks_Count",
  "Drink_Profile_JSON",
  "Sugar_Score",
  "Caffeine_Score",
  "Milk_Drink_Count",
  "Hydration_Support_Count",
  "Activities",
  "Energy_Causes",
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
    version: "v1.5 Structured Drink & Energy Profile",
    subtitle: "ค่อย ๆ เห็นสมดุลของน้ำ การพัก การใช้พลัง และใจในแต่ละวัน",
    welcomeKicker: "NuTuenSai Welcome Threshold",
    welcomeTitle: "ยินดีต้อนรับกลับมา",
    welcomeSubtitle: "ดูแลอื่นมาเยอะแล้ว\nอย่าลืมดูแลตัวเองด้วยน๊าา",
    welcomeQuote: "สมดุลเริ่มจากการเห็น ไม่ใช่การฝืน",
    welcomeBegin: "เริ่มวันนี้",
    welcomeSkip: "เข้าสู่ Dashboard",
    openWelcome: "Open Welcome",
    themeAuto: "อัตโนมัติ",
    themeLight: "สว่าง",
    themeDark: "มืด",
    themeStatusLight: "ตอนนี้ใช้โหมดสว่างตามเวลาบนเครื่อง",
    themeStatusDark: "ตอนนี้ใช้โหมดมืดตามเวลาบนเครื่อง",
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
    drinksHeading: "Drink Profile วันนี้",
    drinksHelper: "บันทึกเครื่องดื่มอื่นนอกจากน้ำเปล่า เช่น กาแฟ ชา โกโก้ น้ำหวาน หรือน้ำผลไม้",
    drinkTypeLabel: "Drink Type",
    sweetnessLabel: "Sweetness",
    caffeineLabel: "Caffeine",
    milkLabel: "Milk",
    amountLabel: "Amount",
    amountPlaceholder: "1 glass / 1 bottle / หรือระบุเอง",
    addDrink: "Add Drink",
    clearDrinks: "Clear Drinks",
    sugarScoreLabel: "Sugar {score}",
    caffeineScoreLabel: "Caffeine {score}",
    milkCountLabel: "Milk {count}",
    hydrationSupportLabel: "Support {count}",
    emptyDrinkList: "ยังไม่มีเครื่องดื่มอื่นนอกจากน้ำเปล่า วันนี้ถือว่าเบาดีแล้ว",
    energyCauseLabel: "Energy Cause / เหตุที่น่ามีผลต่อพลังงาน",
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
      blackCoffee: "กาแฟได้ แต่อย่าให้แทนน้ำ",
      sugarHigh: "วันนี้น้ำตาลจากเครื่องดื่มเริ่มเยอะ ลดแก้วถัดไปก็พอ",
      caffeineHigh: "คาเฟอีนวันนี้เริ่มสูง อย่าให้กาแฟแทนน้ำและการพัก",
      lightAndHydrated: "เครื่องดื่มวันนี้เบาขึ้นแล้ว รักษาความสม่ำเสมอก็พอ",
      noExtraDrinks: "ยังไม่มีเครื่องดื่มอื่นนอกจากน้ำเปล่า วันนี้ถือว่าเบาดีแล้ว"
    },
    drinkReflection: {
      sugar: "เครื่องดื่มหวานวันนี้เริ่มสะสม แต่ไม่ต้องแก้ด้วยการหักดิบ แค่ลดแก้วถัดไป",
      caffeine: "คาเฟอีนวันนี้เริ่มสูง ให้มันเป็นข้อมูล ไม่ใช่สิ่งที่มาแทนการพัก",
      energyCauses: "วันนี้พลังงานอาจถูกกระทบจาก {causes} มากกว่าความผิดพลาดของตัวเอง"
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
        water: "น้ำเปล่า",
        blackCoffee: "กาแฟดำ",
        milkCoffee: "กาแฟใส่นม",
        tea: "ชา",
        matcha: "มัทฉะ",
        cocoa: "โกโก้",
        coconutWater: "น้ำมะพร้าว",
        juice: "น้ำผลไม้",
        sweetDrink: "น้ำชมพู/เครื่องดื่มหวาน",
        lemonWater: "น้ำมะนาว",
        unsweetLime: "น้ำมะนาวไม่หวาน",
        other: "อื่น ๆ"
      },
      sweetness: {
        none: "ไม่หวาน",
        low: "หวานน้อย",
        normal: "หวานปกติ",
        high: "หวานมาก"
      },
      caffeine: {
        none: "ไม่มี",
        low: "ต่ำ",
        medium: "กลาง",
        high: "สูง"
      },
      milk: {
        no: "ไม่ใส่นม",
        yes: "ใส่นม"
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
      },
      energyCauses: {
        sleep_low: "นอนน้อย",
        heavy_exercise: "ออกกำลังหนัก",
        deep_work: "Deep work",
        stress: "ความเครียด",
        low_water: "น้ำน้อย",
        low_food: "อาหารน้อย",
        unknown: "ยังไม่แน่ใจ"
      }
    }
  },
  en: {
    code: "en",
    locale: "en-US",
    htmlLang: "en",
    eyebrow: "Personal mindful dashboard",
    title: "Mindful Health Balance by MSxAI",
    version: "v1.5 Structured Drink & Energy Profile",
    subtitle: "Gently notice the balance of hydration, recovery, daily load, and mind state.",
    welcomeKicker: "NuTuenSai Welcome Threshold",
    welcomeTitle: "Welcome back,",
    welcomeSubtitle: "You have cared for many things today.\nDon't forget to care for yourself too.",
    welcomeQuote: "Balance begins with noticing, not forcing.",
    welcomeBegin: "Begin Today",
    welcomeSkip: "Go to Dashboard",
    openWelcome: "Open Welcome",
    themeAuto: "Auto",
    themeLight: "Light",
    themeDark: "Dark",
    themeStatusLight: "Currently using Light mode based on local time.",
    themeStatusDark: "Currently using Dark mode based on local time.",
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
    drinksHeading: "Drink Profile today",
    drinksHelper: "Log drinks other than plain water, such as coffee, tea, cocoa, sweet drinks, or juice.",
    drinkTypeLabel: "Drink Type",
    sweetnessLabel: "Sweetness",
    caffeineLabel: "Caffeine",
    milkLabel: "Milk",
    amountLabel: "Amount",
    amountPlaceholder: "1 glass / 1 bottle / custom",
    addDrink: "Add Drink",
    clearDrinks: "Clear Drinks",
    sugarScoreLabel: "Sugar {score}",
    caffeineScoreLabel: "Caffeine {score}",
    milkCountLabel: "Milk {count}",
    hydrationSupportLabel: "Support {count}",
    emptyDrinkList: "No extra drinks beyond plain water yet. Today is staying light.",
    energyCauseLabel: "Energy Cause",
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
      blackCoffee: "Coffee is okay, but do not let it replace water.",
      sugarHigh: "Sugary drinks are adding up today. Reducing the next one is enough.",
      caffeineHigh: "Caffeine is getting high today. Let it not replace water or rest.",
      lightAndHydrated: "Today's drinks are lighter. Consistency is enough.",
      noExtraDrinks: "No extra drinks beyond plain water yet. Today is staying light."
    },
    drinkReflection: {
      sugar: "Sugary drinks are adding up today, but no need to go extreme. Reducing the next one is enough.",
      caffeine: "Caffeine is getting high today. Let it be information, not a replacement for rest.",
      energyCauses: "Today's energy may be affected by {causes} more than by any personal mistake."
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
        water: "Plain water",
        blackCoffee: "Black coffee",
        milkCoffee: "Coffee with milk",
        tea: "Tea",
        matcha: "Matcha",
        cocoa: "Cocoa",
        coconutWater: "Coconut water",
        juice: "Juice",
        sweetDrink: "Pink milk / sweet drink",
        lemonWater: "Lemon water",
        unsweetLime: "Unsweetened lime water",
        other: "Other"
      },
      sweetness: {
        none: "None",
        low: "Low",
        normal: "Normal",
        high: "High"
      },
      caffeine: {
        none: "None",
        low: "Low",
        medium: "Medium",
        high: "High"
      },
      milk: {
        no: "No milk",
        yes: "Milk"
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
      },
      energyCauses: {
        sleep_low: "Low sleep",
        heavy_exercise: "Heavy exercise",
        deep_work: "Deep work",
        stress: "Stress",
        low_water: "Low water",
        low_food: "Low food",
        unknown: "Not sure yet"
      }
    }
  },
  zh: {
    code: "zh",
    locale: "zh-CN",
    htmlLang: "zh-CN",
    eyebrow: "个人正念健康仪表板",
    title: "Mindful Health Balance by MSxAI",
    version: "v1.5 结构化饮品与能量记录",
    subtitle: "温和地观察补水、恢复、每日负荷与内在状态的平衡。",
    welcomeKicker: "NuTuenSai 欢迎门槛",
    welcomeTitle: "欢迎回来",
    welcomeSubtitle: "今天你已经照顾了很多事情。\n也别忘了温柔地照顾自己。",
    welcomeQuote: "平衡始于看见，而不是强迫。",
    welcomeBegin: "开始今天",
    welcomeSkip: "进入 Dashboard",
    openWelcome: "打开欢迎页",
    themeAuto: "自动",
    themeLight: "浅色",
    themeDark: "深色",
    themeStatusLight: "当前根据本地时间使用浅色模式。",
    themeStatusDark: "当前根据本地时间使用深色模式。",
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
    drinksHeading: "今日饮品记录",
    drinksHelper: "记录白水以外的饮品，例如咖啡、茶、可可、甜饮或果汁。",
    drinkTypeLabel: "饮品类型",
    sweetnessLabel: "甜度",
    caffeineLabel: "咖啡因",
    milkLabel: "奶",
    amountLabel: "份量",
    amountPlaceholder: "1 glass / 1 bottle / 自定义",
    addDrink: "添加饮品",
    clearDrinks: "清空饮品",
    sugarScoreLabel: "糖分 {score}",
    caffeineScoreLabel: "咖啡因 {score}",
    milkCountLabel: "奶类 {count}",
    hydrationSupportLabel: "支持 {count}",
    emptyDrinkList: "目前还没有白水以外的饮品，今天的负担很轻。",
    energyCauseLabel: "Energy Cause / 可能影响能量的原因",
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
      blackCoffee: "咖啡可以，但不要让它取代水。",
      sugarHigh: "今天饮料中的糖分开始累积，下一杯少一点就够了。",
      caffeineHigh: "今天咖啡因偏高，别让它取代水和休息。",
      lightAndHydrated: "今天的饮料负担较轻，保持稳定就好。",
      noExtraDrinks: "目前还没有白水以外的饮品，今天的负担很轻。"
    },
    drinkReflection: {
      sugar: "今天甜饮开始累积，但不需要极端调整，下一杯少一点就够了。",
      caffeine: "今天咖啡因偏高，把它当作信息，不要让它取代休息。",
      energyCauses: "今天的能量可能更多受到 {causes} 影响，而不是自己的错误。"
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
        water: "白水",
        blackCoffee: "黑咖啡",
        milkCoffee: "加奶咖啡",
        tea: "茶",
        matcha: "抹茶",
        cocoa: "可可",
        coconutWater: "椰子水",
        juice: "果汁",
        sweetDrink: "粉红奶/甜饮",
        lemonWater: "柠檬水",
        unsweetLime: "无糖柠檬水",
        other: "其他"
      },
      sweetness: {
        none: "无糖",
        low: "低",
        normal: "正常",
        high: "高"
      },
      caffeine: {
        none: "无",
        low: "低",
        medium: "中",
        high: "高"
      },
      milk: {
        no: "不含奶",
        yes: "含奶"
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
      },
      energyCauses: {
        sleep_low: "睡得少",
        heavy_exercise: "高强度运动",
        deep_work: "Deep work",
        stress: "压力",
        low_water: "水少",
        low_food: "吃得少",
        unknown: "还不确定"
      }
    }
  }
};

const drinkOptions = [
  { key: "water", type: "water", label: "น้ำเปล่า", sweet: false, hydration: true, defaultSweetness: "none", defaultCaffeine: "none", defaultMilk: "no" },
  { key: "blackCoffee", type: "black_coffee", label: "กาแฟดำ", sweet: false, hydration: false, defaultSweetness: "none", defaultCaffeine: "medium", defaultMilk: "no" },
  { key: "milkCoffee", type: "milk_coffee", label: "กาแฟใส่นม", sweet: true, hydration: false, defaultSweetness: "normal", defaultCaffeine: "medium", defaultMilk: "yes" },
  { key: "tea", type: "tea", label: "ชา", sweet: false, hydration: false, defaultSweetness: "none", defaultCaffeine: "low", defaultMilk: "no" },
  { key: "matcha", type: "matcha", label: "มัทฉะ", sweet: false, hydration: false, defaultSweetness: "low", defaultCaffeine: "medium", defaultMilk: "no" },
  { key: "cocoa", type: "cocoa", label: "โกโก้", sweet: true, hydration: false, defaultSweetness: "normal", defaultCaffeine: "low", defaultMilk: "yes" },
  { key: "coconutWater", type: "coconut_water", label: "น้ำมะพร้าว", sweet: false, hydration: true, defaultSweetness: "low", defaultCaffeine: "none", defaultMilk: "no" },
  { key: "juice", type: "juice", label: "น้ำผลไม้", sweet: true, hydration: false, defaultSweetness: "normal", defaultCaffeine: "none", defaultMilk: "no" },
  { key: "sweetDrink", type: "sweet_drink", label: "น้ำชมพู/เครื่องดื่มหวาน", sweet: true, hydration: false, defaultSweetness: "high", defaultCaffeine: "none", defaultMilk: "no" },
  { key: "lemonWater", type: "lemon_water", label: "น้ำมะนาว", sweet: false, hydration: true, defaultSweetness: "none", defaultCaffeine: "none", defaultMilk: "no" },
  { key: "unsweetLime", type: "lemon_water", label: "น้ำมะนาวไม่หวาน", sweet: false, hydration: true, defaultSweetness: "none", defaultCaffeine: "none", defaultMilk: "no" },
  { key: "other", type: "other", label: "อื่น ๆ", sweet: false, hydration: false, defaultSweetness: "none", defaultCaffeine: "none", defaultMilk: "no" }
];

const drinkTypeOptions = drinkOptions.filter((drink, index, options) =>
  drink.type !== "water" && options.findIndex((item) => item.type === drink.type) === index
);

const sweetnessScores = { none: 0, low: 1, normal: 2, high: 3 };
const caffeineScores = { none: 0, low: 1, medium: 2, high: 3 };
const sweetnessOptions = ["none", "low", "normal", "high"];
const caffeineOptions = ["none", "low", "medium", "high"];
const milkOptions = ["no", "yes"];

const energyCauseOptions = [
  "sleep_low",
  "heavy_exercise",
  "deep_work",
  "stress",
  "low_water",
  "low_food",
  "unknown"
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
  drinkProfiles: [],
  activities: [],
  energyCauses: [],
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
let currentThemePreference = getThemePreference();
let appState = loadState();
let themeIntervalId;

document.addEventListener("DOMContentLoaded", () => {
  applyThemePreference(currentThemePreference);
  applyTranslations();
  renderDate();
  renderDrinkOptions();
  renderActivityOptions();
  renderEnergyCauseOptions();
  bindEvents();
  initWelcome();
  startThemeAutoRefresh();
  syncUI();
  renderDailyLogTable();
});

function storageKey() {
  return `${STORAGE_PREFIX}:${todayIso}`;
}

function welcomeStorageKey() {
  return `${WELCOME_KEY_PREFIX}:${todayIso}`;
}

function loadLanguage() {
  const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
  return translations[savedLanguage] ? savedLanguage : "th";
}

function getThemePreference() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  return ["auto", "light", "dark"].includes(savedTheme) ? savedTheme : "auto";
}

function getThemeFromLocalTime() {
  const hour = new Date().getHours();
  return hour >= 7 && hour < 19 ? "light" : "dark";
}

function resolveTheme(preference) {
  if (preference === "light" || preference === "dark") return preference;
  return getThemeFromLocalTime();
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
  updateThemeButtons();
}

function applyThemePreference(preference = currentThemePreference) {
  const safePreference = ["auto", "light", "dark"].includes(preference) ? preference : "auto";
  const resolvedTheme = resolveTheme(safePreference);
  currentThemePreference = safePreference;
  document.body.dataset.theme = resolvedTheme;
  localStorage.setItem(THEME_KEY, safePreference);
  updateThemeToggle(safePreference, resolvedTheme);
}

function setThemePreference(preference) {
  if (!["auto", "light", "dark"].includes(preference)) return;
  applyThemePreference(preference);
}

function updateThemeButtons() {
  updateThemeToggle(currentThemePreference, document.body.dataset.theme || resolveTheme(currentThemePreference));
}

function updateThemeToggle(preference, resolvedTheme) {
  document.querySelectorAll("[data-theme-value]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.themeValue === preference);
  });
  updateThemeStatus(preference, resolvedTheme);
}

function updateThemeStatus(preference = currentThemePreference, resolvedTheme = document.body.dataset.theme || "light") {
  const themeStatus = document.querySelector("#themeStatus");
  if (!themeStatus) return;
  themeStatus.textContent = preference === "auto"
    ? t(resolvedTheme === "dark" ? "themeStatusDark" : "themeStatusLight")
    : "";
}

function startThemeAutoRefresh() {
  if (themeIntervalId) clearInterval(themeIntervalId);
  themeIntervalId = setInterval(() => {
    if (currentThemePreference === "auto") {
      applyThemePreference("auto");
    }
  }, 60 * 1000);
}

function loadState() {
  const saved = localStorage.getItem(storageKey());
  if (!saved) {
    return structuredClone(defaultState);
  }

  try {
    const parsed = { ...structuredClone(defaultState), ...JSON.parse(saved), date: todayIso };
    parsed.drinkProfiles = Array.isArray(parsed.drinkProfiles) && parsed.drinkProfiles.length
      ? parsed.drinkProfiles.map(normalizeDrinkProfile)
      : legacyDrinksToProfiles(parsed.drinks || []);
    parsed.energyCauses = Array.isArray(parsed.energyCauses) ? parsed.energyCauses : [];
    return parsed;
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
  renderSelectOptions("#drinkTypeSelect", drinkTypeOptions, (drink) => t(`options.drinks.${drink.key}`), "type");
  renderSelectOptions("#sweetnessSelect", sweetnessOptions, (key) => t(`options.sweetness.${key}`));
  renderSelectOptions("#caffeineSelect", caffeineOptions, (key) => t(`options.caffeine.${key}`));
  renderSelectOptions("#milkSelect", milkOptions, (key) => t(`options.milk.${key}`));
  applyDrinkDefaults();
}

function renderSelectOptions(selector, options, labelGetter, valueKey = "") {
  const select = document.querySelector(selector);
  if (!select) return;
  select.innerHTML = options.map((option) => {
    const value = valueKey ? option[valueKey] : option;
    return `<option value="${escapeHtml(value)}">${escapeHtml(labelGetter(option))}</option>`;
  }).join("");
}

function renderActivityOptions() {
  const list = document.querySelector("#activitiesList");
  list.innerHTML = activityOptions.map((activity) => `
    <button type="button" class="activity-button" data-activity="${activity.label}">
      ${t(`options.activities.${activity.key}`)}
    </button>
  `).join("");
}

function renderEnergyCauseOptions() {
  const list = document.querySelector("#energyCausesList");
  if (!list) return;
  list.innerHTML = energyCauseOptions.map((key) => `
    <button type="button" class="activity-button" data-energy-cause="${key}">
      ${t(`options.energyCauses.${key}`)}
    </button>
  `).join("");
}

function bindEvents() {
  document.querySelector("#beginWelcome").addEventListener("click", hideWelcome);
  document.querySelector("#skipWelcome").addEventListener("click", hideWelcome);
  document.querySelector("#openWelcome").addEventListener("click", () => showWelcome({ remember: false }));

  document.querySelector(".theme-toggle").addEventListener("click", (event) => {
    const button = event.target.closest("[data-theme-value]");
    if (!button || !["auto", "light", "dark"].includes(button.dataset.themeValue)) return;
    setThemePreference(button.dataset.themeValue);
  });

  document.querySelector(".language-toggle").addEventListener("click", (event) => {
    const button = event.target.closest("[data-lang]");
    if (!button || !translations[button.dataset.lang]) return;
    currentLanguage = button.dataset.lang;
    localStorage.setItem(LANGUAGE_KEY, currentLanguage);
    applyTranslations();
    renderDate();
    renderDrinkOptions();
    renderActivityOptions();
    renderEnergyCauseOptions();
    applyThemePreference();
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

  document.querySelector("#drinkTypeSelect").addEventListener("change", applyDrinkDefaults);
  document.querySelector("#addDrink").addEventListener("click", () => {
    appState.drinkProfiles = [...(appState.drinkProfiles || []), getDrinkProfileFromForm()];
    syncUI();
  });
  document.querySelector("#clearDrinks").addEventListener("click", () => {
    appState.drinkProfiles = [];
    appState.drinks = [];
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

  document.querySelector("#energyCausesList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-energy-cause]");
    if (!button) return;
    const cause = button.dataset.energyCause;
    appState.energyCauses = appState.energyCauses.includes(cause)
      ? appState.energyCauses.filter((item) => item !== cause)
      : [...appState.energyCauses, cause];
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

function initWelcome() {
  const hasSeenWelcome = sessionStorage.getItem(welcomeStorageKey()) === "true";
  if (hasSeenWelcome) {
    hideWelcome({ remember: false, instant: true });
    return;
  }
  showWelcome({ remember: false });
}

function showWelcome() {
  const overlay = document.querySelector("#welcomeOverlay");
  if (!overlay) return;
  overlay.classList.remove("is-hidden");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("welcome-open");
}

function hideWelcome({ remember = true, instant = false } = {}) {
  const overlay = document.querySelector("#welcomeOverlay");
  if (!overlay) return;
  if (remember) {
    sessionStorage.setItem(welcomeStorageKey(), "true");
  }
  if (instant) {
    overlay.style.transition = "none";
    overlay.classList.add("is-hidden");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("welcome-open");
    requestAnimationFrame(() => {
      overlay.style.transition = "";
    });
    return;
  }
  overlay.classList.add("is-hidden");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("welcome-open");
}

function syncUI() {
  appState.loadScore = calculateLoadScore();
  appState.loadLevel = getLoadLevel(appState.loadScore);
  appState.hydrationStatus = getHydrationStatus(appState.waterMl);

  document.querySelector("#waterMl").textContent = appState.waterMl.toLocaleString(translations[currentLanguage].locale);
  document.querySelector("#hydrationFeedback").textContent = appState.hydrationStatus;
  updateHydrationVisual();
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
  updateEnergyCauseUI();
}

function updateHydrationVisual() {
  const visual = document.querySelector(".water-glass-visual");
  if (!visual) return;
  const waterLevel = Math.min(Math.max(appState.waterMl / 2200, 0), 1) * 100;
  visual.style.setProperty("--water-level", `${waterLevel}%`);
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
  appState.drinkProfiles = (appState.drinkProfiles || []).map(normalizeDrinkProfile);
  appState.drinks = getDrinkSummaryLabels(appState.drinkProfiles);
  const scores = getDrinkScores();
  document.querySelector("#sweetCount").textContent = t("sweetCount", { count: countSweetDrinks() });
  document.querySelector("#sugarScoreBadge").textContent = t("sugarScoreLabel", { score: scores.sugarScore });
  document.querySelector("#caffeineScoreBadge").textContent = t("caffeineScoreLabel", { score: scores.caffeineScore });
  document.querySelector("#milkCountBadge").textContent = t("milkCountLabel", { count: scores.milkDrinkCount });
  document.querySelector("#hydrationSupportBadge").textContent = t("hydrationSupportLabel", { count: scores.hydrationSupportCount });
  renderDrinkProfileList();
  document.querySelector("#drinksFeedback").textContent = getDrinksFeedback();
}

function updateActivityUI() {
  document.querySelectorAll("[data-activity]").forEach((button) => {
    button.classList.toggle("is-active", appState.activities.includes(button.dataset.activity));
  });
}

function updateEnergyCauseUI() {
  document.querySelectorAll("[data-energy-cause]").forEach((button) => {
    button.classList.toggle("is-active", appState.energyCauses.includes(button.dataset.energyCause));
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

function getDrinkMetaByType(type) {
  return drinkOptions.find((drink) => drink.type === type) || drinkOptions.find((drink) => drink.type === "other");
}

function getDrinkMetaByLegacyLabel(label) {
  return drinkOptions.find((drink) => drink.label === label) || drinkOptions.find((drink) => t(`options.drinks.${drink.key}`) === label);
}

function normalizeDrinkProfile(profile = {}) {
  const meta = getDrinkMetaByType(profile.type) || getDrinkMetaByLegacyLabel(profile.label);
  return {
    type: meta?.type || "other",
    sweetness: sweetnessOptions.includes(profile.sweetness) ? profile.sweetness : (meta?.defaultSweetness || "none"),
    caffeine: caffeineOptions.includes(profile.caffeine) ? profile.caffeine : (meta?.defaultCaffeine || "none"),
    milk: milkOptions.includes(profile.milk) ? profile.milk : (meta?.defaultMilk || "no"),
    amount: String(profile.amount || "1 glass").trim()
  };
}

function legacyDrinksToProfiles(drinks = []) {
  return drinks
    .map((label) => getDrinkMetaByLegacyLabel(label))
    .filter(Boolean)
    .map((meta) => normalizeDrinkProfile({
      type: meta.type,
      sweetness: meta.defaultSweetness,
      caffeine: meta.defaultCaffeine,
      milk: meta.defaultMilk,
      amount: "1 glass"
    }));
}

function applyDrinkDefaults() {
  const type = document.querySelector("#drinkTypeSelect")?.value || "black_coffee";
  const meta = getDrinkMetaByType(type);
  if (!meta) return;
  document.querySelector("#sweetnessSelect").value = meta.defaultSweetness;
  document.querySelector("#caffeineSelect").value = meta.defaultCaffeine;
  document.querySelector("#milkSelect").value = meta.defaultMilk;
  const amountInput = document.querySelector("#drinkAmountInput");
  if (amountInput && !amountInput.value.trim()) amountInput.value = "1 glass";
}

function getDrinkProfileFromForm() {
  return normalizeDrinkProfile({
    type: document.querySelector("#drinkTypeSelect").value,
    sweetness: document.querySelector("#sweetnessSelect").value,
    caffeine: document.querySelector("#caffeineSelect").value,
    milk: document.querySelector("#milkSelect").value,
    amount: document.querySelector("#drinkAmountInput").value || "1 glass"
  });
}

function getDrinkScores(profiles = appState.drinkProfiles || []) {
  const normalizedProfiles = profiles.map(normalizeDrinkProfile);
  return normalizedProfiles.reduce((scores, profile) => {
    const meta = getDrinkMetaByType(profile.type);
    const sugarScore = sweetnessScores[profile.sweetness] || 0;
    scores.sugarScore += sugarScore;
    scores.caffeineScore += caffeineScores[profile.caffeine] || 0;
    scores.milkDrinkCount += profile.milk === "yes" ? 1 : 0;
    scores.hydrationSupportCount += meta?.hydration && profile.type !== "water" ? 1 : 0;
    scores.sweetDrinksCount += sugarScore >= 2 ? 1 : 0;
    return scores;
  }, {
    sweetDrinksCount: 0,
    sugarScore: 0,
    caffeineScore: 0,
    milkDrinkCount: 0,
    hydrationSupportCount: 0
  });
}

function getDrinkSummaryLabels(profiles = appState.drinkProfiles || []) {
  return profiles.map((profile) => {
    const meta = getDrinkMetaByType(profile.type);
    return meta?.label || profile.type || "";
  }).filter(Boolean);
}

function renderDrinkProfileList() {
  const list = document.querySelector("#drinkProfileList");
  if (!list) return;
  const profiles = appState.drinkProfiles || [];
  if (!profiles.length) {
    list.innerHTML = `<li class="empty-drink">${escapeHtml(t("emptyDrinkList"))}</li>`;
    return;
  }
  list.innerHTML = profiles.map((profile) => `<li>${escapeHtml(formatDrinkProfile(profile))}</li>`).join("");
}

function formatDrinkProfile(profile) {
  const normalized = normalizeDrinkProfile(profile);
  const meta = getDrinkMetaByType(normalized.type);
  return [
    t(`options.drinks.${meta?.key || "other"}`),
    t(`options.sweetness.${normalized.sweetness}`),
    t(`options.caffeine.${normalized.caffeine}`),
    t(`options.milk.${normalized.milk}`),
    normalized.amount
  ].join(" / ");
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
  return getDrinkScores().sweetDrinksCount;
}

function getDrinksFeedback() {
  const scores = getDrinkScores();
  if (!(appState.drinkProfiles || []).length) return t("drinksFeedback.noExtraDrinks");
  if (scores.sugarScore >= 5) return t("drinksFeedback.sugarHigh");
  if (scores.caffeineScore >= 5) return t("drinksFeedback.caffeineHigh");
  if (scores.sugarScore <= 1 && appState.waterMl >= 1500) return t("drinksFeedback.lightAndHydrated");
  if (scores.sweetDrinksCount >= 2) return t("drinksFeedback.sweetMany");
  if (appState.drinkProfiles.some((drink) => ["milk_coffee", "cocoa", "sweet_drink", "juice"].includes(drink.type))) {
    return t("drinksFeedback.sweetSome");
  }
  if (appState.drinkProfiles.some((drink) => drink.type === "black_coffee")) return t("drinksFeedback.blackCoffee");
  if (appState.drinkProfiles.some((drink) => drink.type === "water")) return t("waterBase");
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
  const drinkScores = getDrinkScores();
  const goodThings = [];
  const adjustments = [];

  if (appState.waterMl > 0) goodThings.push(t("reflection.waterSeen", { water: appState.waterMl }));
  if (appState.drinkProfiles.some((drink) => drink.type === "water")) goodThings.push(t("reflection.plainWaterBase"));
  if (appState.selectedState.energy || appState.selectedState.mind || appState.selectedState.sleep) {
    goodThings.push(t("reflection.checkedState"));
  }
  if (!goodThings.length) goodThings.push(t("reflection.openedPattern"));

  if (drinkScores.sugarScore >= 5) adjustments.push(t("drinkReflection.sugar"));
  if (drinkScores.caffeineScore >= 5) adjustments.push(t("drinkReflection.caffeine"));
  if (appState.waterMl <= 750) adjustments.push(t("reflection.addSips"));
  if (appState.loadScore >= 6) adjustments.push(t("reflection.stopPush"));
  if (!adjustments.length) adjustments.push(t("reflection.keepBalance"));

  const energyCauseNote = appState.energyCauses.length
    ? `${t("drinkReflection.energyCauses", { causes: getEnergyCauseSummary() })}\n`
    : "";

  return [
    `${t("reflection.good")} ${goodThings.join(" / ")}`,
    `${t("reflection.adjust")} ${adjustments.join(" / ")}`,
    energyCauseNote.trim(),
    `${t("reflection.recovery")} ${getRecoveryNote()}`,
    `${t("reflection.hydration")} ${appState.hydrationStatus}`,
    `${t("reflection.tomorrow")} ${getTomorrowFocus()}`,
    `${t("reflection.mindNote")} ${getMindNoteSummary()}`,
    `${t("reflection.mindHolding")} ${appState.mindNoteText?.trim() || t("reflection.noMindNote")}`,
    `${t("reflection.reminder")} ${getMindfulReminder()}`,
    "",
    t("reflection.closing1"),
    t("reflection.closing2")
  ].filter((line) => line !== "").join("\n");
}

function getEnergyCauseSummary() {
  return (appState.energyCauses || [])
    .map((cause) => t(`options.energyCauses.${cause}`))
    .join(" / ");
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
  const drinkScores = getDrinkScores();
  const drinkProfiles = (appState.drinkProfiles || []).map(normalizeDrinkProfile);

  return {
    Date: appState.date,
    Energy: appState.selectedState.energy,
    Mind: appState.selectedState.mind,
    Sleep: appState.selectedState.sleep,
    Water_ml: appState.waterMl,
    Drinks: getDrinkSummaryLabels(drinkProfiles).join(" | "),
    Sweet_Drinks_Count: drinkScores.sweetDrinksCount,
    Drink_Profile_JSON: JSON.stringify(drinkProfiles),
    Sugar_Score: drinkScores.sugarScore,
    Caffeine_Score: drinkScores.caffeineScore,
    Milk_Drink_Count: drinkScores.milkDrinkCount,
    Hydration_Support_Count: drinkScores.hydrationSupportCount,
    Activities: appState.activities.join(" | "),
    Energy_Causes: (appState.energyCauses || []).join(" | "),
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
  normalized.Drink_Profile_JSON = normalized.Drink_Profile_JSON || "";
  normalized.Sugar_Score = Number(normalized.Sugar_Score) || 0;
  normalized.Caffeine_Score = Number(normalized.Caffeine_Score) || 0;
  normalized.Milk_Drink_Count = Number(normalized.Milk_Drink_Count) || 0;
  normalized.Hydration_Support_Count = Number(normalized.Hydration_Support_Count) || 0;
  normalized.Load_Score = Number(normalized.Load_Score) || 0;
  normalized.Energy_Causes = normalized.Energy_Causes || "";
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
  if (column === "Drink_Profile_JSON") return localizeDrinkProfileJson(value);
  if (column === "Activities") return localizeJoinedValues(value, activityOptions, "activities");
  if (column === "Energy_Causes") return localizeEnergyCauses(value);
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

function localizeDrinkProfileJson(value) {
  try {
    const profiles = JSON.parse(value);
    if (!Array.isArray(profiles)) return value;
    return profiles.map((profile) => formatDrinkProfile(profile)).join(" | ");
  } catch {
    return value;
  }
}

function localizeEnergyCauses(value) {
  return String(value)
    .split("|")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((cause) => t(`options.energyCauses.${cause}`))
    .join(" | ");
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
