const Admin = require("../models/Admin");
const FarmerProfile = require("../models/FarmerProfile");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign(
        {
            id,
            role: "admin",
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

// ======================================
// Admin Register
// ======================================

exports.registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required",
            });
        }

        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists",
            });
        }

        const admin = await Admin.create({
            name,
            email,
            password,
        });

        res.status(201).json({
            success: true,
            message: "Admin created successfully",
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
            token: generateToken(admin._id),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================================
// Admin Login
// ======================================

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        if (admin.status === "blocked") {
            return res.status(403).json({
                success: false,
                message: "Admin account blocked",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        admin.lastLogin = new Date();
        await admin.save();

        res.status(200).json({
            success: true,
            message: "Login successful",
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
            token: generateToken(admin._id),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};// ======================================
// Admin Profile
// ======================================

exports.getAdminProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin._id).select("-password");

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        res.status(200).json({
            success: true,
            admin,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================
// Admin Dashboard
// ======================================

exports.dashboardStats = async (req, res) => {
    try {

        const totalFarmers = await FarmerProfile.countDocuments();
        const totalAdmins = await Admin.countDocuments();

        res.status(200).json({
            success: true,
            dashboard: {
                totalFarmers,
                totalAdmins,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};// ======================================
// Get All Farmers
// ======================================

exports.getAllFarmers = async (req, res) => {
    try {

        const farmers = await FarmerProfile.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: farmers.length,
            farmers,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================
// Get Farmer By ID
// ======================================

exports.getFarmerById = async (req, res) => {
    try {

        const farmer = await FarmerProfile.findById(req.params.id);

        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: "Farmer not found",
            });
        }

        res.status(200).json({
            success: true,
            farmer,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================
// Block Farmer
// ======================================

exports.blockFarmer = async (req, res) => {
    try {

        const farmer = await FarmerProfile.findById(req.params.id);

        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: "Farmer not found",
            });
        }

        farmer.status = "blocked";
        await farmer.save();

        res.status(200).json({
            success: true,
            message: "Farmer blocked successfully",
            farmer,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================
// Activate Farmer
// ======================================

exports.activateFarmer = async (req, res) => {
    try {

        const farmer = await FarmerProfile.findById(req.params.id);

        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: "Farmer not found",
            });
        }

        farmer.status = "active";
        await farmer.save();

        res.status(200).json({
            success: true,
            message: "Farmer activated successfully",
            farmer,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ======================================
// Delete Farmer
// ======================================

exports.deleteFarmer = async (req, res) => {
    try {

        const farmer = await FarmerProfile.findById(req.params.id);

        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: "Farmer not found",
            });
        }

        await FarmerProfile.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Farmer deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
