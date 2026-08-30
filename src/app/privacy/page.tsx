"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="pt-24 lg:pt-32 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto section-padding">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-8">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-xs text-ascend-gray mb-12">Last updated: January 2025</p>

          <div className="space-y-8 text-sm text-ascend-gray leading-relaxed">
            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">1. Information We Collect</h2>
              <p>We collect personal information you provide directly, including your name, email address, phone number, shipping address, and payment-related information when you place an order or create an account.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">2. How We Use Your Information</h2>
              <p>We use your information to process orders, communicate with you about your orders, improve our services, send marketing communications (with your consent), and ensure the security of our platform.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">3. Information Sharing</h2>
              <p>We do not sell your personal information. We may share your data with delivery partners to fulfill orders, payment processors to complete transactions, and service providers who assist in operating our business.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">4. Data Security</h2>
              <p>We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">5. Cookies</h2>
              <p>We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookies through your browser settings.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">6. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time by contacting us.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">7. Data Retention</h2>
              <p>We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy or as required by law.</p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-ascend-white mb-3">8. Contact</h2>
              <p>For privacy-related inquiries, contact us at support@ascend.com.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
