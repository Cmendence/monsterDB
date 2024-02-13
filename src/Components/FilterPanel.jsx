import React, { useState } from "react";
import Slider from "react-slider";
import FilterResults from "./FilterResults";
import filters from "../assets/filters";
import FilterCategory from "./FilterCategory";

export default function FilterPanel(
   { 
      monsters, 
      handleSearch,
      clearSearch, 
      query, 
      setQuery, 
      currentPage, 
      handlePageChange, 
      resultsPerPage,
      totalPages, 
      startIndex,
      endIndex,
      setCurrentPage
   }) {


  const minDice = 1;
  const maxDice = 30;

  const [diceValues, setDiceValues] = useState([minDice, maxDice]);
  const [largeMonstersChecked, setLargeMonstersChecked] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    Large: [],
    Activity: [],
    Climate: [],
    Terrain: [],
    Plane: [],
    Movement: [],
    Frequency: [],
  });

  const filterInfo = `HD ${diceValues[0]}-${diceValues[1]}, Activity: ${selectedFilters.Activity}, 
                     Climate/Terrain: ${selectedFilters.Climate} ${selectedFilters.Terrain} ${selectedFilters.Plane},
                     Move: ${selectedFilters.Movement} Frequency: ${selectedFilters.Frequency}`;

  const [showResults, setShowResults] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({
    Large: false,
    Activity: false,
    Climate: false,
    Terrain: false,
    Plane: false,
    Movement: false,
    Frequency: false,
  });

  const isHitDiceInRange = (monster, diceValues) => {
    const hitDice = parseInt(monster["Hit Dice"], 10);
    return (
      (!diceValues[0] || hitDice >= diceValues[0]) &&
      (!diceValues[1] || hitDice <= diceValues[1])
    );
  };

  const isClimateMatch = (monster, selectedFilters) => {
    const monsterClimate = monster["Climate/Terrain"].toLowerCase();

    return (
      selectedFilters.Climate.length === 0 ||
      monsterClimate === "any" ||
      selectedFilters.Climate.every((filter) =>
        monsterClimate.split(/[,/]/).some((word) => word.includes(filter))
      )
    );
  };

  const isTerrainMatch = (monster, selectedFilters) => {
    const monsterTerrain = monster["Climate/Terrain"].toLowerCase();

    return (
      selectedFilters.Terrain.length === 0 ||
      monsterTerrain === "any" ||
      selectedFilters.Terrain.every((filter) =>
        monsterTerrain.split(/[,/]/).some((word) => word.includes(filter))
      )
    );
  };

  const isPlanesMatch = (monster, selectedFilters) =>
    selectedFilters.Plane.length === 0 ||
    selectedFilters.Plane.some((filter) =>
      monster["Climate/Terrain"].toLowerCase().includes(filter)
    );

  const isActivityCycleMatch = (monster, selectedFilters) => {
    const selectedActivityCycle = selectedFilters.Activity;
    return (
      selectedActivityCycle.length === 0 ||
      selectedActivityCycle.includes("any") ||
      (selectedActivityCycle.includes("day") &&
        (monster["Activity Cycle"].toLowerCase() === "any" ||
          monster["Activity Cycle"].toLowerCase() === "day")) ||
      (selectedActivityCycle.includes("night") &&
        (monster["Activity Cycle"].toLowerCase() === "any" ||
          monster["Activity Cycle"].toLowerCase() === "night"))
    );
  };

  const isMovementTypeMatch = (monster, selectedFilters) => {
    const monsterMovement = monster["Movement"].toLowerCase();

    return (
      selectedFilters.Movement.length === 0 ||
      selectedFilters.Movement.every((filter) =>
        monsterMovement.split(/[,/()]/).some((word) => word.includes(filter))
      )
    );
  };

  const isFrequencyMatch = (monster, selectedFilters) => {
    const monsterFrequency = monster["Frequency"].toLowerCase();
    const selectedFrequencyFilters = selectedFilters.Frequency.map((filter) =>
      filter.toLowerCase()
    );

    return (
      selectedFrequencyFilters.length === 0 ||
      selectedFrequencyFilters.includes(monsterFrequency)
    );
  };

  console.log(selectedFilters);

  const filterMonsters = (monster, selectedFilters) =>
    isHitDiceInRange(monster, largeMonstersChecked ? [30, 100] : diceValues) &&
    isClimateMatch(monster, selectedFilters) &&
    isTerrainMatch(monster, selectedFilters) &&
    isPlanesMatch(monster, selectedFilters) &&
    isMovementTypeMatch(monster, selectedFilters) &&
    isFrequencyMatch(monster, selectedFilters) &&
    isActivityCycleMatch(monster, selectedFilters);

  const filteredMonsters = monsters.filter((monster) =>
    filterMonsters(monster, selectedFilters)
  );

  console.log(filteredMonsters);

  const isSliderDisabled = largeMonstersChecked
    ? "bg-gray-300 sliderDisabled"
    : "bg-violet-400";


  const resetFilters = () => {
    setSelectedFilters({
      Large: [],
      Activity: [],
      Plane: [],
      Climate: [],
      Terrain: [],
      Movement: [],
      Frequency: [],
    });
    setDiceValues([minDice, maxDice]);
    setLargeMonstersChecked(false);
  };

  const handleFilterChange = (category, value) => {
    // Create a new object to avoid mutating the state directly
    const newFilters = { ...selectedFilters };

    // Toggle the value in the selectedFilters array for the given category
    if (newFilters[category].includes(value)) {
      newFilters[category] = newFilters[category].filter(
        (filter) => filter !== value
      );
    } else {
      newFilters[category] = [...newFilters[category], value];
    }

    // Update the state
    setSelectedFilters(newFilters);
  };

  const handleLargeMonstersChange = () => {
    setLargeMonstersChecked(!largeMonstersChecked);
    if (!largeMonstersChecked) {
      // If checkbox is checked, set dice values and disable the slider
      setDiceValues([30, 100]);
    } else {
      // If checkbox is unchecked, enable the slider with default values
      setDiceValues([minDice, maxDice]);
    }
  };

  const toggleResults = () => {
    setShowResults(!showResults);
    setCurrentPage(1)
    window.scrollTo(0, 0);
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
   
         
      //   <div className="lg:w-1/2">


      //     <h3
      //       className={`font-semibold mt-6 flex items-center ${bottomBorder(
      //         !expandedCategories.activityCycle
      //       )}`}
      //       onClick={() => toggleCategory("activityCycle")}
      //     >
      //       Activity Cycle &nbsp;{" "}
      //       {
      //         <div
      //           className={`chevron ${
      //             !expandedCategories.activityCycle ? "rotateChevron" : ""
      //           }`}
      //         >
      //           {chevronIcon}
      //         </div>
      //       }
      //     </h3>
      //     {expandedCategories.activityCycle && (
      //       <div
      //         className={`ml-4 mb-4 border-b-2 ${bottomBorder(
      //           expandedCategories.activityCycle
      //         )}`}
      //       >
      //         {filters.activityCycle.map(({ value, label }) => (
      //           <label key={value} className="ml-4 m-2 flex">
      //             <input
      //               type="checkbox"
      //               value={value}
      //               checked={selectedFilters.activityCycle.includes(value)}
      //               onChange={() => handleFilterChange("activityCycle", value)}
      //             />
      //             &nbsp; {label}
      //           </label>
      //         ))}
      //       </div>
      //     )}

      //     <h3
      //       className={`font-semibold flex my-4 items-center ${bottomBorder(
      //         !expandedCategories.climate
      //       )}`}
      //       onClick={() => toggleCategory("climate")}
      //     >
      //       Climate &nbsp;{" "}
      //       {
      //         <div
      //           className={`chevron ${
      //             !expandedCategories.climate ? "rotateChevron" : ""
      //           }`}
      //         >
      //           {chevronIcon}
      //         </div>
      //       }
      //     </h3>
      //     {expandedCategories.climate && (
      //       <div
      //         className={`ml-4 border-b-2 ${bottomBorder(
      //           expandedCategories.climate
      //         )}`}
      //       >
      //         {filters.climate.map(({ value, label }) => (
      //           <label key={value} className="ml-4 m-2 flex">
      //             <input
      //               type="checkbox"
      //               value={value}
      //               checked={selectedFilters.climate.includes(value)}
      //               onChange={() => handleFilterChange("climate", value)}
      //             />
      //             &nbsp; {label}
      //           </label>
      //         ))}
      //       </div>
      //     )}
      //     <h3
      //       className={`font-semibold mt-4 flex items-center ${bottomBorder(
      //         !expandedCategories.terrain
      //       )}`}
      //       onClick={() => toggleCategory("terrain")}
      //     >
      //       Terrain &nbsp;{" "}
      //       {
      //         <div
      //           className={`chevron ${
      //             !expandedCategories.terrain ? "rotateChevron" : ""
      //           }`}
      //         >
      //           {chevronIcon}
      //         </div>
      //       }
      //     </h3>
      //     {expandedCategories.terrain && (
      //       <div
      //         className={`ml-4 border-b-2 ${bottomBorder(
      //           expandedCategories.terrain
      //         )}`}
      //       >
      //         {filters.terrain.map(({ value, label }) => (
      //           <label key={value} className="ml-4 m-2 flex">
      //             <input
      //               type="checkbox"
      //               value={value}
      //               checked={selectedFilters.terrain.includes(value)}
      //               onChange={() => handleFilterChange("terrain", value)}
      //             />
      //             &nbsp; {label}
      //           </label>
      //         ))}
      //       </div>
      //     )}
      //     <h3
      //       className={`font-semibold my-4 flex items-center ${bottomBorder(
      //         !expandedCategories.planes
      //       )}`}
      //       onClick={() => toggleCategory("planes")}
      //     >
      //       Planes &nbsp;{" "}
      //       {
      //         <div
      //           className={`chevron ${
      //             !expandedCategories.planes ? "rotateChevron" : ""
      //           }`}
      //         >
      //           {chevronIcon}
      //         </div>
      //       }
      //     </h3>
      //     {expandedCategories.planes && (
      //       <div
      //         className={`ml-4 mb-4 border-b-2 ${bottomBorder(
      //           expandedCategories.planes
      //         )}`}
      //       >
      //         {filters.planes.map(({ value, label }) => (
      //           <label key={value} className="ml-4 m-2 flex">
      //             <input
      //               type="checkbox"
      //               value={value}
      //               checked={selectedFilters.planes.includes(value)}
      //               onChange={() => handleFilterChange("planes", value)}
      //             />
      //             &nbsp; {label}
      //           </label>
      //         ))}
      //       </div>
      //     )}
      //     <h3
      //       className={`font-semibold flex my-4 items-center ${bottomBorder(
      //         !expandedCategories.movementType
      //       )}`}
      //       onClick={() => toggleCategory("movementType")}
      //     >
      //       Movement Type &nbsp;{" "}
      //       {
      //         <div
      //           className={`chevron ${
      //             !expandedCategories.movementType ? "rotateChevron" : ""
      //           }`}
      //         >
      //           {chevronIcon}
      //         </div>
      //       }
      //     </h3>
      //     {expandedCategories.movementType && (
      //       <div
      //         className={`ml-4 border-b-2 ${bottomBorder(
      //           expandedCategories.movementType
      //         )}`}
      //       >
      //         {filters.movementType.map(({ value, label }) => (
      //           <label key={value} className="m-2 flex">
      //             <input
      //               type="checkbox"
      //               value={value}
      //               checked={selectedFilters.movementType.includes(value)}
      //               onChange={() => handleFilterChange("movementType", value)}
      //             />
      //             &nbsp; {label}
      //           </label>
      //         ))}
      //       </div>
      //     )}
      //     <h3
      //       className={`font-semibold flex my-4 items-center ${bottomBorder(
      //         !expandedCategories.frequency
      //       )}`}
      //       onClick={() => toggleCategory("frequency")}
      //     >
      //       Frequency &nbsp;{" "}
      //       {
      //         <div
      //           className={`chevron ${
      //             !expandedCategories.frequency ? "rotateChevron" : ""
      //           }`}
      //         >
      //           {chevronIcon}
      //         </div>
      //       }
      //     </h3>
      //     {expandedCategories.frequency && (
      //       <div
      //         className={`ml-4 border-b-2 ${bottomBorder(
      //           expandedCategories.frequency
      //         )}`}
      //       >
      //         {filters.frequency.map(({ value, label }) => (
      //           <label key={value} className="m-2 flex">
      //             <input
      //               type="checkbox"
      //               value={value}
      //               checked={selectedFilters.frequency.includes(value)}
      //               onChange={() => handleFilterChange("frequency", value)}
      //             />
      //             &nbsp; {label}
      //           </label>
      //         ))}
      //       </div>
      //     )}

      <div className="m-4 mb-12 select-none ">
      {!showResults ? (
         
<div>
<h3 className="font-semibold">Hit Dice:</h3>
          <div className="text-sm mt-1">
            <span className="font-semibold">Min:</span> {diceValues[0]}{" "}
            <span className="font-semibold">Max:</span> {diceValues[1]}{" "}
          </div>
          <Slider
            onChange={setDiceValues}
            className={`my-4 slider lg:w-1/2 ${isSliderDisabled} rounded flex `}
            value={diceValues}
            min={minDice}
            max={maxDice}
            disabled={largeMonstersChecked}
          />

          <label
            key={filters.largeMonsters}
            className="ml-4 flex font-semibold"
          >
            <input
              type="checkbox"
              value={filters.largeMonsters}
              checked={largeMonstersChecked}
              onChange={() => handleLargeMonstersChange()}
            />
            &nbsp; {filters.Large[0].label}
          </label>
<div>
      {Object.keys(filters).map((category) => (
        <FilterCategory
          key={category}
          category={category}
          filters={filters[category]}
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          expandedCategories={expandedCategories}
          toggleCategory={toggleCategory}
          
        />
      ))}
    </div>
          <div className="flex justify-between">
            <button
              className="bg-violet-700 text-gray-50 tracking font-semibold rounded-md m-2 px-4 py-2 active:bg-violet-900 hover:bg-violet-800"
              onClick={() => toggleResults()}
            >
              See results ({filteredMonsters.length})
            </button>
            <button
              className="bg-gray-500 text-gray-50 tracking-wide font-semibold rounded-md m-2 px-4 py-2 active:bg-gray-900 hover:bg-gray-800"
              onClick={() => resetFilters()}
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : (
        <FilterResults
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
          filterInfo={filterInfo}
          toggleResults={toggleResults}
          filteredMonsters={filteredMonsters}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          startIndex={startIndex}
          endIndex={endIndex}
          resultsPerPage={resultsPerPage}
        />
      )}
    </div>
  );
}
