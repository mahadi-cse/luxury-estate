"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/** Bangladeshi locations for the dropdown */
const locations = [
  "All Locations",
  "Gulshan, Dhaka",
  "Banani, Dhaka",
  "Dhanmondi, Dhaka",
  "Uttara, Dhaka",
  "Bashundhara R/A, Dhaka",
  "Purbachal, Dhaka",
  "Chittagong",
  "Sylhet",
];

/** Price range options in BDT */
const priceRanges = [
  "Any Price",
  "৳20,000 - ৳50,000/mo",
  "৳50,000 - ৳1,00,000/mo",
  "৳50 Lakh - ৳1 Crore",
  "৳1 Crore - ৳5 Crore",
  "৳5 Crore+",
];

/**
 * Search bar with keyword input, buy/rent toggle, location dropdown,
 * price range selector, and search button.
 * Overlaps the hero section with a negative margin.
 */
export default function SearchBar() {
  const [listingType, setListingType] = useState("buy");

  return (
    <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
      >
        {/* Buy/Rent Toggle */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit mb-6">
          <button
            onClick={() => setListingType("buy")}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
              listingType === "buy"
                ? "bg-[#C5A46D] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setListingType("rent")}
            className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
              listingType === "rent"
                ? "bg-[#C5A46D] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Rent
          </button>
        </div>

        {/* Search Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Keyword Input */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Keyword
            </label>
            <input
              type="text"
              placeholder="Search properties..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A46D]/30 focus:border-[#C5A46D] transition-all"
            />
          </div>

          {/* Location Dropdown */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Location
            </label>
            <select className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C5A46D]/30 focus:border-[#C5A46D] transition-all appearance-none bg-white">
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Price Range
            </label>
            <select className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#C5A46D]/30 focus:border-[#C5A46D] transition-all appearance-none bg-white">
              {priceRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button className="w-full bg-[#C5A46D] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#b08f5a] transition-colors shadow-md hover:shadow-lg">
              Search
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
