import { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Star, View } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TryInRoom from "@/components/TryInRoom";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const ProductCard = ({ product, compact }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [tryInRoomOpen, setTryInRoomOpen] = useState(false);
  const isFurniture = product.department === "Furniture";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-card rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300"
    >
      <Link to={`/product/${product.id}`}>
        <div className={`relative overflow-hidden ${compact ? "h-40" : "h-56"}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {product.originalPrice && (
            <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-md">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>
      </Link>
      <div className={`p-4 ${compact ? "p-3" : ""}`}>
        <Link to={`/product/${product.id}`}>
          <p className="text-xs text-muted-foreground mb-1">{product.department} · {product.category}</p>
          <h3 className={`font-display font-semibold text-foreground mb-1 line-clamp-1 ${compact ? "text-sm" : ""}`}>{product.name}</h3>
          {!compact && <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>}
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            <span className="text-xs font-medium text-foreground">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-foreground">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {isFurniture && !compact && (
              <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => setTryInRoomOpen(true)} title="Try In Your Room">
                <View className="h-3.5 w-3.5" />
              </Button>
            )}
            <Button size="sm" className="h-8 w-8 p-0" onClick={() => addToCart(product)}>
              <ShoppingCart className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
      {isFurniture && (
        <TryInRoom product={product} open={tryInRoomOpen} onOpenChange={setTryInRoomOpen} />
      )}
    </motion.div>
  );
};

export default ProductCard;
