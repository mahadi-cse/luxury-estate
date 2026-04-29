"use client";

import { useApp } from "@/lib/context/AppProvider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageHero from "@/components/common/PageHero";
import PropertyCard from "@/components/module/public/home/PropertyCard";

export default function RentPage() {
  const { properties } = useApp();
  const rentProperties = properties.filter((p) => p.type === "rent");

  return (
    <div>
      <Navbar />
      <PageHero
        title="Properties for Rent"
        subtitle="Find your next home from our collection of premium rental properties across Bangladesh."
        breadcrumb="Rent"
      />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-8">
            Showing {rentProperties.length} rental properties
          </p>

          {rentProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rentProperties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No rental properties available right now.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
