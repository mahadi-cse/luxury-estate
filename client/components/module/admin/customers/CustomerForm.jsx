"use client";

import { useState } from "react";
import { useApp } from "@/lib/context/AppProvider";

const emptyCustomer = {
  name: "",
  phone: "",
  email: "",
  profession: "",
  address: "",
  nid: "",
  joinedDate: new Date().toISOString().split("T")[0],
  interests: [],
  purchasedProperties: [],
  rentedProperties: [],
  totalDue: 0,
  totalPaid: 0,
  payments: [],
  notes: "",
};

/**
 * Customer add/edit form. If `customer` is passed, it's edit mode.
 * Calls onClose when done.
 */
export default function CustomerForm({ customer, onClose }) {
  const { addCustomer, updateCustomer, settings } = useApp();
  const isEdit = !!customer;

  const [form, setForm] = useState(
    isEdit ? { ...customer } : { ...emptyCustomer }
  );
  const [interestsText, setInterestsText] = useState(
    isEdit ? customer.interests.join(", ") : ""
  );

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const interests = interestsText
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    const payload = {
      ...form,
      interests,
    };

    if (isEdit) {
      updateCustomer(customer.id, payload);
    } else {
      addCustomer(payload);
    }
    onClose();
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all";

  const labelClass = "block text-xs font-medium text-gray-600 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">
        {isEdit ? "Edit Customer" : "Add New Customer"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelClass}>Full Name</label>
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            required
            placeholder="e.g. Rafiqul Islam"
          />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input
            className={inputClass}
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            required
            placeholder="+8801XXXXXXXXX"
          />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input
            className={inputClass}
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="email@example.com"
          />
        </div>
        <div>
          <label className={labelClass}>Profession</label>
          <input
            className={inputClass}
            value={form.profession}
            onChange={(e) => set("profession", e.target.value)}
            placeholder="e.g. Software Engineer"
          />
        </div>
        <div>
          <label className={labelClass}>National ID (NID)</label>
          <input
            className={inputClass}
            value={form.nid}
            onChange={(e) => set("nid", e.target.value)}
            placeholder="NID number"
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Address</label>
          <input
            className={inputClass}
            value={form.address}
            onChange={(e) => set("address", e.target.value)}
            placeholder="Full address"
          />
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className={labelClass}>Interests (comma-separated)</label>
        <input
          className={inputClass}
          value={interestsText}
          onChange={(e) => setInterestsText(e.target.value)}
          placeholder="apartment, gulshan, 3-bed, modern..."
        />
      </div>

      {/* Notes */}
      <div>
        <label className={labelClass}>Notes</label>
        <textarea
          className={inputClass + " h-20 resize-none"}
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="Any additional notes about this customer..."
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg text-white text-sm font-medium transition-colors"
          style={{ backgroundColor: settings.primaryColor }}
        >
          {isEdit ? "Save Changes" : "Add Customer"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
