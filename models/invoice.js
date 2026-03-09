const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  amount: Number,
  status: {
    type: String,
    enum: ["paid", "unpaid"],
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
