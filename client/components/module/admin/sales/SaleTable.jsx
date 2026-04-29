"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/AppProvider";
import SaleForm from "./SaleForm";

function formatPrice(price) {
  if (price >= 10000000) return `৳${(price / 10000000).toFixed(1)} Cr`;
  if (price >= 100000) return `৳${(price / 100000).toFixed(0)} L`;
  return `৳${price.toLocaleString()}`;
}

export default function SaleTable() {
  const { sales, properties, customers, deleteSale, settings } = useApp();
  const [editingSale, setEditingSale] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  if (showAddForm) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <SaleForm onClose={() => setShowAddForm(false)} />
      </div>
    );
  }

  if (editingSale) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <SaleForm sale={editingSale} onClose={() => setEditingSale(null)} />
      </div>
    );
  }

  const getPropertyTitle = (id) => properties.find((p) => p.id === id)?.title || "Unknown";
  const getCustomerName = (id) => customers.find((c) => c.id === id)?.name || "Unknown";

  const statusStyles = {
    active: "bg-green-50 text-green-700",
    completed: "bg-blue-50 text-blue-700",
    cancelled: "bg-gray-100 text-gray-500",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Property Sales</h1>
        <button onClick={() => setShowAddForm(true)}
          className="px-5 py-2.5 rounded-lg text-white text-sm font-medium"
          style={{ backgroundColor: settings.primaryColor }}>
          + Add Sale
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Property</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Customer</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Type</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Price</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Due</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sales.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900 max-w-[180px] truncate">{getPropertyTitle(s.propertyId)}</td>
                  <td className="px-4 py-3 text-gray-700">{getCustomerName(s.customerId)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.type === "sale" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}>{s.type}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{formatPrice(s.salePrice)}</td>
                  <td className="px-4 py-3 text-gray-700">৳{s.totalDue.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyles[s.status]}`}>{s.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/sales/${s.id}`}
                        className="px-3 py-1.5 rounded-md text-xs font-medium text-white"
                        style={{ backgroundColor: settings.primaryColor }}>
                        View
                      </Link>
                      <button onClick={() => setEditingSale(s)}
                        className="px-3 py-1.5 rounded-md text-xs font-medium border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors">
                        Edit
                      </button>
                      <button onClick={() => { if (confirm("Delete this sale record?")) deleteSale(s.id); }}
                        className="px-3 py-1.5 rounded-md text-xs font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {sales.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400">No sales yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {sales.map((s) => (
          <div key={s.id} className="bg-white rounded-xl shadow-sm p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{getPropertyTitle(s.propertyId)}</h3>
                <p className="text-sm text-gray-500">{getCustomerName(s.customerId)}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyles[s.status]}`}>{s.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><span className="text-gray-400">Price</span><p className="text-gray-700">{formatPrice(s.salePrice)}</p></div>
              <div><span className="text-gray-400">Due</span><p className="text-gray-700">৳{s.totalDue.toLocaleString()}</p></div>
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              <Link href={`/admin/sales/${s.id}`}
                className="flex-1 text-center px-3 py-2 rounded-md text-xs font-medium text-white"
                style={{ backgroundColor: settings.primaryColor }}>
                View
              </Link>
              <button onClick={() => setEditingSale(s)}
                className="px-3 py-2 rounded-md text-xs font-medium border border-gray-300 text-gray-600 hover:bg-gray-50">
                Edit
              </button>
              <button onClick={() => { if (confirm("Delete?")) deleteSale(s.id); }}
                className="px-3 py-2 rounded-md text-xs font-medium border border-red-200 text-red-500 hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        ))}
        {sales.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">No sales yet.</div>
        )}
      </div>
    </div>
  );
}
