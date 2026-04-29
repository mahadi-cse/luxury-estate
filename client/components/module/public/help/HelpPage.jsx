"use client";

import { useState } from "react";
import { useApp } from "@/lib/context/AppProvider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageHero from "@/components/common/PageHero";

const faqs = [
  { q: "How do I search for properties?", a: "Use the search bar on the homepage to filter by location, price range, and property type (Buy or Rent). You can also browse dedicated Buy and Rent pages." },
  { q: "How do I list my property?", a: "Click the 'List Property' button in the navigation bar. Fill in your property details, upload photos, and submit. Our team will review and publish your listing within 24 hours." },
  { q: "Is there a fee for listing?", a: "Basic listings are free. Premium featured placements are available for a small fee. Contact our team for pricing details." },
  { q: "How do I contact an agent?", a: "Visit the Agents page to see our team. Each agent has a Contact button that lets you reach them directly." },
  { q: "Can I edit my listing after submission?", a: "Yes. Once your listing is approved, you can request edits by contacting our support team via the Contact Us page." },
  { q: "What areas do you cover?", a: "We currently cover major areas across Bangladesh including Dhaka (Gulshan, Banani, Dhanmondi, Uttara, Bashundhara, Purbachal), Chittagong, and Sylhet." },
];

export default function HelpPage() {
  const { settings } = useApp();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      <Navbar />
      <PageHero
        title="Help Center"
        subtitle="Find answers to common questions about using our platform."
        breadcrumb="Help Center"
      />

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-sm font-medium text-gray-900">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-40 pb-4" : "max-h-0"}`}>
                  <p className="px-6 text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Still need help?</h3>
            <p className="text-sm text-gray-500 mb-4">Our support team is available 7 days a week.</p>
            <a
              href="/contact"
              className="inline-block px-6 py-2.5 rounded-lg text-white text-sm font-medium transition-all hover:brightness-110"
              style={{ backgroundColor: settings.primaryColor }}
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
