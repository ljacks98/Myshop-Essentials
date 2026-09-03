// Vercel serverless function.
//
// NOTE: I reconstructed this file — you never sent me your original
// api/config.js, and Vercel doesn't expose serverless function source over
// HTTP the way it does static files, so I couldn't fetch it either. This is
// a minimal, standard implementation that matches exactly what
// public/checkout.html expects back (a `publishableKey` field) and what the
// README describes this file doing. If your original had anything extra in
// it, let me know and I'll fold it in — otherwise this should behave
// identically.
//
// Hands the browser your Stripe *publishable* key (safe to expose — it's
// meant to be public) so the frontend can initialize Stripe.js. The
// *secret* key never leaves the server.
module.exports = async (req, res) => {
  return res.status(200).json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || null,
  });
};
