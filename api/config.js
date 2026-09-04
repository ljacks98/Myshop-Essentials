// Serves the Stripe *publishable* key to the frontend from an environment
// variable, so you never have to hardcode/edit it into static HTML — just
// set STRIPE_PUBLISHABLE_KEY in Vercel's dashboard.
//
// Publishable keys (pk_...) are safe to expose to the browser by design;
// only the secret key (sk_...) must stay server-side (used in
// create-checkout-session.js, never sent to the client).

module.exports = (req, res) => {
  res.status(200).json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || null,
  });
};
