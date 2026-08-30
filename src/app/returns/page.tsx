"use client";

import { motion } from "framer-motion";
import { RotateCcw, Clock, CheckCircle, XCircle } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="pt-24 lg:pt-32 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto section-padding">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-8">
            Returns <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-xs text-ascend-gray mb-12">Last updated: January 2025</p>

          <div className="space-y-8 text-sm text-ascend-gray leading-relaxed">
            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">Our Promise</h2>
              <p>We want you to love your ASCEND gear. If something isn&apos;t right, we&apos;ll make it right.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">7-Day Return Policy</h2>
              <p>You have 7 days from the date of delivery to request a return. Items must be:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Unworn and unwashed</li>
                <li>In original packaging with tags attached</li>
                <li>In the same condition as received</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">How to Initiate a Return</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Contact us at support@ascend.com with your order number</li>
                <li>Specify the item(s) you want to return and the reason</li>
                <li>We&apos;ll arrange a pickup from your address</li>
                <li>Once we receive and inspect the item, your refund will be processed</li>
              </ol>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">Refunds</h2>
              <p>Refunds are processed within 3-5 business days of receiving the returned item. Since we operate on Cash on Delivery, refunds will be made via bank transfer or as store credit.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">Exchanges</h2>
              <p>We offer free exchanges for different sizes. Contact us to arrange an exchange.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">Non-Returnable Items</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Items worn, washed, or altered</li>
                <li>Items without original tags or packaging</li>
                <li>Items purchased during final sale</li>
                <li>Accessories (caps, bags) for hygiene reasons</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">Contact</h2>
              <p>For return requests, email us at support@ascend.com or call +92 300 1234567.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
