const mongoose = require("mongoose");

const aiRecommendationSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cropName: {
      type: String,
      required: true,
    },

    diseaseName: {
      type: String,
      default: null,
    },

    weatherCondition: {
      type: String,
      default: null,
    },

    recommendationType: {
      type: String,
      enum: [
        "fertilizer",
        "pesticide",
        "irrigation",
        "weather",
        "general"
      ],
      default: "general",
    },

    recommendation: {
      type: String,
      required: true,
    },

    aiSource: {
      type: String,
      default: "Fosoler AI Engine",
    },

    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "AIRecommendation",
  aiRecommendationSchema
);
