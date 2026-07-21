const express = require("express");

const router = express.Router();

const {
  createProfile,
  updateProfile,
  getMyProfile,
} = require("../controllers/farmerController");

const { protect } = require("../middleware/authMiddleware");

// ======================================
// Farmer Profile Routes
// ======================================

// Create Farmer Profile
router.post("/create", protect, createProfile);

// Update Farmer Profile
router.put("/update", protect, updateProfile);

// Get My Farmer Profile
router.get("/me", protect, getMyProfile);

module.exports = router;
