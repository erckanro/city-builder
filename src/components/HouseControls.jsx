import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HouseControls({ houses, setHouses }) {
  const updateHouse = useCallback(
    (id, updates) => {
      setHouses((prev) =>
        prev.map((house) =>
          house.id === id ? { ...house, ...updates } : house
        )
      );
    },
    [setHouses]
  );

  const handleFloorChange = useCallback(
    (id, newFloors, currentColors) => {
      let updatedFloorColors = [...currentColors];

      if (newFloors > currentColors.length) {
        while (updatedFloorColors.length < newFloors) {
          updatedFloorColors.unshift("#808080");
        }
      } else {
        updatedFloorColors = updatedFloorColors.slice(
          updatedFloorColors.length - newFloors
        );
      }

      updateHouse(id, { floors: newFloors, floorColors: updatedFloorColors });
    },
    [updateHouse]
  );

  const addHouse = useCallback(() => {
    setHouses((prev) => {
      const id = prev.length ? Math.max(...prev.map((h) => h.id)) + 1 : 1;
      return [
        ...prev,
        {
          id,
          name: `House ${id}`,
          floors: 3,
          floorColors: ["#808080", "#808080", "#808080"],
        },
      ];
    });
  }, [setHouses]);

  const duplicateHouse = useCallback(
    (id) => {
      setHouses((prev) => {
        const houseToCopy = prev.find((house) => house.id === id);
        if (!houseToCopy) return prev;

        const nextId = prev.length ? Math.max(...prev.map((h) => h.id)) + 1 : 1;

        return [
          ...prev,
          { ...houseToCopy, id: nextId, name: `House ${nextId}` },
        ];
      });
    },
    [setHouses]
  );

  const removeHouse = useCallback(
    (id) => {
      setHouses((prev) => prev.filter((house) => house.id !== id));
    },
    [setHouses]
  );

  return (
    <>
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
            <div className="flex">
              <input
                className="appearance-none bg-transparent w-full text-gray-700 mr-3 py-1 pr-2 border-b-1 focus:outline-none"
                value={house.name}
                onChange={(e) =>
                  updateHouse(house.id, { name: e.target.value })
                }
                type="text"
                placeholder="Enter House Name"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeHouse(house.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 text-red-600 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </motion.button>
            </div>

            <div className="flex">
              <label className=" text-sm text-black mt-2">
                Floors: {house.floors}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={house.floors}
                onChange={(e) =>
                  handleFloorChange(
                    house.id,
                    Number(e.target.value),
                    house.floorColors
                  )
                }
                className="w-full"
              />
            </div>

            <label className="text-sm text-black mt-2">Floor Colors:</label>
            {house.floorColors.map((color, index) => (
              <div key={index} className="flex items-center gap-2 my-2">
                <span className="text-sm">Floor {house.floors - index}</span>
                <input
                  type="color"
                  value={color}
                  onChange={(e) =>
                    updateHouse(house.id, {
                      floorColors: house.floorColors.map((c, i) =>
                        i === index ? e.target.value : c
                      ),
                    })
                  }
                  className="w-10 h-10 rounded cursor-pointer"
                />
              </div>
            ))}
            <div className="flex justify-center mt-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => duplicateHouse(house.id)}
                className="bg-blue-500 text-white px-3 py-1 text-sm rounded-lg"
              >
                Duplicate
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
