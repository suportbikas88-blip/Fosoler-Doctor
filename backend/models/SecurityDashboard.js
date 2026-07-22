const mongoose = require("mongoose");


const securityDashboardSchema = new mongoose.Schema(
  {

    totalLogins: {
      type: Number,
      default: 0,
    },


    successfulLogins: {
      type: Number,
      default: 0,
    },


    failedLogins: {
      type: Number,
      default: 0,
    },


    blockedAttempts: {
      type: Number,
      default: 0,
    },


    lastLogin: {
      type: Date,
      default: null,
    },


    lastActivity: {
      type: Date,
      default: null,
    },


    lastLoginIP: {
      type: String,
      default: "",
    },


    securityStatus: {
      type: String,
      enum: [
        "secure",
        "warning",
        "danger"
      ],
      default: "secure",
    },


  },
  {
    timestamps:true,
  }
);



module.exports =
mongoose.model(
  "SecurityDashboard",
  securityDashboardSchema
);
