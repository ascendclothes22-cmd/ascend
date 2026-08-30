"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, Grid3X3, LayoutList } from "lucide-react";
import { products, categories } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const { addItem, setCartOpen } = useCartStore();

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    switch (sort) {
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [search, category, sort]);

  return (
    <div className="pt-24 lg:pt-32 pb-24">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl lg:text-6xl font-heading font-bold">
            Shop <span className="text-gradient">ASCEND</span>
          </h1>
          <p className="mt-3 text-ascend-gray max-w-lg">
            Every piece forged with purpose. Built for the relentless.
          </p>
        </motion.div>

        {/* Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ascend-gray" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 h-10 pl-10 pr-4 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/50 focus:outline-none focus:border-ascend-accent font-body transition-all"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden h-10 px-3 border border-white/10 flex items-center gap-2 text-sm text-ascend-gray hover:text-ascend-white hover:border-ascend-accent transition-all"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-10 px-3 text-sm bg-white/5 border border-white/10 text-ascend-white focus:outline-none focus:border-ascend-accent font-body appearance-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-ascend-black">
                  {opt.label}
                </option>
              ))}
            </select>

            <span className="text-sm text-ascend-gray">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </motion.div>

        <div className="flex gap-8">
          {/* Sidebar Categories - Desktop */}
          <div className={`lg:block ${showFilters ? "block" : "hidden"} w-full lg:w-48 flex-shrink-0`}>
            <div className="sticky top-28">
              <h3 className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-ascend-white mb-4">
                Categories
              </h3>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <button
                      onClick={() => {
                        setCategory(cat.slug);
                        setShowFilters(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm transition-all duration-200 flex items-center justify-between ${
                        category === cat.slug
                          ? "text-ascend-accent bg-ascend-accent/5 border-l-2 border-ascend-accent"
                          : "text-ascend-gray hover:text-ascend-white border-l-2 border-transparent"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-ascend-gray/50">{cat.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-ascend-gray font-heading uppercase tracking-wider">
                  No products found
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("all");
                  }}
                  className="mt-4 text-sm text-ascend-accent hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group"
                  >
                    <Link href={`/product/${product.slug}`}>
                      <div className="relative aspect-[3/4] bg-white/[0.02] border border-white/5 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-heading font-bold text-white/[0.05] group-hover:text-white/[0.1] transition-all duration-500 group-hover:scale-110">
                            {product.name.split(" ")[0]}
                          </span>
                        </div>

                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                          {product.new && <Badge variant="new">New</Badge>}
                          {product.comparePrice && (
                            <Badge variant="accent">
                              {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                            </Badge>
                          )}
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              addItem(product, product.sizes[2] || product.sizes[0], product.colors[0]?.name || "Black");
                              setCartOpen(true);
                            }}
                            className="w-full btn-primary text-xs py-2.5 flex items-center justify-center gap-2"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Quick Add
                          </button>
                        </div>

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                    </Link>

                    <div className="mt-3">
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="text-sm font-heading font-semibold text-ascend-white group-hover:text-ascend-accent transition-colors truncate">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2 mt-1">
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
