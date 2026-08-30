"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight, Tag } from "lucide-react";
import { blogPosts, blogCategories } from "@/lib/blog-data";
import type { Metadata } from "next";

const categoryColors: Record<string, string> = {
  Motivation: "text-yellow-400 border-yellow-400/30",
  Fitness: "text-green-400 border-green-400/30",
  Discipline: "text-ascend-accent border-ascend-accent/30",
  Streetwear: "text-blue-400 border-blue-400/30",
  Lifestyle: "text-purple-400 border-purple-400/30",
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <div className="pt-24 lg:pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[10px] font-heading uppercase tracking-[0.5em] text-ascend-accent">
            The ASCEND Journal
          </span>
          <h1 className="mt-4 text-5xl lg:text-6xl font-heading font-bold">
            Stories & <span className="text-gradient">Insights</span>
          </h1>
          <p className="mt-4 text-ascend-gray max-w-md mx-auto">
            Stories, insights, and motivation for the relentless.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-16"
        >
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-heading uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-ascend-accent text-white"
                  : "border border-white/10 text-ascend-gray hover:border-ascend-accent hover:text-ascend-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Featured Posts */}
        {featured.length > 0 && (
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featured.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="glass p-8 relative overflow-hidden h-full hover:border-ascend-accent/20 transition-all duration-500">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-ascend-accent/5 rounded-full blur-[60px]" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`text-[10px] font-heading uppercase tracking-[0.3em] px-3 py-1 border ${categoryColors[post.category] || "text-ascend-gray border-white/10"}`}>
                            {post.category}
                          </span>
                          <span className="text-[10px] font-heading uppercase tracking-wider text-ascend-accent border border-ascend-accent/30 px-2 py-0.5">
                            Featured
                          </span>
                        </div>
                        <h2 className="text-xl lg:text-2xl font-heading font-bold group-hover:text-ascend-accent transition-colors mb-3">
                          {post.title}
                        </h2>
                        <p className="text-sm text-ascend-gray leading-relaxed mb-6">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-ascend-gray">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </span>
                            <span>{new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                          </div>
                          <span className="text-xs font-heading uppercase tracking-wider text-ascend-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read More <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regular.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="glass p-6 h-full hover:border-ascend-accent/20 transition-all duration-500">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`text-[10px] font-heading uppercase tracking-[0.3em] px-3 py-1 border ${categoryColors[post.category] || "text-ascend-gray border-white/10"}`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-base font-heading font-bold group-hover:text-ascend-accent transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-ascend-gray leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3 text-xs text-ascend-gray">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <span className="text-xs font-heading uppercase tracking-wider text-ascend-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Tag className="w-12 h-12 mx-auto text-ascend-gray/20 mb-4" />
            <p className="text-ascend-gray font-heading uppercase tracking-wider">
              No posts in this category yet.
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-4 text-sm text-ascend-accent hover:underline"
            >
              View all posts
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
