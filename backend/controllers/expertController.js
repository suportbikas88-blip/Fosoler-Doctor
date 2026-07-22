const Expert = require("../models/Expert");
const jwt = require("jsonwebtoken");

// ======================================
// Generate JWT Token
// ======================================

const generateToken = (id, role) => {
    return jwt.sign(
        {
            id,
            role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

// ======================================
// Expert Register
// ======================================

exports.registerExpert = async (req, res) => {
    try {

        const {
            name,
            email,
            password,
            phone,
            specialization,
            experience,
            district,
            licenseNumber,
        } = req.body;

        if (
            !name ||
            !email ||
            !password ||
            !specialization
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        const existingExpert = await Expert.findOne({ email });

        if (existingExpert) {
            return res.status(400).json({
                success: false,
                message: "Expert already exists",
            });
        }

        const expert = await Expert.create({
            name,
            email,
            password,
            phone,
            specialization,
            experience,
            district,
            licenseNumber,
        });

        const token = generateToken(
            expert._id,
            expert.role
        );

        res.status(201).json({
            success: true,
            message: "Expert registered successfully",
            expert: {
                id: expert._id,
                name: expert.name,
                email: expert.email,
                specialization: expert.specialization,
                status: expert.status,
                role: expert.role,
            },
            token,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};// ======================================
// Expert Login
// ======================================

exports.loginExpert = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const expert = await Expert.findOne({ email }).select("+password");

        if (!expert) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isMatch = await expert.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        expert.lastLogin = new Date();
        await expert.save();

        const token = generateToken(expert._id, expert.role);

        res.status(200).json({
            success: true,
            message: "Login successful",
            expert: {
                id: expert._id,
                name: expert.name,
                email: expert.email,
                specialization: expert.specialization,
                status: expert.status,
                role: expert.role,
            },
            token,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ======================================
// Expert Profile
// ======================================

exports.getExpertProfile = async (req, res) => {
    try {

        const expert = await Expert.findById(req.expert._id).select("-password");

        if (!expert) {
            return res.status(404).json({
                success: false,
                message: "Expert not found",
            });
        }

        res.status(200).json({
            success: true,
            expert,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};// ======================================
// Get All Experts
// ======================================

exports.getAllExperts = async (req, res) => {
    try {

        const experts = await Expert.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: experts.length,
            experts,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================================
// Approve Expert
// ======================================

exports.approveExpert = async (req, res) => {
    try {

        const expert = await Expert.findById(req.params.id);

        if (!expert) {
            return res.status(404).json({
                success: false,
                message: "Expert not found",
            });
        }

        expert.status = "approved";
        await expert.save();

        res.status(200).json({
            success: true,
            message: "Expert approved successfully",
            expert,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================================
// Reject Expert
// ======================================

exports.rejectExpert = async (req, res) => {
    try {

        const expert = await Expert.findById(req.params.id);

        if (!expert) {
            return res.status(404).json({
                success: false,
                message: "Expert not found",
            });
        }

        expert.status = "rejected";
        await expert.save();

        res.status(200).json({
            success: true,
            message: "Expert rejected successfully",
            expert,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================================
// Block Expert
// ======================================

exports.blockExpert = async (req, res) => {
    try {

        const expert = await Expert.findById(req.params.id);

        if (!expert) {
            return res.status(404).json({
                success: false,
                message: "Expert not found",
            });
        }

        expert.status = "blocked";
        await expert.save();

        res.status(200).json({
            success: true,
            message: "Expert blocked successfully",
            expert,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================================
// Delete Expert
// ======================================

exports.deleteExpert = async (req, res) => {
    try {

        const expert = await Expert.findById(req.params.id);

        if (!expert) {
            return res.status(404).json({
                success: false,
                message: "Expert not found",
            });
        }

        await Expert.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Expert deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
