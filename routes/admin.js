const express = require("express");
const controller = require("../controllers/admin");
const authUser = require("../middlewares/authUser");
const router = express.Router();

router.get("/", authUser, controller.dashboard);
router.post("/signup", authUser, controller.signup);

router.post("/login", controller.login);

module.exports = router;
