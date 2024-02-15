import React, { useState, useEffect } from "react";
import MonsterCard from "./MonsterCard";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import ScrollToTopButton from "./ScrollToTopButton";

export default function FilterResults({
  filteredMonsters,
  toggleResults,
  filterInfo,
  handleSearch,
  clearSearch,
  query,
  setQuery,
  currentPage,
  handlePageChange,
  resultsPerPage,
  startIndex,
  endIndex
}) {
  const keysToRender = [
    "Activity Cycle",
    "Alignment",
    "Hit Dice",
    "Climate/Terrain",
    "Treasure",
  ];

    // Get the monsters to display on the current page
    const monstersOnCurrentPage = filteredMonsters.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredMonsters.length / resultsPerPage);

  return (
    <div className="lg:w-1/2">
      <SearchBar
         query={query}
         setQuery={setQuery}
         handleSearch={handleSearch}
         clearSearch={clearSearch}
      />
      
      <button
        className="bg-violet-600 text-gray-50 lg:tracking-wide font-semibold rounded-md px-3 py-1 lg:px-3 lg:py-2 active:bg-violet-900 hover:bg-violet-800"
        onClick={() => toggleResults()}
      >
        Back to Filters
      </button>

      <div className="-mx-4">
        <h2 className="text-gray-800 font-semibold capitalize text-lg mx-6 my-2">
          Showing ({filteredMonsters.length}) results for
        </h2>
        <h2 className="text-gray-800 font-semibold capitalize text-sm mx-6 my-2">
          {filterInfo}
        </h2>
        <div className="">
          {monstersOnCurrentPage.map((monster, index) => {
            return (
              <MonsterCard
                key={index}
                monsters={monster}
                keysToRender={keysToRender}
              />
            );
          })}

          <div className=" flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
        <ScrollToTopButton />
      </div>
    </div>
  );
}
