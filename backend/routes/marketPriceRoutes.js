const express = require("express");

const router = express.Router();

const {
  getAllMarketPrices,
  addMarketPrice,
} = require("../controllers/marketPriceController");

// Get all market prices
router.get("/", getAllMarketPrices);

// Add new market price
router.post("/", addMarketPrice);

module.exports = router;
