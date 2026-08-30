"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 lg:pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-[10px] font-heading uppercase tracking-[0.5em] text-ascend-accent">
            Contact Us
          </span>
          <h1 className="mt-4 text-5xl lg:text-6xl font-heading font-bold">
            Get In <span className="text-gradient">Touch</span>
          </h1>
          <p className="mt-4 text-ascend-gray max-w-md mx-auto">
            Have a question? We&apos;re here to help. Reach out anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div className="glass p-6 flex items-start gap-4 group hover:border-ascend-accent/20 transition-all">
              <div className="w-10 h-10 bg-ascend-accent/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-ascend-accent" />
              </div>
              <div>
                <h3 className="text-sm font-heading font-semibold mb-1">Email</h3>
                <p className="text-sm text-ascend-gray">support@ascend.com</p>
              </div>
            </div>

            <div className="glass p-6 flex items-start gap-4 group hover:border-ascend-accent/20 transition-all">
              <div className="w-10 h-10 bg-ascend-accent/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-ascend-accent" />
              </div>
              <div>
                <h3 className="text-sm font-heading font-semibold mb-1">Phone</h3>
                <p className="text-sm text-ascend-gray">+92 300 1234567</p>
              </div>
            </div>

            <div className="glass p-6 flex items-start gap-4 group hover:border-ascend-accent/20 transition-all">
              <div className="w-10 h-10 bg-ascend-accent/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-ascend-accent" />
              </div>
              <div>
                <h3 className="text-sm font-heading font-semibold mb-1">Location</h3>
                <p className="text-sm text-ascend-gray">Pakistan</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            {submitted ? (
              <div className="glass p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-ascend-accent/20 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-ascend-accent" />
                </div>
                <h2 className="text-2xl font-heading font-bold mb-2">Message Sent</h2>
                <p className="text-ascend-gray">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass p-6 lg:p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ascend-gray mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full h-11 px-4 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/40 focus:outline-none focus:border-ascend-accent font-body transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ascend-gray mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full h-11 px-4 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/40 focus:outline-none focus:border-ascend-accent font-body transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ascend-gray mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full h-11 px-4 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/40 focus:outline-none focus:border-ascend-accent font-body transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-semibold uppercase tracking-wider text-ascend-gray mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 text-ascend-white placeholder:text-ascend-gray/40 focus:outline-none focus:border-ascend-accent font-body transition-all resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
