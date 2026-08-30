"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Leaf, Maximize2, Zap } from "lucide-react";

const stats = [
  { icon: Shield, label: "Premium Quality", value: "100%" },
  { icon: Leaf, label: "100% Cotton", value: "220GSM" },
  { icon: Maximize2, label: "Oversized Fit", value: "Relaxed" },
  { icon: Zap, label: "Fast Delivery", value: "2-5 Days" },
];

export function StatsMarquee() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="py-8 border-y border-white/5 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ascend-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ascend-black to-transparent z-10" />

      <div className="flex animate-marquee">
        {[...stats, ...stats, ...stats, ...stats].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: (i % stats.length) * 0.05 }}
            className="flex items-center gap-3 px-8 whitespace-nowrap"
          >
            <stat.icon className="w-4 h-4 text-ascend-accent" />
            <span className="text-sm font-heading font-bold text-ascend-white">
              {stat.value}
            </span>
            <span className="text-xs font-heading uppercase tracking-wider text-ascend-gray">
              {stat.label}
            </span>
            <span className="text-ascend-gray/20 mx-4">•</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
