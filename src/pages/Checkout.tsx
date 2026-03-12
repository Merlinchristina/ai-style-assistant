import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  if (placed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <CheckCircle className="h-20 w-20 text-primary mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">Order Placed!</h2>
          <p className="text-muted-foreground mb-6">Thank you for your purchase. Your order will be delivered within 5-7 business days.</p>
          <Link to="/"><Button className="font-display font-semibold">Continue Shopping</Button></Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Your cart is empty</p>
          <Link to="/products"><Button>Browse Products</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="font-display text-2xl font-bold text-foreground mb-8">Checkout</h1>
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-xl card-shadow space-y-4">
            <h2 className="font-display font-semibold text-foreground">Shipping Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>First Name</Label><Input placeholder="John" /></div>
              <div><Label>Last Name</Label><Input placeholder="Doe" /></div>
            </div>
            <div><Label>Email</Label><Input type="email" placeholder="john@example.com" /></div>
            <div><Label>Address</Label><Input placeholder="123 Main Street" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>City</Label><Input placeholder="Mumbai" /></div>
              <div><Label>Pin Code</Label><Input placeholder="400001" /></div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl card-shadow space-y-4">
            <h2 className="font-display font-semibold text-foreground">Payment</h2>
            <div><Label>Card Number</Label><Input placeholder="4242 4242 4242 4242" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Expiry</Label><Input placeholder="MM/YY" /></div>
              <div><Label>CVV</Label><Input placeholder="123" /></div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-xl card-shadow">
            <div className="flex justify-between mb-4">
              <span className="text-muted-foreground">{items.length} items</span>
              <span className="font-display font-bold text-foreground">₹{totalPrice.toLocaleString()}</span>
            </div>
            <Button className="w-full font-display font-semibold" size="lg" onClick={() => { clearCart(); setPlaced(true); }}>
              Place Order — ₹{totalPrice.toLocaleString()}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
