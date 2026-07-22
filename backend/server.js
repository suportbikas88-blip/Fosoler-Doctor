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


// ================================
// Middlewares
// ================================

app.use(cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(morgan("dev"));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// ================================
// Route Imports
// ================================

const authRoutes = require("./routes/authRoutes");

const farmerRoutes = require("./routes/farmerRoutes");

const adminRoutes = require("./routes/adminRoutes");

const expertRoutes = require("./routes/expertRoutes");

const adminNotificationRoutes =
  require("./routes/adminNotificationRoutes");

const adminAnalyticsRoutes =
  require("./routes/adminAnalyticsRoutes");

const systemSettingRoutes =
  require("./routes/systemSettingRoutes");

const activityLogRoutes =
  require("./routes/activityLogRoutes");



// ================================
// Home Route
// ================================

app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    app: "Fosoler Doctor API",

    version: "1.0.0",

    message:
      "Backend Running Successfully",

  });

});



// ================================
// API Routes
// ================================


app.use(
  "/api/auth",
  authRoutes
);


app.use(
  "/api/farmer",
  farmerRoutes
);


app.use(
  "/api/admin",
  adminRoutes
);


app.use(
  "/api/expert",
  expertRoutes
);


// Notification Management
app.use(
  "/api/admin/notifications",
  adminNotificationRoutes
);


// Analytics Dashboard
app.use(
  "/api/admin/analytics",
  adminAnalyticsRoutes
);


// System Settings
app.use(
  "/api/admin/settings",
  systemSettingRoutes
);


// Activity Logs
app.use(
  "/api/admin/activity-logs",
  activityLogRoutes
);



// ================================
// 404 Route
// ================================

app.use((req, res) => {

  res.status(404).json({

    success:false,

    message:
      "Route Not Found",

  });

});



// ================================
// Global Error Handler
// ================================

app.use((err, req, res, next)=>{


  console.error(err.stack);


  res.status(
    err.status || 500
  )
  .json({

    success:false,

    message:
      err.message ||
      "Internal Server Error",

  });


});



// ================================
// Start Server
// ================================

const PORT =
  process.env.PORT || 5000;


app.listen(PORT, ()=>{


  console.log(
    "======================================"
  );

  console.log(
    "🌾 Fosoler Doctor Backend Started"
  );

  console.log(
    `🚀 Server Running on Port ${PORT}`
  );

  console.log(
    "======================================"
  );


});
