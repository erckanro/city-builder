import { useState } from "react";
import HouseControls from "@/components/HouseControls";
import CityCanvas from "@/components/CityCanvas";
import { useEffect } from "react";

export default function Home() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const savedHouses = localStorage.getItem("houses");
    if (savedHouses) {
      setHouses(JSON.parse(savedHouses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("houses", JSON.stringify(houses));
  }, [houses]);

  return (
    <div className="flex h-screen">
      <HouseControls houses={houses} setHouses={setHouses} />
      <CityCanvas houses={houses} />
    </div>
  );
}
