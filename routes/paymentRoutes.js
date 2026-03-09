const express = require("express");
const router = express.Router();
const Joi = require("joi");
const {
  createPayment,
  getPayments,
} = require("../controllers/paymentController");
const { protect, authorize } = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");

const paymentSchema = Joi.object({
  invoice: Joi.string().required(),
  amount: Joi.number().positive().required(),
  date: Joi.date().optional(),
  method: Joi.string().valid("espece", "virement", "cheque").optional(),
});

router.use(protect);

router.get("/", authorize("agent", "manager", "admin"), getPayments);
router.post(
  "/",
  authorize("agent", "manager", "admin"),
  validationMiddleware(paymentSchema),
  createPayment
);

module.exports = router;
