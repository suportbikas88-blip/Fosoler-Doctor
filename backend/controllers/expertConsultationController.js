const ExpertConsultation = require("../models/ExpertConsultation");

// Create Consultation
exports.createConsultation = async (req, res) => {
  try {
    const consultation = await ExpertConsultation.create({
      farmer: req.user._id,
      cropName: req.body.cropName,
      question: req.body.question,
      district: req.body.district,
      image: req.body.image,
    });

    res.status(201).json({
      success: true,
      message: "Consultation request submitted successfully.",
      data: consultation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Consultations
exports.getMyConsultations = async (req, res) => {
  try {
    const consultations = await ExpertConsultation.find({
      farmer: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: consultations.length,
      data: consultations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Consultation By ID
exports.getConsultationById = async (req, res) => {
  try {
    const consultation = await ExpertConsultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: consultation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Expert Answer
exports.answerConsultation = async (req, res) => {
  try {
    const consultation = await ExpertConsultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found.",
      });
    }

    consultation.answer = req.body.answer;
    consultation.expertName = req.body.expertName;
    consultation.status = "Answered";
    consultation.answeredAt = new Date();

    await consultation.save();

    res.status(200).json({
      success: true,
      message: "Answer submitted successfully.",
      data: consultation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Close Consultation
exports.closeConsultation = async (req, res) => {
  try {
    const consultation = await ExpertConsultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({
        success: false,
        message: "Consultation not found.",
      });
    }

    consultation.status = "Closed";

    await consultation.save();

    res.status(200).json({
      success: true,
      message: "Consultation closed successfully.",
      data: consultation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
