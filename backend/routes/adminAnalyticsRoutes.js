const express = require("express");

const router = express.Router();

const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

const {
  getAnalytics,
} = require("../controllers/adminAnalyticsController");

// ======================================
// Admin Analytics Dashboard
// ======================================

router.get(
  "/",
  adminAuthMiddleware,
  getAnalytics
);

module.exports = router;
