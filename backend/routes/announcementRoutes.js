const express = require("express");

const router = express.Router();

const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

const {
  createAnnouncement,
  getAnnouncements,
  getAnnouncementById,
  publishAnnouncement,
} = require("../controllers/announcementController");


// Create Announcement
router.post(
  "/",
  adminAuthMiddleware,
  createAnnouncement
);


// Get All Announcements
router.get(
  "/",
  adminAuthMiddleware,
  getAnnouncements
);


// Get Single Announcement
router.get(
  "/:id",
  adminAuthMiddleware,
  getAnnouncementById
);


// Publish Announcement
router.put(
  "/publish/:id",
  adminAuthMiddleware,
  publishAnnouncement
);

module.exports = router;
