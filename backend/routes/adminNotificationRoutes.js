const express = require("express");

const router = express.Router();

const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

const {
    createNotification,
    getAllNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification,
} = require("../controllers/adminNotificationController");

// ==========================
// Notification Management
// ==========================

// Create Notification
router.post(
    "/",
    adminAuthMiddleware,
    createNotification
);

// Get All Notifications
router.get(
    "/",
    adminAuthMiddleware,
    getAllNotifications
);

// Get Single Notification
router.get(
    "/:id",
    adminAuthMiddleware,
    getNotificationById
);

// Update Notification
router.put(
    "/:id",
    adminAuthMiddleware,
    updateNotification
);

// Delete Notification
router.delete(
    "/:id",
    adminAuthMiddleware,
    deleteNotification
);

module.exports = router;
