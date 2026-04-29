"use client";

import { useState } from "react";
import { useApp } from "@/lib/context/AppProvider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageHero from "@/components/common/PageHero";
import ImageUploader from "@/components/module/admin/shared/ImageUploader";

export default function ListPropertyPage() {
  const { settings } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [images, setImages] = useState([]);

  if (submitted) {
    return (
      <div>
        <Navbar />
        <PageHero title="Property Submitted" breadcrumb="List Property" />
        <section className="py-20">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: settings.primaryColor }}
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Thank you!
            </h2>
            <p className="text-gray-500 mb-6">
              Your property listing has been submitted for review. Our team will
              get back to you within 24 hours.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 rounded-lg text-white font-medium transition-all hover:brightness-110"
              style={{ backgroundColor: settings.primaryColor }}
            >
              Back to Home
            </a>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <PageHero
        title="List Your Property"
        subtitle="Fill in the details below and our team will review your listing."
        breadcrumb="List Property"
      />

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="bg-white rounded-2xl shadow-sm p-6 sm:p-10 space-y-6"
          >
            <h2 className="text-xl font-bold text-gray-900">Property Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Property Title</label>
                <input type="text" required placeholder="e.g. Modern Apartment in Gulshan"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm">
                  <option>Apartment</option>
                  <option>Building</option>
                  <option>Villa</option>
                  <option>Studio</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Listing Type</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm">
                  <option>For Sale</option>
                  <option>For Rent</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Price (BDT)</label>
                <input type="number" required placeholder="0"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
                <input type="text" required placeholder="e.g. Gulshan-2, Dhaka"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Bedrooms</label>
                <input type="number" placeholder="0"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Bathrooms</label>
                <input type="number" placeholder="0"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Area (sqft)</label>
                <input type="number" placeholder="0"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
              <textarea rows={4} placeholder="Describe your property..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none" />
            </div>

            {/* Image Upload */}
            <ImageUploader
              images={images}
              onChange={setImages}
              multiple={true}
              label="Property Photos"
            />

            {/* Contact Info */}
            <h2 className="text-xl font-bold text-gray-900 pt-4">Your Contact Info</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Full Name</label>
                <input type="text" required placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Phone Number</label>
                <input type="tel" required placeholder="+880 1XXX-XXXXXX"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                <input type="email" placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg text-white font-semibold text-sm transition-all hover:shadow-lg hover:brightness-110"
              style={{ backgroundColor: settings.primaryColor }}
            >
              Submit Listing
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
