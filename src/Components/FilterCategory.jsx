import React, {useState} from "react";
import filters from "../assets/filters";


export default function FilterCategory(
   {
      category,
      expandedCategories,
      setExpandedCategories,
      selectedFilters,
      toggleCategory,
      handleFilterChange,
   }
) {

   const categoryFilters = filters[category];

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

   return(
      <div>
           <h3
       className={`font-semibold mt-4 flex items-center ${bottomBorder(
         !expandedCategories[category]
       )}`}
        onClick={() => toggleCategory(category)}
      >
        {category} &nbsp;
        <div className={`chevron ${expandedCategories[category] ? "rotateChevron" : ""}`}>
          {chevronIcon}
        </div>
      </h3>
      {expandedCategories[category] && (
        <div className={`ml-4 border-b-2 ${bottomBorder(
         expandedCategories[category]
       )}`}>
          {categoryFilters.map(({ value, label }) => (
            <label key={value} className="ml-4 m-2 flex">
              <input
                type="checkbox"
                value={value}
                checked={selectedFilters[category].includes(value)}
                onChange={() => handleFilterChange(category, value)}
              />
              &nbsp; {label}
            </label>
          ))}
        </div>
      )}
      {/* <h3
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
    )} */}
    </div>
   )
}