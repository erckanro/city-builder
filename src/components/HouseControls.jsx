import { useState } from "react";

export default function HouseControls({ houses, setHouses }) {
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
            className="w-full mb-2 border p-1 text-gray-500"
          />
          <label>Floors: {house.floors}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={house.floors}
            className="w-full"
          />
          <label>Color:</label>
          <select value={house.color} className="w-full border p-1">
            <option value="orange">Orange</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="gray">Gray</option>
          </select>
          <div className="flex justify-between mt-2">
            <button className="bg-blue-500 text-white p-1 text-sm rounded-sm">
              Duplicate
            </button>
            <button className="bg-red-500 text-white p-1 text-sm rounded-sm">
              Remove
            </button>
          </div>
        </div>
      ))}
      <button className="w-full bg-green-500 text-white p-2 mt-4 rounded-md ">
        Add New House
      </button>
    </div>
  );
}
