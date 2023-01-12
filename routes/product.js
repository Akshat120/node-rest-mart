const express = require("express");
const controller = require("../controllers/product");
const authAdmin = require("../middlewares/authAdmin");
const router = express.Router();

router.get("/", controller.get_all);
router.get("/:id", controller.get_by_id);

router.post("/", authAdmin, controller.create_product);
router.patch("/:id", authAdmin, controller.update_by_id);
router.delete("/:id", authAdmin, controller.delete_by_id);

module.exports = router;
