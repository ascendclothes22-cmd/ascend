"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

const faqs = [
  {
    category: "Orders & Shipping",
    items: [
      {
        q: "How do I place an order?",
        a: "Simply browse our shop, add items to your cart, and proceed to checkout. Fill in your delivery details and confirm your order. You'll receive a confirmation call within 24 hours.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We currently offer Cash on Delivery (COD) only. You pay when your order arrives at your doorstep.",
      },
      {
        q: "How long does shipping take?",
        a: "Standard delivery takes 3-5 business days depending on your city. Major cities like Karachi, Lahore, and Islamabad typically receive orders within 2-3 days.",
      },
      {
        q: "Is shipping free?",
        a: "Yes! We offer free shipping on all orders within Pakistan. No minimum order required.",
      },
    ],
  },
  {
    category: "Products & Sizing",
    items: [
      {
        q: "How do I find my size?",
        a: "Each product page has a Size Guide button. We recommend measuring your chest and comparing it with our size chart for the perfect fit.",
      },
      {
        q: "What is the quality of your products?",
        a: "All ASCEND products are made from premium materials. Our tees are 220 GSM heavyweight cotton, our hoodies feature triple-layer fleece, and all hardware is military-grade.",
      },
      {
        q: "Are your products unisex?",
        a: "Yes, all ASCEND products are designed to be gender-neutral. Our size range accommodates all body types.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        q: "What is your return policy?",
        a: "We offer a 7-day return policy. Items must be unworn, unwashed, and in original packaging. Contact us to initiate a return.",
      },
      {
        q: "How do I exchange an item?",
        a: "Contact us with your order number and the item you'd like to exchange. We'll arrange a pickup and send the new item to you.",
      },
      {
        q: "When will I receive my refund?",
        a: "Refunds are processed within 3-5 business days after we receive the returned item. The amount will be credited to your original payment method.",
      },
    ],
  },
  {
    category: "Account & Support",
    items: [
      {
        q: "How do I track my order?",
        a: "Visit our Track Order page and enter your order number (provided in your confirmation) to see real-time status updates.",
      },
      {
        q: "How do I contact support?",
        a: "You can reach us via email at support@ascend.com, call us at +92 300 1234567, or use the contact form on our website.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = faqs
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          !search ||
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="pt-24 lg:pt-32 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-[10px] font-heading uppercase tracking-[0.5em] text-ascend-accent">
            FAQ
          </span>
          <h1 className="mt-4 text-5xl lg:text-6xl font-heading font-bold">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
        </motion.div>

        {/* Search */}
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ascend-gray" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-4 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/40 focus:outline-none focus:border-ascend-accent font-body transition-all"
          />
        </div>

        {/* FAQs */}
        <div className="space-y-12">
          {filtered.map((cat) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-sm font-heading font-semibold uppercase tracking-[0.2em] text-ascend-accent mb-4">
                {cat.category}
              </h2>
              <div className="border border-white/5">
                {cat.items.map((item, i) => {
                  const key = `${cat.category}-${i}`;
                  const isOpen = openIndex === key;
                  return (
                    <div key={key} className="border-b border-white/5 last:border-0">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : key)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                      >
                        <span className="text-sm font-heading font-semibold text-ascend-white pr-4">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-ascend-gray flex-shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-5 text-sm text-ascend-gray leading-relaxed">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
