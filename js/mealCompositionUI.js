(function initializeMealCompositionUI(globalScope) {
  const SUPPORTED_LANGUAGES = ["th", "en", "zh"];
  const DEFAULT_COMPONENT_RESULT_LIMIT = 8;
  const MAX_MEAL_VISUAL_TOKENS = 6;
  const MAX_SAVED_MEAL_TYPE_INDICATORS = 3;
  const CATEGORY_ORDER = [
    "grain",
    "animal_protein",
    "plant_protein",
    "egg",
    "vegetable",
    "fruit",
    "soup",
    "condiment",
    "processed_food",
    "dessert"
  ];

  const TEXT = {
    th: {
      kicker: "MEAL COMPOSITION",
      title: "มื้ออาหารวันนี้",
      intro: "ค่อย ๆ ประกอบสิ่งที่กินไว้เท่าที่จำได้ก็พอ",
      open: "เปิดประกอบมื้อ",
      close: "เก็บพื้นที่ประกอบมื้อ",
      recordedCount: (count) => `${count} มื้อที่บันทึกไว้`,
      mealType: "มื้อนี้เป็นอาหารแบบไหน",
      mealTypeHelper: "เลือกจากที่เห็นหรือจำได้ ไม่ต้องรู้สูตรทั้งหมด",
      visionAction: "ให้ AI ช่วยมองจากรูป",
      visionLocalNote: "วิเคราะห์ผ่านโมเดลในเครื่องนี้ รูปจะไม่ถูกเก็บไว้กับมื้อ",
      visionPrepareImage: "เตรียมรูปสำหรับ AI",
      visionPrepareUnavailable: "เตรียมรูปไม่ได้",
      visionChooseImageFallback: "เลือกรูปโดยตรงแทน",
      visionRuntimeRequired: "ตัวช่วยจากรูปและการเตรียมรูปต้องเปิดผ่าน Local Launcher ค่ะ",
      visionRuntimeHelper: "เปิด Start Mindful Health Balance.command แล้วกลับมาที่หน้านี้ได้เลย ส่วนประกอบมื้อเองยังใช้ได้ตามปกติค่ะ",
      visionChooseImage: "เลือกรูปอาหาร",
      visionPreparing: "กำลังเตรียมรูปในเครื่องนี้…",
      visionChecking: "กำลังตรวจว่าโมเดลในเครื่องพร้อมไหม…",
      visionObserving: "กำลังมองมื้อนี้ให้ค่ะ… อาจใช้เวลาสักครู่",
      visionReviewTitle: "หนูลองมองจากภาพให้ก่อนนะ",
      visionReviewHelper: "เลือกเฉพาะสิ่งที่ตรงกับมื้อนี้ แล้วค่อยเติมเป็นร่างได้ค่ะ",
      visionDish: "อาหารที่ดูคล้าย",
      visionDishInformational: "เป็นข้อความช่วยตรวจเท่านั้น ไม่ใช่เมนูอ้างอิง",
      visionMealTypes: "ลักษณะอาหาร",
      visionComponents: "สิ่งที่มองเห็น",
      visionUncertain: "ส่วนที่ยังไม่แน่ใจ",
      visionNotObservable: "ยังบอกไม่ได้จากภาพ",
      visionOmitMealType: "ไม่ใช้ลักษณะอาหารจากภาพ",
      visionChooseComponent: "เลือกว่ารายการนี้ตรงกับอะไร",
      visionUnsupported: "ยังไม่เติมรายการนี้อัตโนมัติ",
      visionApply: "ใช้รายการที่เลือกกับมื้อนี้",
      visionRetry: "ลองมองอีกครั้ง",
      visionClear: "ปิดตัวช่วยจากรูป",
      visionPreviewAlt: "รูปอาหารที่เลือกไว้ชั่วคราวเพื่อช่วยตรวจรายการ",
      visionApplied: "เติมรายการที่เลือกไว้ในมื้อที่กำลังประกอบแล้วค่ะ ยังไม่ได้บันทึกมื้อ",
      visionAppliedConflict: "เก็บลักษณะอาหารที่พี่เลือกไว้เดิม และเติมเฉพาะรายการอื่นที่ไม่ซ้ำค่ะ",
      visionUnavailable: "ตอนนี้ยังใช้ตัวช่วยจากรูปไม่ได้ ประกอบมื้อเองต่อได้ตามปกติค่ะ",
      visionModelMissing: "ยังไม่พบโมเดลสำหรับช่วยมองรูปในเครื่องนี้ ประกอบมื้อเองต่อได้ตามปกติค่ะ",
      visionTimeout: "การมองรูปใช้เวลานานกว่ารอบนี้ ลองใหม่หรือประกอบมื้อเองต่อได้ค่ะ",
      visionInvalid: "ผลจากรูปยังไม่น่าใช้เป็นร่าง จึงยังไม่ได้เติมอะไรลงมื้อค่ะ",
      visionImageError: "ยังเตรียมรูปนี้สำหรับการอ่านไม่ได้ค่ะ ลองเลือกรูปอื่น หรือใช้ JPG/PNG แทนได้ โดย draft ยังเหมือนเดิม",
      visionNotObservableLabels: { sauce_identity: "ชนิดของซอส", seasoning_amount: "ปริมาณเครื่องปรุง", cooking_method: "วิธีปรุงที่มองไม่ชัด" },
      namedDishSuggestion: "อาจมีเมนูอ้างอิงที่ตรงกับมื้อนี้",
      namedDishConfirm: "ใช้รายการนี้",
      namedDishReject: "ไม่ใช่",
      namedDishConfirmed: "กำลังใช้ข้อมูลอ้างอิงของ",
      namedDishClear: "ยกเลิกเมนูอ้างอิง",
      namedDishSource: "Thai Food Composition Database",
      namedDishBasis: (range) => `ข้อมูลอ้างอิงของเมนูนี้: ${range} / 100 g`,
      namedDishBasisHelper: "เป็นค่าจากข้อมูลอ้างอิงต่อ 100 กรัม ยังไม่ได้แปลงเป็นทั้งจาน",
      namedDishSoftConflict: "ลักษณะอาหารที่เลือกอาจไม่ตรงกับเมนูอ้างอิง ลองตรวจอีกครั้งได้ค่ะ",
      namedDishEvidenceConflict: "รายการที่เลือกเปลี่ยนขอบเขตของเมนูอ้างอิง จึงพักการใช้ค่าประมาณนี้ไว้ก่อน",
      namedDishFallback: "มื้อนี้ยังเก็บได้ตามปกติ และจะอ่านจากรายการที่บันทึกไว้เท่าที่มีข้อมูลรองรับ",
      chooseFood: "มีอะไรอยู่ในมื้อนี้บ้าง",
      chooseFoodHelper: "เลือกเท่าที่รู้ ไม่จำเป็นต้องครบทุกอย่าง",
      foodItemCount: (count) => `${count} รายการ`,
      expandFoodPicker: "แสดงรายการอาหาร",
      collapseFoodPicker: "พับรายการอาหาร",
      searchLabel: "ค้นหาอาหารหรือเครื่องปรุง",
      searchPlaceholder: "ค้นหา เช่น ไข่ ผัก น้ำปลา",
      allCategories: "ทั้งหมด",
      addFood: (name) => `เพิ่ม ${name} ลงมื้อนี้`,
      noFoodFound: "ยังไม่พบรายการนี้ในชุดอาหารตอนนี้ค่ะ",
      showMoreFoods: (count) => `ดูอีก ${count} รายการ`,
      selectedComponent: (count) => count > 1 ? `อยู่ในมื้อนี้ ×${count}` : "อยู่ในมื้อนี้",
      addSelectedFood: (name, count) => `เพิ่ม ${name} อีกหนึ่งรายการ ตอนนี้อยู่ในมื้อนี้ ${count} รายการ`,
      condimentUnknown: "ไม่ทราบเครื่องปรุงทั้งหมด",
      condimentUnknownHelper: "ยังเก็บมื้อนี้ได้ตามปกติ",
      currentMeal: "มื้อนี้กำลังประกอบอยู่",
      draftKicker: "มื้อที่กำลังประกอบ",
      currentMealEmpty: "เลือกอาหารหรือเครื่องปรุงด้านบนเพื่อเริ่มประกอบมื้อนี้",
      mealLabel: "ช่วงของมื้อ (ถ้าอยากระบุ)",
      mealName: "ชื่อมื้อ / ชื่ออาหาร",
      mealNameHelper: "ไม่บังคับ เขียนตามที่อยากจำมื้อนี้ได้",
      mealNamePlaceholder: "เช่น ข้าวขาหมูไม่หนัง ใส่ไข่",
      namingPending: "กำลังลองเสนอชื่อมื้อ…",
      namingInsufficient: "ยังไม่แน่ใจพอที่จะช่วยตั้งชื่อมื้อนี้",
      namingFailed: "ข้ามการช่วยตั้งชื่อครั้งนี้ได้เลย",
      namingTitle: "AI ช่วยเสนอชื่อมื้อนี้",
      namingDescription: "จากสิ่งที่เห็นในภาพ ลองเลือกชื่อที่ใกล้ที่สุด หรือเขียนชื่อที่อยากจำเองได้",
      namingSuggestion: "ข้อเสนอจาก AI",
      namingCustom: "เขียนชื่อของฉันเอง",
      namingCustomLabel: "ชื่อมื้อ / ชื่ออาหาร",
      namingCustomPlaceholder: "เขียนชื่อมื้อนี้ตามที่อยากจำ",
      namingSkipInline: "ยังไม่ตั้งชื่อตอนนี้",
      namingExisting: "ชื่อนี้มีอยู่แล้วและจะไม่ถูกเขียนทับอัตโนมัติ",
      mealTime: "เวลา (ถ้าอยากเก็บไว้)",
      portion: "ปริมาณโดยประมาณ",
      preparation: "วิธีเตรียม (ถ้าจำได้)",
      removeItem: (name) => `เอา ${name} ออกจากมื้อนี้`,
      remove: "เอาออก",
      save: "เก็บมื้อนี้",
      saveChanges: "เก็บการแก้ไข",
      reflectMealDraft: "สะท้อนมื้อนี้เบา ๆ",
      reflectMealDraftHelper: "ดูมื้อนี้อีกมุมหนึ่งก่อนบันทึก โดยยังไม่เปลี่ยนข้อมูลของมื้อ",
      saving: "กำลังเก็บมื้อนี้…",
      cancelEdit: "ยกเลิกการแก้ไข",
      saved: "เก็บมื้อนี้ไว้แล้วค่ะ",
      updated: "อัปเดตมื้อนี้แล้วค่ะ",
      savedLatest: "เก็บมื้อล่าสุดไว้แล้วค่ะ",
      savedDate: (date) => `บันทึกวันที่ ${date}`,
      updatedLatest: "อัปเดตมื้อล่าสุดแล้วค่ะ",
      visualItemCount: (count) => `${count} รายการในมื้อนี้`,
      deleted: "เอามื้อนี้ออกจากบันทึกแล้วค่ะ",
      saveNeedsItem: "เลือกอย่างน้อยหนึ่งรายการก่อนเก็บมื้อนี้นะคะ",
      invalidCustom: "ใส่จำนวนเท่าของหนึ่งหน่วยที่มากกว่า 0",
      draftEstimateTitle: "ภาพคร่าว ๆ ของมื้อนี้",
      estimateComplete: (range) => `ค่าประมาณโซเดียม: ${range}`,
      estimatePartial: (range) => `ค่าประมาณจากรายการที่มีข้อมูล: ${range}`,
      estimateUnknown: "รายการในมื้อนี้ยังไม่มีค่าประมาณโซเดียมที่รองรับพอ",
      estimatePartialNote: "บางรายการยังไม่มีค่าประมาณ จึงยังไม่ใช่ภาพครบทั้งมื้อ",
      evidenceRange: (range, serving) => `ประมาณ ${range} / ${serving}`,
      evidenceUnknown: "ยังไม่มีค่าประมาณที่รองรับพอ",
      savedMeals: "มื้อที่บันทึกไว้วันนี้",
      savedMealsEmpty: "ยังไม่มีมื้อที่บันทึกไว้วันนี้",
      editMeal: "แก้ไขมื้อนี้",
      deleteMeal: "เอามื้อนี้ออก",
      deleteConfirm: "เอามื้อนี้ออกจากบันทึกไหม",
      dailyReflectionKicker: "ภาพของมื้อที่บันทึกไว้",
      dailyReflectionTitle: "ค่อย ๆ มองมื้ออาหารของวันนี้",
      emptyReflection: [
        "วันนี้ยังไม่มีมื้อที่บันทึกไว้",
        "ถ้าอยากเก็บภาพคร่าว ๆ ของมื้อไหนไว้ เริ่มจากตรงนี้ได้เลย"
      ],
      dailyCount: (count) => `วันนี้มี ${count} มื้อที่บันทึกไว้ค่ะ`,
      composition: (parts) => `ในมื้อที่บันทึกไว้ มี${parts.join(" ")}ปรากฏอยู่ค่ะ`,
      animalProtein: "โปรตีนสัตว์",
      plantProtein: "โปรตีนพืช",
      vegetables: "ผัก",
      condimentPresence: (count) => `มีเครื่องปรุงใน ${count} มื้อที่บันทึกไว้`,
      dailySodiumComplete: (range) => `ค่าประมาณโซเดียมจากรายการที่มีข้อมูลครบอยู่ที่ ${range}`,
      dailySodiumPartial: (range) => `ค่าประมาณโซเดียมจากรายการที่รองรับได้อยู่ที่ ${range} และยังมีบางรายการที่ข้อมูลไม่ครบ`,
      dailySodiumUnknown: "รายการที่บันทึกไว้ยังไม่มีค่าประมาณโซเดียมที่รองรับพอ จึงอ่านภาพรวมแบบเบา ๆ ก่อนค่ะ",
      labels: {
        breakfast: "เช้า",
        lunch: "กลางวัน",
        dinner: "เย็น",
        snack: "ของว่าง",
        late_meal: "มื้อดึก",
        unnamed: "ไม่ระบุ"
      },
      mealTypes: {
        unspecified: "ไม่แน่ใจ / ยังไม่ระบุ",
        stir_fried: "ผัด",
        boiled: "ต้ม",
        curry: "แกง",
        fried: "ทอด",
        grilled: "ย่าง",
        steamed: "นึ่ง",
        broth_based: "อาหารน้ำ",
        minimally_prepared: "สด / เตรียมน้อย",
        other: "อื่น ๆ"
      },
      portions: { small: "น้อย", regular: "ปกติ", large: "เยอะ", custom: "กำหนดเอง" },
      preparations: {
        "": "ยังไม่ระบุ",
        boiled: "ต้ม",
        steamed: "นึ่ง",
        grilled: "ย่าง",
        stir_fried: "ผัด",
        fried: "ทอด",
        roasted: "อบ",
        raw: "สด",
        soup: "ซุป",
        unknown: "ไม่แน่ใจ"
      },
      categories: {
        grain: "ข้าว / แป้ง",
        animal_protein: "โปรตีนสัตว์",
        plant_protein: "โปรตีนพืช",
        egg: "ไข่",
        vegetable: "ผัก",
        fruit: "ผลไม้",
        soup: "ซุป",
        condiment: "เครื่องปรุง",
        processed_food: "อาหารแปรรูป",
        dessert: "ของหวาน",
        other: "อื่น ๆ"
      }
    },
    en: {
      kicker: "MEAL COMPOSITION",
      title: "Today's meals",
      intro: "Gently assemble what you remember eating. A rough picture is enough.",
      open: "Open meal composer",
      close: "Close meal composer",
      recordedCount: (count) => `${count} recorded ${count === 1 ? "meal" : "meals"}`,
      mealType: "What kind of meal is this?",
      mealTypeHelper: "Choose what you recognize. You do not need the full recipe.",
      visionAction: "Let local AI look at a photo",
      visionLocalNote: "Analyzed by a model on this device. The photo is not stored with the meal.",
      visionPrepareImage: "Prepare a photo for AI",
      visionPrepareUnavailable: "Couldn't prepare the image",
      visionChooseImageFallback: "Choose an image directly instead",
      visionRuntimeRequired: "The photo helper and image preparation need the Local Launcher.",
      visionRuntimeHelper: "Open Start Mindful Health Balance.command, then return here. Manual meal composition is still available.",
      visionChooseImage: "Choose a meal photo",
      visionPreparing: "Preparing the photo on this device…",
      visionChecking: "Checking whether the local model is ready…",
      visionObserving: "Looking at this meal… This may take a few seconds.",
      visionReviewTitle: "Here is what I can see so far",
      visionReviewHelper: "Keep only what fits this meal, then use it as a draft.",
      visionDish: "Looks similar to",
      visionDishInformational: "Review context only, not a reference-dish identity.",
      visionMealTypes: "Meal type suggestions",
      visionComponents: "Visible components",
      visionUncertain: "Still uncertain",
      visionNotObservable: "Not observable from the image",
      visionOmitMealType: "Do not use a meal type from the image",
      visionChooseComponent: "Choose what this observation maps to",
      visionUnsupported: "This observation will not be added automatically",
      visionApply: "Use selected items in this meal",
      visionRetry: "Look again",
      visionClear: "Close photo helper",
      visionPreviewAlt: "Meal photo selected temporarily for observation review",
      visionApplied: "Selected items were added to the meal draft. The meal has not been saved.",
      visionAppliedConflict: "Your existing meal type was kept; only non-duplicate items were added.",
      visionUnavailable: "The photo helper is unavailable right now. Manual meal composition still works normally.",
      visionModelMissing: "The local vision model is not available. Manual meal composition still works normally.",
      visionTimeout: "The observation took longer than this attempt. Try again or continue manually.",
      visionInvalid: "This image result was not reliable enough to use as a draft, so nothing was applied.",
      visionImageError: "This photo could not be prepared for observation. Try another image or use JPG/PNG; the draft stays unchanged.",
      visionNotObservableLabels: { sauce_identity: "sauce identity", seasoning_amount: "seasoning amount", cooking_method: "unclear cooking method" },
      namedDishSuggestion: "A reference dish may fit this meal",
      namedDishConfirm: "Use this reference",
      namedDishReject: "Not this one",
      namedDishConfirmed: "Using the reference for",
      namedDishClear: "Clear reference dish",
      namedDishSource: "Thai Food Composition Database",
      namedDishBasis: (range) => `Reference for this dish: ${range} / 100 g`,
      namedDishBasisHelper: "This is a 100 g reference value, not an estimate for the whole plate.",
      namedDishSoftConflict: "The selected meal type may not match this reference dish. You can check it again.",
      namedDishEvidenceConflict: "The selected items change this reference dish boundary, so this estimate is paused for now.",
      namedDishFallback: "You can still keep the meal. MHB will read supported recorded items instead.",
      chooseFood: "What was in this meal?",
      chooseFoodHelper: "Choose what you know. It does not need to be complete.",
      foodItemCount: (count) => `${count} item${count === 1 ? "" : "s"}`,
      expandFoodPicker: "Show meal items",
      collapseFoodPicker: "Collapse meal items",
      searchLabel: "Search foods or condiments",
      searchPlaceholder: "Search, for example egg, vegetables, fish sauce",
      allCategories: "All",
      addFood: (name) => `Add ${name} to this meal`,
      noFoodFound: "No reference item matches this search yet.",
      showMoreFoods: (count) => `Show ${count} more`,
      selectedComponent: (count) => count > 1 ? `In this meal ×${count}` : "In this meal",
      addSelectedFood: (name, count) => `Add another ${name}. ${count} currently in this meal`,
      condimentUnknown: "I do not know all condiments",
      condimentUnknownHelper: "You can still keep this meal as it is.",
      currentMeal: "This meal is taking shape",
      draftKicker: "MEAL IN PROGRESS",
      currentMealEmpty: "Choose a food or condiment above to begin this meal.",
      mealLabel: "Meal moment (optional)",
      mealName: "Meal name",
      mealNameHelper: "Optional. Write the name you would naturally use to remember this meal.",
      mealNamePlaceholder: "For example, regular-shop rice before a run",
      namingPending: "Trying a meal name suggestion…",
      namingInsufficient: "There is not enough certainty to suggest a name for this meal.",
      namingFailed: "You can skip the naming help this time.",
      namingTitle: "AI can suggest a name for this meal",
      namingDescription: "Choose the closest name from what the image shows, or write the name you would like to remember.",
      namingSuggestion: "AI suggestion",
      namingCustom: "Write my own name",
      namingCustomLabel: "Meal name",
      namingCustomPlaceholder: "Write the name you would like to remember",
      namingSkipInline: "Do not name it now",
      namingExisting: "This name is already present and will not be overwritten automatically.",
      mealTime: "Time (optional)",
      portion: "Approximate portion",
      preparation: "Preparation (optional)",
      removeItem: (name) => `Remove ${name} from this meal`,
      remove: "Remove",
      save: "Keep this meal",
      saveChanges: "Keep changes",
      reflectMealDraft: "Gently reflect on this meal",
      reflectMealDraftHelper: "View this meal from another angle before saving, without changing the draft.",
      saving: "Keeping this meal…",
      cancelEdit: "Cancel editing",
      saved: "This meal has been kept.",
      updated: "This meal has been updated.",
      savedLatest: "Your latest meal has been saved.",
      savedDate: (date) => `Saved for ${date}`,
      updatedLatest: "Your latest meal has been updated.",
      visualItemCount: (count) => `${count} ${count === 1 ? "item" : "items"} in this meal`,
      deleted: "This meal was removed from the record.",
      saveNeedsItem: "Choose at least one item before keeping this meal.",
      invalidCustom: "Enter a serving multiplier greater than 0.",
      draftEstimateTitle: "A rough view of this meal",
      estimateComplete: (range) => `Estimated sodium: ${range}`,
      estimatePartial: (range) => `Estimate from supported items: ${range}`,
      estimateUnknown: "The items in this meal do not yet have enough supported sodium estimates.",
      estimatePartialNote: "Some items remain unknown, so this is not a complete view of the meal.",
      evidenceRange: (range, serving) => `About ${range} / ${serving}`,
      evidenceUnknown: "No sufficiently supported estimate yet",
      savedMeals: "Meals recorded today",
      savedMealsEmpty: "No meals have been recorded today yet.",
      editMeal: "Edit this meal",
      deleteMeal: "Remove this meal",
      deleteConfirm: "Remove this meal from the record?",
      dailyReflectionKicker: "A view from recorded meals",
      dailyReflectionTitle: "A gentle look at today's meals",
      emptyReflection: [
        "There are no recorded meals today yet.",
        "If you would like to keep a rough picture of a meal, you can begin here."
      ],
      dailyCount: (count) => `There ${count === 1 ? "is" : "are"} ${count} recorded ${count === 1 ? "meal" : "meals"} today.`,
      composition: (parts) => `The recorded meals include ${parts.join(", ")}.`,
      animalProtein: "animal protein",
      plantProtein: "plant protein",
      vegetables: "vegetables",
      condimentPresence: (count) => `Condiments appear in ${count} recorded ${count === 1 ? "meal" : "meals"}.`,
      dailySodiumComplete: (range) => `The supported sodium estimate for the recorded items is ${range}.`,
      dailySodiumPartial: (range) => `Supported items give a sodium estimate of ${range}; some recorded items still have incomplete evidence.`,
      dailySodiumUnknown: "The recorded items do not yet have enough supported sodium estimates, so this view stays light for now.",
      labels: {
        breakfast: "Breakfast",
        lunch: "Lunch",
        dinner: "Dinner",
        snack: "Snack",
        late_meal: "Late meal",
        unnamed: "Unspecified"
      },
      mealTypes: {
        unspecified: "Not sure / unspecified",
        stir_fried: "Stir-fried",
        boiled: "Boiled",
        curry: "Curry",
        fried: "Fried",
        grilled: "Grilled",
        steamed: "Steamed",
        broth_based: "Broth-based",
        minimally_prepared: "Fresh / minimally prepared",
        other: "Other"
      },
      portions: { small: "Small", regular: "Regular", large: "Large", custom: "Custom" },
      preparations: {
        "": "Not recorded",
        boiled: "Boiled",
        steamed: "Steamed",
        grilled: "Grilled",
        stir_fried: "Stir-fried",
        fried: "Fried",
        roasted: "Roasted",
        raw: "Raw",
        soup: "Soup",
        unknown: "Not sure"
      },
      categories: {
        grain: "Rice / staples",
        animal_protein: "Animal protein",
        plant_protein: "Plant protein",
        egg: "Egg",
        vegetable: "Vegetables",
        fruit: "Fruit",
        soup: "Soup",
        condiment: "Condiments",
        processed_food: "Processed foods",
        dessert: "Dessert",
        other: "Other"
      }
    },
    zh: {
      kicker: "MEAL COMPOSITION",
      title: "今天的餐食",
      intro: "记得多少，就轻轻拼出多少；留下大致的样子就够了。",
      open: "打开餐食组合区",
      close: "收起餐食组合区",
      recordedCount: (count) => `已记录 ${count} 餐`,
      mealType: "这一餐是什么类型？",
      mealTypeHelper: "按看见或记得的样子选择，不需要知道完整食谱。",
      visionAction: "让本机 AI 帮忙看看照片",
      visionLocalNote: "由这台设备上的模型分析；照片不会随餐食保存。",
      visionPrepareImage: "为 AI 准备照片",
      visionPrepareUnavailable: "暂时无法准备图片",
      visionChooseImageFallback: "改为直接选择图片",
      visionRuntimeRequired: "照片助手和图片准备需要通过 Local Launcher 打开。",
      visionRuntimeHelper: "打开 Start Mindful Health Balance.command 后再回到这里。手动组合餐食仍可正常使用。",
      visionChooseImage: "选择餐食照片",
      visionPreparing: "正在这台设备上准备照片…",
      visionChecking: "正在检查本机模型是否可用…",
      visionObserving: "正在看看这一餐… 可能需要几秒钟。",
      visionReviewTitle: "先看看我从照片里观察到了什么",
      visionReviewHelper: "只保留符合这一餐的内容，再作为草稿使用。",
      visionDish: "看起来像",
      visionDishInformational: "仅供核对，不是参考菜品身份。",
      visionMealTypes: "餐食类型建议",
      visionComponents: "看得见的组成",
      visionUncertain: "仍不确定的部分",
      visionNotObservable: "无法从照片判断",
      visionOmitMealType: "不采用照片中的餐食类型",
      visionChooseComponent: "选择这项观察对应的食物",
      visionUnsupported: "这项观察不会自动加入",
      visionApply: "把所选内容用于这一餐",
      visionRetry: "再看一次",
      visionClear: "关闭照片助手",
      visionPreviewAlt: "为观察核对而临时选择的餐食照片",
      visionApplied: "所选内容已加入餐食草稿；餐食尚未保存。",
      visionAppliedConflict: "已保留原先选择的餐食类型，只加入不重复的其他条目。",
      visionUnavailable: "照片助手目前不可用，仍可照常手动组合餐食。",
      visionModelMissing: "这台设备上未找到本地视觉模型，仍可照常手动组合餐食。",
      visionTimeout: "这次观察用时较长；可以重试或继续手动填写。",
      visionInvalid: "这次照片结果还不足以作为草稿，因此没有加入任何内容。",
      visionImageError: "暂时无法准备这张照片。请尝试其他图片或使用 JPG/PNG；草稿不会改变。",
      visionNotObservableLabels: { sauce_identity: "酱汁种类", seasoning_amount: "调味用量", cooking_method: "看不清的烹调方式" },
      namedDishSuggestion: "这餐可能有相符的参考菜品",
      namedDishConfirm: "使用这项参考",
      namedDishReject: "不是这项",
      namedDishConfirmed: "正在使用这项参考",
      namedDishClear: "取消参考菜品",
      namedDishSource: "Thai Food Composition Database",
      namedDishBasis: (range) => `这道菜的参考资料：${range} / 100 g`,
      namedDishBasisHelper: "这是每 100 克的参考值，并非整盘餐食的估算。",
      namedDishSoftConflict: "所选餐食类型可能与这项参考菜品不完全一致，可以再确认一下。",
      namedDishEvidenceConflict: "所选条目改变了这项参考菜品的范围，因此暂时不使用这项估算。",
      namedDishFallback: "这餐仍可正常保存；MHB 会按有资料支持的已记录条目来读取。",
      chooseFood: "这一餐里有什么？",
      chooseFoodHelper: "按知道的部分选择，不需要记全。",
      foodItemCount: (count) => `${count} 项`,
      expandFoodPicker: "显示餐食项目",
      collapseFoodPicker: "收起餐食项目",
      searchLabel: "搜索食物或调味品",
      searchPlaceholder: "例如：鸡蛋、蔬菜、鱼露",
      allCategories: "全部",
      addFood: (name) => `把${name}加入这一餐`,
      noFoodFound: "暂时没有符合这次搜索的参考条目。",
      showMoreFoods: (count) => `再看 ${count} 项`,
      selectedComponent: (count) => count > 1 ? `已在这餐中 ×${count}` : "已在这餐中",
      addSelectedFood: (name, count) => `再添加一份${name}；这餐中目前有 ${count} 份`,
      condimentUnknown: "不清楚全部调味品",
      condimentUnknownHelper: "这样也可以留下这一餐。",
      currentMeal: "正在轻轻拼出这一餐",
      draftKicker: "正在组合",
      currentMealEmpty: "从上方选择一种食物或调味品，就可以开始记录这一餐。",
      mealLabel: "用餐时段（可留空）",
      mealName: "餐食名称",
      mealNameHelper: "可留空。按你自然会记住这餐的方式来写。",
      mealNamePlaceholder: "例如：去跑步前常去店里的饭",
      namingPending: "正在尝试建议餐食名称…",
      namingInsufficient: "目前还不够确定，无法帮这餐建议名称。",
      namingFailed: "这次可以先跳过命名帮助。",
      namingTitle: "AI 可以帮忙建议这餐的名称",
      namingDescription: "根据图片中看到的内容，选择最接近的名称，或写下你想记住的名称。",
      namingSuggestion: "AI 建议",
      namingCustom: "自己写名称",
      namingCustomLabel: "餐食名称",
      namingCustomPlaceholder: "写下你想记住的餐食名称",
      namingSkipInline: "暂时不命名",
      namingExisting: "这个名称已经存在，不会被自动覆盖。",
      mealTime: "时间（可留空）",
      portion: "大致份量",
      preparation: "烹调方式（可留空）",
      removeItem: (name) => `从这一餐移除${name}`,
      remove: "移除",
      save: "留下这一餐",
      saveChanges: "保存修改",
      reflectMealDraft: "轻轻回看这一餐",
      reflectMealDraftHelper: "保存前从另一个角度看看这一餐，不会改变餐食草稿。",
      saving: "正在留下这一餐…",
      cancelEdit: "取消修改",
      saved: "这一餐已经留下来了。",
      updated: "这一餐已经更新。",
      savedLatest: "刚记录的这一餐已经留下来了。",
      savedDate: (date) => `已记录到 ${date}`,
      updatedLatest: "刚记录的这一餐已经更新。",
      visualItemCount: (count) => `这一餐中有 ${count} 项记录`,
      deleted: "这一餐已从记录中移除。",
      saveNeedsItem: "请先选择至少一项，再留下这一餐。",
      invalidCustom: "请输入大于 0 的份量倍数。",
      draftEstimateTitle: "这一餐的大致样子",
      estimateComplete: (range) => `钠含量估算：${range}`,
      estimatePartial: (range) => `有资料支持的条目估算：${range}`,
      estimateUnknown: "这一餐里的条目目前还没有足够可靠的钠含量估算。",
      estimatePartialNote: "有些条目仍缺少估算资料，因此这还不是整餐的完整图像。",
      evidenceRange: (range, serving) => `约 ${range} / ${serving}`,
      evidenceUnknown: "目前还没有足够可靠的估算",
      savedMeals: "今天已记录的餐食",
      savedMealsEmpty: "今天还没有记录餐食。",
      editMeal: "修改这一餐",
      deleteMeal: "移除这一餐",
      deleteConfirm: "要把这一餐从记录中移除吗？",
      dailyReflectionKicker: "从已记录餐食看到的样子",
      dailyReflectionTitle: "轻轻看看今天的餐食",
      emptyReflection: [
        "今天还没有记录餐食。",
        "如果想留下某一餐的大致样子，可以从这里开始。"
      ],
      dailyCount: (count) => `今天有 ${count} 餐被记录下来。`,
      composition: (parts) => `已记录的餐食里出现了${parts.join("、")}。`,
      animalProtein: "动物蛋白",
      plantProtein: "植物蛋白",
      vegetables: "蔬菜",
      condimentPresence: (count) => `已记录的 ${count} 餐中出现了调味品。`,
      dailySodiumComplete: (range) => `已记录条目中有资料支持的钠含量估算为 ${range}。`,
      dailySodiumPartial: (range) => `有资料支持的条目给出 ${range} 的钠含量估算；部分已记录条目仍缺少完整资料。`,
      dailySodiumUnknown: "已记录条目目前还没有足够可靠的钠含量估算，因此先轻轻看看整体就好。",
      labels: {
        breakfast: "早餐",
        lunch: "午餐",
        dinner: "晚餐",
        snack: "点心",
        late_meal: "较晚的一餐",
        unnamed: "不注明"
      },
      mealTypes: {
        unspecified: "不确定 / 未注明",
        stir_fried: "炒",
        boiled: "煮",
        curry: "咖喱",
        fried: "炸",
        grilled: "烤",
        steamed: "蒸",
        broth_based: "汤类餐食",
        minimally_prepared: "新鲜 / 少加工",
        other: "其他"
      },
      portions: { small: "少量", regular: "一般", large: "较多", custom: "自定义" },
      preparations: {
        "": "未记录",
        boiled: "水煮",
        steamed: "蒸",
        grilled: "烤",
        stir_fried: "炒",
        fried: "油炸",
        roasted: "烘烤",
        raw: "生食",
        soup: "汤",
        unknown: "不确定"
      },
      categories: {
        grain: "米饭 / 主食",
        animal_protein: "动物蛋白",
        plant_protein: "植物蛋白",
        egg: "鸡蛋",
        vegetable: "蔬菜",
        fruit: "水果",
        soup: "汤",
        condiment: "调味品",
        processed_food: "加工食品",
        dessert: "甜点",
        other: "其他"
      }
    }
  };

  const FOOD_ICONS = Object.freeze({
    rice: "🍚",
    brown_rice: "🍚",
    noodles: "🍜",
    chicken_breast: "🍗",
    chicken: "🍗",
    pork_lean: "🥩",
    pork_fatty: "🥩",
    pork_crispy: "🥩",
    beef: "🥩",
    fish: "🐟",
    shrimp: "🍤",
    squid: "🦑",
    egg: "🥚",
    tofu: "◻",
    tempeh: "◻",
    mixed_vegetables: "🥬",
    leafy_vegetables: "🥬",
    fruit: "🍎",
    clear_soup: "🥣",
    fish_sauce: "🥄",
    soy_sauce: "🥄",
    oyster_sauce: "🥄",
    seasoning_powder: "🥄",
    soup_base: "🥣",
    dipping_sauce: "🥄",
    processed_sausage: "◌",
    fried_snack: "◇",
    dessert: "🍮"
  });

  // These visual cues describe meal form only. They do not encode ingredients, nutrition, or sodium.
  const MEAL_TYPE_ILLUSTRATIONS = Object.freeze({
    unspecified: '<svg viewBox="0 0 64 44" aria-hidden="true"><ellipse cx="29" cy="28" rx="20" ry="9"/><path d="M12 28h34"/><path d="M31 12c5 0 7 6 3 9-2 2-4 3-4 6"/><circle cx="30" cy="32" r="1"/></svg>',
    stir_fried: '<svg viewBox="0 0 64 44" aria-hidden="true"><circle cx="25" cy="27" r="12"/><path d="M35 27h18"/><path d="M21 23h8M20 28h10M24 17l3 4"/><path d="M47 13l5 7"/></svg>',
    boiled: '<svg viewBox="0 0 64 44" aria-hidden="true"><path d="M16 23h28v13H16z"/><path d="M13 21h34M22 18c-3-4 3-5 0-9M31 18c-3-4 3-5 0-9M39 18c-3-4 3-5 0-9"/><path d="M16 28h-4M44 28h4"/></svg>',
    curry: '<svg viewBox="0 0 64 44" aria-hidden="true"><path d="M13 25c2 11 11 14 19 14s17-3 19-14H13z"/><path d="M10 24h44"/><path d="M42 12l10 10"/><circle cx="32" cy="20" r="4"/></svg>',
    fried: '<svg viewBox="0 0 64 44" aria-hidden="true"><path d="M12 28c2 8 9 11 17 11s15-3 17-11H12z"/><path d="M15 27h28"/><path d="M42 28h13"/><path d="M24 20l5 4 5-4"/></svg>',
    grilled: '<svg viewBox="0 0 64 44" aria-hidden="true"><rect x="15" y="17" width="32" height="17" rx="3"/><path d="M20 20l10 11M29 20l10 11M38 20l6 7M22 38h18"/></svg>',
    steamed: '<svg viewBox="0 0 64 44" aria-hidden="true"><path d="M17 25h30v12H17z"/><path d="M14 24h36M20 20h24v4M23 16h18v4M25 12h14v4"/><path d="M24 9c-2-3 2-4 0-6M33 9c-2-3 2-4 0-6"/></svg>',
    broth_based: '<svg viewBox="0 0 64 44" aria-hidden="true"><path d="M13 25c2 10 10 14 19 14s17-4 19-14H13z"/><path d="M10 24h44"/><path d="M43 13l10 10"/><path d="M22 19c-2-4 2-5 0-9M32 19c-2-4 2-5 0-9"/></svg>',
    minimally_prepared: '<svg viewBox="0 0 64 44" aria-hidden="true"><ellipse cx="31" cy="29" rx="20" ry="8"/><path d="M31 27c0-10 8-14 15-13-1 8-6 14-15 13z"/><path d="M31 27c-4-7-10-8-14-6 3 7 8 9 14 6z"/></svg>',
    other: '<svg viewBox="0 0 64 44" aria-hidden="true"><ellipse cx="31" cy="28" rx="20" ry="9"/><path d="M12 28h38"/><circle cx="23" cy="25" r="2"/><circle cx="32" cy="22" r="2"/><circle cx="39" cy="27" r="2"/></svg>'
  });

  // Color is a presentation cue for meal form, never a health or nutrition judgment.
  const MEAL_TYPE_VISUAL_TONES = Object.freeze({
    unspecified: "cream",
    stir_fried: "leaf-gold",
    boiled: "orange",
    curry: "coral",
    fried: "amber",
    grilled: "terracotta",
    steamed: "soft-yellow",
    broth_based: "broth-green",
    minimally_prepared: "fresh-green",
    other: "warm-neutral"
  });

  const MOMENT_TEXT = Object.freeze({
    th: Object.freeze({ title: "วันนี้กินอะไร", intro: "เก็บชื่ออาหารไว้เท่าที่อยากจำ", open: "บันทึกมื้ออาหาร", close: "พับมื้ออาหาร", mealName: "ชื่ออาหาร", mealNameHelper: "จำเป็นสำหรับบันทึก · เขียนตามที่คุณเรียกอาหารนี้", additionalDetails: "รายละเอียดเพิ่มเติม", mealType: "ประเภทอาหาร (ไม่บังคับ)", mealLabel: "ช่วงของมื้อ (ไม่บังคับ)", mealTime: "เวลา (ไม่บังคับ)", save: "บันทึกมื้อนี้", nameRequired: "กรุณาระบุชื่ออาหารก่อนบันทึก", invalidTime: "กรุณาระบุเวลาเป็น HH:mm หรือเว้นว่าง", storageFailed: "ยังบันทึกไม่ได้ ข้อมูลเดิมและชื่อที่กรอกยังอยู่ โปรดลองอีกครั้ง", storageBlocked: "ยังแก้ไขข้อมูลมื้ออาหารไม่ได้ เพราะอ่านข้อมูลเดิมอย่างปลอดภัยไม่สำเร็จ ระบบไม่ได้ลบหรือรีเซ็ตข้อมูล", historicalDetails: "รายละเอียดจากบันทึกเดิม", customOccasion: "ช่วงของมื้อที่ตั้งเอง", customLabel: "มื้อที่ตั้งเอง" }),
    en: Object.freeze({ title: "What did you eat?", intro: "Keep the food name you want to remember.", open: "Record a meal", close: "Collapse meals", mealName: "Food name", mealNameHelper: "Required to save. Use the name you would naturally call it.", additionalDetails: "Additional details", mealType: "Food type (optional)", mealLabel: "Meal occasion (optional)", mealTime: "Time (optional)", save: "Save meal", nameRequired: "Enter a food name before saving.", invalidTime: "Enter time as HH:mm or leave it blank.", storageFailed: "Could not save. Your previous data and current draft are retained. Please try again.", storageBlocked: "Meal changes are paused because existing storage could not be read safely. Nothing has been deleted or reset.", historicalDetails: "Historical details", customOccasion: "Custom meal occasion", customLabel: "Custom occasion" }),
    zh: Object.freeze({ title: "今天吃了什么？", intro: "留下你想记住的食物名称。", open: "记录一餐", close: "收起餐食", mealName: "食物名称", mealNameHelper: "保存时必填。按你平时的叫法填写。", additionalDetails: "更多详情", mealType: "食物类型（可选）", mealLabel: "用餐时段（可选）", mealTime: "时间（可选）", save: "保存这一餐", nameRequired: "请先填写食物名称。", invalidTime: "请以 HH:mm 格式填写时间，或留空。", storageFailed: "未能保存。原有数据和当前草稿均已保留，请重试。", storageBlocked: "暂时无法安全读取原有餐食数据，修改已暂停。数据未被删除或重置。", historicalDetails: "历史记录详情", customOccasion: "自定义用餐时段", customLabel: "自定义时段" })
  });

  const NAMING_TEXT = Object.freeze({
    th: Object.freeze({
      visionUnavailable: "AI ยังไม่พร้อมใช้งาน พิมพ์ชื่ออาหารเองได้เลย",
      visionModelMissing: "ยังไม่พบโมเดลในเครื่อง พิมพ์ชื่ออาหารเองได้เลย",
      visionTimeout: "การดูภาพใช้เวลานาน พิมพ์ชื่อเองหรือลองใหม่ได้",
      visionInvalid: "ยังอ่านผลจากภาพไม่ได้ พิมพ์ชื่ออาหารเองได้เลย",
      visionImageError: "ยังอ่านภาพนี้ไม่ได้ ลองภาพอื่นหรือพิมพ์ชื่อเองได้เลย",
      visionPreviewAlt: "ภาพอาหารที่เลือกไว้ชั่วคราว",
      visionRuntimeHelper: "เปิด Start Mindful Health Balance.command เพื่อใช้ AI หรือพิมพ์ชื่ออาหารแล้วบันทึกได้เลย",
      visionAction: "ให้ AI ช่วยเสนอชื่ออาหาร",
      visionObserving: "กำลังดูภาพอาหาร...",
      namingTitle: "ชื่อที่ AI เสนอ",
      namingPending: "กำลังเสนอชื่ออาหาร...",
      namingInsufficient: "ยังเสนอชื่อไม่ได้ ลองพิมพ์ชื่อเองได้เลย",
      namingFailed: "ยังเสนอชื่อไม่ได้ ลองพิมพ์ชื่อเองได้เลย",
      namingUnavailable: "AI ยังไม่พร้อมใช้งาน พิมพ์ชื่ออาหารเองได้เลย",
      namingMalformed: "ยังอ่านชื่อที่ AI เสนอไม่ได้ พิมพ์ชื่อเองได้เลย",
      namingUse: "ใช้ชื่อนี้",
      namingEditable: "แก้ไขชื่อได้ก่อนบันทึก",
      namingRetry: "ลองเสนอชื่ออีกครั้ง",
      namingCancelled: "ยกเลิกแล้ว พิมพ์ชื่ออาหารเองได้เลย"
    }),
    en: Object.freeze({
      visionUnavailable: "AI is unavailable. You can enter a name manually.",
      visionModelMissing: "The local model is not available. You can enter a name manually.",
      visionTimeout: "The photo request took too long. You can enter a name or retry.",
      visionInvalid: "The photo result could not be read. You can enter a name manually.",
      visionImageError: "This photo could not be read. Try another photo or enter a name.",
      visionPreviewAlt: "Temporarily selected food photo",
      visionRuntimeHelper: "Open Start Mindful Health Balance.command to use AI, or enter a food name and save manually.",
      visionAction: "Suggest a food name with AI",
      visionObserving: "Looking at the food photo...",
      namingTitle: "Suggested names",
      namingPending: "Suggesting food names...",
      namingInsufficient: "No suggestion available. You can enter a name manually.",
      namingFailed: "No suggestion available. You can enter a name manually.",
      namingUnavailable: "AI is unavailable. You can enter a name manually.",
      namingMalformed: "The suggested names could not be read. You can enter a name manually.",
      namingUse: "Use this name",
      namingEditable: "You can edit the name before saving",
      namingRetry: "Try suggesting names again",
      namingCancelled: "Cancelled. You can enter a name manually."
    }),
    zh: Object.freeze({
      visionUnavailable: "AI 暂不可用，可以直接填写食物名称。",
      visionModelMissing: "本机模型暂不可用，可以直接填写食物名称。",
      visionTimeout: "查看照片用时较长，可以直接填写名称或重试。",
      visionInvalid: "暂时无法读取照片结果，可以直接填写食物名称。",
      visionImageError: "暂时无法读取此照片，可以换一张或直接填写名称。",
      visionPreviewAlt: "临时选择的食物照片",
      visionRuntimeHelper: "打开 Start Mindful Health Balance.command 使用 AI，也可以直接填写名称并保存。",
      visionAction: "让 AI 帮忙建议食物名称",
      visionObserving: "正在查看食物照片...",
      namingTitle: "AI 建议的名称",
      namingPending: "正在建议食物名称...",
      namingInsufficient: "暂时没有建议，可以直接填写食物名称。",
      namingFailed: "暂时没有建议，可以直接填写食物名称。",
      namingUnavailable: "AI 暂不可用，可以直接填写食物名称。",
      namingMalformed: "暂时无法读取建议名称，可以直接填写。",
      namingUse: "使用此名称",
      namingEditable: "保存前仍可修改名称",
      namingRetry: "重新建议名称",
      namingCancelled: "已取消，可以直接填写食物名称。"
    })
  });

  function normalizeLanguage(language) {
    return SUPPORTED_LANGUAGES.includes(language) ? language : "th";
  }

  function getText(language) {
    return { ...TEXT[normalizeLanguage(language)], ...MOMENT_TEXT[normalizeLanguage(language)], ...NAMING_TEXT[normalizeLanguage(language)] };
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatNumber(value, language) {
    const locale = language === "en" ? "en-US" : language === "zh" ? "zh-CN" : "th-TH";
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value);
  }

  function formatRange(min, max, language) {
    if (!Number.isFinite(min) || !Number.isFinite(max)) return "";
    return `${formatNumber(min, language)}–${formatNumber(max, language)} mg`;
  }

  function buildDailyReflectionLines(summary, language = "th") {
    const copy = getText(language);
    if (!summary || summary.recorded_meal_count === 0) return [...copy.emptyReflection];

    const lines = [copy.dailyCount(summary.recorded_meal_count)];
    const composition = [];
    if (summary.animal_protein_meals > 0) composition.push(copy.animalProtein);
    if (summary.plant_protein_meals > 0) composition.push(copy.plantProtein);
    if (summary.vegetable_present_meals > 0) composition.push(copy.vegetables);
    if (composition.length) lines.push(copy.composition(composition));
    if (summary.meals_with_recorded_condiments > 0) {
      lines.push(copy.condimentPresence(summary.meals_with_recorded_condiments));
    }

    const range = formatRange(summary.estimated_sodium_min_mg, summary.estimated_sodium_max_mg, language);
    if (summary.sodium_estimate_coverage === "complete" && range) {
      lines.push(copy.dailySodiumComplete(range));
    } else if (summary.sodium_estimate_coverage === "partial" && range) {
      lines.push(copy.dailySodiumPartial(range));
    } else {
      lines.push(copy.dailySodiumUnknown);
    }
    return lines.slice(0, 4);
  }

  function buildSavedMealTypeIndicatorModel(meals = []) {
    const canonicalMeals = Array.isArray(meals) ? meals : [];
    const mealTypes = canonicalMeals.map((meal) => {
      const value = String(meal?.meal_type || "").trim();
      return Object.prototype.hasOwnProperty.call(MEAL_TYPE_ILLUSTRATIONS, value) ? value : "unspecified";
    });
    return Object.freeze({
      totalCount: canonicalMeals.length,
      visibleMealTypes: Object.freeze(mealTypes.slice(0, MAX_SAVED_MEAL_TYPE_INDICATORS)),
      overflowCount: Math.max(0, mealTypes.length - MAX_SAVED_MEAL_TYPE_INDICATORS)
    });
  }

  function createEmptyDraft() {
    return {
      mealId: "",
      mealName: "",
      mealLabel: "unnamed",
      customMealLabel: "",
      mealType: "unspecified",
      namedDishId: "",
      condimentKnowledge: "",
      time: "",
      items: []
    };
  }

  function cloneItem(item) {
    return { ...item };
  }

  function createMealComposerModel(options = {}) {
    const runtime = options.runtime;
    if (!runtime) throw new Error("Meal Composition runtime is required.");
    const store = options.store || runtime.createMealStore(options.storage, {
      normalizeDate: options.normalizeDate,
      now: options.now,
      createId: options.createId,
      warn: options.warn,
      library: options.library || runtime.getFoodReferenceLibrary(),
      language: normalizeLanguage(options.language)
    });
    const library = options.library || runtime.getFoodReferenceLibrary();
    let date = String(options.date || "").trim();
    let language = normalizeLanguage(options.language);
    let draft = createEmptyDraft();
    let dismissedNamedDishIds = new Set();
    let dirtyMeta = new Set();
    let draftRevision = 0;

    function resetDraft() {
      draftRevision += 1;
      draft = createEmptyDraft();
      dismissedNamedDishIds = new Set();
      dirtyMeta = new Set();
      return getDraft();
    }

    function getDraft() {
      return {
        ...draft,
        items: draft.items.map(cloneItem)
      };
    }

    function addFood(foodId) {
      const reference = runtime.getFoodReferenceById(foodId);
      if (!reference) return null;
      const item = store.createMealItem({
        food_id: reference.food_id,
        portion_label: "regular",
        preparation: reference.preparation_default || ""
      });
      if (!item) return null;
      draft.items.push(item);
      dismissedNamedDishIds = new Set();
      return cloneItem(item);
    }

    function updateDraftItem(mealItemId, updates = {}) {
      const index = draft.items.findIndex((item) => item.meal_item_id === mealItemId);
      if (index < 0) return null;
      const existing = draft.items[index];
      const reference = runtime.getFoodReferenceById(existing.food_id);
      const item = runtime.createMealItem({
        ...existing,
        ...updates,
        meal_item_id: existing.meal_item_id,
        food_id: existing.food_id,
        display_name_snapshot: existing.display_name_snapshot
      }, reference, { language });
      if (!item) return null;
      draft.items[index] = item;
      dismissedNamedDishIds = new Set();
      return cloneItem(item);
    }

    function removeDraftItem(mealItemId) {
      const length = draft.items.length;
      draft.items = draft.items.filter((item) => item.meal_item_id !== mealItemId);
      dismissedNamedDishIds = new Set();
      return draft.items.length !== length;
    }

    function setDraftMeta(updates = {}) {
      Object.keys(updates).forEach((key) => dirtyMeta.add(key));
      if (Object.prototype.hasOwnProperty.call(updates, "mealLabel")) {
        draft.mealLabel = ["breakfast", "lunch", "dinner", "snack", "late_meal", "custom", "unnamed"].includes(updates.mealLabel)
          ? updates.mealLabel
          : "unnamed";
      }
      if (Object.prototype.hasOwnProperty.call(updates, "customMealLabel")) draft.customMealLabel = String(updates.customMealLabel || "").trim();
      if (Object.prototype.hasOwnProperty.call(updates, "mealName")) draft.mealName = String(updates.mealName || "").trim();
      if (Object.prototype.hasOwnProperty.call(updates, "mealType")) {
        draft.mealType = runtime.MEAL_TYPES?.has(updates.mealType) ? updates.mealType : "unspecified";
      }
      if (Object.prototype.hasOwnProperty.call(updates, "condimentKnowledge")) {
        draft.condimentKnowledge = updates.condimentKnowledge === "unknown" ? "unknown" : "";
      }
      if (Object.prototype.hasOwnProperty.call(updates, "time")) draft.time = String(updates.time || "").trim();
      return getDraft();
    }

    function validateDraft() {
      if (!draft.mealName.trim()) return { ok: false, code: "name_required" };
      // Leave untouched historical time alone; validate all newly supplied times.
      if ((!draft.mealId || dirtyMeta.has("time")) && !runtime.isValidMealTime(draft.time)) return { ok: false, code: "invalid_time" };
      return { ok: true };
    }

    function saveDraft({ date: saveDate = date } = {}) {
      const validation = validateDraft();
      if (!validation.ok) return validation;
      const wasEditing = Boolean(draft.mealId);
      const metadata = {
        mealName: "meal_name", mealType: "meal_type", mealLabel: "meal_label",
        customMealLabel: "custom_meal_label", time: "time"
      };
      const input = wasEditing ? {} : { date: saveDate };
      for (const [key, field] of Object.entries(metadata)) {
        if (!wasEditing || dirtyMeta.has(key)) input[field] = draft[key];
      }
      const result = wasEditing ? store.updateMeal(draft.mealId, input) : store.createMeal(input);
      if (!result.ok) return result;
      resetDraft();
      return { ...result, wasEditing };
    }

    function editMeal(mealId) {
      const meal = store.getMealsForDate(date).find((record) => record.meal_id === mealId);
      if (!meal) return null;
      draftRevision += 1;
      draft = {
        mealId: meal.meal_id,
        mealName: meal.meal_name || "",
        mealLabel: meal.meal_label,
        customMealLabel: meal.custom_meal_label || "",
        mealType: meal.meal_type || "unspecified",
        namedDishId: meal.named_dish_id || "",
        condimentKnowledge: meal.condiment_knowledge || "",
        time: meal.time,
        items: meal.items.map(cloneItem)
      };
      dirtyMeta = new Set();
      return getDraft();
    }

    function deleteMeal(mealId) {
      const result = store.deleteMeal(mealId);
      if (result.ok && draft.mealId === mealId) resetDraft();
      return result;
    }

    function getNamedDishCandidates() {
      if (draft.namedDishId || typeof runtime.getNamedDishCandidates !== "function") return [];
      return runtime.getNamedDishCandidates({ meal_type: draft.mealType, items: draft.items })
        .filter((candidate) => !dismissedNamedDishIds.has(candidate.candidate_id));
    }

    function confirmNamedDish(candidateId) {
      const candidate = getNamedDishCandidates().find((entry) => entry.candidate_id === candidateId && entry.match_status === "compatible");
      if (!candidate || !runtime.getNamedDishReferenceById(candidate.candidate_id)) return null;
      draft.namedDishId = candidate.candidate_id;
      dismissedNamedDishIds = new Set();
      return getDraft();
    }

    function rejectNamedDishCandidate(candidateId) {
      dismissedNamedDishIds.add(String(candidateId || ""));
      return getDraft();
    }

    function clearNamedDishConfirmation() {
      draft.namedDishId = "";
      return getDraft();
    }

    return Object.freeze({
      getLibrary: () => library,
      getLanguage: () => language,
      setLanguage: (nextLanguage) => { language = normalizeLanguage(nextLanguage); },
      getDate: () => date,
      setDate: (nextDate, { preserveDraft = false } = {}) => {
        const normalized = String(nextDate || "").trim();
        if (normalized !== date) {
          date = normalized;
          if (preserveDraft) draftRevision += 1;
          else resetDraft();
        }
      },
      getDraft,
      hasUnsavedDraft: () => Boolean(draft.mealId || dirtyMeta.size || draft.items.length),
      getDraftRevision: () => draftRevision,
      resetDraft,
      addFood,
      updateDraftItem,
      removeDraftItem,
      setDraftMeta,
      saveDraft,
      validateDraft,
      getStorageState: () => { const state = store.inspectStorage(); return { ok: state.ok, code: state.code }; },
      editMeal,
      deleteMeal,
      getNamedDishCandidates,
      confirmNamedDish,
      rejectNamedDishCandidate,
      clearNamedDishConfirmation,
      getMeals: () => store.getMealsForDate(date),
      getDraftNamedDishConsistency: () => runtime.evaluateNamedDishConsistency({
        meal_type: draft.mealType,
        named_dish_id: draft.namedDishId,
        items: draft.items
      }),
      getDraftEstimate: () => runtime.deriveMealEstimate({ named_dish_id: draft.namedDishId, meal_type: draft.mealType, items: draft.items }),
      getDailySummary: () => runtime.deriveDailyMealSummary(date, store.getMealsForDate(date), library)
    });
  }

  function getFoodIcon(reference) {
    return FOOD_ICONS[reference?.food_id] || "·";
  }

  function buildMealVisualModel(items, runtime, language = "th", maxTokens = MAX_MEAL_VISUAL_TOKENS) {
    const normalizedLanguage = normalizeLanguage(language);
    const sourceItems = Array.isArray(items) ? items : [];
    const tokenLimit = Number.isInteger(maxTokens) && maxTokens > 0 ? maxTokens : MAX_MEAL_VISUAL_TOKENS;
    const components = sourceItems.map((item) => {
      const reference = runtime?.getFoodReferenceById?.(item?.food_id) || null;
      const name = reference
        ? runtime.getFoodDisplayName(reference, normalizedLanguage)
        : String(item?.display_name_snapshot || item?.food_id || "").trim();
      return Object.freeze({
        foodId: String(item?.food_id || ""),
        name,
        icon: getFoodIcon(reference)
      });
    });
    return Object.freeze({
      itemCount: components.length,
      tokens: Object.freeze(components.slice(0, tokenLimit)),
      overflowCount: Math.max(0, components.length - tokenLimit),
      componentNames: Object.freeze(components.map((component) => component.name).filter(Boolean))
    });
  }

  function buildSavedMealCardModel(meal, runtime, language = "th") {
    const copy = getText(language);
    const visual = buildMealVisualModel(meal?.items, runtime, language);
    return Object.freeze({
      mealId: String(meal?.meal_id || ""),
      mealName: String(meal?.meal_name || "").trim(),
      time: String(meal?.time || "").trim(),
      label: copy.labels[meal?.meal_label] || copy.labels.unnamed,
      mealType: copy.mealTypes[meal?.meal_type] || copy.mealTypes.unspecified,
      condimentKnowledge: meal?.condiment_knowledge === "unknown" ? "unknown" : "",
      visual
    });
  }

  function buildSaveFeedbackModel(phase, wasEditing = false, language = "th") {
    const copy = getText(language);
    if (phase === "saving") return Object.freeze({ phase, message: copy.saving });
    if (phase === "saved") return Object.freeze({ phase, message: wasEditing ? copy.updated : copy.saved });
    return Object.freeze({ phase: "idle", message: "" });
  }

  function getCategoryKeys(library) {
    const found = new Set(library.map((reference) => reference.category || "other"));
    return [...CATEGORY_ORDER.filter((category) => found.has(category)), ...[...found].filter((category) => !CATEGORY_ORDER.includes(category))];
  }

  function filterFoodReferences(library, options = {}) {
    const language = normalizeLanguage(options.language);
    const locale = language === "zh" ? "zh-CN" : language === "en" ? "en-US" : "th-TH";
    const category = options.category || "grain";
    const search = String(options.search || "").trim().toLocaleLowerCase(locale);
    const matches = library.filter((reference) => {
      if (!search && category !== "all" && reference.category !== category) return false;
      if (!search) return true;
      const haystack = [reference.display_name_th, reference.display_name_en, reference.display_name_zh, reference.food_id]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase(locale);
      return haystack.includes(search);
    });
    const limit = Number.isInteger(options.limit) && options.limit > 0 ? options.limit : DEFAULT_COMPONENT_RESULT_LIMIT;
    const shouldLimit = !search && category === "all" && !options.showAll;
    return Object.freeze({
      results: shouldLimit ? matches.slice(0, limit) : matches,
      total: matches.length,
      remaining: shouldLimit ? Math.max(0, matches.length - limit) : 0
    });
  }

  function countDraftFoodItems(items, foodId) {
    return Array.isArray(items) ? items.filter((item) => item?.food_id === foodId).length : 0;
  }

  function createFoodItemsDisclosureState(draftItemCount = 0) {
    return Object.freeze({ expanded: Number(draftItemCount) > 0 });
  }

  function hasMeaningfulVisionReview(review) {
    return Boolean(review && ((Array.isArray(review.mealTypes) && review.mealTypes.length) || (Array.isArray(review.components) && review.components.length)));
  }

  function isVisionReviewPanelVisible(session) {
    return Boolean(session?.phase === "review" && session.review);
  }

  function buildVisionImageEntryState(imagePrepBridgeFactory, fallbackReason = "") {
    const canPrepare = typeof imagePrepBridgeFactory === "function";
    return Object.freeze({
      canPrepare,
      showDirectFallback: !canPrepare || Boolean(fallbackReason)
    });
  }

  function reduceFoodItemsDisclosureState(state, action = {}) {
    const current = Boolean(state?.expanded);
    if (action.type === "toggle") return Object.freeze({ expanded: !current });
    if (action.type === "reset") return createFoodItemsDisclosureState(action.draftItemCount);
    if (["meal_type_selected", "vision_review_ready", "draft_loaded"].includes(action.type)) return Object.freeze({ expanded: true });
    return Object.freeze({ expanded: current });
  }

  function createCurrentCompositionDisclosureState(draftItemCount = 0) {
    return Object.freeze({ expanded: Number(draftItemCount) > 0 });
  }

  function reduceCurrentCompositionDisclosureState(state, action = {}) {
    const current = Boolean(state?.expanded);
    if (action.type === "toggle") return Object.freeze({ expanded: !current });
    if (action.type === "reset") return createCurrentCompositionDisclosureState(action.draftItemCount);
    if (["draft_item_added", "vision_items_applied", "draft_loaded"].includes(action.type) && Number(action.draftItemCount) > 0) return Object.freeze({ expanded: true });
    return Object.freeze({ expanded: current });
  }

  function renderOptions(entries, selected) {
    return Object.entries(entries).map(([value, label]) => `
      <option value="${escapeHtml(value)}"${value === selected ? " selected" : ""}>${escapeHtml(label)}</option>
    `).join("");
  }

  function createMealComposerUI(options = {}) {
    const root = options.root;
    if (!root) return null;
    const runtime = options.runtime;
    const model = options.model || createMealComposerModel(options);
    const visionImageNormalizer = options.visionImageNormalizer || globalScope.MHBMealVisionImageNormalizer || null;
    const visionReview = options.visionReview || globalScope.MHBMealVisionReview || null;
    const visionProviderFactory = options.visionProviderFactory || null;
    const mealNameProposalFactory = typeof options.mealNameProposalFactory === "function" ? options.mealNameProposalFactory : null;
    const namingTraceEnabled = Boolean(options.namingTrace || globalScope.location?.search?.includes("mhbNamingTrace=1"));
    const imagePrepBridgeFactory = options.imagePrepBridgeFactory || globalScope.MHBImagePrepBridge?.createImagePrepBridge || null;
    const localRuntimeGuard = options.localRuntimeGuard || globalScope.MHBLocalRuntimeGuard || null;
    const visionVocabulary = options.visionVocabulary || globalScope.MHBVisionObservationVocabulary || null;
    const visionVocabularyEvidenceStore = options.visionVocabularyEvidenceStore || visionVocabulary?.createVisionVocabularyEvidenceStore?.(options.storage) || null;
    const runtimeEnvironment = localRuntimeGuard?.detectLocalRuntime?.(globalScope.location) || { isFileMode: false, supportsVisionAndImagePrep: true };
    const confirmAction = options.confirmAction || ((message) => globalScope.confirm(message));
    const onReflectDraft = typeof options.onReflectDraft === "function" ? options.onReflectDraft : () => {};
    const isReflectionEligible = typeof options.isReflectionEligible === "function"
      ? options.isReflectionEligible
      : (draft) => Array.isArray(draft?.items) && draft.items.length > 0;
    const scheduleFrame = options.scheduleFrame || ((callback) => {
      if (typeof globalScope.requestAnimationFrame === "function") return globalScope.requestAnimationFrame(callback);
      return globalScope.setTimeout(callback, 0);
    });
    let language = normalizeLanguage(options.language);
    let isOpen = true;
    let destroyed = false;
    let category = "grain";
    let search = "";
    let showAllFoodResults = false;
    let status = "";
    let savePhase = "idle";
    let detailsOpen = false;
    let validationCode = "";
    let recentSavedMealId = "";
    let recentSavedMeal = null;
    let recentSaveWasEditing = false;
    let visionRequestId = 0;
    let mealNameProposalRequestId = 0;
    let mealNameProposalModule = null;
    let mealNameProposalCoordinator = null;
    let mealNameProposalSession = null;
    let visionTraceStartedAt = 0;
    let visionSession = {
      phase: "idle",
      file: null,
      previewUrl: "",
      observation: null,
      review: null,
      failureStatus: "",
      draftRevision: model.getDraftRevision()
    };
    let imagePrepBridge = null;
    let imagePrepFallbackReason = "";
    let foodItemsDisclosure = createFoodItemsDisclosureState(model.getDraft().items.length);
    let currentCompositionDisclosure = createCurrentCompositionDisclosureState(model.getDraft().items.length);

    const headerTitle = root.querySelector("[data-meal-title]");
    const headerIntro = root.querySelector("[data-meal-intro]");
    const countBadge = root.querySelector("[data-meal-count]");
    const toggle = root.querySelector("[data-meal-toggle]");
    const workspace = root.querySelector("[data-meal-workspace]");
    const content = root.querySelector("[data-meal-content]");
    const reflection = root.querySelector("[data-meal-reflection]");
    const statusNode = root.querySelector("[data-meal-status]");

    function foodName(reference) {
      return runtime.getFoodDisplayName(reference, language);
    }

    function traceNaming(stage, details = {}) {
      if (!namingTraceEnabled) return;
      // Keep opt-in browser diagnostics inspectable without exposing raw image or model text.
      globalScope.console?.info?.(`[MHB naming trace] ${stage} ${JSON.stringify(details)}`);
    }

    function traceNow() {
      return globalScope.performance?.now?.() ?? Date.now();
    }

    function scrollBehavior() {
      return globalScope.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ? "auto" : "smooth";
    }

    function revokeVisionPreview() {
      if (visionSession.previewUrl && globalScope.URL?.revokeObjectURL) {
        globalScope.URL.revokeObjectURL(visionSession.previewUrl);
      }
    }

    function clearVisionSession() {
      visionRequestId += 1;
      clearMealNameProposalSession();
      revokeVisionPreview();
      imagePrepBridge?.destroy?.();
      imagePrepBridge = null;
      visionSession = { draftRevision: model.getDraftRevision(), phase: "idle", file: null, previewUrl: "", observation: null, review: null, failureStatus: "" };
    }

    function isCurrentVisionRequest(requestId) {
      return !destroyed && requestId === visionRequestId
        && visionSession.draftRevision === model.getDraftRevision();
    }

    function namingResult(status, input) {
      return {
        status,
        proposal: {
          requestId: input.requestId,
          observationId: input.observationId,
          language: input.language,
          status: "error",
          candidates: []
        }
      };
    }

    function clearMealNameProposalSession() {
      mealNameProposalRequestId += 1;
      mealNameProposalCoordinator?.cancel?.();
      mealNameProposalSession?.reset?.();
      traceNaming("naming_session_state", { phase: "idle", reason: "cleared" });
    }

    function getMealNameProposalState() {
      return mealNameProposalSession?.snapshot?.() || { phase: "idle", candidates: [], selection: "", customText: "" };
    }

    function isCurrentMealNameProposalContext(requestId, observationId, requestLanguage) {
      return isCurrentVisionRequest(visionRequestId)
        && requestId === mealNameProposalRequestId
        && visionSession.phase === "review"
        && visionSession.observation?.observation_id === observationId
        && language === requestLanguage;
    }

    function isCurrentMealNameProposal(requestId, observationId, requestLanguage) {
      const state = getMealNameProposalState();
      return isCurrentMealNameProposalContext(requestId, observationId, requestLanguage)
        && state.requestId
        && state.observationId === observationId
        && state.language === requestLanguage;
    }

    async function beginMealNameProposal(observation, review) {
      if (!mealNameProposalFactory || !observation || !review) return;
      clearMealNameProposalSession();
      visionSession.namingStatus = "pending";
      const requestId = ++mealNameProposalRequestId;
      const observationId = String(observation.observation_id || "");
      const requestLanguage = language;
      renderVisionState();

      try {
        mealNameProposalModule = mealNameProposalModule || await mealNameProposalFactory();
        traceNaming("naming_module_loaded", { requestId, observationId, language: requestLanguage, available: Boolean(mealNameProposalModule) });
        if (!isCurrentMealNameProposalContext(requestId, observationId, requestLanguage)) return;
        mealNameProposalSession = mealNameProposalSession || mealNameProposalModule.createMealNameProposalSession();
        const input = mealNameProposalModule.buildMealNameProposalInput({
          observation,
          review,
          requestId: `meal-name-${observationId}-${requestId}`,
          language: requestLanguage
        });
        if (!input) {
          traceNaming("naming_input_built", { requestId, observationId, valid: false });
          visionSession.namingStatus = "invalid_output";
          renderVisionState();
          return;
        }
        traceNaming("naming_input_built", { requestId: input.requestId, observationId, valid: true, language: input.language, componentCount: input.visibleComponents.length });
        mealNameProposalSession.begin(input);
        traceNaming("naming_session_state", { requestId: input.requestId, observationId, phase: "pending" });
        renderVisionState();
        const adapter = mealNameProposalModule.createLocalOllamaMealNameProposalAdapter({ onTrace: traceNaming });
        const availability = await adapter.isAvailable();
        if (!isCurrentMealNameProposal(requestId, observationId, requestLanguage)) return;
        if (availability.status !== "ready") {
          visionSession.namingStatus = availability.status;
          mealNameProposalSession.resolve(namingResult(availability.status, input));
          traceNaming("naming_session_state", { requestId: input.requestId, observationId, phase: getMealNameProposalState().phase, status: availability.status });
          renderVisionState();
          return;
        }
        mealNameProposalCoordinator = mealNameProposalModule.createMealNameProposalRequestCoordinator(adapter);
        const result = await mealNameProposalCoordinator.request(input);
        if (!isCurrentMealNameProposal(requestId, observationId, requestLanguage)) return;
        visionSession.namingStatus = result.status;
        if (["cancelled", "stale_response"].includes(result.status)) {
          mealNameProposalSession.settle();
        } else {
          mealNameProposalSession.resolve(result);
        }
        traceNaming("naming_session_state", { requestId: input.requestId, observationId, phase: getMealNameProposalState().phase, status: result.status, candidateCount: result.proposal?.candidates?.length || 0 });
        renderVisionState();
      } catch (_error) {
        if (!isCurrentMealNameProposalContext(requestId, observationId, requestLanguage)) return;
        visionSession.namingStatus = "provider_unavailable";
        const state = getMealNameProposalState();
        if (state.requestId) mealNameProposalSession.resolve(namingResult("provider_unavailable", state));
        traceNaming("naming_session_state", { requestId, observationId, phase: getMealNameProposalState().phase, status: "provider_unavailable" });
        renderVisionState();
      }
    }

    function visionFailureMessage(failureStatus) {
      const copy = getText(language);
      if (failureStatus === "model_missing") return copy.visionModelMissing;
      if (failureStatus === "timeout") return copy.visionTimeout;
      if (failureStatus === "invalid_output") return copy.visionInvalid;
      if (failureStatus === "image_error" || failureStatus === "unsupported_format") return copy.visionImageError;
      return copy.visionUnavailable;
    }

    function yieldForVisionPreparation() {
      return new Promise((resolve) => {
        if (typeof globalScope.requestAnimationFrame === "function") {
          globalScope.requestAnimationFrame(resolve);
          return;
        }
        globalScope.setTimeout(resolve, 0);
      });
    }

    function recordVisionVocabulary(observation) {
      if (!visionVocabularyEvidenceStore || !visionReview?.createObservedVocabularyEntries) return;
      visionVocabularyEvidenceStore.recordMany(visionReview.createObservedVocabularyEntries(observation, visionVocabulary));
    }


    async function observeNormalizedVisionImage(image, requestId, file = image) {
      if (!isCurrentVisionRequest(requestId)) return;
      if (!visionProviderFactory || !visionReview) {
        visionSession.phase = "failure";
        visionSession.failureStatus = "unavailable";
        renderVisionState();
        return;
      }

      try {
        visionSession.file = file;
        visionSession.previewUrl = globalScope.URL?.createObjectURL ? globalScope.URL.createObjectURL(image) : "";
        visionSession.phase = "checking";
        renderVisionState();
        const provider = await visionProviderFactory();
        if (!isCurrentVisionRequest(requestId)) return;
        const availability = await provider.isAvailable();
        if (!isCurrentVisionRequest(requestId)) return;
        if (availability.status !== "ready") {
          visionSession.phase = "failure";
          visionSession.failureStatus = availability.status;
          renderVisionState();
          return;
        }

        visionSession.phase = "observing";
        renderVisionState();
        const result = await provider.observeMeal(image);
        if (!isCurrentVisionRequest(requestId)) return;
        if (result.status !== "success" || !result.observation) {
          visionSession.phase = "failure";
          visionSession.failureStatus = result.status;
          renderVisionState();
          return;
        }

        visionSession.phase = "review";
        visionSession.observation = result.observation;
        traceNaming("vision_validated", {
          observationId: result.observation.observation_id,
          language,
          latencyMs: visionTraceStartedAt ? Math.round(traceNow() - visionTraceStartedAt) : undefined
        });
        visionSession.review = visionReview.createVisionReviewModel(result.observation);
        traceNaming("review_model_ready", { observationId: result.observation.observation_id, componentCount: visionSession.review.components.length });
        const namingEligible = Boolean(mealNameProposalFactory);
        traceNaming("naming_eligible", { observationId: result.observation.observation_id, eligible: namingEligible, hasMealName: Boolean(model.getDraft().mealName) });
        traceNaming("vision_review_visible", { observationId: result.observation.observation_id, visible: true, reason: "review_ready" });
        if (hasMeaningfulVisionReview(visionSession.review)) {
          foodItemsDisclosure = reduceFoodItemsDisclosureState(foodItemsDisclosure, { type: "vision_review_ready" });
        }
        recordVisionVocabulary(result.observation);
        if (namingEligible) visionSession.namingStatus = "pending";
        renderVisionState();
        if (namingEligible) beginMealNameProposal(result.observation, visionSession.review);
      } catch (error) {
        if (!isCurrentVisionRequest(requestId)) return;
        visionSession.phase = "failure";
        visionSession.failureStatus = error?.name === "AbortError" ? "timeout" : "provider_unreachable";
        renderVisionState();
      }
    }

    async function observeVisionImage(file) {
      clearVisionSession();
      status = "";
      const requestId = visionRequestId;
      visionTraceStartedAt = traceNow();
      traceNaming("vision_request_started", { requestId, language });
      visionSession = { draftRevision: model.getDraftRevision(), phase: "preparing", file, previewUrl: "", observation: null, review: null, failureStatus: "" };
      renderVisionState();

      await yieldForVisionPreparation();
      if (!isCurrentVisionRequest(requestId)) return;

      if (!visionImageNormalizer) {
        if (!isCurrentVisionRequest(requestId)) return;
        visionSession.phase = "failure";
        visionSession.failureStatus = "unavailable";
        renderVisionState();
        return;
      }

      try {
        const normalized = await visionImageNormalizer.normalizeVisionImage(file);
        if (!isCurrentVisionRequest(requestId)) return;
        if (normalized.status !== "ready" || !normalized.image) {
          visionSession.phase = "failure";
          visionSession.failureStatus = ["image_error", "conversion_failed"].includes(normalized.status) ? "image_error" : "unsupported_format";
          renderVisionState();
          return;
        }
        await observeNormalizedVisionImage(normalized.image, requestId, file);
      } catch (error) {
        if (!isCurrentVisionRequest(requestId)) return;
        visionSession.phase = "failure";
        visionSession.failureStatus = error?.name === "AbortError" ? "timeout" : "provider_unreachable";
        renderVisionState();
      }
    }

    function openImagePrep() {
      if (destroyed) return;
      if (!runtimeEnvironment.supportsVisionAndImagePrep) return;
      clearVisionSession();
      status = "";
      const requestId = visionRequestId;
      if (!imagePrepBridgeFactory) {
        revealImagePrepFallback("bridge_unavailable");
        return;
      }
      try {
        visionSession.phase = "preparing";
        imagePrepBridge = imagePrepBridgeFactory({
          onPrepared(envelope) {
            if (!isCurrentVisionRequest(requestId) || visionSession.phase !== "preparing" || !envelope?.image_blob) return;
            imagePrepFallbackReason = "";
            imagePrepBridge?.destroy?.();
            imagePrepBridge = null;
            visionTraceStartedAt = traceNow();
            traceNaming("vision_request_started", { requestId, language, source: "prepared_image" });
            observeNormalizedVisionImage(envelope.image_blob, requestId, envelope.image_blob);
          },
          onCancelled() {
            if (!isCurrentVisionRequest(requestId) || visionSession.phase !== "preparing") return;
            clearVisionSession();
            visionSession.phase = "cancelled";
            renderVisionState();
          }
        });
        const opened = imagePrepBridge?.open?.({ language, theme: globalScope.document?.body?.dataset?.theme || "auto" });
        if (opened) {
          imagePrepFallbackReason = "";
          renderVisionState();
          return;
        }
      } catch (_error) {
        // An explicit native picker fallback remains available after local popup failure.
      }
      clearVisionSession();
      revealImagePrepFallback("prepare_unavailable");
    }

    function revealImagePrepFallback(reason) {
      imagePrepFallbackReason = reason;
      renderVisionState();
      scheduleFrame(() => root.querySelector("[data-image-prep-open], [data-vision-image]")?.focus());
    }

    function itemServingBasis(reference, item) {
      let base = reference?.default_serving_label || "1 serving";
      if (reference?.default_serving_unit === "tbsp") base = "1 tbsp";
      if (reference?.default_serving_unit === "egg") {
        base = language === "th" ? "ไข่ต้มฟองใหญ่ 1 ฟอง" : language === "zh" ? "1 枚大号水煮蛋" : "1 large boiled egg";
      }
      return item.serving_multiplier === 1 ? base : `${formatNumber(item.serving_multiplier, language)} × ${base}`;
    }

    function renderMealVisual(items, variant = "draft") {
      const copy = getText(language);
      const visual = buildMealVisualModel(items, runtime, language);
      if (!visual.itemCount) return "";
      const tokens = visual.tokens.map((token, index) => `
        <span class="meal-visual-token meal-visual-token--${(index % MAX_MEAL_VISUAL_TOKENS) + 1}" title="${escapeHtml(token.name)}" aria-hidden="true">${escapeHtml(token.icon)}</span>
      `).join("");
      const overflow = visual.overflowCount
        ? `<span class="meal-visual-token meal-visual-token--overflow" aria-hidden="true">+${visual.overflowCount}</span>`
        : "";
      return `
        <div class="meal-visual meal-visual--${escapeHtml(variant)}">
          <div class="meal-visual-plate" aria-hidden="true">${tokens}${overflow}</div>
          <span class="meal-visual-count">${escapeHtml(copy.visualItemCount(visual.itemCount))}</span>
        </div>
      `;
    }

    function renderHeader() {
      const copy = getText(language);
      const count = model.getMeals().length;
      headerTitle.textContent = copy.title;
      headerIntro.textContent = copy.intro;
      countBadge.textContent = copy.recordedCount(count);
      toggle.textContent = isOpen ? copy.close : copy.open;
      toggle.setAttribute("aria-expanded", String(isOpen));
      workspace.hidden = !isOpen;
    }

    function renderMealType() {
      const copy = getText(language);
      const draft = model.getDraft();
      const mealTypes = Object.keys(copy.mealTypes);
      const choices = mealTypes.map((type) => `
        <button type="button" class="meal-type-choice meal-type-choice--${escapeHtml(MEAL_TYPE_VISUAL_TONES[type] || MEAL_TYPE_VISUAL_TONES.other)}${draft.mealType === type ? " is-active" : ""}" data-meal-type-choice="${escapeHtml(type)}" aria-pressed="${draft.mealType === type}">
          <span class="meal-type-illustration">${MEAL_TYPE_ILLUSTRATIONS[type] || MEAL_TYPE_ILLUSTRATIONS.other}</span>
          <span class="meal-type-label">${escapeHtml(copy.mealTypes[type])}</span>
          <span class="meal-type-selected" aria-hidden="true">✓</span>
        </button>
      `).join("");
      return `
        <section class="meal-type-picker" aria-labelledby="mealTypeTitle">
          <div class="meal-section-heading">
            <div>
              <h3 id="mealTypeTitle">${escapeHtml(copy.mealType)}</h3>
              <p>${escapeHtml(copy.mealTypeHelper)}</p>
            </div>
          </div>
          <div class="meal-type-choice-list" role="group" aria-label="${escapeHtml(copy.mealType)}">${choices}</div>
        </section>
      `;
    }

    function renderVisionPreview() {
      const copy = getText(language);
      return visionSession.previewUrl
        ? `<img class="meal-vision-preview" src="${escapeHtml(visionSession.previewUrl)}" alt="${escapeHtml(copy.visionPreviewAlt)}">`
        : `<span class="meal-vision-icon" aria-hidden="true">📷</span>`;
    }

    function namingStatusMessage() {
      const copy = getText(language);
      const state = getMealNameProposalState();
      const result = visionSession.namingStatus;
      if (result === "pending") return copy.namingPending;
      if (state.phase === "ready") return copy.namingTitle;
      if (state.phase === "insufficient") return copy.namingInsufficient;
      if (["invalid_output", "malformed_response", "validation_failed"].includes(result)) return copy.namingMalformed;
      if (["cancelled", "stale_response"].includes(result)) return copy.namingCancelled;
      if (state.phase === "settled" && result === "success") return copy.namingEditable;
      return copy.namingUnavailable;
    }

    function renderMealNameProposalInline() {
      if (visionSession.phase !== "review") return "";
      const copy = getText(language);
      const state = getMealNameProposalState();
      const choices = state.phase === "ready" ? state.candidates.map((candidate) => `
        <button type="button" class="ghost-button meal-name-proposal-choice" data-meal-name-accept="${escapeHtml(candidate.candidateId)}" data-naming-request="${escapeHtml(state.requestId)}" aria-label="${escapeHtml(`${copy.namingUse}: ${candidate.text}`)}">${escapeHtml(candidate.text)}</button>
      `).join("") : "";
      return `<section class="meal-name-proposal-inline" aria-labelledby="mealNameProposalTitle" aria-busy="${visionSession.namingStatus === "pending"}">
        <h4 id="mealNameProposalTitle">${escapeHtml(copy.namingTitle)}</h4>
        ${state.phase !== "ready" ? `<p>${escapeHtml(namingStatusMessage())}</p>` : ""}
        ${choices ? `<div class="meal-name-proposal-choices">${choices}</div><p>${escapeHtml(copy.namingEditable)}</p>` : ""}
        ${mealNameProposalFactory && visionSession.namingStatus !== "pending" ? `<button type="button" class="meal-text-button" data-meal-name-retry>${escapeHtml(copy.namingRetry)}</button>` : ""}
      </section>`;
    }

    function renderImageEntry() {
      const copy = getText(language);
      const imageEntry = buildVisionImageEntryState(imagePrepBridgeFactory, imagePrepFallbackReason);
      return `
            <div class="meal-vision-entry-actions">
              ${imageEntry.canPrepare ? `<button type="button" class="ghost-button meal-vision-prepare-action" data-image-prep-open>${escapeHtml(copy.visionPrepareImage)}</button>` : ""}
              ${imageEntry.showDirectFallback ? `
                <div class="meal-vision-direct-fallback">
                  <p id="mealVisionDirectFallbackMessage">${escapeHtml(copy.visionPrepareUnavailable)}</p>
                  <label class="meal-text-button meal-vision-file-action" aria-describedby="mealVisionDirectFallbackMessage">
                    <span>${escapeHtml(copy.visionChooseImageFallback)}</span>
                    <input type="file" data-vision-image accept="image/png,image/jpeg,image/webp,image/heic,image/heif,.heic,.heif">
                  </label>
                </div>
              ` : ""}
            </div>`;
    }

    function renderVisionHelper() {
      const copy = getText(language);
      if (["idle", "cancelled"].includes(visionSession.phase)) {
        if (!runtimeEnvironment.supportsVisionAndImagePrep) {
          return `
            <section class="meal-vision-helper is-attention" role="alert" aria-labelledby="mealVisionRuntimeTitle">
              <span class="meal-vision-icon" aria-hidden="true">📷</span>
              <div class="meal-vision-intro">
                <h3 id="mealVisionRuntimeTitle">${escapeHtml(copy.visionRuntimeRequired)}</h3>
                <p>${escapeHtml(copy.visionRuntimeHelper)}</p>
              </div>
            </section>
          `;
        }
        return `
          <section class="meal-vision-helper" aria-labelledby="mealVisionTitle">
            ${visionSession.phase === "cancelled" ? `<p>${escapeHtml(copy.namingCancelled)}</p>` : ""}
            <span class="meal-vision-icon" aria-hidden="true">📷</span>
            <div class="meal-vision-intro">
              <h3 id="mealVisionTitle">${escapeHtml(copy.visionAction)}</h3>
              <p>${escapeHtml(copy.visionLocalNote)}</p>
            </div>
            ${renderImageEntry()}
          </section>
        `;
      }

      if (["preparing", "checking", "observing"].includes(visionSession.phase)) {
        const message = visionSession.phase === "preparing"
          ? copy.visionPreparing
          : visionSession.phase === "checking" ? copy.visionChecking : copy.visionObserving;
        return `
          <section class="meal-vision-helper is-active" aria-busy="true">
            ${renderVisionPreview()}
            <div class="meal-vision-intro"><h3>${escapeHtml(copy.visionAction)}</h3><p>${escapeHtml(message)}</p></div>
            <button type="button" class="meal-text-button" data-vision-clear>${escapeHtml(copy.visionClear)}</button>
          </section>
        `;
      }

      if (visionSession.phase === "failure") {
        return `
          <section class="meal-vision-helper is-attention">
            ${renderVisionPreview()}
            <div class="meal-vision-intro"><h3>${escapeHtml(copy.visionAction)}</h3><p>${escapeHtml(visionFailureMessage(visionSession.failureStatus))}</p></div>
            <div class="meal-vision-actions">
              ${visionSession.file ? `<button type="button" class="ghost-button" data-vision-retry>${escapeHtml(copy.visionRetry)}</button>` : ""}
              <button type="button" class="meal-text-button" data-vision-clear>${escapeHtml(copy.visionClear)}</button>
            </div>
          </section>
        `;
      }

      return `<section class="meal-vision-helper">
        ${renderVisionPreview()}
        ${renderImageEntry()}
        <button type="button" class="meal-text-button" data-vision-clear>${escapeHtml(copy.visionClear)}</button>
      </section>`;
    }

    function renderFoodPicker() {
      const copy = getText(language);
      const library = model.getLibrary();
      const draft = model.getDraft();
      const isExpanded = foodItemsDisclosure.expanded;
      const itemCount = draft.items.length;
      const contentId = "mealFoodPickerContent";
      const compactHeader = `
        <div class="meal-section-heading meal-picker-heading">
          <div>
            <h3 id="mealPickerTitle">${escapeHtml(copy.chooseFood)}</h3>
            ${itemCount ? `<span class="meal-picker-count">${escapeHtml(copy.foodItemCount(itemCount))}</span>` : ""}
          </div>
          <button type="button" class="meal-picker-toggle${isExpanded ? " is-expanded" : ""}" data-meal-picker-toggle aria-expanded="${isExpanded}" aria-controls="${contentId}" aria-label="${escapeHtml(isExpanded ? copy.collapseFoodPicker : copy.expandFoodPicker)}"></button>
        </div>
      `;
      if (!isExpanded) {
        return `<section class="meal-picker is-collapsed" aria-labelledby="mealPickerTitle">${compactHeader}</section>`;
      }
      const foodResults = filterFoodReferences(library, {
        language,
        category,
        search,
        showAll: showAllFoodResults
      });
      const categoryButtons = ["all", ...getCategoryKeys(library)].map((key) => {
        const label = key === "all" ? copy.allCategories : copy.categories[key] || copy.categories.other;
        return `<button type="button" class="meal-category-chip${category === key ? " is-active" : ""}" data-meal-category="${escapeHtml(key)}" aria-pressed="${category === key}">${escapeHtml(label)}</button>`;
      }).join("");
      const foodButtons = foodResults.results.map((reference) => {
        const name = foodName(reference);
        const detail = copy.categories[reference.category] || copy.categories.other;
        const selectedCount = countDraftFoodItems(draft.items, reference.food_id);
        const selectedId = `mealFoodState-${reference.food_id}`;
        const ariaLabel = selectedCount ? copy.addSelectedFood(name, selectedCount) : copy.addFood(name);
        return `
          <button type="button" class="meal-food-option${selectedCount ? " is-selected" : ""}" data-add-food="${escapeHtml(reference.food_id)}" aria-label="${escapeHtml(ariaLabel)}"${selectedCount ? ` aria-describedby="${escapeHtml(selectedId)}"` : ""}>
            <span class="meal-food-icon" aria-hidden="true">${escapeHtml(getFoodIcon(reference))}</span>
            <span class="meal-food-copy">
              <strong>${escapeHtml(name)}</strong>
              <span>${escapeHtml(detail)}</span>
              ${selectedCount ? `<span class="meal-food-selected" id="${escapeHtml(selectedId)}">✓ ${escapeHtml(copy.selectedComponent(selectedCount))}</span>` : ""}
            </span>
            <span class="meal-food-add" aria-hidden="true">+</span>
          </button>
        `;
      }).join("");
      const showMore = foodResults.remaining
        ? `<button type="button" class="meal-food-more" data-meal-show-all>${escapeHtml(copy.showMoreFoods(foodResults.remaining))}</button>`
        : "";
      return `
        <section class="meal-picker" aria-labelledby="mealPickerTitle">
          ${compactHeader}
          <div id="${contentId}" class="meal-picker-content">
            <p class="meal-picker-helper">${escapeHtml(copy.chooseFoodHelper)}</p>
            <label class="meal-search">
              <span class="sr-only">${escapeHtml(copy.searchLabel)}</span>
              <input type="search" data-meal-search value="${escapeHtml(search)}" placeholder="${escapeHtml(copy.searchPlaceholder)}" autocomplete="off">
            </label>
            <div class="meal-category-list" role="group" aria-label="${escapeHtml(copy.chooseFood)}">${categoryButtons}</div>
            <div class="meal-food-grid">${foodButtons || `<p class="meal-inline-empty">${escapeHtml(copy.noFoodFound)}</p>`}</div>
            ${showMore}
            <label class="meal-condiment-knowledge">
              <input type="checkbox" data-meal-condiment-unknown${draft.condimentKnowledge === "unknown" ? " checked" : ""}>
              <span><strong>${escapeHtml(copy.condimentUnknown)}</strong><small>${escapeHtml(copy.condimentUnknownHelper)}</small></span>
            </label>
          </div>
        </section>
      `;
    }

    function renderNamedDishReference() {
      const copy = getText(language);
      const draft = model.getDraft();
      const confirmedReference = runtime.getNamedDishReferenceById(draft.namedDishId);
      if (confirmedReference) {
        const consistency = model.getDraftNamedDishConsistency();
        const range = formatRange(confirmedReference.sodium_estimate_min_mg, confirmedReference.sodium_estimate_max_mg, language);
        const isSuspended = consistency.status === "evidence_conflict";
        return `
          <section class="meal-named-dish-card${isSuspended ? " is-suspended" : " is-confirmed"}" role="status">
            <div class="meal-named-dish-icon" aria-hidden="true">🍚</div>
            <div class="meal-named-dish-copy">
              <p>${escapeHtml(copy.namedDishConfirmed)}</p>
              <h3>${escapeHtml(runtime.getFoodDisplayName(confirmedReference, language))}</h3>
              <strong>${escapeHtml(copy.namedDishBasis(range))}</strong>
              <small>${escapeHtml(copy.namedDishSource)} · ${escapeHtml(copy.namedDishBasisHelper)}</small>
              ${consistency.status === "soft_conflict" ? `<span class="meal-named-dish-helper">${escapeHtml(copy.namedDishSoftConflict)}</span>` : ""}
              ${isSuspended ? `<span class="meal-named-dish-helper">${escapeHtml(copy.namedDishEvidenceConflict)} ${escapeHtml(copy.namedDishFallback)}</span>` : ""}
            </div>
            <button type="button" class="meal-text-button" data-clear-named-dish>${escapeHtml(copy.namedDishClear)}</button>
          </section>
        `;
      }
      const candidate = model.getNamedDishCandidates()[0];
      const candidateReference = candidate && runtime.getNamedDishReferenceById(candidate.candidate_id);
      if (!candidateReference) return "";
      const range = formatRange(candidateReference.sodium_estimate_min_mg, candidateReference.sodium_estimate_max_mg, language);
      return `
        <section class="meal-named-dish-card">
          <div class="meal-named-dish-icon" aria-hidden="true">🍚</div>
          <div class="meal-named-dish-copy">
            <p>${escapeHtml(copy.namedDishSuggestion)}</p>
            <h3>${escapeHtml(runtime.getFoodDisplayName(candidateReference, language))}</h3>
            <strong>${escapeHtml(copy.namedDishBasis(range))}</strong>
            <small>${escapeHtml(copy.namedDishSource)} · ${escapeHtml(copy.namedDishBasisHelper)}</small>
          </div>
          <div class="meal-named-dish-actions">
            <button type="button" class="ghost-button" data-reject-named-dish="${escapeHtml(candidate.candidate_id)}">${escapeHtml(copy.namedDishReject)}</button>
            <button type="button" class="primary-button" data-confirm-named-dish="${escapeHtml(candidate.candidate_id)}">${escapeHtml(copy.namedDishConfirm)}</button>
          </div>
        </section>
      `;
    }

    function renderDraftItem(item) {
      const copy = getText(language);
      const reference = runtime.getFoodReferenceById(item.food_id);
      const name = foodName(reference) || item.display_name_snapshot;
      const known = Number.isFinite(item.sodium_estimate_min_mg) && Number.isFinite(item.sodium_estimate_max_mg);
      const evidence = known
        ? copy.evidenceRange(formatRange(item.sodium_estimate_min_mg, item.sodium_estimate_max_mg, language), itemServingBasis(reference, item))
        : copy.evidenceUnknown;
      const customControl = item.portion_label === "custom"
        ? `<label class="meal-custom-portion"><span>${escapeHtml(copy.portion)}</span><input type="number" min="0.1" step="0.1" value="${escapeHtml(item.serving_multiplier)}" data-meal-custom-multiplier="${escapeHtml(item.meal_item_id)}"></label>`
        : "";
      return `
        <article class="meal-draft-item" data-draft-item="${escapeHtml(item.meal_item_id)}">
          <div class="meal-draft-item-heading">
            <span class="meal-food-icon" aria-hidden="true">${escapeHtml(getFoodIcon(reference))}</span>
            <div>
              <h4>${escapeHtml(name)}</h4>
              <p>${escapeHtml(evidence)}</p>
            </div>
            <button type="button" class="meal-remove-button" data-remove-draft-item="${escapeHtml(item.meal_item_id)}" aria-label="${escapeHtml(copy.removeItem(name))}">${escapeHtml(copy.remove)}</button>
          </div>
          <div class="meal-item-controls">
            <label>
              <span>${escapeHtml(copy.portion)}</span>
              <select data-meal-portion="${escapeHtml(item.meal_item_id)}">${renderOptions(copy.portions, item.portion_label)}</select>
            </label>
            <label>
              <span>${escapeHtml(copy.preparation)}</span>
              <select data-meal-preparation="${escapeHtml(item.meal_item_id)}">${renderOptions(copy.preparations, item.preparation)}</select>
            </label>
            ${customControl}
          </div>
        </article>
      `;
    }

    function validationMessage(code) {
      const copy = getText(language);
      if (code === "name_required") return copy.nameRequired;
      if (code === "invalid_time") return copy.invalidTime;
      if (["storage_invalid", "storage_read_failed", "record_not_editable"].includes(code)) return copy.storageBlocked;
      return copy.storageFailed;
    }

    function renderDraft() {
      const copy = getText(language);
      const draft = model.getDraft();
      const storageState = model.getStorageState();
      const labels = { ...copy.labels, custom: copy.customLabel };
      return `
        <form class="meal-draft meal-moment-form" data-meal-moment-form novalidate aria-busy="${savePhase === "saving"}">
          <label class="meal-meta-control meal-name-control">
            <span>${escapeHtml(copy.mealName)} <span aria-hidden="true">*</span></span>
            <input type="text" data-meal-name required aria-required="true" value="${escapeHtml(draft.mealName)}" aria-describedby="mealNameHelper mealMomentValidation" aria-invalid="${validationCode === "name_required"}">
            <small id="mealNameHelper">${escapeHtml(copy.mealNameHelper)}</small>
          </label>
          <div data-meal-name-proposals>${renderMealNameProposalInline()}</div>
          <div class="meal-moment-photo" data-meal-photo-content>${renderVisionHelper()}</div>
          <details class="meal-moment-details" data-meal-details${detailsOpen ? " open" : ""}>
            <summary>${escapeHtml(copy.additionalDetails)}</summary>
            <div class="meal-meta-controls">
              <label class="meal-meta-control"><span>${escapeHtml(copy.mealType)}</span><select data-meal-moment-type>${renderOptions(copy.mealTypes, draft.mealType)}</select></label>
              <label class="meal-meta-control"><span>${escapeHtml(copy.mealLabel)}</span><select data-meal-label>${renderOptions(labels, draft.mealLabel)}</select></label>
              ${draft.mealLabel === "custom" ? `<label class="meal-meta-control"><span>${escapeHtml(copy.customOccasion)}</span><input type="text" data-meal-custom-label value="${escapeHtml(draft.customMealLabel)}"></label>` : ""}
              <label class="meal-meta-control"><span>${escapeHtml(copy.mealTime)}</span><input type="time" step="60" data-meal-time value="${escapeHtml(draft.time)}" aria-describedby="mealMomentValidation" aria-invalid="${validationCode === "invalid_time"}"></label>
            </div>
          </details>
          <p id="mealMomentValidation" data-meal-validation role="alert">${validationCode ? escapeHtml(validationMessage(validationCode)) : ""}</p>
          ${!storageState.ok ? `<p class="meal-moment-notice" role="alert">${escapeHtml(copy.storageBlocked)}</p>` : ""}
          <div class="meal-draft-actions">
            ${draft.mealId ? `<button type="button" class="ghost-button" data-cancel-meal-edit>${escapeHtml(copy.cancelEdit)}</button>` : ""}
            <button type="submit" class="primary-button" data-save-meal${savePhase === "saving" ? " disabled" : ""}>${escapeHtml(savePhase === "saving" ? copy.saving : draft.mealId ? copy.saveChanges : copy.save)}</button>
          </div>
        </form>
      `;
    }

    function renderHistoricalDetails(meal) {
      if (!meal.items?.length) return "";
      const copy = getText(language);
      const items = meal.items.map((item) => {
        const name = item.display_name_snapshot || foodName(runtime.getFoodReferenceById(item.food_id)) || item.food_id;
        const evidenceRange = formatRange(item.sodium_estimate_min_mg, item.sodium_estimate_max_mg, language);
        const facts = [copy.portions[item.portion_label] || item.portion_label, item.serving_multiplier, copy.preparations[item.preparation] || item.preparation, item.user_adjustment, evidenceRange ? `${evidenceRange} mg` : "", item.confidence, item.source_type, item.source_reference].filter((value) => value !== "" && value != null);
        return `<li><strong>${escapeHtml(name)}</strong><span>${escapeHtml(facts.join(" · "))}</span></li>`;
      }).join("");
      const notes = [meal.meal_note, meal.named_dish_id, meal.condiment_knowledge === "unknown" ? copy.condimentUnknown : ""].filter(Boolean);
      return `<details class="meal-historical-details"><summary>${escapeHtml(copy.historicalDetails)}</summary><ul>${items}</ul>${notes.map((note) => `<p>${escapeHtml(note)}</p>`).join("")}</details>`;
    }

    function renderSavedMeals() {
      const copy = getText(language);
      const meals = model.getMeals();
      const cards = meals.length ? meals.map((meal) => {
        const card = buildSavedMealCardModel(meal, runtime, language);
        const metadata = [card.time, meal.meal_label === "custom" ? meal.custom_meal_label : meal.meal_label !== "unnamed" ? card.label : "", meal.meal_type !== "unspecified" ? card.mealType : ""].filter(Boolean);
        return `
          <article class="meal-saved-item${meal.meal_id === recentSavedMealId ? " is-recent" : ""}" data-saved-meal="${escapeHtml(meal.meal_id)}">

            <div class="meal-saved-copy">
              ${metadata.length ? `<p class="meal-saved-meta">${escapeHtml(metadata.join(" · "))}</p>` : ""}
              <h4>${escapeHtml(card.mealName || card.visual.componentNames.join(" · "))}</h4>
              ${renderHistoricalDetails(meal)}
            </div>
            <div class="meal-saved-actions">
              <button type="button" class="meal-text-button" data-edit-meal="${escapeHtml(meal.meal_id)}">${escapeHtml(copy.editMeal)}</button>
              <button type="button" class="meal-text-button meal-text-button--remove" data-delete-meal="${escapeHtml(meal.meal_id)}">${escapeHtml(copy.deleteMeal)}</button>
            </div>
          </article>
        `;
      }).join("") : `<p class="meal-inline-empty">${escapeHtml(copy.savedMealsEmpty)}</p>`;
      const recentMeal = recentSavedMealId ? meals.find((meal) => meal.meal_id === recentSavedMealId) || recentSavedMeal : null;
      const confirmation = savePhase === "saved" && recentMeal ? `
        <div class="meal-saved-confirmation" role="status" aria-live="polite">
          <span class="meal-saved-check" aria-hidden="true">✓</span>
          <span class="meal-saved-confirmation-copy">
            <span class="meal-saved-confirmation-title">${escapeHtml(recentSaveWasEditing ? copy.updatedLatest : copy.savedLatest)}</span>
            <span aria-hidden="true"> · </span>
            <span>${escapeHtml(recentMeal.meal_name)}</span>
            <span> · ${escapeHtml(copy.savedDate(recentMeal.date))}</span>
          </span>
        </div>
      ` : "";
      return `
        <section class="meal-saved" aria-labelledby="mealSavedTitle">
          <div class="meal-section-heading">
            <div>
              <h3 id="mealSavedTitle">${escapeHtml(copy.savedMeals)}</h3>
              <p>${meals.length ? escapeHtml(copy.dailyCount(meals.length)) : escapeHtml(copy.savedMealsEmpty)}</p>
            </div>
          </div>
          ${confirmation}
          <div class="meal-saved-list">${cards}</div>
        </section>
      `;
    }

    function renderReflection() {
      const copy = getText(language);
      const count = model.getMeals().length;
      const lines = count ? [copy.dailyCount(count)] : [...copy.emptyReflection];
      const typeIndicators = buildSavedMealTypeIndicatorModel(model.getMeals());
      const indicators = typeIndicators.totalCount ? `
        <div class="meal-saved-type-indicators" aria-hidden="true">
          ${typeIndicators.visibleMealTypes.map((mealType) => `<span class="meal-saved-type-indicator meal-saved-type-indicator--${escapeHtml(MEAL_TYPE_VISUAL_TONES[mealType])}"><span class="meal-saved-type-indicator__illustration">${MEAL_TYPE_ILLUSTRATIONS[mealType]}</span></span>`).join("")}
          ${typeIndicators.overflowCount ? `<span class="meal-saved-type-overflow">+${typeIndicators.overflowCount}</span>` : ""}
        </div>
      ` : "";
      reflection.innerHTML = `
        <p class="section-kicker">${escapeHtml(copy.dailyReflectionKicker)}</p>
        <h3>${escapeHtml(copy.dailyReflectionTitle)}</h3>
        ${indicators}
        <div class="meal-reflection-copy">${lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}</div>
      `;
    }

    function renderStatus() {
      const copy = getText(language);
      const aiStatus = visionSession.phase === "review" ? namingStatusMessage()
        : visionSession.phase === "failure" ? visionFailureMessage(visionSession.failureStatus)
        : visionSession.phase === "cancelled" ? copy.namingCancelled
        : visionSession.phase === "preparing" ? copy.visionPreparing
        : visionSession.phase === "checking" ? copy.visionChecking
        : visionSession.phase === "observing" ? copy.visionObserving : "";
      const message = status || aiStatus;
      if (statusNode.textContent !== message) statusNode.textContent = message;
    }

    function renderVisionState() {
      if (destroyed) return;
      if (!isCurrentVisionRequest(visionRequestId)) clearVisionSession();
      const proposals = root.querySelector("[data-meal-name-proposals]");
      const photo = root.querySelector("[data-meal-photo-content]");
      if (proposals) proposals.innerHTML = renderMealNameProposalInline();
      if (photo) photo.innerHTML = renderVisionHelper();
      renderStatus();
    }

    function render() {
      if (destroyed) return;
      if (!isCurrentVisionRequest(visionRequestId)) clearVisionSession();
      renderHeader();
      if (isOpen) content.innerHTML = `${renderDraft()}${renderSavedMeals()}`;
      renderReflection();
      renderStatus();
    }

    function saveMealMoment() {
      if (destroyed || savePhase === "saving") return;
      const validation = model.validateDraft();
      if (!validation.ok) {
        validationCode = validation.code;
        if (validationCode === "invalid_time") detailsOpen = true;
        status = "";
        render();
        root.querySelector(validationCode === "name_required" ? "[data-meal-name]" : "[data-meal-time]")?.focus();
        return;
      }
      const approval = options.beforeSave?.({ editingMeal: Boolean(model.getDraft().mealId), mealSave: true });
      if (approval === false || approval?.ok === false) return;
      const saveDate = approval?.date || model.getDate();
      const revision = model.getDraftRevision();
      const wasEditing = Boolean(model.getDraft().mealId);
      validationCode = "";
      savePhase = "saving";
      status = buildSaveFeedbackModel("saving", wasEditing, language).message;
      render();
      scheduleFrame(() => {
        if (destroyed) return;
        const finalApproval = options.beforeSave?.({ editingMeal: Boolean(model.getDraft().mealId), mealSave: true, saveDate });
        if (revision !== model.getDraftRevision() || finalApproval === false || finalApproval?.ok === false) {
          savePhase = "idle";
          render();
          return;
        }
        const result = model.saveDraft({ date: saveDate });
        if (!result.ok) {
          savePhase = "idle";
          validationCode = result.code;
          status = "";
          render();
          root.querySelector("[data-meal-name]")?.focus();
          return;
        }
        recentSavedMealId = result.meal.meal_id;
        recentSavedMeal = result.meal;
        recentSaveWasEditing = result.wasEditing;
        savePhase = "saved";
        detailsOpen = false;
        clearVisionSession();
        status = `${buildSaveFeedbackModel("saved", result.wasEditing, language).message} ${getText(language).savedDate(result.meal.date)}`;
        options.onSaved?.(result);
        render();
        root.querySelector("[data-meal-name]")?.focus({ preventScroll: true });
      });
    }

    root.addEventListener("submit", (event) => {
      if (!event.target.matches("[data-meal-moment-form]")) return;
      event.preventDefault();
      saveMealMoment();
    });
    root.addEventListener("toggle", (event) => {
      if (event.target.matches("[data-meal-details]")) detailsOpen = event.target.open;
    }, true);

    function acceptMealName(candidateId, requestId) {
      const state = getMealNameProposalState();
      if (!isCurrentVisionRequest(visionRequestId) || state.phase !== "ready"
        || state.requestId !== requestId || !state.candidates.some((entry) => entry.candidateId === candidateId)) return;
      mealNameProposalSession.choose(candidateId);
      const confirmed = mealNameProposalSession.confirm();
      if (!confirmed?.text) return;
      // This is the sole AI-to-draft boundary. Save remains a separate human action.
      model.setDraftMeta({ mealName: confirmed.text });
      const input = root.querySelector("[data-meal-name]");
      if (input) input.value = confirmed.text;
      renderVisionState();
      input?.focus();
    }

    root.addEventListener("click", (event) => {
      if (destroyed) return;
      const action = event.target.closest("button");
      if (!action) return;
      if (action.matches("[data-meal-toggle]")) {
        isOpen = !isOpen;
        render();
        if (isOpen) workspace.focus({ preventScroll: true });
        return;
      }
      if (action.hasAttribute("data-vision-clear")) {
        clearVisionSession();
        visionSession.phase = "cancelled";
        status = "";
        renderVisionState();
        root.querySelector("[data-meal-name]")?.focus();
        return;
      }
      if (action.hasAttribute("data-image-prep-open")) {
        openImagePrep();
        return;
      }
      if (action.hasAttribute("data-vision-retry") && visionSession.file) {
        observeVisionImage(visionSession.file);
        return;
      }
      if (action.dataset.mealNameAccept) {
        acceptMealName(action.dataset.mealNameAccept, action.dataset.namingRequest);
        return;
      }
      if (action.hasAttribute("data-meal-name-retry") && visionSession.phase === "review"
        && isCurrentVisionRequest(visionRequestId) && visionSession.namingStatus !== "pending") {
        status = "";
        beginMealNameProposal(visionSession.observation, visionSession.review);
        return;
      }
      if (action.dataset.mealCategory) {
        category = action.dataset.mealCategory;
        showAllFoodResults = false;
        render();
        return;
      }
      if (action.hasAttribute("data-meal-show-all")) {
        showAllFoodResults = true;
        render();
        return;
      }
      if (action.hasAttribute("data-meal-picker-toggle")) {
        foodItemsDisclosure = reduceFoodItemsDisclosureState(foodItemsDisclosure, { type: "toggle" });
        render();
        return;
      }
      if (action.hasAttribute("data-meal-draft-toggle")) {
        currentCompositionDisclosure = reduceCurrentCompositionDisclosureState(currentCompositionDisclosure, { type: "toggle" });
        render();
        return;
      }
      if (action.hasAttribute("data-reflect-meal-draft")) {
        const draft = model.getDraft();
        if (isReflectionEligible(draft)) onReflectDraft(draft);
        return;
      }
      if (action.dataset.mealTypeChoice) {
        model.setDraftMeta({ mealType: action.dataset.mealTypeChoice });
        foodItemsDisclosure = reduceFoodItemsDisclosureState(foodItemsDisclosure, { type: "meal_type_selected" });
        render();
        return;
      }
      if (action.dataset.confirmNamedDish) {
        model.confirmNamedDish(action.dataset.confirmNamedDish);
        status = "";
        render();
        return;
      }
      if (action.dataset.rejectNamedDish) {
        model.rejectNamedDishCandidate(action.dataset.rejectNamedDish);
        status = "";
        render();
        return;
      }
      if (action.hasAttribute("data-clear-named-dish")) {
        model.clearNamedDishConfirmation();
        status = "";
        render();
        return;
      }
      if (action.dataset.addFood) {
        savePhase = "idle";
        recentSavedMealId = "";
        model.addFood(action.dataset.addFood);
        currentCompositionDisclosure = reduceCurrentCompositionDisclosureState(currentCompositionDisclosure, { type: "draft_item_added", draftItemCount: model.getDraft().items.length });
        status = "";
        render();
        root.querySelector(".meal-draft")?.scrollIntoView({ behavior: scrollBehavior(), block: "nearest" });
        return;
      }
      if (action.dataset.removeDraftItem) {
        model.removeDraftItem(action.dataset.removeDraftItem);
        render();
        return;
      }
      if (action.hasAttribute("data-save-meal")) {
        event.preventDefault();
        saveMealMoment();
        return;
      }
      if (action.hasAttribute("data-cancel-meal-edit")) {
        validationCode = "";
        detailsOpen = false;
        model.resetDraft();
        clearVisionSession();
        foodItemsDisclosure = reduceFoodItemsDisclosureState(foodItemsDisclosure, { type: "reset", draftItemCount: model.getDraft().items.length });
        currentCompositionDisclosure = reduceCurrentCompositionDisclosureState(currentCompositionDisclosure, { type: "reset", draftItemCount: model.getDraft().items.length });
        status = "";
        render();
        return;
      }
      if (action.dataset.editMeal) {
        if (model.editMeal(action.dataset.editMeal)) {
          validationCode = "";
          detailsOpen = false;
          clearVisionSession();
          savePhase = "idle";
          recentSavedMealId = "";
          status = "";
          isOpen = true;
          foodItemsDisclosure = reduceFoodItemsDisclosureState(foodItemsDisclosure, { type: "draft_loaded" });
          currentCompositionDisclosure = reduceCurrentCompositionDisclosureState(currentCompositionDisclosure, { type: "draft_loaded", draftItemCount: model.getDraft().items.length });
          render();
          root.querySelector("[data-meal-name]")?.focus();
        }
        return;
      }
      if (action.dataset.deleteMeal && confirmAction(getText(language).deleteConfirm)) {
        const deletion = model.deleteMeal(action.dataset.deleteMeal);
        if (deletion.ok) {
          if (recentSavedMealId === action.dataset.deleteMeal) {
            recentSavedMealId = "";
            savePhase = "idle";
          }
          status = getText(language).deleted;
        } else {
          status = validationMessage(deletion.code);
        }
        render();
      }
    });

    root.addEventListener("input", (event) => {
      if (destroyed) return;
      if (event.target.matches("[data-meal-name]")) {
        model.setDraftMeta({ mealName: event.target.value });
        return;
      }
      if (event.target.matches("[data-meal-custom-label]")) {
        model.setDraftMeta({ customMealLabel: event.target.value });
        return;
      }
      if (event.target.matches("[data-meal-search]")) {
        search = event.target.value;
        showAllFoodResults = false;
        const cursor = event.target.selectionStart;
        render();
        const nextSearch = root.querySelector("[data-meal-search]");
        nextSearch?.focus();
        nextSearch?.setSelectionRange(cursor, cursor);
      }
    });

    root.addEventListener("change", (event) => {
      if (destroyed) return;
      // The input handler already updates the name. Rebuilding on blur would
      // replace a Save button between pointer-down and click.
      if (event.target.matches("[data-meal-name]")) return;
      if (event.target.matches("[data-vision-image]")) {
        const file = event.target.files?.[0];
        if (file) observeVisionImage(file);
        return;
      }
      if (event.target.matches("[data-meal-moment-type]")) model.setDraftMeta({ mealType: event.target.value });
      if (event.target.matches("[data-meal-label]")) model.setDraftMeta({ mealLabel: event.target.value });
      if (event.target.matches("[data-meal-time]")) model.setDraftMeta({ time: event.target.value });
      if (event.target.matches("[data-meal-condiment-unknown]")) {
        model.setDraftMeta({ condimentKnowledge: event.target.checked ? "unknown" : "" });
      }
      if (event.target.matches("[data-meal-portion]")) {
        const itemId = event.target.dataset.mealPortion;
        const portionLabel = event.target.value;
        model.updateDraftItem(itemId, {
          portion_label: portionLabel,
          serving_multiplier: portionLabel === "custom" ? 1 : undefined
        });
      }
      if (event.target.matches("[data-meal-preparation]")) {
        model.updateDraftItem(event.target.dataset.mealPreparation, { preparation: event.target.value });
      }
      if (event.target.matches("[data-meal-custom-multiplier]")) {
        const itemId = event.target.dataset.mealCustomMultiplier;
        const updated = model.updateDraftItem(itemId, { portion_label: "custom", serving_multiplier: event.target.value });
        status = updated ? "" : getText(language).invalidCustom;
      }
      render();
      const metadataSelector = ["[data-meal-moment-type]", "[data-meal-label]", "[data-meal-time]"].find((selector) => event.target.matches(selector));
      if (metadataSelector) root.querySelector(metadataSelector)?.focus();
    });

    render();

    return Object.freeze({
      render,
      getDraft: () => model.getDraft(),
      getDate: () => model.getDate(),
      hasUnsavedDraft: () => model.hasUnsavedDraft(),
      setLanguage(nextLanguage) {
        language = normalizeLanguage(nextLanguage);
        status = "";
        clearVisionSession();
        model.setLanguage(language);
        render();
      },
      setDate(nextDate, { preserveDraft = false } = {}) {
        validationCode = "";
        detailsOpen = false;
        clearVisionSession();
        model.setDate(nextDate, { preserveDraft });
        foodItemsDisclosure = reduceFoodItemsDisclosureState(foodItemsDisclosure, { type: "reset", draftItemCount: model.getDraft().items.length });
        currentCompositionDisclosure = reduceCurrentCompositionDisclosureState(currentCompositionDisclosure, { type: "reset", draftItemCount: model.getDraft().items.length });
        if (recentSavedMeal?.date !== nextDate || savePhase !== "saved") {
          savePhase = "idle";
          recentSavedMealId = "";
        }
        render();
      },
      open() {
        isOpen = true;
        render();
      },
      resetDraft() {
        model.resetDraft();
        clearVisionSession();
        status = "";
        validationCode = "";
        render();
      },
      destroy() {
        destroyed = true;
        clearVisionSession();
      },
      getModel: () => model
    });
  }

  const api = Object.freeze({
    MOMENT_TEXT,
    NAMING_TEXT,
    SUPPORTED_LANGUAGES,
    TEXT,
    MEAL_TYPE_ILLUSTRATIONS,
    MEAL_TYPE_VISUAL_TONES,
    DEFAULT_COMPONENT_RESULT_LIMIT,
    MAX_MEAL_VISUAL_TOKENS,
    MAX_SAVED_MEAL_TYPE_INDICATORS,
    normalizeLanguage,
    buildVisionImageEntryState,
    formatRange,
    buildDailyReflectionLines,
    buildSavedMealTypeIndicatorModel,
    filterFoodReferences,
    countDraftFoodItems,
    createFoodItemsDisclosureState,
    hasMeaningfulVisionReview,
    isVisionReviewPanelVisible,
    reduceFoodItemsDisclosureState,
    createCurrentCompositionDisclosureState,
    reduceCurrentCompositionDisclosureState,
    buildMealVisualModel,
    buildSavedMealCardModel,
    buildSaveFeedbackModel,
    createMealComposerModel,
    createMealComposerUI
  });

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  globalScope.MHBMealUI = api;
})(typeof window !== "undefined" ? window : globalThis);
