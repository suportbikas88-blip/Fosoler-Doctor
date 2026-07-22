const voiceService = require("../services/voiceService");


// @desc    Process Voice AI Request
// @route   POST /api/voice
// @access  Private

exports.processVoice = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Voice file required"
            });
        }


        const result = await voiceService.processVoice(
            req.file.path
        );


        res.status(200).json({

            success: true,

            message: "Voice processed successfully",

            data: result

        });


    } catch (error) {

        console.error(
            "Voice Controller Error:",
            error.message
        );


        res.status(500).json({

            success: false,

            message: "Voice processing failed",

            error: error.message

        });

    }
};



// Text To Speech Controller

exports.textToSpeech = async (req, res) => {

    try {

        const { text } = req.body;


        if (!text) {

            return res.status(400).json({

                success:false,

                message:"Text required"

            });

        }


        const audio =
            await voiceService.textToSpeech(text);



        res.status(200).json({

            success:true,

            message:"Speech generated",

            audio

        });



    } catch(error){


        res.status(500).json({

            success:false,

            message:"Text to speech failed",

            error:error.message

        });

    }

};
