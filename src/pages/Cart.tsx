import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Start shopping to add items</p>
          <Link to="/products"><Button className="font-display font-semibold">Browse Products</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="font-display text-2xl font-bold text-foreground mb-8">Shopping Cart</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 bg-card p-4 rounded-xl card-shadow">
                <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-foreground line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.department}</p>
                  <p className="font-display font-bold text-foreground mt-1">₹{product.price.toLocaleString()}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-border rounded-lg">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1.5 hover:bg-secondary rounded-l-lg"><Minus className="h-3 w-3" /></button>
                      <span className="px-3 text-sm font-medium">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5 hover:bg-secondary rounded-r-lg"><Plus className="h-3 w-3" /></button>
                    </div>
                    <button onClick={() => removeFromCart(product.id)} className="text-destructive hover:text-destructive/80">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card p-6 rounded-xl card-shadow h-fit sticky top-24">
            <h3 className="font-display font-bold text-foreground mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-accent font-medium">Free</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="font-display font-bold text-foreground">Total</span>
                <span className="font-display font-bold text-foreground">₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>
            <Link to="/checkout">
              <Button className="w-full font-display font-semibold" size="lg">
                Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
