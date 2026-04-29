"use client";

import { useApp } from "@/lib/context/AppProvider";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageHero from "@/components/common/PageHero";

const openings = [
  { title: "Senior Full-Stack Developer", dept: "Engineering", type: "Full-time", location: "Dhaka" },
  { title: "UI/UX Designer", dept: "Design", type: "Full-time", location: "Dhaka" },
  { title: "Property Listing Manager", dept: "Operations", type: "Full-time", location: "Dhaka" },
  { title: "Digital Marketing Specialist", dept: "Marketing", type: "Full-time", location: "Remote" },
];

export default function CareersPage() {
  const { settings } = useApp();

  return (
    <div>
      <Navbar />
      <PageHero
        title="Careers"
        subtitle="Join our team and help shape the future of real estate in Bangladesh."
        breadcrumb="Careers"
      />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Open Positions
          </h2>

          <div className="space-y-4">
            {openings.map((job) => (
              <div
                key={job.title}
                className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>
                  <div className="flex flex-wrap gap-3 mt-1.5">
                    <span className="text-xs text-gray-500">{job.dept}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-500">{job.type}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-500">{job.location}</span>
                  </div>
                </div>
                <button
                  className="px-5 py-2 rounded-lg text-white text-sm font-medium shrink-0 transition-all hover:brightness-110"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  Apply
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Don&apos;t see your role?
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Send us your resume and we&apos;ll keep you in mind for future openings.
            </p>
            <a
              href="mailto:careers@luxeestate.com.bd"
              className="inline-block px-6 py-2.5 rounded-lg border-2 text-sm font-medium transition-colors hover:text-white"
              style={{ borderColor: settings.primaryColor, color: settings.primaryColor }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = settings.primaryColor; e.target.style.color = "white"; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = "transparent"; e.target.style.color = settings.primaryColor; }}
            >
              Send Resume
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
