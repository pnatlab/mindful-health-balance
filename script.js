const STORAGE_PREFIX = "mindfulHealthBalance";
const DAILY_LOG_KEY = "mindfulHealthDailyLog";
const LANGUAGE_KEY = "mindfulHealthLanguage";
const WELCOME_KEY_PREFIX = "mindfulHealthWelcomeSeen";
const THEME_KEY = "mindfulHealthTheme";
const CURRENT_FORM_CLEARED_PREFIX = "mindfulHealthCurrentFormCleared";
const USER_INTENTION_PROFILE_KEY = "mhb_user_intention_profile_v1";
const USER_INTENTION_PROFILE_SCHEMA_VERSION = "1.0";
const USER_INTENTION_PROFILE_SHEET_NAME = "User_Intention_Profile";
const USER_INTENTION_PROFILE_EXPORT_COLUMNS = [
  "Profile_Schema_Version",
  "Display_Name",
  "Address_Style",
  "Preferred_Tone",
  "User_Context_Note",
  "Do_Not_Assume_Note",
  "Birth_Date",
  "Birth_Year",
  "Updated_At"
];
const DAILY_LOG_COLUMNS = window.DAILY_LOG_COLUMNS;
const COLUMN_GUIDE_HEADERS = window.COLUMN_GUIDE_HEADERS;
const AI_CONTEXT_HEADERS = window.AI_CONTEXT_HEADERS;
const REFLECTION_ROOT_MATRIX = window.REFLECTION_ROOT_MATRIX;
const REFLECTION_ROOT_SIGNAL_GROUPS = window.REFLECTION_ROOT_SIGNAL_GROUPS;
const cloneReflectionRootArray = window.cloneReflectionRootArray;
const normalizeReflectionRoot = window.normalizeReflectionRoot;
const isSupportedReflectionRoot = window.isSupportedReflectionRoot;
const getReflectionRootConfig = window.getReflectionRootConfig;
const getReflectionRootLanguage = window.getReflectionRootLanguage;
const getReflectionRootLabel = window.getReflectionRootLabel;
const getReflectionRootDeclaration = window.getReflectionRootDeclaration;
const getReflectionRootSignalGroups = window.getReflectionRootSignalGroups;
const getReflectionRootSignalWeights = window.getReflectionRootSignalWeights;
const getReflectionRootBoundaryTags = window.getReflectionRootBoundaryTags;

const translations = {
  th: {
    code: "th",
    locale: "th-TH",
    htmlLang: "th",
    eyebrow: "Personal mindful dashboard",
    appShortTitle: "Mindful Health Balance",
    title: "Mindful Health Balance by MSxAI",
    version: "v2.1 — Gentle Mind Note",
    subtitle: "แอปบันทึกจังหวะชีวิตแบบ local-first พร้อม Field Review และ Signal Engine",
    viewTabsAria: "เลือกมุมมองของแอป",
    tabToday: "วันนี้",
    tabReflection: "Reflection/NuTuenSai",
    tabFieldReview: "ประมวลข้อมูล",
    tabLog: "Log",
    todayViewTitle: "สัญญาณวันนี้",
    todayStepOneLabel: "สัญญาณวันนี้ 1/2",
    todayStepTwoLabel: "ภาวะใจวันนี้ 2/2",
    todayStepSwitcherAria: "สลับระหว่างหน้าสัญญาณวันนี้และภาวะใจวันนี้",
    todayStepOneHelper: "ค่อย ๆ เติมสัญญาณวันนี้: ภาวะใจ น้ำ เครื่องดื่ม และงาน/กิจกรรม",
    honestDataTodayNote: "เติมเท่าที่จริงก็พอ ข้อมูลที่จริงสำคัญกว่าข้อมูลที่ครบ",
    honestDataBlankNote: "ช่องที่เว้นไว้จะถูกอ่านว่าไม่ได้บันทึก ไม่ใช่ความผิดหรือคะแนนที่หายไป",
    todayStepTwoHelper: "วางภาวะใจสั้น ๆ ก่อนพาไป Reflection/NuTuenSai",
    dailySaveStatusEmpty: "วันนี้ยังไม่มี Daily Log — เติมเท่าที่จริงแล้วบันทึกเมื่อพร้อม",
    dailySaveStatusPartial: "วันนี้บันทึกแล้ว: {savedSections} · ยังเว้นไว้ได้: {unsavedSections}",
    dailySaveStatusSaved: "บันทึกแล้ววันนี้: {savedSections} — ยังแก้เพิ่มได้โดยไม่ลบข้อมูลเดิม",
    dailySaveStatusSavedNone: "วันนี้มี Daily Log แล้ว — ช่องที่เว้นไว้ยังแปลว่าไม่ได้บันทึก",
    dailySaveSectionSignals: "สัญญาณวันนี้",
    dailySaveSectionMindNote: "ภาวะใจ / Mind Note",
    dailySaveSectionReflection: "Reflection",
    todayStepNext: "ถัดไป: ภาวะใจวันนี้ 2/2",
    todayStepBack: "กลับไปหน้า 1/2",
    todayStepReflection: "ไป Reflection/NuTuenSai",
    todayCurrentFormSummaryTitle: "Current Form",
    todayCurrentFormSummaryText: "ข้อมูลที่กรอกไว้ยังอยู่ในฟอร์มปัจจุบัน ไป Reflection/NuTuenSai เพื่อทบทวนและบันทึกเมื่อพร้อม",
    dailySignalCockpitKicker: "Daily Signal Cockpit",
    dailySignalCockpitTitle: "แผงสัญญาณวันนี้",
    dailySignalCockpitHelper: "เลือกหมวดเพื่อเติมรายละเอียดทีละสัญญาณ",
    cockpitStateLabel: "ภาวะใจวันนี้",
    cockpitWaterLabel: "น้ำ",
    cockpitDrinksLabel: "เครื่องดื่ม",
    cockpitWorkActivityLabel: "งาน / กิจกรรม",
    cockpitStatusEmpty: "ยังว่าง",
    cockpitStatusPartial: "เริ่มมีข้อมูล",
    cockpitStatusComplete: "พออ่านได้แล้ว",
    cockpitStateEmpty: "ยังไม่มีภาวะใจวันนี้",
    cockpitStateSummary: "{items}",
    cockpitWaterEmpty: "0 ml",
    cockpitWaterSummary: "{water} ml",
    cockpitDrinksEmpty: "ยังไม่มีเครื่องดื่ม",
    cockpitDrinksSummary: "{count} รายการ",
    cockpitDrinksLoadSummary: "{count} รายการ · Sugar {sugar} / Caffeine {caffeine}",
    cockpitLoadEmpty: "ยังไม่เลือกกิจกรรม",
    cockpitLoadSummary: "{level} · {activity}",
    cockpitLoadLight: "จังหวะเบา",
    cockpitLoadMedium: "ใช้แรงพอดี",
    cockpitLoadHeavy: "ใช้แรงต่อเนื่อง",
    cockpitHydrationReturningBase: "กำลังกลับฐาน",
    cockpitHydrationBaseVisible: "ฐานน้ำเริ่มนิ่ง",
    cockpitCaffeineHigh: "caffeine สูง",
    cockpitSweetVisible: "ความหวานมีสัญญาณ",
    cockpitBalanceEmpty: "ยังฟังสัญญาณไม่ครบ",
    cockpitBalanceOne: "เริ่มเห็นวันนี้แล้ว",
    cockpitBalanceReadable: "วันนี้พออ่าน pattern ได้",
    cockpitBalanceReady: "พร้อมพาไป Reflection",
    reflectionViewTitle: "Reflection",
    reflectionViewHelper: "ตรวจดู reflection จากข้อมูลวันนี้ แล้วค่อยบันทึกเป็น Daily Log เมื่อพร้อม",
    reflectionGeneratorHelper: "กดสรุปวันนี้เพื่อให้ระบบสะท้อน pattern จากข้อมูลวันนี้ และยังแก้ไขเล็กน้อยก่อนบันทึกได้",
    reflectionActionsKicker: "Ready to save",
    reflectionRootPickerKicker: "Reflection Root",
    reflectionRootPickerTitle: "วันนี้อยากให้หนูอ่านผ่านแกนไหนเป็นหลักนะคะ",
    reflectionRootPickerHelper: "เลือกแกนสังเกตเบา ๆ ให้ NuTuenSai ใช้เป็นจุดตั้งต้นของ Reflection รอบนี้ ข้อมูลอื่นจะยังเป็นเพียงบริบทประกอบค่ะ",
    reflectionRootSelectedLabel: "แกนที่เลือก: {root}",
    reflectionRootBoundaryDefault: "ยังไม่ใช่ข้อสรุป และไม่ใช่คำแนะนำทางการแพทย์นะคะ เป็นเพียงจุดตั้งต้นของการสังเกต",
    reflectionRootBoundaryMind: "บริบทใจยังเป็นความหมายที่พี่เป็นเจ้าของเอง หนูจะช่วยสะท้อน ไม่สรุปแทนค่ะ",
    reflectionRootBoundaryPractice: "การภาวนาเป็นบริบทของการดูแลใจ ไม่ใช่คะแนนหรือการวัดความสำเร็จค่ะ",
    reflectionRootBoundaryDrinks: "อ่านเป็นบริบทของวัน ไม่ใช่การตัดสินอาหาร เครื่องดื่ม หรือสุขภาพค่ะ",
    reflectionRootOptionAuto: "Auto",
    reflectionRootOptionHydration: "น้ำ",
    reflectionRootOptionSleep: "การพัก",
    reflectionRootOptionLoad: "กิจกรรม",
    reflectionRootOptionDrinks: "เครื่องดื่ม",
    reflectionRootOptionMind: "ใจ",
    reflectionRootOptionPractice: "การภาวนา",
    reflectionRootPreviewAuto: "ให้หนูวางแกนแบบเบา ๆ จากข้อมูลที่พี่บันทึกไว้ โดยยังไม่สรุปแทนพี่นะคะ",
    reflectionRootPreviewHydration: "รอบนี้หนูจะอ่านผ่านแกน ‘น้ำ’ เป็นหลัก แล้วใช้กิจกรรม เครื่องดื่ม และบริบทของวันเป็นฉากประกอบค่ะ",
    reflectionRootPreviewSleep: "รอบนี้หนูจะอ่านผ่านแกน ‘การพัก/การนอน’ เป็นหลัก แล้วอ่านคาเฟอีน โหลดของวัน และพลังงานเป็นบริบทประกอบค่ะ",
    reflectionRootPreviewLoad: "รอบนี้หนูจะอ่านผ่านแกน ‘กิจกรรม/ภาระของวัน’ เป็นหลัก แล้วดูว่าน้ำ การพัก และพลังงานอยู่รอบ ๆ จังหวะนั้นอย่างไรค่ะ",
    reflectionRootPreviewDrinks: "รอบนี้หนูจะอ่านผ่านแกน ‘เครื่องดื่ม/คาเฟอีน/ความหวาน’ เป็นหลัก โดยไม่ตัดสินเครื่องดื่ม สุขภาพ หรือทางเลือกของพี่ค่ะ",
    reflectionRootPreviewMind: "รอบนี้หนูจะให้พื้นที่กับ ‘บริบทใจ’ ที่พี่บันทึกไว้เป็นหลัก โดยไม่สรุปใจแทนพี่ค่ะ",
    reflectionRootPreviewPractice: "รอบนี้หนูจะอ่าน ‘การภาวนา/การดูแลใจ’ เป็นบริบทของวัน ไม่ใช่คะแนน ไม่ใช่ถูกหรือผิดค่ะ",
    reflectionRootOpeningHydration: "รอบนี้หนูขออ่านผ่านแกน ‘น้ำ’ เป็นหลักนะคะ",
    reflectionRootOpeningSleep: "รอบนี้หนูขออ่านผ่านแกน ‘การพัก/การนอน’ เป็นหลักนะคะ",
    reflectionRootOpeningLoad: "รอบนี้หนูขออ่านผ่านแกน ‘กิจกรรม/ภาระของวัน’ เป็นหลักนะคะ",
    reflectionRootOpeningDrinks: "รอบนี้หนูขออ่านผ่านแกน ‘เครื่องดื่ม/คาเฟอีน/ความหวาน’ เป็นหลักนะคะ",
    reflectionRootOpeningMind: "รอบนี้หนูขอให้พื้นที่กับ ‘บริบทใจ’ ที่พี่บันทึกไว้เป็นหลักนะคะ",
    reflectionRootOpeningPractice: "รอบนี้หนูขออ่าน ‘การภาวนา/การดูแลใจ’ เป็นบริบทหลักของวันนะคะ",
    reflectionRootHintHydration: "ปริมาณน้ำที่พี่บันทึกไว้เป็นจุดตั้งต้นของรอบนี้ ส่วนกิจกรรม เครื่องดื่ม และบริบทของวันจะถูกอ่านเป็นฉากประกอบค่ะ",
    reflectionRootHintSleep: "ชั่วโมงนอนและสัญญาณการพักเป็นจุดตั้งต้น ส่วนคาเฟอีน load ของวัน และพลังงานจะถูกอ่านเป็นบริบทประกอบค่ะ",
    reflectionRootHintLoad: "กิจกรรม งาน หรือแรงใช้ของวันจะมาก่อน แล้วหนูค่อยดูว่าน้ำ การพัก และพลังงานอยู่รอบ ๆ จังหวะนั้นอย่างไรค่ะ",
    reflectionRootHintDrinks: "เครื่องดื่ม คาเฟอีน และบริบทความหวานจะเป็นแกนหลักของรอบนี้ โดยอ่านร่วมกับการนอน load และพลังงานแบบไม่ตัดสินค่ะ",
    reflectionRootHintMind: "Mind Note และบริบทใจที่พี่บันทึกไว้จะเป็นแกนหลัก หนูจะช่วยสะท้อนโดยไม่สรุปใจแทนพี่ค่ะ",
    reflectionRootHintPractice: "เวลาภาวนาและบันทึกการดูแลใจจะถูกอ่านเป็นบริบทของวัน ไม่ใช่คะแนนหรือการวัดความสำเร็จค่ะ",
    reflectionRootHintThin: "แกนนี้ยังมีข้อมูลไม่มากนัก หนูเลยจะอ่านแบบเบา ๆ และไม่สรุปเกินสิ่งที่พี่บันทึกไว้ค่ะ",
    todayInputShortcutsAria: "Today input shortcuts",
    backToSignalCockpit: "กลับไปแผงสัญญาณ",
    backToTodayStepOne: "กลับ Today 1/2",
    backToTodayStepTwo: "กลับ Mind Note 2/2",
    logViewTitle: "Log & Export",
    logViewHelper: "ดูบันทึกย้อนหลังและจัดการไฟล์ backup ของระบบ",
    logControlsTitle: "Backup Controls",
    fieldReviewViewTitle: "ประมวลจังหวะจาก Daily_Log",
    fieldReviewViewHelper: "หนูตื่นสายอ่านข้อมูลที่พี่บันทึกไว้ในช่วงที่เลือก เพื่อช่วยเห็น pattern อย่างมีขอบเขต",
    fieldReviewBoundaryKicker: "LOCAL FIELD REVIEW",
    fieldReviewControlsTitle: "เลือกจังหวะที่จะอ่าน",
    fieldReviewSafetyCopy: "ไม่ใช่การวินิจฉัย ไม่ใช่คำแนะนำทางการแพทย์ และไม่สรุปว่าอะไรเป็นเหตุของอะไร",
    fieldReviewTimeframeLabel: "ช่วงข้อมูล",
    fieldReviewTimeframe7: "7 วัน",
    fieldReviewTimeframe14: "14 วัน",
    fieldReviewTimeframe30: "30 วัน",
    fieldReviewTimeframeAll: "ทั้งหมดที่มี",
    fieldReviewStatusKicker: "Daily_Log summary",
    fieldReviewStatusTitle: "สรุป Daily_Log ที่เลือก",
    fieldReviewSourceNote: "อ่านจาก Daily_Log ใน browser นี้ หากต้องการอ่าน workbook ให้ import Master Excel ก่อน",
    fieldReviewEmptyState: "ยังไม่มี Daily Log ให้ประมวล",
    fieldReviewThinState: "ข้อมูลยังบางมาก จึงอ่านได้แค่สัญญาณเบื้องต้น",
    fieldReviewNoDataStatus: "ยังไม่มีข้อมูลให้ประมวล",
    fieldReviewDataStatus: "ใช้ข้อมูล {used} วันจากทั้งหมด {total} วัน",
    fieldReviewAllDataStatus: "ใช้ข้อมูลทั้งหมด {used} วัน",
    fieldReviewRowsEvidence: "{count} วันในช่วงที่เลือก",
    fieldReviewHydrationTitle: "Hydration pattern",
    fieldReviewHydrationEmpty: "ยังไม่มีข้อมูลน้ำดื่มในช่วงที่เลือก จึงอ่าน hydration ได้อย่างจำกัด",
    fieldReviewHydrationEvidence: "เฉลี่ย {average} ml · ต่ำสุด {min} ml · สูงสุด {max} ml · อยู่ในช่วงอ้างอิง {inRange}/{recorded} วัน · ต่ำกว่าช่วง {below} · สูงกว่าช่วง {above}",
    fieldReviewHydrationNote: "ควรอ่านร่วมกับ load, sleep และกิจกรรม ไม่ใช่ดูตัวเลขวันเดียว และ Water_ml คือมิลลิลิตรของน้ำเปล่า ไม่ใช่เงินหรือค่าใช้จ่าย",
    fieldReviewSleepTitle: "Sleep / recovery pattern",
    fieldReviewSleepSummary: "มีสัญญาณ sleep/recovery ที่ควรอ่านอย่างอ่อนโยนในช่วงที่เลือก",
    fieldReviewSleepLight: "ข้อมูล sleep/recovery ยังไม่ชี้ pattern หนักในช่วงนี้",
    fieldReviewSleepEvidence: "วัน sleep/recovery บางหรือต่ำ {lowSleep} · วันพลังงานต่ำ {lowEnergy}",
    fieldReviewSleepNote: "อ่านเป็น recovery signal ไม่ใช่การวินิจฉัยหรือการทำนายความเสี่ยง",
    fieldReviewLoadTitle: "Load / recovery pattern",
    fieldReviewLoadSummary: "มีวันที่ load สูงในช่วงที่เลือก จึงเหมาะอ่านคู่กับ sleep และ energy",
    fieldReviewLoadLight: "load ในช่วงที่เลือกดูยังไม่หนักมากจากข้อมูลที่มี",
    fieldReviewLoadEvidence: "วัน load สูง {highLoad} · load สูงร่วมกับ sleep/recovery ต่ำ {highLoadLowSleep} · load สูงร่วมกับพลังงานต่ำ {highLoadLowEnergy}",
    fieldReviewLoadNote: "นี่เป็นสัญญาณให้เว้นพื้นที่ recovery ไม่ใช่คะแนน performance หรือสุขภาพ",
    fieldReviewDrinksTitle: "Drinks / caffeine / sweetness pattern",
    fieldReviewDrinksSummary: "เครื่องดื่ม คาเฟอีน หรือความหวานปรากฏในช่วงที่เลือก",
    fieldReviewDrinksLight: "drink-load จากคาเฟอีนหรือความหวานดูยังเบาในช่วงที่เลือก",
    fieldReviewDrinksEvidence: "วันมีคาเฟอีน {caffeineDays} · วันมีความหวาน {sweetDays} · วันน้ำตาลสูง {highSugarDays}",
    fieldReviewDrinksNote: "อ่านเป็น drink-load context เท่านั้น ไม่ประเมินแคลอรี ไม่เดา mg คาเฟอีน และไม่ตีความเป็นค่าใช้จ่ายหรือการซื้อ",
    fieldReviewMindTitle: "Mind Note / support need pattern",
    fieldReviewMindSummary: "มี Mind Note หรือ support need เป็นบริบทให้ทบทวนแบบ user-owned",
    fieldReviewMindEmpty: "ยังมี Mind Note หรือ support need ไม่มากในช่วงที่เลือก",
    fieldReviewMindEvidence: "วันที่มี Mind Note {mindNoteDays} · วันที่เลือก support need {supportDays} · วันที่มี Practice Note {practiceNoteDays}",
    fieldReviewMindNote: "บันทึกเหล่านี้เป็นบริบท ไม่ใช่การวินิจฉัยบุคลิกภาพ คะแนนใจ คะแนนบุญ หรือการประเมินคุณค่าตัวเอง",
    fieldReviewMissingTitle: "Missing / blank data pattern",
    fieldReviewMissingSummary: "มีบางช่องที่เว้นว่างในช่วงที่เลือก ซึ่งช่วยบอกว่าข้อมูลส่วนไหนยังไม่ได้บันทึก",
    fieldReviewMissingLight: "ข้อมูลสำคัญส่วนใหญ่มีให้ review ในช่วงที่เลือก",
    fieldReviewMissingEvidence: "ช่องที่เว้นว่างหรือไม่ได้บันทึก: {items}",
    fieldReviewMissingNone: "ไม่พบช่องสำคัญที่เว้นว่างบ่อยในช่วงที่เลือก",
    fieldReviewMissingNote: "ช่องว่างหมายถึงยังไม่ได้บันทึก ไม่ใช่ความผิด ไม่ใช่คะแนนที่หายไป และไม่ควรถูกเติมด้วยการเดา",
    fieldReviewMissingItemSleep: "Sleep {count}",
    fieldReviewMissingItemWater: "Water_ml {count}",
    fieldReviewMissingItemActivities: "Activities {count}",
    fieldReviewMissingItemMindNote: "Mind Note {count}",
    fieldReviewOverviewReviewedDays: "วันที่อ่าน",
    fieldReviewOverviewAverageWater: "น้ำเฉลี่ย",
    fieldReviewOverviewHighLoad: "วัน load สูง",
    fieldReviewOverviewLowRecovery: "วัน sleep/recovery บาง",
    fieldReviewOverviewDrinkLoad: "วันมีเครื่องดื่มเด่น",
    fieldReviewOverviewMindNote: "วันมี Mind Note",
    fieldReviewOverviewNoValue: "ยังว่าง",
    fieldReviewEvidenceLabel: "หลักฐานจาก Daily_Log",
    fieldReviewReadingLabel: "หนูตื่นสายอ่านว่า",
    fieldReviewNextAttentionLabel: "รอบถัดไปลองสังเกต",
    fieldRoomWorkspaceKicker: "Guided Field Rooms",
    fieldRoomWorkspaceTitle: "เลือกห้องข้อมูล",
    fieldRoomHydrationLabel: "น้ำ / Hydration",
    fieldRoomSleepRecoveryLabel: "พัก / Recovery",
    fieldRoomLoadRecoveryLabel: "ภาระ / Load",
    fieldRoomDrinksLabel: "เครื่องดื่ม",
    fieldRoomMindNoteLabel: "Mind Note",
    fieldRoomMissingLabel: "ช่องว่างข้อมูล",
    fieldRoomSignalEngineLabel: "ความสัมพันธ์",
    fieldRoomSourceLabel: "จังหวะที่เลือก",
    fieldRoomSourceBubble: "หนูตื่นสายกำลังอ่าน Daily_Log ในช่วง {timeframe} ที่พี่เลือกอยู่ค่ะ",
    fieldRoomFlowModeLabel: "แขนงทางแบบเลือกคำถาม · ไม่ใช่ LLM",
    fieldRoomHydrationFlowModeLabel: "แขนงทางแบบเลือกคำถาม · ไม่ใช่ LLM",
    fieldRoomQuestionLabel: "หนูตื่นสายถาม",
    fieldRoomQuestionHydration: "พี่อยากให้หนูอ่านจังหวะน้ำจากมุมไหนคะ",
    fieldRoomQuestionSleepRecovery: "พี่อยากให้หนูอ่าน sleep/recovery จากมุมไหนคะ",
    fieldRoomQuestionLoadRecovery: "พี่อยากให้หนูดูภาระกับการพักจากมุมไหนคะ",
    fieldRoomQuestionDrinks: "พี่อยากดูบริบทเครื่องดื่มจากมุมไหนคะ",
    fieldRoomQuestionMindNote: "พี่อยากให้หนูอ่านพื้นที่ Mind Note จากมุมไหนคะ",
    fieldRoomQuestionMissing: "พี่อยากดูช่องว่างข้อมูลจากมุมไหนคะ",
    fieldRoomWelcomeLabel: "หนูตื่นสายต้อนรับ",
    fieldRoomHydrationWelcome: "ห้องนี้หนูจะช่วยพี่อ่านจังหวะน้ำเท่าที่ข้อมูลบันทึกไว้ค่ะ เป็นบริบทของวัน ไม่ใช่การวินิจฉัยเรื่องน้ำในร่างกายหรือคะแนนการดูแลตัวเองนะคะ",
    fieldRoomHydrationSpeakerLabel: "NuTuenSai",
    fieldRoomHydrationUserSpeakerLabel: "พี่",
    fieldRoomHydrationChoicePrompt: "เลือกคำตอบที่ตรงกับมุมที่พี่อยากดูได้เลยค่ะ",
    fieldRoomHydrationContinuePrompt: "ถ้าพี่อยากดูต่อ เลือกอีกมุมได้ค่ะ",
    fieldRoomConversationExit: "🚪 พอแค่นี้ก่อน",
    fieldRoomHydrationRestart: "⌂ เลือกมุมใหม่",
    fieldRoomHydrationResume: "↩ กลับไปอ่าน",
    fieldRoomHydrationBack: "← ย้อนกลับ",
    fieldRoomHydrationNextAngle: "อ่านมุมถัดไป →",
    fieldRoomHydrationChooseAgain: "⌂ กลับไปเลือกมุม",
    fieldRoomHydrationProgressLabel: "ความคืบหน้าการอ่านจังหวะน้ำ",
    fieldRoomCurrentReadingLabel: "กำลังอ่าน • {angle}",
    fieldRoomConversationClosing: "พอแค่นี้ก่อนก็ได้ค่ะพี่ วันนี้เราไม่ได้ต้องสรุปทุกอย่าง แค่เห็นจังหวะหนึ่งของร่างกายและใจให้ชัดขึ้นก็พอแล้ว 🩵",
    fieldRoomActionLabel: "เลือกมุมที่จะอ่านต่อ",
    fieldRoomFocusOverview: "ภาพรวม",
    fieldRoomFocusEvidence: "หลักฐานจากข้อมูล",
    fieldRoomFocusNext: "รอบถัดไปลองสังเกต",
    fieldRoomFocusAll: "ดูทั้งหมด",
    fieldRoomNextButton: "ดูห้องถัดไป",
    fieldRoomNextRoomButton: "เดินต่อไปห้อง{room}",
    fieldRoomNextPrompt: "เดินต่อไปยังห้องอื่น",
    fieldRoomNextHelper: "เลือกห้องที่อยากสำรวจต่อได้เสมอค่ะ",
    fieldRoomRelatedButton: "เดินต่อไปห้อง{room}",
    fieldRoomTransitionHydration: "จังหวะน้ำและบริบทของวัน",
    fieldRoomTransitionSleepRecovery: "จังหวะการพักและพลังงาน",
    fieldRoomTransitionLoadRecovery: "จังหวะกิจกรรมและการพัก",
    fieldRoomTransitionDrinks: "รูปแบบกาแฟ น้ำหวาน และเครื่องดื่ม",
    fieldRoomTransitionMindNote: "พื้นที่ Mind Note ที่บันทึกไว้",
    fieldRoomTransitionMissing: "สิ่งที่ข้อมูลยังไม่พอจะสรุป",
    fieldRoomTransitionSignalEngine: "ความสัมพันธ์ของสัญญาณที่เคลื่อนไหวร่วมกัน",
    signalEngineTitle: "เครื่องอ่านความสัมพันธ์ของสัญญาณ",
    signalEngineKicker: "Signal Relationship Engine",
    signalEngineSubtitle: "หน้านี้อ่านว่าสัญญาณใดเคลื่อนไหวร่วมกันใน Daily_Log ไม่ใช่เหตุและผล ไม่ใช่การวินิจฉัย",
    signalEngineBoundary: "ความสัมพันธ์ไม่ใช่เหตุและผล และไม่ใช่คำแนะนำทางการแพทย์",
    signalEngineThinState: "ข้อมูลที่มีคู่ตัวเลขครบยังน้อยเกินไปสำหรับอ่านความสัมพันธ์อย่างปลอดภัย",
    signalEngineCategoryNote: "Category mapping เช่น Energy, Mind, Sleep, Load_Level และ Mind_Note_Support เป็นงานอนาคต และต้องมี mapping ที่ชัดเจนก่อนเท่านั้น",
    signalEnginePairedDays: "{count} วันที่มีข้อมูลครบ",
    signalEngineCoefficient: "r = {value}",
    signalEngineTentative: "tentative signal",
    signalEngineObserved: "observed pattern",
    signalEngineDirectionPositive: "เคลื่อนไหวทางเดียวกัน",
    signalEngineDirectionNegative: "เคลื่อนไหวสวนทางกัน",
    signalEngineDirectionNeutral: "ยังไม่ชัด",
    signalEngineStrengthUnclear: "near zero / unclear",
    signalEngineStrengthWeak: "weak",
    signalEngineStrengthModerate: "moderate",
    signalEngineStrengthStrong: "strong",
    signalEngineReadingPositive: "หนูอ่านว่าในข้อมูลชุดนี้ สองสัญญาณนี้มีแนวโน้มเคลื่อนไหวทางเดียวกันแบบ {strength} แต่ยังไม่ใช่เหตุและผลค่ะ",
    signalEngineReadingNegative: "หนูอ่านว่าในข้อมูลชุดนี้ สองสัญญาณนี้มีแนวโน้มเคลื่อนไหวสวนทางกันแบบ {strength} แต่ยังไม่ใช่เหตุและผลค่ะ",
    signalEngineReadingNeutral: "หนูอ่านว่าความสัมพันธ์ของสองสัญญาณนี้ยังไม่ชัดในข้อมูลที่เลือก จึงควรอ่านแบบเบามากค่ะ",
    signalEngineNoCoefficient: "ยังไม่แสดงค่า r เพราะต้องมีข้อมูลตัวเลขครบและมีความแปรผันเพียงพอ",
    signalEngineListLabel: "สัญญาณความสัมพันธ์ที่เห็นชัดสุด",
    signalEngineMeaningLabel: "ความหมายที่อ่านได้",
    signalEngineSignature: "MHB · NuTuenSai",
    signalEngineNoValidRows: "ยังไม่มีคู่สัญญาณที่มีข้อมูลครบอย่างน้อย 10 วันในช่วงนี้",
    signalEngineHiddenPairs: "คู่ที่ยังไม่แสดงเพราะข้อมูลยังไม่พอหรือความแปรผันของตัวเลขยังไม่พอ: {pairs}",
    signalEngineEvidenceLabel: "หลักฐานคำนวณ",
    signalEngineAuditLabel: "audit line",
    signalEngineNextObservationLabel: "ลองสังเกตต่อ",
    signalEngineRHelper: "r บอกทิศทางและความแน่นของการเคลื่อนไหวร่วมกัน ไม่ใช่เหตุและผล",
    signalEngineLegendTitle: "วิธีอ่านสัญญาณ",
    signalEngineLegendSame: "ทางเดียวกัน = สองสัญญาณมักขึ้น/ลงไปด้วยกัน",
    signalEngineLegendOpposite: "สวนทางกัน = สัญญาณหนึ่งสูงขึ้น อีกสัญญาณมักลดลง",
    signalEngineLegendUnclear: "ยังไม่ชัด = ยังไม่เห็นจังหวะร่วมกันพอ",
    signalEngineSummarySameWeak: "เคลื่อนไหวทางเดียวกันแบบสัญญาณเบา ๆ",
    signalEngineSummarySameModerate: "เคลื่อนไหวทางเดียวกันระดับหนึ่งในข้อมูลที่เลือก",
    signalEngineSummarySameStrong: "เคลื่อนไหวทางเดียวกันค่อนข้างชัดในข้อมูลที่เลือก",
    signalEngineSummaryOppositeWeak: "เคลื่อนไหวสวนทางกันแบบสัญญาณเบา ๆ",
    signalEngineSummaryOppositeModerate: "เคลื่อนไหวสวนทางกันระดับหนึ่งในข้อมูลที่เลือก",
    signalEngineSummaryOppositeStrong: "เคลื่อนไหวสวนทางกันค่อนข้างชัดในข้อมูลที่เลือก",
    signalEngineSummaryNearZero: "ยังไม่เห็นจังหวะร่วมกันชัด",
    signalEngineMeaningPositive: "หนูอ่านว่าสองสัญญาณนี้มีแนวโน้มเคลื่อนไหวไปทางเดียวกันในข้อมูลที่พี่บันทึกไว้ ช่วงที่ {xLabel} สูงขึ้น มักมาพร้อม {yLabel} ที่สูงขึ้นระดับหนึ่ง ความแรงของสัญญาณอยู่ที่ {strength} และควรอ่านตามจำนวนข้อมูล {pairedDays} เท่านั้นค่ะ",
    signalEngineMeaningNegative: "หนูอ่านว่าสองสัญญาณนี้มีแนวโน้มเคลื่อนไหวสวนทางกันในข้อมูลที่พี่บันทึกไว้ เมื่อ {xLabel} สูงขึ้น {yLabel} มักลดลงระดับหนึ่ง ความแรงของสัญญาณอยู่ที่ {strength} และควรอ่านตามจำนวนข้อมูล {pairedDays} เท่านั้นค่ะ",
    signalEngineMeaningNeutral: "หนูอ่านว่าสองสัญญาณนี้ยังไม่เคลื่อนไหวร่วมกันชัดในข้อมูลที่พี่เลือก จึงควรถือเป็นสัญญาณเบามาก ไม่ใช่ข้อสรุปค่ะ",
    fieldReviewWindowVoice7: "ในช่วง 7 วันนี้ หนูอ่านเป็นสัญญาณสั้น ๆ มากกว่าข้อสรุปค่ะ",
    fieldReviewWindowVoice14: "ในช่วง 14 วันนี้ pattern เริ่มพอให้เห็นจังหวะซ้ำบางอย่างค่ะ",
    fieldReviewWindowVoice30: "ในช่วง 30 วันนี้ ภาพรวมเริ่มพอใช้ดูจังหวะของเดือนนี้ได้ค่ะ",
    fieldReviewWindowVoiceAll: "เมื่อดูข้อมูลทั้งหมด หนูอ่านเป็นภาพรวมระยะยาว แต่ยังควรจำไว้ว่าบริบทของแต่ละวันไม่เหมือนกันค่ะ",
    fieldReviewHydrationReadingEmpty: "หนูยังอ่าน hydration ได้เบามาก เพราะช่วงนี้ไม่มี Water_ml ที่บันทึกไว้ชัดค่ะ",
    fieldReviewHydrationReadingBelow: "ค่าเฉลี่ยการดื่มน้ำอยู่ต่ำกว่าช่วงอ้างอิงตามบริบทค่ะ",
    fieldReviewHydrationReadingNearLower: "ค่าเฉลี่ยการดื่มน้ำอยู่ใกล้ขอบล่างของช่วงอ้างอิงตามบริบทค่ะ",
    fieldReviewHydrationReadingInRange: "ค่าเฉลี่ยการดื่มน้ำอยู่ในช่วงอ้างอิงตามบริบทค่ะ",
    fieldReviewHydrationReadingAbove: "ค่าเฉลี่ยการดื่มน้ำอยู่สูงกว่าช่วงอ้างอิงตามบริบทค่ะ",
    fieldReviewHydrationReadingCount: "มี {inRange} จาก {recorded} วันที่อยู่ในช่วงนั้น",
    fieldReviewHydrationNextLowLoad: "รอบถัดไปลองดูวันที่น้ำต่ำกว่าช่วงอ้างอิงร่วมกับ load, sleep และกิจกรรมของวันนั้นค่ะ",
    fieldReviewHydrationNextDefault: "รอบถัดไปลองดูวันที่น้ำต่ำหรือสูงกว่าช่วงอ้างอิงร่วมกับ load, sleep และกิจกรรม โดยไม่ต้องให้ทุกวันเท่ากันค่ะ",
    fieldReviewSleepReadingSignal: "หนูอ่านว่าสัญญาณ sleep/recovery ยังควรได้รับพื้นที่อ่อนโยน โดยเฉพาะวันที่พลังงานต่ำหรือภาระเยอะค่ะ",
    fieldReviewSleepReadingLight: "หนูอ่านว่า sleep/recovery ในช่วงนี้ยังไม่ชี้สัญญาณหนักจากข้อมูลที่มีค่ะ",
    fieldReviewSleepNextSignal: "ลองสังเกตวันที่ sleep/recovery ต่ำว่ามี load, caffeine หรือ Mind Note อะไรอยู่ข้าง ๆ บ้างนะคะ",
    fieldReviewSleepNextDefault: "ถ้ารอบหน้ามีข้อมูล sleep เพิ่ม หนูจะอ่านจังหวะ recovery ได้นุ่มและชัดขึ้นค่ะ",
    fieldReviewLoadReadingHigh: "วันที่ load สูงไม่ได้แปลว่าดีหรือไม่ดี แต่เป็นสัญญาณให้ดูว่าการพักตามทันภาระของวันไหมค่ะ",
    fieldReviewLoadReadingLight: "หนูอ่านว่า load ในช่วงนี้ยังไม่หนักมากจากข้อมูลที่บันทึกไว้ และยังควรดูตามบริบทของแต่ละวันค่ะ",
    fieldReviewLoadNextRecovery: "ลองสังเกตวันที่ load สูงพร้อม sleep/recovery ต่ำเป็นพิเศษนะคะ",
    fieldReviewLoadNextDefault: "รอบถัดไปลองดูว่า load สูงเกิดในวันแบบไหน และมีพื้นที่พักตามมาหรือเปล่าค่ะ",
    fieldReviewDrinksReadingSignal: "หนูอ่านว่านี่เป็นบริบทของเครื่องดื่ม ไม่ใช่แคลอรี ไม่ใช่ mg คาเฟอีน และไม่ใช่ค่าใช้จ่ายค่ะ",
    fieldReviewDrinksReadingLight: "หนูอ่านว่า drink-load จากคาเฟอีนหรือความหวานยังดูเบาในช่วงที่เลือกค่ะ",
    fieldReviewDrinksNextSignal: "ลองสังเกตวันที่มีคาเฟอีนหรือความหวานร่วมกับ sleep, water และ load โดยไม่ต้องตัดสินเครื่องดื่มนั้นค่ะ",
    fieldReviewDrinksNextDefault: "ถ้ารอบหน้ามี drink context เพิ่ม หนูจะช่วยดูจังหวะเครื่องดื่มแบบไม่ตัดสินค่ะ",
    fieldReviewMindReadingSignal: "Mind Note เป็นพื้นที่ที่พี่เก็บบริบทของตัวเอง หนูอ่านเป็นร่องรอยของการดูแล ไม่ใช่การวินิจฉัยค่ะ",
    fieldReviewMindReadingEmpty: "ช่วงนี้ Mind Note หรือ support need ยังไม่มาก หนูเลยอ่านส่วนนี้เป็นพื้นที่ที่ยังเปิดไว้ได้ค่ะ",
    fieldReviewMindNextSignal: "ลองดูว่า support need แบบไหนโผล่ซ้ำบ่อย และวันนั้นร่างกายหรือ load เป็นอย่างไรนะคะ",
    fieldReviewMindNextDefault: "ถ้ารอบหน้ามี Mind Note เพิ่ม หนูจะอ่านเป็นบริบทของการดูแล ไม่ใช่การประเมินตัวตนค่ะ",
    fieldReviewMissingReadingSignal: "ช่องที่เว้นไว้หมายถึงยังไม่ได้บันทึก ไม่ใช่ความผิด ข้อมูลที่จริงสำคัญกว่าข้อมูลที่ครบค่ะ",
    fieldReviewMissingReadingLight: "หนูอ่านว่าข้อมูลสำคัญในช่วงนี้พอมีฐานให้ review เบา ๆ แล้ว แต่ช่องว่างยังเว้นไว้ได้เสมอค่ะ",
    fieldReviewMissingNextSignal: "ลองเลือกเพียง 1 ช่องที่อยากบันทึกให้สม่ำเสมอขึ้น ไม่ต้องเติมทุกอย่างให้ครบค่ะ",
    fieldReviewMissingNextDefault: "รอบถัดไปยังเก็บเท่าที่จริงก็พอค่ะ ความจริงของข้อมูลสำคัญกว่าความครบ",
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
    noticeTitle: "Boundary-aware field review",
    noticeText: "อ่าน pattern และสัญญาณที่เคลื่อนไหวร่วมกันจากข้อมูลที่บันทึกไว้ ไม่ใช่การวินิจฉัย คำแนะนำทางการแพทย์ หรือเหตุและผล",
    todayState: "Today State",
    todayStateHeading: "วันนี้ร่างกายกับใจเป็นอย่างไร",
    todayStateCue: "สังเกตเร็ว ๆ ของวันนี้",
    energyLabel: "Energy",
    mindLabel: "ใจโดยรวมวันนี้",
    mindScaleHelper: "เลือกคำที่ใกล้กับใจวันนี้ที่สุด เฉย ๆ คือจุดกลาง ไม่ใช่คะแนน",
    sleepLabel: "Sleep",
    sleepHoursLabel: "นอนกี่ชั่วโมง",
    sleepHoursUnit: "ชั่วโมง",
    sleepHoursPlaceholder: "6.5",
    sleepDerivedEmpty: "เติมชั่วโมงนอนถ้ามี",
    sleepDerivedBadge: "ระบบอ่านเป็น: {sleep}",
    sleepFallbackHelper: "ถ้าไม่แน่ใจชั่วโมง เลือกหมวดคร่าว ๆ ด้านล่างได้",
    hydration: "Hydration",
    hydrationHeading: "น้ำวันนี้",
    hydrationGuidanceBase: "ช่วงน้ำวันนี้โดยประมาณ: {min}-{max} ml",
    hydrationGuidanceRange: "ช่วงน้ำวันนี้โดยประมาณ: {min}-{max} ml",
    hydrationGuidanceCueBase: "ค่อย ๆ จิบน้ำเป็นช่วง ๆ โดยไม่ต้องเร่งตัวเลข",
    hydrationGuidanceCueCognitive: "วันนี้มี load จากสมองหรือการตัดสินใจ น้ำช่วยเป็นฐานให้ recovery ได้",
    hydrationGuidanceCueLightSport: "วันนี้มีการใช้แรงหรือเหงื่อบ้าง ค่อย ๆ เติมน้ำมากกว่าวันปกติเล็กน้อย",
    hydrationGuidanceCueShortQualitySport: "วันนี้มี intensity แม้ระยะไม่ยาว น้ำควรช่วยตาม effort ไม่ใช่ดูแค่ระยะ",
    hydrationGuidanceCueLongRunHeavySweat: "วันนี้เป็น long run / sport sweat load ถ้าแตะราว 3.0 L จะอยู่ในโซนดี และถ้าเหงื่อเยอะหรือปัสสาวะเข้มค่อย ๆ จิบเพิ่มได้อีกเล็กน้อย",
    hydrationGuidanceCueLongRunGoodZone: "น้ำ 3.0 L ขึ้นไปอยู่ในโซนดีแล้ว ถ้ายังเหงื่อเยอะหรือปัสสาวะเข้ม ค่อย ๆ จิบเพิ่มได้อีกเล็กน้อยแบบกระจาย",
    hydrationGuidanceCueHighWater: "วันนี้น้ำค่อนข้างสูงแล้ว ไม่ต้องเร่งเพิ่ม ให้กระจายและดูสัญญาณร่างกายร่วม",
    hydrationGuidanceCueOutdoor: "วันนี้มีแดด เหงื่อ หรือความร้อน ให้เพิ่มแบบค่อย ๆ และพักร่างกายเป็นช่วง ๆ",
    hydrationGuidanceCueCaffeine: "คาเฟอีนช่วยให้ตื่นได้ แต่อย่าลืมให้น้ำเปล่ากลับมาเป็นฐาน",
    hydrationGuidanceCueRecovery: "วันนี้มีสัญญาณ recovery ให้ค่อย ๆ วางน้ำเป็นฐานคู่กับการพัก",
    hydrationGuidanceCueActivityRecovery: "วันนี้มีทั้ง activity load และสัญญาณ recovery ให้จิบน้ำค่อย ๆ คู่กับการพัก",
    hydrationGuidanceCueUpperBound: "ถ้าเข้าใกล้ 3.5–4.0 L ให้กระจายทั้งวัน ไม่ต้องอัดรวดเดียว และดูสีปัสสาวะ/อาการกระหายร่วมด้วย",
    halfBottle: "+ครึ่งขวด",
    resetButton: "Reset",
    drinks: "Drinks",
    drinksHeading: "Drink Profile วันนี้",
    drinksHelper: "บันทึกเครื่องดื่มอื่นนอกจากน้ำเปล่า เช่น กาแฟ ชา โกโก้ น้ำหวาน หรือน้ำผลไม้",
    drinkInsightTitle: "ข้อสังเกตเครื่องดื่มวันนี้",
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
    runDetailTitle: "รายละเอียดการวิ่งวันนี้ (เติมถ้ามี)",
    runDetailHelper: "ใช้เพื่ออ่าน load / hydration / recovery เบา ๆ ไม่ใช่ coaching",
    runDistanceLabel: "ระยะทาง (km)",
    runDurationLabel: "เวลา",
    runDurationHoursLabel: "ชั่วโมง",
    runDurationMinutesLabel: "นาที",
    runSweatLabel: "เหงื่อ",
    runSweatEmpty: "ไม่ระบุ",
    runSweatLow: "น้อย",
    runSweatMedium: "กลาง",
    runSweatHigh: "เยอะ",
    runPaceEmpty: "Pace ยังว่าง",
    runPaceBadge: "Pace เฉลี่ย {pace}",
    mindfulReminder: "Mindful Reminder",
    nuTuenSaiNote: "NuTuenSai note",
    nuTuenSaiRole: "NuTuenSai เป็นชั้นสะท้อน pattern อย่างอ่อนโยน ไม่ใช่เครื่องมือวินิจฉัยหรือคำแนะนำแทนแพทย์",
    nuTuenSaiEmptyReminder: "สวัสดีค่ะ วันนี้ยังไม่มีข้อมูลให้ระบบอ่านมากนัก ลองเติมสัญญาณวันนี้สักเล็กน้อยก่อน แล้วค่อยกลับมาทบทวนกันนะคะ",
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
    mindNoteKicker: "Mind Note — สิ่งเล็ก ๆ ของวันนี้",
    mindNoteTitle: "Mind Note",
    mindNoteSubtitle: "วางสิ่งที่อยากเก็บไว้กับวันนี้",
    mindNoteCue: "จะเป็นเรื่องดี ความรู้สึก สิ่งที่กำลังเรียนรู้ หรือสิ่งที่อยากวางไว้เบา ๆ ก็ได้",
    practiceKicker: "Practice context — ถ้ามี",
    practiceTitle: "วันนี้ใจพักอยู่กับอะไรได้บ้าง",
    practiceSubtitle: "เลือกเท่าที่เหมาะกับวันนี้ หรือเว้นไว้ได้เสมอ",
    practiceRootLabel: "ฐานภาวนา",
    practiceTypeLabel: "เลือกแบบที่ใช้วันนี้",
    practiceDurationLabel: "ระยะเวลา",
    practiceHoursLabel: "ชั่วโมง",
    practiceMinutesLabel: "นาที",
    practiceHoursPlaceholder: "0",
    practiceMinutesPlaceholder: "15",
    practiceNoteLabel: "หมายเหตุ / สิ่งดีที่ได้ทำ",
    practiceNotePlaceholder: "เช่น ไปให้อาหารปลาที่วัด, ระลึกถึงความดีที่ทำ, วางใจไม่ตอบโต้",
    practiceNoteHelper: "เขียนสั้น ๆ ได้ ไม่ใช่คะแนนบุญหรือการประเมินตัวเอง",
    practiceDurationHint: "เว้นว่างได้ ไม่มีคะแนนหรือ streak",
    practiceDurationBadge: "รวมประมาณ {minutes} นาที",
    practiceTypeEmpty: "เลือกฐานก่อน หรือเว้นว่างไว้ได้",
    practiceHelperDefault: "เลือกเท่าที่พอดี วันนี้ไม่ต้องทำให้ครบหรือดีเป็นพิเศษ",
    practiceSummaryEmpty: "ยังไม่เลือกฐาน",
    practiceSummaryBase: "วางใจเท่าที่พอดี",
    practiceSummaryWithMinutes: "{type} · {minutes} นาที",
    mindNoteTextLabel: "วันนี้มีอะไรที่อยากเก็บไว้กับวันนี้บ้าง",
    mindNotePlaceholder: "เช่น วันนี้วิ่งแล้วรู้สึกสบาย · วันนี้ได้คุยกับคนที่คิดถึง · วันนี้ยังไม่แน่ใจหลายเรื่อง · วันนี้อยากขอบคุณตัวเอง · วันนี้ไม่รู้จะเขียนอะไร ก็ไม่เป็นไร",
    mindNoteFeelingLabel: "ความรู้สึกของบันทึกนี้",
    mindNoteFeelingHelper: "เลือกคำที่ใกล้กับบันทึกนี้ได้เท่าที่พอดี ทุกแบบของวันมีที่อยู่ตรงนี้",
    mindNoteFeelingGentleLabel: "อ่อนโยน / เกื้อกูลใจ",
    mindNoteFeelingNeutralLabel: "เป็นกลาง / กำลังเห็น",
    mindNoteFeelingHeavyLabel: "หนัก / อยากให้มีพื้นที่",
    mindNoteSupportLabel: "วันนี้ใจอยากได้อะไร",
    mindNoteSupportHelper: "เลือกได้ถ้ามีสิ่งเล็ก ๆ ที่น่าจะช่วยวันนี้ หรือเว้นไว้ก็ได้",
    mindNoteSupportAria: "สิ่งที่น่าจะช่วยวันนี้",
    generateReflection: "Generate End-of-Day Reflection",
    reflectionPlaceholder: "กดสรุปวันนี้ เพื่อสร้าง reflection จากข้อมูลวันนี้",
    localOnly: "Local only",
    dailyLogControls: "Daily Log Controls",
    controlsHelp: "บันทึกเป็นตารางใน browser/localStorage ของเครื่องนี้ แล้ว export เป็น Master Excel เมื่อคุณต้องการ",
    saveDailyLog: "บันทึก Reflection วันนี้",
    saveTodayLog: "บันทึกเข้า Daily Log",
    todayResetTitle: "Current Form",
    resetCurrentForm: "เคลียร์หน้าปัจจุบัน",
    restoreCurrentForm: "เรียกข้อมูลวันนี้กลับมา",
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
    saveTodayDone: "บันทึกเข้า Daily Log แล้ว ไม่ต้องแบกต่อในหัวแล้วนะ",
    resetCurrentFormConfirm: "เคลียร์เฉพาะข้อมูลที่กำลังกรอกอยู่ ไม่ลบ Daily Log เดิม",
    resetCurrentFormDone: "เคลียร์หน้าปัจจุบันแล้ว Daily Log เดิมยังอยู่",
    restoreCurrentFormOverwriteConfirm: "ฟอร์มปัจจุบันมีข้อมูลอยู่แล้ว การเรียกข้อมูลจาก Daily Log จะเขียนทับฟอร์มปัจจุบัน แต่ไม่ลบ Daily Log ต้องการดำเนินการต่อไหม",
    restoreLatestLogConfirm: "ยังไม่มี Daily Log ของวันนี้ ต้องการเรียกข้อมูลแถวล่าสุด ({date}) กลับมาในฟอร์มหรือไม่",
    restoreCurrentFormDone: "เรียกข้อมูลจาก Daily Log กลับมาในฟอร์มแล้ว ยังไม่ได้บันทึกซ้ำ",
    restoreCurrentFormEmpty: "ยังไม่มี Daily Log ให้เรียกกลับ",
    restoreCurrentFormCancelled: "ยังไม่เรียกข้อมูลกลับมา ฟอร์มปัจจุบันยังอยู่เหมือนเดิม",
    replaceConfirm: "วันนี้มี Daily Log อยู่แล้ว ระบบจะอัปเดตข้อมูลจากหน้านี้และเก็บข้อมูลเดิมส่วนอื่นไว้ ต้องการดำเนินการต่อไหม",
    replaceCancelled: "ยังไม่อัปเดต Daily Log เดิม ไม่ต้องรีบตัดสินใจก็ได้",
    savedDailyLog: "บันทึกลง Daily Log แล้ว ไม่ต้องแบกต่อในหัวแล้วนะ",
    clearConfirm: "ต้องการล้าง Daily Log ทั้งหมดใน browser นี้ไหม?",
    clearedDailyLog: "ล้าง Daily Log ใน browser นี้แล้ว",
    sheetJsMissing: "ยังโหลด SheetJS ไม่สำเร็จ ลองเช็กอินเทอร์เน็ตแล้วกดอีกครั้ง",
    noDailyLog: "ยังไม่มี Daily Log ให้ export เริ่มจาก Save to Daily Log ก่อนนะ",
    exportedMaster: "Export Master Excel แล้ว ไฟล์จะถูกดาวน์โหลดลงเครื่องของคุณ",
    importOverwriteConfirm: "มี Daily Log อยู่แล้ว ต้องการ overwrite ด้วยข้อมูลจากไฟล์นี้ไหม?",
    importCancelled: "ยังไม่ import ทับ Daily Log เดิม",
    missingDailySheet: "ไม่พบ Sheet Daily_Log ในไฟล์นี้",
    importDone: "Import Master Excel แล้ว ({count} rows)",
    importProfileImported: "นำเข้า Intention Profile แล้ว หลังพี่ยืนยัน",
    importProfileCancelled: "ยังไม่เปลี่ยน Intention Profile เดิม",
    importProfileEmpty: "ไม่พบ profile สำหรับ import ใน sheet นี้",
    importProfileRejected: "ข้าม Intention Profile เพราะข้อมูลไม่ผ่าน validation: {reason}",
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
      keepBalance: "รักษาจังหวะที่พอดี และไม่ต้องเพิ่มอะไรเกินจำเป็น",
      closing1: "วันนี้ไม่ต้องแก้ทุกอย่าง แค่เห็น pattern ชัดขึ้นก็ถือว่าระบบทำงานแล้ว",
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
      overviewMindNoteFeelingGoodActivity: "บันทึกนี้มีโทนที่รู้สึกดีอยู่ ขณะเดียวกันวันนี้มีการใช้พลังงานจริง ให้โทนดีเป็นสัญญาณสนับสนุนเล็ก ๆ และยังให้ recovery เดินตาม",
      overviewMindNoteFeelingGoodRecovery: "บันทึกนี้มีโทนที่รู้สึกดีอยู่ แต่ร่างกายยังอาจต้องการ recovery ทั้งสองสัญญาณอยู่ร่วมกันได้โดยไม่ต้องสรุปว่าวันนี้สมบูรณ์แบบ",
      overviewMindNoteFeelingGoodSupport: "บันทึกนี้มีโทนที่รู้สึกดีอยู่ เป็นสัญญาณเล็ก ๆ ว่ามีบางส่วนที่ใจรับรู้ได้อย่างอ่อนโยน โดยไม่ต้องสรุปว่าวันนี้สมบูรณ์แบบ",
      overviewCaffeine: "วันนี้คาเฟอีนอาจช่วยให้ตื่นหรือพยุงจังหวะของวันได้ แค่ให้น้ำเปล่ากลับมาเป็นฐานโดยไม่ต้องดุกาแฟก็พอ",
      overviewSteadyHydration: "วันนี้น้ำพอเป็นฐานของวันแล้ว ภาพรวมจึงเหมาะกับการรักษาความสม่ำเสมอมากกว่าการเติมอะไรเกินจำเป็น",
      overviewBase: "วันนี้เป็นวันที่เหมาะกับการสังเกต pattern แบบเบา ๆ น้ำ การพัก และใจยังค่อย ๆ กลับมาอยู่ในจังหวะที่พอดีได้",
      adjustRecovery: "ถ้าจะปรับเล็ก ๆ วันนี้ แค่ให้การพักกับน้ำเดินไปด้วยกัน โดยไม่ต้องรีบแก้ทุกอย่างในวันเดียวก็พอ",
      adjustActivity: "ถ้าจะปรับเล็ก ๆ วันนี้ ให้มองน้ำเป็นส่วนหนึ่งของ recovery หลัง load ไม่ใช่ตัวเลขที่ต้องรีบทำให้ครบ",
      adjustCaffeine: "ถ้าจะปรับเล็ก ๆ วันนี้ แค่คืนพื้นที่ให้น้ำเปล่าระหว่างคาเฟอีนกับการพักก็พอ",
      adjustWater: "ถ้าจะปรับเล็ก ๆ วันนี้ ลองวางจุดจิบน้ำให้กระจายขึ้น โดยไม่ต้องอัดทีเดียว",
      adjustSteady: "ถ้าจะปรับเล็ก ๆ วันนี้ คือรักษาจังหวะที่พอดีไว้ โดยไม่ต้องเพิ่มอะไรเกินจำเป็น",
      adjustEnergyLayered: "ถ้าจะปรับเล็ก ๆ วันนี้ ลองฟังทั้งสัญญาณกายและใจคนละชั้น โดยไม่ต้องรีบตัดสินว่าวันนี้ดีหรือแย่",
      tomorrowRecovery: "พรุ่งนี้ให้ recovery มาก่อน แล้วค่อยกลับมาดู pattern ต่อแบบไม่เร่งตัวเอง",
      tomorrowActivity: "พรุ่งนี้ให้ recovery กับน้ำเดินไปด้วยกัน แล้วค่อยดูว่าร่างกายพร้อมเพิ่มอะไรไหม",
      tomorrowCaffeine: "พรุ่งนี้ลดคาเฟอีนลงหนึ่งจังหวะ แล้วให้น้ำเปล่ากลับมาเป็นฐาน",
      tomorrowEnergyLayered: "พรุ่งนี้ดูสัญญาณกายกับใจแยกชั้นกัน แล้วค่อยเลือกจังหวะที่พอดี",
      tomorrowPositiveMind: "พรุ่งนี้รักษาใจที่พออยู่ได้ แล้วกลับมาดู pattern แบบไม่เร่งตัวเอง",
      tomorrowSteady: "พรุ่งนี้รักษาจังหวะที่พอดี แล้วกลับมาดู pattern แบบไม่เร่งตัวเอง",
      mindNote: "Mind Note: {note}"
    },
    inputGroundedComposer: {
      waterLow: "น้ำวันนี้ประมาณ {water} ml และยังค่อย ๆ กลับฐานอยู่",
      waterBase: "น้ำวันนี้ประมาณ {water} ml และเริ่มเป็นฐานของวันได้",
      sleepHours: "นอนประมาณ {hours} ชั่วโมง",
      drinkCaffeine: "มีคาเฟอีนเป็นส่วนหนึ่งของบริบท",
      drinkSweetness: "มีความหวานในเครื่องดื่มเป็นสัญญาณหนึ่งของวัน",
      drinkContext: "มีคาเฟอีนหรือความหวานเป็นส่วนหนึ่งของบริบท",
      activity: "มี {activity} เป็น load ของวัน",
      run: "มี {run} เป็นบริบทของ load และ recovery",
      mindFeeling: "Mind Note มีโทน {feeling}",
      mindSupport: "support need คือ {support}",
      mindText: "มี Mind Note ว่า “{note}”",
      continuity: "ต่อจาก log ก่อนหน้า มีสัญญาณความต่อเนื่องอยู่เล็กน้อย",
      restore_baseline: "จาก {anchors} วันนี้อาจอ่านได้ว่าเป็นวันที่ค่อย ๆ กลับมาดูแลจังหวะพื้นฐาน มากกว่าการเร่งชดเชยอะไรทันที",
      reduce_guilt: "จาก {anchors} วันนี้อาจอ่านได้ว่าไม่ใช่วันที่ต้องโทษตัวเอง แต่เป็นวันที่เห็น pattern แล้วค่อย ๆ กลับมาดูแลฐานเดิม",
      notice_pattern: "จาก {anchors} วันนี้อาจอ่านได้ว่าเป็น pattern เล็ก ๆ ให้สังเกต ไม่ใช่ข้อสรุปใหญ่เกี่ยวกับตัวเอง",
      protect_agency: "จาก {anchors} วันนี้อาจอ่านได้ว่าเป็นข้อมูลให้เลือกจังหวะที่พอดี โดยผู้ใช้ยังเป็นคนตัดสินความหมายของวัน",
      pause_not_push: "จาก {anchors} วันนี้อาจอ่านได้ว่า recovery และการไม่เร่งเพิ่มคือจังหวะที่เหมาะกว่า push ต่อ",
      soft_continue: "จาก {anchors} วันนี้อาจอ่านได้ว่าเป็นจังหวะที่ค่อย ๆ ต่อเนื่องได้ โดยไม่ต้องทำให้ทุกอย่างสมบูรณ์แบบ",
      fallback: "จากสัญญาณที่กรอกวันนี้ ระบบอ่านเป็นจุดเริ่มต้นเบา ๆ สำหรับดู pattern โดยไม่ต้องรีบสรุป"
    },
    lowDataReflection: {
      noData: "สวัสดีค่ะ วันนี้ข้อมูลยังบางมาก หนูขอชวนเติมสัญญาณวันนี้เล็กน้อยก่อน แล้วค่อยกลับมาสะท้อนกันนะคะ",
      previousOnly: "สวัสดีค่ะ วันนี้ยังไม่มีข้อมูลใหม่มากนัก หนูพอเห็น log ก่อนหน้าเป็นฉากหลังได้เล็กน้อย แต่ยังไม่อยากสรุปวันนี้แทนข้อมูลจริงนะคะ เติมเท่าที่จำได้จริงสักนิดก็พอค่ะ",
      previousLoad: "สวัสดีค่ะ วันนี้ข้อมูลใหม่ยังบางอยู่ แต่ถ้าใช้ log ก่อนหน้าเป็นฉากหลังเบา ๆ หนูเห็นว่าร่างกายอาจยังเหมาะกับการเริ่มจาก recovery มากกว่าการเร่งเพิ่มงานนะคะ เติมสัญญาณวันนี้สักนิด เช่น น้ำ การพัก หรือภาวะใจ แล้วค่อยกลับมาสะท้อนกันก็พอค่ะ",
      previousWater: "สวัสดีค่ะ วันนี้ยังไม่มีข้อมูลใหม่มากนัก แต่จาก log ก่อนหน้า หนูขอชวนวางน้ำเป็นฐานเล็ก ๆ ก่อนนะคะ แค่เติมเท่าที่จริงวันนี้ เช่น น้ำแก้วแรกหรือภาวะใจตอนนี้ ก็พอให้ระบบอ่านต่อได้แล้วค่ะ",
      previousSleep: "สวัสดีค่ะ วันนี้ข้อมูลยังบาง แต่ log ก่อนหน้าพอชี้ว่า recovery อาจยังเป็นฐานสำคัญอยู่ หนูอยากให้เริ่มวันนี้แบบไม่กดดันตัวเองมากนัก แล้วค่อยเติมสัญญาณที่จำได้จริงก็พอค่ะ",
      previousMind: "สวัสดีค่ะ วันนี้ข้อมูลใหม่ยังน้อย แต่จาก Mind Note ก่อนหน้า หนูเห็นว่าความกดดันอาจเป็นสิ่งที่ควรวางเบา ๆ ก่อนนะคะ วันนี้ยังไม่ต้องสรุปอะไรไกล เติมแค่สัญญาณจริงเล็ก ๆ ก็พอค่ะ",
      previousDrink: "สวัสดีค่ะ วันนี้ข้อมูลใหม่ยังบาง แต่จาก log ก่อนหน้า หนูขอวางเรื่องน้ำกับจังหวะพลังงานเป็นฉากหลังเบา ๆ ก่อนนะคะ เติมสัญญาณจริงวันนี้สัก 1–2 อย่าง แล้วค่อยกลับมาสะท้อนกันก็พอค่ะ",
      previousGeneric: "สวัสดีค่ะ วันนี้ข้อมูลใหม่ยังบางอยู่ หนูพอใช้ log ก่อนหน้าเป็นฉากหลังได้เล็กน้อย แต่ยังไม่อยากสรุปวันนี้แทนข้อมูลจริงนะคะ ลองเติมสัญญาณวันนี้สัก 1–2 อย่าง แล้วค่อยกลับมาสะท้อนกันก็พอค่ะ",
      thinData: "วันนี้มีสัญญาณใหม่บางส่วนแล้วค่ะ หนูอ่านได้แค่เบา ๆ ว่าเริ่มมีฐานให้ดู pattern แต่ยังไม่ต้องรีบสรุปมากกว่านี้ เติมส่วนที่จริงพอก็พอค่ะ"
    },
    reflectionInputIntegration: {
      sleepLowHours: "วันนี้นอนประมาณ {hours} ชั่วโมง สัญญาณพลังงานจึงควรถูกอ่านอย่างอ่อนโยนขึ้น และควรเผื่อพื้นที่ให้ recovery",
      sleepOkayHours: "วันนี้นอนประมาณ {hours} ชั่วโมง ระบบอ่านเป็นโซนพอใช้ แต่ยังควรเผื่อแรงฟื้นตัวไว้",
      sleepGoodHours: "วันนี้นอนประมาณ {hours} ชั่วโมง เป็นฐานการพักที่พอช่วยให้ดูแลจังหวะวันได้",
      easyRun: "วันนี้มี easy run เป็นจังหวะเคลื่อนไหวเบา ๆ ให้ recovery เดินตามร่างกายแบบไม่ต้องเร่ง",
      shortQualityRun: "วันนี้เป็นวิ่งคุณภาพระยะสั้น ระยะอาจไม่ยาว แต่ intensity ยังนับเป็น load ที่ควรให้ recovery ตาม",
      longRun: "วันนี้มีการวิ่ง {distance} {duration} จึงควรอ่านวันนี้ผ่าน load, hydration และ recovery มากกว่าการเร่งเพิ่ม",
      runGeneric: "วันนี้มีการวิ่งเป็นส่วนหนึ่งของ load ให้ recovery ตาม effort แบบไม่ต้องเปลี่ยนเป็นคำแนะนำการซ้อม",
      runSweat: "มีสัญญาณเหงื่อระดับ {sweat} จึงควรให้น้ำและ recovery เดินตามแบบค่อย ๆ",
      hydrationRunGoodZone: "น้ำวันนี้สอดคล้องกับวันที่มีวิ่งหรือเหงื่อมากขึ้น ไม่ใช่น้ำเยอะลอย ๆ แค่กระจายและดูสัญญาณร่างกายร่วม",
      hydrationHighRest: "วันนี้น้ำค่อนข้างสูงเมื่อเทียบกับวันที่ไม่มี load/เหงื่อชัดเจน ไม่ต้องฝืนเพิ่ม แค่กระจายและฟังร่างกาย",
      lightCodingAiAssist: "วันนี้มีโค้ดดิ้งเบา ๆ / AI ช่วยงาน จึงเป็น cognitive load แบบประคอง ไม่ใช่วันพักว่างจริง"
    },
    continuity: {
      sleepDebtHint: "ต่อจาก log ก่อนหน้า วันนี้อาจควรถูกอ่านผ่าน recovery มากกว่าการเร่งเพิ่ม เพราะมีสัญญาณนอนน้อยสะสมอยู่เล็กน้อย",
      sleepRecoverySupport: "วันนี้นอนดีขึ้นเมื่อเทียบกับ log ก่อนหน้า จึงเป็น support signal เล็ก ๆ ให้ระบบค่อย ๆ กลับมามีฐาน",
      loadStreak: "เมื่ออ่านต่อจากวันที่มี load ต่อเนื่อง วันนี้สัญญาณหลักอาจเป็นการประคอง recovery มากกว่าการเพิ่ม output",
      runRecoveryCarryover: "ถ้าวันก่อนหน้ามี run/load อยู่ วันนี้ไม่จำเป็นต้องเร่งเพิ่ม แค่ให้ร่างกายตาม recovery ทันก็พอ",
      hydrationHigher: "น้ำวันนี้ขยับสูงขึ้นจาก log ก่อนหน้าเล็กน้อย ให้อ่านเป็นจังหวะปรับฐาน ไม่ใช่คะแนนที่ต้องชนะ",
      hydrationLower: "น้ำวันนี้ต่ำกว่า log ก่อนหน้าเล็กน้อย แค่กลับมาวางจุดจิบน้ำแบบกระจายก็พอ",
      mindCarryover: "ต่อจาก log ก่อนหน้า ใจวันนี้เหมือนยังมีแรงกดหรือความฟุ้งบางส่วน ให้ค่อย ๆ วาง ไม่ต้องรีบสรุป",
      mindSoftening: "เมื่ออ่านต่อจาก log ก่อนหน้า ใจวันนี้ดูเหมือนเริ่มนุ่มลงเล็กน้อย เป็นสัญญาณสนับสนุน ไม่ใช่ข้อสรุปใหญ่",
      cognitiveLoadContinuity: "หลังจากหลายวันที่ใช้สมองหรือคุมบริบทต่อเนื่อง วันนี้ควรถูกอ่านผ่าน recovery ของระบบประสาทมากกว่าการเพิ่ม output"
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
      context: "เครื่องดื่มวันนี้มีคาเฟอีนหรือความหวานเป็นส่วนหนึ่งของบริบท พอเห็นแล้วไม่ต้องโทษตัวเอง แค่ค่อย ๆ เติมน้ำหรือพักให้ร่างกายกลับฐาน",
      hydrationCaffeine: "ถ้าน้ำยังไม่มากและมีคาเฟอีนร่วมด้วย วันนี้ควรอ่านผ่านการกลับมาดูแลจังหวะพื้นฐาน มากกว่าการเร่งชดเชย",
      sweetSignal: "เครื่องดื่มหวานวันนี้เป็นเพียงสัญญาณหนึ่ง ไม่ใช่ความผิด แค่ช่วยให้เห็น pattern ของพลังงานและการพัก",
      balanced: "วันนี้มีเครื่องดื่มอยู่ในบริบท แต่ฐานน้ำเริ่มพอช่วยประคองได้แล้ว แค่เห็น pattern โดยไม่ต้องดุแก้วไหนก็พอ",
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
      sleepLoadRecovery: "วันนี้ recovery ควรมาก่อนการเพิ่ม performance อีกนิด",
      hydrationCaffeine: "วันนี้ระบบชวนกลับมาดูน้ำและการพักก่อนให้กาแฟนำจังหวะทั้งวัน",
      hydrationLoad: "วันนี้มีการใช้พลังงานมากกว่าวันพัก น้ำอาจค่อย ๆ ตามร่างกายให้ทันโดยไม่ต้องเร่งดื่มทีเดียว",
      hydrationRecovery: "วันนี้ไม่ได้มี load หนักชัดเจน แต่มีสัญญาณที่ร่างกายอาจต้องการ recovery มากขึ้น ค่อย ๆ วางน้ำเป็นฐานของวัน",
      caffeineBase: "คาเฟอีนช่วยให้ตื่นได้ แต่วันนี้อย่าลืมให้น้ำเปล่ากลับมาเป็นฐาน",
      positiveMind: "วันนี้ใจดูเป็นแรงหนุนได้เล็กน้อย ใช้มันเป็นฐานเบา ๆ โดยไม่ต้องผลักตัวเองเพิ่ม",
      positiveMindWithLoad: "แม้ใจดูดีขึ้น วันนี้ยังมี load ให้ recovery เดินไปด้วยกัน",
      positiveMindRecovery: "วันนี้ใจดูเป็นแรงหนุนได้ แต่ร่างกายยังอาจต้องการ recovery อยู่ ค่อย ๆ ดูแลทั้งสองชั้นไปด้วยกัน",
      noteFeelingGood: "บันทึกนี้มีโทนดีเล็ก ๆ ให้รับรู้ไว้เป็นแรงหนุน โดยไม่ต้องทำให้ทั้งวันสมบูรณ์แบบ",
      noteFeelingGoodWithLoad: "บันทึกนี้มีโทนดีอยู่ และวันนี้ยังมี load ให้ recovery เดินไปด้วยกัน",
      noteFeelingGoodRecovery: "บันทึกนี้มีโทนดีอยู่ แต่ร่างกายยังอาจต้องการ recovery ค่อย ๆ ดูแลทั้งสองชั้นไปด้วยกัน",
      doublePressure: "วันนี้ไม่ต้องเร่งแก้ตัวเลข แค่ลดแรงกดดันลงหนึ่งระดับก็พอ",
      sugarHigh: "เครื่องดื่มหวานเริ่มสะสมแล้ว ลดแก้วถัดไปหนึ่งจุดก็พอ",
      consistency: "วันนี้จังหวะค่อนข้างเบาและน้ำพอเห็นแล้ว รักษาความสม่ำเสมอก็พอ",
      endorphin: "วันนี้พลังอาจดูดี แต่ถ้านอนน้อยหรือ load สูง ให้เผื่อพื้นที่พักไว้ด้วย",
      resourceLow: "พลังงานต่ำวันนี้อาจมาจากทรัพยากรไม่พอ ไม่ใช่ความผิดพลาดของวันนี้",
      restFirst: "วันนี้เลือกพักก่อนได้ โดยไม่ต้องรู้สึกว่าต้องทำให้ทุกอย่างคืบหน้าทันที"
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
      mindNoteFeelingGood: "บันทึกนี้มีโทนที่รู้สึกดีอยู่ หนูจะอ่านเป็นสัญญาณเล็ก ๆ ว่าวันนี้มีบางส่วนที่ใจรับรู้ได้อย่างอ่อนโยน ไม่จำเป็นต้องทำให้ทั้งวันสมบูรณ์แบบ",
      positiveMindRelaxed: "วันนี้ใจดูผ่อนคลายขึ้นเล็กน้อย อาจเป็นฐานที่ช่วยให้การดูแลตัวเองไม่ต้องมาจากแรงกดดัน",
      pressure: "ความกดดันถูกเห็นแล้ว ไม่ต้องใช้การเร่งแก้เป็นคำตอบของวันนี้",
      uneasy: "บันทึกนี้มีความไม่สบายใจบางอย่างอยู่ หนูจะอ่านเป็นสัญญาณให้ค่อย ๆ วาง ไม่ใช่สิ่งที่ต้องรีบแก้ทันที",
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
    activityRootReflection: {
      clinical_focus: "วันนี้ใช้ความละเอียด มือ ตา และสมาธิต่อเนื่อง ให้พักระบบประสาทแบบเงียบ ๆ มีพื้นที่พอ",
      service_standing: "วันนี้ใช้พลังผ่านการยืน เดิน ถืออุปกรณ์ และดูแลจังหวะคนตรงหน้า ให้ recovery ดูแลหลัง ขา ไหล่ และสายตาด้วย",
      cognitive_deepwork: "วันนี้ใช้สมองและสายตาต่อเนื่อง พักตา ลด loop ความคิด และคืนพื้นที่ให้สมอง",
      market_decision: "วันนี้ load อาจมาจากการเฝ้าจังหวะและแรงตัดสินใจมากกว่าร่างกาย ปิดจอเป็นช่วง ๆ และไม่พาตลาดไปนอนก็พอ",
      outdoor_heat: "วันนี้มีความร้อน เหงื่อ หรือแรงกายเข้ามาเกี่ยว จิบน้ำเป็นช่วง ๆ พักแดด/พักร่างกาย และไม่เร่งตัวเลข",
      sport_sweat: "วันนี้ร่างกายใช้แรงจริง ให้ recovery เป็นส่วนหนึ่งของการซ้อม ไม่ใช่การถอยหลัง",
      walking_physical: "วันนี้ร่างกายถูกใช้ผ่านการเดินหรือเคลื่อนไหว คืนพื้นที่ให้หลัง ขา เท้า และดื่มน้ำให้กระจาย",
      recovery_low_sleep: "วันนี้เป็นสัญญาณ recovery ไม่ใช่ activity load สูง ให้พักมาก่อนการเพิ่มรอบใหม่",
      rest_base: "วันนี้เหมาะกับการรักษาจังหวะเบา ๆ ไม่ต้องเพิ่มอะไรเพราะรู้สึกว่าว่าง"
    },
    activityRootSummary: {
      clinical_focus: "วันนี้ใช้ความละเอียดต่อเนื่อง",
      service_standing: "วันนี้ใช้พลังผ่านการยืน เดิน และดูแลจังหวะคนตรงหน้า",
      cognitive_deepwork: "วันนี้ใช้สมองและสายตาต่อเนื่อง",
      market_decision: "วันนี้ใช้สมองกับแรงตัดสินใจ",
      outdoor_heat: "วันนี้มีแดด เหงื่อ หรือแรงกายเข้ามาเกี่ยว",
      sport_sweat: "วันนี้ร่างกายใช้แรงจริง",
      walking_physical: "วันนี้ใช้ร่างกายผ่านการเดินและเคลื่อนไหว",
      recovery_low_sleep: "วันนี้เป็นสัญญาณ recovery จากการนอนน้อย",
      rest_base: "วันนี้เป็นจังหวะเบา ๆ"
    },
    activitySpecificReflection: {
      lightCodingAiAssist: "วันนี้เป็นโค้ดดิ้งเบา ๆ หรือใช้ AI ช่วยงานมากกว่า deep work เต็มแรง พลังหลักอยู่ที่การคุมบริบท ตรวจงาน และตัดสินใจเบา ๆ ต่อเนื่อง ให้พักตาและลด loop ความคิดแบบพอดี",
      shortQualityRun: "วันนี้เป็นการวิ่งคุณภาพระยะสั้นมากกว่าวิ่งยาว ร่างกายใช้แรงจาก intensity มากกว่าระยะทาง ให้ recovery เดินตาม effort แบบไม่ต้องเพิ่มแรงกดดัน",
      rest: "วันนี้เป็นจังหวะพัก ไม่ได้เพิ่ม load หลักให้ร่างกายมากนัก",
      lightRecoveryDay: "วันนี้เป็นจังหวะเบา ๆ ให้ระบบค่อย ๆ กลับมาฟื้นตัว",
      lowSleepRest: "วันนี้พลังงานอาจได้รับผลจากการนอนน้อย และการเลือกวันพักช่วยให้ระบบไม่ต้องเพิ่ม load ซ้ำ",
      lowSleepLightRecovery: "วันนี้มีสัญญาณจากการนอนน้อย และจังหวะเบา ๆ อาจช่วยให้ recovery ตามร่างกายทันขึ้น"
    },
    activitySpecificSummary: {
      lightCodingAiAssist: "วันนี้ใช้สมองแบบเบา ๆ ผ่านการคุมบริบทและให้ AI ช่วยงาน",
      shortQualityRun: "วันนี้ร่างกายใช้แรงจากการวิ่งที่มีจังหวะเร็ว แม้ระยะไม่ยาวมาก",
      rest: "วันนี้เป็นจังหวะพัก",
      lightRecoveryDay: "วันนี้เป็นจังหวะเบา ๆ ให้ระบบฟื้นตัว",
      lowSleepRest: "วันนี้นอนน้อยและเลือกวันพักเพื่อไม่เพิ่ม load ซ้ำ",
      lowSleepLightRecovery: "วันนี้นอนน้อยและมีจังหวะเบา ๆ ช่วยให้ recovery ตามทัน"
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
      steady: "วันนี้ไม่ต้องสรุปตัวเองเร็ว แค่กลับมาดูจังหวะเล็ก ๆ อย่างสม่ำเสมอก็พอ"
    },
    mindNoteReminder: {
      pressured: "เห็นความกดดันแล้วนะ วันนี้ไม่ต้องรีบแก้ทุกอย่าง แค่กลับมาสม่ำเสมอก็พอ",
      worried: "ความกังวลเป็นสัญญาณให้ดูแล ไม่ใช่คำสั่งให้เร่งแก้",
      uneasy: "บันทึกนี้มีความไม่สบายใจบางอย่างอยู่ หนูจะอ่านเป็นสัญญาณให้ค่อย ๆ วาง ไม่ใช่สิ่งที่ต้องรีบแก้ทันที",
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
      recovery: "รักษาความสม่ำเสมอ ไม่ต้องเพิ่มอะไรเกินจำเป็น"
    },
    tomorrowFocusByActivityRoot: {
      clinical_focus: "พักมือ ตา และระบบประสาทแบบเบา ๆ",
      service_standing: "คืนพื้นที่ให้หลัง ขา ไหล่ และสายตา",
      cognitive_deepwork: "พักตา ลด loop ความคิด และคืนพื้นที่ให้สมอง",
      market_decision: "พักสายตา ปิดจอเป็นช่วง ๆ และไม่พาตลาดไปนอน",
      outdoor_heat: "จิบน้ำเป็นช่วง ๆ และพักแดดหรือพักร่างกาย",
      sport_sweat: "ให้ recovery เป็นส่วนหนึ่งของการซ้อม",
      walking_physical: "คืนพื้นที่ให้หลัง ขา เท้า และดื่มน้ำให้กระจาย",
      recovery_low_sleep: "ให้ recovery มาก่อนการเพิ่มรอบใหม่",
      rest_base: "รักษาจังหวะเบา ๆ โดยไม่ต้องเพิ่ม productivity"
    },
    tomorrowFocusByActivity: {
      lightCodingAiAssist: "พักตา ลดการคุม context ต่อเนื่อง และปิด loop งานทีละจุด",
      shortQualityRun: "รอบถัดไปอาจกลับไป easy หรือ steady เพื่อบาลานซ์จังหวะที่เร็วขึ้นวันนี้"
    },
    options: {
      energy: { low: "ต่ำ", medium: "กลาง", good: "ดี" },
      mind: { very_heavy: "หนักมาก", uneasy: "ไม่สบายใจ", pressured: "กดดัน", neutral: "เฉย ๆ", okay: "พอไหว", feeling_good: "รู้สึกดี", relaxed: "ผ่อนคลาย" },
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
        rest: "วันพัก",
        lightRecoveryDay: "วันเบา / ฟื้นตัว",
        officeWork: "งานออฟฟิศ / ประชุมและเอกสาร",
        lightCodingAiAssist: "โค้ดดิ้งเบา ๆ / AI ช่วยงาน",
        outdoorWork: "ทำงานกลางแจ้ง / ใช้แรงและเสียเหงื่อ",
        dentalFocus: "หมอฟัน / เคสคลินิกละเอียด",
        clinicalShift: "แพทย์ / เวรตรวจหรือดูแลคนไข้",
        photoshoot: "ช่างภาพ / งานถ่ายยาว",
        marketWatch: "นักลงทุน / เฝ้าตลาดหรือวิเคราะห์",
        badminton: "แบดมินตัน",
        easyRun: "Easy run",
        shortQualityRun: "วิ่งคุณภาพระยะสั้น",
        longRun: "Long run",
        heavyPingPong: "ปิงปองหนัก",
        longWalk: "เดินเยอะ",
        deepWork: "Deep work / coding นาน",
        lowSleep: "นอนน้อย"
      },
      activityGroups: {
        work: "งาน",
        sports: "กีฬา",
        recovery: "วันเบา / ฟื้นตัว"
      },
      practiceRoots: {
        body: "กาย",
        feeling_tone: "เวทนา",
        mind_thought: "จิต / คิด",
        dhamma: "ธรรม",
        other_or_none: "ไม่ได้ภาวนา / อื่น ๆ"
      },
      practiceTypes: {
        standing: "รู้ท่ายืน",
        walking: "รู้การเดิน",
        sitting: "รู้ท่านั่ง",
        lying_down: "รู้ท่านอน",
        breath_awareness: "รู้ลมหายใจ",
        body_movement: "รู้กายเคลื่อนไหว",
        pleasant: "คิดถึงความพอดี",
        unpleasant: "คิดถึงความเบา",
        neutral_feeling: "คิดถึงความขอบคุณ",
        uneasy_tone: "คิดถึงความสงบ",
        body_discomfort: "คิดถึงความดีที่เกิดขึ้น",
        tense_mind: "คิดถึงความไม่เที่ยง",
        observe_mind: "รู้จิต",
        notice_thoughts: "เห็นความคิด",
        buddho: "บริกรรมพุทโธ",
        gentle_phrase: "ใช้คำบริกรรมที่ชอบ",
        scattered_mind: "รู้ใจฟุ้ง",
        calm_mind: "รู้ใจสงบ",
        notice_impermanence: "คิดถึงไตรลักษณ์",
        notice_defilement: "คิดแล้วเห็นกิเลส",
        recollect_goodness: "คิดถึงความดีที่ทำ",
        recollect_virtue: "คิดถึงศีลที่รักษา",
        see_and_release: "เห็นแล้ววาง",
        notice_wanting: "คิดแล้วเห็นความอยาก",
        just_resting: "พักเฉย ๆ",
        body_awareness: "รู้กาย",
        walking_awareness: "เดินรู้ตัว",
        metta: "เมตตา",
        karuna: "กรุณา",
        mudita: "มุทิตา",
        upekkha: "อุเบกขา",
        buddha_recollection: "ระลึกถึงพระพุทธ",
        dhamma_recollection: "ระลึกถึงธรรม",
        sangha_recollection: "ระลึกถึงสงฆ์",
        virtue_recollection: "ระลึกถึงศีล",
        generosity_recollection: "ระลึกถึงการให้",
        peace_recollection: "ระลึกถึงความสงบ",
        impermanence: "เห็นความไม่เที่ยง",
        let_it_be_lighter: "วางเบา ๆ",
        see_without_following: "เห็นแล้วไม่ตาม",
        body_elements: "ดูกายเป็นธาตุ",
        food_as_it_is: "เห็นอาหารตามจริง",
        simple_body_awareness: "กลับมาง่าย ๆ กับกาย",
        light: "แสง",
        color: "สี",
        open_space: "พื้นที่ว่าง",
        none: "ไม่ได้ภาวนา",
        other: "อื่น ๆ"
      },
      practiceTypeHelpers: {
        standing: "สังเกตกายตามที่กำลังเป็น ไม่ต้องทำให้สงบหรือพิเศษ",
        walking: "สังเกตกายตามที่กำลังเป็น ไม่ต้องทำให้สงบหรือพิเศษ",
        sitting: "สังเกตกายตามที่กำลังเป็น ไม่ต้องทำให้สงบหรือพิเศษ",
        lying_down: "สังเกตกายตามที่กำลังเป็น ไม่ต้องทำให้สงบหรือพิเศษ",
        breath_awareness: "สังเกตกายตามที่กำลังเป็น ไม่ต้องทำให้สงบหรือพิเศษ",
        body_movement: "สังเกตกายตามที่กำลังเป็น ไม่ต้องทำให้สงบหรือพิเศษ",
        pleasant: "ระลึกถึงสิ่งที่เกื้อกูลใจ โดยไม่ต้องบังคับให้รู้สึกดี",
        unpleasant: "ระลึกถึงสิ่งที่เกื้อกูลใจ โดยไม่ต้องบังคับให้รู้สึกดี",
        neutral_feeling: "ระลึกถึงสิ่งที่เกื้อกูลใจ โดยไม่ต้องบังคับให้รู้สึกดี",
        uneasy_tone: "ระลึกถึงสิ่งที่เกื้อกูลใจ โดยไม่ต้องบังคับให้รู้สึกดี",
        body_discomfort: "ระลึกถึงสิ่งที่เกื้อกูลใจ โดยไม่ต้องบังคับให้รู้สึกดี",
        tense_mind: "คิดถึงความไม่เที่ยงแบบเบา ๆ ไม่ต้องไปจับความลำบากตรง ๆ",
        observe_mind: "เห็นจิตหรือความคิดที่เกิดขึ้น ไม่ต้องเข้าไปเถียงกับมัน",
        notice_thoughts: "เห็นจิตหรือความคิดที่เกิดขึ้น ไม่ต้องเข้าไปเถียงกับมัน",
        buddho: "ใช้คำเป็นฐานเบา ๆ โดยไม่กดดันตัวเอง",
        gentle_phrase: "เลือกคำที่ไม่ยั่วกิเลสและไม่กดดันตัวเอง",
        scattered_mind: "เห็นจิตหรือความคิดที่เกิดขึ้น ไม่ต้องเข้าไปเถียงกับมัน",
        calm_mind: "เห็นจิตหรือความคิดที่เกิดขึ้น ไม่ต้องเข้าไปเถียงกับมัน",
        notice_impermanence: "เห็นสิ่งที่เกิดขึ้นเป็นธรรมดา ไม่ต้องตัดสินว่าภาวนาดีหรือไม่ดี",
        notice_defilement: "เห็นสิ่งที่เกิดขึ้นเป็นธรรมดา ไม่ต้องตัดสินว่าภาวนาดีหรือไม่ดี",
        recollect_goodness: "เห็นสิ่งที่เกิดขึ้นเป็นธรรมดา ไม่ต้องตัดสินว่าภาวนาดีหรือไม่ดี",
        recollect_virtue: "เห็นสิ่งที่เกิดขึ้นเป็นธรรมดา ไม่ต้องตัดสินว่าภาวนาดีหรือไม่ดี",
        see_and_release: "เห็นสิ่งที่เกิดขึ้นเป็นธรรมดา ไม่ต้องตัดสินว่าภาวนาดีหรือไม่ดี",
        notice_wanting: "เห็นสิ่งที่เกิดขึ้นเป็นธรรมดา ไม่ต้องตัดสินว่าภาวนาดีหรือไม่ดี",
        just_resting: "ไม่เลือกก็ได้ วันนี้แค่รู้ว่ามีหรือไม่มีฐานก็พอ",
        body_awareness: "รู้กายเท่าที่รู้ได้ ไม่ต้องทำให้ดีเป็นพิเศษ",
        walking_awareness: "เดินรู้ตัวแบบนุ่ม ๆ ไม่ต้องทำให้เป็น performance",
        metta: "วางใจให้อ่อนลง โดยไม่ต้องบังคับให้รู้สึกดี",
        karuna: "ให้ใจรับรู้ความลำบากโดยไม่ต้องรีบแก้ทั้งหมด",
        mudita: "รับรู้สิ่งดีเล็ก ๆ โดยไม่ต้องขยายให้ใหญ่เกินจริง",
        upekkha: "เห็นสิ่งที่เกิดขึ้น แล้ววางไว้เท่าที่วางได้",
        buddha_recollection: "ระลึกเป็นฐานวางใจ ไม่ใช่การพิสูจน์อะไร",
        dhamma_recollection: "กลับมาหาความจริงง่าย ๆ ที่พอเห็นได้วันนี้",
        sangha_recollection: "ระลึกถึงการไม่ต้องเดินคนเดียวในทางนี้",
        virtue_recollection: "เห็นความตั้งใจดีที่ยังพยุงใจอยู่",
        generosity_recollection: "นึกถึงการให้แบบไม่ต้องกดดันตัวเอง",
        peace_recollection: "ระลึกถึงความสงบเท่าที่แตะได้ ไม่ต้องบังคับ",
        impermanence: "เห็นการเปลี่ยนไป โดยไม่ต้องรีบสรุปตัวเอง",
        let_it_be_lighter: "วางให้เบาลงเท่าที่วางได้ ไม่ต้องวางหมดทันที",
        see_without_following: "เห็นแล้วไม่ต้องตามทุกความคิดไป",
        body_elements: "ดูกายเป็นธรรมชาติของธาตุ ไม่ใช่ตัวตัดสินเรา",
        food_as_it_is: "เห็นอาหารตามจริงแบบเบา ๆ ไม่ใช่ความผิด",
        simple_body_awareness: "กลับมาง่าย ๆ กับกายเท่าที่รู้ได้",
        light: "ใช้แสงเป็นฐานนิ่ง ๆ แบบไม่ต้องเพ่งแรง",
        color: "ใช้สีเป็นจุดวางใจเล็ก ๆ ไม่ต้องทำให้พิเศษ",
        open_space: "ให้พื้นที่ว่างช่วยพาใจคลายลงเล็กน้อย",
        none: "วันนี้ไม่ได้ภาวนาก็เป็นข้อมูลได้ ไม่ใช่ความผิด",
        other: "ใช้คำว่าอื่น ๆ ได้ ถ้าวันนี้มีฐานเฉพาะของตัวเอง"
      },
      mindNote: {
        feeling: {
          calm: "เฉย ๆ",
          uneasy: "ไม่สบายใจ",
          worried: "กังวล",
          pressured: "กดดัน",
          tired: "ล้า",
          scattered: "ฟุ้ง",
          feeling_good: "🩵 อิ่มใจ",
          grateful: "😊 ขอบคุณ",
          peaceful: "🌿 สงบ",
          proud: "✨ ภูมิใจ",
          learning: "กำลังเรียนรู้",
          thinking: "กำลังคิด"
        },
        support: {
          rest_first: "พักก่อน",
          see_pattern: "เห็น pattern",
          reduce_pressure: "ลดความกดดัน",
          hydrate_gently: "จิบน้ำเบา ๆ",
          set_down: "วางไว้ก่อน",
          walk_gently: "เดินต่อเบา ๆ",
          thank_self: "ขอบคุณตัวเอง",
          stay_present: "อยู่กับปัจจุบัน"
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
    appShortTitle: "Mindful Health Balance",
    title: "Mindful Health Balance by MSxAI",
    version: "v2.1 — Gentle Mind Note",
    subtitle: "A local-first reflective health log with Field Review and Signal Engine.",
    viewTabsAria: "Choose app view",
    tabToday: "Today",
    tabReflection: "Reflection/NuTuenSai",
    tabFieldReview: "Field Review",
    tabLog: "Log",
    todayViewTitle: "Today’s Signals",
    todayStepOneLabel: "Today’s Signals 1/2",
    todayStepTwoLabel: "Mind Note 2/2",
    todayStepSwitcherAria: "Switch between Today’s Signals and Mind Note",
    todayStepOneHelper: "Gently fill today's signals: Inner State, Water, Drinks, and Work / Activity.",
    honestDataTodayNote: "Fill only what is true enough. Honest data matters more than complete data.",
    honestDataBlankNote: "Blank fields mean not recorded, not a mistake or a missing score.",
    todayStepTwoHelper: "Place a short mind note before moving to Reflection/NuTuenSai.",
    dailySaveStatusEmpty: "No Daily Log saved for today yet — fill what is true enough and save when ready.",
    dailySaveStatusPartial: "Saved today: {savedSections} · Still optional: {unsavedSections}",
    dailySaveStatusSaved: "Saved today: {savedSections} — you can still update sections without erasing saved data.",
    dailySaveStatusSavedNone: "Today’s Daily Log exists — blank sections still mean not recorded.",
    dailySaveSectionSignals: "Today’s Signals",
    dailySaveSectionMindNote: "Mind Note",
    dailySaveSectionReflection: "Reflection",
    todayStepNext: "Next: Mind Note 2/2",
    todayStepBack: "Back to 1/2",
    todayStepReflection: "Go to Reflection/NuTuenSai",
    todayCurrentFormSummaryTitle: "Current Form",
    todayCurrentFormSummaryText: "Your current input is still preserved. Go to Reflection/NuTuenSai to review and save when ready.",
    dailySignalCockpitKicker: "Daily Signal Cockpit",
    dailySignalCockpitTitle: "Daily Signal Cockpit",
    dailySignalCockpitHelper: "Choose one signal to fill in at a time.",
    cockpitStateLabel: "Inner State",
    cockpitWaterLabel: "Water",
    cockpitDrinksLabel: "Drinks",
    cockpitWorkActivityLabel: "Work / Activity",
    cockpitStatusEmpty: "Empty",
    cockpitStatusPartial: "Started",
    cockpitStatusComplete: "Readable",
    cockpitStateEmpty: "No inner state yet",
    cockpitStateSummary: "{items}",
    cockpitWaterEmpty: "0 ml",
    cockpitWaterSummary: "{water} ml",
    cockpitDrinksEmpty: "No drinks yet",
    cockpitDrinksSummary: "{count} item(s)",
    cockpitDrinksLoadSummary: "{count} item(s) · Sugar {sugar} / Caffeine {caffeine}",
    cockpitLoadEmpty: "No activity yet",
    cockpitLoadSummary: "{level} · {activity}",
    cockpitLoadLight: "Light rhythm",
    cockpitLoadMedium: "Steady effort",
    cockpitLoadHeavy: "Sustained load",
    cockpitHydrationReturningBase: "returning to base",
    cockpitHydrationBaseVisible: "water base visible",
    cockpitCaffeineHigh: "caffeine high",
    cockpitSweetVisible: "sweetness visible",
    cockpitBalanceEmpty: "Still listening for signals",
    cockpitBalanceOne: "Today is starting to appear",
    cockpitBalanceReadable: "Today is readable enough",
    cockpitBalanceReady: "Ready for Reflection",
    reflectionViewTitle: "Reflection",
    reflectionViewHelper: "Review today’s reflection, then save it to the Daily Log when ready.",
    reflectionGeneratorHelper: "Reflect creates a reflection from today's signals. You can still edit it lightly before saving.",
    reflectionActionsKicker: "Ready to save",
    reflectionRootPickerKicker: "Reflection Root",
    reflectionRootPickerTitle: "Which root should NuTuenSai read through today?",
    reflectionRootPickerHelper: "Choose a gentle starting point for this Reflection. Other signals stay as supporting context.",
    reflectionRootSelectedLabel: "Selected root: {root}",
    reflectionRootBoundaryDefault: "This is not a conclusion or medical advice. It is only a gentle starting point for noticing.",
    reflectionRootBoundaryMind: "Mind context remains user-owned meaning. NuTuenSai can reflect it, not define it for you.",
    reflectionRootBoundaryPractice: "Practice is self-care context, not a score or measure of success.",
    reflectionRootBoundaryDrinks: "This reads drink context, not diet judgment, drink judgment, or medical advice.",
    reflectionRootOptionAuto: "Auto",
    reflectionRootOptionHydration: "Water",
    reflectionRootOptionSleep: "Rest",
    reflectionRootOptionLoad: "Activity",
    reflectionRootOptionDrinks: "Drinks",
    reflectionRootOptionMind: "Mind",
    reflectionRootOptionPractice: "Practice",
    reflectionRootPreviewAuto: "Let NuTuenSai hold the root lightly from the data you recorded, without deciding the meaning for you.",
    reflectionRootPreviewHydration: "This round will read mainly through water, with activity, drinks, and daily context as the surrounding scene.",
    reflectionRootPreviewSleep: "This round will read mainly through sleep and recovery, with caffeine, daily load, and energy as supporting context.",
    reflectionRootPreviewLoad: "This round will read mainly through activity and daily load, while noticing how water, rest, and energy sit around that rhythm.",
    reflectionRootPreviewDrinks: "This round will read mainly through drinks, caffeine, and sweetness without judging drink choices or health.",
    reflectionRootPreviewMind: "This round will give space to the mind context you recorded, without defining your inner state for you.",
    reflectionRootPreviewPractice: "This round will read practice and self-care context as part of the day, not as a score or right/wrong measure.",
    reflectionRootOpeningHydration: "This round, NuTuenSai will read mainly through the hydration root.",
    reflectionRootOpeningSleep: "This round, NuTuenSai will read mainly through the sleep and recovery root.",
    reflectionRootOpeningLoad: "This round, NuTuenSai will read mainly through the daily activity and load root.",
    reflectionRootOpeningDrinks: "This round, NuTuenSai will read mainly through the drinks, caffeine, and sweetness root.",
    reflectionRootOpeningMind: "This round, NuTuenSai will give space to the mind context you recorded.",
    reflectionRootOpeningPractice: "This round, NuTuenSai will read practice and self-care context as part of the day.",
    reflectionRootHintHydration: "Recorded water intake is the starting point here, with activity, drinks, and daily context held as the surrounding scene.",
    reflectionRootHintSleep: "Sleep hours and recovery signals come first, while caffeine, daily load, and energy stay as surrounding context.",
    reflectionRootHintLoad: "Daily activity, work, or body-use load comes first, then water, rest, and energy are read around that rhythm.",
    reflectionRootHintDrinks: "Drinks, caffeine, and sweetness context lead this round, with sleep, load, and energy read gently around them.",
    reflectionRootHintMind: "Mind Note and recorded mind context lead this round. NuTuenSai reflects them without defining your inner state for you.",
    reflectionRootHintPractice: "Practice time and self-care notes are read as daily context, not as a score or measure of success.",
    reflectionRootHintThin: "This root has only a little recorded data today, so NuTuenSai will read it lightly and stay close to what was saved.",
    todayInputShortcutsAria: "Today input shortcuts",
    backToSignalCockpit: "Back to cockpit",
    backToTodayStepOne: "Back to Today 1/2",
    backToTodayStepTwo: "Back to Mind Note 2/2",
    logViewTitle: "Log & Export",
    logViewHelper: "Review saved logs and manage your backup files.",
    logControlsTitle: "Backup Controls",
    fieldReviewViewTitle: "Read rhythm from Daily_Log",
    fieldReviewViewHelper: "NuTuenSai reads the selected saved data to surface patterns within clear boundaries.",
    fieldReviewBoundaryKicker: "LOCAL FIELD REVIEW",
    fieldReviewControlsTitle: "Choose the rhythm to read",
    fieldReviewSafetyCopy: "Not diagnosis, not medical advice, and not cause-and-effect.",
    fieldReviewTimeframeLabel: "Timeframe",
    fieldReviewTimeframe7: "7 days",
    fieldReviewTimeframe14: "14 days",
    fieldReviewTimeframe30: "30 days",
    fieldReviewTimeframeAll: "All",
    fieldReviewStatusKicker: "Daily_Log summary",
    fieldReviewStatusTitle: "Selected Daily_Log summary",
    fieldReviewSourceNote: "Reads Daily_Log in this browser. Import Master Excel first to review a workbook.",
    fieldReviewEmptyState: "No Daily Log data available for review yet.",
    fieldReviewThinState: "The data is still thin, so this review only shows early signals.",
    fieldReviewNoDataStatus: "No data available for review yet",
    fieldReviewDataStatus: "Using {used} days from {total} saved days",
    fieldReviewAllDataStatus: "Using all {used} saved days",
    fieldReviewRowsEvidence: "{count} selected days",
    fieldReviewHydrationTitle: "Hydration pattern",
    fieldReviewHydrationEmpty: "There is no water amount recorded in the selected range, so hydration can only be read lightly.",
    fieldReviewHydrationEvidence: "Average {average} ml · min {min} ml · max {max} ml · within the reference range {inRange}/{recorded} days · below {below} · above {above}",
    fieldReviewHydrationNote: "Read this together with load, sleep, and activity, not as a single-day judgment. Water_ml means milliliters of plain water, not money or expense.",
    fieldReviewSleepTitle: "Sleep / recovery pattern",
    fieldReviewSleepSummary: "Sleep/recovery signals appear in the selected range and can be read gently.",
    fieldReviewSleepLight: "Sleep/recovery does not show a heavy pattern in the selected saved data.",
    fieldReviewSleepEvidence: "Thin or low sleep/recovery days {lowSleep} · low-energy days {lowEnergy}",
    fieldReviewSleepNote: "Read this as a recovery signal, not diagnosis or risk prediction.",
    fieldReviewLoadTitle: "Load / recovery pattern",
    fieldReviewLoadSummary: "High-load days appear in the selected range, so they can be read alongside sleep and energy.",
    fieldReviewLoadLight: "Load does not appear especially heavy in the selected saved data.",
    fieldReviewLoadEvidence: "High-load days {highLoad} · high load with low sleep/recovery {highLoadLowSleep} · high load with low energy {highLoadLowEnergy}",
    fieldReviewLoadNote: "This is a signal to leave room for recovery, not a performance or health score.",
    fieldReviewDrinksTitle: "Drinks / caffeine / sweetness pattern",
    fieldReviewDrinksSummary: "Drinks, caffeine, or sweetness appear in the selected range.",
    fieldReviewDrinksLight: "Caffeine and sweetness drink-load appear light in the selected range.",
    fieldReviewDrinksEvidence: "Caffeine days {caffeineDays} · sweet-drink days {sweetDays} · high-sugar days {highSugarDays}",
    fieldReviewDrinksNote: "Read this as drink-load context only. It does not estimate calories, exact caffeine mg, expenses, purchases, or prices.",
    fieldReviewMindTitle: "Mind Note / support need pattern",
    fieldReviewMindSummary: "Mind Notes or support needs are present as user-owned review context.",
    fieldReviewMindEmpty: "There are not many Mind Notes or support needs in the selected range yet.",
    fieldReviewMindEvidence: "Days with Mind Note {mindNoteDays} · days with support need {supportDays} · days with Practice Note {practiceNoteDays}",
    fieldReviewMindNote: "These notes are context, not personality diagnosis, mind score, spiritual score, merit score, or self-worth judgment.",
    fieldReviewMissingTitle: "Missing / blank data pattern",
    fieldReviewMissingSummary: "Some fields are blank in the selected range, which shows where data was not recorded.",
    fieldReviewMissingLight: "Most key fields have enough saved data for this light review.",
    fieldReviewMissingEvidence: "Blank or not-recorded fields: {items}",
    fieldReviewMissingNone: "No key fields are frequently blank in the selected range.",
    fieldReviewMissingNote: "Blank means not recorded, not failure, not a missing score, and not something to fill by guessing.",
    fieldReviewMissingItemSleep: "Sleep {count}",
    fieldReviewMissingItemWater: "Water_ml {count}",
    fieldReviewMissingItemActivities: "Activities {count}",
    fieldReviewMissingItemMindNote: "Mind Note {count}",
    fieldReviewOverviewReviewedDays: "Reviewed days",
    fieldReviewOverviewAverageWater: "Average water",
    fieldReviewOverviewHighLoad: "High-load days",
    fieldReviewOverviewLowRecovery: "Low sleep/recovery days",
    fieldReviewOverviewDrinkLoad: "Drink-context days",
    fieldReviewOverviewMindNote: "Mind Note days",
    fieldReviewOverviewNoValue: "Not yet",
    fieldReviewEvidenceLabel: "Evidence from Daily_Log",
    fieldReviewReadingLabel: "NuTuenSai reads",
    fieldReviewNextAttentionLabel: "Next gentle attention",
    fieldRoomWorkspaceKicker: "Guided Field Rooms",
    fieldRoomWorkspaceTitle: "Choose a data room",
    fieldRoomHydrationLabel: "Hydration",
    fieldRoomSleepRecoveryLabel: "Sleep / Recovery",
    fieldRoomLoadRecoveryLabel: "Load / Recovery",
    fieldRoomDrinksLabel: "Drinks Context",
    fieldRoomMindNoteLabel: "Mind Note",
    fieldRoomMissingLabel: "Missing / Blank",
    fieldRoomSignalEngineLabel: "Signal Engine",
    fieldRoomSourceLabel: "Selected window",
    fieldRoomSourceBubble: "NuTuenSai is reading the selected Daily_Log window: {timeframe}.",
    fieldRoomFlowModeLabel: "Guided question branches · Not an LLM",
    fieldRoomHydrationFlowModeLabel: "Guided question branches · Not an LLM",
    fieldRoomQuestionLabel: "NuTuenSai asks",
    fieldRoomQuestionHydration: "Which hydration angle would you like NuTuenSai to read?",
    fieldRoomQuestionSleepRecovery: "Which sleep/recovery angle would you like NuTuenSai to read?",
    fieldRoomQuestionLoadRecovery: "Which load and recovery angle would you like NuTuenSai to read?",
    fieldRoomQuestionDrinks: "Which drinks context angle would you like to view?",
    fieldRoomQuestionMindNote: "Which Mind Note angle would you like NuTuenSai to read?",
    fieldRoomQuestionMissing: "Which blank-data angle would you like to view?",
    fieldRoomWelcomeLabel: "NuTuenSai welcomes you",
    fieldRoomHydrationWelcome: "Here, NuTuenSai will read the water rhythm only as far as the saved data allows. It is daily context, not a hydration diagnosis or a self-care score.",
    fieldRoomHydrationSpeakerLabel: "NuTuenSai",
    fieldRoomHydrationUserSpeakerLabel: "You",
    fieldRoomHydrationChoicePrompt: "Choose the response that matches the angle you would like to explore.",
    fieldRoomHydrationContinuePrompt: "If you would like to continue, you can choose another angle.",
    fieldRoomConversationExit: "🚪 Enough for now",
    fieldRoomHydrationRestart: "⌂ Choose a new angle",
    fieldRoomHydrationResume: "↩ Return to reading",
    fieldRoomHydrationBack: "← Back",
    fieldRoomHydrationNextAngle: "Read next angle →",
    fieldRoomHydrationChooseAgain: "⌂ Choose an angle",
    fieldRoomHydrationProgressLabel: "Hydration reading progress",
    fieldRoomCurrentReadingLabel: "Reading now • {angle}",
    fieldRoomConversationClosing: "It is okay to stop here. We do not need to conclude everything today; seeing one rhythm of body and mind more clearly is enough. 🩵",
    fieldRoomActionLabel: "Choose what to read next",
    fieldRoomFocusOverview: "Overview",
    fieldRoomFocusEvidence: "Evidence from data",
    fieldRoomFocusNext: "Next gentle attention",
    fieldRoomFocusAll: "Show all",
    fieldRoomNextButton: "View next room",
    fieldRoomNextRoomButton: "Continue to {room}",
    fieldRoomNextPrompt: "Continue to another room",
    fieldRoomNextHelper: "You can choose the room you want to explore next.",
    fieldRoomRelatedButton: "Continue to {room}",
    fieldRoomTransitionHydration: "Water rhythm and daily context",
    fieldRoomTransitionSleepRecovery: "Rest rhythm and energy",
    fieldRoomTransitionLoadRecovery: "Activity rhythm and recovery",
    fieldRoomTransitionDrinks: "Coffee, sweet drinks, and drink patterns",
    fieldRoomTransitionMindNote: "Saved Mind Note space",
    fieldRoomTransitionMissing: "What the data cannot yet summarize",
    fieldRoomTransitionSignalEngine: "Signals that move together",
    signalEngineTitle: "Signal Relationship Engine",
    signalEngineKicker: "Signals moving together",
    signalEngineSubtitle: "This page reads which saved signals move together in Daily_Log. It is not causation, diagnosis, or medical advice.",
    signalEngineBoundary: "Correlation is not causation, diagnosis, or medical advice.",
    signalEngineThinState: "There are not enough paired numeric records to read relationships safely yet.",
    signalEngineCategoryNote: "Category mapping such as Energy, Mind, Sleep, Load_Level, and Mind_Note_Support is future work and must be explicit before use.",
    signalEnginePairedDays: "{count} paired days",
    signalEngineCoefficient: "r = {value}",
    signalEngineTentative: "tentative signal",
    signalEngineObserved: "observed pattern",
    signalEngineDirectionPositive: "same-direction signal",
    signalEngineDirectionNegative: "opposite-direction signal",
    signalEngineDirectionNeutral: "unclear",
    signalEngineStrengthUnclear: "near zero / unclear",
    signalEngineStrengthWeak: "weak",
    signalEngineStrengthModerate: "moderate",
    signalEngineStrengthStrong: "strong",
    signalEngineReadingPositive: "NuTuenSai reads this as a {strength} same-direction signal in the saved data. This is not causation.",
    signalEngineReadingNegative: "NuTuenSai reads this as a {strength} opposite-direction signal in the saved data. This is not causation.",
    signalEngineReadingNeutral: "NuTuenSai reads this relationship as unclear in the selected data, so it should be held very lightly.",
    signalEngineNoCoefficient: "r is hidden because paired numeric records and enough variation are needed.",
    signalEngineListLabel: "Clearest relationship signals",
    signalEngineMeaningLabel: "Meaning layer",
    signalEngineSignature: "MHB · NuTuenSai",
    signalEngineNoValidRows: "No signal pair has at least 10 complete paired days in this window yet.",
    signalEngineHiddenPairs: "Pairs not shown because they do not yet have enough paired days or usable numeric variation: {pairs}",
    signalEngineEvidenceLabel: "Evidence",
    signalEngineAuditLabel: "audit line",
    signalEngineNextObservationLabel: "Gentle next observation",
    signalEngineRHelper: "r shows direction and tightness of co-movement, not cause and effect.",
    signalEngineLegendTitle: "How to read",
    signalEngineLegendSame: "Same direction = signals tend to rise/fall together",
    signalEngineLegendOpposite: "Opposite direction = one rises while the other tends to fall",
    signalEngineLegendUnclear: "Unclear = no clear co-moving rhythm yet",
    signalEngineSummarySameWeak: "Same direction, light signal",
    signalEngineSummarySameModerate: "Same direction, visible shared rhythm",
    signalEngineSummarySameStrong: "Same direction, fairly clear in this window",
    signalEngineSummaryOppositeWeak: "Opposite direction, light signal",
    signalEngineSummaryOppositeModerate: "Opposite direction, visible shared rhythm",
    signalEngineSummaryOppositeStrong: "Opposite direction, fairly clear in this window",
    signalEngineSummaryNearZero: "No clear co-moving rhythm yet",
    signalEngineMeaningPositive: "NuTuenSai reads these two signals as moving in the same direction in the saved data. When {xLabel} is higher, {yLabel} tends to appear higher to some degree. The signal strength is {strength}, and it should be read only within the {pairedDays} available here.",
    signalEngineMeaningNegative: "NuTuenSai reads these two signals as moving in opposite directions in the saved data. When {xLabel} is higher, {yLabel} tends to appear lower to some degree. The signal strength is {strength}, and it should be read only within the {pairedDays} available here.",
    signalEngineMeaningNeutral: "NuTuenSai reads these two signals as not clearly moving together in the selected data, so this should be held as a very light signal rather than a conclusion.",
    fieldReviewWindowVoice7: "In this 7-day window, this is an early signal rather than a conclusion.",
    fieldReviewWindowVoice14: "Across 14 days, some repeated rhythm starts to become visible.",
    fieldReviewWindowVoice30: "Across 30 days, the data starts to show a month-level rhythm.",
    fieldReviewWindowVoiceAll: "Across all available data, this becomes a long-view reflection, while each day still has its own context.",
    fieldReviewHydrationReadingEmpty: "NuTuenSai can only read hydration lightly here because no clear Water_ml values are recorded in this window.",
    fieldReviewHydrationReadingBelow: "Average hydration is below the context-aware reference range.",
    fieldReviewHydrationReadingNearLower: "Average hydration is near the lower edge of the context-aware reference range.",
    fieldReviewHydrationReadingInRange: "Average hydration is within the context-aware reference range.",
    fieldReviewHydrationReadingAbove: "Average hydration is above the context-aware reference range.",
    fieldReviewHydrationReadingCount: "{inRange} of {recorded} recorded days are within that range.",
    fieldReviewHydrationNextLowLoad: "Next time, review days below their reference range together with load, sleep, and activity.",
    fieldReviewHydrationNextDefault: "Next time, review days below or above their reference range with load, sleep, and activity, without expecting identical intake every day.",
    fieldReviewSleepReadingSignal: "NuTuenSai reads these as sleep/recovery signals that deserve gentle space, especially near low-energy or high-load days.",
    fieldReviewSleepReadingLight: "NuTuenSai does not read a heavy sleep/recovery pattern from the selected saved data.",
    fieldReviewSleepNextSignal: "Gently notice what load, caffeine, or Mind Note context sits beside lower sleep/recovery days.",
    fieldReviewSleepNextDefault: "If more sleep data appears next time, NuTuenSai can read the recovery rhythm more clearly.",
    fieldReviewLoadReadingHigh: "High-load days do not mean good or bad. NuTuenSai reads them as signals to see whether recovery had room to follow the day.",
    fieldReviewLoadReadingLight: "NuTuenSai reads the selected load pattern as not especially heavy, while still keeping each day in context.",
    fieldReviewLoadNextRecovery: "Gently notice days where high load appears with low sleep/recovery.",
    fieldReviewLoadNextDefault: "For the next review, notice what kind of day high load appears in and whether recovery follows.",
    fieldReviewDrinksReadingSignal: "NuTuenSai reads this as drink-load context, not calories, exact caffeine mg, expenses, purchases, or prices.",
    fieldReviewDrinksReadingLight: "NuTuenSai reads caffeine and sweetness drink-load as light in the selected window.",
    fieldReviewDrinksNextSignal: "Gently notice caffeine or sweetness days alongside sleep, water, and load without judging the drink.",
    fieldReviewDrinksNextDefault: "If more drink context appears next time, NuTuenSai can read the rhythm gently without judging it.",
    fieldReviewMindReadingSignal: "Mind Note is a user-owned context space. NuTuenSai reads it as a trace of care, not diagnosis.",
    fieldReviewMindReadingEmpty: "There are not many Mind Notes or support needs here yet, so NuTuenSai reads this as space that can remain open.",
    fieldReviewMindNextSignal: "Gently notice which support needs repeat and what body or load context appears near them.",
    fieldReviewMindNextDefault: "If more Mind Notes appear next time, NuTuenSai will read them as care context, not identity assessment.",
    fieldReviewMissingReadingSignal: "Blank fields mean not recorded, not failure. Honest data matters more than complete data.",
    fieldReviewMissingReadingLight: "NuTuenSai reads the key data as enough for a light review, while blank fields can still remain blank.",
    fieldReviewMissingNextSignal: "Choose only one field you may want to record more steadily. There is no need to complete everything.",
    fieldReviewMissingNextDefault: "Next time, keep recording what is true enough. Truthful data matters more than completeness.",
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
    noticeTitle: "Boundary-aware field review",
    noticeText: "Reads patterns and co-moving signals from saved data. It is not diagnosis, medical advice, or cause and effect.",
    todayState: "Today State",
    todayStateHeading: "How are your body and mind today?",
    todayStateCue: "Quick observation for today",
    energyLabel: "Energy",
    mindLabel: "Overall Mind Today",
    mindScaleHelper: "Choose the word closest to today’s mind. Neutral is the middle point, not a score.",
    sleepLabel: "Sleep",
    sleepHoursLabel: "Sleep hours",
    sleepHoursUnit: "hours",
    sleepHoursPlaceholder: "6.5",
    sleepDerivedEmpty: "Add hours if available",
    sleepDerivedBadge: "Read as: {sleep}",
    sleepFallbackHelper: "If hours are unclear, choose a rough category below.",
    hydration: "Hydration",
    hydrationHeading: "Water today",
    hydrationGuidanceBase: "Estimated hydration range today: {min}-{max} ml",
    hydrationGuidanceRange: "Estimated hydration range today: {min}-{max} ml",
    hydrationGuidanceCueBase: "Sip gradually without rushing the number.",
    hydrationGuidanceCueCognitive: "Today has cognitive or decision load. Water can stay as a recovery base.",
    hydrationGuidanceCueLightSport: "Today has some body effort or sweat. Add a little more water than a normal day, gradually.",
    hydrationGuidanceCueShortQualitySport: "Today has intensity even if the distance was not long. Hydration can follow effort, not only distance.",
    hydrationGuidanceCueLongRunHeavySweat: "Today is a long-run / sport-sweat load. Around 3.0 L can be a good zone; if sweat is high or urine is dark, add small sips gradually.",
    hydrationGuidanceCueLongRunGoodZone: "Above 3.0 L is already a good zone. If sweat is still high or urine is dark, add small sips gradually through the day.",
    hydrationGuidanceCueHighWater: "Water is already quite high today. Do not force more; spread intake and observe body cues.",
    hydrationGuidanceCueOutdoor: "Heat, sweat, or outdoor conditions are part of today. Increase gently and give the body short pauses.",
    hydrationGuidanceCueCaffeine: "Caffeine may support alertness, but plain water can remain the base.",
    hydrationGuidanceCueRecovery: "Today has a recovery signal. Keep plain water as a gentle base alongside rest.",
    hydrationGuidanceCueActivityRecovery: "Today has both activity load and a recovery signal. Pair gradual sips with recovery.",
    hydrationGuidanceCueUpperBound: "If intake goes near 3.5–4.0 L, spread it through the day and use thirst/urine color as gentle cues rather than forcing more at once.",
    halfBottle: "+half bottle",
    resetButton: "Reset",
    drinks: "Drinks",
    drinksHeading: "Drink Profile today",
    drinksHelper: "Log drinks other than plain water, such as coffee, tea, cocoa, sweet drinks, or juice.",
    drinkInsightTitle: "Drink insight",
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
    runDetailTitle: "Run detail today (optional)",
    runDetailHelper: "Used only for load / hydration / recovery context, not coaching.",
    runDistanceLabel: "Distance (km)",
    runDurationLabel: "Duration",
    runDurationHoursLabel: "Hours",
    runDurationMinutesLabel: "Minutes",
    runSweatLabel: "Sweat",
    runSweatEmpty: "Not set",
    runSweatLow: "Low",
    runSweatMedium: "Medium",
    runSweatHigh: "High",
    runPaceEmpty: "Pace not set",
    runPaceBadge: "Avg pace {pace}",
    mindfulReminder: "Mindful Reminder",
    nuTuenSaiNote: "NuTuenSai note",
    nuTuenSaiRole: "NuTuenSai is a gentle reflection layer for noticing patterns, not a diagnosis tool or medical advice.",
    nuTuenSaiEmptyReminder: "Welcome back. There isn’t much for NuTuenSai to read yet today. Add a little Today’s Signals first, then come back for a gentle reflection.",
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
    mindNoteKicker: "Mind Note — a small part of today",
    mindNoteTitle: "Mind Note",
    mindNoteSubtitle: "Keep something you want to leave with today.",
    mindNoteCue: "It can be something good, a feeling, something you are learning, or something you want to set down gently.",
    practiceKicker: "Practice context — optional",
    practiceTitle: "What could the mind rest with today?",
    practiceSubtitle: "Choose only what fits today, or leave this blank.",
    practiceRootLabel: "Practice base",
    practiceTypeLabel: "Practice used today",
    practiceDurationLabel: "Duration",
    practiceHoursLabel: "Hours",
    practiceMinutesLabel: "Minutes",
    practiceHoursPlaceholder: "0",
    practiceMinutesPlaceholder: "15",
    practiceNoteLabel: "Practice note / Good action",
    practiceNotePlaceholder: "e.g. fed fish at the temple, recollected a good action, chose not to react",
    practiceNoteHelper: "A short note is enough. This is context, not a score.",
    practiceDurationHint: "Leave blank if needed. No score or streak.",
    practiceDurationBadge: "About {minutes} min total",
    practiceTypeEmpty: "Choose a base first, or leave this blank.",
    practiceHelperDefault: "Choose only what fits today. Nothing has to be complete or special.",
    practiceSummaryEmpty: "No practice selected yet",
    practiceSummaryBase: "A simple base for today",
    practiceSummaryWithMinutes: "{type} · {minutes} min",
    mindNoteTextLabel: "What would you like to keep with today?",
    mindNotePlaceholder: "For example: Running felt comfortable today · I spoke with someone I missed · I am still unsure about several things · I want to thank myself · It is okay if I do not know what to write today",
    mindNoteFeelingLabel: "Feeling in this note",
    mindNoteFeelingHelper: "Choose a word that feels close enough. Every kind of day has room here.",
    mindNoteFeelingGentleLabel: "Gentle / supportive",
    mindNoteFeelingNeutralLabel: "Neutral / noticing",
    mindNoteFeelingHeavyLabel: "Heavy / needs space",
    mindNoteSupportLabel: "What might support the mind today?",
    mindNoteSupportHelper: "Choose a small support if one fits, or leave this blank.",
    mindNoteSupportAria: "Support that might help today",
    generateReflection: "Generate End-of-Day Reflection",
    reflectionPlaceholder: "Click Reflect to create a reflection from today’s signals.",
    localOnly: "Local only",
    dailyLogControls: "Daily Log Controls",
    controlsHelp: "Save today into a local browser table, then export a Master Excel file when you need it.",
    saveDailyLog: "Save Today’s Reflection",
    saveTodayLog: "Save to Daily Log",
    todayResetTitle: "Current Form",
    resetCurrentForm: "Reset Current Form",
    restoreCurrentForm: "Restore Today’s Log",
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
    saveTodayDone: "Saved to Daily Log. You do not have to carry it all in your head now.",
    resetCurrentFormConfirm: "This resets only the current form. Saved Daily Logs will not be deleted.",
    resetCurrentFormDone: "Current form reset. Saved Daily Logs are still here.",
    restoreCurrentFormOverwriteConfirm: "The current form already has unsaved data. Restoring from Daily Log will overwrite the current form only, not the saved log. Continue?",
    restoreLatestLogConfirm: "No Daily Log exists for today. Restore the latest saved row ({date}) into the form?",
    restoreCurrentFormDone: "Daily Log data restored into the current form. It has not been saved again.",
    restoreCurrentFormEmpty: "No saved Daily Log is available to restore.",
    restoreCurrentFormCancelled: "Restore cancelled. The current form is unchanged.",
    replaceConfirm: "A Daily Log already exists for today. The app will update this section and keep other saved sections. Continue?",
    replaceCancelled: "Not updating the existing Daily Log. No need to rush the decision.",
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
    importProfileImported: "Intention Profile imported after confirmation.",
    importProfileCancelled: "Existing Intention Profile was not changed.",
    importProfileEmpty: "No profile was available to import in that sheet.",
    importProfileRejected: "Intention Profile skipped because it did not pass validation: {reason}",
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
      keepBalance: "Keep the balanced rhythm. There is no need to add more than the day asks for.",
      closing1: "You do not have to fix everything today. Seeing the pattern more clearly is already enough for today.",
      closing2: "The goal is not a better number quickly. The goal is a system that does not break from rushing."
    },
    reflectionDisplay: {
      overviewEnergyLayered: "Today, the energy level and its causes may be describing different layers of the day. Both can be true without one signal canceling the other.",
      overviewRecoveryHydratedRest: "Today looks like a day where recovery mattered more than adding more effort. Hydration was enough to serve as a base, and choosing rest first matched the day's energy.",
      overviewRecoveryHydrated: "Today looks like a day where the body needed recovery more than adding anything new. Hydration was enough to serve as a base, and the day does not need to be judged from one signal.",
      overviewRecovery: "Today seems to ask for recovery more than adding anything new. Let hydration, rest, and mind state return to a steady base gradually.",
      overviewActivityHydrated: "Today had more activity load than a rest day. Hydration was enough to serve as a base, and recovery can move together with the day's load.",
      overviewActivity: "Today had more activity load than a rest day. If sweat or sustained effort was part of it, hydration and recovery can gradually catch up with the body.",
      overviewPositiveMindActivity: "Today includes real energy use, while the overall mind state seems supportive. Use that support gently and let recovery move with the load.",
      overviewPositiveMindRecovery: "Today the mind seems supportive, while the body may still be asking for recovery. Both signals can coexist without making the whole day automatically fine.",
      overviewPositiveMindSupport: "Today's overall mind state seems more positive, which may support self-care without needing to push harder.",
      overviewMindNoteFeelingGoodActivity: "This note carries a good feeling, while today still included real energy use. Treat it as a small supportive signal and let recovery move with the load.",
      overviewMindNoteFeelingGoodRecovery: "This note carries a good feeling, while the body may still be asking for recovery. Both signals can coexist without making the whole day perfect.",
      overviewMindNoteFeelingGoodSupport: "This note carries a good feeling. It can be read as a small supportive signal, not as a claim that the whole day was perfect.",
      overviewCaffeine: "Today, caffeine may have supported alertness or rhythm. Plain water can return as the base without making coffee something to feel bad about.",
      overviewSteadyHydration: "Hydration was enough to serve as a base today, so the picture is more about keeping consistency than adding more.",
      overviewBase: "Today is a day for noticing the pattern gently. Hydration, rest, and mind state can keep returning to a workable rhythm.",
      adjustRecovery: "If there is one gentle adjustment, it may be to let rest and hydration move together without trying to fix the whole day at once.",
      adjustActivity: "If there is one gentle adjustment, treat hydration as part of recovery after load, not as a number to rush.",
      adjustCaffeine: "If there is one gentle adjustment, give plain water some space between caffeine and rest.",
      adjustWater: "If there is one gentle adjustment, place small water moments across the day without forcing them all at once.",
      adjustSteady: "If there is one gentle adjustment, keep the rhythm that already feels workable without adding more than needed.",
      adjustEnergyLayered: "If there is one gentle adjustment, listen to body and mind as layered signals without deciding that the day must be good or bad.",
      tomorrowRecovery: "Tomorrow, let recovery come first, then return to the pattern without rushing yourself.",
      tomorrowActivity: "Tomorrow, let recovery and hydration move together, then see what the body is ready to add.",
      tomorrowCaffeine: "Tomorrow, lower caffeine by one step and let plain water return as the base.",
      tomorrowEnergyLayered: "Tomorrow, notice body and mind as layered signals, then choose a rhythm that fits.",
      tomorrowPositiveMind: "Tomorrow, keep the mind state that feels workable, then return to the pattern without rushing yourself.",
      tomorrowSteady: "Tomorrow, keep the workable rhythm and return to the pattern without rushing yourself.",
      mindNote: "Mind Note: {note}"
    },
    inputGroundedComposer: {
      waterLow: "water is around {water} ml and still returning toward baseline",
      waterBase: "water is around {water} ml and can already serve as a base",
      sleepHours: "sleep was about {hours} hours",
      drinkCaffeine: "caffeine was present today",
      drinkSweetness: "sweetness in drinks was one signal today",
      drinkContext: "caffeine or sweet drinks were present today",
      activity: "{activity} was part of today's load",
      run: "{run} was part of the load and recovery context",
      mindFeeling: "the Mind Note carried a {feeling} tone",
      mindSupport: "the support need was {support}",
      mindText: "there was a Mind Note: “{note}”",
      continuity: "recent logs add a little continuity context",
      restore_baseline: "With {anchors}, today may be better read as a gentle return-to-baseline day rather than something to quickly correct.",
      reduce_guilt: "With {anchors}, today does not need to become self-blame. It can simply be a pattern to notice and return from gently.",
      notice_pattern: "With {anchors}, today may be read as a small pattern signal, not a large conclusion about yourself.",
      protect_agency: "With {anchors}, the data can support a clearer choice of rhythm while the meaning of the day stays with you.",
      pause_not_push: "With {anchors}, recovery and not pushing more may fit the day better than adding output.",
      soft_continue: "With {anchors}, today can continue gently without needing every signal to be perfect.",
      fallback: "From the signals entered today, this can be a gentle starting point for noticing patterns without rushing to conclude."
    },
    lowDataReflection: {
      noData: "There is not much new data for today yet. You can add a few true signals first, then return to reflection.",
      previousOnly: "There is not much new data for today yet. Previous logs can be light background, but they should not speak for today. Add only what feels true enough when ready.",
      previousLoad: "There is not much new data for today yet. From the previous log, recovery may be a gentle background cue, but it should not replace today’s truth. Add water, rest, or an inner-state signal when ready.",
      previousWater: "There is not much new data for today yet. The previous log can lightly point back to water as a simple base. Add one true signal, such as the first glass of water or current inner state, when ready.",
      previousSleep: "There is not much new data for today yet. The previous log can lightly suggest a gentler recovery rhythm, but it should not define today. Add only what feels true enough.",
      previousMind: "There is not much new data for today yet. The previous Mind Note can be light background for reducing pressure, not a conclusion about today. Add one small true signal when ready.",
      previousDrink: "There is not much new data for today yet. Previous drinks can be light background for returning to water or a steadier energy base. Add one or two true signals when ready.",
      previousGeneric: "There is not much new data for today yet. Previous logs can be light background, but they should not speak for today. Add one or two true signals when ready.",
      thinData: "There are a few new signals today. This is enough for a light starting point, but there is no need to conclude more than the data can hold."
    },
    reflectionInputIntegration: {
      sleepLowHours: "Today had about {hours} hours of sleep, so energy signals deserve to be read more gently with recovery space.",
      sleepOkayHours: "Today had about {hours} hours of sleep. That can be okay-ish, while still leaving room for recovery.",
      sleepGoodHours: "Today had about {hours} hours of sleep, which can support the day's rhythm.",
      easyRun: "Today included an easy run as gentle movement. Let recovery follow the body without rushing.",
      shortQualityRun: "Today reads as a short quality run. The distance may not be long, but intensity still counts as load that deserves recovery.",
      longRun: "Today included a run {distance} {duration}, so the day can be read through load, hydration, and recovery rather than adding more.",
      runGeneric: "Today included running as part of the load. Let recovery follow the effort without turning this into training advice.",
      runSweat: "Sweat was logged as {sweat}, so hydration and recovery can follow gradually.",
      hydrationRunGoodZone: "Today's water fits a day with running or more sweat. It is not simply high water; spread it out and observe body cues.",
      hydrationHighRest: "Water is quite high for a day without clear load or sweat. No need to force more; spread it out and listen to the body.",
      lightCodingAiAssist: "Today included light coding / AI-assisted work, so this is light cognitive load rather than a true empty rest day."
    },
    continuity: {
      sleepDebtHint: "Continuing from recent logs, today may be better read through recovery than adding more, because low-sleep signals are still present.",
      sleepRecoverySupport: "Sleep looks better today compared with recent logs, which can be a small support signal for rebuilding a base.",
      loadStreak: "Read alongside recent higher-load logs, today may be more about carrying recovery than increasing output.",
      runRecoveryCarryover: "If the previous log included running or load, today does not need more push; letting the body catch up may be enough.",
      hydrationHigher: "Water is a little higher than recent logs. Read it as a base adjustment, not a number to beat.",
      hydrationLower: "Water is lower than recent logs. A few steady sip points may be enough.",
      mindCarryover: "Continuing from recent logs, some pressure or scatteredness may still be present. Let it be placed down gently.",
      mindSoftening: "Compared with recent logs, the mind seems to be softening a little. Treat it as support, not a big conclusion.",
      cognitiveLoadContinuity: "After several logs with cognitive or context-guiding load, today may need nervous-system recovery more than more output."
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
      sweetSome: "Let the next sweet drink be simpler, then return to the day's steady base.",
      blackCoffee: "Coffee is okay, but do not let it replace water.",
      sugarHigh: "Sugary drinks are adding up today. Reducing the next one is enough.",
      caffeineHigh: "Caffeine is getting high today. Let it not replace water or rest.",
      lightAndHydrated: "Today's drinks are lighter. Consistency is enough.",
      noExtraDrinks: "No extra drinks beyond plain water yet. Today is staying light."
    },
    drinkReflection: {
      sugar: "Sugary drinks are adding up today, but no need to go extreme. Reducing the next one is enough.",
      caffeine: "Caffeine is getting high today. Let it be information, not a replacement for rest.",
      context: "Drinks were part of today’s context, especially caffeine or sweetness. This is not a mistake to fix, just a pattern to notice and gently balance with water or rest.",
      hydrationCaffeine: "When water is still low and caffeine is present, today may be better read as a return-to-baseline day rather than a day for forcing correction.",
      sweetSignal: "Sweet drinks today are one signal, not a mistake. They simply help show the pattern of energy and rest.",
      balanced: "Drinks were part of today’s context, while water is already a useful base. Notice the pattern without judging any drink.",
      energyCauses: "Today's energy may be affected by {causes} more than by any personal mistake.",
      energyCause: {
        enough_sleep: "Today's energy seems supported by enough rest. Keeping this rhythm may be enough without adding too much.",
        light_mind: "Today the mind seems lighter, so energy may not be pulled as much by pressure."
      }
    },
    drinkSweetnessInsight: {
      low: "Today’s drinks did not add much sweetness load, and plain water remained a good base.",
      moderate: "There was some sweetness today, but it does not need to become guilt. The next drink can simply return to water or rest.",
      sodaLow: "There was soda today, but the logged sweetness level was not high, so it is more of a drink note than a sweetness load.",
      sodaHigh: "Today’s soda added sweetness load, but it does not need to be judged. The next drink can simply return to plain water or rest.",
      sweetCaffeine: "Today’s drinks offered both alertness and sweetness. Plain water can return as the base without judging the earlier drinks.",
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
      noteFeelingGood: "This note carries a good feeling. Keep it as a small support signal, not a claim that the whole day was perfect.",
      noteFeelingGoodWithLoad: "This note carries a good feeling, and today still has load. Let recovery move with it.",
      noteFeelingGoodRecovery: "This note carries a good feeling, while the body may still need recovery. Let both layers be cared for gently.",
      doublePressure: "Today does not need more fixing. Lowering pressure by one step is enough.",
      sugarHigh: "Sugary drinks are adding up. Reducing the next one by one step is enough.",
      consistency: "Hydration is visible and load is light today. Consistency is enough.",
      endorphin: "Energy may feel good today, but low sleep or high load still deserves recovery space.",
      resourceLow: "Low energy today may come from low resources, not from a personal mistake.",
      restFirst: "Today, pausing is allowed. Not everything needs to move forward immediately."
    },
    signalReflection: {
      goodConsistency: "You noticed a rhythm where hydration and load are not adding too much pressure",
      noExtraDrinks: "Extra drinks beyond plain water are staying light",
      noticedSignals: "You started seeing the relationship between water, drinks, recovery, and mind state",
      sleepLoadRecovery: "Low sleep or high load makes recovery the first useful signal today",
      endorphin: "Even when energy feels good, recovery may still need some space.",
      hydrationCaffeine: "Water is still low while caffeine is rising. Steadier sips and rest are enough to return the rhythm.",
      hydrationLoad: "If exercise, heat, or sustained activity was part of the day, hydration can be part of recovery, not just a target.",
      hydrationRecovery: "This looks more like a recovery signal than an activity-load signal. Hydration can stay gentle and steady rather than becoming a bigger number.",
      positiveMindFeelingGood: "Today's overall mind state seems more positive, which may support self-care without needing to push harder.",
      mindNoteFeelingGood: "This note carries a good feeling. It can be a small supportive signal, not a claim that the whole day was perfect.",
      positiveMindRelaxed: "Today the mind seems more relaxed, which may help self-care come from less pressure.",
      pressure: "Pressure has been noticed. Rushing to fix does not need to be today's answer.",
      uneasy: "This note carries some uneasiness. It can be placed down gently, not fixed immediately.",
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
      recovery: "Today has room for recovery and a rhythm that can last."
    },
    activityRootReflection: {
      clinical_focus: "Today used sustained precision, hands, eyes, and nervous-system focus. Quiet recovery deserves space too.",
      service_standing: "Today may have used energy through standing, moving, carrying gear, and holding space for others. Let recovery include the back, legs, shoulders, and eyes.",
      cognitive_deepwork: "Today used sustained focus and screen attention. Rest the eyes, lower the mental loop, and return space to the brain.",
      market_decision: "Today’s load may come from attention and decision pressure more than body movement. Short screen breaks and not carrying the market into sleep may be enough.",
      outdoor_heat: "Today included heat, sweat, or body effort. Sip water in small rounds, pause from heat/body load, and do not rush the number.",
      sport_sweat: "Today used real physical effort. Recovery is part of training, not a step backward.",
      walking_physical: "Today used the body through walking or movement. Give space back to the back, legs, feet, and spread water across the day.",
      recovery_low_sleep: "This is a recovery signal, not a high activity-load signal. Let rest come before adding another round.",
      rest_base: "Today can keep a light rhythm. There is no need to add productivity just because space is available."
    },
    activityRootSummary: {
      clinical_focus: "Today used sustained precision.",
      service_standing: "Today used energy through standing, moving, and holding space for others.",
      cognitive_deepwork: "Today used sustained focus and screen attention.",
      market_decision: "Today used attention and decision energy.",
      outdoor_heat: "Today included heat, sweat, or body effort.",
      sport_sweat: "Today used real physical effort.",
      walking_physical: "Today used the body through walking or movement.",
      recovery_low_sleep: "Today is a low-sleep recovery signal.",
      rest_base: "Today is a lighter rhythm."
    },
    activitySpecificReflection: {
      lightCodingAiAssist: "Today reads as light coding or AI-assisted work rather than full deep work. The main load is guiding context, reviewing output, and making small decisions over time, so eye rest and closing mental loops still matter.",
      shortQualityRun: "Today reads more like a short quality run than a long run. The body used intensity even if the distance was not long, so recovery can follow the effort without adding pressure.",
      rest: "Today is a rest rhythm and does not add much main load to the body.",
      lightRecoveryDay: "Today is a light rhythm that lets recovery build gradually.",
      lowSleepRest: "Low sleep may have affected today's energy, and choosing a rest day helps avoid adding another load layer.",
      lowSleepLightRecovery: "There is a low-sleep signal today, and a lighter rhythm may help recovery catch up with the body."
    },
    activitySpecificSummary: {
      lightCodingAiAssist: "Today used light cognitive effort through context guidance and AI-assisted work.",
      shortQualityRun: "Today used running intensity even if the distance was not long.",
      rest: "Today is a rest rhythm.",
      lightRecoveryDay: "Today is a light recovery rhythm.",
      lowSleepRest: "Today has low sleep and a rest rhythm, without adding another load layer.",
      lowSleepLightRecovery: "Today has low sleep and a lighter recovery rhythm."
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
      steady: "Today does not need a quick conclusion. Returning to small steady rhythms is enough."
    },
    mindNoteReminder: {
      pressured: "The pressure is noticed. Today does not need to fix everything; returning to consistency is enough.",
      worried: "Worry is a signal to care, not an order to rush.",
      uneasy: "This note carries some uneasiness. It can be placed down gently, not fixed immediately.",
      hydrate_gently: "Hydrate gently today. Let the rhythm settle without forcing the numbers."
    },
    recoveryNote: {
      sleepLoadHigh: "The day used a lot while rest was not full. Let recovery come before adding another round.",
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
      steady: "Keep the rhythm sustainable for one more day."
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
      recovery: "Keep consistency without adding more than the day asks for."
    },
    tomorrowFocusByActivityRoot: {
      clinical_focus: "Give the hands, eyes, and nervous-system focus a quiet recovery window.",
      service_standing: "Give the back, legs, shoulders, and eyes some recovery space.",
      cognitive_deepwork: "Rest the eyes, lower the mental loop, and return space to the brain.",
      market_decision: "Rest the eyes, close screens in small windows, and do not carry the market into sleep.",
      outdoor_heat: "Sip water in small rounds and take short heat/body pauses.",
      sport_sweat: "Let recovery be part of training.",
      walking_physical: "Give the back, legs, and feet space, with water spread across the day.",
      recovery_low_sleep: "Let recovery come before adding another round.",
      rest_base: "Keep a light rhythm without adding productivity pressure."
    },
    tomorrowFocusByActivity: {
      lightCodingAiAssist: "Rest the eyes, reduce continuous context-guiding, and close work loops one at a time.",
      shortQualityRun: "A next easy or steady run can balance today's faster rhythm."
    },
    options: {
      energy: { low: "Low", medium: "Medium", good: "Good" },
      mind: { very_heavy: "Very heavy", uneasy: "Uneasy", pressured: "Pressured", neutral: "Neutral", okay: "Okay", feeling_good: "Feeling good", relaxed: "Relaxed" },
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
        lightRecoveryDay: "Light recovery day",
        officeWork: "Office work / meetings & documents",
        lightCodingAiAssist: "Light coding / AI-assisted work",
        outdoorWork: "Outdoor work / heat & physical effort",
        dentalFocus: "Dentist / detailed clinical cases",
        clinicalShift: "Doctor / clinical shift or patient care",
        photoshoot: "Photographer / long shoot",
        marketWatch: "Investor / market watch & analysis",
        badminton: "Badminton",
        easyRun: "Easy run",
        shortQualityRun: "Short quality run",
        longRun: "Long run",
        heavyPingPong: "Heavy pingpong",
        longWalk: "Lots of walking",
        deepWork: "Deep work / coding",
        lowSleep: "Low sleep"
      },
      activityGroups: {
        work: "Work",
        sports: "Sports",
        recovery: "Light / Recovery"
      },
      practiceRoots: {
        body: "Body",
        feeling_tone: "Feeling tone",
        mind_thought: "Mind / Thought",
        dhamma: "Dhamma",
        other_or_none: "No practice / Other"
      },
      practiceTypes: {
        standing: "Notice standing",
        walking: "Notice walking",
        sitting: "Notice sitting",
        lying_down: "Notice lying down",
        breath_awareness: "Notice the breath",
        body_movement: "Notice body movement",
        pleasant: "Reflect on enoughness",
        unpleasant: "Reflect on lightness",
        neutral_feeling: "Recollect gratitude",
        uneasy_tone: "Recollect calm",
        body_discomfort: "Recollect a good moment",
        tense_mind: "Reflect on impermanence",
        observe_mind: "Notice the mind",
        notice_thoughts: "Notice thoughts",
        buddho: "Repeat Buddho",
        gentle_phrase: "Use a gentle phrase",
        scattered_mind: "Notice a scattered mind",
        calm_mind: "Notice a calm mind",
        notice_impermanence: "Reflect on the three characteristics",
        notice_defilement: "Think and notice defilement",
        recollect_goodness: "Recollect a good action",
        recollect_virtue: "Recollect kept virtue",
        see_and_release: "See and release",
        notice_wanting: "Think and notice wanting",
        just_resting: "Just resting",
        body_awareness: "Body awareness",
        walking_awareness: "Walking awareness",
        metta: "Loving-kindness",
        karuna: "Compassion",
        mudita: "Appreciative joy",
        upekkha: "Equanimity",
        buddha_recollection: "Recollect the Buddha",
        dhamma_recollection: "Recollect the Dhamma",
        sangha_recollection: "Recollect the Sangha",
        virtue_recollection: "Recollect virtue",
        generosity_recollection: "Recollect generosity",
        peace_recollection: "Recollect peace",
        impermanence: "Notice impermanence",
        let_it_be_lighter: "Let it be lighter",
        see_without_following: "See without following",
        body_elements: "Elements of the body",
        food_as_it_is: "Food as it is",
        simple_body_awareness: "Simple body awareness",
        light: "Light",
        color: "Color",
        open_space: "Open space",
        none: "No practice",
        other: "Other"
      },
      practiceTypeHelpers: {
        standing: "Notice the body as it is, without needing to make it special.",
        walking: "Notice the body as it is, without needing to make it special.",
        sitting: "Notice the body as it is, without needing to make it special.",
        lying_down: "Notice the body as it is, without needing to make it special.",
        breath_awareness: "Notice the body as it is, without needing to make it special.",
        body_movement: "Notice the body as it is, without needing to make it special.",
        pleasant: "Use a wholesome or supportive recollection without forcing a good feeling.",
        unpleasant: "Use a wholesome or supportive recollection without forcing a good feeling.",
        neutral_feeling: "Use a wholesome or supportive recollection without forcing a good feeling.",
        uneasy_tone: "Use a wholesome or supportive recollection without forcing a good feeling.",
        body_discomfort: "Use a wholesome or supportive recollection without forcing a good feeling.",
        tense_mind: "Reflect on impermanence lightly, without fixating on distress.",
        observe_mind: "Notice the mind or thoughts that arise, without needing to argue with them.",
        notice_thoughts: "Notice the mind or thoughts that arise, without needing to argue with them.",
        buddho: "Use the phrase as a light base without pressuring yourself.",
        gentle_phrase: "Use a phrase that does not stir craving or pressure.",
        scattered_mind: "Notice the mind or thoughts that arise, without needing to argue with them.",
        calm_mind: "Notice the mind or thoughts that arise, without needing to argue with them.",
        notice_impermanence: "Notice what appears as a natural process, without judging the practice as good or bad.",
        notice_defilement: "Notice what appears as a natural process, without judging the practice as good or bad.",
        recollect_goodness: "Notice what appears as a natural process, without judging the practice as good or bad.",
        recollect_virtue: "Notice what appears as a natural process, without judging the practice as good or bad.",
        see_and_release: "Notice what appears as a natural process, without judging the practice as good or bad.",
        notice_wanting: "Notice what appears as a natural process, without judging the practice as good or bad.",
        just_resting: "It is okay not to choose one. Noticing whether there was a base today is enough.",
        body_awareness: "Notice the body as it is, without needing to make it special.",
        walking_awareness: "Walk with awareness without turning it into performance.",
        metta: "Let the heart soften without forcing a good feeling.",
        karuna: "Let the heart notice difficulty without rushing to fix everything.",
        mudita: "Notice a small good thing without making it too large.",
        upekkha: "See what is here and set it down as much as you can.",
        buddha_recollection: "Use recollection as a base for trust, not proof.",
        dhamma_recollection: "Return to a simple truth that can be seen today.",
        sangha_recollection: "Remember that this path does not have to be walked alone.",
        virtue_recollection: "Notice the good intention that still supports the heart.",
        generosity_recollection: "Recall generosity without pressuring yourself.",
        peace_recollection: "Touch peace as much as it is available, without forcing it.",
        impermanence: "Notice change without rushing to define yourself.",
        let_it_be_lighter: "Let it be lighter as much as possible, without forcing release.",
        see_without_following: "See it without following every thought.",
        body_elements: "See the body as natural elements, not a judgment of you.",
        food_as_it_is: "See food as it is, gently and without guilt.",
        simple_body_awareness: "Return simply to the body as it can be known.",
        light: "Use light as a steady base without straining.",
        color: "Use color as a small place to rest attention.",
        open_space: "Let open space soften the mind a little.",
        none: "No practice today is still information, not a mistake.",
        other: "Use Other if today had your own practice base."
      },
      mindNote: {
        feeling: {
          calm: "Neutral",
          uneasy: "Uneasy",
          worried: "Worried",
          pressured: "Pressured",
          tired: "Tired",
          scattered: "Scattered",
          feeling_good: "🩵 Fulfilled",
          grateful: "😊 Grateful",
          peaceful: "🌿 Peaceful",
          proud: "✨ Proud",
          learning: "Learning",
          thinking: "Thinking"
        },
        support: {
          rest_first: "Rest first",
          see_pattern: "See the pattern",
          reduce_pressure: "Reduce pressure",
          hydrate_gently: "Hydrate gently",
          set_down: "Set it down",
          walk_gently: "Continue gently",
          thank_self: "Thank myself",
          stay_present: "Stay present"
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
    appShortTitle: "Mindful Health Balance",
    title: "Mindful Health Balance by MSxAI",
    version: "v2.1 — Gentle Mind Note",
    subtitle: "本地优先的反思型健康记录，包含 Field Review 与 Signal Engine。",
    viewTabsAria: "选择应用视图",
    tabToday: "今天",
    tabReflection: "反思/NuTuenSai",
    tabFieldReview: "场域回顾",
    tabLog: "记录",
    todayViewTitle: "今日信号",
    todayStepOneLabel: "今日信号 1/2",
    todayStepTwoLabel: "心念记录 2/2",
    todayStepSwitcherAria: "在今日信号和心念记录之间切换",
    todayStepOneHelper: "慢慢补充今日信号：内在状态、饮水、饮品和工作/活动。",
    honestDataTodayNote: "只填写真实把握的部分。真实的数据比完整的数据更重要。",
    honestDataBlankNote: "空白字段表示未记录，不代表错误或少了分数。",
    todayStepTwoHelper: "轻轻写下心里的状态，再前往 Reflection/NuTuenSai。",
    dailySaveStatusEmpty: "今天还没有保存 Daily Log —— 填写真实把握的部分，准备好时再保存。",
    dailySaveStatusPartial: "今日已保存：{savedSections} · 仍可留空：{unsavedSections}",
    dailySaveStatusSaved: "今日已保存：{savedSections} —— 仍可继续更新，不会删除已保存数据。",
    dailySaveStatusSavedNone: "今天已有 Daily Log —— 空白部分仍表示未记录。",
    dailySaveSectionSignals: "今日信号",
    dailySaveSectionMindNote: "心念记录",
    dailySaveSectionReflection: "Reflection",
    todayStepNext: "下一步：心念记录 2/2",
    todayStepBack: "返回 1/2",
    todayStepReflection: "前往 Reflection/NuTuenSai",
    todayCurrentFormSummaryTitle: "当前表单",
    todayCurrentFormSummaryText: "当前输入仍会保留。前往 Reflection/NuTuenSai 后，可以回顾并在准备好时保存。",
    dailySignalCockpitKicker: "Daily Signal Cockpit",
    dailySignalCockpitTitle: "今日信号面板",
    dailySignalCockpitHelper: "一次选择一个信号来补充细节。",
    cockpitStateLabel: "内在状态",
    cockpitWaterLabel: "饮水",
    cockpitDrinksLabel: "饮品",
    cockpitWorkActivityLabel: "工作 / 活动",
    cockpitStatusEmpty: "未填写",
    cockpitStatusPartial: "已开始",
    cockpitStatusComplete: "可阅读",
    cockpitStateEmpty: "还没有内在状态",
    cockpitStateSummary: "{items}",
    cockpitWaterEmpty: "0 ml",
    cockpitWaterSummary: "{water} ml",
    cockpitDrinksEmpty: "还没有饮品",
    cockpitDrinksSummary: "{count} 项",
    cockpitDrinksLoadSummary: "{count} 项 · 糖分 {sugar} / 咖啡因 {caffeine}",
    cockpitLoadEmpty: "还没有活动",
    cockpitLoadSummary: "{level} · {activity}",
    cockpitLoadLight: "轻节奏",
    cockpitLoadMedium: "稳定用力",
    cockpitLoadHeavy: "持续负荷",
    cockpitHydrationReturningBase: "正在回到基础",
    cockpitHydrationBaseVisible: "饮水基础已出现",
    cockpitCaffeineHigh: "咖啡因偏高",
    cockpitSweetVisible: "甜度有信号",
    cockpitBalanceEmpty: "还在倾听信号",
    cockpitBalanceOne: "今天开始显现",
    cockpitBalanceReadable: "今天已经可以阅读",
    cockpitBalanceReady: "可以前往 Reflection",
    reflectionViewTitle: "反思",
    reflectionViewHelper: "查看今天的反思内容，准备好后再保存到每日记录。",
    reflectionGeneratorHelper: "点击回顾会根据今天的信号生成回顾，保存前仍可轻微编辑。",
    reflectionActionsKicker: "准备保存",
    reflectionRootPickerKicker: "Reflection Root",
    reflectionRootPickerTitle: "今天想让 NuTuenSai 先从哪个主轴来读？",
    reflectionRootPickerHelper: "轻轻选择一个观察起点。其他信号仍只是辅助背景。",
    reflectionRootSelectedLabel: "已选主轴：{root}",
    reflectionRootBoundaryDefault: "这不是结论，也不是医疗建议，只是温柔观察的起点。",
    reflectionRootBoundaryMind: "心的背景仍由你拥有其意义。NuTuenSai 只帮助反映，不替你定义。",
    reflectionRootBoundaryPractice: "练习是自我照顾的背景，不是分数，也不是成功或失败。",
    reflectionRootBoundaryDrinks: "这里只读一天中的饮品背景，不评价饮食、饮品或健康。",
    reflectionRootOptionAuto: "自动",
    reflectionRootOptionHydration: "饮水",
    reflectionRootOptionSleep: "休息",
    reflectionRootOptionLoad: "活动",
    reflectionRootOptionDrinks: "饮品",
    reflectionRootOptionMind: "心",
    reflectionRootOptionPractice: "练习",
    reflectionRootPreviewAuto: "让 NuTuenSai 从已记录的数据中轻轻放置主轴，但不替你下结论。",
    reflectionRootPreviewHydration: "这一轮会先从“饮水”来读，并把活动、饮品和当天背景作为辅助。",
    reflectionRootPreviewSleep: "这一轮会先从“睡眠/恢复”来读，并把咖啡因、负荷和能量作为背景。",
    reflectionRootPreviewLoad: "这一轮会先从“活动/负荷”来读，并观察饮水、休息和能量如何围绕它出现。",
    reflectionRootPreviewDrinks: "这一轮会先从“饮品/咖啡因/甜度”来读，不评价饮品选择或健康。",
    reflectionRootPreviewMind: "这一轮会给你记录的心的背景更多空间，但不替你定义内在状态。",
    reflectionRootPreviewPractice: "这一轮会把练习/自我照顾读作当天背景，不是分数，也不是对错。",
    reflectionRootOpeningHydration: "这一轮 NuTuenSai 会先从“饮水”这个主轴来读。",
    reflectionRootOpeningSleep: "这一轮 NuTuenSai 会先从“睡眠/恢复”这个主轴来读。",
    reflectionRootOpeningLoad: "这一轮 NuTuenSai 会先从“活动/负荷”这个主轴来读。",
    reflectionRootOpeningDrinks: "这一轮 NuTuenSai 会先从“饮品/咖啡因/甜度”这个主轴来读。",
    reflectionRootOpeningMind: "这一轮 NuTuenSai 会给你记录的心的背景更多空间。",
    reflectionRootOpeningPractice: "这一轮 NuTuenSai 会把练习/自我照顾读作当天背景。",
    reflectionRootHintHydration: "记录的饮水量会作为起点，活动、饮品和当天背景会作为周围的背景来读。",
    reflectionRootHintSleep: "睡眠时长和恢复信号会先被看见，咖啡因、当天负荷和能量作为背景。",
    reflectionRootHintLoad: "活动、工作或身体使用的负荷会先被看见，再轻轻观察饮水、休息和能量如何围绕它出现。",
    reflectionRootHintDrinks: "饮品、咖啡因和甜度背景会作为这一轮的主轴，同时轻轻看睡眠、负荷和能量。",
    reflectionRootHintMind: "Mind Note 和心的背景会作为主轴。NuTuenSai 只帮助反映，不替你定义。",
    reflectionRootHintPractice: "练习时间和自我照顾记录会被读作当天背景，不是分数，也不是成功衡量。",
    reflectionRootHintThin: "这个主轴今天记录的数据还不多，所以 NuTuenSai 会轻轻阅读，并贴近已保存的内容。",
    todayInputShortcutsAria: "Today 输入快捷键",
    backToSignalCockpit: "返回信号面板",
    backToTodayStepOne: "返回 Today 1/2",
    backToTodayStepTwo: "返回 Mind Note 2/2",
    logViewTitle: "记录与导出",
    logViewHelper: "查看已保存的记录，并管理备份文件。",
    logControlsTitle: "备份控制",
    fieldReviewViewTitle: "从 Daily_Log 读取节奏",
    fieldReviewViewHelper: "NuTuenSai 读取所选保存数据，帮助在清楚边界内看见 pattern。",
    fieldReviewBoundaryKicker: "LOCAL FIELD REVIEW",
    fieldReviewControlsTitle: "选择要读取的节奏",
    fieldReviewSafetyCopy: "不是诊断，不是医疗建议，也不把关系说成因果。",
    fieldReviewTimeframeLabel: "时间范围",
    fieldReviewTimeframe7: "7 天",
    fieldReviewTimeframe14: "14 天",
    fieldReviewTimeframe30: "30 天",
    fieldReviewTimeframeAll: "全部",
    fieldReviewStatusKicker: "Daily_Log summary",
    fieldReviewStatusTitle: "所选 Daily_Log 摘要",
    fieldReviewSourceNote: "读取本浏览器中的 Daily_Log。如需读取 workbook，请先导入 Master Excel。",
    fieldReviewEmptyState: "目前还没有 Daily Log 可以回顾。",
    fieldReviewThinState: "数据仍然很薄，所以这里只显示早期信号。",
    fieldReviewNoDataStatus: "目前没有可回顾的数据",
    fieldReviewDataStatus: "使用 {used} 天，共 {total} 天已保存数据",
    fieldReviewAllDataStatus: "使用全部 {used} 天已保存数据",
    fieldReviewRowsEvidence: "已选择 {count} 天",
    fieldReviewHydrationTitle: "补水 pattern",
    fieldReviewHydrationEmpty: "所选范围内还没有饮水量记录，所以只能轻轻阅读补水信号。",
    fieldReviewHydrationEvidence: "平均 {average} ml · 最低 {min} ml · 最高 {max} ml · 在参考区间内 {inRange}/{recorded} 天 · 低于区间 {below} 天 · 高于区间 {above} 天",
    fieldReviewHydrationNote: "请和 load、sleep、activity 一起阅读，不用用单日数字判断。Water_ml 是白水毫升数，不是金钱或支出。",
    fieldReviewSleepTitle: "睡眠 / 恢复 pattern",
    fieldReviewSleepSummary: "所选范围中出现 sleep/recovery 信号，可以温和阅读。",
    fieldReviewSleepLight: "所选数据里 sleep/recovery 没有显示很重的 pattern。",
    fieldReviewSleepEvidence: "睡眠/恢复较薄或较低的日子 {lowSleep} · 低能量日 {lowEnergy}",
    fieldReviewSleepNote: "把它读作恢复信号，而不是诊断或风险预测。",
    fieldReviewLoadTitle: "Load / recovery pattern",
    fieldReviewLoadSummary: "所选范围中有较高 load 的日子，可以和 sleep、energy 一起阅读。",
    fieldReviewLoadLight: "所选数据里的 load 看起来不特别重。",
    fieldReviewLoadEvidence: "高 load 日 {highLoad} · 高 load 且 sleep/recovery 低 {highLoadLowSleep} · 高 load 且 energy 低 {highLoadLowEnergy}",
    fieldReviewLoadNote: "这是给 recovery 留空间的信号，不是表现分数或健康分数。",
    fieldReviewDrinksTitle: "饮品 / 咖啡因 / 甜度 pattern",
    fieldReviewDrinksSummary: "所选范围中出现饮品、咖啡因或甜度信号。",
    fieldReviewDrinksLight: "所选范围内咖啡因与甜度的 drink-load 看起来较轻。",
    fieldReviewDrinksEvidence: "咖啡因日 {caffeineDays} · 甜饮日 {sweetDays} · 高糖信号日 {highSugarDays}",
    fieldReviewDrinksNote: "这只作为 drink-load context，不估算热量、准确咖啡因 mg、支出、购买或价格。",
    fieldReviewMindTitle: "Mind Note / support need pattern",
    fieldReviewMindSummary: "Mind Note 或 support need 已作为用户自己的回顾背景出现。",
    fieldReviewMindEmpty: "所选范围内 Mind Note 或 support need 还不多。",
    fieldReviewMindEvidence: "有 Mind Note 的日子 {mindNoteDays} · 有 support need 的日子 {supportDays} · 有 Practice Note 的日子 {practiceNoteDays}",
    fieldReviewMindNote: "这些记录是背景，不是人格诊断、心境分数、修行分数、功德分数或自我价值判断。",
    fieldReviewMissingTitle: "缺失 / 空白数据 pattern",
    fieldReviewMissingSummary: "所选范围中有一些字段为空，说明这些部分尚未记录。",
    fieldReviewMissingLight: "大多数关键字段已有足够数据支持这次轻量回顾。",
    fieldReviewMissingEvidence: "空白或未记录字段：{items}",
    fieldReviewMissingNone: "所选范围内没有关键字段频繁空白。",
    fieldReviewMissingNote: "空白表示未记录，不是失败，不是少了分数，也不需要用猜测补上。",
    fieldReviewMissingItemSleep: "Sleep {count}",
    fieldReviewMissingItemWater: "Water_ml {count}",
    fieldReviewMissingItemActivities: "Activities {count}",
    fieldReviewMissingItemMindNote: "Mind Note {count}",
    fieldReviewOverviewReviewedDays: "读取天数",
    fieldReviewOverviewAverageWater: "平均饮水",
    fieldReviewOverviewHighLoad: "高 load 日",
    fieldReviewOverviewLowRecovery: "Sleep/recovery 较薄日",
    fieldReviewOverviewDrinkLoad: "饮品背景日",
    fieldReviewOverviewMindNote: "Mind Note 日",
    fieldReviewOverviewNoValue: "尚未记录",
    fieldReviewEvidenceLabel: "来自 Daily_Log 的依据",
    fieldReviewReadingLabel: "NuTuenSai 读取为",
    fieldReviewNextAttentionLabel: "下次温柔留意",
    fieldRoomWorkspaceKicker: "Guided Field Rooms",
    fieldRoomWorkspaceTitle: "选择数据房间",
    fieldRoomHydrationLabel: "饮水",
    fieldRoomSleepRecoveryLabel: "睡眠 / 恢复",
    fieldRoomLoadRecoveryLabel: "负荷 / 恢复",
    fieldRoomDrinksLabel: "饮品情境",
    fieldRoomMindNoteLabel: "Mind Note",
    fieldRoomMissingLabel: "空白数据",
    fieldRoomSignalEngineLabel: "信号关系",
    fieldRoomSourceLabel: "所选时间窗",
    fieldRoomSourceBubble: "NuTuenSai 正在温柔读取所选 Daily_Log 时间窗：{timeframe}。",
    fieldRoomFlowModeLabel: "选择式问题分支 · 不是 LLM",
    fieldRoomHydrationFlowModeLabel: "选择式问题分支 · 不是 LLM",
    fieldRoomQuestionLabel: "NuTuenSai 轻轻问",
    fieldRoomQuestionHydration: "你想让 NuTuenSai 从哪个角度读取饮水节奏？",
    fieldRoomQuestionSleepRecovery: "你想让 NuTuenSai 从哪个角度读取睡眠/恢复？",
    fieldRoomQuestionLoadRecovery: "你想让 NuTuenSai 从哪个角度看负荷与恢复？",
    fieldRoomQuestionDrinks: "你想从哪个角度看饮品情境？",
    fieldRoomQuestionMindNote: "你想让 NuTuenSai 从哪个角度读取 Mind Note 空间？",
    fieldRoomQuestionMissing: "你想从哪个角度看空白数据？",
    fieldRoomWelcomeLabel: "NuTuenSai 轻轻欢迎你",
    fieldRoomHydrationWelcome: "这里 NuTuenSai 会按已记录的数据轻轻读取饮水节奏。这是当天背景，不是饮水诊断，也不是自我照顾评分。",
    fieldRoomHydrationSpeakerLabel: "NuTuenSai",
    fieldRoomHydrationUserSpeakerLabel: "你",
    fieldRoomHydrationChoicePrompt: "请选择符合你想阅读角度的回答。",
    fieldRoomHydrationContinuePrompt: "如果想继续，可以选择另一个角度。",
    fieldRoomConversationExit: "🚪 先到这里",
    fieldRoomHydrationRestart: "⌂ 选择新的角度",
    fieldRoomHydrationResume: "↩ 回到阅读",
    fieldRoomHydrationBack: "← 返回",
    fieldRoomHydrationNextAngle: "阅读下一个角度 →",
    fieldRoomHydrationChooseAgain: "⌂ 重新选择角度",
    fieldRoomHydrationProgressLabel: "饮水阅读进度",
    fieldRoomCurrentReadingLabel: "正在阅读 • {angle}",
    fieldRoomConversationClosing: "先到这里也可以。今天不需要得出所有结论；更清楚地看见一个身心节奏就够了。🩵",
    fieldRoomActionLabel: "选择接下来要读取的角度",
    fieldRoomFocusOverview: "概览",
    fieldRoomFocusEvidence: "数据依据",
    fieldRoomFocusNext: "下次轻观察",
    fieldRoomFocusAll: "全部显示",
    fieldRoomNextButton: "查看下一个房间",
    fieldRoomNextRoomButton: "继续到 {room}",
    fieldRoomNextPrompt: "继续到其他房间",
    fieldRoomNextHelper: "可以随时选择接下来想探索的房间。",
    fieldRoomRelatedButton: "继续到 {room}",
    fieldRoomTransitionHydration: "饮水节奏和当天背景",
    fieldRoomTransitionSleepRecovery: "休息节奏和能量",
    fieldRoomTransitionLoadRecovery: "活动节奏和恢复",
    fieldRoomTransitionDrinks: "咖啡、甜饮和饮品模式",
    fieldRoomTransitionMindNote: "已记录的 Mind Note 空间",
    fieldRoomTransitionMissing: "数据暂时还不能总结的地方",
    fieldRoomTransitionSignalEngine: "一起移动的信号",
    signalEngineTitle: "信号关系引擎",
    signalEngineKicker: "一起移动的信号",
    signalEngineSubtitle: "这里读取 Daily_Log 中哪些已保存信号一起移动。它不是因果、诊断或医疗建议。",
    signalEngineBoundary: "相关性不是因果、诊断或医疗建议。",
    signalEngineThinState: "可配对的数字记录还不够，暂时不适合安全读取关系。",
    signalEngineCategoryNote: "Energy、Mind、Sleep、Load_Level、Mind_Note_Support 等类别 mapping 是未来工作，必须先明确定义，不能猜。",
    signalEnginePairedDays: "{count} 个配对日期",
    signalEngineCoefficient: "r = {value}",
    signalEngineTentative: "暂时信号",
    signalEngineObserved: "已观察到的 pattern",
    signalEngineDirectionPositive: "同向移动",
    signalEngineDirectionNegative: "反向移动",
    signalEngineDirectionNeutral: "尚不清楚",
    signalEngineStrengthUnclear: "接近零 / 不清楚",
    signalEngineStrengthWeak: "较弱",
    signalEngineStrengthModerate: "中等",
    signalEngineStrengthStrong: "较强",
    signalEngineReadingPositive: "NuTuenSai 读取到保存数据里这两个信号有 {strength} 的同向移动，但这不是因果。",
    signalEngineReadingNegative: "NuTuenSai 读取到保存数据里这两个信号有 {strength} 的反向移动，但这不是因果。",
    signalEngineReadingNeutral: "NuTuenSai 读取到所选数据里的关系还不清楚，所以这里只能轻轻放着看。",
    signalEngineNoCoefficient: "暂不显示 r，因为需要完整配对的数字记录，也需要足够的变化。",
    signalEngineListLabel: "较清楚的关系信号",
    signalEngineMeaningLabel: "含义层",
    signalEngineSignature: "MHB · NuTuenSai",
    signalEngineNoValidRows: "这段时间还没有任何一组信号达到至少 10 个完整配对日期。",
    signalEngineHiddenPairs: "因为配对天数或数字变化还不够而暂不显示的组合：{pairs}",
    signalEngineEvidenceLabel: "计算依据",
    signalEngineAuditLabel: "audit line",
    signalEngineNextObservationLabel: "下次温柔观察",
    signalEngineRHelper: "r 表示共同移动的方向和紧密程度，不是因果。",
    signalEngineLegendTitle: "如何阅读信号",
    signalEngineLegendSame: "同向 = 两个信号常一起升/降",
    signalEngineLegendOpposite: "反向 = 一个信号升高时，另一个常降低",
    signalEngineLegendUnclear: "尚不清楚 = 还没有足够清楚的共同节奏",
    signalEngineSummarySameWeak: "同向移动，轻微信号",
    signalEngineSummarySameModerate: "同向移动，在所选数据中有一些共同节奏",
    signalEngineSummarySameStrong: "同向移动，在所选数据中较清楚",
    signalEngineSummaryOppositeWeak: "反向移动，轻微信号",
    signalEngineSummaryOppositeModerate: "反向移动，在所选数据中有一些共同节奏",
    signalEngineSummaryOppositeStrong: "反向移动，在所选数据中较清楚",
    signalEngineSummaryNearZero: "还没有清楚的共同节奏",
    signalEngineMeaningPositive: "NuTuenSai 读取到这两个信号在保存数据中倾向于同向移动。当 {xLabel} 较高时，{yLabel} 也常在某种程度上较高。这个信号强度为 {strength}，只能放在这里的 {pairedDays} 里轻轻阅读。",
    signalEngineMeaningNegative: "NuTuenSai 读取到这两个信号在保存数据中倾向于反向移动。当 {xLabel} 较高时，{yLabel} 常在某种程度上较低。这个信号强度为 {strength}，只能放在这里的 {pairedDays} 里轻轻阅读。",
    signalEngineMeaningNeutral: "NuTuenSai 读取到这两个信号在所选数据中还没有清楚地一起移动，所以这里只能当作很轻的信号，而不是结论。",
    fieldReviewWindowVoice7: "在这 7 天里，这更像早期信号，不是结论。",
    fieldReviewWindowVoice14: "在 14 天里，一些重复节奏开始可以被看见。",
    fieldReviewWindowVoice30: "在 30 天里，数据开始呈现这个月的节奏。",
    fieldReviewWindowVoiceAll: "看全部可用数据时，这是长期视角的回顾，但每一天仍有自己的背景。",
    fieldReviewHydrationReadingEmpty: "这里还没有清楚记录 Water_ml，所以 NuTuenSai 只能很轻地阅读补水信号。",
    fieldReviewHydrationReadingBelow: "平均饮水量低于按当天背景计算的参考区间。",
    fieldReviewHydrationReadingNearLower: "平均饮水量接近按当天背景计算的参考区间下缘。",
    fieldReviewHydrationReadingInRange: "平均饮水量位于按当天背景计算的参考区间内。",
    fieldReviewHydrationReadingAbove: "平均饮水量高于按当天背景计算的参考区间。",
    fieldReviewHydrationReadingCount: "{inRange}/{recorded} 个记录日在这个区间内。",
    fieldReviewHydrationNextLowLoad: "下次可以把低于参考区间的日子和 load、sleep、activity 一起看。",
    fieldReviewHydrationNextDefault: "下次可以把低于或高于参考区间的日子和 load、sleep、activity 一起看，不需要期待每天喝到相同数字。",
    fieldReviewSleepReadingSignal: "NuTuenSai 把这些读作 sleep/recovery 信号，尤其在低能量或高 load 附近，需要温柔地留出空间。",
    fieldReviewSleepReadingLight: "从已保存的数据来看，NuTuenSai 没有读到很重的 sleep/recovery pattern。",
    fieldReviewSleepNextSignal: "下次可以轻轻留意 sleep/recovery 较低的日子旁边，有什么 load、咖啡因或 Mind Note 背景。",
    fieldReviewSleepNextDefault: "如果下次有更多 sleep 数据，NuTuenSai 可以更清楚地阅读 recovery 节奏。",
    fieldReviewLoadReadingHigh: "高 load 的日子不代表好或不好。NuTuenSai 读取它们，是为了看 recovery 有没有空间跟上那一天。",
    fieldReviewLoadReadingLight: "NuTuenSai 读取到所选范围的 load 不算特别重，同时仍保留每一天自己的背景。",
    fieldReviewLoadNextRecovery: "下次可以轻轻留意高 load 同时 sleep/recovery 较低的日子。",
    fieldReviewLoadNextDefault: "下次可以看高 load 出现在什么样的日子，以及后面有没有 recovery 空间。",
    fieldReviewDrinksReadingSignal: "NuTuenSai 把这读作饮品负荷背景，不是热量、准确咖啡因 mg、支出、购买或价格。",
    fieldReviewDrinksReadingLight: "NuTuenSai 读取到所选范围内咖啡因和甜度 drink-load 较轻。",
    fieldReviewDrinksNextSignal: "下次可以温柔留意有咖啡因或甜度的日子，与 sleep、water 和 load 怎样并排出现，不需要评价饮品。",
    fieldReviewDrinksNextDefault: "如果下次有更多饮品背景，NuTuenSai 会继续温柔阅读，不做判断。",
    fieldReviewMindReadingSignal: "Mind Note 是用户自己的背景空间。NuTuenSai 把它读作照顾的痕迹，不是诊断。",
    fieldReviewMindReadingEmpty: "这里 Mind Note 或 support need 还不多，所以 NuTuenSai 把它读作仍然可以保持开放的空间。",
    fieldReviewMindNextSignal: "下次可以轻轻留意哪些 support need 重复出现，以及旁边有什么身体或 load 背景。",
    fieldReviewMindNextDefault: "如果下次有更多 Mind Note，NuTuenSai 会把它读作照顾背景，不是身份评估。",
    fieldReviewMissingReadingSignal: "空白表示未记录，不是失败。真实的数据比完整的数据更重要。",
    fieldReviewMissingReadingLight: "NuTuenSai 读取到关键数据已经足够做轻量回顾，同时空白仍然可以保持空白。",
    fieldReviewMissingNextSignal: "下次只选择一个想更稳定记录的字段就好，不需要把所有东西填满。",
    fieldReviewMissingNextDefault: "下次继续记录真实把握的部分即可。真实比完整更重要。",
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
    noticeTitle: "有边界的场域回顾",
    noticeText: "从已保存数据读取 pattern 和共同移动的信号；不是诊断、医疗建议，也不是因果。",
    todayState: "今日状态",
    todayStateHeading: "今天身体和心的状态如何？",
    todayStateCue: "今天的快速观察",
    energyLabel: "Energy",
    mindLabel: "今天整体心境",
    mindScaleHelper: "选择最接近今天内在状态的词。一般是中间点，不是分数。",
    sleepLabel: "Sleep",
    sleepHoursLabel: "睡了几小时",
    sleepHoursUnit: "小时",
    sleepHoursPlaceholder: "6.5",
    sleepDerivedEmpty: "有的话可以填写睡眠小时",
    sleepDerivedBadge: "系统读取为：{sleep}",
    sleepFallbackHelper: "如果不确定小时，可以在下方选一个大概分类。",
    hydration: "Hydration",
    hydrationHeading: "今天的饮水",
    hydrationGuidanceBase: "今天的大致饮水区间：{min}-{max} ml",
    hydrationGuidanceRange: "今天的大致饮水区间：{min}-{max} ml",
    hydrationGuidanceCueBase: "慢慢小口喝，不需要急着追数字。",
    hydrationGuidanceCueCognitive: "今天有认知或决策 load，白水可以作为 recovery 的基础。",
    hydrationGuidanceCueLightSport: "今天有一些身体用力或出汗，可以比平常多一点点，慢慢补。",
    hydrationGuidanceCueShortQualitySport: "今天有强度，即使距离不长，补水也可以跟着 effort 走，而不只看距离。",
    hydrationGuidanceCueLongRunHeavySweat: "今天是 long run / sport sweat load。如果达到 3.0 L 左右，会是不错的区间；如果出汗多或尿色偏深，可以再小口、分散补一点。",
    hydrationGuidanceCueLongRunGoodZone: "3.0 L 以上已经在不错的区间。如果仍然出汗多或尿色偏深，可以分散小口再补一点。",
    hydrationGuidanceCueHighWater: "今天饮水已经偏高，不需要再急着增加，分散到一天里，并一起观察身体信号。",
    hydrationGuidanceCueOutdoor: "今天有炎热、出汗或户外环境，可以温和增加，也给身体短暂停顿。",
    hydrationGuidanceCueCaffeine: "咖啡因可以帮助清醒，但白水仍然可以作为基础。",
    hydrationGuidanceCueRecovery: "今天有 recovery 信号，可以把白水作为温和的基础，和休息一起走。",
    hydrationGuidanceCueActivityRecovery: "今天同时有活动 load 和 recovery 信号，可以把小口补水和休息放在一起。",
    hydrationGuidanceCueUpperBound: "如果接近 3.5–4.0 L，请分散到一天里，不需要一次硬喝，并温和参考口渴和尿色。",
    halfBottle: "+半瓶",
    resetButton: "重置",
    drinks: "饮品",
    drinksHeading: "今日饮品记录",
    drinksHelper: "记录白水以外的饮品，例如咖啡、茶、可可、甜饮或果汁。",
    drinkInsightTitle: "今日饮品观察",
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
    runDetailTitle: "今天跑步详情（可选）",
    runDetailHelper: "只用于理解 load / hydration / recovery，不是训练建议。",
    runDistanceLabel: "距离 (km)",
    runDurationLabel: "时间",
    runDurationHoursLabel: "小时",
    runDurationMinutesLabel: "分钟",
    runSweatLabel: "出汗",
    runSweatEmpty: "不填写",
    runSweatLow: "少",
    runSweatMedium: "中",
    runSweatHigh: "多",
    runPaceEmpty: "配速未填写",
    runPaceBadge: "平均配速 {pace}",
    mindfulReminder: "正念提醒",
    nuTuenSaiNote: "NuTuenSai 提醒",
    nuTuenSaiRole: "NuTuenSai 是一个温和的反思层，用来观察模式，并不是诊断工具或医疗建议。",
    nuTuenSaiEmptyReminder: "欢迎回来。今天还没有太多资料可以阅读，可以先补充一点今日信号，再回来做轻柔的回顾。",
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
    mindNoteKicker: "Mind Note — 留下今天的一件小事",
    mindNoteTitle: "Mind Note",
    mindNoteSubtitle: "把今天想留下的事情放在这里。",
    mindNoteCue: "可以是好事、感受、正在学习的事，或想轻轻放下的事。",
    practiceKicker: "Practice context — 可选",
    practiceTitle: "今天心可以安住在哪里？",
    practiceSubtitle: "只选适合今天的内容，也可以留空。",
    practiceRootLabel: "练习基础",
    practiceTypeLabel: "今天使用的练习",
    practiceDurationLabel: "时长",
    practiceHoursLabel: "小时",
    practiceMinutesLabel: "分钟",
    practiceHoursPlaceholder: "0",
    practiceMinutesPlaceholder: "15",
    practiceNoteLabel: "练习备注 / 善行",
    practiceNotePlaceholder: "例如：在寺院喂鱼、忆念善行、选择不反应",
    practiceNoteHelper: "简单记录即可。这是背景，不是评分。",
    practiceDurationHint: "可以留空。没有分数，也没有 streak。",
    practiceDurationBadge: "约 {minutes} 分钟",
    practiceTypeEmpty: "可以先选择基础，也可以留空。",
    practiceHelperDefault: "选择今天刚刚好的部分，不需要完整或特别好。",
    practiceSummaryEmpty: "尚未选择练习",
    practiceSummaryBase: "今天的简单基础",
    practiceSummaryWithMinutes: "{type} · {minutes} 分钟",
    mindNoteTextLabel: "今天有什么想留在这里？",
    mindNotePlaceholder: "例如：今天跑步很舒服 · 今天和想念的人说了话 · 今天还有些事不确定 · 今天想谢谢自己 · 今天不知道写什么也没关系",
    mindNoteFeelingLabel: "这条记录的感受",
    mindNoteFeelingHelper: "选择一个比较接近的词就够了。每一种日子都可以放在这里。",
    mindNoteFeelingGentleLabel: "温柔 / 支持",
    mindNoteFeelingNeutralLabel: "中性 / 观察中",
    mindNoteFeelingHeavyLabel: "沉重 / 需要空间",
    mindNoteSupportLabel: "今天心需要什么？",
    mindNoteSupportHelper: "如果有合适的小支持，可以选择；也可以留空。",
    mindNoteSupportAria: "今天可能有帮助的支持",
    generateReflection: "生成每日结束反思",
    reflectionPlaceholder: "点击今日回顾，根据今天的信号生成回顾。",
    localOnly: "仅本机",
    dailyLogControls: "Daily Log 控制",
    controlsHelp: "把今天保存到本机浏览器表格，需要时再导出 Master Excel。",
    saveDailyLog: "保存今日 Reflection",
    saveTodayLog: "保存到 Daily Log",
    todayResetTitle: "当前表单",
    resetCurrentForm: "重置当前表单",
    restoreCurrentForm: "恢复今日记录",
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
    saveTodayDone: "已保存到 Daily Log。现在不用再把它都放在脑子里了。",
    resetCurrentFormConfirm: "只会重置当前表单，不会删除已保存的每日记录。",
    resetCurrentFormDone: "当前表单已重置，已保存的每日记录仍然保留。",
    restoreCurrentFormOverwriteConfirm: "当前表单已有未保存数据。从 Daily Log 恢复会覆盖当前表单，但不会删除已保存记录。继续吗？",
    restoreLatestLogConfirm: "今天还没有 Daily Log。要将最近保存的记录（{date}）恢复到表单中吗？",
    restoreCurrentFormDone: "已将 Daily Log 数据恢复到当前表单。尚未再次保存。",
    restoreCurrentFormEmpty: "没有可恢复的 Daily Log。",
    restoreCurrentFormCancelled: "已取消恢复。当前表单保持不变。",
    replaceConfirm: "今天已有 Daily Log。应用会更新当前部分，并保留其他已保存部分。继续吗？",
    replaceCancelled: "没有更新已有的 Daily Log。不需要急着决定。",
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
    importProfileImported: "确认后已导入 Intention Profile。",
    importProfileCancelled: "原本的 Intention Profile 没有改变。",
    importProfileEmpty: "这个 sheet 中没有可导入的 profile。",
    importProfileRejected: "已跳过 Intention Profile，因为资料未通过 validation：{reason}",
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
      keepBalance: "维持刚刚好的节奏，不需要增加超过今天所需的东西。",
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
      overviewMindNoteFeelingGoodActivity: "这条记录里有一种不错的感觉，同时今天也有真实的能量消耗。可以把它当作小小的支持信号，也让 recovery 跟着 load 一起走。",
      overviewMindNoteFeelingGoodRecovery: "这条记录里有一种不错的感觉，但身体可能仍然需要 recovery。两个信号可以同时存在，不代表整天都必须完美。",
      overviewMindNoteFeelingGoodSupport: "这条记录里有一种不错的感觉，可以作为一个小小的支持信号，不代表整天都必须是完美的。",
      overviewCaffeine: "今天咖啡因可能帮助清醒或维持节奏。让白水回到基础就好，不需要因此责备咖啡。",
      overviewSteadyHydration: "今天饮水已经可以作为基础，整体更适合维持稳定，而不是增加超过需要的东西。",
      overviewBase: "今天适合温和地观察 pattern。补水、休息和心里的状态都可以慢慢回到可持续的节奏。",
      adjustRecovery: "如果要轻轻调整一点，可以让休息和补水一起走，不需要一天内修好全部。",
      adjustActivity: "如果要轻轻调整一点，可以把补水看作 load 后 recovery 的一部分，而不是急着追数字。",
      adjustCaffeine: "如果要轻轻调整一点，可以在咖啡因和休息之间，把空间还给白水。",
      adjustWater: "如果要轻轻调整一点，把小口喝水分散到一天里，不需要一次喝完。",
      adjustSteady: "如果要轻轻调整一点，就是维持已经可行的节奏，不增加超过需要的东西。",
      adjustEnergyLayered: "如果要轻轻调整一点，可以把身体和心的信号分层听，不急着判断今天是好或不好。",
      tomorrowRecovery: "明天先让 recovery 在前面，再不急地回来观察 pattern。",
      tomorrowActivity: "明天让 recovery 和补水一起走，再看身体准备好增加什么。",
      tomorrowCaffeine: "明天把咖啡因降一个节奏，让白水回到基础。",
      tomorrowEnergyLayered: "明天把身体和心的信号分层看，再选择合适的节奏。",
      tomorrowPositiveMind: "明天保留这种比较能待住的心境，再不急地回来观察 pattern。",
      tomorrowSteady: "明天维持可持续的节奏，再不急地回来观察 pattern。",
      mindNote: "Mind Note: {note}"
    },
    inputGroundedComposer: {
      waterLow: "今天饮水约 {water} ml，还在慢慢回到基础",
      waterBase: "今天饮水约 {water} ml，已经可以作为基础",
      sleepHours: "今天大约睡了 {hours} 小时",
      drinkCaffeine: "咖啡因是今天 context 的一部分",
      drinkSweetness: "饮品甜度是今天的一个信号",
      drinkContext: "咖啡因或甜度是今天饮品 context 的一部分",
      activity: "今天有 {activity} 作为 load 的一部分",
      run: "今天有 {run} 作为 load 和 recovery 的 context",
      mindFeeling: "Mind Note 带着 {feeling} 的语气",
      mindSupport: "support need 是 {support}",
      mindText: "今天有 Mind Note：“{note}”",
      continuity: "前几条 log 也提供了一点连续性的 context",
      restore_baseline: "从 {anchors} 来看，今天更适合慢慢回到基础节奏，而不是急着修正。",
      reduce_guilt: "从 {anchors} 来看，今天不需要变成自责，只是一个可以看见并温和回来的 pattern。",
      notice_pattern: "从 {anchors} 来看，今天更像一个小小的 pattern 信号，不是关于自己的大结论。",
      protect_agency: "从 {anchors} 来看，这些资料可以帮助选择合适节奏，但今天的意义仍然由你来决定。",
      pause_not_push: "从 {anchors} 来看，recovery 和不继续 push 可能比增加 output 更适合今天。",
      soft_continue: "从 {anchors} 来看，今天可以温和地继续，不需要每个信号都完美。",
      fallback: "从今天填写的信号来看，系统会先把它当作温和观察 pattern 的起点，不急着下结论。"
    },
    lowDataReflection: {
      noData: "今天的新数据还很少。可以先填写一些真实把握的信号，再回来做 reflection。",
      previousOnly: "今天的新数据还很少。之前的 log 只能作为轻轻的背景，不能替今天下结论。准备好时，填写真实把握的一点就可以。",
      previousLoad: "今天的新数据还很少。之前的 log 可以轻轻提醒 recovery 这个背景，但不能代替今天的真实情况。准备好时，先填写饮水、休息或内在状态的一点就可以。",
      previousWater: "今天的新数据还很少。之前的 log 可以轻轻把饮水作为一个基础提醒。先填写一个真实信号，比如第一杯水或此刻状态，就够了。",
      previousSleep: "今天的新数据还很少。之前的 log 可以轻轻提示恢复节奏，但不能定义今天。准备好时，填写真实把握的一点就可以。",
      previousMind: "今天的新数据还很少。之前的 Mind Note 只能作为减少压力的轻微背景，不是今天的结论。先填写一个真实小信号就可以。",
      previousDrink: "今天的新数据还很少。之前的饮品 context 可以轻轻提醒回到饮水或稳定能量基础。准备好时，填写一两个真实信号就可以。",
      previousGeneric: "今天的新数据还很少。之前的 log 只能作为轻轻的背景，不能替今天下结论。可以先填写一两个真实信号。",
      thinData: "今天已经有一点新的信号，可以作为温和的起点，但不需要超过数据本身去下结论。"
    },
    reflectionInputIntegration: {
      sleepLowHours: "今天大约睡了 {hours} 小时，所以能量信号可以更温和地阅读，并给 recovery 留空间。",
      sleepOkayHours: "今天大约睡了 {hours} 小时，系统会读作还可以，但仍然可以给恢复留一点余地。",
      sleepGoodHours: "今天大约睡了 {hours} 小时，可以成为今天节奏的一点支持。",
      easyRun: "今天有 easy run，像是温和的身体移动，让 recovery 慢慢跟上就好。",
      shortQualityRun: "今天更像短距离质量跑，距离不一定长，但强度仍然算作需要 recovery 跟上的 load。",
      longRun: "今天有跑步 {distance} {duration}，可以从 load、补水和 recovery 来阅读，而不是继续增加。",
      runGeneric: "今天有跑步作为 load 的一部分，让 recovery 跟上 effort 就好，不需要变成训练建议。",
      runSweat: "今天记录的出汗程度是 {sweat}，补水和 recovery 可以慢慢跟上。",
      hydrationRunGoodZone: "今天的饮水和有跑步或出汗的日子相符，不只是单纯偏高；分散喝，并一起观察身体信号。",
      hydrationHighRest: "如果今天没有明显 load 或出汗，饮水已经偏高，不需要再勉强增加，分散并听身体信号就好。",
      lightCodingAiAssist: "今天有轻量编码 / AI 协助工作，所以是轻量认知 load，不是真正完全休息的一天。"
    },
    continuity: {
      sleepDebtHint: "接着前几条 log 来看，今天也许更适合从 recovery 来读，而不是继续增加，因为睡少的信号还在。",
      sleepRecoverySupport: "今天的睡眠比前面的 log 好一些，可以作为系统慢慢回到基础的小小支持。",
      loadStreak: "和前面几天的 load 连在一起看，今天也许更像是在承接 recovery，而不是增加 output。",
      runRecoveryCarryover: "如果前一条 log 有跑步或 load，今天不需要急着再增加，让身体跟上 recovery 就够了。",
      hydrationHigher: "今天饮水比前面的 log 高一点，可以读作基础正在调整，不是要赢过数字。",
      hydrationLower: "今天饮水比前面的 log 低一点，放几个稳定的小口喝水点就够了。",
      mindCarryover: "接着前面的 log 来看，今天可能还有一些压力或分散感，可以先轻轻放下。",
      mindSoftening: "和前面的 log 比起来，今天的心像是软下来一点点。这是支持信号，不是大结论。",
      cognitiveLoadContinuity: "如果前几条 log 都有认知或管理 context 的 load，今天更适合读作神经系统 recovery，而不是继续增加 output。"
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
      sweetSome: "下一杯甜饮简单一点，然后回到今天的小小稳定基础。",
      blackCoffee: "咖啡可以，但不要让它取代水。",
      sugarHigh: "今天饮料中的糖分开始累积，下一杯少一点就够了。",
      caffeineHigh: "今天咖啡因偏高，别让它取代水和休息。",
      lightAndHydrated: "今天的饮料负担较轻，保持稳定就好。",
      noExtraDrinks: "目前还没有白水以外的饮品，今天的负担很轻。"
    },
    drinkReflection: {
      sugar: "今天甜饮开始累积，但不需要极端调整，下一杯少一点就够了。",
      caffeine: "今天咖啡因偏高，把它当作信息，不要让它取代休息。",
      context: "今天的饮品也是一个 context，尤其是咖啡因或甜度。这不是错误，只是一个可以被看见的 pattern，再慢慢回到喝水或休息。",
      hydrationCaffeine: "如果水还不多，同时有咖啡因，今天更适合慢慢回到基础节奏，而不是急着补偿。",
      sweetSignal: "今天的甜饮只是一个信号，不是错误。它可以帮助看见能量和休息的 pattern。",
      balanced: "今天有饮品作为 context，同时白水已经能作为基础。看见 pattern 就好，不需要评价哪一杯。",
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
      noteFeelingGood: "这条记录里有一种不错的感觉，可以把它当作小小的支持，不代表整天都必须完美。",
      noteFeelingGoodWithLoad: "这条记录里有一种不错的感觉，同时今天仍然有 load。让 recovery 和它一起走。",
      noteFeelingGoodRecovery: "这条记录里有一种不错的感觉，但身体可能仍然需要 recovery。温和照顾这两个层次就好。",
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
      mindNoteFeelingGood: "这条记录里有一种不错的感觉，可以作为一个小小的支持信号，不代表整天都必须是完美的。",
      positiveMindRelaxed: "今天心情比较放松，可以让照顾自己不那么来自压力。",
      pressure: "压力已经被看见了。今天不需要用急着修正来回答它。",
      uneasy: "这条记录里有一些不舒服的感觉，可以先轻轻放下，不需要马上解决。",
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
    activityRootReflection: {
      clinical_focus: "今天用了持续的精细度、手、眼睛和神经系统专注力。安静恢复也需要空间。",
      service_standing: "今天的能量可能用在站立、走动、拿设备和照顾眼前人的节奏。让后背、腿、肩膀和眼睛也有恢复空间。",
      cognitive_deepwork: "今天用了持续专注和屏幕注意力。让眼睛休息，降低 mental loop，把空间还给大脑。",
      market_decision: "今天的负荷可能更多来自注意力和决策压力，而不是身体活动。短暂离开屏幕，也不要把市场带进睡眠里。",
      outdoor_heat: "今天有炎热、出汗或身体用力。分段小口补水，给身体短暂停顿，不需要急着追数字。",
      sport_sweat: "今天身体确实用了力。Recovery 是训练的一部分，不是退后。",
      walking_physical: "今天身体通过走路或活动用了力。把空间还给后背、腿和脚，也把喝水分散到一天里。",
      recovery_low_sleep: "这是 recovery 信号，不是高 activity load。先休息，再增加新的回合。",
      rest_base: "今天可以维持轻一点的节奏，不需要因为有空就增加 productivity。"
    },
    activityRootSummary: {
      clinical_focus: "今天用了持续的精细度。",
      service_standing: "今天的能量用在站立、走动和照顾眼前节奏上。",
      cognitive_deepwork: "今天用了持续专注和屏幕注意力。",
      market_decision: "今天用了注意力和决策能量。",
      outdoor_heat: "今天有炎热、出汗或身体用力。",
      sport_sweat: "今天身体确实用了力。",
      walking_physical: "今天通过走路或活动使用了身体。",
      recovery_low_sleep: "今天是睡眠不足带来的 recovery 信号。",
      rest_base: "今天是比较轻的节奏。"
    },
    activitySpecificReflection: {
      lightCodingAiAssist: "今天更像轻量编码或 AI 协助工作，不是完整 deep work。主要负荷在于管理 context、检查输出和持续做小决定，所以眼睛休息和关闭 mental loop 仍然重要。",
      shortQualityRun: "今天更像短距离质量跑，不是长距离跑。身体用到的是强度，即使距离不长，recovery 也可以跟上这份 effort。",
      rest: "今天是休息节奏，没有给身体增加太多主要 load。",
      lightRecoveryDay: "今天是轻一点的节奏，让系统慢慢恢复。",
      lowSleepRest: "今天能量可能受到睡少影响，选择休息日可以避免再增加一层 load。",
      lowSleepLightRecovery: "今天有睡少的信号，轻一点的节奏也许能帮助 recovery 跟上身体。"
    },
    activitySpecificSummary: {
      lightCodingAiAssist: "今天通过管理 context 和 AI 协助工作使用了轻量认知负荷。",
      shortQualityRun: "今天身体用了较快节奏的跑步强度，即使距离不长。",
      rest: "今天是休息节奏。",
      lightRecoveryDay: "今天是轻恢复节奏。",
      lowSleepRest: "今天有睡少信号，也选择了休息节奏。",
      lowSleepLightRecovery: "今天有睡少信号，也有轻一点的恢复节奏。"
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
      steady: "今天不需要急着给自己下结论，回到小小的稳定节奏就够了。"
    },
    mindNoteReminder: {
      pressured: "已经看见压力了。今天不需要修好一切，只要回到稳定就好。",
      worried: "担心是在提醒照顾自己，不是命令你立刻修正。",
      uneasy: "这条记录里有一些不舒服的感觉，可以先轻轻放下，不需要马上解决。",
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
      recovery: "维持稳定，不需要增加超过今天所需的东西。"
    },
    tomorrowFocusByActivityRoot: {
      clinical_focus: "给手、眼睛和神经系统专注力一个安静恢复的窗口。",
      service_standing: "把空间还给后背、腿、肩膀和眼睛。",
      cognitive_deepwork: "休息眼睛，降低 mental loop，把空间还给大脑。",
      market_decision: "让眼睛休息，分段关掉屏幕，也不要把市场带进睡眠里。",
      outdoor_heat: "分段小口补水，也给炎热或身体 load 短暂停顿。",
      sport_sweat: "让 recovery 成为训练的一部分。",
      walking_physical: "把空间还给后背、腿和脚，也把喝水分散到一天里。",
      recovery_low_sleep: "先 recovery，再增加新的回合。",
      rest_base: "维持轻一点的节奏，不需要增加 productivity 压力。"
    },
    tomorrowFocusByActivity: {
      lightCodingAiAssist: "休息眼睛，减少连续管理 context，把工作 loop 一个一个收好。",
      shortQualityRun: "下一次可以回到 easy 或 steady 节奏，平衡今天较快的跑步节奏。"
    },
    options: {
      energy: { low: "低", medium: "中", good: "好" },
      mind: { very_heavy: "很沉重", uneasy: "不安", pressured: "有压力", neutral: "一般", okay: "还可以", feeling_good: "感觉不错", relaxed: "放松" },
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
        lightRecoveryDay: "轻恢复日",
        officeWork: "办公室工作 / 会议与文件",
        lightCodingAiAssist: "轻量编码 / AI 协助",
        outdoorWork: "户外工作 / 体力与出汗",
        dentalFocus: "牙科 / 精细临床病例",
        clinicalShift: "医生 / 门诊或病患照护",
        photoshoot: "摄影师 / 长时间拍摄",
        marketWatch: "投资者 / 盯盘与分析",
        badminton: "羽毛球",
        easyRun: "轻松跑",
        shortQualityRun: "短距离质量跑",
        longRun: "长距离跑",
        heavyPingPong: "高强度乒乓球",
        longWalk: "走很多路",
        deepWork: "深度工作 / 编程",
        lowSleep: "睡眠不足"
      },
      activityGroups: {
        work: "工作",
        sports: "运动",
        recovery: "轻恢复"
      },
      practiceRoots: {
        body: "身体",
        feeling_tone: "感受",
        mind_thought: "心 / 念头",
        dhamma: "法",
        other_or_none: "未练习 / 其他"
      },
      practiceTypes: {
        standing: "觉知站立",
        walking: "觉知行走",
        sitting: "觉知坐着",
        lying_down: "觉知躺下",
        breath_awareness: "觉知呼吸",
        body_movement: "觉知身体动作",
        pleasant: "思维适度",
        unpleasant: "思维轻安",
        neutral_feeling: "忆念感恩",
        uneasy_tone: "忆念平静",
        body_discomfort: "忆念善的时刻",
        tense_mind: "思维无常",
        observe_mind: "觉知心",
        notice_thoughts: "看见念头",
        buddho: "念佛陀",
        gentle_phrase: "使用温和短句",
        scattered_mind: "觉知心散乱",
        calm_mind: "觉知心安静",
        notice_impermanence: "思维三相",
        notice_defilement: "思维并看见烦恼",
        recollect_goodness: "忆念善行",
        recollect_virtue: "忆念持戒",
        see_and_release: "看见并放下",
        notice_wanting: "思维并看见想要",
        just_resting: "只是休息",
        body_awareness: "觉知身体",
        walking_awareness: "行走觉知",
        metta: "慈心",
        karuna: "悲心",
        mudita: "随喜",
        upekkha: "舍心",
        buddha_recollection: "忆念佛",
        dhamma_recollection: "忆念法",
        sangha_recollection: "忆念僧",
        virtue_recollection: "忆念戒",
        generosity_recollection: "忆念布施",
        peace_recollection: "忆念寂静",
        impermanence: "看见无常",
        let_it_be_lighter: "轻轻放下",
        see_without_following: "看见但不跟随",
        body_elements: "观身为元素",
        food_as_it_is: "如实看待食物",
        simple_body_awareness: "回到简单的身体觉知",
        light: "光",
        color: "颜色",
        open_space: "空间",
        none: "未练习",
        other: "其他"
      },
      practiceTypeHelpers: {
        standing: "如实觉知身体，不需要让它变得特别。",
        walking: "如实觉知身体，不需要让它变得特别。",
        sitting: "如实觉知身体，不需要让它变得特别。",
        lying_down: "如实觉知身体，不需要让它变得特别。",
        breath_awareness: "如实觉知身体，不需要让它变得特别。",
        body_movement: "如实觉知身体，不需要让它变得特别。",
        pleasant: "忆念有益的内容，不强迫自己感觉好。",
        unpleasant: "忆念有益的内容，不强迫自己感觉好。",
        neutral_feeling: "忆念有益的内容，不强迫自己感觉好。",
        uneasy_tone: "忆念有益的内容，不强迫自己感觉好。",
        body_discomfort: "忆念有益的内容，不强迫自己感觉好。",
        tense_mind: "轻轻思维无常，不直接抓住困难。",
        observe_mind: "看见生起的心或念头，不需要跟它争辩。",
        notice_thoughts: "看见生起的心或念头，不需要跟它争辩。",
        buddho: "把短句作为轻轻的基础，不给自己压力。",
        gentle_phrase: "选择不激起欲望、也不压迫自己的短句。",
        scattered_mind: "看见生起的心或念头，不需要跟它争辩。",
        calm_mind: "看见生起的心或念头，不需要跟它争辩。",
        notice_impermanence: "把正在发生的看作自然过程，不判断练习好或不好。",
        notice_defilement: "把正在发生的看作自然过程，不判断练习好或不好。",
        recollect_goodness: "把正在发生的看作自然过程，不判断练习好或不好。",
        recollect_virtue: "把正在发生的看作自然过程，不判断练习好或不好。",
        see_and_release: "把正在发生的看作自然过程，不判断练习好或不好。",
        notice_wanting: "把正在发生的看作自然过程，不判断练习好或不好。",
        just_resting: "不选择也可以。今天只要知道有没有一个基础就足够。",
        body_awareness: "如实觉知身体，不需要做得特别好。",
        walking_awareness: "轻轻行走觉知，不把它变成 performance。",
        metta: "让心稍微软下来，不需要强迫自己感觉好。",
        karuna: "让心看见困难，不需要急着修正全部。",
        mudita: "看见一点好的东西，不需要把它放大太多。",
        upekkha: "看见正在发生的事，能放多少就放多少。",
        buddha_recollection: "把忆念作为安住的基础，不是为了证明什么。",
        dhamma_recollection: "回到今天可以看见的简单真实。",
        sangha_recollection: "记得这条路不需要一个人走完。",
        virtue_recollection: "看见仍然支持内心的善意。",
        generosity_recollection: "忆念布施，不需要给自己压力。",
        peace_recollection: "能触碰多少寂静就多少，不需要强迫。",
        impermanence: "看见变化，不急着给自己下结论。",
        let_it_be_lighter: "能放轻多少就多少，不需要一次全放下。",
        see_without_following: "看见它，不需要跟随每一个念头。",
        body_elements: "把身体看作自然元素，不作为对自己的评价。",
        food_as_it_is: "如实看待食物，轻轻地，不带责备。",
        simple_body_awareness: "简单回到可以觉知的身体。",
        light: "以光作为稳定基础，不需要用力盯。",
        color: "用颜色作为一个小小的安住点。",
        open_space: "让空间帮助心稍微松一点。",
        none: "今天没有练习也是信息，不是错误。",
        other: "如果今天有自己的练习基础，可以选择其他。"
      },
      mindNote: {
        feeling: {
          calm: "一般",
          uneasy: "心里不舒服",
          worried: "担心",
          pressured: "有压力",
          tired: "疲惫",
          scattered: "分散",
          feeling_good: "🩵 满足",
          grateful: "😊 感谢",
          peaceful: "🌿 平静",
          proud: "✨ 为自己感到骄傲",
          learning: "正在学习",
          thinking: "正在思考"
        },
        support: {
          rest_first: "先休息",
          see_pattern: "看见模式",
          reduce_pressure: "减少压力",
          hydrate_gently: "温和补水",
          set_down: "先放下",
          walk_gently: "轻轻继续",
          thank_self: "谢谢自己",
          stay_present: "回到当下"
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
  "enough_sleep",
  "low_food",
  "low_water",
  "heavy_exercise",
  "deep_work",
  "stress",
  "light_mind",
  "unknown"
];

const activityOptions = [
  { key: "officeWork", label: "งานออฟฟิศ", score: 1, type: "cognitive_load", group: "work" },
  { key: "lightCodingAiAssist", label: "โค้ดดิ้งเบา ๆ / AI ช่วยงาน", score: 1, type: "cognitive_load", group: "work", legacyLabels: ["Light coding / AI-assisted work", "轻量编码 / AI 协助"] },
  { key: "outdoorWork", label: "ทำงานกลางแจ้ง", score: 3, type: "outdoor_heat_load", group: "work" },
  { key: "deepWork", label: "Deep work / coding นาน", score: 2, type: "cognitive_load", group: "work", legacyLabels: ["Long deep work / coding", "长时间 deep work / coding"] },
  { key: "dentalFocus", label: "หมอฟัน", score: 3, type: "clinical_focus", group: "work" },
  { key: "clinicalShift", label: "แพทย์", score: 3, type: "clinical_focus", group: "work" },
  { key: "photoshoot", label: "ช่างภาพ", score: 3, type: "service_standing_load", group: "work" },
  { key: "marketWatch", label: "นักลงทุน", score: 2, type: "market_decision_load", group: "work" },
  { key: "badminton", label: "แบดมินตัน", score: 3, type: "sport_intensity_load", group: "sports" },
  { key: "heavyPingPong", label: "ปิงปองหนัก", score: 3, type: "sport_intensity_load", group: "sports", legacyLabels: ["Heavy ping-pong"] },
  { key: "easyRun", label: "Easy run", score: 2, type: "physical_load", group: "sports" },
  { key: "shortQualityRun", label: "วิ่งคุณภาพระยะสั้น", score: 3, type: "sport_intensity_load", group: "sports", legacyLabels: ["Short quality run", "短距离质量跑"] },
  { key: "longRun", label: "Long run", score: 4, type: "sport_intensity_load", group: "sports" },
  { key: "longWalk", label: "เดินเยอะ", score: 2, type: "physical_load", group: "sports" },
  { key: "lowSleep", label: "นอนน้อย", score: 2, type: "sleep_debt_load", group: "recovery", legacyLabels: ["Low sleep", "睡得少"], hiddenInUi: true },
  { key: "rest", label: "วันพัก", score: 0, type: "recovery", group: "recovery", legacyLabels: ["Rest day"] },
  { key: "lightRecoveryDay", label: "วันเบา / ฟื้นตัว", score: 1, type: "recovery", group: "recovery", legacyLabels: ["Light recovery day", "轻恢复日"] }
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
const activityLoadRootByActivityKey = {
  dentalFocus: "clinical_focus",
  clinicalShift: "clinical_focus",
  photoshoot: "service_standing",
  officeWork: "cognitive_deepwork",
  lightCodingAiAssist: "cognitive_deepwork",
  deepWork: "cognitive_deepwork",
  marketWatch: "market_decision",
  outdoorWork: "outdoor_heat",
  badminton: "sport_sweat",
  heavyPingPong: "sport_sweat",
  easyRun: "sport_sweat",
  shortQualityRun: "sport_sweat",
  longRun: "sport_sweat",
  longWalk: "walking_physical",
  lowSleep: "recovery_low_sleep",
  rest: "rest_base",
  lightRecoveryDay: "rest_base"
};
const activityLoadRootPriority = [
  "outdoor_heat",
  "sport_sweat",
  "clinical_focus",
  "market_decision",
  "service_standing",
  "cognitive_deepwork",
  "walking_physical",
  "recovery_low_sleep",
  "rest_base"
];
const activitySpecificReflectionKeys = ["lightCodingAiAssist", "shortQualityRun"];
const recoveryModeActivityKeys = ["rest", "lightRecoveryDay"];
const runningActivityKeys = ["easyRun", "shortQualityRun", "longRun"];
const runningActivityPriority = ["longRun", "shortQualityRun", "easyRun"];
const runSweatOptions = ["", "low", "medium", "high"];
const practiceSourceKey = "four_bases_daily_context";
const practiceGroups = [
  {
    key: "body",
    types: ["standing", "walking", "sitting", "lying_down", "breath_awareness", "body_movement"]
  },
  {
    key: "feeling_tone",
    types: ["pleasant", "unpleasant", "neutral_feeling", "uneasy_tone", "body_discomfort", "tense_mind"]
  },
  {
    key: "mind_thought",
    types: ["observe_mind", "notice_thoughts", "buddho", "gentle_phrase", "scattered_mind", "calm_mind"]
  },
  {
    key: "dhamma",
    types: [
      "notice_impermanence",
      "notice_defilement",
      "recollect_goodness",
      "recollect_virtue",
      "see_and_release",
      "notice_wanting"
    ]
  },
  {
    key: "other_or_none",
    types: ["none", "other", "just_resting"]
  },
  // Legacy v1.9.9 roots remain readable for old localStorage/workbook values,
  // but the daily UI now exposes only Body / Feeling tone / Mind-Thought / Dhamma.
  {
    key: "breath_body_base",
    types: ["body_awareness", "walking_awareness"],
    hiddenInUi: true
  },
  {
    key: "heart_quality",
    types: ["metta", "karuna", "mudita", "upekkha"],
    hiddenInUi: true
  },
  {
    key: "recollection_trust",
    types: [
      "buddha_recollection",
      "dhamma_recollection",
      "sangha_recollection",
      "virtue_recollection",
      "generosity_recollection",
      "peace_recollection"
    ],
    hiddenInUi: true
  },
  {
    key: "letting_go",
    types: ["impermanence", "let_it_be_lighter", "see_without_following"],
    hiddenInUi: true
  },
  {
    key: "elements_simplicity",
    types: ["body_elements", "food_as_it_is", "simple_body_awareness"],
    hiddenInUi: true
  },
  {
    key: "visual_steadiness",
    types: ["light", "color", "open_space"],
    hiddenInUi: true
  }
];
const visiblePracticeGroups = practiceGroups.filter((group) => !group.hiddenInUi);
const practiceTypeToRoot = practiceGroups.reduce((acc, group) => {
  group.types.forEach((type) => {
    acc[type] = group.key;
  });
  return acc;
}, {});
const legacyPracticeRootMap = {
  breath_body_base: "body",
  recollection_trust: "dhamma",
  letting_go: "dhamma",
  heart_quality: "other_or_none",
  elements_simplicity: "other_or_none",
  visual_steadiness: "other_or_none"
};
const legacyPracticeTypeMap = {
  body_awareness: "body_movement",
  walking_awareness: "walking",
  metta: "other",
  karuna: "other",
  mudita: "other",
  upekkha: "other",
  buddha_recollection: "recollect_goodness",
  dhamma_recollection: "recollect_goodness",
  sangha_recollection: "recollect_goodness",
  virtue_recollection: "recollect_virtue",
  generosity_recollection: "recollect_goodness",
  peace_recollection: "see_and_release",
  impermanence: "notice_impermanence",
  let_it_be_lighter: "see_and_release",
  see_without_following: "see_and_release",
  body_elements: "other",
  food_as_it_is: "other",
  simple_body_awareness: "other",
  light: "other",
  color: "other",
  open_space: "other"
};

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
  sleepHours: "",
  loadScore: 0,
  loadLevel: "Load เบา",
  hydrationStatus: "วันนี้น้ำยังน้อยไปนิด ค่อย ๆ จิบเพิ่มนะ",
  runDetail: {
    type: "",
    distanceKm: "",
    durationMin: "",
    sweat: ""
  },
  generatedReflection: "",
  practiceRoot: "",
  practiceType: "",
  practiceMinutes: "",
  practiceNote: "",
  mindNoteText: "",
  mindNoteFeeling: "",
  mindNoteSupport: ""
};

const mindStateAliases = {
  "นิ่ง": "เฉย ๆ",
  "Calm": "เฉย ๆ",
  "平静": "เฉย ๆ",
  "Neutral": "เฉย ๆ",
  "一般": "เฉย ๆ",
  "Worried": "ไม่สบายใจ",
  "กังวล": "ไม่สบายใจ",
  "担心": "ไม่สบายใจ",
  "Scattered": "กดดัน",
  "ฟุ้ง": "กดดัน",
  "分散": "กดดัน",
  "Very heavy": "หนักมาก",
  "很沉重": "หนักมาก",
  "Uneasy": "ไม่สบายใจ",
  "不安": "ไม่สบายใจ",
  "Pressured": "กดดัน",
  "有压力": "กดดัน",
  "Okay": "พอไหว",
  "还可以": "พอไหว",
  "Feeling good": "รู้สึกดี",
  "感觉不错": "รู้สึกดี",
  "Relaxed": "ผ่อนคลาย",
  "放松": "ผ่อนคลาย"
};

function normalizeMindStateValue(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  return mindStateAliases[text] || text;
}

let currentLanguage = loadLanguage();
let currentThemePreference = getThemePreference();
let appState = loadState();
let themeIntervalId;
let stateOrbIntervalId;
let currentView = "today";
let todayInputStep = 1;
let todayInputStepResetAfterSave = false;
let activeTodaySignal = "hydration";
let activeFieldReviewRoom = "hydration";
let activeFieldReviewFocus = "overview";
let activeSignalRelationshipPair = "";
const guidedReadingStateByRoom = {};
let guidedReadingTimeframe = "";
let selectedReflectionRoot = "auto";
let isEditingReflection = false;
let isGeneratingReflection = false;
let reflectionGenerationTimerId;
const REFLECTION_GENERATION_DELAY_MS = 850;
const REFLECTION_SIGNATURE = "🩵";
const FIELD_REVIEW_DEFAULT_TIMEFRAME = "30";
const REFLECTION_ROOT_OPTIONS = [
  "auto",
  "hydration",
  "sleep_recovery",
  "load_activity",
  "drinks_caffeine_sweetness",
  "mind_state",
  "practice_context"
];
const REFLECTION_ROOT_OPTION_LABEL_KEYS = {
  auto: "reflectionRootOptionAuto",
  hydration: "reflectionRootOptionHydration",
  sleep_recovery: "reflectionRootOptionSleep",
  load_activity: "reflectionRootOptionLoad",
  drinks_caffeine_sweetness: "reflectionRootOptionDrinks",
  mind_state: "reflectionRootOptionMind",
  practice_context: "reflectionRootOptionPractice"
};
const REFLECTION_ROOT_PREVIEW_KEYS = {
  auto: "reflectionRootPreviewAuto",
  hydration: "reflectionRootPreviewHydration",
  sleep_recovery: "reflectionRootPreviewSleep",
  load_activity: "reflectionRootPreviewLoad",
  drinks_caffeine_sweetness: "reflectionRootPreviewDrinks",
  mind_state: "reflectionRootPreviewMind",
  practice_context: "reflectionRootPreviewPractice"
};
const REFLECTION_ROOT_OPENING_KEYS = {
  hydration: "reflectionRootOpeningHydration",
  sleep_recovery: "reflectionRootOpeningSleep",
  load_activity: "reflectionRootOpeningLoad",
  drinks_caffeine_sweetness: "reflectionRootOpeningDrinks",
  mind_state: "reflectionRootOpeningMind",
  practice_context: "reflectionRootOpeningPractice"
};
const REFLECTION_ROOT_HINT_KEYS = {
  hydration: "reflectionRootHintHydration",
  sleep_recovery: "reflectionRootHintSleep",
  load_activity: "reflectionRootHintLoad",
  drinks_caffeine_sweetness: "reflectionRootHintDrinks",
  mind_state: "reflectionRootHintMind",
  practice_context: "reflectionRootHintPractice"
};
const REFLECTION_ROOT_ATTENTION_POLICY = {
  hydration: {
    emphasize: ["Water_ml", "Hydration_Status"],
    context: ["Load_Score", "Caffeine_Score", "Activities", "Run_Detail_JSON", "Sleep_Hours"],
    reduce: ["Mind_Note_Text", "Practice_Minutes"]
  },
  sleep_recovery: {
    emphasize: ["Sleep_Hours", "Sleep", "Energy"],
    context: ["Load_Score", "Caffeine_Score", "Water_ml"],
    reduce: ["Sugar_Score", "Practice_Minutes"]
  },
  load_activity: {
    emphasize: ["Load_Score", "Activities", "Run_Detail_JSON"],
    context: ["Water_ml", "Sleep_Hours", "Energy", "Caffeine_Score"],
    reduce: ["Mind_Note_Text", "Practice_Minutes", "Sugar_Score"]
  },
  drinks_caffeine_sweetness: {
    emphasize: ["Caffeine_Score", "Sugar_Score", "Drink_Profile_JSON"],
    context: ["Sleep_Hours", "Load_Score", "Energy", "Water_ml"],
    reduce: ["Mind_Note_Text", "Practice_Minutes"]
  },
  mind_state: {
    emphasize: ["Mind", "Mind_Note_Text", "Mind_Note_Feeling", "Mind_Note_Support"],
    context: ["Sleep_Hours", "Load_Score", "Practice_Minutes", "Energy"],
    reduce: ["Water_ml", "Caffeine_Score", "Sugar_Score"]
  },
  practice_context: {
    emphasize: ["Practice_Minutes", "Practice_Note", "Practice_Context_JSON"],
    context: ["Mind", "Sleep_Hours", "Load_Score"],
    reduce: ["Water_ml", "Caffeine_Score", "Sugar_Score"]
  },
  auto: {
    emphasize: [],
    context: [],
    reduce: []
  }
};

document.addEventListener("DOMContentLoaded", () => {
  applyThemePreference(currentThemePreference);
  applyTranslations();
  renderDate();
  renderDrinkOptions();
  renderActivityOptions();
  renderEnergyCauseOptions();
  renderPracticeOptions();
  bindEvents();
  loadUserIntentionProfileIntoForm();
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

function currentFormClearedKey() {
  return `${CURRENT_FORM_CLEARED_PREFIX}:${todayIso}`;
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
  updateTodayInputStepUI();
  updateTodaySignalCockpitUI();
  renderReflectionRootPicker();
  renderIntentionProfileScaffold();
  renderTodayHydrationWelcome();
}

function getIntentionProfileAddressPreview() {
  const displayName = document.querySelector("#intentionDisplayName")?.value.trim() || "";
  if (!displayName) return "ตัวอย่าง: พี่อยากให้หนูอ่านจังหวะน้ำจากมุมไหนคะ";

  const style = normalizeUserIntentionAddressStyle(document.querySelector("#intentionAddressStyle")?.value || "senior_name");
  const addressByStyle = {
    senior_name: `พี่ ${displayName}`,
    polite_name: `คุณ ${displayName}`,
    name_only: displayName
  };

  return `ตัวอย่าง: ${addressByStyle[style] || `พี่ ${displayName}`} อยากให้หนูอ่านจังหวะน้ำจากมุมไหนคะ`;
}

function getDefaultUserIntentionProfile() {
  return {
    schemaVersion: USER_INTENTION_PROFILE_SCHEMA_VERSION,
    displayName: "",
    addressStyle: "senior_name",
    customAddressStyle: "",
    birthDate: "",
    birthYear: "",
    preferredTone: "",
    userContextNote: "",
    doNotAssumeNote: "",
    updatedAt: ""
  };
}

function normalizeUserIntentionAddressStyle(value) {
  const legacyMap = {
    sibling: "senior_name",
    formal: "polite_name",
    name: "name_only",
    custom: "senior_name"
  };
  const normalized = legacyMap[value] || value;
  return ["senior_name", "polite_name", "name_only"].includes(normalized) ? normalized : "senior_name";
}

function normalizeUserIntentionTone(value) {
  const legacyMap = {
    evidence: "data_first",
    companion: "friendly",
    practice_gentle: "mindful"
  };
  const normalized = legacyMap[value] || value;
  return ["", "gentle", "concise", "data_first", "friendly", "mindful"].includes(normalized) ? normalized : "";
}

function normalizeProfileText(value) {
  return String(value ?? "").trim();
}

function normalizeUserIntentionProfile(raw = {}) {
  const source = raw && typeof raw === "object" ? raw : {};
  return {
    ...getDefaultUserIntentionProfile(),
    displayName: normalizeProfileText(source.displayName),
    addressStyle: normalizeUserIntentionAddressStyle(source.addressStyle),
    customAddressStyle: normalizeProfileText(source.customAddressStyle),
    birthDate: isValidIsoDate(source.birthDate) ? source.birthDate : "",
    birthYear: isValidBirthYear(source.birthYear) ? String(source.birthYear) : "",
    preferredTone: normalizeUserIntentionTone(source.preferredTone),
    userContextNote: normalizeProfileText(source.userContextNote),
    doNotAssumeNote: normalizeProfileText(source.doNotAssumeNote),
    updatedAt: normalizeProfileText(source.updatedAt)
  };
}

function validateUserIntentionProfile(profile) {
  const errors = [];
  if (profile.birthDate && !isValidIsoDate(profile.birthDate)) {
    errors.push("วันเกิดที่บันทึกไว้ยังไม่ถูกต้องค่ะ");
  }
  if (profile.birthYear && !isValidBirthYear(profile.birthYear)) {
    errors.push("ปีเกิดที่บันทึกไว้ยังไม่ถูกต้องค่ะ");
  }
  return {
    ok: errors.length === 0,
    errors
  };
}

function readStoredUserIntentionProfile() {
  try {
    const stored = localStorage.getItem(USER_INTENTION_PROFILE_KEY);
    if (!stored) return { profile: getDefaultUserIntentionProfile(), malformed: false, exists: false };
    return {
      profile: normalizeUserIntentionProfile(JSON.parse(stored)),
      malformed: false,
      exists: true
    };
  } catch {
    return { profile: getDefaultUserIntentionProfile(), malformed: true, exists: true };
  }
}

function loadUserIntentionProfile() {
  return readStoredUserIntentionProfile().profile;
}

function getSavedUserIntentionProfileForExport() {
  try {
    const stored = localStorage.getItem(USER_INTENTION_PROFILE_KEY);
    if (!stored) return { profile: null, malformed: false, exists: false };
    const parsed = JSON.parse(stored);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { profile: null, malformed: true, exists: true };
    }
    return {
      profile: normalizeUserIntentionProfile(parsed),
      malformed: false,
      exists: true
    };
  } catch {
    return { profile: null, malformed: true, exists: true };
  }
}

function buildUserIntentionProfileExportRow(profile) {
  const normalized = normalizeUserIntentionProfile(profile);
  return {
    Profile_Schema_Version: normalized.schemaVersion,
    Display_Name: normalized.displayName,
    Address_Style: normalized.addressStyle,
    Preferred_Tone: normalized.preferredTone,
    User_Context_Note: normalized.userContextNote,
    Do_Not_Assume_Note: normalized.doNotAssumeNote,
    Birth_Date: normalized.birthDate,
    Birth_Year: normalized.birthYear,
    Updated_At: normalized.updatedAt
  };
}

function appendUserIntentionProfileSheetIfAvailable(workbook) {
  const savedProfile = getSavedUserIntentionProfileForExport();
  if (savedProfile.malformed) {
    console.warn("User Intention Profile export skipped: saved profile is malformed.");
    return;
  }
  if (!savedProfile.profile) return;

  const profileSheet = XLSX.utils.json_to_sheet(
    [buildUserIntentionProfileExportRow(savedProfile.profile)],
    { header: USER_INTENTION_PROFILE_EXPORT_COLUMNS }
  );
  applySheetReadability(profileSheet, [22, 20, 18, 18, 34, 34, 16, 14, 28]);
  XLSX.utils.book_append_sheet(workbook, profileSheet, USER_INTENTION_PROFILE_SHEET_NAME);
}

function getWorkbookCellText(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString();
  return String(value ?? "").trim();
}

function getWorkbookProfileCell(row, headerIndexByColumn, column) {
  const index = headerIndexByColumn[column];
  if (index === undefined || index < 0) return "";
  return getWorkbookCellText(row[index]);
}

function normalizeImportedUpdatedAt(value, warnings) {
  const text = getWorkbookCellText(value);
  if (!text) return "";
  const dateValue = value instanceof Date ? value : new Date(text);
  if (Number.isNaN(dateValue.getTime())) {
    warnings.push("Updated_At ไม่อยู่ในรูปแบบ timestamp ที่อ่านได้ จึงข้ามค่านี้");
    return "";
  }
  return value instanceof Date ? dateValue.toISOString() : text;
}

function parseUserIntentionProfileSheet(workbook) {
  const sheet = workbook.Sheets[USER_INTENTION_PROFILE_SHEET_NAME];
  if (!sheet) return { status: "missing", profile: null, warnings: [], errors: [] };

  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
  const headerRow = rows[0] || [];
  const headers = headerRow.map(getWorkbookCellText);
  const dataRows = rows.slice(1).filter((row) => row.some((cell) => getWorkbookCellText(cell) !== ""));
  const warnings = [];
  const errors = [];

  if (!headers.some(Boolean) || dataRows.length === 0) {
    return { status: "empty", profile: null, warnings, errors };
  }

  const unknownColumns = headers.filter((header) => header && !USER_INTENTION_PROFILE_EXPORT_COLUMNS.includes(header));
  if (unknownColumns.length) {
    warnings.push(`พบ column ที่ยังไม่รองรับและจะข้าม: ${unknownColumns.join(", ")}`);
  }

  if (dataRows.length > 1) {
    return {
      status: "invalid",
      profile: null,
      warnings,
      errors: ["User_Intention_Profile มีมากกว่า 1 profile row"]
    };
  }

  const headerIndexByColumn = USER_INTENTION_PROFILE_EXPORT_COLUMNS.reduce((acc, column) => {
    acc[column] = headers.indexOf(column);
    return acc;
  }, {});
  const row = dataRows[0];
  const schemaVersion = getWorkbookProfileCell(row, headerIndexByColumn, "Profile_Schema_Version");
  const displayName = getWorkbookProfileCell(row, headerIndexByColumn, "Display_Name");
  let addressStyle = getWorkbookProfileCell(row, headerIndexByColumn, "Address_Style");
  const preferredTone = getWorkbookProfileCell(row, headerIndexByColumn, "Preferred_Tone");
  const birthDate = getWorkbookProfileCell(row, headerIndexByColumn, "Birth_Date");
  const birthYear = getWorkbookProfileCell(row, headerIndexByColumn, "Birth_Year");
  const updatedAtRaw = row[headerIndexByColumn.Updated_At];
  const updatedAt = normalizeImportedUpdatedAt(updatedAtRaw, warnings);

  if (!["1", USER_INTENTION_PROFILE_SCHEMA_VERSION].includes(schemaVersion)) {
    errors.push("Profile_Schema_Version ไม่รองรับ");
  }

  if (addressStyle === "custom") {
    addressStyle = "senior_name";
    warnings.push("Address_Style แบบ custom เป็น legacy value จึง normalize เป็น senior_name");
  } else if (addressStyle && !["senior_name", "polite_name", "name_only"].includes(addressStyle)) {
    errors.push("Address_Style ไม่รองรับ");
  }

  if (preferredTone && !["gentle", "concise", "data_first", "friendly", "mindful"].includes(preferredTone)) {
    errors.push("Preferred_Tone ไม่รองรับ");
  }

  if (birthDate && !isValidIsoDate(birthDate)) {
    errors.push("Birth_Date ต้องเป็น YYYY-MM-DD ที่ตรงกับปฏิทิน");
  }

  if (birthYear && !isValidBirthYear(birthYear)) {
    errors.push("Birth_Year ไม่อยู่ในช่วงที่รองรับ");
  }

  if (errors.length) {
    return { status: "invalid", profile: null, warnings, errors };
  }

  return {
    status: "valid",
    profile: normalizeUserIntentionProfile({
      schemaVersion: USER_INTENTION_PROFILE_SCHEMA_VERSION,
      displayName,
      addressStyle: addressStyle || "senior_name",
      preferredTone,
      userContextNote: getWorkbookProfileCell(row, headerIndexByColumn, "User_Context_Note"),
      doNotAssumeNote: getWorkbookProfileCell(row, headerIndexByColumn, "Do_Not_Assume_Note"),
      birthDate,
      birthYear,
      updatedAt
    }),
    warnings,
    errors: []
  };
}

function buildUserIntentionProfileImportPreview(profile, warnings = []) {
  const normalized = normalizeUserIntentionProfile(profile);
  const valueOrBlank = (value) => value || "ไม่ระบุ";
  const noteValue = (value) => value ? value : "ไม่ระบุ";
  return [
    "พบ User_Intention_Profile ใน workbook",
    "",
    "การ import นี้จะแทนที่ Intention Profile ที่บันทึกไว้ใน browser นี้ หลังจากพี่ยืนยันเท่านั้น",
    "",
    `Display name: ${valueOrBlank(normalized.displayName)}`,
    `Address style: ${normalized.addressStyle}`,
    `Preferred tone: ${valueOrBlank(normalized.preferredTone)}`,
    `User context note: ${noteValue(normalized.userContextNote)}`,
    `Do-not-assume note: ${noteValue(normalized.doNotAssumeNote)}`,
    `Birth date: ${valueOrBlank(normalized.birthDate)}`,
    `Birth year: ${valueOrBlank(normalized.birthYear)}`,
    `Updated at: ${valueOrBlank(normalized.updatedAt)}`,
    ...(warnings.length ? ["", `Warnings: ${warnings.join(" | ")}`] : []),
    "",
    "ต้องการ replace local profile ด้วยข้อมูลนี้ไหม?"
  ].join("\n");
}

function replaceUserIntentionProfileFromImport(profile) {
  const normalized = normalizeUserIntentionProfile(profile);
  const validation = validateUserIntentionProfile(normalized);
  if (!validation.ok) return { ok: false, errors: validation.errors, profile: normalized };
  try {
    localStorage.setItem(USER_INTENTION_PROFILE_KEY, JSON.stringify(normalized));
  } catch {
    return { ok: false, errors: ["ยังบันทึก Intention Profile จาก workbook ใน browser นี้ไม่ได้ค่ะ"], profile: normalized };
  }
  return { ok: true, errors: [], profile: normalized };
}

function confirmAndReplaceUserIntentionProfile(profileImport) {
  if (profileImport.status === "missing") return { status: "missing", message: "" };
  if (profileImport.status === "empty") return { status: "empty", message: t("importProfileEmpty") };
  if (profileImport.status === "invalid") {
    const reason = profileImport.errors.join("; ") || "unknown";
    return { status: "invalid", message: t("importProfileRejected", { reason }) };
  }

  if (!confirm(buildUserIntentionProfileImportPreview(profileImport.profile, profileImport.warnings))) {
    return { status: "cancelled", message: t("importProfileCancelled") };
  }

  const result = replaceUserIntentionProfileFromImport(profileImport.profile);
  if (!result.ok) {
    return { status: "invalid", message: t("importProfileRejected", { reason: result.errors.join("; ") }) };
  }
  writeProfileForm(result.profile);
  return { status: "imported", message: t("importProfileImported") };
}

function getUserIntentionProfileForReflection() {
  return normalizeUserIntentionProfile(loadUserIntentionProfile());
}

function formatUserAddress(profile = getDefaultUserIntentionProfile()) {
  const normalized = normalizeUserIntentionProfile(profile);
  const name = normalized.displayName.trim();
  if (!name) return "พี่";
  if (normalized.addressStyle === "polite_name") return `คุณ ${name}`;
  if (normalized.addressStyle === "name_only") return name;
  return `พี่ ${name}`;
}

function getTodayHydrationWelcomeAddress() {
  const storedProfile = readStoredUserIntentionProfile();
  const name = storedProfile.profile.displayName.trim();
  if (!storedProfile.exists || storedProfile.malformed || !name) return "";
  return formatUserAddress(storedProfile.profile);
}

function renderTodayHydrationWelcome() {
  const main = document.querySelector("#todayHydrationWelcomeMain");
  const sub = document.querySelector("#todayHydrationWelcomeSub");
  if (!main || !sub) return;
  const address = getTodayHydrationWelcomeAddress();
  main.textContent = address ? `สวัสดีค่ะ ${address} 🩵` : "สวัสดีค่ะ 🩵";
  sub.textContent = "วันนี้ค่อย ๆ กลับมาดูแลจังหวะน้ำของตัวเองกันนะคะ";
}

function getReflectionAddressContext(profile = getDefaultUserIntentionProfile()) {
  const normalized = normalizeUserIntentionProfile(profile);
  const name = normalized.displayName.trim();
  if (!name) {
    return {
      hasDisplayName: false,
      fullAddress: "พี่",
      shortAddress: "พี่",
      usesNeutralBody: false
    };
  }

  if (normalized.addressStyle === "polite_name") {
    return { hasDisplayName: true, fullAddress: `คุณ ${name}`, shortAddress: "คุณ", usesNeutralBody: false };
  }
  if (normalized.addressStyle === "name_only") {
    return { hasDisplayName: true, fullAddress: name, shortAddress: "", usesNeutralBody: true };
  }
  return { hasDisplayName: true, fullAddress: `พี่ ${name}`, shortAddress: "พี่", usesNeutralBody: false };
}

function buildNeutralUserReference() {
  return "ข้อมูลที่บันทึกไว้";
}

function protectReflectionSourceText(text) {
  const protectedValues = [
    appState.mindNoteText,
    appState.practiceNote
  ]
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .flatMap((value) => [value, truncateText(value, 80), truncateText(value, 90)])
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);
  const protectedParts = [];
  let protectedText = String(text || "");
  const protect = (value) => {
    const token = `__MHB_REFLECTION_SOURCE_${protectedParts.length}__`;
    protectedParts.push(value);
    return token;
  };

  protectedText = protectedText.replace(/“[^”]*”/g, (quote) => protect(quote));
  protectedValues.forEach((value) => {
    if (protectedText.includes(value)) protectedText = protectedText.replaceAll(value, protect(value));
  });
  return {
    text: protectedText,
    restore: (value) => protectedParts.reduce(
      (restored, source, index) => restored.replaceAll(`__MHB_REFLECTION_SOURCE_${index}__`, source),
      value
    )
  };
}

function applyReflectionAddressTokens(text, addressContext) {
  if (!addressContext?.hasDisplayName || currentLanguage !== "th") return String(text || "");
  const protectedText = protectReflectionSourceText(text);
  let normalizedText = protectedText.text;

  if (addressContext.shortAddress) {
    normalizedText = normalizedText.replaceAll("พี่", addressContext.shortAddress);
  } else {
    const neutralReplacements = [
      ["ข้อมูลของพี่", buildNeutralUserReference()],
      ["ข้อมูลที่พี่บันทึกไว้", buildNeutralUserReference()],
      ["สิ่งที่พี่บันทึกไว้", "สิ่งที่บันทึกไว้"],
      ["เวลาสั้น ๆ ที่พี่บันทึกไว้", "เวลาสั้น ๆ ที่บันทึกไว้"],
      ["พี่บันทึกไว้", "บันทึกไว้"],
      ["ที่พี่บันทึกไว้", "ที่บันทึกไว้"],
      ["ไม่สรุปแทนพี่", "ไม่สรุปแทน"],
      ["ความหมายสุดท้ายยังอยู่กับพี่", "ความหมายสุดท้ายยังอยู่กับผู้บันทึก"],
      ["ของพี่เอง", "ของผู้บันทึกเอง"],
      ["ถ้าพี่อยาก", "ถ้าอยาก"],
      ["พี่อาจลอง", "อาจลอง"],
      ["พี่ค่อย ๆ", "ค่อย ๆ"],
      ["วันนี้พี่", "วันนี้"],
      ["พี่ลอง", "ลอง"],
      ["ให้พี่", "ให้"],
      ["กับพี่", "ในรอบนี้"]
    ];
    neutralReplacements.forEach(([from, to]) => {
      normalizedText = normalizedText.replaceAll(from, to);
    });
    normalizedText = normalizedText.replaceAll("พี่", "").replace(/[ \t]{2,}/g, " ");
  }

  return protectedText.restore(normalizedText);
}

function getReflectionTonePreference(profile = getDefaultUserIntentionProfile()) {
  return normalizeUserIntentionTone(profile.preferredTone);
}

function buildPersonalizedReflectionOpening(profile, { root = selectedReflectionRoot } = {}) {
  const normalized = normalizeUserIntentionProfile(profile);
  if (currentLanguage !== "th" || !normalized.displayName) return "";
  const address = formatUserAddress(normalized);
  const addressGap = normalized.addressStyle === "name_only" ? " " : "";
  const rootKey = getSelectedReflectionRootKey(root);
  if (rootKey !== "auto") return `${address} `;
  return `สวัสดีค่ะ${addressGap}${address} วันนี้หนูจะอ่านเท่าที่บันทึกไว้แบบเบา ๆ นะคะ`;
}

function buildPersonalizedReflectionClosing(profile, { addressUsed = false } = {}) {
  const normalized = normalizeUserIntentionProfile(profile);
  if (currentLanguage !== "th") return "";
  const tone = getReflectionTonePreference(normalized);
  if (!tone) return "";
  const address = !addressUsed && normalized.displayName ? formatUserAddress(normalized) : "";
  const addressSuffix = address ? `${address} ` : "";
  const softGap = addressSuffix || " ";
  const closings = {
    gentle: `พอเห็นจังหวะวันนี้เท่านี้ก็ได้ค่ะ${softGap}ค่อย ๆ กลับมาดูแลตัวเองทีละช่วงนะคะ 🩵`,
    concise: `วันนี้อ่านได้เท่านี้พอค่ะ${addressSuffix}🩵`,
    data_first: "จากข้อมูลที่บันทึกไว้ วันนี้อ่านได้ประมาณนี้ค่ะ",
    friendly: `วันนี้อ่านด้วยกันได้เท่านี้ก่อนก็พอค่ะ${softGap}ไม่ต้องรีบสรุปทุกอย่างในรอบเดียวนะคะ 🩵`,
    mindful: "วันนี้เห็นจังหวะหนึ่งได้เท่านี้ก็พอค่ะ ความหมายสุดท้ายยังอยู่กับผู้บันทึกเสมอ 🩵"
  };
  return closings[tone] || "";
}

function personalizeReflectionOutput(text, { root = selectedReflectionRoot } = {}) {
  const cleanText = String(text || "").trim();
  if (!cleanText || currentLanguage !== "th") return cleanText;

  const profile = getUserIntentionProfileForReflection();
  const addressContext = getReflectionAddressContext(profile);
  const hasDisplayName = addressContext.hasDisplayName;
  const tone = getReflectionTonePreference(profile);
  if (!hasDisplayName && !tone) return cleanText;

  const separator = cleanText.includes("\n\n") ? "\n\n" : "\n";
  const blocks = cleanText.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  if (!blocks.length) return cleanText;

  if (hasDisplayName) {
    blocks.splice(0, blocks.length, ...blocks.map((line) => applyReflectionAddressTokens(line, addressContext)));
  }

  let addressUsed = false;
  if (hasDisplayName) {
    const rootKey = getSelectedReflectionRootKey(root);
    const addressPrefix = buildPersonalizedReflectionOpening(profile, { root });
    if (rootKey !== "auto" && addressPrefix && !blocks[0].startsWith(addressPrefix)) {
      blocks[0] = `${addressPrefix}${blocks[0]}`;
      addressUsed = true;
    } else if (rootKey === "auto") {
      const opening = buildPersonalizedReflectionOpening(profile, { root });
      if (blocks[0].startsWith("สวัสดีค่ะ")) {
        const greetingGap = addressContext.usesNeutralBody ? " " : "";
        blocks[0] = blocks[0].replace(/^สวัสดีค่ะ\s*/, `สวัสดีค่ะ${greetingGap}${addressContext.fullAddress} `);
      } else if (opening && !blocks.includes(opening)) {
        blocks.unshift(opening);
      }
      addressUsed = true;
    }
  }

  const closing = buildPersonalizedReflectionClosing(profile, { addressUsed });
  if (closing && !blocks.some((line) => line === closing)) {
    blocks.push(closing);
  }

  return dedupeReflectionLines(blocks).join(separator);
}

function saveUserIntentionProfile(profile) {
  const normalized = normalizeUserIntentionProfile({
    ...profile,
    updatedAt: new Date().toISOString()
  });
  const validation = validateUserIntentionProfile(normalized);
  if (!validation.ok) return { ok: false, errors: validation.errors, profile: normalized };
  try {
    localStorage.setItem(USER_INTENTION_PROFILE_KEY, JSON.stringify(normalized));
  } catch {
    return { ok: false, errors: ["ยังบันทึกใน browser นี้ไม่ได้ค่ะ"], profile: normalized };
  }
  return { ok: true, errors: [], profile: normalized };
}

function clearUserIntentionProfile() {
  try {
    localStorage.removeItem(USER_INTENTION_PROFILE_KEY);
  } catch {
    // Clearing the profile is best-effort and must never touch Daily_Log or app settings.
  }
}

function isValidBirthYear(value) {
  const year = Number(value);
  const currentYear = new Date().getFullYear();
  return Number.isInteger(year) && year >= currentYear - 110 && year <= currentYear;
}

function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function getDaysInMonth(year, month) {
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}

function isValidBirthDateParts(day, month, year) {
  if (!isValidBirthYear(year)) return false;
  const dayNumber = Number(day);
  const monthNumber = Number(month);
  const yearNumber = Number(year);
  if (!Number.isInteger(monthNumber) || monthNumber < 1 || monthNumber > 12) return false;
  if (!Number.isInteger(dayNumber) || dayNumber < 1) return false;
  return dayNumber <= getDaysInMonth(yearNumber, monthNumber);
}

function toIsoBirthDate(day, month, year) {
  const pad = (value) => String(value).padStart(2, "0");
  return `${year}-${pad(month)}-${pad(day)}`;
}

function isValidIsoDate(value) {
  const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return false;
  const [, year, month, day] = match;
  return isValidBirthDateParts(Number(day), Number(month), Number(year));
}

function readProfileForm() {
  setIntentionDateStatus("");
  const displayName = document.querySelector("#intentionDisplayName")?.value || "";
  const addressStyle = document.querySelector("#intentionAddressStyle")?.value || "senior_name";
  const birthDay = document.querySelector("#intentionBirthDay")?.value || "";
  const birthMonth = document.querySelector("#intentionBirthMonth")?.value || "";
  const birthYear = document.querySelector("#intentionBirthYear")?.value || "";
  const preferredTone = document.querySelector("#intentionPreferredTone")?.value || "";
  const errors = [];
  let normalizedBirthDate = "";
  let normalizedBirthYear = "";

  if (birthDay && birthMonth && birthYear) {
    if (isValidBirthDateParts(Number(birthDay), Number(birthMonth), Number(birthYear))) {
      normalizedBirthDate = toIsoBirthDate(birthDay, birthMonth, birthYear);
    } else {
      errors.push("วันที่ที่เลือกยังไม่ตรงกับปฏิทินค่ะ ลองตรวจวัน เดือน ปีอีกครั้งนะคะ");
    }
  } else if (!birthDay && !birthMonth && birthYear && isValidBirthYear(birthYear)) {
    normalizedBirthYear = String(birthYear);
  }

  return {
    profile: normalizeUserIntentionProfile({
      displayName,
      addressStyle,
      birthDate: normalizedBirthDate,
      birthYear: normalizedBirthYear,
      preferredTone,
      userContextNote: document.querySelector("#intentionContextNote")?.value || "",
      doNotAssumeNote: document.querySelector("#intentionDoNotAssume")?.value || "",
      updatedAt: ""
    }),
    errors
  };
}

function setIntentionDateStatus(message = "") {
  const status = document.querySelector("#intentionDateStatus");
  if (status) status.textContent = message;
}

function writeProfileForm(profile = getDefaultUserIntentionProfile()) {
  const normalized = normalizeUserIntentionProfile(profile);
  const setValue = (selector, value) => {
    const field = document.querySelector(selector);
    if (field) field.value = value;
  };
  setValue("#intentionDisplayName", normalized.displayName);
  setValue("#intentionAddressStyle", normalized.addressStyle);
  setValue("#intentionPreferredTone", normalized.preferredTone);
  setValue("#intentionContextNote", normalized.userContextNote);
  setValue("#intentionDoNotAssume", normalized.doNotAssumeNote);

  const birthParts = normalized.birthDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  setValue("#intentionBirthDay", birthParts ? String(Number(birthParts[3])) : "");
  setValue("#intentionBirthMonth", birthParts ? String(Number(birthParts[2])) : "");
  setValue("#intentionBirthYear", birthParts ? birthParts[1] : normalized.birthYear);
  updateProfilePreview();
  renderTodayHydrationWelcome();
}

function updateProfilePreview() {
  renderIntentionProfileScaffold();
}

function saveUserIntentionProfileFromForm() {
  const status = document.querySelector("#intentionProfileStatus");
  const { profile, errors } = readProfileForm();
  if (errors.length) {
    setIntentionDateStatus(errors[0]);
    if (status) status.textContent = errors[0];
    return;
  }
  const result = saveUserIntentionProfile(profile);
  if (!result.ok) {
    if (status) status.textContent = result.errors[0] || "ยังบันทึกข้อมูลนี้ไม่ได้ค่ะ";
    return;
  }
  writeProfileForm(result.profile);
  setIntentionDateStatus("");
  if (status) status.textContent = "บันทึกข้อมูลที่พี่เลือกให้ระบบรู้จักไว้ใน browser นี้แล้วค่ะ";
}

function loadUserIntentionProfileIntoForm({ showMalformedNotice = false } = {}) {
  const result = readStoredUserIntentionProfile();
  writeProfileForm(result.profile);
  if (showMalformedNotice && result.malformed) {
    const status = document.querySelector("#intentionProfileStatus");
    if (status) status.textContent = "ข้อมูลเดิมอ่านไม่ได้ครบค่ะ หนูเลยเปิดหน้าแบบว่างให้ก่อน โดยยังไม่ลบข้อมูลอื่นของพี่";
  }
}

function clearSavedUserIntentionProfileFromForm() {
  if (!confirm("ล้างเฉพาะข้อมูลที่ใช้ทำความรู้จักกันใน browser นี้ไหม? Daily Log และ Reflection จะไม่ถูกลบค่ะ")) return;
  clearUserIntentionProfile();
  writeProfileForm(getDefaultUserIntentionProfile());
  setIntentionDateStatus("");
  const status = document.querySelector("#intentionProfileStatus");
  if (status) status.textContent = "ล้างเฉพาะข้อมูลที่ใช้ทำความรู้จักกันแล้วค่ะ Daily Log และ Reflection ยังอยู่เหมือนเดิม";
}

function renderIntentionBirthPickerOptions() {
  const daySelect = document.querySelector("#intentionBirthDay");
  const monthSelect = document.querySelector("#intentionBirthMonth");
  const yearSelect = document.querySelector("#intentionBirthYear");
  if (!daySelect || !monthSelect || !yearSelect) return;

  const currentValues = {
    day: daySelect.value,
    month: monthSelect.value,
    year: yearSelect.value
  };
  const option = (value, label) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`;

  daySelect.innerHTML = option("", "วัน · ไม่ระบุ") + Array.from({ length: 31 }, (_, index) => option(String(index + 1), String(index + 1))).join("");
  monthSelect.innerHTML = option("", "เดือน · ไม่ระบุ") + Array.from({ length: 12 }, (_, index) => option(String(index + 1), String(index + 1))).join("");
  yearSelect.innerHTML = option("", "ปี · ไม่ระบุ") + Array.from({ length: 110 }, (_, index) => {
    const year = new Date().getFullYear() - index;
    return option(String(year), String(year));
  }).join("");

  daySelect.value = currentValues.day;
  monthSelect.value = currentValues.month;
  yearSelect.value = currentValues.year;
}

function renderIntentionProfileScaffold() {
  const addressStyle = document.querySelector("#intentionAddressStyle");
  const preview = document.querySelector("#intentionAddressPreview");
  if (!addressStyle || !preview) return;

  renderIntentionBirthPickerOptions();
  preview.textContent = getIntentionProfileAddressPreview();
}

function clearIntentionProfileScaffold() {
  document.querySelector(".intention-profile-view")?.querySelectorAll("input, textarea, select").forEach((field) => {
    if (field.id === "intentionAddressStyle") {
      field.value = "senior_name";
      return;
    }
    field.value = "";
  });
  renderIntentionProfileScaffold();
  const status = document.querySelector("#intentionProfileStatus");
  if (status) status.textContent = "ล้างเฉพาะค่าที่กรอกในหน้านี้แล้ว ยังไม่ได้แตะข้อมูลที่บันทึกไว้ค่ะ";
}

function openIntentionProfileScaffold() {
  hideWelcome();
  setActiveView("intention-profile");
}

function getReflectionRootOptionLabel(root) {
  const key = REFLECTION_ROOT_OPTION_LABEL_KEYS[root];
  return key ? t(key) : getReflectionRootLabel(root, currentLanguage);
}

function getReflectionRootPreviewCopy(root) {
  const key = REFLECTION_ROOT_PREVIEW_KEYS[root] || REFLECTION_ROOT_PREVIEW_KEYS.auto;
  return t(key);
}

function getReflectionRootBoundaryCopy(root) {
  if (root === "mind_state") return t("reflectionRootBoundaryMind");
  if (root === "practice_context") return t("reflectionRootBoundaryPractice");
  if (root === "drinks_caffeine_sweetness") return t("reflectionRootBoundaryDrinks");
  return t("reflectionRootBoundaryDefault");
}

function getSelectedReflectionRootKey(root = selectedReflectionRoot) {
  return isSupportedReflectionRoot(root) ? normalizeReflectionRoot(root) : "auto";
}

function getRootAwareReflectionOpening(root) {
  const rootKey = getSelectedReflectionRootKey(root);
  const openingKey = REFLECTION_ROOT_OPENING_KEYS[rootKey];
  return openingKey ? t(openingKey) : "";
}

function hasRootSpecificReflectionData(root, signals = buildSignals()) {
  const rootKey = getSelectedReflectionRootKey(root);
  if (rootKey === "hydration") return Number(signals.hydration?.waterMl || 0) > 0;
  if (rootKey === "sleep_recovery") return Boolean(signals.sleepDetail?.hasHours || appState.selectedState.sleep);
  if (rootKey === "load_activity") return Boolean((signals.recoveryLoad?.activities || []).length || Number(signals.recoveryLoad?.loadScore || 0) > 0);
  if (rootKey === "drinks_caffeine_sweetness") return Boolean((signals.drinkLoad?.profiles || []).length || signals.drinkLoad?.hasCaffeine || signals.drinkLoad?.sweetDrinksCount);
  if (rootKey === "mind_state") return Boolean((signals.mindNote?.text || "").trim() || signals.mindNote?.mind || signals.mindNote?.feeling || signals.mindNote?.support);
  if (rootKey === "practice_context") return buildTodayPracticeContext(appState).hasPracticeEvidence;
  return false;
}

function getRootAwareSupportingHint(root, signals = buildSignals()) {
  const rootKey = getSelectedReflectionRootKey(root);
  if (rootKey === "auto") return "";
  if (!hasRootSpecificReflectionData(rootKey, signals)) return t("reflectionRootHintThin");
  const hintKey = REFLECTION_ROOT_HINT_KEYS[rootKey];
  return hintKey ? t(hintKey) : "";
}

function getRootReflectionAttentionPolicy(root) {
  const rootKey = getSelectedReflectionRootKey(root);
  const policy = REFLECTION_ROOT_ATTENTION_POLICY[rootKey] || REFLECTION_ROOT_ATTENTION_POLICY.auto;
  return {
    emphasize: [...(policy.emphasize || [])],
    context: [...(policy.context || [])],
    reduce: [...(policy.reduce || [])]
  };
}

function formatRootWaterValue(signals) {
  const water = Number(signals.hydration?.waterMl || 0);
  return water > 0 ? `${formatNumberForLocale(water)} ml` : "";
}

function getRootLoadContextLabel(signals) {
  if (signals.recoveryLoad?.high) {
    if (currentLanguage === "en") return "a high-load day";
    if (currentLanguage === "zh") return "今天的负荷偏高";
    return "load ของวันค่อนข้างสูง";
  }
  if (signals.recoveryLoad?.medium) {
    if (currentLanguage === "en") return "a steady-load day";
    if (currentLanguage === "zh") return "今天有一定负荷";
    return "มี load ของวันอยู่พอสมควร";
  }
  if ((signals.recoveryLoad?.activities || []).length) {
    if (currentLanguage === "en") return "some activity context";
    if (currentLanguage === "zh") return "有一些活动背景";
    return "มีบริบทกิจกรรมอยู่บ้าง";
  }
  return "";
}

function getRootDrinkContextLabel(signals) {
  const hasCaffeine = Boolean(signals.drinkLoad?.hasCaffeine || signals.drinkLoad?.caffeineHigh);
  const hasSweetness = Boolean(signals.drinkLoad?.sweetDrinksCount || signals.drinkLoad?.sugarHigh);
  if (hasCaffeine && hasSweetness) {
    if (currentLanguage === "en") return "caffeine and sweetness";
    if (currentLanguage === "zh") return "咖啡因和甜度";
    return "คาเฟอีนและบริบทความหวาน";
  }
  if (hasCaffeine) {
    if (currentLanguage === "en") return "caffeine";
    if (currentLanguage === "zh") return "咖啡因";
    return "คาเฟอีน";
  }
  if (hasSweetness) {
    if (currentLanguage === "en") return "sweetness context";
    if (currentLanguage === "zh") return "甜度背景";
    return "บริบทความหวาน";
  }
  return "";
}

function getRootSleepContextLabel(signals) {
  if (signals.sleepDetail?.hasHours) {
    const hours = `${formatNumberForLocale(signals.sleepDetail.hours)} ${currentLanguage === "en" ? "hours" : currentLanguage === "zh" ? "小时" : "ชั่วโมง"}`;
    if (currentLanguage === "en") return `sleep was about ${hours}`;
    if (currentLanguage === "zh") return `睡眠约 ${hours}`;
    return `นอนประมาณ ${hours}`;
  }
  if (signals.energySleep?.sleepLow || signals.sleepDetail?.low) {
    if (currentLanguage === "en") return "sleep/recovery looked thin";
    if (currentLanguage === "zh") return "睡眠/恢复有些薄";
    return "sleep/recovery ยังบาง";
  }
  return "";
}

function getRootPracticeContextLabel() {
  const practiceContext = buildPracticeContextObject();
  const hasMinutes = normalizePracticeMinutes(appState.practiceMinutes) !== "";
  const note = String(appState.practiceNote || "").trim();
  if (note) return truncateText(note, 64);
  if (hasMinutes && practiceContext?.minutes !== "") {
    if (currentLanguage === "en") return `about ${formatNumberForLocale(practiceContext.minutes)} practice minutes`;
    if (currentLanguage === "zh") return `约 ${formatNumberForLocale(practiceContext.minutes)} 分钟练习`;
    return `ภาวนาประมาณ ${formatNumberForLocale(practiceContext.minutes)} นาที`;
  }
  if (practiceContext?.root || practiceContext?.type) {
    if (currentLanguage === "en") return "a recorded practice context";
    if (currentLanguage === "zh") return "有一段练习背景";
    return "มีบริบทการภาวนาที่บันทึกไว้";
  }
  return "";
}

function formatRootDetailQuote(value) {
  const text = String(value || "").trim();
  return text ? `“${text}”` : "";
}

function getRootActivityDetailLabels(limit = 2) {
  return (appState.activities || [])
    .map((activity) => {
      const option = getActivityOptionByValue(activity);
      return option ? t(`options.activities.${option.key}`) : String(activity || "").trim();
    })
    .filter(Boolean)
    .slice(0, limit);
}

function getRootDrinkDetailLabels(limit = 2) {
  return (appState.drinkProfiles || [])
    .map(normalizeDrinkProfile)
    .map((profile) => {
      const meta = getDrinkMetaByType(profile.type);
      return t(`options.drinks.${meta?.key || "other"}`);
    })
    .filter(Boolean)
    .slice(0, limit);
}

function getRootCaffeinatedDrinkLabels(limit = 2) {
  return (appState.drinkProfiles || [])
    .map(normalizeDrinkProfile)
    .filter((profile) => profile.caffeine && profile.caffeine !== "none")
    .map((profile) => {
      const meta = getDrinkMetaByType(profile.type);
      return t(`options.drinks.${meta?.key || "other"}`);
    })
    .filter(Boolean)
    .slice(0, limit);
}

function getRootSweetDrinkLabels(limit = 2) {
  return (appState.drinkProfiles || [])
    .map(normalizeDrinkProfile)
    .filter((profile) => (sweetnessScores[profile.sweetness] || 0) >= 2)
    .map((profile) => {
      const meta = getDrinkMetaByType(profile.type);
      return t(`options.drinks.${meta?.key || "other"}`);
    })
    .filter(Boolean)
    .slice(0, limit);
}

function formatRootDetailList(items = []) {
  return joinListNaturally(items.map(formatRootDetailQuote).filter(Boolean));
}

function buildRootSpecificDetailAnchors(root, signals = buildSignals()) {
  const rootKey = getSelectedReflectionRootKey(root);
  const builders = {
    hydration: buildHydrationDetailAnchors,
    sleep_recovery: buildSleepDetailAnchors,
    load_activity: buildLoadDetailAnchors,
    drinks_caffeine_sweetness: buildDrinksDetailAnchors,
    mind_state: buildMindDetailAnchors,
    practice_context: buildPracticeDetailAnchors
  };
  const builder = builders[rootKey];
  return builder ? builder(signals).filter(Boolean).slice(0, 2) : [];
}

function buildHydrationDetailAnchors(signals) {
  const water = formatRootWaterValue(signals);
  const anchors = [];
  if (water) {
    if (currentLanguage === "en") {
      anchors.push(`Water today was about ${water}${signals.hydration?.low || signals.hydration?.rising ? ", still gently returning to base." : ", giving the day a steadier base."}`);
    } else if (currentLanguage === "zh") {
      anchors.push(`今天饮水约 ${water}${signals.hydration?.low || signals.hydration?.rising ? "，还在慢慢回到基础。" : "，可以作为今天比较稳定的基础。"}`);
    } else {
      anchors.push(`วันนี้น้ำประมาณ ${water}${signals.hydration?.low || signals.hydration?.rising ? " และยังค่อย ๆ กลับฐานอยู่" : " และพอเป็นฐานให้ประคองวันได้"}`);
    }
  }
  const caffeineLabels = getRootCaffeinatedDrinkLabels(1);
  const activityLabels = getRootActivityDetailLabels(1);
  if (caffeineLabels.length) {
    if (currentLanguage === "en") anchors.push(`There is caffeine context from ${formatRootDetailList(caffeineLabels)} beside the water signal.`);
    else if (currentLanguage === "zh") anchors.push(`${formatRootDetailList(caffeineLabels)}带来一些咖啡因背景，放在饮水信号旁边看。`);
    else anchors.push(`มีคาเฟอีนจาก${formatRootDetailList(caffeineLabels)}อยู่ข้างสัญญาณน้ำด้วยค่ะ`);
  } else if (activityLabels.length) {
    if (currentLanguage === "en") anchors.push(`${formatRootDetailList(activityLabels)} is the activity context around hydration today.`);
    else if (currentLanguage === "zh") anchors.push(`${formatRootDetailList(activityLabels)}是今天饮水旁边的活动背景。`);
    else anchors.push(`${formatRootDetailList(activityLabels)}เป็นบริบทกิจกรรมที่อยู่ข้างน้ำวันนี้`);
  }
  return anchors.length ? anchors : [getRootAwareSupportingHint("hydration", signals)];
}

function buildSleepDetailAnchors(signals) {
  const anchors = [];
  const sleepContext = getRootSleepContextLabel(signals);
  if (sleepContext) {
    if (currentLanguage === "en") anchors.push(`The saved sleep detail says ${sleepContext}.`);
    else if (currentLanguage === "zh") anchors.push(`已记录的睡眠细节是：${sleepContext}。`);
    else anchors.push(`ข้อมูลที่บันทึกไว้บอกว่า${sleepContext}`);
  }
  const caffeineLabels = getRootCaffeinatedDrinkLabels(1);
  const loadContext = getRootLoadContextLabel(signals);
  if (caffeineLabels.length) {
    if (currentLanguage === "en") anchors.push(`${formatRootDetailList(caffeineLabels)} gives the day a caffeine context, held beside recovery.`);
    else if (currentLanguage === "zh") anchors.push(`${formatRootDetailList(caffeineLabels)}给今天带来咖啡因背景，放在恢复旁边看。`);
    else anchors.push(`${formatRootDetailList(caffeineLabels)}เป็นบริบทคาเฟอีนที่วางข้างการพักวันนี้`);
  } else if (loadContext) {
    if (currentLanguage === "en") anchors.push(`The day also has ${loadContext}, so recovery is read with that load nearby.`);
    else if (currentLanguage === "zh") anchors.push(`今天也有${loadContext}，所以恢复会放在这个负荷旁边读。`);
    else anchors.push(`วันนี้${loadContext} จึงอ่านการพักโดยมี load นี้อยู่ข้าง ๆ`);
  }
  return anchors.length ? anchors : [getRootAwareSupportingHint("sleep_recovery", signals)];
}

function buildLoadDetailAnchors(signals) {
  const anchors = [];
  const activityLabels = getRootActivityDetailLabels(2);
  const loadScore = Number(signals.recoveryLoad?.loadScore || 0);
  const loadLevel = localizeLoadLevel(appState.loadLevel || getLoadLevel(loadScore));
  if (activityLabels.length) {
    if (currentLanguage === "en") anchors.push(`Today has ${formatRootDetailList(activityLabels)} as the visible activity/load context.`);
    else if (currentLanguage === "zh") anchors.push(`今天可见的活动/负荷背景是${formatRootDetailList(activityLabels)}。`);
    else anchors.push(`วันนี้มี${formatRootDetailList(activityLabels)}เป็น load ของวัน`);
  } else if (loadScore > 0 || loadLevel) {
    if (currentLanguage === "en") anchors.push(`The saved load level is ${loadLevel}.`);
    else if (currentLanguage === "zh") anchors.push(`已记录的负荷层级是 ${loadLevel}。`);
    else anchors.push(`ข้อมูล load วันนี้อยู่ที่ ${loadLevel}`);
  }
  const sleepContext = getRootSleepContextLabel(signals);
  const water = formatRootWaterValue(signals);
  if (sleepContext) {
    if (currentLanguage === "en") anchors.push(`Placed beside ${sleepContext}, this load asks to be read with recovery nearby.`);
    else if (currentLanguage === "zh") anchors.push(`放在${sleepContext}旁边看，这个负荷适合和恢复一起读。`);
    else anchors.push(`เมื่อวางคู่กับ${sleepContext} หนูอ่าน load นี้พร้อมพื้นที่ recovery ค่ะ`);
  } else if (water) {
    if (currentLanguage === "en") anchors.push(`Water is about ${water}, so it stays as support context around the load.`);
    else if (currentLanguage === "zh") anchors.push(`饮水约 ${water}，作为负荷周围的支持背景。`);
    else anchors.push(`น้ำประมาณ ${water} อยู่เป็นบริบทพยุงรอบ load นี้`);
  }
  return anchors.length ? anchors : [getRootAwareSupportingHint("load_activity", signals)];
}

function buildDrinksDetailAnchors(signals) {
  const anchors = [];
  const drinkLabels = getRootDrinkDetailLabels(2);
  const caffeineLabels = getRootCaffeinatedDrinkLabels(2);
  const sweetLabels = getRootSweetDrinkLabels(2);
  if (caffeineLabels.length) {
    if (currentLanguage === "en") anchors.push(`Caffeine appears through ${formatRootDetailList(caffeineLabels)} in today's drink context.`);
    else if (currentLanguage === "zh") anchors.push(`今天的咖啡因背景来自${formatRootDetailList(caffeineLabels)}。`);
    else anchors.push(`วันนี้มีคาเฟอีนจาก${formatRootDetailList(caffeineLabels)}เป็นส่วนหนึ่งของบริบท`);
  } else if (drinkLabels.length) {
    if (currentLanguage === "en") anchors.push(`Today's drink context includes ${formatRootDetailList(drinkLabels)}.`);
    else if (currentLanguage === "zh") anchors.push(`今天的饮品背景包括${formatRootDetailList(drinkLabels)}。`);
    else anchors.push(`บริบทเครื่องดื่มวันนี้มี${formatRootDetailList(drinkLabels)}`);
  }
  if (sweetLabels.length) {
    if (currentLanguage === "en") anchors.push(`${formatRootDetailList(sweetLabels)} carries visible sweetness context in the saved data.`);
    else if (currentLanguage === "zh") anchors.push(`${formatRootDetailList(sweetLabels)}在记录中带有甜度背景。`);
    else anchors.push(`${formatRootDetailList(sweetLabels)}มีบริบทความหวานอยู่ในข้อมูลที่บันทึกไว้`);
  } else {
    const water = formatRootWaterValue(signals);
    if (water) {
      if (currentLanguage === "en") anchors.push(`Water is about ${water}, so it can remain the base around these drinks.`);
      else if (currentLanguage === "zh") anchors.push(`饮水约 ${water}，可以继续作为这些饮品旁边的基础。`);
      else anchors.push(`น้ำประมาณ ${water} ยังกลับมาเป็นฐานข้างเครื่องดื่มเหล่านี้ได้ค่ะ`);
    }
  }
  return anchors.length ? anchors : [getRootAwareSupportingHint("drinks_caffeine_sweetness", signals)];
}

function buildMindDetailAnchors(signals) {
  const anchors = [];
  const note = truncateText(signals.mindNote?.text || "", 90);
  if (note) {
    if (currentLanguage === "en") anchors.push(`Mind Note today says ${formatRootDetailQuote(note)}.`);
    else if (currentLanguage === "zh") anchors.push(`今天的 Mind Note 是${formatRootDetailQuote(note)}。`);
    else anchors.push(`Mind Note ที่พี่วางไว้วันนี้คือ ${formatRootDetailQuote(note)}`);
  } else if (signals.mindNote?.mind) {
    if (currentLanguage === "en") anchors.push(`The selected mind state is ${localizeStateValue("Mind", signals.mindNote.mind)}.`);
    else if (currentLanguage === "zh") anchors.push(`今天选择的心的状态是 ${localizeStateValue("Mind", signals.mindNote.mind)}。`);
    else anchors.push(`วันนี้ state ใจที่เลือกไว้คือ ${localizeStateValue("Mind", signals.mindNote.mind)}`);
  }
  if (signals.mindNote?.support) {
    const support = localizeMindNoteValue("Mind_Note_Support", signals.mindNote.support);
    if (currentLanguage === "en") anchors.push(`The selected support cue is ${support}.`);
    else if (currentLanguage === "zh") anchors.push(`已选择的支持提示是 ${support}。`);
    else anchors.push(`support need วันนี้อยู่ที่ ${support}`);
  } else {
    const loadContext = getRootLoadContextLabel(signals);
    if (loadContext) {
      if (currentLanguage === "en") anchors.push(`${loadContext} stays as background around the mind note.`);
      else if (currentLanguage === "zh") anchors.push(`${loadContext}先留在心的背景周围。`);
      else anchors.push(`${loadContext}อยู่เป็นฉากรอบ ๆ บริบทใจ`);
    }
  }
  return anchors.length ? anchors : [getRootAwareSupportingHint("mind_state", signals)];
}

function buildPracticeDetailAnchors() {
  const todayPractice = buildTodayPracticeContext(appState);
  if (!todayPractice.hasPracticeEvidence) return [];

  const anchors = [];
  const typeLabel = todayPractice.practiceType && todayPractice.practiceType !== "none"
    ? t(`options.practiceTypes.${todayPractice.practiceType}`)
    : "";
  const minutes = todayPractice.hasPracticeMinutes
    ? formatNumberForLocale(todayPractice.practiceMinutes)
    : "";
  const note = truncateText(todayPractice.practiceNote, 90);
  if (typeLabel || minutes) {
    if (currentLanguage === "en") anchors.push(`Practice context today includes ${typeLabel || "practice"}${minutes ? ` for about ${minutes} minutes` : ""}.`);
    else if (currentLanguage === "zh") anchors.push(`今天的练习背景包括 ${typeLabel || "练习"}${minutes ? `，约 ${minutes} 分钟` : ""}。`);
    else anchors.push(`วันนี้มี${typeLabel || "การภาวนา"}${minutes ? `ประมาณ ${minutes} นาที` : ""}เป็นบริบทของวัน`);
  }
  if (note) {
    if (currentLanguage === "en") anchors.push(`The practice note says ${formatRootDetailQuote(note)}.`);
    else if (currentLanguage === "zh") anchors.push(`Practice note 是${formatRootDetailQuote(note)}。`);
    else anchors.push(`สิ่งที่พี่บันทึกไว้ใน practice note คือ ${formatRootDetailQuote(note)}`);
  }
  return anchors.slice(0, 2);
}

function buildRootAwareReflectionSegments(root, signals = buildSignals()) {
  const rootKey = getSelectedReflectionRootKey(root);
  const opening = getRootAwareReflectionOpening(rootKey);
  const builders = {
    hydration: buildHydrationRootReflectionSegments,
    sleep_recovery: buildSleepRootReflectionSegments,
    load_activity: buildLoadRootReflectionSegments,
    drinks_caffeine_sweetness: buildDrinksRootReflectionSegments,
    mind_state: buildMindRootReflectionSegments,
    practice_context: buildPracticeRootReflectionSegments
  };
  const builder = builders[rootKey];
  if (!builder) return [];
  return dedupeReflectionLines([opening, ...builder(signals)]);
}

function buildHydrationRootReflectionSegments(signals) {
  const detailAnchors = buildRootSpecificDetailAnchors("hydration", signals);
  const loadContext = getRootLoadContextLabel(signals);
  const drinkContext = getRootDrinkContextLabel(signals);
  const contexts = [loadContext, drinkContext].filter(Boolean);

  if (currentLanguage === "en") {
    const contextLine = contexts.length
      ? `Placed beside ${joinListNaturally(contexts)}, this reads more like returning to a basic care rhythm than rushing to compensate.`
      : "This reads as a simple care base rather than a large conclusion.";
    return [...detailAnchors, contextLine, "For the next loop, letting water and short pauses come back in gently is enough."];
  }

  if (currentLanguage === "zh") {
    const contextLine = contexts.length
      ? `放在${joinListNaturally(contexts)}旁边看，它更像是回到基础照顾的节奏，而不是急着补偿。`
      : "这里更像是一个基础照顾的提示，不是大的结论。";
    return [...detailAnchors, contextLine, "下一小段，让饮水和短暂停顿轻轻回到节奏里就好。"];
  }

  const contextLine = contexts.length
    ? `เมื่อวางคู่กับ${joinListNaturally(contexts)} หนูอ่านเป็นจังหวะกลับมาดูแลพื้นฐาน มากกว่าการเร่งชดเชยทันที`
    : "หนูอ่านเป็นฐานดูแลตัวเองเล็ก ๆ มากกว่าข้อสรุปใหญ่ของวัน";
  return [...detailAnchors, contextLine, "รอบถัดไปแค่ค่อย ๆ ปิด loop ด้วยน้ำและพักเป็นช่วง ๆ ก็พอค่ะ"];
}

function buildSleepRootReflectionSegments(signals) {
  const detailAnchors = buildRootSpecificDetailAnchors("sleep_recovery", signals);
  const loadContext = getRootLoadContextLabel(signals);
  const drinkContext = getRootDrinkContextLabel(signals);
  const contexts = [loadContext, drinkContext].filter(Boolean);

  if (currentLanguage === "en") {
    const contextLine = contexts.length
      ? `${joinListNaturally(contexts)} stays as surrounding context, not as proof.`
      : "Other signals stay in the background instead of taking over the reading.";
    return [...detailAnchors, contextLine, "If the body still feels underfilled, recovery can lead the next rhythm before adding more."];
  }

  if (currentLanguage === "zh") {
    const contextLine = contexts.length
      ? `${joinListNaturally(contexts)}只是周围背景，不读成原因。`
      : "其他信号先留在背景里，不抢走这个主轴。";
    return [...detailAnchors, contextLine, "如果身体还没满，下一段先让恢复走在前面就好。"];
  }

  const contextLine = contexts.length
    ? `${joinListNaturally(contexts)}เป็นเพียงบริบทที่อยู่รอบการพัก ไม่ใช่เหตุและผลค่ะ`
    : "สัญญาณอื่นขออยู่เป็นฉากหลัง เพื่อให้การพักมีพื้นที่ในรอบนี้ค่ะ";
  return [...detailAnchors, contextLine, "ถ้าร่างกายยังไม่เต็ม รอบถัดไปให้ recovery เดินนำหนึ่งจังหวะก่อนก็พอค่ะ"];
}

function buildLoadRootReflectionSegments(signals) {
  const detailAnchors = buildRootSpecificDetailAnchors("load_activity", signals);

  if (currentLanguage === "en") {
    return [...detailAnchors, "The question is not whether the day performed well, but whether recovery has room to follow."];
  }

  if (currentLanguage === "zh") {
    return [...detailAnchors, "重点不是表现好不好，而是恢复有没有空间跟上。"];
  }

  return [...detailAnchors, "ภาพรวมไม่ใช่เรื่อง performance ดีหรือไม่ดี แต่เป็นการดูว่า recovery มีพื้นที่ตามจังหวะที่ใช้แรงไปไหม"];
}

function buildDrinksRootReflectionSegments(signals) {
  const detailAnchors = buildRootSpecificDetailAnchors("drinks_caffeine_sweetness", signals);
  const loadContext = getRootLoadContextLabel(signals);
  const sleepContext = getRootSleepContextLabel(signals);
  const water = formatRootWaterValue(signals);
  const contexts = [loadContext, sleepContext, water ? (currentLanguage === "en" ? `${water} water` : currentLanguage === "zh" ? `${water} 饮水` : `น้ำ ${water}`) : ""].filter(Boolean);

  if (currentLanguage === "en") {
    const contextLine = contexts.length
      ? `Placed beside ${joinListNaturally(contexts)}, drinks read as rhythm information rather than something to judge.`
      : "Drinks read here as rhythm information, not something to judge or correct immediately.";
    return [...detailAnchors, contextLine, "Letting the next cup or next pause bring plain water back as a base is enough."];
  }

  if (currentLanguage === "zh") {
    const contextLine = contexts.length
      ? `放在${joinListNaturally(contexts)}旁边看，饮品更像节奏资料，不是用来评价的东西。`
      : "这里把饮品读作一天的节奏资料，不急着评价或修正。";
    return [...detailAnchors, contextLine, "下一杯或下一小段让清水慢慢回到基础就好。"];
  }

  const contextLine = contexts.length
    ? `เมื่อวางข้าง${joinListNaturally(contexts)} หนูอ่านเครื่องดื่มเป็นข้อมูลของจังหวะวัน ไม่ใช่เรื่องให้ดุหรือรีบแก้ทันที`
    : "หนูอ่านเครื่องดื่มเป็นข้อมูลของจังหวะวัน ไม่ใช่เรื่องให้ดุหรือรีบแก้ทันที";
  return [...detailAnchors, contextLine, "แค่ให้แก้วถัดไปหรือช่วงถัดไปพาน้ำเปล่ากลับมาเป็นฐาน ก็พอค่ะ"];
}

function buildMindRootReflectionSegments(signals) {
  const detailAnchors = buildRootSpecificDetailAnchors("mind_state", signals);
  const loadContext = getRootLoadContextLabel(signals);
  const sleepContext = getRootSleepContextLabel(signals);
  const contexts = [loadContext, sleepContext, getRootPracticeContextLabel()].filter(Boolean);

  if (currentLanguage === "en") {
    const contextLine = contexts.length && detailAnchors.length < 2
      ? `${joinListNaturally(contexts)} stays as surrounding context, not the main meaning.`
      : "";
    return [...detailAnchors, contextLine, "The final meaning still belongs to you. NuTuenSai is only holding a small light beside it."];
  }

  if (currentLanguage === "zh") {
    const contextLine = contexts.length && detailAnchors.length < 2
      ? `${joinListNaturally(contexts)}只是周围背景，不是主要意义。`
      : "";
    return [...detailAnchors, contextLine, "最后的意义仍然属于你。NuTuenSai 只是轻轻帮你照亮这一块。"];
  }

  const contextLine = contexts.length && detailAnchors.length < 2
    ? `${joinListNaturally(contexts)}เป็นเพียงฉากรอบ ๆ ไม่ใช่ความหมายหลักค่ะ`
    : "";
  return [...detailAnchors, contextLine, "ความหมายสุดท้ายยังอยู่กับพี่นะคะ หนูแค่ช่วยถือไฟฉายเบา ๆ ให้เห็นพื้นที่นั้นชัดขึ้น"];
}

function buildPracticeRootReflectionSegments(signals) {
  const todayPractice = buildTodayPracticeContext(appState);
  const detailAnchors = buildRootSpecificDetailAnchors("practice_context", signals);
  const mindContext = signals.mindNote?.mind || signals.mindNote?.text
    ? (currentLanguage === "en" ? "mind context" : currentLanguage === "zh" ? "心的背景" : "บริบทใจ")
    : "";
  const sleepContext = getRootSleepContextLabel(signals);
  const loadContext = getRootLoadContextLabel(signals);
  const contextLabel = [mindContext, sleepContext, loadContext].find(Boolean) || "";

  if (!todayPractice.hasPracticeEvidence) {
    if (currentLanguage === "en") {
      return [
        "I do not see practice data recorded for today, so I will not define the day for you.",
        "If you would like to return, a short moment when you are ready is enough; it does not need to be complete."
      ];
    }
    if (currentLanguage === "zh") {
      return [
        "今天还没有看到练习记录，所以不替你定义今天是什么样子。",
        "如果想回来看看，准备好时从一小段开始就好，不需要做到完整。"
      ];
    }
    return [
      "วันนี้หนูยังไม่เห็นข้อมูลการภาวนาที่บันทึกไว้ จึงขอไม่สรุปแทนพี่นะคะ",
      "ถ้าพี่อยากกลับมา เมื่อพร้อมอาจเริ่มจากช่วงสั้น ๆ ที่พอวางลงได้ ไม่ต้องทำให้สมบูรณ์ค่ะ"
    ];
  }

  let meaningLine;
  if (todayPractice.practiceIntensityBand === "short") {
    if (currentLanguage === "en") meaningLine = "This short record is a small place to return to self-care today, not something to measure or increase.";
    else if (currentLanguage === "zh") meaningLine = "这段短短的记录，是今天回到自我照顾的一小块空间，不是需要衡量或增加的东西。";
    else meaningLine = "เวลาสั้น ๆ ที่พี่บันทึกไว้เป็นพื้นที่เล็ก ๆ ของการกลับมาดูแลใจในวันนี้ ไม่ใช่สิ่งที่เอาไปวัดหรือเร่งเพิ่มค่ะ";
  } else if (todayPractice.practiceIntensityBand === "longer") {
    if (currentLanguage === "en") meaningLine = "There is a recorded space for self-care today; it can stay light and steady rather than becoming a performance.";
    else if (currentLanguage === "zh") meaningLine = "今天记录里有一段自我照顾的空间，可以保持轻盈和稳定，不需要变成表现。";
    else meaningLine = "วันนี้มีพื้นที่ของการกลับมาดูแลใจที่บันทึกไว้ หนูขออ่านเป็นจังหวะที่ค่อย ๆ ดูแล ไม่ใช่ผลงานที่เอาไปวัดหรือเปรียบเทียบค่ะ";
  } else {
    if (currentLanguage === "en") meaningLine = "The practice recorded today can be held as a gentle self-care context, without judging its length or quality.";
    else if (currentLanguage === "zh") meaningLine = "今天记录的练习可以作为温和的自我照顾背景，不评价时长或质量。";
    else meaningLine = "การภาวนาที่บันทึกไว้วันนี้อยู่เป็นบริบทการดูแลใจได้ โดยไม่ต้องตัดสินระยะเวลาหรือคุณภาพค่ะ";
  }

  const contextLine = contextLabel
    ? currentLanguage === "en"
      ? `${contextLabel} can sit beside this practice as today's context, without turning either one into a conclusion.`
      : currentLanguage === "zh"
        ? `${contextLabel}可以放在练习旁边作为今天的背景，不把任何一项读成结论。`
        : `${contextLabel}อยู่ข้างการภาวนาเป็นบริบทของวันได้ โดยไม่เปลี่ยนสิ่งใดให้เป็นข้อสรุปค่ะ`
    : "";
  const closingLine = currentLanguage === "en"
    ? "When ready, returning gently is enough; the meaning of this practice remains yours."
    : currentLanguage === "zh"
      ? "准备好时，轻轻回来就好；这段练习的意义仍然属于你。"
      : "เมื่อพร้อมค่อยกลับมาอย่างเบา ๆ ก็พอค่ะ ความหมายของการภาวนายังเป็นของพี่เอง";

  return [...detailAnchors, meaningLine, contextLine, closingLine].filter(Boolean).slice(0, 5);
}

function normalizeReflectionLineForDedupe(line) {
  return String(line || "")
    .toLowerCase()
    .replace(/[“”"'.。,，、!！?？:：;；()[\]{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function dedupeReflectionLines(lines = []) {
  const seen = new Set();
  return lines
    .map((line) => String(line || "").trim())
    .filter(Boolean)
    .filter((line) => {
      const key = normalizeReflectionLineForDedupe(line);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function composeRootAwareReflection(baseReflection, root = selectedReflectionRoot, signals = buildSignals()) {
  const rootKey = getSelectedReflectionRootKey(root);
  const cleanBase = String(baseReflection || "").trim();
  if (rootKey === "auto") return cleanBase;

  const rootAwareBlocks = buildRootAwareReflectionSegments(rootKey, signals);
  if (!rootAwareBlocks.length) return cleanBase;

  return rootAwareBlocks.join("\n\n");
}

function getReflectionRootMetadata(root = selectedReflectionRoot, lang = currentLanguage) {
  const rootKey = getSelectedReflectionRootKey(root);
  const label = getReflectionRootLabel(rootKey, lang);
  return {
    root: rootKey,
    label,
    source: "manual_picker",
    declaration: rootKey === "auto"
      ? getReflectionRootPreviewCopy(rootKey)
      : getRootAwareReflectionOpening(rootKey)
  };
}

function setSelectedReflectionRoot(root) {
  const nextRoot = isSupportedReflectionRoot(root) ? root : "auto";
  selectedReflectionRoot = nextRoot;
  renderReflectionRootPicker();
}

function renderReflectionRootPicker() {
  const options = document.querySelector("#reflectionRootOptions");
  const preview = document.querySelector("#reflectionRootPreview");
  const previewTitle = document.querySelector("#reflectionRootPreviewTitle");
  const previewCopy = document.querySelector("#reflectionRootPreviewCopy");
  const boundary = document.querySelector("#reflectionRootBoundary");
  if (!options || !preview || !previewTitle || !previewCopy || !boundary) return;

  const activeRoot = isSupportedReflectionRoot(selectedReflectionRoot) ? selectedReflectionRoot : "auto";
  selectedReflectionRoot = activeRoot;

  options.innerHTML = REFLECTION_ROOT_OPTIONS.map((root) => {
    const isActive = root === activeRoot;
    return `
      <button
        type="button"
        class="reflection-root-option${isActive ? " active" : ""}"
        data-reflection-root="${escapeHtml(root)}"
        aria-pressed="${isActive ? "true" : "false"}"
      >
        ${escapeHtml(getReflectionRootOptionLabel(root))}
      </button>
    `;
  }).join("");

  const rootLabel = getReflectionRootLabel(activeRoot, currentLanguage);
  preview.dataset.reflectionRoot = activeRoot;
  previewTitle.textContent = t("reflectionRootSelectedLabel", { root: rootLabel });
  previewCopy.textContent = getReflectionRootPreviewCopy(activeRoot);
  boundary.textContent = getReflectionRootBoundaryCopy(activeRoot);
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
  if (saved) {
    try {
      const parsed = normalizeDraftState(JSON.parse(saved));
      if (hasMeaningfulCurrentFormDraft(parsed)) return parsed;
    } catch {
      // Fall through to today's saved Daily_Log row if the draft is malformed.
    }
  }

  if (!wasCurrentFormIntentionallyClearedToday()) {
    const todayRow = getTodayRawDailyLogRow();
    if (todayRow) {
      const restored = buildStateFromDailyLogRow(todayRow);
      localStorage.setItem(storageKey(), JSON.stringify(restored));
      return restored;
    }
  }

  return structuredClone(defaultState);
}

function getTodayRawDailyLogRow() {
  return getDailyLog().find((row) => normalizeExcelDate(row?.Date) === todayIso) || null;
}

function normalizeDraftState(state = {}) {
  const parsed = { ...structuredClone(defaultState), ...(state || {}), date: todayIso };
  parsed.drinkProfiles = Array.isArray(parsed.drinkProfiles) && parsed.drinkProfiles.length
    ? parsed.drinkProfiles.map(normalizeDrinkProfile)
    : legacyDrinksToProfiles(parsed.drinks || []);
  parsed.energyCauses = Array.isArray(parsed.energyCauses) ? parsed.energyCauses : [];
  parsed.activities = Array.isArray(parsed.activities) ? parsed.activities : [];
  parsed.selectedState = { ...structuredClone(defaultState.selectedState), ...(parsed.selectedState || {}) };
  parsed.selectedState.mind = normalizeMindStateValue(parsed.selectedState.mind);
  parsed.sleepHours = normalizeSleepHours(parsed.sleepHours);
  parsed.runDetail = normalizeRunDetail(parsed.runDetail);
  parsed.practiceRoot = normalizePracticeRoot(parsed.practiceRoot || practiceTypeToRoot[parsed.practiceType]);
  parsed.practiceType = normalizePracticeType(parsed.practiceType, parsed.practiceRoot);
  parsed.practiceMinutes = normalizePracticeMinutes(parsed.practiceMinutes);
  parsed.practiceNote = cleanRestoreTextValue(parsed.practiceNote || "");
  parsed.mindNoteText = cleanRestoreTextValue(parsed.mindNoteText || "");
  parsed.generatedReflection = cleanRestoreTextValue(parsed.generatedReflection || "");
  applyDerivedSleepFromHours(parsed);
  return parsed;
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
  const runDetailPanel = document.querySelector("#runDetailPanel");
  list.innerHTML = activityGroups.map((group) => {
    const activities = activityOptions.filter((activity) => activity.group === group && !activity.hiddenInUi);
    return `
      <div class="activity-group" data-activity-group="${escapeHtml(group)}">
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

  const sportsGroup = list.querySelector('[data-activity-group="sports"]');
  if (runDetailPanel && sportsGroup) {
    sportsGroup.after(runDetailPanel);
  }
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

function renderPracticeOptions() {
  const rootList = document.querySelector("#practiceRootList");
  if (rootList) {
    rootList.innerHTML = visiblePracticeGroups.map((group) => `
      <button type="button" class="practice-chip" data-practice-root="${escapeHtml(group.key)}">
        ${escapeHtml(t(`options.practiceRoots.${group.key}`))}
      </button>
    `).join("");
  }
  renderPracticeTypeOptions();
}

function renderPracticeTypeOptions() {
  const typeList = document.querySelector("#practiceTypeList");
  if (!typeList) return;
  const group = visiblePracticeGroups.find((entry) => entry.key === getVisiblePracticeRoot(appState.practiceRoot));
  if (!group) {
    typeList.innerHTML = `<p class="field-helper practice-empty-helper">${escapeHtml(t("practiceTypeEmpty"))}</p>`;
    return;
  }
  typeList.innerHTML = group.types.map((type) => `
    <button type="button" class="practice-chip" data-practice-type="${escapeHtml(type)}">
      ${escapeHtml(t(`options.practiceTypes.${type}`))}
    </button>
  `).join("");
}

function bindEvents() {
  document.querySelector("#beginWelcome").addEventListener("click", hideWelcome);
  document.querySelector("#openWelcome").addEventListener("click", () => showWelcome({ remember: false }));
  document.querySelector("#openIntentionProfile")?.addEventListener("click", openIntentionProfileScaffold);
  document.querySelector("#intentionDisplayName")?.addEventListener("input", renderIntentionProfileScaffold);
  document.querySelector("#intentionAddressStyle")?.addEventListener("change", renderIntentionProfileScaffold);
  document.querySelector("#saveIntentionProfile")?.addEventListener("click", saveUserIntentionProfileFromForm);
  document.querySelector("#skipIntentionProfile")?.addEventListener("click", () => setActiveView("today"));
  document.querySelector("#clearIntentionProfile")?.addEventListener("click", clearSavedUserIntentionProfileFromForm);
  document.querySelector("#backToWelcomeFromProfile")?.addEventListener("click", () => {
    setActiveView("today");
    showWelcome({ remember: false });
  });

  document.querySelector(".view-tabs").addEventListener("click", (event) => {
    const button = event.target.closest("[data-view]");
    if (!button) return;
    setActiveView(button.dataset.view);
  });

  document.querySelector(".signal-cockpit-list")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-today-signal]");
    if (!button) return;
    setActiveTodaySignal(button.dataset.todaySignal, { userInitiated: true });
  });

  document.querySelector('[data-view-panel="today"]')?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-scroll-cockpit]");
    if (!button) return;
    scrollToSignalCockpit({ userInitiated: true });
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
    renderPracticeOptions();
	    applyThemePreference();
	    syncUI();
	    renderDailyLogTable();
	    renderFieldReview();
	  });

  document.querySelectorAll(".choice-group").forEach((group) => {
    group.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-value]");
      if (!button || !group.dataset.field) return;
      if (group.dataset.field === "sleep") {
        appState.sleepHours = "";
      }
      appState.selectedState[group.dataset.field] = button.dataset.value;
      if (group.dataset.field === "sleep" && button.dataset.value !== "น้อย") {
        appState.activities = appState.activities.filter((item) => item !== "นอนน้อย");
      }
      syncUIAndPersistDraft();
    });
  });

  document.querySelector("#sleepHoursInput").addEventListener("input", (event) => {
    appState.sleepHours = normalizeSleepHours(event.target.value);
    applyDerivedSleepFromHours(appState);
    syncUIAndPersistDraft();
  });

  document.querySelectorAll("[data-water]").forEach((button) => {
    button.addEventListener("click", () => {
      appState.waterMl += Number(button.dataset.water);
      syncUIAndPersistDraft();
    });
  });

  document.querySelector("#resetWater").addEventListener("click", () => {
    appState.waterMl = 0;
    syncUIAndPersistDraft();
  });

  document.querySelector("#drinkTypeSelect").addEventListener("change", applyDrinkDefaults);
  document.querySelector("#addDrink").addEventListener("click", () => {
    appState.drinkProfiles = [...(appState.drinkProfiles || []), getDrinkProfileFromForm()];
    syncUIAndPersistDraft();
  });
  document.querySelector("#clearDrinks").addEventListener("click", () => {
    appState.drinkProfiles = [];
    appState.drinks = [];
    syncUIAndPersistDraft();
  });

	  document.querySelector("#activitiesList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-activity]");
    if (!button) return;
    const activity = button.dataset.activity;
    const isSelected = appState.activities.includes(activity);

    appState.activities = isSelected
      ? appState.activities.filter((item) => item !== activity)
      : [...appState.activities, activity];

	    syncUIAndPersistDraft();
	  });

  ["#runDistanceInput", "#runDurationHoursInput", "#runDurationMinutesInput", "#runSweatSelect"].forEach((selector) => {
    document.querySelector(selector)?.addEventListener("input", updateRunDetailFromForm);
    document.querySelector(selector)?.addEventListener("change", updateRunDetailFromForm);
  });

  document.querySelector("#energyCausesList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-energy-cause]");
    if (!button) return;
    const cause = button.dataset.energyCause;
    appState.energyCauses = appState.energyCauses.includes(cause)
      ? appState.energyCauses.filter((item) => item !== cause)
      : [...appState.energyCauses, cause];
    syncUIAndPersistDraft();
  });

  document.querySelector("#generateReflection").addEventListener("click", generateReflectionWithPulse);
  document.querySelector("#clearReflection").addEventListener("click", clearGeneratedReflection);
  document.querySelector("#reflectionRootOptions")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-reflection-root]");
    if (!button) return;
    setSelectedReflectionRoot(button.dataset.reflectionRoot);
  });

  document.querySelector("#reflectionOutput").addEventListener("input", (event) => {
    appState.generatedReflection = event.target.value;
    updateReflectionPreview();
    persistCurrentFormDraft();
  });

  document.querySelector("#toggleReflectionEdit").addEventListener("click", () => {
    if (!appState.generatedReflection.trim()) return;
    isEditingReflection = !isEditingReflection;
    updateReflectionPreview();
  });

  document.querySelector("#mindNoteText").addEventListener("input", (event) => {
    appState.mindNoteText = event.target.value;
    markTodayMindNoteFlowActive();
    persistCurrentFormDraft();
  });

  document.querySelector("#practiceRootList")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-practice-root]");
    if (!button) return;
    const nextRoot = button.dataset.practiceRoot;
    appState.practiceRoot = appState.practiceRoot === nextRoot ? "" : nextRoot;
    if (appState.practiceType && practiceTypeToRoot[appState.practiceType] !== appState.practiceRoot) {
      appState.practiceType = "";
    }
    renderPracticeTypeOptions();
    markTodayMindNoteFlowActive();
    syncUIAndPersistDraft();
  });

  document.querySelector("#practiceTypeList")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-practice-type]");
    if (!button) return;
    const nextType = button.dataset.practiceType;
    appState.practiceType = appState.practiceType === nextType ? "" : nextType;
    if (appState.practiceType && !appState.practiceRoot) {
      appState.practiceRoot = practiceTypeToRoot[appState.practiceType] || "";
    }
    markTodayMindNoteFlowActive();
    syncUIAndPersistDraft();
  });

  ["#practiceDurationHoursInput", "#practiceDurationMinutesInput"].forEach((selector) => {
    document.querySelector(selector)?.addEventListener("input", updatePracticeDurationFromForm);
    document.querySelector(selector)?.addEventListener("change", updatePracticeDurationFromForm);
  });

  document.querySelector("#practiceNoteInput")?.addEventListener("input", (event) => {
    appState.practiceNote = event.target.value;
    markTodayMindNoteFlowActive();
    persistCurrentFormDraft();
  });

  document.querySelectorAll("[data-mind-note-field]").forEach((button) => {
    button.addEventListener("click", () => {
      const field = button.dataset.mindNoteField;
      appState[field] = appState[field] === button.dataset.value ? "" : button.dataset.value;
      markTodayMindNoteFlowActive();
      syncUIAndPersistDraft();
    });
  });

  document.querySelector("#goTodayStepTwo").addEventListener("click", () => setTodayInputStep(2));
  document.querySelector("#goTodayStepOne").addEventListener("click", () => setTodayInputStep(1));
  document.querySelectorAll("[data-today-step-switch]").forEach((button) => {
    button.addEventListener("click", () => setTodayInputStep(button.dataset.todayStepSwitch));
  });
  document.querySelector("#goReflectionFromToday").addEventListener("click", goToReflectionFromToday);
  document.querySelector("#backToTodayStepOne").addEventListener("click", () => goToTodayStep(1));
  document.querySelector("#backToTodayStepTwo").addEventListener("click", () => goToTodayStep(2));
  document.querySelector("#saveTodayFromStepOne").addEventListener("click", () => saveTodayLog({ source: "today_1" }));
  document.querySelector("#saveTodayFromStepTwo").addEventListener("click", () => saveTodayLog({ source: "today_2" }));
  document.querySelector("#saveDailyLog").addEventListener("click", saveToDailyLog);
  document.querySelector("#resetCurrentForm").addEventListener("click", resetCurrentForm);
  document.querySelector("#restoreCurrentForm").addEventListener("click", restoreCurrentFormFromDailyLog);
	  document.querySelector("#clearDailyLog").addEventListener("click", clearDailyLog);
	  document.querySelector("#exportMasterExcel").addEventListener("click", exportMasterExcel);
	  document.querySelector("#importMasterExcel").addEventListener("click", () => {
	    document.querySelector("#importExcelFile").click();
	  });
	  document.querySelector("#importExcelFile").addEventListener("change", importMasterExcel);
	  document.querySelector("#fieldReviewTimeframe")?.addEventListener("change", () => {
	    resetAllGuidedReading();
	    renderFieldReview();
	  });
  document.querySelector(".timeframe-segments")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-field-review-timeframe]");
    if (!button) return;
    const timeframeSelect = document.querySelector("#fieldReviewTimeframe");
    if (timeframeSelect) {
      timeframeSelect.value = button.dataset.fieldReviewTimeframe;
    }
    resetAllGuidedReading();
    renderFieldReview();
  });
  document.querySelector("#fieldReviewCards")?.addEventListener("click", (event) => {
    const roomButton = event.target.closest("[data-field-room-target]");
    if (roomButton) {
      const nextRoom = normalizeFieldReviewRoom(roomButton.dataset.fieldRoomTarget);
      activeFieldReviewRoom = nextRoom;
      activeFieldReviewFocus = "overview";
      renderFieldReview();
      return;
    }

    const relationshipButton = event.target.closest("[data-signal-relationship-target]");
    if (relationshipButton) {
      activeSignalRelationshipPair = relationshipButton.dataset.signalRelationshipTarget || "";
      renderFieldReview();
      return;
    }

    const guidedRestartButton = event.target.closest("[data-guided-reading-restart]");
    if (guidedRestartButton) {
      resetGuidedReadingState(guidedRestartButton.dataset.guidedReadingRestart || activeFieldReviewRoom);
      renderFieldReview();
      return;
    }

    const guidedResumeButton = event.target.closest("[data-guided-reading-resume]");
    if (guidedResumeButton) {
      const state = getGuidedReadingState(guidedResumeButton.dataset.guidedReadingResume || activeFieldReviewRoom);
      state.ended = false;
      state.choice = state.beforeEnd || state.choice || "";
      renderFieldReview();
      return;
    }

    const guidedBackButton = event.target.closest("[data-guided-reading-back]");
    if (guidedBackButton) {
      const state = getGuidedReadingState(guidedBackButton.dataset.guidedReadingBack || activeFieldReviewRoom);
      state.ended = false;
      state.history.pop();
      state.choice = state.history[state.history.length - 1] || "";
      renderFieldReview();
      return;
    }

    const guidedChooseButton = event.target.closest("[data-guided-reading-choose]");
    if (guidedChooseButton) {
      const state = getGuidedReadingState(guidedChooseButton.dataset.guidedReadingChoose || activeFieldReviewRoom);
      state.choice = "";
      state.ended = false;
      renderFieldReview();
      return;
    }

    const guidedExitButton = event.target.closest("[data-guided-reading-exit]");
    if (guidedExitButton) {
      const state = getGuidedReadingState(guidedExitButton.dataset.guidedReadingExit || activeFieldReviewRoom);
      state.beforeEnd = state.choice;
      state.ended = true;
      renderFieldReview();
      return;
    }

    const guidedChoiceButton = event.target.closest("[data-guided-reading-choice]");
    if (guidedChoiceButton) {
      const roomType = guidedChoiceButton.dataset.guidedReadingRoom || activeFieldReviewRoom;
      const state = getGuidedReadingState(roomType);
      const nextChoice = normalizeHydrationConversationChoice(
        guidedChoiceButton.dataset.guidedReadingChoice
      );
      state.choice = nextChoice;
      state.history = [
        ...state.history.filter((choiceType) => choiceType !== nextChoice),
        nextChoice
      ];
      state.readChoices.add(nextChoice);
      state.ended = false;
      renderFieldReview();
      return;
    }

    const focusButton = event.target.closest("[data-field-room-focus]");
    if (focusButton) {
      activeFieldReviewFocus = normalizeFieldReviewFocus(focusButton.dataset.fieldRoomFocus);
      renderFieldReview();
      return;
    }
  });
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
	  if (!["today", "intention-profile", "reflection", "field-review", "log"].includes(view)) return;
	  if (view === "today") {
	    prepareTodayStepForOpen();
	  }
	  currentView = view;
	  updateViewPanels();
	  if (view === "intention-profile") {
	    loadUserIntentionProfileIntoForm({ showMalformedNotice: true });
	  }
	  if (view === "field-review") {
	    renderFieldReview();
	  }
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
  resetTodayStepIfDateChanged();
  appState.sleepHours = normalizeSleepHours(appState.sleepHours);
  appState.runDetail = normalizeRunDetail(appState.runDetail);
  appState.practiceRoot = normalizePracticeRoot(appState.practiceRoot);
  appState.practiceType = normalizePracticeType(appState.practiceType, appState.practiceRoot);
  appState.practiceMinutes = normalizePracticeMinutes(appState.practiceMinutes);
  appState.practiceNote = cleanLegacyTextValue(appState.practiceNote || "", "Practice_Note");
  applyDerivedSleepFromHours(appState);
  appState.loadScore = calculateLoadScore();
  appState.loadLevel = getLoadLevel(appState.loadScore);
  appState.hydrationStatus = getHydrationStatus(appState.waterMl);

  document.querySelector("#waterMl").textContent = appState.waterMl.toLocaleString(translations[currentLanguage].locale);
  document.querySelector("#hydrationFeedback").textContent = appState.hydrationStatus;
  document.querySelector("#hydrationGuidance").textContent = getHydrationGuidanceText();
  renderTodayHydrationWelcome();
  updateHydrationVisual();
  document.querySelector("#loadScore").textContent = appState.loadScore;
  document.querySelector("#loadLevel").textContent = appState.loadLevel;
  document.querySelector("#loadFeedback").textContent = getLoadFeedback();
  document.querySelector("#mindfulReminder").textContent = getMindfulReminder();
  document.querySelector("#reflectionOutput").value = appState.generatedReflection;
  document.querySelector("#mindNoteText").value = appState.mindNoteText || "";
  document.querySelector("#practiceNoteInput").value = appState.practiceNote || "";

  updateReflectionPreview();
  updateStateButtons();
  updateSleepHoursUI();
  updateMindNoteButtons();
  updatePracticeUI();
  updateDrinkUI();
  updateActivityUI();
  updateRunDetailUI();
  updateEnergyCauseUI();
  updateTodayInputStepUI();
  updateTodaySignalCockpitUI();
  updateInputActiveCards();
  updateDailySaveStatus();
}

function persistCurrentFormDraft() {
  saveCurrentForm({ generateReflection: false });
}

function syncUIAndPersistDraft() {
  syncUI();
  persistCurrentFormDraft();
}

function setActiveTodaySignal(signalKey, { userInitiated = false } = {}) {
  const safeSignal = ["state", "hydration", "drinks", "load"].includes(signalKey) ? signalKey : "hydration";
  activeTodaySignal = safeSignal;
  todayInputStep = 1;
  todayInputStepResetAfterSave = false;
  updateTodayInputStepUI();
  updateTodaySignalCockpitUI();
  scrollToActiveSignalDetail({ userInitiated });
}

function isMobileTodayLayout() {
  return window.matchMedia?.("(max-width: 820px)")?.matches ?? window.innerWidth <= 820;
}

function getTodayScrollBehavior() {
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  return prefersReducedMotion ? "auto" : "smooth";
}

function scrollToActiveSignalDetail({ userInitiated = false } = {}) {
  if (!userInitiated || !isMobileTodayLayout()) return;
  window.requestAnimationFrame(() => {
    const activePanel = document.querySelector(`[data-today-signal-detail="${activeTodaySignal}"]`);
    if (!activePanel || activePanel.hidden) return;
    activePanel.scrollIntoView({ behavior: getTodayScrollBehavior(), block: "start" });
  });
}

function scrollToSignalCockpit({ userInitiated = false } = {}) {
  if (!userInitiated || !isMobileTodayLayout()) return;
  const cockpit = document.querySelector(".daily-signal-cockpit");
  cockpit?.scrollIntoView({ behavior: getTodayScrollBehavior(), block: "start" });
}

function setTodayInputStep(step) {
  todayInputStep = Number(step) === 2 ? 2 : 1;
  if (todayInputStep === 2) {
    todayInputStepResetAfterSave = false;
  }
  updateTodayInputStepUI();
  updateTodaySignalCockpitUI();
}

function resetTodayInputStep() {
  todayInputStep = 1;
  todayInputStepResetAfterSave = true;
  activeTodaySignal = "hydration";
  updateTodayInputStepUI();
  updateTodaySignalCockpitUI();
}

function markTodayMindNoteFlowActive() {
  todayInputStepResetAfterSave = false;
}

function hasMindNoteInput(state = appState) {
  return Boolean(
    String(state.mindNoteText || "").trim()
    || state.mindNoteFeeling
    || state.mindNoteSupport
    || hasPracticeContextInput(state)
  );
}

function hasMeaningfulCurrentFormDraft(state = {}) {
  const selected = state.selectedState || {};
  return Boolean(
    Number(state.waterMl) > 0
    || Boolean(selected.energy || selected.mind || selected.sleep)
    || hasValidSleepHours(state.sleepHours)
    || (state.drinkProfiles || []).length > 0
    || (state.drinks || []).length > 0
    || (state.activities || []).length > 0
    || (state.energyCauses || []).length > 0
    || hasMeaningfulRunDetail(state.runDetail)
    || hasPracticeContextInput(state)
    || Boolean(String(state.mindNoteText || "").trim())
    || Boolean(state.mindNoteFeeling || state.mindNoteSupport)
    || Boolean(String(state.generatedReflection || "").trim())
  );
}

function shouldOpenTodayStepTwo() {
  if (todayInputStep === 2) return true;
  return hasMindNoteInput() && !todayInputStepResetAfterSave;
}

function prepareTodayStepForOpen() {
  todayInputStep = shouldOpenTodayStepTwo() ? 2 : 1;
}

function resetTodayStepIfDateChanged() {
  const currentIso = new Date().toLocaleDateString("en-CA");
  if (currentIso !== todayIso) {
    todayInputStep = 1;
    todayInputStepResetAfterSave = true;
    activeTodaySignal = "hydration";
  }
}

function updateTodayInputStepUI() {
  const todayPanel = document.querySelector('[data-view-panel="today"]');
  if (todayPanel) {
    todayPanel.dataset.todayInputStep = String(todayInputStep);
  }

  document.querySelectorAll("[data-today-step]").forEach((element) => {
    const isActive = element.dataset.todayStep === String(todayInputStep);
    element.hidden = !isActive;
    element.setAttribute("aria-hidden", String(!isActive));
  });

  const indicator = document.querySelector("#todayStepIndicator");
  const helper = document.querySelector("#todayStepHelper");
  if (indicator) {
    indicator.textContent = t(todayInputStep === 2 ? "todayStepTwoLabel" : "todayStepOneLabel");
  }
  if (helper) {
    helper.textContent = t(todayInputStep === 2 ? "todayStepTwoHelper" : "todayStepOneHelper");
  }
  document.querySelectorAll("[data-today-step-switch]").forEach((button) => {
    const isActive = button.dataset.todayStepSwitch === String(todayInputStep);
    button.classList.toggle("is-active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "step");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

function updateTodaySignalCockpitUI() {
  const isStepOne = todayInputStep === 1;
  document.querySelectorAll("[data-today-signal-detail]").forEach((panel) => {
    const isActive = isStepOne && panel.dataset.todaySignalDetail === activeTodaySignal;
    panel.hidden = !isActive;
    panel.setAttribute("aria-hidden", String(!isActive));
    panel.classList.toggle("is-active-detail", isActive);
  });

  document.querySelectorAll("[data-today-signal]").forEach((button) => {
    const isSelected = button.dataset.todaySignal === activeTodaySignal;
    button.classList.toggle("is-active", isSelected);
    button.setAttribute("aria-selected", String(isSelected));
    button.setAttribute("tabindex", isSelected ? "0" : "-1");
  });

  const cockpitState = getTodaySignalCockpitState();
  const readableSignalCount = Object.values(cockpitState).filter((entry) => entry.status !== "empty").length;
  const completeSignalCount = Object.values(cockpitState).filter((entry) => entry.status === "complete").length;
  Object.entries(cockpitState).forEach(([signalKey, entry]) => {
    const summary = document.querySelector(`#cockpit${entry.domKey}Summary`);
    const status = document.querySelector(`#cockpit${entry.domKey}Status`);
    const dots = document.querySelector(`#cockpit${entry.domKey}Dots`);
    const item = document.querySelector(`[data-today-signal="${signalKey}"]`);
    if (summary) summary.textContent = entry.summary;
    if (status) status.textContent = t(`cockpitStatus${entry.statusLabel}`);
    if (dots) dots.dataset.signalProgress = String(entry.progress);
    if (item) {
      item.dataset.signalStatus = entry.status;
      item.dataset.signalProgress = String(entry.progress);
    }
  });
  updateDailyBalanceOrb(readableSignalCount, completeSignalCount);
  updateTodayStepNextPriority(readableSignalCount >= 4);
}

function updateTodayStepNextPriority(isCockpitComplete) {
  const nextButton = document.querySelector("#goTodayStepTwo");
  if (!nextButton) return;
  nextButton.classList.toggle("is-cockpit-complete", Boolean(isCockpitComplete));
  nextButton.dataset.cockpitComplete = String(Boolean(isCockpitComplete));
}

function getTodaySignalCockpitState(state = appState) {
  return {
    state: {
      domKey: "State",
      status: getTodaySignalStatus("state", state),
      statusLabel: getTodaySignalStatusLabel("state", state),
      progress: getTodaySignalProgress("state", state),
      summary: getTodaySignalSummary("state", state)
    },
    hydration: {
      domKey: "Hydration",
      status: getTodaySignalStatus("hydration", state),
      statusLabel: getTodaySignalStatusLabel("hydration", state),
      progress: getTodaySignalProgress("hydration", state),
      summary: getTodaySignalSummary("hydration", state)
    },
    drinks: {
      domKey: "Drinks",
      status: getTodaySignalStatus("drinks", state),
      statusLabel: getTodaySignalStatusLabel("drinks", state),
      progress: getTodaySignalProgress("drinks", state),
      summary: getTodaySignalSummary("drinks", state)
    },
    load: {
      domKey: "Load",
      status: getTodaySignalStatus("load", state),
      statusLabel: getTodaySignalStatusLabel("load", state),
      progress: getTodaySignalProgress("load", state),
      summary: getTodaySignalSummary("load", state)
    }
  };
}

function getTodaySignalStatus(signalKey, state = appState) {
  if (signalKey === "state") {
    const count = getTodayStateInputCount(state);
    if (count === 0) return "empty";
    return count >= 2 ? "complete" : "partial";
  }
  if (signalKey === "hydration") {
    const waterMl = Number(state.waterMl || 0);
    if (waterMl <= 0) return "empty";
    return waterMl >= 1000 ? "complete" : "partial";
  }
  if (signalKey === "drinks") return hasDrinkInput(state) ? "complete" : "empty";
  if (signalKey === "load") return hasLoadInput(state) ? "complete" : "empty";
  return "empty";
}

function getTodaySignalStatusLabel(signalKey, state = appState) {
  const status = getTodaySignalStatus(signalKey, state);
  if (status === "complete") return "Complete";
  if (status === "partial") return "Partial";
  return "Empty";
}

function getTodaySignalProgress(signalKey, state = appState) {
  const status = getTodaySignalStatus(signalKey, state);
  if (status === "complete") return 3;
  if (status === "partial") return 1;
  return 0;
}

function updateDailyBalanceOrb(readableCount = 0, completeCount = 0) {
  const orb = document.querySelector("#dailyBalanceOrb");
  const count = document.querySelector("#dailyBalanceCount");
  const text = document.querySelector("#dailyBalanceText");
  if (!orb || !count || !text) return;
  const safeCount = Math.max(0, Math.min(4, Number(readableCount) || 0));
  orb.dataset.balanceCount = String(safeCount);
  orb.dataset.completeCount = String(Math.max(0, Math.min(4, Number(completeCount) || 0)));
  count.textContent = `${safeCount}/4`;
  if (safeCount >= 4) {
    text.textContent = t("cockpitBalanceReady");
  } else if (safeCount >= 2) {
    text.textContent = t("cockpitBalanceReadable");
  } else if (safeCount === 1) {
    text.textContent = t("cockpitBalanceOne");
  } else {
    text.textContent = t("cockpitBalanceEmpty");
  }
}

function getTodayStateInputCount(state = appState) {
  const selected = state.selectedState || {};
  return [
    selected.energy,
    selected.mind,
    selected.sleep,
    hasValidSleepHours(state.sleepHours),
    (state.energyCauses || []).length
  ].filter(Boolean).length;
}

function getTodaySignalSummary(signalKey, state = appState) {
  if (signalKey === "state") return getTodayStateCockpitSummary(state);
  if (signalKey === "hydration") return getHydrationCockpitSummary(state);
  if (signalKey === "drinks") return getDrinksCockpitSummary(state);
  if (signalKey === "load") return getLoadCockpitSummary(state);
  return "";
}

function getTodayStateCockpitSummary(state = appState) {
  const selected = state.selectedState || {};
  const parts = [];
  if (hasValidSleepHours(state.sleepHours)) {
    parts.push(`${formatNumberForLocale(state.sleepHours)} ${t("sleepHoursUnit")}`);
  } else if (selected.sleep) {
    parts.push(localizeStateValue("Sleep", selected.sleep));
  }
  if (selected.energy) parts.push(localizeStateValue("Energy", selected.energy));
  if (selected.mind) parts.push(localizeStateValue("Mind", selected.mind));
  if ((state.energyCauses || []).length) parts.push(t("energyCauseLabel"));
  return parts.length ? t("cockpitStateSummary", { items: parts.slice(0, 3).join(" · ") }) : t("cockpitStateEmpty");
}

function getHydrationCockpitSummary(state = appState) {
  const waterMl = Number(state.waterMl || 0);
  if (waterMl <= 0) return t("cockpitWaterEmpty");
  const cue = waterMl >= 1000 ? t("cockpitHydrationBaseVisible") : t("cockpitHydrationReturningBase");
  const waterSummary = t("cockpitWaterSummary", { water: waterMl.toLocaleString(translations[currentLanguage].locale) });
  return `${waterSummary} · ${cue}`;
}

function getDrinksCockpitSummary(state = appState) {
  const profiles = state.drinkProfiles || [];
  if (!profiles.length) return t("cockpitDrinksEmpty");
  const scores = getDrinkScores(profiles);
  if (scores.caffeineScore >= 3) return `${t("cockpitDrinksSummary", { count: profiles.length })} · ${t("cockpitCaffeineHigh")}`;
  if (scores.sugarScore > 0) return `${t("cockpitDrinksSummary", { count: profiles.length })} · ${t("cockpitSweetVisible")}`;
  return t("cockpitDrinksSummary", { count: profiles.length });
}

function getLoadCockpitSummary(state = appState) {
  const selectedActivity = (state.activities || [])
    .map((activity) => getActivityOptionByValue(activity))
    .find(Boolean);
  if (!selectedActivity && !hasMeaningfulRunDetail(state.runDetail)) return t("cockpitLoadEmpty");
  const activityLabel = selectedActivity
    ? t(`options.activities.${selectedActivity.key}`)
    : t("runDetailTitle");
  return t("cockpitLoadSummary", {
    level: getCockpitLoadRhythm(state),
    activity: activityLabel
  });
}

function getCockpitLoadRhythm(state = appState) {
  const score = Number(state.loadScore || 0);
  if (score >= 4) return t("cockpitLoadHeavy");
  if (score >= 2) return t("cockpitLoadMedium");
  return t("cockpitLoadLight");
}

function updateInputActiveCards() {
  const activeStateMap = [
    [".today-state-card", hasTodayStateInput()],
    [".today-hydration-hero", hasHydrationInput()],
    [".drink-profile-card", hasDrinkInput()],
    [".load-recovery-card", hasLoadInput()],
    [".mind-note-card", hasMindNoteInput()]
  ];

  activeStateMap.forEach(([selector, isActive]) => {
    const card = document.querySelector(selector);
    if (!card) return;
    card.classList.toggle("is-input-active", Boolean(isActive));
  });
}

function hasTodayStateInput(state = appState) {
  const selected = state.selectedState || {};
  return Boolean(
	    selected.energy
	    || selected.mind
	    || selected.sleep
	    || hasValidSleepHours(state.sleepHours)
	    || (state.energyCauses || []).length
	  );
}

function hasHydrationInput(state = appState) {
  return Number(state.waterMl || 0) > 0;
}

function hasDrinkInput(state = appState) {
  return Boolean(
    (state.drinkProfiles || []).length
    || (state.drinks || []).length
  );
}

function hasLoadInput(state = appState) {
  return Boolean((state.activities || []).length || hasMeaningfulRunDetail(state.runDetail));
}

function goToReflectionFromToday() {
  setActiveView("reflection");
}

function goToTodayStep(step) {
  setActiveView("today");
  setTodayInputStep(step);
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

function normalizeSleepHours(value) {
  if (value === "" || value === null || value === undefined) return "";
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0 || number > 16) return "";
  return Math.round(number * 100) / 100;
}

function hasValidSleepHours(value = appState.sleepHours) {
  return normalizeSleepHours(value) !== "";
}

function deriveSleepCategory(hours) {
  const normalizedHours = normalizeSleepHours(hours);
  if (normalizedHours === "") return "";
  if (normalizedHours < 5) return "น้อย";
  if (normalizedHours < 7) return "พอใช้";
  return "ดี";
}

function applyDerivedSleepFromHours(state = appState) {
  const derivedSleep = deriveSleepCategory(state.sleepHours);
  if (!derivedSleep) return "";
  state.selectedState = state.selectedState || {};
  state.selectedState.sleep = derivedSleep;
  return derivedSleep;
}

function getSleepDisplayFromHoursOrCategory({
  hours = appState.sleepHours,
  category = appState.selectedState.sleep
} = {}) {
  const derivedSleep = deriveSleepCategory(hours);
  return derivedSleep || category || "";
}

function updateSleepHoursUI() {
  const input = document.querySelector("#sleepHoursInput");
  const badge = document.querySelector("#sleepDerivedBadge");
  if (!input || !badge) return;

  input.value = appState.sleepHours === "" ? "" : String(appState.sleepHours);
  const sleepCategory = getSleepDisplayFromHoursOrCategory();
  badge.textContent = sleepCategory
    ? t("sleepDerivedBadge", { sleep: localizeStateValue("Sleep", sleepCategory) })
    : t("sleepDerivedEmpty");
}

function isRunningActivitySelected(activities = appState.activities || []) {
  return getSelectedActivityKeys(activities).some((key) => runningActivityKeys.includes(key));
}

function getPrimaryRunningActivityKey(activities = appState.activities || []) {
  const keys = getSelectedActivityKeys(activities);
  return runningActivityPriority.find((key) => keys.includes(key)) || "";
}

function normalizeRunNumber(value, { max, decimals = 1 } = {}) {
  if (value === "" || value === null || value === undefined) return "";
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0 || (max && number > max)) return "";
  const factor = 10 ** decimals;
  return Math.round(number * factor) / factor;
}

function normalizeRunDetail(detail = {}) {
  const parsed = typeof detail === "string" ? parseRunDetailJson(detail) : detail;
  const normalized = {
    type: runningActivityKeys.includes(parsed?.type) ? parsed.type : "",
    distanceKm: normalizeRunNumber(parsed?.distanceKm, { max: 100, decimals: 2 }),
    durationMin: normalizeRunNumber(parsed?.durationMin, { max: 600, decimals: 0 }),
    sweat: runSweatOptions.includes(parsed?.sweat) ? parsed.sweat : ""
  };
  const avgPace = deriveAvgPace(normalized.distanceKm, normalized.durationMin);
  if (avgPace) normalized.avgPace = avgPace;
  return normalized;
}

function parseRunDetailJson(value) {
  try {
    const parsed = JSON.parse(value || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function hasMeaningfulRunDetail(detail = appState.runDetail) {
  const normalized = normalizeRunDetail(detail);
  return Boolean(normalized.distanceKm !== "" || normalized.durationMin !== "" || normalized.sweat);
}

function deriveAvgPace(distanceKm, durationMin) {
  const distance = Number(distanceKm);
  const duration = Number(durationMin);
  if (!Number.isFinite(distance) || !Number.isFinite(duration) || distance <= 0 || duration <= 0) return "";
  const paceTotalSeconds = Math.round((duration * 60) / distance);
  const minutes = Math.floor(paceTotalSeconds / 60);
  const seconds = String(paceTotalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}/km`;
}

function splitRunDuration(durationMin) {
  const duration = normalizeRunNumber(durationMin, { max: 600, decimals: 0 });
  if (duration === "") {
    return { hours: "", minutes: "" };
  }
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return {
    hours: hours > 0 ? String(hours) : "",
    minutes: String(minutes)
  };
}

function formatNumberForLocale(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "";
  return number.toLocaleString(translations[currentLanguage].locale, {
    maximumFractionDigits: 2
  });
}

function formatRunDuration(durationMin) {
  const duration = normalizeRunNumber(durationMin, { max: 600, decimals: 0 });
  if (duration === "") return "";
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  if (currentLanguage === "en") {
    if (hours && minutes) return `about ${hours} hr ${minutes} min`;
    if (hours) return `about ${hours} hr`;
    return `about ${minutes} min`;
  }
  if (currentLanguage === "zh") {
    if (hours && minutes) return `约 ${hours} 小时 ${minutes} 分钟`;
    if (hours) return `约 ${hours} 小时`;
    return `约 ${minutes} 分钟`;
  }
  if (hours && minutes) return `ประมาณ ${hours} ชม. ${minutes} นาที`;
  if (hours) return `ประมาณ ${hours} ชม.`;
  return `ประมาณ ${minutes} นาที`;
}

function buildRunDurationMinFromInputs(hoursValue, minutesValue) {
  const hoursBlank = hoursValue === "" || hoursValue === null || hoursValue === undefined;
  const minutesBlank = minutesValue === "" || minutesValue === null || minutesValue === undefined;
  if (hoursBlank && minutesBlank) return "";

  const hours = hoursBlank ? 0 : Number(hoursValue);
  const minutes = minutesBlank ? 0 : Number(minutesValue);
  if (!Number.isInteger(hours) || !Number.isInteger(minutes)) return "";
  if (hours < 0 || hours > 10 || minutes < 0 || minutes > 59) return "";

  const total = (hours * 60) + minutes;
  return total > 600 ? "" : total;
}

function buildRunDetailJson() {
  if (!isRunningActivitySelected()) return "";
  const detail = normalizeRunDetail({
    ...appState.runDetail,
    type: getPrimaryRunningActivityKey()
  });
  if (!detail.type && !hasMeaningfulRunDetail(detail)) return "";

  const compactDetail = {
    type: detail.type
  };
  if (detail.distanceKm !== "") compactDetail.distanceKm = detail.distanceKm;
  if (detail.durationMin !== "") compactDetail.durationMin = detail.durationMin;
  if (detail.avgPace) compactDetail.avgPace = detail.avgPace;
  if (detail.sweat) compactDetail.sweat = detail.sweat;
  return JSON.stringify(compactDetail);
}

function updateRunDetailFromForm() {
  appState.runDetail = normalizeRunDetail({
    type: getPrimaryRunningActivityKey(),
    distanceKm: document.querySelector("#runDistanceInput")?.value || "",
    durationMin: buildRunDurationMinFromInputs(
      document.querySelector("#runDurationHoursInput")?.value || "",
      document.querySelector("#runDurationMinutesInput")?.value || ""
    ),
    sweat: document.querySelector("#runSweatSelect")?.value || ""
  });
  syncUIAndPersistDraft();
}

function updateRunDetailUI() {
  const panel = document.querySelector("#runDetailPanel");
  if (!panel) return;
  const hasRunning = isRunningActivitySelected();
  const detail = normalizeRunDetail({
    ...appState.runDetail,
    type: getPrimaryRunningActivityKey() || appState.runDetail?.type || ""
  });
  appState.runDetail = detail;

  panel.hidden = !hasRunning;
  panel.setAttribute("aria-hidden", String(!hasRunning));

  const distanceInput = document.querySelector("#runDistanceInput");
  const durationHoursInput = document.querySelector("#runDurationHoursInput");
  const durationMinutesInput = document.querySelector("#runDurationMinutesInput");
  const sweatSelect = document.querySelector("#runSweatSelect");
  const paceBadge = document.querySelector("#runPaceBadge");
  const durationParts = splitRunDuration(detail.durationMin);

  if (distanceInput) distanceInput.value = detail.distanceKm === "" ? "" : String(detail.distanceKm);
  if (durationHoursInput) durationHoursInput.value = durationParts.hours;
  if (durationMinutesInput) durationMinutesInput.value = durationParts.minutes;
  if (sweatSelect) sweatSelect.value = detail.sweat || "";
  if (paceBadge) {
    paceBadge.textContent = detail.avgPace ? t("runPaceBadge", { pace: detail.avgPace }) : t("runPaceEmpty");
  }
}

function normalizePracticeRoot(value) {
  const root = String(value || "").trim();
  if (visiblePracticeGroups.some((group) => group.key === root)) return root;
  if (legacyPracticeRootMap[root]) return legacyPracticeRootMap[root];
  return practiceGroups.some((group) => group.key === root) ? root : "";
}

function getVisiblePracticeRoot(root) {
  const safeRoot = normalizePracticeRoot(root);
  if (!safeRoot) return "";
  const group = practiceGroups.find((entry) => entry.key === safeRoot);
  return group?.hiddenInUi ? "other_or_none" : safeRoot;
}

function normalizePracticeType(value, root = "") {
  const rawType = String(value || "").trim();
  const type = legacyPracticeTypeMap[rawType] || rawType;
  if (!practiceTypeToRoot[type]) return "";
  const safeRoot = normalizePracticeRoot(root);
  if (safeRoot && practiceTypeToRoot[type] !== safeRoot) return "";
  return type;
}

function normalizePracticeMinutes(value) {
  if (value === "" || value === null || value === undefined) return "";
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0 || number > 1440) return "";
  return Math.round(number);
}

function splitPracticeDuration(minutesValue) {
  const total = normalizePracticeMinutes(minutesValue);
  if (total === "") return { hours: "", minutes: "" };
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return {
    hours: hours > 0 ? String(hours) : "",
    minutes: String(minutes)
  };
}

function buildPracticeMinutesFromInputs(hoursValue, minutesValue) {
  const hoursBlank = hoursValue === "" || hoursValue === null || hoursValue === undefined;
  const minutesBlank = minutesValue === "" || minutesValue === null || minutesValue === undefined;
  if (hoursBlank && minutesBlank) return "";

  const hours = hoursBlank ? 0 : Number(hoursValue);
  const minutes = minutesBlank ? 0 : Number(minutesValue);
  if (!Number.isInteger(hours) || !Number.isInteger(minutes)) return "";
  if (hours < 0 || hours > 24 || minutes < 0 || minutes > 59) return "";

  const total = (hours * 60) + minutes;
  return total > 1440 ? "" : total;
}

function hasPracticeContextInput(state = appState) {
  return Boolean(
    normalizePracticeRoot(state.practiceRoot)
    || normalizePracticeType(state.practiceType, state.practiceRoot)
    || normalizePracticeMinutes(state.practiceMinutes) !== ""
    || String(state.practiceNote || "").trim()
  );
}

function buildPracticeContextObject(state = appState) {
  const root = normalizePracticeRoot(state.practiceRoot);
  const type = normalizePracticeType(state.practiceType, root);
  const minutes = type === "none" ? 0 : normalizePracticeMinutes(state.practiceMinutes);
  const note = cleanLegacyTextValue(state.practiceNote || "", "Practice_Note");

  if (!root && !type && minutes === "" && !note) return null;

  return {
    root,
    type,
    minutes,
    note,
    source: practiceSourceKey,
    reflectDaily: false
  };
}

function buildTodayPracticeContext(state = appState) {
  const practiceContext = buildPracticeContextObject(state);
  const practiceType = practiceContext?.type || "";
  const practiceMinutes = practiceContext?.minutes === "" || practiceContext?.minutes === undefined
    ? ""
    : Number(practiceContext.minutes);
  const hasPracticeType = Boolean(practiceType && practiceType !== "none");
  const hasPracticeMinutes = Number.isFinite(practiceMinutes) && practiceMinutes > 0;
  const practiceNote = String(practiceContext?.note || "").trim();
  const hasPracticeEvidence = hasPracticeType || hasPracticeMinutes || Boolean(practiceNote);
  const practiceIntensityBand = !hasPracticeEvidence
    ? "none"
    : hasPracticeMinutes && practiceMinutes <= 10
      ? "short"
      : hasPracticeMinutes && practiceMinutes >= 15
        ? "longer"
        : "present";

  return {
    hasPracticeEvidence,
    hasPracticeMinutes,
    practiceMinutes: hasPracticeMinutes ? practiceMinutes : "",
    practiceType,
    practiceNote,
    practiceRoot: practiceContext?.root || "",
    practiceIntensityBand,
    dataThin: !hasPracticeType && !hasPracticeMinutes && !practiceNote,
    boundaryTags: [
      "no_spiritual_score",
      "no_success_failure_judgment",
      "no_causation",
      "preserve_user_owned_meaning"
    ]
  };
}

function buildPracticeContextJson(state = appState) {
  const context = buildPracticeContextObject(state);
  return context ? JSON.stringify(context) : "";
}

function parsePracticeContextJson(value) {
  try {
    const parsed = JSON.parse(value || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function normalizePracticeContextJsonForRow(value, row = {}) {
  const parsed = typeof value === "string" ? parsePracticeContextJson(value) : (value || {});
  const root = normalizePracticeRoot(parsed.root || row.Practice_Root);
  const type = normalizePracticeType(parsed.type || row.Practice_Type, root);
  const minutes = type === "none" ? 0 : normalizePracticeMinutes(parsed.minutes ?? row.Practice_Minutes);
  const note = cleanLegacyTextValue(parsed.note ?? row.Practice_Note ?? "", "Practice_Note");
  if (!root && !type && minutes === "" && !note) return "";
  return JSON.stringify({
    root,
    type,
    minutes,
    note,
    source: parsed.source || practiceSourceKey,
    reflectDaily: false
  });
}

function updatePracticeDurationFromForm() {
  appState.practiceMinutes = normalizePracticeMinutes(buildPracticeMinutesFromInputs(
    document.querySelector("#practiceDurationHoursInput")?.value || "",
    document.querySelector("#practiceDurationMinutesInput")?.value || ""
  ));
  markTodayMindNoteFlowActive();
  syncUIAndPersistDraft();
}

function updatePracticeUI() {
  const inferredRoot = appState.practiceRoot || practiceTypeToRoot[appState.practiceType];
  const safeRoot = normalizePracticeRoot(inferredRoot);
  const safeType = normalizePracticeType(appState.practiceType, safeRoot);
  const visibleRoot = getVisiblePracticeRoot(safeRoot);
  const isLegacyHiddenRoot = Boolean(safeRoot && visibleRoot !== safeRoot);
  appState.practiceRoot = safeRoot;
  appState.practiceType = safeType;

  renderPracticeTypeOptions();

  document.querySelectorAll("[data-practice-root]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.practiceRoot === visibleRoot);
  });
  document.querySelectorAll("[data-practice-type]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.practiceType === safeType);
  });

  const durationParts = splitPracticeDuration(appState.practiceMinutes);
  const hoursInput = document.querySelector("#practiceDurationHoursInput");
  const minutesInput = document.querySelector("#practiceDurationMinutesInput");
  const helper = document.querySelector("#practiceTypeHelper");
  const durationBadge = document.querySelector("#practiceDurationBadge");
  const summaryPill = document.querySelector("#practiceSummaryPill");
  const durationSummary = document.querySelector("#practiceDurationSummary");
  const typeSection = document.querySelector("#practiceTypeSection");
  const durationSection = document.querySelector("#practiceDurationSection");
  const noteSection = document.querySelector("#practiceNoteSection");
  const showTypeSection = Boolean(visibleRoot);
  const showDurationSection = Boolean(safeType && safeType !== "none" && !isLegacyHiddenRoot);
  const showNoteSection = Boolean((safeType && !isLegacyHiddenRoot) || String(appState.practiceNote || "").trim());

  if (typeSection) {
    typeSection.hidden = !showTypeSection;
    typeSection.setAttribute("aria-hidden", String(!showTypeSection));
  }
  if (durationSection) {
    durationSection.hidden = !showDurationSection;
    durationSection.setAttribute("aria-hidden", String(!showDurationSection));
  }
  if (noteSection) {
    noteSection.hidden = !showNoteSection;
    noteSection.setAttribute("aria-hidden", String(!showNoteSection));
  }

  if (hoursInput) hoursInput.value = durationParts.hours;
  if (minutesInput) minutesInput.value = durationParts.minutes;
  if (helper) {
    const helperType = isLegacyHiddenRoot ? "other" : safeType;
    helper.textContent = helperType ? t(`options.practiceTypeHelpers.${helperType}`) : t("practiceHelperDefault");
  }
  if (durationBadge) {
    const minutes = normalizePracticeMinutes(appState.practiceMinutes);
    durationBadge.textContent = minutes === "" ? t("practiceDurationHint") : t("practiceDurationBadge", { minutes });
  }
  if (summaryPill) {
    summaryPill.textContent = isLegacyHiddenRoot
      ? t("options.practiceTypes.other")
      : safeType
      ? t(`options.practiceTypes.${safeType}`)
      : t("practiceSummaryEmpty");
  }
  if (durationSummary) {
    const minutes = normalizePracticeMinutes(appState.practiceMinutes);
    const summaryType = isLegacyHiddenRoot
      ? t("options.practiceTypes.other")
      : safeType
        ? t(`options.practiceTypes.${safeType}`)
        : "";
    durationSummary.textContent = safeType && minutes !== ""
      ? t("practiceSummaryWithMinutes", { type: summaryType, minutes })
      : t("practiceSummaryBase");
  }
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
    if (activity.key === normalized) return true;
    if (activity.label === normalized) return true;
    if (activity.legacyLabels?.includes(normalized)) return true;
    return Object.keys(translations).some((lang) => translations[lang].options.activities[activity.key] === normalized);
  }) || null;
}

function normalizeActivityValuesForState(values = []) {
  return values
    .map((value) => getActivityOptionByValue(value)?.label || cleanRestoreTextValue(value))
    .filter(Boolean);
}

function cleanRestoreTextValue(value) {
  if (value === "" || value === null || value === undefined) return "";
  const text = String(value).trim();
  if (!text) return "";
  return ["undefined", "null", "nan", "[object object]"].includes(text.toLowerCase()) ? "" : text;
}

function normalizeStateChoiceValue(group, value) {
  const text = cleanRestoreTextValue(value);
  if (!text) return "";
  const entries = translations.th.options[group] || {};
  const direct = Object.values(entries).find((entry) => entry === text);
  if (direct) return direct;

  for (const key of Object.keys(entries)) {
    const found = Object.keys(translations).some((lang) => translations[lang].options[group]?.[key] === text);
    if (found) return entries[key];
  }
  return text;
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

function getHydrationTierFromActivity({
  activities = appState.activities || [],
  loadScore = calculateLoadScore(),
  energy = appState.selectedState.energy,
  mind = appState.selectedState.mind,
  sleepLow = appState.selectedState.sleep === "น้อย"
    || (appState.energyCauses || []).includes("sleep_low")
    || getSelectedActivityKeys(activities).includes("lowSleep")
} = {}) {
  const loadTypes = getSelectedLoadTypes(activities);
  const activityKeys = getSelectedActivityKeys(activities);
  const hasType = (type) => loadTypes.includes(type);
  const hasKey = (key) => activityKeys.includes(key);
  const hasOutdoorHeat = hasType("outdoor_heat_load");
  const hasLongRun = hasKey("longRun");
  const hasShortQualitySport = hasKey("shortQualityRun")
    || hasKey("badminton")
    || hasKey("heavyPingPong");
  const hasLightSport = hasKey("easyRun")
    || hasKey("longWalk")
    || hasType("physical_load")
    || hasType("service_standing_load");
  const hasCognitive = hasKey("deepWork")
    || hasKey("lightCodingAiAssist")
    || hasKey("officeWork")
    || hasKey("marketWatch")
    || hasType("cognitive_load")
    || hasType("market_decision_load")
    || hasType("clinical_focus");
  const hasSportSweat = hasLongRun || hasShortQualitySport || hasLightSport || hasType("sport_intensity_load");
  const hasStrongActivity = hasSportSweat || hasOutdoorHeat || hasCognitive;
  const normalizedMind = normalizeMindStateValue(mind);
  const hasRecoverySignal = sleepLow
    || energy === "ต่ำ"
    || ["หนักมาก", "ไม่สบายใจ", "กดดัน"].includes(normalizedMind);
  let tier = "base";
  let rangeMin = 2000;
  let rangeMax = 2400;
  let category = hasRecoverySignal ? "recovery" : "base";
  let cueKey = "Base";

  if (hasLongRun) {
    tier = "long_run_heavy_sweat";
    rangeMin = 3200;
    rangeMax = 4000;
    cueKey = "LongRunHeavySweat";
  } else if (hasShortQualitySport) {
    tier = "short_quality_sport";
    rangeMin = 2800;
    rangeMax = 3300;
    cueKey = "ShortQualitySport";
  } else if (hasLightSport) {
    tier = "light_sport";
    rangeMin = 2600;
    rangeMax = 3000;
    cueKey = "LightSport";
  } else if (hasOutdoorHeat) {
    tier = "outdoor_heat";
    rangeMin = 2600;
    rangeMax = 3200;
    cueKey = "Outdoor";
  } else if (hasCognitive || loadScore >= 3) {
    tier = "cognitive";
    rangeMin = 2400;
    rangeMax = 2800;
    cueKey = "Cognitive";
  }

  if (hasOutdoorHeat && hasSportSweat) {
    rangeMin = Math.min(rangeMin + 300, 3600);
    rangeMax = Math.min(rangeMax + 500, 4000);
    if (!hasLongRun) cueKey = "Outdoor";
  }

  if (hasStrongActivity && tier !== "base") {
    category = hasRecoverySignal ? "activityRecovery" : "strongActivity";
  } else if (hasRecoverySignal) {
    cueKey = "Recovery";
    category = "recovery";
  }

  const midpoint = Math.round((rangeMin + rangeMax) / 2);
  const adjustment = tier === "base" ? 0 : Math.max(midpoint - getHydrationBaseTarget(), 0);

  return {
    adjustment,
    cueKey,
    loadTypes,
    activityKeys,
    tier,
    rangeMin,
    rangeMax,
    category,
    hasStrongActivity: hasStrongActivity && tier !== "base",
    hasRecoverySignal,
    hasOutdoorHeat,
    hasSportSweat,
    hasLongRun
  };
}

function getHydrationAdjustmentFromLoad(options = {}) {
  return getHydrationTierFromActivity(options);
}

function getAdaptiveHydrationTarget({
  activities = appState.activities || [],
  loadScore = calculateLoadScore(),
  drinkScores = getDrinkScores(),
  energy = appState.selectedState.energy,
  mind = appState.selectedState.mind,
  sleepLow = appState.selectedState.sleep === "น้อย" || (appState.energyCauses || []).includes("sleep_low"),
  waterMl = appState.waterMl || 0
} = {}) {
  const baseTarget = getHydrationBaseTarget();
  const loadAdjustment = getHydrationAdjustmentFromLoad({ activities, loadScore, energy, mind, sleepLow });
  const hasHighCaffeine = drinkScores.caffeineScore >= 5;
  let cueKey = hasHighCaffeine && loadAdjustment.adjustment === 0 ? "Caffeine" : loadAdjustment.cueKey;
  if (waterMl >= 4000) {
    cueKey = "HighWater";
  } else if (loadAdjustment.hasLongRun && waterMl >= 3000) {
    cueKey = "LongRunGoodZone";
  } else if (loadAdjustment.category === "activityRecovery" && !loadAdjustment.hasLongRun) {
    cueKey = "ActivityRecovery";
  }

  return {
    baseTarget,
    adjustment: loadAdjustment.adjustment,
    rangeMin: loadAdjustment.rangeMin,
    rangeMax: loadAdjustment.rangeMax,
    midpoint: Math.round((loadAdjustment.rangeMin + loadAdjustment.rangeMax) / 2),
    cueKey,
    category: loadAdjustment.category,
    loadTypes: loadAdjustment.loadTypes,
    activityKeys: loadAdjustment.activityKeys,
    hydrationTier: loadAdjustment.tier,
    hasStrongActivity: loadAdjustment.hasStrongActivity,
    hasRecoverySignal: loadAdjustment.hasRecoverySignal,
    hasHighCaffeine,
    hasOutdoorHeat: loadAdjustment.hasOutdoorHeat,
    hasSportSweat: loadAdjustment.hasSportSweat,
    currentWaterMl: waterMl
  };
}

function getHydrationGuidanceText(target = getAdaptiveHydrationTarget()) {
  const targetText = target.rangeMin && target.rangeMax
    ? t("hydrationGuidanceRange", {
      min: target.rangeMin.toLocaleString(translations[currentLanguage].locale),
      max: target.rangeMax.toLocaleString(translations[currentLanguage].locale)
    })
    : t("hydrationGuidanceBase", {
      min: target.baseTarget.toLocaleString(translations[currentLanguage].locale),
      max: (target.baseTarget + 400).toLocaleString(translations[currentLanguage].locale)
    });
  const notes = [targetText, t(`hydrationGuidanceCue${target.cueKey}`)];
  if (target.rangeMax >= 3500 && target.cueKey !== "HighWater") {
    notes.push(t("hydrationGuidanceCueUpperBound"));
  }
  return notes.join(" · ");
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
  const rootNote = getActivitySpecificSummary(signals, { limit: 1 }) || getActivityRootSummary(signals, { limit: 2 });
  const loadTypeNote = rootNote || getLoadTypeReflections(signals, { limit: 2 }).join(" ");

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
  const sleepDetail = getSleepDetailSignal();
  const runDetail = getRunDetailSignal();
  const signals = {
    sleepDetail,
    runDetail,
    hydration: getHydrationSignal(),
    drinkLoad: getDrinkLoadSignal(drinkScores),
    recoveryLoad: getRecoveryLoadSignal(loadScore),
    energySleep: getEnergySleepSignal(loadScore, sleepDetail),
    mindNote: getMindNoteSignal()
  };
  signals.continuity = buildContinuitySignals(signals, getPreviousLogContext(todayIso));
  return signals;
}

function getPreviousLogContext(currentDate = todayIso, dailyLogs = getDailyLog(), limit = 3) {
  const current = normalizeExcelDate(currentDate);
  return (dailyLogs || [])
    .map(normalizeLogRow)
    .filter((row) => row.Date && (!current || row.Date < current))
    .sort((a, b) => String(b.Date).localeCompare(String(a.Date)))
    .slice(0, limit);
}

function buildContinuitySignals(currentSignals, previousRows = []) {
  const rows = (previousRows || []).map(normalizeLogRow).filter((row) => row.Date);
  if (!rows.length) {
    return {
      rows,
      hasPrevious: false,
      note: "",
      sleepDebtHint: false,
      sleepRecoverySupport: false,
      loadStreak: false,
      runRecoveryCarryover: false,
      hydrationShift: "",
      mindCarryover: false,
      mindSoftening: false,
      cognitiveLoadContinuity: false
    };
  }

  const lowishSleepCount = rows.filter(rowHasLowishSleepSignal).length;
  const highLoadCount = rows.filter(isHighLoadRow).length;
  const cognitiveLoadCount = rows.filter(rowHasCognitiveContinuityLoad).length;
  const pressuredMindCount = rows.filter(rowHasPressureMindSignal).length;
  const previousWaterAverage = getAverageNumber(rows.map((row) => Number(row.Water_ml) || 0));
  const currentWater = currentSignals.hydration.waterMl || 0;
  const hydrationShift = previousWaterAverage && currentWater
    ? currentWater - previousWaterAverage
    : 0;

  const sleepDebtHint = lowishSleepCount >= 2 || (lowishSleepCount >= 1 && currentSignals.sleepDetail.low);
  const sleepRecoverySupport = currentSignals.sleepDetail.good && lowishSleepCount >= 1;
  const loadStreak = highLoadCount >= 2;
  const runRecoveryCarryover = rows.slice(0, 1).some(rowHasRunOrSportCarryover)
    && (currentSignals.recoveryLoad.medium
      || currentSignals.recoveryLoad.high
      || currentSignals.recoveryLoad.loadTypes.includes("recovery")
      || currentSignals.recoveryLoad.activityLoadRoots.includes("rest_base")
      || currentSignals.energySleep.sleepLow
      || currentSignals.runDetail.hasRunActivity
      || isRecoveryOnlyReflection(currentSignals));
  const cognitiveLoadContinuity = cognitiveLoadCount >= 2
    || (cognitiveLoadCount >= 1 && getSelectedActivityKeys(currentSignals.recoveryLoad.activities).includes("lightCodingAiAssist"));
  const mindCarryover = pressuredMindCount >= 1
    && (currentSignals.mindNote.pressured || currentSignals.mindNote.worried);
  const mindSoftening = pressuredMindCount >= 1 && currentSignals.mindNote.positive;
  const hydrationShiftKey = hydrationShift >= 700 ? "higher" : hydrationShift <= -700 ? "lower" : "";

  const continuity = {
    rows,
    hasPrevious: true,
    sleepDebtHint,
    sleepRecoverySupport,
    loadStreak,
    runRecoveryCarryover,
    hydrationShift: hydrationShiftKey,
    mindCarryover,
    mindSoftening,
    cognitiveLoadContinuity,
    note: ""
  };
  continuity.note = getContinuityReflectionNote(continuity);
  return continuity;
}

function getContinuityReflectionNote(continuity) {
  if (!continuity?.hasPrevious) return "";
  if (continuity.sleepRecoverySupport) return t("continuity.sleepRecoverySupport");
  if (continuity.runRecoveryCarryover) return t("continuity.runRecoveryCarryover");
  if (continuity.cognitiveLoadContinuity) return t("continuity.cognitiveLoadContinuity");
  if (continuity.sleepDebtHint) return t("continuity.sleepDebtHint");
  if (continuity.mindSoftening) return t("continuity.mindSoftening");
  if (continuity.mindCarryover) return t("continuity.mindCarryover");
  if (continuity.loadStreak) return t("continuity.loadStreak");
  if (continuity.hydrationShift === "higher") return t("continuity.hydrationHigher");
  if (continuity.hydrationShift === "lower") return t("continuity.hydrationLower");
  return "";
}

function getAverageNumber(values = []) {
  const cleanValues = values.filter((value) => Number.isFinite(value) && value > 0);
  if (!cleanValues.length) return 0;
  return cleanValues.reduce((sum, value) => sum + value, 0) / cleanValues.length;
}

function rowHasLowishSleepSignal(row) {
  const sleepHours = normalizeSleepHours(row?.Sleep_Hours);
  if (sleepHours !== "") return sleepHours < 6;
  return rowHasLowSleepSignal(row);
}

function rowHasCognitiveContinuityLoad(row) {
  return getRowActivityKeys(row).some((key) => ["deepWork", "lightCodingAiAssist", "marketWatch"].includes(key));
}

function rowHasRunOrSportCarryover(row) {
  const runDetail = normalizeRunDetail(row?.Run_Detail_JSON);
  return Boolean(runDetail.type || hasMeaningfulRunDetail(runDetail))
    || getRowActivityKeys(row).some((key) => ["easyRun", "shortQualityRun", "longRun", "badminton", "heavyPingPong"].includes(key));
}

function rowHasPressureMindSignal(row) {
  const values = [
    row?.Mind,
    row?.Mind_Note_Feeling,
    row?.Mind_Note_Text
  ].map((value) => String(value || "").toLowerCase());
  return values.some((value) => [
    "หนักมาก",
    "ไม่สบายใจ",
    "กังวล",
    "กดดัน",
    "ฟุ้ง",
    "very heavy",
    "uneasy",
    "worried",
    "pressured",
    "scattered",
    "很沉重",
    "不安",
    "担心",
    "有压力",
    "分散"
  ].some((token) => value.includes(token.toLowerCase())));
}

function getRowActivityKeys(row) {
  return splitLogValues(row?.Activities)
    .map(getActivityOptionByValue)
    .filter(Boolean)
    .map((activity) => activity.key);
}

function getSleepDetailSignal() {
  const hours = normalizeSleepHours(appState.sleepHours);
  const hasHours = hours !== "";
  const category = hasHours ? deriveSleepCategory(hours) : (appState.selectedState.sleep || "");
  return {
    hours,
    hasHours,
    category,
    low: hasHours ? hours < 5 : category === "น้อย",
    okay: hasHours ? hours >= 5 && hours < 7 : category === "พอใช้",
    good: hasHours ? hours >= 7 : category === "ดี",
    note: getSleepDetailReflectionNote(hours)
  };
}

function getSleepDetailReflectionNote(hours) {
  if (hours === "") return "";
  const label = formatNumberForLocale(hours);
  if (hours < 5) return t("reflectionInputIntegration.sleepLowHours", { hours: label });
  if (hours < 7) return t("reflectionInputIntegration.sleepOkayHours", { hours: label });
  return t("reflectionInputIntegration.sleepGoodHours", { hours: label });
}

function getRunDetailSignal() {
  const detail = normalizeRunDetail(appState.runDetail);
  const activityKeys = getSelectedActivityKeys(appState.activities || []);
  const selectedRunType = runningActivityPriority.find((key) => activityKeys.includes(key)) || "";
  const type = selectedRunType || (runningActivityKeys.includes(detail.type) ? detail.type : "");
  const hasRunActivity = Boolean(selectedRunType);
  const hasDetail = hasMeaningfulRunDetail(detail);
  const sweatHigh = ["medium", "high"].includes(detail.sweat);
  return {
    ...detail,
    type,
    hasRunActivity,
    hasDetail,
    sweatHigh,
    isEasyRun: type === "easyRun",
    isShortQualityRun: type === "shortQualityRun",
    isLongRun: type === "longRun",
    note: getRunDetailReflectionNote({ ...detail, type, hasRunActivity }),
    sweatNote: getRunSweatReflectionNote(detail)
  };
}

function getRunDetailReflectionNote(detail = {}) {
  if (!detail.hasRunActivity && !detail.type) return "";
  const distance = detail.distanceKm !== "" ? `${formatNumberForLocale(detail.distanceKm)} km` : "";
  const duration = detail.durationMin !== "" ? formatRunDuration(detail.durationMin) : "";
  if (detail.type === "longRun" && (distance || duration)) {
    return t("reflectionInputIntegration.longRun", {
      distance,
      duration
    }).replace(/\s+/g, " ").trim();
  }
  if (detail.type === "longRun") return t("activityRootReflection.sport_sweat");
  if (detail.type === "shortQualityRun") return t("reflectionInputIntegration.shortQualityRun");
  if (detail.type === "easyRun") return t("reflectionInputIntegration.easyRun");
  return t("reflectionInputIntegration.runGeneric");
}

function getRunSweatReflectionNote(detail = {}) {
  if (!detail.sweat) return "";
  return t("reflectionInputIntegration.runSweat", {
    sweat: t(`runSweat${detail.sweat[0].toUpperCase()}${detail.sweat.slice(1)}`)
  });
}

function getHydrationSignal() {
  const waterMl = appState.waterMl || 0;
  const adaptiveTarget = getAdaptiveHydrationTarget();
  const belowAdaptiveRange = adaptiveTarget.hasStrongActivity
    && adaptiveTarget.adjustment > 0
    && waterMl < adaptiveTarget.rangeMin
    && !(adaptiveTarget.hydrationTier === "long_run_heavy_sweat" && waterMl >= 3000);
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
    belowAdaptiveRange
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

function getDrinkReflectionNote(signals) {
  const drinkLoad = signals?.drinkLoad;
  if (!drinkLoad || drinkLoad.noExtraDrinks) return "";

  const hasSweetnessContext = drinkLoad.sugarHigh
    || drinkLoad.sweetDrinksCount >= 1
    || drinkLoad.sweetnessInsight?.detailRelevant;
  const hasCaffeineContext = drinkLoad.caffeineHigh || drinkLoad.hasCaffeine;
  const waterNeedsBase = signals.hydration?.low || signals.hydration?.rising;
  const waterIsBase = signals.hydration?.steady || signals.hydration?.enough;

  if (waterNeedsBase && hasCaffeineContext) return t("drinkReflection.hydrationCaffeine");
  if (drinkLoad.caffeineHigh && hasSweetnessContext) return t("drinkReflection.context");
  if (hasSweetnessContext && waterIsBase) return t("drinkReflection.balanced");
  if (hasSweetnessContext) return t("drinkReflection.sweetSignal");
  if (drinkLoad.caffeineHigh) return t("drinkReflection.caffeine");
  return "";
}

function collectReflectionInputAnchors(signals) {
  const anchors = [];
  const water = Number(signals.hydration?.waterMl || 0);

  if (water > 0) {
    const waterText = water.toLocaleString(translations[currentLanguage].locale);
    const waterIsLow = signals.hydration.low || signals.hydration.rising;
    anchors.push({
      key: "water",
      type: "hydration",
      priority: waterIsLow ? 72 : 48,
      text: t(waterIsLow ? "inputGroundedComposer.waterLow" : "inputGroundedComposer.waterBase", { water: waterText }),
      intents: waterIsLow ? ["restore_baseline"] : ["soft_continue"]
    });
  }

  if (signals.sleepDetail?.hasHours) {
    anchors.push({
      key: "sleep",
      type: "sleep",
      priority: signals.sleepDetail.low ? 96 : signals.sleepDetail.okay ? 78 : 54,
      text: t("inputGroundedComposer.sleepHours", { hours: formatNumberForLocale(signals.sleepDetail.hours) }),
      intents: signals.sleepDetail.low ? ["pause_not_push", "restore_baseline"] : ["soft_continue"]
    });
  }

  const drinkAnchor = getDrinkInputAnchor(signals);
  if (drinkAnchor) anchors.push(drinkAnchor);

  const runAnchor = getRunInputAnchor(signals);
  if (runAnchor) anchors.push(runAnchor);

  const activityAnchor = getActivityInputAnchor(signals);
  if (activityAnchor) anchors.push(activityAnchor);

  const mindAnchors = getMindInputAnchors(signals);
  anchors.push(...mindAnchors);

  if (signals.continuity?.note) {
    anchors.push({
      key: "continuity",
      type: "continuity",
      priority: 44,
      text: t("inputGroundedComposer.continuity"),
      intents: ["notice_pattern"]
    });
  }

  return anchors;
}

function getDrinkInputAnchor(signals) {
  const drinkLoad = signals.drinkLoad;
  if (!drinkLoad || drinkLoad.noExtraDrinks) return null;
  const hasSweetnessContext = drinkLoad.sugarHigh
    || drinkLoad.sweetDrinksCount >= 1
    || drinkLoad.sweetnessInsight?.detailRelevant;
  const hasCaffeineContext = drinkLoad.caffeineHigh || drinkLoad.hasCaffeine;
  const waterNeedsBase = signals.hydration?.low || signals.hydration?.rising;
  const waterIsBase = signals.hydration?.steady || signals.hydration?.enough;

  let textKey = "inputGroundedComposer.drinkContext";
  if (hasSweetnessContext && !hasCaffeineContext) textKey = "inputGroundedComposer.drinkSweetness";
  if (hasCaffeineContext && !hasSweetnessContext) textKey = "inputGroundedComposer.drinkCaffeine";

  return {
    key: "drink",
    type: "drink",
    priority: waterNeedsBase && hasCaffeineContext ? 88 : hasSweetnessContext && waterIsBase ? 68 : 74,
    text: t(textKey),
    intents: [
      waterNeedsBase ? "restore_baseline" : "",
      hasSweetnessContext ? "reduce_guilt" : "",
      hasCaffeineContext ? "notice_pattern" : ""
    ].filter(Boolean)
  };
}

function getRunInputAnchor(signals) {
  if (!signals.runDetail?.hasRunActivity) return null;
  const parts = [];
  const typeLabel = signals.runDetail.type
    ? t(`options.activities.${signals.runDetail.type}`)
    : t("runDetailTitle");
  parts.push(typeLabel);
  if (signals.runDetail.distanceKm !== "") parts.push(`${formatNumberForLocale(signals.runDetail.distanceKm)} km`);
  if (signals.runDetail.durationMin !== "") parts.push(formatRunDuration(signals.runDetail.durationMin));
  if (signals.runDetail.sweat) parts.push(t(`runSweat${signals.runDetail.sweat[0].toUpperCase()}${signals.runDetail.sweat.slice(1)}`));

  return {
    key: "run",
    type: "run",
    priority: signals.runDetail.isLongRun ? 92 : signals.runDetail.isShortQualityRun ? 84 : 68,
    text: t("inputGroundedComposer.run", { run: parts.filter(Boolean).join(" / ") }),
    intents: ["pause_not_push", "restore_baseline"]
  };
}

function getActivityInputAnchor(signals) {
  if (signals.runDetail?.hasRunActivity) return null;
  const selectedActivityKey = getSelectedActivityKeys(signals.recoveryLoad.activities)[0];
  if (!selectedActivityKey) return null;
  const option = activityOptions.find((activity) => activity.key === selectedActivityKey);
  if (!option) return null;
  const isRecovery = signals.recoveryLoad.activityLoadRoots.includes("rest_base");
  const isHighLoad = signals.recoveryLoad.high || ["deepWork", "marketWatch", "lightCodingAiAssist"].includes(selectedActivityKey);

  return {
    key: `activity:${selectedActivityKey}`,
    type: "activity",
    priority: isHighLoad ? 76 : isRecovery ? 62 : 58,
    text: t("inputGroundedComposer.activity", { activity: t(`options.activities.${option.key}`) }),
    intents: isHighLoad ? ["pause_not_push"] : isRecovery ? ["restore_baseline"] : ["notice_pattern"]
  };
}

function getMindInputAnchors(signals) {
  const anchors = [];
  if (signals.mindNote.feeling) {
    anchors.push({
      key: "mindFeeling",
      type: "mind",
      priority: signals.mindNote.pressured || signals.mindNote.worried || signals.mindNote.uneasy ? 82 : 52,
      text: t("inputGroundedComposer.mindFeeling", {
        feeling: localizeMindNoteValue("Mind_Note_Feeling", signals.mindNote.feeling)
      }),
      intents: signals.mindNote.pressured || signals.mindNote.worried || signals.mindNote.uneasy
        ? ["reduce_guilt", "protect_agency"]
        : ["soft_continue"]
    });
  }
  if (signals.mindNote.support) {
    anchors.push({
      key: "mindSupport",
      type: "mind",
      priority: signals.mindNote.restFirst ? 86 : 66,
      text: t("inputGroundedComposer.mindSupport", {
        support: localizeMindNoteValue("Mind_Note_Support", signals.mindNote.support)
      }),
      intents: signals.mindNote.restFirst ? ["pause_not_push", "protect_agency"] : ["restore_baseline"]
    });
  }
  if (signals.mindNote.text?.trim()) {
    anchors.push({
      key: "mindText",
      type: "mind",
      priority: 64,
      text: t("inputGroundedComposer.mindText", {
        note: truncateText(signals.mindNote.text, 48)
      }),
      intents: ["protect_agency", "notice_pattern"]
    });
  }
  return anchors;
}

function rankReflectionAnchors(anchors, signals) {
  const uniqueAnchors = [];
  const seenTypes = new Set();
  const sortedAnchors = [...(anchors || [])].sort((a, b) => b.priority - a.priority);

  sortedAnchors.forEach((anchor) => {
    const uniquenessKey = anchor.type === "mind" ? anchor.key : anchor.type;
    if (seenTypes.has(uniquenessKey)) return;
    seenTypes.add(uniquenessKey);
    uniqueAnchors.push(anchor);
  });

  const limit = hasMeaningfulTodayInput() && (signals.hydration?.waterMl || signals.drinkLoad?.profiles?.length || signals.recoveryLoad?.activities?.length)
    ? 4
    : 3;
  return uniqueAnchors.slice(0, limit);
}

function deriveReflectionIntent(anchors, signals) {
  const intentScores = {
    restore_baseline: 0,
    reduce_guilt: 0,
    notice_pattern: 0,
    protect_agency: 0,
    pause_not_push: 0,
    soft_continue: 0
  };

  (anchors || []).forEach((anchor) => {
    (anchor.intents || []).forEach((intent) => {
      intentScores[intent] += 1;
    });
  });

  if (signals.energySleep?.endorphinBlindSpot || signals.recoveryLoad?.high || signals.sleepDetail?.low) intentScores.pause_not_push += 2;
  if (signals.drinkLoad?.sweetDrinksCount >= 1 || signals.mindNote?.pressured) intentScores.reduce_guilt += 1;
  if (signals.hydration?.low || signals.hydration?.rising || signals.drinkLoad?.hasCaffeine) intentScores.restore_baseline += 1;
  if (signals.continuity?.note) intentScores.notice_pattern += 1;
  if (signals.mindNote?.positive || signals.sleepDetail?.good) intentScores.soft_continue += 1;

  const priority = ["pause_not_push", "reduce_guilt", "restore_baseline", "protect_agency", "notice_pattern", "soft_continue"];
  const primary = priority.sort((a, b) => intentScores[b] - intentScores[a])[0] || "notice_pattern";
  const secondary = priority.find((intent) => intent !== primary && intentScores[intent] > 0) || "";
  return { primary, secondary, scores: intentScores };
}

function composeInputGroundedReflection({ anchors = [], intent, signals, omitReading = false } = {}) {
  if (!hasMeaningfulTodayInput()) return t("inputGroundedComposer.fallback");
  const rankedAnchors = rankReflectionAnchors(anchors.length ? anchors : collectReflectionInputAnchors(signals), signals);
  if (!rankedAnchors.length) return t("inputGroundedComposer.fallback");
  const derivedIntent = intent || deriveReflectionIntent(rankedAnchors, signals);
  const anchorText = joinReflectionAnchorsNaturally(rankedAnchors, currentLanguage);
  const readingText = getInputGroundedReadingSentence(derivedIntent.primary);
  const composedText = smoothReflectionConnectors(omitReading ? anchorText : `${anchorText}\n\n${readingText}`);
  return applyNuTuenSaiOverviewVoice(composedText, { anchors: rankedAnchors, intent: derivedIntent, signals });
}

function getInputGroundedReflectionContext(signals, options = {}) {
  const anchors = collectReflectionInputAnchors(signals);
  const rankedAnchors = rankReflectionAnchors(anchors, signals);
  const intent = deriveReflectionIntent(rankedAnchors, signals);
  const text = composeInputGroundedReflection({
    anchors: rankedAnchors,
    intent,
    signals,
    omitReading: Boolean(options.omitReading)
  });
  return { anchors: rankedAnchors, intent, signals, text };
}

function getCurrentDayReflectionAnchors(signals) {
  return collectReflectionInputAnchors(signals)
    .filter((anchor) => anchor.type !== "continuity");
}

function isLowDataReflectionCase(signals, anchors = getCurrentDayReflectionAnchors(signals)) {
  if (!hasMeaningfulTodayInput()) return true;
  if (anchors.length <= 1) return true;
  const onlyHydration = anchors.length === 1 && anchors[0]?.type === "hydration";
  const onlyMindLite = anchors.length === 1
    && anchors[0]?.type === "mind"
    && !String(signals.mindNote?.text || "").trim();
  return onlyHydration || onlyMindLite;
}

function buildLowDataNuTuenSaiReflection(signals) {
  const currentAnchors = getCurrentDayReflectionAnchors(signals);
  if (!hasMeaningfulTodayInput()) {
    const previousCue = getPreviousLogContinuityCue(signals.continuity?.rows || []);
    return signals.continuity?.hasPrevious
      ? t(`lowDataReflection.${previousCue.key}`)
      : t("lowDataReflection.noData");
  }
  if (isLowDataReflectionCase(signals, currentAnchors)) {
    return t("lowDataReflection.thinData");
  }
  return "";
}

function getPreviousLogContinuityCue(previousRows = []) {
  const rows = (previousRows || []).map(normalizeLogRow).filter((row) => row.Date);
  if (!rows.length) return { key: "previousOnly", type: "none" };
  if (rows.some((row) => isHighLoadRow(row) || rowHasRunOrSportCarryover(row))) {
    return { key: "previousLoad", type: "load" };
  }
  if (rows.some(rowHasLowOrModerateWaterCue)) {
    return { key: "previousWater", type: "water" };
  }
  if (rows.some(rowHasLowishSleepSignal)) {
    return { key: "previousSleep", type: "sleep" };
  }
  if (rows.some(rowHasStructuredMindPressureCue)) {
    return { key: "previousMind", type: "mind" };
  }
  if (rows.some(rowHasDrinkLoadCue)) {
    return { key: "previousDrink", type: "drink" };
  }
  return { key: "previousGeneric", type: "generic" };
}

function rowHasLowOrModerateWaterCue(row) {
  const water = Number(row?.Water_ml) || 0;
  return water > 0 && water <= 1500;
}

function rowHasStructuredMindPressureCue(row) {
  const values = [
    row?.Mind,
    row?.Mind_Note_Feeling,
    row?.Mind_Note_Support
  ].map((value) => String(value || "").toLowerCase());
  return values.some((value) => [
    "หนักมาก",
    "ไม่สบายใจ",
    "กังวล",
    "กดดัน",
    "ฟุ้ง",
    "very heavy",
    "uneasy",
    "worried",
    "pressured",
    "scattered",
    "uneasy",
    "reduce_pressure",
    "rest_first",
    "担心",
    "很沉重",
    "不安",
    "有压力",
    "分散"
  ].some((token) => value.includes(token.toLowerCase())));
}

function rowHasDrinkLoadCue(row) {
  return Number(row?.Caffeine_Score) >= 5
    || Number(row?.Sugar_Score) >= 5
    || Number(row?.Sweet_Drinks_Count) > 0;
}

function getInputGroundedReflectionBlock(signals, options = {}) {
  const context = getInputGroundedReflectionContext(signals, {
    omitReading: shouldOmitInputGroundedReadingForRecovery(signals)
  });
  if (!options.withMarkers) return context.text;
  const markers = selectReflectionBreathingMarkers({
    anchors: context.anchors,
    intent: context.intent,
    signals,
    compact: Boolean(options.compact)
  });
  return applyReflectionBreathingMarkers(context.text, markers, { compact: Boolean(options.compact) });
}

function shouldOmitInputGroundedReadingForRecovery(signals) {
  return currentLanguage === "en"
    && Boolean(getMergedRecoveryReflectionCue(signals));
}

function selectReflectionBreathingMarkers({ anchors = [], intent = {}, signals, compact = false } = {}) {
  const markers = [];
  const hasAnchorType = (type) => anchors.some((anchor) => anchor.type === type);
  const hasAnchorKey = (key) => anchors.some((anchor) => anchor.key === key || anchor.key?.startsWith(`${key}:`));
  const addMarker = (emoji, reason) => {
    if (!emoji || markers.some((marker) => marker.emoji === emoji)) return;
    markers.push({ emoji, reason });
  };

  if (["reduce_guilt", "protect_agency"].includes(intent.primary) || hasAnchorType("mind")) {
    addMarker("🩵", "agency");
  }

  const drinkIsCentral = hasAnchorType("drink");
  const hydrationIsCentral = hasAnchorType("hydration");
  if (hydrationIsCentral || (drinkIsCentral && (signals.hydration?.low || signals.hydration?.rising))) {
    addMarker("💧", "hydration");
  } else if (drinkIsCentral && signals.drinkLoad?.hasCaffeine) {
    addMarker("☕", "drink");
  }

  if (hasAnchorType("sleep") || signals.sleepDetail?.low || signals.mindNote?.restFirst) {
    addMarker("🌙", "recovery");
  }

  if ((hasAnchorType("run") || hasAnchorKey("activity")) && markers.length < 2) {
    addMarker("👣", "activity");
  }

  if (!compact && markers.length < 3 && ["restore_baseline", "soft_continue", "notice_pattern"].includes(intent.primary)) {
    addMarker("🌱", "return");
  }

  const maxMarkers = compact ? 1 : 2;
  return markers.slice(0, maxMarkers);
}

function applyReflectionBreathingMarkers(textOrBlocks, markers = [], context = {}) {
  if (!markers.length) return textOrBlocks;
  if (typeof textOrBlocks === "string") {
    return appendSoftMarker(textOrBlocks, markers[0]?.emoji);
  }

  const blocks = (textOrBlocks || []).map((block) => (
    typeof block === "string" ? { key: "", text: block } : { ...block }
  ));
  const used = new Set();
  const preferredTargets = {
    agency: ["overview", "mindNote", "mindHolding"],
    hydration: ["hydration", "adjustment", "overview"],
    drink: ["adjustment", "hydration", "overview"],
    recovery: ["recovery", "overview", "adjustment"],
    activity: ["recovery", "adjustment", "overview"],
    return: ["tomorrow", "closing2", "overview"]
  };

  markers.forEach((marker) => {
    const targets = preferredTargets[marker.reason] || ["overview"];
    const target = blocks.find((block) => targets.includes(block.key) && block.text && !used.has(block.key));
    if (!target) return;
    target.text = appendSoftMarker(target.text, marker.emoji);
    used.add(target.key);
  });

  return blocks.map((block) => block.text);
}

function appendSoftMarker(text, marker) {
  if (!text || !marker) return text;
  if (/[🩵💧☕🌙🌱👣]\s*$/.test(text)) return text;
  return `${text} ${marker}`;
}

function applyNuTuenSaiOverviewVoice(text, context = {}) {
  if (currentLanguage !== "th" || !text || text.includes("หนู")) return text;
  if (!shouldUseNuTuenSaiVoiceSlot(context, "overview")) return text;

  const variant = getNuTuenSaiVoiceVariant(context, 2);
  const replacement = variant === 0
    ? "วันนี้หนูอ่านได้ว่า"
    : "จากสัญญาณวันนี้ หนูอ่านได้ว่า";

  return String(text)
    .replace("วันนี้จึงอาจอ่านได้ว่า", replacement)
    .replace("จากสัญญาณที่กรอกวันนี้ ระบบอ่านเป็น", "จากสัญญาณที่กรอกวันนี้ หนูอ่านเป็น");
}

function applyNuTuenSaiReflectionVoice(blocks = [], context = {}) {
  if (currentLanguage !== "th") return blocks;

  const softenedBlocks = blocks.map((block) => ({
    ...block,
    text: softenNuTuenSaiReportLanguage(block.text, block.key)
  }));
  const voiceState = createNuTuenSaiVoiceState(softenedBlocks);
  const maxPolite = softenedBlocks.filter((block) => String(block.text || "").trim()).length > 7 ? 3 : 2;
  const targets = getNuTuenSaiVoiceTargets(context);
  let voicedBlocks = softenedBlocks;

  targets.forEach((targetKey) => {
    if (voiceState.polite >= maxPolite) return;
    voicedBlocks = voicedBlocks.map((block) => {
      if (block.key !== targetKey || !canApplyNuTuenSaiLineVoice(block, voiceState)) return block;
      const voicedText = addNuTuenSaiPoliteCadence(block.text, block.key, context);
      updateNuTuenSaiVoiceState(voiceState, voicedText, block.text, block.key);
      return { ...block, text: voicedText };
    });
  });

  return voicedBlocks;
}

function shouldUseNuTuenSaiVoiceSlot(context = {}, slot = "overview") {
  if (currentLanguage !== "th") return false;
  if (slot === "overview" && context.signals?.mindNote?.uneasy) return false;
  return true;
}

function getNuTuenSaiVoiceVariant(context = {}, modulo = 2) {
  const anchorScore = (context.anchors || []).reduce((sum, anchor) => sum + String(anchor.key || anchor.type || "").length, 0);
  const intentScore = String(context.intent?.primary || "").length;
  const dateScore = String(appState.date || todayIso).split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return Math.abs(anchorScore + intentScore + dateScore) % modulo;
}

function softenNuTuenSaiReportLanguage(text, role = "") {
  if (currentLanguage !== "th" || !text) return text;
  return String(text)
    .replace(/ระบบอ่านเป็นจุดเริ่มต้นเบา ๆ/g, "ยังเป็นจุดเริ่มต้นเล็ก ๆ")
    .replace(/ระบบอ่านเป็น/g, "วันนี้อ่านเป็น")
    .replace(/ควรถูกอ่านผ่าน/g, "อาจเหมาะกับการมองผ่าน")
    .replace(/support signal/g, "สัญญาณพยุงเล็ก ๆ")
    .replace(/context ต่อเนื่อง/g, "การคุมบริบทต่อเนื่อง")
    .replace(/เพิ่ม output/g, "เร่งผลลัพธ์")
    .replace(/การเพิ่ม output/g, "การเร่งผลลัพธ์")
    .replace(/ output/g, " ผลลัพธ์");
}

function createNuTuenSaiVoiceState(blocks = []) {
  const text = blocks.map((block) => block.text || "").join("\n");
  return {
    noo: countTextOccurrences(text, "หนู"),
    polite: countThaiPoliteCadence(text),
    lastVoiceTarget: ""
  };
}

function countTextOccurrences(text, pattern) {
  return (String(text || "").match(new RegExp(pattern, "g")) || []).length;
}

function countThaiPoliteCadence(text) {
  return countTextOccurrences(text, "ค่ะ") + countTextOccurrences(text, "นะคะ");
}

function getNuTuenSaiVoiceTargets(context = {}) {
  const targets = [];
  const hasAnchorType = (type) => (context.anchors || []).some((anchor) => anchor.type === type);
  if (context.signals?.hydration?.low || context.signals?.hydration?.rising || hasAnchorType("hydration")) {
    targets.push("hydration");
  }
  if (context.signals?.recoveryLoad?.high || context.signals?.sleepDetail?.low || hasAnchorType("run") || hasAnchorType("activity")) {
    targets.push("recovery");
  }
  if (String(context.signals?.mindNote?.text || "").trim() || context.signals?.mindNote?.pressured || hasAnchorType("mind")) {
    targets.push("mindNote");
  }
  targets.push("adjustment", "closing2");
  return unique(targets).slice(0, 4);
}

function canApplyNuTuenSaiLineVoice(block, voiceState) {
  if (!block?.text || block.key === "overview" || block.key === "spacer") return false;
  if (voiceState.lastVoiceTarget === block.key) return false;
  return !/ค่ะ|นะคะ/.test(block.text);
}

function addNuTuenSaiPoliteCadence(text, role = "", context = {}) {
  const cleanText = String(text || "").trim();
  if (!cleanText || /ค่ะ|นะคะ/.test(cleanText)) return text;
  if (/นะ$/.test(cleanText)) return `${cleanText}คะ`;
  if (/ก็พอ$/.test(cleanText)) return `${cleanText}ค่ะ`;

  if (role === "adjustment") {
    if (/ลอง|ถ้าจะปรับ|จิบ|พักตา|ลด/.test(cleanText)) return `${cleanText}ก็พอค่ะ`;
    return `${cleanText}${["pause_not_push", "reduce_guilt", "protect_agency"].includes(context.intent?.primary) ? "นะคะ" : "ค่ะ"}`;
  }
  if (role === "mindNote") return `${cleanText}นะคะ`;
  if (role === "closing2") {
    return `${cleanText}${["pause_not_push", "reduce_guilt", "protect_agency"].includes(context.intent?.primary) ? "นะคะ" : "ค่ะ"}`;
  }
  return `${cleanText}ค่ะ`;
}

function updateNuTuenSaiVoiceState(voiceState, nextText, previousText = "", role = "") {
  voiceState.noo += Math.max(0, countTextOccurrences(nextText, "หนู") - countTextOccurrences(previousText, "หนู"));
  voiceState.polite += Math.max(0, countThaiPoliteCadence(nextText) - countThaiPoliteCadence(previousText));
  voiceState.lastVoiceTarget = role;
}

function joinReflectionAnchorsNaturally(anchors = [], lang = currentLanguage) {
  const phrases = anchors.map((anchor) => anchor.text).filter(Boolean);
  if (!phrases.length) return "";
  if (phrases.length === 1) {
    if (lang === "en") return `Today includes ${formatEnglishAnchorPhrase(phrases[0])}.`;
    return smoothReflectionConnectors(phrases[0]);
  }

  if (lang === "en") return joinEnglishReflectionAnchors(phrases);
  if (lang === "zh") return joinChineseReflectionAnchors(phrases);
  return joinThaiReflectionAnchors(phrases);
}

function joinThaiReflectionAnchors(phrases) {
  const leadPhrases = phrases.map(formatThaiLeadAnchor);
  const secondaryPhrases = phrases.map(formatThaiSecondaryAnchor);
  if (phrases.length === 2) {
    return `จากวันนี้${leadPhrases[0]} และ${leadPhrases[1]}`;
  }
  if (phrases.length === 3) {
    return [
      `จากวันนี้${leadPhrases[0]} และ${leadPhrases[1]}`,
      `ส่วน${secondaryPhrases[2]}`
    ].join("\n\n");
  }
  return [
    `จากวันนี้${leadPhrases[0]} และ${leadPhrases[1]}`,
    `อีกบริบทหนึ่งคือ${secondaryPhrases[2]} ส่วน${secondaryPhrases[3]}`
  ].join("\n\n");
}

function joinEnglishReflectionAnchors(phrases) {
  const cleanPhrases = phrases.map(formatEnglishAnchorPhrase);
  if (phrases.length === 2) return `Today includes ${cleanPhrases[0]} and ${cleanPhrases[1]}.`;
  if (phrases.length === 3) {
    return [
      `Today includes ${cleanPhrases[0]} and ${cleanPhrases[1]}.`,
      `Another signal is ${cleanPhrases[2]}.`
    ].join("\n\n");
  }
  return [
    `Today includes ${cleanPhrases[0]} and ${cleanPhrases[1]}.`,
    `Other signals include ${cleanPhrases[2]} and ${cleanPhrases[3]}.`
  ].join("\n\n");
}

function joinChineseReflectionAnchors(phrases) {
  const cleanPhrases = phrases.map(formatChineseAnchorPhrase);
  if (phrases.length === 2) return `今天可以先看见：${cleanPhrases[0]}，也有${cleanPhrases[1]}。`;
  if (phrases.length === 3) {
    return [
      `今天可以先看见：${cleanPhrases[0]}，也有${cleanPhrases[1]}。`,
      `${cleanPhrases[2]}也是今天的一个 context。`
    ].join("\n\n");
  }
  return [
    `今天可以先看见：${cleanPhrases[0]}，也有${cleanPhrases[1]}。`,
    `${cleanPhrases[2]}也是一个 context；同时${cleanPhrases[3]}。`
  ].join("\n\n");
}

function getInputGroundedReadingSentence(intentKey) {
  const readingSentences = {
    th: {
      restore_baseline: "วันนี้จึงอาจอ่านได้ว่าเป็นวันที่ค่อย ๆ กลับมาดูแลจังหวะพื้นฐาน มากกว่าต้องเร่งชดเชยอะไรทันที",
      reduce_guilt: "วันนี้จึงอาจอ่านได้ว่าไม่ใช่วันที่ต้องโทษตัวเอง แต่เป็นวันที่เห็น pattern แล้วค่อย ๆ กลับมาดูแลฐานเดิม",
      notice_pattern: "วันนี้จึงอาจอ่านได้ว่าเป็น pattern เล็ก ๆ ให้สังเกต ไม่ใช่ข้อสรุปใหญ่เกี่ยวกับตัวเอง",
      protect_agency: "วันนี้จึงอาจอ่านได้ว่าเป็นข้อมูลให้เลือกจังหวะที่พอดี โดยผู้ใช้ยังเป็นคนตัดสินความหมายของวัน",
      pause_not_push: "วันนี้จึงอาจอ่านได้ว่า recovery และการไม่เร่งเพิ่มคือจังหวะที่เหมาะกว่า push ต่อ",
      soft_continue: "วันนี้จึงอาจอ่านได้ว่าเป็นจังหวะที่ค่อย ๆ ต่อเนื่องได้ โดยไม่ต้องทำให้ทุกอย่างสมบูรณ์แบบ"
    },
    en: {
      restore_baseline: "Today may be better read as a gentle return-to-baseline day rather than something to quickly correct.",
      reduce_guilt: "Today does not need to become self-blame; it can simply be a pattern to notice and return from gently.",
      notice_pattern: "Today may be read as a small pattern signal, not a large conclusion about yourself.",
      protect_agency: "The data can support a clearer choice of rhythm while the meaning of the day stays with you.",
      pause_not_push: "Recovery and not pushing more may fit the day better than adding output.",
      soft_continue: "Today can continue gently without needing every signal to be perfect."
    },
    zh: {
      restore_baseline: "今天更适合慢慢回到基础节奏，而不是急着修正。",
      reduce_guilt: "今天不需要变成自责，只是一个可以看见并温和回来的 pattern。",
      notice_pattern: "今天更像一个小小的 pattern 信号，不是关于自己的大结论。",
      protect_agency: "这些资料可以帮助选择合适节奏，但今天的意义仍然由你来决定。",
      pause_not_push: "recovery 和不继续 push 可能比增加 output 更适合今天。",
      soft_continue: "今天可以温和地继续，不需要每个信号都完美。"
    }
  };
  return readingSentences[currentLanguage]?.[intentKey] || readingSentences[currentLanguage]?.notice_pattern || "";
}

function stripTodayPrefix(value) {
  return String(value || "")
    .trim()
    .replace(/^จากวันนี้\s*/, "")
    .replace(/^วันนี้\s*/, "");
}

function formatThaiLeadAnchor(value) {
  const text = stripTodayPrefix(value);
  if (!text) return "";
  if (text.startsWith("มี") || text.startsWith("นอน") || text.startsWith("น้ำ")) return text;
  return `มี${text}`;
}

function formatThaiSecondaryAnchor(value) {
  return stripTodayPrefix(value).replace(/^มี\s*/, "");
}

function formatEnglishAnchorPhrase(value) {
  return String(value || "")
    .trim()
    .replace(/^water is around /i, "water around ")
    .replace(/^sleep was about ([\d.]+) hours/i, "about $1 hours of sleep")
    .replace(/^caffeine was part of the context/i, "caffeine as a body signal")
    .replace(/^caffeine was present today/i, "caffeine as a body signal")
    .replace(/^caffeine or sweetness was part of the drink context/i, "caffeine or sweet drinks as body cues")
    .replace(/^caffeine or sweet drinks were present today/i, "caffeine or sweet drinks as body cues")
    .replace(/^sweetness in drinks was one signal today/i, "sweetness in drinks")
    .replace(/^(.+) was part of today's load$/i, "$1 as part of today's load")
    .replace(/^(.+) was part of the load and recovery context$/i, (_, run) => formatEnglishRunAnchor(run))
    .replace(/^the support need was (.+)$/i, (_, support) => formatEnglishSupportNeedAnchor(support))
    .replace(/^the Mind Note carried a (.+) tone$/i, "a $1 tone in the Mind Note");
}

function formatEnglishRunAnchor(value) {
  const parts = String(value || "")
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);
  const type = parts[0] || "";
  const distance = parts.find((part) => /\bkm\b/i.test(part)) || "";
  const duration = parts.find((part) => /\b(hr|min|hour|minute)\b/i.test(part)) || "";
  const load = parts.find((part) => /^high$/i.test(part)) || "";

  if (/long run/i.test(type)) {
    const loadPrefix = load ? "a high-load long run" : "a long run";
    const distanceText = distance ? ` of ${distance}` : "";
    const durationText = duration ? ` in ${formatEnglishRunDurationPhrase(duration)}` : "";
    return `${loadPrefix}${distanceText}${durationText}`;
  }

  if (/short quality run/i.test(type)) {
    const distanceText = distance ? ` of ${distance}` : "";
    const durationText = duration ? ` in ${formatEnglishRunDurationPhrase(duration)}` : "";
    return `a short quality run${distanceText}${durationText}`;
  }

  return `${parts.join(" / ")} as part of the day's load and recovery picture`;
}

function formatEnglishRunDurationPhrase(value) {
  return String(value || "")
    .trim()
    .replace(/^about\b/i, "around")
    .replace(/\bhr\b/gi, "hour")
    .replace(/\bhrs\b/gi, "hours")
    .replace(/\bmin\b/gi, "minutes");
}

function formatEnglishSupportNeedAnchor(value) {
  const support = String(value || "").trim();
  if (!support) return "a support need";
  if (/^rest first$/i.test(support)) return "a rest-first support need";
  return `a support need of “${support}”`;
}

function formatChineseAnchorPhrase(value) {
  return String(value || "")
    .trim()
    .replace(/^今天/, "");
}

function capitalizeFirstLetter(value) {
  const text = String(value || "").trim();
  return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : "";
}

function smoothReflectionConnectors(text) {
  if (!text) return text;
  return limitRepeatedReflectionTerms(text, currentLanguage)
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function limitRepeatedReflectionTerms(text, lang = currentLanguage) {
  let output = String(text || "");
  if (lang === "th") {
    output = output
      .replace(/(?:\s*ร่วมกับ\s*){2,}/g, " และ")
      .replace(/จาก\s+มี/g, "จากวันนี้มี")
      .replace(/วันนี้\s+วันนี้/g, "วันนี้")
      .replace(/บริบท\s+บริบท/g, "บริบท");
  } else if (lang === "en") {
    output = output
      .replace(/\bwith with\b/gi, "with")
      .replace(/\btoday today\b/gi, "today")
      .replace(/\bcontext context\b/gi, "context");
  } else if (lang === "zh") {
    output = output
      .replace(/今天今天/g, "今天")
      .replace(/context context/g, "context");
  }
  return output;
}

function getRecoveryLoadSignal(loadScore = calculateLoadScore()) {
  const activities = appState.activities || [];
  const loadTypes = getSelectedLoadTypes(activities);
  const activityLoadRoots = getActivityLoadRoots(activities);
  return {
    activities,
    loadTypes,
    activityLoadRoots,
    primaryActivityLoadRoot: getPrimaryActivityLoadRoot(activityLoadRoots),
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

function getActivityLoadRoots(activities = appState.activities || []) {
  const roots = [...new Set(activities
    .map(getActivityOptionByValue)
    .filter(Boolean)
    .map((activity) => activityLoadRootByActivityKey[activity.key])
    .filter(Boolean))];

  if (roots.length > 1 && roots.includes("rest_base")) {
    return roots.filter((root) => root !== "rest_base");
  }

  return roots;
}

function getPrimaryActivityLoadRoot(activityLoadRoots = []) {
  return activityLoadRootPriority.find((root) => activityLoadRoots.includes(root)) || "";
}

function getOrderedActivityLoadRoots(activityLoadRoots = []) {
  return activityLoadRootPriority.filter((root) => activityLoadRoots.includes(root));
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

function getActivityRootReflections(signals = buildSignals(), { includeRecovery = true, limit = 1 } = {}) {
  return getOrderedActivityLoadRoots(signals.recoveryLoad.activityLoadRoots)
    .filter((root) => includeRecovery || (root !== "recovery_low_sleep" && root !== "rest_base"))
    .slice(0, limit)
    .map((root) => t(`activityRootReflection.${root}`));
}

function getActivitySpecificReflections(signals = buildSignals(), { limit = 1 } = {}) {
  const key = getRecoveryModeReflectionKey(signals);
  if (key) return [t(`activitySpecificReflection.${key}`)];

  return getSelectedActivityKeys(signals.recoveryLoad.activities)
    .filter((activityKey) => activitySpecificReflectionKeys.includes(activityKey))
    .slice(0, limit)
    .map((activityKey) => t(`activitySpecificReflection.${activityKey}`));
}

function getActivityRootSummary(signalsOrOptions = buildSignals(), options = {}) {
  const hasRecoveryLoad = Boolean(signalsOrOptions?.recoveryLoad);
  const roots = hasRecoveryLoad
    ? signalsOrOptions.recoveryLoad.activityLoadRoots
    : signalsOrOptions?.roots;
  const summaryOptions = hasRecoveryLoad ? options : { ...(signalsOrOptions || {}), ...options };
  const { includeRecovery = true, limit = 1 } = summaryOptions;
  const orderedRoots = getOrderedActivityLoadRoots(roots || []);
  const effectiveRoots = orderedRoots.length > 1 && orderedRoots.includes("rest_base")
    ? orderedRoots.filter((root) => root !== "rest_base")
    : orderedRoots;

  return effectiveRoots
    .filter((root) => includeRecovery || (root !== "recovery_low_sleep" && root !== "rest_base"))
    .slice(0, limit)
    .map((root) => t(`activityRootSummary.${root}`))
    .join(" ");
}

function getActivitySpecificSummary(signals = buildSignals(), { limit = 1 } = {}) {
  const key = getRecoveryModeReflectionKey(signals);
  if (key) return t(`activitySpecificSummary.${key}`);

  return getSelectedActivityKeys(signals.recoveryLoad.activities)
    .filter((activityKey) => activitySpecificReflectionKeys.includes(activityKey))
    .slice(0, limit)
    .map((activityKey) => t(`activitySpecificSummary.${activityKey}`))
    .join(" ");
}

function getSelectedActivityKeys(activities = appState.activities || []) {
  return activities
    .map(getActivityOptionByValue)
    .filter(Boolean)
    .map((activity) => activity.key);
}

function getRecoveryModeReflectionKey(signals = buildSignals()) {
  const keys = getSelectedActivityKeys(signals.recoveryLoad.activities);
  if (keys.some((key) => activitySpecificReflectionKeys.includes(key))) return "";

  const hasMainLoad = keys.some((key) => {
    if (recoveryModeActivityKeys.includes(key) || key === "lowSleep") return false;
    const root = activityLoadRootByActivityKey[key];
    return root && root !== "rest_base" && root !== "recovery_low_sleep";
  });
  if (hasMainLoad) return "";

  const hasRest = keys.includes("rest");
  const hasLightRecovery = keys.includes("lightRecoveryDay");
  if (signals.energySleep.sleepLow && hasRest) return "lowSleepRest";
  if (signals.energySleep.sleepLow && hasLightRecovery) return "lowSleepLightRecovery";
  if (hasRest) return "rest";
  if (hasLightRecovery) return "lightRecoveryDay";
  return "";
}

function getLoadTypeReflection(signals = buildSignals()) {
  return getLoadTypeReflections(signals, { limit: 1 })[0] || "";
}

function getActivityRootReflection(signals = buildSignals()) {
  return getActivitySpecificReflections(signals, { limit: 1 })[0]
    || getActivityRootReflections(signals, { limit: 1 })[0]
    || "";
}

function getLoadTypeTomorrowFocus(signals = buildSignals()) {
  const type = getOrderedLoadTypes(signals.recoveryLoad.loadTypes)[0];
  return type ? t(`tomorrowFocusByLoadType.${type}`) : "";
}

function getActivityRootTomorrowFocus(signals = buildSignals()) {
  const activityKey = getSelectedActivityKeys(signals.recoveryLoad.activities)
    .find((key) => activitySpecificReflectionKeys.includes(key));
  if (activityKey) return t(`tomorrowFocusByActivity.${activityKey}`);
  const root = getOrderedActivityLoadRoots(signals.recoveryLoad.activityLoadRoots)[0];
  return root ? t(`tomorrowFocusByActivityRoot.${root}`) : "";
}

function getEnergySleepSignal(loadScore = calculateLoadScore(), sleepDetail = getSleepDetailSignal()) {
  const energy = appState.selectedState.energy;
  const sleep = sleepDetail.category || appState.selectedState.sleep;
  const causes = appState.energyCauses || [];
  const energyCausePattern = getEnergyCausePattern(energy, causes);
  const activityLowSleep = getSelectedActivityKeys(appState.activities).includes("lowSleep");
  const sleepLow = sleepDetail.low || sleep === "น้อย" || causes.includes("sleep_low") || activityLowSleep;
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
  const mind = normalizeMindStateValue(appState.selectedState.mind);
  const feeling = appState.mindNoteFeeling;
  const support = appState.mindNoteSupport;
  const heavy = mind === "หนักมาก";
  const uneasyMind = mind === "ไม่สบายใจ";
  const pressuredMind = mind === "กดดัน";
  const okayEnough = mind === "พอไหว";
  const overallFeelingGood = mind === "รู้สึกดี";
  const noteFeelingGood = feeling === "feeling_good";
  const feelingGood = overallFeelingGood || noteFeelingGood;
  const relaxed = mind === "ผ่อนคลาย";
  return {
    mind,
    text: appState.mindNoteText || "",
    feeling,
    support,
    heavy,
    okayEnough,
    pressured: heavy || pressuredMind || feeling === "pressured",
    doublePressure: pressuredMind && feeling === "pressured",
    worried: uneasyMind || feeling === "worried",
    uneasy: uneasyMind || feeling === "uneasy",
    overallFeelingGood,
    noteFeelingGood,
    feelingGood,
    relaxed,
    positive: okayEnough || feelingGood || relaxed,
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
	    || hasValidSleepHours(appState.sleepHours)
	    || hasMeaningfulRunDetail(appState.runDetail)
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
  if (signals.mindNote.noteFeelingGood && signals.recoveryLoad.high) return t("signalReminder.noteFeelingGoodWithLoad");
  if (signals.mindNote.noteFeelingGood && (signals.energySleep.sleepLow || signals.energySleep.energyLow)) return t("signalReminder.noteFeelingGoodRecovery");
  if (signals.mindNote.noteFeelingGood) return t("signalReminder.noteFeelingGood");
  if (signals.mindNote.positive && signals.recoveryLoad.high) return t("signalReminder.positiveMindWithLoad");
  if (signals.mindNote.positive && (signals.energySleep.sleepLow || signals.energySleep.energyLow)) return t("signalReminder.positiveMindRecovery");
  if (signals.mindNote.positive) return t("signalReminder.positiveMind");
  if (signals.hydration.steady && signals.recoveryLoad.light) return t("signalReminder.consistency");
  if (signals.energySleep.endorphinBlindSpot) return t("signalReminder.endorphin");
  if (signals.energySleep.energyLow && signals.energySleep.lowResource) return t("signalReminder.resourceLow");
  if (signals.mindNote.pressured) return t("mindNoteReminder.pressured");
  if (signals.mindNote.worried) return t("mindNoteReminder.worried");
  if (signals.mindNote.uneasy) return t("mindNoteReminder.uneasy");
  if (signals.mindNote.hydrateGently) return t("mindNoteReminder.hydrate_gently");
  if (signals.continuity.note) return signals.continuity.note;
  const activityRootSummary = getActivitySpecificSummary(signals) || getActivityRootSummary(signals);
  if (activityRootSummary) return activityRootSummary;
  if (signals.energySleep.sleepLow) return t("reminder.lowSleep");
  if (signals.recoveryLoad.high) return t("reminder.highLoad");
  return t("reminder.steady");
}

function getMindNoteReminder() {
  if (appState.mindNoteFeeling === "pressured") return t("mindNoteReminder.pressured");
  if (appState.mindNoteFeeling === "worried") return t("mindNoteReminder.worried");
  if (appState.mindNoteFeeling === "uneasy") return t("mindNoteReminder.uneasy");
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
  persistCurrentFormDraft();

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
  persistCurrentFormDraft();
}

function ensureReflectionSignature(text) {
  const trimmed = String(text || "").trimEnd();
  if (!trimmed) return "";
  return trimmed.endsWith(REFLECTION_SIGNATURE) ? trimmed : `${trimmed} ${REFLECTION_SIGNATURE}`;
}

function sanitizeReflectionOutputText(text) {
  const output = String(text || "");
  if (currentLanguage !== "en") return output;

  return output
    .replace(/,?\s*rather than repeating it in several ways/gi, "")
    .replace(/\banti-repetition\b/gi, "reflection")
    .replace(/\bdedupe\b/gi, "simplify")
    .replace(/\breflection blocks?\b/gi, "reflection")
    .replace(/\btheme grouping\b/gi, "reflection grouping")
    .replace(/\bmerge logic\b/gi, "reflection flow")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\s+\n/g, "\n")
    .trim();
}

function getReflectionGenerationDelay() {
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  return prefersReducedMotion ? 120 : REFLECTION_GENERATION_DELAY_MS;
}

function buildReflection() {
  const signals = buildSignals();
  return sanitizeReflectionOutputText(personalizeReflectionOutput(composeRootAwareReflection(
    buildReflectionFromSignals(signals),
    selectedReflectionRoot,
    signals
  ), { root: selectedReflectionRoot }));
}

function buildReflectionDisplay() {
  const signals = buildSignals();
  return sanitizeReflectionOutputText(personalizeReflectionOutput(composeRootAwareReflection(
    buildReflectionDisplayFromSignals(signals),
    selectedReflectionRoot,
    signals
  ), { root: selectedReflectionRoot }));
}

function buildReflectionDisplayFromSignals(signals) {
  const lowDataReflection = buildLowDataNuTuenSaiReflection(signals);
  if (lowDataReflection) return lowDataReflection;

  const inputGroundedContext = getInputGroundedReflectionContext(signals, {
    omitReading: shouldOmitInputGroundedReadingForRecovery(signals)
  });
  const displayBlocks = normalizeReflectionBlocks([
    { key: "overview", text: getReflectionDisplayOverview(signals) },
    { key: "inputGrounded", text: getInputGroundedReflectionBlock(signals, { withMarkers: true, compact: true }) },
    { key: "continuity", text: getReflectionDisplayContinuity(signals) },
    { key: "adjustment", text: getReflectionDisplayAdjustment(signals) },
    { key: "tomorrow", text: getReflectionDisplayTomorrow(signals) },
    { key: "mindNote", text: getReflectionDisplayMindNote() }
  ], {
    anchors: inputGroundedContext.anchors,
    intent: inputGroundedContext.intent,
    signals,
    compact: true
  });

  return sanitizeReflectionOutputText(displayBlocks.map((block) => block.text).filter(Boolean).join("\n\n"));
}

function getReflectionDisplayContinuity(signals) {
  return signals.continuity?.note || "";
}

function getReflectionDisplayOverview(signals) {
  const hydrationIsBase = signals.hydration.steady || signals.hydration.enough;
  const hasActivityLoad = signals.hydration.strongActivityHydration;
  const hasRecoveryOnly = isRecoveryOnlyReflection(signals);

  if (signals.energySleep.energyCausePattern.hasLayeredSignal) return t("reflectionDisplay.overviewEnergyLayered");
  if (signals.mindNote.noteFeelingGood && hasActivityLoad) return t("reflectionDisplay.overviewMindNoteFeelingGoodActivity");
  if (signals.mindNote.noteFeelingGood && hasRecoveryOnly) return t("reflectionDisplay.overviewMindNoteFeelingGoodRecovery");
  if (signals.mindNote.noteFeelingGood) return t("reflectionDisplay.overviewMindNoteFeelingGoodSupport");
  if (signals.mindNote.positive && hasActivityLoad) return t("reflectionDisplay.overviewPositiveMindActivity");
  const activityRootSummary = getActivitySpecificSummary(signals) || getActivityRootSummary(signals);
  if (activityRootSummary && hasActivityLoad) return activityRootSummary;
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
  const drinkReflectionNote = getDrinkReflectionNote(signals);
  if (signals.energySleep.energyCausePattern.hasLayeredSignal) return t("reflectionDisplay.adjustEnergyLayered");
  if (signals.sleepDetail.hasHours && signals.sleepDetail.low) return signals.sleepDetail.note;
  if (drinkReflectionNote) return drinkReflectionNote;
  if (signals.drinkLoad.sweetnessInsight.previewRelevant) return signals.drinkLoad.sweetnessInsight.text;
  if (signals.runDetail.note && (signals.runDetail.isLongRun || signals.runDetail.isShortQualityRun)) return signals.runDetail.note;
  if (signals.hydration.strongActivityHydration) return t("reflectionDisplay.adjustActivity");
  if (isRecoveryOnlyReflection(signals)) return t("reflectionDisplay.adjustRecovery");
  if (signals.drinkLoad.caffeineHigh) return t("reflectionDisplay.adjustCaffeine");
  if (signals.hydration.low || signals.hydration.rising) return t("reflectionDisplay.adjustWater");
  return t("reflectionDisplay.adjustSteady");
}

function getReflectionDisplayTomorrow(signals) {
  if (signals.energySleep.energyCausePattern.hasLayeredSignal) return t("reflectionDisplay.tomorrowEnergyLayered");
  const activityRootFocus = getActivityRootTomorrowFocus(signals);
  if (activityRootFocus && signals.hydration.strongActivityHydration) return activityRootFocus;
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

function normalizeReflectionBlocks(blocks = [], context = {}) {
  const preparedBlocks = mergeOverlappingReflectionThemes(blocks, context);
  return dedupeReflectionBlocks(preparedBlocks, context);
}

function mergeOverlappingReflectionThemes(blocks = [], context = {}) {
  const recoveryCue = getMergedRecoveryReflectionCue(context.signals);
  if (!recoveryCue) return blocks;

  const recoveryBlockCount = blocks.filter((block) => (
    getReflectionBlockThemes(block, context).includes("recovery")
  )).length;
  if (recoveryBlockCount < 3) return blocks;

  return blocks.map((block) => (
    block.key === "adjustment" ? { ...block, text: recoveryCue } : block
  ));
}

function getMergedRecoveryReflectionCue(signals = {}) {
  const cues = [];
  if (signals.sleepDetail?.low || signals.energySleep?.sleepLow) cues.push("sleep");
  if (signals.runDetail?.hasRunActivity || signals.runDetail?.isLongRun || signals.runDetail?.isShortQualityRun) cues.push("run");
  if (signals.recoveryLoad?.high) cues.push("load");
  if (signals.mindNote?.restFirst) cues.push("rest");
  if (signals.mindNote?.pressured || signals.mindNote?.uneasy) cues.push("mind");
  if (unique(cues).length < 2) return "";

  if (currentLanguage === "en") {
    const parts = [];
    if (cues.includes("sleep")) parts.push("low sleep");
    if (cues.includes("run")) parts.push("running load");
    else if (cues.includes("load")) parts.push("today's load");
    if (cues.includes("rest")) parts.push("a rest-first support need");
    if (!parts.length) return "";
    return "Recovery may fit the day better than adding more output.";
  }

  if (currentLanguage === "zh") {
    const parts = [];
    if (cues.includes("sleep")) parts.push("睡眠偏少");
    if (cues.includes("run")) parts.push("跑步 load");
    else if (cues.includes("load")) parts.push("今天的 load");
    if (cues.includes("rest")) parts.push("Mind Note 指向先休息");
    if (!parts.length) return "";
    return `今天有${parts.join("、")}一起指向 recovery。把它当成一个清楚的提示就好，不需要继续加压。`;
  }

  const parts = [];
  if (cues.includes("sleep")) parts.push("นอนน้อย");
  if (cues.includes("run")) parts.push("load จากการวิ่ง");
  else if (cues.includes("load")) parts.push("load ของวัน");
  if (cues.includes("rest")) parts.push("Mind Note ชี้ไปทางพักก่อน");
  if (cues.includes("mind") && !cues.includes("rest")) parts.push("ภาวะใจมีแรงกด");
  if (!parts.length) return "";
  return `วันนี้มี${joinListNaturally(parts)}อยู่ในภาพเดียวกัน หนูอ่านเป็นสัญญาณให้ recovery นำก่อนการเร่งเพิ่มนะคะ`;
}

function joinListNaturally(items = []) {
  const list = items.filter(Boolean);
  if (list.length <= 1) return list[0] || "";
  if (currentLanguage === "th") {
    if (list.length === 2) return `${list[0]}และ${list[1]}`;
    return `${list.slice(0, -1).join(" ")} และ${list[list.length - 1]}`;
  }
  if (currentLanguage === "en") {
    if (list.length === 2) return `${list[0]} and ${list[1]}`;
    return `${list.slice(0, -1).join(", ")}, and ${list[list.length - 1]}`;
  }
  return list.join("、");
}

function dedupeReflectionBlocks(blocks = [], context = {}) {
  const records = blocks.map((block, index) => {
    const normalizedBlock = typeof block === "string" ? { key: "", text: block } : { ...block };
    return {
      ...normalizedBlock,
      index,
      text: String(normalizedBlock.text || "").trim(),
      themes: getReflectionBlockThemes(normalizedBlock, context),
      priority: getReflectionBlockPriority(normalizedBlock)
    };
  });
  const themeBuckets = new Map();

  records.forEach((record) => {
    if (!record.text || isProtectedReflectionBlock(record)) return;
    const themes = record.themes.filter((theme) => theme !== "closing");
    if (!themes.length) return;

    for (const theme of themes) {
      const maxForTheme = getReflectionThemeLimit(theme, context);
      const bucket = themeBuckets.get(theme) || [];
      if (bucket.length < maxForTheme) {
        bucket.push(record);
        themeBuckets.set(theme, bucket);
        continue;
      }

      const weakest = bucket.reduce((lowest, item) => (
        item.priority < lowest.priority ? item : lowest
      ), bucket[0]);
      if (record.priority > weakest.priority) {
        weakest.drop = true;
        bucket.splice(bucket.indexOf(weakest), 1, record);
        themeBuckets.set(theme, bucket);
        continue;
      }

      record.drop = true;
      break;
    }
  });

  return records
    .filter((record) => !record.drop)
    .sort((a, b) => a.index - b.index)
    .map(({ index, themes, priority, drop, ...block }) => block);
}

function isProtectedReflectionBlock(block) {
  return ["overview", "inputGrounded", "closing1", "closing2", "spacer"].includes(block.key);
}

function getReflectionThemeLimit(theme, context = {}) {
  if (theme === "mind_note") return 2;
  if (theme === "recovery") return context.compact ? 1 : 2;
  if (theme === "closing") return 3;
  return 1;
}

function getReflectionBlockPriority(block) {
  const priorities = {
    overview: 100,
    inputGrounded: 95,
    adjustment: 90,
    energyCause: 78,
    hydration: 75,
    recovery: 70,
    mindNote: 68,
    mindHolding: 62,
    tomorrow: 58,
    continuity: 55,
    reminder: 45,
    good: 35,
    closing1: 20,
    closing2: 20,
    spacer: 0
  };
  return priorities[block.key] ?? 50;
}

function getReflectionBlockThemes(block = {}, context = {}) {
  const themes = new Set();
  const text = String(block.text || "").toLowerCase();
  const add = (theme) => themes.add(theme);

  if (["hydration"].includes(block.key)) add("hydration");
  if (["recovery"].includes(block.key)) add("recovery");
  if (["mindNote", "mindHolding"].includes(block.key)) add("mind_note");
  if (["tomorrow", "closing1", "closing2"].includes(block.key)) add("closing");

  const keywordThemes = [
    ["recovery", ["recovery", "พัก", "ไม่เร่ง", "ไม่ push", "push", "พักก่อน", "ลดแรงกดดัน", "rest", "not pushing", "recover", "恢复", "不急", "พักตา"]],
    ["hydration", ["น้ำ", "จิบ", "ดื่ม", "hydration", "water", "喝水", "饮水"]],
    ["load", ["load", "run", "วิ่ง", "กิจกรรม", "งาน", "context", "output", "ผลลัพธ์", "activity", "work", "跑", "活动", "工作"]],
    ["sleep_energy", ["นอน", "sleep", "ชั่วโมง", "energy", "พลังงาน", "睡", "小时", "能量"]],
    ["mind_note", ["mind note", "ภาวะใจ", "ใจ", "กังวล", "กดดัน", "ล้า", "support need", "心", "心念"]],
    ["drink", ["caffeine", "กาแฟ", "เครื่องดื่ม", "sweetness", "คาเฟอีน", "ความหวาน", "drink", "饮品", "咖啡因", "甜"]],
    ["honest_data", ["ข้อมูลยังบาง", "เติมเท่าที่จริง", "log ก่อนหน้า", "previous log", "not much new data", "真实", "记录"]],
    ["closing", ["พรุ่งนี้", "tomorrow", "ปิดวัน", "จังหวะพรุ่งนี้", "明天"]]
  ];

  keywordThemes.forEach(([theme, keywords]) => {
    if (keywords.some((keyword) => text.includes(keyword.toLowerCase()))) add(theme);
  });

  if (block.key === "adjustment" && context.signals?.mindNote?.restFirst) add("recovery");
  return [...themes];
}

function buildReflectionFromSignals(signals) {
  const lowDataReflection = buildLowDataNuTuenSaiReflection(signals);
  if (lowDataReflection) return lowDataReflection;

  const goodThings = [];
  const adjustments = [];
  const activityRootSummary = getActivitySpecificReflections(signals, { limit: 1 }).join(" ")
    || getActivityRootSummary(signals, { limit: 2 });
  const loadTypeAdjustments = activityRootSummary
    ? [activityRootSummary]
    : getActivityRootReflections(signals, { limit: 2 });
  const sweetnessInsight = signals.drinkLoad.sweetnessInsight;
  const drinkReflectionNote = getDrinkReflectionNote(signals);
  const inputGroundedContext = getInputGroundedReflectionContext(signals, {
    omitReading: shouldOmitInputGroundedReadingForRecovery(signals)
  });
  const inputGroundedOverview = inputGroundedContext.text;

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
  if (signals.sleepDetail.hasHours && !signals.sleepDetail.low) {
    goodThings.push(signals.sleepDetail.note);
  }
  const positiveMindNote = getPositiveMindReflectionNote(signals);
  if (positiveMindNote) goodThings.push(positiveMindNote);
  if (sweetnessInsight.hasDrinks && sweetnessInsight.key === "low") {
    goodThings.push(sweetnessInsight.text);
  }
  if (!goodThings.length) goodThings.push(t("reflection.openedPattern"));

  if (signals.energySleep.endorphinBlindSpot) {
    adjustments.push(t("signalReflection.endorphin"));
  } else if (signals.sleepDetail.hasHours && signals.sleepDetail.low) {
    adjustments.push(signals.sleepDetail.note);
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
  } else if (signals.mindNote.uneasy) {
    adjustments.push(t("signalReflection.uneasy"));
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
  if (signals.continuity.note && !adjustments.includes(signals.continuity.note)) {
    adjustments.push(signals.continuity.note);
  }
  if (drinkReflectionNote && !adjustments.includes(drinkReflectionNote)) {
    adjustments.push(drinkReflectionNote);
  }
  [signals.runDetail.note, signals.runDetail.sweatNote].filter(Boolean).forEach((note) => {
    if (!adjustments.includes(note)) adjustments.push(note);
  });
  loadTypeAdjustments.forEach((note) => {
    if (!adjustments.includes(note)) adjustments.push(note);
  });
  if (sweetnessInsight.detailRelevant && !adjustments.includes(sweetnessInsight.text)) {
    adjustments.push(sweetnessInsight.text);
  }
  if (!adjustments.length) adjustments.push(t("reflection.keepBalance"));

  const energyCauseNote = getEnergyCauseReflectionNote();

  const breathingMarkers = selectReflectionBreathingMarkers({
    anchors: inputGroundedContext.anchors,
    intent: inputGroundedContext.intent,
    signals
  });
  const reflectionBlocks = [
    { key: "overview", text: inputGroundedOverview },
    { key: "good", text: `${t("reflection.good")} ${goodThings.join(" / ")}` },
    { key: "adjustment", text: `${t("reflection.adjust")} ${adjustments.join(" / ")}` },
    { key: "energyCause", text: energyCauseNote.trim() },
    { key: "recovery", text: `${t("reflection.recovery")} ${getRecoveryNote(signals)}` },
    { key: "hydration", text: `${t("reflection.hydration")} ${getHydrationNoteFromSignals(signals)}` },
    { key: "tomorrow", text: `${t("reflection.tomorrow")} ${getTomorrowFocus(signals)}` },
    { key: "mindNote", text: `${t("reflection.mindNote")} ${getMindNoteSummary()}` },
    { key: "mindHolding", text: `${t("reflection.mindHolding")} ${appState.mindNoteText?.trim() || t("reflection.noMindNote")}` },
    { key: "reminder", text: `${t("reflection.reminder")} ${getReminderFromSignals(signals)}` },
    { key: "spacer", text: "" },
    { key: "closing1", text: t("reflection.closing1") },
    { key: "closing2", text: t("reflection.closing2") }
  ];
  const normalizedReflectionBlocks = normalizeReflectionBlocks(reflectionBlocks, {
    anchors: inputGroundedContext.anchors,
    intent: inputGroundedContext.intent,
    signals
  });
  const voicedReflectionBlocks = applyNuTuenSaiReflectionVoice(normalizedReflectionBlocks, {
    anchors: inputGroundedContext.anchors,
    intent: inputGroundedContext.intent,
    signals
  });

  return applyReflectionBreathingMarkers(voicedReflectionBlocks, breathingMarkers)
    .filter((line) => line !== "")
    .join("\n");
}

function getEnergyCauseSummary() {
  return (appState.energyCauses || [])
    .map((cause) => t(`options.energyCauses.${cause}`))
    .join(" / ");
}

function getPositiveMindReflectionNote(signals = buildSignals()) {
  if (signals.mindNote.noteFeelingGood) return t("signalReflection.mindNoteFeelingGood");
  if (signals.mindNote.overallFeelingGood) return t("signalReflection.positiveMindFeelingGood");
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
  if (signals.runDetail.note && (signals.runDetail.isLongRun || signals.runDetail.isShortQualityRun)) return signals.runDetail.note;
  const activityRootNote = getActivityRootReflection(signals);
  if (activityRootNote) return activityRootNote;
  const loadTypeNote = getLoadTypeReflection(signals);
  if (loadTypeNote) return loadTypeNote;
  if (signals.recoveryLoad.high) return t("recoveryNote.high");
  if (signals.energySleep.sleepLow) return t("recoveryNote.lowSleep");
  if (signals.recoveryLoad.medium) return t("recoveryNote.medium");
  return t("recoveryNote.light");
}

function getHydrationNoteFromSignals(signals = buildSignals()) {
  if (signals.hydration.low && signals.drinkLoad.caffeineHigh) return t("signalReflection.hydrationCaffeine");
  if (signals.runDetail.hasRunActivity && signals.hydration.waterMl >= 3000 && (signals.runDetail.sweatHigh || signals.runDetail.isLongRun)) {
    return t("reflectionInputIntegration.hydrationRunGoodZone");
  }
  if (!signals.hydration.strongActivityHydration && signals.hydration.waterMl >= 3000) {
    return t("reflectionInputIntegration.hydrationHighRest");
  }
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
  const activityRootFocus = getActivityRootTomorrowFocus(signals);
  if (activityRootFocus) return activityRootFocus;
  const loadTypeFocus = getLoadTypeTomorrowFocus(signals);
  if (loadTypeFocus) return loadTypeFocus;
  if (signals.drinkLoad.caffeineHigh) return t("tomorrowFocus.caffeine");
  if (signals.recoveryLoad.high || signals.energySleep.sleepLow) return t("tomorrowFocus.recovery");
  if (signals.hydration.low || signals.hydration.rising) return t("tomorrowFocus.water");
  if (signals.drinkLoad.sugarHigh || signals.drinkLoad.sweetDrinksCount >= 1) return t("tomorrowFocus.sweet");
  return t("tomorrowFocus.steady");
}

function buildDailyLogRow({ generateReflection = true, includeReflectionRoot = false } = {}) {
  const reflection = generateReflection
    ? ensureReflectionSignature(appState.generatedReflection || buildReflection())
    : ensureReflectionSignature(appState.generatedReflection || "");
  const reflectionRootMetadata = includeReflectionRoot ? getReflectionRootMetadata() : null;
  const tomorrowFocus = getTomorrowFocus();
  const reminder = getMindfulReminder();
  const drinkScores = getDrinkScores();
  const drinkProfiles = (appState.drinkProfiles || []).map(normalizeDrinkProfile);
  const sleepHours = normalizeSleepHours(appState.sleepHours);
  const sleepCategory = deriveSleepCategory(sleepHours) || appState.selectedState.sleep;
  const runDetailJson = buildRunDetailJson();
  const practiceContext = buildPracticeContextObject();

  return {
    Date: appState.date,
    Energy: appState.selectedState.energy,
    Mind: normalizeMindStateValue(appState.selectedState.mind),
    Sleep: sleepCategory,
    Sleep_Hours: sleepHours,
    Water_ml: appState.waterMl,
    Drinks: getDrinkSummaryLabels(drinkProfiles).join(" | "),
    Sweet_Drinks_Count: drinkScores.sweetDrinksCount,
    Drink_Profile_JSON: JSON.stringify(drinkProfiles),
    Sugar_Score: drinkScores.sugarScore,
    Caffeine_Score: drinkScores.caffeineScore,
    Milk_Drink_Count: drinkScores.milkDrinkCount,
    Hydration_Support_Count: drinkScores.hydrationSupportCount,
    Activities: appState.activities.join(" | "),
    Run_Detail_JSON: runDetailJson,
    Energy_Causes: (appState.energyCauses || []).join(" | "),
    Load_Score: appState.loadScore,
    Load_Level: appState.loadLevel,
    Hydration_Status: appState.hydrationStatus,
    Tomorrow_Focus: tomorrowFocus,
    NuTuenSai_Reminder: reminder,
    Practice_Root: practiceContext?.root || "",
    Practice_Type: practiceContext?.type || "",
    Practice_Minutes: practiceContext?.minutes ?? "",
    Practice_Context_JSON: practiceContext ? JSON.stringify(practiceContext) : "",
    Practice_Note: practiceContext?.note || "",
    Mind_Note_Text: appState.mindNoteText || "",
    Mind_Note_Feeling: appState.mindNoteFeeling || "",
    Mind_Note_Support: appState.mindNoteSupport || "",
    Reflection_Root: reflectionRootMetadata?.root || "",
    Reflection_Root_Label: reflectionRootMetadata?.label || "",
    Reflection_Root_Source: reflectionRootMetadata?.source || "",
    Reflection_Root_Declaration: reflectionRootMetadata?.declaration || "",
    Reflection_Text: reflection
  };
}

const todaySignalsLogFields = [
  "Date",
  "Energy",
  "Mind",
  "Sleep",
  "Sleep_Hours",
  "Water_ml",
  "Drinks",
  "Sweet_Drinks_Count",
  "Drink_Profile_JSON",
  "Sugar_Score",
  "Caffeine_Score",
  "Milk_Drink_Count",
  "Hydration_Support_Count",
  "Activities",
  "Run_Detail_JSON",
  "Energy_Causes",
  "Load_Score",
  "Load_Level",
  "Hydration_Status"
];

const mindNoteLogFields = [
  "Practice_Root",
  "Practice_Type",
  "Practice_Minutes",
  "Practice_Context_JSON",
  "Practice_Note",
  "Mind_Note_Text",
  "Mind_Note_Feeling",
  "Mind_Note_Support"
];

const reflectionLogFields = [
  "Reflection_Root",
  "Reflection_Root_Label",
  "Reflection_Root_Source",
  "Reflection_Root_Declaration",
  "Reflection_Text",
  "Tomorrow_Focus",
  "NuTuenSai_Reminder"
];

const todaySignalMergeGroups = [
  {
    fields: ["Energy", "Mind", "Sleep", "Sleep_Hours"],
    hasSignal: (row) => hasDailyLogValue(row.Energy)
      || hasDailyLogValue(row.Mind)
      || hasDailyLogValue(row.Sleep)
      || hasDailyLogValue(row.Sleep_Hours)
  },
  {
    fields: ["Water_ml", "Hydration_Status"],
    hasSignal: (row) => Number(row.Water_ml) > 0
  },
  {
    fields: [
      "Drinks",
      "Sweet_Drinks_Count",
      "Drink_Profile_JSON",
      "Sugar_Score",
      "Caffeine_Score",
      "Milk_Drink_Count",
      "Hydration_Support_Count"
    ],
    hasSignal: (row) => hasDailyLogValue(row.Drink_Profile_JSON)
      || hasDailyLogValue(row.Drinks)
  },
  {
    fields: [
      "Activities",
      "Run_Detail_JSON",
      "Energy_Causes",
      "Load_Score",
      "Load_Level"
    ],
    hasSignal: (row) => hasDailyLogValue(row.Activities)
      || hasDailyLogValue(row.Run_Detail_JSON)
      || hasDailyLogValue(row.Energy_Causes)
      || Number(row.Load_Score) > 0
  }
];

function hasDailyLogValue(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === "number") return Number.isFinite(value) && value !== 0;
  const text = String(value).trim();
  return Boolean(text && text !== "[]" && text !== "{}");
}

function copyDailyLogFields(targetRow, sourceRow, fields) {
  fields.forEach((field) => {
    targetRow[field] = sourceRow[field] ?? "";
  });
}

function mergeDailyLogRow(existingRow, incomingRow, saveSource = "reflection") {
  const existing = normalizeLogRow(existingRow || {});
  const incoming = normalizeLogRow(incomingRow || {});
  const merged = { ...existing, Date: incoming.Date || existing.Date };

  if (saveSource === "reflection") {
    copyDailyLogFields(merged, incoming, [
      ...todaySignalsLogFields,
      ...mindNoteLogFields,
      ...reflectionLogFields
    ]);
    return normalizeLogRow(merged);
  }

  if (saveSource === "today_signals") {
    copyDailyLogFields(merged, incoming, todaySignalsLogFields);
    return normalizeLogRow(merged);
  }

  if (saveSource === "mind_note") {
    todaySignalMergeGroups.forEach((group) => {
      if (group.hasSignal(incoming)) {
        copyDailyLogFields(merged, incoming, group.fields);
      }
    });
    copyDailyLogFields(merged, incoming, mindNoteLogFields);
    return normalizeLogRow(merged);
  }

  copyDailyLogFields(merged, incoming, [
    ...todaySignalsLogFields,
    ...mindNoteLogFields,
    ...reflectionLogFields
  ]);
  return normalizeLogRow(merged);
}

function getTodaySavedLogRow() {
  return getDailyLog()
    .map(normalizeLogRow)
    .find((row) => row.Date === todayIso);
}

function hasSavedTodaySignals(row) {
  if (!row) return false;
  return Boolean(
    hasDailyLogValue(row.Energy)
    || hasDailyLogValue(row.Mind)
    || hasDailyLogValue(row.Sleep)
    || hasDailyLogValue(row.Sleep_Hours)
    || Number(row.Water_ml) > 0
    || hasDailyLogValue(row.Drinks)
    || hasDailyLogValue(row.Drink_Profile_JSON)
    || hasDailyLogValue(row.Activities)
    || hasDailyLogValue(row.Energy_Causes)
    || Number(row.Load_Score) > 0
    || hasDailyLogValue(row.Run_Detail_JSON)
  );
}

function hasSavedMindNoteLayer(row) {
  if (!row) return false;
  return Boolean(
    hasDailyLogValue(row.Practice_Root)
    || hasDailyLogValue(row.Practice_Type)
    || hasDailyLogValue(row.Practice_Minutes)
    || hasDailyLogValue(row.Practice_Context_JSON)
    || hasDailyLogValue(row.Practice_Note)
    || hasDailyLogValue(row.Mind_Note_Text)
    || hasDailyLogValue(row.Mind_Note_Feeling)
    || hasDailyLogValue(row.Mind_Note_Support)
  );
}

function hasSavedReflectionLayer(row) {
  if (!row) return false;
  // Tomorrow_Focus and NuTuenSai_Reminder can be derived before Reflection save,
  // so Reflection status is anchored to the actual stored reflection text.
  return hasDailyLogValue(row.Reflection_Text);
}

function getDailySaveStatusState() {
  const row = getTodaySavedLogRow();
  if (!row) {
    return {
      state: "empty",
      text: t("dailySaveStatusEmpty")
    };
  }

  const sections = [
    {
      label: t("dailySaveSectionSignals"),
      saved: hasSavedTodaySignals(row)
    },
    {
      label: t("dailySaveSectionMindNote"),
      saved: hasSavedMindNoteLayer(row)
    },
    {
      label: t("dailySaveSectionReflection"),
      saved: hasSavedReflectionLayer(row)
    }
  ];
  const savedSections = sections.filter((section) => section.saved).map((section) => section.label);
  const unsavedSections = sections.filter((section) => !section.saved).map((section) => section.label);

  if (savedSections.length === sections.length) {
    return {
      state: "saved",
      text: t("dailySaveStatusSaved", {
        savedSections: savedSections.join(" · ")
      })
    };
  }

  if (!savedSections.length) {
    return {
      state: "partial",
      text: t("dailySaveStatusSavedNone")
    };
  }

  return {
    state: "partial",
    text: t("dailySaveStatusPartial", {
      savedSections: savedSections.join(" · "),
      unsavedSections: unsavedSections.join(" · ")
    })
  };
}

function updateDailySaveStatus() {
  const status = document.querySelector("#dailySaveStatus");
  const text = document.querySelector("#dailySaveStatusText");
  if (!status || !text) return;

  const statusState = getDailySaveStatusState();
  status.classList.toggle("is-empty", statusState.state === "empty");
  status.classList.toggle("is-partial", statusState.state === "partial");
  status.classList.toggle("is-saved", statusState.state === "saved");
  text.textContent = statusState.text;
}

function markCurrentFormClearedToday() {
  localStorage.setItem(currentFormClearedKey(), "true");
}

function clearCurrentFormClearedMarker() {
  localStorage.removeItem(currentFormClearedKey());
}

function wasCurrentFormIntentionallyClearedToday() {
  return localStorage.getItem(currentFormClearedKey()) === "true";
}

function saveCurrentForm({ generateReflection = false } = {}) {
  if (generateReflection) {
    appState.generatedReflection = ensureReflectionSignature(appState.generatedReflection || buildReflection());
  }
  clearCurrentFormClearedMarker();
  localStorage.setItem(storageKey(), JSON.stringify(appState));
}

function resetCurrentForm() {
  if (!confirm(t("resetCurrentFormConfirm"))) return;

  isEditingReflection = false;
  appState = structuredClone(defaultState);
  localStorage.removeItem(storageKey());
  markCurrentFormClearedToday();
  resetTodayInputStep();
  resetDrinkProfileForm();
  syncUI();
  document.querySelector("#saveStatus").textContent = t("resetCurrentFormDone");
}

function hasCurrentFormDataForRestore(state = appState) {
  return Boolean(
    hasMeaningfulTodayInput()
    || hasPracticeContextInput(state)
    || String(state.generatedReflection || "").trim()
  );
}

function getLatestSavedLogRow() {
  const rows = getDailyLog()
    .map(normalizeLogRow)
    .filter((row) => row.Date)
    .sort((a, b) => String(b.Date).localeCompare(String(a.Date)));
  return rows[0] || null;
}

function getDailyLogRowForRestore() {
  const todayRow = getTodaySavedLogRow();
  if (todayRow) return todayRow;

  const latestRow = getLatestSavedLogRow();
  if (!latestRow) return null;

  const shouldRestoreLatest = confirm(t("restoreLatestLogConfirm", { date: latestRow.Date }));
  return shouldRestoreLatest ? latestRow : null;
}

function restoreCurrentFormFromDailyLog() {
  const row = getDailyLogRowForRestore();
  const saveStatus = document.querySelector("#saveStatus");
  if (!row) {
    if (saveStatus) saveStatus.textContent = getDailyLog().length
      ? t("restoreCurrentFormCancelled")
      : t("restoreCurrentFormEmpty");
    return;
  }

  if (hasCurrentFormDataForRestore() && !confirm(t("restoreCurrentFormOverwriteConfirm"))) {
    if (saveStatus) saveStatus.textContent = t("restoreCurrentFormCancelled");
    return;
  }

  loadDailyLogRowIntoCurrentState(row);
  saveCurrentForm({ generateReflection: false });
  renderPracticeTypeOptions();
  resetDrinkProfileForm();
  syncUI();
  if (saveStatus) saveStatus.textContent = t("restoreCurrentFormDone");
}

function parseDrinkProfilesForRestore(row) {
  const profiles = parseDrinkProfilesFromRow(row);
  return profiles.length ? profiles : legacyDrinksToProfiles(splitLogValues(row.Drinks));
}

function buildStateFromDailyLogRow(row) {
  const normalized = {};
  DAILY_LOG_COLUMNS.forEach((column) => {
    normalized[column] = row?.[column] ?? "";
  });
  normalized.Date = normalizeExcelDate(normalized.Date);
  normalized.Mind = normalizeMindStateValue(normalized.Mind);
  normalized.Sleep_Hours = normalizeSleepHours(normalized.Sleep_Hours);
  if (normalized.Sleep_Hours !== "") {
    normalized.Sleep = deriveSleepCategory(normalized.Sleep_Hours) || normalized.Sleep;
  }
  normalized.Water_ml = Number(normalized.Water_ml) || 0;
  const practiceContext = parsePracticeContextJson(normalized.Practice_Context_JSON);
  const practiceRoot = normalizePracticeRoot(normalized.Practice_Root || practiceContext.root);
  const practiceType = normalizePracticeType(normalized.Practice_Type || practiceContext.type, practiceRoot);

  const restoredState = {
    ...structuredClone(defaultState),
    date: todayIso,
    waterMl: Number(normalized.Water_ml) || 0,
    drinks: splitLogValues(normalized.Drinks),
    drinkProfiles: parseDrinkProfilesForRestore(normalized),
    activities: normalizeActivityValuesForState(splitLogValues(normalized.Activities)),
    energyCauses: splitLogValues(normalized.Energy_Causes),
    selectedState: {
      energy: normalizeStateChoiceValue("energy", normalized.Energy),
      mind: normalizeMindStateValue(normalized.Mind),
      sleep: normalizeStateChoiceValue("sleep", normalized.Sleep)
    },
    sleepHours: normalizeSleepHours(normalized.Sleep_Hours),
    runDetail: normalizeRunDetail(normalized.Run_Detail_JSON),
    generatedReflection: cleanRestoreTextValue(normalized.Reflection_Text),
    practiceRoot,
    practiceType,
    practiceMinutes: normalized.Practice_Minutes === ""
      ? normalizePracticeMinutes(practiceContext.minutes)
      : normalizePracticeMinutes(normalized.Practice_Minutes),
    practiceNote: cleanRestoreTextValue(normalized.Practice_Note || practiceContext.note || ""),
    mindNoteText: cleanRestoreTextValue(normalized.Mind_Note_Text),
    mindNoteFeeling: cleanRestoreTextValue(normalized.Mind_Note_Feeling),
    mindNoteSupport: cleanRestoreTextValue(normalized.Mind_Note_Support)
  };
  applyDerivedSleepFromHours(restoredState);
  return restoredState;
}

function loadDailyLogRowIntoCurrentState(row) {
  appState = buildStateFromDailyLogRow(row);
  selectedReflectionRoot = normalizeReflectionRootMetadataValue(row?.Reflection_Root) || "auto";
  isEditingReflection = false;
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

const legacyTextLikeFields = new Set([
  "Energy",
  "Mind",
  "Sleep",
  "Drinks",
  "Drink_Profile_JSON",
  "Activities",
  "Run_Detail_JSON",
  "Energy_Causes",
  "Hydration_Status",
  "Tomorrow_Focus",
  "NuTuenSai_Reminder",
  "Practice_Root",
  "Practice_Type",
  "Practice_Context_JSON",
  "Practice_Note",
  "Mind_Note_Text",
  "Mind_Note_Feeling",
  "Mind_Note_Support",
  "Reflection_Root",
  "Reflection_Root_Label",
  "Reflection_Root_Source",
  "Reflection_Root_Declaration",
  "Support_Need",
  "Reflection_Text",
  "Reflection"
]);

const legacyArtifactTextValues = new Set([
  "28",
  "undefined",
  "null",
  "nan",
  "[object object]"
]);

function isLegacyArtifactValue(value, fieldName) {
  if (!legacyTextLikeFields.has(fieldName)) return false;
  if (value === "" || value === null || value === undefined) return true;
  const text = String(value).trim();
  if (!text) return true;
  return legacyArtifactTextValues.has(text.toLowerCase());
}

function cleanLegacyTextValue(value, fieldName) {
  if (isLegacyArtifactValue(value, fieldName)) return "";
  return String(value).trim();
}

function normalizeReflectionRootMetadataValue(value) {
  const rootKey = String(value || "").trim();
  return rootKey && isSupportedReflectionRoot(rootKey) ? rootKey : "";
}

function normalizeLogRow(row) {
  const normalized = {};
  DAILY_LOG_COLUMNS.forEach((column) => {
    normalized[column] = row[column] ?? "";
  });

  normalized.Date = normalizeExcelDate(normalized.Date);
  legacyTextLikeFields.forEach((fieldName) => {
    if (fieldName in normalized) {
      normalized[fieldName] = cleanLegacyTextValue(normalized[fieldName], fieldName);
    }
  });
  const legacySupportNeed = cleanLegacyTextValue(row.Support_Need ?? "", "Support_Need");
  normalized.Mind_Note_Support = cleanLegacyTextValue(row.Mind_Note_Support ?? normalized.Mind_Note_Support, "Mind_Note_Support")
    || legacySupportNeed;
  normalized.Mind = normalizeMindStateValue(normalized.Mind);
  normalized.Sleep_Hours = normalizeSleepHours(normalized.Sleep_Hours);
  if (normalized.Sleep_Hours !== "") {
    normalized.Sleep = deriveSleepCategory(normalized.Sleep_Hours) || normalized.Sleep;
  }
  normalized.Water_ml = Number(normalized.Water_ml) || 0;
  normalized.Sweet_Drinks_Count = Number(normalized.Sweet_Drinks_Count) || 0;
  normalized.Drink_Profile_JSON = normalized.Drink_Profile_JSON || "";
  normalized.Sugar_Score = Number(normalized.Sugar_Score) || 0;
  normalized.Caffeine_Score = Number(normalized.Caffeine_Score) || 0;
  normalized.Milk_Drink_Count = Number(normalized.Milk_Drink_Count) || 0;
  normalized.Hydration_Support_Count = Number(normalized.Hydration_Support_Count) || 0;
  normalized.Run_Detail_JSON = normalizeRunDetailJsonForRow(normalized.Run_Detail_JSON);
  normalized.Load_Score = Number(normalized.Load_Score) || 0;
  normalized.Energy_Causes = normalized.Energy_Causes || "";
  normalized.Practice_Root = normalizePracticeRoot(normalized.Practice_Root);
  normalized.Practice_Type = normalizePracticeType(normalized.Practice_Type, normalized.Practice_Root);
  normalized.Practice_Minutes = normalizePracticeMinutes(normalized.Practice_Minutes);
  normalized.Practice_Note = cleanLegacyTextValue(normalized.Practice_Note, "Practice_Note");
  normalized.Practice_Context_JSON = normalizePracticeContextJsonForRow(normalized.Practice_Context_JSON, normalized);
  if (normalized.Practice_Context_JSON) {
    const practiceContext = parsePracticeContextJson(normalized.Practice_Context_JSON);
    normalized.Practice_Root = normalized.Practice_Root || normalizePracticeRoot(practiceContext.root);
    normalized.Practice_Type = normalized.Practice_Type || normalizePracticeType(practiceContext.type, normalized.Practice_Root);
    normalized.Practice_Minutes = normalized.Practice_Minutes === ""
      ? normalizePracticeMinutes(practiceContext.minutes)
      : normalized.Practice_Minutes;
    normalized.Practice_Note = normalized.Practice_Note || cleanLegacyTextValue(practiceContext.note || "", "Practice_Note");
  }
  normalized.Reflection_Root = normalizeReflectionRootMetadataValue(normalized.Reflection_Root);
  normalized.Reflection_Root_Label = cleanLegacyTextValue(normalized.Reflection_Root_Label, "Reflection_Root_Label");
  normalized.Reflection_Root_Source = cleanLegacyTextValue(normalized.Reflection_Root_Source, "Reflection_Root_Source");
  normalized.Reflection_Root_Declaration = cleanLegacyTextValue(normalized.Reflection_Root_Declaration, "Reflection_Root_Declaration");
  normalized.Reflection_Text = cleanLegacyTextValue(row.Reflection_Text ?? row.Reflection ?? "", "Reflection_Text");
  return normalized;
}

function normalizeRunDetailJsonForRow(value) {
  const detail = normalizeRunDetail(value);
  const hasDetail = detail.type || hasMeaningfulRunDetail(detail);
  if (!hasDetail) return "";

  const compactDetail = {};
  if (detail.type) compactDetail.type = detail.type;
  if (detail.distanceKm !== "") compactDetail.distanceKm = detail.distanceKm;
  if (detail.durationMin !== "") compactDetail.durationMin = detail.durationMin;
  if (detail.avgPace) compactDetail.avgPace = detail.avgPace;
  if (detail.sweat) compactDetail.sweat = detail.sweat;
  return JSON.stringify(compactDetail);
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

function saveCurrentDailyLog({ generateReflection = true, saveSource = "reflection" } = {}) {
  if (generateReflection) {
    appState.generatedReflection = ensureReflectionSignature(appState.generatedReflection || buildReflection());
  }

  const row = buildDailyLogRow({
    generateReflection,
    includeReflectionRoot: saveSource === "reflection"
  });
  const rows = getDailyLog();
  const existingIndex = rows.findIndex((item) => item.Date === row.Date);

  if (existingIndex >= 0) {
    const shouldReplace = confirm(t("replaceConfirm"));
    if (!shouldReplace) {
      document.querySelector("#saveStatus").textContent = t("replaceCancelled");
      return;
    }
    rows[existingIndex] = mergeDailyLogRow(rows[existingIndex], row, saveSource);
  } else {
    rows.push(row);
  }

  saveCurrentForm({ generateReflection: false });
  setDailyLog(rows);
  resetTodayInputStep();
  document.querySelector("#saveStatus").textContent = t("savedDailyLog");
  syncUI();
}

function saveToDailyLog() {
  saveCurrentDailyLog({ generateReflection: true, saveSource: "reflection" });
}

function saveTodayLog({ source = "today_1" } = {}) {
  const saveSource = source === "today_2" ? "mind_note" : "today_signals";
  saveCurrentDailyLog({ generateReflection: false, saveSource });
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
  updateDailySaveStatus();
  renderFieldReview();
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
    Reflection_Root: row.Reflection_Root || "",
    Reflection_Root_Label: row.Reflection_Root_Label || "",
    Reflection_Root_Source: row.Reflection_Root_Source || "",
    Reflection_Root_Declaration: row.Reflection_Root_Declaration || "",
    Mind_Note_Text: row.Mind_Note_Text || "",
    Mind_Note_Feeling: row.Mind_Note_Feeling || "",
    Mind_Note_Support: row.Mind_Note_Support || "",
    Reflection_Text: row.Reflection_Text || ""
  }));
  const dailySheet = XLSX.utils.json_to_sheet(dailyRows, { header: DAILY_LOG_COLUMNS });
  const summarySheet = XLSX.utils.json_to_sheet([buildMasterSummary(rows)]);
  const reflectionSheet = XLSX.utils.json_to_sheet(reflectionRows, {
    header: [
      "Date",
      "Reflection_Root",
      "Reflection_Root_Label",
      "Reflection_Root_Source",
      "Reflection_Root_Declaration",
      "Mind_Note_Text",
      "Mind_Note_Feeling",
      "Mind_Note_Support",
      "Reflection_Text"
    ]
  });
  const fieldContextSheet = XLSX.utils.json_to_sheet(buildFieldContextRows(), {
    header: ["Section", "Value"]
  });
  const fieldReviewSheet = XLSX.utils.json_to_sheet([buildFieldReview(rows)]);
  const columnGuideSheet = XLSX.utils.json_to_sheet(buildColumnGuideRows(), {
    header: COLUMN_GUIDE_HEADERS
  });
  const aiContextSheet = XLSX.utils.json_to_sheet(buildAIContextRows(), {
    header: AI_CONTEXT_HEADERS
  });

  applySheetReadability(dailySheet, getDailyLogExportColumnWidths());
  applySheetReadability(summarySheet, [14, 14, 18, 16, 16, 18, 20, 72]);
  applySheetReadability(reflectionSheet, [14, 24, 26, 24, 46, 30, 22, 22, 72]);
  applySheetReadability(fieldContextSheet, [28, 90]);
  applySheetReadability(fieldReviewSheet, [20, 20, 14, 18, 18, 18, 16, 22, 22, 22, 22, 22, 18, 18, 18, 24, 36, 92, 92, 92]);
  applySheetReadability(columnGuideSheet, [18, 28, 58, 18, 18, 64, 72, 78, 28, 28, 78, 28, 14]);
  applySheetReadability(aiContextSheet, [28, 110]);

  XLSX.utils.book_append_sheet(workbook, dailySheet, "Daily_Log");
  XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");
  XLSX.utils.book_append_sheet(workbook, reflectionSheet, "Reflections");
  XLSX.utils.book_append_sheet(workbook, fieldContextSheet, "Field_Context");
  XLSX.utils.book_append_sheet(workbook, fieldReviewSheet, "Field_Review");
  XLSX.utils.book_append_sheet(workbook, columnGuideSheet, "Column_Guide");
  XLSX.utils.book_append_sheet(workbook, aiContextSheet, "AI_Context");
  appendUserIntentionProfileSheetIfAvailable(workbook);
  XLSX.writeFile(workbook, "Mindful_Health_Balance_Master.xlsx");
  document.querySelector("#saveStatus").textContent = t("exportedMaster");
}

function getDailyLogExportColumnWidths() {
  const widthByColumn = {
    Date: 14,
    Energy: 12,
    Mind: 16,
    Sleep: 12,
    Sleep_Hours: 14,
    Water_ml: 14,
    Drinks: 28,
    Sweet_Drinks_Count: 18,
    Drink_Profile_JSON: 34,
    Sugar_Score: 14,
    Caffeine_Score: 16,
    Milk_Drink_Count: 18,
    Hydration_Support_Count: 22,
    Activities: 28,
    Run_Detail_JSON: 34,
    Energy_Causes: 28,
    Load_Score: 12,
    Load_Level: 14,
    Hydration_Status: 28,
    Tomorrow_Focus: 28,
    NuTuenSai_Reminder: 30,
    Practice_Root: 24,
    Practice_Type: 24,
    Practice_Minutes: 18,
    Practice_Context_JSON: 34,
    Practice_Note: 30,
    Mind_Note_Text: 34,
    Mind_Note_Feeling: 24,
    Mind_Note_Support: 24,
    Reflection_Root: 22,
    Reflection_Root_Label: 26,
    Reflection_Root_Source: 24,
    Reflection_Root_Declaration: 46
  };
  return DAILY_LOG_COLUMNS.map((column) => widthByColumn[column] || 18);
}

function applySheetReadability(sheet, widths = []) {
  if (!sheet) return;
  if (widths.length) {
    sheet["!cols"] = widths.map((wch) => ({ wch }));
  }
  if (sheet["!ref"]) {
    sheet["!autofilter"] = { ref: sheet["!ref"] };
  }
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

function buildAIContextRows() {
  return [
    {
      Key: "Workbook_Type",
      Value: "Mindful Health Balance self-care reflection log"
    },
    {
      Key: "Workbook_Purpose",
      Value: "Tracks daily self-care signals such as hydration, drinks, sleep, energy, activity load, mind state, practice context, and reflection."
    },
    {
      Key: "Not_Finance_Workbook",
      Value: "This workbook is not a finance, expense, accounting, trading, or spending workbook."
    },
    {
      Key: "No_Expense_Data",
      Value: "Daily_Log does not contain money, expenses, cost, price, spending, revenue, or THB columns."
    },
    {
      Key: "Water_ml",
      Value: "Water_ml means plain water intake in milliliters. For example, 3750 means 3,750 ml of water, not 3,750 baht."
    },
    {
      Key: "Scores",
      Value: "Sugar_Score, Caffeine_Score, and Load_Score are descriptive self-care signals, not medical scores and not money."
    },
    {
      Key: "Mind_State",
      Value: "Mind and Mind_Note fields are self-reported categories/text, not mental-health diagnosis or personality inference."
    },
    {
      Key: "Practice_Context",
      Value: "Practice fields are optional context. Practice_Minutes is duration in minutes, not a spiritual score or merit score."
    },
    {
      Key: "Reflection_Root",
      Value: "Reflection_Root is a user-selected reflection focus/intention from the manual picker. It is not diagnosis, medical advice, an AI recommendation, an importance score, or a causal claim."
    },
    {
      Key: "Medical_Boundary",
      Value: "Do not diagnose, prescribe, or replace professional medical advice."
    },
    {
      Key: "Interpretation_Rule",
      Value: "Use Column_Guide for column meanings, units, and forbidden interpretations. If unclear, say unclear instead of guessing."
    },
    {
      Key: "Forbidden_Global_Inference",
      Value: "Do not infer money, expenses, cost, price, THB, revenue, financial behavior, diagnosis, personality, or self-worth from numeric or text fields."
    }
  ];
}

const COLUMN_SEMANTIC_GUIDE = {
  "Daily_Log.Energy": {
    unit: "category/text",
    dataType: "text",
    allowed: "User-selected energy category for the day",
    forbidden: "medical diagnosis, productivity score, self-worth judgment, money"
  },
  "Daily_Log.Mind": {
    unit: "category/text",
    dataType: "text",
    allowed: "User-selected overall mind-state category for the day",
    forbidden: "mental-health diagnosis, personality inference, clinical assessment, self-worth judgment"
  },
  "Daily_Log.Sleep": {
    unit: "category/text",
    dataType: "text",
    allowed: "User-selected sleep category or qualitative sleep signal",
    forbidden: "medical diagnosis, sleep disorder diagnosis, money"
  },
  "Daily_Log.Sleep_Hours": {
    unit: "hours",
    dataType: "number",
    allowed: "Self-reported sleep duration in hours",
    forbidden: "money, cost, score, medical diagnosis"
  },
  "Daily_Log.Water_ml": {
    unit: "ml",
    dataType: "number",
    allowed: "Daily plain water intake in milliliters",
    forbidden: "money, expense, cost, price, THB, spending, revenue",
    aiNote: "3750 means 3,750 ml of water, not 3,750 baht."
  },
  "Daily_Log.Drinks": {
    unit: "text/list",
    dataType: "text",
    allowed: "Logged drink names or summaries for the day",
    forbidden: "expense list, price list, purchase history, financial transaction"
  },
  "Daily_Log.Sweet_Drinks_Count": {
    unit: "count",
    dataType: "number",
    allowed: "Count of logged drinks with visible sweetness load",
    forbidden: "grams of sugar, calories, money, expense"
  },
  "Daily_Log.Drink_Profile_JSON": {
    unit: "JSON",
    dataType: "json/text",
    allowed: "Structured drink profile context such as type, sweetness, caffeine, milk, and amount",
    forbidden: "financial transaction data, purchase receipt, expense record"
  },
  "Daily_Log.Activities": {
    unit: "text/list",
    dataType: "text",
    allowed: "User-selected activity/load context for the day",
    forbidden: "profession inference, identity claim, productivity score, money"
  },
  "Daily_Log.Energy_Causes": {
    unit: "text/list",
    dataType: "text",
    allowed: "User-selected factors that may affect energy or recovery",
    forbidden: "medical diagnosis, productivity score, blame, money"
  },
  "Daily_Log.Hydration_Status": {
    unit: "text",
    dataType: "text",
    allowed: "Gentle hydration self-care cue derived from logged water/drink context",
    forbidden: "medical treatment, diagnosis, command, money"
  },
  "Daily_Log.Reflection_Root": {
    unit: "none",
    dataType: "categorical key",
    allowed: "User-selected root/focus for the generated Reflection",
    forbidden: "diagnosis, medical advice, AI recommendation, importance score"
  },
  "Daily_Log.Reflection_Root_Label": {
    unit: "none",
    dataType: "text",
    allowed: "Localized display label for the user-selected Reflection Root",
    forbidden: "diagnosis, medical advice, score, ranking"
  },
  "Daily_Log.Reflection_Root_Source": {
    unit: "none",
    dataType: "text",
    allowed: "Source of Reflection Root selection, currently manual_picker",
    forbidden: "auto diagnosis, hidden AI-chosen conclusion, medical recommendation"
  },
  "Daily_Log.Reflection_Root_Declaration": {
    unit: "text",
    dataType: "text",
    allowed: "NuTuenSai root opening/declaration shown for this reflection",
    forbidden: "medical conclusion, causal claim, diagnosis, importance score"
  },
  "Daily_Log.Sugar_Score": {
    unit: "descriptive score",
    dataType: "number",
    allowed: "Approximate descriptive sugar-load signal from drink profile",
    forbidden: "exact grams of sugar, calories, medical diagnosis, money"
  },
  "Daily_Log.Caffeine_Score": {
    unit: "descriptive score",
    dataType: "number",
    allowed: "Approximate descriptive caffeine-load signal from drink profile",
    forbidden: "exact mg caffeine unless explicitly provided, medical diagnosis, money"
  },
  "Daily_Log.Milk_Drink_Count": {
    unit: "count",
    dataType: "number",
    allowed: "Count of logged milk-containing drinks",
    forbidden: "money, expense, dairy diagnosis"
  },
  "Daily_Log.Hydration_Support_Count": {
    unit: "count",
    dataType: "number",
    allowed: "Count of drinks that may lightly support hydration context",
    forbidden: "medical treatment, diagnosis, money"
  },
  "Daily_Log.Run_Detail_JSON": {
    unit: "JSON",
    dataType: "json/text",
    allowed: "Running distance/duration/sweat context if provided",
    forbidden: "race result, medical diagnosis, exact training prescription"
  },
  "Daily_Log.Load_Score": {
    unit: "descriptive score",
    dataType: "number",
    allowed: "Descriptive activity/load signal for the day",
    forbidden: "performance judgment, medical risk, diagnosis, money"
  },
  "Daily_Log.Load_Level": {
    unit: "category/text",
    dataType: "text",
    allowed: "Descriptive load category for the day",
    forbidden: "medical diagnosis, performance judgment, money"
  },
  "Daily_Log.Tomorrow_Focus": {
    unit: "text",
    dataType: "text",
    allowed: "Gentle reflection output or next-day focus text",
    forbidden: "medical advice, diagnosis, instruction, command"
  },
  "Daily_Log.NuTuenSai_Reminder": {
    unit: "text",
    dataType: "text",
    allowed: "Gentle reflection output or reminder text",
    forbidden: "medical advice, diagnosis, instruction, command"
  },
  "Daily_Log.Practice_Minutes": {
    unit: "minutes",
    dataType: "number",
    allowed: "Optional practice duration context",
    forbidden: "spiritual score, merit score, achievement score, self-worth judgment"
  },
  "Daily_Log.Practice_Context_JSON": {
    unit: "JSON",
    dataType: "json/text",
    allowed: "Structured optional practice context for Field Review",
    forbidden: "spiritual score, diagnosis, self-worth judgment"
  },
  "Daily_Log.Practice_Root": {
    unit: "category/text",
    dataType: "text",
    allowed: "Optional practice base selected by the user",
    forbidden: "spiritual score, merit score, personality inference, self-worth judgment"
  },
  "Daily_Log.Practice_Type": {
    unit: "category/text",
    dataType: "text",
    allowed: "Optional practice type selected by the user",
    forbidden: "spiritual score, merit score, personality inference, self-worth judgment"
  },
  "Daily_Log.Practice_Note": {
    unit: "text",
    dataType: "text",
    allowed: "Optional short note about practice context, good action, or remembered wholesome context",
    forbidden: "merit score, self-worth judgment, diagnosis"
  },
  "Daily_Log.Mind_Note_Text": {
    unit: "text",
    dataType: "text",
    allowed: "User-owned qualitative note for the day",
    forbidden: "diagnosis, therapy assessment, personality inference"
  },
  "Daily_Log.Mind_Note_Feeling": {
    unit: "category/text",
    dataType: "text",
    allowed: "User-selected feeling label for the Mind Note",
    forbidden: "diagnosis, personality inference"
  },
  "Daily_Log.Mind_Note_Support": {
    unit: "category/text",
    dataType: "text",
    allowed: "User-selected support need for the note",
    forbidden: "clinical recommendation, diagnosis, dependency assessment"
  },
  "Reflections.Reflection_Root": {
    unit: "none",
    dataType: "categorical key",
    allowed: "User-selected root/focus for the generated Reflection",
    forbidden: "diagnosis, medical advice, AI recommendation, importance score"
  },
  "Reflections.Reflection_Root_Label": {
    unit: "none",
    dataType: "text",
    allowed: "Localized display label for the user-selected Reflection Root",
    forbidden: "diagnosis, medical advice, score, ranking"
  },
  "Reflections.Reflection_Root_Source": {
    unit: "none",
    dataType: "text",
    allowed: "Source of Reflection Root selection, currently manual_picker",
    forbidden: "auto diagnosis, hidden AI-chosen conclusion, medical recommendation"
  },
  "Reflections.Reflection_Root_Declaration": {
    unit: "text",
    dataType: "text",
    allowed: "NuTuenSai root opening/declaration shown for this reflection",
    forbidden: "medical conclusion, causal claim, diagnosis, importance score"
  },
  "Reflections.Reflection_Text": {
    unit: "text",
    dataType: "text",
    allowed: "Generated or user-edited reflection text saved by the user",
    forbidden: "medical advice, diagnosis, command, raw evidence, financial inference"
  },
  "AI_Context.Key": {
    unit: "text",
    dataType: "text",
    allowed: "Workbook-level context key for AI/human readers",
    forbidden: "data value, diagnosis, financial inference"
  },
  "AI_Context.Value": {
    unit: "text",
    dataType: "text",
    allowed: "Workbook-level semantic guardrail for AI/human readers",
    forbidden: "raw Daily_Log evidence, diagnosis, financial inference"
  }
};

function getColumnSemanticGuide(sheet, column) {
  const specific = COLUMN_SEMANTIC_GUIDE[`${sheet}.${column}`] || {};
  return {
    unit: specific.unit || inferColumnUnit(column),
    dataType: specific.dataType || inferColumnDataType(column),
    allowed: specific.allowed || "Use according to the Meaning and AI_Read_Note for this row.",
    forbidden: specific.forbidden || getDefaultForbiddenInterpretation(sheet, column),
    aiNote: specific.aiNote || ""
  };
}

function inferColumnUnit(column = "") {
  if (/_ml$/i.test(column)) return "ml";
  if (/Hours$/i.test(column)) return "hours";
  if (/Minutes$/i.test(column)) return "minutes";
  if (/Count|Days|Total|Score|Average/i.test(column)) return "number";
  if (/JSON$/i.test(column)) return "JSON";
  if (/Date|Start|End/i.test(column)) return "date/text";
  return "text";
}

function inferColumnDataType(column = "") {
  if (/JSON$/i.test(column)) return "json/text";
  if (/_ml$|Hours$|Minutes$|Count|Days|Total|Score|Average/i.test(column)) return "number";
  return "text";
}

function getDefaultForbiddenInterpretation(sheet, column) {
  if (sheet === "Daily_Log") {
    return "money, expense, cost, price, THB, diagnosis, self-worth judgment";
  }
  if (sheet === "Summary" || sheet === "Field_Review") {
    return "diagnosis, prediction, score of the user's worth, financial inference";
  }
  return "diagnosis, financial inference, self-worth judgment";
}

function buildColumnGuideRows() {
  const row = ({
    sheet,
    column,
    thai,
    english,
    meaning,
    aiNote,
    example = "",
    canonical = true
  }) => {
    const semantic = getColumnSemanticGuide(sheet, column);
    const finalAiNote = semantic.aiNote || aiNote;

    return {
      Sheet: sheet,
      Column: column,
      Meaning: meaning,
      Unit: semantic.unit,
      Data_Type: semantic.dataType,
      Allowed_Interpretation: semantic.allowed,
      Forbidden_Interpretation: semantic.forbidden,
      AI_Read_Note: finalAiNote,
      Thai_Label: thai,
      English_Label: english,
      AI_Reading_Note: finalAiNote,
      Example_Value: example,
      Is_Canonical: canonical ? "yes" : "no"
    };
  };

  return [
    row({
      sheet: "Daily_Log",
      column: "Date",
      thai: "วันที่",
      english: "Date",
      meaning: "วันที่ของบันทึกหนึ่ง row",
      aiNote: "Use as the primary daily timeline key. Do not infer frequency beyond available rows.",
      example: "2026-06-03"
    }),
    row({
      sheet: "Daily_Log",
      column: "Energy",
      thai: "พลังงานวันนี้",
      english: "Energy",
      meaning: "ระดับพลังงานที่ผู้ใช้เลือกในวันนั้น",
      aiNote: "Read as a self-reported pattern signal, not a performance score.",
      example: "ต่ำ / Medium / ดี"
    }),
    row({
      sheet: "Daily_Log",
      column: "Mind",
      thai: "ใจโดยรวมวันนี้",
      english: "Overall mind today",
      meaning: "สเกลภาวะใจโดยรวมของวัน เรียงจากหนักไปเบา/ดี เช่น หนักมาก ไม่สบายใจ กดดัน เฉย ๆ พอไหว รู้สึกดี ผ่อนคลาย",
      aiNote: "Read as an ordered descriptive context signal, not a score, diagnosis, identity claim, or proof that the whole day was good/bad.",
      example: "พอไหว"
    }),
    row({
      sheet: "Daily_Log",
      column: "Sleep",
      thai: "การนอน",
      english: "Sleep",
      meaning: "คุณภาพ/ปริมาณการนอนที่ผู้ใช้เลือก",
      aiNote: "Low sleep is a recovery signal, not a diagnosis or health risk prediction.",
      example: "น้อย / Low / 低"
    }),
    row({
      sheet: "Daily_Log",
      column: "Sleep_Hours",
      thai: "จำนวนชั่วโมงนอน",
      english: "Sleep hours",
      meaning: "จำนวนชั่วโมงนอนที่ผู้ใช้กรอกเองแบบ optional",
      aiNote: "Self-reported sleep duration. Derive category gently and do not use as diagnosis.",
      example: "6.5"
    }),
    row({
      sheet: "Daily_Log",
      column: "Water_ml",
      thai: "ปริมาณน้ำดื่ม (มล.)",
      english: "Water in milliliters",
      meaning: "ปริมาณน้ำเปล่าที่บันทึกโดยประมาณ",
      aiNote: "Use as hydration context and self-care cue. Do not turn into medical advice.",
      example: "2268"
    }),
    row({
      sheet: "Daily_Log",
      column: "Drinks",
      thai: "เครื่องดื่มอื่น",
      english: "Other drinks",
      meaning: "สรุปเครื่องดื่มอื่นที่ไม่ใช่น้ำเปล่าในวันนั้น",
      aiNote: "Read alongside sweetness, caffeine, and Drink_Profile_JSON.",
      example: "กาแฟนม | น้ำอัดลม"
    }),
    row({
      sheet: "Daily_Log",
      column: "Sweet_Drinks_Count",
      thai: "จำนวนเครื่องดื่มที่มีความหวาน",
      english: "Sweet drink count",
      meaning: "จำนวนรายการเครื่องดื่มที่มี sweetness score ระดับนับเป็น sweet load",
      aiNote: "Drink-load signal, not a moral score. One row can contain multiple drinks.",
      example: "1"
    }),
    row({
      sheet: "Daily_Log",
      column: "Drink_Profile_JSON",
      thai: "รายละเอียดเครื่องดื่มแบบ JSON",
      english: "Structured drink profile JSON",
      meaning: "ข้อมูล structured ของ drink type, sweetness, caffeine, milk และ amount",
      aiNote: "Use this for robust drink interpretation. Soda is not automatically sweet; read sweetness field.",
      example: "[{\"type\":\"soda\",\"sweetness\":\"low\"}]"
    }),
    row({
      sheet: "Daily_Log",
      column: "Sugar_Score",
      thai: "คะแนนความหวานรวม",
      english: "Sugar score",
      meaning: "คะแนนรวมจากระดับ Sweetness ของเครื่องดื่ม",
      aiNote: "Use as a drink-load signal only, not diet advice or medical interpretation.",
      example: "2"
    }),
    row({
      sheet: "Daily_Log",
      column: "Caffeine_Score",
      thai: "คะแนนคาเฟอีนรวม",
      english: "Caffeine score",
      meaning: "คะแนนรวมจากระดับคาเฟอีนของเครื่องดื่ม",
      aiNote: "Read with sleep, energy, hydration, and recovery. Do not judge coffee as wrong.",
      example: "2"
    }),
    row({
      sheet: "Daily_Log",
      column: "Milk_Drink_Count",
      thai: "จำนวนเครื่องดื่มใส่นม",
      english: "Milk drink count",
      meaning: "จำนวนเครื่องดื่มที่เลือก Milk = yes",
      aiNote: "Descriptive drink context only.",
      example: "1"
    }),
    row({
      sheet: "Daily_Log",
      column: "Hydration_Support_Count",
      thai: "จำนวนเครื่องดื่มที่ช่วยเป็น hydration context",
      english: "Hydration support count",
      meaning: "จำนวนเครื่องดื่มที่อาจช่วยเป็น hydration support แบบอ่อน ๆ",
      aiNote: "Use gently with water base. Do not replace plain water interpretation automatically.",
      example: "1"
    }),
    row({
      sheet: "Daily_Log",
      column: "Activities",
      thai: "กิจกรรม / load วันนี้",
      english: "Activities",
      meaning: "กิจกรรมที่ผู้ใช้เลือกใน Load & Recovery",
      aiNote: "Use for activity load roots. Do not infer profession or identity.",
      example: "Deep work / coding นาน | วันเบา / ฟื้นตัว"
    }),
    row({
      sheet: "Daily_Log",
      column: "Run_Detail_JSON",
      thai: "รายละเอียดการวิ่งแบบ JSON",
      english: "Run detail JSON",
      meaning: "รายละเอียดการวิ่ง optional เช่น type, distanceKm, durationMin, avgPace และ sweat",
      aiNote: "Optional running context for load, hydration, and recovery. Not training advice, pace judgment, or performance coaching.",
      example: "{\"type\":\"longRun\",\"distanceKm\":13,\"durationMin\":95,\"avgPace\":\"7:18/km\",\"sweat\":\"high\"}"
    }),
    row({
      sheet: "Daily_Log",
      column: "Energy_Causes",
      thai: "เหตุที่เกี่ยวกับพลังงาน",
      english: "Energy causes",
      meaning: "เหตุที่อาจทำให้พลังงานลดลงหรือช่วยพยุงพลังงาน",
      aiNote: "Layered signal. Support factors are not performance scores.",
      example: "sleep_low | light_mind"
    }),
    row({
      sheet: "Daily_Log",
      column: "Load_Score",
      thai: "คะแนน load",
      english: "Load score",
      meaning: "คะแนนรวมจาก activity/load ที่เลือก",
      aiNote: "Use as rough load context, not a judgment of user effort.",
      example: "6"
    }),
    row({
      sheet: "Daily_Log",
      column: "Load_Level",
      thai: "ระดับ load",
      english: "Load level",
      meaning: "ระดับ load แบบอ่านง่าย เช่น เบา กลาง สูง",
      aiNote: "High load should invite recovery, not pressure or blame.",
      example: "Load สูง"
    }),
    row({
      sheet: "Daily_Log",
      column: "Hydration_Status",
      thai: "สถานะน้ำ / hydration cue",
      english: "Hydration status",
      meaning: "ข้อความสะท้อน hydration ของวัน",
      aiNote: "Self-care cue only. Not medical hydration advice.",
      example: "น้ำเปล่ายังเป็นฐานที่ดี"
    }),
    row({
      sheet: "Daily_Log",
      column: "Tomorrow_Focus",
      thai: "โฟกัสพรุ่งนี้",
      english: "Tomorrow focus",
      meaning: "คำชวนดูแลต่อวันถัดไปแบบสั้น",
      aiNote: "Read as gentle next self-care cue, not instruction.",
      example: "ให้ recovery มาก่อนการเพิ่มรอบใหม่"
    }),
    row({
      sheet: "Daily_Log",
      column: "NuTuenSai_Reminder",
      thai: "ข้อความเตือนใจ NuTuenSai",
      english: "NuTuenSai reminder",
      meaning: "ข้อความสะท้อน pattern ของวันแบบอ่อนโยน",
      aiNote: "Pattern reflection only. Do not treat as diagnosis or therapy.",
      example: "วันนี้ใช้สมองและสายตาต่อเนื่อง"
    }),
    row({
      sheet: "Daily_Log",
      column: "Practice_Root",
      thai: "รากฐานภาวนา",
      english: "Practice root",
      meaning: "หมวด practice context แบบ 4 ฐานที่เข้าใจง่าย เช่น กาย เวทนา จิต/คิด หรือธรรม",
      aiNote: "Stored for Field Review context. Excluded from daily Reflection/NuTuenSai; do not score or judge practice quality.",
      example: "mind_thought"
    }),
    row({
      sheet: "Daily_Log",
      column: "Practice_Type",
      thai: "รูปแบบภาวนา",
      english: "Practice type",
      meaning: "ตัวเลือก practice ที่ผู้ใช้เลือก เช่น walking, observe_mind, notice_wanting, none หรือ other",
      aiNote: "Optional user-owned practice context. Do not infer spiritual progress, attainment, or personality.",
      example: "observe_mind"
    }),
    row({
      sheet: "Daily_Log",
      column: "Practice_Minutes",
      thai: "จำนวนนาทีภาวนา",
      english: "Practice minutes",
      meaning: "ระยะเวลาภาวนาโดยประมาณที่แปลงจากชั่วโมงและนาทีเป็น total minutes",
      aiNote: "Descriptive duration only. Not a streak, score, achievement, or quality measure.",
      example: "15"
    }),
    row({
      sheet: "Daily_Log",
      column: "Practice_Context_JSON",
      thai: "บริบทการภาวนาแบบ JSON",
      english: "Practice context JSON",
      meaning: "JSON compact สำหรับ root, type, minutes, note, source และ reflectDaily=false",
      aiNote: "Field Review context only. reflectDaily=false means daily Reflection should intentionally ignore this field.",
      example: "{\"root\":\"mind_thought\",\"type\":\"observe_mind\",\"minutes\":15,\"note\":\"ไปให้อาหารปลาที่วัด\",\"source\":\"four_bases_daily_context\",\"reflectDaily\":false}"
    }),
    row({
      sheet: "Daily_Log",
      column: "Practice_Note",
      thai: "หมายเหตุภาวนา / สิ่งดีที่ได้ทำ",
      english: "Practice note / good action",
      meaning: "หมายเหตุสั้น ๆ เกี่ยวกับบริบทการภาวนา สิ่งดีที่ได้ทำ หรือบริบทกุศลกรรมที่ผู้ใช้อยากจำไว้",
      aiNote: "Qualitative field memory for Field Review only. Not a merit score, spiritual assessment, diagnosis, or daily Reflection input by default.",
      example: "ไปให้อาหารปลาที่วัด"
    }),
    row({
      sheet: "Daily_Log",
      column: "Mind_Note_Text",
      thai: "ข้อความ Mind Note",
      english: "Mind note text",
      meaning: "บันทึกใจหนึ่งบรรทัดของวันนั้น",
      aiNote: "User-owned inner context. Read gently and do not over-interpret.",
      example: "วันนี้ใจถือเรื่องงานไว้เยอะ"
    }),
    row({
      sheet: "Daily_Log",
      column: "Mind_Note_Feeling",
      thai: "ความรู้สึกของบันทึกนี้",
      english: "Mind note feeling",
      meaning: "feeling tone ของ Mind Note เฉพาะบันทึกนั้น",
      aiNote: "Note-level feeling, not whole-day diagnosis.",
      example: "uneasy"
    }),
    row({
      sheet: "Daily_Log",
      column: "Mind_Note_Support",
      thai: "สิ่งที่อยากได้รับการพยุง",
      english: "Mind note support need",
      meaning: "support need ที่ผู้ใช้เลือกสำหรับบันทึกนั้น",
      aiNote: "Use as user agency signal, not a command.",
      example: "rest_first"
    }),
    row({
      sheet: "Daily_Log",
      column: "Reflection_Root",
      thai: "แกน Reflection",
      english: "Reflection root",
      meaning: "คีย์ของแกนที่ผู้ใช้เลือกให้ NuTuenSai ใช้เป็นจุดตั้งต้นของ Reflection รอบนั้น",
      aiNote: "User-selected reflection intention only. Not an AI recommendation, diagnosis, or importance score.",
      example: "hydration"
    }),
    row({
      sheet: "Daily_Log",
      column: "Reflection_Root_Label",
      thai: "ชื่อแกน Reflection",
      english: "Reflection root label",
      meaning: "ชื่อแสดงผลของแกน Reflection ตามภาษาที่ผู้ใช้ใช้ตอนบันทึก",
      aiNote: "Display label only. Join with Reflection_Root for audit if needed.",
      example: "น้ำ"
    }),
    row({
      sheet: "Daily_Log",
      column: "Reflection_Root_Source",
      thai: "แหล่งที่มาของแกน Reflection",
      english: "Reflection root source",
      meaning: "บอกว่าแกน Reflection มาจาก manual picker ของผู้ใช้",
      aiNote: "manual_picker means user-selected. Do not treat as auto-selected conclusion.",
      example: "manual_picker"
    }),
    row({
      sheet: "Daily_Log",
      column: "Reflection_Root_Declaration",
      thai: "ประโยคเปิดแกน Reflection",
      english: "Reflection root declaration",
      meaning: "ประโยคเปิดของ NuTuenSai ที่อธิบายว่าจะอ่านผ่านแกนใด",
      aiNote: "Framing copy for Reflection. Not a medical conclusion or causal claim.",
      example: "รอบนี้หนูขออ่านผ่านแกน ‘น้ำ’ เป็นหลักนะคะ"
    }),
    row({
      sheet: "Summary",
      column: "Total_Logs",
      thai: "จำนวน log ทั้งหมด",
      english: "Total logs",
      meaning: "จำนวน row จาก Daily_Log ใน export",
      aiNote: "Row count, not necessarily unique days.",
      example: "14"
    }),
    row({
      sheet: "Summary",
      column: "Unique_Days",
      thai: "จำนวนวันที่ไม่ซ้ำ",
      english: "Unique days",
      meaning: "จำนวน Date ที่ไม่ซ้ำและไม่ว่าง",
      aiNote: "Use when reasoning about day count.",
      example: "14"
    }),
    row({
      sheet: "Summary",
      column: "Average_Water_ml",
      thai: "ค่าเฉลี่ยน้ำ (มล.)",
      english: "Average water",
      meaning: "ค่าเฉลี่ย Water_ml แบบ rounded",
      aiNote: "Descriptive summary only.",
      example: "2268"
    }),
    row({
      sheet: "Summary",
      column: "High_Load_Days",
      thai: "จำนวนวันที่ load สูง",
      english: "High-load days",
      meaning: "จำนวน row ที่เข้าเงื่อนไข high load",
      aiNote: "Invite recovery reflection, not blame.",
      example: "3"
    }),
    row({
      sheet: "Summary",
      column: "Low_Sleep_Days",
      thai: "จำนวนวันที่มีสัญญาณนอนน้อย",
      english: "Low-sleep days",
      meaning: "จำนวน row ที่มี low sleep signal จาก Sleep, Energy_Causes หรือ Activities",
      aiNote: "Recovery signal, not diagnosis.",
      example: "3"
    }),
    row({
      sheet: "Summary",
      column: "Sweet_Drink_Days",
      thai: "จำนวนวันที่มี drink-load จากความหวาน",
      english: "Sweet-drink days",
      meaning: "จำนวน row ที่มี sweet drink load ตาม helper เดียวกับ Field_Review",
      aiNote: "Drink-load signal, not moral score.",
      example: "1"
    }),
    row({
      sheet: "Summary",
      column: "Most_Common_Mind",
      thai: "ใจโดยรวมที่พบบ่อยที่สุด",
      english: "Most common mind state",
      meaning: "ค่า Mind ที่พบบ่อยที่สุดจาก log ที่ไม่ว่าง",
      aiNote: "Descriptive mode only. Mixed languages may count separately.",
      example: "ผ่อนคลาย"
    }),
    row({
      sheet: "Summary",
      column: "Summary_Note",
      thai: "ข้อความกำกับ Summary",
      english: "Summary note",
      meaning: "ข้อความคงที่ที่อธิบาย boundary ของ Summary",
      aiNote: "Static guardrail note, not data-derived AI analysis.",
      example: "Pattern reflection, not judgment"
    }),
    row({
      sheet: "Reflections",
      column: "Date",
      thai: "วันที่",
      english: "Date",
      meaning: "วันที่ของ reflection row",
      aiNote: "Join with Daily_Log by Date when needed.",
      example: "2026-06-03"
    }),
    row({
      sheet: "Reflections",
      column: "Reflection_Root",
      thai: "แกน Reflection",
      english: "Reflection root",
      meaning: "คีย์ของแกนที่ผู้ใช้เลือกให้ NuTuenSai ใช้เป็นจุดตั้งต้นของ Reflection รอบนั้น",
      aiNote: "User-selected reflection intention only. Not an AI recommendation, diagnosis, or importance score.",
      example: "sleep_recovery"
    }),
    row({
      sheet: "Reflections",
      column: "Reflection_Root_Label",
      thai: "ชื่อแกน Reflection",
      english: "Reflection root label",
      meaning: "ชื่อแสดงผลของแกน Reflection ตามภาษาที่ผู้ใช้ใช้ตอนบันทึก",
      aiNote: "Display label only. Keep raw root key visible for audit.",
      example: "การพัก / การนอน"
    }),
    row({
      sheet: "Reflections",
      column: "Reflection_Root_Source",
      thai: "แหล่งที่มาของแกน Reflection",
      english: "Reflection root source",
      meaning: "บอกว่าแกน Reflection มาจาก manual picker ของผู้ใช้",
      aiNote: "manual_picker means user-selected. Do not treat as auto-selected conclusion.",
      example: "manual_picker"
    }),
    row({
      sheet: "Reflections",
      column: "Reflection_Root_Declaration",
      thai: "ประโยคเปิดแกน Reflection",
      english: "Reflection root declaration",
      meaning: "ประโยคเปิดของ NuTuenSai ที่อธิบายว่าจะอ่านผ่านแกนใด",
      aiNote: "Framing copy for Reflection. Not a medical conclusion or causal claim.",
      example: "รอบนี้หนูขออ่านผ่านแกน ‘การพัก/การนอน’ เป็นหลักนะคะ"
    }),
    row({
      sheet: "Reflections",
      column: "Mind_Note_Text",
      thai: "ข้อความ Mind Note",
      english: "Mind note text",
      meaning: "Mind Note text copied for reflection review",
      aiNote: "Read as user-owned context.",
      example: "วันนี้ใจถือเรื่องงานไว้เยอะ"
    }),
    row({
      sheet: "Reflections",
      column: "Mind_Note_Feeling",
      thai: "ความรู้สึกของบันทึกนี้",
      english: "Mind note feeling",
      meaning: "Feeling tone of that Mind Note",
      aiNote: "Note-level signal only.",
      example: "uneasy"
    }),
    row({
      sheet: "Reflections",
      column: "Mind_Note_Support",
      thai: "สิ่งที่อยากได้รับการพยุง",
      english: "Mind note support need",
      meaning: "Support need selected with Mind Note",
      aiNote: "Preserve user agency.",
      example: "set_down"
    }),
    row({
      sheet: "Reflections",
      column: "Reflection_Text",
      thai: "ข้อความ Reflection",
      english: "Reflection text",
      meaning: "Generated or edited reflection saved by the user",
      aiNote: "Use as user-approved reflection text, not clinical conclusion.",
      example: "วันนี้ใช้สมองและสายตาต่อเนื่อง 🩵"
    }),
    row({
      sheet: "Field_Context",
      column: "Section",
      thai: "หัวข้อบริบท",
      english: "Context section",
      meaning: "หัวข้อของ workbook boundary/context",
      aiNote: "Read before interpreting data.",
      example: "AI_Reading_Boundary",
      canonical: false
    }),
    row({
      sheet: "Field_Context",
      column: "Value",
      thai: "รายละเอียดบริบท",
      english: "Context value",
      meaning: "คำอธิบายขอบเขตการอ่าน workbook",
      aiNote: "Follow these boundaries when using the workbook.",
      example: "Do not use it for diagnosis.",
      canonical: false
    }),
    row({
      sheet: "AI_Context",
      column: "Key",
      thai: "คีย์บริบทสำหรับ AI",
      english: "AI context key",
      meaning: "ชื่อหัวข้อของ semantic guard ระดับ workbook",
      aiNote: "Read these rows before interpreting Daily_Log values.",
      example: "Not_Finance_Workbook",
      canonical: false
    }),
    row({
      sheet: "AI_Context",
      column: "Value",
      thai: "รายละเอียดบริบทสำหรับ AI",
      english: "AI context value",
      meaning: "ข้อความกำกับความหมายและข้อห้ามการตีความระดับ workbook",
      aiNote: "Use these guardrails to avoid misreading self-care numbers as finance, diagnosis, or self-worth.",
      example: "Water_ml means plain water intake in milliliters, not baht.",
      canonical: false
    }),
    row({
      sheet: "Field_Review",
      column: "Review_Period_Start",
      thai: "วันเริ่มต้นช่วง review",
      english: "Review period start",
      meaning: "วันที่แรกใน log ที่ใช้สร้าง Field_Review",
      aiNote: "Use as descriptive period boundary.",
      example: "2026-06-01",
      canonical: false
    }),
    row({
      sheet: "Field_Review",
      column: "Review_Period_End",
      thai: "วันสิ้นสุดช่วง review",
      english: "Review period end",
      meaning: "วันที่สุดท้ายใน log ที่ใช้สร้าง Field_Review",
      aiNote: "Use as descriptive period boundary.",
      example: "2026-06-14",
      canonical: false
    }),
    row({
      sheet: "Field_Review",
      column: "Total_Days",
      thai: "จำนวน row ในช่วง review",
      english: "Total days/log rows",
      meaning: "จำนวน clean rows ที่ Field_Review ใช้",
      aiNote: "Descriptive review count; do not overstate as complete behavior history.",
      example: "14",
      canonical: false
    }),
    row({
      sheet: "Field_Review",
      column: "Average_Water_ml",
      thai: "ค่าเฉลี่ยน้ำในช่วง review",
      english: "Average water in review",
      meaning: "ค่าเฉลี่ย Water_ml จาก rows ใน Field_Review",
      aiNote: "Descriptive summary only.",
      example: "2268",
      canonical: false
    }),
    row({
      sheet: "Field_Review",
      column: "High_Load_Days",
      thai: "จำนวนวันที่ load สูง",
      english: "High-load days",
      meaning: "จำนวน rows ที่เข้าเงื่อนไข high load",
      aiNote: "Use to ask gentle recovery questions, not to judge.",
      example: "3",
      canonical: false
    }),
    row({
      sheet: "Field_Review",
      column: "Low_Energy_Days",
      thai: "จำนวนวันที่พลังงานต่ำ",
      english: "Low-energy days",
      meaning: "จำนวน rows ที่ Energy เป็น low",
      aiNote: "Pattern signal, not diagnosis.",
      example: "2",
      canonical: false
    }),
    row({
      sheet: "Field_Review",
      column: "Common_Mind_States",
      thai: "ใจโดยรวมที่พบบ่อย",
      english: "Common mind states",
      meaning: "Mind states ที่พบบ่อยพร้อมจำนวน",
      aiNote: "Use as descriptive starting point, not personality inference.",
      example: "พอไหว (5) | ไม่สบายใจ (2)",
      canonical: false
    }),
    row({
      sheet: "Field_Review",
      column: "Drink_Load_Observation",
      thai: "ข้อสังเกต drink-load",
      english: "Drink-load observation",
      meaning: "ข้อความ descriptive summary เรื่อง sweetness/soda/caffeine context",
      aiNote: "Drink-load signal only. Avoid guilt, diet advice, or medical advice.",
      example: "Some drink sweetness appears...",
      canonical: false
    }),
    row({
      sheet: "Field_Review",
      column: "Gentle_Observation",
      thai: "ข้อสังเกตแบบอ่อนโยน",
      english: "Gentle observation",
      meaning: "ข้อความกำกับการอ่าน Field_Review แบบไม่ตัดสิน",
      aiNote: "Use as review boundary and tone cue.",
      example: "Look for relationships gently...",
      canonical: false
    }),
    row({
      sheet: "Field_Review",
      column: "Non_Diagnostic_Note",
      thai: "หมายเหตุไม่ใช่การวินิจฉัย",
      english: "Non-diagnostic note",
      meaning: "ข้อความย้ำว่า Field_Review เป็น descriptive summary",
      aiNote: "Must be respected by AI and future v2.0 review flows.",
      example: "Not medical advice, not diagnosis.",
      canonical: false
    })
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
  const totalLogs = rows.length;
  const uniqueDays = getUniqueLogDateCount(rows);
  const averageWater = totalLogs
    ? Math.round(rows.reduce((sum, row) => sum + (Number(row.Water_ml) || 0), 0) / totalLogs)
    : 0;

  return {
    Total_Logs: totalLogs,
    Unique_Days: uniqueDays || totalLogs,
    Average_Water_ml: averageWater,
    High_Load_Days: rows.filter(isHighLoadRow).length,
    Low_Sleep_Days: rows.filter(rowHasLowSleepSignal).length,
    Sweet_Drink_Days: rows.filter(rowHasSweetDrinkLoad).length,
    Most_Common_Mind: getMostCommon(rows.map((row) => row.Mind).filter(Boolean)),
    Summary_Note: t("overallMessage")
  };
}

function getUniqueLogDateCount(rows = []) {
  const dates = rows
    .map((row) => String(row?.Date || "").trim())
    .filter(Boolean);
  return new Set(dates).size;
}

function rowHasLowSleepSignal(row) {
  const sleepHours = normalizeSleepHours(row?.Sleep_Hours);
  if (sleepHours !== "" && sleepHours < 5) return true;

  const sleepValue = String(row?.Sleep || "").trim();
  if (["น้อย", "Low", "低", "少"].includes(sleepValue)) return true;

  const energyCauses = splitLogValues(row?.Energy_Causes);
  if (energyCauses.some((cause) => ["sleep_low", "นอนน้อย", "Low sleep", "睡得少"].includes(cause))) {
    return true;
  }

  return splitLogValues(row?.Activities)
    .map((activity) => activity === "lowSleep" ? "นอนน้อย" : activity)
    .some((activity) => {
      const option = getActivityOptionByValue(activity);
      return option?.key === "lowSleep" || ["lowSleep", "นอนน้อย", "Low sleep", "睡得少"].includes(activity);
    });
}

function getMostCommon(values) {
  if (!values.length) return "";
  const counts = values.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function getAllFieldReviewRows() {
  return getDailyLog()
    .map(normalizeLogRow)
    .filter((row) => row.Date)
    .sort((a, b) => String(a.Date).localeCompare(String(b.Date)));
}

function getFieldReviewRows(timeframe = "7") {
  const allRows = getAllFieldReviewRows();
  if (timeframe === "all") return allRows;

  const limit = Number(timeframe);
  if (!Number.isFinite(limit) || limit <= 0) return allRows.slice(-7);
  return allRows.slice(-limit);
}

function formatReviewNumber(value) {
  return Number(value || 0).toLocaleString(translations[currentLanguage].locale);
}

function hasLowSleepRecoverySignal(row) {
  const sleepHours = normalizeSleepHours(row?.Sleep_Hours);
  return rowHasLowSleepSignal(row) || (sleepHours !== "" && sleepHours < 6);
}

function getHydrationReferenceForLogRow(row = {}) {
  return getHydrationTierFromActivity({
    activities: splitLogValues(row.Activities),
    loadScore: Number(row.Load_Score) || 0,
    energy: isLowEnergyValue(row.Energy) ? "ต่ำ" : row.Energy,
    mind: row.Mind,
    sleepLow: hasLowSleepRecoverySignal(row)
  });
}

function getFieldReviewStats(rows = [], totalRows = rows.length) {
  const selectedRows = rows.map(normalizeLogRow);
  const hydrationDays = selectedRows
    .map((row) => ({
      row,
      water: Number(row.Water_ml) || 0,
      reference: getHydrationReferenceForLogRow(row)
    }))
    .filter((day) => day.water > 0);
  const waterValues = hydrationDays.map((day) => day.water);
  const hydrationDaysInRange = hydrationDays.filter((day) => (
    day.water >= day.reference.rangeMin && day.water <= day.reference.rangeMax
  ));
  const hydrationDaysBelowRange = hydrationDays.filter((day) => day.water < day.reference.rangeMin);
  const hydrationDaysAboveRange = hydrationDays.filter((day) => day.water > day.reference.rangeMax);
  const highLoadRows = selectedRows.filter(isHighLoadRow);
  const lowSleepRows = selectedRows.filter(hasLowSleepRecoverySignal);
  const lowEnergyRows = selectedRows.filter((row) => isLowEnergyValue(row.Energy));
  const drinkContextRows = selectedRows.filter((row) => Number(row.Caffeine_Score) > 0 || rowHasSweetDrinkLoad(row));

  return {
    rows: selectedRows,
    totalRows,
    selectedCount: selectedRows.length,
    waterValues,
    averageWater: waterValues.length
      ? Math.round(waterValues.reduce((sum, value) => sum + value, 0) / waterValues.length)
      : 0,
    averageHydrationRangeMin: hydrationDays.length
      ? Math.round(hydrationDays.reduce((sum, day) => sum + day.reference.rangeMin, 0) / hydrationDays.length)
      : 0,
    averageHydrationRangeMax: hydrationDays.length
      ? Math.round(hydrationDays.reduce((sum, day) => sum + day.reference.rangeMax, 0) / hydrationDays.length)
      : 0,
    minWater: waterValues.length ? Math.min(...waterValues) : 0,
    maxWater: waterValues.length ? Math.max(...waterValues) : 0,
    hydrationDaysInRange,
    hydrationDaysBelowRange,
    hydrationDaysAboveRange,
    lowSleepRows,
    lowEnergyRows,
    highLoadRows,
    highLoadLowWaterRows: hydrationDaysBelowRange
      .filter((day) => isHighLoadRow(day.row))
      .map((day) => day.row),
    highLoadLowSleepRows: highLoadRows.filter(hasLowSleepRecoverySignal),
    highLoadLowEnergyRows: highLoadRows.filter((row) => isLowEnergyValue(row.Energy)),
    caffeineDays: selectedRows.filter((row) => Number(row.Caffeine_Score) > 0).length,
    sweetDrinkDays: selectedRows.filter(rowHasSweetDrinkLoad).length,
    drinkContextDays: drinkContextRows.length,
    highSugarDays: selectedRows.filter(rowHasHighSugarLoad).length,
    mindNoteDays: selectedRows.filter((row) => String(row.Mind_Note_Text || "").trim()).length,
    supportDays: selectedRows.filter((row) => String(row.Mind_Note_Support || "").trim()).length,
    practiceNoteDays: selectedRows.filter((row) => String(row.Practice_Note || "").trim()).length,
    missingSleepDays: selectedRows.filter((row) => !String(row.Sleep || "").trim() && normalizeSleepHours(row.Sleep_Hours) === "").length,
    missingWaterDays: selectedRows.filter((row) => Number(row.Water_ml) <= 0).length,
    missingActivitiesDays: selectedRows.filter((row) => !String(row.Activities || "").trim()).length,
    missingMindNoteDays: selectedRows.filter((row) => !String(row.Mind_Note_Text || "").trim()).length
  };
}

function getFieldReviewWindowVoice(timeframe = "7") {
  if (timeframe === "all") return t("fieldReviewWindowVoiceAll");
  if (timeframe === "30") return t("fieldReviewWindowVoice30");
  if (timeframe === "14") return t("fieldReviewWindowVoice14");
  return t("fieldReviewWindowVoice7");
}

function getHydrationAdequacyReadingKey(stats) {
  if (!stats.waterValues.length) return "fieldReviewHydrationReadingEmpty";
  const nearLowerMargin = Math.max(250, Math.round(stats.averageHydrationRangeMin * 0.1));
  if (stats.averageWater < stats.averageHydrationRangeMin - nearLowerMargin) {
    return "fieldReviewHydrationReadingBelow";
  }
  if (stats.averageWater < stats.averageHydrationRangeMin) {
    return "fieldReviewHydrationReadingNearLower";
  }
  if (stats.averageWater <= stats.averageHydrationRangeMax) {
    return "fieldReviewHydrationReadingInRange";
  }
  return "fieldReviewHydrationReadingAbove";
}

function buildNuTuenSaiCardReading(cardType, stats, timeframe = "7") {
  if (cardType === "hydration") {
    const hydrationKey = getHydrationAdequacyReadingKey(stats);
    if (!stats.waterValues.length) return t(hydrationKey);
    return `${t(hydrationKey)} ${t("fieldReviewHydrationReadingCount", {
      inRange: formatReviewNumber(stats.hydrationDaysInRange.length),
      recorded: formatReviewNumber(stats.waterValues.length)
    })}`;
  }

  const windowVoice = getFieldReviewWindowVoice(timeframe);
  const keyByType = {
    sleep: stats.lowSleepRows.length > 0 || stats.lowEnergyRows.length > 0
      ? "fieldReviewSleepReadingSignal"
      : "fieldReviewSleepReadingLight",
    load: stats.highLoadRows.length
      ? "fieldReviewLoadReadingHigh"
      : "fieldReviewLoadReadingLight",
    drinks: stats.caffeineDays > 0 || stats.sweetDrinkDays > 0 || stats.highSugarDays > 0
      ? "fieldReviewDrinksReadingSignal"
      : "fieldReviewDrinksReadingLight",
    mind: stats.mindNoteDays > 0 || stats.supportDays > 0 || stats.practiceNoteDays > 0
      ? "fieldReviewMindReadingSignal"
      : "fieldReviewMindReadingEmpty",
    missing: stats.missingSleepDays || stats.missingWaterDays || stats.missingActivitiesDays || stats.missingMindNoteDays
      ? "fieldReviewMissingReadingSignal"
      : "fieldReviewMissingReadingLight"
  };

  return `${windowVoice} ${t(keyByType[cardType])}`;
}

function buildNuTuenSaiNextAttention(cardType, stats) {
  const keyByType = {
    hydration: stats.highLoadLowWaterRows.length
      ? "fieldReviewHydrationNextLowLoad"
      : "fieldReviewHydrationNextDefault",
    sleep: stats.lowSleepRows.length || stats.lowEnergyRows.length
      ? "fieldReviewSleepNextSignal"
      : "fieldReviewSleepNextDefault",
    load: stats.highLoadLowSleepRows.length
      ? "fieldReviewLoadNextRecovery"
      : "fieldReviewLoadNextDefault",
    drinks: stats.caffeineDays || stats.sweetDrinkDays || stats.highSugarDays
      ? "fieldReviewDrinksNextSignal"
      : "fieldReviewDrinksNextDefault",
    mind: stats.mindNoteDays || stats.supportDays || stats.practiceNoteDays
      ? "fieldReviewMindNextSignal"
      : "fieldReviewMindNextDefault",
    missing: stats.missingSleepDays || stats.missingWaterDays || stats.missingActivitiesDays || stats.missingMindNoteDays
      ? "fieldReviewMissingNextSignal"
      : "fieldReviewMissingNextDefault"
  };

  return t(keyByType[cardType]);
}

const FIELD_ROOM_IMAGES = {
  hydration: "assets/field-review/field-room-hydration.png",
  sleepRecovery: "assets/field-review/field-room-sleep-recovery.png",
  loadRecovery: "assets/field-review/field-room-load-recovery.png",
  drinks: "assets/field-review/field-room-drinks-context.png",
  mindNote: "assets/field-review/field-room-mind-note.png",
  missing: "assets/field-review/field-room-missing-blank.png"
};

const FIELD_REVIEW_ROOM_ORDER = [
  { type: "hydration", labelKey: "fieldRoomHydrationLabel" },
  { type: "sleepRecovery", labelKey: "fieldRoomSleepRecoveryLabel" },
  { type: "loadRecovery", labelKey: "fieldRoomLoadRecoveryLabel" },
  { type: "drinks", labelKey: "fieldRoomDrinksLabel" },
  { type: "mindNote", labelKey: "fieldRoomMindNoteLabel" },
  { type: "missing", labelKey: "fieldRoomMissingLabel" },
  { type: "signalEngine", labelKey: "fieldRoomSignalEngineLabel", motif: "∿" }
];

const FIELD_REVIEW_FOCUS_ORDER = [
  { type: "overview", labelKey: "fieldRoomFocusOverview", bubbleType: "source" },
  { type: "evidence", labelKey: "fieldRoomFocusEvidence", bubbleType: "evidence" },
  { type: "next", labelKey: "fieldRoomFocusNext", bubbleType: "next" },
  { type: "all", labelKey: "fieldRoomFocusAll", bubbleType: "all" }
];
const GUIDED_READING_CHOICES = FIELD_REVIEW_FOCUS_ORDER;

function normalizeFieldReviewRoom(roomType) {
  return FIELD_REVIEW_ROOM_ORDER.some((room) => room.type === roomType) ? roomType : "hydration";
}

function normalizeFieldReviewFocus(focusType) {
  return FIELD_REVIEW_FOCUS_ORDER.some((focus) => focus.type === focusType) ? focusType : "overview";
}

function normalizeGuidedReadingChoice(choiceType) {
  if (!choiceType) return "";
  return FIELD_REVIEW_FOCUS_ORDER.some((focus) => focus.type === choiceType) ? choiceType : "overview";
}

function normalizeHydrationConversationChoice(choiceType) {
  return normalizeGuidedReadingChoice(choiceType);
}

function createGuidedReadingState() {
  return {
    choice: "",
    ended: false,
    history: [],
    beforeEnd: "",
    readChoices: new Set()
  };
}

function getGuidedReadingState(roomType = activeFieldReviewRoom) {
  const normalizedRoom = normalizeFieldReviewRoom(roomType);
  if (!guidedReadingStateByRoom[normalizedRoom]) {
    guidedReadingStateByRoom[normalizedRoom] = createGuidedReadingState();
  }
  return guidedReadingStateByRoom[normalizedRoom];
}

function resetGuidedReadingState(roomType = activeFieldReviewRoom) {
  guidedReadingStateByRoom[normalizeFieldReviewRoom(roomType)] = createGuidedReadingState();
}

function resetAllGuidedReading() {
  Object.keys(guidedReadingStateByRoom).forEach((roomType) => {
    guidedReadingStateByRoom[roomType] = createGuidedReadingState();
  });
}

function getFieldReviewRoomLabel(roomType) {
  const room = FIELD_REVIEW_ROOM_ORDER.find((entry) => entry.type === roomType) || FIELD_REVIEW_ROOM_ORDER[0];
  return t(room.labelKey);
}

function getFieldReviewRoomNavIcon(roomType) {
  const iconByRoom = {
    hydration: "💧",
    sleepRecovery: "🌙",
    loadRecovery: "〰",
    drinks: "☕",
    mindNote: "🩵",
    missing: "◌",
    signalEngine: "∿"
  };
  return iconByRoom[roomType] || "⌂";
}

function getFieldReviewRoomTransitionDescription(roomType) {
  const descriptionKeyByRoom = {
    hydration: "fieldRoomTransitionHydration",
    sleepRecovery: "fieldRoomTransitionSleepRecovery",
    loadRecovery: "fieldRoomTransitionLoadRecovery",
    drinks: "fieldRoomTransitionDrinks",
    mindNote: "fieldRoomTransitionMindNote",
    missing: "fieldRoomTransitionMissing",
    signalEngine: "fieldRoomTransitionSignalEngine"
  };
  return t(descriptionKeyByRoom[roomType] || "fieldRoomTransitionHydration");
}

function getFieldReviewNextRoomType(roomType) {
  const index = FIELD_REVIEW_ROOM_ORDER.findIndex((entry) => entry.type === roomType);
  const nextIndex = index >= 0 ? (index + 1) % FIELD_REVIEW_ROOM_ORDER.length : 1;
  return FIELD_REVIEW_ROOM_ORDER[nextIndex].type;
}

function getFieldReviewRelatedRoomType(roomType) {
  const relatedByRoom = {
    hydration: "loadRecovery",
    sleepRecovery: "loadRecovery",
    loadRecovery: "sleepRecovery",
    drinks: "sleepRecovery",
    mindNote: "missing",
    missing: "signalEngine",
    signalEngine: "hydration"
  };
  return normalizeFieldReviewRoom(relatedByRoom[roomType]);
}

function getFieldReviewTimeframeLabel(timeframe = "7") {
  if (timeframe === "all") return t("fieldReviewTimeframeAll");
  if (timeframe === "30") return t("fieldReviewTimeframe30");
  if (timeframe === "14") return t("fieldReviewTimeframe14");
  return t("fieldReviewTimeframe7");
}

function getFieldRoomQuestion(roomType) {
  const questionKeyByRoom = {
    hydration: "fieldRoomQuestionHydration",
    sleepRecovery: "fieldRoomQuestionSleepRecovery",
    loadRecovery: "fieldRoomQuestionLoadRecovery",
    drinks: "fieldRoomQuestionDrinks",
    mindNote: "fieldRoomQuestionMindNote",
    missing: "fieldRoomQuestionMissing"
  };
  return t(questionKeyByRoom[roomType] || "fieldRoomQuestionHydration");
}

function createFieldReviewCard(titleKey, evidence, reading, nextAttention, motif = "", roomType = "") {
  return {
    title: t(titleKey),
    evidence,
    reading,
    nextAttention,
    motif,
    roomType,
    roomImage: FIELD_ROOM_IMAGES[roomType] || ""
  };
}

function buildHydrationReviewCard(rows = [], timeframe = "7") {
  const stats = getFieldReviewStats(rows);
  const hasWater = stats.waterValues.length > 0;
  const evidence = hasWater
    ? t("fieldReviewHydrationEvidence", {
      average: formatReviewNumber(stats.averageWater),
      min: formatReviewNumber(stats.minWater),
      max: formatReviewNumber(stats.maxWater),
      inRange: formatReviewNumber(stats.hydrationDaysInRange.length),
      recorded: formatReviewNumber(stats.waterValues.length),
      below: formatReviewNumber(stats.hydrationDaysBelowRange.length),
      above: formatReviewNumber(stats.hydrationDaysAboveRange.length)
    })
    : t("fieldReviewRowsEvidence", { count: formatReviewNumber(rows.length) });

  const reading = buildNuTuenSaiCardReading("hydration", stats, timeframe);
  const nextAttention = buildNuTuenSaiNextAttention("hydration", stats);
  const card = createFieldReviewCard(
    "fieldReviewHydrationTitle",
    evidence,
    reading,
    nextAttention,
    "💧",
    "hydration"
  );
  card.allReading = hasWater
    ? `${t(getHydrationAdequacyReadingKey(stats))} ${evidence} · ${nextAttention}`
    : [reading, evidence, nextAttention].filter(Boolean).join(" · ");
  return card;
}

function buildSleepRecoveryReviewCard(rows = [], timeframe = "7") {
  const stats = getFieldReviewStats(rows);
  return createFieldReviewCard(
    "fieldReviewSleepTitle",
    t("fieldReviewSleepEvidence", {
      lowSleep: formatReviewNumber(stats.lowSleepRows.length),
      lowEnergy: formatReviewNumber(stats.lowEnergyRows.length)
    }),
    buildNuTuenSaiCardReading("sleep", stats, timeframe),
    buildNuTuenSaiNextAttention("sleep", stats),
    "☾",
    "sleepRecovery"
  );
}

function buildLoadRecoveryReviewCard(rows = [], timeframe = "7") {
  const stats = getFieldReviewStats(rows);
  return createFieldReviewCard(
    "fieldReviewLoadTitle",
    t("fieldReviewLoadEvidence", {
      highLoad: formatReviewNumber(stats.highLoadRows.length),
      highLoadLowSleep: formatReviewNumber(stats.highLoadLowSleepRows.length),
      highLoadLowEnergy: formatReviewNumber(stats.highLoadLowEnergyRows.length)
    }),
    buildNuTuenSaiCardReading("load", stats, timeframe),
    buildNuTuenSaiNextAttention("load", stats),
    "〰",
    "loadRecovery"
  );
}

function buildDrinksReviewCard(rows = [], timeframe = "7") {
  const stats = getFieldReviewStats(rows);
  return createFieldReviewCard(
    "fieldReviewDrinksTitle",
    t("fieldReviewDrinksEvidence", {
      caffeineDays: formatReviewNumber(stats.caffeineDays),
      sweetDays: formatReviewNumber(stats.sweetDrinkDays),
      highSugarDays: formatReviewNumber(stats.highSugarDays)
    }),
    buildNuTuenSaiCardReading("drinks", stats, timeframe),
    buildNuTuenSaiNextAttention("drinks", stats),
    "☕",
    "drinks"
  );
}

function buildMindNoteReviewCard(rows = [], timeframe = "7") {
  const stats = getFieldReviewStats(rows);
  return createFieldReviewCard(
    "fieldReviewMindTitle",
    t("fieldReviewMindEvidence", {
      mindNoteDays: formatReviewNumber(stats.mindNoteDays),
      supportDays: formatReviewNumber(stats.supportDays),
      practiceNoteDays: formatReviewNumber(stats.practiceNoteDays)
    }),
    buildNuTuenSaiCardReading("mind", stats, timeframe),
    buildNuTuenSaiNextAttention("mind", stats),
    "🩵",
    "mindNote"
  );
}

function buildMissingDataReviewCard(rows = [], timeframe = "7") {
  const stats = getFieldReviewStats(rows);
  const missingItems = [
    stats.missingSleepDays ? t("fieldReviewMissingItemSleep", { count: formatReviewNumber(stats.missingSleepDays) }) : "",
    stats.missingWaterDays ? t("fieldReviewMissingItemWater", { count: formatReviewNumber(stats.missingWaterDays) }) : "",
    stats.missingActivitiesDays ? t("fieldReviewMissingItemActivities", { count: formatReviewNumber(stats.missingActivitiesDays) }) : "",
    stats.missingMindNoteDays ? t("fieldReviewMissingItemMindNote", { count: formatReviewNumber(stats.missingMindNoteDays) }) : ""
  ].filter(Boolean);

  return createFieldReviewCard(
    "fieldReviewMissingTitle",
    missingItems.length
      ? t("fieldReviewMissingEvidence", { items: missingItems.join(" | ") })
      : t("fieldReviewMissingNone"),
    buildNuTuenSaiCardReading("missing", stats, timeframe),
    buildNuTuenSaiNextAttention("missing", stats),
    "·",
    "missing"
  );
}

function buildFieldReviewCards(rows = [], timeframe = "7") {
  if (!rows.length) return [];
  return [
    buildHydrationReviewCard(rows, timeframe),
    buildSleepRecoveryReviewCard(rows, timeframe),
    buildLoadRecoveryReviewCard(rows, timeframe),
    buildDrinksReviewCard(rows, timeframe),
    buildMindNoteReviewCard(rows, timeframe),
    buildMissingDataReviewCard(rows, timeframe)
  ];
}

const SIGNAL_RELATIONSHIP_PAIRS = [
  { x: "Water_ml", y: "Load_Score" },
  { x: "Sleep_Hours", y: "Load_Score" },
  { x: "Sleep_Hours", y: "Caffeine_Score" },
  { x: "Sugar_Score", y: "Sleep_Hours" },
  { x: "Caffeine_Score", y: "Load_Score" },
  { x: "Practice_Minutes", y: "Sleep_Hours" }
];

const SIGNAL_RELATIONSHIP_LABELS = {
  Water_ml: {
    display: { th: "น้ำดื่ม", en: "Water intake", zh: "饮水量" },
    meaning: { th: "ปริมาณน้ำที่พี่บันทึกไว้", en: "recorded water intake", zh: "记录的饮水量" }
  },
  Load_Score: {
    display: { th: "กิจกรรม/งานของวัน", en: "Daily activity/load", zh: "每日活动/负荷" },
    meaning: { th: "กิจกรรม งาน หรือแรงใช้ของวัน", en: "daily activity, work, or body-use load", zh: "当天的活动、工作或身体使用负荷" }
  },
  Sleep_Hours: {
    display: { th: "ชั่วโมงนอน", en: "Sleep hours", zh: "睡眠时长" },
    meaning: { th: "ชั่วโมงนอนที่บันทึกไว้", en: "recorded sleep hours", zh: "记录的睡眠时长" }
  },
  Caffeine_Score: {
    display: { th: "เครื่องดื่มคาเฟอีน", en: "Caffeinated drinks", zh: "含咖啡因饮品" },
    meaning: { th: "เครื่องดื่มที่มีคาเฟอีนหรือ caffeine load ที่บันทึกไว้", en: "caffeinated drinks or caffeine load", zh: "记录的含咖啡因饮品或咖啡因负荷" }
  },
  Sugar_Score: {
    display: { th: "บริบทความหวาน", en: "Sweetness context", zh: "甜味情境" },
    meaning: { th: "เครื่องดื่ม/บริบทความหวานที่บันทึกไว้", en: "sweet drinks or sweetness context", zh: "记录的甜饮或甜味情境" }
  },
  Practice_Minutes: {
    display: { th: "เวลาภาวนา", en: "Practice minutes", zh: "练习分钟" },
    meaning: { th: "เวลาภาวนาที่บันทึกไว้", en: "recorded practice minutes", zh: "记录的练习分钟" }
  }
};

const SIGNAL_RELATIONSHIP_PAIR_META = {
  "Water_ml|Load_Score": {
    icon: "💧",
    accentClass: "signal-pair-water-load"
  },
  "Sleep_Hours|Caffeine_Score": {
    icon: "🌙",
    accentClass: "signal-pair-sleep-caffeine"
  },
  "Sugar_Score|Sleep_Hours": {
    icon: "🍯",
    accentClass: "signal-pair-sugar-sleep"
  },
  "Caffeine_Score|Load_Score": {
    icon: "☕",
    accentClass: "signal-pair-caffeine-load"
  },
  "Sleep_Hours|Load_Score": {
    icon: "🛌",
    accentClass: "signal-pair-sleep-load"
  },
  "Practice_Minutes|Sleep_Hours": {
    icon: "🌿",
    accentClass: "signal-pair-practice-sleep"
  }
};

const SIGNAL_RELATIONSHIP_MEANING_TEMPLATES = {
  "Water_ml|Load_Score": {
    positive: {
      th: "วันที่กิจกรรม งาน หรือแรงใช้ของวันสูงขึ้น มักมาพร้อมปริมาณน้ำที่บันทึกไว้สูงขึ้นด้วย จึงเหมาะกับการอ่านร่วมกับบริบทของวัน เช่น อากาศ กิจกรรมจริง และพื้นที่พักค่ะ",
      en: "NuTuenSai reads these signals as moving in the same direction in the saved data. Higher daily activity, work, or body-use load tends to appear with higher recorded water intake. This can make sense as day context, but it is still only a Daily_Log relationship signal, not causation.",
      zh: "NuTuenSai 读取到这两个信号在记录中倾向于同向移动。活动、工作或身体使用负荷较高的日子，常和较高的记录饮水量一起出现。这可以作为当天背景来温柔阅读，但仍只是 Daily_Log 里的关系信号，不是因果。"
    },
    negative: {
      th: "วันที่กิจกรรม งาน หรือแรงใช้ของวันสูงขึ้น อาจไม่ได้มาพร้อมปริมาณน้ำที่บันทึกไว้สูงขึ้นในช่วงนี้ จึงเป็นจุดให้สังเกตบริบทของวัน เช่น อากาศ กิจกรรมจริง และการพัก โดยยังไม่รีบสรุปค่ะ",
      en: "NuTuenSai reads these signals as moving in opposite directions in the selected data. Higher daily activity, work, or body-use load does not appear with higher recorded water intake in this window. Treat this as a point to observe alongside weather, activity context, and recovery, not a fixed explanation.",
      zh: "NuTuenSai 读取到这两个信号在所选数据中倾向于反向移动。活动、工作或身体使用负荷较高时，记录的饮水量并没有同步升高。可以和天气、实际活动、恢复一起看，但不要当作因果。"
    },
    neutral: {
      th: "ในข้อมูลช่วงนี้ หนูยังไม่เห็นจังหวะร่วมกันชัดระหว่างปริมาณน้ำกับกิจกรรม/งานของวัน จึงควรอ่านเป็นสัญญาณเบา ๆ และดูร่วมกับ sleep, เครื่องดื่ม และกิจกรรมจริงของวันค่ะ",
      en: "In this window, NuTuenSai does not yet see a clear rhythm between recorded water intake and daily activity/load. Hold it lightly and read it alongside sleep, drinks, and the real activity context of each day.",
      zh: "在这段数据里，NuTuenSai 还没有看见记录饮水量和每日活动/负荷之间清楚的共同节奏。可以轻轻放着看，并和睡眠、饮品、当天真实活动一起阅读。"
    }
  },
  "Sleep_Hours|Load_Score": {
    positive: {
      th: "หนูอ่านว่าสองสัญญาณนี้เคลื่อนไหวไปทางเดียวกันในข้อมูลที่เลือก วันที่กิจกรรม งาน หรือแรงใช้ของวันสูงขึ้น มักมาพร้อมชั่วโมงนอนที่บันทึกไว้สูงขึ้นบางส่วน อาจสะท้อนวันที่ร่างกายมีแรงและมีพื้นที่พักตามมา แต่ยังควรอ่านร่วมกับบริบทของวัน ไม่ใช่ข้อสรุปค่ะ",
      en: "NuTuenSai reads these signals as moving in the same direction here. Higher daily activity/load tends to appear with higher recorded sleep hours to some degree. This may reflect days where energy and rest both have space, but it should stay contextual, not a conclusion.",
      zh: "NuTuenSai 读取到这两个信号在这里倾向于同向移动。每日活动/负荷较高时，也常和较高的记录睡眠时长一起出现。它可能只是有体力也有休息空间的日子背景，不是结论。"
    },
    negative: {
      th: "หนูอ่านว่าวันที่กิจกรรม งาน หรือแรงใช้ของวันสูงขึ้น อาจมาพร้อมชั่วโมงนอนที่ลดลงบางส่วนในข้อมูลช่วงนี้ จึงเป็นจุดที่น่าดูต่อเรื่อง recovery แต่ยังไม่ใช่การวินิจฉัยหรือเหตุและผลค่ะ",
      en: "NuTuenSai reads that higher daily activity, work, or body-use load may appear with lower recorded sleep hours in this window. This can be a gentle recovery signal to keep observing, not diagnosis or causation.",
      zh: "NuTuenSai 读取到活动、工作或身体使用负荷较高的日子，可能和较低的记录睡眠时长一起出现。这可以作为恢复节奏的轻观察，不是诊断或因果。"
    },
    neutral: {
      th: "ในข้อมูลที่เลือก ความสัมพันธ์ระหว่างชั่วโมงนอนกับกิจกรรม/งานของวันยังไม่ชัดมากพอ หนูจึงอ่านเป็นสัญญาณเบา ๆ มากกว่าข้อสรุปค่ะ",
      en: "In the selected data, the relationship between recorded sleep hours and daily activity/load is not clear enough yet. NuTuenSai reads it as a light signal rather than a conclusion.",
      zh: "在所选数据中，记录睡眠时长和每日活动/负荷之间的关系还不够清楚。NuTuenSai 只把它当作轻信号，不是结论。"
    }
  },
  "Sleep_Hours|Caffeine_Score": {
    positive: {
      th: "หนูอ่านว่าสองสัญญาณนี้เคลื่อนไหวไปทางเดียวกันในข้อมูลที่เลือก ชั่วโมงนอนที่บันทึกไว้สูงขึ้นมักมาพร้อมเครื่องดื่มที่มีคาเฟอีนหรือ caffeine load ที่สูงขึ้นบางส่วน จึงควรอ่านเป็นบริบทของวัน เช่น งาน เวลา และเครื่องดื่ม ไม่ใช่คำตัดสินเรื่องการพักค่ะ",
      en: "NuTuenSai reads these signals as moving in the same direction here. Higher recorded sleep hours tend to appear with higher caffeinated drinks or caffeine load to some degree. Read this as day context around work, timing, and drinks, not a judgment about rest.",
      zh: "NuTuenSai 读取到这两个信号在这里倾向于同向移动。记录睡眠时长较高时，也可能和较高的含咖啡因饮品或咖啡因负荷一起出现。请把它当作工作、时间和饮品背景，不是对休息的评价。"
    },
    negative: {
      th: "หนูอ่านว่าวันที่ชั่วโมงนอนน้อยลงอาจมาพร้อม caffeine load ที่สูงขึ้นบางส่วนในข้อมูลชุดนี้ อาจเป็นจุดให้สังเกตวันที่ใช้คาเฟอีนเพื่อพยุงพลัง แต่ยังไม่ใช่เหตุและผลค่ะ",
      en: "NuTuenSai reads that lower recorded sleep hours may appear with higher caffeinated drinks or caffeine load in this data. This can be a gentle point to notice around using caffeine to carry the day, while staying away from over-reading.",
      zh: "NuTuenSai 读取到记录睡眠较少的日子，可能和较高的含咖啡因饮品或咖啡因负荷一起出现。可以温柔观察是否用咖啡因支撑白天，但这不是因果。"
    },
    neutral: {
      th: "ในข้อมูลที่เลือก หนูยังไม่เห็นความสัมพันธ์ชัดระหว่างชั่วโมงนอนกับเครื่องดื่มที่มีคาเฟอีน จึงควรอ่านเป็นสัญญาณเบา ๆ และยังไม่ควรสรุปค่ะ",
      en: "In the selected data, NuTuenSai does not yet see a clear relationship between recorded sleep hours and caffeinated drinks. Hold it as a light signal, not a conclusion.",
      zh: "在所选数据中，NuTuenSai 还没有看见记录睡眠时长和含咖啡因饮品之间清楚的关系。请把它当作轻信号，不要下结论。"
    }
  },
  "Sugar_Score|Sleep_Hours": {
    positive: {
      th: "หนูอ่านว่าสองสัญญาณนี้เคลื่อนไหวไปทางเดียวกันในข้อมูลที่เลือก แต่ควรอ่านอย่างระวัง เพราะบริบทความหวานและชั่วโมงนอนอาจมีปัจจัยของวันอื่น ๆ เข้ามาเกี่ยวข้องค่ะ",
      en: "NuTuenSai reads these signals as moving in the same direction in the selected data, but this should be held carefully. Sweetness context and recorded sleep hours can both be shaped by many other parts of the day.",
      zh: "NuTuenSai 读取到这两个信号在所选数据中倾向于同向移动，但需要温柔谨慎地看。甜味情境和记录睡眠时长都可能受当天许多其他因素影响。"
    },
    negative: {
      th: "หนูอ่านว่าในข้อมูลช่วงนี้ วันที่บริบทความหวานสูงขึ้น มักเคลื่อนไหวสวนทางกับชั่วโมงนอนบางส่วน อาจเป็นสัญญาณให้พี่สังเกตจังหวะวันที่นอนน้อย พลังงานแกว่ง หรือมีเครื่องดื่มหวานเข้ามาช่วยพยุงวัน แต่ยังไม่ควรรีบผูกเรื่องเข้าหากันเกินข้อมูลค่ะ",
      en: "NuTuenSai reads that higher sweet drinks or sweetness context tends to move opposite to recorded sleep hours in this window. This may be a signal to notice lower-sleep days, shifting energy, or sweet drinks helping carry the day, without turning it into a fixed explanation.",
      zh: "NuTuenSai 读取到这段时间甜饮或甜味情境较高的日子，常和记录睡眠时长呈反向移动。这可以提醒你观察睡得较少、能量波动或甜饮支撑一天的节奏，但不要总结成因果。"
    },
    neutral: {
      th: "ในข้อมูลที่เลือก หนูยังไม่เห็นความสัมพันธ์ชัดระหว่างบริบทความหวานกับชั่วโมงนอน จึงควรอ่านเป็นข้อมูลประกอบ ไม่ใช่ข้อสรุปเรื่องการพักหรือเครื่องดื่มค่ะ",
      en: "In the selected data, NuTuenSai does not yet see a clear relationship between sweetness context and recorded sleep hours. Treat it as supporting context, not a conclusion about rest or drinks.",
      zh: "在所选数据中，NuTuenSai 还没有看见甜味情境和记录睡眠时长之间清楚的关系。它只是辅助背景，不是关于休息或饮品的结论。"
    }
  },
  "Caffeine_Score|Load_Score": {
    positive: {
      th: "หนูอ่านว่าวันที่มีเครื่องดื่มที่มีคาเฟอีนมากขึ้น มักอยู่ในวันที่กิจกรรม งาน หรือแรงใช้ของวันสูงขึ้นบางส่วน หนูอ่านเป็นบริบทของการพยุงพลังระหว่างวัน มากกว่าการตัดสินว่าดีหรือไม่ดีค่ะ",
      en: "NuTuenSai reads that higher caffeinated drinks or caffeine load often appears on days with higher activity, work, or body-use load. This is day-support context, not a good-or-bad judgment.",
      zh: "NuTuenSai 读取到含咖啡因饮品或咖啡因负荷较高时，常出现在活动、工作或身体使用负荷较高的日子。这里读作支撑一天的背景，不是好坏评价。"
    },
    negative: {
      th: "หนูอ่านว่าสองสัญญาณนี้เคลื่อนไหวสวนทางกันในข้อมูลที่เลือก วันที่กิจกรรม งาน หรือแรงใช้ของวันสูงขึ้นไม่ได้มาพร้อม caffeine load ที่สูงขึ้นในช่วงนี้ จึงควรอ่านเป็นบริบทเฉพาะของช่วงข้อมูล ไม่ใช่ข้อสรุปค่ะ",
      en: "NuTuenSai reads these signals as moving in opposite directions in the selected data. Higher activity/load does not appear with higher caffeine load in this window, so keep this as context for this data slice, not a conclusion.",
      zh: "NuTuenSai 读取到这两个信号在所选数据中倾向于反向移动。活动/负荷较高时，并没有和较高的咖啡因负荷一起出现。请把它当作这段数据的背景，不是结论。"
    },
    neutral: {
      th: "ในข้อมูลช่วงนี้ หนูยังไม่เห็นว่าคาเฟอีนกับกิจกรรม/งานของวันเคลื่อนไหวร่วมกันชัดพอ จึงควรอ่านเป็นข้อมูลประกอบ ไม่ใช่ข้อสรุปค่ะ",
      en: "In this window, NuTuenSai does not yet see caffeinated drinks and daily activity/load moving together clearly enough. Treat it as supporting context, not a conclusion.",
      zh: "在这段数据中，NuTuenSai 还没有看见含咖啡因饮品和每日活动/负荷清楚地一起移动。请把它当作辅助背景，不是结论。"
    }
  },
  "Practice_Minutes|Sleep_Hours": {
    positive: {
      th: "หนูอ่านว่าสองสัญญาณนี้เคลื่อนไหวไปทางเดียวกันในข้อมูลที่เลือก เวลาภาวนาที่บันทึกไว้อาจมาพร้อมชั่วโมงนอนที่สูงขึ้นบางส่วน แต่ควรอ่านเป็นบริบทการดูแลตัวเอง ไม่ใช่คะแนนการภาวนาหรือคุณภาพการพักค่ะ",
      en: "NuTuenSai reads these signals as moving in the same direction in the selected data. Recorded practice minutes may appear with higher recorded sleep hours to some degree, but this is self-care context, not a practice score or sleep-quality judgment.",
      zh: "NuTuenSai 读取到这两个信号在所选数据中倾向于同向移动。记录的练习分钟可能和较高的记录睡眠时长一起出现，但这只是自我照顾背景，不是练习评分或睡眠质量评价。"
    },
    negative: {
      th: "หนูอ่านว่าสองสัญญาณนี้เคลื่อนไหวสวนทางกันในข้อมูลที่เลือก เวลาภาวนาที่บันทึกไว้อาจมาพร้อมชั่วโมงนอนที่ลดลงบางส่วน แต่ยังไม่ควรสรุปเรื่องคุณภาพการพักหรือการภาวนา เพราะบริบทของแต่ละวันอาจต่างกันมากค่ะ",
      en: "NuTuenSai reads these signals as moving in opposite directions in the selected data. Recorded practice minutes may appear with lower recorded sleep hours to some degree, but this should not become a judgment about rest quality or practice because each day's context can vary.",
      zh: "NuTuenSai 读取到这两个信号在所选数据中倾向于反向移动。记录的练习分钟可能和较低的记录睡眠时长一起出现，但不要把它变成休息质量或练习的评价，因为每天的背景可能很不同。"
    },
    neutral: {
      th: "ในข้อมูลที่เลือก หนูยังไม่เห็นจังหวะร่วมกันชัดระหว่างเวลาภาวนากับชั่วโมงนอน จึงควรอ่านเพียงเป็นบริบทประกอบ ไม่ใช่คะแนนการภาวนาหรือคุณภาพการพักค่ะ",
      en: "In the selected data, NuTuenSai does not yet see a clear rhythm between recorded practice minutes and recorded sleep hours. Read this only as supporting context, not a practice score or sleep-quality judgment.",
      zh: "在所选数据中，NuTuenSai 还没有看见记录练习分钟和记录睡眠时长之间清楚的共同节奏。请只把它当作辅助背景，不是练习评分或睡眠质量评价。"
    }
  }
};

const SIGNAL_RELATIONSHIP_VOICE_FRAMES = {
  th: {
    tentative: "ในข้อมูลช่วงนี้ หนูอ่านเป็นสัญญาณเบื้องต้น เพราะจำนวนวันที่มีข้อมูลครบยังไม่มากพอให้สรุปหนัก ๆ ค่ะ",
    observed: "จากจำนวนข้อมูลที่มากขึ้น หนูอ่านเป็น pattern ที่เห็นจากข้อมูลที่พี่บันทึกไว้ แต่ยังต้องอ่านร่วมกับบริบทของแต่ละวันค่ะ",
    sameWeak: "สองสัญญาณนี้เคลื่อนไหวไปทางเดียวกันแบบสัญญาณเบา ๆ",
    sameModerate: "สองสัญญาณนี้เคลื่อนไหวไปทางเดียวกัน และเห็นจังหวะร่วมกันระดับหนึ่ง",
    sameStrong: "สองสัญญาณนี้เคลื่อนไหวไปทางเดียวกันค่อนข้างชัดในข้อมูลที่เลือก",
    oppositeWeak: "สองสัญญาณนี้เคลื่อนไหวสวนทางกันแบบสัญญาณเบา ๆ",
    oppositeModerate: "สองสัญญาณนี้เคลื่อนไหวสวนทางกัน และเห็นจังหวะร่วมกันระดับหนึ่ง",
    oppositeStrong: "สองสัญญาณนี้เคลื่อนไหวสวนทางกันค่อนข้างชัดในข้อมูลที่เลือก",
    nearZero: "หนูยังอ่านเป็นภาวะยังไม่ชัด ไม่ใช่สัญญาณต่ำหรือหลักฐานอ่อน ๆ ค่ะ"
  },
  en: {
    tentative: "In this selected window, NuTuenSai reads this as a tentative signal because the paired data is still limited.",
    observed: "With more paired data available, NuTuenSai reads this as an observed pattern in the saved record, while each day still has its own context.",
    sameWeak: "These two signals move in the same direction as a light signal.",
    sameModerate: "These two signals move in the same direction with a visible shared rhythm.",
    sameStrong: "These two signals move in the same direction fairly clearly in the selected data.",
    oppositeWeak: "These two signals move in opposite directions as a light signal.",
    oppositeModerate: "These two signals move in opposite directions with a visible shared rhythm.",
    oppositeStrong: "These two signals move in opposite directions fairly clearly in the selected data.",
    nearZero: "NuTuenSai reads this as unclear, not as weak evidence."
  },
  zh: {
    tentative: "在这段所选数据里，NuTuenSai 先把它当作暂时信号，因为完整配对天数还不算多。",
    observed: "在较多配对数据下，NuTuenSai 把它读作已观察到的 pattern，但每一天仍有自己的背景。",
    sameWeak: "这两个信号轻微地同向移动。",
    sameModerate: "这两个信号同向移动，并开始看见一定程度的共同节奏。",
    sameStrong: "这两个信号在所选数据中同向移动得比较清楚。",
    oppositeWeak: "这两个信号轻微地反向移动。",
    oppositeModerate: "这两个信号反向移动，并开始看见一定程度的共同节奏。",
    oppositeStrong: "这两个信号在所选数据中反向移动得比较清楚。",
    nearZero: "NuTuenSai 把这里读作尚不清楚，而不是较弱证据。"
  }
};

const SIGNAL_RELATIONSHIP_NEXT_OBSERVATIONS = {
  "Water_ml|Load_Score": {
    positive: {
      th: "ถ้าวันไหนกิจกรรม งาน หรือแรงใช้ของวันสูงขึ้น อาจลองสังเกตว่าน้ำที่พี่เตรียมไว้พอกับจังหวะของวันไหม โดยอ่านเป็นจุดดูแลตัวเองร่วมกับบริบท ไม่ใช่ข้อสรุปตายตัวค่ะ",
      en: "On days when activity, work, or body-use load is higher, you might gently observe whether the water you prepared fits that day's rhythm. Read it as a self-care point with context, not a fixed conclusion.",
      zh: "如果某天活动、工作或身体使用负荷较高，可以轻轻观察准备的水是否贴合当天节奏。把它当作和当天背景一起看的照顾点，而不是固定结论。"
    },
    negative: {
      th: "ถ้าวันที่ใช้แรงหรือมีกิจกรรมเยอะไม่ได้มาพร้อมน้ำที่บันทึกไว้สูงขึ้น อาจลองดูบริบทของวันนั้นเพิ่ม เช่น อากาศ การเดินทาง หรือเวลาพัก โดยยังไม่รีบสรุปค่ะ",
      en: "If higher-load days do not appear with higher recorded water, one gentle place to observe is the day's context, such as weather, travel, or rest windows, without rushing to a conclusion.",
      zh: "如果负荷较高的日子没有和较高记录饮水一起出现，可以再看当天背景，例如天气、移动或休息空间，不急着下结论。"
    },
    neutral: {
      th: "ตอนนี้สัญญาณน้ำกับกิจกรรม/งานของวันยังไม่ชัดพอ หนูจึงยังไม่ชวนทดลองอะไรเฉพาะทาง แต่อาจเก็บข้อมูลต่อแล้วกลับมาอ่านร่วมกับบริบทของวันค่ะ",
      en: "The water and daily activity/load signal is not clear enough yet, so NuTuenSai would not suggest a specific experiment. You can keep collecting data and read it again with day context.",
      zh: "目前饮水和每日活动/负荷之间的信号还不够清楚，所以 NuTuenSai 不会提出具体实验。可以继续记录，再和当天背景一起回来看。"
    }
  },
  "Sleep_Hours|Load_Score": {
    positive: {
      th: "ถ้าวันที่งานหรือกิจกรรมเยอะยังมีชั่วโมงนอนมากขึ้นด้วย อาจลองสังเกตว่ามีเงื่อนไขอะไรที่ช่วยให้ภาระกับการพักอยู่ร่วมกันได้ เช่น เวลาเริ่มงาน พื้นที่พัก หรือการวางแผนวันค่ะ",
      en: "If higher-load days also appear with higher sleep hours, you might observe what conditions let load and rest coexist, such as start time, rest space, or day planning.",
      zh: "如果负荷较高的日子也和较多睡眠一起出现，可以观察是什么条件让负荷和休息能共存，例如开始时间、休息空间或一天的安排。"
    },
    negative: {
      th: "ถ้าช่วงไหนกิจกรรมหรืองานสูงขึ้น อาจลองสังเกตว่าพื้นที่นอนและ recovery ถูกบีบลงไหม เป็นจุดดูแลจังหวะพัก ไม่ใช่ข้อสรุปเรื่องสุขภาพค่ะ",
      en: "When activity or work rises, you might gently observe whether sleep and recovery space feels squeezed. This is a rest-rhythm observation, not a health conclusion.",
      zh: "当活动或工作升高时，可以轻轻观察睡眠和恢复空间是否被压缩。这是休息节奏的观察，不是健康结论。"
    },
    neutral: {
      th: "ตอนนี้ความสัมพันธ์ระหว่างชั่วโมงนอนกับกิจกรรม/งานของวันยังไม่ชัดพอ หนูจึงชวนเพียงเก็บข้อมูลต่อและอ่านคู่กับบริบทจริงของแต่ละวันค่ะ",
      en: "The relationship between sleep hours and daily activity/load is not clear enough yet. NuTuenSai would only invite continued logging and reading it with each day's real context.",
      zh: "睡眠时长和每日活动/负荷之间目前还不够清楚。NuTuenSai 只会邀请继续记录，并和每天真实背景一起看。"
    }
  },
  "Sleep_Hours|Caffeine_Score": {
    positive: {
      th: "ถ้าชั่วโมงนอนและเครื่องดื่มคาเฟอีนเคลื่อนไหวไปทางเดียวกันในช่วงนี้ อาจลองดูบริบทเวลา งาน และชนิดเครื่องดื่มร่วมกัน โดยยังไม่ตัดสินว่าการพักหรือคาเฟอีนดีหรือไม่ดีค่ะ",
      en: "If sleep hours and caffeinated drinks move in the same direction here, you might observe timing, work context, and drink type together, without judging rest or caffeine as good or bad.",
      zh: "如果睡眠时长和含咖啡因饮品在这段时间同向移动，可以一起观察时间、工作背景和饮品类型，不评价休息或咖啡因好坏。"
    },
    negative: {
      th: "ถ้าพี่อยากค่อย ๆ ลดเครื่องดื่มคาเฟอีน อาจลองสังเกตจังหวะนอนและพื้นที่พักไปพร้อมกัน เพราะในข้อมูลช่วงนี้ วันที่ชั่วโมงนอนน้อยมักมาพร้อม caffeine load ที่สูงขึ้นบางส่วนค่ะ",
      en: "If you want to gently reduce caffeinated drinks, one useful place to observe is sleep and recovery space. In this selected data, lower sleep hours tended to appear with higher caffeine load to some degree.",
      zh: "如果想温柔地减少含咖啡因饮品，可以同时观察睡眠节奏和恢复空间。在这段所选数据里，较少睡眠时长常和较高咖啡因负荷一起出现。"
    },
    neutral: {
      th: "ตอนนี้ยังไม่เห็นจังหวะร่วมกันชัดพอ หนูจึงยังไม่ชวนทดลองอะไรหนัก ๆ แต่อาจเก็บข้อมูลต่ออีกระยะเพื่อดูว่าความสัมพันธ์นี้ชัดขึ้นไหมค่ะ",
      en: "This signal is not clear enough yet, so NuTuenSai would not invite a strong experiment. You might keep logging a little longer and see whether the relationship becomes clearer.",
      zh: "目前这个信号还不够清楚，所以 NuTuenSai 不会邀请明显实验。可以再记录一段时间，看看关系是否变清楚。"
    }
  },
  "Sugar_Score|Sleep_Hours": {
    positive: {
      th: "ถ้าความหวานกับชั่วโมงนอนเคลื่อนไหวไปทางเดียวกัน อาจลองสังเกตบริบทของวัน เช่น เวลากิน/ดื่ม พลังงาน และงานในวันนั้น โดยยังไม่สรุปว่าอย่างหนึ่งอธิบายอีกอย่างค่ะ",
      en: "If sweetness context and sleep hours move in the same direction, you might observe the day context, such as timing, energy, and work that day, without making one explain the other.",
      zh: "如果甜味情境和睡眠时长同向移动，可以观察当天背景，例如饮用时间、能量和工作，而不要让一个解释另一个。"
    },
    negative: {
      th: "ถ้าพี่อยากสังเกตเรื่องความหวาน อาจลองดูวันที่นอนน้อย พลังงานแกว่ง หรือมีเครื่องดื่มหวานเข้ามาพยุงวันร่วมกัน เพราะข้อมูลช่วงนี้มีจังหวะสวนทางกันบางส่วนค่ะ",
      en: "If you want to observe sweetness, you might look at lower-sleep days, shifting energy, or sweet drinks supporting the day together, because this window shows some opposite-direction rhythm.",
      zh: "如果想观察甜味，可以一起看睡得较少、能量波动或甜饮支撑一天的日子，因为这段数据里有一些反向节奏。"
    },
    neutral: {
      th: "ตอนนี้บริบทความหวานกับชั่วโมงนอนยังไม่ชัดพอ หนูจึงชวนดูเป็นข้อมูลประกอบและเก็บต่ออีกระยะก่อนค่ะ",
      en: "Sweetness context and sleep hours are not clear enough yet, so NuTuenSai would treat this as supporting context and keep observing longer.",
      zh: "甜味情境和睡眠时长目前还不够清楚，所以 NuTuenSai 只会把它当作辅助背景，并继续观察。"
    }
  },
  "Caffeine_Score|Load_Score": {
    positive: {
      th: "ถ้าวันไหนงานหรือกิจกรรมแน่น อาจลองสังเกตว่าเครื่องดื่มคาเฟอีนเข้ามาเป็นตัวพยุงพลังมากขึ้นไหม แล้วดูว่ามีวิธีพักสั้น ๆ หรือดื่มน้ำร่วมด้วยได้ไหมค่ะ",
      en: "On dense work or activity days, you might observe whether caffeinated drinks become more of a day-support signal, then notice whether short rest or water can sit beside it.",
      zh: "在工作或活动较密集的日子，可以观察含咖啡因饮品是否更像支撑一天的信号，再看看短休息或饮水能否一起出现。"
    },
    negative: {
      th: "ถ้างานหรือกิจกรรมสูงแต่คาเฟอีนไม่ได้สูงตามในช่วงนี้ อาจลองสังเกตว่าอะไรช่วยพยุงวันแทน เช่น พื้นที่พัก น้ำ หรือจังหวะงาน โดยยังไม่สรุปเป็นสูตรค่ะ",
      en: "If higher-load days do not appear with higher caffeine in this window, you might observe what else supports the day, such as rest space, water, or work rhythm, without turning it into a formula.",
      zh: "如果负荷较高的日子并没有和较高咖啡因一起出现，可以观察还有什么支撑当天，例如休息空间、饮水或工作节奏，不把它变成公式。"
    },
    neutral: {
      th: "ตอนนี้คาเฟอีนกับกิจกรรม/งานของวันยังไม่ชัดพอ หนูจึงยังไม่ชวนทดลองเฉพาะทาง แต่อาจดูต่อว่าคู่สัญญาณนี้เปลี่ยนไปไหมเมื่อมีข้อมูลมากขึ้นค่ะ",
      en: "Caffeine and daily activity/load are not clear enough yet, so NuTuenSai would not invite a specific experiment. You might revisit this pair when more data is available.",
      zh: "咖啡因和每日活动/负荷目前还不够清楚，所以 NuTuenSai 不会邀请具体实验。可以在数据更多时再回来看。"
    }
  },
  "Practice_Minutes|Sleep_Hours": {
    positive: {
      th: "ถ้าพี่อยากดูคู่นี้ต่อ ให้มองเวลาภาวนาเป็นบริบทการดูแลตัวเอง ไม่ใช่คะแนนภาวนา แล้วสังเกตว่ามันอยู่ร่วมกับจังหวะนอนอย่างไรค่ะ",
      en: "If you want to keep observing this pair, read practice minutes as self-care context, not a practice score, and notice how it sits beside sleep rhythm.",
      zh: "如果想继续观察这组，请把练习分钟看作自我照顾背景，不是练习分数，并观察它如何和睡眠节奏一起出现。"
    },
    negative: {
      th: "ถ้าคู่นี้เคลื่อนไหวสวนทางกัน ให้มองอย่างเบามากค่ะ เวลาภาวนาไม่ใช่คะแนน และชั่วโมงนอนไม่ใช่ตัวตัดสินคุณภาพการดูแลตัวเอง อาจแค่สังเกตบริบทของวันที่เลือกภาวนาและพื้นที่พักร่วมกัน",
      en: "If this pair moves in opposite directions, hold it very lightly. Practice minutes are not a score, and sleep hours do not define self-care quality. You might only observe the context around practice and rest space together.",
      zh: "如果这组反向移动，请非常轻地看。练习分钟不是分数，睡眠时长也不定义自我照顾质量。只需观察练习背景和休息空间如何同在。"
    },
    neutral: {
      th: "ตอนนี้เวลาภาวนากับชั่วโมงนอนยังไม่เห็นจังหวะร่วมกันชัด ให้มองเป็นบริบทประกอบ ไม่ใช่คะแนนภาวนาหรือคุณภาพการพักค่ะ",
      en: "Practice minutes and sleep hours do not show a clear shared rhythm yet. Read this as supporting context, not a practice score or rest-quality judgment.",
      zh: "练习分钟和睡眠时长目前还没有清楚的共同节奏。请把它当作辅助背景，不是练习分数或休息质量评价。"
    }
  }
};

function getSignalRelationshipLabel(column, lang = currentLanguage) {
  return SIGNAL_RELATIONSHIP_LABELS[column]?.display?.[lang]
    || SIGNAL_RELATIONSHIP_LABELS[column]?.display?.en
    || column;
}

function getSignalMeaningPhrase(column, lang = currentLanguage) {
  return SIGNAL_RELATIONSHIP_LABELS[column]?.meaning?.[lang]
    || SIGNAL_RELATIONSHIP_LABELS[column]?.meaning?.en
    || getSignalRelationshipLabel(column, lang);
}

function getSignalRelationshipDirectionType(card) {
  if (!card?.hasCoefficient || Math.abs(card.r) < 0.2) return "neutral";
  return card.r > 0 ? "positive" : "negative";
}

function getRelationshipStrengthBand(r) {
  const abs = Math.abs(r);
  if (abs < 0.2) return "nearZero";
  if (abs < 0.4) return "weak";
  if (abs < 0.7) return "moderate";
  return "strong";
}

function getRelationshipDirectionBand(r) {
  if (!isFiniteNumber(r) || Math.abs(r) < 0.2) return "nearZero";
  return r > 0 ? "same" : "opposite";
}

function getRelationshipVoiceCategory(card) {
  const direction = getRelationshipDirectionBand(card?.r);
  const strength = getRelationshipStrengthBand(card?.r || 0);
  if (direction === "nearZero" || strength === "nearZero") return "nearZero";
  return `${direction}${strength.charAt(0).toUpperCase()}${strength.slice(1)}`;
}

function getPairedRowBand(n) {
  if (n < 10) return "thin";
  if (n < 30) return "tentative";
  return "observed";
}

function getPairSpecificMeaningTemplate(card, lang = currentLanguage) {
  const directionType = getSignalRelationshipDirectionType(card);
  const templateSet = SIGNAL_RELATIONSHIP_MEANING_TEMPLATES[card.voiceKey]?.[directionType];
  return templateSet?.[lang] || templateSet?.en || "";
}

function buildPairSpecificRelationshipMeaning(card, lang = currentLanguage) {
  return getPairSpecificMeaningTemplate(card, lang);
}

function buildSignalRelationshipVoice(card, lang = currentLanguage) {
  const frames = SIGNAL_RELATIONSHIP_VOICE_FRAMES[lang] || SIGNAL_RELATIONSHIP_VOICE_FRAMES.en;
  const nFrame = frames[getPairedRowBand(card.n)] || "";
  const categoryFrame = frames[getRelationshipVoiceCategory(card)] || "";
  const pairMeaning = buildPairSpecificRelationshipMeaning(card, lang);
  return [nFrame, categoryFrame, pairMeaning].filter(Boolean).join(" ");
}

function getSignalRelationshipSentenceLabel(column, lang = currentLanguage) {
  const label = getSignalMeaningPhrase(column, lang);
  return lang === "en" ? label.charAt(0).toLowerCase() + label.slice(1) : label;
}

function formatSignalPairLabel(xColumn, yColumn) {
  return `${getSignalRelationshipLabel(xColumn)} ↔ ${getSignalRelationshipLabel(yColumn)}`;
}

function formatSignalPairRaw(xColumn, yColumn) {
  return `${xColumn} ↔ ${yColumn}`;
}

function getSignalRelationshipPairMeta(pairKey = "") {
  if (SIGNAL_RELATIONSHIP_PAIR_META[pairKey]) return SIGNAL_RELATIONSHIP_PAIR_META[pairKey];
  const [xColumn, yColumn] = String(pairKey).split("|");
  const reversedKey = [yColumn, xColumn].filter(Boolean).join("|");
  return SIGNAL_RELATIONSHIP_PAIR_META[reversedKey] || {
    icon: "∿",
    accentClass: "signal-pair-generic"
  };
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function getNumericValue(row, column) {
  const value = row?.[column];
  if (column === "Sleep_Hours") {
    const sleepHours = normalizeSleepHours(value);
    return sleepHours === "" ? null : sleepHours;
  }
  if (column === "Water_ml") {
    const water = Number(value);
    return Number.isFinite(water) && water > 0 ? water : null;
  }
  if (column === "Practice_Minutes") {
    const minutes = normalizePracticeMinutes(value);
    return minutes === "" ? null : minutes;
  }
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

function getPairedNumericRows(rows = [], xColumn, yColumn) {
  return rows
    .map(normalizeLogRow)
    .map((row) => ({
      x: getNumericValue(row, xColumn),
      y: getNumericValue(row, yColumn)
    }))
    .filter((pair) => isFiniteNumber(pair.x) && isFiniteNumber(pair.y));
}

function calculatePearsonCorrelation(pairs = []) {
  const n = pairs.length;
  if (n < 2) return null;
  const xMean = pairs.reduce((sum, pair) => sum + pair.x, 0) / n;
  const yMean = pairs.reduce((sum, pair) => sum + pair.y, 0) / n;
  const parts = pairs.reduce((acc, pair) => {
    const xDiff = pair.x - xMean;
    const yDiff = pair.y - yMean;
    acc.numerator += xDiff * yDiff;
    acc.xSquare += xDiff * xDiff;
    acc.ySquare += yDiff * yDiff;
    return acc;
  }, { numerator: 0, xSquare: 0, ySquare: 0 });
  const denominator = Math.sqrt(parts.xSquare * parts.ySquare);
  if (!denominator) return null;
  return Math.max(-1, Math.min(1, parts.numerator / denominator));
}

function getCorrelationStrength(r) {
  const abs = Math.abs(r);
  if (abs < 0.2) return { type: "unclear", label: t("signalEngineStrengthUnclear") };
  if (abs < 0.4) return { type: "weak", label: t("signalEngineStrengthWeak") };
  if (abs < 0.7) return { type: "moderate", label: t("signalEngineStrengthModerate") };
  return { type: "strong", label: t("signalEngineStrengthStrong") };
}

function interpretCorrelationCoefficient(r, n) {
  if (!isFiniteNumber(r)) {
    return {
      coefficientText: t("signalEngineNoCoefficient"),
      direction: t("signalEngineDirectionNeutral"),
      strength: t("signalEngineStrengthUnclear"),
      phase: n >= 30 ? t("signalEngineObserved") : t("signalEngineTentative"),
      reading: t("signalEngineReadingNeutral")
    };
  }
  const strength = getCorrelationStrength(r);
  const direction = Math.abs(r) < 0.2
    ? t("signalEngineDirectionNeutral")
    : r > 0
      ? t("signalEngineDirectionPositive")
      : t("signalEngineDirectionNegative");
  const reading = Math.abs(r) < 0.2
    ? t("signalEngineReadingNeutral")
    : r > 0
      ? t("signalEngineReadingPositive", { strength: strength.label })
      : t("signalEngineReadingNegative", { strength: strength.label });

  return {
    coefficientText: t("signalEngineCoefficient", { value: r.toFixed(2) }),
    direction,
    strength: strength.label,
    phase: n >= 30 ? t("signalEngineObserved") : t("signalEngineTentative"),
    reading
  };
}

function buildSignalRelationshipCards(rows = []) {
  return SIGNAL_RELATIONSHIP_PAIRS.map((pair) => {
    const pairs = getPairedNumericRows(rows, pair.x, pair.y);
    const n = pairs.length;
    const r = n >= 10 ? calculatePearsonCorrelation(pairs) : null;
    const voiceKey = `${pair.x}|${pair.y}`;
    const pairMeta = getSignalRelationshipPairMeta(voiceKey);
    const interpretation = n >= 10
      ? interpretCorrelationCoefficient(r, n)
      : {
        coefficientText: t("signalEngineNoCoefficient"),
        direction: t("signalEngineDirectionNeutral"),
        strength: t("signalEngineStrengthUnclear"),
        phase: t("signalEngineTentative"),
        reading: t("signalEngineThinState")
      };

    return {
      pairKey: `${pair.x}__${pair.y}`,
      voiceKey,
      pairMeta,
      pairName: formatSignalPairLabel(pair.x, pair.y),
      displayPairName: formatSignalPairLabel(pair.x, pair.y),
      rawPairName: formatSignalPairRaw(pair.x, pair.y),
      xLabel: getSignalRelationshipLabel(pair.x),
      yLabel: getSignalRelationshipLabel(pair.y),
      xMeaningPhrase: getSignalMeaningPhrase(pair.x),
      yMeaningPhrase: getSignalMeaningPhrase(pair.y),
      xSentenceLabel: getSignalRelationshipSentenceLabel(pair.x),
      ySentenceLabel: getSignalRelationshipSentenceLabel(pair.y),
      xColumn: pair.x,
      yColumn: pair.y,
      n,
      hasCoefficient: n >= 10 && isFiniteNumber(r),
      r,
      absR: isFiniteNumber(r) ? Math.abs(r) : 0,
      ...interpretation
    };
  });
}

function getRankedSignalRelationships(cards = []) {
  return cards
    .filter((card) => card.hasCoefficient)
    .sort((a, b) => b.absR - a.absR)
    .slice(0, 5);
}

function buildRelationshipMeaning(card) {
  const pairedDays = t("signalEnginePairedDays", { count: formatReviewNumber(card.n) });
  const pairSpecificMeaning = buildSignalRelationshipVoice(card);
  if (pairSpecificMeaning) return pairSpecificMeaning;

  if (!card.hasCoefficient || Math.abs(card.r) < 0.2) {
    return t("signalEngineMeaningNeutral");
  }
  const templateKey = card.r > 0 ? "signalEngineMeaningPositive" : "signalEngineMeaningNegative";
  return t(templateKey, {
    xLabel: card.xSentenceLabel,
    yLabel: card.ySentenceLabel,
    strength: card.strength,
    pairedDays
  });
}

function getSignalRelationshipNextObservationFrame(card, lang = currentLanguage) {
  if (card.n >= 10 && card.n < 30) {
    return {
      th: "ข้อมูลช่วงนี้ยังเป็นสัญญาณเบื้องต้น จึงเหมาะกับการทดลองสังเกตเบา ๆ เท่านั้นค่ะ",
      en: "This window is still an early signal, so any next step can stay a light observation only.",
      zh: "这段数据仍是早期信号，所以下一步只适合轻轻观察。"
    }[lang] || "This window is still an early signal, so any next step can stay a light observation only.";
  }
  if (card.n >= 30) {
    return {
      th: "จากข้อมูลที่เห็นซ้ำมากขึ้น หนูชวนอ่านเป็นจุดสังเกตต่อ ไม่ใช่ข้อสรุปค่ะ",
      en: "With more repeated data visible, NuTuenSai frames this as a next observation point, not a conclusion.",
      zh: "在较多重复数据下，NuTuenSai 把它作为下次观察点，而不是结论。"
    }[lang] || "With more repeated data visible, NuTuenSai frames this as a next observation point, not a conclusion.";
  }
  return "";
}

function buildSignalRelationshipNextObservation(card, lang = currentLanguage) {
  const directionType = getSignalRelationshipDirectionType(card);
  const templateSet = SIGNAL_RELATIONSHIP_NEXT_OBSERVATIONS[card.voiceKey] || {};
  const template = templateSet[directionType]?.[lang]
    || templateSet[directionType]?.en
    || templateSet.neutral?.[lang]
    || templateSet.neutral?.en
    || "";
  const frame = getSignalRelationshipNextObservationFrame(card, lang);
  return [frame, template].filter(Boolean).join(" ");
}

function getSignalRelationshipSummaryText(card) {
  const category = getRelationshipVoiceCategory(card);
  const keyByCategory = {
    sameWeak: "signalEngineSummarySameWeak",
    sameModerate: "signalEngineSummarySameModerate",
    sameStrong: "signalEngineSummarySameStrong",
    oppositeWeak: "signalEngineSummaryOppositeWeak",
    oppositeModerate: "signalEngineSummaryOppositeModerate",
    oppositeStrong: "signalEngineSummaryOppositeStrong",
    nearZero: "signalEngineSummaryNearZero"
  };
  return t(keyByCategory[category] || "signalEngineSummaryNearZero");
}

function renderSignalRelationshipEvidenceChips(card) {
  const pairedDays = t("signalEnginePairedDays", { count: formatReviewNumber(card.n) });
  return `
    <span class="signal-relationship-evidence-chips" aria-label="${escapeHtml(t("signalEngineEvidenceLabel"))}">
      <span class="signal-relationship-evidence-chip signal-relationship-evidence-chip-r">${escapeHtml(card.coefficientText)}</span>
      <span class="signal-relationship-evidence-chip">${escapeHtml(pairedDays)}</span>
      <span class="signal-relationship-evidence-chip">${escapeHtml(card.phase)}</span>
      <span class="signal-relationship-evidence-chip">${escapeHtml(card.direction)}</span>
      <span class="signal-relationship-evidence-chip">${escapeHtml(card.strength)}</span>
    </span>
  `;
}

function renderSignalRelationshipTitle(card) {
  const meta = card.pairMeta || getSignalRelationshipPairMeta(card.voiceKey);
  return `
    <span class="signal-pair-title">
      <span class="signal-pair-icon" aria-hidden="true">${escapeHtml(meta.icon)}</span>
      <span>${escapeHtml(card.displayPairName)}</span>
    </span>
  `;
}

function renderSignalRelationshipRow(card, selectedPairKey) {
  const isActive = card.pairKey === selectedPairKey;
  const accentClass = card.pairMeta?.accentClass || getSignalRelationshipPairMeta(card.voiceKey).accentClass;
  return `
    <button type="button" class="signal-relationship-row ${escapeHtml(accentClass)} ${isActive ? "signal-relationship-row-active" : ""}" data-signal-relationship-target="${escapeHtml(card.pairKey)}" aria-pressed="${String(isActive)}">
      <span class="signal-relationship-summary">
        <strong>${renderSignalRelationshipTitle(card)}</strong>
      </span>
      <span class="signal-relationship-plain-summary">${escapeHtml(getSignalRelationshipSummaryText(card))}</span>
      ${renderSignalRelationshipEvidenceChips(card)}
      <span class="signal-relationship-technical">${escapeHtml(card.rawPairName)}</span>
    </button>
  `;
}

function renderSignalRelationshipDetail(card) {
  const accentClass = card.pairMeta?.accentClass || getSignalRelationshipPairMeta(card.voiceKey).accentClass;
  return `
    <article class="signal-relationship-detail ${escapeHtml(accentClass)}" aria-live="polite">
      <p class="section-kicker">${escapeHtml(t("signalEngineMeaningLabel"))}</p>
      <h4>${renderSignalRelationshipTitle(card)}</h4>
      <p class="signal-relationship-plain-summary signal-relationship-detail-summary">${escapeHtml(getSignalRelationshipSummaryText(card))}</p>
      <div class="signal-relationship-evidence-block">
        <p class="signal-relationship-evidence-label">${escapeHtml(t("signalEngineEvidenceLabel"))}</p>
        ${renderSignalRelationshipEvidenceChips(card)}
        <p class="signal-relationship-r-helper">${escapeHtml(t("signalEngineRHelper"))}</p>
      </div>
      <p class="signal-relationship-technical signal-relationship-detail-audit">
        <span>${escapeHtml(t("signalEngineAuditLabel"))}</span>
        ${escapeHtml(card.rawPairName)}
      </p>
      <p class="signal-relationship-meaning">${escapeHtml(buildRelationshipMeaning(card))}</p>
      <div class="signal-next-observation">
        <p class="signal-next-observation-title">${escapeHtml(t("signalEngineNextObservationLabel"))}</p>
        <p class="signal-next-observation-body">${escapeHtml(buildSignalRelationshipNextObservation(card))}</p>
      </div>
      <p class="signal-relationship-boundary">${escapeHtml(t("signalEngineBoundary"))}</p>
      <p class="signal-relationship-signature">${escapeHtml(t("signalEngineSignature"))}</p>
    </article>
  `;
}

function renderSignalRelationshipUnavailableNote(cards = []) {
  const hiddenPairs = cards
    .filter((card) => !card.hasCoefficient)
    .map((card) => `${card.displayPairName} · ${card.rawPairName} (${formatReviewNumber(card.n)})`);
  if (!hiddenPairs.length) return "";
  return `
    <p class="relationship-category-note">
      ${escapeHtml(t("signalEngineHiddenPairs", { pairs: hiddenPairs.join(", ") }))}
    </p>
  `;
}

function renderSignalRelationshipLegend() {
  return `
    <div class="signal-engine-legend" aria-label="${escapeHtml(t("signalEngineLegendTitle"))}">
      <p>${escapeHtml(t("signalEngineLegendTitle"))}</p>
      <span><strong>↗</strong>${escapeHtml(t("signalEngineLegendSame"))}</span>
      <span><strong>↘</strong>${escapeHtml(t("signalEngineLegendOpposite"))}</span>
      <span><strong>·</strong>${escapeHtml(t("signalEngineLegendUnclear"))}</span>
    </div>
  `;
}

function renderSignalRelationshipList(cards = [], selectedPairKey = "") {
  return `
    <div class="signal-relationship-list-wrap">
      <p class="signal-relationship-list-label">${escapeHtml(t("signalEngineListLabel"))}</p>
      <div class="signal-relationship-list" role="list">
        ${cards.map((card) => renderSignalRelationshipRow(card, selectedPairKey)).join("")}
      </div>
    </div>
  `;
}

function renderSignalRelationshipEngine(rows = [], timeframe = "7") {
  const cards = buildSignalRelationshipCards(rows);
  const readableCards = getRankedSignalRelationships(cards);
  const timeframeLabel = getFieldReviewTimeframeLabel(timeframe);
  const selectedCard = readableCards.find((card) => card.pairKey === activeSignalRelationshipPair) || readableCards[0];
  activeSignalRelationshipPair = selectedCard?.pairKey || "";

  return `
    <section class="signal-engine-panel" data-field-room="signalEngine" role="tabpanel">
      <div class="signal-engine-hero">
        <span class="signal-engine-motif" aria-hidden="true">∿</span>
        <div>
          <p class="section-kicker">${escapeHtml(t("signalEngineKicker"))}</p>
          <h3>${escapeHtml(t("signalEngineTitle"))}</h3>
          <p>${escapeHtml(t("signalEngineSubtitle"))}</p>
        </div>
      </div>
      <div class="signal-engine-boundary">
        <strong>${escapeHtml(t("fieldRoomSourceLabel"))}</strong>
        <span>${escapeHtml(t("fieldRoomSourceBubble", { timeframe: timeframeLabel }))}</span>
        <span>${escapeHtml(t("signalEngineBoundary"))}</span>
      </div>
      ${renderSignalRelationshipLegend()}
      ${readableCards.length ? `
        <div class="signal-relationship-layout">
          ${renderSignalRelationshipList(readableCards, activeSignalRelationshipPair)}
          ${renderSignalRelationshipDetail(selectedCard)}
        </div>
        ${renderSignalRelationshipUnavailableNote(cards)}
      ` : `
        <div class="relationship-empty-state">
          <p>${escapeHtml(t("signalEngineNoValidRows"))}</p>
          <p>${escapeHtml(t("signalEngineThinState"))}</p>
        </div>
        ${renderSignalRelationshipUnavailableNote(cards)}
      `}
      <p class="relationship-category-note">${escapeHtml(t("signalEngineCategoryNote"))}</p>
    </section>
  `;
}

function renderFieldRoomSelector(cardsByRoom) {
  const guidedRooms = FIELD_REVIEW_ROOM_ORDER.filter((room) => room.type !== "signalEngine");
  const signalEngineRoom = FIELD_REVIEW_ROOM_ORDER.find((room) => room.type === "signalEngine");
  const roomButtons = guidedRooms.map((room) => {
    const card = cardsByRoom[room.type];
    const isActive = room.type === activeFieldReviewRoom;
    return `
      <button type="button" class="field-room-button ${isActive ? "field-room-button-active" : ""}" data-field-room-target="${escapeHtml(room.type)}" role="tab" aria-selected="${String(isActive)}" aria-pressed="${String(isActive)}">
        <span class="field-room-button-motif" aria-hidden="true">${escapeHtml(card?.motif || room.motif || "·")}</span>
        <span>${escapeHtml(t(room.labelKey))}</span>
      </button>
    `;
  }).join("");

  if (!signalEngineRoom) return roomButtons;
  const isEngineActive = activeFieldReviewRoom === "signalEngine";

  return `
    ${roomButtons}
    <div class="field-room-engine-section">
      <p class="field-room-engine-label">SIGNAL ENGINE</p>
      <button type="button" class="field-room-button field-room-engine-button ${isEngineActive ? "field-room-engine-button-active" : ""}" data-field-room-target="signalEngine" role="tab" aria-selected="${String(isEngineActive)}" aria-pressed="${String(isEngineActive)}">
        <span class="field-room-button-motif field-room-engine-motif" aria-hidden="true">${escapeHtml(signalEngineRoom.motif || "∿")}</span>
        <span>
          <span class="field-room-engine-title">Signal Engine</span>
          <span class="field-room-engine-caption">Co-movement reader</span>
        </span>
      </button>
    </div>
  `;
}

function renderFieldRoomFocusChips() {
  return FIELD_REVIEW_FOCUS_ORDER.map((focus) => {
    const isActive = focus.type === activeFieldReviewFocus;
    return `
      <button type="button" class="field-room-focus-chip ${isActive ? "is-active" : ""}" data-field-room-focus="${escapeHtml(focus.type)}" aria-pressed="${String(isActive)}">
        ${escapeHtml(t(focus.labelKey))}
      </button>
    `;
  }).join("");
}

function renderFieldRoomBubble({ focusType, className, label, text }) {
  return `
    <div class="field-chat-bubble ${className}" data-field-focus-target="${escapeHtml(focusType)}">
      <p class="field-chat-bubble-label">${escapeHtml(label)}</p>
      <p>${escapeHtml(text)}</p>
    </div>
  `;
}

function renderFieldRoomNextActions(activeRoomType) {
  const nextRoomType = getFieldReviewNextRoomType(activeRoomType);
  const relatedRoomType = getFieldReviewRelatedRoomType(activeRoomType);
  const nextRoomLabel = getFieldReviewRoomLabel(nextRoomType);
  const relatedRoomLabel = getFieldReviewRoomLabel(relatedRoomType);
  const showRelated = relatedRoomType && relatedRoomType !== nextRoomType;
  const nextRoomIcon = getFieldReviewRoomNavIcon(nextRoomType);
  const relatedRoomIcon = getFieldReviewRoomNavIcon(relatedRoomType);
  const nextRoomDescription = getFieldReviewRoomTransitionDescription(nextRoomType);
  const relatedRoomDescription = getFieldReviewRoomTransitionDescription(relatedRoomType);

  return `
    <div class="field-room-next-actions">
      <div class="field-room-next-copy">
        <p>${escapeHtml(t("fieldRoomNextPrompt"))}</p>
        <span>${escapeHtml(t("fieldRoomNextHelper"))}</span>
      </div>
      <div class="field-room-next-action-buttons">
        <button type="button" class="ghost-button field-room-next-button guided-nav-room" data-field-room-target="${escapeHtml(nextRoomType)}">
          <span class="field-room-next-button-icon" aria-hidden="true">${escapeHtml(nextRoomIcon)}</span>
          <span class="field-room-next-button-copy">
            <strong>${escapeHtml(t("fieldRoomNextRoomButton", { room: nextRoomLabel }))}</strong>
            <small>${escapeHtml(nextRoomDescription)}</small>
          </span>
        </button>
      ${showRelated ? `
        <button type="button" class="ghost-button field-room-next-button guided-nav-room" data-field-room-target="${escapeHtml(relatedRoomType)}">
          <span class="field-room-next-button-icon" aria-hidden="true">${escapeHtml(relatedRoomIcon)}</span>
          <span class="field-room-next-button-copy">
            <strong>${escapeHtml(t("fieldRoomRelatedButton", { room: relatedRoomLabel }))}</strong>
            <small>${escapeHtml(relatedRoomDescription)}</small>
          </span>
        </button>
      ` : ""}
      </div>
    </div>
  `;
}

function renderGuidedReadingChoices(activeCard, { continuation = false, compact = false, includeExit = true } = {}) {
  const state = getGuidedReadingState(activeCard.roomType);
  const choices = GUIDED_READING_CHOICES;

  return `
    <div class="field-room-choice-stack ${compact ? "field-room-choice-stack-compact" : ""}">
      <p class="field-room-action-label">${escapeHtml(t(continuation ? "fieldRoomHydrationContinuePrompt" : "fieldRoomHydrationChoicePrompt"))}</p>
      <div class="field-room-focus-chips" role="group" aria-label="${escapeHtml(t("fieldRoomHydrationChoicePrompt"))}">
        ${choices.map((choice) => `
          <button type="button" class="field-room-focus-chip ${choice.type === state.choice ? "is-active" : ""}" data-guided-reading-choice="${escapeHtml(choice.type)}" data-guided-reading-room="${escapeHtml(activeCard.roomType)}" aria-pressed="${String(choice.type === state.choice)}">
            ${escapeHtml(t(choice.labelKey))}
          </button>
        `).join("")}
        ${includeExit ? `
        <button type="button" class="field-room-focus-chip guided-nav-exit" data-guided-reading-exit="${escapeHtml(activeCard.roomType)}">
          ${escapeHtml(t("fieldRoomConversationExit"))}
        </button>
        ` : ""}
      </div>
    </div>
  `;
}

function renderGuidedReadingRestart(activeCard) {
  return `
    <div class="hydration-reading-actions hydration-reading-actions-closing">
      <div class="field-room-focus-chips" role="group" aria-label="${escapeHtml(t("fieldRoomHydrationRestart"))}">
        <button type="button" class="field-room-focus-chip guided-nav-next" data-guided-reading-resume="${escapeHtml(activeCard.roomType)}">
          ${escapeHtml(t("fieldRoomHydrationResume"))}
        </button>
        <button type="button" class="field-room-focus-chip guided-nav-menu is-active" data-guided-reading-restart="${escapeHtml(activeCard.roomType)}">
          ${escapeHtml(t("fieldRoomHydrationRestart"))}
        </button>
      </div>
    </div>
  `;
}

function getGuidedReadingCardByChoice(activeCard, choiceType) {
  const choice = normalizeGuidedReadingChoice(choiceType);
  const cardsByChoice = {
    overview: {
      title: t("fieldRoomFocusOverview"),
      text: activeCard.reading
    },
    evidence: {
      title: t("fieldRoomFocusEvidence"),
      text: activeCard.evidence
    },
    next: {
      title: t("fieldRoomFocusNext"),
      text: activeCard.nextAttention
    },
    all: {
      title: t("fieldRoomFocusAll"),
      text: activeCard.allReading
        || [activeCard.evidence, activeCard.reading, activeCard.nextAttention].filter(Boolean).join(" ")
    }
  };
  return cardsByChoice[choice] || cardsByChoice.overview;
}

function getNextGuidedReadingChoice(activeCard) {
  const state = getGuidedReadingState(activeCard.roomType);
  const currentIndex = GUIDED_READING_CHOICES.findIndex((choice) => choice.type === state.choice);
  const nextChoice = GUIDED_READING_CHOICES
    .slice(currentIndex + 1)
    .find(Boolean);
  return nextChoice || GUIDED_READING_CHOICES.find((choice) => choice.type !== state.choice);
}

function renderGuidedReadingProgress(activeCard) {
  const state = getGuidedReadingState(activeCard.roomType);
  const choices = GUIDED_READING_CHOICES;
  return `
    <div class="hydration-reading-progress" aria-label="${escapeHtml(t("fieldRoomHydrationProgressLabel"))}">
      ${choices.map((choice) => {
        const wasRead = state.readChoices.has(choice.type);
        return `
          <span class="hydration-reading-progress-item ${wasRead ? "is-read" : ""}">
            <span>${escapeHtml(t(choice.labelKey))}</span>
            <strong aria-hidden="true">${wasRead ? "✓" : "○"}</strong>
          </span>
        `;
      }).join("")}
    </div>
  `;
}

function renderGuidedReadingCurrentIndicator(title) {
  return `
    <p class="guided-reading-current-indicator">
      ${escapeHtml(t("fieldRoomCurrentReadingLabel", { angle: title }))}
    </p>
  `;
}

function renderGuidedReadingCard(activeCard) {
  const state = getGuidedReadingState(activeCard.roomType);
  if (!state.choice) return "";
  const readingCard = getGuidedReadingCardByChoice(activeCard, state.choice);
  const nextChoice = getNextGuidedReadingChoice(activeCard);
  return `
    ${renderGuidedReadingCurrentIndicator(readingCard.title)}
    ${renderGuidedReadingChoices(activeCard, { continuation: true, compact: true, includeExit: false })}
    <article class="hydration-reading-card" aria-live="polite">
      <p class="section-kicker">${escapeHtml(readingCard.title)}</p>
      <p>${escapeHtml(readingCard.text)}</p>
    </article>
    <div class="hydration-reading-actions guided-reading-nav">
      <div class="guided-reading-nav-left">
        <button type="button" class="ghost-button guided-nav-button guided-nav-back" data-guided-reading-back="${escapeHtml(activeCard.roomType)}" ${state.history.length <= 1 ? "disabled" : ""}>
          ${escapeHtml(t("fieldRoomHydrationBack"))}
        </button>
        <button type="button" class="ghost-button guided-nav-button guided-nav-menu" data-guided-reading-choose="${escapeHtml(activeCard.roomType)}">
          ${escapeHtml(t("fieldRoomHydrationChooseAgain"))}
        </button>
      </div>
      <div class="guided-reading-nav-right">
        <button type="button" class="ghost-button guided-nav-button guided-nav-exit" data-guided-reading-exit="${escapeHtml(activeCard.roomType)}">
          ${escapeHtml(t("fieldRoomConversationExit"))}
        </button>
        ${nextChoice ? `
          <button type="button" class="ghost-button guided-nav-button guided-nav-next" data-guided-reading-choice="${escapeHtml(nextChoice.type)}" data-guided-reading-room="${escapeHtml(activeCard.roomType)}">
            ${escapeHtml(t("fieldRoomHydrationNextAngle"))}
          </button>
        ` : ""}
      </div>
    </div>
    ${renderFieldRoomNextActions(activeCard.roomType)}
  `;
}

function getGuidedReadingIntroText(activeCard, timeframe = "7") {
  if (activeCard.roomType === "hydration") return t("fieldRoomHydrationWelcome");
  return t("fieldRoomSourceBubble", { timeframe: getFieldReviewTimeframeLabel(timeframe) });
}

function renderGuidedReadingRoom(activeCard, timeframe = "7") {
  const state = getGuidedReadingState(activeCard.roomType);
  const choice = normalizeGuidedReadingChoice(state.choice);

  return `
    <div class="hydration-guided-reading" aria-live="polite">
      <article class="hydration-reading-intro">
        <p>${escapeHtml(getGuidedReadingIntroText(activeCard, timeframe))}</p>
      </article>
      ${renderGuidedReadingProgress(activeCard)}
      ${state.ended ? `
        <article class="hydration-reading-card hydration-reading-closing">
          <p>${escapeHtml(t("fieldRoomConversationClosing"))}</p>
        </article>
        ${renderGuidedReadingRestart(activeCard)}
      ` : ""}
      ${!choice && !state.ended ? `
        <article class="hydration-reading-question">
          <p>${escapeHtml(getFieldRoomQuestion(activeCard.roomType))}</p>
          ${renderGuidedReadingChoices(activeCard)}
        </article>
      ` : ""}
      ${choice && !state.ended ? renderGuidedReadingCard(activeCard) : ""}
    </div>
  `;
}

function renderFieldRoomConversation(activeCard, timeframe = "7") {
  return renderGuidedReadingRoom(activeCard, timeframe);
}

function renderFieldRoomWorkspace(cards = [], timeframe = "7", rows = []) {
  const cardsByRoom = cards.reduce((acc, card) => {
    acc[card.roomType] = card;
    return acc;
  }, {});
  activeFieldReviewRoom = normalizeFieldReviewRoom(activeFieldReviewRoom);
  activeFieldReviewFocus = normalizeFieldReviewFocus(activeFieldReviewFocus);

  const activeCard = cardsByRoom[activeFieldReviewRoom] || cards[0];
  if (!activeCard) return "";

  return `
    <div class="field-room-workspace">
      <aside class="field-room-sidebar" aria-label="${escapeHtml(t("fieldRoomWorkspaceTitle"))}">
        <div class="field-room-sidebar-heading">
          <p class="section-kicker">${escapeHtml(t("fieldRoomWorkspaceKicker"))}</p>
          <h3>${escapeHtml(t("fieldRoomWorkspaceTitle"))}</h3>
        </div>
        <div class="field-room-list" role="tablist" aria-label="${escapeHtml(t("fieldRoomWorkspaceTitle"))}">
          ${renderFieldRoomSelector(cardsByRoom)}
        </div>
      </aside>

      <article class="field-room-main">
        ${activeFieldReviewRoom === "signalEngine" ? renderSignalRelationshipEngine(rows, timeframe) : `
          <section class="field-room-panel" data-field-room="${escapeHtml(activeCard.roomType)}" role="tabpanel" style="--field-room-image: url('${escapeHtml(activeCard.roomImage)}');">
            <div class="field-room-panel-heading">
              <span class="field-review-card-motif field-room-panel-motif" aria-hidden="true">${escapeHtml(activeCard.motif)}</span>
              <div>
                <p class="section-kicker">${escapeHtml(getFieldReviewRoomLabel(activeCard.roomType))}</p>
                <h3>${escapeHtml(activeCard.title)}</h3>
                <p class="field-room-flow-label">${escapeHtml(t("fieldRoomFlowModeLabel"))}</p>
              </div>
            </div>

            ${renderFieldRoomConversation(activeCard, timeframe)}
          </section>
        `}
      </article>
    </div>
  `;
}

function updateFieldReviewTimeframeSegments(timeframe = "7") {
  document.querySelectorAll("[data-field-review-timeframe]").forEach((button) => {
    const isActive = button.dataset.fieldReviewTimeframe === timeframe;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderFieldReviewOverview(rows = [], allRows = []) {
  const overview = document.querySelector("#fieldReviewOverviewStrip");
  if (!overview) return;
  const stats = getFieldReviewStats(rows, allRows.length);
  const emptyValue = t("fieldReviewOverviewNoValue");
  const items = [
    {
      label: t("fieldReviewOverviewReviewedDays"),
      value: rows.length ? formatReviewNumber(rows.length) : emptyValue
    },
    {
      label: t("fieldReviewOverviewAverageWater"),
      value: stats.waterValues.length ? `${formatReviewNumber(stats.averageWater)} ml` : emptyValue
    },
    {
      label: t("fieldReviewOverviewHighLoad"),
      value: rows.length ? formatReviewNumber(stats.highLoadRows.length) : emptyValue
    },
    {
      label: t("fieldReviewOverviewLowRecovery"),
      value: rows.length ? formatReviewNumber(stats.lowSleepRows.length) : emptyValue
    },
    {
      label: t("fieldReviewOverviewDrinkLoad"),
      value: rows.length ? formatReviewNumber(stats.drinkContextDays) : emptyValue
    },
    {
      label: t("fieldReviewOverviewMindNote"),
      value: rows.length ? formatReviewNumber(stats.mindNoteDays) : emptyValue
    }
  ];

  overview.innerHTML = items.map((item) => `
    <div class="soft-insight-chip">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.value)}</strong>
    </div>
  `).join("");
}

function renderFieldReview() {
  const container = document.querySelector("#fieldReviewCards");
  const status = document.querySelector("#fieldReviewDataStatus");
  const emptyState = document.querySelector("#fieldReviewEmptyState");
  const thinState = document.querySelector("#fieldReviewThinState");
  const timeframeSelect = document.querySelector("#fieldReviewTimeframe");
  if (!container || !status || !emptyState || !thinState) return;

  const timeframe = timeframeSelect?.value || FIELD_REVIEW_DEFAULT_TIMEFRAME;
  if (guidedReadingTimeframe !== timeframe) {
    resetAllGuidedReading();
    guidedReadingTimeframe = timeframe;
  }
  const allRows = getAllFieldReviewRows();
  const rows = getFieldReviewRows(timeframe);
  const hasRows = rows.length > 0;
  const isThin = hasRows && rows.length < 3;

  updateFieldReviewTimeframeSegments(timeframe);
  renderFieldReviewOverview(rows, allRows);

  status.textContent = hasRows
    ? timeframe === "all"
      ? t("fieldReviewAllDataStatus", { used: formatReviewNumber(rows.length) })
      : t("fieldReviewDataStatus", {
        used: formatReviewNumber(rows.length),
        total: formatReviewNumber(allRows.length)
      })
    : t("fieldReviewNoDataStatus");

  emptyState.classList.toggle("is-hidden", hasRows);
  thinState.classList.toggle("is-hidden", !isThin);
  const cards = buildFieldReviewCards(rows, timeframe);
  container.classList.toggle("is-room-workspace", hasRows);
  container.innerHTML = hasRows ? renderFieldRoomWorkspace(cards, timeframe, rows) : "";
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
      const profileImport = parseUserIntentionProfileSheet(workbook);
      const rowsWithReflections = importedRows.map((row) => {
        const reflectionRecord = reflectionMap[row.Date] || {};
        return normalizeLogRow({
          ...row,
          Reflection_Root: reflectionRecord.Reflection_Root || row.Reflection_Root || "",
          Reflection_Root_Label: reflectionRecord.Reflection_Root_Label || row.Reflection_Root_Label || "",
          Reflection_Root_Source: reflectionRecord.Reflection_Root_Source || row.Reflection_Root_Source || "",
          Reflection_Root_Declaration: reflectionRecord.Reflection_Root_Declaration || row.Reflection_Root_Declaration || "",
          Reflection_Text: cleanLegacyTextValue(reflectionRecord.Reflection_Text || row.Reflection_Text || "", "Reflection_Text")
        });
      });

      setDailyLog(rowsWithReflections);
      const profileImportResult = confirmAndReplaceUserIntentionProfile(profileImport);
      document.querySelector("#saveStatus").textContent = [
        t("importDone", { count: rowsWithReflections.length }),
        profileImportResult.message
      ].filter(Boolean).join(" ");
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
    if (date) {
      acc[date] = {
        Reflection_Root: normalizeReflectionRootMetadataValue(row.Reflection_Root),
        Reflection_Root_Label: cleanLegacyTextValue(row.Reflection_Root_Label || "", "Reflection_Root_Label"),
        Reflection_Root_Source: cleanLegacyTextValue(row.Reflection_Root_Source || "", "Reflection_Root_Source"),
        Reflection_Root_Declaration: cleanLegacyTextValue(row.Reflection_Root_Declaration || "", "Reflection_Root_Declaration"),
        Reflection_Text: cleanLegacyTextValue(row.Reflection_Text || "", "Reflection_Text")
      };
    }
    return acc;
  }, {});
}

function localizeLogCell(column, value) {
  if (value === undefined || value === null || value === "") return "";
  if (["Energy", "Mind", "Sleep"].includes(column)) return localizeStateValue(column, value);
  if (column === "Drinks") return localizeJoinedValues(value, drinkOptions, "drinks");
  if (column === "Drink_Profile_JSON") return localizeDrinkProfileJson(value);
  if (column === "Run_Detail_JSON") return localizeRunDetailJson(value);
  if (column === "Practice_Root") return t(`options.practiceRoots.${value}`);
  if (column === "Practice_Type") return t(`options.practiceTypes.${value}`);
  if (column === "Practice_Context_JSON") return localizePracticeContextJson(value);
  if (column === "Reflection_Root") return value ? getReflectionRootLabel(value, currentLanguage) : "";
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

function localizeRunDetailJson(value) {
  const detail = normalizeRunDetail(value);
  if (!detail.type && !hasMeaningfulRunDetail(detail)) return "";
  return [
    detail.type ? t(`options.activities.${detail.type}`) : "",
    detail.distanceKm !== "" ? `${detail.distanceKm} km` : "",
    detail.durationMin !== "" ? `${detail.durationMin} min` : "",
    detail.avgPace || "",
    detail.sweat ? t(`runSweat${detail.sweat[0].toUpperCase()}${detail.sweat.slice(1)}`) : ""
  ].filter(Boolean).join(" / ");
}

function localizePracticeContextJson(value) {
  const normalizedJson = normalizePracticeContextJsonForRow(value);
  if (!normalizedJson) return "";
  const detail = parsePracticeContextJson(normalizedJson);
  return [
    detail.root ? t(`options.practiceRoots.${detail.root}`) : "",
    detail.type ? t(`options.practiceTypes.${detail.type}`) : "",
    detail.minutes !== "" && detail.minutes !== undefined ? `${detail.minutes} min` : "",
    detail.note || ""
  ].filter(Boolean).join(" / ");
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
      "一般": "calm",
      "ไม่สบายใจ": "uneasy",
      "Uneasy": "uneasy",
      "不舒服": "uneasy",
      "心里不舒服": "uneasy",
      "รู้สึกดี": "feeling_good",
      "Feeling good": "feeling_good",
      "感觉不错": "feeling_good",
      "ขอบคุณ": "grateful",
      "Grateful": "grateful",
      "感谢": "grateful"
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
      "หนักมาก": "options.mind.very_heavy",
      "Very heavy": "options.mind.very_heavy",
      "很沉重": "options.mind.very_heavy",
      "ไม่สบายใจ": "options.mind.uneasy",
      "Uneasy": "options.mind.uneasy",
      "不安": "options.mind.uneasy",
      "กังวล": "options.mind.uneasy",
      "Worried": "options.mind.uneasy",
      "担心": "options.mind.uneasy",
      "กดดัน": "options.mind.pressured",
      "Pressured": "options.mind.pressured",
      "有压力": "options.mind.pressured",
      "ฟุ้ง": "options.mind.pressured",
      "Scattered": "options.mind.pressured",
      "分散": "options.mind.pressured",
      "นิ่ง": "options.mind.neutral",
      "เฉย ๆ": "options.mind.neutral",
      "Calm": "options.mind.neutral",
      "Neutral": "options.mind.neutral",
      "平静": "options.mind.neutral",
      "一般": "options.mind.neutral",
      "พอไหว": "options.mind.okay",
      "Okay": "options.mind.okay",
      "还可以": "options.mind.okay",
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
