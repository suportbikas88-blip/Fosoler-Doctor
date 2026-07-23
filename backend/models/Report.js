const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    reportType: {
      type: String,
      enum: [
        "users",
        "farmers",
        "experts",
        "payments",
        "analytics",
        "security",
        "custom",
      ],
      default: "analytics",
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    fileName: {
      type: String,
      default: "",
    },

    filePath: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "generated",
        "downloaded",
      ],
      default: "generated",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Report",
  reportSchema
);
