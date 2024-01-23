import React, { useState } from "react";
import MonsterCard from "./MonsterCard";

export default function FilterPanel({ monsters }) {
   // This is just an example set of filters, you can customize it based on your data
   const climateFilters = ['Temperate', 'Warm', 'Tropical'];
   const terrrainFilters= ['Plains', 'Desert', 'Subterranean', 'Swamp']
 
   const [selectedFilters, setSelectedFilters] = useState(new Set());
 
   const handleFilterChange = (filter) => {
     const updatedFilters = new Set(selectedFilters);
     if (updatedFilters.has(filter)) {
       updatedFilters.delete(filter);
     } else {
       updatedFilters.add(filter);
     }
     setSelectedFilters(updatedFilters);
   };
 
   return (
     <div>
       <h3>Climate Filters:</h3>
       {climateFilters.map((filter) => (
         <label key={filter}>
           <input
             type="checkbox"
             value={filter}
             checked={selectedFilters.has(filter)}
             onChange={() => handleFilterChange(filter)}
           />
           {filter}
         </label>
       ))}
     </div>
   );
 }

// export default function FilterPanel({ monsters }) {
//   const [selectedFilters, setSelectedFilters] = useState(new Set());

//   const handleFilterChange = (filter) => {
//     const updatedFilters = new Set(selectedFilters);
//     if (updatedFilters.has(filter)) {
//       updatedFilters.delete(filter);
//     } else {
//       updatedFilters.add(filter);
//     }
//     setSelectedFilters(updatedFilters);
//   };

//   const filteredMonsters = monsters.filter((monster) => {
//    const { statblock } = monster.monster_data;
 
//    if (statblock && Object.keys(statblock).length > 0) {
//      const firstStatblockKey = Object.keys(statblock)[0];
//      const monsterClimateTerrain = statblock[firstStatblockKey]["Climate/Terrain"];
 
//      return selectedFilters.size === 0 || selectedFilters.has(monsterClimateTerrain);
//    }
 
//    return false;
//  });
 
 

//   const keysToRender = ['Activity Cycle', 'Alignment', 'Hit Dice', 'Climate/Terrain', 'Treasure'];

//   return (
//     <div>
//       {/* Filters */}
//       <div>
//         <h3>Climate/Terrain Filters:</h3>
//         {Array.from(new Set(monsters.map((monster) => monster.monster_data.statblock[Object.keys(monster.monster_data.statblock)[0]]["Climate/Terrain"]))).map((filter) => (
//           <label key={filter}>
//             <input
//               type="checkbox"
//               value={filter}
//               checked={selectedFilters.has(filter)}
//               onChange={() => handleFilterChange(filter)}
//             />
//             {filter}
//           </label>
//         ))}
//       </div>

//       {/* Monster Cards */}
//       {filteredMonsters.map((monster) => (
//         <MonsterCard key={monster.title} monster={monster} keysToRender={keysToRender} />
//       ))}
//     </div>
//   );
// }
