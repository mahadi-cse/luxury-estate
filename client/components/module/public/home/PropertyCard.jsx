"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Formats a number as BDT currency.
 * Sale prices show in lakh/crore shorthand; rent prices get "/mo" appended.
 */
function formatPrice(price, type) {
  if (type === "rent") {
    return `৳${price.toLocaleString("en-BD")}/mo`;
  }
  if (price >= 10000000) {
    const crore = price / 10000000;
    return `৳${crore % 1 === 0 ? crore.toFixed(0) : crore.toFixed(1)} Crore`;
  }
  if (price >= 100000) {
    const lakh = price / 100000;
    return `৳${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(1)} Lakh`;
  }
  return `৳${price.toLocaleString("en-BD")}`;
}

/**
 * Individual property card with image, badge, BDT price, details,
 * and a smooth hover scale + shadow effect. Links to the detail page.
 */
export default function PropertyCard({ property, index }) {
  return (
    <Link href={`/properties/${property.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                property.type === "sale"
                  ? "bg-[#C5A46D] text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              For {property.type}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-gray-900/80 text-white">
              {property.category}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <p className="text-xl font-bold text-gray-900">
            {formatPrice(property.price, property.type)}
          </p>
          <h3 className="mt-1 text-base font-semibold text-gray-800 truncate">
            {property.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
            <svg className="w-4 h-4 text-[#C5A46D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {property.location}
          </p>

          {/* Stats Row */}
          <div className="border-t border-gray-100 mt-4 pt-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
                </svg>
                {property.bedrooms} Bed
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {property.bathrooms} Bath
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                {property.sqft.toLocaleString()} sqft
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
