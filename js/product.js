/*
 * PRODUCT PAGE — reads ?id=... from the address bar and shows that product.
 * Example: product.html?id=festive-floral-saree
 */
(function productPage() {
  const root = document.getElementById("product-root");
  const id = new URLSearchParams(location.search).get("id");
  const product = findProduct(id);

  if (!product) {
    document.title = "Product not found — " + SITE_CONFIG.legalName;
    root.innerHTML =
      '<div class="not-found-panel">' +
      '<p class="eyebrow eyebrow--ruled">Not found</p>' +
      "<h1>We couldn't find that saree</h1>" +
      "<p class=\"lead\">The link may be out of date, or the product may have been removed from the collection.</p>" +
      '<div class="btn-row btn-row--center"><a class="btn btn--primary" href="shop.html">Browse all sarees</a></div>' +
      "</div>";
    return;
  }

  document.title = product.name + " — " + SITE_CONFIG.legalName + " (Demo)";
  const message = buildWhatsAppMessage(product);
  const categoryLink = "shop.html?category=" + encodeURIComponent(product.category);

  const detailsList = product.details && product.details.length
    ? '<ul class="product-detail__details">' + product.details.map((d) => "<li>" + escapeHtml(d) + "</li>").join("") + "</ul>"
    : "";

  root.innerHTML =
    '<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>' +
    '<li><a href="index.html">Home</a></li>' +
    '<li><a href="shop.html">Shop</a></li>' +
    '<li><a href="' + categoryLink + '">' + escapeHtml(product.category) + "</a></li>" +
    '<li aria-current="page">' + escapeHtml(product.name) + "</li>" +
    "</ol></nav>" +
    '<article class="product-detail">' +
    '<div class="product-detail__media">' +
    '<img src="' + imageUrl(product.image, 1000) + '" data-original="' + product.image + '" ' +
    'alt="' + escapeHtml(product.imageAlt) + '" width="928" height="1152" fetchpriority="high">' +
    "</div>" +
    '<div class="product-detail__info">' +
    '<p class="product-detail__category"><a href="' + categoryLink + '">' + escapeHtml(product.category) + "</a></p>" +
    "<h1>" + escapeHtml(product.name) + "</h1>" +
    '<p class="product-detail__price">' + formatPrice(product.price) +
    (product.isSample ? ' <span class="sample-tag">Sample price</span>' : "") + "</p>" +
    '<p class="lead">' + escapeHtml(product.description) + "</p>" +
    detailsList +
    '<div class="product-detail__actions">' +
    whatsAppButtonHTML(product) +
    '<a class="btn btn--outline" data-biz="phone-link" href="#">' + ICONS.phone + "<span>Call the shop</span></a>" +
    '<details class="message-preview"><summary>Preview the enquiry message</summary>' +
    "<blockquote>" + escapeHtml(message) + "</blockquote></details>" +
    "</div>" +
    '<div class="demo-notice" role="note"><p><strong>Demo product.</strong> This item, photo and price are illustrative and are not confirmed Al-Fajar stock. Please check availability with the shop.</p></div>' +
    "</div>" +
    "</article>";

  // The phone button above was added after main.js ran, so fill it now.
  fillBusinessDetails();

  // Related products: same category first, then others, up to 3.
  const others = PRODUCTS.filter((p) => p.id !== product.id);
  const related = others
    .filter((p) => p.category === product.category)
    .concat(others.filter((p) => p.category !== product.category))
    .slice(0, 3);

  if (related.length) {
    document.getElementById("related-products").innerHTML = related.map((p) => productCardHTML(p, "h3")).join("");
    document.getElementById("related-section").hidden = false;
  }
})();
