"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function BrandStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ascend-black via-[#0d0d0d] to-ascend-black" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] bg-white/[0.02] border border-white/5 flex items-center justify-center"
          >
            <div className="absolute inset-8 border border-ascend-accent/20" />
            <div className="text-center">
              <span className="text-8xl lg:text-9xl font-heading font-bold text-white/[0.03]">
                A
              </span>
            </div>
            {/* Corner Accents */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-ascend-accent" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-ascend-accent" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-ascend-accent" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-ascend-accent" />
          </motion.div>

          {/* Right - Story */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-heading uppercase tracking-[0.5em] text-ascend-accent">
              Our Story
            </span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-heading font-bold leading-tight">
              Born From{" "}
              <span className="text-gradient">Adversity</span>
            </h2>
            <div className="mt-8 space-y-6 text-ascend-gray leading-relaxed">
              <p>
                ASCEND was born from a simple truth: greatness isn&apos;t given — it&apos;s forged.
                Every piece we create carries the weight of late nights, early mornings, and the
                relentless pursuit of becoming better than yesterday.
              </p>
              <p>
                We don&apos;t make clothing for everyone. We make it for the ones who choose
                discipline over comfort, growth over complacency, and purpose over ease.
                This is armor for the self-made.
              </p>
              <p>
                Our mission is to represent the mindset of those who rise through pressure.
                Every stitch, every design, every detail — forged with intention.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-8">
              <div>
                <span className="text-3xl font-heading font-bold text-ascend-accent">100%</span>
                <p className="text-xs text-ascend-gray mt-1 font-heading uppercase tracking-wider">
                  Premium Quality
                </p>
              </div>
              <div>
                <span className="text-3xl font-heading font-bold text-ascend-accent">5K+</span>
                <p className="text-xs text-ascend-gray mt-1 font-heading uppercase tracking-wider">
                  Community
                </p>
              </div>
              <div>
                <span className="text-3xl font-heading font-bold text-ascend-accent">24/7</span>
                <p className="text-xs text-ascend-gray mt-1 font-heading uppercase tracking-wider">
                  The Grind
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
