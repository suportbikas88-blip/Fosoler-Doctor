const AdminLoginHistory = require("../models/AdminLoginHistory");


// ======================================
// Create Login History
// ======================================
exports.createLoginHistory = async (req, res) => {

  try {

    const {
      admin,
      status,
      failureReason
    } = req.body;


    const history =
      await AdminLoginHistory.create({

        admin,

        status,

        failureReason:

          failureReason || "",

        ipAddress:

          req.ip || "",

        userAgent:

          req.headers["user-agent"] || "",

        device:

          req.headers["user-agent"] || "",

      });


    res.status(201).json({

      success: true,

      message:
        "Admin login history created successfully",

      history,

    });


  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }

};





// ======================================
// Get All Login History
// ======================================
exports.getLoginHistory = async (req, res) => {

  try {


    const history =

      await AdminLoginHistory.find()

      .populate(
        "admin",
        "name email role"
      )

      .sort({

        createdAt: -1

      });



    res.status(200).json({

      success: true,

      count: history.length,

      history,

    });



  } catch (error) {


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }

};





// ======================================
// Get Single Login History
// ======================================
exports.getLoginHistoryById = async (req,res)=>{

  try {


    const history =

      await AdminLoginHistory.findById(
        req.params.id
      )

      .populate(
        "admin",
        "name email role"
      );



    if(!history){

      return res.status(404).json({

        success:false,

        message:
          "Login history not found",

      });

    }



    res.status(200).json({

      success:true,

      history,

    });



  } catch(error){


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }

};





// ======================================
// Delete Login History
// ======================================
exports.deleteLoginHistory = async (req,res)=>{

  try {


    const history =

      await AdminLoginHistory.findByIdAndDelete(
        req.params.id
      );



    if(!history){

      return res.status(404).json({

        success:false,

        message:
          "Login history not found",

      });

    }



    res.status(200).json({

      success:true,

      message:
        "Login history deleted successfully",

    });



  } catch(error){


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }

};
