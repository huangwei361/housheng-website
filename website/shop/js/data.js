/* 厚生 HOUSHENG · 营养商城 · 数据层（商品/用户/购物车/评价/优惠券/订单/售后） */
window.HS = window.HS || {};

/* ========== 商品数据 ========== */
HS.products = [
  {id:"d3k2",     cat:"基础营养", name:"维生素 D3 + K2",    spec:"5000IU · 90 粒 / 瓶",  price:128, was:168, stock:280, sales:1862, rating:4.9, reviews:428, tags:["爆款","骨质","免疫"], img:"assets/products/d3k2.svg",     blurb:"MK-7 型 K2 + D3，促进钙吸收，骨骼免疫双补",nutrition:["每份：5000IU D3 + 90mcg K2","基础营养 6 大类","0 防腐剂 0 添加糖"]},
  {id:"bcomplex", cat:"基础营养", name:"复合 B 族维生素",   spec:"8 种 B 族 · 60 粒 / 瓶", price:98,  was:128, stock:520, sales:2410, rating:4.8, reviews:632, tags:["新品","能量","代谢"], img:"assets/products/bcomplex.svg", blurb:"8 种 B 族协同，缓解疲劳、改善代谢",nutrition:["每份含 B1/B2/B3/B5/B6/B7/B9/B12","1 日 1 粒","全谱配方"]},
  {id:"omega3",   cat:"基础营养", name:"Omega-3 深海鱼油",  spec:"EPA + DHA · 90 粒 / 瓶", price:168, was:228, stock:340, sales:1583, rating:4.9, reviews:374, tags:["心血管","脑健康"], img:"assets/products/omega3.svg",   blurb:"rTG 型高吸收鱼油，心血管 + 脑健康双护",nutrition:["EPA 600mg + DHA 400mg / 2 粒","IFOS 五星认证","无腥味"]},
  {id:"magnesium",cat:"基础营养", name:"镁片 + 甘氨酸",     spec:"60 粒 / 瓶",          price:118, was:158, stock:260, sales:1428, rating:4.7, reviews:286, tags:["助眠","放松"], img:"assets/products/magnesium.svg",blurb:"甘氨酸镁，好吸收，助眠 + 肌肉放松双效",nutrition:["镁 200mg + 甘氨酸 / 粒","无泻剂配方","睡前 1 粒"]},
  {id:"natto",    cat:"慢病养护", name:"纳豆红曲胶囊",     spec:"60 粒 / 瓶",          price:198, was:268, stock:180, sales:986,  rating:4.8, reviews:198, tags:["三高","降脂","蓝帽子"], img:"assets/products/natto.svg",    blurb:"国食健字 · 纳豆激酶 + 红曲，辅助降血脂",nutrition:["纳豆激酶 2000FU / 粒","红曲米 0.3g","蓝帽子认证"]},
  {id:"balsam",   cat:"慢病养护", name:"苦瓜桑叶片",       spec:"60 片 / 瓶",          price:168, was:218, stock:220, sales:754,  rating:4.6, reviews:142, tags:["控糖","蓝帽子"], img:"assets/products/balsam.svg",   blurb:"苦瓜皂苷 + 桑叶生物碱，辅助调节血糖",nutrition:["苦瓜皂苷 100mg + 桑叶 200mg","蓝帽子","无添加蔗糖"]},
  {id:"sleeptime",cat:"慢病养护", name:"酸枣仁 + 茶氨酸",   spec:"30 袋 / 盒",          price:138, was:188, stock:310, sales:1284, rating:4.8, reviews:312, tags:["爆款","助眠","无褪黑素"], img:"assets/products/sleeptime.svg",blurb:"药食同源 · 酸枣仁 + 茶氨酸，温和助眠",nutrition:["酸枣仁 300mg + 茶氨酸 200mg","无褪黑素","无依赖"]},
  {id:"jointcare",cat:"慢病养护", name:"氨糖软骨素",       spec:"90 粒 / 瓶",          price:168, was:228, stock:240, sales:892,  rating:4.7, reviews:201, tags:["关节","中老年"], img:"assets/products/jointcare.svg",blurb:"氨糖 + 软骨素 + MSM 三效，关节灵活",nutrition:["氨糖 1500mg / 3 粒","软骨素 + MSM","中老年专属"]},
  {id:"probiotic",cat:"肠胃健康", name:"益生菌粉",         spec:"30 袋 / 盒 · 2g / 袋", price:138, was:188, stock:260, sales:1126, rating:4.7, reviews:236, tags:["新品","肠胃","免疫"], img:"assets/products/probiotic.svg",blurb:"11 种菌株 + 益生元，便秘腹泻双调节",nutrition:["11 株益生菌 300 亿 CFU","+ 益生元","耐胃酸"]},
  {id:"protein",  cat:"运动营养", name:"乳清蛋白粉",       spec:"1kg / 罐 · 香草味",   price:298, was:368, stock:140, sales:732,  rating:4.8, reviews:168, tags:["热卖","增肌","塑形"], img:"assets/products/protein.svg",  blurb:"新西兰进口乳清，75% 高蛋白含量",nutrition:["每份 30g 含蛋白 22.5g","低脂低糖","运动 30 分钟后饮用"]},
  {id:"liver",    cat:"慢病养护", name:"护肝片",           spec:"60 粒 / 瓶",          price:158, was:198, stock:180, sales:624,  rating:4.6, reviews:124, tags:["应酬","熬夜"], img:"assets/products/liver.svg",    blurb:"水飞蓟 + 葛根 + 丹参，应酬熬夜必备",nutrition:["水飞蓟素 100mg + 葛根 200mg","丹参 50mg","餐后服用"]},
  {id:"coq10",    cat:"基础营养", name:"辅酶 Q10",         spec:"60 粒 / 瓶",          price:178, was:228, stock:200, sales:518,  rating:4.7, reviews:96,  tags:["推荐","心脏","抗氧"], img:"assets/products/coq10.svg",    blurb:"还原型 Q10，吸收率 8 倍，心脏 + 抗氧",nutrition:["辅酶 Q10 100mg / 粒","还原型 (Ubiquinol)","40+ 推荐"]},
];

HS.categories = [
  {key:"all",      name:"全部商品", icon:"🛍️"},
  {key:"基础营养", name:"基础营养", icon:"💊"},
  {key:"慢病养护", name:"慢病养护", icon:"🛡️"},
  {key:"肠胃健康", name:"肠胃健康", icon:"🌿"},
  {key:"运动营养", name:"运动营养", icon:"💪"},
];

/* ========== 评价数据 ========== */
HS.reviews = {
  d3k2:[
    {uid:"U10086",name:"张先生",avatar:"张",rating:5,date:"2026-08-15",content:"吃了 3 瓶了，骨密度检查有改善，膝盖不酸了。客服回复快，会回购。",imgs:["https://picsum.photos/seed/r1/200/200"],sku:"5000IU · 90 粒",reply:"感谢您的支持！建议每天早餐后 1 粒，搭配晒太阳 15 分钟更佳 ☀️",helpful:48},
    {uid:"U10042",name:"李女士",avatar:"李",rating:5,date:"2026-08-10",content:"医生推荐吃的，比国外品牌便宜一半多，含量也够。",imgs:[],sku:"5000IU · 90 粒",reply:"✅ 蓝帽子认证，含量足，性价比高。",helpful:32},
    {uid:"U10031",name:"王女士",avatar:"王",rating:4,date:"2026-07-28",content:"物流有点慢但是产品本身没问题，颗粒不大好吞咽。",imgs:["https://picsum.photos/seed/r3/200/200","https://picsum.photos/seed/r4/200/200"],sku:"5000IU · 90 粒",reply:"下次发货前可备注优先仓，我们会尽量缩短时效~",helpful:18},
  ],
  bcomplex:[
    {uid:"U10092",name:"陈女士",avatar:"陈",rating:5,date:"2026-08-18",content:"吃了 1 个月，不容易累了。早餐后吃效果最好。",imgs:["https://picsum.photos/seed/r5/200/200"],sku:"8 种 B 族 · 60 粒",reply:"B 族水溶性建议早餐后服用，吸收最好~",helpful:42},
    {uid:"U10078",name:"刘先生",avatar:"刘",rating:4,date:"2026-08-05",content:"加班族必备，嘴巴不溃疡了。",imgs:[],sku:"8 种 B 族 · 60 粒",reply:"👍",helpful:24},
  ],
  omega3:[
    {uid:"U10102",name:"周先生",avatar:"周",rating:5,date:"2026-08-20",content:"体检甘油三酯降了！会继续吃。",imgs:["https://picsum.photos/seed/r7/200/200"],sku:"EPA + DHA · 90 粒",reply:"恭喜！建议连续服用 3 个月一周期~",helpful:56},
  ],
  probiotic:[
    {uid:"U10105",name:"何女士",avatar:"何",rating:5,date:"2026-08-22",content:"肠胃舒服多了，便秘改善，口气也清新。",imgs:["https://picsum.photos/seed/r8/200/200","https://picsum.photos/seed/r9/200/200"],sku:"30 袋 · 2g",reply:"建议餐前 30 分钟温水冲服~",helpful:38},
  ],
  protein:[
    {uid:"U10110",name:"吴先生",avatar:"吴",rating:5,date:"2026-08-25",content:"健身教练推荐的品牌，溶解度好不结块。",imgs:["https://picsum.photos/seed/r10/200/200"],sku:"1kg · 香草",reply:"运动 30 分钟后 + 香蕉，效果最佳 🏋️",helpful:62},
  ],
  sleeptime:[
    {uid:"U10115",name:"郑女士",avatar:"郑",rating:5,date:"2026-08-19",content:"终于找到不依赖褪黑素的了，温和不昏睡。",imgs:["https://picsum.photos/seed/r11/200/200"],sku:"30 袋 / 盒",reply:"睡前 30 分钟温水冲服，让身体自然放松~",helpful:78},
  ],
};
HS.reviews._default = [
  {uid:"U10000",name:"客户",avatar:"客",rating:5,date:"2026-08-01",content:"东西不错，厚生是大品牌值得信赖。",imgs:[],sku:"默认规格",reply:"感谢您选择厚生 ❤️",helpful:5},
];

/* ========== 优惠券 ========== */
HS.coupons = [
  {id:"NEW50",  name:"新人专享券",  amount:50,  threshold:200, scope:"全场通用",  date:"2026-12-31", status:"available", desc:"新用户首单可用"},
  {id:"FULL100",name:"满减券",      amount:100, threshold:500, scope:"全场通用",  date:"2026-12-31", status:"available", desc:"满 500 减 100"},
  {id:"HEALTH30",name:"健康日专享", amount:30,  threshold:150, scope:"基础营养",  date:"2026-10-31", status:"available", desc:"健康日专享"},
  {id:"VIP200", name:"VIP 专享",    amount:200, threshold:1000,scope:"慢病养护",  date:"2026-12-31", status:"available", desc:"VIP 会员专享"},
  {id:"OLD59",  name:"感恩回馈",    amount:50,  threshold:300, scope:"全店通用",  date:"2026-09-30", status:"used",      desc:"已使用"},
  {id:"EXP10",  name:"体验券",      amount:10,  threshold:80,  scope:"全场",      date:"2026-08-31", status:"expired",   desc:"已过期"},
];

/* ========== 营养师建议 ========== */
HS.advisors = [
  {id:"A01",name:"林悦",title:"注册营养师",avatar:"林",specialty:"慢病营养 · 三高管理",bio:"华中科技大学营养与食品卫生学硕士 · 5 年临床经验",orders:1284,rating:4.9},
  {id:"A02",name:"周易",title:"心理咨询师",avatar:"周",specialty:"睡眠 · 情绪",bio:"国家二级心理咨询师 · 8 年+ 心理疗愈",orders:892,rating:4.8},
  {id:"A03",name:"张驰",title:"运动营养师",avatar:"张",specialty:"增肌 · 减脂 · 体态",bio:"NSCA 国际认证 · 营养 + 训练综合指导",orders:756,rating:4.9},
];

/* ========== 订单示例数据 ========== */
HS.orders = [
  {id:"ORD20260820001", date:"2026-08-20", status:"shipped",   items:[{id:"d3k2",qty:2},{id:"omega3",qty:1}], total:424, address:"武汉市青山区冶金大道松阅 2 号楼"},
  {id:"ORD20260810005", date:"2026-08-10", status:"completed", items:[{id:"bcomplex",qty:1}], total:98, address:"武汉市青山区冶金大道松阅 2 号楼"},
  {id:"ORD20260725002", date:"2026-07-25", status:"completed", items:[{id:"natto",qty:1},{id:"sleeptime",qty:1}], total:336, address:"武汉市青山区冶金大道松阅 2 号楼"},
  {id:"ORD20260705009", date:"2026-07-05", status:"aftersales",items:[{id:"magnesium",qty:2}], total:236, address:"武汉市青山区冶金大道松阅 2 号楼", aftersale:{type:"退款", reason:"包装破损", amount:236, status:"处理中"}},
];

/* ========== 收藏示例 ========== */
HS.favorites = ["d3k2","omega3","probiotic","sleeptime"];

/* ========== 售后示例 ========== */
HS.aftersales = [
  {id:"AS001", orderId:"ORD20260705009", type:"仅退款", reason:"外包装破损", amount:236, status:"处理中", date:"2026-08-25"},
];

/* ========== 搜索热词 ========== */
HS.hotSearches = ["维生素D","鱼油","益生菌","助眠","蛋白粉","护肝"];

/* ========== 地址示例 ========== */
HS.addresses = [
  {id:"A1",name:"黄巍",phone:"13971691656",region:"湖北省 武汉市 青山区",detail:"冶金大道松阅 2 号楼",tag:"家",isDefault:true},
];

/* ========== 帮助 ========== */
HS.faq = [
  {q:"下单后多久发货？",a:"工作日 15:00 前下单当天发出，15:00 后次日发出。顺丰快递，48 小时内送达。"},
  {q:"支持货到付款吗？",a:"支持，详情请咨询客服。"},
  {q:"商品是否正品？",a:"100% 正品，厚生是蓝帽子保健食品备案企业，每批次可溯源。"},
  {q:"如何申请退换货？",a:"收货 7 天内未拆封可无理由退换，详情见『我的 - 售后』。"},
  {q:"蓝帽子产品有副作用吗？",a:"蓝帽子保健食品经国家审批，按推荐量服用安全无副作用；特殊人群（孕妇/慢病/服药）建议咨询营养师。"},
  {q:"营养师咨询怎么收费？",a:"新人首单可免费体验 1 次，单次 ¥498，季度套餐 ¥1280。"},
];

/* ========== 聊天会话 ========== */
HS.chatThreads = [
  {
    id:"t-merchant",
    type:"merchant",
    name:"厚生商城 · 客服小厚",
    avatar:"厚",
    role:"在线客服 · 7×24",
    lastTime:"刚刚",
    unread:2,
    messages:[
      {from:"them", text:"您好,我是厚生客服小厚,请问有什么可以帮您?", time:"09:15"},
      {from:"me",   text:"我想问一下维生素 D3 的食用方法", time:"09:16"},
      {from:"them", text:"建议每日早餐后 1 粒,搭配晒太阳 15 分钟更佳 ☀️", time:"09:17"},
      {from:"them", text:"如果与钙片同服,需间隔 2 小时以上~", time:"09:17"},
      {from:"me",   text:"好的,谢谢!", time:"09:18"},
      {from:"them", text:"亲,有订单 ORD20260820001 提醒您:已发货,顺丰运单 SF1234,预计今天 18:00 前送达📦", time:"10:24"},
      {from:"them", text:"物流有问题随时找我哈~", time:"10:24"}
    ]
  },
  {
    id:"t-advisor",
    type:"advisor",
    name:"林悦 · 注册营养师",
    avatar:"林",
    role:"慢病营养 · 三高管理",
    lastTime:"5 分钟前",
    unread:0,
    messages:[
      {from:"them", text:"您好,我是林悦营养师,您的三高管理顾问 👩‍⚕️", time:"昨天 14:00"},
      {from:"me",   text:"林老师,我刚查出血脂偏高,需要忌口什么?", time:"昨天 14:02"},
      {from:"them", text:"根据您上次发的体检报告,建议:① 每日纳豆红曲 1 粒;② 减少精制糖和饱和脂肪;③ 每周 3 次有氧运动 30 分钟", time:"昨天 14:05"},
      {from:"them", text:"我先给您开个 3 个月的调理方案,您看可以吗?", time:"昨天 14:05"},
      {from:"me",   text:"好的,谢谢林老师", time:"昨天 14:08"},
      {from:"them", text:"不客气,有任何问题随时来咨询,我会一直在线~", time:"昨天 14:09"}
    ]
  },
  {
    id:"t-aftersales",
    type:"aftersales",
    name:"售后专员 · 小美",
    avatar:"美",
    role:"售后处理中 · 单号 AS001",
    lastTime:"1 小时前",
    unread:1,
    messages:[
      {from:"them", text:"您好,我是售后专员小美,您申请的退款单 AS001 我们已收到 📋", time:"昨天 16:00"},
      {from:"me",   text:"外包装破损,麻烦尽快处理", time:"昨天 16:02"},
      {from:"them", text:"非常抱歉给您带来不便!我们已安排仓库补发一盒新的,预计明天发出,原货款 ¥236 将在签收后 24h 内原路退回您的账户", time:"昨天 16:05"},
      {from:"me",   text:"好的,谢谢", time:"昨天 16:06"},
      {from:"them", text:"请问您对这次售后处理满意吗?处理完成后麻烦给个评价,帮我们改进~", time:"1 小时前"}
    ]
  }
];

/* ========== 财务 / 账户 ========== */
HS.account = {
  balance: 528.50,        // 储值余额
  points: 1280,           // 健康积分
  level: "VIP1",          // 会员等级
  couponCount: 4,         // 优惠券数量
  expiringPoints: 200     // 即将过期积分
};

HS.transactions = [
  {id:"TX20260904001", date:"2026-09-04", type:"recharge",  amount:500,  desc:"储值卡充值",          status:"success"},
  {id:"TX20260820002", date:"2026-08-20", type:"order",     amount:-424, desc:"订单 ORD20260820001",  status:"success"},
  {id:"TX20260815003", date:"2026-08-15", type:"refund",    amount:236,  desc:"退款单 AS001",          status:"success"},
  {id:"TX20260810004", date:"2026-08-10", type:"order",     amount:-98,  desc:"订单 ORD20260810005",  status:"success"},
  {id:"TX20260725005", date:"2026-07-25", type:"consult",   amount:-498, desc:"营养师咨询(单次)",    status:"success"},
  {id:"TX20260720006", date:"2026-07-20", type:"points",    amount:50,   desc:"购物赠送积分",         status:"success"},
  {id:"TX20260710007", date:"2026-07-10", type:"recharge",  amount:200,  desc:"储值卡充值",          status:"success"},
  {id:"TX20260705008", date:"2026-07-05", type:"order",     amount:-236, desc:"订单 ORD20260705009",  status:"success"}
];

HS.rechargePlans = [
  {amount:100,  bonus:0,    desc:"体验装",      tag:""},
  {amount:500,  bonus:30,   desc:"最受欢迎",    tag:"hot"},
  {amount:1000, bonus:80,   desc:"送 8%",       tag:""},
  {amount:2000, bonus:200,  desc:"送 10%",      tag:""},
  {amount:5000, bonus:600,  desc:"送 12%",      tag:"best"}
];

/* ========== 咨询预约 ========== */
HS.consultSlots = [
  {date:"今天", slots:["14:00","15:00","16:30","20:00"]},
  {date:"明天", slots:["09:00","10:30","14:00","15:30","19:00","20:30"]},
  {date:"后天", slots:["10:00","11:30","15:00","16:30","20:00"]}
];

HS.consultTopics = [
  {key:"三高", icon:"❤️", name:"三高管理", desc:"高血压/高血脂/高血糖"},
  {key:"减脂", icon:"⚖️", name:"减脂塑形", desc:"科学减脂 + 营养搭配"},
  {key:"肠胃", icon:"🌿", name:"肠胃调理", desc:"便秘/腹泻/菌群平衡"},
  {key:"助眠", icon:"🌙", name:"睡眠改善", desc:"入睡难/易醒/多梦"},
  {key:"母婴", icon:"🤱", name:"母婴营养", desc:"孕期/哺乳期/婴幼儿"},
  {key:"运动", icon:"💪", name:"运动营养", desc:"增肌/塑形/恢复"},
  {key:"术后", icon:"🏥", name:"术后康复", desc:"术后/放化疗营养"},
  {key:"亚健康", icon:"🌱", name:"亚健康调理", desc:"疲劳/乏力/免疫低"}
];

HS.myBookings = [
  {id:"BK20260825001", advisor:"林悦", topic:"三高管理", date:"2026-08-25", time:"14:00", status:"completed", price:0,    rating:5},
  {id:"BK20260904002", advisor:"周易", topic:"睡眠改善", date:"2026-09-04", time:"19:00", status:"upcoming",  price:498,  rating:0}
];

/* ========== 售后评价记录 ========== */
HS.aftersaleRatings = [
  {id:"AS000", orderId:"ORD20260701001", type:"仅退款", rating:5, content:"客服小美很负责,退款 24h 到账 👍", date:"2026-07-02"}
];

/* ========== 后台管理 - 商家端 ========== */
HS.adminAuth = {isAdmin:false, name:"", role:""};

HS.adminStats = {
  today:  {sales: 8960,  orders: 28, newUsers: 12, conversion: "4.2%"},
  month:  {sales: 248000, orders: 826, newUsers: 386, conversion: "4.6%"},
  pending: {aftersales: 3, lowStock: 2, consultQueue: 5, reviewsToReply: 8}
};

HS.staffList = [
  {id:"S01", name:"黄巍",   role:"创始人 · 店长",   avatar:"巍", status:"online", lastActive:"刚刚"},
  {id:"S02", name:"小厚",   role:"客服主管",       avatar:"厚", status:"online", lastActive:"刚刚"},
  {id:"S03", name:"小美",   role:"售后主管",       avatar:"美", status:"online", lastActive:"5 分钟前"},
  {id:"S04", name:"小药",   role:"商品运营",       avatar:"药", status:"away",   lastActive:"30 分钟前"},
  {id:"S05", name:"小财",   role:"财务",          avatar:"财", status:"offline",lastActive:"2 小时前"}
];

HS.customerList = [
  {id:"U10001", name:"张先生", phone:"139****1234", vip:"VIP1", points:1280, orders:5,  spent:1280, lastOrder:"3 天前"},
  {id:"U10002", name:"李女士", phone:"138****5678", vip:"VIP2", points:3680, orders:12, spent:4980, lastOrder:"昨天"},
  {id:"U10003", name:"王先生", phone:"137****9012", vip:"普通",  points:180,  orders:1,  spent:128,  lastOrder:"1 周前"},
  {id:"U10004", name:"陈女士", phone:"136****3456", vip:"VIP1", points:2380, orders:8,  spent:2156, lastOrder:"今天"},
  {id:"U10005", name:"刘先生", phone:"135****7890", vip:"普通",  points:580,  orders:3,  spent:894,  lastOrder:"2 周前"},
  {id:"U10006", name:"周女士", phone:"134****2345", vip:"VIP3", points:8960, orders:24, spent:12860,lastOrder:"今天"}
];

HS.adminOrders = [
  {id:"ORD20260904001", date:"2026-09-04 11:24", customer:"陈女士", items:3, total:598, status:"pending",   pay:"微信"},
  {id:"ORD20260904002", date:"2026-09-04 10:58", customer:"周女士", items:1, total:128, status:"pending",   pay:"支付宝"},
  {id:"ORD20260904003", date:"2026-09-04 10:32", customer:"李女士", items:5, total:1280,status:"shipped",   pay:"微信"},
  {id:"ORD20260904004", date:"2026-09-04 09:15", customer:"张先生", items:2, total:336, status:"shipped",   pay:"微信"},
  {id:"ORD20260903005", date:"2026-09-03 21:42", customer:"刘先生", items:1, total:98,  status:"shipped",   pay:"银行卡"},
  {id:"ORD20260903006", date:"2026-09-03 18:24", customer:"陈女士", items:2, total:236, status:"completed", pay:"微信"},
  {id:"ORD20260902007", date:"2026-09-02 15:30", customer:"王先生", items:1, total:298, status:"completed", pay:"支付宝"},
  {id:"ORD20260901008", date:"2026-09-01 09:50", customer:"周女士", items:8, total:1856,status:"aftersales",pay:"微信"}
];

HS.consultQueue = [
  {id:"C01", user:"李女士", topic:"三高管理", advisor:"林悦", waitTime:"3 分钟", priority:"high"},
  {id:"C02", user:"张先生", topic:"肠胃调理", advisor:"周易", waitTime:"5 分钟", priority:"mid"},
  {id:"C03", user:"周女士", topic:"减脂塑形", advisor:"张驰", waitTime:"8 分钟", priority:"mid"},
  {id:"C04", user:"陈女士", topic:"睡眠改善", advisor:"周易", waitTime:"12 分钟",priority:"low"},
  {id:"C05", user:"刘先生", topic:"运动营养", advisor:"张驰", waitTime:"15 分钟",priority:"low"}
];

HS.adminProducts = HS.products.slice(); // 同步商品数据,后台可编辑

