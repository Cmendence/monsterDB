import React, { useState, useEffect } from "react";
import Slider from "react-slider";
import FilterResults from "./FilterResults";
import filters from "../assets/filters";
import FilterCategory from "./FilterCategory";

export default function FilterPanel({
  monsterSearch,
  handleSearch,
  clearSearch,
  query,
  setQuery,
  currentPage,
  setCurrentPage,
  handlePageChange,
  resultsPerPage,
  setResultsPerPage,
  totalPages,
  startIndex,
  endIndex,
  handleKeyPress
}) {
  // hit dice default values
  const minDice = 1;
  const maxDice = 30;

  const [diceValues, setDiceValues] = useState([minDice, maxDice]);
  // state variable for tracking the "30+ HD" button
  const [largeMonstersChecked, setLargeMonstersChecked] = useState(false);
  //selectedFilters for storing which filters are selected from the list
  const [selectedFilters, setSelectedFilters] = useState({
    Activity: [],
    Climate: [],
    Terrain: [],
    Plane: [],
    Movement: [],
    Frequency: [],
    World: [],
  });

  // used for toggling between the main filter panel and the filter results
  const [showResults, setShowResults] = useState(false);
  // used for checking if the filter categories are expanded or not
  const [expandedCategories, setExpandedCategories] = useState({
    Activity: false,
    Climate: false,
    Terrain: false,
    Plane: false,
    Movement: false,
    Frequency: false,
    World: false,
  });

  //clears query on load
  useEffect(() => {
    setQuery("");
  }, []);

  const LargeMonsters = [{ value: [30, 100], label: "30+ HD" }];

  // spaghetti string for displaying all the different filters selected from the filter panel while looking at filter results
  const filterInfo = `HD ${diceValues[0]}-${diceValues[1]}, Activity: ${selectedFilters.Activity}, 
                      Climate/Terrain: ${selectedFilters.Climate} ${selectedFilters.Terrain} ${selectedFilters.Plane},
                      Move: ${selectedFilters.Movement} Frequency: ${selectedFilters.Frequency}`;

  // ***FILTERS***

  //hit dice
  const isHitDiceInRange = (monster, diceValues) => {
    const hitDice = parseInt(monster["Hit Dice"], 10);
    return (
      (!diceValues[0] || hitDice >= diceValues[0]) &&
      (!diceValues[1] || hitDice <= diceValues[1])
    );
  };

//   //  returns true if climate/terrain is "any" OR matches the selected filters. splits on comma and forward slash
//   const isClimateMatch = (monster, selectedFilters) => {
//     const monsterClimate = monster["Climate/Terrain"].toLowerCase();

//     return (
//       selectedFilters.Climate.length === 0 ||
//       monsterClimate === "any" ||
//       selectedFilters.Climate.every((filter) =>
//         monsterClimate.split(/[,/]/).some((word) => word.includes(filter))
//       )
//     );
//   };

//   //  returns true if climate/terrain is exclusively "any" OR matches the selected filters. splits on comma and forward slash
//   const isTerrainMatch = (monster, selectedFilters) => {
//     const monsterTerrain = monster["Climate/Terrain"].toLowerCase();

//     return (
//       selectedFilters.Terrain.length === 0 ||
//       monsterTerrain === "any" ||
//       selectedFilters.Terrain.every((filter) =>
//         monsterTerrain.split(/[,/]/).some((word) => word.includes(filter))
//       )
//     );
//   };

const isClimateMatch = (monster, selectedFilters) => {
   const monsterClimate = monster["Climate/Terrain"].toLowerCase();
 
   return (
     selectedFilters.Climate.length === 0 ||
     monsterClimate === "any" ||
     selectedFilters.Climate.every((filter) =>
       (filter.toLowerCase() === "land" || monsterClimate.includes(filter)) ||
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
       (filter.toLowerCase() === "land" || monsterTerrain.includes(filter)) ||
       monsterTerrain.split(/[,/]/).some((word) => word.includes(filter))
     )
   );
 };
 

  const isPlanesMatch = (monster, selectedFilters) =>
    selectedFilters.Plane.length === 0 ||
    selectedFilters.Plane.some((filter) =>
      monster["Climate/Terrain"].toLowerCase().includes(filter)
    );

  // if activity cycle is "any" it will return those monsters regardless if "day" or "night" is selected, but will also return the selected option
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

  // still needs work, but returns monsters if they have the selected letter combo anywhere in the value. Split on the comma, slash, and parentheses.
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

  // at request, This filters OUT the monsters from other worlds by default. if it's then selected, it will filter for monsters with the
  // selected world value anywhere in the monster object.
  const isIncludedWorld = (monster, selectedWorlds) => {
    const hasAthasKeyword = (monster) =>
      Object.values(monster).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes("athas")
      );

    const hasRavenloftKeyword = (monster) =>
      Object.values(monster).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes("ravenloft")
      );

    return (
      (selectedWorlds.includes("athas") && hasAthasKeyword(monster)) ||
      (selectedWorlds.includes("ravenloft") && hasRavenloftKeyword(monster)) ||
      (selectedWorlds.length === 0 &&
        !hasAthasKeyword(monster) &&
        !hasRavenloftKeyword(monster)) ||
      (selectedWorlds.length > 0 &&
        selectedWorlds.every((world) =>
          Object.values(monster).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(world.toLowerCase())
          )
        ))
    );
  };

  // The meat. checks for all matching filters while filtering out other worlds and taking into account the hit dice
  const filterMonsters = (monster, selectedFilters) => {
    const includedWorld = isIncludedWorld(monster, selectedFilters.World);

    return (
      includedWorld &&
      isHitDiceInRange(
        monster,
        largeMonstersChecked ? [30, 100] : diceValues
      ) &&
      isClimateMatch(monster, selectedFilters) &&
      isTerrainMatch(monster, selectedFilters) &&
      isPlanesMatch(monster, selectedFilters) &&
      isMovementTypeMatch(monster, selectedFilters) &&
      isFrequencyMatch(monster, selectedFilters) &&
      isActivityCycleMatch(monster, selectedFilters)
    );
  };

  // monsters that survived the filter
  const filteredMonsters = monsterSearch.filter((monster) =>
    filterMonsters(monster, selectedFilters)
  );

  // conditional style of the slider bar
  const isSliderDisabled = largeMonstersChecked
    ? "bg-gray-300 sliderDisabled"
    : "bg-violet-400";

  // clear filters
  const resetFilters = () => {
    setSelectedFilters({
      Activity: [],
      Plane: [],
      Climate: [],
      Terrain: [],
      Movement: [],
      Frequency: [],
      World: [],
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

  // function on button to go to filterResults. toggles showResults, sets current page back to 1, clears the search bar and scrolls to top.
  const toggleResults = () => {
    setShowResults(!showResults);
    setCurrentPage(1);
    setQuery("");
    window.scrollTo(0, 0);
  };

  // passed to filterCategory for each category to track their own open and closed state
  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="m-4 mb-12 select-none ">
      {!showResults ? (
        <div className="lg:w-1/2">
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
            &nbsp; {LargeMonsters[0].label}
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
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          startIndex={startIndex}
          endIndex={endIndex}
          resultsPerPage={resultsPerPage}
          setResultsPerPage={setResultsPerPage}
          handleKeyPress={handleKeyPress}
        />
      )}
    </div>
  );
}
