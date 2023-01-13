const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  count: { type: Number, default: 0 },
  products: {
    type: Map,
    of: Number,
    default: {},
  },
});

module.exports = mongoose.model("Cart", cartSchema);
