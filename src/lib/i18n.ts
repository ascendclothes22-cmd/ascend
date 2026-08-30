export type Locale = "en" | "ar" | "fr";

export const locales: { code: Locale; name: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", name: "English", dir: "ltr" },
  { code: "ar", name: "العربية", dir: "rtl" },
  { code: "fr", name: "Français", dir: "ltr" },
];

type TranslationKeys = {
  // Navigation
  shop: string;
  about: string;
  contact: string;
  faq: string;
  blog: string;
  trackOrder: string;
  myAccount: string;
  admin: string;
  cart: string;
  checkout: string;

  // Hero
  heroTag: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroTitleLine3: string;
  heroSubtitle: string;
  shopCollection: string;
  exploreDrop: string;
  scroll: string;

  // Brand Story
  ourStory: string;
  bornFrom: string;
  bornFromAccent: string;
  storyP1: string;
  storyP2: string;
  storyP3: string;
  premiumQuality: string;
  community: string;
  theGrind: string;

  // Featured Products
  featured: string;
  essentialCollection: string;
  viewAll: string;
  quickAdd: string;
  addToCart: string;

  // Best Sellers
  bestSellers: string;
  bestSellersDesc: string;

  // Drop Section
  currentDrop: string;
  dropStory: string;
  dropStoryText: string;
  shopDrop: string;
  dropEndsIn: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  limitedEdition: string;

  // Testimonials
  testimonials: string;
  communitySpeaks: string;

  // Newsletter
  joinMovement: string;
  neverMissADrop: string;
  newsletterDesc: string;
  enterEmail: string;
  subscribe: string;
  subscribedMsg: string;
  noSpam: string;

  // Shop
  shopAscend: string;
  shopDesc: string;
  searchProducts: string;
  filter: string;
  categories: string;
  allProducts: string;
  noProducts: string;
  clearFilters: string;

  // Product
  sizeGuide: string;
  description: string;
  reviews: string;
  relatedProducts: string;
  quantity: string;
  color: string;
  size: string;
  freeShipping: string;
  premiumQualityBadge: string;
  easyReturns: string;
  cashOnDelivery: string;
  freeShippingOver: string;
  backToShop: string;
  youMayAlsoLike: string;
  noReviews: string;

  // Cart
  yourCart: string;
  cartEmpty: string;
  cartEmptyDesc: string;
  startShopping: string;
  orderSummary: string;
  subtotal: string;
  discount: string;
  shipping: string;
  total: string;
  proceedToCheckout: string;
  continueShopping: string;
  couponCode: string;
  apply: string;
  remove: string;
  free: string;
  codNotice: string;

  // Checkout
  deliveryInformation: string;
  fullName: string;
  phoneNumber: string;
  city: string;
  deliveryAddress: string;
  orderNotes: string;
  optional: string;
  placeOrder: string;
  yourOrder: string;
  backToCart: string;
  orderConfirmed: string;
  orderConfirmedMsg: string;
  orderNumber: string;
  orderSuccessMsg: string;
  trackYourOrder: string;

  // About
  aboutAscend: string;
  aboutHeroDesc: string;
  ourMission: string;
  pressureMakes: string;
  pressureMakesAccent: string;
  missionP1: string;
  missionP2: string;
  missionP3: string;
  ourValues: string;
  whatWeStandFor: string;
  discipline: string;
  disciplineDesc: string;
  resilience: string;
  resilienceDesc: string;
  communityVal: string;
  communityValDesc: string;
  excellence: string;
  excellenceDesc: string;
  communityMembers: string;
  products: string;

  // Contact
  getInTouch: string;
  contactDesc: string;
  email: string;
  phone: string;
  location: string;
  name: string;
  subject: string;
  message: string;
  sendMessage: string;
  messageSent: string;
  messageSentDesc: string;

  // FAQ
  faqTitle: string;
  searchQuestions: string;

  // Dashboard
  myDashboard: string;
  orders: string;
  profile: string;
  orderHistory: string;
  savedAddresses: string;
  wishlist: string;
  profileInformation: string;
  saveChanges: string;

  // Track Order
  wheresMyOrder: string;
  enterOrderNumber: string;
  track: string;
  orderNotFound: string;
  orderNotFoundDesc: string;
  deliveryDetails: string;

  // Admin
  adminPanel: string;
  dashboard: string;
  totalOrders: string;
  revenue: string;
  customers: string;
  conversion: string;
  dailySales: string;
  topProducts: string;
  addProduct: string;
  editProduct: string;
  deleteProduct: string;
  searchOrders: string;
  inventory: string;
  analytics: string;
  exportCSV: string;
  lowStockAlert: string;

  // Footer
  company: string;
  legal: string;
  termsOfService: string;
  privacyPolicy: string;
  shippingPolicy: string;
  returnsPolicy: string;
  allRightsReserved: string;

  // Blog
  blogTitle: string;
  blogDesc: string;
  readMore: string;
  backToBlog: string;
  motivation: string;
  fitness: string;
  disciplineBlog: string;
  streetwear: string;
  lifestyle: string;
  all: string;

  // Common
  home: string;
  loadMore: string;
  noResults: string;
  newArrival: string;
  sale: string;
  limited: string;
  newArrivals: string;

  // Stats
  statsPremiumQuality: string;
  statsCotton: string;
  statsOversizedFit: string;
  statsFastDelivery: string;
};

const translations: Record<Locale, TranslationKeys> = {
  en: {
    // Navigation
    shop: "Shop",
    about: "About",
    contact: "Contact",
    faq: "FAQ",
    blog: "Blog",
    trackOrder: "Track Order",
    myAccount: "My Account",
    admin: "Admin",
    cart: "Cart",
    checkout: "Checkout",

    // Hero
    heroTag: "Season 01 — Now Available",
    heroTitleLine1: "ASCEND",
    heroTitleLine2: "ABOVE",
    heroTitleLine3: "",
    heroSubtitle: "Premium streetwear for those who refuse to stay average.",
    shopCollection: "Shop Collection",
    exploreDrop: "Explore Drop",
    scroll: "Scroll",

    // Brand Story
    ourStory: "Our Story",
    bornFrom: "Born From",
    bornFromAccent: "Adversity",
    storyP1: "ASCEND was born from a simple truth: greatness isn't given — it's forged. Every piece we create carries the weight of late nights, early mornings, and the relentless pursuit of becoming better than yesterday.",
    storyP2: "We don't make clothing for everyone. We make it for the ones who choose discipline over comfort, growth over complacency, and purpose over ease. This is armor for the self-made.",
    storyP3: "Our mission is to represent the mindset of those who rise through pressure. Every stitch, every design, every detail — forged with intention.",
    premiumQuality: "Premium Quality",
    community: "Community",
    theGrind: "The Grind",

    // Featured Products
    featured: "Featured",
    essentialCollection: "Essential Collection",
    viewAll: "View All →",
    quickAdd: "Quick Add",
    addToCart: "Add to Cart",

    // Best Sellers
    bestSellers: "Best Sellers",
    bestSellersDesc: "The crowd favorites. Tried, tested, and loved by thousands.",

    // Drop Section
    currentDrop: "Current Drop",
    dropStory: "The Story Behind Drop 001",
    dropStoryText: "DROP 001 is our debut collection — forged through months of relentless design iteration, fabric testing, and community feedback. Every piece tells a story of discipline and ambition. This isn't just clothing; it's a statement.",
    shopDrop: "Shop Drop",
    dropEndsIn: "Drop Ends In",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    limitedEdition: "Limited Edition",

    // Testimonials
    testimonials: "Testimonials",
    communitySpeaks: "The Community Speaks",

    // Newsletter
    joinMovement: "Join The Movement",
    neverMissADrop: "Never Miss a Drop",
    newsletterDesc: "Be the first to know about new releases, exclusive drops, and members-only discounts.",
    enterEmail: "Enter your email",
    subscribe: "Subscribe",
    subscribedMsg: "You're in. Welcome to ASCEND.",
    noSpam: "No spam. Unsubscribe anytime.",

    // Shop
    shopAscend: "Shop ASCEND",
    shopDesc: "Every piece forged with purpose. Built for the relentless.",
    searchProducts: "Search products...",
    filter: "Filter",
    categories: "Categories",
    allProducts: "All Products",
    noProducts: "No products found",
    clearFilters: "Clear filters",

    // Product
    sizeGuide: "Size Guide",
    description: "Description",
    reviews: "Reviews",
    relatedProducts: "Related Products",
    quantity: "Quantity",
    color: "Color",
    size: "Size",
    freeShipping: "Free Shipping",
    premiumQualityBadge: "Premium Quality",
    easyReturns: "Easy Returns",
    cashOnDelivery: "Cash on Delivery",
    freeShippingOver: "Free shipping over $100",
    backToShop: "Back to Shop",
    youMayAlsoLike: "You May Also Like",
    noReviews: "No reviews yet.",

    // Cart
    yourCart: "Your Cart",
    cartEmpty: "Your cart is empty",
    cartEmptyDesc: "Start building your ASCEND collection.",
    startShopping: "Start Shopping",
    orderSummary: "Order Summary",
    subtotal: "Subtotal",
    discount: "Discount",
    shipping: "Shipping",
    total: "Total",
    proceedToCheckout: "Proceed to Checkout",
    continueShopping: "Continue Shopping",
    couponCode: "Coupon code",
    apply: "Apply",
    remove: "Remove",
    free: "Free",
    codNotice: "Cash on Delivery • Pay when you receive your order",

    // Checkout
    deliveryInformation: "Delivery Information",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    city: "City",
    deliveryAddress: "Delivery Address",
    orderNotes: "Order Notes",
    optional: "Optional",
    placeOrder: "Place Order",
    yourOrder: "Your Order",
    backToCart: "Back to Cart",
    orderConfirmed: "Order Confirmed",
    orderConfirmedMsg: "Your order has been placed successfully.",
    orderNumber: "Order Number",
    orderSuccessMsg: "Your ASCEND order has been received. You'll receive a confirmation call shortly. Track your order anytime from your dashboard.",
    trackYourOrder: "Track Order",

    // About
    aboutAscend: "About ASCEND",
    aboutHeroDesc: "ASCEND was founded on one belief: the best things in life are forged through pressure. We create premium streetwear for the disciplined, the driven, and the relentless.",
    ourMission: "Our Mission",
    pressureMakes: "Pressure Makes",
    pressureMakesAccent: "Diamonds",
    missionP1: "ASCEND represents everything it means to rise above. We're not just a clothing brand — we're a declaration that you refuse to stay average.",
    missionP2: "Every product is designed with intention. The weight of the fabric, the precision of the stitching, the boldness of the design — all calculated to make you feel like you can conquer anything.",
    missionP3: "We cater to the gym enthusiasts who grind daily, the entrepreneurs who build relentlessly, the self-improvement warriors who never stop evolving. This is your armor.",
    ourValues: "Our Values",
    whatWeStandFor: "What We Stand For",
    discipline: "Discipline",
    disciplineDesc: "Every piece is built with the same discipline we expect from ourselves. No shortcuts, no compromises.",
    resilience: "Resilience",
    resilienceDesc: "Forged through pressure. We design for those who push through every obstacle and come out stronger.",
    communityVal: "Community",
    communityValDesc: "More than a brand — a movement. We're building a community of individuals committed to growth.",
    excellence: "Excellence",
    excellenceDesc: "Premium quality isn't a feature — it's our standard. Every stitch, every detail matters.",
    communityMembers: "Community Members",
    products: "Products",

    // Contact
    getInTouch: "Get In Touch",
    contactDesc: "Have a question? We're here to help. Reach out anytime.",
    email: "Email",
    phone: "Phone",
    location: "Location",
    name: "Name",
    subject: "Subject",
    message: "Message",
    sendMessage: "Send Message",
    messageSent: "Message Sent",
    messageSentDesc: "Thank you for reaching out. We'll get back to you within 24 hours.",

    // FAQ
    faqTitle: "Frequently Asked Questions",
    searchQuestions: "Search questions...",

    // Dashboard
    myDashboard: "My Dashboard",
    orders: "Orders",
    profile: "Profile",
    orderHistory: "Order History",
    savedAddresses: "Saved Addresses",
    wishlist: "Wishlist",
    profileInformation: "Profile Information",
    saveChanges: "Save Changes",

    // Track Order
    wheresMyOrder: "Where's My Order?",
    enterOrderNumber: "Enter order number (e.g., ASC-2025-0001)",
    track: "Track",
    orderNotFound: "Order Not Found",
    orderNotFoundDesc: "We couldn't find an order with that number. Please check and try again.",
    deliveryDetails: "Delivery Details",

    // Admin
    adminPanel: "ADMIN PANEL",
    dashboard: "Dashboard",
    totalOrders: "Total Orders",
    revenue: "Revenue",
    customers: "Customers",
    conversion: "Conversion",
    dailySales: "Daily Sales",
    topProducts: "Top Products",
    addProduct: "Add Product",
    editProduct: "Edit Product",
    deleteProduct: "Delete",
    searchOrders: "Search orders...",
    inventory: "Inventory",
    analytics: "Analytics",
    exportCSV: "Export CSV",
    lowStockAlert: "Low Stock Alert",

    // Footer
    company: "Company",
    legal: "Legal",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    shippingPolicy: "Shipping Policy",
    returnsPolicy: "Returns Policy",
    allRightsReserved: "All rights reserved.",

    // Blog
    blogTitle: "The ASCEND Journal",
    blogDesc: "Stories, insights, and motivation for the relentless.",
    readMore: "Read More",
    backToBlog: "← Back to Blog",
    motivation: "Motivation",
    fitness: "Fitness",
    disciplineBlog: "Discipline",
    streetwear: "Streetwear",
    lifestyle: "Lifestyle",
    all: "All",

    // Common
    home: "Home",
    loadMore: "Load More",
    noResults: "No results found",
    newArrival: "New",
    sale: "Sale",
    limited: "Limited",
    newArrivals: "New Arrivals",

    // Stats
    statsPremiumQuality: "Premium Quality",
    statsCotton: "100% Cotton",
    statsOversizedFit: "Oversized Fit",
    statsFastDelivery: "Fast Delivery",
  },

  ar: {
    // Navigation
    shop: "المتجر",
    about: "من نحن",
    contact: "اتصل بنا",
    faq: "الأسئلة الشائعة",
    blog: "المدونة",
    trackOrder: "تتبع الطلب",
    myAccount: "حسابي",
    admin: "الإدارة",
    cart: "السلة",
    checkout: "الدفع",

    // Hero
    heroTag: "الموسم 01 — متاح الآن",
    heroTitleLine1: "اصعد",
    heroTitleLine2: "فوق",
    heroTitleLine3: "",
    heroSubtitle: "ملابس شارع فاخرة لمن يرفض البقاء عاديًا.",
    shopCollection: "تسوق المجموعة",
    exploreDrop: "استكشف الإصدار",
    scroll: "اسحب",

    // Brand Story
    ourStory: "قصتنا",
    bornFrom: "وُلد من",
    bornFromAccent: "الصعوبات",
    storyP1: "وُلد ASCEND من حقيقة بسيطة: العظيمة لا تُمنح — بل تُصاغ. كل قطعة نصنعها تحمل ثقل الليالي المتأخرة والأarrisonات المبكرة والسعي الدؤوب لـ Became أفضل من الأمس.",
    storyP2: "نحن لا نصنع الملابس للجميع. نصنعها لأولئك يختارون الانضباط بدل الراحة، والنمو بدل الرضا، والهدف بدل السهولة. هذا دروع صانعي أنفسهم.",
    storyP3: "مهمتنا تمثل عقلية أولئك ينهضون بالضغط. كل غرزة، كل تصميم، كل تفصيل — مصاغ بقصد.",
    premiumQuality: "جودة ممتازة",
    community: "المجتمع",
    theGrind: "الكدح",

    // Featured Products
    featured: "مميزة",
    essentialCollection: "المجموعة الأساسية",
    viewAll: "عرض الكل ←",
    quickAdd: "إضافة سريعة",
    addToCart: "أضف إلى السلة",

    // Best Sellers
    bestSellers: "الأكثر مبيعًا",
    bestSellersDesc: "المفضلات لدى الجميع. جربت وختبرت وأحبها الآلاف.",

    // Drop Section
    currentDrop: "الإصدار الحالي",
    dropStory: "القصة خلف الإصدار 001",
    dropStoryText: "الإصدار 001 هو مجموعتنا الأولى — مصاغة من أشهر من إعادة التصميم الدؤوبة وتجربة الأقمشة والملاحظات من المجتمع. كل قطعة تروي قصة الانضباط والطموح. هذا ليس مجرد ملابس — إنه بيان.",
    shopDrop: "تسوق الإصدار",
    dropEndsIn: "ينتهي الإصدار خلال",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثواني",
    limitedEdition: "إصدار محدود",

    // Testimonials
    testimonials: "الشهادات",
    communitySpeaks: "المجتمع يتحدث",

    // Newsletter
    joinMovement: "انضم للحركة",
    neverMissADrop: "لا تفوت أي إصدار",
    newsletterDesc: "كن أول من يعرف عن الإصدارات الجديدة والhxclusives والخصومات الحصرية.",
    enterEmail: "أدخل بريدك الإلكتروني",
    subscribe: "اشترك",
    subscribedMsg: "أنت في. مرحبًا بك في ASCEND.",
    noSpam: "بدون بريد مزعج. يمكنك إلغاء الاشتراك في أي وقت.",

    // Shop
    shopAscend: "تسوق ASCEND",
    shopDesc: "كل قطعة مصاغة بقصد. مصنوعة لل Daghd.",
    searchProducts: "ابحث عن المنتجات...",
    filter: "تصفية",
    categories: "الفئات",
    allProducts: "جميع المنتجات",
    noProducts: "لم يتم العثور على منتجات",
    clearFilters: "مسح الفلاتر",

    // Product
    sizeGuide: "دليل المقاسات",
    description: "الوصف",
    reviews: "المراجعات",
    relatedProducts: "منتجات ذات صلة",
    quantity: "الكمية",
    color: "اللون",
    size: "المقاس",
    freeShipping: "شحن مجاني",
    premiumQualityBadge: "جودة ممتازة",
    easyReturns: "إرجاع سهل",
    cashOnDelivery: "الدفع عند الاستلام",
    freeShippingOver: "شحن مجاني فوق 100$",
    backToShop: "العودة للمتجر",
    youMayAlsoLike: "قد يعجبك أيضًا",
    noReviews: "لا توجد مراجعات بعد.",

    // Cart
    yourCart: "سلتك",
    cartEmpty: "سلتك فارغة",
    cartEmptyDesc: "ابدأ في بناء مجموعة ASCEND الخاصة بك.",
    startShopping: "ابدأ التسوق",
    orderSummary: "ملخص الطلب",
    subtotal: "المجموع الفرعي",
    discount: "الخصم",
    shipping: "الشحن",
    total: "المجموع",
    proceedToCheckout: "إتمام الطلب",
    continueShopping: "متابعة التسوق",
    couponCode: "كود الخصم",
    apply: "تطبيق",
    remove: "إزالة",
    free: "مجاني",
    codNotice: "الدفع عند الاستلام • ادفع عند استلام طلبك",

    // Checkout
    deliveryInformation: "معلومات التوصيل",
    fullName: "الاسم الكامل",
    phoneNumber: "رقم الهاتف",
    city: "المدينة",
    deliveryAddress: "عنوان التوصيل",
    orderNotes: "ملاحظات الطلب",
    optional: "اختياري",
    placeOrder: "تأكيد الطلب",
    yourOrder: "طلبك",
    backToCart: "العودة للسلة",
    orderConfirmed: "تم تأكيد الطلب",
    orderConfirmedMsg: "تم تقديم طلبك بنجاح.",
    orderNumber: "رقم الطلب",
    orderSuccessMsg: "تم استلام طلب ASCEND الخاص بك. ستتلقى مكالمة تأكيد قريبًا. تتبع طلبك في أي وقت من لوحة التحكم.",
    trackYourOrder: "تتبع الطلب",

    // About
    aboutAscend: "عن ASCEND",
    aboutHeroDesc: "تأسس ASCEND على إيمان واحد: أفضل الأشياء في الحياة تُصاغ من خلال الضغط. نحن نصنع ملابس شارع فاخرة للمنضبطة والمجدية وال Daghd.",
    ourMission: "مهمتنا",
    pressureMakes: "الضغط يصنع",
    pressureMakesAccent: "الماس",
    missionP1: "ASCEND يمثل كل ما يعنيه الصعود. نحن لسنا مجرد علامة تجارية للملابس — نحن إعلان بأنك ترفض البقاء عاديًا.",
    missionP2: "كل منتج مصمم بقصد. وزن القماش، ودقة الغرز، وجرأة التصميم — كلها محسوبة لإ_Component أن تشعر أنك تستطيعghi أي شيء.",
    missionP3: "نخدم عشاق الرياضة الذين يكدحون يوميًا، ورواد الأعمال الذين يبنون بلا توقف، ومحاربي تطوير الذات الذين يتوقفون عن التطور أبدًا. هذا دروعك.",
    ourValues: "قيمنا",
    whatWeStandFor: "ما نؤمن به",
    discipline: "الانضباط",
    disciplineDesc: "كل قطعة مبنية بنفس الانضباط الذي نتوقعه من أنفسنا. بلا اختصار، بلا تنازل.",
    resilience: "المرونة",
    resilienceDesc: "مصنوعة من خلال الضغط. نصمم لأولئك يتغلبون على كل عائق ويخرجون أقوى.",
    communityVal: "المجتمع",
    communityValDesc: "أكثر من علامة تجارية — حركة. نحن نبني مجتمعًا من الأفراد الملتزمين بالنمو.",
    excellence: "التميز",
    excellenceDesc: "الجودة الممتازة ليست ميزة — إنها معيارنا. كل غرزة، كل تفصيل مهم.",
    communityMembers: "أعضاء المجتمع",
    products: "المنتجات",

    // Contact
    getInTouch: "تواصل معنا",
    contactDesc: "هل لديك سؤال؟ نحن هنا للمساعدة. تواصل معنا في أي وقت.",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    location: "الموقع",
    name: "الاسم",
    subject: "الموضوع",
    message: "الرسالة",
    sendMessage: "إرسال الرسالة",
    messageSent: "تم إرسال الرسالة",
    messageSentDesc: "شكرًا لتواصلك. سنرد عليك خلال 24 ساعة.",

    // FAQ
    faqTitle: "الأسئلة الشائعة",
    searchQuestions: "ابحث عن الأسئلة...",

    // Dashboard
    myDashboard: "لوحة التحكم",
    orders: "الطلبات",
    profile: "الملف الشخصي",
    orderHistory: "سجل الطلبات",
    savedAddresses: "العناوين المحفوظة",
    wishlist: "قائمة الأمنيات",
    profileInformation: "معلومات الملف الشخصي",
    saveChanges: "حفظ التغييرات",

    // Track Order
    wheresMyOrder: "أين طلبي؟",
    enterOrderNumber: "أدخل رقم الطلب (مثال: ASC-2025-0001)",
    track: "تتبع",
    orderNotFound: "الطلب غير موجود",
    orderNotFoundDesc: "لم نتمكن من العثور على طلب بهذا الرقم. يرجى التحقق والمحاولة مرة أخرى.",
    deliveryDetails: "تفاصيل التوصيل",

    // Admin
    adminPanel: "لوحة الإدارة",
    dashboard: "لوحة التحكم",
    totalOrders: "إجمالي الطلبات",
    revenue: "الإيرادات",
    customers: "العملاء",
    conversion: "التحويل",
    dailySales: "المبيعات اليومية",
    topProducts: "المنتجات الأفضل",
    addProduct: "إضافة منتج",
    editProduct: "تعديل منتج",
    deleteProduct: "حذف",
    searchOrders: "ابحث عن الطلبات...",
    inventory: "المخزون",
    analytics: "التحليلات",
    exportCSV: "تصدير CSV",
    lowStockAlert: "تنبيه مخزون منخفض",

    // Footer
    company: "الشركة",
    legal: "قانوني",
    termsOfService: "شروط الخدمة",
    privacyPolicy: "سياسة الخصوصية",
    shippingPolicy: "سياسة الشحن",
    returnsPolicy: "سياسة الإرجاع",
    allRightsReserved: "جميع الحقوق محفوظة.",

    // Blog
    blogTitle: "مجلة ASCEND",
    blogDesc: "قصص ورؤى ودافع للdaghd.",
    readMore: "اقرأ المزيد",
    backToBlog: "← العودة للمدونة",
    motivation: "الدافع",
    fitness: "اللياقة",
    disciplineBlog: "الانضباط",
    streetwear: "ملابس الشارع",
    lifestyle: "نمط الحياة",
    all: "الكل",

    // Common
    home: "الرئيسية",
    loadMore: "تحميل المزيد",
    noResults: "لم يتم العثور على نتائج",
    newArrival: "جديد",
    sale: "تخفيض",
    limited: "محدود",
    newArrivals: "وصل حديثًا",

    // Stats
    statsPremiumQuality: "جودة ممتازة",
    statsCotton: "100% قطن",
    statsOversizedFit: "مقاس واسع",
    statsFastDelivery: "توصيل سريع",
  },

  fr: {
    // Navigation
    shop: "Boutique",
    about: "À propos",
    contact: "Contact",
    faq: "FAQ",
    blog: "Blog",
    trackOrder: "Suivi de commande",
    myAccount: "Mon compte",
    admin: "Admin",
    cart: "Panier",
    checkout: "Paiement",

    // Hero
    heroTag: "Saison 01 — Maintenant disponible",
    heroTitleLine1: "ASCEND",
    heroTitleLine2: "AU-DESSUS",
    heroTitleLine3: "",
    heroSubtitle: "Streetwear premium pour ceux qui refusent de rester ordinaires.",
    shopCollection: "Acheter la collection",
    exploreDrop: "Découvrir la collection",
    scroll: "Défiler",

    // Brand Story
    ourStory: "Notre histoire",
    bornFrom: "Né de",
    bornFromAccent: "l'Adversité",
    storyP1: "ASCEND est né d'une vérité simple : la grandeur n'est pas donnée — elle est forgée. Chaque pièce que nous créons porte le poids des nuits tardives, des matinées précoces et de la quête relentless de devenir meilleur qu'hier.",
    storyP2: "Nous ne créons pas des vêtements pour tout le monde. Nous les créons pour ceux qui choisissent la discipline plutôt que le confort, la croissance plutôt que la complaisance, et le but plutôt que la facilité. C'est l'armure des autodidactes.",
    storyP3: "Notre mission est de représenter l'état d'esprit de ceux qui s'élèvent sous la pression. Chaque couture, chaque design, chaque détail — forgé avec intention.",
    premiumQuality: "Qualité Premium",
    community: "Communauté",
    theGrind: "L'Effort",

    // Featured Products
    featured: "En vedette",
    essentialCollection: "Collection Essentielle",
    viewAll: "Voir tout →",
    quickAdd: "Ajout rapide",
    addToCart: "Ajouter au panier",

    // Best Sellers
    bestSellers: "Meilleures ventes",
    bestSellersDesc: "Les favoris de la foule. Essayés, testés et adorés par des milliers.",

    // Drop Section
    currentDrop: "Collection actuelle",
    dropStory: "L'histoire derrière Drop 001",
    dropStoryText: "DROP 001 est notre collection de lancement — forgée après des mois d'itération de design, de test de tissus et de retours de la communauté. Chaque pièce raconte une histoire de discipline et d'ambition. Ce n'est pas juste des vêtements ; c'est une déclaration.",
    shopDrop: "Acheter la collection",
    dropEndsIn: "Se termine dans",
    days: "Jours",
    hours: "Heures",
    minutes: "Minutes",
    seconds: "Secondes",
    limitedEdition: "Édition limitée",

    // Testimonials
    testimonials: "Témoignages",
    communitySpeaks: "La communauté parle",

    // Newsletter
    joinMovement: "Rejoignez le mouvement",
    neverMissADrop: "Ne manquez aucune collection",
    newsletterDesc: "Soyez le premier à connaître les nouvelles sorties, les drops exclusifs et les réductions réservées aux membres.",
    enterEmail: "Entrez votre email",
    subscribe: "S'abonner",
    subscribedMsg: "Vous êtes inscrit. Bienvenue chez ASCEND.",
    noSpam: "Pas de spam. Désabonnez-vous à tout moment.",

    // Shop
    shopAscend: "Boutique ASCEND",
    shopDesc: "Chaque pièce forgée avec intention. Créée pour les relentless.",
    searchProducts: "Rechercher des produits...",
    filter: "Filtrer",
    categories: "Catégories",
    allProducts: "Tous les produits",
    noProducts: "Aucun produit trouvé",
    clearFilters: "Effacer les filtres",

    // Product
    sizeGuide: "Guide des tailles",
    description: "Description",
    reviews: "Avis",
    relatedProducts: "Produits similaires",
    quantity: "Quantité",
    color: "Couleur",
    size: "Taille",
    freeShipping: "Livraison gratuite",
    premiumQualityBadge: "Qualité premium",
    easyReturns: "Retours faciles",
    cashOnDelivery: "Paiement à la livraison",
    freeShippingOver: "Livraison gratuite à partir de 100$",
    backToShop: "Retour à la boutique",
    youMayAlsoLike: "Vous aimerez aussi",
    noReviews: "Pas encore d'avis.",

    // Cart
    yourCart: "Votre panier",
    cartEmpty: "Votre panier est vide",
    cartEmptyDesc: "Commencez à construire votre collection ASCEND.",
    startShopping: "Commencer à acheter",
    orderSummary: "Récapitulatif",
    subtotal: "Sous-total",
    discount: "Réduction",
    shipping: "Livraison",
    total: "Total",
    proceedToCheckout: "Passer au paiement",
    continueShopping: "Continuer vos achats",
    couponCode: "Code promo",
    apply: "Appliquer",
    remove: "Supprimer",
    free: "Gratuit",
    codNotice: "Paiement à la livraison • Payez à réception de votre commande",

    // Checkout
    deliveryInformation: "Informations de livraison",
    fullName: "Nom complet",
    phoneNumber: "Numéro de téléphone",
    city: "Ville",
    deliveryAddress: "Adresse de livraison",
    orderNotes: "Notes de commande",
    optional: "Optionnel",
    placeOrder: "Passer la commande",
    yourOrder: "Votre commande",
    backToCart: "Retour au panier",
    orderConfirmed: "Commande confirmée",
    orderConfirmedMsg: "Votre commande a été passée avec succès.",
    orderNumber: "Numéro de commande",
    orderSuccessMsg: "Votre commande ASCEND a été reçue. Vous recevrez un appel de confirmation sous peu. Suivez votre commande à tout moment depuis votre tableau de bord.",
    trackYourOrder: "Suivre la commande",

    // About
    aboutAscend: "À propos d'ASCEND",
    aboutHeroDesc: "ASCEND a été fondé sur une conviction : les meilleures choses de la vie sont forgées sous la pression. Nous créons du streetwear premium pour les disciplinés, les ambitieux et les relentless.",
    ourMission: "Notre mission",
    pressureMakes: "La pression fait les",
    pressureMakesAccent: "diamants",
    missionP1: "ASCEND représente tout ce que signifie s'élever. Nous ne sommes pas simplement une marque de vêtements — nous sommes une déclaration que vous refusez de rester ordinaire.",
    missionP2: "Chaque produit est conçu avec intention. Le poids du tissu, la précision des coutures, l'audace du design — tout est calculé pour vous faire sentir que vous pouvez conquérir n'importe quoi.",
    missionP3: "Nous servons les passionnés de sport qui s'efforcent quotidiennement, les entrepreneurs qui construisent sans relâche, les guerriers de l'amélioration personnelle qui ne cessent jamais d'évoluer. C'est votre armure.",
    ourValues: "Nos valeurs",
    whatWeStandFor: "Ce en quoi nous croyons",
    discipline: "Discipline",
    disciplineDesc: "Chaque pièce est construite avec la même discipline que nous attendons de nous-mêmes. Pas de raccourcis, pas de compromis.",
    resilience: "Résilience",
    resilienceDesc: "Forgé sous la pression. Nous concevons pour ceux qui surmontent chaque obstacle et en sortent plus forts.",
    communityVal: "Communauté",
    communityValDesc: "Plus qu'une marque — un mouvement. Nous construisons une communauté d'individus engagés vers la croissance.",
    excellence: "Excellence",
    excellenceDesc: "La qualité premium n'est pas une caractéristique — c'est notre standard. Chaque couture, chaque détail compte.",
    communityMembers: "Membres de la communauté",
    products: "Produits",

    // Contact
    getInTouch: "Contactez-nous",
    contactDesc: "Une question ? Nous sommes là pour vous aider. Contactez-nous à tout moment.",
    email: "Email",
    phone: "Téléphone",
    location: "Localisation",
    name: "Nom",
    subject: "Sujet",
    message: "Message",
    sendMessage: "Envoyer le message",
    messageSent: "Message envoyé",
    messageSentDesc: "Merci de nous avoir contactés. Nous vous répondrons dans les 24 heures.",

    // FAQ
    faqTitle: "Foire aux questions",
    searchQuestions: "Rechercher des questions...",

    // Dashboard
    myDashboard: "Mon tableau de bord",
    orders: "Commandes",
    profile: "Profil",
    orderHistory: "Historique des commandes",
    savedAddresses: "Adresses sauvegardées",
    wishlist: "Liste de souhaits",
    profileInformation: "Informations du profil",
    saveChanges: "Enregistrer les modifications",

    // Track Order
    wheresMyOrder: "Où est ma commande ?",
    enterOrderNumber: "Entrez le numéro de commande (ex: ASC-2025-0001)",
    track: "Suivre",
    orderNotFound: "Commande non trouvée",
    orderNotFoundDesc: "Nous n'avons pas trouvé de commande avec ce numéro. Veuillez vérifier et réessayer.",
    deliveryDetails: "Détails de livraison",

    // Admin
    adminPanel: "PANNEAU ADMIN",
    dashboard: "Tableau de bord",
    totalOrders: "Total des commandes",
    revenue: "Revenus",
    customers: "Clients",
    conversion: "Conversion",
    dailySales: "Ventes quotidiennes",
    topProducts: "Meilleurs produits",
    addProduct: "Ajouter un produit",
    editProduct: "Modifier le produit",
    deleteProduct: "Supprimer",
    searchOrders: "Rechercher des commandes...",
    inventory: "Inventaire",
    analytics: "Analyses",
    exportCSV: "Exporter CSV",
    lowStockAlert: "Alerte stock bas",

    // Footer
    company: "Entreprise",
    legal: "Légal",
    termsOfService: "Conditions d'utilisation",
    privacyPolicy: "Politique de confidentialité",
    shippingPolicy: "Politique de livraison",
    returnsPolicy: "Politique de retours",
    allRightsReserved: "Tous droits réservés.",

    // Blog
    blogTitle: "Le Journal ASCEND",
    blogDesc: "Histoires, insights et motivation pour les relentless.",
    readMore: "Lire la suite",
    backToBlog: "← Retour au blog",
    motivation: "Motivation",
    fitness: "Forme physique",
    disciplineBlog: "Discipline",
    streetwear: "Streetwear",
    lifestyle: "Style de vie",
    all: "Tout",

    // Common
    home: "Accueil",
    loadMore: "Charger plus",
    noResults: "Aucun résultat trouvé",
    newArrival: "Nouveau",
    sale: "Promo",
    limited: "Limité",
    newArrivals: "Nouveautés",

    // Stats
    statsPremiumQuality: "Qualité premium",
    statsCotton: "100% Coton",
    statsOversizedFit: "Coupe oversize",
    statsFastDelivery: "Livraison rapide",
  },
};

let currentLocale: Locale = "en";

export function setLocale(locale: Locale) {
  currentLocale = locale;
  if (typeof document !== "undefined") {
    document.documentElement.lang = locale;
    document.documentElement.dir = locales.find((l) => l.code === locale)?.dir || "ltr";
    localStorage.setItem("ascend-locale", locale);
  }
}

export function getLocale(): Locale {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("ascend-locale") as Locale | null;
    if (stored && translations[stored]) {
      currentLocale = stored;
      return stored;
    }
  }
  return currentLocale;
}

export function t(key: keyof TranslationKeys): string {
  return translations[currentLocale]?.[key] || translations.en[key] || key;
}
