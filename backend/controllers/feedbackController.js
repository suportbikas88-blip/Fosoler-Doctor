const Feedback = require("../models/Feedback");


// ======================================
// Create Feedback
// ======================================

exports.createFeedback = async (req, res) => {

    try {

        const feedback = await Feedback.create({

            admin: req.admin._id,

            subject: req.body.subject,

            message: req.body.message,

            category: req.body.category || "other",

            status: "pending"

        });

        res.status(201).json({

            success: true,

            message: "Feedback created successfully",

            feedback

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ======================================
// Get All Feedback
// ======================================

exports.getFeedbacks = async (req, res) => {

    try {

        const feedbacks = await Feedback.find()
            .populate("admin", "name email role")
            .sort({ createdAt: -1 });

        res.json({

            success: true,

            count: feedbacks.length,

            feedbacks

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ======================================
// Get Single Feedback
// ======================================

exports.getFeedbackById = async (req, res) => {

    try {

        const feedback = await Feedback.findById(req.params.id)
            .populate("admin", "name email role");

        if (!feedback) {

            return res.status(404).json({

                success: false,

                message: "Feedback not found"

            });

        }

        res.json({

            success: true,

            feedback

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ======================================
// Resolve Feedback
// ======================================

exports.resolveFeedback = async (req, res) => {

    try {

        const feedback = await Feedback.findById(req.params.id);

        if (!feedback) {

            return res.status(404).json({

                success: false,

                message: "Feedback not found"

            });

        }

        feedback.status = "resolved";

        await feedback.save();

        res.json({

            success: true,

            message: "Feedback resolved successfully",

            feedback

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
