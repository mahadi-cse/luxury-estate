"use client";

import { useState } from "react";
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
  const [editingProperty, setEditingProperty] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

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
        <PropertyForm
          property={editingProperty}
          onClose={() => setEditingProperty(null)}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-colors"
          style={{ backgroundColor: settings.primaryColor }}
        >
          + Add Property
        </button>
      </div>

      {/* Table */}
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
                  <td className="px-4 py-3 font-medium text-gray-900 max-w-[200px] truncate">
                    {p.title}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.type === "sale"
                          ? "bg-green-50 text-green-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {p.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{formatPrice(p.price, p.type)}</td>
                  <td className="px-4 py-3 text-gray-500">{p.location}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setEditingProperty(p)}
                      className="text-gray-500 hover:text-gray-900 mr-3 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${p.title}"?`)) deleteProperty(p.id);
                      }}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {properties.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                    No properties yet. Click "Add Property" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
