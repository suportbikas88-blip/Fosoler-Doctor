const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({

    destination: function(req, file, cb){

        cb(null, "uploads/");

    },


    filename: function(req, file, cb){

        cb(
            null,
            "voice-" +
            Date.now() +
            path.extname(file.originalname)
        );

    }

});



const fileFilter = (req, file, cb)=>{


    console.log(
        "Uploaded File:",
        file.mimetype,
        file.originalname
    );


    const allowedExtensions = [
        ".mp3",
        ".wav",
        ".aac",
        ".m4a",
        ".webm"
    ];


    const ext =
        path.extname(file.originalname)
        .toLowerCase();



    if(allowedExtensions.includes(ext)){

        cb(null, true);

    }else{

        cb(
            new Error(
                "Only audio files allowed"
            ),
            false
        );

    }

};



const uploadVoice = multer({

    storage: storage,

    fileFilter: fileFilter,

    limits:{
        fileSize: 10 * 1024 * 1024
    }

});


module.exports = uploadVoice;
