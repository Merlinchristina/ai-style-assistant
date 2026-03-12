import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const { totalItems } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  const departments = [
    { name: "Clothing", path: "/products?department=Clothing" },
    { name: "Furniture", path: "/products?department=Furniture" },
    { name: "Accessories", path: "/products?department=Accessories" },
    { name: "Footwear", path: "/products?department=Footwear" },
    { name: "Home Decor", path: "/products?department=Home Decor" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-sm">S</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">ShopAI</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {departments.map(d => (
              <Link key={d.name} to={d.path} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {d.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <Input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-48 h-9"
                  autoFocus
                />
                <Button type="button" variant="ghost" size="icon" className="h-9 w-9" onClick={() => setSearchOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setSearchOpen(true)}>
                <Search className="h-4 w-4" />
              </Button>
            )}

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ShoppingCart className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-2">
              {departments.map(d => (
                <Link key={d.name} to={d.path} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  {d.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
