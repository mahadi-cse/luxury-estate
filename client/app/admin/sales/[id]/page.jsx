"use client";

import { use } from "react";
import SaleDetail from "@/components/module/admin/sales/SaleDetail";

export default function SaleDetailPage({ params }) {
  const { id } = use(params);
  return <SaleDetail saleId={id} />;
}
