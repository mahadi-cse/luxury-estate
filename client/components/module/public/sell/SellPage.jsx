"use client";

import { useApp } from "@/lib/context/AppProvider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageHero from "@/components/common/PageHero";

export default function SellPage() {
  const { settings } = useApp();

  return (
    <div>
      <Navbar />
      <PageHero
        title="Sell Your Property"
        subtitle="List your property with us and reach thousands of potential buyers across Bangladesh."
        breadcrumb="Sell"
      />

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { step: "01", title: "List Your Property", desc: "Fill in the details about your property — location, size, price, and photos." },
              { step: "02", title: "Get Verified", desc: "Our team reviews and verifies your listing to ensure quality and accuracy." },
              { step: "03", title: "Close the Deal", desc: "Connect with interested buyers and close the deal with our expert support." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-4"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Ready to sell?
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Get a free property valuation and start reaching buyers today.
            </p>
            <button
              className="px-8 py-3.5 rounded-lg text-white font-semibold transition-all hover:shadow-lg hover:brightness-110"
              style={{ backgroundColor: settings.primaryColor }}
            >
              Get Started — It&apos;s Free
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
