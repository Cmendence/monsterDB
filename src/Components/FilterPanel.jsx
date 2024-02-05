import React, { useState } from "react";
import Slider from "react-slider";
import FilterResults from "./FilterResults";

export default function FilterPanel({ monsters }) {
  const filters = {
    climate: [
      { value: "subarctic", label: "Subarctic" },
      { value: "arctic", label: "Arctic" },
      { value: "cold", label: "Cold" },
      { value: "temperate", label: "Temperate" },
      { value: "warm", label: "Warm" },
      { value: "tropical", label: "Tropical" },
      { value: "subtropical", label: "Subtropical" },
      { value: "coast", label: "Coast" },
    ],
    terrain: [
      { value: "desert", label: "Desert" },
      { value: "forest", label: "Forest" },
      { value: "hill", label: "Hills" },
      { value: "mountain", label: "Mountains" },
      { value: "plains", label: "Plains" },
      { value: "subterranean", label: "Subterranean" },
      { value: "swamp", label: "Swamp" },
      { value: "marsh", label: "Marsh" },
      { value: "water", label: "Water" },
      { value: "ocean", label: "Ocean" },
    ],
    planes: [
      { value: "astral", label: "Astral" },
      { value: "ethereal", label: "Ethereal" },
      { value: "air", label: "Plane of Air" },
      { value: "earth", label: "Plane of Earth" },
      { value: "fire", label: "Plane of Fire" },
      { value: "water", label: "Plane of Water" },
      { value: "lower", label: "Lower Planes" },
      { value: "shadow", label: "Shadow Planes" },
    ],
    activityCycle: [
      { value: "any", label: "Any" },
      { value: "day", label: "Day" },
      { value: "night", label: "Night" },
    ],
  };

  const minDice = 1;
  const maxDice = 50;

  const [diceValues, setDiceValues] = useState([minDice, maxDice]);
  const [selectedFilters, setSelectedFilters] = useState({
    activityCycle: [],
    climate: [],
    terrain: [],
    planes: [],
  });

  const filterInfo = `HD ${diceValues[0]}-${diceValues[1]}, Activity Cycle : ${selectedFilters.activityCycle}, Climate/Terrain: ${selectedFilters.climate} ${selectedFilters.terrain} ${selectedFilters.planes}`
  console.log(filterInfo)
  const [showResults, setShowResults] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({
    activityCycle: false,
    climate: false,
    terrain: false,
    planes: false,
  });

  const filteredMonsters = monsters.filter((monster) => {
    const hitDice = parseInt(monster["Hit Dice"], 10);

    // Check Hit Dice range
    const isHitDiceInRange =
      (!diceValues[0] || hitDice >= diceValues[0]) &&
      (!diceValues[1] || hitDice <= diceValues[1]);

    // Check selected filters for each category
    const isClimateMatch =
      !expandedCategories.climate ||
      selectedFilters.climate.length === 0 ||
      selectedFilters.climate.every((filter) =>
        monster["Climate/Terrain"]
          .toLowerCase()
          .split(/[,/]/)
          .some((word) => word.includes(filter))
      );

    const isTerrainMatch =
      !expandedCategories.terrain ||
      selectedFilters.terrain.length === 0 ||
      selectedFilters.terrain.every((filter) =>
        monster["Climate/Terrain"]
          .toLowerCase()
          .split(/[,/]/)
          .some((word) => word.includes(filter))
      );

    const isPlanesMatch =
      !expandedCategories.planes ||
      selectedFilters.planes.length === 0 ||
      selectedFilters.planes.some((filter) =>
        monster["Climate/Terrain"].toLowerCase().includes(filter)
      );

    const selectedActivityCycle = selectedFilters.activityCycle;
    const isActivityCycleMatch =
      !expandedCategories.activityCycle ||
      selectedActivityCycle.length === 0 ||
      selectedActivityCycle.includes("any") ||
      (selectedActivityCycle.includes("day") &&
        (monster["Activity Cycle"].toLowerCase() === "any" ||
          monster["Activity Cycle"].toLowerCase() === "day")) ||
      (selectedActivityCycle.includes("night") &&
        (monster["Activity Cycle"].toLowerCase() === "any" ||
          monster["Activity Cycle"].toLowerCase() === "night"));

    // Return true only if all conditions are met
    return (
      isHitDiceInRange &&
      isClimateMatch &&
      isTerrainMatch &&
      isPlanesMatch &&
      isActivityCycleMatch
    );
  });

  console.log(filteredMonsters);

  const bottomBorder = (option) =>
    option ? "border-b-2 border-violet-500" : "";

  const chevronIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 15.75 7.5-7.5 7.5 7.5"
      />
    </svg>
  );

  const resetFilters = () => {
    setSelectedFilters({
      activityCycle: [],
      planes: [],
      climate: [],
      terrain: [],
    });
    setDiceValues([minDice, maxDice]);
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
    console.log("hit dice: ", diceValues);
    console.log("current filters:", newFilters);
  };

  const toggleResults = () => {
    setShowResults(!showResults);
    window.scrollTo(0, 0);
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="m-4 mb-12 select-none">
      {!showResults ? (
        <div>
          <h3 className="font-semibold">Hit Dice:</h3>
          <div className="text-sm mt-1">
            <span className="font-semibold">Min:</span> {diceValues[0]}{" "}
            <span className="font-semibold">Max:</span> {diceValues[1]}{" "}
          </div>
          <Slider
            onChange={setDiceValues}
            className="my-4 slider lg:w-1/3 bg-violet-400 rounded flex "
            value={diceValues}
            min={minDice}
            max={maxDice}
          />

          <h3
            className={`font-semibold mt-6 flex items-center ${bottomBorder(
              !expandedCategories.activityCycle
            )}`}
            onClick={() => toggleCategory("activityCycle")}
          >
            Activity Cycle &nbsp;{" "}
            {
              <div
                className={`chevron ${
                  !expandedCategories.activityCycle ? "rotateChevron" : ""
                }`}
              >
                {chevronIcon}
              </div>
            }
          </h3>
          {expandedCategories.activityCycle && (
            <div
              className={`ml-4 mb-4 border-b-2 ${bottomBorder(
                expandedCategories.activityCycle
              )}`}
            >
              {filters.activityCycle.map(({ value, label }) => (
                <label key={value} className="ml-4 m-2 flex">
                  <input
                    type="checkbox"
                    value={value}
                    checked={selectedFilters.activityCycle.includes(value)}
                    onChange={() => handleFilterChange("activityCycle", value)}
                  />
                  &nbsp; {label}
                </label>
              ))}
            </div>
          )}

          <h3
            className={`font-semibold flex my-4 items-center ${bottomBorder(
              !expandedCategories.climate
            )}`}
            onClick={() => toggleCategory("climate")}
          >
            Climate &nbsp;{" "}
            {
              <div
                className={`chevron ${
                  !expandedCategories.climate ? "rotateChevron" : ""
                }`}
              >
                {chevronIcon}
              </div>
            }
          </h3>
          {expandedCategories.climate && (
            <div
              className={`ml-4 border-b-2 ${bottomBorder(
                expandedCategories.climate
              )}`}
            >
              {filters.climate.map(({ value, label }) => (
                <label key={value} className="m-2 flex">
                  <input
                    type="checkbox"
                    value={value}
                    checked={selectedFilters.climate.includes(value)}
                    onChange={() => handleFilterChange("climate", value)}
                  />
                  &nbsp; {label}
                </label>
              ))}
            </div>
          )}
          <h3
            className={`font-semibold mt-4 flex items-center ${bottomBorder(
              !expandedCategories.terrain
            )}`}
            onClick={() => toggleCategory("terrain")}
          >
            Terrain &nbsp;{" "}
            {
              <div
                className={`chevron ${
                  !expandedCategories.terrain ? "rotateChevron" : ""
                }`}
              >
                {chevronIcon}
              </div>
            }
          </h3>
          {expandedCategories.terrain && (
            <div
              className={`ml-4 border-b-2 ${bottomBorder(
                expandedCategories.terrain
              )}`}
            >
              {filters.terrain.map(({ value, label }) => (
                <label key={value} className="ml-4 m-2 flex">
                  <input
                    type="checkbox"
                    value={value}
                    checked={selectedFilters.terrain.includes(value)}
                    onChange={() => handleFilterChange("terrain", value)}
                  />
                  &nbsp; {label}
                </label>
              ))}
            </div>
          )}
          <h3
            className={`font-semibold my-4 flex items-center ${bottomBorder(
              !expandedCategories.planes
            )}`}
            onClick={() => toggleCategory("planes")}
          >
            Planes &nbsp;{" "}
            {
              <div
                className={`chevron ${
                  !expandedCategories.planes ? "rotateChevron" : ""
                }`}
              >
                {chevronIcon}
              </div>
            }
          </h3>
          {expandedCategories.planes && (
            <div
              className={`ml-4 mb-4 border-b-2 ${bottomBorder(
                expandedCategories.planes
              )}`}
            >
              {filters.planes.map(({ value, label }) => (
                <label key={value} className="ml-4 m-2 flex">
                  <input
                    type="checkbox"
                    value={value}
                    checked={selectedFilters.planes.includes(value)}
                    onChange={() => handleFilterChange("planes", value)}
                  />
                  &nbsp; {label}
                </label>
              ))}
            </div>
          )}

          <div>
            <button
              className="bg-violet-700 text-gray-50 tracking-wide font-semibold rounded-md m-2 px-4 py-2 active:bg-violet-900 hover:bg-violet-800"
              onClick={() => toggleResults()}
            >
              See results
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
          filterInfo={filterInfo}
          toggleResults={toggleResults}
          filteredMonsters={filteredMonsters}
        />
      )}
    </div>
  );
}
