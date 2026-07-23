const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "bug",
        "feature",
        "system",
        "support",
        "other",
      ],
      default: "other",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "reviewed",
        "resolved",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Feedback",
  feedbackSchema
);
