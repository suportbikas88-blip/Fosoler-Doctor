const jwt = require("jsonwebtoken");
const User = require("../models/User");


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



        const admin = await User.findById(
            decoded.id
        ).select("-password");



        if(!admin || admin.role !== "admin"){

            return res.status(401).json({

                success:false,
                message:"Admin not found"

            });

        }



        if(admin.isActive === false){

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
