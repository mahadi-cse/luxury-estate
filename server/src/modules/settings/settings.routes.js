const { Router } = require("express");
const controller = require("./settings.controller");

const router = Router();

router.get("/", controller.get);
router.put("/", controller.update);
router.post("/reset", controller.reset);

module.exports = router;
