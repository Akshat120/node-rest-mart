const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  stocks: { type: Number },
  costprice: { type: Number },
  sellprice: { type: Number },
});

module.exports = mongoose.model("Product", productSchema);
