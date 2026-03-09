const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["en_attente", "partiellement_payee", "payee", "en_recouvrement"],
      default: "en_attente",
    },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
