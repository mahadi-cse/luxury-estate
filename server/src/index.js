require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const errorHandler = require("./middleware/errorHandler");

// Module routes
const propertyRoutes = require("./modules/property/property.routes");
const customerRoutes = require("./modules/customer/customer.routes");
const saleRoutes = require("./modules/sale/sale.routes");
const agentRoutes = require("./modules/agent/agent.routes");
const settingsRoutes = require("./modules/settings/settings.routes");
const contactRoutes = require("./modules/contact/contact.routes");
const listingRequestRoutes = require("./modules/listing-request/listingRequest.routes");
const uploadRoutes = require("./modules/upload/upload.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");
const trackerRoutes = require("./modules/tracker/tracker.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files as static
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ─── API Routes ────────────────────────────────────────────
app.use("/api/properties", propertyRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/listing-requests", listingRequestRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tracker", trackerRoutes);

// ─── Health Check ──────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "LuxeEstate API is running", timestamp: new Date().toISOString() });
});

// ─── 404 Handler ───────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ─── Global Error Handler ──────────────────────────────────
app.use(errorHandler);

// ─── Start Server ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  🏠 LuxeEstate API Server`);
  console.log(`  → Running on http://localhost:${PORT}`);
  console.log(`  → Health: http://localhost:${PORT}/api/health\n`);
});
