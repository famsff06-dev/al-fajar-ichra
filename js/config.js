/*
 * SITE CONFIGURATION
 * ------------------
 * All business details live here so you only have to edit them in one place.
 * Every page reads from this object (see js/main.js -> fillBusinessDetails).
 * This file is loaded in the <head> of every page (before the stylesheets
 * are applied) so the design direction below can be set without a flash.
 *
 * Anything marked "verified: false" came from a public Google Maps listing or
 * is a placeholder. Confirm it with the shop owner before going live, then
 * flip the flag to true so the "please confirm" notes disappear.
 */
const SITE_CONFIG = {
  // Shown in the header, footer and page titles.
  // The listing uses "Al fajar cloth house" — confirm the official spelling.
  brandName: "Al-Fajar",
  brandSubtitle: "Cloth House · Ichhra",
  legalName: "Al-Fajar Cloth House",

  // Set to false once the owner has approved the site — this hides the
  // "unofficial demo" ribbon at the top of every page.
  isDemo: true,

  /*
   * DESIGN DIRECTION
   * "boutique" = Direction A, Elegant Boutique (cream, burgundy, serif headings)
   * "minimal"  = Direction B, Modern Minimal (warm white, neutral, sans-serif)
   * Compare both on design.html. Direction B is a small set of overrides in
   * css/direction-minimal.css, so whichever one is chosen stays easy to refine.
   */
  designDirection: "boutique",

  // Name of the localStorage entry that keeps the demo cart between visits.
  cartStorageKey: "alfajar-demo-cart-v1",

  /*
   * WHATSAPP
   * Leave empty ("") until the owner confirms which number uses WhatsApp.
   * Format: country code + number, digits only, no "+" or leading zero.
   *   Example: 0300 1234567  ->  "923001234567"
   * While empty, WhatsApp buttons are shown as disabled with a note.
   */
  whatsappNumber: "",

  // Phone from the public Google Maps listing.
  phone: {
    display: "0300 1578439",
    tel: "+923001578439",
    verified: false,
  },

  address: {
    lines: [
      "Bazar Farooq-e-Azam St, near Pakistani Chowk",
      "Sardarpura, Ichhra, Lahore 58000, Pakistan",
    ],
    verified: false,
  },

  // Replace with the exact "Share" link from the Google Maps listing
  // (Google Maps -> the shop -> Share -> Copy link).
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Al+Fajar+Cloth+House+Ichra+Lahore",

  // Based on the Google listing (opens 11:30 am, closes 10 pm, Sunday closed).
  // Day-by-day hours were not listed separately, so please confirm.
  hours: [
    { days: "Monday – Saturday", time: "11:30 am – 10:00 pm" },
    { days: "Sunday", time: "Closed" },
  ],
  hoursVerified: false,

  social: {
    instagram: "https://www.instagram.com/alfajarichra/",
    facebook: "https://www.facebook.com/AlFajarcothhouse/",
  },

  /*
   * SHOP POLICIES — leave a value as "" until the owner confirms it.
   * Empty values are shown on the About page (and at demo checkout) as a
   * highlighted "[Placeholder: ...]" so nothing invented is ever published.
   * Write confirmed text as plain sentences, e.g.
   *   delivery: "Delivery within Lahore in 2–3 days. Charges confirmed on WhatsApp.",
   */
  email: "",
  policies: {
    returns: "",
    delivery: "",
    payment: "",
  },
};
