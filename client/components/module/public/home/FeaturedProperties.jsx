"use client";

import { motion } from "framer-motion";
import { useApp } from "@/lib/context/AppProvider";
import PropertyCard from "./PropertyCard";

/**
 * Featured properties section — reads from context so admin changes
 * are reflected immediately.
 */
export default function FeaturedProperties() {
  const { properties } = useApp();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
            Featured <span style={{ color: "var(--color-primary)" }}>Properties</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Handpicked properties that match the highest standards of luxury,
            comfort, and location.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.slice(0, 6).map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
