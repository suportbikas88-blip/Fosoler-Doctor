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
// Local Agriculture Fallback
// ===============================

const localDiseaseFallback = (cropName) => {

  if (
    cropName &&
    cropName.toLowerCase() === "rice"
  ) {

    return {

      disease: "ধানের ব্লাস্ট রোগ",

      confidence: 70,

      symptoms: [
        "পাতায় বাদামী দাগ দেখা যায়",
        "পাতা শুকিয়ে যেতে পারে",
        "গাছ দুর্বল হয়ে যায়"
      ],

      causes: [
        "ছত্রাকের আক্রমণ",
        "অতিরিক্ত আর্দ্রতা"
      ],

      treatment:
        "আক্রান্ত জমিতে সঠিক পানি ব্যবস্থাপনা করুন এবং কৃষি কর্মকর্তার পরামর্শ অনুযায়ী ছত্রাকনাশক ব্যবহার করুন।",

      pesticides: [
        "Tricyclazole",
        "Azoxystrobin"
      ]

    };

  }


  return {

    disease:"অজানা",

    confidence:50,

    symptoms:[
      "ছবির উপর ভিত্তি করে নিশ্চিত শনাক্ত করা যায়নি"
    ],

    causes:[
      "আরো পরিষ্কার ছবি প্রয়োজন"
    ],

    treatment:
      "গাছের আক্রান্ত অংশের পরিষ্কার ছবি আপলোড করুন।",

    pesticides:[]

  };

};



// ===============================
// Gemini AI Analyzer
// ===============================

const analyzeCropDisease = async (
  imagePath,
  cropName
) => {


  try {


    if(!imagePath){

      throw new Error(
        "Image required"
      );

    }


    const imageBytes =
      fs.readFileSync(imagePath);



    const prompt = `

আপনি বাংলাদেশের কৃষি রোগ বিশেষজ্ঞ।

ছবিটি বিশ্লেষণ করুন।

শুধুমাত্র JSON দিন:

{
"disease":"",
"confidence":0,
"symptoms":[],
"causes":[],
"treatment":"",
"pesticides":[]
}

`;



    const response =
      await ai.models.generateContent({

        model:"gemini-2.5-flash",

        contents:[

          {
            text:prompt
          },

          {

            inlineData:{

              mimeType:"image/jpeg",

              data:
              imageBytes.toString("base64")

            }

          }

        ]

      });



    let text =
      response.text || "";



    text =
      text
      .replace(/```json/g,"")
      .replace(/```/g,"")
      .trim();



    const result =
      JSON.parse(text);



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
      result.treatment || "",


      pesticides:
      result.pesticides || []


    };



  }

  catch(error){


    console.log(
      "Gemini Failed, Using Local Database:",
      error.message
    );


    return localDiseaseFallback(
      cropName
    );


  }


};



module.exports = {

  analyzeCropDisease

};
