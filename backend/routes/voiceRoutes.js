const express = require("express");

const router = express.Router();

const {
    processVoice,
    textToSpeech
} = require("../controllers/voiceController");


const uploadVoice = require("../middleware/uploadVoice");


// Voice To Text + AI Response

router.post(
    "/",
    uploadVoice.single("voice"),
    processVoice
);


// Text To Speech

router.post(
    "/tts",
    textToSpeech
);


module.exports = router;
