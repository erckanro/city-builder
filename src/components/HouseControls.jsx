import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HouseControls({ houses, setHouses }) {
  const [newHouseId, setNewHouseId] = useState(houses.length + 1);

  const updateHouse = useCallback(
    (id, key, value) => {
      setHouses((prev) =>
        prev.map((house) =>
          house.id === id ? { ...house, [key]: value } : house
        )
      );
    },
    [setHouses]
  );

  const updateFloorColor = useCallback(
    (id, floorIndex, color) => {
      setHouses((prev) =>
        prev.map((house) =>
          house.id === id
            ? {
                ...house,
                floorColors: house.floorColors.map((c, i) =>
                  i === floorIndex ? color : c
                ),
              }
            : house
        )
      );
    },
    [setHouses]
  );

  const handleFloorChange = useCallback(
    (id, newFloors) => {
      setHouses((prev) =>
        prev.map((house) => {
          if (house.id !== id) return house;

          let updatedFloorColors = [...house.floorColors];

          if (newFloors > house.floors) {
            while (updatedFloorColors.length < newFloors) {
              updatedFloorColors.unshift("#808080");
            }
          } else {
            updatedFloorColors = updatedFloorColors.slice(
              updatedFloorColors.length - newFloors
            );
          }

          return {
            ...house,
            floors: newFloors,
            floorColors: updatedFloorColors,
          };
        })
      );
    },
    [setHouses]
  );

  const addHouse = useCallback(() => {
    setHouses((prev) => [
      ...prev,
      {
        id: newHouseId,
        name: `House ${newHouseId}`,
        floors: 3,
        floorColors: ["#808080", "#808080", "#808080"],
      },
    ]);
    setNewHouseId((prev) => prev + 1);
  }, [setHouses, newHouseId]);

  const duplicateHouse = useCallback(
    (id) => {
      setHouses((prev) => {
        const houseToCopy = prev.find((house) => house.id === id);
        if (!houseToCopy) return prev;
        return [
          ...prev,
          { ...houseToCopy, id: newHouseId, name: `House ${newHouseId}` },
        ];
      });
      setNewHouseId((prev) => prev + 1);
    },
    [setHouses, newHouseId]
  );

  const removeHouse = useCallback(
    (id) => {
      setHouses((prev) => prev.filter((house) => house.id !== id));
    },
    [setHouses]
  );

  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 bg-gray-100 p-4 max-h-screen overflow-auto rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-black">House List</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={addHouse}
          className="bg-green-600 text-white p-2 rounded-lg"
        >
          + Add House
        </motion.button>
      </div>

      <AnimatePresence>
        {houses.map((house) => (
          <motion.div
            key={house.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 border rounded-md my-2 bg-white text-gray-600 shadow-md"
          >
            <label className="text-sm text-black">Name:</label>
            <input
              type="text"
              value={house.name}
              onChange={(e) => updateHouse(house.id, "name", e.target.value)}
              className="rounded bg-gray-50 border text-gray-900 block w-full text-sm p-2"
            />

            <label className="text-sm text-black mt-2">
              Floors: {house.floors}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={house.floors}
              onChange={(e) =>
                handleFloorChange(house.id, Number(e.target.value))
              }
              className="w-full"
            />

            <label className="text-sm text-black mt-2">Floor Colors:</label>
            {house.floorColors.map((color, index) => (
              <div key={index} className="flex items-center gap-2 my-2">
                <span className="text-sm">Floor {house.floors - index}</span>
                <input
                  type="color"
                  value={color}
                  onChange={(e) =>
                    updateFloorColor(house.id, index, e.target.value)
                  }
                  className="w-10 h-10 rounded cursor-pointer"
                />
              </div>
            ))}
            <div className="flex justify-between mt-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => duplicateHouse(house.id)}
                className="bg-blue-500 text-white px-3 py-1 text-sm rounded-lg"
              >
                Duplicate
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeHouse(house.id)}
                className="bg-red-500 text-white px-3 py-1 text-sm rounded-lg"
              >
                Remove
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
