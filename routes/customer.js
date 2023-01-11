const express = require("express");
const controller = require("../controllers/customer");
const authUser = require("../middlewares/authUser");
const router = express.Router();

router.get("/", authUser, controller.dashboard);
router.get("/help", authUser, controller.help);

router.post("/login", controller.login);
router.post("/signup", controller.signup);

module.exports = router;
