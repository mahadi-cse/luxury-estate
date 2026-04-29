"use client";

import { use } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/AppProvider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ImageGallery from "@/components/module/public/property/ImageGallery";
import PropertyInfo from "@/components/module/public/property/PropertyInfo";

export default function PropertyDetailPage({ params }) {
  const { id } = use(params);
  const { properties } = useApp();
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return (
      <div>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Property Not Found
            </h1>
            <Link href="/" className="text-sm underline" style={{ color: "var(--color-primary)" }}>
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="transition-colors" style={{ color: "var(--color-primary)" }}>
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{property.title}</span>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <ImageGallery
              images={property.galleryImages}
              title={property.title}
            />
          </div>
          <div className="lg:col-span-2">
            <PropertyInfo property={property} />
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
