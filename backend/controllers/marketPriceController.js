const MarketPrice = require("../models/MarketPrice");

// ===============================
// Get All Market Prices
// ===============================
exports.getAllMarketPrices = async (req, res) => {
  try {
    const prices = await MarketPrice.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: prices.length,
      data: prices,
    });
  } catch (error) {
    console.error("Get Market Prices Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch market prices",
      error: error.message,
    });
  }
};

// ===============================
// Add Market Price
// ===============================
exports.addMarketPrice = async (req, res) => {
  try {
    const {
      cropName,
      marketName,
      district,
      unit,
      price,
      date,
    } = req.body;

    if (!cropName || !marketName || !district || !price) {
      return res.status(400).json({
        success: false,
        message:
          "cropName, marketName, district and price are required",
      });
    }

    const marketPrice = await MarketPrice.create({
      cropName,
      marketName,
      district,
      unit,
      price,
      date,
    });

    res.status(201).json({
      success: true,
      message: "Market price added successfully",
      data: marketPrice,
    });
  } catch (error) {
    console.error("Add Market Price Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add market price",
      error: error.message,
    });
  }
};
