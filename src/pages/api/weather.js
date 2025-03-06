import axios from "axios";

export default async function handler(req, res) {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await axios.get(apiUrl);

    const weatherData = {
      temp: Math.round(response.data.main.temp),
      maxTemp: Math.round(response.data.main.temp_max),
      minTemp: Math.round(response.data.main.temp_min),
      condition: response.data.weather[0].main,
      windSpeed: (response.data.wind.speed * 3.6).toFixed(1),
      visibility: (response.data.visibility / 1000).toFixed(1),
      icon: response.data.weather[0].icon,
    };

    res.status(200).json(weatherData);
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
