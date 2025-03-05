import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HouseControls({ houses, setHouses }) {
  const [newHouseId, setNewHouseId] = useState(houses.length + 1);
  const [prevFloors, setPrevFloors] = useState({});

  useEffect(() => {
    const initialFloors = {};
    houses.forEach((house) => {
      initialFloors[house.id] = house.floors;
    });
    setPrevFloors(initialFloors);
  }, [houses]);

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

  const addHouse = useCallback(() => {
    setHouses((prev) => [
      ...prev,
      {
        id: newHouseId,
        name: `House ${newHouseId}`,
        floors: 3,
        color: "#808080",
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
          className="bg-green-600 text-white p-2 rounded-lg flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>
      </div>

      <AnimatePresence>
        {houses.map((house) => (
          <motion.div
            key={house.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              scale:
                prevFloors[house.id] !== undefined &&
                prevFloors[house.id] < house.floors
                  ? [1, 1.1, 1]
                  : 1,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="p-4 border rounded-md my-2 bg-white text-gray-600 shadow-md"
          >
            <label className="text-sm text-black">Name:</label>
            <input
              type="text"
              value={house.name}
              onChange={(e) => updateHouse(house.id, "name", e.target.value)}
              className="rounded bg-gray-50 border text-gray-900 focus:border-blue-700 block w-full text-sm border-gray-300 p-2"
            />

            <label className="text-sm text-black mt-2">Color:</label>
            <div className="flex items-center gap-2 my-2">
              <input
                type="color"
                value={house.color}
                onChange={(e) => updateHouse(house.id, "color", e.target.value)}
                className="w-10 h-10 border rounded cursor-pointer"
              />
              <span className="text-sm">{house.color}</span>
            </div>

            <label className="text-sm text-black">Floors: {house.floors}</label>
            <input
              type="range"
              min="1"
              max="10"
              value={house.floors}
              onChange={(e) =>
                updateHouse(house.id, "floors", Number(e.target.value))
              }
              className="w-full"
            />

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
