const express = require("express");

const router = express.Router();

const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

const {
  createSystemHealth,
  getSystemHealth,
  getSystemHealthById,
} = require("../controllers/systemHealthController");


// Create System Health
router.post(
  "/",
  adminAuthMiddleware,
  createSystemHealth
);


// Get All System Health Records
router.get(
  "/",
  adminAuthMiddleware,
  getSystemHealth
);


// Get Single System Health Record
router.get(
  "/:id",
  adminAuthMiddleware,
  getSystemHealthById
);

module.exports = router;
