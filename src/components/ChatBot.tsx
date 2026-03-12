import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, ShoppingBag, Palette, DollarSign, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { searchProducts, getProductsByBudget, allProducts, Product } from "@/data/products";
import ProductCard from "./ProductCard";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
  products?: Product[];
}

const quickActions = [
  { label: "Outfit under ₹5000", icon: DollarSign, query: "Suggest a complete outfit under 5000 rupees" },
  { label: "Party outfit", icon: PartyPopper, query: "Suggest a party outfit" },
  { label: "Room decor ideas", icon: Palette, query: "Suggest minimalist room decor items" },
  { label: "Trending sneakers", icon: ShoppingBag, query: "Show me trending sneakers" },
];

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey! 👋 I'm your **AI Shopping Copilot**. I can help you find products, generate outfits, shop within budgets, and suggest room decor. What are you looking for today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getAIResponse = (query: string): Message => {
    const q = query.toLowerCase();
    let products: Product[] = [];
    let content = "";

    // Budget detection
    const budgetMatch = q.match(/(?:under|within|below|budget)\s*(?:₹|rs\.?|inr)?\s*(\d+)/);
    if (budgetMatch) {
      const budget = parseInt(budgetMatch[1]);
      const dept = q.includes("outfit") || q.includes("cloth") ? "Clothing" :
        q.includes("shoe") || q.includes("sneaker") || q.includes("footwear") ? "Footwear" :
        q.includes("decor") || q.includes("furniture") ? undefined : undefined;
      
      if (q.includes("outfit")) {
        const tops = getProductsByBudget(budget * 0.4, "Clothing");
        const bottoms = allProducts.filter(p => p.department === "Clothing" && p.price <= budget * 0.3 && (p.category === "Jeans" || p.category === "Pants"));
        const shoes = getProductsByBudget(budget * 0.3, "Footwear");
        products = [tops[0], bottoms[0], shoes[0]].filter(Boolean);
        const total = products.reduce((s, p) => s + p.price, 0);
        content = `Here's a complete outfit under ₹${budget.toLocaleString()}! Total: **₹${total.toLocaleString()}** 🎯`;
      } else {
        products = getProductsByBudget(budget, dept).slice(0, 6);
        content = `Found **${products.length} products** under ₹${budget.toLocaleString()}! Here are some great picks:`;
      }
    }
    // Occasion shopping
    else if (q.includes("party") || q.includes("wedding") || q.includes("formal") || q.includes("casual") || q.includes("college") || q.includes("travel")) {
      const occasion = q.includes("party") ? "party" : q.includes("wedding") ? "wedding" : q.includes("formal") ? "formal" : q.includes("college") ? "college" : q.includes("travel") ? "travel" : "casual";
      const tags: Record<string, string[]> = {
        party: ["jacket", "black", "gold", "formal"],
        wedding: ["formal", "luxury", "silk", "gold"],
        formal: ["formal", "leather", "oxford", "white"],
        college: ["casual", "sneakers", "hoodie", "canvas"],
        travel: ["travel", "backpack", "casual", "lightweight"],
        casual: ["casual", "t-shirt", "sneakers", "denim"],
      };
      const relevantTags = tags[occasion] || tags.casual;
      products = allProducts.filter(p => p.tags.some(t => relevantTags.includes(t))).slice(0, 6);
      content = `Here's what I'd recommend for a **${occasion}** look! 🎨`;
    }
    // Room decor
    else if (q.includes("room") || q.includes("decor") || q.includes("interior")) {
      products = allProducts.filter(p => p.department === "Home Decor" || p.department === "Furniture").slice(0, 6);
      content = "Here are some beautiful decor and furniture pieces to transform your space! 🏠";
    }
    // General product search
    else {
      products = searchProducts(query).slice(0, 6);
      if (products.length > 0) {
        content = `Found **${products.length} products** matching your search. Here they are:`;
      } else {
        content = "I couldn't find exact matches, but here are some trending picks you might like!";
        products = allProducts.sort(() => Math.random() - 0.5).slice(0, 4);
      }
    }

    return { role: "assistant", content, products };
  };

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    
    const userMsg: Message = { role: "user", content: msg };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const response = getAIResponse(msg);
      setMessages(prev => [...prev, response]);
      setLoading(false);
    }, 600);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[70vh] bg-card rounded-2xl card-shadow border border-border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="gradient-hero p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
                <span className="font-display font-bold text-primary-foreground">Shopping Copilot</span>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[50vh]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2" : ""}`}>
                    {msg.role === "assistant" ? (
                      <div>
                        <div className="text-sm text-foreground prose prose-sm max-w-none">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                        {msg.products && msg.products.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            {msg.products.map(p => (
                              <ProductCard key={p.id} product={p} compact />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-1 px-3">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickActions.map((a, i) => (
                  <button key={i} onClick={() => handleSend(a.query)} className="flex items-center gap-1.5 text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full hover:bg-secondary/80 transition-colors">
                    <a.icon className="h-3 w-3" />
                    {a.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="p-3 border-t border-border flex gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 h-10"
                disabled={loading}
              />
              <Button type="submit" size="icon" className="h-10 w-10 shrink-0" disabled={loading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-hero flex items-center justify-center card-shadow-hover"
      >
        {open ? <X className="h-6 w-6 text-primary-foreground" /> : <MessageSquare className="h-6 w-6 text-primary-foreground" />}
      </motion.button>
    </>
  );
};

export default ChatBot;
