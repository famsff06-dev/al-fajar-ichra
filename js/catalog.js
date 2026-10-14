/*
 * PRODUCT CATALOG
 * ---------------
 * The products themselves live in data/products.json (the single source of
 * truth). This file only loads that JSON and offers small lookup helpers, so
 * the data, the rendering (main.js / page scripts) and the cart stay separate.
 *
 * Usage in a page script:
 *   loadCatalog().then(function (catalog) { ... catalog.products ... });
 */

const CATALOG_URL = "data/products.json";
let catalogPromise = null;

// Fetches the JSON once per page and reuses the result for later calls.
function loadCatalog() {
  if (!catalogPromise) {
    catalogPromise = fetch(CATALOG_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Catalog request failed: " + response.status);
        return response.json();
      })
      .then((data) => ({
        categories: Array.isArray(data.categories) ? data.categories : [],
        products: (Array.isArray(data.products) ? data.products : []).map(normaliseProduct),
      }));
  }
  return catalogPromise;
}

// Fills in safe defaults so the rest of the code never has to check for missing fields.
function normaliseProduct(product) {
  return Object.assign(
    {
      details: [],
      additionalImages: [],
      colors: [],
      sizes: [],
      availability: null,
      featured: false,
      newArrival: false,
      priceType: "demo",
    },
    product
  );
}

// Product pages are addressed by slug (product.html?slug=...). Older links used ?id=, so both work.
function findProduct(products, key) {
  if (!key) return null;
  return products.find((p) => p.slug === key) || products.find((p) => p.id === key) || null;
}

function findProductById(products, id) {
  return products.find((p) => p.id === id) || null;
}

function productUrl(product) {
  return "product.html?slug=" + encodeURIComponent(product.slug);
}

// "demo" prices are samples and must always be labelled; only "verified" prices are shown plainly.
function isSamplePrice(product) {
  return product.priceType !== "verified";
}

/*
 * Availability is only shown when it has been confirmed with the shop.
 * Allowed values in the JSON: "in-stock", "limited", "out-of-stock" or null (unknown).
 */
const AVAILABILITY_LABELS = {
  "in-stock": "In stock",
  limited: "Limited stock",
  "out-of-stock": "Currently unavailable",
};

function canAddToCart(product) {
  return product.availability !== "out-of-stock";
}
