"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useApp } from "@/lib/context/AppProvider";

/** Stats data for the animated counters */
const stats = [
  { value: 2500, suffix: "+", label: "Total Listings" },
  { value: 20, suffix: "+", label: "Cities Covered" },
  { value: 120, suffix: "+", label: "Expert Agents" },
  { value: 12000, suffix: "+", label: "Happy Clients" },
];

/**
 * Animated counter hook — counts from 0 to target when visible.
 */
function useCounter(target, isInView) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, isInView]);

  return count;
}

/** Individual stat counter component. */
function StatCounter({ value, suffix, label, isInView }) {
  const { settings } = useApp();
  const count = useCounter(value, isInView);

  return (
    <div className="text-center">
      <p className="text-4xl sm:text-5xl font-bold" style={{ color: settings.primaryColor }}>
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-gray-500 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

/**
 * Stats section with 4 animated counters that count up when scrolled into view.
 */
export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12"
        >
          {stats.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              isInView={isInView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
