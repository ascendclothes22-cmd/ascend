"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Search, Check, Clock, Truck, X, CheckCircle } from "lucide-react";
import { mockOrders } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import type { OrderStatus } from "@/lib/types";

const statusSteps: { status: OrderStatus; icon: typeof Package; label: string }[] = [
  { status: "pending", icon: Clock, label: "Pending" },
  { status: "confirmed", icon: Check, label: "Confirmed" },
  { status: "shipped", icon: Truck, label: "Shipped" },
  { status: "delivered", icon: CheckCircle, label: "Delivered" },
];

export default function TrackOrderPage() {
  const [orderNum, setOrderNum] = useState("");
  const [found, setFound] = useState<typeof mockOrders[0] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const order = mockOrders.find(
      (o) => o.orderNumber.toLowerCase() === orderNum.toLowerCase()
    );
    setFound(order || null);
    setSearched(true);
  };

  const currentStep = found ? statusSteps.findIndex((s) => s.status === found.status) : 0;

  return (
    <div className="pt-24 lg:pt-32 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-[10px] font-heading uppercase tracking-[0.5em] text-ascend-accent">
            Track Order
          </span>
          <h1 className="mt-4 text-5xl lg:text-6xl font-heading font-bold">
            Where&apos;s My <span className="text-gradient">Order</span>?
          </h1>
        </motion.div>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ascend-gray" />
              <input
                type="text"
                placeholder="Enter order number (e.g., ASC-2025-0001)"
                value={orderNum}
                onChange={(e) => setOrderNum(e.target.value)}
                className="w-full h-12 pl-12 pr-4 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/40 focus:outline-none focus:border-ascend-accent font-body transition-all"
              />
            </div>
            <button type="submit" className="btn-primary px-6">
              Track
            </button>
          </div>
        </form>

        {/* Result */}
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {!found ? (
              <div className="glass p-12 text-center">
                <Package className="w-16 h-16 mx-auto text-ascend-gray/30 mb-4" />
                <h2 className="text-xl font-heading font-bold mb-2">Order Not Found</h2>
                <p className="text-ascend-gray text-sm">
                  We couldn&apos;t find an order with that number. Please check and try again.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Status Progress */}
                <div className="glass p-8">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-heading font-bold">
                      Order {found.orderNumber}
                    </h2>
                    <span className={`text-xs font-heading uppercase tracking-wider px-3 py-1 ${
                      found.status === "delivered"
                        ? "bg-green-500/10 text-green-500"
                        : found.status === "cancelled"
                        ? "bg-red-500/10 text-red-500"
                        : "bg-ascend-accent/10 text-ascend-accent"
                    }`}>
                      {found.status}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-8 relative">
                    <div className="absolute top-5 left-0 right-0 h-[2px] bg-white/10" />
                    <div
                      className="absolute top-5 left-0 h-[2px] bg-ascend-accent transition-all duration-500"
                      style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
                    />
                    <div className="relative flex justify-between">
                      {statusSteps.map((step, i) => {
                        const Icon = step.icon;
                        const isActive = i <= currentStep;
                        return (
                          <div key={step.status} className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                                isActive
                                  ? "bg-ascend-accent border-ascend-accent"
                                  : "bg-transparent border-white/20"
                              }`}
                            >
                              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-ascend-gray"}`} />
                            </div>
                            <span className={`mt-2 text-[10px] font-heading uppercase tracking-wider ${
                              isActive ? "text-ascend-white" : "text-ascend-gray"
                            }`}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="glass p-6 space-y-4">
                  <h3 className="text-sm font-heading font-bold uppercase tracking-wider">
                    Delivery Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-ascend-gray text-xs mb-0.5">Name</p>
                      <p>{found.customerName}</p>
                    </div>
                    <div>
                      <p className="text-ascend-gray text-xs mb-0.5">Phone</p>
                      <p>{found.phone}</p>
                    </div>
                    <div>
                      <p className="text-ascend-gray text-xs mb-0.5">City</p>
                      <p>{found.city}</p>
                    </div>
                    <div>
                      <p className="text-ascend-gray text-xs mb-0.5">Address</p>
                      <p>{found.address}</p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="glass p-6 space-y-4">
                  <h3 className="text-sm font-heading font-bold uppercase tracking-wider">
                    Items
                  </h3>
                  {found.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div>
                        <p className="text-sm font-heading font-semibold">{item.productName}</p>
                        <p className="text-xs text-ascend-gray">
                          {item.size} / {item.color} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-heading font-bold text-ascend-accent">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <span className="font-heading font-bold">Total</span>
                    <span className="font-heading font-bold text-ascend-accent">
                      {formatPrice(found.total)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Sample Order Numbers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-ascend-gray mb-3">Try these sample order numbers:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {mockOrders.map((o) => (
              <button
                key={o.id}
                onClick={() => {
                  setOrderNum(o.orderNumber);
                }}
                className="px-3 py-1.5 text-xs font-heading border border-white/10 text-ascend-gray hover:border-ascend-accent hover:text-ascend-accent transition-all"
              >
                {o.orderNumber}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
