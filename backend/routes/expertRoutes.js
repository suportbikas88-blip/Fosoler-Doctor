const express = require("express");

const router = express.Router();

const {
    registerExpert,
    loginExpert,
    getExpertProfile,
    getAllExperts,
    approveExpert,
    rejectExpert,
    blockExpert,
    deleteExpert,
} = require("../controllers/expertController");

const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

// ==========================
// Public Expert Routes
// ==========================

router.post("/register", registerExpert);

router.post("/login", loginExpert);

// ==========================
// Admin Routes
// ==========================

router.get(
    "/",
    adminAuthMiddleware,
    getAllExperts
);

router.get(
    "/profile",
    adminAuthMiddleware,
    getExpertProfile
);

router.put(
    "/approve/:id",
    adminAuthMiddleware,
    approveExpert
);

router.put(
    "/reject/:id",
    adminAuthMiddleware,
    rejectExpert
);

router.put(
    "/block/:id",
    adminAuthMiddleware,
    blockExpert
);

router.delete(
    "/:id",
    adminAuthMiddleware,
    deleteExpert
);

module.exports = router;
