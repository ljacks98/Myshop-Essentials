# Cart update — what changed and why

## The "energy drinks" mystery

I checked your live site directly: `feed.csv`, `data/products.json`, and
`catalog.js` are all correctly in sync — every product has a unique ID, the
URLs match exactly, and nothing defaults or falls back to the energy drink
product anywhere in the code. Since you confirmed this only shows up during
**Commerce Manager's own checkout test** (not when you browse your site
yourself), the most likely explanation is that Meta's automated test tool
samples one product from your feed to run its verification through — and
since the energy drinks are the first item in your catalog (and therefore
the first row in `feed.csv`), that's the one it's grabbing to test with.
That's Meta testing *with* that product, not a bug forcing customers into it.

If this still comes up after you redeploy the changes below, the next step
is to get the *exact* wording/screenshot Commerce Manager shows at that
step — there are a few Meta-specific things worth checking then (whether the
Meta Pixel / Conversions API is installed, which your site doesn't currently
have, and which Meta's checkout verification sometimes expects).

## What changed

Your site had no real cart — "Buy Now" started a single-item Stripe
checkout for whatever `?id=` was in the URL, quantity always 1, and nothing
was saved anywhere. Since you wanted a real multi-item cart, here's what's
new:

- **`public/site.js`** — added cart storage (`localStorage`, key
  `cart_v1`) and helpers: `getCart`, `setCart`, `addToCart`,
  `updateCartQty`, `removeFromCart`, `clearCart`, `cartCount`,
  `renderCartBadge`. This is the one place cart state lives.
- **`public/index.html`** — each product card now has an "Add to Cart"
  button, and the header shows a live cart count linking to `/cart.html`.
- **`public/product.html`** — "Buy Now" replaced with a quantity field +
  "Add to Cart", plus a "View Cart" link.
- **`public/cart.html`** (new) — lists everything in the cart, lets you
  change quantities or remove items, shows a subtotal, and links to
  checkout.
- **`public/checkout.html`** — now checks out the *entire* cart instead of
  one product: shows every item in the order summary and sends all of them
  to the server together.
- **`api/create-checkout-session.js`** — now accepts a list of items
  (`{ items: [{ productId, quantity }, ...] }`) and builds one Stripe
  Checkout Session with a line item per product. It still accepts the old
  single-item shape too, so nothing else breaks if it's called that way.

Nothing in `api/_lib/catalog.js` or `scripts/build.js` needed to change —
your catalog/feed generation was already correct.

## Two small things to do by hand

1. **`scripts/build.js`** — add `cart.html` to the list of pages whose
   footer gets auto-updated, so it stays in sync with the others. Find this
   block near the bottom:

   ```js
   const footerTargets = [
     { file: "index.html", variant: "full" },
     { file: "product.html", variant: "full" },
     { file: "checkout.html", variant: "minimal" },
     { file: "success.html", variant: "minimal" },
   ];
   ```

   and add one line:

   ```js
   const footerTargets = [
     { file: "index.html", variant: "full" },
     { file: "product.html", variant: "full" },
     { file: "cart.html", variant: "full" },
     { file: "checkout.html", variant: "minimal" },
     { file: "success.html", variant: "minimal" },
   ];
   ```

2. **`public/success.html`** — I haven't seen this file, so I didn't touch
   it, but add one line so the cart empties out after a completed purchase
   (otherwise the same items will still show in the cart the next time
   someone visits). Right after the script there confirms the order went
   through (wherever it calls `/api/session-status` and sees a successful
   status), add:

   ```js
   clearCart();
   ```

   `clearCart()` comes from `site.js`, which `success.html` should already
   be loading.

## Deploying and testing

```bash
node scripts/build.js
git add -A
git commit -m "Add multi-item cart"
git push        # Vercel redeploys automatically, or run: vercel --prod
```

Then test the whole flow on the live site: add two or three different
products to the cart from the product grid and from individual product
pages, open `/cart.html` and confirm quantities/remove work and the
subtotal is right, click Checkout, and pay with Stripe's test card
`4242 4242 4242 4242` (any future expiry/CVC/ZIP). Confirm the cart is
empty again after you land on the success page.

Once that's solid, go back into Commerce Manager and re-run the checkout
test for Instagram Shopping. If it still reports a problem, send me the
exact message/screenshot this time and we'll dig into that specifically.
