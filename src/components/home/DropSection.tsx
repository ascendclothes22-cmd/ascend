"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Flame } from "lucide-react";
import { t } from "@/lib/i18n";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calc() {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

export function DropSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const dropDate = new Date();
  dropDate.setDate(dropDate.getDate() + 14);
  const timeLeft = useCountdown(dropDate);

  const blocks = [
    { value: timeLeft.days, label: t("days") },
    { value: timeLeft.hours, label: t("hours") },
    { value: timeLeft.minutes, label: t("minutes") },
    { value: timeLeft.seconds, label: t("seconds") },
  ];

  return (
    <section ref={ref} className="py-24 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ascend-black via-[#0d0808] to-ascend-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-ascend-accent/5 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-ascend-accent/30">
            <Flame className="w-3.5 h-3.5 text-ascend-accent" />
            <span className="text-[10px] font-heading uppercase tracking-[0.4em] text-ascend-accent">
              {t("currentDrop")}
            </span>
          </div>

          <h2 className="text-5xl lg:text-7xl xl:text-8xl font-heading font-bold mb-4">
            DROP <span className="text-gradient">001</span>
          </h2>

          <p className="text-ascend-gray max-w-xl mx-auto mb-10 leading-relaxed">
            {t("dropStoryText")}
          </p>

          {/* Countdown */}
          <div className="mb-12">
            <p className="text-[10px] font-heading uppercase tracking-[0.4em] text-ascend-gray mb-6 flex items-center justify-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              {t("dropEndsIn")}
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              {blocks.map((block, i) => (
                <motion.div
                  key={block.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="glass px-5 py-4 min-w-[80px]"
                >
                  <span className="text-3xl sm:text-4xl font-heading font-bold text-ascend-accent block">
                    {String(block.value).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] font-heading uppercase tracking-[0.3em] text-ascend-gray mt-1 block">
                    {block.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Collection Preview Grid */}
          <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto mb-12">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="aspect-square bg-white/[0.02] border border-white/5 relative group overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-heading font-bold text-white/[0.04] group-hover:text-white/[0.08] transition-all group-hover:scale-110 duration-500">
                    00{i}
                  </span>
                </div>
                <div className="absolute inset-0 bg-ascend-accent/0 group-hover:bg-ascend-accent/5 transition-colors duration-500" />
                <div className="absolute top-3 left-3">
                  <span className="text-[8px] font-heading uppercase tracking-[0.2em] text-ascend-accent/60 bg-ascend-black/60 px-2 py-0.5 backdrop-blur-sm">
                    {t("limitedEdition")}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <Link
            href="/shop"
            className="btn-primary inline-flex items-center gap-2 group"
          >
            {t("shopDrop")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
