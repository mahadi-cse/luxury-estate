import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PageHero from "@/components/common/PageHero";

const sections = [
  { title: "Information We Collect", content: "We collect personal information you provide when creating an account, listing a property, or contacting us. This includes your name, email address, phone number, and property details. We also collect usage data such as pages visited, time spent, and device information through cookies and analytics." },
  { title: "How We Use Your Information", content: "Your information is used to provide and improve our services, process property listings, connect buyers with sellers, send relevant notifications, and ensure platform security. We do not sell your personal data to third parties." },
  { title: "Data Sharing", content: "We may share your contact information with agents or property owners when you express interest in a listing. We also share anonymized analytics data with service providers who help us operate the platform." },
  { title: "Cookies", content: "We use essential cookies to keep you logged in and remember your preferences. Analytics cookies help us understand how the site is used. You can disable non-essential cookies in your browser settings." },
  { title: "Data Security", content: "We implement industry-standard security measures including encryption, secure servers, and regular audits to protect your personal information from unauthorized access or disclosure." },
  { title: "Your Rights", content: "You have the right to access, correct, or delete your personal data at any time. You can also opt out of marketing communications. Contact us at privacy@luxeestate.com.bd to exercise these rights." },
  { title: "Changes to This Policy", content: "We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of the platform after changes constitutes acceptance." },
];

export default function PrivacyPage() {
  return (
    <div>
      <Navbar />
      <PageHero
        title="Privacy Policy"
        subtitle="Last updated: April 2026"
        breadcrumb="Privacy Policy"
      />

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-lg font-bold text-gray-900 mb-3">
                {i + 1}. {s.title}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {s.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
