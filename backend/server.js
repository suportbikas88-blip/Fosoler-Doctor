const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");

dotenv.config();

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

const adminLoginHistoryRoutes =
  require("./routes/adminLoginHistoryRoutes");

const securityDashboardRoutes =
  require("./routes/securityDashboardRoutes");

const adminSessionRoutes =
  require("./routes/adminSessionRoutes");

const securityAuditRoutes =
  require("./routes/securityAuditRoutes");

const securityAlertRoutes =
  require("./routes/securityAlertRoutes");

const backupRoutes =
  require("./routes/backupRoutes");

const reportRoutes =
  require("./routes/reportRoutes");

const systemHealthRoutes =
  require("./routes/systemHealthRoutes");

const feedbackRoutes =
  require("./routes/feedbackRoutes");

const announcementRoutes =
  require("./routes/announcementRoutes");

const dashboardRoutes =
  require("./routes/dashboardRoutes");

const notificationRoutes =
  require("./routes/notificationRoutes");


// ================================
// Module-28 Routes
// ================================

const aiRecommendationRoutes =
  require("./routes/aiRecommendationRoutes");

const cropCalendarRoutes =
  require("./routes/cropCalendarRoutes");

const weatherRoutes =
  require("./routes/weatherRoutes");

const marketPriceRoutes =
  require("./routes/marketPriceRoutes");

const voiceRoutes =
  require("./routes/voiceRoutes");


// ================================
// Default Route
// ================================

app.get("/", (req, res) => {

  res.json({

    success:true,

    message:"Fosoler Doctor API Running",

    version:"1.0.0"

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


app.use(
  "/api/dashboard",
  dashboardRoutes
);


app.use(
  "/api/notifications",
  notificationRoutes
);


// Admin Modules

app.use(
  "/api/admin/notifications",
  adminNotificationRoutes
);


app.use(
  "/api/admin/analytics",
  adminAnalyticsRoutes
);


app.use(
  "/api/admin/settings",
  systemSettingRoutes
);


app.use(
  "/api/admin/activity-logs",
  activityLogRoutes
);


app.use(
  "/api/admin/login-history",
  adminLoginHistoryRoutes
);


app.use(
  "/api/admin/security",
  securityDashboardRoutes
);


app.use(
  "/api/admin/sessions",
  adminSessionRoutes
);


app.use(
  "/api/admin/security-audits",
  securityAuditRoutes
);


app.use(
  "/api/admin/security-alerts",
  securityAlertRoutes
);


app.use(
  "/api/admin/backups",
  backupRoutes
);


app.use(
  "/api/admin/reports",
  reportRoutes
);


app.use(
  "/api/admin/system-health",
  systemHealthRoutes
);


app.use(
  "/api/admin/feedbacks",
  feedbackRoutes
);


app.use(
  "/api/admin/announcements",
  announcementRoutes
);



// ================================
// Module-28
// Farmer AI Features
// ================================


// AI Recommendation

app.use(
  "/api/ai-recommendations",
  aiRecommendationRoutes
);


// Crop Calendar

app.use(
  "/api/crop-calendar",
  cropCalendarRoutes
);


// Weather

app.use(
  "/api/weather",
  weatherRoutes
);


// Market Price

app.use(
  "/api/market-price",
  marketPriceRoutes
);


// Voice

app.use(
  "/api/voice",
  voiceRoutes
);



// ================================
// 404 Handler
// ================================

app.use((req,res)=>{

  res.status(404).json({

    success:false,

    message:"API Route Not Found"

  });

});


// ================================
// Error Handler
// ================================

app.use(
(err,req,res,next)=>{

  console.error(err);


  res.status(
    err.status || 500
  )
  .json({

    success:false,

    message:
    err.message || "Server Error"

  });


});


// ================================
// Server Start
// ================================

const PORT =
process.env.PORT || 5000;


app.listen(PORT,()=>{


console.log(
"🌾 Fosoler Doctor Backend"
);


console.log(
`🚀 Server Running on Port ${PORT}`
);


});
