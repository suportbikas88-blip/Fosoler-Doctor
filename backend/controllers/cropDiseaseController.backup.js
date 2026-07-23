const CropDisease = require("../models/CropDisease");
const { analyzeCropDisease } = require("../services/aiService");

// ===============================
// Create Disease Record
// ===============================
const createDiseaseRecord = async (req, res) => {
  try {
    const aiResult = await analyzeCropDisease(
      req.file ? req.file.path : null
    );

    const diseaseRecord = await CropDisease.create({
      cropName: req.body.cropName,

      diseaseName: aiResult.disease,

      imageUrl: req.file
        ? `/uploads/${req.file.filename}`
        : "",

      aiConfidence: aiResult.confidence,

      symptoms: aiResult.symptoms || [],

      causes: aiResult.causes || [],

      solutions: aiResult.treatment
        ? [aiResult.treatment]
        : [],

      pesticides: aiResult.pesticides || [],

      detectedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Disease record created successfully",
      data: diseaseRecord,
    });
  } catch (error) {
    console.log("Create Disease Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get My Diseases
// ===============================
const getMyDiseases = async (req, res) => {
  try {
    const diseases = await CropDisease.find({
      detectedBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: diseases.length,
      data: diseases,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Disease By ID
// ===============================
const getDiseaseById = async (req, res) => {
  try {
    const disease = await CropDisease.findById(req.params.id);

    if (!disease) {
      return res.status(404).json({
        success: false,
        message: "Disease record not found",
      });
    }

    res.status(200).json({
      success: true,
      data: disease,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Delete Disease
// ===============================
const deleteDisease = async (req, res) => {
  try {
    const disease = await CropDisease.findById(req.params.id);

    if (!disease) {
      return res.status(404).json({
        success: false,
        message: "Disease record not found",
      });
    }

    await disease.deleteOne();

    res.status(200).json({
      success: true,
      message: "Disease deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDiseaseRecord,
  getMyDiseases,
  getDiseaseById,
  deleteDisease,
};
