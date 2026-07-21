const express = require("express");

const router = express.Router();

const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// ==================================
// Public Routes
// ==================================

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// ==================================
// Protected Routes
// ==================================

// User Profile
router.get("/profile", protect, getProfile);

module.exports = router;
