"use client";

import { use } from "react";
import CustomerDetail from "@/components/module/admin/customers/CustomerDetail";

export default function CustomerDetailPage({ params }) {
  const { id } = use(params);
  return <CustomerDetail customerId={id} />;
}
