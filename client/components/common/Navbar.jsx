"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/context/AppProvider";

const navLinks = [
  { label: "Buy", href: "/buy" },
  { label: "Rent", href: "/rent" },
  { label: "Sell", href: "/sell" },
  { label: "Agents", href: "/agents" },
];

/**
 * Navbar — two modes:
 *  • Home page: absolutely positioned over the hero, transparent bg, white text
 *  • Inner pages: normal document flow, solid white bg, dark text
 *
 * NOT sticky/fixed. Scrolls away naturally.
 */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { settings } = useApp();
  const isHome = pathname === "/";

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header
      className={
        isHome
          ? "absolute top-0 left-0 right-0 z-40"
          : "relative z-40 bg-white border-b border-gray-100"
      }
    >
      {/* Top accent bar */}
      <div className="h-1" style={{ backgroundColor: settings.primaryColor }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            {settings.logoImage ? (
              <img
                src={settings.logoImage}
                alt="Logo"
                className="w-9 h-9 rounded-lg object-contain"
              />
            ) : (
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif font-bold text-lg"
                style={{ backgroundColor: settings.primaryColor }}
              >
                {settings.logoAccent.charAt(0)}
              </div>
            )}
            <div className="flex flex-col leading-tight">
              <span
                className={`text-lg font-serif font-bold tracking-tight ${
                  isHome ? "text-white" : "text-gray-900"
                }`}
              >
                {settings.logoAccent}
                <span className="font-normal">{settings.logoText}</span>
              </span>
              <span
                className={`text-[10px] uppercase tracking-[0.2em] ${
                  isHome ? "text-white/50" : "text-gray-400"
                }`}
              >
                Real Estate
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : isHome
                      ? "text-white/70 hover:text-white hover:bg-white/10"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                  style={isActive ? { backgroundColor: settings.primaryColor } : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isHome
                  ? "text-white/60 hover:text-white hover:bg-white/10"
                  : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Admin
            </Link>
            <Link
              href="/list-property"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:brightness-110"
              style={{ backgroundColor: settings.primaryColor }}
            >
              <svg className="w-4 h-4 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              List Property
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              isHome ? "hover:bg-white/10" : "hover:bg-gray-50"
            }`}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-[5px]">
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 origin-center ${
                  isHome ? "bg-white" : "bg-gray-800"
                } ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}
              />
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 ${
                  isHome ? "bg-white" : "bg-gray-800"
                } ${mobileOpen ? "opacity-0 scale-0" : ""}`}
              />
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 origin-center ${
                  isHome ? "bg-white" : "bg-gray-800"
                } ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={`px-4 py-4 space-y-1 ${isHome ? "bg-gray-900/95 backdrop-blur-lg" : "bg-white border-t border-gray-100"}`}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white"
                    : isHome
                    ? "text-gray-300 hover:text-white hover:bg-white/10"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                style={isActive ? { backgroundColor: settings.primaryColor } : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2 space-y-1">
            <Link
              href="/list-property"
              className="block text-center px-4 py-3 rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: settings.primaryColor }}
            >
              + List Property
            </Link>
            <Link
              href="/admin"
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isHome
                  ? "text-gray-400 hover:text-white hover:bg-white/10"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
