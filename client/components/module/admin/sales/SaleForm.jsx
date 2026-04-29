"use client";

import { useState } from "react";
import { useApp } from "@/lib/context/AppProvider";

export default function SaleForm({ sale, onClose }) {
  const { properties, customers, addSale, updateSale, settings } = useApp();
  const isEdit = !!sale;

  const [form, setForm] = useState(
    isEdit
      ? { ...sale }
      : {
          propertyId: properties[0]?.id || "",
          customerId: customers[0]?.id || "",
          type: "sale",
          status: "active",
          salePrice: 0,
          totalPaid: 0,
          totalDue: 0,
          date: new Date().toISOString().split("T")[0],
          notes: "",
        }
  );

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateSale(sale.id, form);
    } else {
      addSale(form);
    }
    onClose();
  };

  const inputClass = "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all";
  const labelClass = "block text-xs font-medium text-gray-600 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">
        {isEdit ? "Edit Sale" : "Add New Sale"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Property</label>
          <select className={inputClass} value={form.propertyId} onChange={(e) => set("propertyId", e.target.value)}>
            {properties.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Customer</label>
          <select className={inputClass} value={form.customerId} onChange={(e) => set("customerId", e.target.value)}>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Type</label>
          <select className={inputClass} value={form.type} onChange={(e) => set("type", e.target.value)}>
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select className={inputClass} value={form.status} onChange={(e) => set("status", e.target.value)}>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Sale Price (BDT)</label>
          <input className={inputClass} type="number" value={form.salePrice} onChange={(e) => set("salePrice", Number(e.target.value))} />
        </div>
        <div>
          <label className={labelClass}>Total Paid (BDT)</label>
          <input className={inputClass} type="number" value={form.totalPaid} onChange={(e) => set("totalPaid", Number(e.target.value))} />
        </div>
        <div>
          <label className={labelClass}>Total Due (BDT)</label>
          <input className={inputClass} type="number" value={form.totalDue} onChange={(e) => set("totalDue", Number(e.target.value))} />
        </div>
        <div>
          <label className={labelClass}>Date</label>
          <input className={inputClass} type="date" value={form.date} onChange={(e) => set("date", e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Notes</label>
        <textarea className={inputClass + " h-20 resize-none"} value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Sale notes..." />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="px-6 py-2.5 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: settings.primaryColor }}>
          {isEdit ? "Save Changes" : "Add Sale"}
        </button>
        <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
