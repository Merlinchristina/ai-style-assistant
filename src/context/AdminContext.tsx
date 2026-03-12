import { createContext, useContext, useState, ReactNode } from "react";
import { Product, allProducts as initialProducts } from "@/data/products";

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>([...initialProducts]);

  const login = (username: string, password: string) => {
    if (username === "dhanush45" && password === "#dhanush45#") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  const addProduct = (product: Product) => setProducts(prev => [...prev, product]);

  const updateProduct = (id: string, updates: Partial<Product>) =>
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));

  const deleteProduct = (id: string) => setProducts(prev => prev.filter(p => p.id !== id));

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout, products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};
