"use client";

import { motion } from "framer-motion";
import { Truck, Clock, MapPin, Package } from "lucide-react";

const shippingInfo = [
  { icon: Truck, title: "Free Shipping", desc: "On all orders within Pakistan. No minimum required." },
  { icon: Clock, title: "Fast Delivery", desc: "2-5 business days depending on your city." },
  { icon: MapPin, title: "Wide Coverage", desc: "We deliver to all major cities and remote areas across Pakistan." },
  { icon: Package, title: "Careful Packaging", desc: "Every order is packed with care to ensure it arrives in perfect condition." },
];

export default function ShippingPolicyPage() {
  return (
    <div className="pt-24 lg:pt-32 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto section-padding">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-8">
            Shipping <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-xs text-ascend-gray mb-12">Last updated: January 2025</p>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            {shippingInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6"
              >
                <item.icon className="w-6 h-6 text-ascend-accent mb-3" />
                <h3 className="text-sm font-heading font-bold mb-1">{item.title}</h3>
                <p className="text-xs text-ascend-gray">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-8 text-sm text-ascend-gray leading-relaxed">
            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">Processing Time</h2>
              <p>All orders are processed within 1-2 business days. You will receive a confirmation call within 24 hours of placing your order.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">Delivery Times</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Karachi, Lahore, Islamabad: 2-3 business days</li>
                <li>Other major cities: 3-5 business days</li>
                <li>Remote areas: 5-7 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">Order Tracking</h2>
              <p>You can track your order using the Track Order page on our website. Enter your order number to see real-time status updates.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">Shipping Partners</h2>
              <p>We partner with Pakistan's most reliable delivery services to ensure your order reaches you safely and on time.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">Contact</h2>
              <p>For shipping inquiries, contact us at support@ascend.com or call +92 300 1234567.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
