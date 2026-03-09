const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { register, login } = require("../controllers/authController");
const validationMiddleware = require("../middleware/validationMiddleware");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("agent", "manager", "admin").optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post("/register", validationMiddleware(registerSchema), register);
router.post("/login", validationMiddleware(loginSchema), login);

module.exports = router;
