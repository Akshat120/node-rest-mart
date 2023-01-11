const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "customer dashboard",
  });
});

router.post("/login", (req, res) => {
  res.status(200).json({
    message: "customer login",
  });
});

router.post("/signup", (req, res) => {
  res.status(200).json({
    message: "customer signup",
  });
});

router.get("/help", (req, res) => {
  res.status(200).json({
    message: "customer help",
  });
});

module.exports = router;
