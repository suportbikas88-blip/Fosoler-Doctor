const getWeatherByDistrict = async (district) => {
  try {
    // Demo Weather Data (Later replace with Live Weather API)

    return {
      success: true,
      data: {
        district,
        temperature: 29,
        humidity: 82,
        windSpeed: 14,
        condition: "Partly Cloudy",
        rainChance: 65,
        advice:
          "বৃষ্টির সম্ভাবনা রয়েছে। সার বা কীটনাশক স্প্রে করার আগে আবহাওয়া আবার পরীক্ষা করুন।",
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getWeatherByDistrict,
};
