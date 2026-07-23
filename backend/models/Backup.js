const mongoose = require("mongoose");

const backupSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    backupName: {
      type: String,
      required: true,
      trim: true,
    },

    backupType: {
      type: String,
      enum: ["manual", "automatic"],
      default: "manual",
    },

    fileName: {
      type: String,
      default: "",
    },

    filePath: {
      type: String,
      default: "",
    },

    fileSize: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["completed", "failed", "restored"],
      default: "completed",
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Backup", backupSchema);
