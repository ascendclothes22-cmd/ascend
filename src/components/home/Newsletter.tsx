"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function Newsletter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section ref={ref} className="py-24 lg:py-40">
      <div className="max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative glass p-12 lg:p-20 text-center overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-ascend-accent/5 blur-[100px]" />

          <div className="relative z-10">
            <span className="text-[10px] font-heading uppercase tracking-[0.5em] text-ascend-accent">
              Join The Movement
            </span>
            <h2 className="mt-4 text-4xl lg:text-5xl font-heading font-bold max-w-2xl mx-auto">
              Never Miss a Drop
            </h2>
            <p className="mt-4 text-ascend-gray max-w-md mx-auto">
              Be the first to know about new releases, exclusive drops, and members-only discounts.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8 flex items-center justify-center gap-3"
              >
                <div className="w-8 h-8 bg-ascend-accent/20 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-ascend-accent" />
                </div>
                <span className="text-lg font-heading text-ascend-accent">
                  You&apos;re in. Welcome to ASCEND.
                </span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-12 px-4 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/50 focus:outline-none focus:border-ascend-accent font-body transition-all"
                />
                <button
                  type="submit"
                  className="h-12 px-8 bg-ascend-accent text-white font-heading font-semibold text-sm uppercase tracking-wider hover:bg-ascend-accent-dark transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}

            <p className="mt-4 text-[11px] text-ascend-gray/50">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
