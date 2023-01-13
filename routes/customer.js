const express = require("express");
const cartRoutes = require("./cart");
const controller = require("../controllers/customer");
const authUser = require("../middlewares/authUser");
const router = express.Router();

router.use("/cart", authUser, cartRoutes);

router.get("/", authUser, controller.dashboard);
router.get("/help", authUser, controller.help);

router.delete("/logout", authUser, controller.logout);
router.delete("/", authUser, controller.delete);

router.post("/login", controller.login);
router.post("/signup", controller.signup);

module.exports = router;
