const fs = require("fs");
const { GoogleGenAI } = require("@google/genai");

console.log(
  "Gemini Key Loaded:",
  process.env.GEMINI_API_KEY ? "YES" : "NO"
);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


// ===============================
// Gemini AI Crop Disease Analyzer
// ===============================

const analyzeCropDisease = async (imagePath) => {

  try {

    if (!imagePath) {
      throw new Error("Image is required");
    }


    const imageBytes = fs.readFileSync(imagePath);


    const prompt = `
আপনি বাংলাদেশের একজন কৃষি রোগ বিশেষজ্ঞ।

এই গাছের ছবিটি বিশ্লেষণ করুন।

শুধুমাত্র Valid JSON Return করবেন।

Format:

{
"disease":"রোগের নাম",
"confidence":90,
"symptoms":[
"লক্ষণ"
],
"causes":[
"কারণ"
],
"treatment":"সমাধান",
"pesticides":[
"ঔষধের নাম"
]
}

যদি রোগ শনাক্ত করা না যায়:

{
"disease":"অজানা",
"confidence":0,
"symptoms":[],
"causes":[],
"treatment":"পরিষ্কার ছবি দিন",
"pesticides":[]
}

কোনো Markdown ব্যবহার করবেন না।
`;


    let response;


    try {

      response = await ai.models.generateContent({

        model: "gemini-1.5-flash",

        contents: [

          {
            text: prompt
          },

          {
            inlineData: {

              mimeType:"image/jpeg",

              data:imageBytes.toString("base64")

            }
          }

        ]

      });


    } catch(error){


      console.log(
        "Gemini Primary Error:",
        error.message
      );


      // Backup Model

      response = await ai.models.generateContent({

        model:"gemini-2.0-flash",

        contents:[

          {
            text:prompt
          },

          {
            inlineData:{
              mimeType:"image/jpeg",
              data:imageBytes.toString("base64")
            }
          }

        ]

      });


    }



    let text = response.text || "";


    text = text
      .replace(/```json/g,"")
      .replace(/```/g,"")
      .trim();



    const result = JSON.parse(text);



    return {

      disease:
      result.disease || "অজানা",

      confidence:
      result.confidence || 0,


      symptoms:
      result.symptoms || [],


      causes:
      result.causes || [],


      treatment:
      result.treatment || "সমাধান পাওয়া যায়নি",


      pesticides:
      result.pesticides || []

    };


  }

  catch(error){


    console.error(
      "Gemini AI Final Error:",
      error.message
    );


    return {

      disease:"অজানা",

      confidence:0,

      symptoms:[],

      causes:[],

      treatment:"AI বিশ্লেষণ ব্যর্থ হয়েছে",

      pesticides:[]

    };


  }

};



module.exports = {

  analyzeCropDisease

};
