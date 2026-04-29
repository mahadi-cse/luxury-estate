export interface Payment {
  id: string;
  date: string;
  amount: number;
  method: "bank" | "bkash" | "cash" | "check";
  status: "paid" | "pending" | "overdue";
  note: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  profession: string;
  address: string;
  nid: string; // National ID
  joinedDate: string;
  interests: string[]; // e.g. ["apartment", "gulshan", "3-bed"]
  purchasedProperties: string[]; // property IDs
  rentedProperties: string[]; // property IDs
  totalDue: number;
  totalPaid: number;
  payments: Payment[];
  notes: string;
}
