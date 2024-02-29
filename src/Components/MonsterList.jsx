import React, { useState, useEffect } from "react";
import MonsterCard from "./MonsterCard";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import ScrollToTopButton from "./ScrollToTopButton";
import ResultsDropdown from "./ResultsDropdown";

export default function MonsterList({
  monsterSearch,
  handleSearch,
  query,
  setQuery,
  currentPage,
  setCurrentPage,
  handlePageChange,
  totalPages,
  startIndex,
  endIndex,
  clearSearch,
  resultsPerPage,
  setResultsPerPage
}) {

   //set currentPage to 1 on load
  useEffect(() => {
   setCurrentPage(1); 
 }, []);

    // Get the monsters to display on the current page
    const monstersOnCurrentPage = monsterSearch.slice(startIndex, endIndex);

  return (
    <div className="py-2 lg:w-1/2 select-none">

      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
      />
      <div className="flex justify-end mb-2 px-4">
      <ResultsDropdown
         resultsPerPage={resultsPerPage}
         setResultsPerPage={setResultsPerPage}
      />
      </div>
      <h2 className="text-gray-800 font-semibold uppercase text-lg mx-6">
        All Monsters ({monsterSearch.length})
      </h2>
      <div>
        {monstersOnCurrentPage.map((monster) => {
          let keysToRender = [
            "Activity Cycle",
            "Alignment",
            "Hit Dice",
            "Climate/Terrain",
            "Treasure",
          ];

          return (
            <MonsterCard
              keysToRender={keysToRender}
              key={monster["Name"]}
              monsters={monster}
            />
          );
        })}
      </div>
      <div className=" flex justify-center">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
      <ScrollToTopButton />
    </div>
  );
}
