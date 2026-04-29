/** A property sale/rental record linking a property to a customer */
export interface PropertySale {
  id: string;
  propertyId: string;
  customerId: string;
  type: "sale" | "rent";
  status: "active" | "completed" | "cancelled";
  salePrice: number;
  totalPaid: number;
  totalDue: number;
  date: string;
  notes: string;
}
