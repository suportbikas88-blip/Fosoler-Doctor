const mongoose = require("mongoose");

const cropDiseaseSchema = new mongoose.Schema(
  {
    cropName: {
      type: String,
      required: true,
      trim: true,
    },

    diseaseName: {
      type: String,
      required: true,
      trim: true,
    },

    symptoms: {
      type: [String],
      default: [],
    },

    causes: {
      type: [String],
      default: [],
    },

    solutions: {
      type: [String],
      default: [],
    },

    pesticides: {
      type: [String],
      default: [],
    },

    imageUrl: {
      type: String,
      default: "",
    },

    aiConfidence: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    detectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CropDisease", cropDiseaseSchema);
