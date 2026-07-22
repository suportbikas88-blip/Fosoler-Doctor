const express = require("express");

const router = express.Router();


const adminAuthMiddleware =
  require("../middleware/adminAuthMiddleware");


const {

  getSecurityDashboard,

  resetSecurityDashboard,

} = require("../controllers/securityDashboardController");



// Get Security Dashboard
router.get(
  "/",
  adminAuthMiddleware,
  getSecurityDashboard
);



// Reset Security Dashboard
router.post(
  "/reset",
  adminAuthMiddleware,
  resetSecurityDashboard
);



module.exports = router;
