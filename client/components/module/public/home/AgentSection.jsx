"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { mockAgents } from "@/lib/data/mockAgents";

/** Individual agent card with photo, name, role, deals count, and contact button. */
function AgentCard({ agent, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 text-center group"
    >
      <div className="relative h-72 overflow-hidden">
        <Image
          src={agent.imageUrl}
          alt={agent.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900">{agent.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{agent.role}</p>
        <p className="text-sm text-[#C5A46D] font-semibold mt-2">
          {agent.dealsCount} Deals Closed
        </p>
        <button className="mt-4 w-full border-2 border-[#C5A46D] text-[#C5A46D] px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#C5A46D] hover:text-white transition-colors">
          Contact
        </button>
      </div>
    </motion.div>
  );
}

/** Agent section displaying 3 agent cards with staggered animations. */
export default function AgentSection() {
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
            Meet Our <span className="text-[#C5A46D]">Agents</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Our experienced team of real estate professionals is here to guide
            you every step of the way.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockAgents.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
