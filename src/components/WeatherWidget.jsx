import { useState, useEffect } from "react";
import axios from "axios";

export default function WeatherWidget() {
  const [weather, setWeather] = useState({
    temp: 0,
    condition: "Clear",
    icon: "01d",
  });
  const [city, setCity] = useState("New York");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await axios.get(url);
        setWeather({
          temp: Math.round(response.data.main.temp),
          condition: response.data.weather[0].main,
          icon: response.data.weather[0].icon,
        });
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="p-4 bg-blue-500 text-white text-center rounded-md">
      <h2 className="text-lg font-bold">Weather in {city}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.condition}
        className="w-12 h-12 mx-auto"
      />
      <p>
        {weather.temp}°C - {weather.condition}
      </p>
      <select
        onChange={(e) => setCity(e.target.value)}
        className="mt-2 p-1 text-black"
      >
        <option value="New York">New York</option>
        <option value="Los Angeles">Los Angeles</option>
        <option value="London">London</option>
        <option value="Tokyo">Tokyo</option>
      </select>
    </div>
  );
}
