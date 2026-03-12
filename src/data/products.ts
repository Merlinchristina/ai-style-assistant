export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  department: string;
  image: string;
  rating: number;
  reviews: number;
  tags: string[];
  inStock: boolean;
}

const clothingProducts: Product[] = [
  { id: "c1", name: "Classic White Oxford Shirt", description: "Premium cotton oxford shirt perfect for casual and semi-formal occasions", price: 1299, originalPrice: 1999, category: "Shirts", department: "Clothing", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400", rating: 4.5, reviews: 234, tags: ["cotton", "formal", "white"], inStock: true },
  { id: "c2", name: "Slim Fit Black Jeans", description: "Comfortable stretch denim with modern slim fit", price: 1499, originalPrice: 2499, category: "Jeans", department: "Clothing", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", rating: 4.3, reviews: 567, tags: ["denim", "black", "slim"], inStock: true },
  { id: "c3", name: "Navy Blue Bomber Jacket", description: "Lightweight bomber jacket with ribbed cuffs and hem", price: 2499, originalPrice: 3999, category: "Jackets", department: "Clothing", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400", rating: 4.7, reviews: 189, tags: ["jacket", "navy", "bomber"], inStock: true },
  { id: "c4", name: "Graphic Print Hoodie", description: "Soft fleece-lined hoodie with artistic graphic print", price: 1799, originalPrice: 2299, category: "Hoodies", department: "Clothing", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400", rating: 4.4, reviews: 312, tags: ["hoodie", "casual", "graphic"], inStock: true },
  { id: "c5", name: "Linen Summer Shirt", description: "Breathable linen shirt perfect for hot weather", price: 999, originalPrice: 1499, category: "Shirts", department: "Clothing", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400", rating: 4.2, reviews: 145, tags: ["linen", "summer", "casual"], inStock: true },
  { id: "c6", name: "Striped Polo T-Shirt", description: "Classic polo with contrast stripe design", price: 899, originalPrice: 1299, category: "T-Shirts", department: "Clothing", image: "https://images.unsplash.com/photo-1625910513413-5fc7e04b67a3?w=400", rating: 4.1, reviews: 278, tags: ["polo", "striped", "casual"], inStock: true },
  { id: "c7", name: "Denim Trucker Jacket", description: "Vintage-inspired denim jacket with classic wash", price: 2999, originalPrice: 4499, category: "Jackets", department: "Clothing", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400", rating: 4.6, reviews: 156, tags: ["denim", "jacket", "vintage"], inStock: true },
  { id: "c8", name: "Chino Pants Khaki", description: "Slim fit chinos in versatile khaki color", price: 1199, originalPrice: 1799, category: "Pants", department: "Clothing", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400", rating: 4.3, reviews: 423, tags: ["chinos", "khaki", "formal"], inStock: true },
  { id: "c9", name: "Oversized Band T-Shirt", description: "Relaxed fit vintage band graphic tee", price: 699, originalPrice: 999, category: "T-Shirts", department: "Clothing", image: "https://images.unsplash.com/photo-1503341504253-dff4f94032fc?w=400", rating: 4.0, reviews: 567, tags: ["oversized", "graphic", "band"], inStock: true },
  { id: "c10", name: "Wool Blend Overcoat", description: "Elegant overcoat for winter layering", price: 4999, originalPrice: 7999, category: "Coats", department: "Clothing", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400", rating: 4.8, reviews: 89, tags: ["wool", "winter", "formal"], inStock: true },
  { id: "c11", name: "Cargo Jogger Pants", description: "Utility-inspired joggers with multiple pockets", price: 1399, originalPrice: 1999, category: "Pants", department: "Clothing", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400", rating: 4.2, reviews: 345, tags: ["cargo", "joggers", "casual"], inStock: true },
  { id: "c12", name: "Floral Print Summer Dress", description: "Lightweight floral dress perfect for brunch", price: 1599, originalPrice: 2499, category: "Dresses", department: "Clothing", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400", rating: 4.5, reviews: 201, tags: ["floral", "summer", "dress"], inStock: true },
];

const furnitureProducts: Product[] = [
  { id: "f1", name: "Modern Velvet Sofa", description: "3-seater velvet sofa with gold-finished legs", price: 24999, originalPrice: 34999, category: "Sofas", department: "Furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400", rating: 4.7, reviews: 123, tags: ["velvet", "modern", "sofa"], inStock: true },
  { id: "f2", name: "Scandinavian Dining Table", description: "Minimalist oak dining table seats 6", price: 18999, originalPrice: 24999, category: "Tables", department: "Furniture", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400", rating: 4.5, reviews: 87, tags: ["scandinavian", "oak", "dining"], inStock: true },
  { id: "f3", name: "Ergonomic Office Chair", description: "Mesh back chair with lumbar support and adjustable height", price: 12999, originalPrice: 18999, category: "Chairs", department: "Furniture", image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400", rating: 4.6, reviews: 456, tags: ["ergonomic", "office", "mesh"], inStock: true },
  { id: "f4", name: "Walnut Bookshelf", description: "5-tier solid walnut bookshelf with modern design", price: 8999, originalPrice: 12999, category: "Storage", department: "Furniture", image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400", rating: 4.4, reviews: 67, tags: ["walnut", "bookshelf", "storage"], inStock: true },
  { id: "f5", name: "King Size Platform Bed", description: "Low-profile platform bed with upholstered headboard", price: 29999, originalPrice: 39999, category: "Beds", department: "Furniture", image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400", rating: 4.8, reviews: 234, tags: ["king", "platform", "bedroom"], inStock: true },
  { id: "f6", name: "Marble Coffee Table", description: "Round marble top coffee table with brass legs", price: 7999, originalPrice: 11999, category: "Tables", department: "Furniture", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400", rating: 4.5, reviews: 145, tags: ["marble", "coffee", "brass"], inStock: true },
  { id: "f7", name: "Rattan Accent Chair", description: "Bohemian-style rattan chair with cushion", price: 6999, originalPrice: 9999, category: "Chairs", department: "Furniture", image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400", rating: 4.3, reviews: 98, tags: ["rattan", "bohemian", "accent"], inStock: true },
  { id: "f8", name: "TV Console Unit", description: "Mid-century modern TV stand with storage", price: 9999, originalPrice: 14999, category: "Storage", department: "Furniture", image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400", rating: 4.4, reviews: 176, tags: ["tv", "mid-century", "storage"], inStock: true },
  { id: "f9", name: "L-Shaped Sectional Sofa", description: "Spacious sectional with reversible chaise", price: 34999, originalPrice: 49999, category: "Sofas", department: "Furniture", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400", rating: 4.6, reviews: 89, tags: ["sectional", "l-shaped", "spacious"], inStock: true },
  { id: "f10", name: "Standing Desk", description: "Electric adjustable standing desk with memory presets", price: 15999, originalPrice: 21999, category: "Desks", department: "Furniture", image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400", rating: 4.7, reviews: 312, tags: ["standing", "electric", "desk"], inStock: true },
];

const accessoriesProducts: Product[] = [
  { id: "a1", name: "Leather Crossbody Bag", description: "Genuine leather crossbody with adjustable strap", price: 2499, originalPrice: 3999, category: "Bags", department: "Accessories", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400", rating: 4.5, reviews: 234, tags: ["leather", "crossbody", "bag"], inStock: true },
  { id: "a2", name: "Aviator Sunglasses", description: "Classic aviator with polarized UV protection lenses", price: 1299, originalPrice: 1999, category: "Eyewear", department: "Accessories", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400", rating: 4.4, reviews: 567, tags: ["aviator", "polarized", "sunglasses"], inStock: true },
  { id: "a3", name: "Minimalist Watch Silver", description: "Sleek stainless steel watch with mesh band", price: 3499, originalPrice: 4999, category: "Watches", department: "Accessories", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400", rating: 4.6, reviews: 189, tags: ["watch", "silver", "minimalist"], inStock: true },
  { id: "a4", name: "Canvas Tote Bag", description: "Eco-friendly canvas tote with inner pockets", price: 799, originalPrice: 1199, category: "Bags", department: "Accessories", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400", rating: 4.2, reviews: 345, tags: ["canvas", "tote", "eco"], inStock: true },
  { id: "a5", name: "Leather Belt Brown", description: "Full-grain leather belt with antique brass buckle", price: 999, originalPrice: 1499, category: "Belts", department: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", rating: 4.3, reviews: 234, tags: ["leather", "belt", "brown"], inStock: true },
  { id: "a6", name: "Silk Scarf Print", description: "Luxurious printed silk scarf in vibrant colors", price: 1499, originalPrice: 2499, category: "Scarves", department: "Accessories", image: "https://images.unsplash.com/photo-1601379329542-31c59347e2b1?w=400", rating: 4.5, reviews: 123, tags: ["silk", "scarf", "print"], inStock: true },
  { id: "a7", name: "Beaded Bracelet Set", description: "Set of 3 natural stone beaded bracelets", price: 599, originalPrice: 899, category: "Jewelry", department: "Accessories", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400", rating: 4.1, reviews: 456, tags: ["bracelet", "beaded", "stone"], inStock: true },
  { id: "a8", name: "Laptop Backpack", description: "Water-resistant backpack with USB charging port", price: 1999, originalPrice: 2999, category: "Bags", department: "Accessories", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", rating: 4.6, reviews: 678, tags: ["backpack", "laptop", "travel"], inStock: true },
  { id: "a9", name: "Gold Hoop Earrings", description: "14K gold-plated classic hoop earrings", price: 899, originalPrice: 1299, category: "Jewelry", department: "Accessories", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400", rating: 4.4, reviews: 234, tags: ["gold", "hoop", "earrings"], inStock: true },
  { id: "a10", name: "Wool Fedora Hat", description: "Classic wool felt fedora with grosgrain band", price: 1199, originalPrice: 1799, category: "Hats", department: "Accessories", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400", rating: 4.3, reviews: 145, tags: ["fedora", "wool", "hat"], inStock: true },
];

const footwearProducts: Product[] = [
  { id: "fw1", name: "White Leather Sneakers", description: "Clean white leather sneakers with cushioned sole", price: 2999, originalPrice: 4499, category: "Sneakers", department: "Footwear", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400", rating: 4.6, reviews: 567, tags: ["white", "leather", "sneakers"], inStock: true },
  { id: "fw2", name: "Chelsea Boots Black", description: "Classic leather Chelsea boots with elastic side panel", price: 3999, originalPrice: 5999, category: "Boots", department: "Footwear", image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400", rating: 4.7, reviews: 234, tags: ["chelsea", "black", "boots"], inStock: true },
  { id: "fw3", name: "Running Shoes Pro", description: "Lightweight running shoes with responsive cushioning", price: 3499, originalPrice: 4999, category: "Sports", department: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", rating: 4.5, reviews: 789, tags: ["running", "sports", "lightweight"], inStock: true },
  { id: "fw4", name: "Suede Loafers Tan", description: "Premium suede penny loafers in tan", price: 2499, originalPrice: 3499, category: "Formal", department: "Footwear", image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400", rating: 4.4, reviews: 156, tags: ["suede", "loafers", "tan"], inStock: true },
  { id: "fw5", name: "High Top Canvas Shoes", description: "Classic high-top canvas shoes in multiple colors", price: 1499, originalPrice: 1999, category: "Sneakers", department: "Footwear", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400", rating: 4.3, reviews: 456, tags: ["high-top", "canvas", "classic"], inStock: true },
  { id: "fw6", name: "Hiking Boots Waterproof", description: "Durable waterproof hiking boots with ankle support", price: 4999, originalPrice: 6999, category: "Boots", department: "Footwear", image: "https://images.unsplash.com/photo-1520219306100-ec4afeeefe58?w=400", rating: 4.7, reviews: 312, tags: ["hiking", "waterproof", "boots"], inStock: true },
  { id: "fw7", name: "Slip-On Espadrilles", description: "Casual canvas espadrilles for summer", price: 899, originalPrice: 1299, category: "Casual", department: "Footwear", image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400", rating: 4.1, reviews: 198, tags: ["espadrilles", "summer", "casual"], inStock: true },
  { id: "fw8", name: "Oxford Dress Shoes", description: "Polished leather Oxford shoes for formal occasions", price: 3999, originalPrice: 5499, category: "Formal", department: "Footwear", image: "https://images.unsplash.com/photo-1614252368787-bfc5a3dbe4fd?w=400", rating: 4.6, reviews: 145, tags: ["oxford", "formal", "leather"], inStock: true },
  { id: "fw9", name: "Platform Sandals", description: "Trendy platform sandals with cushioned footbed", price: 1799, originalPrice: 2499, category: "Sandals", department: "Footwear", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400", rating: 4.2, reviews: 234, tags: ["platform", "sandals", "trendy"], inStock: true },
  { id: "fw10", name: "Retro Basketball Sneakers", description: "Vintage-inspired basketball shoes with air cushion", price: 4499, originalPrice: 5999, category: "Sneakers", department: "Footwear", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400", rating: 4.8, reviews: 678, tags: ["retro", "basketball", "sneakers"], inStock: true },
];

const homeDecorProducts: Product[] = [
  { id: "h1", name: "Macramé Wall Hanging", description: "Handwoven macramé wall art in natural cotton", price: 1499, originalPrice: 2299, category: "Wall Art", department: "Home Decor", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400", rating: 4.5, reviews: 189, tags: ["macrame", "wall", "handmade"], inStock: true },
  { id: "h2", name: "Ceramic Vase Set", description: "Set of 3 minimalist ceramic vases in neutral tones", price: 1999, originalPrice: 2999, category: "Vases", department: "Home Decor", image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400", rating: 4.6, reviews: 145, tags: ["ceramic", "vase", "minimalist"], inStock: true },
  { id: "h3", name: "Scented Soy Candle Set", description: "Set of 4 hand-poured soy candles in artisan jars", price: 899, originalPrice: 1399, category: "Candles", department: "Home Decor", image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400", rating: 4.4, reviews: 567, tags: ["candles", "soy", "scented"], inStock: true },
  { id: "h4", name: "Woven Throw Blanket", description: "Chunky knit throw blanket in warm neutral", price: 2499, originalPrice: 3499, category: "Textiles", department: "Home Decor", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400", rating: 4.7, reviews: 234, tags: ["throw", "knit", "cozy"], inStock: true },
  { id: "h5", name: "Abstract Canvas Print", description: "Large abstract art print on stretched canvas", price: 3499, originalPrice: 4999, category: "Wall Art", department: "Home Decor", image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=400", rating: 4.5, reviews: 123, tags: ["abstract", "canvas", "art"], inStock: true },
  { id: "h6", name: "Indoor Plant Pot Set", description: "Set of 3 geometric concrete plant pots", price: 1299, originalPrice: 1999, category: "Planters", department: "Home Decor", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400", rating: 4.3, reviews: 345, tags: ["plant", "concrete", "geometric"], inStock: true },
  { id: "h7", name: "Velvet Cushion Covers", description: "Set of 2 luxury velvet cushion covers", price: 799, originalPrice: 1199, category: "Textiles", department: "Home Decor", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400", rating: 4.2, reviews: 456, tags: ["velvet", "cushion", "luxury"], inStock: true },
  { id: "h8", name: "Brass Table Lamp", description: "Art deco brass table lamp with fabric shade", price: 3999, originalPrice: 5499, category: "Lighting", department: "Home Decor", image: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400", rating: 4.6, reviews: 167, tags: ["brass", "lamp", "art-deco"], inStock: true },
  { id: "h9", name: "Wicker Storage Baskets", description: "Set of 3 nesting wicker storage baskets", price: 1599, originalPrice: 2299, category: "Storage", department: "Home Decor", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400", rating: 4.4, reviews: 234, tags: ["wicker", "storage", "baskets"], inStock: true },
  { id: "h10", name: "Terrazzo Coasters Set", description: "Set of 6 handmade terrazzo coasters", price: 699, originalPrice: 999, category: "Tabletop", department: "Home Decor", image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400", rating: 4.3, reviews: 189, tags: ["terrazzo", "coasters", "handmade"], inStock: true },
];

export const allProducts: Product[] = [
  ...clothingProducts,
  ...furnitureProducts,
  ...accessoriesProducts,
  ...footwearProducts,
  ...homeDecorProducts,
];

export const departments = ["Clothing", "Furniture", "Accessories", "Footwear", "Home Decor"];

export const getProductsByDepartment = (department: string) =>
  allProducts.filter(p => p.department === department);

export const getProductById = (id: string) =>
  allProducts.find(p => p.id === id);

export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase();
  return allProducts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q)) ||
    p.category.toLowerCase().includes(q) ||
    p.department.toLowerCase().includes(q)
  );
};

export const getProductsByBudget = (maxBudget: number, department?: string): Product[] => {
  let filtered = allProducts.filter(p => p.price <= maxBudget);
  if (department) filtered = filtered.filter(p => p.department === department);
  return filtered;
};
