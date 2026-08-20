/**
 * Main Application Entry Point
 * OtakuThreadz - Anime Streetwear E-commerce
 */

const ProductUtils = typeof window !== 'undefined' ? window.ProductUtils : {};
const PRODUCTS = typeof window !== 'undefined' ? window.PRODUCTS : [];
const COLLECTIONS = typeof window !== 'undefined' ? window.COLLECTIONS : [];
const CartState = typeof window !== 'undefined' ? window.CartState : {};

// ========================================
// STATE & CONFIG
// ========================================

const STATE = {
  products: ProductUtils.getAll ? ProductUtils.getAll() : [],
  filteredProducts: ProductUtils.getAll ? [...ProductUtils.getAll()] : [],
  displayedCount: 12,
  currentFilter: 'all',
  searchQuery: '',
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isWishlistOpen: false,
  isCartOpen: false,
  quickViewProduct: null
};

const CONFIG = {
  productsPerLoad: 12,
  animationDuration: 300,
  toastDuration: 4000
};

// ========================================
// DOM ELEMENTS CACHE
// ========================================

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const DOM = {
  // Header
  header: $('#header'),
  mobileMenuBtn: $('.mobile-menu-btn'),
  mobileMenu: $('#mobile-menu'),
  searchBtn: $('.search-btn'),
  searchModal: $('#search-modal'),
  searchInput: $('#search-input'),
  searchResults: $('#search-results'),
  wishlistBtn: $('.wishlist-btn'),
  wishlistModal: $('#wishlist-modal'),
  wishlistCount: $('.wishlist-count'),
  cartBtn: $('.cart-btn'),
  cartSidebar: $('#cart-sidebar'),
  cartCount: $('.cart-count'),
  cartItems: $('.cart-items'),
  cartSubtotal: $('.cart-subtotal'),
  cartTotal: $('.cart-total'),
  checkoutBtn: $('.checkout-btn'),

  // Hero
  heroShowcase: $('#hero-showcase'),
  statValues: $$('.stat-value'),

  // Collections
  collectionsGrid: $('#collections-grid'),

  // Products
  productsGrid: $('#products-grid'),
  filterBtns: $$('.filter-btn'),
  loadMoreBtn: $('#load-more-btn'),

  // Newsletter
  newsletterForm: $('#newsletter-form'),

  // Quick View Modal
  quickViewModal: $('#quick-view-modal'),
  quickViewBody: $('#quick-view-body'),

  // Toast
  toastContainer: $('#toast-container'),

  // Modals close buttons
  modalCloses: $$('.modal-close'),
  modalBackdrops: $$('.modal-backdrop'),
  cartClose: $('.cart-close'),
  cartBackdrop: $('.cart-backdrop')
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

const formatPrice = (price) => `$${price.toFixed(2)}`;

const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const animateCounter = (element, target, duration = 2000) => {
  const start = 0;
  const startTime = performance.now();

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * eased);
    element.textContent = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
};

const showToast = (message, type = 'success') => {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>' : ''}
      ${type === 'error' ? '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>' : ''}
      ${type === 'info' ? '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>' : ''}
    </svg>
    <span class="toast-message">${message}</span>
    <button class="toast-close" aria-label="Dismiss">&times;</button>
  `;

  DOM.toastContainer.appendChild(toast);

  toast.querySelector('.toast-close').addEventListener('click', () => removeToast(toast));
  setTimeout(() => removeToast(toast), CONFIG.toastDuration);

  return toast;
};

const removeToast = (toast) => {
  toast.classList.add('removing');
  toast.addEventListener('animationend', () => toast.remove());
};

const trapFocus = (element) => {
  const focusable = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  const handleTab = (e) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  };

  element.addEventListener('keydown', handleTab);
  first?.focus();

  return () => element.removeEventListener('keydown', handleTab);
};

// ========================================
// RENDER FUNCTIONS
// ========================================

const renderHeroShowcase = () => {
  const featuredProducts = PRODUCTS.filter(p => p.tags.includes('bestseller') || p.tags.includes('limited')).slice(0, 3);
  let currentIndex = 0;

  const createShowcaseProduct = (product) => {
    const div = document.createElement('div');
    div.className = 'showcase-product';
    div.innerHTML = `<img src="${product.images.main}" alt="${product.title}" loading="lazy">`;
    return div;
  };

  const render = () => {
    DOM.heroShowcase.innerHTML = '';
    const product = featuredProducts[currentIndex];
    const showcaseEl = createShowcaseProduct(product);
    DOM.heroShowcase.appendChild(showcaseEl);

    const glow = document.createElement('div');
    glow.className = 'showcase-glow';
    DOM.heroShowcase.appendChild(glow);
  };

  const next = () => {
    currentIndex = (currentIndex + 1) % featuredProducts.length;
    render();
  };

  render();
  setInterval(next, 5000);
};

const animateHeroStats = () => {
  DOM.statValues.forEach(stat => {
    const target = parseInt(stat.dataset.count, 10);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(stat, target);
          observer.unobserve(stat);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(stat);
  });
};

const renderCollections = () => {
  DOM.collectionsGrid.innerHTML = COLLECTIONS.map(collection => `
    <article class="collection-card" data-series="${collection.series || ''}" data-category="${collection.category || ''}" role="listitem">
      <img src="${collection.image}" alt="${collection.title} collection" loading="lazy">
      <div class="collection-content">
        <span class="collection-tag">${collection.category ? (collection.category === 'tee' ? 'Anime Tees' : 'Accessories') : collection.series}</span>
        <h3 class="collection-title">${collection.title}</h3>
        <p class="collection-count">${collection.subtitle}</p>
      </div>
    </article>
  `).join('');

  // Add click handlers
  $$('.collection-card', DOM.collectionsGrid).forEach(card => {
    card.addEventListener('click', () => {
      const series = card.dataset.series;
      const category = card.dataset.category;
      if (category) {
        updateActiveFilter(category === 'tee' ? 'cat-tee' : 'cat-accessory');
        filterProducts({});
      } else if (series) {
        STATE.currentFilter = 'all';
        updateActiveFilter('all');
        filterProducts({ series });
      }
      document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
      showToast(`Showing collection`, 'info');
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
};

const createProductCard = (product, index) => {
  const badges = product.tags.map(tag => {
    const labels = { new: 'New', bestseller: 'Bestseller', limited: 'Limited', soldout: 'Sold Out' };
    return `<span class="badge-tag ${tag}">${labels[tag] || tag}</span>`;
  }).join('');

  const sizesHtml = product.sizes.map(size => `
    <button class="size-btn${product.sizes.indexOf(size) === 0 ? ' active' : ''}" data-size="${size}" ${!product.sizes.includes(size) ? 'disabled' : ''}>${size}</button>
  `).join('');

  const colorsHtml = product.colors.map((color, i) => `
    <button class="color-btn${i === 0 ? ' active' : ''}" data-color="${color}" style="--color-swatch: ${getColorSwatch(color)}">${color}</button>
  `).join('');

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return `
    <article class="product-card" data-id="${product.id}" style="animation-delay: ${index * 50}ms" role="listitem">
      <div class="product-badge">${badges}</div>
      <div class="product-actions">
        <button class="action-btn quick-view-btn" aria-label="Quick view ${product.title}" data-id="${product.id}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
        <button class="action-btn wishlist-btn-card${CartState.isInWishlist(product.id) ? ' active' : ''}" aria-label="${CartState.isInWishlist(product.id) ? 'Remove from' : 'Add to'} wishlist" data-id="${product.id}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${CartState.isInWishlist(product.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div class="product-media">
        <img src="${product.images.main}" alt="${product.title}" loading="lazy" width="400" height="500">
      </div>
      <div class="product-info">
        <span class="product-series">${product.series}</span>
        <h3 class="product-title">${product.title}</h3>
        <div class="product-price">
          <span class="price-current">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
          ${discount ? `<span class="price-discount">-${discount}%</span>` : ''}
        </div>
        <div class="product-options">
          <div class="size-options" role="group" aria-label="Select size">${sizesHtml}</div>
          <div class="color-options" role="group" aria-label="Select color">${colorsHtml}</div>
        </div>
        <button class="add-to-cart-btn" data-id="${product.id}" aria-label="Add ${product.title} to cart">
          Add to Cart
        </button>
      </div>
    </article>
  `;
};

const getColorSwatch = (color) => {
  const swatches = {
    'Black': '#000000', 'White': '#ffffff', 'Navy': '#1a1a2e', 'Charcoal': '#333333',
    'Grey': '#808080', 'Green': '#2d5a27', 'Olive': '#6b8e23', 'Deep Red': '#8b0000',
    'Orange': '#ff6600', 'Pink': '#ff69b4', 'Cream': '#f5f5dc', 'Sand': '#c2b280',
    'Light Blue': '#87ceeb', 'Lavender': '#e6e6fa', 'Purple': '#800080'
  };
  return swatches[color] || '#cccccc';
};

const renderProducts = (products = STATE.filteredProducts, append = false) => {
  const productsToRender = append ? products.slice(STATE.displayedCount - CONFIG.productsPerLoad) : products.slice(0, STATE.displayedCount);

  const html = productsToRender.map((product, index) => createProductCard(product, index)).join('');

  if (append) {
    DOM.productsGrid.insertAdjacentHTML('beforeend', html);
  } else {
    DOM.productsGrid.innerHTML = html;
  }

  // Update load more button visibility
  DOM.loadMoreBtn.style.display = STATE.displayedCount >= products.length ? 'none' : 'flex';

  // Attach event listeners to new cards
  attachProductCardListeners();
};

const attachProductCardListeners = () => {
  // Quick view buttons
  $$('.quick-view-btn', DOM.productsGrid).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openQuickView(btn.dataset.id);
    });
  });

  // Wishlist buttons on cards
  $$('.wishlist-btn-card', DOM.productsGrid).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWishlist(btn.dataset.id, btn);
    });
  });

  // Size buttons
  $$('.size-btn', DOM.productsGrid).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      $$('.size-btn', card).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Color buttons
  $$('.color-btn', DOM.productsGrid).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      $$('.color-btn', card).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Add to cart buttons
  $$('.add-to-cart-btn', DOM.productsGrid).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCartFromCard(btn.closest('.product-card'));
    });
  });

  // Product card click (for quick view on mobile)
  $$('.product-card', DOM.productsGrid).forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.product-actions, .size-btn, .color-btn, .add-to-cart-btn')) {
        openQuickView(card.dataset.id);
      }
    });
  });
};

const filterProducts = (filters = {}) => {
  let products = ProductUtils.getAll();

  if (filters.series) {
    products = products.filter(p => p.series === filters.series);
  }

  if (STATE.currentFilter === 'cat-tee') {
    products = products.filter(p => p.category === 'tee');
  } else if (STATE.currentFilter === 'cat-accessory') {
    products = products.filter(p => p.category === 'accessory');
  } else if (STATE.currentFilter !== 'all') {
    products = products.filter(p => p.tags.includes(STATE.currentFilter));
  }

  if (STATE.searchQuery) {
    products = products.filter(p =>
      p.title.toLowerCase().includes(STATE.searchQuery.toLowerCase()) ||
      p.series.toLowerCase().includes(STATE.searchQuery.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(STATE.searchQuery.toLowerCase()))
    );
  }

  STATE.filteredProducts = products;
  STATE.displayedCount = CONFIG.productsPerLoad;
  renderProducts(products);
};

const updateActiveFilter = (filter) => {
  STATE.currentFilter = filter;
  DOM.filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
    btn.setAttribute('aria-selected', btn.dataset.filter === filter);
  });
};

const loadMoreProducts = () => {
  STATE.displayedCount += CONFIG.productsPerLoad;
  renderProducts(STATE.filteredProducts, true);
};

// ========================================
// CART UI
// ========================================

const renderCart = () => {
  const { items, subtotal, itemCount } = CartState.getSummary();

  DOM.cartCount.textContent = itemCount;
  DOM.cartCount.style.display = itemCount > 0 ? 'flex' : 'none';

  if (items.length === 0) {
    DOM.cartItems.innerHTML = `
      <div class="cart-empty" style="text-align: center; padding: var(--space-12); color: var(--color-fg-muted);">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto var(--space-4); opacity: 0.3;" aria-hidden="true">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <p>Your cart is empty</p>
        <a href="#shop" class="btn btn-primary" style="margin-top: var(--space-4);">Start Shopping</a>
      </div>
    `;
    DOM.checkoutBtn.disabled = true;
  } else {
    DOM.cartItems.innerHTML = items.map(item => `
      <div class="cart-item" data-id="${item.id}" data-size="${item.size}" data-color="${item.color}" role="listitem">
        <img class="cart-item-img" src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="cart-item-info">
          <span class="cart-item-title">${item.title}</span>
          <span class="cart-item-series">${item.series}</span>
          <span class="cart-item-price">${formatPrice(item.price)}</span>
        </div>
        <div class="cart-item-controls">
          <div class="cart-item-qty">
            <button class="qty-btn" aria-label="Decrease quantity" data-action="decrease">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn" aria-label="Increase quantity" data-action="increase">+</button>
          </div>
          <button class="cart-item-remove" aria-label="Remove ${item.title}">Remove</button>
        </div>
      </div>
    `).join('');

    DOM.checkoutBtn.disabled = false;
  }

  DOM.cartSubtotal.textContent = formatPrice(subtotal);
  DOM.cartTotal.textContent = formatPrice(subtotal);

  // Attach cart item listeners
  $$('.qty-btn', DOM.cartItems).forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.cart-item');
      const action = btn.dataset.action;
      const qtyEl = item.querySelector('.qty-value');
      let qty = parseInt(qtyEl.textContent, 10);
      qty = action === 'increase' ? qty + 1 : qty - 1;
      CartState.updateQuantity(item.dataset.id, item.dataset.size, item.dataset.color, qty);
    });
  });

  $$('.cart-item-remove', DOM.cartItems).forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.cart-item');
      CartState.remove(item.dataset.id, item.dataset.size, item.dataset.color);
    });
  });
};

const addToCartFromCard = (card) => {
  const productId = card.dataset.id;
  const sizeBtn = card.querySelector('.size-btn.active');
  const colorBtn = card.querySelector('.color-btn.active');
  const addBtn = card.querySelector('.add-to-cart-btn');

  const size = sizeBtn?.dataset.size || 'M';
  const color = colorBtn?.dataset.color || 'Black';

  const result = CartState.add(productId, 1, size, color);

  if (result.success) {
    addBtn.textContent = 'Added!';
    addBtn.classList.add('added');
    setTimeout(() => {
      addBtn.textContent = 'Add to Cart';
      addBtn.classList.remove('added');
    }, 2000);
    showToast('Added to cart', 'success');
    openCart();
  } else {
    showToast(result.error, 'error');
  }
};

const openCart = () => {
  DOM.cartSidebar.classList.add('open');
  DOM.cartSidebar.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  trapFocus(DOM.cartSidebar.querySelector('.cart-panel'));
  renderCart();
};

const closeCart = () => {
  DOM.cartSidebar.classList.remove('open');
  DOM.cartSidebar.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

const updateCartUI = () => {
  const { itemCount } = CartState.getSummary();
  DOM.cartCount.textContent = itemCount;
  DOM.cartCount.style.display = itemCount > 0 ? 'flex' : 'none';
  if (DOM.cartSidebar.classList.contains('open')) renderCart();
};

// ========================================
// WISHLIST UI
// ========================================

const toggleWishlist = (productId, btn = null) => {
  const result = CartState.toggleWishlist(productId);

  // Update all wishlist buttons for this product
  $$(`[data-id="${productId}"].wishlist-btn-card`).forEach(b => {
    b.classList.toggle('active', result.added);
    b.setAttribute('aria-label', result.added ? 'Remove from wishlist' : 'Add to wishlist');
    b.querySelector('svg').setAttribute('fill', result.added ? 'currentColor' : 'none');
  });

  // Update header wishlist count
  DOM.wishlistCount.textContent = result.count;
  DOM.wishlistCount.style.display = result.count > 0 ? 'flex' : 'none';

  showToast(result.added ? 'Added to wishlist' : 'Removed from wishlist', result.added ? 'success' : 'info');

  if (DOM.wishlistModal.classList.contains('hidden') === false) {
    renderWishlistModal();
  }
};

const renderWishlistModal = () => {
  const products = CartState.getWishlistProducts();
  const content = DOM.wishlistModal.querySelector('.wishlist-content');

  if (products.length === 0) {
    content.innerHTML = '<p class="wishlist-empty">Your wishlist is empty. Start adding favorites!</p>';
    return;
  }

  content.innerHTML = products.map(product => `
    <div class="wishlist-item" style="display: flex; gap: var(--space-3); padding: var(--space-3); background: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius-lg);">
      <img src="${product.images.main}" alt="" style="width: 60px; height: 75px; object-fit: cover; border-radius: var(--radius-md);">
      <div style="flex: 1; min-width: 0;">
        <h4 style="font-size: var(--text-sm); font-weight: var(--font-semibold);">${product.title}</h4>
        <p style="font-size: var(--text-xs); color: var(--color-primary);">${product.series}</p>
        <p style="font-weight: var(--font-bold);">${formatPrice(product.price)}</p>
      </div>
      <button class="icon-btn" aria-label="Remove from wishlist" data-id="${product.id}" style="width: 36px; height: 36px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  `).join('');

  $$('.wishlist-item .icon-btn', content).forEach(btn => {
    btn.addEventListener('click', () => toggleWishlist(btn.dataset.id));
  });
};

// ========================================
// QUICK VIEW MODAL
// ========================================

const openQuickView = (productId) => {
  const product = ProductUtils.getById(productId);
  if (!product) return;

  STATE.quickViewProduct = product;

  const sizesHtml = product.sizes.map((size, i) => `
    <button class="size-btn${i === 0 ? ' active' : ''}" data-size="${size}" ${!product.sizes.includes(size) ? 'disabled' : ''}>${size}</button>
  `).join('');

  const colorsHtml = product.colors.map((color, i) => `
    <button class="color-btn${i === 0 ? ' active' : ''}" data-color="${color}" style="--color-swatch: ${getColorSwatch(color)}">${color}</button>
  `).join('');

  DOM.quickViewBody.innerHTML = `
    <div class="quick-view-media">
      <img src="${product.images.main}" alt="${product.title}" loading="lazy">
    </div>
    <div class="quick-view-info">
      <span class="quick-view-series">${product.series}</span>
      <h2 class="quick-view-title">${product.title}</h2>
      <div class="quick-view-price">
        <span class="price-current">${formatPrice(product.price)}</span>
        ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
      </div>
      <p class="quick-view-description">${product.description}</p>
      <div class="quick-view-options">
        <div class="option-group">
          <span class="option-label">Size</span>
          <div class="option-values" role="group" aria-label="Select size">${sizesHtml}</div>
        </div>
        <div class="option-group">
          <span class="option-label">Color</span>
          <div class="option-values" role="group" aria-label="Select color">${colorsHtml}</div>
        </div>
      </div>
      <div class="quick-view-actions">
        <button class="btn btn-primary btn-lg" data-action="add-to-cart">Add to Cart</button>
        <button class="btn btn-outline btn-lg" data-action="wishlist">${CartState.isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</button>
      </div>
    </div>
  `;

  // Attach listeners
  $$('.size-btn', DOM.quickViewBody).forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.size-btn', DOM.quickViewBody).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  $$('.color-btn', DOM.quickViewBody).forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.color-btn', DOM.quickViewBody).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  DOM.quickViewBody.querySelector('[data-action="add-to-cart"]').addEventListener('click', () => {
    const size = DOM.quickViewBody.querySelector('.size-btn.active')?.dataset.size || 'M';
    const color = DOM.quickViewBody.querySelector('.color-btn.active')?.dataset.color || 'Black';
    const result = CartState.add(product.id, 1, size, color);
    if (result.success) {
      showToast('Added to cart', 'success');
      closeQuickView();
      openCart();
    } else {
      showToast(result.error, 'error');
    }
  });

  DOM.quickViewBody.querySelector('[data-action="wishlist"]').addEventListener('click', () => {
    toggleWishlist(product.id);
    closeQuickView();
  });

  DOM.quickViewModal.hidden = false;
  document.body.style.overflow = 'hidden';
  const cleanup = trapFocus(DOM.quickViewModal.querySelector('.modal-content'));
  DOM.quickViewModal._cleanup = cleanup;
};

const closeQuickView = () => {
  DOM.quickViewModal.hidden = true;
  document.body.style.overflow = '';
  DOM.quickViewModal._cleanup?.();
  STATE.quickViewProduct = null;
};

// ========================================
// SEARCH MODAL
// ========================================

const openSearch = () => {
  DOM.searchModal.hidden = false;
  DOM.searchInput.focus();
  STATE.isSearchOpen = true;
  document.body.style.overflow = 'hidden';
  trapFocus(DOM.searchModal.querySelector('.modal-content'));
};

const closeSearch = () => {
  DOM.searchModal.hidden = true;
  DOM.searchInput.value = '';
  DOM.searchResults.hidden = true;
  STATE.isSearchOpen = false;
  document.body.style.overflow = '';
};

const handleSearch = debounce((query) => {
  STATE.searchQuery = query.toLowerCase().trim();

  if (!STATE.searchQuery) {
    DOM.searchResults.hidden = true;
    return;
  }

  const results = ProductUtils.search(STATE.searchQuery).slice(0, 8);

  if (results.length === 0) {
    DOM.searchResults.innerHTML = '<li class="search-result-item" style="justify-content: center; padding: var(--space-6); color: var(--color-fg-muted);">No products found</li>';
  } else {
    DOM.searchResults.innerHTML = results.map(product => `
      <li class="search-result-item" role="option" data-id="${product.id}" tabindex="0">
        <img class="search-result-img" src="${product.images.main}" alt="" loading="lazy">
        <div class="search-result-info">
          <span class="search-result-title">${product.title}</span>
          <span class="search-result-series">${product.series}</span>
        </div>
        <span class="search-result-price">${formatPrice(product.price)}</span>
      </li>
    `).join('');

    $$('.search-result-item', DOM.searchResults).forEach(item => {
      item.addEventListener('click', () => {
        closeSearch();
        filterProducts({});
        document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
      });
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') item.click();
      });
    });
  }

  DOM.searchResults.hidden = false;
}, 150);

// ========================================
// MOBILE MENU
// ========================================

const toggleMobileMenu = () => {
  STATE.isMobileMenuOpen = !STATE.isMobileMenuOpen;
  DOM.mobileMenu.hidden = !STATE.isMobileMenuOpen;
  DOM.mobileMenu.classList.toggle('open', STATE.isMobileMenuOpen);
  DOM.mobileMenuBtn.setAttribute('aria-expanded', STATE.isMobileMenuOpen);
  DOM.mobileMenuBtn.setAttribute('aria-label', STATE.isMobileMenuOpen ? 'Close menu' : 'Open menu');
  document.body.style.overflow = STATE.isMobileMenuOpen ? 'hidden' : '';

  if (STATE.isMobileMenuOpen) {
    trapFocus(DOM.mobileMenu);
  }
};

// ========================================
// NEWSLETTER
// ========================================

const handleNewsletterSubmit = (e) => {
  e.preventDefault();
  const email = DOM.newsletterForm.querySelector('input[type="email"]').value;
  // In production, send to API
  showToast('Thanks for subscribing! Check your inbox soon.', 'success');
  DOM.newsletterForm.reset();
};

// ========================================
// SCROLL EFFECTS
// ========================================

const handleScroll = () => {
  const scrolled = window.scrollY > 20;
  DOM.header.classList.toggle('scrolled', scrolled);
};

const initScrollAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  $$('.product-card, .collection-card, .about-card, .trust-item').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });
};

// ========================================
// PARTICLES
// ========================================

const initParticles = () => {
  const container = DOM.heroShowcase.closest('.hero').querySelector('#hero-particles');
  if (!container) return;

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particle.style.animationDuration = `${8 + Math.random() * 4}s`;
    container.appendChild(particle);
  }
};

// ========================================
// EVENT LISTENERS SETUP
// ========================================

const setupEventListeners = () => {
  // Header scroll
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Mobile menu
  DOM.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  $$('.mobile-nav-link', DOM.mobileMenu).forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu());
  });

  // Search
  DOM.searchBtn.addEventListener('click', openSearch);
  DOM.searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
  DOM.searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSearch();
  });

  // Suggestion chips
  $$('.suggestion-chip', DOM.searchModal).forEach(chip => {
    chip.addEventListener('click', () => {
      DOM.searchInput.value = chip.dataset.search;
      handleSearch(chip.dataset.search);
    });
  });

  // Wishlist
  DOM.wishlistBtn.addEventListener('click', () => {
    DOM.wishlistModal.hidden = false;
    renderWishlistModal();
    document.body.style.overflow = 'hidden';
    trapFocus(DOM.wishlistModal.querySelector('.modal-content'));
  });

  // Cart
  DOM.cartBtn.addEventListener('click', openCart);
  DOM.cartClose.addEventListener('click', closeCart);
  DOM.cartBackdrop.addEventListener('click', closeCart);

  // Filter buttons
  DOM.filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      updateActiveFilter(btn.dataset.filter);
      filterProducts();
    });
  });

  // Load more
  DOM.loadMoreBtn.addEventListener('click', loadMoreProducts);

  // Newsletter
  DOM.newsletterForm.addEventListener('submit', handleNewsletterSubmit);

  // Modal closes
  DOM.modalCloses.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      modal.hidden = true;
      document.body.style.overflow = '';
      modal._cleanup?.();
    });
  });

  DOM.modalBackdrops.forEach(backdrop => {
    backdrop.addEventListener('click', () => {
      const modal = backdrop.closest('.modal');
      modal.hidden = true;
      document.body.style.overflow = '';
      modal._cleanup?.();
    });
  });

  // Quick view close
  DOM.quickViewModal.querySelector('.modal-close').addEventListener('click', closeQuickView);
  DOM.quickViewModal.querySelector('.modal-backdrop').addEventListener('click', closeQuickView);

  // Escape key for modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!DOM.cartSidebar.classList.contains('open')) {
        closeCart();
      }
      if (!DOM.searchModal.hidden) closeSearch();
      if (!DOM.wishlistModal.hidden) DOM.wishlistModal.hidden = true;
      if (!DOM.quickViewModal.hidden) closeQuickView();
      if (STATE.isMobileMenuOpen) toggleMobileMenu();
    }
  });

  // Cart state changes
  window.addEventListener('cart:change', updateCartUI);
  window.addEventListener('wishlist:change', (e) => {
    DOM.wishlistCount.textContent = e.detail.count;
    DOM.wishlistCount.style.display = e.detail.count > 0 ? 'flex' : 'none';
  });

  // Product card delegation (for dynamically added cards)
  DOM.productsGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (!card) return;

    if (e.target.closest('.quick-view-btn')) {
      e.stopPropagation();
      openQuickView(card.dataset.id);
    } else if (e.target.closest('.wishlist-btn-card')) {
      e.stopPropagation();
      toggleWishlist(card.dataset.id, e.target.closest('.wishlist-btn-card'));
    } else if (e.target.closest('.add-to-cart-btn')) {
      e.stopPropagation();
      addToCartFromCard(card);
    } else if (!e.target.closest('.product-actions, .size-btn, .color-btn')) {
      openQuickView(card.dataset.id);
    }
  });
};

// ========================================
// INITIALIZATION
// ========================================

const init = () => {
  // Render initial content
  renderHeroShowcase();
  animateHeroStats();
  renderCollections();
  renderProducts();
  updateCartUI();
  initParticles();
  initScrollAnimations();

  // Setup all event listeners
  setupEventListeners();

  // Handle hash navigation
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }

  console.log('🎌 OtakuThreadz initialized');
};

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export for potential external use
export { STATE, CartState, ProductUtils };