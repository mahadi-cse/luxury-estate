"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useApp } from "@/lib/context/AppProvider";
import { mockAgents } from "@/lib/data/mockAgents";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageHero from "@/components/common/PageHero";

export default function AgentsPage() {
  const { settings } = useApp();

  return (
    <div>
      <Navbar />
      <PageHero
        title="Our Agents"
        subtitle="Meet the experienced professionals who make your property journey seamless."
        breadcrumb="Agents"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={agent.imageUrl}
                    alt={agent.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{agent.role}</p>
                  <p
                    className="text-sm font-semibold mt-2"
                    style={{ color: settings.primaryColor }}
                  >
                    {agent.dealsCount} Deals Closed
                  </p>

                  <div className="flex gap-3 mt-4">
                    <button
                      className="flex-1 py-2.5 rounded-lg text-white text-sm font-medium transition-all hover:brightness-110"
                      style={{ backgroundColor: settings.primaryColor }}
                    >
                      Contact
                    </button>
                    <button className="flex-1 py-2.5 rounded-lg border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
