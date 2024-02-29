import React from "react";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
  handlePageChange,
}) {
  const backToOne = () => {
    setCurrentPage(1);
  };

  return (
   <div>
    <div className="flex items-center gap-8 pt-6 pb-4">
      <button
        className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border 
               border-violet-700 text-center text-violet-700 align-middle font-sans text-xs font-medium uppercase 
                transition-all hover:opacity-75 focus:ring focus:ring-violet-500 active:opacity-[0.85] 
               disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            ></path>
          </svg>
        </span>
      </button>
      <p className="block font-sans text-sm antialiased font-normal leading-relaxed text-gray-700">
        Page <span className="text-gray-700 font-medium">{currentPage}</span> of
        <strong className="text-gray-700">&nbsp;{totalPages}</strong>
      </p>
      <button
        className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border 
            border-violet-700 text-center align-middle font-sans text-xs font-medium uppercase 
            text-violet-700 transition-all hover:opacity-75 focus:ring focus:ring-violet-500 active:opacity-[0.85] 
            disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            ></path>
          </svg>
        </span>
      </button>
    </div>
    <div className="text-center pb-16">
    {currentPage > 1 && (
        <button
          className="border border-violet-600 rounded-md w-14 h-8 text-sm bg-violet-200"
          onClick={backToOne}
        >
          Page 1
        </button>
      )}
      </div>
    </div>
  );
}
