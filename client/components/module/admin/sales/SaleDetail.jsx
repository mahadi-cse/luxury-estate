"use client";

import Link from "next/link";
import { useApp } from "@/lib/context/AppProvider";

function formatPrice(price) {
  if (price >= 10000000) return `৳${(price / 10000000).toFixed(1)} Crore`;
  if (price >= 100000) return `৳${(price / 100000).toFixed(0)} Lakh`;
  return `৳${price.toLocaleString()}`;
}

export default function SaleDetail({ saleId }) {
  const { sales, properties, customers, settings } = useApp();
  const sale = sales.find((s) => s.id === saleId);

  if (!sale) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sale Not Found</h1>
          <Link href="/admin/sales" className="text-sm underline" style={{ color: settings.primaryColor }}>Back to Sales</Link>
        </div>
      </div>
    );
  }

  const property = properties.find((p) => p.id === sale.propertyId);
  const customer = customers.find((c) => c.id === sale.customerId);

  const statusStyles = {
    active: "bg-green-50 text-green-700",
    completed: "bg-blue-50 text-blue-700",
    cancelled: "bg-gray-100 text-gray-500",
  };

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/sales" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Sales
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Sale #{sale.id.slice(-4)}
          </h1>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[sale.status]}`}>
            {sale.status}
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">Type</p>
          <p className="text-lg font-bold text-gray-900 mt-1 capitalize">{sale.type}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">Sale Price</p>
          <p className="text-lg font-bold text-gray-900 mt-1">{formatPrice(sale.salePrice)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">Total Paid</p>
          <p className="text-lg font-bold text-green-600 mt-1">৳{sale.totalPaid.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">Total Due</p>
          <p className="text-lg font-bold text-yellow-600 mt-1">৳{sale.totalDue.toLocaleString()}</p>
        </div>
      </div>

      {/* Property Info */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Property</h3>
        {property ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{property.title}</p>
              <p className="text-xs text-gray-500">{property.location} • {property.category}</p>
            </div>
            <Link href={`/admin/properties/${property.id}`}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-white shrink-0"
              style={{ backgroundColor: settings.primaryColor }}>
              View Property
            </Link>
          </div>
        ) : (
          <p className="text-sm text-gray-400">Property not found.</p>
        )}
      </div>

      {/* Customer Info */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Customer</h3>
        {customer ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{customer.name}</p>
              <p className="text-xs text-gray-500">{customer.profession} • {customer.phone}</p>
            </div>
            <Link href={`/admin/customers/${customer.id}`}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-white shrink-0"
              style={{ backgroundColor: settings.primaryColor }}>
              View Customer
            </Link>
          </div>
        ) : (
          <p className="text-sm text-gray-400">Customer not found.</p>
        )}
      </div>

      {/* Notes */}
      {sale.notes && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Notes</h3>
          <p className="text-sm text-gray-600">{sale.notes}</p>
        </div>
      )}

      {/* Date */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Sale Date</h3>
        <p className="text-sm text-gray-600">
          {new Date(sale.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>
    </div>
  );
}
