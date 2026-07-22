const ActivityLog = require("../models/ActivityLog");


// ======================================
// Create Activity Log
// ======================================
exports.createActivityLog = async (req, res) => {

  try {

    const {
      action,
      module,
      description
    } = req.body;


    const activity = await ActivityLog.create({

      admin: req.admin.id,

      action,

      module,

      description,

      ipAddress:
        req.ip || "",

      userAgent:
        req.headers["user-agent"] || "",

    });


    res.status(201).json({

      success: true,

      message:
        "Activity log created successfully",

      activity,

    });


  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};




// ======================================
// Get All Activity Logs
// ======================================
exports.getActivityLogs = async (req, res) => {

  try {

    const logs =
      await ActivityLog.find()
      .populate(
        "admin",
        "name email role"
      )
      .sort({
        createdAt: -1
      });


    res.status(200).json({

      success: true,

      count: logs.length,

      logs,

    });


  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }

};




// ======================================
// Get Single Activity Log
// ======================================
exports.getActivityLogById = async (req, res) => {

  try {


    const log =
      await ActivityLog.findById(
        req.params.id
      )
      .populate(
        "admin",
        "name email role"
      );


    if (!log) {

      return res.status(404).json({

        success: false,

        message:
          "Activity log not found",

      });

    }


    res.status(200).json({

      success: true,

      log,

    });


  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }

};




// ======================================
// Delete Activity Log
// ======================================
exports.deleteActivityLog = async (req, res) => {

  try {


    const log =
      await ActivityLog.findByIdAndDelete(
        req.params.id
      );


    if (!log) {

      return res.status(404).json({

        success: false,

        message:
          "Activity log not found",

      });

    }


    res.status(200).json({

      success: true,

      message:
        "Activity log deleted successfully",

    });


  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }

};
