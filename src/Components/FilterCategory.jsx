import React, {useState} from "react";
import filters from "../assets/filters";


export default function FilterCategory(
   {
      category,
      expandedCategories,
      selectedFilters,
      toggleCategory,
      handleFilterChange,
   }
) {

//list of filters from filters.js
   const categoryFilters = filters[category];

   //moves the bottom border from the h2 to the bottom of the filter list when the list is toggled
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
         {/* mapping over the filters */}
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
    </div>
   )
}