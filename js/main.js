/* =====================================================================
   Beauty Clinic Template v2 — rendering + interactions
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
  var isOn = function (key) { return !C.sections || C.sections[key] !== false; };
  var owner = C.business.ownerFirstName;
  var telLink = "tel:+" + C.contact.phoneIntl;

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
  function findTreatment(id) {
    return C.treatments.filter(function (t) { return t.id === id; })[0] || null;
  }

  var ICONS = {
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" focusable="false" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"/></svg>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    nav: '<path d="M3 11 22 2l-9 19-2-8-8-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    repeat: '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    arrowLeft: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    flask: '<path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7 15h10"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
    camera: '<path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="4"/>',
    a11y: '<circle cx="12" cy="4.5" r="1.8"/><path d="M5 8.5l7 1.5 7-1.5M12 10v4.5M12 14.5 9 21M12 14.5l3 6.5"/>',
    arrows: '<path d="m9 7-5 5 5 5M15 7l5 5-5 5"/>',
    pause: '<path d="M9 5v14M15 5v14"/>',
    play: '<path d="M8 5v14l11-7z"/>',
    star: '<svg viewBox="0 0 24 24" fill="#E3A008" focusable="false" aria-hidden="true"><path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/></svg>'
  };
  function svg(name) {
    var p = ICONS[name] || "";
    return p.indexOf("<svg") === 0 ? p :
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true">' + p + "</svg>";
  }
  function icon(name) { return '<span class="icon" aria-hidden="true">' + svg(name) + "</span>"; }

  /* Image slot: real image (with optional WebP) or a styled placeholder */
  function media(slotId, opts) {
    opts = opts || {};
    var s = (C.images && C.images[slotId]) || { label: slotId };
    var inner;
    if (s.src) {
      var attrs = ' alt="' + esc(s.alt || "") + '" decoding="async"' +
        (opts.eager ? ' fetchpriority="high"' : ' loading="lazy"');
      var img = '<img src="' + esc(s.src) + '"' + attrs + ">";
      inner = s.webp ? '<picture><source srcset="' + esc(s.webp) + '" type="image/webp">' + img + "</picture>" : img;
    } else {
      inner = '<div class="placeholder ' + (opts.alt ? "alt" : "") + '" role="img" aria-label="' + esc("מקום לתמונה: " + (s.label || slotId)) + '">' +
        icon("camera") + "<span>📷 להוסיף תמונה: " + esc(s.label || slotId) + "</span></div>";
    }
    return '<div class="media ' + (opts.cls || "") + '">' + inner + "</div>";
  }

  function head(kicker, title, id, lead, center) {
    return '<div class="section-head' + (center ? " center" : "") + '">' +
      (kicker ? '<p class="kicker">' + esc(kicker) + "</p>" : "") +
      '<h2 class="section-title" id="' + id + '">' + esc(title) + "</h2>" +
      (lead ? '<p class="section-lead">' + esc(lead) + "</p>" : "") + "</div>";
  }
  function waBtn(text, message, cls) {
    return '<a class="btn ' + (cls || "btn-accent") + '" href="' + waLink(message) + '" target="_blank" rel="noopener">' + icon("whatsapp") + "<span>" + esc(text) + "</span></a>";
  }
  function arrows(label) {
    return '<div class="c-arrows" role="group" aria-label="' + esc(label) + '">' +
      '<button type="button" class="round-btn" data-dir="prev" aria-label="הקודם">' + icon("chevronRight") + "</button>" +
      '<button type="button" class="round-btn" data-dir="next" aria-label="הבא">' + icon("chevronLeft") + "</button></div>";
  }

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
    var abs = function (p) { try { return new URL(p, s.siteUrl || location.href).href; } catch (e) { return p; } };
    document.title = s.title || C.business.name;
    setMeta("name", "description", s.description);
    setMeta("property", "og:title", s.title);
    setMeta("property", "og:description", s.description);
    setMeta("property", "og:site_name", C.business.name);
    if (s.siteUrl) setMeta("property", "og:url", s.siteUrl);
    if (s.ogImage) setMeta("property", "og:image", abs(s.ogImage));
    var robots = document.head.querySelector('meta[name="robots"]');
    if (C.demoMode) setMeta("name", "robots", "noindex, nofollow");
    else if (robots) robots.parentNode.removeChild(robots);
    if (C.palette && C.palette.bg) setMeta("name", "theme-color", C.palette.bg);

    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var schema = {
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      name: C.business.name,
      alternateName: [C.business.nameEn, C.business.aka].filter(Boolean),
      description: s.description,
      telephone: "+" + C.contact.phoneIntl,
      email: C.contact.email,
      address: { "@type": "PostalAddress", streetAddress: C.contact.street, addressLocality: C.contact.city, addressCountry: C.contact.country },
      openingHoursSpecification: C.hours.map(function (h) {
        return { "@type": "OpeningHoursSpecification", dayOfWeek: "https://schema.org/" + days[h.day], opens: h.open, closes: h.close };
      }),
      aggregateRating: { "@type": "AggregateRating", ratingValue: C.rating.value, reviewCount: C.rating.count, bestRating: 5 }
    };
    if (s.siteUrl) schema.url = s.siteUrl;
    if (s.ogImage) schema.image = abs(s.ogImage);
    var ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify(schema);
    document.head.appendChild(ld);
  }

  /* ---------------------------------------------------------------
     Header + navigation
     --------------------------------------------------------------- */
  var sectionKeyById = { results: "beforeAfter", testimonials: "testimonials", faq: "faq" };
  function navItems() {
    return C.nav.filter(function (n) { var k = sectionKeyById[n.target]; return !k || isOn(k); });
  }
  function wordmark() {
    return "<b>" + esc(C.business.name) + '</b><span class="en">' + esc(C.business.nameEn) + "</span>";
  }

  function renderHeader() {
    $("#header-logo").innerHTML = wordmark();
    $("#header-logo").setAttribute("aria-label", C.business.name + ", לראש העמוד");
    $("#nav-list").innerHTML = navItems().map(function (n) {
      return '<li><a href="#' + esc(n.target) + '">' + esc(n.label) + "</a></li>";
    }).join("");
    $("#mobile-nav-list").innerHTML = navItems().map(function (n, i) {
      return '<li><a href="#' + esc(n.target) + '" style="transition-delay:' + (0.04 + i * 0.05) + 's">' + esc(n.label) + "</a></li>";
    }).join("");
    $("#mobile-menu-foot").innerHTML =
      waBtn(C.hero.primaryCta, null) +
      '<a class="btn btn-outline" href="' + telLink + '">' + icon("phone") + "<span>" + esc(C.contact.phoneDisplay) + "</span></a>" +
      "<p>" + esc(C.contact.street + ", " + C.contact.city) + "</p>";
    $("#header-cta").href = waLink();
  }

  /* "Headroom": hide on scroll down, show on scroll up, solid after 80px */
  function initSmartHeader() {
    var header = $("#site-header");
    var lastY = window.scrollY, ticking = false;
    function update() {
      var y = window.scrollY;
      header.classList.toggle("is-solid", y > 80);
      if (Math.abs(y - lastY) > 6) {
        var menuOpen = document.body.classList.contains("menu-open");
        if (y > lastY && y > 160 && !menuOpen && !header.contains(document.activeElement)) header.classList.add("is-hidden");
        else if (y < lastY) header.classList.remove("is-hidden");
        lastY = y;
      }
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    header.addEventListener("focusin", function () { header.classList.remove("is-hidden"); });
    update();
  }

  function trapFocus(e, container) {
    var items = $$("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])", container)
      .filter(function (el) { return el.offsetParent !== null; });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function initMobileMenu() {
    var btn = $("#menu-toggle"), menu = $("#mobile-menu"), header = $("#site-header");
    function open() {
      menu.hidden = false;
      void menu.offsetWidth; // reflow so the transition runs
      menu.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "סגירת תפריט");
      document.body.classList.add("menu-open");
      header.classList.remove("is-hidden");
      var first = $("a", menu); if (first) first.focus({ preventScroll: true });
    }
    function close(restore) {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "פתיחת תפריט");
      document.body.classList.remove("menu-open");
      setTimeout(function () { if (!menu.classList.contains("is-open")) menu.hidden = true; }, reduceMotion ? 0 : 300);
      if (restore) btn.focus();
    }
    btn.addEventListener("click", function () { menu.classList.contains("is-open") ? close(true) : open(); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) close(false); });
    document.addEventListener("keydown", function (e) {
      if (!menu.classList.contains("is-open")) return;
      if (e.key === "Escape") close(true);
      if (e.key === "Tab") {
        // cycle between the toggle button and the menu links
        var items = [btn].concat($$("a", menu));
        var first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    window.matchMedia("(min-width: 1024px)").addEventListener("change", function (m) {
      if (m.matches && menu.classList.contains("is-open")) close(false);
    });
  }

  /* ---------------------------------------------------------------
     Promo timing (shared by hero pill + promo card)
     --------------------------------------------------------------- */
  function israelOffset(date) {
    try {
      var tz = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Jerusalem", timeZoneName: "shortOffset" })
        .formatToParts(date).filter(function (p) { return p.type === "timeZoneName"; })[0].value; // "GMT+2"
      var m = tz.match(/GMT([+-]\d+)/), h = m ? parseInt(m[1], 10) : 2;
      return (h >= 0 ? "+" : "-") + ("0" + Math.abs(h)).slice(-2) + ":00";
    } catch (e) { return "+02:00"; }
  }
  var promoEnd = (function () {
    var p = C.promo;
    if (!p) return null;
    if (p.endDate && /^\d{4}-\d{2}-\d{2}$/.test(p.endDate)) {
      return new Date(p.endDate + "T23:59:59" + israelOffset(new Date(p.endDate + "T12:00:00Z")));
    }
    var d = new Date(); // demo default: 14 days from today, end of day
    d.setDate(d.getDate() + 14); d.setHours(23, 59, 59, 0);
    return d;
  })();
  var promoActive = isOn("promo") && !!promoEnd && promoEnd.getTime() > Date.now();

  /* ---------------------------------------------------------------
     Hero
     --------------------------------------------------------------- */
  function renderHero() {
    var h = C.hero;
    $("#hero").innerHTML = '<div class="container hero-grid">' +
      '<div class="hero-text">' +
        '<span class="en">' + esc(h.kicker) + "</span>" +
        '<h1 class="hero-title" id="hero-title">' + h.titleLines.map(function (l) { return "<span>" + esc(l) + "</span>"; }).join("") + "</h1>" +
        '<p class="hero-lead">' + esc(h.text) + "</p>" +
        '<div class="hero-actions">' +
          waBtn(h.primaryCta, null) +
          '<a class="btn btn-outline" href="#treatments">' + esc(h.secondaryCta) + "</a>" +
        "</div>" +
        (promoActive ? '<button type="button" class="promo-pill" id="promo-pill">' + esc(h.promoPill) + icon("arrowLeft") + "</button>" : "") +
      "</div>" +
      '<div class="hero-visual">' +
        '<span class="arch-outline" aria-hidden="true"></span>' +
        '<div class="arch">' + media(h.imageSlot, { eager: true }) + "</div>" +
        '<ul class="glass-chips" aria-label="במספרים">' + h.chips.map(function (c) {
          // keep "35+" / "90%+" in LTR order inside the Hebrew line
          return '<li class="glass">' + esc(c.text).replace(/(\d[\d.]*[%+]+)/g, '<bdi dir="ltr">$1</bdi>') + "</li>";
        }).join("") + "</ul>" +
      "</div>" +
    "</div>";
  }

  /* ---------------------------------------------------------------
     Marquee (two identical groups = seamless loop)
     --------------------------------------------------------------- */
  function renderMarquee() {
    var group = C.marquee.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("");
    // repeat the list so one group is always wider than the screen
    var wide = group + group;
    $("#marquee").innerHTML = '<div class="marquee-track"><div class="marquee-group">' + wide + '</div><div class="marquee-group">' + wide + "</div></div>";
  }

  /* ---------------------------------------------------------------
     Generic horizontal carousel: scroll-snap + drag + arrows + swipe
     --------------------------------------------------------------- */
  function initCarousel(wrap) {
    var track = $(".c-track", wrap);
    var prev = $('[data-dir="prev"]', wrap), next = $('[data-dir="next"]', wrap);
    var rtl = getComputedStyle(track).direction === "rtl";

    function stepSize() {
      var item = $$(".c-track > *", wrap).filter(function (el) { return !el.hidden; })[0];
      var gap = parseFloat(getComputedStyle(track).columnGap) || 18;
      return item ? item.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
    }
    function go(dir) { // dir: 1 = next, -1 = prev
      track.scrollBy({ left: dir * stepSize() * (rtl ? -1 : 1), behavior: reduceMotion ? "auto" : "smooth" });
    }
    function updateButtons() {
      if (!prev) return;
      var max = track.scrollWidth - track.clientWidth, pos = Math.abs(track.scrollLeft);
      prev.disabled = pos < 4;
      next.disabled = pos > max - 4;
    }
    if (prev) {
      prev.addEventListener("click", function () { go(-1); });
      next.addEventListener("click", function () { go(1); });
    }
    track.addEventListener("scroll", function () { requestAnimationFrame(updateButtons); }, { passive: true });
    window.addEventListener("resize", updateButtons);

    // Mouse drag-to-scroll (touch already swipes natively)
    var down = false, moved = false, startX = 0, startScroll = 0;
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0 || e.target.closest(".ba")) return;
      down = true; moved = false; startX = e.clientX; startScroll = track.scrollLeft;
    });
    track.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) {
        moved = true; track.classList.add("is-dragging");
        try { track.setPointerCapture(e.pointerId); } catch (err) {}
      }
      if (moved) track.scrollLeft = startScroll - dx;
    });
    function end() {
      if (!down) return;
      down = false;
      if (moved) {
        // re-enable snapping, then let it settle on the nearest card
        var left = track.scrollLeft;
        track.classList.remove("is-dragging");
        track.scrollLeft = left;
      }
    }
    track.addEventListener("pointerup", end);
    track.addEventListener("pointercancel", end);
    track.addEventListener("lostpointercapture", end);
    // A drag must not trigger a click on links/buttons inside the cards
    track.addEventListener("click", function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);

    updateButtons();
    return { track: track, update: updateButtons, reset: function () { track.scrollTo({ left: 0, behavior: "auto" }); updateButtons(); } };
  }

  /* ---------------------------------------------------------------
     "מצאי את הטיפול שלך": filters + treatments carousel + quiz entry
     --------------------------------------------------------------- */
  var finderCarousel = null;

  function promoCardHtml() {
    var p = C.promo;
    return '<article class="card card-promo" id="promo-card" tabindex="-1" data-concerns="' + esc((p.concerns || []).join(" ")) + '" aria-labelledby="promo-card-title">' +
      '<span class="badge">' + esc(p.badge) + "</span>" +
      '<div><h3 id="promo-card-title">' + esc(p.title) + "</h3></div>" +
      "<p>" + esc(p.text) + "</p>" +
      '<div><p class="visually-hidden" id="promo-end-text"></p>' +
        '<div class="countdown" aria-hidden="true">' +
          '<div><b data-cd="d">00</b><span>ימים</span></div>' +
          '<div><b data-cd="h">00</b><span>שעות</span></div>' +
          '<div><b data-cd="m">00</b><span>דקות</span></div>' +
          '<div><b data-cd="s">00</b><span>שניות</span></div>' +
        "</div></div>" +
      '<a class="btn btn-light" href="' + waLink(p.whatsappMessage) + '" target="_blank" rel="noopener">' + esc(p.ctaText) + "</a>" +
    "</article>";
  }
  function giftCardHtml() {
    var g = C.giftCard;
    return '<article class="card card-gift" data-concerns="" aria-labelledby="gift-title">' +
      '<h3 id="gift-title">' + esc(g.title) + "</h3>" +
      '<div class="gift-art" aria-hidden="true">' + esc(C.business.name) + "</div>" +
      "<p>" + esc(g.text) + "</p>" +
      waBtn(g.ctaText, g.whatsappMessage, "btn-outline") +
    "</article>";
  }
  function treatmentCardHtml(t) {
    return '<article class="card" data-concerns="' + esc((t.concerns || []).join(" ")) + '" aria-labelledby="t-' + esc(t.id) + '">' +
      media(t.imageSlot) +
      '<div class="card-body">' +
        '<h3 id="t-' + esc(t.id) + '">' + esc(t.name) + "</h3>" +
        '<p class="card-desc">' + esc(t.description) + "</p>" +
        '<div class="card-meta"><span>' + icon("clock") + '<span class="visually-hidden">משך: </span>' + esc(t.duration) + "</span>" +
          "<span>" + icon("repeat") + '<span class="visually-hidden">מספר טיפולים: </span>' + esc(t.sessions) + "</span></div>" +
        '<div class="card-foot"><span class="price"><small>החל מ-</small>₪' + esc(t.price) + "</span>" +
          '<a class="text-link" href="' + waLink("היי " + owner + ", אשמח לפרטים ולתיאום " + t.name + " 🙂") + '" target="_blank" rel="noopener" aria-label="' + esc("לתיאום " + t.name + " בוואטסאפ") + '">לתיאום ' + icon("arrowLeft") + "</a></div>" +
      "</div></article>";
  }

  function renderFinder() {
    var f = C.finder;
    var cards = (promoActive ? promoCardHtml() : "") +
      C.treatments.map(treatmentCardHtml).join("") +
      (isOn("giftCard") && C.giftCard ? giftCardHtml() : "");

    $("#treatments").innerHTML = '<div class="container">' +
      '<div class="head-row">' + head(f.kicker, f.title, "treatments-title", f.text) + arrows("ניווט בין הטיפולים") + "</div>" +
      '<div class="filters" role="group" aria-label="סינון לפי מה שמציק לך">' + f.filters.map(function (x, i) {
        return '<button type="button" class="pill" data-filter="' + esc(x.id) + '" aria-pressed="' + (i === 0) + '">' + esc(x.label) + "</button>";
      }).join("") + "</div>" +
      '<div class="carousel" id="finder-carousel" role="region" aria-roledescription="קרוסלה" aria-label="טיפולים ומחירים">' +
        '<div class="c-track reveal" tabindex="0" aria-label="רשימת טיפולים, גללי לצדדים">' + cards + "</div>" +
      "</div>" +
      '<div class="finder-foot">' +
        (isOn("quiz") && C.quiz ? '<button type="button" class="btn btn-outline" id="open-quiz">' + esc(f.quizCta) + icon("arrowLeft") + "</button>" : "") +
        '<p class="note">* המחירים הם "החל מ-", והמחיר הסופי נקבע באבחון האישי.</p>' +
      "</div>" +
    "</div>";

    // the arrows live in the header row, so the carousel wrapper is the whole section container
    finderCarousel = initCarousel($("#treatments .container"));
    initFilters();
    if (promoActive) startCountdown();

    var pill = $("#promo-pill");
    if (pill) pill.addEventListener("click", function () {
      setFilter("all");
      $("#treatments").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      var card = $("#promo-card");
      if (!card) return;
      card.classList.remove("is-highlight"); void card.offsetWidth; card.classList.add("is-highlight");
      setTimeout(function () { card.focus({ preventScroll: true }); }, reduceMotion ? 0 : 600);
    });
    var quizBtn = $("#open-quiz");
    if (quizBtn) quizBtn.addEventListener("click", function () { openQuiz(quizBtn); });
  }

  var setFilter = function () {};
  function initFilters() {
    var pills = $$("#treatments .pill");
    var cards = $$("#treatments .card");
    var timer = null;
    setFilter = function (f) {
      pills.forEach(function (p) { p.setAttribute("aria-pressed", String(p.getAttribute("data-filter") === f)); });
      clearTimeout(timer);
      var toHide = [], toShow = [];
      cards.forEach(function (card) {
        var match = f === "all" || (" " + card.getAttribute("data-concerns") + " ").indexOf(" " + f + " ") > -1;
        if (match && card.hidden) toShow.push(card);
        if (!match && !card.hidden) toHide.push(card);
      });
      var swap = function () {
        toHide.forEach(function (c) { c.hidden = true; c.classList.remove("is-out"); });
        toShow.forEach(function (c) {
          c.hidden = false;
          if (!reduceMotion) { c.classList.remove("is-in"); void c.offsetWidth; c.classList.add("is-in"); }
        });
        finderCarousel.reset();
      };
      if (reduceMotion || !toHide.length) { swap(); return; }
      toHide.forEach(function (c) { c.classList.add("is-out"); });
      timer = setTimeout(swap, 220);
    };
    pills.forEach(function (p) {
      p.addEventListener("click", function () { setFilter(p.getAttribute("data-filter")); });
    });
  }

  function startCountdown() {
    var card = $("#promo-card");
    var els = {};
    ["d", "h", "m", "s"].forEach(function (k) { els[k] = $('[data-cd="' + k + '"]', card); });
    $("#promo-end-text").textContent = "המבצע בתוקף עד " + promoEnd.toLocaleDateString("he-IL", { day: "numeric", month: "long", timeZone: "Asia/Jerusalem" });
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    function tick() {
      var diff = promoEnd.getTime() - Date.now();
      if (diff <= 0) { // expired: remove the card and the hero pill
        clearInterval(t);
        card.parentNode.removeChild(card);
        var pill = $("#promo-pill"); if (pill) pill.parentNode.removeChild(pill);
        return;
      }
      var s = Math.floor(diff / 1000);
      els.d.textContent = pad(Math.floor(s / 86400));
      els.h.textContent = pad(Math.floor((s % 86400) / 3600));
      els.m.textContent = pad(Math.floor((s % 3600) / 60));
      els.s.textContent = pad(s % 60);
    }
    var t = setInterval(tick, 1000);
    tick();
  }

  /* ---------------------------------------------------------------
     Quiz modal (bottom sheet on mobile)
     --------------------------------------------------------------- */
  var modal, modalOpener = null;
  function openQuiz(opener) {
    modal = $("#quiz-modal");
    modalOpener = opener || document.activeElement;
    renderQuizStart();
    modal.hidden = false;
    void modal.offsetWidth;
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
    $(".modal-panel", modal).focus({ preventScroll: true });
  }
  function closeQuiz() {
    if (!modal || modal.hidden) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    setTimeout(function () { modal.hidden = true; }, reduceMotion ? 0 : 320);
    if (modalOpener) modalOpener.focus({ preventScroll: true });
  }

  var quizState = { step: 0, answers: {} };
  function renderQuizStart() { quizState = { step: 0, answers: {} }; renderQuizStep(false); }

  function quizProgress(pct, label) {
    return '<div class="quiz-progress" role="progressbar" aria-label="התקדמות בשאלון" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + Math.round(pct) + '"><span style="width:' + pct + '%"></span></div>' +
      '<p class="quiz-step">' + esc(label) + "</p>";
  }
  function renderQuizStep(focus) {
    var Q = C.quiz, step = quizState.step, total = Q.questions.length, q = Q.questions[step];
    $("#quiz-body").innerHTML = '<div class="fade-in">' +
      quizProgress((step / total) * 100, "שאלה " + (step + 1) + " מתוך " + total) +
      '<h3 class="quiz-q" id="quiz-q" tabindex="-1">' + esc(q.text) + "</h3>" +
      '<div class="quiz-options" role="group" aria-labelledby="quiz-q">' + q.options.map(function (o) {
        return '<button type="button" class="quiz-option" data-value="' + esc(o.value) + '" aria-pressed="' + (quizState.answers[q.id] === o.value) + '">' + esc(o.label) + "</button>";
      }).join("") + "</div>" +
      '<div class="quiz-nav">' +
        (step > 0 ? '<button type="button" class="link-btn" data-quiz="back">חזרה</button><button type="button" class="link-btn" data-quiz="restart">התחילי מחדש</button>' : "") +
      "</div></div>";
    if (focus) $("#quiz-q").focus({ preventScroll: true });
  }
  function quizResult() {
    var Q = C.quiz, a = quizState.answers, rule = null;
    for (var i = 0; i < Q.rules.length && !rule; i++) {
      var w = Q.rules[i].when, ok = true;
      for (var k in w) if (Object.prototype.hasOwnProperty.call(w, k) && a[k] !== w[k]) ok = false;
      if (ok) rule = Q.rules[i];
    }
    var t = findTreatment(rule ? rule.treatment : Q.fallbackTreatment) || C.treatments[0];
    var note = (Q.skinNotes && Q.skinNotes[a.skin]) || "";
    $("#quiz-body").innerHTML = '<div class="fade-in quiz-result">' +
      quizProgress(100, "סיימת! זו ההמלצה שלך") +
      '<p class="kicker">ההמלצה בשבילך</p>' +
      '<h3 id="quiz-result-title" tabindex="-1">' + esc(t.name) + "</h3>" +
      "<p>" + esc(rule && rule.why ? rule.why : t.description) + (note ? " " + esc(note) : "") + "</p>" +
      waBtn("שלחי לי את ההמלצה בוואטסאפ", Q.whatsappMessage.replace("{treatment}", t.name)) +
      '<p class="small">ההמלצה ראשונית בלבד. ההתאמה הסופית נעשית באבחון אישי.</p>' +
      '<button type="button" class="link-btn" data-quiz="restart">התחילי מחדש</button>' +
    "</div>";
    $("#quiz-result-title").focus({ preventScroll: true });
  }
  function initQuizModal() {
    if (!isOn("quiz") || !C.quiz) return;
    var m = $("#quiz-modal");
    $("#quiz-modal-title").textContent = C.quiz.title;
    m.addEventListener("click", function (e) {
      if (e.target.closest("[data-close-modal]")) { closeQuiz(); return; }
      var opt = e.target.closest(".quiz-option"), act = e.target.closest("[data-quiz]");
      if (opt) {
        var q = C.quiz.questions[quizState.step];
        quizState.answers[q.id] = opt.getAttribute("data-value");
        $$(".quiz-option", m).forEach(function (b) { b.setAttribute("aria-pressed", String(b === opt)); });
        setTimeout(function () {
          quizState.step++;
          if (quizState.step < C.quiz.questions.length) renderQuizStep(true); else quizResult();
        }, reduceMotion ? 0 : 240);
      } else if (act) {
        var a = act.getAttribute("data-quiz");
        if (a === "back" && quizState.step > 0) { quizState.step--; renderQuizStep(true); }
        if (a === "restart") { quizState = { step: 0, answers: {} }; renderQuizStep(true); }
      }
    });
    document.addEventListener("keydown", function (e) {
      if (m.hidden) return;
      if (e.key === "Escape") closeQuiz();
      if (e.key === "Tab") trapFocus(e, $(".modal-panel", m));
    });
  }

  /* ---------------------------------------------------------------
     Before / After carousel with per-card comparison sliders
     --------------------------------------------------------------- */
  function renderBeforeAfter() {
    var sec = $("#results"), ba = C.beforeAfter;
    if (!isOn("beforeAfter") || !ba || !ba.items.length) return;
    sec.innerHTML = '<div class="container">' +
      '<div class="head-row">' + head(ba.kicker, ba.title, "results-title", ba.note) + arrows("ניווט בין התוצאות") + "</div>" +
      '<div role="region" aria-roledescription="קרוסלה" aria-label="תוצאות לפני ואחרי">' +
        '<div class="c-track reveal">' + ba.items.map(function (it, i) {
          return '<figure class="ba-card" role="group" aria-roledescription="שקופית" aria-label="' + esc(it.label) + '">' +
            '<div class="ba">' +
              '<div class="ba-layer">' + media(it.after, { alt: true }) + "</div>" +
              '<div class="ba-layer ba-before">' + media(it.before) + "</div>" +
              '<span class="ba-tag before" aria-hidden="true">לפני</span><span class="ba-tag after" aria-hidden="true">אחרי</span>' +
              '<div class="ba-handle"><div class="ba-knob" role="slider" tabindex="0" aria-label="' + esc("השוואת לפני ואחרי: " + it.label) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-valuetext="50% לפני">' + icon("arrows") + "</div></div>" +
            "</div>" +
            '<figcaption class="ba-label"><b>' + esc(it.label) + "</b></figcaption>" +
          "</figure>";
        }).join("") + "</div>" +
      "</div>" +
      '<div class="finder-foot">' + waBtn(ba.ctaText, "היי " + owner + ", ראיתי באתר תוצאות לפני ואחרי ואשמח לשמוע פרטים 🙂", "btn-outline") + "</div>" +
    "</div>";
    sec.hidden = false;
    initCarousel($("#results .container"));
    $$(".ba", sec).forEach(initCompare);
  }

  function initCompare(box) {
    var knob = $(".ba-knob", box), pos = 50, dragging = false;
    function set(v) {
      pos = Math.max(0, Math.min(100, v));
      box.style.setProperty("--pos", pos);
      knob.setAttribute("aria-valuenow", Math.round(pos));
      knob.setAttribute("aria-valuetext", Math.round(pos) + "% לפני");
    }
    // "before" is on the right, so measure from the right edge
    function fromEvent(e) { var r = box.getBoundingClientRect(); set(((r.right - e.clientX) / r.width) * 100); }
    box.addEventListener("pointerdown", function (e) {
      // mouse: drag anywhere; touch: only from the knob, so swiping the card still scrolls the carousel
      if (e.pointerType === "mouse" ? e.button !== 0 : !e.target.closest(".ba-knob")) return;
      dragging = true;
      e.preventDefault();
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
      if (v !== null) { e.preventDefault(); set(v); }
    });
  }

  /* ---------------------------------------------------------------
     About
     --------------------------------------------------------------- */
  function renderAbout() {
    var a = C.about;
    $("#about").innerHTML = '<div class="container about-grid">' +
      '<div class="about-media reveal">' + media(a.imageSlot) + "</div>" +
      '<div class="about-text">' +
        head(a.kicker, a.title, "about-title") +
        a.paragraphs.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
        '<p class="signature">' + esc(a.signature) + "</p>" +
        '<ul class="values">' + a.values.map(function (v, i) {
          return '<li class="reveal" style="--d:' + i * 0.06 + 's">' + icon(v.icon) + esc(v.title) + "</li>";
        }).join("") + "</ul>" +
      "</div>" +
    "</div>";
  }

  /* ---------------------------------------------------------------
     Testimonials: centered auto-sliding carousel
     --------------------------------------------------------------- */
  function renderTestimonials() {
    var sec = $("#testimonials"), T = C.testimonials, r = C.rating;
    if (!isOn("testimonials") || !T || !T.items.length) return;
    var n = T.items.length;
    var hasReviews = r.reviewsUrl && r.reviewsUrl !== "#";
    sec.innerHTML = '<div class="container">' +
      '<div class="section-head center">' +
        '<p class="kicker">' + esc(T.kicker) + "</p>" +
        '<h2 class="section-title" id="testimonials-title">' + esc(T.title) + "</h2>" +
        '<p class="section-lead"><span class="rating-badge">' + icon("star") + esc(r.value) + " בגוגל · " + esc(r.count) + " ביקורות</span></p>" +
      "</div>" +
      '<div class="tm" role="region" aria-roledescription="קרוסלה" aria-label="המלצות מטופלות">' +
        '<div class="tm-viewport"><div class="tm-track" id="tm-track" aria-live="off">' + T.items.map(function (t, i) {
          return '<div class="tm-slide" role="group" aria-roledescription="שקופית" aria-label="' + (i + 1) + " מתוך " + n + '">' +
            '<figure class="tm-card"><span class="tm-mark" aria-hidden="true">”</span>' +
            "<blockquote><p>" + esc(t.text) + "</p></blockquote>" +
            "<figcaption><b>" + esc(t.name) + "</b>" + esc(t.treatment) + "</figcaption></figure></div>";
        }).join("") + "</div></div>" +
        (n > 1 ? '<div class="tm-controls">' +
          '<button type="button" class="round-btn" data-tm="prev" aria-label="ההמלצה הקודמת">' + icon("chevronRight") + "</button>" +
          '<div class="dots">' + T.items.map(function (t, i) {
            return '<button type="button" class="dot" data-tm-dot="' + i + '" aria-label="המלצה ' + (i + 1) + '"></button>';
          }).join("") + "</div>" +
          '<button type="button" class="round-btn" data-tm="next" aria-label="ההמלצה הבאה">' + icon("chevronLeft") + "</button>" +
          '<button type="button" class="round-btn" data-tm="pause" aria-label="עצירת ההחלפה האוטומטית">' + icon("pause") + "</button>" +
        "</div>" : "") +
      "</div>" +
      // TODO: link to the client's Google reviews (rating.reviewsUrl in config)
      '<p class="tm-foot"><a class="text-link" href="' + esc(r.reviewsUrl || "#") + '"' + (hasReviews ? ' target="_blank" rel="noopener"' : "") + ">לכל הביקורות בגוגל " + icon("arrowLeft") + "</a></p>" +
    "</div>";
    sec.hidden = false;
    initTestimonials(sec, T.intervalMs || 5000);
  }

  function initTestimonials(sec, interval) {
    var viewport = $(".tm-viewport", sec), track = $("#tm-track"), slides = $$(".tm-slide", sec), dots = $$(".dot", sec);
    var pauseBtn = $('[data-tm="pause"]', sec);
    var i = 0, timer = null;
    var hover = false, focus = false, visible = false, stopped = reduceMotion;

    function layout() {
      var C_ = viewport.clientWidth, w = slides[0].offsetWidth;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 24;
      var rtl = getComputedStyle(track).direction === "rtl";
      // RTL: slides start at the right edge, so shift right to bring slide i to the center
      var delta = i * (w + gap) + w / 2 - C_ / 2;
      track.style.transform = "translateX(" + (rtl ? delta : -delta) + "px)";
      slides.forEach(function (s, j) {
        s.classList.toggle("is-active", j === i);
        s.setAttribute("aria-hidden", String(j !== i));
      });
      dots.forEach(function (d, j) { if (j === i) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
    }
    function goTo(n) { i = (n + slides.length) % slides.length; layout(); }
    function schedule() {
      clearInterval(timer);
      if (!stopped && !hover && !focus && visible && !document.hidden && slides.length > 1) {
        timer = setInterval(function () { goTo(i + 1); }, interval);
      }
    }
    function stopForGood() {
      stopped = true; schedule();
      if (pauseBtn) { pauseBtn.innerHTML = icon("play"); pauseBtn.setAttribute("aria-label", "הפעלת ההחלפה האוטומטית"); }
    }

    sec.addEventListener("click", function (e) {
      var b = e.target.closest("[data-tm]"), d = e.target.closest("[data-tm-dot]");
      if (d) { goTo(parseInt(d.getAttribute("data-tm-dot"), 10)); stopForGood(); }
      if (!b) return;
      var act = b.getAttribute("data-tm");
      if (act === "next") { goTo(i + 1); stopForGood(); }
      if (act === "prev") { goTo(i - 1); stopForGood(); }
      if (act === "pause") {
        if (stopped && !reduceMotion) {
          stopped = false; schedule();
          b.innerHTML = icon("pause"); b.setAttribute("aria-label", "עצירת ההחלפה האוטומטית");
        } else stopForGood();
      }
    });

    // swipe (touch + mouse). RTL: the next slide is on the left, so swipe right = next
    var startX = null;
    viewport.addEventListener("pointerdown", function (e) { startX = e.clientX; });
    viewport.addEventListener("pointerup", function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX; startX = null;
      if (Math.abs(dx) < 40) return;
      goTo(i + (dx > 0 ? 1 : -1));
      stopForGood();
    });

    var region = $(".tm", sec);
    region.addEventListener("mouseenter", function () { hover = true; schedule(); });
    region.addEventListener("mouseleave", function () { hover = false; schedule(); });
    region.addEventListener("focusin", function () { focus = true; schedule(); });
    region.addEventListener("focusout", function () { focus = false; schedule(); });
    region.addEventListener("touchstart", function () { stopForGood(); }, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; schedule(); }, { threshold: 0.3 }).observe(region);
    }
    window.addEventListener("resize", layout);
    layout();
  }

  /* ---------------------------------------------------------------
     Booking (dark)
     --------------------------------------------------------------- */
  function renderBooking() {
    var b = C.booking, c = C.contact;
    var topics = b.chipTreatments.map(findTreatment).filter(Boolean);
    $("#booking").innerHTML = '<div class="container booking">' +
      head(b.kicker, b.title, "booking-title", b.text, true) +
      '<p class="topic-label" id="topic-label">' + esc(b.chipsLabel) + "</p>" +
      '<div class="topics" role="group" aria-labelledby="topic-label">' +
        topics.map(function (t) { return '<button type="button" class="pill" aria-pressed="false" data-topic="' + esc(t.name) + '">' + esc(t.name) + "</button>"; }).join("") +
        '<button type="button" class="pill" aria-pressed="false" data-topic="">' + esc(b.otherLabel) + "</button>" +
      "</div>" +
      '<a class="btn btn-accent btn-xl" id="booking-cta" href="' + waLink() + '" target="_blank" rel="noopener">' + icon("whatsapp") + "<span>" + esc(b.ctaText) + "</span></a>" +
      '<p class="call-line">או התקשרי: <a href="' + telLink + '">' + esc(c.phoneDisplay) + "</a></p>" +
      '<div class="info-row">' +
        '<div class="reveal">' + icon("pin") + "<span>" + esc(c.street + ", " + c.city) + "</span><small>" + esc(c.addressNote) + '</small><a href="' + esc(c.wazeUrl) + '" target="_blank" rel="noopener">ניווט ב-Waze</a></div>' +
        '<div class="reveal" style="--d:.06s">' + icon("clock") + "<span>" + esc(c.hoursShort) + "</span><small>ב׳ ושבת: סגור</small></div>" +
        '<div class="reveal" style="--d:.12s">' + icon("mail") + '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></div>" +
      "</div>" +
    "</div>";

    var cta = $("#booking-cta"), pills = $$("#booking .pill");
    pills.forEach(function (p) {
      p.addEventListener("click", function () {
        var active = p.getAttribute("aria-pressed") === "true";
        pills.forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        var topic = active ? "" : p.getAttribute("data-topic");
        if (!active) p.setAttribute("aria-pressed", "true");
        cta.href = waLink(topic ? b.messageTemplate.replace("{treatment}", topic) : null);
      });
    });
  }

  /* ---------------------------------------------------------------
     FAQ: two columns, one answer open at a time
     --------------------------------------------------------------- */
  function renderFaq() {
    var sec = $("#faq"), list = C.faq;
    if (!isOn("faq") || !list || !list.length) return;
    var half = Math.ceil(list.length / 2);
    function item(f, i) {
      return '<div class="faq-item"><h3><button type="button" class="faq-q" id="faq-q-' + i + '" aria-expanded="false" aria-controls="faq-a-' + i + '">' +
        "<span>" + esc(f.q) + '</span><span class="faq-icon" aria-hidden="true"></span></button></h3>' +
        '<div class="faq-a" id="faq-a-' + i + '" role="region" aria-labelledby="faq-q-' + i + '"><div><p>' + esc(f.a) + "</p></div></div></div>";
    }
    sec.innerHTML = '<div class="container">' +
      head("שאלות", "שאלות נפוצות", "faq-title", null, true) +
      '<div class="faq-cols">' +
        '<div class="faq-col">' + list.slice(0, half).map(function (f, i) { return item(f, i); }).join("") + "</div>" +
        '<div class="faq-col">' + list.slice(half).map(function (f, i) { return item(f, i + half); }).join("") + "</div>" +
      "</div>" +
      '<div class="faq-cta">' + waBtn("יש לך שאלה אחרת? כתבי לי", null, "btn-outline") + "</div>" +
    "</div>";
    sec.hidden = false;

    var buttons = $$(".faq-q", sec);
    function setOpen(btn, open) {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      btn.setAttribute("aria-expanded", String(open));
      panel.classList.toggle("is-open", open);
      panel.inert = !open;
    }
    buttons.forEach(function (btn) {
      setOpen(btn, false);
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") !== "true";
        buttons.forEach(function (b) { if (b !== btn) setOpen(b, false); });
        setOpen(btn, open);
      });
    });
  }

  /* ---------------------------------------------------------------
     Footer, mobile bar, floating WhatsApp
     --------------------------------------------------------------- */
  function renderFooter() {
    var c = C.contact;
    $("#site-footer").innerHTML = '<div class="container">' +
      '<div class="footer-grid">' +
        '<div><a class="wordmark" href="#top">' + wordmark() + "</a><p>" + esc(C.business.tagline) + "</p></div>" +
        '<nav aria-labelledby="f-links"><h2 id="f-links">קישורים</h2><ul class="footer-links">' +
          navItems().map(function (n) { return '<li><a href="#' + esc(n.target) + '">' + esc(n.label) + "</a></li>"; }).join("") +
        "</ul></nav>" +
        '<div><h2>יצירת קשר</h2><ul class="footer-links">' +
          '<li><a href="' + waLink() + '" target="_blank" rel="noopener">וואטסאפ</a></li>' +
          '<li><a href="' + telLink + '">' + esc(c.phoneDisplay) + "</a></li>" +
          '<li><a href="mailto:' + esc(c.email) + '">' + esc(c.email) + "</a></li>" +
          '<li><a href="accessibility.html">הצהרת נגישות</a></li>' +
        "</ul></div>" +
      "</div>" +
      '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + " " + esc(C.business.name) + "</span>" +
        "<span>" + (C.demoMode ? "גרסת הדגמה · " : "") + esc(C.credit || "") + "</span></div>" +
    "</div>";
  }

  function renderMobileBar() {
    var bar = $("#mobile-bar");
    bar.innerHTML =
      '<a class="is-primary" href="' + waLink() + '" target="_blank" rel="noopener">' + icon("whatsapp") + "<span>וואטסאפ</span></a>" +
      '<a href="' + telLink + '">' + icon("phone") + "<span>חיוג</span></a>" +
      '<a href="' + esc(C.contact.wazeUrl) + '" target="_blank" rel="noopener">' + icon("nav") + "<span>Waze</span></a>";
    $("#wa-float").href = waLink();

    // hide the bar while the big booking CTA is on screen
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) {
        bar.classList.toggle("is-hidden", en[0].isIntersecting);
      }, { threshold: 0.2 }).observe($("#booking"));
    }
  }

  /* ---------------------------------------------------------------
     Accessibility toolbar (saved in localStorage)
     --------------------------------------------------------------- */
  function initA11y() {
    var root = document.documentElement, toggle = $("#a11y-toggle"), panel = $("#a11y-panel");
    var prefs = {};
    try { prefs = JSON.parse(localStorage.getItem("a11yPrefs") || "{}"); } catch (e) {}
    var sizes = [0.9, 1, 1.12, 1.25, 1.4];
    function apply() {
      root.style.setProperty("--font-scale", prefs.size || 1);
      root.classList.toggle("a11y-contrast", !!prefs.contrast);
      root.classList.toggle("a11y-links", !!prefs.links);
      $('[data-a11y="contrast"]').setAttribute("aria-pressed", String(!!prefs.contrast));
      $('[data-a11y="links"]').setAttribute("aria-pressed", String(!!prefs.links));
      try { localStorage.setItem("a11yPrefs", JSON.stringify(prefs)); } catch (e) {}
    }
    function setOpen(open) { panel.hidden = !open; toggle.setAttribute("aria-expanded", String(open)); }
    toggle.addEventListener("click", function () { setOpen(panel.hidden); });
    panel.addEventListener("click", function (e) {
      var b = e.target.closest("[data-a11y]");
      if (!b) return;
      var a = b.getAttribute("data-a11y"), idx = sizes.indexOf(prefs.size || 1);
      if (idx < 0) idx = 1;
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
     Demo palette switcher (?themes=1) — for sales calls
     onAccent: plum text on bright accents keeps AA contrast
     --------------------------------------------------------------- */
  var PALETTES = [
    { name: "Blush & Berry",       bg: "#FBF1EF", rose: "#EFC9C3", accent: "#D6336C", onAccent: "#FFFFFF" },
    { name: "Nude & Coral",        bg: "#F8EFE9", rose: "#E8CBBB", accent: "#F0624D", onAccent: "#2B1820" },
    { name: "Powder & Hot pink",   bg: "#FCF0F2", rose: "#E9C7CF", accent: "#FF4F7B", onAccent: "#2B1820" }
  ];
  function initPaletteSwitcher() {
    var q;
    try { q = new URLSearchParams(location.search); } catch (e) { return; }
    if (q.get("themes") !== "1") return;
    var root = document.documentElement;
    var current = getComputedStyle(root).getPropertyValue("--accent").trim().toUpperCase();
    var box = document.createElement("div");
    box.className = "palette-switcher";
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "תצוגת פלטות צבע (דמו)");
    box.innerHTML = "<p>פלטות צבע</p>" + PALETTES.map(function (p, i) {
      return '<button type="button" data-palette="' + i + '" aria-pressed="' + (p.accent.toUpperCase() === current) + '" aria-label="' + esc(p.name) + '">' +
        '<span class="swatches"><i style="background:' + p.bg + '"></i><i style="background:' + p.rose + '"></i><i style="background:' + p.accent + '"></i></span>' +
        "<span>" + esc(p.name) + "</span></button>";
    }).join("");
    document.body.appendChild(box);
    box.addEventListener("click", function (e) {
      var b = e.target.closest("[data-palette]");
      if (!b) return;
      var p = PALETTES[+b.getAttribute("data-palette")];
      root.style.setProperty("--bg", p.bg);
      root.style.setProperty("--rose", p.rose);
      root.style.setProperty("--accent", p.accent);
      root.style.setProperty("--on-accent", p.onAccent);
      setMeta("name", "theme-color", p.bg);
      try { sessionStorage.setItem("demoPalette", JSON.stringify({ bg: p.bg, rose: p.rose, accent: p.accent, onAccent: p.onAccent })); } catch (err) {}
      $$("[data-palette]", box).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
    });
  }

  /* ---------------------------------------------------------------
     Reveal on scroll (items only; content is fully visible without JS)
     --------------------------------------------------------------- */
  function initReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("js-motion");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  }

  function fillStaticIcons() {
    $$("[data-icon]").forEach(function (el) { el.outerHTML = svg(el.getAttribute("data-icon")); });
  }

  /* ---------------------------------------------------------------
     Boot — each block is isolated so one error can't blank the page
     --------------------------------------------------------------- */
  [
    renderSeo, renderHeader, initSmartHeader, initMobileMenu, renderHero, renderMarquee,
    renderFinder, initQuizModal, renderBeforeAfter, renderAbout, renderTestimonials,
    renderBooking, renderFaq, renderFooter, renderMobileBar, fillStaticIcons,
    initA11y, initPaletteSwitcher, initReveal
  ].forEach(function (fn) {
    try { fn(); } catch (e) { console.error("[site] " + fn.name + " failed:", e); }
  });
})();
