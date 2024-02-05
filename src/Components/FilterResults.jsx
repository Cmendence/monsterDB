import React, { useState, useEffect } from "react";
import MonsterCard from "./MonsterCard";

export default function FilterResults({ filteredMonsters, toggleResults, filterInfo }) {
  const [showButton, setShowButton] = useState(false);

  const scrollFunction = () => {
    setShowButton(window.scrollY > 20);
  };

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);

    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  return (
    <div>
      <button
        className="bg-violet-700 text-gray-50 tracking-wide font-semibold rounded-md px-3 py-2 active:bg-violet-900 hover:bg-violet-800"
        onClick={() => toggleResults()}
      >
        Back to Filters
      </button>

      <div className="-mx-4">
        <h2 className="text-gray-800 font-semibold capitalize text-lg mx-6 my-2">
          Showing ({filteredMonsters.length}) results for
        </h2>
         <h2 className="text-gray-800 font-semibold capitalize text-md mx-6 my-2">{filterInfo}</h2>
        {filteredMonsters.map((monster, index) => {
            return (
              <MonsterCard
                key={index}
                monsters={monster}
                keysToRender={['Activity Cycle', 'Alignment', 'Hit Dice', 'Climate/Terrain', 'Treasure']}
              />
            );
        })}

        {showButton && (
          <button
            type="button"
            onClick={backToTop}
            className="fixed bottom-20 right-5 rounded-full bg-purple-600 p-3 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              className="h-4 w-4"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
              ></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}