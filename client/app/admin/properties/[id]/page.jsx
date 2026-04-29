"use client";

import { use } from "react";
import PropertyDetail from "@/components/module/admin/properties/PropertyDetail";

export default function PropertyDetailPage({ params }) {
  const { id } = use(params);
  return <PropertyDetail propertyId={id} />;
}
