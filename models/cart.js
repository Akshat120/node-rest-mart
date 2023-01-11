const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  count: { type: Number, default: 0 },
  products: {
    productId: { type: mongoose.Schema.Types.ObjectId },
    quantity: { type: Number },
  },
});

module.exports = mongoose.model("Cart", cartSchema);
