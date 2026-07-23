const SystemHealth = require("../models/SystemHealth");


// ======================================
// Create System Health
// ======================================

exports.createSystemHealth = async (req, res) => {

    try {

        const health = await SystemHealth.create({

            admin: req.admin._id,

            serverStatus: req.body.serverStatus || "online",

            databaseStatus: req.body.databaseStatus || "connected",

            cpuUsage: req.body.cpuUsage || 0,

            memoryUsage: req.body.memoryUsage || 0,

            diskUsage: req.body.diskUsage || 0,

            uptime: req.body.uptime || 0,

            notes: req.body.notes || ""

        });

        res.status(201).json({

            success: true,

            message: "System health created successfully",

            health

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ======================================
// Get All System Health Records
// ======================================

exports.getSystemHealth = async (req, res) => {

    try {

        const health = await SystemHealth.find()
            .populate("admin", "name email role")
            .sort({ createdAt: -1 });

        res.json({

            success: true,

            count: health.length,

            health

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// ======================================
// Get Single System Health
// ======================================

exports.getSystemHealthById = async (req, res) => {

    try {

        const health = await SystemHealth.findById(req.params.id)
            .populate("admin", "name email role");

        if (!health) {

            return res.status(404).json({

                success: false,

                message: "System health not found"

            });

        }

        res.json({

            success: true,

            health

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
