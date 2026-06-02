const { Router } = require("express");
const controller = require("./tracker.controller");

const router = Router();

// Ongoing Projects
router.get("/ongoing-properties", controller.getOngoingProperties);
router.get("/properties/:propertyId/summary", controller.getProjectSummary);

// Daily Activities
router.get("/properties/:propertyId/activities", controller.getActivities);
router.get("/activities/:id", controller.getActivityById);
router.post("/activities", controller.createActivity);
router.put("/activities/:id", controller.updateActivity);
router.delete("/activities/:id", controller.removeActivity);

// Project Accounts (Expenses/Incomes)
router.get("/properties/:propertyId/accounts", controller.getAccounts);
router.post("/accounts", controller.createAccount);
router.put("/accounts/:id", controller.updateAccount);
router.delete("/accounts/:id", controller.removeAccount);

// Challans
router.get("/properties/:propertyId/challans", controller.getChallans);
router.post("/challans", controller.createChallan);
router.put("/challans/:id", controller.updateChallan);
router.delete("/challans/:id", controller.removeChallan);

module.exports = router;
