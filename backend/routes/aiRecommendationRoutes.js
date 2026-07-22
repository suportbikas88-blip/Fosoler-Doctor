const express = require("express");
const router = express.Router();

const {
  createRecommendation,
  getMyRecommendations,
  getRecommendationById,
  deleteRecommendation,
} = require("../controllers/aiRecommendationController");

const { protect } = require("../middleware/authMiddleware");

// Create AI Recommendation
router.post("/", protect, createRecommendation);

// Get All Recommendations of Logged-in Farmer
router.get("/", protect, getMyRecommendations);

// Get Single Recommendation
router.get("/:id", protect, getRecommendationById);

// Delete Recommendation
router.delete("/:id", protect, deleteRecommendation);

module.exports = router;
