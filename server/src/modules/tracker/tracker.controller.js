const trackerService = require("./tracker.service");
const { success, created, notFound, badRequest } = require("../../utils/apiResponse");

// ─── Ongoing Projects ──────────────────────────────────────
const getOngoingProperties = async (req, res, next) => {
  try {
    const result = await trackerService.getOngoingProperties();
    return success(res, result);
  } catch (err) {
    next(err);
  }
};

const getProjectSummary = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const result = await trackerService.getProjectSummary(propertyId);
    if (!result) return notFound(res, "Project/Property not found");
    return success(res, result);
  } catch (err) {
    next(err);
  }
};

// ─── Daily Activities ──────────────────────────────────────
const getActivities = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const result = await trackerService.getActivities(propertyId, req.query);
    return success(res, result);
  } catch (err) {
    next(err);
  }
};

const getActivityById = async (req, res, next) => {
  try {
    const result = await trackerService.getActivityById(req.params.id);
    if (!result) return notFound(res, "Daily activity log not found");
    return success(res, result);
  } catch (err) {
    next(err);
  }
};

const createActivity = async (req, res, next) => {
  try {
    const { propertyId, date, workDone } = req.body;
    if (!propertyId || !date || !workDone) {
      return badRequest(res, "propertyId, date, and workDone description are required");
    }
    const result = await trackerService.createActivity(req.body);
    return created(res, result, "Daily activity log created successfully");
  } catch (err) {
    next(err);
  }
};

const updateActivity = async (req, res, next) => {
  try {
    const result = await trackerService.updateActivity(req.params.id, req.body);
    return success(res, result, "Daily activity log updated successfully");
  } catch (err) {
    next(err);
  }
};

const removeActivity = async (req, res, next) => {
  try {
    await trackerService.removeActivity(req.params.id);
    return success(res, null, "Daily activity log deleted successfully");
  } catch (err) {
    next(err);
  }
};

// ─── Project Accounts ──────────────────────────────────────
const getAccounts = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const result = await trackerService.getAccounts(propertyId, req.query);
    return success(res, result);
  } catch (err) {
    next(err);
  }
};

const createAccount = async (req, res, next) => {
  try {
    const { propertyId, date, type, category, amount, paymentMethod } = req.body;
    if (!propertyId || !date || !type || !category || amount === undefined || !paymentMethod) {
      return badRequest(res, "propertyId, date, type, category, amount, and paymentMethod are required");
    }
    const result = await trackerService.createAccount(req.body);
    return created(res, result, "Account transaction logged successfully");
  } catch (err) {
    next(err);
  }
};

const updateAccount = async (req, res, next) => {
  try {
    const result = await trackerService.updateAccount(req.params.id, req.body);
    return success(res, result, "Account transaction updated successfully");
  } catch (err) {
    next(err);
  }
};

const removeAccount = async (req, res, next) => {
  try {
    await trackerService.removeAccount(req.params.id);
    return success(res, null, "Account transaction deleted successfully");
  } catch (err) {
    next(err);
  }
};

// ─── Challans ──────────────────────────────────────────────
const getChallans = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const result = await trackerService.getChallans(propertyId, req.query);
    return success(res, result);
  } catch (err) {
    next(err);
  }
};

const createChallan = async (req, res, next) => {
  try {
    const { propertyId, challanNo, date, vendorName, materialName, quantity, unit } = req.body;
    if (!propertyId || !challanNo || !date || !vendorName || !materialName || quantity === undefined || !unit) {
      return badRequest(res, "propertyId, challanNo, date, vendorName, materialName, quantity, and unit are required");
    }
    const result = await trackerService.createChallan(req.body);
    return created(res, result, "Challan logged successfully");
  } catch (err) {
    next(err);
  }
};

const updateChallan = async (req, res, next) => {
  try {
    const result = await trackerService.updateChallan(req.params.id, req.body);
    return success(res, result, "Challan updated successfully");
  } catch (err) {
    next(err);
  }
};

const removeChallan = async (req, res, next) => {
  try {
    await trackerService.removeChallan(req.params.id);
    return success(res, null, "Challan deleted successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getOngoingProperties,
  getProjectSummary,
  // Activities
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  removeActivity,
  // Accounts
  getAccounts,
  createAccount,
  updateAccount,
  removeAccount,
  // Challans
  getChallans,
  createChallan,
  updateChallan,
  removeChallan,
};
