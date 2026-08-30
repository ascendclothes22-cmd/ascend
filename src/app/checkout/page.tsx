"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, getSubtotal, getTotal, coupon, discount, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const total = getTotal();
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = `ASC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`;
    setOrderNumber(num);
    setSubmitted(true);
    clearCart();
  };

  if (items.length === 0 && !submitted) {
    return (
      <div className="pt-24 lg:pt-32 pb-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 mx-auto text-ascend-gray/20 mb-6" />
          <h2 className="text-xl font-heading font-semibold mb-2">Your cart is empty</h2>
          <p className="text-ascend-gray mb-8">Add some items before checking out.</p>
          <Link href="/shop" className="btn-primary">Shop Now</Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 4);

    return (
      <div className="pt-24 lg:pt-32 pb-24 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-lg w-full px-4"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-8 relative"
          >
            <div className="absolute inset-0 bg-ascend-accent/20 rounded-full animate-ping opacity-30" />
            <div className="absolute inset-0 bg-ascend-accent/10 rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Check className="w-12 h-12 text-ascend-accent" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl lg:text-4xl font-heading font-bold mb-3"
          >
            Your ASCEND Order Has Been Received
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-ascend-gray mb-8"
          >
            Thank you for joining the movement. You&apos;ll receive a confirmation call shortly.
          </motion.p>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass p-6 mb-8 text-left"
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
              <div>
                <p className="text-[10px] text-ascend-gray uppercase tracking-wider mb-1">Order Number</p>
                <p className="text-xl font-heading font-bold text-ascend-accent">{orderNumber}</p>
              </div>
              <div className="w-12 h-12 bg-ascend-accent/10 flex items-center justify-center">
                <Check className="w-6 h-6 text-ascend-accent" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-ascend-gray uppercase tracking-wider mb-1">Payment</p>
                <p className="text-sm font-heading">Cash on Delivery</p>
              </div>
              <div>
                <p className="text-[10px] text-ascend-gray uppercase tracking-wider mb-1">Estimated Delivery</p>
                <p className="text-sm font-heading">
                  {estimatedDelivery.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-ascend-gray mb-8"
          >
            Track your order anytime from your dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link href="/track-order" className="btn-primary">
              Track Order
            </Link>
            <Link href="/shop" className="btn-outline">
              Continue Shopping
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-32 pb-24 min-h-screen">
      <div className="max-w-6xl mx-auto section-padding">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl lg:text-5xl font-heading font-bold mb-12"
        >
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="glass p-6 space-y-6">
              <h2 className="text-lg font-heading font-bold uppercase tracking-wider">
                Delivery Information
              </h2>
              <p className="text-xs text-ascend-gray">
                Cash on Delivery — Pay when your order arrives.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ascend-gray mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Ahmed Khan"
                    className="w-full h-11 px-4 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/40 focus:outline-none focus:border-ascend-accent font-body transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ascend-gray mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full h-11 px-4 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/40 focus:outline-none focus:border-ascend-accent font-body transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ascend-gray mb-2">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Karachi"
                  className="w-full h-11 px-4 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/40 focus:outline-none focus:border-ascend-accent font-body transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ascend-gray mb-2">
                  Delivery Address *
                </label>
                <textarea
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="House #, Street, Area, Landmark"
                  rows={3}
                  className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/40 focus:outline-none focus:border-ascend-accent font-body transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ascend-gray mb-2">
                  Order Notes (Optional)
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Special delivery instructions..."
                  rows={2}
                  className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/40 focus:outline-none focus:border-ascend-accent font-body transition-all resize-none"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 text-base py-4">
              <Check className="w-5 h-5" />
              Place Order — {formatPrice(total)}
            </button>

            <Link
              href="/cart"
              className="flex items-center justify-center gap-2 text-sm text-ascend-gray hover:text-ascend-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </Link>
          </motion.form>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass p-6 lg:sticky lg:top-28 space-y-6">
              <h2 className="text-lg font-heading font-bold uppercase tracking-wider">
                Your Order
              </h2>

              <div className="space-y-4 max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-18 bg-white/[0.02] flex-shrink-0 flex items-center justify-center">
                      <span className="text-[8px] font-heading text-ascend-gray">
                        {item.product.name.split(" ")[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-heading font-semibold truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-ascend-gray">
                        {item.size} / {item.color} × {item.quantity}
                      </p>
                      <p className="text-sm font-heading font-bold text-ascend-accent mt-0.5">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/5 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-ascend-gray">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-500">
                    <span>Discount ({coupon} — {discount}%)</span>
                    <span>-{formatPrice(subtotal - total)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-ascend-gray">
                  <span>Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-white/10">
                  <span className="text-lg font-heading font-bold">Total</span>
                  <span className="text-lg font-heading font-bold text-ascend-accent">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
