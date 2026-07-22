const SystemSetting = require("../models/SystemSetting");

// ======================================
// Get System Settings
// ======================================
exports.getSettings = async (req, res) => {
  try {
    let settings = await SystemSetting.findOne();

    if (!settings) {
      settings = await SystemSetting.create({});
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update System Settings
// ======================================
exports.updateSettings = async (req, res) => {
  try {
    let settings = await SystemSetting.findOne();

    if (!settings) {
      settings = await SystemSetting.create({});
    }

    Object.assign(settings, req.body);

    await settings.save();

    res.status(200).json({
      success: true,
      message: "System settings updated successfully",
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Toggle Maintenance Mode
// ======================================
exports.toggleMaintenance = async (req, res) => {
  try {
    let settings = await SystemSetting.findOne();

    if (!settings) {
      settings = await SystemSetting.create({});
    }

    settings.maintenanceMode = !settings.maintenanceMode;
    await settings.save();

    res.status(200).json({
      success: true,
      message: `Maintenance mode ${settings.maintenanceMode ? "enabled" : "disabled"}`,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Toggle Farmer Registration
// ======================================
exports.toggleRegistration = async (req, res) => {
  try {
    let settings = await SystemSetting.findOne();

    if (!settings) {
      settings = await SystemSetting.create({});
    }

    settings.registrationEnabled = !settings.registrationEnabled;
    await settings.save();

    res.status(200).json({
      success: true,
      message: `Farmer registration ${settings.registrationEnabled ? "enabled" : "disabled"}`,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Toggle AI Service
// ======================================
exports.toggleAIService = async (req, res) => {
  try {
    let settings = await SystemSetting.findOne();

    if (!settings) {
      settings = await SystemSetting.create({});
    }

    settings.aiServiceEnabled = !settings.aiServiceEnabled;
    await settings.save();

    res.status(200).json({
      success: true,
      message: `AI Service ${settings.aiServiceEnabled ? "enabled" : "disabled"}`,
      settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
