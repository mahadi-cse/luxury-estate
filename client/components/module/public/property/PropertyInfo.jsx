"use client";

import { useApp } from "@/lib/context/AppProvider";

/**
 * Formats a number as BDT currency with lakh/crore shorthand.
 */
function formatPrice(price, type) {
  if (type === "rent") {
    return `৳${price.toLocaleString("en-BD")}/mo`;
  }
  if (price >= 10000000) {
    const crore = price / 10000000;
    return `৳${crore % 1 === 0 ? crore.toFixed(0) : crore.toFixed(1)} Crore`;
  }
  if (price >= 100000) {
    const lakh = price / 100000;
    return `৳${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(1)} Lakh`;
  }
  return `৳${price.toLocaleString("en-BD")}`;
}

/** Reusable detail row for info grids. */
function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-100">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}

/** Small stat item used in the key stats grid. */
function StatItem({ icon, label, value, settings }) {
  const icons = {
    bed: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
      </svg>
    ),
    bath: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    area: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
      </svg>
    ),
    year: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  };

  return (
    <div className="text-center">
      <div className="flex justify-center mb-1" style={{ color: settings.primaryColor }}>{icons[icon]}</div>
      <p className="text-sm font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

/** Building details section — floors, units, developer info. */
function BuildingInfo({ details, settings }) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
        <svg className="w-5 h-5" style={{ color: settings.primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        Building Information
      </h2>
      <div className="bg-gray-50 rounded-xl p-4">
        <DetailRow label="Total Floors" value={details.totalFloors} />
        <DetailRow label="Total Units" value={details.totalUnits} />
        <DetailRow label="Available Units" value={details.availableUnits} />
        <DetailRow label="Floor Plan" value={details.floorPlan} />
        <DetailRow label="Building Age" value={details.buildingAge} />
        <DetailRow label="Developer" value={details.developer} />
      </div>
    </div>
  );
}

/** Apartment/Studio details section — floor, facing, furnishing etc. */
function ApartmentInfo({ details, category, settings }) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
        <svg className="w-5 h-5" style={{ color: settings.primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
        </svg>
        {category === "studio" ? "Studio" : "Apartment"} Details
      </h2>
      <div className="bg-gray-50 rounded-xl p-4">
        <DetailRow label="Floor" value={`${details.floor} of ${details.totalFloors}`} />
        <DetailRow label="Facing" value={details.facing} />
        <DetailRow label="Balconies" value={details.balconies} />
        <DetailRow label="Furnishing" value={details.furnishing.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())} />
        <DetailRow label="Maintenance Cost" value={`৳${details.maintenanceCost.toLocaleString()}/mo`} />
      </div>
    </div>
  );
}

/**
 * Property info panel — adapts content based on property category.
 * Shows building info for buildings, apartment info for apartments/studios.
 */
export default function PropertyInfo({ property }) {
  const { settings } = useApp();

  const categoryLabels = {
    building: "Building",
    apartment: "Apartment",
    villa: "Villa",
    studio: "Studio",
  };

  return (
    <div>
      {/* Badges */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
            property.type === "sale"
              ? "text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          style={property.type === "sale" ? { backgroundColor: settings.primaryColor } : undefined}
        >
          For {property.type}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-gray-900 text-white">
          {categoryLabels[property.category]}
        </span>
      </div>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
        {property.title}
      </h1>

      <p className="mt-2 text-2xl font-bold" style={{ color: settings.primaryColor }}>
        {formatPrice(property.price, property.type)}
      </p>

      {/* Location */}
      <p className="mt-3 text-gray-500 flex items-center gap-1.5">
        <svg className="w-5 h-5" style={{ color: settings.primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {property.location}
      </p>

      {/* Key Stats Grid — only for non-building types */}
      {property.category !== "building" && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 p-4 bg-gray-50 rounded-xl">
          <StatItem icon="bed" label="Bedrooms" value={property.bedrooms} settings={settings} />
          <StatItem icon="bath" label="Bathrooms" value={property.bathrooms} settings={settings} />
          <StatItem icon="area" label="Area" value={`${property.sqft.toLocaleString()} sqft`} settings={settings} />
          <StatItem icon="year" label="Year Built" value={property.yearBuilt} settings={settings} />
        </div>
      )}

      {/* Building stats — total area, year, floors */}
      {property.category === "building" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 p-4 bg-gray-50 rounded-xl">
          <StatItem icon="area" label="Total Area" value={`${property.sqft.toLocaleString()} sqft`} settings={settings} />
          <StatItem icon="year" label="Year Built" value={property.yearBuilt} settings={settings} />
          <StatItem icon="bed" label="Total Floors" value={property.buildingDetails?.totalFloors} settings={settings} />
        </div>
      )}

      {/* Conditional: Building Details */}
      {property.category === "building" && property.buildingDetails && (
        <BuildingInfo details={property.buildingDetails} settings={settings} />
      )}

      {/* Conditional: Apartment / Studio Details */}
      {(property.category === "apartment" || property.category === "studio") && property.apartmentDetails && (
        <ApartmentInfo details={property.apartmentDetails} category={property.category} settings={settings} />
      )}

      {/* Description */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Description</h2>
        <p className="text-gray-600 leading-relaxed">{property.description}</p>
      </div>

      {/* Features */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Features & Amenities</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {property.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-gray-600 text-sm">
              <svg className="w-4 h-4 shrink-0" style={{ color: settings.primaryColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Contact CTA */}
      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <button className="flex-1 text-white px-6 py-3.5 rounded-lg font-medium hover:brightness-110 transition-colors shadow-md" style={{ backgroundColor: settings.primaryColor }}>
          Schedule a Visit
        </button>
        <button className="flex-1 border-2 px-6 py-3.5 rounded-lg font-medium hover:brightness-110 transition-colors" style={{ borderColor: settings.primaryColor, color: settings.primaryColor }}>
          Contact Agent
        </button>
      </div>
    </div>
  );
}
