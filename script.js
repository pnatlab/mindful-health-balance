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
    version: "v1.9 Portable Field Memory Foundation",
    subtitle: "ค่อย ๆ เห็นสมดุลของน้ำ การพัก การใช้พลัง และใจในแต่ละวัน",
    viewTabsAria: "เลือกมุมมองของแอป",
    tabToday: "วันนี้",
    tabReflection: "Reflection/NuTuenSai",
    tabLog: "Log",
    todayViewTitle: "Today Input",
    reflectionViewTitle: "Reflection",
    reflectionViewHelper: "ตรวจดู reflection จากข้อมูลวันนี้ แล้วค่อยบันทึกเป็น Daily Log เมื่อพร้อม",
    reflectionGeneratorHelper: "กดสรุปวันนี้เพื่อให้ระบบสะท้อน pattern จากข้อมูลวันนี้ และยังแก้ไขเล็กน้อยก่อนบันทึกได้",
    reflectionActionsKicker: "Ready to save",
    logViewTitle: "Log & Export",
    logViewHelper: "ดูบันทึกย้อนหลังและจัดการไฟล์ backup ของระบบ",
    logControlsTitle: "Backup Controls",
    welcomeKicker: "PNAT2026 HEALTH BALANCE",
    welcomeTitle: "ยินดีต้อนรับกลับมา",
    welcomeSubtitle: "ดูแลคนอื่นมาเยอะแล้ว\nอย่าลืมดูแลตัวเองด้วยน๊าา",
    welcomeQuote: "สมดุลเริ่มจากการเห็น ไม่ใช่การฝืน",
    welcomeBegin: "เริ่มวันนี้",
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
    todayStateCue: "สังเกตเร็ว ๆ ของวันนี้",
    energyLabel: "Energy",
    mindLabel: "ใจโดยรวมวันนี้",
    sleepLabel: "Sleep",
    hydration: "Hydration",
    hydrationHeading: "น้ำวันนี้",
    hydrationGuidanceBase: "เป้าหมายวันนี้โดยประมาณ: {target} ml",
    hydrationGuidanceRange: "วันนี้มี load มากขึ้น: ลองตั้งช่วงน้ำประมาณ {min}-{max} ml",
    hydrationGuidanceCueBase: "ค่อย ๆ จิบน้ำเป็นช่วง ๆ โดยไม่ต้องเร่งตัวเลข",
    hydrationGuidanceCueLoad: "วันนี้ใช้พลังมากกว่าวันพัก ให้จิบน้ำกระจายระหว่างวัน",
    hydrationGuidanceCueSport: "ถ้ามีวิ่งหรือเหงื่อมากขึ้น ให้น้ำเป็นส่วนหนึ่งของ recovery",
    hydrationGuidanceCueOutdoor: "ถ้ามีแดดหรือความร้อน ให้คืนทั้งน้ำและการพักเป็นช่วง ๆ",
    hydrationGuidanceCueCaffeine: "คาเฟอีนช่วยให้ตื่นได้ แต่อย่าลืมให้น้ำเปล่ากลับมาเป็นฐาน",
    hydrationGuidanceCueRecovery: "วันนี้มีสัญญาณ recovery ให้ค่อย ๆ วางน้ำเป็นฐานคู่กับการพัก",
    hydrationGuidanceCueActivityRecovery: "วันนี้มีทั้ง activity load และสัญญาณ recovery ให้จิบน้ำค่อย ๆ คู่กับการพัก",
    halfBottle: "+ครึ่งขวด",
    resetButton: "Reset",
    drinks: "Drinks",
    drinksHeading: "Drink Profile วันนี้",
    drinksHelper: "บันทึกเครื่องดื่มอื่นนอกจากน้ำเปล่า เช่น กาแฟ ชา โกโก้ น้ำหวาน หรือน้ำผลไม้",
    drinkTypeLabel: "Drink Type",
    sweetnessLabel: "Sweetness",
    caffeineLabel: "คาเฟอีนโดยประมาณ",
    caffeineHelper: "เลือกคร่าว ๆ ก็พอ ไม่ต้องคำนวณเป๊ะ",
    milkLabel: "Milk",
    amountLabel: "Amount",
    amountPlaceholder: "1 glass / 1 bottle / หรือระบุเอง",
    addDrink: "Add Drink",
    clearDrinks: "Clear Drinks",
    sugarScoreLabel: "Sugar {score}",
    caffeineScoreLabel: "Caffeine {score}",
    milkCountLabel: "Milk {count}",
    hydrationSupportLabel: "Support {count}",
    caffeineCupTitle: "แก้วคาเฟอีนวันนี้",
    caffeineCupEmpty: "ยังไม่มีแก้วคาเฟอีนวันนี้",
    caffeineCupSingle: "วันนี้มีคาเฟอีน 1 แก้ว",
    caffeineCupPlural: "วันนี้มีคาเฟอีน {count} แก้ว",
    emptyDrinkList: "ยังไม่มีเครื่องดื่มอื่นนอกจากน้ำเปล่า วันนี้ถือว่าเบาดีแล้ว",
    energyCauseLabel: "Energy Cause / เหตุที่น่ามีผลต่อพลังงาน",
    loadRecovery: "Load & Recovery",
    loadHeading: "วันนี้ใช้พลังไปกับอะไร",
    loadHelper: "เลือกสิ่งที่ใช้พลังวันนี้ ระบบจะดูทั้งร่างกาย สมอง และการฟื้นตัว",
    mindfulReminder: "Mindful Reminder",
    nuTuenSaiNote: "NuTuenSai note",
    nuTuenSaiRole: "NuTuenSai เป็นชั้นสะท้อน pattern อย่างอ่อนโยน ไม่ใช่เครื่องมือวินิจฉัยหรือคำแนะนำแทนแพทย์",
    nuTuenSaiEmptyReminder: "สวัสดีค่ะพี่ วันนี้ยังไม่มีข้อมูลให้หนูอ่านมากนัก ลองกรอก Today Input สักเล็กน้อยก่อน แล้วค่อยกลับมาทบทวนกันนะคะ",
    reflectionGenerator: "Reflection Generator",
    endReflection: "End-of-Day Reflection",
    reflectionEmptyTitle: "ยังไม่มี Reflection",
    reflectionEmptyText: "กดสรุปวันนี้ เพื่อให้ระบบฟัง pattern ของวันเบา ๆ",
    reflectionGenerating: "กำลังฟัง pattern ของวันนี้…",
    reflectionStateLabel: "Reflection",
    reflectToday: "สรุปวันนี้",
    reflectAgain: "สรุปใหม่",
    clearReflection: "ล้าง Reflection",
    editReflection: "แก้ไขเล็กน้อย",
    doneEditingReflection: "เสร็จสิ้นการแก้ไข",
    mindNoteKicker: "Mind Note — วางใจหนึ่งบรรทัด",
    mindNoteTitle: "Mind Note",
    mindNoteSubtitle: "วางสิ่งที่ใจถืออยู่เบา ๆ โดยไม่ต้องรีบแก้",
    mindNoteCue: "โน้ตสะท้อนเฉพาะบันทึกนี้",
    mindNoteTextLabel: "วันนี้ใจถืออะไรอยู่",
    mindNotePlaceholder: "เช่น อยากให้เลขดีขึ้นเร็ว แต่ก็ไม่อยากกดดันตัวเอง",
    mindNoteFeelingLabel: "ความรู้สึกของบันทึกนี้",
    mindNoteSupportLabel: "Support Need",
    generateReflection: "Generate End-of-Day Reflection",
    reflectionPlaceholder: "กดสรุปวันนี้ เพื่อสร้าง reflection จากข้อมูลวันนี้",
    localOnly: "Local only",
    dailyLogControls: "Daily Log Controls",
    controlsHelp: "บันทึกเป็นตารางใน browser/localStorage ของเครื่องนี้ แล้ว export เป็น Master Excel เมื่อพี่ต้องการ",
    saveDailyLog: "Save to Daily Log",
    todayResetTitle: "Current Form",
    resetCurrentForm: "เคลียร์หน้าปัจจุบัน",
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
    resetCurrentFormConfirm: "เคลียร์เฉพาะข้อมูลที่กำลังกรอกอยู่ ไม่ลบ Daily Log เดิม",
    resetCurrentFormDone: "เคลียร์หน้าปัจจุบันแล้ว Daily Log เดิมยังอยู่",
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
    reflectionDisplay: {
      overviewEnergyLayered: "วันนี้พลังงานกับเหตุที่เลือกเหมือนกำลังบอกคนละชั้นของระบบ ทั้งสองอย่างอยู่ร่วมกันได้ โดยไม่ต้องให้สัญญาณหนึ่งลบอีกสัญญาณ",
      overviewRecoveryHydratedRest: "วันนี้ภาพรวมเหมือนเป็นวันที่ร่างกายต้องการ recovery มากกว่าการเพิ่มอะไรใหม่ น้ำพอเป็นฐานได้แล้ว และการเลือกพักก่อนถือว่าเข้ากับพลังงานของวัน",
      overviewRecoveryHydrated: "วันนี้เหมือนร่างกายต้องการจังหวะฟื้นตัวมากกว่าการเพิ่มอะไรใหม่ น้ำพอเป็นฐานได้แล้ว และไม่ต้องรีบสรุปตัวเองจากวันเดียว",
      overviewRecovery: "วันนี้เหมือนร่างกายขอจังหวะ recovery มากกว่าการเพิ่มอะไรใหม่ ค่อย ๆ วางน้ำ การพัก และใจให้กลับมาเป็นฐานเดียวกันก็พอ",
      overviewActivityHydrated: "วันนี้มีการใช้พลังงานมากกว่าวันพัก น้ำพอเป็นฐานได้แล้ว และ recovery ควรเดินไปด้วยกันกับ load ของวัน",
      overviewActivity: "วันนี้มีการใช้พลังงานมากกว่าวันพัก ถ้ามีเหงื่อหรือกิจกรรมต่อเนื่อง น้ำกับ recovery ค่อย ๆ เดินตามร่างกายให้ทันก็พอ",
      overviewPositiveMindActivity: "วันนี้มีการใช้พลังงานอยู่ แต่ใจโดยรวมดูเป็นแรงหนุนได้เล็กน้อย ใช้จังหวะนี้แบบพอดีและยังให้ recovery เดินไปด้วยกัน",
      overviewPositiveMindRecovery: "วันนี้ใจโดยรวมดูเป็นแรงหนุนได้ แต่ร่างกายยังอาจต้องการ recovery อยู่ ทั้งสองสัญญาณอยู่ร่วมกันได้โดยไม่ต้องรีบสรุปว่าวันนี้ดีทั้งหมด",
      overviewPositiveMindSupport: "วันนี้ใจโดยรวมดูมีโทนที่ดีขึ้น เป็นสัญญาณสนับสนุนให้การดูแลตัวเองไม่ต้องมาจากแรงกดดันมากนัก",
      overviewCaffeine: "วันนี้คาเฟอีนอาจช่วยให้ตื่นหรือพยุงจังหวะของวันได้ แค่ให้น้ำเปล่ากลับมาเป็นฐานโดยไม่ต้องดุกาแฟก็พอ",
      overviewSteadyHydration: "วันนี้น้ำพอเป็นฐานของวันแล้ว ภาพรวมจึงเหมาะกับการรักษาความสม่ำเสมอมากกว่าการเติมอะไรเพราะความกลัว",
      overviewBase: "วันนี้เป็นวันที่เหมาะกับการสังเกต pattern แบบเบา ๆ น้ำ การพัก และใจยังค่อย ๆ กลับมาอยู่ในจังหวะที่พอดีได้",
      adjustRecovery: "ถ้าจะปรับเล็ก ๆ วันนี้ แค่ให้การพักกับน้ำเดินไปด้วยกัน โดยไม่ต้องรีบแก้ทุกอย่างในวันเดียวก็พอ",
      adjustActivity: "ถ้าจะปรับเล็ก ๆ วันนี้ ให้มองน้ำเป็นส่วนหนึ่งของ recovery หลัง load ไม่ใช่ตัวเลขที่ต้องรีบทำให้ครบ",
      adjustCaffeine: "ถ้าจะปรับเล็ก ๆ วันนี้ แค่คืนพื้นที่ให้น้ำเปล่าระหว่างคาเฟอีนกับการพักก็พอ",
      adjustWater: "ถ้าจะปรับเล็ก ๆ วันนี้ ลองวางจุดจิบน้ำให้กระจายขึ้น โดยไม่ต้องอัดทีเดียว",
      adjustSteady: "ถ้าจะปรับเล็ก ๆ วันนี้ คือรักษาจังหวะที่พอดีไว้ โดยไม่ต้องเพิ่มอะไรเพราะความกลัว",
      adjustEnergyLayered: "ถ้าจะปรับเล็ก ๆ วันนี้ ลองฟังทั้งสัญญาณกายและใจคนละชั้น โดยไม่ต้องรีบตัดสินว่าวันนี้ดีหรือแย่",
      tomorrowRecovery: "พรุ่งนี้ให้ recovery มาก่อน แล้วค่อยกลับมาดู pattern ต่อแบบไม่เร่งตัวเอง",
      tomorrowActivity: "พรุ่งนี้ให้ recovery กับน้ำเดินไปด้วยกัน แล้วค่อยดูว่าร่างกายพร้อมเพิ่มอะไรไหม",
      tomorrowCaffeine: "พรุ่งนี้ลดคาเฟอีนลงหนึ่งจังหวะ แล้วให้น้ำเปล่ากลับมาเป็นฐาน",
      tomorrowEnergyLayered: "พรุ่งนี้ดูสัญญาณกายกับใจแยกชั้นกัน แล้วค่อยเลือกจังหวะที่พอดี",
      tomorrowPositiveMind: "พรุ่งนี้รักษาใจที่พออยู่ได้ แล้วกลับมาดู pattern แบบไม่เร่งตัวเอง",
      tomorrowSteady: "พรุ่งนี้รักษาจังหวะที่พอดี แล้วกลับมาดู pattern แบบไม่เร่งตัวเอง",
      mindNote: "Mind Note: {note}"
    },
    energyCauseInsight: {
      alignedLow: "พลังงานต่ำวันนี้สัมพันธ์กับปัจจัยที่ใช้พลังงานหรือฟื้นตัวยังไม่พอได้ โดยไม่ต้องมองว่าเป็นความผิดพลาด",
      alignedGood: "พลังงานดีวันนี้ดูเหมือนมีฐานจากการพักหรือใจที่เบาขึ้น รักษาจังหวะนี้ไว้แบบไม่ต้องเร่งเพิ่มอะไรเกินจำเป็น",
      lowWithSupport: "แม้วันนี้จะมีฐานจากการพักหรือใจที่เบาขึ้น แต่พลังงานยังต่ำได้อยู่ อาจเป็นสัญญาณว่าร่างกายยังต้องการ recovery ต่อ ไม่ใช่ว่าพักแล้วต้องพร้อมทันที",
      goodWithDepletion: "แม้มีปัจจัยใช้พลังอยู่ แต่วันนี้พลังงานยังพอพาไปได้ ให้ใช้แรงแบบพอดี และอย่าลืมคืน recovery ภายหลัง",
      goodWithStress: "แม้มีความเครียดอยู่ แต่พลังงานวันนี้ยังพอพาไปได้ ลองใช้จังหวะนี้อย่างไม่เร่งจนเกินไป",
      lowWithLightMind: "ใจอาจเบากว่าปกติ แต่ร่างกายยังล้าได้ ทั้งสองอย่างอยู่ร่วมกันได้ แค่บอกว่าควรดูแลทั้งกายและใจคนละชั้น",
      mediumMixed: "วันนี้มีทั้งแรงหนุนและแรงใช้พลัง ให้มองเป็นวัน balance มากกว่าวันที่ต้องตัดสินว่าดีหรือแย่"
    },
    energyCauseReminder: {
      layered: "วันนี้กาย ใจ และเหตุของพลังงานอาจกำลังบอกคนละชั้น ค่อย ๆ ฟังโดยไม่ต้องให้สัญญาณหนึ่งลบอีกสัญญาณ"
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
      energyCauses: "วันนี้พลังงานอาจถูกกระทบจาก {causes} มากกว่าความผิดพลาดของตัวเอง",
      energyCause: {
        enough_sleep: "วันนี้พลังงานดูเหมือนมีฐานจากการพักที่พอขึ้น รักษาจังหวะนี้ไว้แบบไม่ต้องเร่งเพิ่มอะไรเกินจำเป็น",
        light_mind: "วันนี้ใจดูเบากว่าปกติ พลังงานจึงอาจไม่ถูกดึงไปกับแรงกดดันมากนัก"
      }
    },
    drinkSweetnessInsight: {
      low: "วันนี้เครื่องดื่มไม่เพิ่มภาระหวานมากนัก น้ำเปล่ายังเป็นฐานที่ดีของวัน",
      moderate: "วันนี้มีความหวานบ้าง แต่ไม่จำเป็นต้องตีความเป็นความผิด แค่ให้แก้วถัดไปกลับมาง่ายขึ้น เช่น น้ำเปล่าหรือพัก",
      sodaLow: "วันนี้มีน้ำอัดลม แต่ระดับความหวานไม่ได้สูงมาก ระบบจึงอ่านเป็น drink context มากกว่าภาระหวาน",
      sodaHigh: "วันนี้น้ำอัดลมมีความหวานเป็นส่วนหนึ่งของ drink load แต่ไม่ต้องดุแก้วนั้น แค่ให้แก้วถัดไปกลับมาที่น้ำเปล่าหรือพักก็พอ",
      sweetCaffeine: "วันนี้เครื่องดื่มให้ทั้งความตื่นและความหวาน ระบบอาจชวนให้น้ำเปล่ากลับมาเป็นฐาน โดยไม่ต้องดุเครื่องดื่มก่อนหน้า",
      sweetLowRecovery: "ถ้าวันนี้นอนน้อยหรือพลังงานต่ำ ความหวานอาจเป็นตัวช่วยพยุงช่วงสั้น ๆ ได้ แต่ recovery และน้ำยังควรมีพื้นที่ตามมา",
      sweetHighLoad: "ถ้าวันนี้มี load หรือกิจกรรมมาก ความหวานอาจเป็นส่วนหนึ่งของพลังงานระหว่างวัน แต่หลังจากนั้นน้ำและ recovery ควรเดินตามให้ทัน"
    },
    signalReminder: {
      sleepLoadRecovery: "วันนี้ recovery ควรมาก่อนการเพิ่ม performance อีกนิดนะพี่",
      hydrationCaffeine: "วันนี้ระบบชวนกลับมาดูน้ำและการพักก่อนให้กาแฟนำจังหวะทั้งวัน",
      hydrationLoad: "วันนี้มีการใช้พลังงานมากกว่าวันพัก น้ำอาจค่อย ๆ ตามร่างกายให้ทันโดยไม่ต้องเร่งดื่มทีเดียว",
      hydrationRecovery: "วันนี้ไม่ได้มี load หนักชัดเจน แต่มีสัญญาณที่ร่างกายอาจต้องการ recovery มากขึ้น ค่อย ๆ วางน้ำเป็นฐานของวัน",
      caffeineBase: "คาเฟอีนช่วยให้ตื่นได้ แต่วันนี้อย่าลืมให้น้ำเปล่ากลับมาเป็นฐาน",
      positiveMind: "วันนี้ใจดูเป็นแรงหนุนได้เล็กน้อย ใช้มันเป็นฐานเบา ๆ โดยไม่ต้องผลักตัวเองเพิ่ม",
      positiveMindWithLoad: "แม้ใจดูดีขึ้น วันนี้ยังมี load ให้ recovery เดินไปด้วยกัน",
      positiveMindRecovery: "วันนี้ใจดูเป็นแรงหนุนได้ แต่ร่างกายยังอาจต้องการ recovery อยู่ ค่อย ๆ ดูแลทั้งสองชั้นไปด้วยกัน",
      doublePressure: "วันนี้ไม่ต้องเร่งแก้ตัวเลข แค่ลดแรงกดดันลงหนึ่งระดับก็พอ",
      sugarHigh: "เครื่องดื่มหวานเริ่มสะสมแล้ว ลดแก้วถัดไปหนึ่งจุดก็พอ",
      consistency: "วันนี้จังหวะค่อนข้างเบาและน้ำพอเห็นแล้ว รักษาความสม่ำเสมอก็พอ",
      endorphin: "วันนี้พลังอาจดูดี แต่ถ้านอนน้อยหรือ load สูง ให้เผื่อพื้นที่พักไว้ด้วย",
      resourceLow: "พลังงานต่ำวันนี้อาจมาจากทรัพยากรไม่พอ ไม่ใช่ความผิดพลาดของพี่",
      restFirst: "วันนี้พี่เลือกพักก่อนได้ โดยไม่ต้องรู้สึกว่าต้องทำให้ทุกอย่างคืบหน้าทันที"
    },
    signalReflection: {
      goodConsistency: "เห็นจังหวะน้ำและ load ที่ไม่กดดันระบบเกินไป",
      noExtraDrinks: "เครื่องดื่มอื่นนอกจากน้ำเปล่ายังเบาอยู่",
      noticedSignals: "เริ่มเห็นความสัมพันธ์ของน้ำ เครื่องดื่ม การพัก และใจ",
      sleepLoadRecovery: "วันนี้นอนน้อยหรือ load สูงพอให้ recovery ควรมาก่อน",
      endorphin: "แม้วันนี้พลังดูดี แต่ recovery อาจยังต้องการพื้นที่อยู่",
      hydrationCaffeine: "น้ำยังน้อยและคาเฟอีนเริ่มนำจังหวะ ค่อย ๆ กลับมาจิบน้ำกับพักให้สม่ำเสมอ",
      hydrationLoad: "วันนี้มีเหงื่อหรือกิจกรรมต่อเนื่องมากกว่าวันพัก น้ำเป็นส่วนหนึ่งของ recovery ไม่ใช่แค่ตัวเลข",
      hydrationRecovery: "วันนี้เป็นสัญญาณ recovery มากกว่า activity load น้ำยังไม่ต้องเป็นตัวเลขใหญ่ แค่ค่อย ๆ จิบให้เป็นฐานของวัน",
      positiveMindFeelingGood: "วันนี้ใจโดยรวมดูมีโทนที่ดีขึ้น เป็นสัญญาณสนับสนุนให้ระบบไม่ต้องใช้แรงกับความกดดันมากนัก",
      positiveMindRelaxed: "วันนี้ใจดูผ่อนคลายขึ้นเล็กน้อย อาจเป็นฐานที่ช่วยให้การดูแลตัวเองไม่ต้องมาจากแรงกดดัน",
      pressure: "ความกดดันถูกเห็นแล้ว ไม่ต้องใช้การเร่งแก้เป็นคำตอบของวันนี้",
      resourceLow: "พลังงานอาจต่ำจากน้ำ อาหาร หรือการนอน ไม่ใช่เรื่องที่ต้องโทษตัวเอง",
      steadyHydration: "วางจุดจิบน้ำให้สม่ำเสมอขึ้น โดยไม่ต้องอัดทีเดียว"
    },
    loadTypeReflection: {
      clinical_focus: "วันนี้ใช้ความละเอียด สมาธิ มือ ตา และระบบประสาทต่อเนื่องมากกว่าที่คะแนน load บอกได้ ให้การพักแบบเงียบ ๆ มีพื้นที่พอ ๆ กับการทำงาน",
      service_standing_load: "วันนี้ร่างกายอาจใช้พลังจากการยืน เดิน แบกของ และดูแลคนตรงหน้า แม้ไม่ได้เรียกว่าออกกำลังกายโดยตรง",
      market_decision_load: "วันนี้ load อาจมาจากการเฝ้าจังหวะและแรงตัดสินใจมากกว่าการเคลื่อนไหวร่างกาย ปิดจอเป็นช่วง ๆ พักสายตา และไม่พาตลาดไปนอนก็พอ",
      outdoor_heat_load: "วันนี้ร่างกายอาจใช้น้ำและพลังมากกว่าที่รู้สึก ค่อย ๆ จิบน้ำและพักเป็นช่วง ๆ ก็พอ",
      sport_intensity_load: "วันนี้ร่างกายใช้แรงจริง ให้ recovery เป็นส่วนหนึ่งของการซ้อม ไม่ใช่การถอยหลัง",
      cognitive_load: "วันนี้ใช้สมองและสายตาต่อเนื่อง ให้พักตาและลดการวนคิดเป็นส่วนหนึ่งของ recovery",
      sleep_debt_load: "วันนี้อย่าตัดสินพลังงานจากวันที่นอนน้อย ให้ recovery มาก่อนการเพิ่มรอบใหม่",
      physical_load: "วันนี้ร่างกายได้ใช้พลังพอสมควร ให้ recovery มีพื้นที่แบบไม่ต้องเร่งเพิ่ม",
      recovery: "วันนี้มีพื้นที่ให้ระบบค่อย ๆ ฟื้นตัวและรักษาจังหวะที่อยู่ได้จริง"
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
      hydrate_gently: "วันนี้จิบน้ำเบา ๆ ให้ระบบกลับมาพอวางได้ ไม่ต้องอัดน้ำเพื่อเอาชนะตัวเลข"
    },
    recoveryNote: {
      sleepLoadHigh: "วันนี้ระบบใช้พลังมากพร้อมกับพักไม่เต็ม ให้ recovery มาก่อนการเพิ่มรอบใหม่",
      endorphin: "พลังงานที่รู้สึกดีอาจบังสัญญาณล้าไว้เล็กน้อย พักเผื่อระบบไว้ก็ดี",
      high: "Recovery คือส่วนหนึ่งของ performance วันนี้พอแล้วกับการใช้ร่างกายหนัก ๆ",
      lowSleep: "อย่าตัดสินสุขภาพตัวเองจากวันที่นอนน้อย ให้การพักช่วยปรับภาพรวมก่อน",
      medium: "Load กลาง ๆ ต้องมีช่วงผ่อน ไม่ต้องเติมงานหนักเพราะรู้สึกว่ายังทำได้",
      light: "วันนี้เหมาะกับการรักษาจังหวะเบา ๆ และสะสมความสม่ำเสมอ"
    },
    tomorrowFocus: {
      recovery: "Recovery ก่อน แล้วค่อยดูว่าร่างกายพร้อมแค่ไหน",
      water: "วางจุดจิบน้ำเล็ก ๆ ให้กระจายทั้งวัน",
      hydrationLoad: "ให้น้ำค่อย ๆ ตาม load ของวัน โดยไม่ต้องเร่งดื่มทีเดียว",
      hydrationRecovery: "ให้ recovery และน้ำค่อย ๆ เดินไปด้วยกัน โดยไม่ต้องเพิ่มตัวเลขใหญ่",
      energyLayered: "ดูสัญญาณกายกับใจคนละชั้น แล้วเลือกจังหวะที่พอดีกับพรุ่งนี้",
      sweet: "ลดหวานหนึ่งจุด โดยไม่ต้องทำให้วันนี้กลายเป็นบทลงโทษ",
      caffeine: "ลดคาเฟอีนลงหนึ่งจังหวะ แล้วคืนพื้นที่ให้น้ำกับการพัก",
      restNoGuilt: "พักโดยไม่ต้องรู้สึกผิด แล้วค่อยกลับมาดู pattern ต่อ",
      steady: "รักษาระบบที่อยู่ได้จริงต่ออีกหนึ่งวัน"
    },
    tomorrowFocusByLoadType: {
      clinical_focus: "พักมือ ตา และระบบประสาทแบบเบา ๆ ให้มีพื้นที่เท่ากับงานละเอียด",
      market_decision_load: "พักสายตา ปิดจอเป็นช่วง ๆ และลดการวนคิดหลังตลาดปิด",
      cognitive_load: "พักตา ขยับตัวสั้น ๆ และลด mental loop ลงหนึ่งจังหวะ",
      service_standing_load: "คืนพื้นที่ให้หลัง ขา ไหล่ และดื่มน้ำให้กระจายกว่าเดิม",
      outdoor_heat_load: "จิบน้ำเป็นช่วง ๆ และพักแดดหรือพักร่างกายแบบไม่ต้องฝืน",
      sport_intensity_load: "ให้ recovery เป็นส่วนหนึ่งของการซ้อม ไม่ใช่การถอยหลัง",
      physical_load: "คืนพื้นที่ให้ร่างกายด้วยการขยับเบา ๆ และพักให้พอดี",
      sleep_debt_load: "ให้การนอนและ recovery มาก่อนการเพิ่ม load รอบใหม่",
      recovery: "รักษาความสม่ำเสมอ ไม่ต้องเพิ่มอะไรเพราะความกลัว"
    },
    options: {
      energy: { low: "ต่ำ", medium: "กลาง", good: "ดี" },
      mind: { calm: "เฉย ๆ", worried: "กังวล", pressured: "กดดัน", scattered: "ฟุ้ง", feeling_good: "รู้สึกดี", relaxed: "ผ่อนคลาย" },
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
        soda: "น้ำอัดลม",
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
        officeWork: "งานออฟฟิศ / ประชุมและเอกสาร",
        outdoorWork: "ทำงานกลางแจ้ง / ใช้แรงและเสียเหงื่อ",
        dentalFocus: "หมอฟัน / เคสคลินิกละเอียด",
        clinicalShift: "แพทย์ / เวรตรวจหรือดูแลคนไข้",
        photoshoot: "ช่างภาพ / งานถ่ายยาว",
        marketWatch: "นักลงทุน / เฝ้าตลาดหรือวิเคราะห์",
        badminton: "แบดมินตัน",
        easyRun: "Easy run",
        longRun: "Long run",
        heavyPingPong: "ปิงปองหนัก",
        longWalk: "เดินเยอะ",
        deepWork: "Deep work / coding นาน",
        lowSleep: "นอนน้อย"
      },
      activityGroups: {
        work: "งาน",
        sports: "กีฬา",
        recovery: "พักฟื้น"
      },
      mindNote: {
        feeling: {
          calm: "เฉย ๆ",
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
        enough_sleep: "นอนพอ",
        light_mind: "ใจเบา",
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
    version: "v1.9 Portable Field Memory Foundation",
    subtitle: "Gently notice the balance of hydration, recovery, daily load, and mind state.",
    viewTabsAria: "Choose app view",
    tabToday: "Today",
    tabReflection: "Reflection/NuTuenSai",
    tabLog: "Log",
    todayViewTitle: "Today Input",
    reflectionViewTitle: "Reflection",
    reflectionViewHelper: "Review today’s reflection, then save it to the Daily Log when ready.",
    reflectionGeneratorHelper: "Reflect creates a reflection from today's signals. You can still edit it lightly before saving.",
    reflectionActionsKicker: "Ready to save",
    logViewTitle: "Log & Export",
    logViewHelper: "Review saved logs and manage your backup files.",
    logControlsTitle: "Backup Controls",
    welcomeKicker: "PNAT2026 HEALTH BALANCE",
    welcomeTitle: "Welcome back,",
    welcomeSubtitle: "You have cared for many things today.\nDon't forget to care for yourself too.",
    welcomeQuote: "Balance begins with noticing, not forcing.",
    welcomeBegin: "Begin Today",
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
    todayStateCue: "Quick observation for today",
    energyLabel: "Energy",
    mindLabel: "Overall Mind Today",
    sleepLabel: "Sleep",
    hydration: "Hydration",
    hydrationHeading: "Water today",
    hydrationGuidanceBase: "Estimated target today: {target} ml",
    hydrationGuidanceRange: "Today's load is higher: try an estimated range around {min}-{max} ml",
    hydrationGuidanceCueBase: "Sip gradually without rushing the number.",
    hydrationGuidanceCueLoad: "Today's load may ask for steadier hydration than a rest day.",
    hydrationGuidanceCueSport: "If exercise or sweat was part of the day, treat hydration as part of recovery.",
    hydrationGuidanceCueOutdoor: "If heat or outdoor work was part of the day, return water and rest in small rounds.",
    hydrationGuidanceCueCaffeine: "Caffeine may support alertness, but plain water can remain the base.",
    hydrationGuidanceCueRecovery: "Today has a recovery signal. Keep plain water as a gentle base alongside rest.",
    hydrationGuidanceCueActivityRecovery: "Today has both activity load and a recovery signal. Pair gradual sips with recovery.",
    halfBottle: "+half bottle",
    resetButton: "Reset",
    drinks: "Drinks",
    drinksHeading: "Drink Profile today",
    drinksHelper: "Log drinks other than plain water, such as coffee, tea, cocoa, sweet drinks, or juice.",
    drinkTypeLabel: "Drink Type",
    sweetnessLabel: "Sweetness",
    caffeineLabel: "Approx. caffeine",
    caffeineHelper: "A rough estimate is enough.",
    milkLabel: "Milk",
    amountLabel: "Amount",
    amountPlaceholder: "1 glass / 1 bottle / custom",
    addDrink: "Add Drink",
    clearDrinks: "Clear Drinks",
    sugarScoreLabel: "Sugar {score}",
    caffeineScoreLabel: "Caffeine {score}",
    milkCountLabel: "Milk {count}",
    hydrationSupportLabel: "Support {count}",
    caffeineCupTitle: "Caffeine cups today",
    caffeineCupEmpty: "No caffeine cups logged yet.",
    caffeineCupSingle: "1 caffeine cup logged today.",
    caffeineCupPlural: "{count} caffeine cups logged today.",
    emptyDrinkList: "No extra drinks beyond plain water yet. Today is staying light.",
    energyCauseLabel: "Energy Cause",
    loadRecovery: "Load & Recovery",
    loadHeading: "What used your energy today?",
    loadHelper: "Choose what used energy today. The system considers body, focus, and recovery.",
    mindfulReminder: "Mindful Reminder",
    nuTuenSaiNote: "NuTuenSai note",
    nuTuenSaiRole: "NuTuenSai is a gentle reflection layer for noticing patterns, not a diagnosis tool or medical advice.",
    nuTuenSaiEmptyReminder: "Welcome back. There isn’t much for NuTuenSai to read yet today. Add a little Today Input first, then come back for a gentle reflection.",
    reflectionGenerator: "Reflection Generator",
    endReflection: "End-of-Day Reflection",
    reflectionEmptyTitle: "No reflection yet",
    reflectionEmptyText: "Reflect today to let the system listen to the day’s pattern softly.",
    reflectionGenerating: "Listening to today’s pattern…",
    reflectionStateLabel: "Reflection",
    reflectToday: "Reflect",
    reflectAgain: "Reflect Again",
    clearReflection: "Clear Reflection",
    editReflection: "Light edit",
    doneEditingReflection: "Done Editing",
    mindNoteKicker: "Mind Note — one line to set down",
    mindNoteTitle: "Mind Note",
    mindNoteSubtitle: "Set down what the mind is holding, without rushing to fix it.",
    mindNoteCue: "Reflection note for this entry",
    mindNoteTextLabel: "What is the mind holding today?",
    mindNotePlaceholder: "For example: I want the numbers to improve quickly, but I do not want to pressure myself.",
    mindNoteFeelingLabel: "Feeling of This Note",
    mindNoteSupportLabel: "Support Need",
    generateReflection: "Generate End-of-Day Reflection",
    reflectionPlaceholder: "Click Reflect to create a reflection from today’s signals.",
    localOnly: "Local only",
    dailyLogControls: "Daily Log Controls",
    controlsHelp: "Save today into a local browser table, then export a Master Excel file when you need it.",
    saveDailyLog: "Save to Daily Log",
    todayResetTitle: "Current Form",
    resetCurrentForm: "Reset Current Form",
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
    resetCurrentFormConfirm: "This resets only the current form. Saved Daily Logs will not be deleted.",
    resetCurrentFormDone: "Current form reset. Saved Daily Logs are still here.",
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
    reflectionDisplay: {
      overviewEnergyLayered: "Today, the energy level and its causes may be describing different layers of the system. Both can be true without one signal canceling the other.",
      overviewRecoveryHydratedRest: "Today looks like a day where recovery mattered more than adding more effort. Hydration was enough to serve as a base, and choosing rest first matched the day's energy.",
      overviewRecoveryHydrated: "Today looks like a day where the body needed recovery more than adding anything new. Hydration was enough to serve as a base, and the day does not need to be judged from one signal.",
      overviewRecovery: "Today seems to ask for recovery more than adding anything new. Let hydration, rest, and mind state return to a steady base gradually.",
      overviewActivityHydrated: "Today had more activity load than a rest day. Hydration was enough to serve as a base, and recovery can move together with the day's load.",
      overviewActivity: "Today had more activity load than a rest day. If sweat or sustained effort was part of it, hydration and recovery can gradually catch up with the body.",
      overviewPositiveMindActivity: "Today includes real energy use, while the overall mind state seems supportive. Use that support gently and still let recovery move with the load.",
      overviewPositiveMindRecovery: "Today the mind seems supportive, while the body may still be asking for recovery. Both signals can coexist without making the whole day automatically fine.",
      overviewPositiveMindSupport: "Today's overall mind state seems more positive, which may support self-care without needing to push harder.",
      overviewCaffeine: "Today, caffeine may have supported alertness or rhythm. Plain water can return as the base without making coffee something to feel bad about.",
      overviewSteadyHydration: "Hydration was enough to serve as a base today, so the picture is more about keeping consistency than adding more from fear.",
      overviewBase: "Today is a day for noticing the pattern gently. Hydration, rest, and mind state can keep returning to a workable rhythm.",
      adjustRecovery: "If there is one gentle adjustment, it may be to let rest and hydration move together without trying to fix the whole day at once.",
      adjustActivity: "If there is one gentle adjustment, treat hydration as part of recovery after load, not as a number to rush.",
      adjustCaffeine: "If there is one gentle adjustment, give plain water some space between caffeine and rest.",
      adjustWater: "If there is one gentle adjustment, place small water moments across the day without forcing them all at once.",
      adjustSteady: "If there is one gentle adjustment, keep the rhythm that already feels workable without adding more from fear.",
      adjustEnergyLayered: "If there is one gentle adjustment, listen to body and mind as layered signals without deciding that the day must be good or bad.",
      tomorrowRecovery: "Tomorrow, let recovery come first, then return to the pattern without rushing yourself.",
      tomorrowActivity: "Tomorrow, let recovery and hydration move together, then see what the body is ready to add.",
      tomorrowCaffeine: "Tomorrow, lower caffeine by one step and let plain water return as the base.",
      tomorrowEnergyLayered: "Tomorrow, notice body and mind as layered signals, then choose a rhythm that fits.",
      tomorrowPositiveMind: "Tomorrow, keep the mind state that feels workable, then return to the pattern without rushing yourself.",
      tomorrowSteady: "Tomorrow, keep the workable rhythm and return to the pattern without rushing yourself.",
      mindNote: "Mind Note: {note}"
    },
    energyCauseInsight: {
      alignedLow: "Low energy today may relate to factors that used energy or left recovery incomplete. This is information, not a mistake.",
      alignedGood: "Today’s energy seems supported by enough rest or a lighter mind. Keeping this rhythm may be enough without adding too much.",
      lowWithSupport: "Even with support from rest or a lighter mind, low energy can still be true. The body may simply need more recovery time, not instant readiness.",
      goodWithDepletion: "Even with energy-using factors present, today’s energy may still carry you. Use that capacity gently and return recovery later.",
      goodWithStress: "Even with stress present, today’s energy may still carry you. Try using this rhythm without pushing it too far.",
      lowWithLightMind: "The mind may feel lighter while the body still feels tired. Both can be true, and they may ask for care on different layers.",
      mediumMixed: "Today has both support and energy-use signals. It may be a balance day rather than a day to judge as good or bad."
    },
    energyCauseReminder: {
      layered: "Body, mind, and energy causes may be speaking from different layers today. Listen gently without deciding that one signal cancels the other."
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
      energyCauses: "Today's energy may be affected by {causes} more than by any personal mistake.",
      energyCause: {
        enough_sleep: "Today's energy seems supported by enough rest. Keeping this rhythm may be enough without adding too much.",
        light_mind: "Today the mind seems lighter, so energy may not be pulled as much by pressure."
      }
    },
    drinkSweetnessInsight: {
      low: "Today’s drinks did not add much sweetness load, and plain water remained a good base.",
      moderate: "There was some sweetness today, but it does not need to become guilt. The next drink can simply return to water or rest.",
      sodaLow: "There was soda today, but the sweetness level was not high, so the system reads it more as drink context than a sweetness load.",
      sodaHigh: "Today’s soda added sweetness load, but it does not need to be judged. The next drink can simply return to plain water or rest.",
      sweetCaffeine: "Today’s drinks offered both alertness and sweetness. The system may invite plain water back as the base without judging the earlier drinks.",
      sweetLowRecovery: "If sleep or energy was low, sweetness may have helped in the short term, while recovery and water still deserve space afterward.",
      sweetHighLoad: "If today included higher load or activity, sweetness may be part of the day’s energy, while water and recovery can follow afterward."
    },
    signalReminder: {
      sleepLoadRecovery: "Recovery may need to come before adding more performance today.",
      hydrationCaffeine: "Today may need steadier hydration and rest before caffeine leads the rhythm.",
      hydrationLoad: "Today's activity load may ask for steadier hydration than a rest day. Sip gradually rather than rushing the number.",
      hydrationRecovery: "There is no clear heavy activity load, but there is a recovery signal. Keep hydration as a gentle base for the day.",
      caffeineBase: "Caffeine may support alertness, but plain water can remain the base.",
      positiveMind: "The mind seems supportive today. Use it as a gentle base without pushing yourself to do more.",
      positiveMindWithLoad: "The mind seems better today, and there is still load here. Let recovery move with it.",
      positiveMindRecovery: "The mind seems supportive today, while the body may still need recovery. Let both layers be cared for gently.",
      doublePressure: "Today does not need more fixing. Lowering pressure by one step is enough.",
      sugarHigh: "Sugary drinks are adding up. Reducing the next one by one step is enough.",
      consistency: "Hydration is visible and load is light today. Consistency is enough.",
      endorphin: "Energy may feel good today, but low sleep or high load still deserves recovery space.",
      resourceLow: "Low energy today may come from low resources, not from a personal mistake.",
      restFirst: "Today, pausing is allowed. Not everything needs to move forward immediately."
    },
    signalReflection: {
      goodConsistency: "You noticed a rhythm where hydration and load are not pressuring the system too much",
      noExtraDrinks: "Extra drinks beyond plain water are staying light",
      noticedSignals: "You started seeing the relationship between water, drinks, recovery, and mind state",
      sleepLoadRecovery: "Low sleep or high load makes recovery the first useful signal today",
      endorphin: "Even when energy feels good, recovery may still need some space.",
      hydrationCaffeine: "Water is still low while caffeine is rising. Steadier sips and rest are enough to return the rhythm.",
      hydrationLoad: "If exercise, heat, or sustained activity was part of the day, hydration can be part of recovery, not just a target.",
      hydrationRecovery: "This looks more like a recovery signal than an activity-load signal. Hydration can stay gentle and steady rather than becoming a bigger number.",
      positiveMindFeelingGood: "Today's overall mind state seems more positive, which may support the system without needing to push harder.",
      positiveMindRelaxed: "Today the mind seems more relaxed, which may help self-care come from less pressure.",
      pressure: "Pressure has been noticed. Rushing to fix does not need to be today's answer.",
      resourceLow: "Energy may be low because water, food, or sleep resources are low; this is information, not blame.",
      steadyHydration: "Place steadier water moments across the day without forcing it all at once."
    },
    loadTypeReflection: {
      clinical_focus: "Today used sustained precision, eyes, hands, and nervous-system focus beyond what a simple load score can show. Quiet recovery deserves space too.",
      service_standing_load: "Today may have used energy through standing, moving, carrying, and holding space for others, even if it was not formal exercise.",
      market_decision_load: "Today’s load may come more from market attention and decision pressure than physical movement. Short screen breaks, resting the eyes, and not carrying the market into sleep may be enough.",
      outdoor_heat_load: "Today may have used more water and energy than it felt. Small sips and short pauses are enough.",
      sport_intensity_load: "Today used real physical effort. Recovery is part of training, not a step backward.",
      cognitive_load: "Today used sustained focus and visual attention. Resting the eyes and reducing mental loops are part of recovery.",
      sleep_debt_load: "Do not judge your energy from a low-sleep day. Recovery comes before adding more load.",
      physical_load: "Today used some body energy. Let recovery have space without adding more too quickly.",
      recovery: "Today has room for the system to recover and keep a rhythm that can last."
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
      sleepLoadHigh: "The system used a lot while rest was not full. Let recovery come before adding another round.",
      endorphin: "Good-feeling energy can sometimes hide tired signals. Leave some room for recovery.",
      high: "Recovery is part of performance. Today is enough for heavy body use.",
      lowSleep: "Do not judge your health from a low-sleep day. Let rest help rebalance the picture.",
      medium: "Moderate load needs a softer window. Do not add more just because you still can.",
      light: "Today is good for keeping a light rhythm and building consistency."
    },
    tomorrowFocus: {
      recovery: "Recovery first, then see how ready the body feels.",
      water: "Place small water-sipping moments across the day.",
      hydrationLoad: "Let hydration follow the day's load gently, without rushing it all at once.",
      hydrationRecovery: "Let recovery and gentle hydration move together without chasing a bigger number.",
      energyLayered: "Notice body and mind as layered signals, then choose tomorrow's rhythm gently.",
      sweet: "Reduce sweetness by one step without turning today into punishment.",
      caffeine: "Lower caffeine by one step and give water and rest more space.",
      restNoGuilt: "Rest without guilt, then come back to the pattern gently.",
      steady: "Keep the system sustainable for one more day."
    },
    tomorrowFocusByLoadType: {
      clinical_focus: "Give the hands, eyes, and nervous-system focus a quiet recovery window.",
      market_decision_load: "Rest the eyes, close screens in small windows, and reduce the market loop after closing.",
      cognitive_load: "Rest the eyes, move briefly, and lower the mental loop by one step.",
      service_standing_load: "Give the back, legs, and shoulders some space, with water spread across the day.",
      outdoor_heat_load: "Sip water in small rounds and take short sun/body pauses without forcing it.",
      sport_intensity_load: "Let recovery be part of training, not a step backward.",
      physical_load: "Return space to the body with light movement and enough rest.",
      sleep_debt_load: "Let sleep and recovery come before adding another load round.",
      recovery: "Keep consistency without adding more from fear."
    },
    options: {
      energy: { low: "Low", medium: "Medium", good: "Good" },
      mind: { calm: "Neutral", worried: "Worried", pressured: "Pressured", scattered: "Scattered", feeling_good: "Feeling good", relaxed: "Relaxed" },
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
        soda: "Soda / Soft drink",
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
        officeWork: "Office work / meetings & documents",
        outdoorWork: "Outdoor work / heat & physical effort",
        dentalFocus: "Dentist / detailed clinical cases",
        clinicalShift: "Doctor / clinical shift or patient care",
        photoshoot: "Photographer / long shoot",
        marketWatch: "Investor / market watch & analysis",
        badminton: "Badminton",
        easyRun: "Easy run",
        longRun: "Long run",
        heavyPingPong: "Heavy pingpong",
        longWalk: "Lots of walking",
        deepWork: "Deep work / coding",
        lowSleep: "Low sleep"
      },
      activityGroups: {
        work: "Work",
        sports: "Sports",
        recovery: "Recovery"
      },
      mindNote: {
        feeling: {
          calm: "Neutral",
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
        enough_sleep: "Enough sleep",
        light_mind: "Light mind",
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
    version: "v1.9 Portable Field Memory Foundation",
    subtitle: "温和地观察补水、恢复、每日负荷与内在状态的平衡。",
    viewTabsAria: "选择应用视图",
    tabToday: "今天",
    tabReflection: "反思/NuTuenSai",
    tabLog: "记录",
    todayViewTitle: "今日输入",
    reflectionViewTitle: "反思",
    reflectionViewHelper: "查看今天的反思内容，准备好后再保存到每日记录。",
    reflectionGeneratorHelper: "点击回顾会根据今天的信号生成回顾，保存前仍可轻微编辑。",
    reflectionActionsKicker: "准备保存",
    logViewTitle: "记录与导出",
    logViewHelper: "查看已保存的记录，并管理备份文件。",
    logControlsTitle: "备份控制",
    welcomeKicker: "PNAT2026 HEALTH BALANCE",
    welcomeTitle: "欢迎回来",
    welcomeSubtitle: "今天你已经照顾了很多事情。\n也别忘了温柔地照顾自己。",
    welcomeQuote: "平衡始于看见，而不是强迫。",
    welcomeBegin: "开始今天",
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
    todayStateCue: "今天的快速观察",
    energyLabel: "Energy",
    mindLabel: "今天整体心境",
    sleepLabel: "Sleep",
    hydration: "Hydration",
    hydrationHeading: "今天的饮水",
    hydrationGuidanceBase: "今天的大致目标：{target} ml",
    hydrationGuidanceRange: "今天的 load 较高：可以把饮水区间温和放在 {min}-{max} ml 左右",
    hydrationGuidanceCueBase: "慢慢小口喝，不需要急着追数字。",
    hydrationGuidanceCueLoad: "今天比休息日更消耗，可以把喝水分散到一天里。",
    hydrationGuidanceCueSport: "如果今天有运动或出汗，把补水也看作 recovery 的一部分。",
    hydrationGuidanceCueOutdoor: "如果今天有户外或炎热环境，分段补水，也给身体短暂停顿。",
    hydrationGuidanceCueCaffeine: "咖啡因可以帮助清醒，但白水仍然可以作为基础。",
    hydrationGuidanceCueRecovery: "今天有 recovery 信号，可以把白水作为温和的基础，和休息一起走。",
    hydrationGuidanceCueActivityRecovery: "今天同时有活动 load 和 recovery 信号，可以把小口补水和休息放在一起。",
    halfBottle: "+半瓶",
    resetButton: "重置",
    drinks: "饮品",
    drinksHeading: "今日饮品记录",
    drinksHelper: "记录白水以外的饮品，例如咖啡、茶、可可、甜饮或果汁。",
    drinkTypeLabel: "饮品类型",
    sweetnessLabel: "甜度",
    caffeineLabel: "大约咖啡因",
    caffeineHelper: "粗略选择就可以。",
    milkLabel: "奶",
    amountLabel: "份量",
    amountPlaceholder: "1 glass / 1 bottle / 自定义",
    addDrink: "添加饮品",
    clearDrinks: "清空饮品",
    sugarScoreLabel: "糖分 {score}",
    caffeineScoreLabel: "咖啡因 {score}",
    milkCountLabel: "奶类 {count}",
    hydrationSupportLabel: "支持 {count}",
    caffeineCupTitle: "今日咖啡因杯数",
    caffeineCupEmpty: "今天还没有记录咖啡因饮品。",
    caffeineCupSingle: "今天已记录 1 杯咖啡因饮品。",
    caffeineCupPlural: "今天已记录 {count} 杯咖啡因饮品。",
    emptyDrinkList: "目前还没有白水以外的饮品，今天的负担很轻。",
    energyCauseLabel: "Energy Cause / 可能影响能量的原因",
    loadRecovery: "Load & Recovery",
    loadHeading: "今天把能量用在哪里？",
    loadHelper: "选择今天消耗能量的事项。系统会同时参考身体、专注力与恢复。",
    mindfulReminder: "正念提醒",
    nuTuenSaiNote: "NuTuenSai 提醒",
    nuTuenSaiRole: "NuTuenSai 是一个温和的反思层，用来观察模式，并不是诊断工具或医疗建议。",
    nuTuenSaiEmptyReminder: "欢迎回来。今天还没有太多资料可以阅读，可以先记录一点今日输入，再回来做轻柔的回顾。",
    reflectionGenerator: "反思生成器",
    endReflection: "每日结束反思",
    reflectionEmptyTitle: "还没有回顾",
    reflectionEmptyText: "点击今日回顾，让系统轻轻倾听今天的模式。",
    reflectionGenerating: "正在倾听今天的模式…",
    reflectionStateLabel: "回顾",
    reflectToday: "今日回顾",
    reflectAgain: "重新回顾",
    clearReflection: "清除回顾",
    editReflection: "轻微编辑",
    doneEditingReflection: "完成编辑",
    mindNoteKicker: "Mind Note — 轻轻放下一行",
    mindNoteTitle: "Mind Note",
    mindNoteSubtitle: "把心里拿着的东西轻轻放下，不需要急着修正。",
    mindNoteCue: "这条记录的反思小记",
    mindNoteTextLabel: "今天心里轻轻承载着什么？",
    mindNotePlaceholder: "例如：我希望数字快点变好，但也不想给自己太大压力。",
    mindNoteFeelingLabel: "这条记录的感受",
    mindNoteSupportLabel: "此刻需要的支持",
    generateReflection: "生成每日结束反思",
    reflectionPlaceholder: "点击今日回顾，根据今天的信号生成回顾。",
    localOnly: "仅本机",
    dailyLogControls: "Daily Log 控制",
    controlsHelp: "把今天保存到本机浏览器表格，需要时再导出 Master Excel。",
    saveDailyLog: "保存到 Daily Log",
    todayResetTitle: "当前表单",
    resetCurrentForm: "重置当前表单",
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
    resetCurrentFormConfirm: "只会重置当前表单，不会删除已保存的每日记录。",
    resetCurrentFormDone: "当前表单已重置，已保存的每日记录仍然保留。",
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
    reflectionDisplay: {
      overviewEnergyLayered: "今天的能量状态和原因，可能在描述系统的不同层次。两种信号可以同时成立，不代表资料有问题。",
      overviewRecoveryHydratedRest: "今天整体像是 recovery 比增加更多事情更重要。饮水已经可以作为基础，先休息也符合今天的能量。",
      overviewRecoveryHydrated: "今天像是身体更需要恢复节奏，而不是增加新的负荷。饮水已经可以作为基础，也不需要用单一天来判断自己。",
      overviewRecovery: "今天像是在提醒 recovery 比增加更多事情更重要。让补水、休息和心里的状态慢慢回到一个稳定基础就好。",
      overviewActivityHydrated: "今天有比休息日更多的活动消耗。饮水已经可以作为基础，recovery 可以和今天的 load 一起往前走。",
      overviewActivity: "今天有比休息日更多的活动消耗。如果有出汗或持续用力，补水和 recovery 慢慢跟上身体就好。",
      overviewPositiveMindActivity: "今天有真实的能量消耗，同时整体心境也像是一个支持。温和使用这个支持，也让 recovery 跟着 load 一起走。",
      overviewPositiveMindRecovery: "今天心境像是有支持感，但身体可能仍然需要 recovery。两个信号可以同时存在，不代表整天都一定没事。",
      overviewPositiveMindSupport: "今天整体心境较好，可以成为一种支持，不需要额外用力。",
      overviewCaffeine: "今天咖啡因可能帮助清醒或维持节奏。让白水回到基础就好，不需要因此责备咖啡。",
      overviewSteadyHydration: "今天饮水已经可以作为基础，整体更适合维持稳定，而不是因为害怕再增加更多。",
      overviewBase: "今天适合温和地观察 pattern。补水、休息和心里的状态都可以慢慢回到可持续的节奏。",
      adjustRecovery: "如果要轻轻调整一点，可以让休息和补水一起走，不需要一天内修好全部。",
      adjustActivity: "如果要轻轻调整一点，可以把补水看作 load 后 recovery 的一部分，而不是急着追数字。",
      adjustCaffeine: "如果要轻轻调整一点，可以在咖啡因和休息之间，把空间还给白水。",
      adjustWater: "如果要轻轻调整一点，把小口喝水分散到一天里，不需要一次喝完。",
      adjustSteady: "如果要轻轻调整一点，就是维持已经可行的节奏，不因为害怕而增加更多。",
      adjustEnergyLayered: "如果要轻轻调整一点，可以把身体和心的信号分层听，不急着判断今天是好或不好。",
      tomorrowRecovery: "明天先让 recovery 在前面，再不急地回来观察 pattern。",
      tomorrowActivity: "明天让 recovery 和补水一起走，再看身体准备好增加什么。",
      tomorrowCaffeine: "明天把咖啡因降一个节奏，让白水回到基础。",
      tomorrowEnergyLayered: "明天把身体和心的信号分层看，再选择合适的节奏。",
      tomorrowPositiveMind: "明天保留这种比较能待住的心境，再不急地回来观察 pattern。",
      tomorrowSteady: "明天维持可持续的节奏，再不急地回来观察 pattern。",
      mindNote: "Mind Note: {note}"
    },
    energyCauseInsight: {
      alignedLow: "今天能量低，可能和消耗能量或 recovery 还不够完整有关。这是信息，不是错误。",
      alignedGood: "今天的能量看起来有一部分来自比较足够的休息或比较轻的心。保持这个节奏就好，不需要再额外加很多。",
      lowWithSupport: "即使有休息或心比较轻的支持，能量低也仍然可以成立。身体可能只是还需要更多 recovery，不代表休息后必须马上准备好。",
      goodWithDepletion: "即使有消耗能量的因素，今天的能量仍然可能够用。温和使用这份能量，之后再把 recovery 还回来。",
      goodWithStress: "即使有压力在，今天的能量仍然可能够用。可以使用这个节奏，但不需要推得太远。",
      lowWithLightMind: "心可能比较轻，但身体仍然会累。两种信号可以同时成立，也许是在提醒身体和心需要分层照顾。",
      mediumMixed: "今天同时有支持能量和使用能量的信号。可以把它看作 balance 的一天，而不是急着判断好或不好。"
    },
    energyCauseReminder: {
      layered: "今天身体、心和能量原因可能在不同层次说话。温和地听，不需要让一个信号取消另一个。"
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
      energyCauses: "今天的能量可能更多受到 {causes} 影响，而不是自己的错误。",
      energyCause: {
        enough_sleep: "今天的能量看起来有一部分来自比较足够的休息。保持这个节奏就好，不需要再额外加很多。",
        light_mind: "今天心里看起来比较轻，能量也许没有被压力拉走太多。"
      }
    },
    drinkSweetnessInsight: {
      low: "今天的饮品没有增加太多甜度负担，白水仍然是很好的基础。",
      moderate: "今天有一些甜度，但不需要变成内疚。下一杯可以简单回到白水或休息。",
      sodaLow: "今天有汽水，但甜度不高，所以系统更把它看作饮品背景，而不是甜度负担。",
      sodaHigh: "今天的汽水带来了一些甜度负担，但不需要责备那一杯。下一杯回到白水或休息就好。",
      sweetCaffeine: "今天的饮品同时带来清醒感和甜度。系统可以温和提醒让白水回到基础，而不评价前面的饮品。",
      sweetLowRecovery: "如果今天睡少或能量低，甜度可能短时间帮忙支撑，但之后 recovery 和白水仍然值得有空间。",
      sweetHighLoad: "如果今天有较高 load 或活动，甜度可能是当天能量的一部分，之后让水和 recovery 跟上就好。"
    },
    signalReminder: {
      sleepLoadRecovery: "今天 recovery 可以先于继续增加 performance。",
      hydrationCaffeine: "今天可以先让补水和休息稳定一点，不让咖啡带走整天的节奏。",
      hydrationLoad: "今天有比休息日更明显的活动消耗，可以慢慢小口补水，不需要一次追数字。",
      hydrationRecovery: "今天没有明显的高活动 load，但有 recovery 信号。把白水温和地放回今天的基础就好。",
      caffeineBase: "咖啡因可以帮助清醒，但白水仍然可以作为基础。",
      positiveMind: "今天心境像是一个小小的支持。把它当作温和的基础，不需要因此推动自己做更多。",
      positiveMindWithLoad: "今天心境看起来好一些，但这里仍然有 load。让 recovery 和它一起走。",
      positiveMindRecovery: "今天心境像是一个支持，但身体可能仍然需要 recovery。温和照顾这两个层次就好。",
      doublePressure: "今天不需要急着修正，先把压力放低一点就够了。",
      sugarHigh: "甜饮开始累积了，下一杯少一点就够了。",
      consistency: "今天补水已经被看见，load 也比较轻，保持稳定就好。",
      endorphin: "今天能量感觉不错，但睡少或 load 高时，仍然值得留一点恢复空间。",
      resourceLow: "今天能量低可能来自资源不足，不是自己的错误。",
      restFirst: "今天可以先暂停。不需要让所有事情立刻推进。"
    },
    signalReflection: {
      goodConsistency: "已经看见补水与 load 没有过度压迫系统的节奏",
      noExtraDrinks: "白水以外的饮品负担仍然较轻",
      noticedSignals: "开始看见水、饮品、恢复与内在状态之间的关系",
      sleepLoadRecovery: "睡少或 load 高，让 recovery 成为今天最需要先照顾的信号",
      endorphin: "即使今天感觉有能量，recovery 可能仍然需要一点空间。",
      hydrationCaffeine: "水还偏少，同时咖啡因正在上升。稳定小口补水和休息就够了。",
      hydrationLoad: "如果今天有运动、炎热或持续活动，补水可以是 recovery 的一部分，不只是目标数字。",
      hydrationRecovery: "这更像 recovery 信号，不一定是活动 load。补水可以保持温和稳定，不需要变成更大的数字。",
      positiveMindFeelingGood: "今天整体心境较好，可以成为一种支持，不需要额外用力。",
      positiveMindRelaxed: "今天心情比较放松，可以让照顾自己不那么来自压力。",
      pressure: "压力已经被看见了。今天不需要用急着修正来回答它。",
      resourceLow: "能量低可能来自水、食物或睡眠资源不足，这是信息，不是责备。",
      steadyHydration: "把补水点放得更稳定，不需要一次硬灌。"
    },
    loadTypeReflection: {
      clinical_focus: "今天消耗的是持续的精细度、眼睛、手部与神经系统专注力，不只是分数能表达的负荷。安静恢复也需要空间。",
      service_standing_load: "今天的能量可能用在站立、走动、搬东西和照顾眼前的人，即使它不是正式运动。",
      market_decision_load: "今天的负荷可能更多来自市场注意力与决策压力，而不是身体活动。短暂离开屏幕、休息眼睛、不要把市场带进睡眠里，就已经足够。",
      outdoor_heat_load: "今天身体可能用了比感觉中更多的水和能量。小口补水和短暂停顿就够了。",
      sport_intensity_load: "今天身体确实用了力。Recovery 是训练的一部分，不是退后。",
      cognitive_load: "今天用了持续的专注力和视觉注意力。让眼睛休息、减少反复思考也是 recovery。",
      sleep_debt_load: "不要用睡少的一天来判断能量。先 recovery，再增加新的 load。",
      physical_load: "今天身体用了不少能量，给 recovery 一点空间，不需要太快再增加。",
      recovery: "今天有空间让系统慢慢恢复，并维持可持续的节奏。"
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
      sleepLoadHigh: "今天系统用了不少力，同时休息不够完整。先让 recovery 回到前面。",
      endorphin: "感觉不错的能量有时会盖住疲惫信号，留一点恢复空间会更稳。",
      high: "Recovery 是 performance 的一部分。今天身体已经用了很多。",
      lowSleep: "不要用睡少的一天来判断健康，让休息先帮整体恢复平衡。",
      medium: "中等 Load 也需要放松的窗口，不要因为还可以做就继续加。",
      light: "今天适合维持轻一点的节奏，慢慢累积稳定。"
    },
    tomorrowFocus: {
      recovery: "先 recovery，再看身体准备好了多少。",
      water: "把小口喝水安排在一天里几个自然的点。",
      hydrationLoad: "让补水温和跟上今天的 load，不需要一次喝完。",
      hydrationRecovery: "让 recovery 和温和补水一起走，不需要追更大的数字。",
      energyLayered: "把身体和心的信号分层看，再温和选择明天的节奏。",
      sweet: "甜度少一步就好，不要把今天变成惩罚。",
      caffeine: "明天把咖啡因降一个节奏，把空间还给水和休息。",
      restNoGuilt: "不带内疚地休息，然后再温和地回来看 pattern。",
      steady: "让这个系统再稳定地走一天。"
    },
    tomorrowFocusByLoadType: {
      clinical_focus: "给手、眼睛和神经系统专注力一个安静恢复的窗口。",
      market_decision_load: "让眼睛休息，分段关掉屏幕，并减少收盘后的反复思考。",
      cognitive_load: "休息眼睛，短暂活动身体，把 mental loop 降低一点。",
      service_standing_load: "把空间还给后背、腿和肩膀，也把喝水分散到一天里。",
      outdoor_heat_load: "分段小口补水，也给太阳下的身体短暂停顿。",
      sport_intensity_load: "让 recovery 成为训练的一部分，不是退后。",
      physical_load: "用轻一点的活动和足够休息，把空间还给身体。",
      sleep_debt_load: "先把睡眠和 recovery 放前面，再增加新的 load。",
      recovery: "维持稳定，不需要因为害怕而增加更多。"
    },
    options: {
      energy: { low: "低", medium: "中", good: "好" },
      mind: { calm: "一般", worried: "担心", pressured: "有压力", scattered: "分散", feeling_good: "感觉不错", relaxed: "放松" },
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
        soda: "汽水",
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
        officeWork: "办公室工作 / 会议与文件",
        outdoorWork: "户外工作 / 体力与出汗",
        dentalFocus: "牙科 / 精细临床病例",
        clinicalShift: "医生 / 门诊或病患照护",
        photoshoot: "摄影师 / 长时间拍摄",
        marketWatch: "投资者 / 盯盘与分析",
        badminton: "羽毛球",
        easyRun: "轻松跑",
        longRun: "长距离跑",
        heavyPingPong: "高强度乒乓球",
        longWalk: "走很多路",
        deepWork: "深度工作 / 编程",
        lowSleep: "睡眠不足"
      },
      activityGroups: {
        work: "工作",
        sports: "运动",
        recovery: "恢复"
      },
      mindNote: {
        feeling: {
          calm: "一般",
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
        enough_sleep: "睡够了",
        light_mind: "心比较轻",
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
  { key: "soda", type: "soda", label: "น้ำอัดลม", sweet: false, hydration: false, defaultSweetness: "none", defaultCaffeine: "none", defaultMilk: "no" },
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
  "enough_sleep",
  "light_mind",
  "unknown"
];

const activityOptions = [
  { key: "officeWork", label: "งานออฟฟิศ", score: 1, type: "cognitive_load", group: "work" },
  { key: "outdoorWork", label: "ทำงานกลางแจ้ง", score: 3, type: "outdoor_heat_load", group: "work" },
  { key: "deepWork", label: "Deep work / coding นาน", score: 2, type: "cognitive_load", group: "work", legacyLabels: ["Long deep work / coding", "长时间 deep work / coding"] },
  { key: "dentalFocus", label: "หมอฟัน", score: 3, type: "clinical_focus", group: "work" },
  { key: "clinicalShift", label: "แพทย์", score: 3, type: "clinical_focus", group: "work" },
  { key: "photoshoot", label: "ช่างภาพ", score: 3, type: "service_standing_load", group: "work" },
  { key: "marketWatch", label: "นักลงทุน", score: 2, type: "market_decision_load", group: "work" },
  { key: "badminton", label: "แบดมินตัน", score: 3, type: "sport_intensity_load", group: "sports" },
  { key: "heavyPingPong", label: "ปิงปองหนัก", score: 3, type: "sport_intensity_load", group: "sports", legacyLabels: ["Heavy ping-pong"] },
  { key: "easyRun", label: "Easy run", score: 2, type: "physical_load", group: "sports" },
  { key: "longRun", label: "Long run", score: 4, type: "sport_intensity_load", group: "sports" },
  { key: "longWalk", label: "เดินเยอะ", score: 2, type: "physical_load", group: "sports" },
  { key: "lowSleep", label: "นอนน้อย", score: 2, type: "sleep_debt_load", group: "recovery", legacyLabels: ["睡得少"] },
  { key: "rest", label: "Rest day", score: 0, type: "recovery", group: "recovery" }
];

const activityGroups = ["work", "sports", "recovery"];
const loadTypePriority = [
  "sleep_debt_load",
  "clinical_focus",
  "outdoor_heat_load",
  "sport_intensity_load",
  "service_standing_load",
  "market_decision_load",
  "cognitive_load",
  "physical_load",
  "recovery"
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
let stateOrbIntervalId;
let currentView = "today";
let isEditingReflection = false;
let isGeneratingReflection = false;
let reflectionGenerationTimerId;
const REFLECTION_GENERATION_DELAY_MS = 850;
const REFLECTION_SIGNATURE = "🩵";

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
  updateTodayStateOrb();
  startTodayStateOrbRefresh();
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
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
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
  updateViewPanels();
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

function getTodayStateOrbMode(date = new Date()) {
  const hour = date.getHours();
  return hour >= 19 || hour < 5 ? "moon" : "sun";
}

function updateTodayStateOrb(date = new Date()) {
  const orb = document.querySelector(".state-orb");
  if (!orb) return;
  const mode = getTodayStateOrbMode(date);
  orb.classList.toggle("state-orb--sun", mode === "sun");
  orb.classList.toggle("state-orb--moon", mode === "moon");
}

function startTodayStateOrbRefresh() {
  if (stateOrbIntervalId) clearInterval(stateOrbIntervalId);
  stateOrbIntervalId = setInterval(() => {
    updateTodayStateOrb();
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
  list.innerHTML = activityGroups.map((group) => {
    const activities = activityOptions.filter((activity) => activity.group === group);
    return `
      <div class="activity-group">
        <p class="activity-group-label">${t(`options.activityGroups.${group}`)}</p>
        <div class="activity-group-grid">
          ${activities.map((activity) => `
            <button type="button" class="activity-button" data-activity="${escapeHtml(activity.label)}">
              ${escapeHtml(t(`options.activities.${activity.key}`))}
            </button>
          `).join("")}
        </div>
      </div>
    `;
  }).join("");
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
  document.querySelector("#openWelcome").addEventListener("click", () => showWelcome({ remember: false }));

  document.querySelector(".view-tabs").addEventListener("click", (event) => {
    const button = event.target.closest("[data-view]");
    if (!button) return;
    setActiveView(button.dataset.view);
  });

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

  document.querySelector("#generateReflection").addEventListener("click", generateReflectionWithPulse);
  document.querySelector("#clearReflection").addEventListener("click", clearGeneratedReflection);

  document.querySelector("#reflectionOutput").addEventListener("input", (event) => {
    appState.generatedReflection = event.target.value;
    updateReflectionPreview();
  });

  document.querySelector("#toggleReflectionEdit").addEventListener("click", () => {
    if (!appState.generatedReflection.trim()) return;
    isEditingReflection = !isEditingReflection;
    updateReflectionPreview();
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
  document.querySelector("#resetCurrentForm").addEventListener("click", resetCurrentForm);
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
  setActiveView("today");
}

function setActiveView(view) {
  if (!["today", "reflection", "log"].includes(view)) return;
  currentView = view;
  updateViewPanels();
}

function updateViewPanels() {
  document.querySelectorAll("[data-view-panel]").forEach((panel) => {
    const isActive = panel.dataset.viewPanel === currentView;
    panel.classList.toggle("is-active", isActive);
    panel.setAttribute("aria-hidden", String(!isActive));
  });

  document.querySelectorAll("[data-view]").forEach((button) => {
    const isActive = button.dataset.view === currentView;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function syncUI() {
  appState.loadScore = calculateLoadScore();
  appState.loadLevel = getLoadLevel(appState.loadScore);
  appState.hydrationStatus = getHydrationStatus(appState.waterMl);

  document.querySelector("#waterMl").textContent = appState.waterMl.toLocaleString(translations[currentLanguage].locale);
  document.querySelector("#hydrationFeedback").textContent = appState.hydrationStatus;
  document.querySelector("#hydrationGuidance").textContent = getHydrationGuidanceText();
  updateHydrationVisual();
  document.querySelector("#loadScore").textContent = appState.loadScore;
  document.querySelector("#loadLevel").textContent = appState.loadLevel;
  document.querySelector("#loadFeedback").textContent = getLoadFeedback();
  document.querySelector("#mindfulReminder").textContent = getMindfulReminder();
  document.querySelector("#reflectionOutput").value = appState.generatedReflection;
  document.querySelector("#mindNoteText").value = appState.mindNoteText || "";

  updateReflectionPreview();
  updateStateButtons();
  updateMindNoteButtons();
  updateDrinkUI();
  updateActivityUI();
  updateEnergyCauseUI();
}

function updateReflectionPreview() {
  const reflectionText = appState.generatedReflection || "";
  const hasReflection = reflectionText.trim().length > 0;
  const preview = document.querySelector("#reflectionPreview");
  const emptyState = document.querySelector("#reflectionEmptyState");
  const generationState = document.querySelector("#reflectionGenerationState");
  const previewText = document.querySelector("#reflectionPreviewText");
  const previewStatus = document.querySelector("#reflectionPreviewStatus");
  const textarea = document.querySelector("#reflectionOutput");
  const toggleButton = document.querySelector("#toggleReflectionEdit");
  const generateButton = document.querySelector("#generateReflection");
  const clearButton = document.querySelector("#clearReflection");

  if (preview) {
    preview.classList.toggle("is-generating", isGeneratingReflection);
    preview.classList.toggle("is-reflection-empty", !hasReflection && !isGeneratingReflection);
    preview.classList.toggle("is-reflection-generating", isGeneratingReflection);
    preview.classList.toggle("has-reflection", hasReflection && !isGeneratingReflection);
    preview.setAttribute("aria-busy", String(isGeneratingReflection));
  }
  if (generationState) {
    generationState.classList.toggle("is-hidden", !isGeneratingReflection);
    generationState.setAttribute("aria-hidden", String(!isGeneratingReflection));
  }
  if (emptyState) emptyState.classList.toggle("is-hidden", hasReflection || isGeneratingReflection);
  if (previewStatus) previewStatus.classList.toggle("is-hidden", !hasReflection || isGeneratingReflection);
  if (previewText) {
    renderReflectionPreviewText(previewText, ensureReflectionSignature(buildReflectionDisplay()));
    previewText.classList.toggle("is-hidden", !hasReflection || isEditingReflection || isGeneratingReflection);
    previewText.classList.toggle("is-revealed", hasReflection && !isEditingReflection && !isGeneratingReflection);
  }
  if (textarea) {
    textarea.value = reflectionText;
    textarea.classList.toggle("is-hidden", !hasReflection || !isEditingReflection || isGeneratingReflection);
  }
  if (toggleButton) {
    toggleButton.classList.toggle("is-hidden", !hasReflection || isGeneratingReflection);
    toggleButton.textContent = t(isEditingReflection ? "doneEditingReflection" : "editReflection");
  }
  if (generateButton) {
    generateButton.disabled = isGeneratingReflection;
    generateButton.setAttribute("aria-disabled", String(isGeneratingReflection));
    generateButton.classList.toggle("is-hidden", hasReflection && !isGeneratingReflection);
    generateButton.textContent = t("reflectToday");
  }
  if (clearButton) {
    clearButton.classList.toggle("is-hidden", !hasReflection || isGeneratingReflection);
  }
}

function renderReflectionPreviewText(element, text) {
  element.textContent = "";
  const paragraphs = String(text || "").split(/\n{2,}/).map((part) => part.trim()).filter(Boolean);
  const fragment = document.createDocumentFragment();

  paragraphs.forEach((paragraph, index) => {
    const line = document.createElement("span");
    line.className = "reflection-preview-line";
    line.textContent = paragraph;
    line.style.setProperty("--reveal-delay", `${Math.min(index * 120, 540)}ms`);
    fragment.append(line);
  });

  element.append(fragment);
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
  renderCaffeineCupVisual();
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
    const activity = getActivityOptionByValue(selected);
    return total + (activity ? activity.score : 0);
  }, 0);
}

function getActivityOptionByValue(value) {
  const normalized = String(value || "").trim();
  if (!normalized) return null;
  return activityOptions.find((activity) => {
    if (activity.label === normalized) return true;
    if (activity.legacyLabels?.includes(normalized)) return true;
    return Object.keys(translations).some((lang) => translations[lang].options.activities[activity.key] === normalized);
  }) || null;
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

function resetDrinkProfileForm() {
  const drinkTypeSelect = document.querySelector("#drinkTypeSelect");
  if (drinkTypeSelect) {
    drinkTypeSelect.value = drinkTypeOptions[0]?.type || "black_coffee";
  }
  const amountInput = document.querySelector("#drinkAmountInput");
  if (amountInput) amountInput.value = "";
  applyDrinkDefaults();
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

function getDrinkSweetnessInsight({
  profiles = appState.drinkProfiles || [],
  scores = getDrinkScores(profiles),
  waterMl = appState.waterMl || 0,
  energy = appState.selectedState.energy,
  sleep = appState.selectedState.sleep,
  loadScore = calculateLoadScore(),
  loadTypes = getSelectedLoadTypes(appState.activities || [])
} = {}) {
  const normalizedProfiles = profiles.map(normalizeDrinkProfile);
  const hasDrinks = normalizedProfiles.length > 0;
  const sodaProfiles = normalizedProfiles.filter((profile) => profile.type === "soda");
  const hasSoda = sodaProfiles.length > 0;
  const hasHighSweetness = normalizedProfiles.some((profile) => profile.sweetness === "high") || scores.sugarScore >= 5;
  const hasModerateSweetness = !hasHighSweetness && (scores.sugarScore >= 2 || scores.sweetDrinksCount > 0);
  const sodaHighSweetness = sodaProfiles.some((profile) => profile.sweetness === "high");
  const sodaLowSweetness = hasSoda && sodaProfiles.every((profile) => ["none", "low"].includes(profile.sweetness));
  const hasCaffeineSignal = scores.caffeineScore >= 2 || normalizedProfiles.some((profile) => ["medium", "high"].includes(profile.caffeine));
  const hasRecoverySignal = sleep === "น้อย" || energy === "ต่ำ";
  const highLoadTypes = [
    "sport_intensity_load",
    "outdoor_heat_load",
    "physical_load",
    "service_standing_load",
    "clinical_focus"
  ];
  const hasHighLoadSignal = loadScore >= 6 || loadTypes.some((type) => highLoadTypes.includes(type));
  let key = "low";

  if (hasHighSweetness && hasCaffeineSignal) {
    key = "sweetCaffeine";
  } else if (hasHighSweetness && hasRecoverySignal) {
    key = "sweetLowRecovery";
  } else if (hasHighSweetness && hasHighLoadSignal) {
    key = "sweetHighLoad";
  } else if (sodaHighSweetness) {
    key = "sodaHigh";
  } else if (sodaLowSweetness) {
    key = "sodaLow";
  } else if (hasModerateSweetness) {
    key = "moderate";
  }

  const highContextKeys = ["sodaHigh", "sweetCaffeine", "sweetLowRecovery", "sweetHighLoad"];

  return {
    key,
    text: t(`drinkSweetnessInsight.${key}`),
    hasDrinks,
    hasSoda,
    hasHighSweetness,
    hasModerateSweetness,
    hasCaffeineSignal,
    hasRecoverySignal,
    hasHighLoadSignal,
    waterIsBase: waterMl >= 1500,
    previewRelevant: highContextKeys.includes(key),
    reminderRelevant: highContextKeys.includes(key),
    detailRelevant: hasDrinks && key !== "low"
  };
}

function getCaffeineCupCount(profiles = appState.drinkProfiles || []) {
  return profiles
    .filter((profile) => caffeineOptions.includes(profile?.caffeine) && profile.caffeine !== "none")
    .length;
}

function getDrinkSummaryLabels(profiles = appState.drinkProfiles || []) {
  return profiles.map((profile) => {
    const meta = getDrinkMetaByType(profile.type);
    return meta?.label || profile.type || "";
  }).filter(Boolean);
}

function renderCaffeineCupVisual() {
  const row = document.querySelector("#caffeineCupRow");
  const caption = document.querySelector("#caffeineCupCaption");
  if (!row || !caption) return;

  const count = getCaffeineCupCount();
  row.innerHTML = count
    ? Array.from({ length: count }, () => '<span class="coffee-cup-icon active" aria-hidden="true"></span>').join("")
    : '<span class="coffee-cup-icon" aria-hidden="true"></span>';
  caption.textContent = count === 0
    ? t("caffeineCupEmpty")
    : count === 1
      ? t("caffeineCupSingle")
      : t("caffeineCupPlural", { count });
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

function getHydrationBaseTarget() {
  return 2000;
}

function getHydrationAdjustmentFromLoad({
  activities = appState.activities || [],
  loadScore = calculateLoadScore(),
  energy = appState.selectedState.energy,
  mind = appState.selectedState.mind,
  sleepLow = appState.selectedState.sleep === "น้อย" || (appState.energyCauses || []).includes("sleep_low")
} = {}) {
  const loadTypes = getSelectedLoadTypes(activities);
  const hasType = (type) => loadTypes.includes(type);
  const strongActivityTypes = [
    "sport_intensity_load",
    "outdoor_heat_load",
    "physical_load",
    "service_standing_load",
    "cognitive_load",
    "market_decision_load",
    "clinical_focus"
  ];
  const hasStrongActivity = loadTypes.some((type) => strongActivityTypes.includes(type));
  const hasRecoverySignal = sleepLow || energy === "ต่ำ" || mind === "ฟุ้ง" || mind === "กดดัน";
  let adjustment = 0;
  let cueKey = "Base";
  let category = hasRecoverySignal ? "recovery" : "base";

  if (hasType("sport_intensity_load")) {
    adjustment = 500;
    cueKey = "Sport";
  } else if (hasType("outdoor_heat_load")) {
    adjustment = 500;
    cueKey = "Outdoor";
  } else if (sleepLow && loadScore >= 6) {
    adjustment = 300;
    cueKey = "SleepLoad";
  } else if (hasType("physical_load") || hasType("service_standing_load")) {
    adjustment = 300;
    cueKey = "Load";
  } else if (hasType("cognitive_load") || hasType("market_decision_load") || loadScore >= 3) {
    adjustment = 200;
    cueKey = "Load";
  }

  if (hasStrongActivity) {
    category = hasRecoverySignal ? "activityRecovery" : "strongActivity";
    if (hasRecoverySignal) cueKey = "ActivityRecovery";
  } else if (hasRecoverySignal) {
    adjustment = 0;
    cueKey = "Recovery";
    category = "recovery";
  }

  return { adjustment, cueKey, loadTypes, category, hasStrongActivity, hasRecoverySignal };
}

function getAdaptiveHydrationTarget({
  activities = appState.activities || [],
  loadScore = calculateLoadScore(),
  drinkScores = getDrinkScores(),
  energy = appState.selectedState.energy,
  mind = appState.selectedState.mind,
  sleepLow = appState.selectedState.sleep === "น้อย" || (appState.energyCauses || []).includes("sleep_low")
} = {}) {
  const baseTarget = getHydrationBaseTarget();
  const loadAdjustment = getHydrationAdjustmentFromLoad({ activities, loadScore, energy, mind, sleepLow });
  const hasHighCaffeine = drinkScores.caffeineScore >= 5;
  const cueKey = hasHighCaffeine && loadAdjustment.adjustment === 0 ? "Caffeine" : loadAdjustment.cueKey;
  const rangeMin = baseTarget + Math.max(loadAdjustment.adjustment - 100, 0);
  const rangeMax = baseTarget + loadAdjustment.adjustment + (loadAdjustment.adjustment > 0 ? 200 : 0);

  return {
    baseTarget,
    adjustment: loadAdjustment.adjustment,
    rangeMin,
    rangeMax,
    midpoint: Math.round((rangeMin + rangeMax) / 2),
    cueKey,
    category: loadAdjustment.category,
    loadTypes: loadAdjustment.loadTypes,
    hasStrongActivity: loadAdjustment.hasStrongActivity,
    hasRecoverySignal: loadAdjustment.hasRecoverySignal,
    hasHighCaffeine
  };
}

function getHydrationGuidanceText(target = getAdaptiveHydrationTarget()) {
  const targetText = target.adjustment > 0
    ? t("hydrationGuidanceRange", {
      min: target.rangeMin.toLocaleString(translations[currentLanguage].locale),
      max: target.rangeMax.toLocaleString(translations[currentLanguage].locale)
    })
    : t("hydrationGuidanceBase", {
      target: target.baseTarget.toLocaleString(translations[currentLanguage].locale)
    });
  return `${targetText} · ${t(`hydrationGuidanceCue${target.cueKey}`)}`;
}

function countSweetDrinks() {
  return getDrinkScores().sweetDrinksCount;
}

function getDrinksFeedback() {
  const scores = getDrinkScores();
  if (!(appState.drinkProfiles || []).length) return t("drinksFeedback.noExtraDrinks");
  const sweetnessInsight = getDrinkSweetnessInsight({ profiles: appState.drinkProfiles, scores });
  if (["moderate", "sodaLow", "sodaHigh", "sweetCaffeine", "sweetLowRecovery", "sweetHighLoad"].includes(sweetnessInsight.key)) {
    return sweetnessInsight.text;
  }
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
  const signals = buildSignals();
  const hasHeavyCombo = signals.recoveryLoad.hasHeavyCombo;
  const highLoadWithLowSleep = signals.recoveryLoad.loadScore >= 6 && signals.recoveryLoad.loadTypes.includes("sleep_debt_load");
  const loadTypeNote = getLoadTypeReflections(signals, { limit: 2 }).join(" ");

  if (loadTypeNote) {
    return loadTypeNote;
  }

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

function buildSignals() {
  const loadScore = calculateLoadScore();
  const drinkScores = getDrinkScores();

  return {
    hydration: getHydrationSignal(),
    drinkLoad: getDrinkLoadSignal(drinkScores),
    recoveryLoad: getRecoveryLoadSignal(loadScore),
    energySleep: getEnergySleepSignal(loadScore),
    mindNote: getMindNoteSignal()
  };
}

function getHydrationSignal() {
  const waterMl = appState.waterMl || 0;
  const adaptiveTarget = getAdaptiveHydrationTarget();
  return {
    waterMl,
    status: getHydrationStatus(waterMl),
    adaptiveTarget,
    adaptiveGuidance: getHydrationGuidanceText(adaptiveTarget),
    adaptiveRaised: adaptiveTarget.adjustment > 0,
    strongActivityHydration: adaptiveTarget.hasStrongActivity,
    recoveryOnlyHydration: adaptiveTarget.category === "recovery",
    low: waterMl <= 750,
    rising: waterMl > 750 && waterMl <= 1500,
    steady: waterMl > 1500 && waterMl <= 2200,
    enough: waterMl > 2200,
    belowAdaptiveRange: adaptiveTarget.hasStrongActivity && adaptiveTarget.adjustment > 0 && waterMl < adaptiveTarget.rangeMin
  };
}

function getDrinkLoadSignal(scores = getDrinkScores()) {
  const profiles = appState.drinkProfiles || [];
  const sweetnessInsight = getDrinkSweetnessInsight({ profiles, scores });
  return {
    profiles,
    sugarScore: scores.sugarScore,
    caffeineScore: scores.caffeineScore,
    milkDrinkCount: scores.milkDrinkCount,
    hydrationSupportCount: scores.hydrationSupportCount,
    sweetDrinksCount: scores.sweetDrinksCount,
    noExtraDrinks: profiles.length === 0,
    sugarHigh: scores.sugarScore >= 5,
    caffeineHigh: scores.caffeineScore >= 5,
    hasCaffeine: scores.caffeineScore > 0,
    sweetnessInsight,
    light: profiles.length === 0 || (scores.sugarScore <= 1 && scores.caffeineScore <= 1)
  };
}

function getRecoveryLoadSignal(loadScore = calculateLoadScore()) {
  const activities = appState.activities || [];
  const loadTypes = getSelectedLoadTypes(activities);
  return {
    activities,
    loadTypes,
    primaryLoadType: getPrimaryLoadType(loadTypes),
    loadScore,
    high: loadScore >= 6,
    medium: loadScore >= 3 && loadScore < 6,
    light: loadScore < 3,
    hasHeavyCombo: activities.some((activity) => getActivityOptionByValue(activity)?.key === "longRun")
      && activities.some((activity) => getActivityOptionByValue(activity)?.key === "heavyPingPong")
  };
}

function getSelectedLoadTypes(activities = appState.activities || []) {
  return [...new Set(activities
    .map(getActivityOptionByValue)
    .filter(Boolean)
    .map((activity) => activity.type))];
}

function getPrimaryLoadType(loadTypes = []) {
  return loadTypePriority.find((type) => loadTypes.includes(type)) || "";
}

function getOrderedLoadTypes(loadTypes = []) {
  return loadTypePriority.filter((type) => loadTypes.includes(type));
}

function getLoadTypeReflections(signals = buildSignals(), { includeRecovery = false, limit = 1 } = {}) {
  return getOrderedLoadTypes(signals.recoveryLoad.loadTypes)
    .filter((type) => includeRecovery || type !== "recovery")
    .slice(0, limit)
    .map((type) => t(`loadTypeReflection.${type}`));
}

function getLoadTypeReflection(signals = buildSignals()) {
  return getLoadTypeReflections(signals, { limit: 1 })[0] || "";
}

function getLoadTypeTomorrowFocus(signals = buildSignals()) {
  const type = getOrderedLoadTypes(signals.recoveryLoad.loadTypes)[0];
  return type ? t(`tomorrowFocusByLoadType.${type}`) : "";
}

function getEnergySleepSignal(loadScore = calculateLoadScore()) {
  const energy = appState.selectedState.energy;
  const sleep = appState.selectedState.sleep;
  const causes = appState.energyCauses || [];
  const energyCausePattern = getEnergyCausePattern(energy, causes);
  const sleepLow = sleep === "น้อย" || causes.includes("sleep_low");
  const energyGood = energy === "ดี";
  const energyLow = energy === "ต่ำ";
  const lowResource = causes.some((cause) => ["low_water", "low_food", "sleep_low"].includes(cause));

  return {
    energy,
    sleep,
    causes,
    energyCausePattern,
    sleepLow,
    energyGood,
    energyLow,
    lowResource,
    endorphinBlindSpot: energyGood && (sleepLow || loadScore >= 6)
  };
}

function getEnergyCausePattern(energy = appState.selectedState.energy, causes = appState.energyCauses || []) {
  const depletionCauses = causes.filter(isDepletionEnergyCause);
  const supportCauses = causes.filter(isSupportEnergyCause);
  const hasDepletion = depletionCauses.length > 0;
  const hasSupport = supportCauses.length > 0;
  const hasStress = causes.includes("stress");
  const hasLightMind = causes.includes("light_mind");
  const energyLow = energy === "ต่ำ";
  const energyMedium = energy === "กลาง";
  const energyGood = energy === "ดี";
  let key = "";

  if (energyLow && hasLightMind) {
    key = "lowWithLightMind";
  } else if (energyLow && hasSupport) {
    key = "lowWithSupport";
  } else if (energyGood && hasStress) {
    key = "goodWithStress";
  } else if (energyGood && hasDepletion) {
    key = "goodWithDepletion";
  } else if (energyMedium && hasDepletion && hasSupport) {
    key = "mediumMixed";
  } else if (energyLow && hasDepletion) {
    key = "alignedLow";
  } else if (energyGood && hasSupport) {
    key = "alignedGood";
  } else if (hasDepletion && hasSupport) {
    key = "mediumMixed";
  }

  return {
    key,
    depletionCauses,
    supportCauses,
    hasDepletion,
    hasSupport,
    hasLayeredSignal: ["lowWithLightMind", "lowWithSupport", "goodWithStress", "goodWithDepletion", "mediumMixed"].includes(key)
  };
}

function getEnergyCauseConsistency(pattern = getEnergyCausePattern()) {
  if (!pattern.key) return "neutral";
  return pattern.hasLayeredSignal ? "layered" : "aligned";
}

function getEnergyCauseInsight(pattern = getEnergyCausePattern()) {
  return pattern.key ? t(`energyCauseInsight.${pattern.key}`) : "";
}

function isDepletionEnergyCause(cause) {
  return ["sleep_low", "heavy_exercise", "deep_work", "stress", "low_water", "low_food", "unknown"].includes(cause);
}

function isSupportEnergyCause(cause) {
  return ["enough_sleep", "light_mind"].includes(cause);
}

function getMindNoteSignal() {
  const mind = appState.selectedState.mind;
  const feeling = appState.mindNoteFeeling;
  const support = appState.mindNoteSupport;
  const feelingGood = mind === "รู้สึกดี";
  const relaxed = mind === "ผ่อนคลาย";
  return {
    mind,
    text: appState.mindNoteText || "",
    feeling,
    support,
    pressured: mind === "กดดัน" || feeling === "pressured",
    doublePressure: mind === "กดดัน" && feeling === "pressured",
    worried: mind === "กังวล" || feeling === "worried",
    feelingGood,
    relaxed,
    positive: feelingGood || relaxed,
    restFirst: support === "rest_first",
    hydrateGently: support === "hydrate_gently"
  };
}

function getMindfulReminder() {
  if (!hasMeaningfulTodayInput()) return t("nuTuenSaiEmptyReminder");
  return getReminderFromSignals(buildSignals());
}

function hasMeaningfulTodayInput() {
  const state = appState.selectedState || {};
  return (appState.waterMl || 0) > 0
    || (appState.drinkProfiles || []).length > 0
    || (appState.drinks || []).length > 0
    || (appState.activities || []).length > 0
    || (appState.energyCauses || []).length > 0
    || Boolean(state.energy || state.mind || state.sleep)
    || Boolean((appState.mindNoteText || "").trim())
    || Boolean(appState.mindNoteFeeling || appState.mindNoteSupport);
}

function getReminderFromSignals(signals) {
  if (signals.energySleep.endorphinBlindSpot && signals.energySleep.sleepLow && signals.recoveryLoad.high) return t("signalReminder.endorphin");
  if (signals.energySleep.sleepLow && signals.recoveryLoad.high) return t("signalReminder.sleepLoadRecovery");
  if (signals.drinkLoad.sweetnessInsight.reminderRelevant) return signals.drinkLoad.sweetnessInsight.text;
  if (signals.hydration.low && signals.drinkLoad.caffeineHigh) return t("signalReminder.hydrationCaffeine");
  if (signals.hydration.belowAdaptiveRange) return t("signalReminder.hydrationLoad");
  if (signals.hydration.recoveryOnlyHydration && (signals.hydration.low || signals.hydration.rising)) return t("signalReminder.hydrationRecovery");
  if (signals.drinkLoad.caffeineHigh) return t("signalReminder.caffeineBase");
  if (signals.mindNote.doublePressure) return t("signalReminder.doublePressure");
  if (signals.drinkLoad.sugarHigh) return t("signalReminder.sugarHigh");
  if (signals.mindNote.restFirst) return t("signalReminder.restFirst");
  if (signals.energySleep.energyCausePattern.hasLayeredSignal) return t("energyCauseReminder.layered");
  if (signals.mindNote.positive && signals.recoveryLoad.high) return t("signalReminder.positiveMindWithLoad");
  if (signals.mindNote.positive && (signals.energySleep.sleepLow || signals.energySleep.energyLow)) return t("signalReminder.positiveMindRecovery");
  if (signals.mindNote.positive) return t("signalReminder.positiveMind");
  if (signals.hydration.steady && signals.recoveryLoad.light) return t("signalReminder.consistency");
  if (signals.energySleep.endorphinBlindSpot) return t("signalReminder.endorphin");
  if (signals.energySleep.energyLow && signals.energySleep.lowResource) return t("signalReminder.resourceLow");
  if (signals.mindNote.pressured) return t("mindNoteReminder.pressured");
  if (signals.mindNote.worried) return t("mindNoteReminder.worried");
  if (signals.mindNote.hydrateGently) return t("mindNoteReminder.hydrate_gently");
  if (signals.energySleep.sleepLow) return t("reminder.lowSleep");
  if (signals.recoveryLoad.high) return t("reminder.highLoad");
  return t("reminder.steady");
}

function getMindNoteReminder() {
  if (appState.mindNoteFeeling === "pressured") return t("mindNoteReminder.pressured");
  if (appState.mindNoteFeeling === "worried") return t("mindNoteReminder.worried");
  if (appState.mindNoteSupport === "hydrate_gently") return t("mindNoteReminder.hydrate_gently");
  return "";
}

function generateReflectionWithPulse() {
  if (isGeneratingReflection) return;

  if (reflectionGenerationTimerId) {
    clearTimeout(reflectionGenerationTimerId);
  }

  appState.generatedReflection = ensureReflectionSignature(buildReflection());
  isEditingReflection = false;
  isGeneratingReflection = true;
  updateReflectionPreview();

  reflectionGenerationTimerId = setTimeout(() => {
    isGeneratingReflection = false;
    reflectionGenerationTimerId = null;
    updateReflectionPreview();
  }, getReflectionGenerationDelay());
}

function clearGeneratedReflection() {
  if (reflectionGenerationTimerId) {
    clearTimeout(reflectionGenerationTimerId);
    reflectionGenerationTimerId = null;
  }

  isGeneratingReflection = false;
  isEditingReflection = false;
  appState.generatedReflection = "";
  updateReflectionPreview();
}

function ensureReflectionSignature(text) {
  const trimmed = String(text || "").trimEnd();
  if (!trimmed) return "";
  return trimmed.endsWith(REFLECTION_SIGNATURE) ? trimmed : `${trimmed} ${REFLECTION_SIGNATURE}`;
}

function getReflectionGenerationDelay() {
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  return prefersReducedMotion ? 120 : REFLECTION_GENERATION_DELAY_MS;
}

function buildReflection() {
  return buildReflectionFromSignals(buildSignals());
}

function buildReflectionDisplay() {
  return buildReflectionDisplayFromSignals(buildSignals());
}

function buildReflectionDisplayFromSignals(signals) {
  return [
    getReflectionDisplayOverview(signals),
    getReflectionDisplayAdjustment(signals),
    getReflectionDisplayTomorrow(signals),
    getReflectionDisplayMindNote()
  ].filter(Boolean).join("\n\n");
}

function getReflectionDisplayOverview(signals) {
  const hydrationIsBase = signals.hydration.steady || signals.hydration.enough;
  const hasActivityLoad = signals.hydration.strongActivityHydration;
  const hasRecoveryOnly = isRecoveryOnlyReflection(signals);

  if (signals.energySleep.energyCausePattern.hasLayeredSignal) return t("reflectionDisplay.overviewEnergyLayered");
  if (signals.mindNote.positive && hasActivityLoad) return t("reflectionDisplay.overviewPositiveMindActivity");
  if (hasActivityLoad && hydrationIsBase) return t("reflectionDisplay.overviewActivityHydrated");
  if (hasActivityLoad) return t("reflectionDisplay.overviewActivity");
  if (signals.mindNote.positive && hasRecoveryOnly) return t("reflectionDisplay.overviewPositiveMindRecovery");
  if (hasRecoveryOnly && hydrationIsBase && signals.mindNote.restFirst) return t("reflectionDisplay.overviewRecoveryHydratedRest");
  if (hasRecoveryOnly && hydrationIsBase) return t("reflectionDisplay.overviewRecoveryHydrated");
  if (hasRecoveryOnly) return t("reflectionDisplay.overviewRecovery");
  if (signals.mindNote.positive) return t("reflectionDisplay.overviewPositiveMindSupport");
  if (signals.drinkLoad.caffeineHigh) return t("reflectionDisplay.overviewCaffeine");
  if (hydrationIsBase) return t("reflectionDisplay.overviewSteadyHydration");
  return t("reflectionDisplay.overviewBase");
}

function getReflectionDisplayAdjustment(signals) {
  if (signals.energySleep.energyCausePattern.hasLayeredSignal) return t("reflectionDisplay.adjustEnergyLayered");
  if (signals.drinkLoad.sweetnessInsight.previewRelevant) return signals.drinkLoad.sweetnessInsight.text;
  if (signals.hydration.strongActivityHydration) return t("reflectionDisplay.adjustActivity");
  if (isRecoveryOnlyReflection(signals)) return t("reflectionDisplay.adjustRecovery");
  if (signals.drinkLoad.caffeineHigh) return t("reflectionDisplay.adjustCaffeine");
  if (signals.hydration.low || signals.hydration.rising) return t("reflectionDisplay.adjustWater");
  return t("reflectionDisplay.adjustSteady");
}

function getReflectionDisplayTomorrow(signals) {
  if (signals.energySleep.energyCausePattern.hasLayeredSignal) return t("reflectionDisplay.tomorrowEnergyLayered");
  if (signals.hydration.strongActivityHydration) return t("reflectionDisplay.tomorrowActivity");
  if (isRecoveryOnlyReflection(signals)) return t("reflectionDisplay.tomorrowRecovery");
  if (signals.drinkLoad.caffeineHigh) return t("reflectionDisplay.tomorrowCaffeine");
  if (signals.mindNote.positive) return t("reflectionDisplay.tomorrowPositiveMind");
  return t("reflectionDisplay.tomorrowSteady");
}

function getReflectionDisplayMindNote() {
  const summary = getCompactMindNoteSummary();
  return summary ? t("reflectionDisplay.mindNote", { note: summary }) : "";
}

function getCompactMindNoteSummary() {
  const parts = [];
  if (appState.mindNoteSupport) parts.push(localizeMindNoteValue("Mind_Note_Support", appState.mindNoteSupport));
  if (appState.mindNoteFeeling) parts.push(localizeMindNoteValue("Mind_Note_Feeling", appState.mindNoteFeeling));
  if (parts.length) return parts.join(" / ");
  return truncateText(appState.mindNoteText || "", 80);
}

function isRecoveryOnlyReflection(signals) {
  if (signals.hydration.strongActivityHydration) return false;
  return signals.hydration.recoveryOnlyHydration
    || signals.energySleep.sleepLow
    || signals.energySleep.energyLow
    || signals.mindNote.pressured
    || signals.mindNote.worried
    || signals.mindNote.restFirst;
}

function truncateText(value, limit) {
  const text = String(value || "").trim();
  if (text.length <= limit) return text;
  return `${text.slice(0, limit - 1).trim()}…`;
}

function buildReflectionFromSignals(signals) {
  const goodThings = [];
  const adjustments = [];
  const loadTypeAdjustments = getLoadTypeReflections(signals, { limit: 2 });
  const sweetnessInsight = signals.drinkLoad.sweetnessInsight;

  if (signals.hydration.steady && signals.recoveryLoad.light) {
    goodThings.push(t("signalReflection.goodConsistency"));
  } else if (signals.drinkLoad.noExtraDrinks) {
    goodThings.push(t("signalReflection.noExtraDrinks"));
  } else if (signals.hydration.waterMl > 0) {
    goodThings.push(t("reflection.waterSeen", { water: signals.hydration.waterMl }));
  }
  if (appState.selectedState.energy || appState.selectedState.mind || appState.selectedState.sleep) {
    goodThings.push(t("reflection.checkedState"));
  }
  const positiveMindNote = getPositiveMindReflectionNote(signals);
  if (positiveMindNote) goodThings.push(positiveMindNote);
  if (sweetnessInsight.hasDrinks && sweetnessInsight.key === "low") {
    goodThings.push(sweetnessInsight.text);
  }
  if (!goodThings.length) goodThings.push(t("reflection.openedPattern"));

  if (signals.energySleep.endorphinBlindSpot) {
    adjustments.push(t("signalReflection.endorphin"));
  } else if (signals.energySleep.sleepLow && signals.recoveryLoad.high) {
    adjustments.push(t("signalReflection.sleepLoadRecovery"));
  } else if (signals.hydration.low && signals.drinkLoad.caffeineHigh) {
    adjustments.push(t("signalReflection.hydrationCaffeine"));
  } else if (signals.hydration.belowAdaptiveRange) {
    adjustments.push(t("signalReflection.hydrationLoad"));
  } else if (signals.hydration.recoveryOnlyHydration && (signals.hydration.low || signals.hydration.rising)) {
    adjustments.push(t("signalReflection.hydrationRecovery"));
  } else if (signals.mindNote.doublePressure) {
    adjustments.push(t("signalReflection.pressure"));
  } else if (signals.energySleep.energyLow && signals.energySleep.lowResource) {
    adjustments.push(t("signalReflection.resourceLow"));
  } else if (sweetnessInsight.detailRelevant) {
    adjustments.push(sweetnessInsight.text);
  } else if (signals.drinkLoad.sugarHigh) {
    adjustments.push(t("drinkReflection.sugar"));
  } else if (signals.drinkLoad.caffeineHigh) {
    adjustments.push(t("drinkReflection.caffeine"));
  } else if (signals.hydration.low) {
    adjustments.push(t("signalReflection.steadyHydration"));
  } else if (signals.recoveryLoad.high) {
    adjustments.push(t("reflection.stopPush"));
  }
  loadTypeAdjustments.forEach((note) => {
    if (!adjustments.includes(note)) adjustments.push(note);
  });
  if (sweetnessInsight.detailRelevant && !adjustments.includes(sweetnessInsight.text)) {
    adjustments.push(sweetnessInsight.text);
  }
  if (!adjustments.length) adjustments.push(t("reflection.keepBalance"));

  const energyCauseNote = getEnergyCauseReflectionNote();

  return [
    `${t("reflection.good")} ${goodThings.join(" / ")}`,
    `${t("reflection.adjust")} ${adjustments.join(" / ")}`,
    energyCauseNote.trim(),
    `${t("reflection.recovery")} ${getRecoveryNote(signals)}`,
    `${t("reflection.hydration")} ${getHydrationNoteFromSignals(signals)}`,
    `${t("reflection.tomorrow")} ${getTomorrowFocus(signals)}`,
    `${t("reflection.mindNote")} ${getMindNoteSummary()}`,
    `${t("reflection.mindHolding")} ${appState.mindNoteText?.trim() || t("reflection.noMindNote")}`,
    `${t("reflection.reminder")} ${getReminderFromSignals(signals)}`,
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

function getPositiveMindReflectionNote(signals = buildSignals()) {
  if (signals.mindNote.feelingGood) return t("signalReflection.positiveMindFeelingGood");
  if (signals.mindNote.relaxed) return t("signalReflection.positiveMindRelaxed");
  return "";
}

function getEnergyCauseReflectionNote() {
  const causes = appState.energyCauses || [];
  if (!causes.length) return "";
  const pattern = getEnergyCausePattern();
  const insight = getEnergyCauseInsight(pattern);

  if (insight) return insight;

  const positiveCauses = causes.filter(isSupportEnergyCause);
  const otherCauses = causes.filter((cause) => !isSupportEnergyCause(cause));
  const notes = [];

  if (otherCauses.length) {
    notes.push(t("drinkReflection.energyCauses", {
      causes: otherCauses.map((cause) => t(`options.energyCauses.${cause}`)).join(" / ")
    }));
  }

  positiveCauses.forEach((cause) => {
    notes.push(t(`drinkReflection.energyCause.${cause}`));
  });

  return notes.join("\n");
}

function getMindNoteSummary() {
  const parts = [];
  if (appState.mindNoteFeeling) parts.push(localizeMindNoteValue("Mind_Note_Feeling", appState.mindNoteFeeling));
  if (appState.mindNoteSupport) parts.push(localizeMindNoteValue("Mind_Note_Support", appState.mindNoteSupport));
  return parts.length ? parts.join(" / ") : t("reflection.noMindNote");
}

function getRecoveryNote(signals = buildSignals()) {
  if (signals.energySleep.endorphinBlindSpot) return t("recoveryNote.endorphin");
  if (signals.energySleep.sleepLow && signals.recoveryLoad.high) return t("recoveryNote.sleepLoadHigh");
  const loadTypeNote = getLoadTypeReflection(signals);
  if (loadTypeNote) return loadTypeNote;
  if (signals.recoveryLoad.high) return t("recoveryNote.high");
  if (signals.energySleep.sleepLow) return t("recoveryNote.lowSleep");
  if (signals.recoveryLoad.medium) return t("recoveryNote.medium");
  return t("recoveryNote.light");
}

function getHydrationNoteFromSignals(signals = buildSignals()) {
  if (signals.hydration.low && signals.drinkLoad.caffeineHigh) return t("signalReflection.hydrationCaffeine");
  if (signals.hydration.adaptiveRaised) return signals.hydration.adaptiveGuidance;
  if (signals.hydration.recoveryOnlyHydration) return signals.hydration.adaptiveGuidance;
  return signals.hydration.status;
}

function getTomorrowFocus(signals = buildSignals()) {
  if (signals.energySleep.sleepLow && signals.recoveryLoad.high) return t("tomorrowFocus.recovery");
  if (signals.energySleep.energyCausePattern.hasLayeredSignal) return t("tomorrowFocus.energyLayered");
  if (signals.mindNote.restFirst) return t("tomorrowFocus.restNoGuilt");
  if (signals.hydration.low && signals.drinkLoad.caffeineHigh) return t("tomorrowFocus.water");
  if (signals.hydration.belowAdaptiveRange) return t("tomorrowFocus.hydrationLoad");
  if (signals.hydration.recoveryOnlyHydration && (signals.hydration.low || signals.hydration.rising)) return t("tomorrowFocus.hydrationRecovery");
  const loadTypeFocus = getLoadTypeTomorrowFocus(signals);
  if (loadTypeFocus) return loadTypeFocus;
  if (signals.drinkLoad.caffeineHigh) return t("tomorrowFocus.caffeine");
  if (signals.recoveryLoad.high || signals.energySleep.sleepLow) return t("tomorrowFocus.recovery");
  if (signals.hydration.low || signals.hydration.rising) return t("tomorrowFocus.water");
  if (signals.drinkLoad.sugarHigh || signals.drinkLoad.sweetDrinksCount >= 1) return t("tomorrowFocus.sweet");
  return t("tomorrowFocus.steady");
}

function buildDailyLogRow() {
  const reflection = ensureReflectionSignature(appState.generatedReflection || buildReflection());
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
  appState.generatedReflection = ensureReflectionSignature(appState.generatedReflection || buildReflection());
  localStorage.setItem(storageKey(), JSON.stringify(appState));
  document.querySelector("#saveStatus").textContent = t("saveTodayDone");
  syncUI();
}

function resetCurrentForm() {
  if (!confirm(t("resetCurrentFormConfirm"))) return;

  isEditingReflection = false;
  appState = structuredClone(defaultState);
  localStorage.removeItem(storageKey());
  resetDrinkProfileForm();
  syncUI();
  document.querySelector("#saveStatus").textContent = t("resetCurrentFormDone");
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
  appState.generatedReflection = ensureReflectionSignature(appState.generatedReflection || buildReflection());

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
  const fieldContextSheet = XLSX.utils.json_to_sheet(buildFieldContextRows(), {
    header: ["Section", "Value"]
  });
  const fieldReviewSheet = XLSX.utils.json_to_sheet([buildFieldReview(rows)]);

  XLSX.utils.book_append_sheet(workbook, dailySheet, "Daily_Log");
  XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");
  XLSX.utils.book_append_sheet(workbook, reflectionSheet, "Reflections");
  XLSX.utils.book_append_sheet(workbook, fieldContextSheet, "Field_Context");
  XLSX.utils.book_append_sheet(workbook, fieldReviewSheet, "Field_Review");
  XLSX.writeFile(workbook, "Mindful_Health_Balance_Master.xlsx");
  document.querySelector("#saveStatus").textContent = t("exportedMaster");
}

function buildFieldContextRows() {
  return [
    {
      Section: "File_Purpose",
      Value: "Local-first self-care log for pattern reflection."
    },
    {
      Section: "Data_Ownership",
      Value: "The user owns this file and chooses when to export, keep, review, or share it."
    },
    {
      Section: "Local_First_Data_Handling",
      Value: "The app stores data in the user's browser/localStorage and exports a portable workbook. Exporting does not imply upload or cloud sync."
    },
    {
      Section: "AI_Reading_Boundary",
      Value: "Read this file for lifestyle, recovery, mind-state, and self-care pattern reflection only. Do not use it for diagnosis."
    },
    {
      Section: "Non_Medical_Note",
      Value: "This workbook is not medical advice, not a diagnosis, and not a replacement for professional care."
    },
    {
      Section: "Suggested_AI_Reading_Style",
      Value: "Look for relationships across hydration, drinks, sleep, load, activities, mind state, support need, mind note, reflection, and tomorrow focus."
    },
    {
      Section: "Avoid",
      Value: "Diagnostic claims, fear-based wording, moral judgment, or prescriptive medical advice."
    },
    {
      Section: "Human_Agency",
      Value: "The AI should support the user's reflection, not become the authority over the user's life."
    },
    {
      Section: "App_Concept",
      Value: "Portable Field Memory / LLI Field Dataset / Personal Rhythm Dataset."
    }
  ];
}

function buildFieldReview(rows = []) {
  const cleanRows = rows
    .filter((row) => row && row.Date)
    .map(normalizeLogRow)
    .sort((a, b) => String(a.Date).localeCompare(String(b.Date)));
  const totalDays = cleanRows.length;
  const waterValues = cleanRows.map((row) => Number(row.Water_ml) || 0);
  const averageWater = totalDays
    ? Math.round(waterValues.reduce((sum, value) => sum + value, 0) / totalDays)
    : 0;
  const mindStates = cleanRows.map((row) => row.Mind).filter(Boolean);
  const supportNeeds = cleanRows.map((row) => row.Mind_Note_Support).filter(Boolean);
  const sweetDrinkDays = cleanRows.filter(rowHasSweetDrinkLoad).length;
  const highSugarDays = cleanRows.filter(rowHasHighSugarLoad).length;
  const sodaDays = cleanRows.filter(rowHasSodaDrink).length;

  return {
    Review_Period_Start: cleanRows[0]?.Date || "",
    Review_Period_End: cleanRows[totalDays - 1]?.Date || "",
    Total_Days: totalDays,
    Average_Water_ml: averageWater,
    Highest_Water_ml: totalDays ? Math.max(...waterValues) : 0,
    Lowest_Water_ml: totalDays ? Math.min(...waterValues) : 0,
    High_Load_Days: cleanRows.filter(isHighLoadRow).length,
    Low_Energy_Days: cleanRows.filter((row) => isLowEnergyValue(row.Energy)).length,
    Common_Mind_States: getCommonValues(mindStates, 3),
    Common_Support_Needs: getCommonValues(supportNeeds, 3),
    Days_With_Mind_Note: cleanRows.filter((row) => String(row.Mind_Note_Text || "").trim()).length,
    Days_With_Reflection: cleanRows.filter((row) => String(row.Reflection_Text || "").trim()).length,
    Days_With_Caffeine: cleanRows.filter((row) => Number(row.Caffeine_Score) > 0).length,
    Days_With_Sweet_Drinks: sweetDrinkDays,
    High_Sugar_Days: highSugarDays,
    Soda_Days: sodaDays,
    Days_With_Sport_or_Run: cleanRows.filter((row) => rowHasActivityGroup(row, "sports")).length,
    Days_With_Deep_Work: cleanRows.filter(rowHasDeepWork).length,
    Gentle_Observation: getFieldReviewObservation(cleanRows),
    Drink_Load_Observation: getDrinkLoadObservation(cleanRows, { sweetDrinkDays, highSugarDays, sodaDays }),
    Non_Diagnostic_Note: "Descriptive self-care summary only. Not medical advice, not diagnosis, and not a replacement for professional care."
  };
}

function getCommonValues(values, limit = 3) {
  const counts = values.reduce((acc, value) => {
    const key = String(value || "").trim();
    if (key) acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([value, count]) => `${value} (${count})`)
    .join(" | ");
}

function isHighLoadRow(row) {
  return Number(row.Load_Score) >= 6 || ["Load สูง", "High load", "Load 高"].includes(row.Load_Level);
}

function isLowEnergyValue(value) {
  return ["ต่ำ", "Low", "低"].includes(String(value || "").trim());
}

function rowHasActivityGroup(row, group) {
  return splitLogValues(row.Activities)
    .map(getActivityOptionByValue)
    .filter(Boolean)
    .some((activity) => activity.group === group);
}

function rowHasDeepWork(row) {
  return splitLogValues(row.Activities)
    .map(getActivityOptionByValue)
    .filter(Boolean)
    .some((activity) => activity.key === "deepWork");
}

function rowHasSweetDrinkLoad(row) {
  return Number(row.Sweet_Drinks_Count) > 0 || Number(row.Sugar_Score) >= 2 || parseDrinkProfilesFromRow(row)
    .some((profile) => ["normal", "high"].includes(profile.sweetness));
}

function rowHasHighSugarLoad(row) {
  return Number(row.Sugar_Score) >= 5 || parseDrinkProfilesFromRow(row)
    .some((profile) => profile.sweetness === "high");
}

function rowHasSodaDrink(row) {
  return parseDrinkProfilesFromRow(row).some((profile) => profile.type === "soda")
    || splitLogValues(row.Drinks).some((drink) => {
      const option = getDrinkMetaByLegacyLabel(drink);
      return option?.type === "soda";
    });
}

function parseDrinkProfilesFromRow(row) {
  try {
    const parsed = JSON.parse(row.Drink_Profile_JSON || "[]");
    return Array.isArray(parsed) ? parsed.map(normalizeDrinkProfile) : [];
  } catch {
    return [];
  }
}

function splitLogValues(value) {
  return String(value || "")
    .split("|")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function getFieldReviewObservation(rows = []) {
  if (!rows.length) {
    return "No daily log entries are available in this export. Summary is limited by available entries.";
  }

  if (rows.length < 3) {
    return "Summary is limited by available entries. Use this sheet as a gentle starting point for pattern reflection.";
  }

  return "This is a lightweight descriptive review across available entries. Look for relationships gently, without diagnosis or moral judgment.";
}

function getDrinkLoadObservation(rows = [], { sweetDrinkDays = 0, highSugarDays = 0, sodaDays = 0 } = {}) {
  if (!rows.length) {
    return "No drink-load pattern is available yet.";
  }

  if (!sweetDrinkDays && !sodaDays) {
    return "Sweetness load appears light in the available entries. Keep reading drinks as context, not as a moral score.";
  }

  if (highSugarDays) {
    return "Some days include higher sweetness load. Review this gently alongside caffeine, hydration, sleep, load, and recovery.";
  }

  if (sodaDays) {
    return "Soda appears in the available entries. Read it by its logged sweetness and caffeine, not as a judgment by category.";
  }

  return "Some drink sweetness appears in the available entries. Use it as a pattern signal, not as guilt or diet advice.";
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
  if (column === "Tomorrow_Focus") {
    const tomorrowText = localizeKnownText(value, "tomorrowFocus");
    if (tomorrowText !== value) return tomorrowText;
    return localizeKnownText(value, "tomorrowFocusByLoadType");
  }
  if (column === "NuTuenSai_Reminder") {
    const reminderText = localizeKnownText(value, "reminder");
    if (reminderText !== value) return reminderText;
    const mindNoteText = localizeKnownText(value, "mindNoteReminder");
    if (mindNoteText !== value) return mindNoteText;
    return localizeKnownText(value, "signalReminder");
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

  const mindNoteAliases = {
    feeling: {
      "นิ่ง": "calm",
      "เฉย ๆ": "calm",
      "Calm": "calm",
      "Neutral": "calm",
      "平静": "calm",
      "一般": "calm"
    },
    support: {}
  };
  const aliasKey = mindNoteAliases[group]?.[key];
  if (aliasKey) return t(`options.mindNote.${group}.${aliasKey}`);

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
      "เฉย ๆ": "options.mind.calm",
      "Calm": "options.mind.calm",
      "Neutral": "options.mind.calm",
      "平静": "options.mind.calm",
      "一般": "options.mind.calm",
      "กังวล": "options.mind.worried",
      "Worried": "options.mind.worried",
      "担心": "options.mind.worried",
      "กดดัน": "options.mind.pressured",
      "Pressured": "options.mind.pressured",
      "有压力": "options.mind.pressured",
      "ฟุ้ง": "options.mind.scattered",
      "Scattered": "options.mind.scattered",
      "分散": "options.mind.scattered",
      "รู้สึกดี": "options.mind.feeling_good",
      "Feeling good": "options.mind.feeling_good",
      "感觉不错": "options.mind.feeling_good",
      "ผ่อนคลาย": "options.mind.relaxed",
      "Relaxed": "options.mind.relaxed",
      "放松": "options.mind.relaxed"
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
      const option = translationGroup === "activities"
        ? getActivityOptionByValue(entry)
        : options.find((item) => item.label === entry || t(`options.${translationGroup}.${item.key}`) === entry);
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
