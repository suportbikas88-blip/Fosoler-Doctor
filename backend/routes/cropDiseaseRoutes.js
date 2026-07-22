const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const { protect } = require("../middleware/authMiddleware");

const {
  createDiseaseRecord,
  getMyDiseases,
  getDiseaseById,
  deleteDisease,
} = require("../controllers/cropDiseaseController");

// All routes require login
router.use(protect);

// Upload + Create Disease Record
router.post(
  "/",
  upload.single("image"),
  createDiseaseRecord
);

// Get My Disease History
router.get("/my", getMyDiseases);

// Get Disease By ID
router.get("/:id", getDiseaseById);

// Delete Disease Record
router.delete("/:id", deleteDisease);

module.exports = router;
