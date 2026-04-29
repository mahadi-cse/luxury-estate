"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { mockProperties } from "@/lib/data/mockProperties";

const STORAGE_KEY_PROPERTIES = "luxe_properties";
const STORAGE_KEY_SETTINGS = "luxe_settings";

const defaultSettings = {
  primaryColor: "#C5A46D",
  logoText: "Estate",
  logoAccent: "Luxe",
};

const AppContext = createContext(undefined);

/**
 * App-wide provider for properties and site settings.
 * Uses a two-phase approach to avoid hydration mismatches:
 * 1. First render uses defaults (matches server HTML)
 * 2. After mount, loads from localStorage and applies
 */
export function AppProvider({ children }) {
  const [properties, setProperties] = useState(mockProperties);
  const [settings, setSettings] = useState(defaultSettings);
  const hasMounted = useRef(false);

  // Phase 2: load from localStorage after hydration
  useEffect(() => {
    try {
      const storedProps = localStorage.getItem(STORAGE_KEY_PROPERTIES);
      if (storedProps) setProperties(JSON.parse(storedProps));

      const storedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        setSettings(parsed);
        document.documentElement.style.setProperty(
          "--color-primary",
          parsed.primaryColor
        );
      }
    } catch {
      // localStorage unavailable or corrupt — keep defaults
    }
    hasMounted.current = true;
  }, []);

  // Persist properties on change (skip initial mount)
  useEffect(() => {
    if (!hasMounted.current) return;
    localStorage.setItem(STORAGE_KEY_PROPERTIES, JSON.stringify(properties));
  }, [properties]);

  // Persist settings + apply CSS variable on change (skip initial mount)
  useEffect(() => {
    if (!hasMounted.current) return;
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    document.documentElement.style.setProperty(
      "--color-primary",
      settings.primaryColor
    );
  }, [settings]);

  const addProperty = (property) => {
    setProperties((prev) => [
      ...prev,
      { ...property, id: Date.now().toString() },
    ]);
  };

  const updateProperty = (id, updates) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProperty = (id) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const updateSettings = (updates) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const resetToDefaults = () => {
    setProperties(mockProperties);
    setSettings(defaultSettings);
    document.documentElement.style.setProperty(
      "--color-primary",
      defaultSettings.primaryColor
    );
  };

  return (
    <AppContext.Provider
      value={{
        properties,
        settings,
        addProperty,
        updateProperty,
        deleteProperty,
        updateSettings,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

/** Hook to access the app context. */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
