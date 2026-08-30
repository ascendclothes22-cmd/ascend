"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ShoppingBag, Star, TrendingUp } from "lucide-react";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import { Badge } from "@/components/ui/Badge";
import { t } from "@/lib/i18n";

export function BestSellers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { addItem, setCartOpen } = useCartStore();

  const bestSellers = [...products]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 4);

  return (
    <section ref={ref} className="py-24 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ascend-black via-[#0d0d0d] to-ascend-black" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border border-ascend-accent/30">
            <TrendingUp className="w-3.5 h-3.5 text-ascend-accent" />
            <span className="text-[10px] font-heading uppercase tracking-[0.4em] text-ascend-accent">
              {t("bestSellers")}
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold">
            {t("bestSellers")}
          </h2>
          <p className="mt-4 text-ascend-gray max-w-md mx-auto">
            {t("bestSellersDesc")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative"
            >
              <Link href={`/product/${product.slug}`} className="block">
                <div className="relative aspect-[3/4] bg-white/[0.02] border border-white/5 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-heading font-bold text-white/[0.05] group-hover:text-white/[0.1] transition-all duration-500 group-hover:scale-110">
                      {product.name.split(" ")[0]}
                    </span>
                  </div>

                  {/* Rank Badge */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-ascend-accent flex items-center justify-center">
                    <span className="text-xs font-heading font-bold text-white">
                      #{i + 1}
                    </span>
                  </div>

                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.new && <Badge variant="new">{t("newArrival")}</Badge>}
                    {product.comparePrice && (
                      <Badge variant="accent">
                        {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addItem(product, product.sizes[2] || product.sizes[0], product.colors[0]?.name || "Black");
                        setCartOpen(true);
                      }}
                      className="w-full btn-primary text-xs py-2.5 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      {t("quickAdd")}
                    </button>
                  </div>

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </Link>

              <div className="mt-4">
                <Link href={`/product/${product.slug}`}>
                  <h3 className="text-sm font-heading font-semibold text-ascend-white group-hover:text-ascend-accent transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-ascend-accent text-ascend-accent" />
                    <span className="text-xs text-ascend-gray">{product.rating}</span>
                  </div>
                  <span className="text-xs text-ascend-gray/40">({product.reviewCount})</span>
                </div>
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
