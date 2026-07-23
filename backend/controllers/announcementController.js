const Announcement = require("../models/Announcement");

// ======================================
// Create Announcement
// ======================================

exports.createAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.create({
      admin: req.admin._id,
      title: req.body.title,
      message: req.body.message,
      audience: req.body.audience || "all",
      status: "draft",
    });

    res.status(201).json({
      success: true,
      message: "Announcement created successfully",
      announcement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get All Announcements
// ======================================

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate("admin", "name email role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: announcements.length,
      announcements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Single Announcement
// ======================================

exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id)
      .populate("admin", "name email role");

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    res.json({
      success: true,
      announcement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Publish Announcement
// ======================================

exports.publishAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    announcement.status = "published";

    await announcement.save();

    res.json({
      success: true,
      message: "Announcement published successfully",
      announcement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
