const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    status: {
      type: String,
      enum: ["actif", "inactif"],
      default: "actif",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);
