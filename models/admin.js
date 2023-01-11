const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, unique: true },
  role: { type: String, required: true },
  password: { type: String },
});

module.exports = mongoose.model("Admin", adminSchema);
