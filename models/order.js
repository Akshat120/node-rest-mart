const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  count: { type: Number },
  products: {
    productId: { type: mongoose.Schema.Types.ObjectId },
    quantity: { type: Number },
  },
  totalprice: { type: Number },
});

module.exports = mongoose.model("Cart", cartSchema);
