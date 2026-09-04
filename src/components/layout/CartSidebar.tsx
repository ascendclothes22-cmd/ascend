"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export function CartSidebar() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, getSubtotal, getTotal, coupon, discount, applyCoupon, removeCoupon } = useCartStore();
  const subtotal = getSubtotal();
  const total = getTotal();

  const [couponInput, setCouponInput] = useState("");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[80]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-ascend-black border-l border-white/5 z-[90] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-ascend-accent" />
                <h2 className="text-lg font-heading font-bold uppercase tracking-wider">
                  Cart ({items.length})
                </h2>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 text-ascend-gray hover:text-ascend-white transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-ascend-gray/30 mb-4" />
                  <p className="text-ascend-gray font-heading uppercase tracking-wider mb-4">
                    Your cart is empty
                  </p>
                  <Link
                    href="/shop"
                    onClick={() => setCartOpen(false)}
                    className="btn-primary"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4"
                    >
                      {/* Image Placeholder */}
                      <div className="w-20 h-24 bg-white/5 flex-shrink-0 flex items-center justify-center">
                        <span className="text-xs text-ascend-gray font-heading">
                          {item.product.name.split(" ")[0]}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-sm font-heading font-semibold text-ascend-white truncate">
                              {item.product.name}
                            </h3>
                            <p className="text-xs text-ascend-gray mt-0.5">
                              {item.size} / {item.color}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-ascend-gray hover:text-red-500 transition-colors flex-shrink-0"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-white/10">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 text-ascend-gray hover:text-ascend-white transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-sm font-heading min-w-[30px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 text-ascend-gray hover:text-ascend-white transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-sm font-heading font-semibold text-ascend-accent">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Coupon & Total */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/5 space-y-4">
                {/* Coupon */}
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
                    <span className="text-green-500">
                      {coupon} applied ({discount}% off)
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-red-500 hover:underline text-xs"
                    >
                      Remove
                    </button>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-ascend-gray">
                    <span>Subtotal</span>
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
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/5">
                    <span className="text-base font-heading font-bold">Total</span>
                    <span className="text-base font-heading font-bold text-ascend-accent">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  Checkout
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setCartOpen(false)}
                  className="btn-outline w-full flex items-center justify-center text-xs"
                >
                  View Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
