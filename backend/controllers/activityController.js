const Activity = require("../models/Activity");


// Create Activity
exports.createActivity = async (req, res) => {
  try {

    const activity = await Activity.create(req.body);

    res.status(201).json({
      success: true,
      message: "Activity created successfully",
      data: activity,
    });


  } catch (error) {

    console.error("Activity Create Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create activity",
      error: error.message,
    });

  }
};



// Get All Activities
exports.getActivities = async (req, res) => {
  try {

    const activities = await Activity.find()
      .sort({ createdAt: -1 });


    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities,
    });


  } catch (error) {

    console.error("Activity Fetch Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch activities",
      error: error.message,
    });

  }
};



// Get Activities By Type
exports.getByType = async (req, res) => {
  try {

    const activities = await Activity.find({
      activityType: req.params.type,
    })
    .sort({ createdAt: -1 });


    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities,
    });


  } catch (error) {

    console.error("Activity Type Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch activity type",
      error: error.message,
    });

  }
};
