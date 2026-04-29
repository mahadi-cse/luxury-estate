"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/AppProvider";
import PropertyForm from "./PropertyForm";

function formatPrice(price, type) {
  if (type === "rent") return `৳${price.toLocaleString()}/mo`;
  if (price >= 10000000) return `৳${(price / 10000000).toFixed(1)} Cr`;
  if (price >= 100000) return `৳${(price / 100000).toFixed(0)} L`;
  return `৳${price.toLocaleString()}`;
}

export default function PropertyTable() {
  const { properties, deleteProperty, settings } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  if (showAddForm) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <PropertyForm onClose={() => setShowAddForm(false)} />
      </div>
    );
  }

  if (editingProperty) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <PropertyForm property={editingProperty} onClose={() => setEditingProperty(null)} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-5 py-2.5 rounded-lg text-white text-sm font-medium"
          style={{ backgroundColor: settings.primaryColor }}
        >
          + Add Property
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Title</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Category</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Type</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Price</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Location</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900 max-w-[200px] truncate">{p.title}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">{p.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.type === "sale" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}>{p.type}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{formatPrice(p.price, p.type)}</td>
                  <td className="px-4 py-3 text-gray-500">{p.location}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/properties/${p.id}`}
                        className="px-3 py-1.5 rounded-md text-xs font-medium text-white"
                        style={{ backgroundColor: settings.primaryColor }}>
                        View
                      </Link>
                      <button onClick={() => setEditingProperty(p)}
                        className="px-3 py-1.5 rounded-md text-xs font-medium border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                        Edit
                      </button>
                      <button onClick={() => { if (confirm(`Delete "${p.title}"?`)) deleteProperty(p.id); }}
                        className="px-3 py-1.5 rounded-md text-xs font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {properties.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">No properties yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
