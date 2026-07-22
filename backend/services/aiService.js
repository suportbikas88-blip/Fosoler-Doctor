const fs = require("fs");
const { GoogleGenAI } = require("@google/genai");

// Debug
console.log(
  "Gemini Key Loaded:",
  process.env.GEMINI_API_KEY ? "YES" : "NO"
);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeCropDisease = async (imagePath) => {
  try {
    if (!imagePath) {
      throw new Error("Image is required.");
    }

    const imageBytes = fs.readFileSync(imagePath);

    const prompt = `
আপনি বাংলাদেশের একজন অভিজ্ঞ কৃষি রোগ বিশেষজ্ঞ (Plant Pathologist)।

ব্যবহারকারী যে ফসলের ছবি আপলোড করেছে সেটি বিশ্লেষণ করুন।

যদি ছবিতে কোনো ফসল বা গাছ না থাকে, তাহলে লিখুন:

{
  "disease":"ফসল শনাক্ত করা যায়নি",
  "confidence":0,
  "symptoms":[
    "ছবিতে কোনো ফসল বা গাছ দেখা যায়নি।"
  ],
  "causes":[
    "ভুল ছবি আপলোড করা হয়েছে।"
  ],
  "treatment":"অনুগ্রহ করে আক্রান্ত গাছের পরিষ্কার ছবি আপলোড করুন।",
  "pesticides":[]
}

যদি ফসল শনাক্ত হয়, তাহলে শুধুমাত্র নিচের JSON Format-এ উত্তর দিন:

{
  "disease":"রোগের বাংলা নাম",
  "confidence":95,
  "symptoms":[
    "লক্ষণ ১",
    "লক্ষণ ২",
    "লক্ষণ ৩"
  ],
  "causes":[
    "কারণ ১",
    "কারণ ২"
  ],
  "treatment":"বাংলাদেশের কৃষকদের উপযোগী বিস্তারিত সমাধান লিখুন।",
  "pesticides":[
    "প্রস্তাবিত কীটনাশক ১",
    "প্রস্তাবিত কীটনাশক ২"
  ]
}

শুধুমাত্র Valid JSON Return করবেন।
কোনো Markdown, ব্যাখ্যা বা অতিরিক্ত লেখা লিখবেন না।
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          text: prompt,
        },
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageBytes.toString("base64"),
          },
        },
      ],
    });

    let text = response.text || "";

    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");
    text = text.trim();

    const result = JSON.parse(text);

    return {
      disease: result.disease || "অজানা রোগ",
      confidence: result.confidence || 0,
      symptoms: result.symptoms || [],
      causes: result.causes || [],
      treatment: result.treatment || "কোনো সমাধান পাওয়া যায়নি",
      pesticides: result.pesticides || [],
    };
  } catch (error) {
    console.error("Gemini AI Error:", error);

    return {
      disease: "অজানা",
      confidence: 0,
      symptoms: [],
      causes: [],
      treatment: "AI বিশ্লেষণ ব্যর্থ হয়েছে",
      pesticides: [],
    };
  }
};

module.exports = {
  analyzeCropDisease,
};
