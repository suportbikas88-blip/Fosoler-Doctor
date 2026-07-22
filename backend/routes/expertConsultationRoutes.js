const express = require("express");

const router = express.Router();

const {
  createConsultation,
  getMyConsultations,
  getConsultationById,
  answerConsultation,
  closeConsultation,
} = require("../controllers/expertConsultationController");

const { protect } = require("../middleware/authMiddleware");

// Farmer
router.post("/", protect, createConsultation);
router.get("/", protect, getMyConsultations);
router.get("/:id", protect, getConsultationById);

// Expert/Admin
router.put("/:id/answer", protect, answerConsultation);
router.put("/:id/close", protect, closeConsultation);

module.exports = router;
