const mongoose = require("mongoose");

const systemSettingSchema = new mongoose.Schema(
  {
    appName: {
      type: String,
      default: "Fosoler Doctor",
      trim: true,
    },

    appVersion: {
      type: String,
      default: "1.0.0",
      trim: true,
    },

    maintenanceMode: {
      type: Boolean,
      default: false,
    },

    registrationEnabled: {
      type: Boolean,
      default: true,
    },

    expertRegistrationEnabled: {
      type: Boolean,
      default: true,
    },

    aiServiceEnabled: {
      type: Boolean,
      default: true,
    },

    weatherServiceEnabled: {
      type: Boolean,
      default: true,
    },

    marketPriceEnabled: {
      type: Boolean,
      default: true,
    },

    notificationEnabled: {
      type: Boolean,
      default: true,
    },

    voiceAIEnabled: {
      type: Boolean,
      default: true,
    },

    supportEmail: {
      type: String,
      default: "support@fosoler.com",
      trim: true,
    },

    supportPhone: {
      type: String,
      default: "",
      trim: true,
    },

    defaultLanguage: {
      type: String,
      enum: ["bn", "en"],
      default: "bn",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "SystemSetting",
  systemSettingSchema
);
