"use client";

import { useState } from "react";
import { useApp } from "@/lib/context/AppProvider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageHero from "@/components/common/PageHero";

const contactInfo = [
  { icon: "phone", label: "Phone", value: "+880 1700-000000" },
  { icon: "email", label: "Email", value: "hello@luxeestate.com.bd" },
  { icon: "location", label: "Office", value: "House 42, Road 11, Banani, Dhaka 1213" },
];

export default function ContactPage() {
  const { settings } = useApp();
  const [sent, setSent] = useState(false);

  return (
    <div>
      <Navbar />
      <PageHero
        title="Contact Us"
        subtitle="Have a question or need assistance? We'd love to hear from you."
        breadcrumb="Contact Us"
      />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Get in Touch</h2>
              <p className="text-sm text-gray-500">
                Reach out to us through any of the channels below, or fill in the form and we will get back to you within 24 hours.
              </p>
              <div className="space-y-4 pt-2">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: settings.primaryColor + "15", color: settings.primaryColor }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {item.icon === "phone" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />}
                        {item.icon === "email" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                        {item.icon === "location" && <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>}
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="text-sm font-medium text-gray-900">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {sent ? (
                <div className="bg-green-50 rounded-2xl p-10 text-center">
                  <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Message Sent!</h3>
                  <p className="text-sm text-gray-500">We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                      <input type="text" required placeholder="Your name" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                      <input type="email" required placeholder="you@example.com" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Subject</label>
                    <input type="text" required placeholder="How can we help?" className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Message</label>
                    <textarea rows={5} required placeholder="Your message..." className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none" />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-lg text-white text-sm font-semibold transition-all hover:brightness-110" style={{ backgroundColor: settings.primaryColor }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
