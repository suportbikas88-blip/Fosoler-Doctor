const CropDisease = require("../models/CropDisease");

const {
  analyzeCropDisease,
} = require("../services/aiService");


// ===============================
// Create Disease Record
// ===============================

const createDiseaseRecord = async (req, res) => {

  try {


    if (!req.file) {

      return res.status(400).json({

        success:false,

        message:"Crop image is required"

      });

    }


    const cropName =
      req.body.cropName;



    if (!cropName) {

      return res.status(400).json({

        success:false,

        message:"Crop name is required"

      });

    }



    // AI Analysis

    const aiResult =
      await analyzeCropDisease(

        req.file.path,

        cropName

      );




    const diseaseRecord =
      await CropDisease.create({

        cropName,


        diseaseName:
          aiResult.disease,


        symptoms:
          aiResult.symptoms || [],


        causes:
          aiResult.causes || [],


        solutions:
          aiResult.treatment
            ? [aiResult.treatment]
            : [],


        pesticides:
          aiResult.pesticides || [],


        imageUrl:
          `/uploads/${req.file.filename}`,


        aiConfidence:
          aiResult.confidence || 0,


        detectedBy:
          req.user._id

      });





    res.status(201).json({

      success:true,

      message:
        "Disease record created successfully",

      data:diseaseRecord

    });



  }

  catch(error){


    console.log(
      "Create Disease Error:",
      error
    );


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};





// ===============================
// Get My Diseases
// ===============================

const getMyDiseases = async (
  req,
  res
) => {


  try {


    const diseases =
      await CropDisease.find({

        detectedBy:req.user._id

      })
      .sort({

        createdAt:-1

      });



    res.status(200).json({

      success:true,

      count:diseases.length,

      data:diseases

    });



  }

  catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }


};





// ===============================
// Get Disease By ID
// ===============================

const getDiseaseById = async (
  req,
  res
)=>{


  try {


    const disease =
      await CropDisease.findById(
        req.params.id
      );



    if(!disease){


      return res.status(404).json({

        success:false,

        message:
        "Disease record not found"

      });


    }



    res.status(200).json({

      success:true,

      data:disease

    });



  }

  catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }


};





// ===============================
// Delete Disease
// ===============================

const deleteDisease = async (
  req,
  res
)=>{


  try {


    const disease =
      await CropDisease.findById(
        req.params.id
      );



    if(!disease){


      return res.status(404).json({

        success:false,

        message:
        "Disease record not found"

      });


    }



    await disease.deleteOne();



    res.status(200).json({

      success:true,

      message:
      "Disease deleted successfully"

    });



  }

  catch(error){


    res.status(500).json({

      success:false,

      message:error.message

    });


  }


};





module.exports = {

  createDiseaseRecord,

  getMyDiseases,

  getDiseaseById,

  deleteDisease

};
