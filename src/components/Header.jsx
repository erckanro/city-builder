export default function Header({ setIsMobileControlsOpen }) {
  return (
    <header className="flex flex-row-reverse items-center place-content-start rounded-lg m-1 py-2 lg:p-4 bg-gray-100 text-red-700 text-lg font-bold shadow-md">
      <h1 className="text-xl font-bold">City Builder</h1>
      <button
        onClick={() => setIsMobileControlsOpen((prev) => !prev)}
        className="sm:hidden text-black p-3 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </header>
  );
}
