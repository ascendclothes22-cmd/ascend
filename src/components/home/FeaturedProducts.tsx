"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ShoppingBag, Eye } from "lucide-react";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import { Badge } from "@/components/ui/Badge";

export function FeaturedProducts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { addItem, setCartOpen } = useCartStore();

  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section ref={ref} className="py-24 lg:py-40">
      <div className="max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-16"
        >
          <div>
            <span className="text-[10px] font-heading uppercase tracking-[0.5em] text-ascend-accent">
              Featured
            </span>
            <h2 className="mt-3 text-4xl lg:text-5xl font-heading font-bold">
              Essential Collection
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-heading uppercase tracking-wider text-ascend-gray hover:text-ascend-accent transition-colors"
          >
            View All →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative"
            >
              {/* Image */}
              <Link href={`/product/${product.slug}`} className="block">
                <div className="relative aspect-[3/4] bg-white/[0.02] border border-white/5 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-heading font-bold text-white/[0.05] group-hover:text-white/[0.1] transition-all duration-500 group-hover:scale-110">
                      {product.name.split(" ")[0]}
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.new && <Badge variant="new">New</Badge>}
                    {product.comparePrice && (
                      <Badge variant="accent">
                        {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addItem(product, product.sizes[2] || product.sizes[0], product.colors[0]?.name || "Black");
                          setCartOpen(true);
                        }}
                        className="flex-1 btn-primary text-xs py-2.5 flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Quick Add
                      </button>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </Link>

              {/* Info */}
              <div className="mt-4">
                <Link href={`/product/${product.slug}`}>
                  <h3 className="text-sm font-heading font-semibold text-ascend-white group-hover:text-ascend-accent transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-sm font-heading font-bold text-ascend-accent">
                    {formatPrice(product.price)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-xs text-ascend-gray line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
