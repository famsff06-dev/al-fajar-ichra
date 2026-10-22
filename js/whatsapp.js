/*
 * WHATSAPP ENQUIRIES
 * ------------------
 * Builds "click to chat" links (https://wa.me/<number>?text=<message>).
 * The business number is set in ONE place: SITE_CONFIG.whatsappNumber in js/config.js.
 * While it is empty, every WhatsApp button is shown disabled with an explanation.
 *
 * Opening WhatsApp only prepares the message — the customer still has to press
 * Send, so the site never says a message was "sent" or "delivered".
 */

function isWhatsAppConfigured() {
  return /^\d{10,15}$/.test(SITE_CONFIG.whatsappNumber);
}

// A full link back to the product page, so the shop can see exactly which item is meant.
// Skipped when the site is opened from a file on your computer (the link wouldn't work for the shop).
function absoluteUrl(path) {
  if (!/^https?:$/.test(location.protocol)) return "";
  return new URL(path, location.href).href;
}

function optionsText(color, size) {
  const parts = [];
  if (color) parts.push("Colour: " + color);
  if (size) parts.push("Size: " + size);
  return parts.join(", ");
}

function priceText(product, amount) {
  return formatPrice(amount) + (isSamplePrice(product) ? " (sample price shown on the website)" : "");
}

function generalEnquiryMessage() {
  return "Assalam o Alaikum! I found " + SITE_CONFIG.legalName + " online and would like to ask about your collection.";
}

// Message for one product, including the colour/size the customer picked (if any).
function productEnquiryMessage(product, options) {
  const color = options && options.color;
  const size = options && options.size;
  const lines = [
    "Assalam o Alaikum! I'd like to ask about this item from the " + SITE_CONFIG.legalName + " website:",
    "",
    "Product: " + product.name,
  ];
  const chosen = optionsText(color, size);
  if (chosen) lines.push(chosen);
  lines.push("Price listed: " + priceText(product, product.price));
  const link = absoluteUrl(productUrl(product));
  if (link) lines.push("Link: " + link);
  lines.push("", "Is it available, and could you share more details?");
  return lines.join("\n");
}

// Message for the whole cart: one numbered line per item with options, quantity and line total.
function cartEnquiryMessage(lines) {
  const out = [
    "Assalam o Alaikum! I'd like to ask about these items from my cart on the " + SITE_CONFIG.legalName + " website:",
    "",
  ];
  lines.forEach((line, index) => {
    const chosen = optionsText(line.color, line.size);
    out.push(
      index + 1 + ". " + line.product.name +
        (chosen ? " (" + chosen + ")" : "") +
        " × " + line.qty + " — " + formatPrice(line.lineTotal)
    );
  });
  out.push("", "Website subtotal: " + formatPrice(Cart.subtotal(lines)));
  if (Cart.hasSamplePrices(lines)) out.push("(These are sample prices from the website — please confirm the actual prices.)");
  out.push("", "Could you let me know about availability and how I can buy these?");
  return out.join("\n");
}

// encodeURIComponent makes spaces, line breaks, quotes, "&" and "×" safe inside the link.
function buildWhatsAppUrl(message) {
  if (!isWhatsAppConfigured()) return null;
  return "https://wa.me/" + SITE_CONFIG.whatsappNumber + "?text=" + encodeURIComponent(message);
}

/*
 * Returns the button HTML. `noteId` must be unique on the page because the
 * disabled button points at its explanation with aria-describedby.
 */
function whatsAppButtonHTML(message, label, noteId) {
  const url = buildWhatsAppUrl(message);
  const text = label || "Enquire on WhatsApp";
  const id = noteId || "wa-note";
  if (url) {
    return (
      '<a class="btn btn--whatsapp" href="' + escapeHtml(url) + '" target="_blank" rel="noopener">' +
      ICONS.whatsapp + "<span>" + text + '</span><span class="visually-hidden"> (opens WhatsApp in a new tab)</span></a>' +
      '<p class="wa-note">Opens WhatsApp with this message ready. Nothing is sent until you press Send there.</p>'
    );
  }
  return (
    '<button class="btn btn--whatsapp" type="button" disabled aria-describedby="' + id + '">' +
    ICONS.whatsapp + "<span>" + text + "</span></button>" +
    '<p class="wa-note" id="' + id + '">WhatsApp isn\'t connected yet — the shop\'s WhatsApp number still needs to be confirmed. You can preview the message below.</p>'
  );
}

// Collapsible preview so visitors (and the owner) can read the prepared message.
function messagePreviewHTML(message) {
  return (
    '<details class="message-preview"><summary>Preview the WhatsApp message</summary>' +
    '<blockquote class="message-preview__text">' + escapeHtml(message) + "</blockquote></details>"
  );
}
