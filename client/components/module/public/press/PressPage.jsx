"use client";

import { useApp } from "@/lib/context/AppProvider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageHero from "@/components/common/PageHero";

const pressItems = [
  { date: "March 2026", title: "LuxeEstate Launches Premium Property Platform for Bangladesh", source: "The Daily Star" },
  { date: "February 2026", title: "How Technology is Transforming Real Estate in Dhaka", source: "TechCrunch BD" },
  { date: "January 2026", title: "LuxeEstate Raises Seed Funding to Expand Across Bangladesh", source: "Financial Express" },
  { date: "December 2025", title: "Top 10 PropTech Startups to Watch in South Asia", source: "Forbes Asia" },
];

export default function PressPage() {
  const { settings } = useApp();

  return (
    <div>
      <Navbar />
      <PageHero
        title="Press & Media"
        subtitle="Latest news and media coverage about LuxeEstate."
        breadcrumb="Press"
      />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {pressItems.map((item) => (
              <article
                key={item.title}
                className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-medium text-gray-400">
                    {item.date}
                  </span>
                  <span className="text-xs text-gray-300">•</span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: settings.primaryColor }}
                  >
                    {item.source}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <button
                  className="mt-3 text-sm font-medium transition-colors"
                  style={{ color: settings.primaryColor }}
                >
                  Read More →
                </button>
              </article>
            ))}
          </div>

          <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Media Inquiries
            </h3>
            <p className="text-sm text-gray-500 mb-1">
              For press kits, interviews, or media partnerships:
            </p>
            <p className="text-sm font-medium" style={{ color: settings.primaryColor }}>
              press@luxeestate.com.bd
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
