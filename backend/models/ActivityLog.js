const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    action: {
      type: String,
      required: true,
      trim: true,
    },

    module: {
      type: String,
      enum: [
        "auth",
        "farmer",
        "expert",
        "notification",
        "settings",
        "analytics",
        "system",
      ],
      default: "system",
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    ipAddress: {
      type: String,
      default: "",
    },

    userAgent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model(
  "ActivityLog",
  activityLogSchema
);
