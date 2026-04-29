"use client";

import { useApp } from "@/lib/context/AppProvider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageHero from "@/components/common/PageHero";

const values = [
  { title: "Trust", desc: "Every listing is verified. Every transaction is transparent." },
  { title: "Excellence", desc: "We set the standard for quality in Bangladeshi real estate." },
  { title: "Innovation", desc: "Technology-driven solutions for a seamless property experience." },
];

export default function AboutPage() {
  const { settings } = useApp();

  return (
    <div>
      <Navbar />
      <PageHero
        title="About Us"
        subtitle="Building Bangladesh's most trusted real estate platform."
        breadcrumb="About Us"
      />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 text-lg leading-relaxed">
              LuxeEstate was founded with a simple mission: make finding and
              listing properties in Bangladesh effortless. We connect property
              owners, buyers, and renters through a modern platform built on
              trust, transparency, and technology.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              From premium apartments in Gulshan to commercial buildings in
              Purbachal, our curated listings cover the most sought-after
              locations across the country. Our team of experienced agents
              provides personalized guidance at every step.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {values.map((v) => (
              <div key={v.title} className="bg-gray-50 rounded-xl p-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm mb-4"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  {v.title.charAt(0)}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500">{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14">
            {[
              { value: "2,500+", label: "Properties" },
              { value: "120+", label: "Agents" },
              { value: "20+", label: "Cities" },
              { value: "12,000+", label: "Happy Clients" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold" style={{ color: settings.primaryColor }}>{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
