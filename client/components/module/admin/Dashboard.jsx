"use client";

import Link from "next/link";
import { useApp } from "@/lib/context/AppProvider";

export default function Dashboard() {
  const { properties, settings } = useApp();

  const totalProperties = properties.length;
  const forSale = properties.filter((p) => p.type === "sale").length;
  const forRent = properties.filter((p) => p.type === "rent").length;
  const buildings = properties.filter((p) => p.category === "building").length;
  const apartments = properties.filter((p) => p.category === "apartment").length;

  const stats = [
    { label: "Total Properties", value: totalProperties, color: settings.primaryColor },
    { label: "For Sale", value: forSale, color: "#10B981" },
    { label: "For Rent", value: forRent, color: "#3B82F6" },
    { label: "Buildings", value: buildings, color: "#8B5CF6" },
    { label: "Apartments", value: apartments, color: "#F59E0B" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-5 shadow-sm"
          >
            <p className="text-3xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/properties"
            className="px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-colors"
            style={{ backgroundColor: settings.primaryColor }}
          >
            Manage Properties
          </Link>
          <Link
            href="/admin/settings"
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Site Settings
          </Link>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            View Site →
          </Link>
        </div>
      </div>

      {/* Recent Properties */}
      <div className="bg-white rounded-xl p-6 shadow-sm mt-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Recent Properties
        </h2>
        <div className="space-y-3">
          {properties.slice(0, 5).map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{p.title}</p>
                <p className="text-xs text-gray-500">{p.location}</p>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                  p.type === "sale"
                    ? "bg-green-50 text-green-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {p.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
