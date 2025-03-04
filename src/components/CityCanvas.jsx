import WeatherWidget from "./WeatherWidget";

export default function CityCanvas({ houses }) {
  return (
    <div className="flex-1 flex flex-col bg-gray-100 p-4 pb-0">
      <WeatherWidget />

      <div className="flex items-end gap-4 p-6 bg-gray-200 flex-1">
        {houses.map((house) => (
          <div
            key={house.id}
            className="relative flex flex-col items-center border-2 border-black"
            style={{
              backgroundColor: house.color,
              width: "100px",
            }}
          >
            <div className="absolute -top-[52px] w-0 h-0 border-l-[53px] border-l-transparent border-r-[53px] border-r-transparent border-b-[53px] border-b-black"></div>
            <div className="absolute -top-[50px] w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[50px] border-b-white"></div>

            {Array.from({ length: house.floors }).map((_, index) => (
              <div key={index} className="flex w-full justify-center gap-1">
                {index === house.floors - 1 ? (
                  <>
                    <div className="w-8 h-8 bg-white border-1 border-black m-1"></div>
                    <div className="w-6 h-12 bg-white border-1 border-black m-1"></div>
                  </>
                ) : (
                  <>
                    <div className="w-8 h-8 bg-white border-1 border-black m-1"></div>
                    <div className="w-8 h-8 bg-white border-1 border-black m-1"></div>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
