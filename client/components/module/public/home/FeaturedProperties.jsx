"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/lib/context/AppProvider";
import PropertyCard from "./PropertyCard";

const filters = [
  { id: "all", label: "All" },
  { id: "ongoing", label: "Ongoing" },
  { id: "completed", label: "Completed" },
  { id: "upcoming", label: "Upcoming" },
];

export default function FeaturedProperties() {
  const { properties, settings } = useApp();
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? properties
      : properties.filter((p) => p.status === activeFilter);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
            Featured <span style={{ color: settings.primaryColor }}>Properties</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Handpicked properties that match the highest standards of luxury,
            comfort, and location.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-1 bg-white rounded-xl p-1.5 shadow-sm">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeFilter === f.id
                    ? "text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                style={activeFilter === f.id ? { backgroundColor: settings.primaryColor } : undefined}
              >
                {f.label}
                {f.id !== "all" && (
                  <span className={`ml-1.5 text-xs ${activeFilter === f.id ? "text-white/70" : "text-gray-400"}`}>
                    {properties.filter((p) => p.status === f.id).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.slice(0, 6).map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No {activeFilter} properties at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
