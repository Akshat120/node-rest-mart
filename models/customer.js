const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  mobile: { type: String, unique: true, required: true },
  cart_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Customer", customerSchema);
