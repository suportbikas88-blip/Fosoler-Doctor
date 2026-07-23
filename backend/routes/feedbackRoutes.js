const express = require("express");

const router = express.Router();

const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

const {
  createFeedback,
  getFeedbacks,
  getFeedbackById,
  resolveFeedback,
} = require("../controllers/feedbackController");


// Create Feedback
router.post(
  "/",
  adminAuthMiddleware,
  createFeedback
);


// Get All Feedback
router.get(
  "/",
  adminAuthMiddleware,
  getFeedbacks
);


// Get Single Feedback
router.get(
  "/:id",
  adminAuthMiddleware,
  getFeedbackById
);


// Resolve Feedback
router.put(
  "/resolve/:id",
  adminAuthMiddleware,
  resolveFeedback
);

module.exports = router;
