const express = require("express");
const router = express.Router();

const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const adminRoutes = require("./routes/admin");

router.use("/products", productRoutes);
router.use("/customer", customerRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
