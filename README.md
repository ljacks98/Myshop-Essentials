# Your shop

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

## How the cart works

Cart contents live in the visitor's browser (`localStorage`), not on a
server — there's no login, so there's nothing else to tie a cart to. That
means: it survives closing the tab, the browser, even restarting the
computer, so someone can add items today and check out tomorrow. It does
**not** sync between devices (a phone and a laptop each have their own
cart), and it's cleared automatically right after a successful payment.
Nothing about the cart is sent anywhere until the person actually clicks
Checkout.

## 1. Create a Stripe account (you said you don't have one yet)

1. Go to https://dashboard.stripe.com/register and sign up (free).
2. You'll land in **test mode** by default — that's exactly what you want
   while setting this up. Nothing is charged for real yet.
3. Go to **Developers → API keys**. You'll see two keys:
   - **Publishable key** — starts with `pk_test_...`
   - **Secret key** — starts with `sk_test_...` (click "Reveal")
4. Keep this tab open — you'll paste these into Vercel in step 3.

You won't be able to accept real payments until Stripe finishes verifying
your business (a short form: business type, bank account, etc. — under
**Settings → Business details**). You can build and test everything below
in test mode first, then flip to live keys once that's approved.

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

## 4. Point the feed at your real domain

Open `shop.config.js` and set `SITE_URL` to whatever Vercel gave you (or your
custom domain once you attach one under **Project → Settings → Domains**).
Then regenerate the feed and redeploy:

```bash
node scripts/build.js
git add public/feed.csv public/data/products.json public/shop-config.js
git commit -m "Point feed at production domain"
git push        # if using GitHub, Vercel redeploys automatically
# or: vercel --prod
```

## 5. Test the shop end to end

Visit `https://your-site.vercel.app`, add a couple of different products to
your cart from the grid and from a product page, open the cart (the "Cart"
link, top right), adjust a quantity, then hit **Checkout** and pay with a
Stripe test card: card number `4242 4242 4242 4242`, any future expiry, any
CVC, any ZIP. You should land on `success.html` with a confirmation, and
your cart should be empty again afterward. Check **Stripe Dashboard →
Payments** — you'll see the test payment there.

Also try the single-item path: click into a product and hit **Buy Now**
directly — it should skip the cart and go straight to checkout for just
that one item.

Once that works and Stripe has approved your business details, replace the
two env vars in Vercel with your **live** keys (`pk_live_...` / `sk_live_...`)
and redeploy — real payments will now go through.

## 6. Fix the one incomplete product

`api/_lib/catalog.js` has one entry — **Artistry Lash Boosting 3-in-1
Mascara (120872D)** — with `price: null` and `needsReview: true`. Amway's
site blocks automated price lookups for that page, so it couldn't be
verified automatically. It's hidden from the buy flow and left out of the
feed. To activate it: open the `amwaySourceLink` in that entry, copy the
current price and product image URL from the page, fill them into
`catalog.js`, remove `needsReview: true`, then run `node scripts/build.js`
and redeploy.

Also double check the **first entry (XS Energy Drink Variety Case)** — the
original catalog ID (124652) wasn't found live on amway.com; it's been
mapped to what looks like the current equivalent product (SKU 127070).
Confirm that's the item you actually want to sell.

## 7. Set up Instagram Shopping (Meta Commerce Manager)

Instagram Shopping is powered by a Meta **Catalog**, managed in Commerce
Manager, not by linking a webpage directly in the Instagram app.

1. Go to https://business.facebook.com/commerce/ and create (or select) a
   **Catalog**.
2. Under **Data Sources → Add items → Data feed**, choose **Scheduled feed**
   and point it at:
   ```
   https://your-site.vercel.app/feed.csv
   ```
   Meta will re-fetch this URL on a schedule you pick (daily is typical),
   so once you update prices in `catalog.js` and redeploy, your feed stays
   in sync automatically.
3. Meta reviews the catalog (usually within a day or so) — items need to
   pass its commerce policies to go live.
4. In the Instagram app: **Settings → Business → Shopping**, connect the
   Facebook Page linked to this Catalog. Once approved, your products can be
   tagged in posts/Reels and shown in an Instagram Shop tab.
5. The feed's `link` column points to your `product.html` pages — that's
   where someone lands when they tap a product tag, and from there they hit
   Buy Now into your embedded Stripe checkout.

A few things Meta's review will check, worth confirming before you submit:
correct pricing and availability, a working return/refund policy (add one
somewhere on your site — even a simple paragraph), and that your business
domain in Commerce Manager matches your live site's domain.

## A note on Amway policy

Amway's Independent Business Owner agreement generally expects you to sell
through the official Amway platform (your replicated Amway site) rather than
through an independent storefront that processes payments outside Amway's
system. This project does exactly what you asked for — a self-hosted shop
with your own Stripe checkout — but it's worth confirming with your Amway
upline or the IBO Rules of Conduct that an independent checkout for
Amway-branded products is allowed in your market before you link it from
Instagram.
