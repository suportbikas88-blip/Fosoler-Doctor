const express = require("express");

const router = express.Router();

const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

const {
  createActivityLog,
  getActivityLogs,
  getActivityLogById,
  deleteActivityLog,
} = require("../controllers/activityLogController");


// ======================================
// Activity Log Routes
// ======================================


// Create Activity Log
router.post(
  "/",
  adminAuthMiddleware,
  createActivityLog
);


// Get All Activity Logs
router.get(
  "/",
  adminAuthMiddleware,
  getActivityLogs
);


// Get Single Activity Log
router.get(
  "/:id",
  adminAuthMiddleware,
  getActivityLogById
);


// Delete Activity Log
router.delete(
  "/:id",
  adminAuthMiddleware,
  deleteActivityLog
);


module.exports = router;
