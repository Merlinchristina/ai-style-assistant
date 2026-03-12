import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Truck, Shield, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { allProducts, departments } from "@/data/products";

const categoryImages: Record<string, string> = {
  Clothing: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
  Furniture: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
  Accessories: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400",
  Footwear: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
  "Home Decor": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400",
};

const features = [
  { icon: Sparkles, title: "AI Shopping", desc: "Smart recommendations powered by AI" },
  { icon: Truck, title: "Fast Delivery", desc: "Free delivery on orders above ₹999" },
  { icon: Shield, title: "Secure Checkout", desc: "100% secure payment processing" },
  { icon: Headphones, title: "24/7 Support", desc: "Round the clock customer support" },
];

const Index = () => {
  const trendingProducts = allProducts.sort((a, b) => b.reviews - a.reviews).slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero py-20 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 bg-primary-foreground/10 text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" /> AI-Powered Shopping
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Shop Smarter with Your AI Copilot
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg">
              Discover perfect outfits, room decor, and more — all recommended by AI that understands your style.
            </p>
            <div className="flex gap-3">
              <Link to="/products">
                <Button size="lg" variant="secondary" className="font-display font-semibold">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-foreground">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">Shop by Department</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {departments.map((dept, i) => (
              <motion.div
                key={dept}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/products?department=${encodeURIComponent(dept)}`} className="group relative block h-40 md:h-52 rounded-xl overflow-hidden card-shadow">
                  <img src={categoryImages[dept]} alt={dept} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  <span className="absolute bottom-4 left-4 font-display font-bold text-primary-foreground text-lg">{dept}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl font-bold text-foreground">Trending Now</h2>
            <Link to="/products" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trendingProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="gradient-hero rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Try Our AI Shopping Copilot
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
              Click the chat icon to get personalized recommendations, outfit ideas, and budget shopping assistance.
            </p>
            <Button variant="secondary" size="lg" className="font-display font-semibold">
              <Sparkles className="mr-2 h-4 w-4" /> Start Shopping with AI
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
