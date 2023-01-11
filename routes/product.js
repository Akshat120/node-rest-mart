const express = require("express");
const controller = require("../controllers/product");
const adminCheck = require("../middlewares/adminCheck");
const router = express.Router();

router.get("/", controller.get_all);
router.get("/:id", controller.get_by_id);

router.post("/", adminCheck, controller.create_product);
router.patch("/:id", adminCheck, controller.update_by_id);
router.delete("/:id", adminCheck, controller.delete_by_id);

module.exports = router;
