const Report = require("../models/Report");


// ======================================
// Create Report
// ======================================

exports.createReport = async (req, res) => {

    try {

        const report = await Report.create({

            admin: req.admin._id,

            title: req.body.title,

            reportType: req.body.reportType || "analytics",

            description: req.body.description || "",

            fileName: req.body.fileName || "",

            filePath: req.body.filePath || "",

            status: "generated"

        });

        res.status(201).json({

            success: true,

            message: "Report created successfully",

            report

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ======================================
// Get All Reports
// ======================================

exports.getReports = async (req, res) => {

    try {

        const reports = await Report.find()
            .populate("admin", "name email role")
            .sort({ createdAt: -1 });

        res.json({

            success: true,

            count: reports.length,

            reports

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ======================================
// Get Single Report
// ======================================

exports.getReportById = async (req, res) => {

    try {

        const report = await Report.findById(req.params.id)
            .populate("admin", "name email role");

        if (!report) {

            return res.status(404).json({

                success: false,

                message: "Report not found"

            });

        }

        res.json({

            success: true,

            report

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ======================================
// Download Report
// ======================================

exports.downloadReport = async (req, res) => {

    try {

        const report = await Report.findById(req.params.id);

        if (!report) {

            return res.status(404).json({

                success: false,

                message: "Report not found"

            });

        }

        report.status = "downloaded";

        await report.save();

        res.json({

            success: true,

            message: "Report downloaded successfully",

            report

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
