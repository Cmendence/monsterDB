import React, { useState, useEffect, useRef } from "react";

export default function ResultsDropdown({ resultsPerPage, setResultsPerPage }) {
  const resultsPPList = [
    { name: 10, value: 10 },
    { name: 20, value: 20 },
    { name: 50, value: 50 },
    { name: 100, value: 100 },
    { name: "All", value: 3000 },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const blurTimeoutRef = useRef(null);

  const handleResultsPPChange = (value) => {
    setResultsPerPage(value);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleBlur = () => {
    // delay to handle the menu closing immediately when it loses focus and not executing handleResultsPPChange
    blurTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
  };

  return (
    <div className="relative flex items-center">
      <p className="text-xs font-medium">Results per page: &nbsp;</p>
      <button
        id="dropdownDefaultButton"
        className="bg-violet-300 text-gray-700 font-medium border-2 border-violet-600 text-sm font-base rounded-md px-1.5 py-0 lg:px-1.5 lg:py-0.5
        active:bg-violet-600 hover:bg-violet-600 hover:text-white text-center inline-flex items-center relative z-10"
        type="button"
        onClick={toggleDropdown}
        onBlur={handleBlur}
      >
        {resultsPerPage == 3000 ? "All" : resultsPerPage}{" "}
        <svg
          className={`w-2.5 h-2.5 ms-3 chevron ${
            isDropdownOpen ? "rotateChevron" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          id="dropdown"
          className="absolute top-full right-2 z-20 bg-violet-300 divide-gray-100 rounded-lg shadow text-gray-800 font-semibold"
        >
          <ul className="py-2 text-sm" aria-labelledby="dropdownDefaultButton">
            {resultsPPList.map((item) => {
              return (
                <li key={item.name}>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-violet-500 hover:text-gray-100"
                    onClick={() => handleResultsPPChange(item.value)}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
