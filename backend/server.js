const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");


// Environment Config
dotenv.config();


// Database Connect
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


const authRoutes =
  require("./routes/authRoutes");


const farmerRoutes =
  require("./routes/farmerRoutes");


const adminRoutes =
  require("./routes/adminRoutes");


const expertRoutes =
  require("./routes/expertRoutes");


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




// ================================
// Default Route
// ================================

app.get("/", (req, res)=>{

  res.json({

    success:true,

    message:
      "Fosoler Doctor API Running",

    version:
      "1.0.0"

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



// Notifications
app.use(
  "/api/admin/notifications",
  adminNotificationRoutes
);



// Analytics
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



// Admin Login History
app.use(
  "/api/admin/login-history",
  adminLoginHistoryRoutes
);



// Security Dashboard
app.use(
  "/api/admin/security",
  securityDashboardRoutes
);





// ================================
// 404 Handler
// ================================

app.use((req,res)=>{

  res.status(404).json({

    success:false,

    message:
      "API Route Not Found"

  });

});




// ================================
// Error Handler
// ================================

app.use((err,req,res,next)=>{


  console.error(err);


  res.status(
    err.status || 500
  )
  .json({

    success:false,

    message:
      err.message ||
      "Server Error"

  });


});




// ================================
// Server Start
// ================================

const PORT =
  process.env.PORT || 5000;


app.listen(PORT, ()=>{


  console.log(
    "🌾 Fosoler Doctor Backend"
  );


  console.log(
    `🚀 Server Running on Port ${PORT}`
  );


});
