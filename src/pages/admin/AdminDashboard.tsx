import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/context/AdminContext";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, LogOut, Package, Search, LayoutDashboard, ShoppingBag, IndianRupee } from "lucide-react";
import { toast } from "sonner";

const departments = ["Clothing", "Furniture", "Accessories", "Footwear", "Home Decor"];

const emptyProduct: Omit<Product, "id"> = {
  name: "", description: "", price: 0, originalPrice: 0, category: "",
  department: "Clothing", image: "", rating: 4.0, reviews: 0, tags: [], inStock: true,
};

const AdminDashboard = () => {
  const { isAuthenticated, logout, products, addProduct, updateProduct, deleteProduct } = useAdmin();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<Product | null>(null);
  const [form, setForm] = useState<Omit<Product, "id">>(emptyProduct);
  const [tagsInput, setTagsInput] = useState("");

  if (!isAuthenticated) {
    navigate("/admin");
    return null;
  }

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "all" || p.department === deptFilter;
    return matchSearch && matchDept;
  });

  const totalValue = products.reduce((s, p) => s + p.price, 0);
  const inStockCount = products.filter(p => p.inStock).length;

  const openAdd = () => {
    setEditing(null);
    setForm(emptyProduct);
    setTagsInput("");
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, description: p.description, price: p.price, originalPrice: p.originalPrice, category: p.category, department: p.department, image: p.image, rating: p.rating, reviews: p.reviews, tags: p.tags, inStock: p.inStock });
    setTagsInput(p.tags.join(", "));
    setDialogOpen(true);
  };

  const openDelete = (p: Product) => {
    setDeleting(p);
    setDeleteDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.category || !form.department) {
      toast.error("Name, category, and department are required");
      return;
    }
    const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);
    if (editing) {
      updateProduct(editing.id, { ...form, tags });
      toast.success("Product updated");
    } else {
      addProduct({ ...form, tags, id: `p${Date.now()}` });
      toast.success("Product added");
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (deleting) {
      deleteProduct(deleting.id);
      toast.success("Product deleted");
    }
    setDeleteDialogOpen(false);
  };

  const handleLogout = () => { logout(); navigate("/admin"); };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">ShopAI Admin</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="card-shadow">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-display font-bold text-foreground">{products.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Stock</p>
                <p className="text-2xl font-display font-bold text-foreground">{inStockCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <IndianRupee className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Catalog Value</p>
                <p className="text-2xl font-display font-bold text-foreground">₹{totalValue.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-3 flex-1 w-full sm:w-auto">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
            </div>
            <Select value={deptFilter} onValueChange={setDeptFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={openAdd}>
            <Plus className="h-4 w-4 mr-2" /> Add Product
          </Button>
        </div>

        {/* Table */}
        <Card className="card-shadow">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden sm:table-cell">Department</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="hidden md:table-cell">Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(p => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-md object-cover" />
                        <span className="font-medium text-foreground text-sm line-clamp-1">{p.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{p.category}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="secondary" className="text-xs">{p.department}</Badge>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">₹{p.price.toLocaleString()}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant={p.inStock ? "default" : "destructive"} className="text-xs">
                        {p.inStock ? "In Stock" : "Out"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(p)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => openDelete(p)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No products found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Product name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <Textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} />
            <div className="grid grid-cols-2 gap-3">
              <Input type="number" placeholder="Price" value={form.price || ""} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
              <Input type="number" placeholder="Original price" value={form.originalPrice || ""} onChange={e => setForm({ ...form, originalPrice: Number(e.target.value) })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
              <Select value={form.department} onValueChange={v => setForm({ ...form, department: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Input placeholder="Image URL" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
            <Input placeholder="Tags (comma separated)" value={tagsInput} onChange={e => setTagsInput(e.target.value)} />
            <div className="flex items-center gap-2">
              <Switch checked={form.inStock} onCheckedChange={v => setForm({ ...form, inStock: v })} />
              <span className="text-sm text-muted-foreground">In Stock</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editing ? "Update" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete <strong className="text-foreground">{deleting?.name}</strong>? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
