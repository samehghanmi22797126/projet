const Client = require("../models/Client");
const Invoice = require("../models/Invoice");
const Payment = require("../models/Payment");

exports.getStats = async (req, res) => {
  try {
    const totalClients = await Client.countDocuments();

    const totalInvoices = await Invoice.countDocuments();

    const paidInvoices = await Invoice.countDocuments({
      status: "paid",
    });

    const unpaidInvoices = await Invoice.countDocuments({
      status: "unpaid",
    });

    const payments = await Payment.find();

    const totalRecovered = payments.reduce((sum, p) => sum + p.amount, 0);

    res.json({
      totalClients,
      totalInvoices,
      paidInvoices,
      unpaidInvoices,
      totalRecovered,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
