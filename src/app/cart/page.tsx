"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getTotal, coupon, discount, applyCoupon, removeCoupon } = useCartStore();
  const [couponInput, setCouponInput] = useState("");
  const subtotal = getSubtotal();
  const total = getTotal();

  return (
    <div className="pt-24 lg:pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto section-padding">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl lg:text-5xl font-heading font-bold mb-12"
        >
          Your Cart
        </motion.h1>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <ShoppingBag className="w-20 h-20 mx-auto text-ascend-gray/20 mb-6" />
            <h2 className="text-xl font-heading font-semibold mb-2">Your cart is empty</h2>
            <p className="text-ascend-gray mb-8">Start building your ASCEND collection.</p>
            <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
              Start Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 lg:gap-6 p-4 border border-white/5 hover:border-white/10 transition-all"
                >
                  {/* Image */}
                  <div className="w-24 h-32 lg:w-32 lg:h-40 bg-white/[0.02] flex-shrink-0 flex items-center justify-center">
                    <span className="text-xs font-heading text-ascend-gray">
                      {item.product.name.split(" ")[0]}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link href={`/product/${item.product.slug}`}>
                          <h3 className="text-base font-heading font-semibold text-ascend-white hover:text-ascend-accent transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-ascend-gray mt-1">
                          Size: {item.size} | Color: {item.color}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-ascend-gray hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-ascend-gray hover:text-ascend-white transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm font-heading">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-ascend-gray hover:text-ascend-white transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-lg font-heading font-bold text-ascend-accent">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-28 h-fit"
            >
              <div className="glass p-6 space-y-6">
                <h2 className="text-lg font-heading font-bold uppercase tracking-wider">
                  Order Summary
                </h2>

                {/* Coupon */}
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 h-10 px-3 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/50 focus:outline-none focus:border-ascend-accent font-body"
                    />
                    <button
                      onClick={() => {
                        if (couponInput) applyCoupon(couponInput);
                      }}
                      className="h-10 px-4 text-xs font-heading uppercase tracking-wider border border-white/20 text-ascend-white hover:border-ascend-accent hover:text-ascend-accent transition-all"
                    >
                      Apply
                    </button>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-500">{coupon} — {discount}% off</span>
                      <button onClick={removeCoupon} className="text-red-500 text-xs hover:underline">
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-ascend-gray">
                    <span>Subtotal ({items.length} item{items.length !== 1 ? "s" : ""})</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-500">
                      <span>Discount</span>
                      <span>-{formatPrice(subtotal - total)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-ascend-gray">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-white/10">
                    <span className="text-lg font-heading font-bold">Total</span>
                    <span className="text-lg font-heading font-bold text-ascend-accent">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-ascend-gray">
                  Cash on Delivery • Pay when you receive your order
                </p>

                <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/shop"
                  className="btn-outline w-full flex items-center justify-center text-xs"
                >
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
