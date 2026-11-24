/* =====================================================================
   SITE CONFIG — THE ONLY FILE YOU EDIT PER CLIENT
   ---------------------------------------------------------------------
   - All texts, contact details, treatments, quiz logic and toggles live here.
   - Images: put files in /images and write the path in `images` below
     (e.g. src: "images/hero-portrait.jpg"). Empty src = styled placeholder.
   - Search for "TODO" to find everything that still needs client data.
   ===================================================================== */

window.SITE_CONFIG = {
  /* ---------- Demo / global ---------- */
  demoMode: true,            // true = adds <meta name="robots" content="noindex, nofollow">
  demoBanner: true,          // thin ribbon at the very top
  demoBannerText: "גרסת הדגמה שהוכנה עבור ויויאן קוסמטיק",
  theme: "editorial",        // "editorial" | "noir" | "clinic" | "warm"
  credit: "עיצוב ובנייה: Benzaken Studio",

  /* ---------- Optional sections (enabled: false hides the section + its nav link) ---------- */
  sections: {
    promo: true,
    beforeAfter: true,
    quiz: true,
    testimonials: true,
    brands: true,
    faq: true
  },

  /* ---------- Business ---------- */
  business: {
    name: "ויויאן קוסמטיק",
    nameEn: "Vivian Cosmetic",
    aka: "בוטיק ויויאן",
    ownerFirstName: "ויויאן",           // used in WhatsApp greetings ("היי ויויאן, ...")
    type: "קוסמטיקה פרא-רפואית",
    tagline: "בוטיק לקוסמטיקה פרא-רפואית בהרצליה"
  },

  contact: {
    phoneDisplay: "052-2892431",
    phoneIntl: "972522892431",          // used for tel: and wa.me links (no +, no dashes)
    whatsappIntl: "972522892431",
    email: "info@vcosmetic.co.il",
    street: "סוקולוב 13",
    city: "הרצליה",
    country: "IL",
    addressNote: "כניסה משמאל בפאסאז'",
    wazeUrl: "https://waze.com/ul?q=%D7%A1%D7%95%D7%A7%D7%95%D7%9C%D7%95%D7%91%2013%20%D7%94%D7%A8%D7%A6%D7%9C%D7%99%D7%94&navigate=yes",
    mapEmbedUrl: "https://www.google.com/maps?q=%D7%A1%D7%95%D7%A7%D7%95%D7%9C%D7%95%D7%91+13+%D7%94%D7%A8%D7%A6%D7%9C%D7%99%D7%94&output=embed",
    // Default WhatsApp message for general "book" buttons
    defaultWhatsappMessage: "היי ויויאן, אשמח לקבוע תור 🙂"
  },

  /* Opening hours. day: 0 = Sunday ... 6 = Saturday. Times in Israel time, 24h. */
  hours: [
    { day: 0, label: "ראשון",  open: "09:00", close: "19:00" },
    { day: 1, label: "שני",    closed: true },
    { day: 2, label: "שלישי",  open: "09:00", close: "19:00" },
    { day: 3, label: "רביעי",  open: "09:00", close: "19:00" },
    { day: 4, label: "חמישי",  open: "09:00", close: "19:00" },
    { day: 5, label: "שישי",   open: "08:30", close: "15:00" },
    { day: 6, label: "שבת",    closed: true }
  ],

  // TODO: verify current Google rating before going live
  rating: {
    enabled: true,
    value: 4.7,
    count: 27,
    reviewsUrl: "#" // TODO: paste the client's Google reviews link
  },

  /* ---------- SEO / sharing ---------- */
  seo: {
    title: "ויויאן קוסמטיק | קוסמטיקה פרא-רפואית בהרצליה",
    description: "בוטיק לקוסמטיקה פרא-רפואית בהרצליה עם מעל 35 שנות ניסיון: טיפול באקנה, הורדת כתמים, אנטי-אייג'ינג, מזותרפיה ופילינג. קביעת תור בוואטסאפ.",
    siteUrl: "",          // e.g. "https://www.example.co.il/" (used for og:url / schema)
    ogImage: ""           // e.g. "images/og-image.jpg" (1200x630)
  },

  /* ---------- Navigation (section IDs) ---------- */
  nav: [
    { label: "טיפולים",     target: "treatments" },
    { label: "מה מציק לך",  target: "concerns" },
    { label: "לפני ואחרי",  target: "before-after" },
    { label: "עליי",        target: "about" },
    { label: "המלצות",      target: "testimonials" },
    { label: "צור קשר",     target: "contact" }
  ],

  /* ---------- Hero ---------- */
  hero: {
    kicker: "בוטיק לעור בריא",
    title: "ויויאן קוסמטיק",
    subtitle: "מעל 35 שנה של עור בריא. בהרצליה.",
    text: "בוטיק לקוסמטיקה פרא-רפואית, שמתמחה בטיפולים מורכבים: אקנה, כתמים ואנטי-אייג'ינג.",
    primaryCta: "קביעת תור בוואטסאפ",
    secondaryCta: "מה מתאים לי? (שאלון קצר)",
    imageSlot: "hero-portrait"
  },

  /* ---------- Trust stats ----------
     value = final number (always rendered, even without animation)
     text  = use instead of a number when there is no exact figure */
  stats: [
    { value: 35, suffix: "+",  label: "שנות ניסיון" },
    { text: "אלפי",            label: "מטופלות ומטופלים" },
    { value: 90, suffix: "%+", label: "הצלחה בטיפול באקנה" },
    { value: 10,               label: "סוגי טיפולים" }
  ],

  /* ---------- Concerns ("מה מציק לך?") ----------
     treatments = IDs from the treatments list below, in order of recommendation */
  concerns: [
    { id: "acne",        title: "אקנה ופצעונים",       short: "התפרצויות, פצעונים, עור שמן ונטייה לסתימות.",  icon: "drop",    treatments: ["acne", "peeling", "mesotherapy"] },
    { id: "pigmentation",title: "כתמים ופיגמנטציה",    short: "כתמי שמש, כתמי גיל, כתמים אחרי לידה.",         icon: "sun",     treatments: ["pigmentation", "peeling", "mesotherapy"] },
    { id: "wrinkles",    title: "קמטים וקווי הבעה",    short: "קווים עדינים, איבוד מוצקות וסימני הזמן.",       icon: "spark",   treatments: ["antiaging", "mesotherapy", "plasma"] },
    { id: "dull",        title: "עור עייף ואפרורי",    short: "עור שאיבד זוהר, מרקם לא אחיד ועייפות.",         icon: "leaf",    treatments: ["facial", "peeling", "mesotherapy"] },
    { id: "eyes",        title: "אזור העיניים",        short: "מראה עייף, קווים עדינים וחוסר חיוניות.",        icon: "eye",     treatments: ["eyes", "plasma"] },
    { id: "hair",        title: "שיער לא רצוי",        short: "הסרת שיער מקצועית ונעימה.",                   icon: "feather", treatments: ["hair"] }
  ],
  // TODO: confirm concern → treatment recommendations with client

  /* ---------- Treatments ---------- */
  categories: [
    { id: "all",   label: "הכל" },
    { id: "face",  label: "פנים" },
    { id: "skin",  label: "עור" },
    { id: "body",  label: "גוף" },
    { id: "nails", label: "ציפורניים" }
  ],

  treatments: [
    { id: "facial",       name: "טיפולי פנים",          category: "face",  imageSlot: "treatment-facial",
      description: "מגוון רחב של טיפולי פנים המותאמים לסוג העור ולתוצאות הרצויות.",
      duration: "XX דק'",        // TODO: real duration from client
      sessions: "לפי אבחון אישי",
      price: "XXX" },            // TODO: real price from client
    { id: "acne",         name: "טיפול באקנה",          category: "skin",  imageSlot: "treatment-acne",
      description: "מעל 90% הצלחה בטיפול באקנה, גם בהתפרצויות חמורות במיוחד.",
      duration: "XX דק'",        // TODO: real duration from client
      sessions: "לפי אבחון אישי",
      price: "XXX" },            // TODO: real price from client
    { id: "mesotherapy",  name: "מזותרפיה",             category: "face",  imageSlot: "treatment-mesotherapy",
      description: "מותאמת בעוצמה ובתכשירים לכל מטופלת.",
      duration: "XX דק'",        // TODO: real duration from client
      sessions: "לפי אבחון אישי",
      price: "XXX" },            // TODO: real price from client
    { id: "pigmentation", name: "הורדת כתמים",          category: "skin",  imageSlot: "treatment-pigmentation",
      description: "כתמי שמש, פיגמנטציה, כתמי גיל וכתמים אחרי לידה.",
      duration: "XX דק'",        // TODO: real duration from client
      sessions: "לפי אבחון אישי",
      price: "XXX" },            // TODO: real price from client
    { id: "antiaging",    name: "אנטי-אייג'ינג",        category: "face",  imageSlot: "treatment-antiaging",
      description: "הצערת העור, שיפור המראה וטיפול בנגעי הזמן.",
      duration: "XX דק'",        // TODO: real duration from client
      sessions: "לפי אבחון אישי",
      price: "XXX" },            // TODO: real price from client
    { id: "peeling",      name: "פילינג מתקדם",         category: "skin",  imageSlot: "treatment-peeling",
      description: "פילינג שמצעיר את העור באופן משמעותי.",
      duration: "XX דק'",        // TODO: real duration from client
      sessions: "לפי אבחון אישי",
      price: "XXX" },            // TODO: real price from client
    { id: "eyes",         name: "טיפולי עיניים",        category: "face",  imageSlot: "treatment-eyes",
      description: "הצערת אזור העיניים והשבת החיוניות למבט.",
      duration: "XX דק'",        // TODO: real duration from client
      sessions: "לפי אבחון אישי",
      price: "XXX" },            // TODO: real price from client
    { id: "plasma",       name: "טיפול פלזמה",          category: "skin",  imageSlot: "treatment-plasma",
      description: "טיפול פלזמה מקצועי, בהתאמה אישית אחרי אבחון.", // TODO: client's own description
      duration: "XX דק'",        // TODO: real duration from client
      sessions: "לפי אבחון אישי",
      price: "XXX" },            // TODO: real price from client
    { id: "hair",         name: "הסרת שיער",            category: "body",  imageSlot: "treatment-hair",
      description: "הסרת שיער מקצועית בסביבה אישית ונעימה.",
      duration: "XX דק'",        // TODO: real duration from client
      sessions: "לפי אזור הטיפול",
      price: "XXX" },            // TODO: real price from client
    { id: "nails",        name: "בניית ציפורניים וג'ל לק", category: "nails", imageSlot: "treatment-nails",
      description: "בנייה ולק ג'ל בגימור נקי ומוקפד.",
      duration: "XX דק'",        // TODO: real duration from client
      sessions: "לפי הצורך",
      price: "XXX" }             // TODO: real price from client
  ],

  /* ---------- Promo ----------
     endDate: "YYYY-MM-DD" (Israel time, ends at 23:59). Empty = 14 days from today (demo).
     The banner hides itself automatically after the end date. */
  promo: {
    kicker: "חדש בקליניקה",
    title: "מתיחת פנים ל-5 שנים ללא ניתוח, בחצי מחיר",
    text: "50% הנחה ל-10 הנרשמות הראשונות בלבד.",
    endDate: "",
    ctaText: "אני רוצה לשריין מקום",
    whatsappMessage: "היי ויויאן, ראיתי באתר את המבצע על מתיחת פנים ללא ניתוח בחצי מחיר. אשמח לשריין מקום 🙂"
  },

  /* ---------- Before / After ---------- */
  beforeAfter: {
    kicker: "תוצאות שמדברות",
    title: "לפני ואחרי",
    note: "תוצאות משתנות מאדם לאדם",
    items: [
      { id: "acne",         tab: "אקנה",          before: "ba-acne-1-before",     after: "ba-acne-1-after",     caption: "טיפול באקנה" },
      { id: "pigmentation", tab: "כתמים",         before: "ba-pigment-1-before",  after: "ba-pigment-1-after",  caption: "הורדת כתמים" },
      { id: "antiaging",    tab: "אנטי-אייג'ינג", before: "ba-antiaging-1-before",after: "ba-antiaging-1-after",caption: "אנטי-אייג'ינג" }
    ]
  },

  /* ---------- Skin quiz ----------
     Rules are checked top to bottom. The first rule whose `when` fields all
     match the answers wins. Unlisted fields = "any answer". */
  quiz: {
    kicker: "שאלון קצר",
    title: "מה מתאים לעור שלך?",
    intro: "3 שאלות קצרות, ותקבלי המלצה ראשונית לטיפול. ההתאמה הסופית נעשית תמיד באבחון אישי.",
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
      { when: { concern: "acne" },                          treatment: "acne",         why: "הטיפול באקנה הוא ההתמחות של ויויאן, עם מעל 90% הצלחה, גם בהתפרצויות חמורות." },
      { when: { concern: "pigmentation", priority: "gentle" }, treatment: "mesotherapy", why: "מזותרפיה מותאמת בעוצמה ובתכשירים, ומאפשרת לעבוד על כתמים בצורה עדינה." },
      { when: { concern: "pigmentation" },                  treatment: "pigmentation", why: "טיפול ממוקד בכתמי שמש, פיגמנטציה, כתמי גיל וכתמים אחרי לידה." },
      { when: { concern: "wrinkles", priority: "fast" },    treatment: "peeling",      why: "פילינג מתקדם מצעיר את העור באופן משמעותי ומחדש את המרקם." },
      { when: { concern: "wrinkles" },                      treatment: "antiaging",    why: "תוכנית אנטי-אייג'ינג להצערת העור ולטיפול בנגעי הזמן, בתהליך מותאם אישית." },
      { when: { concern: "dull", priority: "fast" },        treatment: "peeling",      why: "פילינג מתקדם מחזיר לעור זוהר ומרקם אחיד." },
      { when: { concern: "dull" },                          treatment: "facial",       why: "טיפול פנים מותאם לסוג העור שלך, להחזרת החיוניות והזוהר." },
      { when: { concern: "eyes" },                          treatment: "eyes",         why: "טיפול ממוקד להצערת אזור העיניים והשבת החיוניות למבט." }
    ],
    fallbackTreatment: "facial",
    // Extra line added to the result according to skin type (optional)
    skinNotes: {
      sensitive: "לעור רגיש נתאים עוצמה ותכשירים עדינים במיוחד.",
      unsure: "באבחון האישי נזהה יחד את סוג העור שלך."
    },
    whatsappMessage: "היי ויויאן, עשיתי את השאלון באתר והומלץ לי על {treatment}. אשמח לשמוע פרטים 🙂"
  },

  /* ---------- About ---------- */
  about: {
    kicker: "נעים להכיר",
    title: "35 שנה. אלפי מטופלות. גישה אחת: אישית.",
    paragraphs: [
      "אני ויויאן, קוסמטיקאית פרא-רפואית כבר מעל 35 שנה. לאורך הדרך השתתפתי בעשרות רבות של השתלמויות בארץ ובעולם, וליוויתי אלפי מטופלות ומטופלים בטיפולים מורכבים.",
      "אצלי אין טיפול סטנדרטי. כל עור מקבל תוכנית עבודה משלו, ואני כאן לאורך כל הדרך: מהאבחון הראשון ועד שהתוצאה מגיעה."
    ],
    signature: "ויויאן",
    imageSlot: "about-vivian",
    values: [
      { icon: "search", title: "אבחון אישי",       text: "כל טיפול מתחיל בהיכרות עם העור שלך." },
      { icon: "flask",  title: "חומרים מקצועיים",  text: "תכשירים מקצועיים, בהתאמה לכל מטופלת." },
      { icon: "heart",  title: "ליווי לאורך כל הדרך", text: "זמינה לשאלות ומעודדת בכל שלב." }
    ]
  },

  /* ---------- Testimonials (real, from the client's site) ---------- */
  testimonials: [
    { name: "ליאת א.",   treatment: "טיפול פנים",  text: "באתי אלייך ללא צפייה! וכבר אחרי טיפול אחד, חיכיתי לטיפול הבא. המצב בכל טיפול הלך והשתפר ואת מהתחלה היית שם תמיד לעודד." },
    { name: "רונה כ.",   treatment: "מזותרפיה",   text: "אחרי שניסיתי הכל וכלום לא עזר, לא האמנתי שיש סיכוי שהפנים שלי יהיו חלקות וללא פצעים. אך למזלי הגעתי אלייך." },
    { name: "ליאורה א.", treatment: "הסרת כתמים", text: "רציתי להודות לך על כל הטיפול שהשקעת בי, בזכותך אני נראית ומרגישה הרבה יותר טוב. טיפלת בי מכל הלב והנשמה עם הרבה רצון טוב." }
  ],

  /* ---------- Brands ---------- */
  // TODO: confirm brands with client
  brands: [
    { name: "mesoestetic" }
  ],

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
      a: "בטיפולי פנים רבים רואים רעננות כבר מיד אחרי הטיפול. בטיפולים בבעיות עור כמו אקנה או כתמים, השיפור מצטבר לאורך הסדרה. התוצאות משתנות מאדם לאדם, ונבנה ציפיות ריאליות באבחון." },
    { q: "איך קובעים תור?",
      a: "הכי פשוט: שולחות הודעה בוואטסאפ או מתקשרות, ונמצא יחד זמן שמתאים לך. אפשר גם לשאול כל שאלה לפני שמחליטות." }
  ],

  /* ---------- Images ----------
     Each slot: src (empty = placeholder), alt (for real image), label (placeholder text).
     See /images/README.md for sizes and shot descriptions. */
  images: {
    "hero-portrait":          { src: "", alt: "ויויאן בקליניקה בהרצליה",         label: "ויויאן בקליניקה (פורטרט, אור טבעי)" },
    "about-vivian":           { src: "", alt: "ויויאן בזמן טיפול",                label: "ויויאן בזמן טיפול (אור רך, ידיים בפריים)" },
    "treatment-facial":       { src: "", alt: "טיפול פנים בקליניקה",              label: "טיפול פנים בקליניקה" },
    "treatment-acne":         { src: "", alt: "טיפול באקנה",                      label: "טיפול באקנה (תקריב עדין)" },
    "treatment-mesotherapy":  { src: "", alt: "טיפול מזותרפיה",                   label: "מזותרפיה (ציוד ותכשירים)" },
    "treatment-pigmentation": { src: "", alt: "טיפול בהורדת כתמים",               label: "הורדת כתמים" },
    "treatment-antiaging":    { src: "", alt: "טיפול אנטי-אייג'ינג",              label: "אנטי-אייג'ינג" },
    "treatment-peeling":      { src: "", alt: "פילינג מתקדם",                     label: "פילינג מתקדם" },
    "treatment-eyes":         { src: "", alt: "טיפול באזור העיניים",              label: "טיפול באזור העיניים" },
    "treatment-plasma":       { src: "", alt: "טיפול פלזמה",                      label: "טיפול פלזמה" },
    "treatment-hair":         { src: "", alt: "הסרת שיער",                        label: "הסרת שיער" },
    "treatment-nails":        { src: "", alt: "בניית ציפורניים וג'ל לק",          label: "ציפורניים וג'ל לק (תקריב ידיים)" },
    "ba-acne-1-before":       { src: "", alt: "לפני טיפול באקנה",                 label: "אקנה: לפני" },
    "ba-acne-1-after":        { src: "", alt: "אחרי טיפול באקנה",                 label: "אקנה: אחרי" },
    "ba-pigment-1-before":    { src: "", alt: "לפני טיפול בכתמים",                label: "כתמים: לפני" },
    "ba-pigment-1-after":     { src: "", alt: "אחרי טיפול בכתמים",                label: "כתמים: אחרי" },
    "ba-antiaging-1-before":  { src: "", alt: "לפני טיפול אנטי-אייג'ינג",         label: "אנטי-אייג'ינג: לפני" },
    "ba-antiaging-1-after":   { src: "", alt: "אחרי טיפול אנטי-אייג'ינג",         label: "אנטי-אייג'ינג: אחרי" }
  }
};
