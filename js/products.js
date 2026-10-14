/*
 * PRODUCT DATA (DEMO)
 * -------------------
 * These six sarees are fictional sample products created for this demo.
 * Names, descriptions, prices and photos do NOT represent real Al-Fajar stock.
 *
 * To add a product, copy one object, give it a unique `id` (lowercase, dashes,
 * no spaces — it becomes part of the page address: product.html?id=...),
 * and put its photo in assets/images/.
 *
 * Fields:
 *   id          unique, used in links
 *   name        product name
 *   category    must match one of PRODUCT_CATEGORIES below
 *   price       number in PKR (no commas)
 *   isSample    true = show "sample price" label. Set false for verified prices.
 *   featured    true = show on the home page
 *   image       path to the photo inside assets/images/
 *   imageAlt    short description of the photo for screen readers
 *   description one or two sentences
 *   details     optional list of bullet points (only include facts you know)
 */
const PRODUCT_CATEGORIES = ["Embroidered", "Festive", "Formal", "Everyday"];

const PRODUCTS = [
  {
    id: "classic-embroidered-saree",
    name: "Classic Embroidered Saree",
    category: "Embroidered",
    price: 4500,
    isSample: true,
    featured: true,
    image: "assets/images/saree-classic-embroidered.jpg",
    imageAlt: "Model wearing a deep maroon saree with a wide gold embroidered border",
    description:
      "A deep maroon drape finished with a rich gold-toned embroidered border and pallu — a timeless choice for family gatherings.",
    details: ["Illustrative product for demonstration", "Colour shown: maroon with gold"],
  },
  {
    id: "festive-floral-saree",
    name: "Festive Floral Saree",
    category: "Festive",
    price: 5200,
    isSample: true,
    featured: true,
    image: "assets/images/saree-festive-floral.jpg",
    imageAlt: "Model wearing a rose pink saree with colourful floral motifs",
    description:
      "Soft rose pink scattered with cheerful floral motifs, made for Eid visits, mehndi evenings and festive dinners.",
    details: ["Illustrative product for demonstration", "Colour shown: rose pink, multicolour florals"],
  },
  {
    id: "elegant-occasion-saree",
    name: "Elegant Occasion Saree",
    category: "Formal",
    price: 6000,
    isSample: true,
    featured: true,
    image: "assets/images/saree-elegant-occasion.jpg",
    imageAlt: "Model wearing an emerald green saree with an antique gold border",
    description:
      "Emerald green paired with a broad antique-gold border for weddings, walimas and formal occasions.",
    details: ["Illustrative product for demonstration", "Colour shown: emerald with antique gold"],
  },
  {
    id: "soft-pastel-saree",
    name: "Soft Pastel Saree",
    category: "Everyday",
    price: 3800,
    isSample: true,
    featured: true,
    image: "assets/images/saree-soft-pastel.jpg",
    imageAlt: "Model wearing a light mint pastel saree with delicate silver detailing",
    description:
      "An airy mint pastel drape with delicate silver detailing — light, understated and easy to wear for daytime events.",
    details: ["Illustrative product for demonstration", "Colour shown: mint pastel with silver"],
  },
  {
    id: "traditional-border-saree",
    name: "Traditional Border Saree",
    category: "Everyday",
    price: 4800,
    isSample: true,
    featured: false,
    image: "assets/images/saree-traditional-border.jpg",
    imageAlt: "Model wearing an ivory saree with a wide red and gold woven border",
    description:
      "Classic ivory framed by a wide red-and-gold border, inspired by traditional weaves and suited to many occasions.",
    details: ["Illustrative product for demonstration", "Colour shown: ivory with red and gold"],
  },
  {
    id: "contemporary-party-saree",
    name: "Contemporary Party Saree",
    category: "Festive",
    price: 5500,
    isSample: true,
    featured: false,
    image: "assets/images/saree-contemporary-party.jpg",
    imageAlt: "Model wearing a dark wine saree with subtle sequin sparkle",
    description:
      "A deep wine-and-black drape with subtle sparkle for evening parties and modern celebrations.",
    details: ["Illustrative product for demonstration", "Colour shown: black and wine"],
  },
];
