const express = require("express");

const router = express.Router();


const {
  createActivity,
  getActivities,
  getByType,
} = require("../controllers/activityController");


// Create Activity
router.post("/", createActivity);


// Get All Activities
router.get("/", getActivities);


// Get Activity By Type
router.get("/type/:type", getByType);


module.exports = router;

