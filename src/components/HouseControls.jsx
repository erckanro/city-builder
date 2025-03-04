import { useState } from "react";

export default function HouseControls({ houses, setHouses }) {
  const [newHouseId, setNewHouseId] = useState(houses.length + 1);

  const updateHouse = (id, key, value) => {
    setHouses((prev) =>
      prev.map((house) =>
        house.id === id ? { ...house, [key]: value } : house
      )
    );
  };

  const addHouse = () => {
    setHouses([
      ...houses,
      { id: newHouseId, name: `House ${newHouseId}`, floors: 3, color: "gray" },
    ]);
    setNewHouseId(newHouseId + 1);
  };

  const duplicateHouse = (id) => {
    const houseToCopy = houses.find((house) => house.id === id);
    if (houseToCopy) {
      const newHouse = {
        ...houseToCopy,
        id: newHouseId,
        name: `House ${newHouseId}`,
      };
      setHouses([...houses, newHouse]);
      setNewHouseId(newHouseId + 1);
    }
  };

  const removeHouse = (id) => {
    setHouses(houses.filter((house) => house.id !== id));
  };

  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h2 className="text-lg font-bold text-black">Houses List</h2>
      {houses.map((house) => (
        <div
          key={house.id}
          className="p-2 border rounded-md my-2 bg-white text-gray-600"
        >
          <input
            type="text"
            value={house.name}
            onChange={(e) => updateHouse(house.id, "name", e.target.value)}
            className="w-full mb-2 border p-1 text-gray-500"
          />
          <label>Floors: {house.floors}</label>
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
          <label>Color:</label>
          <select
            value={house.color}
            onChange={(e) => updateHouse(house.id, "color", e.target.value)}
            className="w-full border p-1"
          >
            <option value="orange">Orange</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="gray">Gray</option>
          </select>
          <div className="flex justify-between mt-2">
            <button
              onClick={() => duplicateHouse(house.id)}
              className="bg-blue-500 text-white p-1 text-sm rounded-sm"
            >
              Duplicate
            </button>
            <button
              onClick={() => removeHouse(house.id)}
              className="bg-red-500 text-white p-1 text-sm rounded-sm"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={addHouse}
        className="w-full bg-green-500 text-white p-2 mt-4 rounded-md "
      >
        Add New House
      </button>
    </div>
  );
}
