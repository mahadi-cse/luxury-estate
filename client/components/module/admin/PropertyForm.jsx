"use client";

import { useState } from "react";
import { useApp } from "@/lib/context/AppProvider";
import ImageUploader from "./ImageUploader";

const emptyProperty = {
  title: "",
  price: 0,
  location: "",
  type: "sale",
  category: "apartment",
  bedrooms: 0,
  bathrooms: 0,
  sqft: 0,
  imageUrl: "",
  description: "",
  features: [],
  yearBuilt: 2024,
  garage: 0,
  galleryImages: [],
  buildingDetails: null,
  apartmentDetails: null,
};

/**
 * Property add/edit form. If `property` is passed, it's edit mode.
 * Calls onClose when done.
 */
export default function PropertyForm({ property, onClose }) {
  const { addProperty, updateProperty, settings } = useApp();
  const isEdit = !!property;

  const [form, setForm] = useState(
    isEdit ? { ...property } : { ...emptyProperty }
  );
  const [featuresText, setFeaturesText] = useState(
    isEdit ? property.features.join(", ") : ""
  );

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const features = featuresText
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    // Build category-specific details
    let buildingDetails = null;
    let apartmentDetails = null;

    if (form.category === "building") {
      buildingDetails = form.buildingDetails || {
        totalFloors: 0,
        totalUnits: 0,
        availableUnits: 0,
        floorPlan: "",
        buildingAge: "",
        developer: "",
      };
    } else {
      apartmentDetails = form.apartmentDetails || {
        floor: 0,
        totalFloors: 0,
        facing: "",
        balconies: 0,
        furnishing: "unfurnished",
        maintenanceCost: 0,
      };
    }

    const payload = {
      ...form,
      features,
      buildingDetails,
      apartmentDetails,
    };

    if (isEdit) {
      updateProperty(property.id, payload);
    } else {
      addProperty(payload);
    }
    onClose();
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all";

  const labelClass = "block text-xs font-medium text-gray-600 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">
        {isEdit ? "Edit Property" : "Add New Property"}
      </h2>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelClass}>Title</label>
          <input className={inputClass} value={form.title} onChange={(e) => set("title", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Price (BDT)</label>
          <input className={inputClass} type="number" value={form.price} onChange={(e) => set("price", Number(e.target.value))} required />
        </div>
        <div>
          <label className={labelClass}>Location</label>
          <input className={inputClass} value={form.location} onChange={(e) => set("location", e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Type</label>
          <select className={inputClass} value={form.type} onChange={(e) => set("type", e.target.value)}>
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select className={inputClass} value={form.category} onChange={(e) => set("category", e.target.value)}>
            <option value="apartment">Apartment</option>
            <option value="building">Building</option>
            <option value="villa">Villa</option>
            <option value="studio">Studio</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Bedrooms</label>
          <input className={inputClass} type="number" value={form.bedrooms} onChange={(e) => set("bedrooms", Number(e.target.value))} />
        </div>
        <div>
          <label className={labelClass}>Bathrooms</label>
          <input className={inputClass} type="number" value={form.bathrooms} onChange={(e) => set("bathrooms", Number(e.target.value))} />
        </div>
        <div>
          <label className={labelClass}>Area (sqft)</label>
          <input className={inputClass} type="number" value={form.sqft} onChange={(e) => set("sqft", Number(e.target.value))} />
        </div>
        <div>
          <label className={labelClass}>Year Built</label>
          <input className={inputClass} type="number" value={form.yearBuilt} onChange={(e) => set("yearBuilt", Number(e.target.value))} />
        </div>
        <div>
          <label className={labelClass}>Garage / Parking</label>
          <input className={inputClass} type="number" value={form.garage} onChange={(e) => set("garage", Number(e.target.value))} />
        </div>
      </div>

      {/* Cover Image Upload */}
      <ImageUploader
        images={form.imageUrl ? [form.imageUrl] : []}
        onChange={(urls) => set("imageUrl", urls[0] || "")}
        multiple={false}
        label="Cover Image"
      />

      {/* Description */}
      <div>
        <label className={labelClass}>Description</label>
        <textarea className={inputClass + " h-24 resize-none"} value={form.description} onChange={(e) => set("description", e.target.value)} />
      </div>

      {/* Features */}
      <div>
        <label className={labelClass}>Features (comma-separated)</label>
        <textarea className={inputClass + " h-20 resize-none"} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} placeholder="Central AC, Parking, Generator..." />
      </div>

      {/* Gallery Images Upload */}
      <ImageUploader
        images={form.galleryImages || []}
        onChange={(urls) => set("galleryImages", urls)}
        multiple={true}
        label="Gallery Images"
      />

      {/* Building-specific fields */}
      {form.category === "building" && (
        <fieldset className="border border-gray-200 rounded-xl p-4 space-y-4">
          <legend className="text-sm font-bold text-gray-700 px-2">Building Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Total Floors</label>
              <input className={inputClass} type="number" value={form.buildingDetails?.totalFloors || 0}
                onChange={(e) => set("buildingDetails", { ...form.buildingDetails, totalFloors: Number(e.target.value) })} />
            </div>
            <div>
              <label className={labelClass}>Total Units</label>
              <input className={inputClass} type="number" value={form.buildingDetails?.totalUnits || 0}
                onChange={(e) => set("buildingDetails", { ...form.buildingDetails, totalUnits: Number(e.target.value) })} />
            </div>
            <div>
              <label className={labelClass}>Available Units</label>
              <input className={inputClass} type="number" value={form.buildingDetails?.availableUnits || 0}
                onChange={(e) => set("buildingDetails", { ...form.buildingDetails, availableUnits: Number(e.target.value) })} />
            </div>
            <div>
              <label className={labelClass}>Developer</label>
              <input className={inputClass} value={form.buildingDetails?.developer || ""}
                onChange={(e) => set("buildingDetails", { ...form.buildingDetails, developer: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Floor Plan</label>
              <input className={inputClass} value={form.buildingDetails?.floorPlan || ""}
                onChange={(e) => set("buildingDetails", { ...form.buildingDetails, floorPlan: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Building Age</label>
              <input className={inputClass} value={form.buildingDetails?.buildingAge || ""}
                onChange={(e) => set("buildingDetails", { ...form.buildingDetails, buildingAge: e.target.value })} />
            </div>
          </div>
        </fieldset>
      )}

      {/* Apartment/Studio-specific fields */}
      {(form.category === "apartment" || form.category === "studio") && (
        <fieldset className="border border-gray-200 rounded-xl p-4 space-y-4">
          <legend className="text-sm font-bold text-gray-700 px-2">
            {form.category === "studio" ? "Studio" : "Apartment"} Details
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Floor</label>
              <input className={inputClass} type="number" value={form.apartmentDetails?.floor || 0}
                onChange={(e) => set("apartmentDetails", { ...form.apartmentDetails, floor: Number(e.target.value) })} />
            </div>
            <div>
              <label className={labelClass}>Total Floors</label>
              <input className={inputClass} type="number" value={form.apartmentDetails?.totalFloors || 0}
                onChange={(e) => set("apartmentDetails", { ...form.apartmentDetails, totalFloors: Number(e.target.value) })} />
            </div>
            <div>
              <label className={labelClass}>Facing</label>
              <input className={inputClass} value={form.apartmentDetails?.facing || ""}
                onChange={(e) => set("apartmentDetails", { ...form.apartmentDetails, facing: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Balconies</label>
              <input className={inputClass} type="number" value={form.apartmentDetails?.balconies || 0}
                onChange={(e) => set("apartmentDetails", { ...form.apartmentDetails, balconies: Number(e.target.value) })} />
            </div>
            <div>
              <label className={labelClass}>Furnishing</label>
              <select className={inputClass} value={form.apartmentDetails?.furnishing || "unfurnished"}
                onChange={(e) => set("apartmentDetails", { ...form.apartmentDetails, furnishing: e.target.value })}>
                <option value="furnished">Furnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="unfurnished">Unfurnished</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Maintenance Cost (BDT/mo)</label>
              <input className={inputClass} type="number" value={form.apartmentDetails?.maintenanceCost || 0}
                onChange={(e) => set("apartmentDetails", { ...form.apartmentDetails, maintenanceCost: Number(e.target.value) })} />
            </div>
          </div>
        </fieldset>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg text-white text-sm font-medium transition-colors"
          style={{ backgroundColor: settings.primaryColor }}
        >
          {isEdit ? "Save Changes" : "Add Property"}
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
