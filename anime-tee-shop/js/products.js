/**
 * Product Data & Filtering Logic
 * OtakuThreadz - Anime Streetwear E-commerce
 */

const PRODUCTS = [
  {
    category: "tee",
    id: "tee-001",
    title: "Sharingan Awakening",
    series: "Naruto",
    genre: ["Action", "Shounen"],
    price: 34.99,
    originalPrice: 44.99,
    images: {
      main: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop",
      back: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop",
      detail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "White"],
    description: "Witness the moment Sasuke's Sharingan fully awakens. Screen-printed with metallic silver ink that catches light like the real thing. Heavyweight 280gsm cotton, oversized fit.",
    tags: ["bestseller", "limited"],
    rating: 4.9,
    reviews: 342
  },
  {
    category: "tee",
    id: "tee-002",
    title: "Straw Hat Declaration",
    series: "One Piece",
    genre: ["Adventure", "Shounen"],
    price: 36.99,
    originalPrice: null,
    images: {
      main: "https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=600&h=750&fit=crop",
      back: "https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=600&h=750&fit=crop",
      detail: "https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=400&h=400&fit=crop"
    },
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Cream", "Sand"],
    description: "Luffy's iconic declaration at Marineford, rendered in vintage discharge print that softens with every wash. Cream colorway mimics aged parchment.",
    tags: ["new"],
    rating: 4.8,
    reviews: 218
  },
  {
    category: "tee",
    id: "tee-003",
    title: "Domain Expansion: Malevolent Shrine",
    series: "Jujutsu Kaisen",
    genre: ["Action", "Supernatural", "Dark Fantasy"],
    price: 39.99,
    originalPrice: 49.99,
    images: {
      main: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=750&fit=crop",
      back: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=750&fit=crop",
      detail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"
    },
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal"],
    description: "Sukuna's Malevolent Shrine in glow-in-the-dark discharge ink. The shrine structure glows eerily in darkness. Limited to 500 pieces globally. Individually numbered.",
    tags: ["limited", "bestseller"],
    rating: 5.0,
    reviews: 89
  },
  {
    category: "tee",
    id: "tee-004",
    title: "Sun Breathing: Thirteenth Form",
    series: "Demon Slayer",
    genre: ["Action", "Historical", "Supernatural"],
    price: 34.99,
    originalPrice: null,
    images: {
      main: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=750&fit=crop",
      back: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=750&fit=crop",
      detail: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop"
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Deep Red", "Charcoal"],
    description: "Tanjiro's Hinokami Kagura finale. Gradient flame print transitions from black to crimson using water-based inks. Each tee has unique flame variation.",
    tags: ["bestseller"],
    rating: 4.9,
    reviews: 456
  },
  {
    category: "tee",
    id: "tee-005",
    title: "Wings of Freedom",
    series: "Attack on Titan",
    genre: ["Action", "Dark Fantasy", "Post-Apocalyptic"],
    price: 37.99,
    originalPrice: 47.99,
    images: {
      main: "https://images.unsplash.com/photo-1529230789048-f3191d2c4d66?w=600&h=750&fit=crop",
      back: "https://images.unsplash.com/photo-1529230789048-f3191d2c4d66?w=600&h=750&fit=crop",
      detail: "https://images.unsplash.com/photo-1529230789048-f3191d2c4d66?w=400&h=400&fit=crop"
    },
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Olive"],
    description: "Survey Corps wings with distressed texture mimicking battlefield wear. Olive colorway references military gear. Back features 'Shinzou wo Sasageyo' in Japanese.",
    tags: ["limited"],
    rating: 4.8,
    reviews: 267
  },
  {
    category: "tee",
    id: "tee-006",
    title: "Plus Ultra",
    series: "My Hero Academia",
    genre: ["Action", "Superhero", "School"],
    price: 32.99,
    originalPrice: null,
    images: {
      main: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=750&fit=crop",
      back: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=750&fit=crop",
      detail: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop"
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Grey", "Green"],
    description: "All Might's signature catchphrase in bold collegiate lettering. Green colorway matches UA High uniform. Reflective vinyl accents on the 'Plus' lettering.",
    tags: ["new"],
    rating: 4.7,
    reviews: 189
  },
  {
    category: "tee",
    id: "tee-007",
    title: "Bankai: Zangetsu",
    series: "Bleach",
    genre: ["Action", "Supernatural", "Shounen"],
    price: 38.99,
    originalPrice: 48.99,
    images: {
      main: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=750&fit=crop",
      back: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=750&fit=crop",
      detail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=400&fit=crop"
    },
    sizes: ["M", "L", "XL"],
    colors: ["Black", "White"],
    description: "Ichigo's Tensa Zangetsu in metallic foil print. The blade shimmers with movement. White version features reverse foil (black foil on white). Numbered edition of 300.",
    tags: ["limited"],
    rating: 4.9,
    reviews: 134
  },
  {
    category: "tee",
    id: "tee-008",
    title: "Arise: Shadow Monarch",
    series: "Solo Leveling",
    genre: ["Action", "Fantasy", "Supernatural"],
    price: 41.99,
    originalPrice: 51.99,
    images: {
      main: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=750&fit=crop",
      back: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=750&fit=crop",
      detail: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=400&fit=crop"
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Deep Blue"],
    description: "Sung Jinwoo commanding his shadow army. Neon purple glowing print details and high-density screen print on 300gsm heavy vintage-washed cotton.",
    tags: ["new", "bestseller"],
    rating: 5.0,
    reviews: 412
  },
  {
    category: "tee",
    id: "tee-009",
    title: "Sandevistan Overdrive",
    series: "Cyberpunk Edgerunners",
    genre: ["Sci-Fi", "Action", "Cyberpunk"],
    price: 39.99,
    originalPrice: null,
    images: {
      main: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=750&fit=crop",
      back: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=750&fit=crop",
      detail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=400&fit=crop"
    },
    sizes: ["S", "M", "L", "XL"],
    colors: ["Neon Green", "Black", "Cyber Yellow"],
    description: "David Martinez's cyberware spine motif with UV-reactive neon green print. Afterglow effect when moving into dark rooms.",
    tags: ["limited", "new"],
    rating: 4.9,
    reviews: 310
  },
  {
    category: "accessory",
    id: "acc-001",
    title: "Tanjiro Hanafuda Earrings Replica",
    series: "Demon Slayer",
    genre: ["Accessory", "Historical", "Cosplay"],
    price: 19.99,
    originalPrice: 24.99,
    images: {
      main: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=750&fit=crop",
      back: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=750&fit=crop",
      detail: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop"
    },
    sizes: ["One Size"],
    colors: ["Red/White"],
    description: "Lightweight hypoallergenic acrylic Hanafuda earrings with stainless steel clip/hooks. Laser etched sun motif.",
    tags: ["bestseller"],
    rating: 4.9,
    reviews: 620
  },
  {
    category: "accessory",
    id: "acc-002",
    title: "Sukuna 20-Finger Ring Set",
    series: "Jujutsu Kaisen",
    genre: ["Accessory", "Supernatural", "Jewelry"],
    price: 29.99,
    originalPrice: 39.99,
    images: {
      main: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=750&fit=crop",
      back: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=750&fit=crop",
      detail: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop"
    },
    sizes: ["Adjustable"],
    colors: ["Antique Silver", "Obsidian Black"],
    description: "4-piece vintage titanium steel ring set featuring Sukuna's cursed seals and demonic eyes. Scratch resistant.",
    tags: ["limited", "bestseller"],
    rating: 5.0,
    reviews: 480
  },
  {
    category: "accessory",
    id: "acc-003",
    title: "Pochita Plush Bag Charm & Keychain",
    series: "Chainsaw Man",
    genre: ["Accessory", "Plush", "Kawaii"],
    price: 14.99,
    originalPrice: null,
    images: {
      main: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=750&fit=crop",
      back: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=750&fit=crop",
      detail: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=400&fit=crop"
    },
    sizes: ["12cm"],
    colors: ["Orange"],
    description: "Ultra-soft velvet Pochita plush charm with durable metallic carabiner clip. Perfect for backpacks and keys.",
    tags: ["new"],
    rating: 4.8,
    reviews: 350
  },
  {
    category: "accessory",
    id: "acc-004",
    title: "Sandevistan Cyberpunk LED Cap",
    series: "Cyberpunk Edgerunners",
    genre: ["Accessory", "Headwear", "Cyberpunk"],
    price: 27.99,
    originalPrice: 34.99,
    images: {
      main: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=750&fit=crop",
      back: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=750&fit=crop",
      detail: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop"
    },
    sizes: ["Adjustable Snapback"],
    colors: ["Black/Neon Green"],
    description: "Structured 6-panel streetwear hat with fiber-optic glowing brim edge and embroidered Night City crest.",
    tags: ["limited", "new"],
    rating: 4.9,
    reviews: 195
  },
  {
    category: "accessory",
    id: "acc-005",
    title: "Survey Corps Heavy Canvas Tote",
    series: "Attack on Titan",
    genre: ["Accessory", "Bags"],
    price: 24.99,
    originalPrice: null,
    images: {
      main: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=750&fit=crop",
      back: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=750&fit=crop",
      detail: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop"
    },
    sizes: ["Standard"],
    colors: ["Military Khaki", "Obsidian Black"],
    description: "Heavy-duty 16oz cotton canvas tote bag with reinforced handles, zip pocket, and screenprinted Wings of Freedom emblem.",
    tags: ["bestseller"],
    rating: 4.8,
    reviews: 240
  },
  {
    category: "accessory",
    id: "acc-006",
    title: "EVA Unit-01 Cyber LED Desk Lamp",
    series: "Evangelion",
    genre: ["Accessory", "Home Decor", "LED"],
    price: 34.99,
    originalPrice: 44.99,
    images: {
      main: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=750&fit=crop",
      back: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=750&fit=crop",
      detail: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop"
    },
    sizes: ["Desk Spec"],
    colors: ["RGB Purple/Green"],
    description: "3D acrylic optical illusion lamp with 16 RGB color modes, touch switch, and wireless remote control.",
    tags: ["limited", "new"],
    rating: 5.0,
    reviews: 140
  }
];

const COLLECTIONS = [
  {
    id: "anime-tees",
    title: "Graphic Anime Tees",
    subtitle: "Heavyweight 280gsm Oversized Tees",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=750&fit=crop",
    category: "tee",
    count: 12
  },
  {
    id: "accessories-gear",
    title: "Anime Accessories & Gear",
    subtitle: "Rings, Earrings, Caps, LED & Totes",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=750&fit=crop",
    category: "accessory",
    count: 6
  },
  {
    id: "naruto",
    title: "Naruto Shippuden",
    subtitle: "Sharingan & Akatsuki Drop",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=750&fit=crop",
    series: "Naruto",
    count: 12
  },
  {
    id: "one-piece",
    title: "One Piece Pirates",
    subtitle: "Straw Hat & Fire Fist Collection",
    image: "https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=600&h=750&fit=crop",
    series: "One Piece",
    count: 18
  },
  {
    id: "jjk",
    title: "Jujutsu Kaisen",
    subtitle: "Malevolent Shrine & Cursed Rings",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=750&fit=crop",
    series: "Jujutsu Kaisen",
    count: 14
  },
  {
    id: "cyberpunk",
    title: "Cyberpunk Edgerunners",
    subtitle: "Sandevistan Overdrive & LED Gear",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=750&fit=crop",
    series: "Cyberpunk Edgerunners",
    count: 8
  }
];

// Product filtering & search utilities
const ProductUtils = {
  getAll() {
    return [...PRODUCTS].sort((a, b) => {
      const tagOrder = { limited: 0, bestseller: 1, new: 2 };
      const aTag = Math.min(...a.tags.map(t => tagOrder[t] ?? 99));
      const bTag = Math.min(...b.tags.map(t => tagOrder[t] ?? 99));
      return aTag - bTag;
    });
  },

  getById(id) {
    return PRODUCTS.find(p => p.id === id);
  },

  getBySeries(series) {
    return PRODUCTS.filter(p => p.series === series);
  },

  getByCategory(category) {
    return PRODUCTS.filter(p => p.category === category);
  },

  getByTag(tag) {
    return PRODUCTS.filter(p => p.tags.includes(tag));
  },

  search(query) {
    const q = query.toLowerCase().trim();
    if (!q) return this.getAll();
    return PRODUCTS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.series.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.genre.some(g => g.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q)
    );
  },

  filter({ category, series, genre, priceRange, tags, sizes, inStock }) {
    return PRODUCTS.filter(p => {
      if (category && category !== 'all' && p.category !== category) return false;
      if (series && p.series !== series) return false;
      if (genre && !p.genre.includes(genre)) return false;
      if (priceRange && (p.price < priceRange.min || p.price > priceRange.max)) return false;
      if (tags && tags.length && !tags.some(t => p.tags.includes(t))) return false;
      if (sizes && sizes.length && !sizes.some(s => p.sizes.includes(s))) return false;
      if (inStock && p.sizes.length === 0) return false;
      return true;
    });
  },

  getRelated(productId, limit = 4) {
    const product = this.getById(productId);
    if (!product) return [];
    return PRODUCTS
      .filter(p => p.id !== productId && (p.series === product.series || p.genre.some(g => product.genre.includes(g))))
      .slice(0, limit);
  },

  getSeriesList() {
    return [...new Set(PRODUCTS.map(p => p.series))].sort();
  },

  getGenreList() {
    return [...new Set(PRODUCTS.flatMap(p => p.genre))].sort();
  },

  getPriceRange() {
    const prices = PRODUCTS.map(p => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }
};

if (typeof window !== 'undefined') {
  window.PRODUCTS = PRODUCTS;
  window.COLLECTIONS = COLLECTIONS;
  window.ProductUtils = ProductUtils;
}

if (typeof exports !== 'undefined') {
  exports.PRODUCTS = PRODUCTS;
  exports.COLLECTIONS = COLLECTIONS;
  exports.ProductUtils = ProductUtils;
}