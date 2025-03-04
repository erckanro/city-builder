import { useState } from "react";
import HouseControls from "@/components/HouseControls";
import CityCanvas from "@/components/CityCanvas";

export default function Home() {
  const [houses, setHouses] = useState([
    { id: 1, name: "House 1", floors: 3, color: "orange" },
    { id: 2, name: "House 2", floors: 5, color: "red" },
  ]);

  return (
    <div className="flex h-screen">
      <HouseControls houses={houses} setHouses={setHouses} />
      <CityCanvas houses={houses} />
    </div>
  );
}
