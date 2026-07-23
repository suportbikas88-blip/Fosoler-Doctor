const express = require("express");

const router = express.Router();

const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

const {
  createBackup,
  getBackups,
  getBackupById,
  restoreBackup,
} = require("../controllers/backupController");


// Create Backup
router.post(
  "/",
  adminAuthMiddleware,
  createBackup
);


// Get All Backups
router.get(
  "/",
  adminAuthMiddleware,
  getBackups
);


// Get Single Backup
router.get(
  "/:id",
  adminAuthMiddleware,
  getBackupById
);


// Restore Backup
router.put(
  "/restore/:id",
  adminAuthMiddleware,
  restoreBackup
);

module.exports = router;
