const express = require("express");

const router = express.Router();


const adminAuthMiddleware =
  require("../middleware/adminAuthMiddleware");


const {

  createLoginHistory,

  getLoginHistory,

  getLoginHistoryById,

  deleteLoginHistory,

} = require("../controllers/adminLoginHistoryController");



// ======================================
// Admin Login History Routes
// ======================================


// Create Login History
router.post(
  "/",
  adminAuthMiddleware,
  createLoginHistory
);


// Get All Login History
router.get(
  "/",
  adminAuthMiddleware,
  getLoginHistory
);


// Get Single Login History
router.get(
  "/:id",
  adminAuthMiddleware,
  getLoginHistoryById
);


// Delete Login History
router.delete(
  "/:id",
  adminAuthMiddleware,
  deleteLoginHistory
);



module.exports = router;
