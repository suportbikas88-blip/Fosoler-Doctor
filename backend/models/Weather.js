const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema(
  {
    district: {
      type: String,
      required: true,
      trim: true,
    },

    temperature: {
      type: Number,
      required: true,
    },

    humidity: {
      type: Number,
      required: true,
    },

    windSpeed: {
      type: Number,
      required: true,
    },

    condition: {
      type: String,
      required: true,
      trim: true,
    },

    rainChance: {
      type: Number,
      default: 0,
    },

    advice: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Weather", weatherSchema);
