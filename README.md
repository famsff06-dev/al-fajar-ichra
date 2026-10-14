# Al-Fajar Cloth House — Demo Website

An unofficial, proposal-stage website for **Al-Fajar Cloth House**, a women's clothing shop in Ichhra Bazaar, Lahore. It showcases a sample saree collection, lets visitors search and filter products, view product details, and prepare a WhatsApp enquiry — plus store location, hours and contact details.

> ⚠️ **Demo only.** The six products, their photos and prices are illustrative samples. They are not real Al-Fajar stock. The product photos were AI-generated for this demo.

Built with plain **HTML5, CSS3 and vanilla JavaScript** — no frameworks, no build step, no database.

---

## Folder structure

```
.
├── index.html          Home page (hero, featured sarees, intro, benefits, visit section)
├── shop.html           Full collection with search + category filter
├── product.html        One product's details (product.html?id=...)
├── about.html          About the shop + address, phone, hours, map, social links
├── 404.html            Friendly "page not found" page (Netlify shows it automatically)
├── netlify.toml        Netlify settings (no build step, publish this folder)
├── css/
│   └── styles.css      All styling. Colours & spacing are CSS variables at the top.
├── js/
│   ├── config.js       ⭐ Business details: name, phone, address, hours, WhatsApp, social
│   ├── products.js     ⭐ The product list (edit this to add/change products)
│   ├── main.js         Shared code: header, footer, mobile menu, product cards, WhatsApp links
│   ├── home.js         Puts the featured products on the home page
│   ├── shop.js         Search + filter logic for the shop page
│   └── product.js      Builds the product details page
└── assets/images/      Photos, logo and the "image coming soon" placeholder
```

The two files marked ⭐ are the ones you'll edit most. You rarely need to touch the HTML to change business details or products.

**How the pages fit together:** every page loads `config.js` → `products.js` → `main.js`, then (optionally) its own page script. `main.js` draws the header and footer, so a change to the navigation only has to be made once.

---

## Run it locally

**Option 1 — just open it.** Double-click `index.html`. Everything works, including search, filters and product pages.

**Option 2 — with a local server (recommended).** This matches the live site more closely:

- VS Code: install the **Live Server** extension → right-click `index.html` → *Open with Live Server*.
- Or with the Netlify CLI: `netlify dev` (also enables the Netlify Image CDN locally).

> Image note: on the live site, photos are automatically resized and converted to WebP by the Netlify Image CDN. If that service isn't available (for example when you open the file directly) the site falls back to the original photo, and if that's missing too, to `assets/images/placeholder.svg`.

---

## Change colours, fonts and text

- **Colours / spacing:** open `css/styles.css` and edit the variables in the `:root { ... }` block at the top, e.g. `--color-burgundy: #800020;`.
- **Fonts:** the Google Fonts link is in the `<head>` of each HTML file; the font names are in `--font-display` and `--font-body`.
- **Page text:** edit the HTML files directly. Text in `[Placeholder: ...]` boxes is waiting for real information from the owner — replace the whole `<span class="placeholder">…</span>` with plain text.
- **Shop name:** `brandName`, `brandSubtitle` and `legalName` in `js/config.js`.

## Add or edit products

Open `js/products.js`. Each product is an object like this:

```js
{
  id: "festive-floral-saree",        // unique, lowercase-with-dashes
  name: "Festive Floral Saree",
  category: "Festive",               // must be in PRODUCT_CATEGORIES
  price: 5200,                       // PKR, no commas
  isSample: true,                    // false once the price is confirmed
  featured: true,                    // show on the home page
  image: "assets/images/saree-festive-floral.jpg",
  imageAlt: "Model wearing a rose pink saree with floral motifs",
  description: "One or two sentences.",
  details: ["Fabric: ...", "Colour: ..."], // optional; only facts you know
},
```

- **Add:** copy an object, paste it inside the `PRODUCTS` list (mind the commas), change the values.
- **Remove:** delete the whole `{ ... },` block.
- **New category:** add it to `PRODUCT_CATEGORIES` — a filter button appears automatically.

## Replace product images

1. Put the photo in `assets/images/` (JPG or WebP, ideally portrait **4:5**, e.g. 1000×1250 px, under ~300 KB).
2. Use a simple file name without spaces, e.g. `saree-red-bridal.jpg`.
3. Update the product's `image` and `imageAlt` in `js/products.js`.

The home page hero image is `assets/images/hero.jpg` (landscape, ~1600 px wide). If you rename it, update the paths in `index.html`.

## Configure WhatsApp

WhatsApp buttons are **intentionally disabled** until a confirmed number is set, so visitors never see a button that doesn't work.

In `js/config.js`:

```js
whatsappNumber: "923001234567",
```

Use the country code (92) + the number **without** the leading 0, digits only. Example: `0300 1234567` → `"923001234567"`.

When set, every product page gets a working "Enquire on WhatsApp" button that opens WhatsApp with a message like:

> Assalam o Alaikum! I'm interested in the "Festive Floral Saree" (PKR 5,200) I saw on your website. Is it available, and could you share more details?

You can change that wording in `buildWhatsAppMessage()` in `js/main.js`.

## Update verified business details

All in `js/config.js`:

| Setting | What it is |
| --- | --- |
| `phone` | Display text and `tel` link (`+92...`) |
| `address.lines` | One string per line |
| `hours` | One row per group of days |
| `mapsUrl` | Paste the exact **Share** link from the Google Maps listing |
| `social` | Instagram & Facebook links |
| `isDemo` | Set to `false` to remove the "unofficial demo" ribbon |

After the owner confirms details, set `phone.verified`, `address.verified` and `hoursVerified` to `true` — the "please confirm" notes disappear.

---

## Deploy to Netlify

There's no build step — Netlify just publishes the folder.

**Drag & drop:** go to [app.netlify.com/drop](https://app.netlify.com/drop) and drop the whole project folder.

**From Git (recommended):**
1. Push the project to GitHub/GitLab.
2. In Netlify: *Add new project → Import an existing project* → choose the repo.
3. Leave **Build command** empty and set **Publish directory** to `.` (this is already in `netlify.toml`).
4. Deploy. Every future push redeploys automatically.

Netlify serves `404.html` automatically for unknown addresses. No redirects, environment variables or secrets are needed.

---

## What's not included (on purpose)

- No online payments, checkout, customer accounts or stock syncing.
- No cart — enquiries go through WhatsApp or a phone call instead.

## Before presenting to the owner

- [ ] Confirm the official spelling (Al-Fajar / Al-Fajr / Al Fajar) and update `brandName` / `legalName`.
- [ ] Confirm address, phone and day-by-day opening hours, then set the `verified` flags.
- [ ] Ask which number uses WhatsApp and set `whatsappNumber`.
- [ ] Replace `mapsUrl` with the exact Google Maps share link for the listing.
- [ ] Confirm the product range (sarees only, or also suits/fabrics?) and adjust the copy.
- [ ] Fill in the `[Placeholder: ...]` text on the Home and About pages.
- [ ] Replace demo products with real photos and prices; set `isSample: false`.
- [ ] Get permission to use the logo and any shop photos.
- [ ] Set `isDemo: false` once the owner approves the site.
