const express = require("express");

const router = express.Router();

const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

const {
  getSettings,
  updateSettings,
  toggleMaintenance,
  toggleRegistration,
  toggleAIService,
} = require("../controllers/systemSettingController");


// ======================================
// System Settings Routes
// ======================================


// Get Settings
router.get(
  "/",
  adminAuthMiddleware,
  getSettings
);


// Update Settings
router.put(
  "/",
  adminAuthMiddleware,
  updateSettings
);


// Toggle Maintenance Mode
router.put(
  "/maintenance",
  adminAuthMiddleware,
  toggleMaintenance
);


// Toggle Farmer Registration
router.put(
  "/registration",
  adminAuthMiddleware,
  toggleRegistration
);


// Toggle AI Service
router.put(
  "/ai-service",
  adminAuthMiddleware,
  toggleAIService
);


module.exports = router;
