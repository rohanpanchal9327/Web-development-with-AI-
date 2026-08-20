/**
 * Cart State Management
 * OtakuThreadz - Anime Streetwear E-commerce
 */

const ProductUtils = typeof window !== 'undefined' ? window.ProductUtils : {};

const CART_STORAGE_KEY = 'otakuthreadz_cart';
const WISHLIST_STORAGE_KEY = 'otakuthreadz_wishlist';

const CartState = {
  items: [],
  wishlist: [],

  init() {
    this.loadFromStorage();
    this.persist();
    return this;
  },

  loadFromStorage() {
    try {
      const cartData = localStorage.getItem(CART_STORAGE_KEY);
      const wishlistData = localStorage.getItem(WISHLIST_STORAGE_KEY);

      this.items = cartData ? JSON.parse(cartData) : [];
      this.wishlist = wishlistData ? JSON.parse(wishlistData) : [];

      // Validate cart items still exist in product catalog
      const utils = window.ProductUtils || ProductUtils;
      if (utils && utils.getById) {
        this.items = this.items.filter(item => utils.getById(item.id));
      }
    } catch (e) {
      console.warn('Failed to load cart from storage:', e);
      this.items = [];
      this.wishlist = [];
    }
  },

  persist() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(this.wishlist));
    } catch (e) {
      console.warn('Failed to persist cart:', e);
    }
    this.notifyChange();
  },

  notifyChange() {
    window.dispatchEvent(new CustomEvent('cart:change', { detail: this.getSummary() }));
    window.dispatchEvent(new CustomEvent('wishlist:change', { detail: { count: this.wishlist.length } }));
  },

  getSummary() {
    const subtotal = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal, itemCount, items: [...this.items] };
  },

  // Cart Operations
  add(productId, quantity = 1, size = 'M', color = 'Black') {
    const utils = window.ProductUtils || ProductUtils;
    const product = utils.getById ? utils.getById(productId) : null;
    if (!product) return { success: false, error: 'Product not found' };

    if (!product.sizes.includes(size)) {
      return { success: false, error: `Size ${size} not available` };
    }

    const existingIndex = this.items.findIndex(
      i => i.id === productId && i.size === size && i.color === color
    );

    if (existingIndex >= 0) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        id: productId,
        title: product.title,
        series: product.series,
        price: product.price,
        image: product.images.main,
        size,
        color,
        quantity
      });
    }

    this.persist();
    return { success: true, item: this.items[existingIndex >= 0 ? existingIndex : this.items.length - 1] };
  },

  remove(productId, size, color) {
    this.items = this.items.filter(
      i => !(i.id === productId && i.size === size && i.color === color)
    );
    this.persist();
  },

  updateQuantity(productId, size, color, quantity) {
    const item = this.items.find(
      i => i.id === productId && i.size === size && i.color === color
    );
    if (!item) return false;

    if (quantity <= 0) {
      this.remove(productId, size, color);
    } else {
      item.quantity = Math.min(quantity, 99);
      this.persist();
    }
    return true;
  },

  clear() {
    this.items = [];
    this.persist();
  },

  getItem(productId, size, color) {
    return this.items.find(i => i.id === productId && i.size === size && i.color === color);
  },

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  // Wishlist Operations
  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    if (index >= 0) {
      this.wishlist.splice(index, 1);
      this.persist();
      return { added: false, count: this.wishlist.length };
    } else {
      this.wishlist.push(productId);
      this.persist();
      return { added: true, count: this.wishlist.length };
    }
  },

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  },

  getWishlistProducts() {
    const utils = window.ProductUtils || ProductUtils;
    return this.wishlist.map(id => utils.getById ? utils.getById(id) : null).filter(Boolean);
  },

  clearWishlist() {
    this.wishlist = [];
    this.persist();
  }
};

// Initialize immediately
CartState.init();

if (typeof window !== 'undefined') {
  window.CartState = CartState;
  window.CART_STORAGE_KEY = CART_STORAGE_KEY;
  window.WISHLIST_STORAGE_KEY = WISHLIST_STORAGE_KEY;
}

if (typeof exports !== 'undefined') {
  exports.CartState = CartState;
  exports.CART_STORAGE_KEY = CART_STORAGE_KEY;
  exports.WISHLIST_STORAGE_KEY = WISHLIST_STORAGE_KEY;
}