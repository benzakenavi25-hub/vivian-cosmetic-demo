/* =====================================================================
   SITE CONFIG — THE ONLY FILE YOU EDIT PER CLIENT
   ---------------------------------------------------------------------
   - Texts, contact details, treatments, quiz logic, colors and toggles.
   - Images: put files in /images and write the path in `images` below.
     Empty src = styled placeholder. See /images/README.md.
   - Search for "TODO" to find everything that still needs client data.
   ===================================================================== */

window.SITE_CONFIG = {
  /* ---------- Demo / global ---------- */
  demoMode: true,     // true = noindex + "גרסת הדגמה" note in the footer
  credit: "עיצוב ובנייה: Benzaken Studio",

  /* ---------- Colors (CSS variables) ----------
     onAccent = text color on accent buttons (keep AA contrast: white for
     deep accents, plum for light/bright accents like coral). */
  palette: {
    bg: "#FBF1EF",       // powder blush, main background
    rose: "#EFC9C3",     // dusty rose, cards / chips
    accent: "#D6336C",   // berry, ONLY primary buttons + key highlights
    onAccent: "#FFFFFF",
    ink: "#3A1E27",      // deep plum text
    inkSoft: "#7A5560",
    plum: "#2B1820"      // dark sections (booking + footer)
  },

  /* ---------- Optional sections (false = hidden, nav link removed) ---------- */
  sections: {
    promo: true,         // promo card in the treatments carousel + hero pill
    giftCard: true,      // gift card at the end of the treatments carousel
    quiz: true,          // quiz button + modal
    beforeAfter: true,
    testimonials: true,
    faq: true
  },

  /* ---------- Business ---------- */
  business: {
    name: "ויויאן קוסמטיק",
    nameEn: "Vivian Cosmetic",
    aka: "בוטיק ויויאן",
    ownerFirstName: "ויויאן",          // used in WhatsApp greetings
    tagline: "בוטיק לקוסמטיקה פרא-רפואית בהרצליה. מעל 35 שנות ניסיון."
  },

  contact: {
    phoneDisplay: "052-2892431",
    phoneIntl: "972522892431",         // tel: and wa.me links (no +, no dashes)
    whatsappIntl: "972522892431",
    email: "info@vcosmetic.co.il",
    street: "סוקולוב 13",
    city: "הרצליה",
    country: "IL",
    addressNote: "כניסה משמאל בפאסאז'",
    hoursShort: "א׳, ג׳–ה׳ 09:00–19:00 · ו׳ 08:30–15:00",
    wazeUrl: "https://waze.com/ul?q=%D7%A1%D7%95%D7%A7%D7%95%D7%9C%D7%95%D7%91%2013%20%D7%94%D7%A8%D7%A6%D7%9C%D7%99%D7%94&navigate=yes",
    defaultWhatsappMessage: "היי ויויאן, אשמח לקבוע תור 🙂"
  },

  /* Opening hours (used for SEO schema). day: 0 = Sunday ... 6 = Saturday */
  hours: [
    { day: 0, open: "09:00", close: "19:00" },
    { day: 2, open: "09:00", close: "19:00" },
    { day: 3, open: "09:00", close: "19:00" },
    { day: 4, open: "09:00", close: "19:00" },
    { day: 5, open: "08:30", close: "15:00" }
  ],

  // TODO: verify current Google rating before going live
  rating: {
    value: 4.7,
    count: 27,
    reviewsUrl: "#"   // TODO: paste the client's Google reviews link
  },

  /* ---------- SEO / sharing ---------- */
  seo: {
    title: "ויויאן קוסמטיק | קוסמטיקה פרא-רפואית בהרצליה",
    description: "בוטיק לקוסמטיקה פרא-רפואית בהרצליה עם מעל 35 שנות ניסיון: טיפול באקנה, הורדת כתמים, אנטי-אייג'ינג, מזותרפיה ופילינג. קביעת תור בוואטסאפ.",
    siteUrl: "https://benzakenavi25-hub.github.io/vivian-cosmetic-demo/",
    ogImage: "images/hero.png"
  },

  /* ---------- Navigation (section IDs) ---------- */
  nav: [
    { label: "טיפולים",   target: "treatments" },
    { label: "תוצאות",    target: "results" },
    { label: "עליי",      target: "about" },
    { label: "המלצות",    target: "testimonials" },
    { label: "שאלות",     target: "faq" },
    { label: "קביעת תור", target: "booking" }
  ],

  /* ---------- Hero ---------- */
  hero: {
    kicker: "Skin · Care · Results",
    titleLines: ["עור בריא.", "ביד שמכירה אותו 35 שנה."],
    text: "בוטיק לקוסמטיקה פרא-רפואית בהרצליה. אקנה, כתמים ואנטי-אייג'ינג, בטיפול אישי.",
    primaryCta: "קביעת תור בוואטסאפ",
    secondaryCta: "מצאי את הטיפול שלך",
    promoPill: "🎁 מתיחת פנים בחצי מחיר: ל-10 הראשונות",
    imageSlot: "hero",
    chips: [
      { text: "⭐ 4.7 בגוגל" },
      { text: "35+ שנות ניסיון" },
      { text: "90%+ הצלחה באקנה" }
    ]
  },

  /* ---------- Marquee ---------- */
  marquee: ["טיפולי פנים", "מזותרפיה", "טיפול באקנה", "הורדת כתמים", "אנטי-אייג'ינג", "פילינג", "פלזמה"],

  /* ---------- "מצאי את הטיפול שלך" (filters + carousel + quiz entry) ---------- */
  finder: {
    kicker: "הטיפולים",
    title: "מצאי את הטיפול שלך",
    text: "בחרי מה מעסיק אותך, וגללי בין הטיפולים שמתאימים לך.",
    quizCta: "לא בטוחה מה מתאים לך? 3 שאלות קצרות",
    filters: [
      { id: "all",          label: "הכל" },
      { id: "acne",         label: "אקנה" },
      { id: "pigmentation", label: "כתמים" },
      { id: "wrinkles",     label: "קמטים" },
      { id: "dull",         label: "עור עייף" },
      { id: "eyes",         label: "עיניים" },
      { id: "hair",         label: "הסרת שיער" },
      { id: "nails",        label: "ציפורניים" }
    ]
  },
  // TODO: confirm with client which concerns each treatment fits

  treatments: [
    { id: "facial",       name: "טיפולי פנים",            imageSlot: "treatment-facial",       concerns: ["dull"],
      description: "מגוון טיפולי פנים המותאמים לסוג העור ולתוצאה הרצויה.",
      duration: "XX דק'",      // TODO: real duration from client
      sessions: "לפי אבחון",
      price: "XXX" },          // TODO: real price from client
    { id: "acne",         name: "טיפול באקנה",            imageSlot: "treatment-acne",         concerns: ["acne"],
      description: "מעל 90% הצלחה, גם בהתפרצויות חמורות במיוחד.",
      duration: "XX דק'",      // TODO: real duration from client
      sessions: "לפי אבחון",
      price: "XXX" },          // TODO: real price from client
    { id: "mesotherapy",  name: "מזותרפיה",               imageSlot: "treatment-mesotherapy",  concerns: ["wrinkles", "dull", "pigmentation"],
      description: "מותאמת בעוצמה ובתכשירים לכל מטופלת.",
      duration: "XX דק'",      // TODO: real duration from client
      sessions: "לפי אבחון",
      price: "XXX" },          // TODO: real price from client
    { id: "pigmentation", name: "הורדת כתמים",            imageSlot: "treatment-pigmentation", concerns: ["pigmentation"],
      description: "כתמי שמש, פיגמנטציה, כתמי גיל וכתמים אחרי לידה.",
      duration: "XX דק'",      // TODO: real duration from client
      sessions: "לפי אבחון",
      price: "XXX" },          // TODO: real price from client
    { id: "antiaging",    name: "אנטי-אייג'ינג",          imageSlot: "treatment-antiaging",    concerns: ["wrinkles"],
      description: "הצערת העור, שיפור המראה וטיפול בנגעי הזמן.",
      duration: "XX דק'",      // TODO: real duration from client
      sessions: "לפי אבחון",
      price: "XXX" },          // TODO: real price from client
    { id: "peeling",      name: "פילינג מתקדם",           imageSlot: "treatment-peeling",      concerns: ["acne", "pigmentation", "dull", "wrinkles"],
      description: "מצעיר את העור באופן משמעותי ומחדש את המרקם.",
      duration: "XX דק'",      // TODO: real duration from client
      sessions: "לפי אבחון",
      price: "XXX" },          // TODO: real price from client
    { id: "eyes",         name: "טיפולי עיניים",          imageSlot: "treatment-eyes",         concerns: ["eyes"],
      description: "הצערת אזור העיניים והשבת החיוניות למבט.",
      duration: "XX דק'",      // TODO: real duration from client
      sessions: "לפי אבחון",
      price: "XXX" },          // TODO: real price from client
    { id: "plasma",       name: "טיפול פלזמה",            imageSlot: "treatment-plasma",       concerns: ["wrinkles", "eyes"],
      description: "טיפול פלזמה מקצועי, בהתאמה אישית אחרי אבחון.", // TODO: client's own description
      duration: "XX דק'",      // TODO: real duration from client
      sessions: "לפי אבחון",
      price: "XXX" },          // TODO: real price from client
    { id: "hair",         name: "הסרת שיער",              imageSlot: "treatment-hair",         concerns: ["hair"],
      description: "הסרת שיער מקצועית בסביבה אישית ונעימה.",
      duration: "XX דק'",      // TODO: real duration from client
      sessions: "לפי אזור",
      price: "XXX" },          // TODO: real price from client
    { id: "nails",        name: "בניית ציפורניים וג'ל לק", imageSlot: "treatment-nails",       concerns: ["nails"],
      description: "בנייה ולק ג'ל בגימור נקי ומוקפד.",
      duration: "XX דק'",      // TODO: real duration from client
      sessions: "לפי הצורך",
      price: "XXX" }           // TODO: real price from client
  ],

  /* ---------- Promo card (first card in the carousel) ----------
     endDate: "YYYY-MM-DD" (Israel time, ends 23:59). Empty = 14 days from today (demo).
     Hides automatically after the end date. */
  promo: {
    badge: "מבצע 50%",
    title: "מתיחת פנים ל-5 שנים ללא ניתוח",
    text: "50% הנחה ל-10 הנרשמות הראשונות בלבד.",
    endDate: "",
    concerns: ["wrinkles"],   // filters where the promo card also appears
    ctaText: "אני רוצה להצטרף",
    whatsappMessage: "היי ויויאן, ראיתי באתר את המבצע על מתיחת פנים ללא ניתוח בחצי מחיר. אשמח להצטרף 🙂"
  },

  /* ---------- Gift card (last card in the carousel) ---------- */
  giftCard: {
    title: "🎁 שובר מתנה",
    text: "מתנה מושלמת לחג, ליום הולדת, או סתם כי מגיע לה.",
    ctaText: "לרכישת שובר",
    whatsappMessage: "היי ויויאן, אשמח לרכוש שובר מתנה"
  },

  /* ---------- Skin quiz (opens in a modal) ----------
     Rules are checked top to bottom; the first rule whose `when` fields all
     match the answers wins. Unlisted fields = any answer. */
  quiz: {
    title: "מה מתאים לעור שלך?",
    questions: [
      { id: "concern", text: "מה הכי מציק לך כרגע?", options: [
        { value: "acne",         label: "אקנה" },
        { value: "pigmentation", label: "כתמים" },
        { value: "wrinkles",     label: "קמטים" },
        { value: "dull",         label: "עור עייף" },
        { value: "eyes",         label: "אזור העיניים" }
      ]},
      { id: "skin", text: "מה סוג העור שלך?", options: [
        { value: "oily",      label: "שמן" },
        { value: "dry",       label: "יבש" },
        { value: "combo",     label: "מעורב" },
        { value: "sensitive", label: "רגיש" },
        { value: "unsure",    label: "לא בטוחה" }
      ]},
      { id: "priority", text: "מה חשוב לך יותר?", options: [
        { value: "fast",   label: "תוצאה מהירה" },
        { value: "gentle", label: "טיפול עדין" },
        { value: "long",   label: "פתרון לטווח ארוך" }
      ]}
    ],
    rules: [
      { when: { concern: "acne" },                             treatment: "acne",         why: "הטיפול באקנה הוא ההתמחות של ויויאן, עם מעל 90% הצלחה, גם בהתפרצויות חמורות." },
      { when: { concern: "pigmentation", priority: "gentle" }, treatment: "mesotherapy",  why: "מזותרפיה מותאמת בעוצמה ובתכשירים, ומאפשרת לעבוד על כתמים בעדינות." },
      { when: { concern: "pigmentation" },                     treatment: "pigmentation", why: "טיפול ממוקד בכתמי שמש, פיגמנטציה, כתמי גיל וכתמים אחרי לידה." },
      { when: { concern: "wrinkles", priority: "fast" },       treatment: "peeling",      why: "פילינג מתקדם מצעיר את העור באופן משמעותי ומחדש את המרקם." },
      { when: { concern: "wrinkles" },                         treatment: "antiaging",    why: "תוכנית אנטי-אייג'ינג להצערת העור ולטיפול בנגעי הזמן, בהתאמה אישית." },
      { when: { concern: "dull", priority: "fast" },           treatment: "peeling",      why: "פילינג מתקדם מחזיר לעור זוהר ומרקם אחיד." },
      { when: { concern: "dull" },                             treatment: "facial",       why: "טיפול פנים מותאם לסוג העור שלך, להחזרת החיוניות והזוהר." },
      { when: { concern: "eyes" },                             treatment: "eyes",         why: "טיפול ממוקד להצערת אזור העיניים והשבת החיוניות למבט." }
    ],
    fallbackTreatment: "facial",
    skinNotes: {
      sensitive: "לעור רגיש נתאים עוצמה ותכשירים עדינים במיוחד.",
      unsure: "באבחון האישי נזהה יחד את סוג העור שלך."
    },
    whatsappMessage: "היי ויויאן, עשיתי את השאלון באתר והומלץ לי על {treatment}. אשמח לשמוע פרטים 🙂"
  },

  /* ---------- Before / After carousel ---------- */
  beforeAfter: {
    kicker: "תוצאות",
    title: "לפני ואחרי",
    note: "תוצאות משתנות מאדם לאדם",
    ctaText: "רוצה תוצאה כזו?",
    items: [
      { label: "טיפול באקנה · X טיפולים",   before: "ba-acne-before",      after: "ba-acne-after" },      // TODO: real case + number of sessions
      { label: "הורדת כתמים · X טיפולים",   before: "ba-pigment-before",   after: "ba-pigment-after" },   // TODO
      { label: "אנטי-אייג'ינג · X טיפולים", before: "ba-antiaging-before", after: "ba-antiaging-after" }, // TODO
      { label: "מזותרפיה · X טיפולים",      before: "ba-meso-before",      after: "ba-meso-after" }       // TODO
    ]
  },

  /* ---------- About ---------- */
  about: {
    kicker: "נעים להכיר",
    title: "35 שנה. אלפי מטופלות. גישה אחת: אישית.",
    paragraphs: [
      "אני ויויאן, קוסמטיקאית פרא-רפואית כבר מעל 35 שנה. עשרות רבות של השתלמויות בארץ ובעולם, ואלפי מטופלות ומטופלים בטיפולים מורכבים.",
      "אצלי אין טיפול סטנדרטי: כל עור מקבל תוכנית עבודה משלו, ואני איתך מהאבחון הראשון ועד שהתוצאה מגיעה."
    ],
    signature: "ויויאן",
    imageSlot: "about-vivian",
    values: [
      { icon: "search", title: "אבחון אישי" },
      { icon: "flask",  title: "חומרים מקצועיים" },
      { icon: "heart",  title: "ליווי עד התוצאה" }
    ]
  },

  /* ---------- Testimonials (real, from the client's site) ---------- */
  testimonials: {
    kicker: "המלצות",
    title: "מה הן מספרות",
    intervalMs: 5000,
    items: [
      { name: "ליאת א.",   treatment: "טיפול פנים",  text: "באתי אלייך ללא צפייה! וכבר אחרי טיפול אחד, חיכיתי לטיפול הבא. המצב בכל טיפול הלך והשתפר ואת מהתחלה היית שם תמיד לעודד." },
      { name: "רונה כ.",   treatment: "מזותרפיה",   text: "אחרי שניסיתי הכל וכלום לא עזר, לא האמנתי שיש סיכוי שהפנים שלי יהיו חלקות וללא פצעים. אך למזלי הגעתי אלייך." },
      { name: "ליאורה א.", treatment: "הסרת כתמים", text: "רציתי להודות לך על כל הטיפול שהשקעת בי, בזכותך אני נראית ומרגישה הרבה יותר טוב. טיפלת בי מכל הלב והנשמה עם הרבה רצון טוב." }
    ]
  },

  /* ---------- Booking (dark section) ---------- */
  booking: {
    kicker: "קביעת תור",
    title: "מוכנה לעור שתאהבי?",
    text: "שלחי הודעה בוואטסאפ, וויויאן תחזור אלייך עם תור שמתאים לך.",
    chipsLabel: "על מה תרצי לדבר?",
    chipTreatments: ["acne", "pigmentation", "antiaging", "facial", "mesotherapy"], // IDs from treatments
    otherLabel: "אחר",
    messageTemplate: "היי ויויאן, אשמח לקבוע תור ל{treatment} 🙂",
    ctaText: "קביעת תור בוואטסאפ"
  },

  /* ---------- FAQ ---------- */
  faq: [
    { q: "האם הטיפול כואב?",
      a: "רוב הטיפולים נעימים או גורמים לאי-נוחות קלה בלבד. בכל טיפול אני מתאימה את העוצמה לרגישות העור שלך, ותמיד אפשר לעצור ולעדכן אותי." },
    { q: "כמה טיפולים צריך?",
      a: "זה תלוי במצב העור ובמטרה. יש טיפולים שמרגישים בהם שינוי כבר מהפעם הראשונה, ויש תהליכים שבנויים מסדרה. את מספר הטיפולים נקבע יחד באבחון האישי." },
    { q: "אפשר לטפל בהריון?",
      a: "חלק מהטיפולים והתכשירים אינם מתאימים בהריון ובהנקה. חשוב לעדכן מראש, ונתאים יחד טיפול בטוח או נמליץ לחכות. במקרה של ספק, כדאי להתייעץ גם עם הרופא/ה המטפל/ת." },
    { q: "מה עושים לפני הטיפול?",
      a: "מגיעות עם עור נקי ומעדכנות על תרופות, אלרגיות, טיפולים קודמים או חשיפה לשמש. לפני טיפולים מסוימים אשלח לך הנחיות מותאמות מראש." },
    { q: "תוך כמה זמן רואים תוצאות?",
      a: "בטיפולי פנים רבים רואים רעננות כבר מיד אחרי הטיפול. בבעיות עור כמו אקנה או כתמים, השיפור מצטבר לאורך הסדרה. התוצאות משתנות מאדם לאדם, ונבנה ציפיות ריאליות באבחון." },
    { q: "איך קובעים תור?",
      a: "הכי פשוט: שולחות הודעה בוואטסאפ או מתקשרות, ונמצא יחד זמן שמתאים לך. אפשר גם לשאול כל שאלה לפני שמחליטות." }
  ],

  /* ---------- Images ----------
     src: path to the image (empty = placeholder). webp: optional lighter version.
     alt: description for screen readers. label: text shown on the placeholder. */
  images: {
    // DEMO image (AI-generated) – replace with a real photo of Vivian
    "hero":                   { src: "images/hero.png", webp: "images/hero.webp", alt: "טיפוח עור – ויויאן קוסמטיק", label: "תמונה ראשית" },
    "about-vivian":           { src: "", alt: "ויויאן בקליניקה",          label: "ויויאן בקליניקה (פורטרט, אור טבעי)" },
    "treatment-facial":       { src: "", alt: "טיפול פנים",               label: "טיפול פנים" },
    "treatment-acne":         { src: "", alt: "טיפול באקנה",              label: "טיפול באקנה" },
    "treatment-mesotherapy":  { src: "", alt: "מזותרפיה",                 label: "מזותרפיה" },
    "treatment-pigmentation": { src: "", alt: "הורדת כתמים",              label: "הורדת כתמים" },
    "treatment-antiaging":    { src: "", alt: "אנטי-אייג'ינג",            label: "אנטי-אייג'ינג" },
    "treatment-peeling":      { src: "", alt: "פילינג מתקדם",             label: "פילינג מתקדם" },
    "treatment-eyes":         { src: "", alt: "טיפול באזור העיניים",      label: "אזור העיניים" },
    "treatment-plasma":       { src: "", alt: "טיפול פלזמה",              label: "טיפול פלזמה" },
    "treatment-hair":         { src: "", alt: "הסרת שיער",                label: "הסרת שיער" },
    "treatment-nails":        { src: "", alt: "בניית ציפורניים וג'ל לק",  label: "ציפורניים וג'ל לק" },
    "ba-acne-before":         { src: "", alt: "לפני טיפול באקנה",         label: "אקנה: לפני" },
    "ba-acne-after":          { src: "", alt: "אחרי טיפול באקנה",         label: "אקנה: אחרי" },
    "ba-pigment-before":      { src: "", alt: "לפני הורדת כתמים",         label: "כתמים: לפני" },
    "ba-pigment-after":       { src: "", alt: "אחרי הורדת כתמים",         label: "כתמים: אחרי" },
    "ba-antiaging-before":    { src: "", alt: "לפני אנטי-אייג'ינג",       label: "אנטי-אייג'ינג: לפני" },
    "ba-antiaging-after":     { src: "", alt: "אחרי אנטי-אייג'ינג",       label: "אנטי-אייג'ינג: אחרי" },
    "ba-meso-before":         { src: "", alt: "לפני מזותרפיה",            label: "מזותרפיה: לפני" },
    "ba-meso-after":          { src: "", alt: "אחרי מזותרפיה",            label: "מזותרפיה: אחרי" }
  }
};
