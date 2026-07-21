const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// =========================
// Register
// =========================
const register = async (req, res) => {
    try {
        const {
            fullName,
            phone,
            email,
            password,
            district,
            upazila
        } = req.body;

        if (!fullName || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Full Name, Phone and Password are required"
            });
        }

        const existingUser = await User.findOne({
            $or: [{ phone }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            phone,
            email,
            password: hashedPassword,
            district,
            upazila
        });

        res.status(201).json({
            success: true,
            message: "Registration successful",
            token: generateToken(user._id),
            user: {
                id: user._id,
                fullName: user.fullName,
                phone: user.phone,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// =========================
// Login
// =========================
const login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        if (!phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Phone and Password are required"
            });
        }

        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        res.status(200).json({
            success: true,
            message: "Login successful",
            token: generateToken(user._id),
            user: {
                id: user._id,
                fullName: user.fullName,
                phone: user.phone,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// =========================
// Get Profile
// =========================
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// =========================
// Update Profile
// =========================
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.fullName = req.body.fullName || user.fullName;
        user.email = req.body.email || user.email;
        user.district = req.body.district || user.district;
        user.upazila = req.body.upazila || user.upazila;
        user.language = req.body.language || user.language;

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: updatedUser._id,
                fullName: updatedUser.fullName,
                phone: updatedUser.phone,
                email: updatedUser.email,
                district: updatedUser.district,
                upazila: updatedUser.upazila,
                language: updatedUser.language,
                role: updatedUser.role
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// =========================
// Change Password
// =========================
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Current password and new password are required"
            });
        }

        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// =========================
// Forgot Password (placeholder)
// =========================
const forgotPassword = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "OTP sending feature will be added in next phase"
    });
};

// =========================
// Reset Password (placeholder)
// =========================
const resetPassword = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Password reset feature will be added in next phase"
    });
};

module.exports = {
    register,
    login,
    getProfile,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword
};
