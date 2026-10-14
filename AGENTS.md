# AGENTS.md

## What this is
A static, framework-free demo storefront for Al-Fajar Cloth House (women's clothing, Ichhra, Lahore). Built for a beginner developer as a portfolio piece and a proposal to the (not yet approving) business owner. Keep it plain HTML/CSS/vanilla JS with no build step.

## Architecture
- Multi-page static site at the repo root: `index.html`, `shop.html`, `product.html?id=<id>`, `about.html`, `404.html`.
- Script load order on every page: `js/config.js` (SITE_CONFIG) → `js/products.js` (PRODUCTS, PRODUCT_CATEGORIES) → `js/main.js` (shared helpers, renders demo ribbon/header/footer, fills `[data-biz]` elements) → optional page script (`home.js`, `shop.js`, `product.js`). Scripts are classic (non-module) so the site works from `file://`.
- Header and footer are injected by `main.js` into `#site-header` / `#site-footer`. Nav lives in `NAV_LINKS`.
- Business details are rendered into elements with `data-biz="address|phone|phone-link|maps-link|hours|instagram|facebook"`. Call `fillBusinessDetails()` again after injecting new `data-biz` markup.
- Images: `imageUrl(path, w)` returns a Netlify Image CDN URL (`/.netlify/images?...&fm=webp`), except on `file:`. A global capture-phase `error` listener falls back to `data-original`, then `assets/images/placeholder.svg`. Static HTML images use inline `onerror` because they can fail before `main.js` loads.
- `404.html` uses `<base href="/">` so relative links work at any depth.
- `netlify.toml`: publish `.`, no build command.

## Honesty rules (important)
- Never fabricate business info, reviews, testimonials, discounts or availability. Products are fictional samples with `isSample: true` and visible "Sample price" tags; product photos are AI-generated.
- Address/phone/hours come from the public Google Maps listing supplied by the user and are flagged as unverified via `verified` flags in config.
- WhatsApp: `SITE_CONFIG.whatsappNumber` is empty until the owner confirms it; buttons render disabled with an explanatory note. Don't make them look operational when unconfigured.
- No cart/checkout/payments in v1.

## Conventions
- CSS: tokens in `:root` of `css/styles.css`; BEM-ish class names (`product-card__name`); no inline styles.
- JS: string-concatenated templates, `escapeHtml()` for product text, small IIFEs per page.
- Accessibility: skip link, visible `:focus-visible`, `aria-pressed` filter chips, `aria-live` result count, 44px+ tap targets, reduced-motion support.
