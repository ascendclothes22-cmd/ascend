"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="pt-24 lg:pt-32 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto section-padding">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-8">
            Terms of <span className="text-gradient">Service</span>
          </h1>
          <p className="text-xs text-ascend-gray mb-12">Last updated: January 2025</p>

          <div className="space-y-8 text-sm text-ascend-gray leading-relaxed">
            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using the ASCEND website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">2. Products and Orders</h2>
              <p>We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products and pricing are subject to change at any time without notice, at our sole discretion.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">3. Payment</h2>
              <p>We currently accept Cash on Delivery (COD) as our primary payment method. Payment is due upon receipt of your order. Failure to pay may result in account suspension.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">4. Shipping and Delivery</h2>
              <p>We aim to deliver all orders within 3-5 business days. Delivery times may vary based on location. We are not responsible for delays caused by third-party delivery services.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">5. Returns and Refunds</h2>
              <p>Items may be returned within 7 days of delivery if they are unworn, unwashed, and in original packaging. Refunds will be processed within 3-5 business days of receiving the returned item.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">6. Intellectual Property</h2>
              <p>All content on this website, including text, graphics, logos, and designs, is the property of ASCEND and is protected by intellectual property laws. Unauthorized use is prohibited.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">7. Limitation of Liability</h2>
              <p>ASCEND shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">8. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of modified terms.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">9. Contact</h2>
              <p>For questions about these Terms of Service, please contact us at support@ascend.com.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
