// Vercel serverless function.
//
// NOTE: same as api/config.js — I reconstructed this one too, since it's
// server-side code I never saw and can't fetch. This matches exactly what
// public/success.html expects back (`paymentStatus` and `customerEmail`)
// using Stripe's standard "retrieve a Checkout Session" call. If your
// original version did anything more than confirm payment status, tell me
// and I'll add it back in.
//
// Confirms a completed Stripe Checkout session for success.html.
const Stripe = require("stripe");

module.exports = async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({
      error:
        "STRIPE_SECRET_KEY is not set. Add it in your Vercel project's Environment Variables, then redeploy.",
    });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-01-27.acacia",
  });

  const { session_id } = req.query || {};
  if (!session_id) {
    return res.status(400).json({ error: "Missing session_id" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    return res.status(200).json({
      paymentStatus: session.payment_status,
      customerEmail: session.customer_details ? session.customer_details.email : null,
    });
  } catch (err) {
    console.error("Stripe error:", err);
    return res.status(500).json({ error: "Could not confirm order." });
  }
};
