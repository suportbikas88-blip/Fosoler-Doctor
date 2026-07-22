const AIRecommendation = require("../models/AIRecommendation");

// Create AI Recommendation
exports.createRecommendation = async (req, res) => {
  try {
    const recommendation = await AIRecommendation.create({
      farmer: req.user.id,
      cropName: req.body.cropName,
      diseaseName: req.body.diseaseName,
      weatherCondition: req.body.weatherCondition,
      recommendationType: req.body.recommendationType,
      recommendation: req.body.recommendation,
    });

    res.status(201).json({
      success: true,
      message: "AI recommendation created successfully.",
      data: recommendation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Recommendations
exports.getMyRecommendations = async (req, res) => {
  try {
    const recommendations = await AIRecommendation.find({
      farmer: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Recommendation By ID
exports.getRecommendationById = async (req, res) => {
  try {
    const recommendation = await AIRecommendation.findById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: "Recommendation not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: recommendation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Recommendation
exports.deleteRecommendation = async (req, res) => {
  try {
    const recommendation = await AIRecommendation.findById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: "Recommendation not found.",
      });
    }

    await recommendation.deleteOne();

    res.status(200).json({
      success: true,
      message: "Recommendation deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
