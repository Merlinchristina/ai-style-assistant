import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { allProducts, departments, searchProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";

const Products = () => {
  const [searchParams] = useSearchParams();
  const department = searchParams.get("department");
  const search = searchParams.get("search");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedDept, setSelectedDept] = useState(department || "");
  const [localSearch, setLocalSearch] = useState(search || "");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let products = search ? searchProducts(search) : allProducts;
    if (selectedDept) products = products.filter(p => p.department === selectedDept);
    if (localSearch && !search) products = products.filter(p =>
      p.name.toLowerCase().includes(localSearch.toLowerCase()) ||
      p.tags.some(t => t.includes(localSearch.toLowerCase()))
    );
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    return products;
  }, [search, selectedDept, localSearch, priceRange]);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {department || search ? (search ? `Results for "${search}"` : department) : "All Products"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">{filteredProducts.length} products found</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
            <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className={`w-64 shrink-0 space-y-6 ${showFilters ? "block" : "hidden md:block"}`}>
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filter products..."
                  value={localSearch}
                  onChange={e => setLocalSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm text-foreground mb-3">Department</h3>
              <div className="space-y-1">
                <button onClick={() => setSelectedDept("")} className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${!selectedDept ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
                  All
                </button>
                {departments.map(d => (
                  <button key={d} onClick={() => setSelectedDept(d)} className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${selectedDept === d ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm text-foreground mb-3">Price Range</h3>
              <div className="flex gap-2">
                <Input type="number" placeholder="Min" value={priceRange[0] || ""} onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])} className="h-9" />
                <Input type="number" placeholder="Max" value={priceRange[1] || ""} onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])} className="h-9" />
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No products found</p>
                <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
