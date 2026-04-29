"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/lib/context/AppProvider";

/**
 * Image gallery with main image, left/right arrow navigation,
 * and clickable thumbnails. Animates transitions between images.
 */
export default function ImageGallery({ images, title }) {
  const { settings } = useApp();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const goLeft = () =>
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const goRight = () =>
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div>
      {/* Main Image with Arrows */}
      <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={images[selectedIndex]}
              alt={`${title} — photo ${selectedIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Left Arrow */}
        <button
          onClick={goLeft}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={goRight}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-3 right-3 z-10 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3 mt-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={`relative h-20 md:h-24 rounded-lg overflow-hidden transition-all ${
              i === selectedIndex
                ? "ring-offset-2"
                : "opacity-60 hover:opacity-100"
            }`}
            style={i === selectedIndex ? { boxShadow: `0 0 0 2px ${settings.primaryColor}` } : undefined}
          >
            <Image
              src={img}
              alt={`${title} thumbnail ${i + 1}`}
              fill
              className="object-cover"
              sizes="25vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
