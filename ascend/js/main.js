/* ============================================
   ASCEND — Main JavaScript
   Products • Cart • Wishlist • Animations
   ============================================ */

// ============================================
// Product Data (shared across pages)
// ============================================
const PRODUCTS = [
  {
    id: 'asc-hoodie-forge',
    name: 'ASCEND Heavyweight Hoodie "Forge"',
    category: 'Hoodies',
    price: 89,
    badge: 'New Drop',
    description: 'Heavyweight 480 GSM cotton hoodie with dropped shoulders, ribbed cuffs and a refined oversized fit. The "Forge" graphic on the back represents transformation through pressure.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=900&q=80&auto=format&fit=crop'
    ],
    color: 'Onyx Black'
  },
  {
    id: 'asc-tee-pressure',
    name: 'ASCEND Box Tee "Pressure"',
    category: 'T-Shirts',
    price: 45,
    badge: 'Bestseller',
    description: 'Premium 280 GSM heavyweight cotton tee. Boxy oversized cut with drop shoulders, double-stitched hems, and signature "PRESSURE" screen print across the chest.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=900&q=80&auto=format&fit=crop'
    ],
    color: 'Jet Black'
  },
  {
    id: 'asc-cargo-foundation',
    name: 'ASCEND Cargo Pants "Foundation"',
    category: 'Bottoms',
    price: 110,
    badge: 'Limited',
    description: 'Heavyweight nylon cargo with utility pockets, reinforced knees, and an adjustable waist. Built for movement, designed for the street.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=900&q=80&auto=format&fit=crop'
    ],
    color: 'Shadow Black'
  },
  {
    id: 'asc-sweat-rise',
    name: 'ASCEND Sweatpants "Rise"',
    category: 'Bottoms',
    price: 75,
    badge: null,
    description: 'Premium 400 GSM fleece sweatpants with tapered leg, ribbed cuffs, and discreet side pockets. The "Rise" wordmark stitched at the thigh.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622445275576-721325763afe?w=900&q=80&auto=format&fit=crop'
    ],
    color: 'Onyx Black'
  },
  {
    id: 'asc-tee-forged',
    name: 'ASCEND Long Sleeve "Forged"',
    category: 'T-Shirts',
    price: 55,
    badge: 'New',
    description: 'Heavyweight long sleeve with extended cuffs and dropped shoulders. The "FORGED IN PRESSURE" text print across the chest in raised rubber ink.',
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=900&q=80&auto=format&fit=crop'
    ],
    color: 'Jet Black'
  },
  {
    id: 'asc-cap-peak',
    name: 'ASCEND Cap "Peak"',
    category: 'Accessories',
    price: 35,
    badge: null,
    description: 'Unstructured 6-panel cap in washed cotton twill. Embroidered ASCEND wordmark at front, adjustable strap at back. One size fits most.',
    sizes: ['One Size'],
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=900&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620963060285-7b6b2c4a8c4c?w=900&q=80&auto=format&fit=crop'
    ],
    color: 'Washed Black'
  }
];

// ============================================
// State Management
// ============================================
const State = {
  cart: JSON.parse(localStorage.getItem('asc_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('asc_wishlist') || '[]')
};

const save = () => {
  localStorage.setItem('asc_cart', JSON.stringify(State.cart));
  localStorage.setItem('asc_wishlist', JSON.stringify(State.wishlist));
  updateCartCount();
};

const updateCartCount = () => {
  const count = State.cart.reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll('[data-cart-count]').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
};

// ============================================
// Cart
// ============================================
const addToCart = (productId, size = 'M', qty = 1) => {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = State.cart.find(i => i.id === productId && i.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    State.cart.push({ id: productId, size, qty });
  }
  save();
  showToast('Added to bag', product.name);
};

const removeFromCart = (productId, size) => {
  State.cart = State.cart.filter(i => !(i.id === productId && i.size === size));
  save();
};

const updateQty = (productId, size, delta) => {
  const item = State.cart.find(i => i.id === productId && i.size === size);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  save();
};

// ============================================
// Wishlist
// ============================================
const toggleWishlist = (productId) => {
  const idx = State.wishlist.indexOf(productId);
  if (idx > -1) {
    State.wishlist.splice(idx, 1);
    showToast('Removed', 'From your wishlist');
  } else {
    State.wishlist.push(productId);
    const p = PRODUCTS.find(x => x.id === productId);
    showToast('Saved', p ? p.name : 'To wishlist');
  }
  save();
  document.querySelectorAll(`[data-wishlist="${productId}"]`).forEach(el => {
    el.classList.toggle('active', State.wishlist.includes(productId));
  });
};

const isWishlisted = (id) => State.wishlist.includes(id);

// ============================================
// Toast
// ============================================
let toastTimer;
const showToast = (title, subtitle = '') => {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg></div>
    <div class="text"><strong>${title}</strong><small>${subtitle}</small></div>
  `;
  requestAnimationFrame(() => toast.classList.add('show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
};

// ============================================
// Product Card Renderer
// ============================================
const renderProductCard = (product) => {
  const wished = isWishlisted(product.id);
  const sizes = product.sizes.map(s => `<span class="size-pill">${s}</span>`).join('');
  return `
    <article class="product-card reveal" data-product-id="${product.id}">
      <a href="product.html?id=${product.id}" class="product-card-img">
        ${product.badge ? `<span class="product-card-badge">${product.badge}</span>` : ''}
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
      </a>
      <button class="product-card-wish ${wished ? 'active' : ''}" data-wishlist="${product.id}" aria-label="Add to wishlist">
        <svg viewBox="0 0 24 24" fill="${wished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
      <div class="product-card-info">
        <span class="product-card-cat">${product.category}</span>
        <a href="product.html?id=${product.id}"><h3 class="product-card-name">${product.name}</h3></a>
        <div class="product-card-price"><span class="currency">MAD </span>${product.price}</div>
        <div class="product-card-sizes">${sizes}</div>
        <button class="product-card-action" data-add-to-cart="${product.id}">
          Add to Bag
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
      </div>
    </article>
  `;
};

const renderProductGrid = (selector, products) => {
  const el = document.querySelector(selector);
  if (!el) return;
  el.innerHTML = products.map(renderProductCard).join('');
};

// ============================================
// Event Delegation
// ============================================
document.addEventListener('click', (e) => {
  // Add to cart
  const addBtn = e.target.closest('[data-add-to-cart]');
  if (addBtn) {
    e.preventDefault();
    const id = addBtn.dataset.addToCart;
    const product = PRODUCTS.find(p => p.id === id);
    addToCart(id, product?.sizes[1] || product?.sizes[0] || 'M');
    addBtn.classList.add('added');
    addBtn.innerHTML = `
      Added
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
    `;
    setTimeout(() => {
      addBtn.classList.remove('added');
      addBtn.innerHTML = `
        Add to Bag
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      `;
    }, 1600);
  }

  // Wishlist
  const wishBtn = e.target.closest('[data-wishlist]');
  if (wishBtn) {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(wishBtn.dataset.wishlist);
  }

  // FAQ
  const faqQ = e.target.closest('.faq-q');
  if (faqQ) {
    const item = faqQ.closest('.faq-item');
    item.classList.toggle('active');
  }

  // Size tab
  const sizeTab = e.target.closest('.size-tab');
  if (sizeTab) {
    document.querySelectorAll('.size-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.size-table-wrap').forEach(t => t.classList.remove('active'));
    sizeTab.classList.add('active');
    const target = document.getElementById(sizeTab.dataset.target);
    if (target) target.classList.add('active');
  }

  // Mobile menu
  const mobileToggle = e.target.closest('.mobile-toggle');
  if (mobileToggle) {
    mobileToggle.classList.toggle('active');
    document.querySelector('.mobile-menu')?.classList.toggle('active');
    document.body.style.overflow = mobileToggle.classList.contains('active') ? 'hidden' : '';
  }

  // PDP size
  const pdpSize = e.target.closest('.pdp-size');
  if (pdpSize && !pdpSize.classList.contains('disabled')) {
    document.querySelectorAll('.pdp-size').forEach(s => s.classList.remove('selected'));
    pdpSize.classList.add('selected');
  }

  // Cart qty
  const qtyBtn = e.target.closest('[data-qty]');
  if (qtyBtn) {
    const { id, size, delta } = qtyBtn.dataset;
    updateQty(id, size, parseInt(delta));
    if (window.location.pathname.includes('cart.html')) location.reload();
  }

  // Remove from cart
  const removeBtn = e.target.closest('[data-remove]');
  if (removeBtn) {
    const { id, size } = removeBtn.dataset;
    removeFromCart(id, size);
    if (window.location.pathname.includes('cart.html')) location.reload();
  }
});

// ============================================
// Nav scroll
// ============================================
let lastScroll = 0;
const handleScroll = () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const scrollY = window.scrollY;
  if (scrollY > 50) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
  lastScroll = scrollY;
};
window.addEventListener('scroll', handleScroll, { passive: true });

// ============================================
// Reveal animations (IntersectionObserver)
// ============================================
const initReveal = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
};

// ============================================
// Page loader
// ============================================
const initPageLoader = () => {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('done');
    initReveal();
  }, 1500);
};

// ============================================
// Init
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  initPageLoader();
  if (!document.querySelector('.page-loader')) initReveal();
});
