"use client";

import Link from "next/link";
import { Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";

const shopLinks = [
  { href: "/shop", label: "All Products" },
  { href: "/shop?category=tees", label: "Tees" },
  { href: "/shop?category=hoodies", label: "Hoodies" },
  { href: "/shop?category=joggers", label: "Joggers" },
  { href: "/shop?category=outerwear", label: "Outerwear" },
  { href: "/shop?category=accessories", label: "Accessories" },
];

const companyLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/track-order", label: "Track Order" },
  { href: "/dashboard", label: "My Account" },
];

const legalLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/returns", label: "Returns Policy" },
];

const socialLinks = [
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Twitter, label: "TikTok" },
  { href: "#", icon: Youtube, label: "YouTube" },
  { href: "#", icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="bg-ascend-black border-t border-white/5">
      {/* Marquee Banner */}
      <div className="py-6 border-b border-white/5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-8 text-sm font-heading uppercase tracking-[0.5em] text-white/5">
              FORGED IN PRESSURE • ASCEND • RISE ABOVE • NEVER SETTLE •
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto section-padding py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="text-2xl font-heading font-bold tracking-[0.3em] text-ascend-white">
                ASCEND
              </span>
              <p className="text-[9px] font-heading tracking-[0.5em] text-ascend-accent mt-0.5">
                FORGED IN PRESSURE
              </p>
            </div>
            <p className="text-sm text-ascend-gray leading-relaxed max-w-sm mb-8">
              Built for those who refuse to stay average. ASCEND represents
              discipline, resilience, and becoming stronger through adversity.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 border border-white/10 flex items-center justify-center text-ascend-gray hover:border-ascend-accent hover:text-ascend-accent transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-ascend-white mb-6">
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ascend-gray hover:text-ascend-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-ascend-white mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ascend-gray hover:text-ascend-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-ascend-white mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ascend-gray hover:text-ascend-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-ascend-gray">
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              Pakistan
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              +92 300 1234567
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              support@ascend.com
            </span>
          </div>
          <p className="text-xs text-ascend-gray/50">
            &copy; {new Date().getFullYear()} ASCEND. All rights reserved.{' '}
            <Link href="/admin" className="hover:text-ascend-accent transition-colors">
              Admin
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
