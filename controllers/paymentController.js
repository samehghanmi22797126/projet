const Payment = require("../models/Payment");
const Invoice = require("../models/Invoice");

exports.createPayment = async (req, res, next) => {
  try {
    const { invoice: invoiceId } = req.body;

    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: "Facture non trouvée" });
    }

    const payment = await Payment.create({
      ...req.body,
      recordedBy: req.user._id,
    });

    const payments = await Payment.aggregate([
      { $match: { invoice: invoice._id } },
      { $group: { _id: "$invoice", total: { $sum: "$amount" } } },
    ]);

    const totalPaid = payments[0]?.total || 0;
    if (totalPaid >= invoice.amount) {
      invoice.status = "payee";
    } else if (totalPaid > 0) {
      invoice.status = "partiellement_payee";
    }
    await invoice.save();

    res.status(201).json(payment);
  } catch (err) {
    next(err);
  }
};

exports.getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find()
      .populate("invoice")
      .populate("recordedBy", "name role");
    res.json(payments);
  } catch (err) {
    next(err);
  }
};
