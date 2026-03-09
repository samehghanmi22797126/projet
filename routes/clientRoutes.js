const express = require("express");
const router = express.Router();
const Joi = require("joi");
const {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");
const { protect, authorize } = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");

const clientSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().optional().allow(null, ""),
  phone: Joi.string().optional().allow(null, ""),
  address: Joi.string().optional().allow(null, ""),
  status: Joi.string().valid("actif", "inactif").optional(),
});

router.use(protect);

router.get("/", getClients);
router.get("/:id", getClientById);
router.post(
  "/",
  authorize("agent", "manager", "admin"),
  validationMiddleware(clientSchema),
  createClient
);
router.put(
  "/:id",
  authorize("agent", "manager", "admin"),
  validationMiddleware(clientSchema),
  updateClient
);
router.delete("/:id", authorize("manager", "admin"), deleteClient);

module.exports = router;
