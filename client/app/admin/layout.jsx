import AdminSidebar from "@/components/module/admin/AdminSidebar";

export const metadata = {
  title: "Admin — LuxeEstate",
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-10 overflow-auto">{children}</main>
    </div>
  );
}
