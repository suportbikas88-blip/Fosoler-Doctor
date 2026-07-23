const mongoose = require("mongoose");

const systemHealthSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    serverStatus: {
      type: String,
      enum: ["online", "offline", "maintenance"],
      default: "online",
    },

    databaseStatus: {
      type: String,
      enum: ["connected", "disconnected"],
      default: "connected",
    },

    cpuUsage: {
      type: Number,
      default: 0,
    },

    memoryUsage: {
      type: Number,
      default: 0,
    },

    diskUsage: {
      type: Number,
      default: 0,
    },

    uptime: {
      type: Number,
      default: 0,
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
  "SystemHealth",
  systemHealthSchema
);
