require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");


// Routes

const authRoutes = require("./routes/authRoutes");
const farmerRoutes = require("./routes/farmerRoutes");
const cropDiseaseRoutes = require("./routes/cropDiseaseRoutes");
const voiceRoutes = require("./routes/voiceRoutes");


// App

const app = express();


// Middleware

app.use(
    helmet()
);

app.use(
    cors()
);

app.use(
    express.json()
);

app.use(
    express.urlencoded({
        extended:true
    })
);


// Static Upload Folder

app.use(
    "/uploads",
    express.static("uploads")
);


// Database Connection

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{

    console.log("MongoDB Connected Successfully");

})
.catch((error)=>{

    console.log(
        "MongoDB Connection Error:",
        error.message
    );

});



// API Routes

app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/farmer",
    farmerRoutes
);


app.use(
    "/api/crop-disease",
    cropDiseaseRoutes
);


// Voice AI Route

app.use(
    "/api/voice",
    voiceRoutes
);



// Home Test Route

app.get("/",(req,res)=>{

    res.json({

        success:true,

        message:"Fosoler Doctor API Running"

    });

});



// Server

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(
        `🚀 Server Running on Port ${PORT}`
    );

});
