const { Router } = require("express");
const controller = require("./dashboard.controller");

const router = Router();

router.get("/stats", controller.getStats);

module.exports = router;
