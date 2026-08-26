# Mindful Health Balance by MSxAI 使用指南

## 1. 这款应用是什么

Mindful Health Balance by MSxAI 是一款本地优先的个人节律观察原型，也是由用户自己拥有的个人情境记录层，用于辅助自我反思。它不是用来评判自己的应用，也不会催促用户尽快把某个数字“修好”。

应用会把一天中真实记录的信号保存为结构化的本地数据，例如：

- Hydration / 饮水
- Caffeine & Sugary Drinks / 咖啡因与含糖饮料
- Load & Recovery / 负荷与恢复
- Mind State / 当天整体心境与压力
- 观照练习情境（Practice Context）、Mind Note 与 Reflection

它不是医疗诊断工具，也不能代替医生、专业照护或既定的医疗随访。

本指南说明当前的 **MHB 2.3 — Gentle Meal Composition**。它在 MHB 2.2 的基础上加入本地优先的餐食组合空间；Meal records 与 `Daily_Log` 分开保存，不改变 workbook，也不迁移历史数据。

应用的价值不在于成为生产级 SaaS，而在于提供一个由用户拥有、可以导出、可以检查，并能由用户主动交给 AI 协助反思的个人数据层。数据的最终意义仍由用户决定。

## 2. 什么时候使用

可以在一天中的三个自然时点轻量使用：

- 早晨 / 一天开始时：选择 Energy 与 Mind，并填写 Sleep Hours，或选择大致的 Sleep 类别
- 白天：记录饮水、饮料，以及当天主要活动
- 一天结束时：点击 `今日回顾` 生成 Reflection，再点击 `保存今日 Reflection`

不需要整天开着应用。把它当作一天开始、进行中与结束前的一面温和镜子即可。

不必填满每个字段。真实、持续的数据比勉强补全更有价值。留空表示没有记录或尚不确定，不代表失分或做错了什么。

## 2.1 切换语言

页面顶部有语言按钮：

```text
TH | EN | 中文
```

默认语言为泰语。选择语言后，应用会把设置保存在当前浏览器的 localStorage key `mindfulHealthLanguage` 中。

切换语言只会改变界面文字，以及之后新生成的 Reflection。它不会删除已有 Daily Log，也不会把数据上传到云端。

## 2.2 欢迎镜面

每天第一次打开应用的 session 中，会先看到 Lavender Glass 风格的欢迎页面，再进入 dashboard。

这一页是开始记录前让注意轻轻安住的空间，不是测验，不是健康评估，也不判断今天“好”或“不好”。

点击 `开始今天` 进入 dashboard。同一天、同一个 session 内刷新页面时，欢迎页不会每次重复出现。

如想再次查看欢迎文字，可以在 dashboard 点击 `Open Welcome`。

## 2.3 浅色 / 深色模式

页面顶部有 `自动`、`浅色` 和 `深色` 按钮。

应用会把所选主题保存在当前浏览器的 localStorage key `mindfulHealthTheme` 中。主题只改变外观，不会删除 Daily Log，也不会影响 Import / Export。

## 2.4 根据本地时间自动切换主题

选择 `自动` 时，应用会依据设备本地时间选择主题：

- 07:00–18:59 使用浅色模式
- 19:00–06:59 使用深色模式

如果手动选择 `浅色` 或 `深色`，应用会保持该设置，直到再次选择 `自动`。

## 2.5 主要页面结构

通过欢迎页后，应用分为 5 个主要 view：

- `今天`：分两步填写当天信息。`今日信号 1/2` 包含 Energy、Mind、Sleep Hours/Sleep、饮水、Drink Profile、Load & Recovery，以及可收起的 Meal Composer；`Mind Note 2/2` 包含观照练习情境、Mind Note 与前往 Reflection/NuTuenSai 的入口
- `Reflection`：查看简短 NuTuenSai note、生成/检查/轻微编辑 Reflection，并保存今日 Reflection
- `处理数据`：从已保存的 `Daily_Log` 进行 rule-based Field Review，可选择 7、14、30 天或全部数据
- `Log`：查看 Daily Log Table、Export Master Excel、Import Master Excel 与 Clear Daily Log
- `Intention Profile`：保存用户自愿告诉系统的名字、称呼方式、偏好语气与不希望系统替自己推断的边界

切换 view 不会清除当前表单，也不会删除已有 Daily Log。

### Intention Profile

`Intention Profile` 是保存在当前浏览器中的可选信息，用于让应用的称呼与确定性文字更贴近用户的选择，例如：

- 希望应用如何称呼自己
- 称呼方式：`senior_name`、`polite_name` 或 `name_only`
- 可选的 preferred tone
- 可选的出生日期或出生年份
- User Context Note
- Do Not Assume Note

这些信息可以随时修改、清除或跳过。Profile 只用于问候、称呼和少量文字风格，不改变事实、计算、证据或 Signal Engine，也不会把用户笔记当作系统暗指令。

自定义称呼已从 UI 移除。旧 profile 若含有 `custom`，系统会安全地 fallback 为 `senior_name`。

Today/Hydration 区域可以根据已保存的名字和称呼显示问候，例如 `สวัสดีค่ะ พี่ pnat 🩵`。这里只使用 display name 与 address style，不分析人格、身份或健康。

从 v1.9.2 的 Today Input Step Flow 起，`清除当前表单` 只出现在 `今日信号 1/2`。`今日信号 1/2` 与 `Mind Note 2/2` 都可以直接点击 `保存到 Daily Log`。前往 Reflection/NuTuenSai 只是导航，不会自动保存。

`恢复今天的记录` 位于清除按钮旁，用于把今天已有的 `Daily_Log` 行载回当前表单。它不会建立新行、自动保存、删除 log 或生成 Reflection。如果今天没有记录，系统会先询问是否载入最近一行。

白天填写或选择信息时，当前表单会作为 draft 自动保存在本地浏览器。刷新后，表单内容仍可恢复。draft 不等于已保存的 Daily Log，直到用户点击保存按钮。

同一天重复保存采用 source-aware safe merge：从 `今日信号 1/2` 保存时只更新今日信号，并保留 Practice Context、Practice Note、Mind Note 与 Reflection；从 `Mind Note 2/2` 保存时更新 Practice/Mind Note 字段，但保留已有 Reflection；Reflection 页面只在用户点击保存时写入生成或编辑后的 Reflection。

Today 页面顶部有小型 step switcher，可在 `今日信号 1/2` 与 `Mind Note 2/2` 之间切换。页面底部按钮仍是每一步的主要操作。

顶部 Daily Log 状态条显示当天三个层次中哪些已保存：`今日信号`、`Mind Note` 与 `Reflection`。它只用于定位，不是完成度评分。

从 v1.9.3 起，应用加入可选的 `Sleep_Hours` 与 `Run_Detail_JSON`，同时保留原有 `Sleep` 与 `Activities`，兼容旧 Daily Log 与 Excel。

从 v1.9.4 起，Reflection/NuTuenSai 能更具体地读取当天的睡眠小时、跑步细节、跑步类型、轻量 coding / AI-assisted work 与饮水背景，但不会提供训练或医疗建议。

从 v1.9.5 起，Reflection 可把最近 1–3 行 Daily Log 作为很轻的连续背景，例如睡眠不足的延续、持续负荷、跑步后的恢复、饮水变化或认知负荷。当天输入始终优先；这不是 chatbot memory、周期分析、诊断或 coaching。

从 v1.9.6 起，`今日信号 1/2` 使用两个主要 card：`Daily Signal Cockpit` 显示四个信号的状态，`Active Signal Detail` 每次展开一个类别。四个信号是心境、饮水、饮料与工作/活动。

Cockpit 中的 `尚未填写`、`已有一些信息`、`已可轻读` 仅是视觉反馈，不是评分、成功状态或判断。

从 v1.9.7 起，Cockpit 以 signal constellation 呈现，四个 node 围绕中央 `Daily Balance Orb`。Orb 与 signal dots 只帮助观察今天的信息是否开始成形，不是 KPI。

从 v1.9.8 起，Reflection/NuTuenSai 会从当天输入中选择 2–4 个有意义的 anchor，例如饮水、睡眠小时、饮料背景、activity/load、run detail、Mind Note 或轻量 continuity，再形成自然但仍然 rule-based、local-first、non-medical 的 overview。

v1.9.8b 的少量 emoji pause marker（如 🩵 或 💧）只帮助长句呼吸，不是标题、分数、诊断或隐藏类别。

v1.9.8c 会减少重复连接词，并在信息丰富时使用较短段落，但不会增加新的意义。

从 v1.9.9 起，`Mind Note 2/2` 包含可选的观照练习情境 card。MHB 2.1 使用邀请式文字“今天，心可以轻轻安住在哪里？”，通过身体、感受基调、心/念头、可观照的原则四类，以及没有练习/其他，记录可选的 practice root/type、时长与 `Practice_Note`。这些信息只作为 Field Review 与明确选择 `practice_context` root 时的有边界 Reflection 情境，不评分，也不判断练习质量。

MHB 2.0 建立的 Field Review、Signal Engine 与 User Intention Profile 仍是 MHB 2.1 的稳定基础。`处理数据` 读取 localStorage 中的 `Daily_Log`，没有 free-form ask，也不调用 LLM。

Reflection/NuTuenSai 页面有 `返回 Today 1/2` 与 `返回 Mind Note 2/2` 的次要按钮。它们只导航，不保存、不清除，也不重新生成 Reflection。

Today 中已填写的主要 card 会出现很轻的蓝色层。这只表示当前表单已有信息，不是完成、诊断或评价。

## 3. 各部分使用方法

### 处理数据 / Field Review

`处理数据` 属于 MHB 2.0 奠定的 rule-based 基础，只读取当前浏览器已保存的 `Daily_Log`。默认范围为 30 天，让 Signal Engine 更可能取得足够 paired rows；也可选择 7、14 天或全部数据。

Review card 涵盖 hydration、sleep/recovery、load/recovery、drinks/caffeine/sweetness、Mind Note/support need 与缺失/留空数据。每张 card 分为三层：`Daily_Log` 证据、NuTuenSai 的有边界读取，以及下一次可轻轻观察的方向。少于 3 行时，系统会说明数据仍薄，只能看到初步信号。

语气会随 timeframe 轻微变化：7 天是短期信号，14 天是开始重复的节律，30 天是月度视角，全部数据是仍需结合每一天情境的长视角。

页面使用 compact Daily_Log context header，把 `LOCAL FIELD REVIEW`、timeframe、真实数据 overview chips 与边界说明放在一起，不增加图表库，也不离开 `Daily_Log` 证据。

六个房间保留各自的 NuTuenSai 背景图，分别对应饮水、睡眠/恢复、负荷/恢复、饮料、Mind Note 与缺失数据。图片只是 presentation layer，不改变逻辑，也不增加 LLM、free-form 或 correlation。

Field Review 使用统一术语 **引导式数据房间（Guided Field Rooms）**。它是 Guided Reading，不是聊天模拟。用户先选择数据房间，再选择阅读角度：

- 概览
- 数据证据
- 下一次轻轻观察
- 查看全部

每个房间一次只显示一张 reading card，并提供当前角度提示、非评分的 `✓ / ○` progress、轻量 angle chips，以及返回、重新选择角度、到这里就好或阅读下一个角度等导航。阅读状态只存在于当前 session，不写入 Daily Log 或 workbook。

导航语法保持一致：左侧表示返回或回到角度菜单，右侧表示结束或继续。Related-room cards 是前往其他数据房间的路径，不是 AI 建议。

Sidebar 将六个引导式数据房间与英文 `Signal Engine` 分开，明确它是特殊 engine，而不是第七个反思房间。

`关系` / `Signal Engine` 进行保守的关系读取，只计算 `Daily_Log` 中 numeric-to-numeric 的 Pearson relationship，例如 `Water_ml`、`Sleep_Hours`、`Load_Score`、`Caffeine_Score`、`Sugar_Score` 与 `Practice_Minutes`。最多显示 5 个满足数据规则的关系，并按 `|r|` 排序。每行使用易懂的信号名称、pair-specific icon/accent、自然语言说明、`r` 与 paired days 的 evidence chips，以及同向/反向/不清晰的简短图例。原始 column pair 仍作为可检查证据；detail panel 也为不熟悉统计的人解释 `r`。

点击关系行会打开由 Meaning Voice Matrix 确定的 `MHB · NuTuenSai` 意义层，并显示“下一次可观察什么”。它把 correlation 转为自我观察 prompt，不是建议，也不宣称因果。系统尚不 map category fields，并始终说明 correlation 不等于 causation。

此页面不是 chatbot，不调用 LLM，不接收 free-form 问题，不诊断，也不提供医疗建议。空白只表示没有记录，不是错误或失分。

如需查看已导出的 workbook，请先在 `Log` 导入 Master Excel，随后 `处理数据` 会读取导入 localStorage 的 Daily Log。

### Today State

按今天真实感受到的情况选择即可，不必追求精确：

- Energy：低 / 中 / 好
- 今天整体心境：很沉重 / 不安 / 有压力 / 一般 / 还可以 / 感觉不错 / 放松
- Sleep Hours：可填写小数，如 6.5
- Sleep：可由 Sleep Hours 推导为少 / 尚可 / 好；未填写小时数时也可直接选择大致类别

整体心境是从沉重到较轻/较好的有序描述，不是分数。`一般` 是中点，只需选择最接近今天真实状态的词。

Sleep Hours 的推导规则是：`< 5` 小时 = 少，`5 至 < 7` = 尚可，`>= 7` = 好。它是用户自报的恢复情境，不是诊断或健康结论。

`今天整体心境` 旁的小蓝心标记当天主要心境观察；Mind Note 中的 `这条记录的感受` 只描述那条 note，不评价整天。

`还可以`、`感觉不错` 与 `放松` 让数据也能记录心是支持力量的日子，而不只记录压力。它们仍不是 performance score，也不能证明整天都很好。

Today State 的小型日光/月光视觉根据浏览器本地时间变化，只帮助感受一天节律，不改变数据或计算。

可选的 `Energy Cause` 可以补充低能量与支持能量的背景，例如睡得少、睡得够、吃得少、饮水少、剧烈运动、deep work、压力、心较轻或尚不确定。

Energy level 与 Energy Cause 有时看似相反，例如能量低但睡够，或能量好但仍有压力。系统不会把它当作错误，而是看作身体、心与恢复可能处于不同层次。

### Hydration

用近似量记录饮水：

- `+250 ml`：小杯或少量补水
- `+500 ml`：一瓶或大杯
- `+半瓶`：约半个大瓶
- `Reset`：重新计算当前表单的饮水量

不需要一次大量饮水。分散在一天中慢慢喝即可。Hydration 关注合适的节律，不是喝得越多越好。

Hydration card 会根据当天情境显示弹性范围，以基础饮水 + load/出汗 + 身体 cue 为原则。例如休息日约 2.0–2.4 L，认知工作约 2.4–2.8 L，easy run 或大量步行约 2.6–3.0 L，short quality run 约 2.8–3.3 L，long run / 大量出汗约 3.2–4.0 L，并强调分散饮用。

这些数字是 self-care guidance，不是必须达成的目标，也不是医疗建议。系统会区分 activity load 与单纯 recovery signal；只有睡少、能量低或心境沉重时，不会自动判断为高负荷日。

### Meal Composer — 轻轻拼出今天的餐食

在 `今日信号 1/2` 打开 `今天的餐食`，可以从小型 Food Reference 中选择食物或调味品，再按自己记得的程度调整 `少量 / 一般 / 较多 / 自定义` 份量与可选烹调方式。餐食名称与时间都不是必填项，同一天也可以记录多餐。

已保存的餐食可以修改而不会意外复制，也可以在确认后只移除目标餐食。Meal records 保存在当前浏览器中，并与 `Daily_Log` 分开；清除 Today 当前表单或保存 Daily Log 都不会代替 Meal records 的管理。

钠含量只显示有证据支持的范围。若部分条目仍缺少资料，界面会明确表示估算并不完整，不会用 `0 mg` 代替未知值。Meal Composer 下方的阅读卡会在保存、修改或移除餐食后重新推导，只描述已记录事实，不评分、不判断食物，也不设置医疗目标。本版本尚未把 Meal data 接入主要 Daily Reflection 或 workbook export/import。

### Drinks / Drink Profile

这里记录白水以外的饮料，如咖啡、茶、可可、甜饮、果汁或汽水。白水仍在 Hydration card 记录，避免重复。

每杯饮料可选择：

- Drink Type
- Sweetness
- Caffeine
- Milk
- Amount

点击 `Add Drink` 加入当天 Drink List，或点击 `Clear Drinks` 清空当前饮料表单。

应用计算 Sugar Score、Caffeine Score、Milk Drink Count 与 Support Count，用于轻量观察。简单原则仍是：“甜饮是一份甜食，不等于水。”

`今天的饮料观察` 是描述性 cue，不是评判或医疗建议。糖或咖啡因较高的日子不代表做错了什么，只需看见 pattern，再决定下一杯是否减少甜度、回到饮水或留出休息。

汽水只是 Drink Type，不一定含糖。系统以 Sweetness 字段为主要依据；zero/low sugar 与高甜度会按所选信息读取，不作饮食道德评判。

### Load & Recovery

选择当天主要活动、负荷或恢复节律即可。Load & Recovery 不只指运动，也包括专注工作、站立工作、看盘、户外劳动、身体活动与 recovery mode。

`睡得少` 属于 Today State > Energy Cause，是恢复信号，不是主要 activity chip。若想记录今天有意放轻，请选择 `休息日` 或 `轻量 / 恢复日`。

- 办公 / 会议与文件
- 轻量 coding / AI-assisted work
- 户外工作 / 体力与出汗
- Deep work / 长时间 coding
- 牙医 / 精细临床工作
- 医生 / 值班或照护患者
- 摄影 / 长时间拍摄
- 投资 / 看盘与分析
- 羽毛球
- 高强度乒乓球
- Easy run
- Short quality run
- Long run
- 大量步行
- 休息日
- 轻量 / 恢复日

选择跑步活动后，会出现可选的 `今天的跑步细节` mini panel，可记录距离、小时+分钟与出汗程度。系统把总时间保存为 `Run_Detail_JSON.durationMin`，并可由距离与时间推导 pace。

Run Detail 只用于 load / hydration / recovery 情境，不是训练建议、pace 评价或 performance coaching。

应用将 Load 分为三层：

- Light Load：身体仍有恢复空间
- Moderate Load：今天使用了一些能量，恢复窗口值得保留
- High Load：身体或思绪已使用较多，需要给 recovery 更多空间

Recovery 是持续生活的一部分，不是只有努力够多之后才有资格获得的奖励。

Activity Load Roots 只细化 reflection wording。例如临床工作强调精细操作、眼手与持续专注；摄影强调站立、移动、设备与人的节律；看盘强调 attention 与 decision load，而不是金融建议；户外工作强调热、汗、体力与 hydration；运动/跑步强调 physical/sweat load；休息日仍是有效节律，不是等待加入 productivity 的空白。

Activity roots 不改变 Load Score、Daily Log、Excel export/import 或 schema。应用也不会从当天选择的活动推断用户身份或职业。

### Mindful Reminder

这里会根据当天主要信号显示简短 NuTuenSai 提醒，例如饮水少、咖啡因高、睡眠少、load 高或心境有压力。

目标是帮助回到较稳定的节律，不是制造恐惧，也不是要求一天内解决所有事情。

### 基于信号的反思

从 v1.6 起，Reminder 与 Reflection 会读取应用已有信号之间的关系，包括饮水、饮料、恢复、能量、睡眠与 Mind Note。

从 v1.9.8 起，Reflection preview 与详细 Reflection 使用 input-grounded overview，列出少量当天 anchor，让用户看见 NuTuenSai 是从实际输入出发，而不是凭空解释情绪。

系统不会用这些信号诊断或评判健康。数据很少时，只会温和邀请补充少量真实信息，不会过度分析，也不会在用户未选择或写下担忧/压力时自行推断恐惧。

### Mind Note — 留下今天想留住的一件事

Mind Note 是一个安静的空间，可以轻轻放下今天的一件事：喜悦、普通时刻、尚不确定的感受、正在学习的内容，或较沉重的经验。它不会要求用户先找出问题，也不是 therapy tool 或 medical tool。

Mind Note 之前的邀请“今天，心可以轻轻安住在哪里？”用于可选的观照练习情境。这里的“安住”是让注意有一个温和落点，不表示放松成功、修行成就或精神层级。应用保存 `Practice_Root`、`Practice_Type`、`Practice_Minutes`、`Practice_Context_JSON` 与 `Practice_Note`，但不评价练习质量。

`Practice_Note` 可记录练习情境、善意行动或想记住的有益片段，例如喂鱼、帮助别人、忆起一件善行，或选择不立即反应。它是用户自己的 field memory，只能在明确选择 `practice_context` root 时被有边界地读取；它不是功德积分、自我考核或精神进步指标。

可以这样轻量使用：

- 写下今天想留住的内容，例如满足、普通片刻、学习、不确定，或想轻轻放下的事
- 从温柔/支持、中性/观察中、沉重/需要空间三个组中选择这条 note 的感受
- 选择“今天心可能需要什么”，例如先休息、看见 pattern、温和补水、轻轻继续、谢谢自己或回到当下
- 一句话就够了，也可以留空
- 用它观察心境与 hydration、recovery、load、sleep 之间的节律，而不是评价人格

MHB 2.1 只改变了 Mind Note 的措辞、分组与视觉呼吸空间。MHB 2.2 在运行时感知 `Daily_Log` 已保存日期之间的时间，并只用它调整 Reflection 的开场节奏。既有值仍兼容；Excel、Reflection 的解释、Field Review 与 Signal Engine contract 不变。

### Reflection Generator

点击 `今日回顾`，应用会生成 NuTuenSai 风格的当天 Reflection，包括：

- 系统看到的当天概览
- 一个可轻轻调整的方向
- 简短 Tomorrow Focus
- 有数据时的 compact Mind Note

开场会温和区分第一次记录、接着昨天继续，或在一段没有保存记录的时间后再次回来。它默认只提到一次，然后把注意力放回今天记录的内容。没有保存记录的日子不是失败，不需要补写，也不会改变事实或用户选择的 Reflection Root。

Preview 是 synthesis，不会列出系统检查到的所有字段，以免与上方 NuTuenSai note 重复或变成 raw data dump。Recovery Note、Hydration Note、NuTuenSai Reminder、Mind Note 与 Tomorrow Focus 仍会保存在 Daily Log / Reflections / Excel。

用户可以在保存前进行轻微编辑。`清除 Reflection` 只清除当前 preview，不删除今日信号、Daily Log 或已保存数据。

新生成的 Reflection 结尾会有一个蓝心 `🩵`，作为轻量 NuTuenSai 标记，不是评分。

Reflection Root 由用户选择本次观察轴，例如饮水、休息、活动、饮料、心境或观照练习。非 Auto root 使用对应的简短 deterministic wording；Auto 接近原有 composer。Root 只调整注意力与措辞，不是 AI 替用户决定什么最重要。

保存 Reflection 时，应用会记录 `Reflection_Root`、`Reflection_Root_Label`、`Reflection_Root_Source` 与 `Reflection_Root_Declaration`，让 export/Excel 保留本次阅读意图。这些字段不是分数、诊断或人生意义判断。

## 4. 保存数据

### Save to Daily Log

在 `今日信号 1/2` 点击 `保存到 Daily Log`，可以先保存当天饮水、饮料、睡眠、活动与 load，不必先进入 Reflection。

在 `Mind Note 2/2` 保存时，可以写入 Practice Context 与 Mind Note，同时让 Reflection 保持空白。

在 Reflection/NuTuenSai 页面点击 `保存今日 Reflection`，才会保存生成或编辑后的 Reflection。

同一天已有数据时，应用会先询问是否更新，并保留不属于当前保存层的既有内容。

### Daily Log Table

Daily Log Table 用于回看多天节律，例如哪些日子 load 较高、睡得少、饮水少，或心境开始有压力。

MHB 2.2 可以在运行时从 `Daily_Log.Date` 推导最近一次较早的记录日期，以及两次记录之间相隔的日历天数。它不会保存新的计数器，不建立 streak，不提供奖励或惩罚，也不会把暂时没有记录理解为失败。

它不是健康评分表，只是一面帮助观察生活节律的镜子。

### Clear Daily Log

点击 `Clear Daily Log` 会清除当前浏览器中的全部历史 log。操作前应确认，因为它会删除该浏览器 localStorage 中的记录。

## 5. Export / Import

### Export Master Excel

点击 `Export Master Excel` 下载：

```text
Mindful_Health_Balance_Master.xlsx
```

Workbook 的主要 sheets 为：

- Daily_Log
- Summary
- Reflections
- Field_Context
- Field_Review
- Column_Guide
- AI_Context
- User_Intention_Profile（可选）

`Summary` 是由 JavaScript 计算后写入的静态导出值，不是 Excel formulas，也不是 AI analysis。

`Column_Guide` 解释原有 column 名称、含义、单位、数据类型、允许与禁止的解释、AI reading note、示例与 canonical status，但不改变 `Daily_Log` header。

`AI_Context` 明确说明 workbook 是 self-care reflection workbook，不是财务、支出、会计、交易或消费文件。例如 `Water_ml` 是毫升饮水量，不是金额。

`Field_Context` 说明数据由用户拥有。若用户主动交给 AI/LLM，只应用于 pattern reflection，不用于 diagnosis 或 medical advice。AI 输出仍须由用户检查。

`Field_Review` 是基于已有数据的轻量摘要，不是疾病诊断或健康风险预测。

只有当前浏览器中存在已保存 profile 时，才会导出 `User_Intention_Profile`。没有 profile 时，不建立空 sheet。该 sheet 保存用户选择的名字、称呼、语气、note 与边界；它不是 account、身份验证、medical profile 或隐藏 AI 指令。

当前 master data 文件是 `Mindful_Health_Balance_Master.xlsx`。`.xltx` 只是 template/local artifact，不是日常备份的 master data 文件。

### Import Master Excel

点击 `Import Master Excel` 把 master 文件载回应用。

应用读取 `Daily_Log` sheet 并载入 Daily Log Table；如已有本地数据，会先询问是否 overwrite。

若 workbook 含有效 `User_Intention_Profile`，应用会先显示 preview，再询问是否替换当前本地 profile：

- Cancel：保留原 profile
- Confirm：以 workbook snapshot 替换整份 profile
- v1 不进行 field-by-field merge
- 没有 profile sheet：本地 profile 不变
- 无效 profile candidate：跳过 profile，同时不应让其他 workbook import 失败

Import 不是 auto-sync。主要数据仍在当前浏览器/localStorage，不会自动上传到任何地方。

## 6. 如何打开应用

打开目录：

```text
~/Desktop/MindfulSystem_xAi/apps/mindful-health-balance
```

双击：

```text
index.html
```

如果 `Export Master Excel` 无法运行，请检查浏览器是否能联网加载 SheetJS CDN。Excel 功能使用浏览器端 library。

## 7. 重要提醒

- 应用帮助观察 pattern，不评判健康
- 不需要把每个字段填得 perfect
- 不要把应用变成给自己施压的工具
- 出现真实异常症状时，应咨询医生或专业人员
- 目标不是让数字快速变好，而是建立能够长期相处的节律
- 数据 local-first、user-owned，没有 auto-upload
- 只有用户主动 share 时，AI 才能读取导出的 workbook
- 应用不是 therapy、diagnosis、financial advice、risk prediction 或 scoring/judgment app
- 正向信号是 support signal，不是 performance score
- 糖与咖啡因是 drink-load signal，不是 moral score

## 8. 系统的核心句子

“Mindful Health Balance by MSxAI 是一面温和的镜子，帮助我们看见饮水、咖啡、甜饮、load、recovery、sleep 与心如何彼此相连，而不必因为某一天的数据急着评判自己。”
