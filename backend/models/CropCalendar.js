const mongoose = require("mongoose");

const cropCalendarSchema = new mongoose.Schema(
  {
    cropName: {
      type: String,
      required: true,
      trim: true,
    },

    district: {
      type: String,
      required: true,
      trim: true,
    },

    plantingDate: {
      type: Date,
      required: true,
    },

    harvestDate: {
      type: Date,
      required: true,
    },

    irrigationSchedule: {
      type: String,
      required: true,
      trim: true,
    },

    fertilizerSchedule: {
      type: String,
      required: true,
      trim: true,
    },

    pesticideReminder: {
      type: String,
      default: "",
      trim: true,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CropCalendar",
  cropCalendarSchema
);
