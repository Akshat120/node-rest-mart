const express = require("express");
const controller = require("../controllers/product");
const authUser = require("../middlewares/authUser");
const router = express.Router();

router.get("/", controller.get_all);
router.get("/:id", controller.get_by_id);

router.post("/", authUser, controller.create_product);
router.patch("/:id", authUser, controller.update_by_id);
router.delete("/:id", authUser, controller.delete_by_id);

module.exports = router;
