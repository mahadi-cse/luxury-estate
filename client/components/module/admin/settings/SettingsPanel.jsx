"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useApp } from "@/lib/context/AppProvider";

const presetColors = [
  "#C5A46D", "#3B82F6", "#10B981", "#EF4444",
  "#8B5CF6", "#F59E0B", "#EC4899", "#14B8A6",
  "#6366F1", "#84CC16",
];

export default function SettingsPanel() {
  const { settings, updateSettings, resetToDefaults } = useApp();
  const [color, setColor] = useState(settings.primaryColor);
  const [logoAccent, setLogoAccent] = useState(settings.logoAccent);
  const [logoText, setLogoText] = useState(settings.logoText);
  const [logoImage, setLogoImage] = useState(settings.logoImage || "");
  const [saved, setSaved] = useState(false);
  const fileRef = useRef(null);

  const handleSave = () => {
    updateSettings({ primaryColor: color, logoAccent, logoText, logoImage });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Reset all settings and properties to defaults?")) {
      resetToDefaults();
      setColor("#C5A46D");
      setLogoAccent("Luxe");
      setLogoText("Estate");
      setLogoImage("");
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setLogoImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Site Settings</h1>

      <div className="space-y-6">
        {/* Primary Color */}
        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Primary Color</h2>
          <p className="text-sm text-gray-500 mb-4">
            Used for buttons, accents, and highlights across the site.
          </p>

          <div className="flex items-center gap-4 mb-4">
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
              className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer" />
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm w-32 font-mono" />
          </div>

          <div className="flex flex-wrap gap-2">
            {presetColors.map((c) => (
              <button key={c} onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${color === c ? "border-gray-900 scale-110" : "border-transparent"}`}
                style={{ backgroundColor: c }} aria-label={`Select ${c}`} />
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Preview</p>
            <div className="flex flex-wrap items-center gap-3">
              <button className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: color }}>Button</button>
              <button className="px-4 py-2 rounded-lg border-2 text-sm font-medium" style={{ borderColor: color, color }}>Outline</button>
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: color }}>Badge</span>
            </div>
          </div>
        </div>

        {/* Logo Settings */}
        <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Logo</h2>
          <p className="text-sm text-gray-500 mb-4">
            Upload a logo image or customize the text-based logo.
          </p>

          {/* Logo Image Upload */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-600 mb-2">Logo Image</label>
            <div className="flex items-center gap-4">
              {/* Preview */}
              <div className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50 shrink-0">
                {logoImage ? (
                  <Image src={logoImage} alt="Logo" width={64} height={64} className="object-contain w-full h-full" unoptimized={logoImage.startsWith("blob:")} />
                ) : (
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button type="button" onClick={() => fileRef.current?.click()}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Upload Image
                </button>
                {logoImage && (
                  <button type="button" onClick={() => setLogoImage("")}
                    className="px-4 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors">
                    Remove
                  </button>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            </div>
            <p className="text-xs text-gray-400 mt-2">Recommended: 200×60px, PNG or SVG with transparent background.</p>
          </div>

          {/* Text Logo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Accent Word (colored)</label>
              <input type="text" value={logoAccent} onChange={(e) => setLogoAccent(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Main Word</label>
              <input type="text" value={logoText} onChange={(e) => setLogoText(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm" />
            </div>
          </div>

          {/* Logo Preview */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Preview</p>
            <div className="flex items-center gap-3">
              {logoImage ? (
                <Image src={logoImage} alt="Logo preview" width={40} height={40} className="object-contain" unoptimized={logoImage.startsWith("blob:")} />
              ) : (
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif font-bold text-lg" style={{ backgroundColor: color }}>
                  {logoAccent.charAt(0)}
                </div>
              )}
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-serif font-bold text-gray-900">
                  <span style={{ color }}>{logoAccent}</span>
                  <span className="font-normal">{logoText}</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Real Estate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={handleSave}
            className="px-6 py-2.5 rounded-lg text-white text-sm font-medium transition-colors"
            style={{ backgroundColor: color }}>
            {saved ? "✓ Saved!" : "Save Settings"}
          </button>
          <button onClick={handleReset}
            className="px-6 py-2.5 rounded-lg border border-red-300 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors">
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
