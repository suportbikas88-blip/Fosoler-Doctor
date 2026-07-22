const express = require("express");

const router = express.Router();

const {
  createCropCalendar,
  getCropCalendars,
  getByDistrict,
} = require("../controllers/cropCalendarController");


router.post("/", createCropCalendar);


router.get("/", getCropCalendars);


router.get("/district/:district", getByDistrict);


module.exports = router;
