"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MessageSquare, Zap } from "lucide-react";
import GlowingHeader from "../components/GlowingHeader";
import SolarLineArt from "../components/SolarLineArt";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "residential",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Handle form submission
  };

  const serviceOptions = [
    { value: "residential", label: "Residential Solar" },
    { value: "commercial", label: "Commercial Solar" },
    { value: "epc", label: "EPC Evaluation" },
    { value: "financing", label: "Financing Options" },
    { value: "credits", label: "Solar Credits" },
  ];

  const phoneNumbers = ["+91-9532666388", "+91-9916515235"];

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      {/* Background Gradient */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(251,191,36,0.28),transparent_38%),radial-gradient(circle_at_85%_15%,rgba(16,185,129,0.22),transparent_38%),radial-gradient(circle_at_50%_90%,rgba(56,189,248,0.18),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.55),rgba(255,255,255,0.92))]" />
      </div>

      <section className="relative mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
        {/* Decorative blob */}
        <div className="pointer-events-none absolute -top-16 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[conic-gradient(from_180deg,rgba(251,191,36,0.12),rgba(16,185,129,0.1),rgba(251,191,36,0.12))] blur-2xl" />
        
        <SolarLineArt className="bottom-12 right-8 hidden lg:block" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 max-w-4xl"
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-500 backdrop-blur"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <Zap size={14} className="text-amber-500" /> Get in Touch
          </motion.div>

          <GlowingHeader as="h1" className="text-5xl font-semibold leading-[1.02] tracking-tight text-slate-900 md:text-7xl">
            Let&apos;s Power Your<br />
            <span className="bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500 bg-clip-text text-transparent">
              Solar Future
            </span>
          </GlowingHeader>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
            Have questions about solar for your home, business, or community? Our solar experts are here to guide you through every step of your solar journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-1"
          >
            <div className="space-y-8">
              {/* Phone */}
              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 to-amber-100 flex items-center justify-center group-hover:shadow-lg transition-shadow">
                    <Phone size={24} className="text-amber-800" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Phone</h3>
                </div>
                <div className="space-y-2 pl-15">
                  {phoneNumbers.map((phone, idx) => (
                    <p key={idx} className="text-slate-600 hover:text-amber-600 transition cursor-pointer">
                      {phone}
                    </p>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-100 flex items-center justify-center group-hover:shadow-lg transition-shadow">
                    <Mail size={24} className="text-emerald-800" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Email</h3>
                </div>
                <p className="text-slate-600 hover:text-emerald-600 transition cursor-pointer pl-15">
                  contact@sooryx.com
                </p>
              </div>

              {/* Message */}
              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-300 to-blue-100 flex items-center justify-center group-hover:shadow-lg transition-shadow">
                    <MessageSquare size={24} className="text-blue-800" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Available</h3>
                </div>
                <p className="text-slate-600 pl-15">
                  Monday - Friday<br />9:00 AM - 6:00 PM IST
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-2"
          >
            <div className="rounded-3xl border border-slate-200/50 bg-white/80 backdrop-blur p-8 md:p-10 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200/60 bg-white/60 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200/60 bg-white/60 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200/60 bg-white/60 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                    required
                  />
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    I&apos;m interested in
                  </label>
                  <div className="space-y-2">
                    {serviceOptions.map((option) => (
                      <label key={option.value} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="serviceType"
                          value={option.value}
                          checked={formData.serviceType === option.value}
                          onChange={handleChange}
                          className="w-4 h-4 text-amber-500 bg-white border-slate-300 focus:ring-2 focus:ring-amber-400"
                        />
                        <span className="ml-3 text-slate-700 group-hover:text-slate-900 transition font-medium">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your needs..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200/60 bg-white/60 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full mt-8 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 px-6 py-3 text-center font-semibold text-slate-900 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Send Message
                </motion.button>

                <p className="text-xs text-slate-500 text-center mt-4">
                  We&apos;ll get back to you within 24 hours
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
