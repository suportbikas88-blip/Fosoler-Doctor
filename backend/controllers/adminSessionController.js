const AdminSession = require("../models/AdminSession");


// ======================================
// Create Admin Session
// ======================================
exports.createSession = async (req, res) => {

    try {

        const session = await AdminSession.create({

            admin: req.admin._id,

            tokenId:
                req.body.tokenId || "manual",

            ipAddress:
                req.ip,

            userAgent:
                req.headers["user-agent"],

            device:
                req.headers["user-agent"],

        });


        res.status(201).json({

            success:true,

            message:
                "Admin session created successfully",

            session

        });


    } catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};





// ======================================
// Get All Sessions
// ======================================
exports.getSessions = async (req,res)=>{

    try{


        const sessions =
            await AdminSession.find()
            .populate(
                "admin",
                "name email role"
            )
            .sort({
                createdAt:-1
            });



        res.json({

            success:true,

            count:sessions.length,

            sessions

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};





// ======================================
// Logout Session
// ======================================
exports.logoutSession = async(req,res)=>{

    try{


        const session =
            await AdminSession.findById(
                req.params.id
            );


        if(!session){

            return res.status(404).json({

                success:false,

                message:
                "Session not found"

            });

        }



        session.status="logout";

        session.logoutTime=new Date();


        await session.save();



        res.json({

            success:true,

            message:
            "Admin logged out successfully",

            session

        });



    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};
