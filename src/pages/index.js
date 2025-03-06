import { useState, useEffect, useMemo } from "react";
import HouseControls from "@/components/HouseControls";
import CityCanvas from "@/components/CityCanvas";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Home() {
  const [houses, setHouses] = useLocalStorage("houses", []);
  const [isMobileControlsOpen, setIsMobileControlsOpen] = useState(false);
  const [houseToDelete, setHouseToDelete] = useState(null);

  const memoizedHouses = useMemo(() => houses, [houses]);

  const removeHouse = () => {
    if (houseToDelete) {
      setHouses((prev) =>
        prev.filter((house) => house.id !== houseToDelete.id)
      );
      setHouseToDelete(null);
    }
  };

  return (
    <div className="bg-gray-200 p-1 min-h-screen flex flex-col">
      <Header setIsMobileControlsOpen={setIsMobileControlsOpen} />
      <div className="flex h-screen gap-2 p-1">
        <div
          className={`bg-gray-100 p-3 overflow-auto rounded-lg shadow-xl transition-transform duration-300
            sm:relative sm:w-1/2 lg:w-1/4 sm:block 
            fixed inset-y-0 left-0 w-4/4 max-w-xs z-50 max-h-full
            ${
              isMobileControlsOpen
                ? "translate-x-0"
                : "-translate-x-full sm:translate-x-0"
            }`}
        >
          <HouseControls
            houses={memoizedHouses}
            setHouses={setHouses}
            setIsMobileControlsOpen={setIsMobileControlsOpen}
            setHouseToDelete={setHouseToDelete}
          />
        </div>

        <CityCanvas houses={memoizedHouses} />
      </div>
      <Footer />

      <Modal
        isOpen={!!houseToDelete}
        onClose={() => setHouseToDelete(null)}
        onConfirm={removeHouse}
        house={houseToDelete}
      />
    </div>
  );
}
