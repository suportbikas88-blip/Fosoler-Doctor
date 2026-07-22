const FarmerProfile = require("../models/FarmerProfile");
const Expert = require("../models/Expert");
const Admin = require("../models/Admin");
const Notification = require("../models/Notification");
const CropDisease = require("../models/CropDisease");
const ExpertConsultation = require("../models/ExpertConsultation");
const AIRecommendation = require("../models/AIRecommendation");
const MarketPrice = require("../models/MarketPrice");
const Weather = require("../models/Weather");
const CropCalendar = require("../models/CropCalendar");

// ======================================
// Admin Analytics Dashboard
// ======================================

exports.getAnalytics = async (req, res) => {
  try {
    const [
      totalFarmers,
      totalExperts,
      pendingExperts,
      approvedExperts,
      rejectedExperts,
      blockedExperts,
      totalAdmins,
      totalNotifications,
      totalCropDiseases,
      totalConsultations,
      totalRecommendations,
      totalMarketPrices,
      totalWeatherReports,
      totalCropCalendars,
    ] = await Promise.all([
      FarmerProfile.countDocuments(),
      Expert.countDocuments(),
      Expert.countDocuments({ status: "pending" }),
      Expert.countDocuments({ status: "approved" }),
      Expert.countDocuments({ status: "rejected" }),
      Expert.countDocuments({ status: "blocked" }),
      Admin.countDocuments(),
      Notification.countDocuments(),
      CropDisease.countDocuments(),
      ExpertConsultation.countDocuments(),
      AIRecommendation.countDocuments(),
      MarketPrice.countDocuments(),
      Weather.countDocuments(),
      CropCalendar.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        totalFarmers,
        totalExperts,
        pendingExperts,
        approvedExperts,
        rejectedExperts,
        blockedExperts,
        totalAdmins,
        totalNotifications,
        totalCropDiseases,
        totalConsultations,
        totalRecommendations,
        totalMarketPrices,
        totalWeatherReports,
        totalCropCalendars,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
