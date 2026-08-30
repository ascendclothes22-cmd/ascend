"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

const categoryColors: Record<string, string> = {
  Motivation: "text-yellow-400 border-yellow-400/30",
  Fitness: "text-green-400 border-green-400/30",
  Discipline: "text-ascend-accent border-ascend-accent/30",
  Streetwear: "text-blue-400 border-blue-400/30",
  Lifestyle: "text-purple-400 border-purple-400/30",
};

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Post Not Found</h1>
          <Link href="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const related = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        return (
          <h2 key={i} className="text-2xl font-heading font-bold mt-12 mb-4">
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3 key={i} className="text-lg font-heading font-bold mt-8 mb-3 text-ascend-accent">
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li key={i} className="text-ascend-gray leading-relaxed ml-4 mb-2">
            {line.replace("- ", "")}
          </li>
        );
      }
      if (line.trim() === "") {
        return <div key={i} className="h-4" />;
      }
      return (
        <p key={i} className="text-ascend-gray leading-relaxed mb-4">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="pt-24 lg:pt-32 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto section-padding">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-ascend-gray hover:text-ascend-accent transition-colors mb-8 font-heading uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className={`text-[10px] font-heading uppercase tracking-[0.3em] px-3 py-1 border ${categoryColors[post.category] || "text-ascend-gray border-white/10"}`}>
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-heading font-bold leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg text-ascend-gray/80 leading-relaxed mb-8">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-white/5">
            <div className="flex items-center gap-2 text-sm text-ascend-gray">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-ascend-gray">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-ascend-gray">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-3 mb-12">
            <button className="flex items-center gap-2 px-4 py-2 text-xs font-heading uppercase tracking-wider border border-white/10 text-ascend-gray hover:border-ascend-accent hover:text-ascend-accent transition-all">
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-xs font-heading uppercase tracking-wider border border-white/10 text-ascend-gray hover:border-ascend-accent hover:text-ascend-accent transition-all">
              <Bookmark className="w-3.5 h-3.5" />
              Save
            </button>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose-custom"
        >
          {renderContent(post.content)}
        </motion.article>

        {/* Related Posts */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-white/5">
            <h2 className="text-2xl font-heading font-bold mb-8">More from {post.category}</h2>
            <div className="space-y-4">
              {related.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/blog/${rp.slug}`}
                  className="glass p-6 block group hover:border-ascend-accent/20 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[9px] font-heading uppercase tracking-[0.3em] px-2 py-0.5 border ${categoryColors[rp.category] || "text-ascend-gray border-white/10"}`}>
                      {rp.category}
                    </span>
                    <span className="text-[10px] text-ascend-gray">{rp.readTime}</span>
                  </div>
                  <h3 className="text-base font-heading font-bold group-hover:text-ascend-accent transition-colors">
                    {rp.title}
                  </h3>
                  <p className="text-sm text-ascend-gray mt-1 line-clamp-2">{rp.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
