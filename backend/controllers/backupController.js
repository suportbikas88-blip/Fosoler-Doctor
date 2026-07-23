const Backup = require("../models/Backup");


// ======================================
// Create Backup
// ======================================

exports.createBackup = async (req, res) => {

    try {

        const backup = await Backup.create({

            admin: req.admin._id,

            backupName: req.body.backupName,

            backupType: req.body.backupType || "manual",

            fileName: req.body.fileName || "",

            filePath: req.body.filePath || "",

            fileSize: req.body.fileSize || 0,

            description: req.body.description || "",

            status: "completed"

        });

        res.status(201).json({

            success: true,

            message: "Backup created successfully",

            backup

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ======================================
// Get All Backups
// ======================================

exports.getBackups = async (req, res) => {

    try {

        const backups = await Backup.find()
            .populate("admin", "name email role")
            .sort({ createdAt: -1 });

        res.json({

            success: true,

            count: backups.length,

            backups

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ======================================
// Get Single Backup
// ======================================

exports.getBackupById = async (req, res) => {

    try {

        const backup = await Backup.findById(req.params.id)
            .populate("admin", "name email role");

        if (!backup) {

            return res.status(404).json({

                success: false,

                message: "Backup not found"

            });

        }

        res.json({

            success: true,

            backup

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ======================================
// Restore Backup
// ======================================

exports.restoreBackup = async (req, res) => {

    try {

        const backup = await Backup.findById(req.params.id);

        if (!backup) {

            return res.status(404).json({

                success: false,

                message: "Backup not found"

            });

        }

        backup.status = "restored";

        await backup.save();

        res.json({

            success: true,

            message: "Backup restored successfully",

            backup

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
