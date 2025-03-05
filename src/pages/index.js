import { useState, useEffect, useMemo } from "react";
import HouseControls from "@/components/HouseControls";
import CityCanvas from "@/components/CityCanvas";

export default function Home() {
  const [houses, setHouses] = useState([]);
  const [isMobileControlsOpen, setIsMobileControlsOpen] = useState(false); // Toggle state for mobile

  useEffect(() => {
    const savedHouses = localStorage.getItem("houses");
    if (savedHouses) {
      setHouses(JSON.parse(savedHouses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("houses", JSON.stringify(houses));
  }, [houses]);

  const memoizedHouses = useMemo(() => houses, [houses]);

  return (
    <div className="flex h-screen gap-2 p-1 bg-gray-500">
      <div
        className={`bg-gray-100 p-4 max-h-screen overflow-auto rounded-lg shadow-lg transition-transform duration-300
        sm:relative sm:w-1/2 lg:w-1/4 sm:block 
        fixed inset-y-0 left-0 w-3/4 max-w-xs z-50 
        ${
          isMobileControlsOpen
            ? "translate-x-0 overflow-visible"
            : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <HouseControls houses={memoizedHouses} setHouses={setHouses} />

        <button
          onClick={() => setIsMobileControlsOpen(false)}
          className="absolute top-3 -right-7 pl-8 -z-1 bg-gray-100 text-red p-3 rounded-full sm:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-gray-900"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>

      <button
        onClick={() => setIsMobileControlsOpen((prev) => !prev)}
        className="fixed top-4 -left-5 pl-8 sm:hidden bg-green-600 text-white p-4 rounded-full shadow-lg"
      >
        {!isMobileControlsOpen && (
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        )}
      </button>

      <CityCanvas houses={memoizedHouses} />
    </div>
  );
}
