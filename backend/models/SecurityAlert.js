const mongoose = require("mongoose");


const securityAlertSchema = new mongoose.Schema(
{

    admin: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

    },


    title: {

        type: String,

        required: true,

        trim: true,

    },


    message: {

        type: String,

        required: true,

        trim: true,

    },


    type: {

        type: String,

        enum: [

            "login",

            "failed_login",

            "suspicious",

            "system",

            "other"

        ],

        default: "system",

    },


    severity: {

        type: String,

        enum: [

            "low",

            "medium",

            "high",

            "critical"

        ],

        default: "medium",

    },


    status: {

        type: String,

        enum: [

            "unread",

            "read",

            "resolved"

        ],

        default: "unread",

    },


    ipAddress: {

        type: String,

        default:"",

    },


    userAgent: {

        type:String,

        default:"",

    },


},

{

    timestamps:true,

}

);



module.exports =
mongoose.model(
    "SecurityAlert",
    securityAlertSchema
);
