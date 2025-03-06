import { useState, useEffect, useMemo } from "react";
import HouseControls from "@/components/HouseControls";
import CityCanvas from "@/components/CityCanvas";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [houses, setHouses] = useState([]);
  const [isMobileControlsOpen, setIsMobileControlsOpen] = useState(false);

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
    <div className="bg-gray-200 p-1 min-h-screen flex flex-col">
      <Header setIsMobileControlsOpen={setIsMobileControlsOpen} />
      <div className="flex h-screen gap-2 p-1">
        <div
          className={`bg-gray-100 p-3 overflow-auto rounded-lg shadow-xl transition-transform duration-300
            sm:relative sm:w-1/2 lg:w-1/4 sm:block 
            fixed inset-y-0 left-0 w-4/4 max-w-xs z-50 
            ${
              isMobileControlsOpen
                ? "translate-x-0"
                : "-translate-x-full sm:translate-x-0"
            }`}
          style={{ maxHeight: "100%" }}
        >
          <HouseControls
            houses={memoizedHouses}
            setHouses={setHouses}
            setIsMobileControlsOpen={setIsMobileControlsOpen}
          />
        </div>

        <CityCanvas houses={memoizedHouses} />
      </div>
      <Footer />
    </div>
  );
}
