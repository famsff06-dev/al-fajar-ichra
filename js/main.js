/*
 * SHARED SITE CODE
 * ----------------
 * Loaded on every page (after config.js and products.js). It:
 *   1. draws the demo ribbon, header and footer
 *   2. handles the mobile menu
 *   3. fills in business details from SITE_CONFIG
 *   4. provides helpers used by the page scripts (product cards, prices,
 *      WhatsApp links, image URLs)
 */

/* ---------- Small helpers ---------- */

function formatPrice(amount) {
  return "PKR " + amount.toLocaleString("en-PK");
}

// Prevents product text from being interpreted as HTML.
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/*
 * Returns a resized WebP version of an image via the Netlify Image CDN.
 * When the page is opened straight from your computer (file://) the CDN
 * isn't available, so we use the original file. If the CDN fails for any
 * other reason, the image error handler below falls back to the original.
 */
function imageUrl(path, width) {
  if (location.protocol === "file:") return path;
  return "/.netlify/images?url=/" + encodeURI(path) + "&w=" + width + "&fm=webp&q=78";
}

const PLACEHOLDER_IMAGE = "assets/images/placeholder.svg";

function findProduct(id) {
  return PRODUCTS.find((product) => product.id === id);
}

/* ---------- WhatsApp ---------- */

function isWhatsAppConfigured() {
  return /^\d{10,15}$/.test(SITE_CONFIG.whatsappNumber);
}

function buildWhatsAppMessage(product) {
  if (!product) {
    return "Assalam o Alaikum! I found " + SITE_CONFIG.legalName + " online and would like to ask about your collection.";
  }
  return (
    "Assalam o Alaikum! I'm interested in the \"" + product.name + "\" (" +
    formatPrice(product.price) + ") I saw on your website. Is it available, and could you share more details?"
  );
}

// Returns null when no number is configured, so callers can show a disabled state.
function buildWhatsAppUrl(message) {
  if (!isWhatsAppConfigured()) return null;
  return "https://wa.me/" + SITE_CONFIG.whatsappNumber + "?text=" + encodeURIComponent(message);
}

function whatsAppButtonHTML(product, label) {
  const url = buildWhatsAppUrl(buildWhatsAppMessage(product));
  const text = label || "Enquire on WhatsApp";
  if (url) {
    return (
      '<a class="btn btn--whatsapp" href="' + url + '" target="_blank" rel="noopener">' +
      ICONS.whatsapp + "<span>" + text + '</span><span class="visually-hidden"> (opens WhatsApp)</span></a>'
    );
  }
  return (
    '<button class="btn btn--whatsapp" type="button" disabled aria-describedby="wa-note">' +
    ICONS.whatsapp + "<span>" + text + "</span></button>" +
    '<p class="wa-note" id="wa-note">WhatsApp isn\'t set up yet — the shop\'s WhatsApp number still needs to be confirmed.</p>'
  );
}

/* ---------- Icons (inline SVG so no icon library is needed) ---------- */

const ICONS = {
  whatsapp:
    '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z"/></svg>',
  phone:
    '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M5 3h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 7.3 7.3l1.4-2.2L21 15.5V19a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z"/></svg>',
  pin:
    '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  clock:
    '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" d="M12 7v5l3 2"/></svg>',
  instagram:
    '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor"/></svg>',
  facebook:
    '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z"/></svg>',
};

/* ---------- Product card (used on Home, Shop and Product pages) ---------- */

function productCardHTML(product, headingLevel) {
  const h = headingLevel || "h3";
  const link = "product.html?id=" + encodeURIComponent(product.id);
  return (
    '<article class="product-card">' +
    '<a class="product-card__media" href="' + link + '" tabindex="-1" aria-hidden="true">' +
    '<img src="' + imageUrl(product.image, 600) + '" data-original="' + product.image + '" alt="" ' +
    'width="600" height="745" loading="lazy" decoding="async">' +
    "</a>" +
    '<div class="product-card__body">' +
    '<p class="product-card__category">' + escapeHtml(product.category) + "</p>" +
    "<" + h + ' class="product-card__name"><a href="' + link + '">' + escapeHtml(product.name) + "</a></" + h + ">" +
    '<p class="product-card__price">' + formatPrice(product.price) +
    (product.isSample ? ' <span class="sample-tag">Sample price</span>' : "") + "</p>" +
    "</div>" +
    "</article>"
  );
}

/* ---------- Header, footer and demo ribbon ---------- */

const NAV_LINKS = [
  { href: "index.html", label: "Home", page: "home" },
  { href: "shop.html", label: "Shop", page: "shop" },
  { href: "about.html", label: "About & Contact", page: "about" },
];

function renderDemoRibbon() {
  if (!SITE_CONFIG.isDemo) return;
  const ribbon = document.createElement("div");
  ribbon.className = "demo-ribbon";
  ribbon.setAttribute("role", "note");
  ribbon.innerHTML =
    "<p><strong>Unofficial demo website.</strong> Products, photos and prices are samples for illustration — not real Al-Fajar stock.</p>";
  document.body.prepend(ribbon);
}

function renderHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;
  const currentPage = document.body.dataset.page;

  const links = NAV_LINKS.map((link) => {
    const current = link.page === currentPage ? ' aria-current="page"' : "";
    return '<li><a href="' + link.href + '"' + current + ">" + link.label + "</a></li>";
  }).join("");

  header.innerHTML =
    '<div class="container header__inner">' +
    '<a class="brand" href="index.html" aria-label="' + escapeHtml(SITE_CONFIG.legalName) + ' — home">' +
    '<img class="brand__mark" src="assets/images/logo-al-fajar.jpg" alt="" width="44" height="40">' +
    '<span class="brand__text"><span class="brand__name">' + escapeHtml(SITE_CONFIG.brandName) + "</span>" +
    '<span class="brand__sub">' + escapeHtml(SITE_CONFIG.brandSubtitle) + "</span></span></a>" +
    '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">' +
    '<span class="nav-toggle__bars" aria-hidden="true"></span><span class="visually-hidden">Menu</span></button>' +
    '<nav class="primary-nav" id="primary-nav" aria-label="Main">' +
    "<ul>" + links + "</ul>" +
    '<a class="btn btn--small btn--outline" href="about.html#visit">Visit the store</a>' +
    "</nav></div>";

  setupMobileNav(header);
}

function setupMobileNav(header) {
  const toggle = header.querySelector(".nav-toggle");
  const nav = header.querySelector(".primary-nav");

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
  }

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Close with Escape and return focus to the button.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  // If the window grows to desktop size while the menu is open, reset it.
  window.matchMedia("(min-width: 860px)").addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });
}

function renderFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;
  const c = SITE_CONFIG;
  const year = new Date().getFullYear();

  footer.innerHTML =
    '<div class="container footer__grid">' +
    '<div class="footer__brand">' +
    '<p class="footer__name">' + escapeHtml(c.legalName) + "</p>" +
    '<p class="footer__tag">Women\'s clothing in Ichhra, Lahore.</p>' +
    '<ul class="social-links" aria-label="Social media">' +
    '<li><a href="' + c.social.instagram + '" target="_blank" rel="noopener">' + ICONS.instagram + '<span class="visually-hidden">Instagram (opens in a new tab)</span></a></li>' +
    '<li><a href="' + c.social.facebook + '" target="_blank" rel="noopener">' + ICONS.facebook + '<span class="visually-hidden">Facebook (opens in a new tab)</span></a></li>' +
    "</ul></div>" +
    '<nav aria-label="Footer"><p class="footer__heading">Explore</p><ul class="footer__links">' +
    '<li><a href="index.html">Home</a></li><li><a href="shop.html">Shop the collection</a></li>' +
    '<li><a href="about.html">About us</a></li><li><a href="about.html#visit">Visit &amp; contact</a></li></ul></nav>' +
    '<div><p class="footer__heading">Visit</p><address data-biz="address"></address></div>' +
    '<div><p class="footer__heading">Contact</p><ul class="footer__links">' +
    '<li><a data-biz="phone-link" href="#"></a></li>' +
    '<li><a data-biz="maps-link" href="#" target="_blank" rel="noopener">Open in Google Maps</a></li></ul>' +
    '<div data-biz="hours" class="footer__hours"></div></div>' +
    "</div>" +
    '<div class="container footer__bottom">' +
    "<p>© " + year + " " + escapeHtml(c.legalName) + ".</p>" +
    (c.isDemo ? "<p>Demo website — not yet approved by the business. Sample products and prices only.</p>" : "") +
    "</div>";
}

/* ---------- Business details ---------- */

// Fills any element with a data-biz="..." attribute using SITE_CONFIG.
function fillBusinessDetails() {
  const c = SITE_CONFIG;

  document.querySelectorAll('[data-biz="address"]').forEach((el) => {
    el.innerHTML = c.address.lines.map(escapeHtml).join("<br>");
  });

  document.querySelectorAll('[data-biz="phone-link"]').forEach((el) => {
    el.href = "tel:" + c.phone.tel;
    if (!el.textContent.trim()) el.textContent = c.phone.display;
  });

  document.querySelectorAll('[data-biz="phone"]').forEach((el) => {
    el.textContent = c.phone.display;
  });

  document.querySelectorAll('[data-biz="maps-link"]').forEach((el) => {
    el.href = c.mapsUrl;
  });

  document.querySelectorAll('[data-biz="hours"]').forEach((el) => {
    el.innerHTML =
      '<dl class="hours-list">' +
      c.hours.map((row) => "<div><dt>" + row.days + "</dt><dd>" + row.time + "</dd></div>").join("") +
      "</dl>";
  });

  document.querySelectorAll('[data-biz="instagram"]').forEach((el) => (el.href = c.social.instagram));
  document.querySelectorAll('[data-biz="facebook"]').forEach((el) => (el.href = c.social.facebook));

  // "Please confirm" notes are only shown while details are unverified.
  const unverified = !c.phone.verified || !c.address.verified || !c.hoursVerified;
  document.querySelectorAll("[data-verify-note]").forEach((el) => {
    el.hidden = !unverified;
  });
}

/* ---------- Image loading & fallbacks ---------- */

// Fade images in once loaded (CSS shows a soft shimmer until then).
document.addEventListener(
  "load",
  (event) => {
    if (event.target.tagName === "IMG") event.target.classList.add("is-loaded");
  },
  true
);

// If an image fails: try the original file, then the placeholder graphic.
document.addEventListener(
  "error",
  (event) => {
    const img = event.target;
    if (img.tagName !== "IMG") return;
    const original = img.dataset.original;
    if (original && !img.dataset.triedOriginal) {
      img.dataset.triedOriginal = "true";
      img.src = original;
    } else if (!img.src.endsWith("placeholder.svg")) {
      img.src = PLACEHOLDER_IMAGE;
      img.classList.add("is-placeholder");
    }
  },
  true
);

/* ---------- Start ---------- */

renderDemoRibbon();
renderHeader();
renderFooter();
fillBusinessDetails();
