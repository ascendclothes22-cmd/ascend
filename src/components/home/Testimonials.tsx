"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ascend-black via-[#0f0f0f] to-ascend-black" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] font-heading uppercase tracking-[0.5em] text-ascend-accent">
            Testimonials
          </span>
          <h2 className="mt-3 text-4xl lg:text-5xl font-heading font-bold">
            The Community Speaks
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass p-8 relative group hover:border-ascend-accent/20 transition-all duration-500"
            >
              <Quote className="w-8 h-8 text-ascend-accent/20 mb-4" />
              <p className="text-ascend-gray leading-relaxed text-sm">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-ascend-accent text-ascend-accent" />
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-sm font-heading font-semibold text-ascend-white">
                  {t.name}
                </p>
                <p className="text-xs text-ascend-gray mt-0.5">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
