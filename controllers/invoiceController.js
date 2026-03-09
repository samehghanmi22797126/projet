const Invoice = require("../models/Invoice");

exports.createInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.create(req.body);
    res.status(201).json(invoice);
  } catch (err) {
    next(err);
  }
};

exports.getInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find().populate("client");
    res.json(invoices);
  } catch (err) {
    next(err);
  }
};

exports.getInvoiceById = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("client");
    if (!invoice)
      return res.status(404).json({ message: "Facture non trouvée" });
    res.json(invoice);
  } catch (err) {
    next(err);
  }
};

exports.updateInvoiceStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!invoice)
      return res.status(404).json({ message: "Facture non trouvée" });
    res.json(invoice);
  } catch (err) {
    next(err);
  }
};
