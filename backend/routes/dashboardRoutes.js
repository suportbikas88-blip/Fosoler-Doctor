const express = require("express");

const router = express.Router();

const {
  getDashboard,
} = require("../controllers/dashboardController");


// Farmer Dashboard API
router.get("/", getDashboard);


module.exports = router;
