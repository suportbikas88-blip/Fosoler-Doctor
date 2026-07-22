const { getWeatherByDistrict } = require("../services/weatherService");

exports.getWeather = async (req, res) => {
  try {
    const { district } = req.query;

    if (!district) {
      return res.status(400).json({
        success: false,
        message: "District is required",
      });
    }

    const weather = await getWeatherByDistrict(district);

    return res.status(200).json(weather);
  } catch (error) {
    console.error("Weather Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch weather",
      error: error.message,
    });
  }
};
