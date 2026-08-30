"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, User, Clock, Check, Truck, CheckCircle, Edit2, Save, Heart, Trash2, ShoppingBag } from "lucide-react";
import { mockOrders, products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "wishlist">("orders");
  const [editing, setEditing] = useState(false);
  const [wishlist, setWishlist] = useState(products.slice(0, 3));
  const [profile, setProfile] = useState({
    name: "Ahmed Khan",
    email: "ahmed@example.com",
    phone: "+92 300 1234567",
    city: "Karachi",
    address: "DHA Phase 5, Street 12",
  });

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "confirmed": return <Check className="w-4 h-4" />;
      case "shipped": return <Truck className="w-4 h-4" />;
      case "delivered": return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: "orders" as const, icon: Package, label: "Orders" },
    { id: "wishlist" as const, icon: Heart, label: "Wishlist" },
    { id: "profile" as const, icon: User, label: "Profile" },
  ];

  return (
    <div className="pt-24 lg:pt-32 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-heading font-bold">
            My <span className="text-gradient">Dashboard</span>
          </h1>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-white/5 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 text-sm font-heading uppercase tracking-wider transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-ascend-accent border-ascend-accent"
                  : "text-ascend-gray border-transparent hover:text-ascend-white"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.id === "wishlist" && (
                <span className="text-[10px] bg-ascend-accent/20 text-ascend-accent px-1.5 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Orders */}
        {activeTab === "orders" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {mockOrders.slice(0, 2).map((order) => (
              <div key={order.id} className="glass p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-base font-heading font-bold">{order.orderNumber}</h3>
                    <p className="text-xs text-ascend-gray mt-0.5">
                      Placed on {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center gap-1.5 text-xs font-heading uppercase tracking-wider px-3 py-1.5 ${
                      order.status === "delivered"
                        ? "bg-green-500/10 text-green-500"
                        : order.status === "shipped"
                        ? "bg-blue-500/10 text-blue-500"
                        : order.status === "confirmed"
                        ? "bg-ascend-accent/10 text-ascend-accent"
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}>
                      {statusIcon(order.status)}
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-ascend-gray">
                        {item.productName} ({item.size}, {item.color}) × {item.quantity}
                      </span>
                      <span className="font-heading font-semibold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between">
                  <span className="text-sm font-heading font-bold">Total</span>
                  <span className="text-sm font-heading font-bold text-ascend-accent">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            ))}

            {mockOrders.length === 0 && (
              <div className="text-center py-16">
                <Package className="w-16 h-16 mx-auto text-ascend-gray/20 mb-4" />
                <p className="text-ascend-gray font-heading uppercase tracking-wider mb-4">No orders yet</p>
                <Link href="/shop" className="btn-primary">Start Shopping</Link>
              </div>
            )}
          </motion.div>
        )}

        {/* Wishlist */}
        {activeTab === "wishlist" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {wishlist.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-16 h-16 mx-auto text-ascend-gray/20 mb-4" />
                <p className="text-ascend-gray font-heading uppercase tracking-wider mb-4">Your wishlist is empty</p>
                <Link href="/shop" className="btn-primary">Explore Collection</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlist.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass p-4 group"
                  >
                    <Link href={`/product/${product.slug}`} className="block">
                      <div className="aspect-[3/4] bg-white/[0.02] border border-white/5 mb-3 flex items-center justify-center relative overflow-hidden">
                        <span className="text-3xl font-heading font-bold text-white/[0.05] group-hover:scale-110 transition-all duration-500">
                          {product.name.split(" ")[0]}
                        </span>
                      </div>
                    </Link>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link href={`/product/${product.slug}`}>
                          <h3 className="text-sm font-heading font-semibold group-hover:text-ascend-accent transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <span className="text-sm font-heading font-bold text-ascend-accent">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/product/${product.slug}`}
                          className="p-2 text-ascend-gray hover:text-ascend-accent transition-colors"
                          title="View product"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="p-2 text-ascend-gray hover:text-red-500 transition-colors"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Profile */}
        {activeTab === "profile" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 lg:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-heading font-bold">Profile Information</h2>
              <button
                onClick={() => setEditing(!editing)}
                className="flex items-center gap-2 text-sm text-ascend-accent hover:text-ascend-accent-dark transition-colors"
              >
                {editing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                {editing ? "Save" : "Edit"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(profile).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ascend-gray mb-2 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                    value={value}
                    onChange={(e) => setProfile({ ...profile, [key]: e.target.value })}
                    disabled={!editing}
                    className="w-full h-11 px-4 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/40 focus:outline-none focus:border-ascend-accent font-body transition-all disabled:opacity-50"
                  />
                </div>
              ))}
            </div>

            {editing && (
              <button
                onClick={() => setEditing(false)}
                className="mt-6 btn-primary"
              >
                Save Changes
              </button>
            )}

            {/* Saved Addresses */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <h3 className="text-sm font-heading font-bold uppercase tracking-wider mb-4">Saved Addresses</h3>
              <div className="glass p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-heading font-semibold">Home</p>
                    <p className="text-sm text-ascend-gray mt-1">{profile.address}, {profile.city}</p>
                    <p className="text-xs text-ascend-accent mt-1">Default</p>
                  </div>
                  <button className="text-xs text-ascend-gray hover:text-ascend-accent transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
