const mongoose = require("mongoose");


const adminSessionSchema = new mongoose.Schema(
{
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },


    tokenId: {
        type: String,
        required: true,
    },


    ipAddress: {
        type: String,
        default: "",
    },


    userAgent: {
        type: String,
        default: "",
    },


    device: {
        type: String,
        default: "",
    },


    status: {
        type: String,
        enum:[
            "active",
            "expired",
            "logout"
        ],
        default:"active",
    },


    loginTime:{
        type:Date,
        default:Date.now,
    },


    logoutTime:{
        type:Date,
        default:null,
    },


},
{
    timestamps:true,
});


module.exports =
mongoose.model(
    "AdminSession",
    adminSessionSchema
);
