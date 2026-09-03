// Canonical product catalog — single source of truth.
//
// This is used by:
//   - api/create-checkout-session.js (server-side, authoritative price)
//   - scripts/build.js (generates public/data/products.json + public/feed.csv)
//
// To update a price or add a product, edit this file, then run:
//   node scripts/build.js
// and redeploy.
//
// "amwaySourceLink" is kept only as a provenance reference (where the price/
// image were verified) — it is NOT what gets published in the storefront
// feed. The feed and product pages link to YOUR site, since checkout happens
// on your site, not Amway's.
module.exports = [
  {
    id: "127070",
    title: "XS Energy Drink 12 oz – Variety Case",
    description:
      "Twelve 12 oz. cans mixing the most popular XS Energy Drink flavors in one convenient case. Packed with B-vitamins and caffeine for a sugar-free energy boost.",
    availability: "in stock",
    condition: "new",
    price: 37.0,
    currency: "USD",
    brand: "XS",
    category: "Energy Drinks",
    image:
      "https://www.amway.com/medias/127070-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w1MzM3NzB8aW1hZ2UvcG5nfHN5cy1tYXN0ZXIvaW1hZ2VzL2hjYi9oZjEvOTUzNzY4MjM3NDY4Ni8xMjcwNzAtZW4tVVMtNjkwcHgtMDF8OTA5MGMwYThiMTgyMzFmNTBjZGUwZGM5MGVjMzFiYzAyMGVkODhiODk2NzNjN2Y5MDk4NGFkMGJlM2VmYzg3Ng",
    amwaySourceLink:
      "https://www.amway.com/en_US/XS%E2%84%A2-Energy-Drink-12-oz-%E2%80%93-Variety-Case-p-127070",
    note: "Original catalog ID 124652 was not found live on amway.com — it appears to have been superseded by current SKU 127070 (same product concept: XS Energy Drink Variety Case). Verify this is the SKU you intend to sell.",
  },
  {
    id: "110922",
    title: "Nutrilite Twist Tubes 2GO Variety Pack",
    description:
      "Portable powdered drink mix twist tubes in three varieties: Antioxidant (Mango Citrus), Immunity (Strawberry Kiwi), and Joint Health (Raspberry). Just add to water.",
    availability: "in stock",
    condition: "new",
    price: 24.0,
    currency: "USD",
    brand: "Nutrilite",
    category: "Vitamins & Supplements",
    image:
      "https://www.amway.com/medias/110922-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w1MDEyNjB8aW1hZ2UvcG5nfHN5cy1tYXN0ZXIvaW1hZ2VzL2hkNi9oMjEvOTU1Njk4MDQwMDE1OC8xMTA5MjItZW4tVVMtNjkwcHgtMDF8YWZiNjFjZTgzOWZhMmVlMDRhMGFhOGIzM2ViNWFlY2Y4OThjZjc5MDNhNWNlYzM5ZTFlZjhjZTdiODU1YzcyNA",
    amwaySourceLink:
      "https://www.amway.com/en_US/Nutrilite%26trade%3B-Twist-Tubes-2GO%26trade%3B-%26ndash%3B-Variety-Pack-p-110922",
  },
  {
    id: "125897TR",
    title: "G&H Protect Bar Soap",
    description:
      "A mild, plant-based bar soap that fights body odor and removes dirt and impurities. Formulated with prebiotics, rosemary, glycerin, and Nutrilite-approved green tea extract. 6 bars x 150g (900g total).",
    availability: "in stock",
    condition: "new",
    price: 29.0,
    currency: "USD",
    brand: "G&H",
    category: "Soaps",
    image:
      "https://www.amway.com/medias/125897TR-en-US-690px-01?context=bWFzdGVyfGltYWdlc3wxMDEwNjl8aW1hZ2UvcG5nfHN5cy1tYXN0ZXIvaW1hZ2VzL2g1Ny9oNjUvOTY5ODgzNzg4OTA1NC8xMjU4OTdUUi1lbi1VUy02OTBweC0wMXw2ODE1MTUwNDE2ZmFlMzM4ZmVlZWQ5MzkyM2M4ZTI2YjQxOWM4ZGI4MjBhZmRlZjA3OTY0MTk3ZGRiYjhkZmUx",
    amwaySourceLink:
      "https://www.amway.com/en_US/g%26h%E2%84%A2-Protect-Bar-Soap-p-125897TR",
    note: "Your original sheet listed $28.00; current amway.com price is $29.00. Updated to the current price — double check against your own IBO pricing before launch.",
  },
  {
    id: "124106",
    title: "Glister Multi-Action Fluoride Toothpaste",
    description:
      "Fluoride toothpaste that whitens teeth, fights cavities, removes plaque, and freshens breath with regular brushing.",
    availability: "in stock",
    condition: "new",
    price: 7.75,
    currency: "USD",
    brand: "Glister",
    category: "Toothpaste",
    image:
      "https://www.amway.com/medias/124106-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w0MTQ3OXxpbWFnZS9wbmd8c3lzLW1hc3Rlci9pbWFnZXMvaGFlL2hjMC85NTE4MTY3MDMxODM4LzEyNDEwNi1lbi1VUy02OTBweC0wMXwzZjk1MTcxYjIxMTcyMDdmYTY4NTJkNjE0MmU4NzRmYzU5ZTk4MTQ1NTBjOWE3NmVjOTZlZGExNWM3YzcwNWZm",
    amwaySourceLink:
      "https://www.amway.com/Glister%E2%84%A2-Multi-Action-Toothpaste-p-124106",
  },
  {
    id: "110601",
    title: "XS CocoWater Hydration Drink Mix - Strawberry/Watermelon",
    description:
      "Hydrating drink mix with 12% coconut water, B vitamins, and antioxidant vitamins A, C, and E in a strawberry-watermelon flavor.",
    availability: "in stock",
    condition: "new",
    price: 28.0,
    currency: "USD",
    brand: "XS",
    category: "Coconut Water",
    image:
      "https://www.amway.com/medias/110601-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w3Mjg1MXxpbWFnZS9wbmd8aW1hZ2VzL2hmMS9oMjkvOTM1NTE4NDk5NjM4Mi5wbmd8ZGYxMjMwNDZmNjY2YmQ4ZDFiMWJmZTY3YThjMTQ5YTYzODkwYmRjNzM3MTllOTU2MjBhN2I3NWQ2Nzg0MjgxZQ",
    amwaySourceLink:
      "https://www.amway.com/en_US/XS%E2%84%A2-CocoWater-Hydration-Drink-Mix-%E2%80%93-Strawberry-Watermelon-p-110601",
  },
  {
    id: "124674D",
    title: "Artistry Go Vibrant Sheer Lip Balm",
    description:
      "Deeply moisturizing lip balm with a sheer, satin-gloss finish. Nourishes lips with White Chia Seed oil, Shea Butter, and Aloe Vera extract.",
    availability: "in stock",
    condition: "new",
    price: 28.0,
    currency: "USD",
    brand: "Artistry",
    category: "Lip Care",
    image:
      "https://www.amway.com/medias/124674D-en-US-690px-01?context=bWFzdGVyfGltYWdlc3wzNjg2OHxpbWFnZS9wbmd8aW1hZ2VzL2hmNi9oNjIvOTQwMjI2NDc0ODA2Mi5wbmd8NThmYmVkYzNlMTljOWYzMTE2OTE4MzA2OGVjNzY1MTUwM2Y1M2RmNjNhODg3NWFiMTBiNGQ2YTE3OWJkNjNmMw",
    amwaySourceLink:
      "https://www.amway.com/en_US/Artistry-Go-Vibrant%E2%84%A2-Sheer-Lip-Balm-p-124674D",
  },
  {
    id: "120872D",
    title: "Artistry Lash Boosting 3-in-1 Mascara",
    description:
      "A 3-in-1 mascara with an easy-to-twist brush that volumizes, lifts, and separates lashes, infused with botanicals and vitamins C and E.",
    availability: "in stock",
    condition: "new",
    price: null,
    currency: "USD",
    brand: "Artistry",
    category: "Mascara",
    image: null,
    amwaySourceLink:
      "https://www.amway.com/Artistry%E2%84%A2-Lash-Boosting-3-in-1-Mascara-p-120872D",
    needsReview: true,
    note: "amway.com blocks automated access to this product page (robots.txt), so price and image could not be verified automatically. Open the source link, copy the current price and image URL in manually, then clear needsReview before launch. This product is hidden from Buy Now / checkout and the feed until price is set.",
  },
  {
    id: "127481D",
    title: "Artistry Go Vibrant Light Up Liquid Lip Glow - Desert Rose 102",
    description:
      "Liquid lip color with a glowy, glossy finish and 10-hour wear. Features a built-in LED light and mirror for easy application anywhere.",
    availability: "in stock",
    condition: "new",
    price: 24.0,
    currency: "USD",
    brand: "Artistry",
    category: "Lip Gloss",
    image:
      "https://www.amway.com/medias/127481D-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w4OTI3MXxpbWFnZS9wbmd8c3lzLW1hc3Rlci9pbWFnZXMvaDA2L2g3ZC85ODgwNDUxMDg4NDE0LzEyNzQ4MUQtZW4tVVMtNjkwcHgtMDF8NjY0N2JkYmU5MzhlYzY1OTJmZDk1OGY0NDNhNzUxNDBjNGRhNzY0OWI1OTFjYTI3NTg4MzE1OTJhYzlhMjVlZg",
    amwaySourceLink:
      "https://www.amway.com/en_US/Artistry-Go-Vibrant%E2%84%A2-Light-Up-Liquid-Lip-Glow---Desert-Rose-102-p-127481D",
  },
  {
    id: "109745",
    title: "Nutrilite Vitamin C Extended Release",
    description:
      "Extended-release vitamin C tablet made with acerola cherry, delivering slow, steady vitamin C release over 8 hours for all-day immune support.",
    availability: "in stock",
    condition: "new",
    price: 20.0,
    currency: "USD",
    brand: "Nutrilite",
    category: "Vitamins & Supplements",
    image:
      "https://www.amway.com/medias/109745-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w5MDgyNHxpbWFnZS9wbmd8aW1hZ2VzL2hiNC9oMjEvOTQ0ODE3NDA1OTU1MC5wbmd8YTQ1ZjhkMDU3ZGYxYmUwNjJmMzdlNWY1MzU4ZDJhMTNiNGY3Yzk3OTdlNDIyZWIwN2UwNDJmNmZjMTZmOWRkOQ",
    amwaySourceLink:
      "https://www.amway.com/en_US/Nutrilite%E2%84%A2-Vitamin-C-Extended-Release-p-109745",
  },
  {
    id: "119630D",
    title: "Artistry Flora Chic Eau de Parfum Spray",
    description:
      "A modern, long-lasting floral eau de parfum with top notes of French Clementine, mandarin, and sweet orange, crafted by fragrance house Givaudan.",
    availability: "in stock",
    condition: "new",
    price: 99.0,
    currency: "USD",
    brand: "Artistry",
    category: "Fragrances",
    image:
      "https://www.amway.com/medias/119630D-en-US-690px-01?context=bWFzdGVyfGltYWdlc3wxMTMzMTd8aW1hZ2UvcG5nfGltYWdlcy9oNWUvaGVlLzkzNTUyMzg1MDY1MjYucG5nfGMzODBmYTJhNjk1NDVhNGUzNjU4OTc1MjUwZWI4MTA0N2JlODBhMmM5Yzc3NDNjZGJhZWE3NDVlOTYzNjc2NDQ",
    amwaySourceLink:
      "https://www.amway.com/en_US/Artistry-Flora-Chic%E2%84%A2-Eau-de-Parfum-Spray-p-119630D",
  },
  {
    id: "120549D",
    title: "Artistry Men Unknown Eau de Parfum Spray",
    description:
      "A masculine eau de parfum with top notes of bergamot, a heart of clary sage, and a patchouli base, developed by fragrance house IFF.",
    availability: "in stock",
    condition: "new",
    price: 96.0,
    currency: "USD",
    brand: "Artistry",
    category: "Fragrances",
    image:
      "https://www.amway.com/medias/120549D-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w3NjUyN3xpbWFnZS9wbmd8aW1hZ2VzL2g4MS9oOTMvOTM1NTI0ODg5Mzk4Mi5wbmd8MjQ3Yjg4MTdjMGZkZGYxNzRlZmI1NjIzNTZiOTk2MTg5Y2I0ZmI5YWI1MDI4NWFhNDY2ZTFmMTQ0MmM5ZDBjMw",
    amwaySourceLink:
      "https://www.amway.com/Artistry%E2%84%A2-Men-Unknown-Eau-de-Parfum-Spray-p-120549D",
  },
  {
    id: "111045",
    title: "Nutrilite Wellness Bars - Nutty Dark Chocolate",
    description:
      "A snack bar made with wholesome ingredients including crunchy almonds, peanuts, and dark chocolate, delivering 8g of protein per bar.",
    availability: "in stock",
    condition: "new",
    price: 29.0,
    currency: "USD",
    brand: "Nutrilite",
    category: "Nutrition Bars",
    image:
      "https://www.amway.com/medias/111045-en-US-690px-01?context=bWFzdGVyfGltYWdlc3wyNDE0MTd8aW1hZ2UvcG5nfHN5cy1tYXN0ZXIvaW1hZ2VzL2hkMy9oOWYvOTYzMTMwNjU0NzIzMC8xMTEwNDUtZW4tVVMtNjkwcHgtMDF8ODExNDQ4NmVmODNhNjg4ZTQ5MGJjZDA4ODRmNjQwYTQzZmQzZmJlYTZkMDI5NWI2YmQzMWNjMjBhMTEzYzIzOQ",
    amwaySourceLink:
      "https://www.amway.com/en_US/Nutrilite%26trade%3B-Wellness-Bars---Nutty-Dark-Chocolate-p-111045",
  },
  {
    id: "A7553",
    title: "Nutrilite Hair, Skin & Nail Health",
    description:
      "A dietary supplement with biotin and collagen to support strong, flexible nails, healthy hair, and smooth, elastic skin.",
    availability: "in stock",
    condition: "new",
    price: 26.0,
    currency: "USD",
    brand: "Nutrilite",
    category: "Vitamins & Supplements",
    image:
      "https://www.amway.com/medias/A7553-en-US-690px-01?context=bWFzdGVyfGltYWdlc3wzMjI4Mzl8aW1hZ2UvcG5nfHN5cy1tYXN0ZXIvaW1hZ2VzL2gzNy9oMDAvOTY4NzA1ODE1MzUwMi9BNzU1My1lbi1VUy02OTBweC0wMXxhOWViY2JhMjFhYmI0ZTBmN2Y4ZmRmYTJjOWQxMzBlZmU5MTA4MTg4ZDUwMDdmZGU3YTQ4NGZhY2ZlNDEzYjZk",
    amwaySourceLink:
      "https://www.amway.com/en_US/Nutrilite%E2%84%A2-Hair,-Skin-&-Nail-Health-p-A7553",
  },
  {
    id: "308639",
    title: "Nutrilite Organics Lion's Mane Mushroom Capsules",
    description:
      "Capsules featuring DNA-verified Lion's Mane mushroom at a 20:1 extract ratio to help support brain health, cognitive function, and nerve function.",
    availability: "in stock",
    condition: "new",
    price: 34.0,
    currency: "USD",
    brand: "Nutrilite",
    category: "Vitamins & Supplements",
    image:
      "https://www.amway.com/medias/308639-en-US-690px-01?context=bWFzdGVyfGltYWdlc3wzODkyNzN8aW1hZ2UvcG5nfHN5cy1tYXN0ZXIvaW1hZ2VzL2g4MC9oMjQvMTAxNTgxNjQyNzkzMjYvMzA4NjM5LWVuLVVTLTY5MHB4LTAxfGQ4N2QzNTM5ODk4NjlkYTQyODQwOWQxMWYwNWEzZWJjOTAzYzFkZWVkOTFiMzA2YTg3ZjBiY2UzODdhOWJlNzY",
    amwaySourceLink:
      "https://www.amway.com/en_US/Nutrilite%E2%84%A2-Organics-Lion%E2%80%99s-Mane-Mushroom-Capsules-p-308639",
  },
  {
    id: "107846",
    title: "XS Energy + Focus Dietary Supplement - 30 Tablets",
    description:
      "A dietary supplement tablet with natural caffeine from green tea extract and rhodiola rosea to support physical endurance and mental focus.",
    availability: "in stock",
    condition: "new",
    price: 29.5,
    currency: "USD",
    brand: "XS",
    category: "Vitamins & Supplements",
    image:
      "https://www.amway.com/medias/107846-en-US-690px-01?context=bWFzdGVyfGltYWdlc3w1NjYzNHxpbWFnZS9wbmd8aW1hZ2VzL2gzYS9oZjgvOTM1NTE5MTI4NzgzOC5wbmd8ZWMzMTNmNDkzYjExNjk0NWYzMjY1NjkzNGFhZWQ5ODAyYjRmNDgxZGU3ODhhYzE3OTNkNGRhNjJiZTNkMThlMw",
    amwaySourceLink:
      "https://www.amway.com/en_US/XS%E2%84%A2-Energy-%2B-Focus-Dietary-Supplement---30-Tablets-p-107846",
  },
];
