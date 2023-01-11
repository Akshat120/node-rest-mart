const express = require("express");
const controller = require("../controllers/product");
const router = express.Router();

router.get("/", controller.get_all);

router.post("/", controller.create_product);

router.get("/:id", controller.get_by_id);

router.patch("/:id", (req, res) => {
  res.status(200).json({
    msg: "product updated by id",
  });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({
    msg: "product deleted by id",
  });
});

module.exports = router;
