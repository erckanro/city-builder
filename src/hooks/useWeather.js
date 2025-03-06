import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useWeather() {
  const [city, setCity] = useState("New York");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    temp: 0,
    maxTemp: 0,
    minTemp: 0,
    condition: "Clear",
    windSpeed: 0,
    visibility: 0,
    icon: "01d",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCity = localStorage.getItem("selectedCity");
      if (savedCity) {
        setCity(savedCity);
      }
    }
  }, []);

  const fetchWeather = useCallback(async () => {
    if (!city) return;

    setLoading(true);
    try {
      const response = await axios.get(`/api/weather?city=${city}`);
      setWeather(response.data);

      if (typeof window !== "undefined") {
        localStorage.setItem("selectedCity", city);
      }
    } catch (error) {
      console.error("Failed to fetch weather:", error);
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    if (city) fetchWeather();
  }, [fetchWeather]);

  return { city, setCity, weather, loading };
}
