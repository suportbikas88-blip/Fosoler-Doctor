const Weather = require("../models/Weather");
const MarketPrice = require("../models/MarketPrice");
const Notification = require("../models/Notification");
const CropCalendar = require("../models/CropCalendar");


// Farmer Dashboard
exports.getDashboard = async (req, res) => {
  try {

    const weather = await Weather.findOne()
      .sort({ createdAt: -1 });


    const marketPrices = await MarketPrice.find()
      .sort({ createdAt: -1 })
      .limit(5);


    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(5);


    const cropCalendar = await CropCalendar.find()
      .sort({ createdAt: -1 })
      .limit(5);


    res.status(200).json({
      success: true,
      message: "Dashboard data loaded successfully",
      data: {
        weather,
        marketPrices,
        notifications,
        cropCalendar
      }
    });


  } catch (error) {

    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
      error: error.message
    });

  }
};
