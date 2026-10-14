/*
 * SHOP PAGE — search + category filter
 * The current search and category are kept in the address bar
 * (e.g. shop.html?category=Festive&q=floral) so filtered views can be shared
 * and the browser Back button works as expected.
 */
(function shopPage() {
  const grid = document.getElementById("product-grid");
  const searchInput = document.getElementById("product-search");
  const filtersEl = document.getElementById("category-filters");
  const countEl = document.getElementById("results-count");
  const emptyState = document.getElementById("empty-state");
  const clearButton = document.getElementById("clear-filters");
  const form = document.getElementById("shop-tools");

  const ALL = "All";
  const params = new URLSearchParams(location.search);
  const state = {
    query: params.get("q") || "",
    category: PRODUCT_CATEGORIES.includes(params.get("category")) ? params.get("category") : ALL,
  };

  function renderFilters() {
    filtersEl.innerHTML = [ALL]
      .concat(PRODUCT_CATEGORIES)
      .map(
        (category) =>
          '<button type="button" class="chip" data-category="' + category + '" aria-pressed="' +
          (category === state.category) + '">' + category + "</button>"
      )
      .join("");
  }

  function getMatches() {
    const query = state.query.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const inCategory = state.category === ALL || product.category === state.category;
      const inSearch = !query || product.name.toLowerCase().includes(query);
      return inCategory && inSearch;
    });
  }

  function updateUrl() {
    const next = new URLSearchParams();
    if (state.query.trim()) next.set("q", state.query.trim());
    if (state.category !== ALL) next.set("category", state.category);
    const qs = next.toString();
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : ""));
  }

  function render() {
    const matches = getMatches();
    grid.innerHTML = matches.map((product) => productCardHTML(product, "h2")).join("");
    grid.hidden = matches.length === 0;
    emptyState.hidden = matches.length !== 0;

    const noun = matches.length === 1 ? "saree" : "sarees";
    let summary = "Showing " + matches.length + " " + noun;
    if (state.category !== ALL) summary += " in " + state.category;
    if (state.query.trim()) summary += " matching “" + state.query.trim() + "”";
    countEl.textContent = summary;

    filtersEl.querySelectorAll(".chip").forEach((chip) => {
      chip.setAttribute("aria-pressed", String(chip.dataset.category === state.category));
    });
    updateUrl();
  }

  searchInput.value = state.query;
  searchInput.addEventListener("input", () => {
    state.query = searchInput.value;
    render();
  });

  // Pressing Enter in the search box shouldn't reload the page.
  form.addEventListener("submit", (event) => event.preventDefault());

  filtersEl.addEventListener("click", (event) => {
    const chip = event.target.closest(".chip");
    if (!chip) return;
    state.category = chip.dataset.category;
    render();
  });

  clearButton.addEventListener("click", () => {
    state.query = "";
    state.category = ALL;
    searchInput.value = "";
    render();
    searchInput.focus();
  });

  renderFilters();
  render();
})();
