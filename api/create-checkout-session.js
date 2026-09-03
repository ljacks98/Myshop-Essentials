// Vercel serverless function.
// Creates a Stripe Embedded Checkout session using SERVER-SIDE prices from
// api/_lib/catalog.js — never trusts a price sent by the browser, so a
// customer can't tamper with the amount by editing page JS.
//
// Updated to accept the WHOLE cart (multiple products + quantities), not
// just a single product. Old callers that still send { productId, quantity }
// keep working too, for safety during rollout.
const Stripe = require("stripe");
const catalog = require("./_lib/catalog.js");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({
      error:
        "STRIPE_SECRET_KEY is not set. Add it in your Vercel project's Environment Variables, then redeploy.",
    });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-01-27.acacia",
  });

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  // Normalize both shapes into one `items` array:
  //   new:  { items: [{ productId, quantity }, ...] }
  //   old:  { productId, quantity }
  let items = Array.isArray(body?.items) ? body.items : null;
  if (!items && body?.productId) {
    items = [{ productId: body.productId, quantity: body.quantity }];
  }
  if (!items || items.length === 0) {
    return res.status(400).json({ error: "No items provided." });
  }

  const line_items = [];
  for (const { productId, quantity } of items) {
    const product = catalog.find((p) => p.id === productId);
    if (!product) {
      return res.status(404).json({ error: `Unknown product id: ${productId}` });
    }
    if (product.needsReview || product.price == null) {
      return res.status(400).json({
        error: `${product.title} is not yet priced and can't be purchased.`,
      });
    }
    const qty = Number.isInteger(quantity) && quantity > 0 ? quantity : 1;
    line_items.push({
      price_data: {
        currency: (product.currency || "USD").toLowerCase(),
        product_data: {
          name: product.title,
          images: product.image ? [product.image] : undefined,
          metadata: { catalog_id: product.id },
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: qty,
    });
  }

  const origin = req.headers.origin || `https://${req.headers.host}`;
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      line_items,
      return_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      // Ask Stripe to collect a shipping address since these are physical goods.
      shipping_address_collection: { allowed_countries: ["US"] },
    });
    return res.status(200).json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("Stripe error:", err);
    return res.status(500).json({ error: "Could not start checkout. Please try again." });
  }
};
