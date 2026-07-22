const express = require("express");

const router = express.Router();


const {

    registerAdmin,
    loginAdmin,
    getAdminProfile,
    dashboardStats,

    getAllFarmers,
    getFarmerById,
    blockFarmer,
    activateFarmer,
    deleteFarmer

} = require("../controllers/adminController");



const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");



// ==========================
// Public Admin Routes
// ==========================

router.post(
    "/register",
    registerAdmin
);


router.post(
    "/login",
    loginAdmin
);





// ==========================
// Protected Admin Routes
// ==========================


router.get(
    "/profile",
    adminAuthMiddleware,
    getAdminProfile
);



router.get(
    "/dashboard",
    adminAuthMiddleware,
    dashboardStats
);




// ==========================
// Farmer Management
// ==========================


// Get All Farmers
router.get(
    "/farmers",
    adminAuthMiddleware,
    getAllFarmers
);



// Get Single Farmer
router.get(
    "/farmers/:id",
    adminAuthMiddleware,
    getFarmerById
);



// Block Farmer
router.put(
    "/farmers/block/:id",
    adminAuthMiddleware,
    blockFarmer
);



// Activate Farmer
router.put(
    "/farmers/activate/:id",
    adminAuthMiddleware,
    activateFarmer
);



// Delete Farmer
router.delete(
    "/farmers/:id",
    adminAuthMiddleware,
    deleteFarmer
);



module.exports = router;
