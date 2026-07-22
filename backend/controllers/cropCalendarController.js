const CropCalendar = require("../models/CropCalendar");

// Create Crop Calendar
exports.createCropCalendar = async (req, res) => {
  try {
    const cropCalendar = await CropCalendar.create(req.body);

    res.status(201).json({
      success: true,
      message: "Crop calendar created successfully",
      data: cropCalendar,
    });

  } catch (error) {
    console.error("Crop Calendar Create Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create crop calendar",
      error: error.message,
    });
  }
};


// Get All Crop Calendar
exports.getCropCalendars = async (req, res) => {
  try {
    const calendars = await CropCalendar.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: calendars.length,
      data: calendars,
    });

  } catch (error) {
    console.error("Crop Calendar Fetch Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch crop calendars",
      error: error.message,
    });
  }
};


// Get Crop Calendar By District
exports.getByDistrict = async (req, res) => {
  try {
    const calendars = await CropCalendar.find({
      district: req.params.district,
    });

    res.status(200).json({
      success: true,
      count: calendars.length,
      data: calendars,
    });

  } catch (error) {
    console.error("District Search Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to search crop calendar",
      error: error.message,
    });
  }
};
