"use client";

import { use } from "react";
import PropertyDetailPage from "@/components/module/public/property/PropertyDetailPage";

export default function PropertyDetailRoute({ params }) {
  const { id } = use(params);
  return <PropertyDetailPage id={id} />;
}
