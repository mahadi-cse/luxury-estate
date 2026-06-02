"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/lib/context/AppProvider";

const API_BASE = "http://localhost:5000/api/tracker";

// Default Mock Data for Fallback/Offline Mode
const initialMockTrackerData = {
  // Banani Apartment
  "2": {
    activities: [
      {
        id: "act-1",
        date: "2026-06-01",
        workDone: "Plastering of 5th floor internal walls & electrical conduit routing.",
        laborCount: 12,
        supervisor: "Engr. Tasnim Ahmed",
        remarks: "Work completed within schedule. Plaster quality verified.",
        createdAt: "2026-06-01T17:00:00.000Z",
      },
      {
        id: "act-2",
        date: "2026-05-30",
        workDone: "Brickwork on 6th floor partition walls & bathroom piping installation.",
        laborCount: 16,
        supervisor: "Engr. Tasnim Ahmed",
        remarks: "Slight delay due to mid-day rain, caught up in the evening session.",
        createdAt: "2026-05-30T17:30:00.000Z",
      },
    ],
    accounts: [
      {
        id: "acc-1",
        date: "2026-06-01",
        type: "expense",
        category: "labor",
        amount: 8500,
        paymentMethod: "cash",
        reference: "VCH-2026-104",
        description: "Daily wage payment for plastering masons and helpers.",
      },
      {
        id: "acc-2",
        date: "2026-05-30",
        type: "expense",
        category: "material",
        amount: 24000,
        paymentMethod: "cash",
        reference: "VCH-2026-098",
        description: "Spot payment to Local Brick Co. for first class bricks.",
      },
      {
        id: "acc-3",
        date: "2026-05-28",
        type: "income",
        category: "other",
        amount: 150000,
        paymentMethod: "bank",
        reference: "TRN-901124",
        description: "Allocated petty cash budget release from HQ bank account.",
      },
    ],
    challans: [
      {
        id: "chal-1",
        date: "2026-06-01",
        challanNo: "CH-9921",
        vendorName: "Bengal Cement Mills Ltd.",
        materialName: "Portland Cement",
        quantity: 100,
        unit: "Bags",
        totalCost: 52000,
        receivedBy: "Tasnim Ahmed",
        status: "approved",
        notes: "Grade 53 OPC. 2 bags damaged in transit (rejected).",
      },
      {
        id: "chal-2",
        date: "2026-05-30",
        challanNo: "CH-9811",
        vendorName: "Bengal Brick Ltd.",
        materialName: "Auto-Bricks Class 1",
        quantity: 3000,
        unit: "Pieces",
        totalCost: 24000,
        receivedBy: "M. Rahman (Storekeeper)",
        status: "approved",
        notes: "Class-1 red bricks. Count verified on delivery.",
      },
      {
        id: "chal-3",
        date: "2026-06-02",
        challanNo: "CH-1002",
        vendorName: "Sylhet Sand Supplies",
        materialName: "Coarse Sylhet Sand",
        quantity: 500,
        unit: "CFT",
        totalCost: 35000,
        receivedBy: "M. Rahman",
        status: "pending",
        notes: "Moisture content slightly high, awaiting supervisor signoff.",
      },
    ],
  },
  // Skyline Tower
  "3": {
    activities: [
      {
        id: "act-3",
        date: "2026-06-02",
        workDone: "Casting of 3rd floor columns and lift core shuttering.",
        laborCount: 28,
        supervisor: "Engr. M. A. Karim",
        remarks: "Heavy equipment operator arrived on time. Concrete batching completed.",
        createdAt: "2026-06-02T10:00:00.000Z",
      },
    ],
    accounts: [
      {
        id: "acc-4",
        date: "2026-06-02",
        type: "expense",
        category: "labor",
        amount: 22000,
        paymentMethod: "bank",
        reference: "FT-99120",
        description: "Supervisory staff weekly allowances and daily labor contractor payout.",
      },
    ],
    challans: [
      {
        id: "chal-4",
        date: "2026-06-02",
        challanNo: "CH-ST-004",
        vendorName: "BSRM Steel Ltd.",
        materialName: "Deformed Mild Steel Rods (20mm)",
        quantity: 8.5,
        unit: "Tons",
        totalCost: 765000,
        receivedBy: "A. K. Azad (Site Engr.)",
        status: "approved",
        notes: "Grade 500W premium TMT bars. Weight slips attached.",
      },
    ],
  },
};

export default function TrackerDashboard() {
  const { properties, settings } = useApp();
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("activities"); // "activities" | "accounts" | "challans"
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingApi, setIsUsingApi] = useState(false);

  // States for selected project's specific records
  const [activities, setActivities] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [challans, setChallans] = useState([]);
  const [summaryStats, setSummaryStats] = useState({
    totalExpense: 0,
    totalIncome: 0,
    netBalance: 0,
    totalChallanCount: 0,
    totalChallanCost: 0,
    pendingChallans: 0,
    activityCount: 0,
  });

  // Modal control states
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showChallanModal, setShowChallanModal] = useState(false);

  // Form input states
  const [activityForm, setActivityForm] = useState({
    date: new Date().toISOString().split("T")[0],
    workDone: "",
    laborCount: "",
    supervisor: "",
    remarks: "",
  });

  const [accountForm, setAccountForm] = useState({
    date: new Date().toISOString().split("T")[0],
    type: "expense",
    category: "material",
    amount: "",
    paymentMethod: "cash",
    reference: "",
    description: "",
  });

  const [challanForm, setChallanForm] = useState({
    challanNo: "",
    date: new Date().toISOString().split("T")[0],
    vendorName: "",
    materialName: "",
    quantity: "",
    unit: "Bags",
    totalCost: "",
    receivedBy: "",
    status: "received",
    notes: "",
  });

  // Filter properties with status == "ongoing"
  useEffect(() => {
    const ongoing = properties.filter((p) => p.status === "ongoing");
    setOngoingProjects(ongoing);
    if (ongoing.length > 0) {
      setSelectedProject(ongoing[0]);
    }
  }, [properties]);

  // Load tracker details when selected project changes
  useEffect(() => {
    if (!selectedProject) return;
    loadProjectData(selectedProject.id);
  }, [selectedProject]);

  const loadProjectData = async (projectId) => {
    setIsLoading(true);
    try {
      // 1. Try to fetch from backend API
      const res = await fetch(`${API_BASE}/properties/${projectId}/summary`);
      if (!res.ok) throw new Error("API server not responding");

      const summaryRes = await res.json();
      if (summaryRes.success) {
        setIsUsingApi(true);

        // Fetch logs
        const actRes = await (await fetch(`${API_BASE}/properties/${projectId}/activities?limit=100`)).json();
        const accRes = await (await fetch(`${API_BASE}/properties/${projectId}/accounts?limit=100`)).json();
        const chalRes = await (await fetch(`${API_BASE}/properties/${projectId}/challans?limit=100`)).json();

        setActivities(actRes.data?.activities || []);
        setAccounts(accRes.data?.accounts || []);
        setChallans(chalRes.data?.challans || []);
        setSummaryStats(summaryRes.data.stats);
      }
    } catch (error) {
      // 2. Offline Fallback using LocalStorage / default mock values
      console.warn("Backend not active or database error. Falling back to local offline mode.", error);
      setIsUsingApi(false);

      // Load from localStorage or seed
      let localData = {};
      try {
        const stored = localStorage.getItem("luxe_tracker_data");
        if (stored) {
          localData = JSON.parse(stored);
        } else {
          localData = initialMockTrackerData;
          localStorage.setItem("luxe_tracker_data", JSON.stringify(localData));
        }
      } catch {
        localData = initialMockTrackerData;
      }

      const pData = localData[projectId] || { activities: [], accounts: [], challans: [] };
      setActivities(pData.activities || []);
      setAccounts(pData.accounts || []);
      setChallans(pData.challans || []);

      // Calculate stats locally
      const expenses = (pData.accounts || []).filter((a) => a.type === "expense").reduce((s, a) => s + a.amount, 0);
      const income = (pData.accounts || []).filter((a) => a.type === "income").reduce((s, a) => s + a.amount, 0);
      const chCost = (pData.challans || []).reduce((s, c) => s + c.totalCost, 0);
      const chPending = (pData.challans || []).filter((c) => c.status === "pending").length;

      setSummaryStats({
        totalExpense: expenses,
        totalIncome: income,
        netBalance: income - expenses,
        totalChallanCount: (pData.challans || []).length,
        totalChallanCost: chCost,
        pendingChallans: chPending,
        activityCount: (pData.activities || []).length,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to save offline data
  const saveOfflineData = (projectId, updatedProjectData) => {
    try {
      let localData = {};
      const stored = localStorage.getItem("luxe_tracker_data");
      if (stored) localData = JSON.parse(stored);
      
      localData[projectId] = updatedProjectData;
      localStorage.setItem("luxe_tracker_data", JSON.stringify(localData));
    } catch (e) {
      console.error("Failed to save offline data", e);
    }
  };

  // ─── Actions handlers ──────────────────────────────────────

  const handleAddActivity = async (e) => {
    e.preventDefault();
    if (!selectedProject) return;

    const newActivity = {
      propertyId: selectedProject.id,
      date: activityForm.date,
      workDone: activityForm.workDone,
      laborCount: parseInt(activityForm.laborCount) || 0,
      supervisor: activityForm.supervisor,
      remarks: activityForm.remarks,
    };

    if (isUsingApi) {
      try {
        const res = await fetch(`${API_BASE}/activities`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newActivity),
        });
        if (res.ok) {
          loadProjectData(selectedProject.id);
          setShowActivityModal(false);
          setActivityForm({
            date: new Date().toISOString().split("T")[0],
            workDone: "",
            laborCount: "",
            supervisor: "",
            remarks: "",
          });
        }
      } catch (err) {
        alert("Failed to save to database. Retrying locally.");
      }
    } else {
      // Local fallback
      const created = {
        ...newActivity,
        id: "act-" + Date.now(),
        createdAt: new Date().toISOString(),
      };
      const updatedActs = [created, ...activities];
      setActivities(updatedActs);

      const pData = { activities: updatedActs, accounts, challans };
      saveOfflineData(selectedProject.id, pData);
      loadProjectData(selectedProject.id);
      setShowActivityModal(false);
      setActivityForm({
        date: new Date().toISOString().split("T")[0],
        workDone: "",
        laborCount: "",
        supervisor: "",
        remarks: "",
      });
    }
  };

  const handleAddAccount = async (e) => {
    e.preventDefault();
    if (!selectedProject) return;

    const newAccount = {
      propertyId: selectedProject.id,
      date: accountForm.date,
      type: accountForm.type,
      category: accountForm.category,
      amount: parseFloat(accountForm.amount) || 0,
      paymentMethod: accountForm.paymentMethod,
      reference: accountForm.reference,
      description: accountForm.description,
    };

    if (isUsingApi) {
      try {
        const res = await fetch(`${API_BASE}/accounts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAccount),
        });
        if (res.ok) {
          loadProjectData(selectedProject.id);
          setShowAccountModal(false);
          setAccountForm({
            date: new Date().toISOString().split("T")[0],
            type: "expense",
            category: "material",
            amount: "",
            paymentMethod: "cash",
            reference: "",
            description: "",
          });
        }
      } catch (err) {
        alert("Failed to save to database.");
      }
    } else {
      const created = {
        ...newAccount,
        id: "acc-" + Date.now(),
      };
      const updatedAccs = [created, ...accounts];
      setAccounts(updatedAccs);

      const pData = { activities, accounts: updatedAccs, challans };
      saveOfflineData(selectedProject.id, pData);
      loadProjectData(selectedProject.id);
      setShowAccountModal(false);
      setAccountForm({
        date: new Date().toISOString().split("T")[0],
        type: "expense",
        category: "material",
        amount: "",
        paymentMethod: "cash",
        reference: "",
        description: "",
      });
    }
  };

  const handleAddChallan = async (e) => {
    e.preventDefault();
    if (!selectedProject) return;

    const cost = parseFloat(challanForm.totalCost) || 0;
    const newChallan = {
      propertyId: selectedProject.id,
      challanNo: challanForm.challanNo,
      date: challanForm.date,
      vendorName: challanForm.vendorName,
      materialName: challanForm.materialName,
      quantity: parseFloat(challanForm.quantity) || 0,
      unit: challanForm.unit,
      totalCost: cost,
      receivedBy: challanForm.receivedBy,
      status: challanForm.status,
      notes: challanForm.notes,
    };

    if (isUsingApi) {
      try {
        const res = await fetch(`${API_BASE}/challans`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newChallan),
        });
        if (res.ok) {
          loadProjectData(selectedProject.id);
          setShowChallanModal(false);
          setChallanForm({
            challanNo: "",
            date: new Date().toISOString().split("T")[0],
            vendorName: "",
            materialName: "",
            quantity: "",
            unit: "Bags",
            totalCost: "",
            receivedBy: "",
            status: "received",
            notes: "",
          });
        }
      } catch (err) {
        alert("Failed to save to database.");
      }
    } else {
      const createdChallan = {
        ...newChallan,
        id: "chal-" + Date.now(),
      };
      const updatedChals = [createdChallan, ...challans];

      // Auto-generate account expense offline if cost > 0
      let updatedAccs = [...accounts];
      if (cost > 0) {
        const autoExpense = {
          id: "acc-" + Date.now() + "-auto",
          propertyId: selectedProject.id,
          date: challanForm.date,
          type: "expense",
          category: "material",
          amount: cost,
          paymentMethod: "cash",
          reference: `Challan #${challanForm.challanNo}`,
          description: `Material: ${challanForm.materialName} (${challanForm.quantity} ${challanForm.unit}) from ${challanForm.vendorName}`,
        };
        updatedAccs = [autoExpense, ...updatedAccs];
      }

      setChallans(updatedChals);
      setAccounts(updatedAccs);

      const pData = { activities, accounts: updatedAccs, challans: updatedChals };
      saveOfflineData(selectedProject.id, pData);
      loadProjectData(selectedProject.id);
      setShowChallanModal(false);
      setChallanForm({
        challanNo: "",
        date: new Date().toISOString().split("T")[0],
        vendorName: "",
        materialName: "",
        quantity: "",
        unit: "Bags",
        totalCost: "",
        receivedBy: "",
        status: "received",
        notes: "",
      });
    }
  };

  const formatPrice = (val) => {
    return new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT", maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50 p-4 lg:p-6">
      {/* Header and API Status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-4 pb-4 border-b border-gray-200/60">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Daily Project Tracker</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage site activity logs, project accounts, and delivery challans for ongoing projects.
          </p>
        </div>

        <div className="flex items-center">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-semibold ${isUsingApi ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-amber-50 border-amber-100 text-amber-700"}`}>
            <span className="relative flex w-2 h-2">
              {isUsingApi && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
              <span className={`relative inline-flex rounded-full w-2 h-2 ${isUsingApi ? "bg-emerald-500" : "bg-amber-500"}`}></span>
            </span>
            <span>
              {isUsingApi ? "Live PostgreSQL Sync" : "Offline Sandbox Mode"}
            </span>
          </div>
        </div>
      </div>

      {ongoingProjects.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 max-w-lg mx-auto mt-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Ongoing Projects Found</h3>
          <p className="text-gray-500 text-sm">
            To use the tracker, make sure you have property listings with status set to <strong className="text-gray-800">"ongoing"</strong>.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          
          {/* TOP: Project Selector List */}
          <div className="bg-white rounded-2xl p-2.5 shadow-sm border border-gray-100 flex items-center gap-4 overflow-x-auto hide-scrollbar">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0 px-2 pl-3">Select Project:</span>
            <div className="flex gap-2">
              {ongoingProjects.map((p) => {
                const isSelected = selectedProject?.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProject(p)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all shrink-0 ${
                      isSelected
                        ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
                    }`}
                  >
                    <span className={`flex items-center justify-center w-5 h-5 rounded text-xs ${isSelected ? "bg-white/10" : "bg-white shadow-sm"}`}>
                      {p.category === "building" ? "🏢" : "🏡"}
                    </span>
                    <span className="font-semibold text-xs">{p.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Main Dashboard Panel */}
          <div className="space-y-4">
            
            {/* Project Summary Banner */}
            {selectedProject && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gray-50 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-gray-900 shadow-sm"
                      style={{ backgroundColor: settings.primaryColor }}
                    >
                      {selectedProject.category}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      🚧 Construction Phase
                    </span>
                  </div>
                  <h2 className="text-xl font-serif font-bold text-gray-900">{selectedProject.title}</h2>
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-gray-500 mt-1.5 font-medium">
                    <span className="flex items-center gap-1"><span className="opacity-70">📍</span> {selectedProject.location}</span>
                    <span className="opacity-30 hidden sm:inline">•</span>
                    <span className="flex items-center gap-1"><span className="opacity-70">💰</span> Estimate: {formatPrice(selectedProject.price)}</span>
                  </div>
                </div>

                {/* Micro Action buttons */}
                <div className="flex flex-wrap gap-2.5 relative z-10 shrink-0 mt-2 md:mt-0">
                  <button
                    onClick={() => setShowActivityModal(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                  >
                    📝 Log Activity
                  </button>
                  <button
                    onClick={() => setShowAccountModal(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-800 rounded-xl text-xs font-bold shadow-sm transition-all"
                  >
                    💵 Add Finance
                  </button>
                  <button
                    onClick={() => setShowChallanModal(true)}
                    className="flex items-center gap-2 px-4 py-2.5 text-gray-900 rounded-xl text-xs font-bold shadow-md hover:brightness-110 transition-all hover:-translate-y-0.5"
                    style={{ backgroundColor: settings.primaryColor }}
                  >
                    🚚 Enter Challan
                  </button>
                </div>
              </div>
            )}

            {/* Metrics Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all group">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Expenses</p>
                  <p className="text-xl font-bold text-gray-900">{formatPrice(summaryStats.totalExpense)}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-50 to-red-100/60 border border-red-100 text-red-500 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">📉</div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all group">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Petty Fund / Income</p>
                  <p className="text-xl font-bold text-gray-900">{formatPrice(summaryStats.totalIncome)}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/60 border border-emerald-100 text-emerald-500 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">💳</div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all group relative overflow-hidden">
                <div className="absolute right-0 top-0 w-20 h-20 bg-gradient-to-bl from-blue-50/80 to-transparent rounded-bl-full pointer-events-none"></div>
                <div className="relative z-10">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Remaining Fund</p>
                  <p className={`text-xl font-bold ${summaryStats.netBalance < 0 ? "text-red-600" : "text-gray-900"}`}>
                    {formatPrice(summaryStats.netBalance)}
                  </p>
                </div>
                <div className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/60 border border-blue-100 text-blue-500 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">🏦</div>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-all group">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Material Challans</p>
                  <p className="text-xl font-bold text-gray-900 flex items-baseline gap-1.5">
                    {summaryStats.totalChallanCount} 
                    {summaryStats.pendingChallans > 0 && (
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded-md">
                        {summaryStats.pendingChallans} wait
                      </span>
                    )}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/60 border border-amber-100 text-amber-500 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">🚚</div>
              </div>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex gap-6 border-b border-gray-200/80 overflow-x-auto hide-scrollbar px-1 mt-2">
              {[
                { id: "activities", label: "Daily Activity Logs", count: activities.length },
                { id: "accounts", label: "Project Accounts Ledger", count: accounts.length },
                { id: "challans", label: "Site Delivery Challans", count: challans.length },
              ].map((t) => {
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`flex items-center gap-2 py-3 border-b-2 font-bold text-sm transition-colors shrink-0 ${
                      isActive ? "border-gray-900 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-800"
                    }`}
                  >
                    <span>{t.label}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        isActive ? "bg-gray-100 text-gray-900" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {t.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* TAB CONTENTS */}
            {isLoading ? (
              <div className="bg-white rounded-2xl p-20 text-center shadow-sm border border-gray-100">
                <div className="inline-block w-8 h-8 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm text-gray-500">Loading project records...</p>
              </div>
            ) : (
              <div className="transition-all">
                
                {/* 1. ACTIVITIES TAB */}
                {activeTab === "activities" && (
                  <div className="space-y-4">
                    {activities.length === 0 ? (
                      <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm">
                        <p className="text-gray-400 text-sm mb-4">No daily logs registered for this project yet.</p>
                        <button
                          onClick={() => setShowActivityModal(true)}
                          className="px-5 py-2.5 text-xs font-semibold text-white rounded-xl shadow-sm hover:brightness-110"
                          style={{ backgroundColor: settings.primaryColor }}
                        >
                          + Log First Site Activity
                        </button>
                      </div>
                    ) : (
                      <div className="relative border-l-2 border-gray-200 ml-4 pl-6 space-y-6">
                        {activities.map((act) => (
                          <div key={act.id} className="relative group">
                            {/* Dot icon */}
                            <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-white bg-gray-900 shadow-sm flex items-center justify-center" />
                            
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-gray-300 transition-colors">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                                <div className="flex items-center gap-3">
                                  <span className="font-mono text-xs font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                                    {act.date}
                                  </span>
                                  <span className="text-xs font-medium text-gray-500">
                                    👷 Labor Count: <strong className="text-gray-800">{act.laborCount}</strong>
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500 font-medium">
                                  Supervisor: <strong className="text-gray-800">{act.supervisor || "N/A"}</strong>
                                </span>
                              </div>

                              <p className="text-gray-800 font-semibold text-sm leading-relaxed">{act.workDone}</p>
                              
                              {act.remarks && (
                                <div className="mt-3 bg-amber-50/50 border-l-2 border-amber-300 p-2.5 rounded-r-lg text-xs text-amber-800">
                                  <strong>Site Remark:</strong> {act.remarks}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. ACCOUNTS LEDGER TAB */}
                {activeTab === "accounts" && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                          <tr>
                            <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Date</th>
                            <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Category</th>
                            <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Payment Method</th>
                            <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Reference / Voucher</th>
                            <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Description</th>
                            <th className="text-right px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {accounts.map((acc) => (
                            <tr key={acc.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-5 py-3.5 font-medium text-gray-600 font-mono text-xs">{acc.date}</td>
                              <td className="px-5 py-3.5 capitalize">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  acc.category === "material" ? "bg-blue-50 text-blue-600" :
                                  acc.category === "labor" ? "bg-purple-50 text-purple-600" :
                                  acc.category === "utility" ? "bg-yellow-50 text-yellow-600" : "bg-gray-100 text-gray-600"
                                }`}>
                                  {acc.category}
                                </span>
                              </td>
                              <td className="px-5 py-3.5 capitalize font-medium text-gray-700">{acc.paymentMethod}</td>
                              <td className="px-5 py-3.5 font-mono text-xs text-gray-500">{acc.reference || "—"}</td>
                              <td className="px-5 py-3.5 text-gray-600 max-w-[250px] truncate" title={acc.description}>
                                {acc.description || "—"}
                              </td>
                              <td className={`px-5 py-3.5 text-right font-bold ${
                                acc.type === "expense" ? "text-red-600" : "text-green-600"
                              }`}>
                                {acc.type === "expense" ? "-" : "+"}
                                {formatPrice(acc.amount)}
                              </td>
                            </tr>
                          ))}
                          {accounts.length === 0 && (
                            <tr>
                              <td colSpan={6} className="px-5 py-12 text-center text-gray-400">
                                No financial logs recorded for this project yet.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 3. CHALLANS DIRECTORY TAB */}
                {activeTab === "challans" && (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                          <tr>
                            <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Challan No</th>
                            <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Date</th>
                            <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Vendor</th>
                            <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Material / Quantity</th>
                            <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Received By</th>
                            <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Status</th>
                            <th className="text-right px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Total Cost</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                          {challans.map((chal) => (
                            <tr key={chal.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="px-5 py-3.5 font-bold text-gray-900 font-mono text-xs">{chal.challanNo}</td>
                              <td className="px-5 py-3.5 font-mono text-xs text-gray-500">{chal.date}</td>
                              <td className="px-5 py-3.5 font-semibold text-gray-800">{chal.vendorName}</td>
                              <td className="px-5 py-3.5">
                                <span className="font-semibold text-gray-900">{chal.materialName}</span>
                                <span className="block text-xs text-gray-500 mt-0.5">{chal.quantity} {chal.unit}</span>
                              </td>
                              <td className="px-5 py-3.5 text-gray-600">{chal.receivedBy}</td>
                              <td className="px-5 py-3.5">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  chal.status === "approved" ? "bg-green-50 text-green-700 border border-green-200" :
                                  chal.status === "pending" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                                  "bg-blue-50 text-blue-700 border border-blue-200"
                                }`}>
                                  {chal.status}
                                </span>
                              </td>
                              <td className="px-5 py-3.5 text-right font-bold text-gray-900">{formatPrice(chal.totalCost)}</td>
                            </tr>
                          ))}
                          {challans.length === 0 && (
                            <tr>
                              <td colSpan={7} className="px-5 py-12 text-center text-gray-400">
                                No delivery challans received or logged yet.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>

        </div>
      )}

      {/* ─── MODALS ────────────────────────────────────────── */}

      {/* 1. DAILY ACTIVITY MODAL */}
      {showActivityModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-900">Log Daily Site Activity</h3>
              <button onClick={() => setShowActivityModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>

            <form onSubmit={handleAddActivity} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={activityForm.date}
                    onChange={(e) => setActivityForm({ ...activityForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Labor Count</label>
                  <input
                    type="number"
                    placeholder="e.g. 15"
                    required
                    value={activityForm.laborCount}
                    onChange={(e) => setActivityForm({ ...activityForm, laborCount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Supervisor in Charge</label>
                <input
                  type="text"
                  placeholder="e.g. Engr. Asif Rahman"
                  required
                  value={activityForm.supervisor}
                  onChange={(e) => setActivityForm({ ...activityForm, supervisor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Work Description Done</label>
                <textarea
                  placeholder="Describe the tasks achieved, brickwork layers casted, plaster, plumbing, concrete details..."
                  required
                  rows={3}
                  value={activityForm.workDone}
                  onChange={(e) => setActivityForm({ ...activityForm, workDone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Site Remarks (Optional)</label>
                <textarea
                  placeholder="Any delays, supply issues, key milestones..."
                  rows={2}
                  value={activityForm.remarks}
                  onChange={(e) => setActivityForm({ ...activityForm, remarks: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowActivityModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold hover:bg-gray-50 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-semibold"
                >
                  Save Log Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. PROJECT ACCOUNT TRANSACTION MODAL */}
      {showAccountModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-900">Add Account Ledger Entry</h3>
              <button onClick={() => setShowAccountModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>

            <form onSubmit={handleAddAccount} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Entry Type</label>
                  <select
                    value={accountForm.type}
                    onChange={(e) => setAccountForm({ ...accountForm, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-gray-900"
                  >
                    <option value="expense">Expense (Outflow)</option>
                    <option value="income">Fund Allocated (Inflow)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={accountForm.date}
                    onChange={(e) => setAccountForm({ ...accountForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                  <select
                    value={accountForm.category}
                    onChange={(e) => setAccountForm({ ...accountForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-gray-900"
                  >
                    <option value="material">Material Purchase</option>
                    <option value="labor">Labor / Contractor Pay</option>
                    <option value="utility">Utility / Machinery Rent</option>
                    <option value="permit">Permit / Legal Fee</option>
                    <option value="other">Miscellaneous / General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Amount (৳)</label>
                  <input
                    type="number"
                    placeholder="Amount in BDT"
                    required
                    value={accountForm.amount}
                    onChange={(e) => setAccountForm({ ...accountForm, amount: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Payment Method</label>
                  <select
                    value={accountForm.paymentMethod}
                    onChange={(e) => setAccountForm({ ...accountForm, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-gray-900"
                  >
                    <option value="cash">Cash</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="check">Cheque</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Reference / Voucher No.</label>
                  <input
                    type="text"
                    placeholder="e.g. VCH-0229"
                    value={accountForm.reference}
                    onChange={(e) => setAccountForm({ ...accountForm, reference: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Transaction Description</label>
                <textarea
                  placeholder="Describe what these funds were utilized for..."
                  required
                  rows={2}
                  value={accountForm.description}
                  onChange={(e) => setAccountForm({ ...accountForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAccountModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold hover:bg-gray-50 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-semibold"
                >
                  Log Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. SITE DELIVERY CHALLAN MODAL */}
      {showChallanModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-900">Record Material Challan Receipt</h3>
              <button onClick={() => setShowChallanModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">×</button>
            </div>

            <form onSubmit={handleAddChallan} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Challan Number</label>
                  <input
                    type="text"
                    placeholder="e.g. CH-2011"
                    required
                    value={challanForm.challanNo}
                    onChange={(e) => setChallanForm({ ...challanForm, challanNo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Delivery Date</label>
                  <input
                    type="date"
                    required
                    value={challanForm.date}
                    onChange={(e) => setChallanForm({ ...challanForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Supplier / Vendor</label>
                  <input
                    type="text"
                    placeholder="e.g. BSRM / Lafarge"
                    required
                    value={challanForm.vendorName}
                    onChange={(e) => setChallanForm({ ...challanForm, vendorName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Material Description</label>
                  <input
                    type="text"
                    placeholder="e.g. 500W Steel Rod / OPC Cement"
                    required
                    value={challanForm.materialName}
                    onChange={(e) => setChallanForm({ ...challanForm, materialName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Quantity</label>
                  <input
                    type="number"
                    step="any"
                    placeholder="Quantity"
                    required
                    value={challanForm.quantity}
                    onChange={(e) => setChallanForm({ ...challanForm, quantity: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Unit</label>
                  <select
                    value={challanForm.unit}
                    onChange={(e) => setChallanForm({ ...challanForm, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-gray-900"
                  >
                    <option value="Bags">Bags</option>
                    <option value="Pieces">Pieces</option>
                    <option value="Tons">Tons</option>
                    <option value="CFT">CFT</option>
                    <option value="Trucks">Trucks</option>
                  </select>
                </div>

                <div className="col-span-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Challan Cost (৳)</label>
                  <input
                    type="number"
                    placeholder="Value in BDT"
                    required
                    value={challanForm.totalCost}
                    onChange={(e) => setChallanForm({ ...challanForm, totalCost: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Site Receiver</label>
                  <input
                    type="text"
                    placeholder="Site Engineer name"
                    required
                    value={challanForm.receivedBy}
                    onChange={(e) => setChallanForm({ ...challanForm, receivedBy: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Verification Status</label>
                  <select
                    value={challanForm.status}
                    onChange={(e) => setChallanForm({ ...challanForm, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-gray-900"
                  >
                    <option value="received">Received (Unverified)</option>
                    <option value="approved">Approved & Verified</option>
                    <option value="pending">Pending QA Hold</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Challan / Delivery Notes</label>
                <textarea
                  placeholder="Notes about quality, defects, truck plate no, helper counts..."
                  rows={2}
                  value={challanForm.notes}
                  onChange={(e) => setChallanForm({ ...challanForm, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-900"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowChallanModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold hover:bg-gray-50 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-semibold"
                >
                  Log Challan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
