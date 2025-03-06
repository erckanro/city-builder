import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HouseControls({
  houses,
  setHouses,
  setIsMobileControlsOpen,
}) {
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

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={addHouse}
            className="bg-green-600 text-white p-2 px-3 rounded-lg flex text-sm gap-1 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileControlsOpen(false)}
            className="bg-gray-300 text-gray-700 p-2 rounded-lg sm:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {houses.map((house) => (
          <motion.div
            key={house.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 border border-gray-300 rounded-xl my-2 bg-white text-gray-600 shadow-lg"
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

            <div className="flex gap-2 mt-4">
              <label className="whitespace-nowrap text-sm text-black">
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

            <div className="mt-2">
              <label className="text-sm text-gray-500">
                Adjust floor color below:
              </label>
              {house.floorColors.map((color, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xs whitespace-nowrap">
                    Floor {house.floors - index}
                  </span>
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
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-3 pt-3 border-t-1 border-gray-400">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => duplicateHouse(house.id)}
                className="bg-sky-600 text-white py-2 px-3 rounded-lg flex text-sm gap-1 items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                  />
                </svg>
                Duplicate
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
