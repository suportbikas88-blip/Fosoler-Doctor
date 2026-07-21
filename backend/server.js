const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");

// Load Environment Variables
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// =====================
// Import Routes
// =====================
const authRoutes = require("./routes/authRoutes");
const farmerRoutes = require("./routes/farmerRoutes");

// =====================
// Home Route
// =====================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    app: "Fosoler Doctor API",
    version: "1.0.0",
    message: "Backend Running Successfully",
  });
});

// =====================
// API Routes
// =====================
app.use("/api/auth", authRoutes);
app.use("/api/farmer", farmerRoutes);

// =====================
// 404 Route
// =====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =====================
// Global Error Handler
// =====================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// =====================
// Start Server
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("======================================");
  console.log("🌾 Fosoler Doctor Backend Started");
  console.log(`🚀 Server Running on Port ${PORT}`);
  console.log("======================================");
});
