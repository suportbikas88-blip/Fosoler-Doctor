const mongoose = require("mongoose");


const securityAuditSchema = new mongoose.Schema(

{

    admin: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

    },


    event: {

        type: String,

        required: true,

        trim: true,

    },


    module: {

        type: String,

        default: "security",

        trim: true,

    },


    description: {

        type: String,

        default: "",

        trim: true,

    },


    ipAddress: {

        type: String,

        default: "",

    },


    userAgent: {

        type: String,

        default: "",

    },


    status: {

        type: String,

        enum: [

            "success",

            "failed",

            "warning"

        ],

        default: "success",

    },


},

{

    timestamps:true,

}

);



module.exports =
mongoose.model(
    "SecurityAudit",
    securityAuditSchema
);
