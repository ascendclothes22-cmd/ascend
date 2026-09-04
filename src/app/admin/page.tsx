"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Package, ShoppingCart, Users, TrendingUp,
  Plus, Edit2, Trash2, Eye, ChevronDown, BarChart3, DollarSign,
  Search, X, Check, Clock, Truck, CheckCircle, AlertCircle,
  Download, Filter, Bell, Mail, Send, CheckCircle2,
} from "lucide-react";
import { products, mockOrders, adminStats } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import type { Product, Order, OrderStatus } from "@/lib/types";

type Tab = "dashboard" | "products" | "orders" | "customers" | "inventory" | "analytics" | "notifications";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [localProducts, setLocalProducts] = useState<Product[]>(products);
  const [localOrders, setLocalOrders] = useState<Order[]>(mockOrders);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [searchOrders, setSearchOrders] = useState("");
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    category: "tees",
    stock: "",
    description: "",
  });

  const [notifications, setNotifications] = useState<{ id: string; type: string; subject: string; recipient: string; status: string; createdAt: string; orderId?: string }[]>([]);
  const [notificationLoading, setNotificationLoading] = useState(false);

  const navItems: { id: Tab; icon: typeof LayoutDashboard; label: string }[] = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "products", icon: Package, label: "Products" },
    { id: "orders", icon: ShoppingCart, label: "Orders" },
    { id: "customers", icon: Users, label: "Customers" },
    { id: "inventory", icon: AlertCircle, label: "Inventory" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "notifications", icon: Bell, label: "Notifications" },
  ];

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setLocalOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o))
    );
  };

  const deleteProduct = (id: string) => {
    setLocalProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSaveProduct = () => {
    if (editingProduct) {
      setLocalProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: productForm.name || p.name,
                price: Number(productForm.price) || p.price,
                stock: Number(productForm.stock) || p.stock,
                category: productForm.category || p.category,
                description: productForm.description || p.description,
              }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        id: String(Date.now()),
        name: productForm.name || "New Product",
        slug: (productForm.name || "new-product").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description: productForm.description || "",
        price: Number(productForm.price) || 0,
        images: ["/products/default.jpg"],
        category: productForm.category,
        tags: ["new"],
        sizes: ["S", "M", "L", "XL"],
        colors: [{ name: "Black", hex: "#0A0A0A", images: [] }],
        stock: Number(productForm.stock) || 0,
        featured: false,
        new: true,
        rating: 0,
        reviewCount: 0,
        createdAt: new Date().toISOString(),
      };
      setLocalProducts((prev) => [newProduct, ...prev]);
    }
    setShowProductForm(false);
    setEditingProduct(null);
    setProductForm({ name: "", price: "", category: "tees", stock: "", description: "" });
  };

  const fetchNotifications = async () => {
    setNotificationLoading(true);
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch {
      // Use mock data as fallback
      setNotifications([
        { id: "1", type: "order_confirmation", subject: "Order Confirmed — ASC-2025-0001", recipient: "ahmed@example.com", status: "sent", createdAt: new Date().toISOString(), orderId: "ASC-2025-0001" },
        { id: "2", type: "admin_order_alert", subject: "New Order: ASC-2025-0002 — $149.00", recipient: "admin@ascend.com", status: "sent", createdAt: new Date(Date.now() - 3600000).toISOString(), orderId: "ASC-2025-0002" },
        { id: "3", type: "contact_form", subject: "[ASCEND] Partnership Inquiry", recipient: "admin@ascend.com", status: "sent", createdAt: new Date(Date.now() - 7200000).toISOString() },
        { id: "4", type: "low_stock_alert", subject: "Low Stock Alert — 2 products need restocking", recipient: "admin@ascend.com", status: "sent", createdAt: new Date(Date.now() - 86400000).toISOString() },
      ]);
    }
    setNotificationLoading(false);
  };

  const sendTestNotification = async (type: string) => {
    try {
      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          data: type === "low_stock_alert"
            ? lowStockProducts.slice(0, 2)
            : type === "contact_form"
            ? { name: "Test User", email: "test@example.com", subject: "Test Message", message: "This is a test notification from the admin panel." }
            : mockOrders[0],
        }),
      });
      fetchNotifications();
    } catch {
      // Silently fail
    }
  };

  const filteredOrders = localOrders.filter(
    (o) =>
      o.orderNumber.toLowerCase().includes(searchOrders.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchOrders.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ["Order #", "Customer", "Phone", "City", "Total", "Status", "Date"];
    const rows = localOrders.map((o) => [
      o.orderNumber,
      o.customerName,
      o.phone,
      o.city,
      String(o.total),
      o.status,
      new Date(o.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ascend-orders-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const lowStockProducts = localProducts.filter((p) => p.stock < 20);
  const totalRevenue = localOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="min-h-screen flex bg-ascend-black">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 bg-ascend-black border-r border-white/5 flex-col fixed top-0 bottom-0 z-30">
        <div className="p-6 border-b border-white/5">
          <span className="text-sm font-heading font-bold tracking-[0.2em] text-ascend-white">
            ASCEND
          </span>
          <span className="block text-[8px] font-heading tracking-[0.4em] text-ascend-accent -mt-0.5">
            ADMIN PANEL
          </span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-heading uppercase tracking-wider transition-all ${
                activeTab === item.id
                  ? "text-ascend-accent bg-ascend-accent/5"
                  : "text-ascend-gray hover:text-ascend-white hover:bg-white/[0.02]"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
              {item.id === "inventory" && lowStockProducts.length > 0 && (
                <span className="ml-auto text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                  {lowStockProducts.length}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Nav */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-ascend-black border-b border-white/5 z-40 flex overflow-x-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-heading uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${
              activeTab === item.id
                ? "text-ascend-accent border-ascend-accent"
                : "text-ascend-gray border-transparent"
            }`}
          >
            <item.icon className="w-3.5 h-3.5" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-8">

          {/* ========== DASHBOARD ========== */}
          {activeTab === "dashboard" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-3xl font-heading font-bold mb-8">Dashboard</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Orders", value: localOrders.length, icon: ShoppingCart, color: "text-blue-400" },
                  { label: "Revenue", value: formatPrice(totalRevenue), icon: DollarSign, color: "text-green-400" },
                  { label: "Products", value: localProducts.length, icon: Package, color: "text-purple-400" },
                  { label: "Conversion", value: `${adminStats.conversionRate}%`, icon: TrendingUp, color: "text-ascend-accent" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-heading uppercase tracking-wider text-ascend-gray">
                        {stat.label}
                      </span>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                    <p className="text-2xl font-heading font-bold">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Low Stock Alert */}
              {lowStockProducts.length > 0 && (
                <div className="glass p-5 mb-8 border-l-4 border-red-500">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <h3 className="text-sm font-heading font-bold text-red-500 uppercase tracking-wider">
                      Low Stock Alert
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {lowStockProducts.map((p) => (
                      <div key={p.id} className="flex items-center justify-between text-sm">
                        <span className="text-ascend-gray">{p.name}</span>
                        <span className="text-red-500 font-heading font-bold">{p.stock} units left</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass p-6">
                  <h3 className="text-sm font-heading font-bold uppercase tracking-wider mb-6">Daily Sales</h3>
                  <div className="flex items-end gap-2 h-40">
                    {adminStats.dailySales.map((day, i) => {
                      const maxAmount = Math.max(...adminStats.dailySales.map((d) => d.amount));
                      const height = (day.amount / maxAmount) * 100;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full relative group">
                            <div
                              className="bg-ascend-accent/80 hover:bg-ascend-accent transition-all w-full rounded-t"
                              style={{ height: `${height}px` }}
                            />
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-ascend-black border border-white/10 px-2 py-1 text-[10px] font-heading whitespace-nowrap z-10">
                              {formatPrice(day.amount)}
                            </div>
                          </div>
                          <span className="text-[10px] text-ascend-gray font-heading">{day.date}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="glass p-6">
                  <h3 className="text-sm font-heading font-bold uppercase tracking-wider mb-6">Top Products</h3>
                  <div className="space-y-4">
                    {adminStats.topProducts.map((p, i) => {
                      const maxSold = Math.max(...adminStats.topProducts.map((t) => t.sold));
                      return (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm">{p.name}</span>
                            <span className="text-xs font-heading text-ascend-accent">{p.sold} sold</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5">
                            <div
                              className="h-full bg-ascend-accent transition-all rounded"
                              style={{ width: `${(p.sold / maxSold) * 100}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========== PRODUCTS ========== */}
          {activeTab === "products" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-heading font-bold">Products</h1>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setProductForm({ name: "", price: "", category: "tees", stock: "", description: "" });
                    setShowProductForm(true);
                  }}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 font-heading font-semibold text-ascend-gray text-xs uppercase tracking-wider">Product</th>
                      <th className="text-left py-3 font-heading font-semibold text-ascend-gray text-xs uppercase tracking-wider">Category</th>
                      <th className="text-left py-3 font-heading font-semibold text-ascend-gray text-xs uppercase tracking-wider">Price</th>
                      <th className="text-left py-3 font-heading font-semibold text-ascend-gray text-xs uppercase tracking-wider">Stock</th>
                      <th className="text-left py-3 font-heading font-semibold text-ascend-gray text-xs uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {localProducts.map((product) => (
                      <tr key={product.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-12 bg-white/5 flex items-center justify-center">
                              <span className="text-[8px] font-heading text-ascend-gray">{product.id}</span>
                            </div>
                            <div>
                              <p className="font-heading font-semibold">{product.name}</p>
                              <p className="text-xs text-ascend-gray">{product.sizes.join(", ")}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 capitalize">{product.category}</td>
                        <td className="py-4 font-heading font-semibold text-ascend-accent">
                          {formatPrice(product.price)}
                        </td>
                        <td className="py-4">
                          <span className={`text-xs font-heading ${product.stock < 20 ? "text-red-500" : product.stock < 50 ? "text-yellow-500" : "text-green-500"}`}>
                            {product.stock} units
                            {product.stock < 20 && <AlertCircle className="inline w-3 h-3 ml-1" />}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingProduct(product);
                                setProductForm({
                                  name: product.name,
                                  price: String(product.price),
                                  category: product.category,
                                  stock: String(product.stock),
                                  description: product.description,
                                });
                                setShowProductForm(true);
                              }}
                              className="p-2 text-ascend-gray hover:text-ascend-accent transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="p-2 text-ascend-gray hover:text-red-500 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Product Form Modal */}
              <AnimatePresence>
                {showProductForm && (
                  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setShowProductForm(false)}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-ascend-black border border-white/10 p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-heading font-bold">
                          {editingProduct ? "Edit Product" : "Add Product"}
                        </h3>
                        <button onClick={() => setShowProductForm(false)} className="text-ascend-gray hover:text-ascend-white">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ascend-gray mb-2">Name</label>
                          <input
                            type="text"
                            value={productForm.name}
                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            placeholder="Product name"
                            className="w-full h-11 px-4 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/40 focus:outline-none focus:border-ascend-accent font-body"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ascend-gray mb-2">Price ($)</label>
                            <input
                              type="number"
                              value={productForm.price}
                              onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                              placeholder="0"
                              className="w-full h-11 px-4 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/40 focus:outline-none focus:border-ascend-accent font-body"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ascend-gray mb-2">Stock</label>
                            <input
                              type="number"
                              value={productForm.stock}
                              onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                              placeholder="0"
                              className="w-full h-11 px-4 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/40 focus:outline-none focus:border-ascend-accent font-body"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ascend-gray mb-2">Category</label>
                          <select
                            value={productForm.category}
                            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                            className="w-full h-11 px-4 text-sm bg-white/5 border border-white/10 text-ascend-white focus:outline-none focus:border-ascend-accent font-body appearance-none"
                          >
                            <option value="tees" className="bg-ascend-black">Tees</option>
                            <option value="hoodies" className="bg-ascend-black">Hoodies</option>
                            <option value="joggers" className="bg-ascend-black">Joggers</option>
                            <option value="outerwear" className="bg-ascend-black">Outerwear</option>
                            <option value="accessories" className="bg-ascend-black">Accessories</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ascend-gray mb-2">Description</label>
                          <textarea
                            value={productForm.description}
                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                            placeholder="Product description"
                            rows={3}
                            className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/40 focus:outline-none focus:border-ascend-accent font-body resize-none"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <button onClick={handleSaveProduct} className="btn-primary flex-1">
                          {editingProduct ? "Save Changes" : "Create Product"}
                        </button>
                        <button onClick={() => setShowProductForm(false)} className="btn-outline">
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ========== ORDERS ========== */}
          {activeTab === "orders" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-heading font-bold">Orders</h1>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ascend-gray" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      value={searchOrders}
                      onChange={(e) => setSearchOrders(e.target.value)}
                      className="h-10 pl-10 pr-4 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/40 focus:outline-none focus:border-ascend-accent font-body"
                    />
                  </div>
                  <button onClick={exportCSV} className="h-10 px-4 text-xs font-heading uppercase tracking-wider border border-white/20 text-ascend-white hover:border-ascend-accent hover:text-ascend-accent transition-all flex items-center gap-2">
                    <Download className="w-3.5 h-3.5" />
                    Export CSV
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="glass p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-base font-heading font-bold">{order.orderNumber}</h3>
                        <p className="text-xs text-ascend-gray mt-0.5">
                          {order.customerName} • {order.phone} • {order.city}
                        </p>
                        <p className="text-xs text-ascend-gray">{order.address}</p>
                        {order.notes && (
                          <p className="text-xs text-ascend-accent mt-1">Note: {order.notes}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-heading font-bold text-ascend-accent">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      {order.items.map((item, i) => (
                        <span key={i} className="inline-block text-xs bg-white/5 px-2 py-1 mr-2 mb-1 text-ascend-gray">
                          {item.productName} ({item.size}) × {item.quantity}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-ascend-gray font-heading uppercase tracking-wider mr-2">Status:</span>
                      {(["pending", "confirmed", "shipped", "delivered", "cancelled"] as OrderStatus[]).map((status) => (
                        <button
                          key={status}
                          onClick={() => updateOrderStatus(order.id, status)}
                          className={`text-xs font-heading uppercase tracking-wider px-3 py-1.5 transition-all ${
                            order.status === status
                              ? status === "delivered"
                                ? "bg-green-500/20 text-green-500 border border-green-500/30"
                                : status === "cancelled"
                                ? "bg-red-500/20 text-red-500 border border-red-500/30"
                                : status === "shipped"
                                ? "bg-blue-500/20 text-blue-500 border border-blue-500/30"
                                : "bg-ascend-accent/20 text-ascend-accent border border-ascend-accent/30"
                              : "border border-white/10 text-ascend-gray hover:border-white/20 hover:text-ascend-white"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>

                    <p className="text-[10px] text-ascend-gray/50 mt-3">
                      Placed: {new Date(order.createdAt).toLocaleDateString()} •
                      Updated: {new Date(order.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ========== CUSTOMERS ========== */}
          {activeTab === "customers" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-3xl font-heading font-bold mb-8">Customers</h1>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 font-heading font-semibold text-ascend-gray text-xs uppercase tracking-wider">Name</th>
                      <th className="text-left py-3 font-heading font-semibold text-ascend-gray text-xs uppercase tracking-wider">Phone</th>
                      <th className="text-left py-3 font-heading font-semibold text-ascend-gray text-xs uppercase tracking-wider">City</th>
                      <th className="text-left py-3 font-heading font-semibold text-ascend-gray text-xs uppercase tracking-wider">Orders</th>
                      <th className="text-left py-3 font-heading font-semibold text-ascend-gray text-xs uppercase tracking-wider">Total Spent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const customerMap = new Map<string, { phone: string; city: string; orders: number; spent: number }>();
                      localOrders.forEach((o) => {
                        const existing = customerMap.get(o.customerName);
                        if (existing) {
                          existing.orders += 1;
                          existing.spent += o.total;
                        } else {
                          customerMap.set(o.customerName, {
                            phone: o.phone,
                            city: o.city,
                            orders: 1,
                            spent: o.total,
                          });
                        }
                      });
                      return Array.from(customerMap.entries()).map(([name, data], i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 font-heading font-semibold">{name}</td>
                          <td className="py-4 text-ascend-gray">{data.phone}</td>
                          <td className="py-4 text-ascend-gray">{data.city}</td>
                          <td className="py-4">
                            <span className="bg-ascend-accent/10 text-ascend-accent px-2 py-1 text-xs font-heading">
                              {data.orders}
                            </span>
                          </td>
                          <td className="py-4 font-heading font-semibold text-ascend-accent">
                            {formatPrice(data.spent)}
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ========== INVENTORY ========== */}
          {activeTab === "inventory" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-3xl font-heading font-bold mb-8">Inventory Management</h1>

              {lowStockProducts.length > 0 && (
                <div className="glass p-6 mb-8 border-l-4 border-red-500">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <h3 className="text-lg font-heading font-bold text-red-500">
                      Low Stock Alert ({lowStockProducts.length} products)
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {lowStockProducts.map((p) => (
                      <div key={p.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-12 bg-white/5 flex items-center justify-center">
                            <span className="text-[8px] font-heading text-ascend-gray">{p.id}</span>
                          </div>
                          <div>
                            <p className="font-heading font-semibold">{p.name}</p>
                            <p className="text-xs text-ascend-gray capitalize">{p.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-sm font-heading font-bold ${p.stock < 10 ? "text-red-500" : "text-yellow-500"}`}>
                            {p.stock} units
                          </span>
                          <span className="text-sm font-heading text-ascend-accent">{formatPrice(p.price)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="glass p-6">
                <h3 className="text-sm font-heading font-bold uppercase tracking-wider mb-6">All Products Stock</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 font-heading font-semibold text-ascend-gray text-xs uppercase tracking-wider">Product</th>
                        <th className="text-left py-3 font-heading font-semibold text-ascend-gray text-xs uppercase tracking-wider">Stock</th>
                        <th className="text-left py-3 font-heading font-semibold text-ascend-gray text-xs uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {localProducts.map((p) => (
                        <tr key={p.id} className="border-b border-white/5">
                          <td className="py-3 font-heading">{p.name}</td>
                          <td className="py-3 font-heading font-bold">{p.stock}</td>
                          <td className="py-3">
                            <span className={`text-xs font-heading uppercase px-2 py-1 ${
                              p.stock === 0
                                ? "bg-red-500/10 text-red-500"
                                : p.stock < 20
                                ? "bg-red-500/10 text-red-500"
                                : p.stock < 50
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-green-500/10 text-green-500"
                            }`}>
                              {p.stock === 0 ? "Out of Stock" : p.stock < 20 ? "Critical" : p.stock < 50 ? "Low" : "In Stock"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========== ANALYTICS ========== */}
          {activeTab === "analytics" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-3xl font-heading font-bold mb-8">Analytics</h1>

              {/* Revenue Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="glass p-6">
                  <p className="text-xs font-heading uppercase tracking-wider text-ascend-gray mb-2">Total Revenue</p>
                  <p className="text-3xl font-heading font-bold text-ascend-accent">{formatPrice(totalRevenue)}</p>
                  <p className="text-xs text-green-500 mt-1">↑ 12.5% from last month</p>
                </div>
                <div className="glass p-6">
                  <p className="text-xs font-heading uppercase tracking-wider text-ascend-gray mb-2">Avg. Order Value</p>
                  <p className="text-3xl font-heading font-bold">
                    {formatPrice(localOrders.length > 0 ? totalRevenue / localOrders.length : 0)}
                  </p>
                  <p className="text-xs text-green-500 mt-1">↑ 8.3% from last month</p>
                </div>
                <div className="glass p-6">
                  <p className="text-xs font-heading uppercase tracking-wider text-ascend-gray mb-2">Revenue Per Product</p>
                  <p className="text-3xl font-heading font-bold">
                    {formatPrice(localProducts.length > 0 ? totalRevenue / localProducts.length : 0)}
                  </p>
                  <p className="text-xs text-ascend-gray mt-1">Based on current products</p>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="glass p-6 mb-8">
                <h3 className="text-sm font-heading font-bold uppercase tracking-wider mb-6">Weekly Revenue</h3>
                <div className="flex items-end gap-3 h-64">
                  {adminStats.dailySales.map((day, i) => {
                    const maxAmount = Math.max(...adminStats.dailySales.map((d) => d.amount));
                    const height = (day.amount / maxAmount) * 100;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full relative group flex justify-center">
                          <div
                            className="bg-gradient-to-t from-ascend-accent to-ascend-accent-light hover:from-ascend-accent-dark hover:to-ascend-accent transition-all w-full max-w-[60px] rounded-t"
                            style={{ height: `${height * 2}px` }}
                          />
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block bg-ascend-black border border-white/10 px-3 py-1.5 text-xs font-heading whitespace-nowrap z-10">
                            {formatPrice(day.amount)}
                          </div>
                        </div>
                        <span className="text-[10px] text-ascend-gray font-heading">{day.date}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Product Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass p-6">
                  <h3 className="text-sm font-heading font-bold uppercase tracking-wider mb-6">Product Performance</h3>
                  <div className="space-y-4">
                    {adminStats.topProducts.map((p, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-ascend-accent/10 text-ascend-accent text-xs font-heading font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">{p.name}</span>
                            <span className="text-xs font-heading text-ascend-accent">{p.sold} units</span>
                          </div>
                          <div className="w-full h-1 bg-white/5">
                            <div
                              className="h-full bg-ascend-accent/60"
                              style={{ width: `${(p.sold / adminStats.topProducts[0].sold) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass p-6">
                  <h3 className="text-sm font-heading font-bold uppercase tracking-wider mb-6">Category Breakdown</h3>
                  <div className="space-y-4">
                    {["tees", "hoodies", "joggers", "outerwear", "accessories"].map((cat) => {
                      const count = localProducts.filter((p) => p.category === cat).length;
                      const percentage = localProducts.length > 0 ? (count / localProducts.length) * 100 : 0;
                      return (
                        <div key={cat}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm capitalize">{cat}</span>
                            <span className="text-xs font-heading text-ascend-gray">{count} products</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5">
                            <div
                              className="h-full bg-ascend-accent/60 rounded"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========== NOTIFICATIONS ========== */}
          {activeTab === "notifications" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-heading font-bold">Notifications</h1>
                <div className="flex items-center gap-3">
                  <button
                    onClick={fetchNotifications}
                    className="h-10 px-4 text-xs font-heading uppercase tracking-wider border border-white/20 text-ascend-white hover:border-ascend-accent hover:text-ascend-accent transition-all flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Refresh
                  </button>
                </div>
              </div>

              {/* Quick Send */}
              <div className="glass p-6 mb-8">
                <h3 className="text-sm font-heading font-bold uppercase tracking-wider mb-4">Send Test Notification</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => sendTestNotification("order_confirmation")}
                    className="h-9 px-4 text-xs font-heading uppercase tracking-wider border border-white/10 text-ascend-gray hover:border-ascend-accent hover:text-ascend-accent transition-all flex items-center gap-2"
                  >
                    <Mail className="w-3 h-3" />
                    Order Confirmation
                  </button>
                  <button
                    onClick={() => sendTestNotification("admin_order_alert")}
                    className="h-9 px-4 text-xs font-heading uppercase tracking-wider border border-white/10 text-ascend-gray hover:border-ascend-accent hover:text-ascend-accent transition-all flex items-center gap-2"
                  >
                    <Bell className="w-3 h-3" />
                    Admin Alert
                  </button>
                  <button
                    onClick={() => sendTestNotification("low_stock_alert")}
                    className="h-9 px-4 text-xs font-heading uppercase tracking-wider border border-white/10 text-ascend-gray hover:border-ascend-accent hover:text-ascend-accent transition-all flex items-center gap-2"
                  >
                    <AlertCircle className="w-3 h-3" />
                    Low Stock Alert
                  </button>
                  <button
                    onClick={() => sendTestNotification("contact_form")}
                    className="h-9 px-4 text-xs font-heading uppercase tracking-wider border border-white/10 text-ascend-gray hover:border-ascend-accent hover:text-ascend-accent transition-all flex items-center gap-2"
                  >
                    <Mail className="w-3 h-3" />
                    Contact Form
                  </button>
                </div>
              </div>

              {/* Notification Log */}
              <div className="glass p-6">
                <h3 className="text-sm font-heading font-bold uppercase tracking-wider mb-6">Notification History</h3>
                {notificationLoading ? (
                  <div className="text-center py-12">
                    <div className="w-8 h-8 border-2 border-white/10 border-t-ascend-accent rounded-full animate-spin mx-auto" />
                    <p className="text-sm text-ascend-gray mt-3">Loading notifications...</p>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="w-12 h-12 mx-auto text-ascend-gray/20 mb-4" />
                    <p className="text-ascend-gray font-heading uppercase tracking-wider">No notifications yet</p>
                    <p className="text-xs text-ascend-gray/50 mt-2">Notifications will appear here when emails are sent.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="flex items-start gap-4 p-4 border border-white/5 hover:border-white/10 transition-colors">
                        <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center ${
                          notif.type === "order_confirmation"
                            ? "bg-green-500/10"
                            : notif.type === "admin_order_alert"
                            ? "bg-blue-500/10"
                            : notif.type === "low_stock_alert"
                            ? "bg-red-500/10"
                            : "bg-ascend-accent/10"
                        }`}>
                          {notif.type === "order_confirmation" ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : notif.type === "admin_order_alert" ? (
                            <Bell className="w-4 h-4 text-blue-500" />
                          ) : notif.type === "low_stock_alert" ? (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          ) : (
                            <Mail className="w-4 h-4 text-ascend-accent" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-heading font-semibold truncate">{notif.subject}</h4>
                            <span className={`text-[10px] font-heading uppercase px-2 py-0.5 ${
                              notif.status === "sent"
                                ? "bg-green-500/10 text-green-500"
                                : notif.status === "failed"
                                ? "bg-red-500/10 text-red-500"
                                : "bg-yellow-500/10 text-yellow-500"
                            }`}>
                              {notif.status}
                            </span>
                          </div>
                          <p className="text-xs text-ascend-gray mt-0.5">
                            To: {notif.recipient}
                            {notif.orderId && ` • Order: ${notif.orderId}`}
                          </p>
                          <p className="text-[10px] text-ascend-gray/50 mt-1">
                            {new Date(notif.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <span className={`text-[10px] font-heading uppercase tracking-wider px-2 py-1 ${
                            notif.type === "order_confirmation"
                              ? "text-green-400 bg-green-400/10"
                              : notif.type === "admin_order_alert"
                              ? "text-blue-400 bg-blue-400/10"
                              : notif.type === "low_stock_alert"
                              ? "text-red-400 bg-red-400/10"
                              : "text-ascend-accent bg-ascend-accent/10"
                          }`}>
                            {notif.type.replace(/_/g, " ")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Email Config Status */}
              <div className="glass p-6 mt-6">
                <h3 className="text-sm font-heading font-bold uppercase tracking-wider mb-4">Email Configuration</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <div>
                      <p className="text-sm font-heading">SMTP Provider</p>
                      <p className="text-xs text-ascend-gray">Gmail / Custom</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div>
                      <p className="text-sm font-heading">Environment</p>
                      <p className="text-xs text-ascend-gray">Configure .env.local</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <div>
                      <p className="text-sm font-heading">Templates</p>
                      <p className="text-xs text-ascend-gray">6 email templates</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white/[0.02] border border-white/5">
                  <p className="text-xs text-ascend-gray font-heading uppercase tracking-wider mb-2">Required Environment Variables</p>
                  <code className="text-xs text-ascend-accent font-mono block">
                    SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, ADMIN_EMAIL
                  </code>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}

