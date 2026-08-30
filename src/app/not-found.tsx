"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-ascend-accent/5 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-4"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-[10rem] md:text-[14rem] font-heading font-bold text-white/[0.03] leading-none block"
        >
          404
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-[-4rem] md:mt-[-6rem]"
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Lost the <span className="text-gradient">Grind</span>?
          </h1>
          <p className="text-ascend-gray max-w-md mx-auto mb-8">
            This page doesn&apos;t exist. But your drive does. Get back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
            <Link href="/shop" className="btn-outline">
              Shop ASCEND
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
