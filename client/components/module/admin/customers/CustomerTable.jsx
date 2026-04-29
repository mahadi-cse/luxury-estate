"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/AppProvider";
import CustomerForm from "./CustomerForm";

function getStatus(customer) {
  const hasOverdue = customer.payments.some((p) => p.status === "overdue");
  if (hasOverdue) return "overdue";
  if (customer.totalDue > 0) return "due";
  return "clear";
}

function StatusBadge({ customer }) {
  const status = getStatus(customer);
  const styles = {
    clear: "bg-green-50 text-green-700",
    due: "bg-yellow-50 text-yellow-700",
    overdue: "bg-red-50 text-red-700",
  };
  const labels = { clear: "Clear", due: "Due", overdue: "Overdue" };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export default function CustomerTable() {
  const { customers, deleteCustomer, settings } = useApp();
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  if (showAddForm) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <CustomerForm onClose={() => setShowAddForm(false)} />
      </div>
    );
  }

  if (editingCustomer) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <CustomerForm
          customer={editingCustomer}
          onClose={() => setEditingCustomer(null)}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-colors"
          style={{ backgroundColor: settings.primaryColor }}
        >
          + Add Customer
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Phone</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Profession</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Properties</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Due Amount</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                  <td className="px-4 py-3 text-gray-700">{c.phone}</td>
                  <td className="px-4 py-3 text-gray-500">{c.profession}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {c.purchasedProperties.length + c.rentedProperties.length}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    ৳{c.totalDue.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge customer={c} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/customers/${c.id}`}
                        className="px-3 py-1.5 rounded-md text-xs font-medium text-white transition-colors"
                        style={{ backgroundColor: settings.primaryColor }}
                      >
                        View
                      </Link>
                      <button
                        onClick={() => setEditingCustomer(c)}
                        className="px-3 py-1.5 rounded-md text-xs font-medium border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${c.name}"?`)) deleteCustomer(c.id);
                        }}
                        className="px-3 py-1.5 rounded-md text-xs font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-400">
                    No customers yet. Click &quot;Add Customer&quot; to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {customers.map((c) => (
          <div key={c.id} className="bg-white rounded-xl shadow-sm p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{c.name}</h3>
                <p className="text-sm text-gray-500">{c.profession}</p>
              </div>
              <StatusBadge customer={c} />
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-400">Phone</span>
                <p className="text-gray-700">{c.phone}</p>
              </div>
              <div>
                <span className="text-gray-400">Properties</span>
                <p className="text-gray-700">
                  {c.purchasedProperties.length + c.rentedProperties.length}
                </p>
              </div>
              <div>
                <span className="text-gray-400">Due</span>
                <p className="text-gray-700">৳{c.totalDue.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-gray-400">Paid</span>
                <p className="text-gray-700">৳{c.totalPaid.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              <Link
                href={`/admin/customers/${c.id}`}
                className="flex-1 text-center px-3 py-2 rounded-md text-xs font-medium text-white transition-colors"
                style={{ backgroundColor: settings.primaryColor }}
              >
                View Details
              </Link>
              <button
                onClick={() => setEditingCustomer(c)}
                className="px-3 py-2 rounded-md text-xs font-medium border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete "${c.name}"?`)) deleteCustomer(c.id);
                }}
                className="px-3 py-2 rounded-md text-xs font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {customers.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400">
            No customers yet. Click &quot;Add Customer&quot; to get started.
          </div>
        )}
      </div>
    </div>
  );
}
