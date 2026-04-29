"use client";

import Link from "next/link";
import { useApp } from "@/lib/context/AppProvider";

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  Services: [
    { label: "Buy Property", href: "/buy" },
    { label: "Rent Property", href: "/rent" },
    { label: "Sell Property", href: "/sell" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export default function Footer() {
  const { settings } = useApp();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span
                className="text-2xl font-serif font-bold"
                style={{ color: settings.primaryColor }}
              >
                {settings.logoAccent}
              </span>
              <span className="text-2xl font-serif font-bold text-white">
                {settings.logoText}
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover your dream property with our curated collection of
              premium homes, apartments, and commercial spaces across
              Bangladesh.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {settings.logoAccent}
            {settings.logoText}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
