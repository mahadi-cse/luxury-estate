"use client";

import { useState } from "react";
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
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings({
      primaryColor: color,
      logoAccent,
      logoText,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm("Reset all settings and properties to defaults?")) {
      resetToDefaults();
      setColor("#C5A46D");
      setLogoAccent("Luxe");
      setLogoText("Estate");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Site Settings</h1>

      <div className="space-y-8">
        {/* Primary Color */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Primary Color
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            This color is used for buttons, accents, badges, and highlights
            across the entire site.
          </p>

          {/* Color Picker */}
          <div className="flex items-center gap-4 mb-4">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm w-32 font-mono"
            />
          </div>

          {/* Preset Colors */}
          <div className="flex flex-wrap gap-2">
            {presetColors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  color === c ? "border-gray-900 scale-110" : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>

          {/* Preview */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Preview</p>
            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                style={{ backgroundColor: color }}
              >
                Primary Button
              </button>
              <button
                className="px-4 py-2 rounded-lg border-2 text-sm font-medium"
                style={{ borderColor: color, color }}
              >
                Outline Button
              </button>
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: color }}
              >
                Badge
              </span>
            </div>
          </div>
        </div>

        {/* Logo Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Logo</h2>
          <p className="text-sm text-gray-500 mb-4">
            Customize the text-based logo shown in the navbar and footer.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Accent Word (colored)
              </label>
              <input
                type="text"
                value={logoAccent}
                onChange={(e) => setLogoAccent(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Main Word
              </label>
              <input
                type="text"
                value={logoText}
                onChange={(e) => setLogoText(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
              />
            </div>
          </div>

          {/* Logo Preview */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-2">Preview</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif font-bold" style={{ color }}>
                {logoAccent}
              </span>
              <span className="text-2xl font-serif font-bold text-gray-900">
                {logoText}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-lg text-white text-sm font-medium transition-colors"
            style={{ backgroundColor: color }}
          >
            {saved ? "✓ Saved!" : "Save Settings"}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-lg border border-red-300 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
          >
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
