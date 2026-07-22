const Notification = require("../models/Notification");

// Create Notification
exports.createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error) {
    console.error("Notification Create Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create notification",
      error: error.message,
    });
  }
};

// Get All Notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    console.error("Notification Fetch Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
};
