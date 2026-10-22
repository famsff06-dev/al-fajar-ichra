/*
 * DEMO CART
 * ---------
 * Keeps the cart in the browser's localStorage so it survives a refresh.
 * Nothing is ever sent to a server — this is a demonstration only.
 *
 * What is stored (only what we need, never prices):
 *   [{ key: "sar-002|Rose pink|", id: "sar-002", color: "Rose pink", size: null, qty: 2 }, ...]
 *
 * Prices are deliberately NOT stored. Every page looks the price up in
 * data/products.json when it shows the cart, so a price change in the catalog
 * is picked up immediately and an old saved cart can't show a stale total.
 *
 * Every change fires a "cart:change" event on window. The header cart count
 * listens for it, and for the browser's "storage" event, so the count stays in
 * sync on every page and across open tabs.
 */
const Cart = (function () {
  const STORAGE_KEY = SITE_CONFIG.cartStorageKey;
  const MIN_QTY = 1;
  const MAX_QTY = 10;
  let memoryFallback = []; // used if localStorage is unavailable (e.g. blocked by privacy settings)

  // The same product in a different colour/size is a separate cart line.
  function lineKey(id, color, size) {
    return [id, color || "", size || ""].join("|");
  }

  function clampQty(qty) {
    const n = Math.floor(Number(qty));
    if (!Number.isFinite(n)) return MIN_QTY;
    return Math.min(MAX_QTY, Math.max(MIN_QTY, n));
  }

  // Reads and validates the saved cart. Anything malformed is dropped rather than crashing the page.
  function read() {
    let raw;
    try {
      raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (error) {
      raw = memoryFallback;
    }
    if (!Array.isArray(raw)) return [];
    return raw
      .filter((item) => item && typeof item.id === "string")
      .map((item) => ({
        key: lineKey(item.id, item.color, item.size),
        id: item.id,
        color: item.color || null,
        size: item.size || null,
        qty: clampQty(item.qty),
      }));
  }

  function write(items) {
    memoryFallback = items;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      // Storage full or blocked: the cart still works until the page is closed.
    }
    window.dispatchEvent(new CustomEvent("cart:change"));
  }

  function add(id, options, qty) {
    const color = (options && options.color) || null;
    const size = (options && options.size) || null;
    const key = lineKey(id, color, size);
    const items = read();
    const existing = items.find((item) => item.key === key);
    if (existing) {
      existing.qty = clampQty(existing.qty + (qty || 1));
    } else {
      items.push({ key: key, id: id, color: color, size: size, qty: clampQty(qty || 1) });
    }
    write(items);
  }

  // Quantities can never go below 1 — use remove() to take a line out.
  function setQuantity(key, qty) {
    const items = read();
    const item = items.find((i) => i.key === key);
    if (!item) return;
    item.qty = clampQty(qty);
    write(items);
  }

  function remove(key) {
    write(read().filter((item) => item.key !== key));
  }

  function clear() {
    write([]);
  }

  // Total number of pieces (2 of one saree + 1 of another = 3).
  function count() {
    return read().reduce((total, item) => total + item.qty, 0);
  }

  /*
   * Joins the saved cart with the catalog.
   * Lines whose product no longer exists in data/products.json are removed
   * from storage, so the count and totals stay correct.
   * lineTotal = unit price × quantity (prices are whole rupees, so no rounding issues).
   */
  function getLines(products) {
    const items = read();
    const lines = [];
    const kept = [];
    items.forEach((item) => {
      const product = findProductById(products, item.id);
      if (!product) return;
      kept.push(item);
      lines.push({
        key: item.key,
        product: product,
        color: item.color,
        size: item.size,
        qty: item.qty,
        lineTotal: product.price * item.qty,
      });
    });
    if (kept.length !== items.length) write(kept);
    return lines;
  }

  function subtotal(lines) {
    return lines.reduce((total, line) => total + line.lineTotal, 0);
  }

  function hasSamplePrices(lines) {
    return lines.some((line) => isSamplePrice(line.product));
  }

  // Runs `callback` whenever the cart changes in this tab or another tab.
  function onChange(callback) {
    window.addEventListener("cart:change", callback);
    window.addEventListener("storage", (event) => {
      if (event.key === STORAGE_KEY) callback();
    });
  }

  return {
    MIN_QTY: MIN_QTY,
    MAX_QTY: MAX_QTY,
    add: add,
    setQuantity: setQuantity,
    remove: remove,
    clear: clear,
    count: count,
    getLines: getLines,
    subtotal: subtotal,
    hasSamplePrices: hasSamplePrices,
    onChange: onChange,
  };
})();
