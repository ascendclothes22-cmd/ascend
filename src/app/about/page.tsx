"use client";

import { motion } from "framer-motion";
import { Target, Flame, Users, Trophy } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Discipline",
    description: "Every piece is built with the same discipline we expect from ourselves. No shortcuts, no compromises.",
  },
  {
    icon: Flame,
    title: "Resilience",
    description: "Forged through pressure. We design for those who push through every obstacle and come out stronger.",
  },
  {
    icon: Users,
    title: "Community",
    description: "More than a brand — a movement. We're building a community of individuals committed to growth.",
  },
  {
    icon: Trophy,
    title: "Excellence",
    description: "Premium quality isn't a feature — it's our standard. Every stitch, every detail matters.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 lg:pt-32 pb-24">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          <span className="text-[10px] font-heading uppercase tracking-[0.5em] text-ascend-accent">
            About ASCEND
          </span>
          <h1 className="mt-4 text-5xl lg:text-7xl font-heading font-bold leading-tight">
            Born From{" "}
            <span className="text-gradient">Adversity</span>
          </h1>
          <p className="mt-8 text-lg text-ascend-gray leading-relaxed max-w-2xl mx-auto">
            ASCEND was founded on one belief: the best things in life are forged through pressure.
            We create premium streetwear for the disciplined, the driven, and the relentless.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32"
        >
          <div className="aspect-[4/3] bg-white/[0.02] border border-white/5 relative">
            <div className="absolute inset-8 border border-ascend-accent/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl font-heading font-bold text-white/[0.03]">A</span>
            </div>
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-ascend-accent" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-ascend-accent" />
          </div>
          <div>
            <span className="text-[10px] font-heading uppercase tracking-[0.5em] text-ascend-accent">
              Our Mission
            </span>
            <h2 className="mt-4 text-4xl font-heading font-bold">
              Pressure Makes <span className="text-gradient">Diamonds</span>
            </h2>
            <div className="mt-8 space-y-5 text-ascend-gray leading-relaxed">
              <p>
                ASCEND represents everything it means to rise above. We&apos;re not just a
                clothing brand — we&apos;re a declaration that you refuse to stay average.
              </p>
              <p>
                Every product is designed with intention. The weight of the fabric, the precision
                of the stitching, the boldness of the design — all calculated to make you feel
                like you can conquer anything.
              </p>
              <p>
                We cater to the gym enthusiasts who grind daily, the entrepreneurs who build
                relentlessly, the self-improvement warriors who never stop evolving. This is
                your armor.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[10px] font-heading uppercase tracking-[0.5em] text-ascend-accent">
              Our Values
            </span>
            <h2 className="mt-3 text-4xl font-heading font-bold">What We Stand For</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 text-center group hover:border-ascend-accent/20 transition-all duration-500"
              >
                <value.icon className="w-8 h-8 text-ascend-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-heading font-bold mb-3">{value.title}</h3>
                <p className="text-sm text-ascend-gray leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-12 lg:p-16"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <span className="text-4xl lg:text-5xl font-heading font-bold text-ascend-accent">5K+</span>
              <p className="mt-2 text-xs font-heading uppercase tracking-wider text-ascend-gray">Community Members</p>
            </div>
            <div>
              <span className="text-4xl lg:text-5xl font-heading font-bold text-ascend-accent">100%</span>
              <p className="mt-2 text-xs font-heading uppercase tracking-wider text-ascend-gray">Premium Quality</p>
            </div>
            <div>
              <span className="text-4xl lg:text-5xl font-heading font-bold text-ascend-accent">50+</span>
              <p className="mt-2 text-xs font-heading uppercase tracking-wider text-ascend-gray">Products</p>
            </div>
            <div>
              <span className="text-4xl lg:text-5xl font-heading font-bold text-ascend-accent">24/7</span>
              <p className="mt-2 text-xs font-heading uppercase tracking-wider text-ascend-gray">The Grind</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
