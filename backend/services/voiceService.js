const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");


// Gemini Setup

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);



exports.processVoice = async (filePath) => {

    try {


        if (!fs.existsSync(filePath)) {

            throw new Error(
                "Voice file not found"
            );

        }



        // Read voice file

        const audioBuffer =
            fs.readFileSync(filePath);



        const audioBase64 =
            audioBuffer.toString("base64");



        try {


            // Gemini AI Try

            const model =
                genAI.getGenerativeModel({

                    model:"gemini-2.0-flash-lite"

                });



            const result =
                await model.generateContent([

                    {

                        inlineData:{

                            data:audioBase64,

                            mimeType:"audio/mp3"

                        }

                    },


                    `
                    You are Fosoler Doctor AI.
                    Listen to farmer voice.
                    Give simple Bangla farming advice.
                    `

                ]);



            return {

                source:"Gemini AI",

                reply:
                result.response.text()

            };



        } catch(geminiError){


            console.log(
                "Gemini unavailable, using fallback AI"
            );


            // AI Fallback Response

            return {

                source:"Fosoler Doctor AI Fallback",

                reply:
                "আপনার ফসলের সমস্যা বুঝতে পাতার ছবি ও ফসলের নাম দিন। " +
                "পাতায় দাগ, হলুদ হওয়া বা পোকা থাকলে ছবি পাঠান। " +
                "সঠিক রোগ শনাক্ত করে কৃষি পরামর্শ দেওয়া হবে।"

            };

        }



    } catch(error){


        console.log(
            "Voice Service Error:",
            error.message
        );


        throw error;

    }

};





exports.textToSpeech = async(text)=>{


    return {

        text:text,

        message:
        "Text to Speech service ready"

    };

};
