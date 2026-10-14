// HOME PAGE — shows products marked `featured: true` in js/products.js
(function renderFeatured() {
  const container = document.getElementById("featured-products");
  if (!container) return;

  const featured = PRODUCTS.filter((product) => product.featured);
  container.innerHTML = featured.map((product) => productCardHTML(product, "h3")).join("");
})();
