"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/AppProvider";

const methodLabels = {
  bank: "Bank Transfer",
  bkash: "bKash",
  cash: "Cash",
  check: "Check",
};

function PaymentStatusBadge({ status }) {
  const styles = {
    paid: "bg-green-50 text-green-700",
    pending: "bg-yellow-50 text-yellow-700",
    overdue: "bg-red-50 text-red-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}

function AddPaymentForm({ onAdd, settings }) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bank");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    onAdd({
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      amount: Number(amount),
      method,
      status: "paid",
      note,
    });
    setAmount("");
    setMethod("bank");
    setNote("");
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all";

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-4 space-y-3">
      <h4 className="text-sm font-semibold text-gray-700">Add Payment</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Amount (BDT)</label>
          <input
            className={inputClass}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Method</label>
          <select className={inputClass} value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="bank">Bank Transfer</option>
            <option value="bkash">bKash</option>
            <option value="cash">Cash</option>
            <option value="check">Check</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Note</label>
          <input
            className={inputClass}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Payment note"
          />
        </div>
      </div>
      <button
        type="submit"
        className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors"
        style={{ backgroundColor: settings.primaryColor }}
      >
        Record Payment
      </button>
    </form>
  );
}

export default function CustomerDetail({ customerId }) {
  const { customers, properties, updateCustomer, settings } = useApp();
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const customer = customers.find((c) => c.id === customerId);

  if (!customer) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Customer Not Found</h1>
          <Link
            href="/admin/customers"
            className="text-sm underline"
            style={{ color: settings.primaryColor }}
          >
            Back to Customers
          </Link>
        </div>
      </div>
    );
  }

  const purchasedProps = properties.filter((p) =>
    customer.purchasedProperties.includes(p.id)
  );
  const rentedProps = properties.filter((p) =>
    customer.rentedProperties.includes(p.id)
  );
  const balance = customer.totalDue;

  const handleAddPayment = (payment) => {
    const updatedPayments = [...customer.payments, payment];
    const newTotalPaid = customer.totalPaid + payment.amount;
    const newTotalDue = Math.max(0, customer.totalDue - payment.amount);
    updateCustomer(customer.id, {
      payments: updatedPayments,
      totalPaid: newTotalPaid,
      totalDue: newTotalDue,
    });
    setShowPaymentForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link
        href="/admin/customers"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Customers
      </Link>

      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
            <p className="text-gray-500 mt-1">{customer.profession}</p>
          </div>
          <div className="text-sm text-gray-500">
            Joined {new Date(customer.joinedDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-gray-700">{customer.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-700">{customer.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-700">{customer.address}</span>
          </div>
        </div>

        {customer.nid && (
          <p className="text-xs text-gray-400 mt-3">NID: {customer.nid}</p>
        )}
      </div>

      {/* Interests */}
      {customer.interests.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {customer.interests.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: settings.primaryColor }}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Properties */}
      {(purchasedProps.length > 0 || rentedProps.length > 0) && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Properties</h2>
          <div className="space-y-3">
            {purchasedProps.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Purchased</p>
                <div className="space-y-2">
                  {purchasedProps.map((p) => (
                    <div key={p.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{p.title}</p>
                        <p className="text-xs text-gray-500">{p.location}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        Purchased
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {rentedProps.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Rented</p>
                <div className="space-y-2">
                  {rentedProps.map((p) => (
                    <div key={p.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{p.title}</p>
                        <p className="text-xs text-gray-500">{p.location}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        Rented
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Payment Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-xs text-green-600 font-medium">Total Paid</p>
            <p className="text-xl font-bold text-green-700 mt-1">
              ৳{customer.totalPaid.toLocaleString()}
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-xs text-yellow-600 font-medium">Total Due</p>
            <p className="text-xl font-bold text-yellow-700 mt-1">
              ৳{customer.totalDue.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 font-medium">Balance</p>
            <p className="text-xl font-bold text-gray-700 mt-1">
              ৳{balance.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700">Payment History</h2>
          <button
            onClick={() => setShowPaymentForm(!showPaymentForm)}
            className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors"
            style={{ backgroundColor: settings.primaryColor }}
          >
            {showPaymentForm ? "Cancel" : "+ Add Payment"}
          </button>
        </div>

        {showPaymentForm && (
          <div className="mb-4">
            <AddPaymentForm onAdd={handleAddPayment} settings={settings} />
          </div>
        )}

        {customer.payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Amount</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Method</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customer.payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-700">
                      {new Date(payment.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      ৳{payment.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {methodLabels[payment.method] || payment.method}
                    </td>
                    <td className="px-4 py-3">
                      <PaymentStatusBadge status={payment.status} />
                    </td>
                    <td className="px-4 py-3 text-gray-500 max-w-[200px] truncate">
                      {payment.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-400 py-8">No payments recorded yet.</p>
        )}
      </div>

      {/* Notes */}
      {customer.notes && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Notes</h2>
          <p className="text-sm text-gray-600">{customer.notes}</p>
        </div>
      )}
    </div>
  );
}
