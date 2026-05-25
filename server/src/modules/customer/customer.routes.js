const { Router } = require("express");
const controller = require("./customer.controller");

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

// Payment sub-resource
router.post("/:id/payments", controller.addPayment);
router.put("/:id/payments/:paymentId", controller.updatePayment);
router.delete("/:id/payments/:paymentId", controller.deletePayment);

module.exports = router;
