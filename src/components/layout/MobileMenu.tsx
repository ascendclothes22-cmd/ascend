"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, User, Globe } from "lucide-react";
import { locales, type Locale } from "@/lib/i18n";
import { useI18n } from "./I18nProvider";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/track-order", label: "Track Order" },
  { href: "/dashboard", label: "My Account" },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { locale, setLocale } = useI18n();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-ascend-black border-r border-white/5 z-[70] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div className="flex flex-col">
                <span className="text-lg font-heading font-bold tracking-[0.3em] text-ascend-white">
                  ASCEND
                </span>
                <span className="text-[7px] font-heading tracking-[0.5em] text-ascend-accent -mt-0.5">
                  FORGED IN PRESSURE
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-ascend-gray hover:text-ascend-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 py-8 px-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-3.5 text-lg font-heading uppercase tracking-widest text-ascend-gray hover:text-ascend-white hover:pl-2 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Language Switcher */}
            <div className="px-6 py-4 border-t border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-4 h-4 text-ascend-accent" />
                <span className="text-xs font-heading uppercase tracking-wider text-ascend-gray">
                  Language
                </span>
              </div>
              <div className="flex gap-2">
                {locales.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLocale(l.code)}
                    className={`px-3 py-2 text-xs font-heading uppercase tracking-wider transition-all ${
                      locale === l.code
                        ? "bg-ascend-accent text-white"
                        : "border border-white/10 text-ascend-gray hover:border-ascend-accent hover:text-ascend-accent"
                    }`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-white/5">
              <Link
                href="/shop"
                onClick={onClose}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Shop Now
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
