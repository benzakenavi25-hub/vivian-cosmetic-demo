/* =====================================================================
   Beauty Clinic Template — rendering + interactions
   Reads window.SITE_CONFIG (js/config.js). No libraries.
   You normally don't need to edit this file for a new client.
   ===================================================================== */
(function () {
  "use strict";

  var C = window.SITE_CONFIG;
  if (!C) { console.error("SITE_CONFIG is missing: check that js/config.js loads before main.js"); return; }

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var sections = C.sections || {};
  var isOn = function (key) { return sections[key] !== false; };

  /* ---------------------------------------------------------------
     Helpers
     --------------------------------------------------------------- */
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function waLink(message) {
    return "https://wa.me/" + C.contact.whatsappIntl + "?text=" + encodeURIComponent(message || C.contact.defaultWhatsappMessage);
  }
  var telLink = "tel:+" + C.contact.phoneIntl;
  var owner = C.business.ownerFirstName;

  var ICONS = {
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" focusable="false" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"/></svg>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    nav: '<path d="M3 11 22 2l-9 19-2-8-8-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    drop: '<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    spark: '<path d="M12 3c.9 4.5 3.5 7.1 8 8-4.5.9-7.1 3.5-8 8-.9-4.5-3.5-7.1-8-8 4.5-.9 7.1-3.5 8-8z"/>',
    leaf: '<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19c3-4 6-6 10-8"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    feather: '<path d="M20.2 4.8a6 6 0 0 0-8.5 0L5 11.5V19h7.5l6.7-6.7a6 6 0 0 0 1-7.5z"/><path d="M16 8 2 22M17.5 15H9"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    flask: '<path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7 15h10"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    repeat: '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',
    camera: '<path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="4"/>',
    a11y: '<circle cx="12" cy="4.5" r="1.8"/><path d="M5 8.5l7 1.5 7-1.5M12 10v4.5M12 14.5 9 21M12 14.5l3 6.5"/>',
    arrows: '<path d="m9 7-5 5 5 5M15 7l5 5-5 5"/>',
    star: '<svg viewBox="0 0 24 24" fill="#E3A008" focusable="false" aria-hidden="true"><path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/></svg>'
  };

  function icon(name) {
    var p = ICONS[name] || "";
    var svg = p.indexOf("<svg") === 0 ? p :
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true">' + p + "</svg>";
    return '<span class="icon" aria-hidden="true">' + svg + "</span>";
  }

  /* Image slot: real <img> if config has a src, otherwise a styled placeholder */
  function media(slotId, ratioClass, extraClass) {
    var slot = (C.images && C.images[slotId]) || { label: slotId };
    var inner;
    if (slot.src) {
      inner = '<img src="' + esc(slot.src) + '" alt="' + esc(slot.alt || "") + '" loading="lazy" decoding="async">';
    } else {
      inner = '<div class="placeholder ' + (extraClass || "") + '" role="img" aria-label="' + esc("מקום לתמונה: " + (slot.label || slotId)) + '">' +
        icon("camera") + '<span class="placeholder-label">📷 להוסיף תמונה: ' + esc(slot.label || slotId) + "</span></div>";
    }
    return '<div class="media ' + (ratioClass || "") + '" data-slot="' + esc(slotId) + '">' + inner + "</div>";
  }

  function findTreatment(id) {
    for (var i = 0; i < C.treatments.length; i++) if (C.treatments[i].id === id) return C.treatments[i];
    return null;
  }
  function categoryLabel(id) {
    for (var i = 0; i < C.categories.length; i++) if (C.categories[i].id === id) return C.categories[i].label;
    return "";
  }
  function priceHtml(t) {
    return '<span class="price"><small>החל מ-</small>₪' + esc(t.price) + "</span>";
  }
  function sectionHead(kicker, title, titleId, lead, center) {
    return '<div class="section-head reveal' + (center ? " center" : "") + '">' +
      (kicker ? '<span class="kicker">' + esc(kicker) + "</span>" : "") +
      '<h2 class="section-title" id="' + titleId + '">' + esc(title) + "</h2>" +
      (lead ? '<p class="section-lead">' + esc(lead) + "</p>" : "") + "</div>";
  }
  function waBtn(text, message, cls) {
    return '<a class="btn ' + (cls || "btn-primary") + '" href="' + waLink(message) + '" target="_blank" rel="noopener">' + icon("whatsapp") + "<span>" + esc(text) + "</span></a>";
  }

  /* Israel time: weekday (0=Sun) + minutes since midnight */
  function israelNow() {
    var d = new Date();
    try {
      var parts = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Jerusalem", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(d);
      var o = {};
      parts.forEach(function (p) { o[p.type] = p.value; });
      var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      return { day: days[o.weekday], minutes: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
    } catch (e) {
      return { day: d.getDay(), minutes: d.getHours() * 60 + d.getMinutes() };
    }
  }
  function toMinutes(hhmm) { var p = hhmm.split(":"); return parseInt(p[0], 10) * 60 + parseInt(p[1], 10); }

  /* ---------------------------------------------------------------
     SEO: title, meta, Open Graph, robots, JSON-LD
     --------------------------------------------------------------- */
  function setMeta(attr, key, value) {
    if (!value) return;
    var el = document.head.querySelector("meta[" + attr + '="' + key + '"]');
    if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
    el.setAttribute("content", value);
  }
  function renderSeo() {
    var s = C.seo || {};
    document.title = s.title || C.business.name;
    setMeta("name", "description", s.description);
    setMeta("property", "og:title", s.title);
    setMeta("property", "og:description", s.description);
    setMeta("property", "og:site_name", C.business.name);
    if (s.siteUrl) setMeta("property", "og:url", s.siteUrl);
    if (s.ogImage) setMeta("property", "og:image", s.ogImage);

    var robots = document.head.querySelector('meta[name="robots"]');
    if (C.demoMode) setMeta("name", "robots", "noindex, nofollow");
    else if (robots) robots.parentNode.removeChild(robots);

    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var schema = {
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      name: C.business.name,
      alternateName: [C.business.nameEn, C.business.aka].filter(Boolean),
      description: s.description,
      telephone: "+" + C.contact.phoneIntl,
      email: C.contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: C.contact.street,
        addressLocality: C.contact.city,
        addressCountry: C.contact.country
      },
      openingHoursSpecification: C.hours.filter(function (h) { return !h.closed; }).map(function (h) {
        return { "@type": "OpeningHoursSpecification", dayOfWeek: "https://schema.org/" + dayNames[h.day], opens: h.open, closes: h.close };
      })
    };
    if (s.siteUrl) schema.url = s.siteUrl;
    if (s.ogImage) schema.image = s.ogImage;
    if (C.rating && C.rating.enabled) {
      schema.aggregateRating = { "@type": "AggregateRating", ratingValue: C.rating.value, reviewCount: C.rating.count, bestRating: 5 };
    }
    var ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify(schema);
    document.head.appendChild(ld);
  }

  /* ---------------------------------------------------------------
     Navigation: only links to sections that are actually shown
     --------------------------------------------------------------- */
  var sectionKeyById = { "promo": "promo", "before-after": "beforeAfter", "quiz": "quiz", "testimonials": "testimonials", "brands": "brands", "faq": "faq" };
  function navItems() {
    return C.nav.filter(function (n) {
      var key = sectionKeyById[n.target];
      return !key || isOn(key);
    });
  }

  function renderHeader() {
    var ribbon = $("#demo-ribbon");
    if (C.demoBanner) { ribbon.textContent = C.demoBannerText; ribbon.hidden = false; }

    $("#header-logo").innerHTML = esc(C.business.name) + "<small>" + esc(C.business.nameEn) + "</small>";
    var links = navItems().map(function (n) { return '<li><a href="#' + esc(n.target) + '">' + esc(n.label) + "</a></li>"; }).join("");
    $("#nav-list").innerHTML = links;
    $("#mobile-nav-list").innerHTML = navItems().map(function (n, i) {
      return '<li><a href="#' + esc(n.target) + '" style="transition-delay:' + (0.05 + i * 0.05) + 's">' + esc(n.label) + "</a></li>";
    }).join("");
    $("#mobile-menu-foot").innerHTML =
      waBtn(C.hero.primaryCta, C.contact.defaultWhatsappMessage, "btn-primary btn-block") +
      '<a class="btn btn-ghost btn-block" href="' + telLink + '">' + icon("phone") + "<span>" + esc(C.contact.phoneDisplay) + "</span></a>" +
      "<p>" + esc(C.contact.street + ", " + C.contact.city) + "</p>";

    var hw = $("#header-wa");
    hw.href = waLink();
    $("#wa-float").href = waLink();

    // sticky header border on scroll
    var header = $("#site-header");
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Mobile full-screen menu */
  function initMobileMenu() {
    var btn = $("#menu-toggle"), menu = $("#mobile-menu");
    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      menu.hidden = false;
      void menu.offsetWidth; // reflow so the transition runs
      menu.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "סגירת תפריט");
      document.body.classList.add("menu-open");
      var first = $("a", menu); if (first) first.focus({ preventScroll: true });
    }
    function close(restoreFocus) {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "פתיחת תפריט");
      document.body.classList.remove("menu-open");
      setTimeout(function () { if (!menu.classList.contains("is-open")) menu.hidden = true; }, reduceMotion ? 0 : 350);
      if (restoreFocus && lastFocus) lastFocus.focus();
    }
    btn.addEventListener("click", function () { btn.getAttribute("aria-expanded") === "true" ? close(true) : open(); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) close(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) close(true);
      if (e.key === "Tab" && menu.classList.contains("is-open")) trapFocus(e, [btn].concat($$("a, button", menu)));
    });
    window.matchMedia("(min-width: 1024px)").addEventListener("change", function (m) { if (m.matches && menu.classList.contains("is-open")) close(false); });
  }

  function trapFocus(e, items) {
    items = items.filter(function (el) { return el.offsetParent !== null; });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------------------------------------------------------------
     Hero
     --------------------------------------------------------------- */
  function renderHero() {
    var h = C.hero, r = C.rating;
    var rating = "";
    if (r && r.enabled) {
      rating = '<a class="rating-badge" href="' + esc(r.reviewsUrl || "#") + '"' + (r.reviewsUrl && r.reviewsUrl !== "#" ? ' target="_blank" rel="noopener"' : "") + ">" +
        icon("star") + "<span><strong>" + esc(r.value) + "</strong> בגוגל · " + esc(r.count) + " ביקורות</span></a>";
    }
    var experience = (C.stats[0] && C.stats[0].value) ? C.stats[0].value + (C.stats[0].suffix || "") : "";
    $("#hero").innerHTML =
      '<div class="container hero-grid">' +
        '<div class="hero-text-col">' +
          '<span class="kicker reveal">' + esc(h.kicker) + "</span>" +
          '<h1 class="hero-title reveal" id="hero-title" style="--d:.05s">' + esc(h.title) + "</h1>" +
          '<p class="hero-subtitle reveal" style="--d:.12s">' + esc(h.subtitle) + "</p>" +
          '<p class="hero-text reveal" style="--d:.18s">' + esc(h.text) + "</p>" +
          '<div class="hero-actions reveal" style="--d:.24s">' +
            waBtn(h.primaryCta, C.contact.defaultWhatsappMessage) +
            (isOn("quiz") ? '<a class="btn btn-outline" href="#quiz">' + esc(h.secondaryCta) + "</a>" : "") +
          "</div>" +
          '<div class="reveal" style="--d:.3s">' + rating + "</div>" +
        "</div>" +
        '<div class="hero-media reveal" style="--d:.15s">' +
          media(h.imageSlot, "ratio-hero") +
          (experience ? '<div class="hero-seal" aria-hidden="true"><b>' + esc(experience) + "</b>שנות ניסיון</div>" : "") +
        "</div>" +
      "</div>";
  }

  /* ---------------------------------------------------------------
     Stats — final numbers are written into the HTML first,
     the count-up animation is only a visual extra.
     --------------------------------------------------------------- */
  function renderStats() {
    $("#stats").innerHTML = '<div class="container"><ul class="stats-grid">' + C.stats.map(function (s, i) {
      var isNum = typeof s.value === "number";
      var finalText = isNum ? s.value + (s.suffix || "") : s.text;
      return '<li class="stat reveal" style="--d:' + (i * 0.08) + 's">' +
        '<span class="stat-value' + (isNum ? "" : " is-text") + '"' + (isNum ? ' data-count="' + s.value + '" data-suffix="' + esc(s.suffix || "") + '"' : "") + ">" + esc(finalText) + "</span>" +
        '<span class="stat-label">' + esc(s.label) + "</span></li>";
    }).join("") + "</ul></div>";

    if (reduceMotion || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        countUp(en.target);
      });
    }, { threshold: 0.6 });
    $$("[data-count]").forEach(function (el) { io.observe(el); });
  }
  function countUp(el) {
    var end = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var finalText = end + suffix;
    var dur = 1600, start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (p < 1 ? Math.round(end * eased) : end) + suffix;
      if (p < 1) requestAnimationFrame(step); else el.textContent = finalText;
    }
    requestAnimationFrame(step);
    // Safety net: whatever happens, show the real number
    setTimeout(function () { el.textContent = finalText; }, dur + 400);
  }

  /* ---------------------------------------------------------------
     Concerns ("מה מציק לך?")
     --------------------------------------------------------------- */
  var mobileQuery = window.matchMedia("(max-width: 759px)");

  function concernDetailHtml(c, headingId) {
    var recs = c.treatments.map(findTreatment).filter(Boolean);
    return '<div class="concern-detail">' +
      '<span class="kicker">ההמלצה שלי</span>' +
      '<h3 id="' + headingId + '">' + esc(c.title) + "</h3>" +
      "<p>" + esc(c.short) + " אלה הטיפולים שאני ממליצה לבדוק. את ההתאמה הסופית נעשה יחד באבחון אישי.</p>" +
      '<ul class="rec-list">' + recs.map(function (t, i) {
        return '<li class="rec-item"><span class="rec-tag">' + (i === 0 ? "מומלץ ביותר" : "אפשרות נוספת") + "</span>" +
          "<h4>" + esc(t.name) + "</h4><p>" + esc(t.description) + "</p></li>";
      }).join("") + "</ul>" +
      waBtn("לשאלה ותיאום בוואטסאפ", "היי " + owner + ", אני מתעניינת בטיפול ב" + c.title) +
    "</div>";
  }

  function renderConcerns() {
    $("#concerns").innerHTML = '<div class="container">' +
      sectionHead("מה מציק לך?", "נתחיל ממה שמפריע לך", "concerns-title", "בחרי את מה שהכי מעסיק אותך, ותראי אילו טיפולים מתאימים.") +
      '<div class="concern-grid">' + C.concerns.map(function (c, i) {
        return '<button type="button" class="concern-card reveal" style="--d:' + (i % 3) * 0.07 + 's" data-concern="' + esc(c.id) + '" aria-expanded="false" aria-controls="concern-panel">' +
          icon(c.icon) + "<h3>" + esc(c.title) + "</h3><p>" + esc(c.short) + "</p>" +
          '<span class="concern-more">לטיפולים המומלצים ' + icon("chevronDown") + "</span></button>";
      }).join("") + "</div>" +
      '<div class="concern-panel" id="concern-panel" role="region" aria-live="polite"><div></div></div>' +
      '<div class="section-cta">' + waBtn("לא בטוחה? שאלי אותי בוואטסאפ", C.contact.defaultWhatsappMessage, "btn-outline") + "</div>" +
    "</div>";

    var panel = $("#concern-panel"), panelInner = panel.firstElementChild;
    var current = null;

    $$(".concern-card").forEach(function (card) {
      card.addEventListener("click", function () {
        var id = card.getAttribute("data-concern");
        var c = C.concerns.filter(function (x) { return x.id === id; })[0];
        if (mobileQuery.matches) { openSheet(concernDetailHtml(c, "sheet-title"), card); return; }

        if (current === id) { // toggle closed
          current = null;
          panel.classList.remove("is-open");
          card.setAttribute("aria-expanded", "false");
          return;
        }
        current = id;
        $$(".concern-card").forEach(function (b) { b.setAttribute("aria-expanded", String(b === card)); });
        panelInner.innerHTML = concernDetailHtml(c, "concern-detail-title");
        panel.setAttribute("aria-labelledby", "concern-detail-title");
        panel.classList.add("is-open");
        setTimeout(function () {
          var r = panel.getBoundingClientRect();
          if (r.bottom > window.innerHeight) panel.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
        }, reduceMotion ? 0 : 350);
      });
    });
  }

  /* Bottom sheet (mobile) */
  var sheetLastFocus = null;
  function openSheet(html, opener) {
    var sheet = $("#sheet"), panel = $(".sheet-panel", sheet);
    $("#sheet-body").innerHTML = html;
    sheetLastFocus = opener || document.activeElement;
    sheet.hidden = false;
    void sheet.offsetWidth;
    sheet.classList.add("is-open");
    document.body.classList.add("sheet-open");
    panel.scrollTop = 0;
    panel.focus({ preventScroll: true });
  }
  function closeSheet() {
    var sheet = $("#sheet");
    if (sheet.hidden) return;
    sheet.classList.remove("is-open");
    document.body.classList.remove("sheet-open");
    setTimeout(function () { sheet.hidden = true; }, reduceMotion ? 0 : 450);
    if (sheetLastFocus) sheetLastFocus.focus({ preventScroll: true });
  }
  function initSheet() {
    var sheet = $("#sheet");
    sheet.addEventListener("click", function (e) { if (e.target.closest("[data-close-sheet]")) closeSheet(); });
    document.addEventListener("keydown", function (e) {
      if (sheet.hidden) return;
      if (e.key === "Escape") closeSheet();
      if (e.key === "Tab") trapFocus(e, $$("button, a", sheet));
    });
  }

  /* ---------------------------------------------------------------
     Treatments + price list
     --------------------------------------------------------------- */
  function renderTreatments() {
    var usedCats = C.treatments.map(function (t) { return t.category; });
    var cats = C.categories.filter(function (c) { return c.id === "all" || usedCats.indexOf(c.id) > -1; });

    $("#treatments").innerHTML = '<div class="container">' +
      sectionHead("טיפולים ומחירים", "הטיפולים בקליניקה", "treatments-title", "כל טיפול מותאם אישית לעור שלך. המחירים הם נקודת פתיחה, ואת התוכנית המדויקת נבנה יחד.") +
      '<div class="chips reveal" role="group" aria-label="סינון לפי קטגוריה">' + cats.map(function (c, i) {
        return '<button type="button" class="chip" data-filter="' + esc(c.id) + '" aria-pressed="' + (i === 0) + '">' + esc(c.label) + "</button>";
      }).join("") + "</div>" +
      '<ul class="treat-grid" id="treat-grid">' + C.treatments.map(function (t, i) {
        return '<li class="treat-card reveal" style="--d:' + (i % 3) * 0.07 + 's" data-category="' + esc(t.category) + '">' +
          media(t.imageSlot, "ratio-card") +
          '<div class="treat-body">' +
            '<div class="treat-top"><h3>' + esc(t.name) + '</h3><span class="treat-cat">' + esc(categoryLabel(t.category)) + "</span></div>" +
            "<p>" + esc(t.description) + "</p>" +
            '<div class="treat-meta"><span>' + icon("clock") + '<span class="visually-hidden">משך: </span>' + esc(t.duration) + "</span>" +
              "<span>" + icon("repeat") + '<span class="visually-hidden">מספר טיפולים: </span>' + esc(t.sessions) + "</span></div>" +
            '<div class="treat-foot">' + priceHtml(t) +
              '<a class="btn btn-outline btn-sm" href="' + waLink("היי " + owner + ", אשמח לפרטים ולתיאום " + t.name + " 🙂") + '" target="_blank" rel="noopener" aria-label="' + esc("לפרטים ותיאום: " + t.name + " (וואטסאפ)") + '">לפרטים ותיאום</a>' +
            "</div>" +
          "</div></li>";
      }).join("") + "</ul>" +
      '<p class="price-note">* המחירים הם החל מ-, והמחיר הסופי נקבע לפי האבחון והתוכנית האישית.</p>' +
    "</div>";

    var chips = $$("#treatments .chip");
    var cards = $$("#treat-grid .treat-card");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var f = chip.getAttribute("data-filter");
        chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
        cards.forEach(function (card) {
          var show = f === "all" || card.getAttribute("data-category") === f;
          card.hidden = !show;
          if (show && !reduceMotion) { card.classList.remove("quiz-anim"); void card.offsetWidth; card.classList.add("quiz-anim"); }
        });
      });
    });
  }

  /* ---------------------------------------------------------------
     Promo with live countdown (auto-hides after end date)
     --------------------------------------------------------------- */
  function israelOffset(date) {
    try {
      var tz = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Jerusalem", timeZoneName: "shortOffset" })
        .formatToParts(date).filter(function (p) { return p.type === "timeZoneName"; })[0].value; // "GMT+2"
      var m = tz.match(/GMT([+-]\d+)/);
      var h = m ? parseInt(m[1], 10) : 2;
      return (h >= 0 ? "+" : "-") + ("0" + Math.abs(h)).slice(-2) + ":00";
    } catch (e) { return "+02:00"; }
  }
  function promoEnd() {
    var p = C.promo;
    if (p.endDate && /^\d{4}-\d{2}-\d{2}$/.test(p.endDate)) {
      return new Date(p.endDate + "T23:59:59" + israelOffset(new Date(p.endDate + "T12:00:00Z")));
    }
    var d = new Date(); // demo default: 14 days from today, end of day
    d.setDate(d.getDate() + 14); d.setHours(23, 59, 59, 0);
    return d;
  }

  function renderPromo() {
    var sec = $("#promo");
    if (!isOn("promo") || !C.promo) return;
    var end = promoEnd();
    if (end.getTime() <= Date.now()) return; // expired: stays hidden

    var p = C.promo;
    var endText = end.toLocaleDateString("he-IL", { day: "numeric", month: "long", timeZone: "Asia/Jerusalem" });
    sec.innerHTML = '<div class="container promo-inner">' +
      '<div class="reveal"><span class="kicker">' + esc(p.kicker) + '</span><h2 id="promo-title">' + esc(p.title) + "</h2><p>" + esc(p.text) + "</p></div>" +
      '<div class="reveal" style="--d:.1s">' +
        '<p class="visually-hidden">המבצע בתוקף עד ' + esc(endText) + "</p>" +
        '<div class="countdown" aria-hidden="true">' +
          '<div class="cd-unit"><b data-cd="d">00</b><span>ימים</span></div>' +
          '<div class="cd-unit"><b data-cd="h">00</b><span>שעות</span></div>' +
          '<div class="cd-unit"><b data-cd="m">00</b><span>דקות</span></div>' +
          '<div class="cd-unit"><b data-cd="s">00</b><span>שניות</span></div>' +
        "</div>" +
        waBtn(p.ctaText, p.whatsappMessage, "btn-block") +
        '<p class="promo-fine">בתוקף עד ' + esc(endText) + " או עד גמר המקומות.</p>" +
      "</div></div>";
    sec.hidden = false;

    var els = { d: $('[data-cd="d"]', sec), h: $('[data-cd="h"]', sec), m: $('[data-cd="m"]', sec), s: $('[data-cd="s"]', sec) };
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    function tick() {
      var diff = end.getTime() - Date.now();
      if (diff <= 0) { sec.hidden = true; clearInterval(timer); return; }
      var s = Math.floor(diff / 1000);
      els.d.textContent = pad(Math.floor(s / 86400));
      els.h.textContent = pad(Math.floor((s % 86400) / 3600));
      els.m.textContent = pad(Math.floor((s % 3600) / 60));
      els.s.textContent = pad(s % 60);
    }
    var timer = setInterval(tick, 1000);
    tick();
  }

  /* ---------------------------------------------------------------
     Before / After slider (pointer + touch + keyboard)
     --------------------------------------------------------------- */
  function renderBeforeAfter() {
    var sec = $("#before-after"), ba = C.beforeAfter;
    if (!isOn("beforeAfter") || !ba || !ba.items.length) return;

    sec.innerHTML = '<div class="container">' +
      sectionHead(ba.kicker, ba.title, "ba-title", "גררי את הידית כדי לראות את השינוי.", true) +
      '<div class="ba-wrap reveal">' +
        '<div class="tabs" role="tablist" aria-label="בחירת טיפול">' + ba.items.map(function (it, i) {
          return '<button type="button" class="chip" role="tab" id="ba-tab-' + i + '" aria-controls="ba-panel" aria-selected="' + (i === 0) + '" aria-pressed="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-index="' + i + '">' + esc(it.tab) + "</button>";
        }).join("") + "</div>" +
        '<div id="ba-panel" role="tabpanel" aria-labelledby="ba-tab-0">' +
          '<div class="ba" id="ba">' +
            '<div class="ba-layer ba-after" id="ba-after"></div>' +
            '<div class="ba-layer ba-before" id="ba-before"></div>' +
            '<span class="ba-label before">לפני</span><span class="ba-label after">אחרי</span>' +
            '<div class="ba-handle"><div class="ba-knob" role="slider" tabindex="0" aria-label="השוואת לפני ואחרי" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-valuetext="50% לפני">' + icon("arrows") + "</div></div>" +
          "</div>" +
          '<p class="ba-caption" id="ba-caption"></p>' +
        "</div>" +
      "</div>" +
      '<div class="section-cta center">' + waBtn("רוצה תוצאה כזו? בואי נדבר", C.contact.defaultWhatsappMessage) + "</div>" +
    "</div>";
    sec.hidden = false;

    var box = $("#ba"), knob = $(".ba-knob", box), tabs = $$('[role="tab"]', sec);
    var pos = 50;
    function setPos(v) {
      pos = Math.max(0, Math.min(100, v));
      box.style.setProperty("--pos", pos);
      knob.setAttribute("aria-valuenow", Math.round(pos));
      knob.setAttribute("aria-valuetext", Math.round(pos) + "% לפני");
    }
    function show(i) {
      var it = ba.items[i];
      $("#ba-before").innerHTML = media(it.before, "", "");
      $("#ba-after").innerHTML = media(it.after, "", "tint-b");
      $("#ba-caption").textContent = it.caption + " · " + ba.note;
      $("#ba-panel").setAttribute("aria-labelledby", "ba-tab-" + i);
      tabs.forEach(function (t, j) {
        t.setAttribute("aria-selected", String(j === i));
        t.setAttribute("aria-pressed", String(j === i));
        t.tabIndex = j === i ? 0 : -1;
      });
      setPos(50);
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { show(i); });
      t.addEventListener("keydown", function (e) {
        var dir = e.key === "ArrowLeft" ? 1 : e.key === "ArrowRight" ? -1 : 0; // RTL: left = next
        if (!dir) return;
        e.preventDefault();
        var n = (i + dir + tabs.length) % tabs.length;
        tabs[n].focus(); show(n);
      });
    });

    // Pointer drag (mouse + touch). "Before" is on the right, so measure from the right edge.
    var dragging = false;
    function fromEvent(e) {
      var r = box.getBoundingClientRect();
      setPos(((r.right - e.clientX) / r.width) * 100);
    }
    box.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      try { box.setPointerCapture(e.pointerId); } catch (err) {}
      fromEvent(e);
    });
    box.addEventListener("pointermove", function (e) { if (dragging) fromEvent(e); });
    ["pointerup", "pointercancel", "lostpointercapture"].forEach(function (ev) {
      box.addEventListener(ev, function () { dragging = false; });
    });

    knob.addEventListener("keydown", function (e) {
      var step = e.shiftKey ? 10 : 5, v = null;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") v = pos + step;   // handle moves left = more "before"
      if (e.key === "ArrowRight" || e.key === "ArrowDown") v = pos - step;
      if (e.key === "Home") v = 0;
      if (e.key === "End") v = 100;
      if (v !== null) { e.preventDefault(); setPos(v); }
    });

    show(0);
  }

  /* ---------------------------------------------------------------
     Skin quiz
     --------------------------------------------------------------- */
  function renderQuiz() {
    var sec = $("#quiz"), Q = C.quiz;
    if (!isOn("quiz") || !Q) return;

    sec.innerHTML = '<div class="container">' +
      sectionHead(Q.kicker, Q.title, "quiz-title", Q.intro, true) +
      '<div class="quiz-card reveal" id="quiz-card" aria-live="polite"></div>' +
    "</div>";
    sec.hidden = false;
    sec.classList.add("alt-bg");

    var card = $("#quiz-card");
    var answers = {}, step = 0, total = Q.questions.length;

    function progress(pct, label) {
      return '<div class="quiz-progress" role="progressbar" aria-label="התקדמות בשאלון" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + Math.round(pct) + '"><span style="width:' + pct + '%"></span></div>' +
        '<p class="quiz-step-label">' + esc(label) + "</p>";
    }

    function renderStep(focus) {
      var q = Q.questions[step];
      card.innerHTML = '<div class="quiz-anim">' +
        progress((step / total) * 100, "שאלה " + (step + 1) + " מתוך " + total) +
        '<h3 class="quiz-q" tabindex="-1" id="quiz-q">' + esc(q.text) + "</h3>" +
        '<div class="quiz-options" role="group" aria-labelledby="quiz-q">' + q.options.map(function (o) {
          return '<button type="button" class="quiz-option" data-value="' + esc(o.value) + '" aria-pressed="' + (answers[q.id] === o.value) + '">' + esc(o.label) + "</button>";
        }).join("") + "</div>" +
        '<div class="quiz-nav">' +
          (step > 0 ? '<button type="button" class="link-btn" data-quiz="back">חזרה לשאלה הקודמת</button>' : "<span></span>") +
          (step > 0 ? '<button type="button" class="link-btn" data-quiz="restart">התחילי מחדש</button>' : "") +
        "</div></div>";
      if (focus) $("#quiz-q").focus({ preventScroll: true });
    }

    function computeResult() {
      var rule = null;
      for (var i = 0; i < Q.rules.length && !rule; i++) {
        var w = Q.rules[i].when, ok = true;
        for (var k in w) if (Object.prototype.hasOwnProperty.call(w, k) && answers[k] !== w[k]) ok = false;
        if (ok) rule = Q.rules[i];
      }
      var t = findTreatment(rule ? rule.treatment : Q.fallbackTreatment) || C.treatments[0];
      return { treatment: t, why: rule && rule.why ? rule.why : t.description };
    }

    function renderResult() {
      var r = computeResult(), t = r.treatment;
      var note = (Q.skinNotes && Q.skinNotes[answers.skin]) || "";
      var msg = Q.whatsappMessage.replace("{treatment}", t.name);
      card.innerHTML = '<div class="quiz-anim quiz-result">' +
        progress(100, "סיימת! זו ההמלצה שלך") +
        '<span class="kicker">ההמלצה בשבילך</span>' +
        '<h3 tabindex="-1" id="quiz-result-title">' + esc(t.name) + "</h3>" +
        "<p>" + esc(r.why) + (note ? " " + esc(note) : "") + "</p>" +
        waBtn("שלחי לי את ההמלצה בוואטסאפ", msg) +
        '<p class="small">ההמלצה ראשונית בלבד. ההתאמה הסופית נעשית באבחון אישי.</p>' +
        '<button type="button" class="link-btn" data-quiz="restart">התחילי מחדש</button>' +
      "</div>";
      $("#quiz-result-title").focus({ preventScroll: true });
    }

    card.addEventListener("click", function (e) {
      var opt = e.target.closest(".quiz-option");
      var act = e.target.closest("[data-quiz]");
      if (opt) {
        var q = Q.questions[step];
        answers[q.id] = opt.getAttribute("data-value");
        $$(".quiz-option", card).forEach(function (b) { b.setAttribute("aria-pressed", String(b === opt)); });
        setTimeout(function () {
          step++;
          if (step < total) renderStep(true); else renderResult();
        }, reduceMotion ? 0 : 260);
      } else if (act) {
        var a = act.getAttribute("data-quiz");
        if (a === "back" && step > 0) { step--; renderStep(true); }
        if (a === "restart") { answers = {}; step = 0; renderStep(true); }
      }
    });

    renderStep(false);
  }

  /* ---------------------------------------------------------------
     About
     --------------------------------------------------------------- */
  function renderAbout() {
    var a = C.about;
    $("#about").innerHTML = '<div class="container about-grid">' +
      '<div class="about-media reveal">' + media(a.imageSlot, "ratio-about") + "</div>" +
      '<div class="about-text">' +
        sectionHead(a.kicker, a.title, "about-title") +
        a.paragraphs.map(function (p, i) { return '<p class="reveal" style="--d:' + i * 0.08 + 's">' + esc(p) + "</p>"; }).join("") +
        '<p class="signature reveal">' + esc(a.signature) + "</p>" +
        '<ul class="values">' + a.values.map(function (v, i) {
          return '<li class="value reveal" style="--d:' + i * 0.08 + 's">' + icon(v.icon) + "<h3>" + esc(v.title) + "</h3><p>" + esc(v.text) + "</p></li>";
        }).join("") + "</ul>" +
        '<div class="section-cta reveal">' + waBtn("לקביעת אבחון אישי", "היי " + owner + ", אשמח לקבוע אבחון אישי 🙂") + "</div>" +
      "</div>" +
    "</div>";
  }

  /* ---------------------------------------------------------------
     Testimonials carousel (scroll-snap + buttons + dots)
     --------------------------------------------------------------- */
  function renderTestimonials() {
    var sec = $("#testimonials"), list = C.testimonials;
    if (!isOn("testimonials") || !list || !list.length) return;
    var r = C.rating;

    sec.innerHTML = '<div class="container">' +
      sectionHead("המלצות", "מה מספרות המטופלות", "testimonials-title", null, true) +
      '<div class="t-wrap reveal" role="region" aria-roledescription="קרוסלה" aria-label="המלצות מטופלות">' +
        '<div class="t-track" id="t-track">' + list.map(function (t, i) {
          return '<figure class="t-slide" role="group" aria-roledescription="שקופית" aria-label="' + (i + 1) + " מתוך " + list.length + '">' +
            '<span class="t-quote-mark" aria-hidden="true">”</span>' +
            "<blockquote><p>" + esc(t.text) + "</p></blockquote>" +
            "<figcaption><strong>" + esc(t.name) + "</strong> · " + esc(t.treatment) + "</figcaption></figure>";
        }).join("") + "</div>" +
        (list.length > 1 ?
        '<div class="t-controls">' +
          '<button type="button" class="round-btn" data-t="prev" aria-label="ההמלצה הקודמת">' + icon("chevronRight") + "</button>" +
          '<div class="dots">' + list.map(function (t, i) {
            return '<button type="button" class="dot" data-t-dot="' + i + '" aria-label="המלצה ' + (i + 1) + '"' + (i === 0 ? ' aria-current="true"' : "") + "></button>";
          }).join("") + "</div>" +
          '<button type="button" class="round-btn" data-t="next" aria-label="ההמלצה הבאה">' + icon("chevronLeft") + "</button>" +
        "</div>" : "") +
      "</div>" +
      '<div class="section-cta center">' +
        // TODO: link to the client's Google reviews (C.rating.reviewsUrl)
        '<a class="btn btn-ghost" href="' + esc((r && r.reviewsUrl) || "#") + '"' + (r && r.reviewsUrl && r.reviewsUrl !== "#" ? ' target="_blank" rel="noopener"' : "") + ">" + icon("star") + "<span>לכל הביקורות בגוגל</span></a>" +
        waBtn("גם את רוצה להרגיש ככה?", C.contact.defaultWhatsappMessage) +
      "</div>" +
    "</div>";
    sec.hidden = false;
    sec.classList.add("alt-bg");

    var track = $("#t-track"), slides = $$(".t-slide", track), dots = $$(".dot", sec);
    var active = 0;
    function goTo(i) {
      i = (i + slides.length) % slides.length;
      // compute scroll target without scrollIntoView (avoids page jumps); works in RTL
      var tr = track.getBoundingClientRect(), sr = slides[i].getBoundingClientRect();
      track.scrollBy({ left: sr.left - tr.left, behavior: reduceMotion ? "auto" : "smooth" });
    }
    function setActive(i) {
      active = i;
      dots.forEach(function (d, j) { if (j === i) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
    }
    sec.addEventListener("click", function (e) {
      var b = e.target.closest("[data-t]"), d = e.target.closest("[data-t-dot]");
      if (b) goTo(active + (b.getAttribute("data-t") === "next" ? 1 : -1));
      if (d) goTo(parseInt(d.getAttribute("data-t-dot"), 10));
    });
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) setActive(slides.indexOf(en.target)); });
      }, { root: track, threshold: 0.6 });
      slides.forEach(function (s) { io.observe(s); });
    }
  }

  /* ---------------------------------------------------------------
     Brands
     --------------------------------------------------------------- */
  function renderBrands() {
    var sec = $("#brands");
    if (!isOn("brands") || !C.brands || !C.brands.length) return;
    sec.innerHTML = '<div class="container brands-inner reveal">' +
      '<h2 class="brands-title" id="brands-title">עובדות עם מותגים מקצועיים</h2>' +
      C.brands.map(function (b) {
        return '<span class="brand-logo">' + (b.logo ? '<img src="' + esc(b.logo) + '" alt="' + esc(b.name) + '" loading="lazy">' : esc(b.name)) + "</span>";
      }).join("") +
    "</div>";
    sec.hidden = false;
  }

  /* ---------------------------------------------------------------
     FAQ accordion
     --------------------------------------------------------------- */
  function renderFaq() {
    var sec = $("#faq");
    if (!isOn("faq") || !C.faq || !C.faq.length) return;
    sec.innerHTML = '<div class="container">' +
      sectionHead("שאלות נפוצות", "כל מה שרצית לשאול", "faq-title", null, true) +
      '<div class="faq-list reveal">' + C.faq.map(function (f, i) {
        return '<div class="faq-item"><h3>' +
          '<button type="button" class="faq-q" id="faq-q-' + i + '" aria-expanded="false" aria-controls="faq-a-' + i + '">' +
            "<span>" + esc(f.q) + '</span><span class="faq-icon" aria-hidden="true"></span></button></h3>' +
          '<div class="faq-a" id="faq-a-' + i + '" role="region" aria-labelledby="faq-q-' + i + '"><div><p>' + esc(f.a) + "</p></div></div></div>";
      }).join("") + "</div>" +
      '<div class="section-cta center">' + waBtn("יש לך שאלה אחרת? כתבי לי", C.contact.defaultWhatsappMessage, "btn-outline") + "</div>" +
    "</div>";
    sec.hidden = false;

    $$(".faq-q", sec).forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      panel.inert = true;
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") !== "true";
        btn.setAttribute("aria-expanded", String(open));
        panel.classList.toggle("is-open", open);
        panel.inert = !open;
      });
    });
  }

  /* ---------------------------------------------------------------
     Contact: hours (today highlighted, open-now by Israel time), map
     --------------------------------------------------------------- */
  function renderContact() {
    var c = C.contact;
    var sorted = C.hours.slice().sort(function (a, b) { return a.day - b.day; });
    $("#contact").innerHTML = '<div class="container">' +
      sectionHead("צור קשר", "בואי נכיר", "contact-title", "הדרך הכי מהירה לקבוע תור היא וואטסאפ. אפשר גם להתקשר, או פשוט לקפוץ לקליניקה.") +
      '<div class="contact-grid">' +
        '<div class="reveal">' +
          '<div class="contact-block"><h3>כתובת</h3><p class="address">' + esc(c.street + ", " + c.city) + "<small>" + esc(c.addressNote) + "</small></p></div>" +
          '<div class="contact-block"><h3>שעות פתיחה</h3>' +
            '<p class="open-status" id="open-status" aria-live="polite"></p>' +
            '<table class="hours-table"><caption class="visually-hidden">שעות פתיחה</caption><tbody>' + sorted.map(function (h) {
              return '<tr data-day="' + h.day + '"><th scope="row">' + esc(h.label) + "</th><td>" + (h.closed ? "סגור" : esc(h.open + "–" + h.close)) + "</td></tr>";
            }).join("") + "</tbody></table></div>" +
          '<div class="contact-actions">' +
            waBtn("וואטסאפ", c.defaultWhatsappMessage) +
            '<a class="btn btn-ghost" href="' + telLink + '">' + icon("phone") + "<span>חיוג</span></a>" +
            '<a class="btn btn-ghost" href="' + esc(c.wazeUrl) + '" target="_blank" rel="noopener">' + icon("nav") + "<span>ניווט ב-Waze</span></a>" +
            '<a class="btn btn-ghost" href="mailto:' + esc(c.email) + '">' + icon("mail") + "<span>אימייל</span></a>" +
          "</div>" +
        "</div>" +
        '<div class="map reveal" style="--d:.1s"><iframe src="' + esc(c.mapEmbedUrl) + '" title="' + esc("מפה: " + C.business.name + ", " + c.street + " " + c.city) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>' +
      "</div>" +
    "</div>";

    updateOpenStatus();
    setInterval(updateOpenStatus, 60000);
  }

  function updateOpenStatus() {
    var now = israelNow();
    var byDay = {};
    C.hours.forEach(function (h) { byDay[h.day] = h; });
    var today = byDay[now.day];

    $$(".hours-table tr").forEach(function (tr) {
      var isToday = parseInt(tr.getAttribute("data-day"), 10) === now.day;
      tr.classList.toggle("is-today", isToday);
      var th = tr.querySelector("th"), tag = th.querySelector(".today-tag");
      if (isToday && !tag) th.insertAdjacentHTML("beforeend", '<span class="today-tag">היום</span>');
      if (!isToday && tag) tag.parentNode.removeChild(tag);
    });

    var el = $("#open-status");
    if (!el) return;
    var open = today && !today.closed && now.minutes >= toMinutes(today.open) && now.minutes < toMinutes(today.close);
    el.classList.toggle("is-open", !!open);
    if (open) { el.textContent = "פתוח עכשיו · עד " + today.close; return; }

    // find next opening
    var text = "סגור עכשיו";
    if (today && !today.closed && now.minutes < toMinutes(today.open)) {
      text += " · נפתח היום ב-" + today.open;
    } else {
      for (var i = 1; i <= 7; i++) {
        var h = byDay[(now.day + i) % 7];
        if (h && !h.closed) { text += " · נפתח " + (i === 1 ? "מחר" : "ביום " + h.label) + " ב-" + h.open; break; }
      }
    }
    el.textContent = text;
  }

  /* ---------------------------------------------------------------
     Footer, mobile bar
     --------------------------------------------------------------- */
  function renderFooter() {
    var c = C.contact;
    $("#site-footer").innerHTML = '<div class="container">' +
      '<div class="footer-grid">' +
        '<div><a class="wordmark" href="#top">' + esc(C.business.name) + "<small>" + esc(C.business.nameEn) + "</small></a>" +
          "<p>" + esc(C.business.tagline) + "</p></div>" +
        '<nav aria-label="קישורים מהירים"><h3>קישורים</h3><ul class="footer-links">' +
          navItems().map(function (n) { return '<li><a href="#' + esc(n.target) + '">' + esc(n.label) + "</a></li>"; }).join("") +
        "</ul></nav>" +
        "<div><h3>פרטי קשר</h3><ul class=\"footer-links\">" +
          "<li>" + esc(c.street + ", " + c.city) + "</li>" +
          '<li><a href="' + telLink + '">' + esc(c.phoneDisplay) + "</a></li>" +
          '<li><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></li>" +
          '<li><a href="accessibility.html">הצהרת נגישות</a></li>' +
        "</ul></div>" +
      "</div>" +
      '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + " " + esc(C.business.name) + ". כל הזכויות שמורות.</span>" +
        (C.credit ? "<span>" + esc(C.credit) + "</span>" : "") + "</div>" +
    "</div>";
  }

  function renderMobileBar() {
    $("#mobile-bar").innerHTML =
      '<a class="is-primary" href="' + waLink() + '" target="_blank" rel="noopener">' + icon("whatsapp") + "<span>וואטסאפ</span></a>" +
      '<a href="' + telLink + '">' + icon("phone") + "<span>חיוג</span></a>" +
      '<a href="' + esc(C.contact.wazeUrl) + '" target="_blank" rel="noopener">' + icon("nav") + "<span>ניווט</span></a>";
  }

  /* ---------------------------------------------------------------
     Accessibility toolbar (saved in localStorage)
     --------------------------------------------------------------- */
  function initA11y() {
    var root = document.documentElement;
    var toggle = $("#a11y-toggle"), panel = $("#a11y-panel");
    var prefs = {};
    try { prefs = JSON.parse(localStorage.getItem("a11yPrefs") || "{}"); } catch (e) {}
    var sizes = [0.9, 1, 1.12, 1.25, 1.4];

    function save() { try { localStorage.setItem("a11yPrefs", JSON.stringify(prefs)); } catch (e) {} }
    function apply() {
      root.style.setProperty("--font-scale", prefs.size || 1);
      root.classList.toggle("a11y-contrast", !!prefs.contrast);
      root.classList.toggle("a11y-links", !!prefs.links);
      $('[data-a11y="contrast"]').setAttribute("aria-pressed", String(!!prefs.contrast));
      $('[data-a11y="links"]').setAttribute("aria-pressed", String(!!prefs.links));
      save();
    }
    function setOpen(open) {
      panel.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
    }
    toggle.addEventListener("click", function () { setOpen(panel.hidden); });
    panel.addEventListener("click", function (e) {
      var b = e.target.closest("[data-a11y]");
      if (!b) return;
      var a = b.getAttribute("data-a11y");
      var idx = sizes.indexOf(prefs.size || 1); if (idx < 0) idx = 1;
      if (a === "bigger") prefs.size = sizes[Math.min(idx + 1, sizes.length - 1)];
      if (a === "smaller") prefs.size = sizes[Math.max(idx - 1, 0)];
      if (a === "contrast") prefs.contrast = !prefs.contrast;
      if (a === "links") prefs.links = !prefs.links;
      if (a === "reset") prefs = {};
      apply();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) { setOpen(false); toggle.focus(); } });
    document.addEventListener("click", function (e) { if (!panel.hidden && !e.target.closest("#a11y")) setOpen(false); });
    apply();
  }

  /* ---------------------------------------------------------------
     Demo theme switcher (?themes=1) — for sales calls
     --------------------------------------------------------------- */
  function initThemeSwitcher() {
    var q;
    try { q = new URLSearchParams(location.search); } catch (e) { return; }
    if (q.get("themes") !== "1") return;
    var themes = [
      { id: "editorial", label: "Editorial", color: "#4A1426" },
      { id: "noir",      label: "Noir",      color: "#C9957B" },
      { id: "clinic",    label: "Clinic",    color: "#7C9A86" },
      { id: "warm",      label: "Warm",      color: "#B86B4B" }
    ];
    var root = document.documentElement;
    var box = document.createElement("div");
    box.className = "theme-switcher";
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "תצוגת ערכות צבע (דמו)");
    box.innerHTML = "<p>ערכות צבע</p>" + themes.map(function (t) {
      return '<button type="button" data-theme-id="' + t.id + '" aria-pressed="' + (root.getAttribute("data-theme") === t.id) + '" aria-label="' + t.label + '">' +
        '<span class="swatch" style="background:' + t.color + '"></span><span>' + t.label + "</span></button>";
    }).join("");
    document.body.appendChild(box);
    box.addEventListener("click", function (e) {
      var b = e.target.closest("[data-theme-id]");
      if (!b) return;
      var id = b.getAttribute("data-theme-id");
      root.setAttribute("data-theme", id);
      try { sessionStorage.setItem("demoTheme", id); } catch (err) {}
      $$("[data-theme-id]", box).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      updateThemeColor();
    });
  }
  function updateThemeColor() {
    var bg = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
    if (bg) setMeta("name", "theme-color", bg);
  }

  /* ---------------------------------------------------------------
     Reveal on scroll (content is never hidden if JS/IO is missing)
     --------------------------------------------------------------- */
  function initReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("js-motion");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------------
     Static icons in index.html ([data-icon])
     --------------------------------------------------------------- */
  function fillStaticIcons() {
    $$("[data-icon]").forEach(function (el) {
      var tmp = document.createElement("div");
      tmp.innerHTML = icon(el.getAttribute("data-icon"));
      el.innerHTML = tmp.firstChild.innerHTML;
    });
  }

  /* ---------------------------------------------------------------
     Boot — each block is isolated so one error can't blank the page
     --------------------------------------------------------------- */
  [
    renderSeo, renderHeader, initMobileMenu, renderHero, renderStats, renderConcerns, initSheet,
    renderTreatments, renderPromo, renderBeforeAfter, renderQuiz, renderAbout, renderTestimonials,
    renderBrands, renderFaq, renderContact, renderFooter, renderMobileBar, fillStaticIcons,
    initA11y, initThemeSwitcher, updateThemeColor, initReveal
  ].forEach(function (fn) {
    try { fn(); } catch (e) { console.error("[site] " + fn.name + " failed:", e); }
  });

  // close the concern sheet if the screen grows to desktop
  mobileQuery.addEventListener("change", function (m) { if (!m.matches) closeSheet(); });
})();
