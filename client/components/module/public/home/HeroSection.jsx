"use client";

import { motion } from "framer-motion";
import { useApp } from "@/lib/context/AppProvider";

/** Hero stats displayed over the background image */
const heroStats = [
  { value: "2,500+", label: "Properties" },
  { value: "20+", label: "Cities" },
  { value: "12,000+", label: "Happy Clients" },
];

/**
 * Full-width hero section with background image, headline, subtext,
 * and animated stat counters — tailored for the Bangladeshi market.
 */
export default function HeroSection() {
  const { settings } = useApp();

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
        >
          Find Your Perfect
          <br />
          <span style={{ color: settings.primaryColor }}>Dream Home</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Explore our curated collection of premium properties across
          Bangladesh. From Gulshan penthouses to Purbachal villas — your next
          chapter starts here.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-16"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold" style={{ color: settings.primaryColor }}>
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-300 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
