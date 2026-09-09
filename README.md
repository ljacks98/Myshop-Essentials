# Wellness Essentials Code-Structure

A small storefront: a product grid, individual product pages, a real
shopping cart, and Stripe **Embedded Checkout** (the customer pays without
ever leaving your site). It also generates a product feed you can hand to
Meta Commerce Manager to power Instagram Shopping tags — and that same
Instagram checkout flow shares the same cart-aware backend as the on-site
cart, so both paths are tested by the same code.

## What's in here

```
public/               the website (static — HTML/CSS/JS)
  index.html           product grid, with "Add to Cart" on every card
  product.html          one product's detail page (?id=...) — Add to Cart
                          with a quantity picker, or Buy Now to skip
                          straight to checkout with just that item
  cart.html              view everything in the cart, adjust quantities,
                          remove items, see the total, then Checkout
  checkout.html          embedded Stripe checkout for a single item
                          (?products=ID:QTY) or a whole cart
                          (?products=ID:QTY,ID:QTY,...) — this exact same
                          URL shape is also what Meta's Instagram
                          checkout redirects to
  success.html            order confirmation — clears the cart once
                          payment is confirmed
  site.js                 shared cart logic (localStorage-based — see
                          "How the cart works" below) and branding helpers
  data/products.json    generated — display data for the frontend
  feed.csv               generated — the Instagram/Facebook product feed
api/                   serverless functions (run on Vercel, not in the browser)
  create-checkout-session.js   creates a Stripe Checkout Session for one
                                item or a whole cart, using YOUR server-side
                                prices (a customer editing page JS cannot
                                change what they're charged)
  config.js                     hands your Stripe *publishable* key to the browser
  session-status.js             confirms a completed payment on success.html
  _lib/catalog.js               the ONE place your product data lives
scripts/build.js       regenerates public/data/products.json, public/feed.csv,
                        and the footer on every page (from shop.config.js)
shop.config.js          your shop name, tagline, Instagram handle, site URL
```

## 2. Push this to GitHub (recommended) or deploy directly

Easiest path — GitHub + Vercel's dashboard:

```bash
cd amway-shop
git init
git add .
git commit -m "Initial shop"
```

Then create a new repo on GitHub and push it there.

(You can also skip GitHub and deploy straight from your machine with the
Vercel CLI — see step 3.)

## 3. Deploy on Vercel

**Option A — via the dashboard (no terminal needed after GitHub push):**
1. Go to https://vercel.com/new, sign in, and import the GitHub repo.
2. Framework preset: choose "Other" (this isn't a framework, it's plain
   static + serverless functions — Vercel handles that fine).
3. Before the first deploy, add environment variables (**Settings → Environment
   Variables**):
   - `STRIPE_SECRET_KEY` = your `sk_test_...` key
   - `STRIPE_PUBLISHABLE_KEY` = your `pk_test_...` key
4. Click Deploy. You'll get a URL like `https://your-project.vercel.app`.

**Option B — via the CLI:**
```bash
npm install -g vercel
cd amway-shop
vercel login
vercel link
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_PUBLISHABLE_KEY
vercel --prod
```
