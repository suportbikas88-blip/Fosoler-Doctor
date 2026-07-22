const SecurityAudit = require("../models/SecurityAudit");


// ======================================
// Create Security Audit
// ======================================

exports.createAudit = async (req, res) => {

    try {

        const audit = await SecurityAudit.create({

            admin: req.admin._id,

            event: req.body.event,

            module: req.body.module || "security",

            description:
                req.body.description || "",

            ipAddress:
                req.ip,

            userAgent:
                req.headers["user-agent"],

            status:
                req.body.status || "success"

        });


        res.status(201).json({

            success:true,

            message:
            "Security audit created successfully",

            audit

        });


    } catch(error) {

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};





// ======================================
// Get All Security Audits
// ======================================

exports.getAudits = async (req,res)=>{

    try{


        const audits =
            await SecurityAudit.find()
            .populate(
                "admin",
                "name email role"
            )
            .sort({
                createdAt:-1
            });



        res.json({

            success:true,

            count:audits.length,

            audits

        });


    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};





// ======================================
// Get Single Audit
// ======================================

exports.getAuditById = async(req,res)=>{

    try{


        const audit =
            await SecurityAudit.findById(
                req.params.id
            )
            .populate(
                "admin",
                "name email role"
            );


        if(!audit){

            return res.status(404).json({

                success:false,

                message:
                "Security audit not found"

            });

        }



        res.json({

            success:true,

            audit

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};
