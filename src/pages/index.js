import { useState, useEffect, useMemo } from "react";
import HouseControls from "@/components/HouseControls";
import CityCanvas from "@/components/CityCanvas";

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

  const memoizedHouses = useMemo(() => houses, [houses]);

  return (
    <div className="flex h-screen">
      <HouseControls houses={memoizedHouses} setHouses={setHouses} />
      <CityCanvas houses={memoizedHouses} />
    </div>
  );
}
