const mongoose = require("mongoose");


const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },


    activityType: {
      type: String,
      required: true,
      enum: [
        "disease",
        "voice",
        "market",
        "weather",
        "crop-calendar"
      ],
    },


    title: {
      type: String,
      required: true,
    },


    description: {
      type: String,
      default: "",
    },


    data: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model(
  "Activity",
  activitySchema
);
