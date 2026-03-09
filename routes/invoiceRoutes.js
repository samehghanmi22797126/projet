const express = require("express");
const router = express.Router();
const Joi = require("joi");
const {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoiceStatus,
} = require("../controllers/invoiceController");
const { protect, authorize } = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");

const invoiceCreateSchema = Joi.object({
  client: Joi.string().required(),
  amount: Joi.number().positive().required(),
  dueDate: Joi.date().required(),
  description: Joi.string().optional(),
});

const invoiceStatusSchema = Joi.object({
  status: Joi.string()
    .valid("en_attente", "partiellement_payee", "payee", "en_recouvrement")
    .required(),
});

router.use(protect);

router.get("/", getInvoices);
router.get("/:id", getInvoiceById);
router.post(
  "/",
  authorize("agent", "manager", "admin"),
  validationMiddleware(invoiceCreateSchema),
  createInvoice
);
router.patch(
  "/:id/status",
  authorize("manager", "admin"),
  validationMiddleware(invoiceStatusSchema),
  updateInvoiceStatus
);

module.exports = router;
