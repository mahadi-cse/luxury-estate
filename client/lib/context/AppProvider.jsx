"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { mockProperties } from "@/lib/data/mockProperties";
import { mockCustomers } from "@/lib/data/mockCustomers";
import { mockSales } from "@/lib/data/mockSales";

const STORAGE_KEY_PROPERTIES = "luxe_properties";
const STORAGE_KEY_SETTINGS = "luxe_settings";
const STORAGE_KEY_CUSTOMERS = "luxe_customers";
const STORAGE_KEY_SALES = "luxe_sales";

const defaultSettings = {
  primaryColor: "#C5A46D",
  logoText: "Estate",
  logoAccent: "Luxe",
  logoImage: "",
};

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const [properties, setProperties] = useState(mockProperties);
  const [settings, setSettings] = useState(defaultSettings);
  const [customers, setCustomers] = useState(mockCustomers);
  const [sales, setSales] = useState(mockSales);
  const hasMounted = useRef(false);

  useEffect(() => {
    try {
      const sp = localStorage.getItem(STORAGE_KEY_PROPERTIES);
      if (sp) setProperties(JSON.parse(sp));
      const sc = localStorage.getItem(STORAGE_KEY_CUSTOMERS);
      if (sc) setCustomers(JSON.parse(sc));
      const ss = localStorage.getItem(STORAGE_KEY_SALES);
      if (ss) setSales(JSON.parse(ss));
      const st = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (st) {
        const parsed = JSON.parse(st);
        setSettings(parsed);
        document.documentElement.style.setProperty("--color-primary", parsed.primaryColor);
      }
    } catch { /* keep defaults */ }
    hasMounted.current = true;
  }, []);

  useEffect(() => { if (hasMounted.current) localStorage.setItem(STORAGE_KEY_PROPERTIES, JSON.stringify(properties)); }, [properties]);
  useEffect(() => { if (hasMounted.current) localStorage.setItem(STORAGE_KEY_CUSTOMERS, JSON.stringify(customers)); }, [customers]);
  useEffect(() => { if (hasMounted.current) localStorage.setItem(STORAGE_KEY_SALES, JSON.stringify(sales)); }, [sales]);
  useEffect(() => {
    if (!hasMounted.current) return;
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    document.documentElement.style.setProperty("--color-primary", settings.primaryColor);
  }, [settings]);

  // Property CRUD
  const addProperty = (p) => setProperties((prev) => [...prev, { ...p, id: Date.now().toString() }]);
  const updateProperty = (id, u) => setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, ...u } : p)));
  const deleteProperty = (id) => setProperties((prev) => prev.filter((p) => p.id !== id));

  // Customer CRUD
  const addCustomer = (c) => setCustomers((prev) => [...prev, { ...c, id: Date.now().toString() }]);
  const updateCustomer = (id, u) => setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...u } : c)));
  const deleteCustomer = (id) => setCustomers((prev) => prev.filter((c) => c.id !== id));

  // Sale CRUD
  const addSale = (s) => setSales((prev) => [...prev, { ...s, id: Date.now().toString() }]);
  const updateSale = (id, u) => setSales((prev) => prev.map((s) => (s.id === id ? { ...s, ...u } : s)));
  const deleteSale = (id) => setSales((prev) => prev.filter((s) => s.id !== id));

  const updateSettings = (u) => setSettings((prev) => ({ ...prev, ...u }));

  const resetToDefaults = () => {
    setProperties(mockProperties);
    setCustomers(mockCustomers);
    setSales(mockSales);
    setSettings(defaultSettings);
    document.documentElement.style.setProperty("--color-primary", defaultSettings.primaryColor);
  };

  return (
    <AppContext.Provider value={{
      properties, settings, customers, sales,
      addProperty, updateProperty, deleteProperty,
      addCustomer, updateCustomer, deleteCustomer,
      addSale, updateSale, deleteSale,
      updateSettings, resetToDefaults,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
