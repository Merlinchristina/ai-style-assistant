import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, allProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, ArrowLeft, Truck, Shield, RotateCcw, View } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import TryInRoom from "@/components/TryInRoom";

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProductById(id || "");
  const { addToCart } = useCart();
  const [tryInRoomOpen, setTryInRoomOpen] = useState(false);
  const isFurniture = product?.department === "Furniture";

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Product not found</p>
          <Link to="/products"><Button variant="outline" className="mt-4">Back to Products</Button></Link>
        </div>
      </div>
    );
  }

  const related = allProducts.filter(p => p.department === product.department && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="rounded-2xl overflow-hidden card-shadow">
            <img src={product.image} alt={product.name} className="w-full h-[400px] md:h-[500px] object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-sm text-muted-foreground mb-2">{product.department} · {product.category}</p>
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-medium text-foreground">{product.rating}</span>
              </div>
              <span className="text-muted-foreground text-sm">({product.reviews} reviews)</span>
            </div>
            <p className="text-muted-foreground mb-6">{product.description}</p>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-sm font-bold text-accent">{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span>
                </>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button size="lg" className="flex-1 sm:flex-initial font-display font-semibold" onClick={() => addToCart(product)}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              {isFurniture && (
                <Button size="lg" variant="outline" className="flex-1 sm:flex-initial font-display font-semibold gap-2" onClick={() => setTryInRoomOpen(true)}>
                  <View className="h-5 w-5" /> Try In Your Room
                </Button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: "Free Delivery" },
                { icon: Shield, label: "Secure Payment" },
                { icon: RotateCcw, label: "Easy Returns" },
              ].map(f => (
                <div key={f.label} className="flex flex-col items-center gap-1.5 p-3 bg-secondary rounded-lg">
                  <f.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      {isFurniture && product && (
        <TryInRoom product={product} open={tryInRoomOpen} onOpenChange={setTryInRoomOpen} />
      )}
    </div>
  );
};

export default ProductDetail;
