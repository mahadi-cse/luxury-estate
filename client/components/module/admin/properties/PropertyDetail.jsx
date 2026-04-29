"use client";

import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/lib/context/AppProvider";

function formatPrice(price, type) {
  if (type === "rent") return `৳${price.toLocaleString()}/mo`;
  if (price >= 10000000) return `৳${(price / 10000000).toFixed(1)} Crore`;
  if (price >= 100000) return `৳${(price / 100000).toFixed(0)} Lakh`;
  return `৳${price.toLocaleString()}`;
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-900 capitalize">{value}</p>
    </div>
  );
}

/** Property detail — property info only (no sale data) */
export default function PropertyDetail({ propertyId }) {
  const { properties, settings } = useApp();
  const property = properties.find((p) => p.id === propertyId);

  if (!property) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h1>
          <Link href="/admin/properties" className="text-sm underline" style={{ color: settings.primaryColor }}>Back to Properties</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/properties" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Properties
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{property.title}</h1>
        <p className="text-sm text-gray-500 mt-0.5">{property.location}</p>
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Property Details</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <InfoItem label="Category" value={property.category} />
          <InfoItem label="Type" value={`For ${property.type}`} />
          <InfoItem label="Bedrooms" value={property.bedrooms} />
          <InfoItem label="Bathrooms" value={property.bathrooms} />
          <InfoItem label="Area" value={`${property.sqft.toLocaleString()} sqft`} />
          <InfoItem label="Year Built" value={property.yearBuilt} />
          <InfoItem label="Garage" value={property.garage} />
          <InfoItem label="Price" value={formatPrice(property.price, property.type)} />
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Description</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{property.description}</p>
      </div>

      {/* Features */}
      {property.features?.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {property.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 shrink-0" style={{ color: settings.primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Building Details */}
      {property.category === "building" && property.buildingDetails && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Building Details</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <InfoItem label="Total Floors" value={property.buildingDetails.totalFloors} />
            <InfoItem label="Total Units" value={property.buildingDetails.totalUnits} />
            <InfoItem label="Available" value={property.buildingDetails.availableUnits} />
            <InfoItem label="Floor Plan" value={property.buildingDetails.floorPlan} />
            <InfoItem label="Developer" value={property.buildingDetails.developer} />
            <InfoItem label="Building Age" value={property.buildingDetails.buildingAge} />
          </div>
        </div>
      )}

      {/* Apartment Details */}
      {(property.category === "apartment" || property.category === "studio") && property.apartmentDetails && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">{property.category === "studio" ? "Studio" : "Apartment"} Details</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <InfoItem label="Floor" value={`${property.apartmentDetails.floor} of ${property.apartmentDetails.totalFloors}`} />
            <InfoItem label="Facing" value={property.apartmentDetails.facing} />
            <InfoItem label="Balconies" value={property.apartmentDetails.balconies} />
            <InfoItem label="Furnishing" value={property.apartmentDetails.furnishing} />
            <InfoItem label="Maintenance" value={`৳${property.apartmentDetails.maintenanceCost.toLocaleString()}/mo`} />
          </div>
        </div>
      )}

      {/* Gallery */}
      {property.galleryImages?.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Gallery</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {property.galleryImages.map((img, i) => (
              <div key={i} className="relative h-24 rounded-lg overflow-hidden">
                <Image src={img} alt={`${property.title} ${i + 1}`} fill className="object-cover" sizes="25vw" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
