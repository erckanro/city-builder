export default function CityCanvas({ houses }) {
  return (
    <div className="flex items-end gap-4 p-6 bg-gray-200 flex-1">
      {houses.map((house) => (
        <div
          key={house.id}
          className="flex flex-col items-center border-2 border-black"
          style={{
            backgroundColor: house.color,
            width: "100px",
            height: `${house.floors * 50}px`,
          }}
        >
          {Array.from({ length: house.floors }).map((_, index) => (
            <div key={index} className="w-8 h-8 bg-white border m-1"></div>
          ))}
        </div>
      ))}
    </div>
  );
}
