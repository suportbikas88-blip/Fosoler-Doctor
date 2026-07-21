const FarmerProfile = require("../models/FarmerProfile");

// =======================================
// Create Farmer Profile
// =======================================
const createProfile = async (req, res) => {
  try {
    const existingProfile = await FarmerProfile.findOne({
      user: req.user._id,
    });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists.",
      });
    }

    const profile = await FarmerProfile.create({
      user: req.user._id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message: "Farmer profile created successfully.",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Update Farmer Profile
// =======================================
const updateProfile = async (req, res) => {
  try {
    const profile = await FarmerProfile.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get My Profile
// =======================================
const getMyProfile = async (req, res) => {
  try {
    const profile = await FarmerProfile.findOne({
      user: req.user._id,
    }).populate("user", "name email phone");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProfile,
  updateProfile,
  getMyProfile,
};
