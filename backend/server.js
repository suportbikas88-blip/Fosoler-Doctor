require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");

// ==========================
// Routes
// ==========================
const authRoutes = require("./routes/authRoutes");
const farmerRoutes = require("./routes/farmerRoutes");
const cropDiseaseRoutes = require("./routes/cropDiseaseRoutes");
const voiceRoutes = require("./routes/voiceRoutes");
const marketPriceRoutes = require("./routes/marketPriceRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// ==========================
// Database Connection
// ==========================
connectDB();

// ==========================
// Middlewares
// ==========================
app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// ==========================
// Upload Folder
// ==========================
app.use("/uploads", express.static("uploads"));

// ==========================
// API Routes
// ==========================
app.use("/api/auth", authRoutes);

app.use("/api/farmers", farmerRoutes);

app.use("/api/crop-disease", cropDiseaseRoutes);

app.use("/api/voice", voiceRoutes);

app.use("/api/market-prices", marketPriceRoutes);

app.use("/api/weather", weatherRoutes);

app.use("/api/notifications", notificationRoutes);

// ==========================
// Home API
// ==========================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Fosoler Doctor API Running",
  });
});

// ==========================
// 404 Handler
// ==========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ==========================
// Error Handler
// ==========================
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ==========================
// Server Start
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});
