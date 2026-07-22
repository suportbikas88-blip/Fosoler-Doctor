const SecurityDashboard = require("../models/SecurityDashboard");
const AdminLoginHistory = require("../models/AdminLoginHistory");


// ======================================
// Get Security Dashboard
// ======================================
exports.getSecurityDashboard = async (req, res) => {

  try {

    const totalLogins =
      await AdminLoginHistory.countDocuments();


    const successfulLogins =
      await AdminLoginHistory.countDocuments({
        status: "success"
      });


    const failedLogins =
      await AdminLoginHistory.countDocuments({
        status: "failed"
      });


    const lastLogin =
      await AdminLoginHistory.findOne()
      .sort({
        createdAt: -1
      });


    const securityData = {

      totalLogins,

      successfulLogins,

      failedLogins,

      blockedAttempts: failedLogins,

      lastLogin:
        lastLogin
          ? lastLogin.loginTime
          : null,


      lastActivity:
        lastLogin
          ? lastLogin.createdAt
          : null,


      lastLoginIP:
        lastLogin
          ? lastLogin.ipAddress
          : "",


      securityStatus:

        failedLogins > 5
          ? "warning"
          : "secure"

    };



    res.status(200).json({

      success:true,

      security: securityData

    });



  } catch(error) {


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};





// ======================================
// Reset Security Statistics
// ======================================
exports.resetSecurityDashboard = async (req,res)=>{

  try {


    const dashboard =
      await SecurityDashboard.create({

        totalLogins:0,

        successfulLogins:0,

        failedLogins:0,

        blockedAttempts:0,

        securityStatus:"secure"

      });



    res.status(201).json({

      success:true,

      message:
        "Security dashboard reset successfully",

      dashboard

    });



  } catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};
