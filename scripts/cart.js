/* ============================================================
   TRYB3 — cart.js
   Shared cart logic. Include on every page.
   Cart state is stored in localStorage as "tryb3_cart".
   ============================================================ */

// ── HELPERS ──────────────────────────────────────────────────

function getCart() {
  return JSON.parse(localStorage.getItem('tryb3_cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('tryb3_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

// ── ADD TO CART ───────────────────────────────────────────────
// item = { id, name, price (number), img }
function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(c => c.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  saveCart(cart);
}

// ── REMOVE FROM CART ─────────────────────────────────────────
function removeFromCart(id) {
  let cart = getCart().filter(c => c.id !== id);
  saveCart(cart);
}

// ── UPDATE QUANTITY ──────────────────────────────────────────
function updateQty(id, delta) {
  const cart = getCart();
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);
}

// ── FORMAT CURRENCY ─────────────────────────────────────────
function formatNGN(amount) {
  return '₦' + Number(amount).toLocaleString('en-NG');
}

// ── CART TOTAL ───────────────────────────────────────────────
function cartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

// Run on every page load
document.addEventListener('DOMContentLoaded', updateCartCount);