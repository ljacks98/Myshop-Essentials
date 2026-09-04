// Shared helpers used across pages.

function applyBranding() {
  const cfg = window.SHOP_CONFIG || {};
  document.title = cfg.SHOP_NAME ? `${cfg.SHOP_NAME}` : document.title;
  document.querySelectorAll("[data-shop-name]").forEach((el) => {
    el.textContent = cfg.SHOP_NAME || "Shop";
  });
  document.querySelectorAll("[data-shop-tagline]").forEach((el) => {
    el.textContent = cfg.TAGLINE || "";
  });
  // Note: the Instagram handle, contact email, and Amway storefront link are
  // baked directly into each page's footer at build time (scripts/build.js)
  // rather than filled in here — that way they always render even if this
  // script fails to load, instead of depending on client-side JS.
}

async function fetchProducts() {
  const res = await fetch("/data/products.json");
  if (!res.ok) throw new Error("Could not load products");
  return res.json();
}

function formatPrice(product) {
  if (product.price == null) return "Price on request";
  return `$${product.price.toFixed(2)} ${product.currency || "USD"}`;
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// ---------------------------------------------------------------------
// Shopping cart — stored in this browser's localStorage as
// [{ id, quantity }, ...]. Per-visitor, per-browser only (that's normal
// for a client-side cart on a static site); nothing is sent anywhere
// until checkout.
// ---------------------------------------------------------------------
const CART_KEY = "cart";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const cart = raw ? JSON.parse(raw) : [];
    return Array.isArray(cart) ? cart : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (e) {
    // localStorage unavailable (private browsing, etc.) — cart just won't persist.
  }
  updateCartBadge();
}

function addToCart(id, quantity) {
  quantity = Number.isInteger(quantity) && quantity > 0 ? quantity : 1;
  const cart = getCart();
  const existing = cart.find((line) => line.id === id);
  if (existing) existing.quantity += quantity;
  else cart.push({ id, quantity });
  saveCart(cart);
  return cart;
}

function setCartQuantity(id, quantity) {
  let cart = getCart();
  if (quantity <= 0) {
    cart = cart.filter((line) => line.id !== id);
  } else {
    const existing = cart.find((line) => line.id === id);
    if (existing) existing.quantity = quantity;
    else cart.push({ id, quantity });
  }
  saveCart(cart);
  return cart;
}

function removeFromCart(id) {
  return setCartQuantity(id, 0);
}

function clearCart() {
  saveCart([]);
}

function cartItemCount() {
  return getCart().reduce((sum, line) => sum + line.quantity, 0);
}

function updateCartBadge() {
  const count = cartItemCount();
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = count > 0 ? String(count) : "";
    el.hidden = count === 0;
  });
  document.querySelectorAll("[data-cart-link]").forEach((el) => {
    el.textContent = count > 0 ? `Cart (${count})` : "Cart";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyBranding();
  updateCartBadge();
});
