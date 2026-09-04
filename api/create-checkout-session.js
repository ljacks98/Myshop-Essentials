// Vercel serverless function.
// Creates a Stripe Embedded Checkout session using SERVER-SIDE prices from
// api/_lib/catalog.js — never trusts a price sent by the browser, so a
// customer can't tamper with the amount by editing page JS.

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
  body = body || {};

  // Accept either the newer multi-item { cart: [{id, quantity}], coupon }
  // shape (used by Meta's "Website Checkout URL" multi-product deep link),
  // or the original single-item { productId, quantity } shape (used by our
  // own product pages' Buy Now button). Both normalize to the same `items`.
  let items = [];
  if (Array.isArray(body.cart) && body.cart.length) {
    items = body.cart.map((line) => ({
      id: line.id,
      quantity: Number.isInteger(line.quantity) && line.quantity > 0 ? line.quantity : 1,
    }));
  } else if (body.productId) {
    items = [
      {
        id: body.productId,
        quantity: Number.isInteger(body.quantity) && body.quantity > 0 ? body.quantity : 1,
      },
    ];
  }

  if (!items.length) {
    return res.status(400).json({ error: "No products specified." });
  }

  // Look up every item server-side — never trust a price, title, or image
  // sent from the browser. Skip (rather than fail the whole cart on) any id
  // that isn't in our catalog or isn't priced yet, and report which ones
  // were dropped so the frontend can show an accurate warning.
  const line_items = [];
  const unavailable = [];

  for (const { id, quantity } of items) {
    const product = catalog.find((p) => p.id === id);
    if (!product || product.needsReview || product.price == null) {
      unavailable.push(id);
      continue;
    }
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
      quantity,
    });
  }

  if (!line_items.length) {
    return res.status(400).json({
      error: "None of the requested products are available for purchase.",
      unavailable,
    });
  }

  const origin = req.headers.origin || `https://${req.headers.host}`;
  const coupon = typeof body.coupon === "string" ? body.coupon.trim() : "";

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      line_items,
      return_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      // Ask Stripe to collect a shipping address since these are physical goods.
      shipping_address_collection: { allowed_countries: ["US"] },
      // Show a promo code field in Stripe's own UI rather than us trying to
      // silently apply an arbitrary code — a code only works if it exists as
      // a Promotion Code in this Stripe account (Product catalog > Coupons).
      allow_promotion_codes: true,
    });

    return res.status(200).json({
      clientSecret: session.client_secret,
      unavailable: unavailable.length ? unavailable : undefined,
      requestedCoupon: coupon || undefined,
    });
  } catch (err) {
    console.error("Stripe error:", err);
    return res.status(500).json({ error: "Could not start checkout. Please try again." });
  }
};
