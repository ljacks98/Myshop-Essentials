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
// Cart (persisted in localStorage so it survives reloads / navigating
// between pages, and so checkout reflects exactly what was added).
// Shape: [{ id: "127070", qty: 2 }, ...]
// ---------------------------------------------------------------------
const CART_KEY = "cart_v1";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // localStorage unavailable (private browsing, disabled storage, etc.)
    return [];
  }
}

function setCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {
    // Cart just won't persist across reloads if storage isn't available.
  }
  renderCartBadge();
}

function cartCount(cart = getCart()) {
  return cart.reduce((sum, item) => sum + (item.qty || 0), 0);
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  setCart(cart);
}

function updateCartQty(id, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter((item) => item.id !== id);
  } else {
    const existing = cart.find((item) => item.id === id);
    if (existing) existing.qty = qty;
  }
  setCart(cart);
}

function removeFromCart(id) {
  updateCartQty(id, 0);
}

function clearCart() {
  setCart([]);
}

function renderCartBadge() {
  const count = cartCount();
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = String(count);
  });
  document.querySelectorAll("[data-cart-link]").forEach((el) => {
    el.style.display = ""; // cart link always visible, count just shows 0
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyBranding();
  renderCartBadge();
});
