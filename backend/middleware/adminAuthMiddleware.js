const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");


const adminAuthMiddleware = async (req,res,next)=>{

    try{


        const token = 
        req.headers.authorization &&
        req.headers.authorization.split(" ")[1];


        if(!token){

            return res.status(401).json({

                success:false,
                message:"No token provided"

            });

        }



        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );



        const admin = await Admin.findById(
            decoded.id
        ).select("-password");



        if(!admin){

            return res.status(401).json({

                success:false,
                message:"Admin not found"

            });

        }



        if(admin.status === "blocked"){

            return res.status(403).json({

                success:false,
                message:"Admin blocked"

            });

        }



        req.admin = admin;


        next();



    }catch(error){


        return res.status(401).json({

            success:false,
            message:"Invalid token"

        });


    }

};


module.exports = adminAuthMiddleware;
