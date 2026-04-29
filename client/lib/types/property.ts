/** Building-specific details */
export interface BuildingDetails {
  totalFloors: number;
  totalUnits: number;
  availableUnits: number;
  floorPlan: string;
  buildingAge: string;
  developer: string;
}

/** Apartment-specific details */
export interface ApartmentDetails {
  floor: number;
  totalFloors: number;
  facing: string;
  balconies: number;
  furnishing: "furnished" | "semi-furnished" | "unfurnished";
  maintenanceCost: number;
}

/** Property listing type */
export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: "sale" | "rent";
  category: "building" | "apartment" | "villa" | "studio";
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
  description: string;
  features: string[];
  yearBuilt: number;
  garage: number;
  galleryImages: string[];
  /** Present only when category is "building" */
  buildingDetails?: BuildingDetails;
  /** Present only when category is "apartment" or "studio" */
  apartmentDetails?: ApartmentDetails;
}
