const mongoose = require("mongoose");

const farmerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    district: {
      type: String,
      required: true,
      trim: true,
    },

    upazila: {
      type: String,
      required: true,
      trim: true,
    },

    village: {
      type: String,
      default: "",
      trim: true,
    },

    farmName: {
      type: String,
      default: "",
      trim: true,
    },

    landSize: {
      type: Number,
      default: 0,
    },

    landUnit: {
      type: String,
      enum: ["Decimal", "Acre", "Hectare"],
      default: "Decimal",
    },

    soilType: {
      type: String,
      enum: [
        "Clay",
        "Loam",
        "Sandy",
        "Silty",
        "Peaty",
        "Chalky",
        "Other",
      ],
      default: "Other",
    },

    crops: [
      {
        type: String,
      },
    ],

    irrigationType: {
      type: String,
      default: "",
    },

    farmingExperience: {
      type: Number,
      default: 0,
    },

    profileImage: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "FarmerProfile",
  farmerProfileSchema
);
