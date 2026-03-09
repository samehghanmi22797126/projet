const Invoice = require("../models/Invoice");
const Payment = require("../models/Payment");

exports.getStats = async (req, res, next) => {
  try {
    const totalInvoices = await Invoice.countDocuments();
    const unpaidInvoices = await Invoice.countDocuments({
      status: { $in: ["en_attente", "en_recouvrement"] },
    });

    const result = await Invoice.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const payments = await Payment.aggregate([
      {
        $group: {
          _id: null,
          paidAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalAmount = result[0]?.totalAmount || 0;
    const paidAmount = payments[0]?.paidAmount || 0;

    res.json({
      totalInvoices,
      unpaidInvoices,
      totalAmount,
      paidAmount,
      remainingAmount: totalAmount - paidAmount,
    });
  } catch (err) {
    next(err);
  }
};
