"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useApp } from "@/lib/context/AppProvider";

/**
 * Reusable hero banner for inner pages.
 * Shows a title, subtitle, and breadcrumb over a dark gradient.
 */
export default function PageHero({ title, subtitle, breadcrumb }) {
  const { settings } = useApp();

  return (
    <section>
      <div className="bg-gray-900 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-4">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            {breadcrumb && (
              <>
                <span className="text-gray-600">/</span>
                <span style={{ color: settings.primaryColor }}>{breadcrumb}</span>
              </>
            )}
          </nav>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-3 text-gray-400 text-lg max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
