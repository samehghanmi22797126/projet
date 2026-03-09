const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const { getStats } = require("../controllers/statsController");

router.use(protect);
router.get("/", authorize("manager", "admin"), getStats);

module.exports = router;
