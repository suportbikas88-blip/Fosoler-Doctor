const express = require("express");

const router = express.Router();

const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

const {
  createReport,
  getReports,
  getReportById,
  downloadReport,
} = require("../controllers/reportController");


// Create Report
router.post(
  "/",
  adminAuthMiddleware,
  createReport
);


// Get All Reports
router.get(
  "/",
  adminAuthMiddleware,
  getReports
);


// Get Single Report
router.get(
  "/:id",
  adminAuthMiddleware,
  getReportById
);


// Download Report
router.put(
  "/download/:id",
  adminAuthMiddleware,
  downloadReport
);

module.exports = router;
