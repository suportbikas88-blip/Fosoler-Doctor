const mongoose = require("mongoose");

const adminLoginHistorySchema = new mongoose.Schema(
  {

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },


    loginTime: {
      type: Date,
      default: Date.now,
    },


    logoutTime: {
      type: Date,
      default: null,
    },


    ipAddress: {
      type: String,
      default: "",
    },


    userAgent: {
      type: String,
      default: "",
    },


    device: {
      type: String,
      default: "",
    },


    status: {
      type: String,
      enum: [
        "success",
        "failed"
      ],
      default: "success",
    },


    failureReason: {
      type: String,
      default: "",
    },

  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model(
  "AdminLoginHistory",
  adminLoginHistorySchema
);
