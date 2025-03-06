import { useWeather } from "@/hooks/useWeather";

export default function WeatherWidget() {
  const { city, setCity, weather, loading } = useWeather();

  const getBackgroundClass = () => {
    switch (weather.condition) {
      case "Clear":
        return "bg-gradient-to-b from-blue-300 to-orange-300";
      case "Clouds":
        return "bg-gradient-to-b from-gray-400 to-gray-600";
      case "Rain":
        return "bg-gradient-to-b from-sky-800 to-blue-300";
      case "Thunderstorm":
        return "bg-gradient-to-b from-gray-700 to-black";
      case "Snow":
        return "bg-gradient-to-b from-blue-300 to-gray-300";
      default:
        return "bg-gradient-to-b from-gray-500 to-gray-700";
    }
  };

  return (
    <div
      className={`p-4 text-white text-center rounded-lg shadow-lg ${getBackgroundClass()}`}
    >
      <div className="flex justify-between">
        <div className="flex flex-col items-start gap-2">
          <h1 className=" flex items-center">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="appearance-none bg-transparent text-xl border-none text-white py-1 pr-1 focus:outline-none"
            >
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="London">London</option>
              <option value="Tokyo">Tokyo</option>
              <option value="Manila">Manila</option>
              <option value="Ho Chi Minh">Ho Chi Minh</option>
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </h1>
          <div className="text-4xl font-bold">
            {loading ? "Loading..." : `${weather.temp}°C`}
          </div>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-3 text-red-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
            {loading ? "Loading..." : `${weather.minTemp}°C -`}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-3 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
            {loading ? "Loading..." : `${weather.maxTemp}°C`}
          </div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div>Wind: {weather.windSpeed} km/h</div>
          <div className="flex gap-2 items-center">
            <div>{weather.condition}</div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.condition}
              className="w-16 h-16 ml-auto"
            />
          </div>
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            {weather.visibility} km
          </div>
        </div>
      </div>
    </div>
  );
}
