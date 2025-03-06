import { motion } from "framer-motion";

export default function Modal({ isOpen, onClose, onConfirm, house }) {
  if (!isOpen) return null;

  return (
    <div
      id="popup-modal"
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
    >
      <motion.div
        key={house.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative p-4 w-full m-2 max-w-md bg-white rounded-lg shadow-sm"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 end-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 pl-2 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="p-4 md:p-5 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-25 mb-5 justify-self-center text-orange-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>

          <h3 className="mb-5 text-lg font-normal text-gray-500">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900">{house?.name}</span>?
          </h3>
          <button
            onClick={onConfirm}
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 m-1 py-2.5 cursor-pointer"
          >
            Yes, I'm sure
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-500 hover:bg-gray-100 hover:text-gray-700 m-1 cursor-pointer focus:ring-4 focus:ring-gray-100"
          >
            No, cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
