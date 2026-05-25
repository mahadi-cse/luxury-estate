const { Router } = require("express");
const upload = require("../../middleware/upload");
const controller = require("./upload.controller");

const router = Router();

router.post("/", upload.single("image"), controller.uploadSingle);
router.post("/multiple", upload.array("images", 10), controller.uploadMultiple);

module.exports = router;
