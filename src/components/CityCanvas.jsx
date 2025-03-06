import WeatherWidget from "./WeatherWidget";

export default function CityCanvas({ houses }) {
  return (
    <div className="flex-1 flex flex-col p-4 pb-0 bg-gray-100 p-4 overflow-auto rounded-lg shadow-2xl overflow-hidden">
      <WeatherWidget />

      <div
        className="flex items-end gap-4 p-6 flex-1 overflow-auto
"
      >
        {houses.map((house) => (
          <div key={house.id} className="flex flex-col items-center">
            <div className="relative flex flex-col items-center border-2 border-black">
              <div className="absolute -top-[52px] w-0 h-0 border-l-[53px] border-l-transparent border-r-[53px] border-r-transparent border-b-[53px] border-b-black"></div>
              <div className="absolute -top-[50px] w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[50px] border-b-white"></div>

              {house.floorColors.map((color, index) => (
                <div
                  key={index}
                  className="flex w-full justify-center gap-1"
                  style={{ backgroundColor: color, width: "100px" }}
                >
                  {index === house.floorColors.length - 1 ? (
                    <>
                      <div className="w-8 h-8 bg-white border border-black m-1"></div>
                      <div className="w-6 h-12 bg-white border border-black m-1"></div>
                    </>
                  ) : (
                    <>
                      <div className="w-8 h-8 bg-white border border-black m-1"></div>
                      <div className="w-8 h-8 bg-white border border-black m-1"></div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <h2 className="text-lg text-black"> {house.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
