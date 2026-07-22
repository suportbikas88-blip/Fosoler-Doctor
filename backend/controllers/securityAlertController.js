const SecurityAlert = require("../models/SecurityAlert");


// ======================================
// Create Security Alert
// ======================================

exports.createAlert = async (req, res) => {

    try {


        const alert =
            await SecurityAlert.create({

                admin:
                    req.admin._id,

                title:
                    req.body.title,

                message:
                    req.body.message,

                type:
                    req.body.type || "system",

                severity:
                    req.body.severity || "medium",

                status:
                    req.body.status || "unread",

                ipAddress:
                    req.ip,

                userAgent:
                    req.headers["user-agent"]

            });



        res.status(201).json({

            success:true,

            message:
            "Security alert created successfully",

            alert

        });



    } catch(error){


        res.status(500).json({

            success:false,

            message:
            error.message

        });


    }

};





// ======================================
// Get All Security Alerts
// ======================================

exports.getAlerts = async(req,res)=>{

    try{


        const alerts =
            await SecurityAlert.find()
            .populate(
                "admin",
                "name email role"
            )
            .sort({
                createdAt:-1
            });



        res.json({

            success:true,

            count:
            alerts.length,

            alerts

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:
            error.message

        });


    }

};





// ======================================
// Get Single Alert
// ======================================

exports.getAlertById = async(req,res)=>{

    try{


        const alert =
            await SecurityAlert.findById(
                req.params.id
            )
            .populate(
                "admin",
                "name email role"
            );



        if(!alert){

            return res.status(404).json({

                success:false,

                message:
                "Security alert not found"

            });

        }



        res.json({

            success:true,

            alert

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:
            error.message

        });


    }

};





// ======================================
// Mark Alert Resolved
// ======================================

exports.resolveAlert = async(req,res)=>{

    try{


        const alert =
            await SecurityAlert.findById(
                req.params.id
            );


        if(!alert){

            return res.status(404).json({

                success:false,

                message:
                "Security alert not found"

            });

        }



        alert.status =
            "resolved";


        await alert.save();



        res.json({

            success:true,

            message:
            "Security alert resolved successfully",

            alert

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:
            error.message

        });


    }

};
