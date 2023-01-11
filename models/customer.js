const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, unique: true },
  mobile: { type: String, unique: true },
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
});

module.exports = mongoose.model("Customer", customerSchema);
