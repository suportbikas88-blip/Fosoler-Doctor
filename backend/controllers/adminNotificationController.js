const Notification = require("../models/Notification");

// ======================================
// Create Notification
// ======================================

exports.createNotification = async (req, res) => {
    try {

        const {
            title,
            message,
            type,
            district,
        } = req.body;

        if (!title || !message) {
            return res.status(400).json({
                success: false,
                message: "Title and message are required",
            });
        }

        const notification = await Notification.create({
            title,
            message,
            type,
            district,
        });

        res.status(201).json({
            success: true,
            message: "Notification created successfully",
            notification,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ======================================
// Get All Notifications
// ======================================

exports.getAllNotifications = async (req, res) => {
    try {

        const notifications = await Notification.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: notifications.length,
            notifications,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ======================================
// Get Single Notification
// ======================================

exports.getNotificationById = async (req, res) => {
    try {

        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found",
            });
        }

        res.status(200).json({
            success: true,
            notification,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ======================================
// Update Notification
// ======================================

exports.updateNotification = async (req, res) => {
    try {

        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Notification updated successfully",
            notification,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ======================================
// Delete Notification
// ======================================

exports.deleteNotification = async (req, res) => {
    try {

        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found",
            });
        }

        await Notification.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Notification deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
