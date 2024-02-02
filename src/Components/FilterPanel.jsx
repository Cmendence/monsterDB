import React, { useState } from "react";
import Slider from "react-slider"
import MonsterCard from "./MonsterCard";
import FilterResults from "./FilterResults"

export default function FilterPanel({ monsters, selectedFilters, setSelectedFilters }) {
   // This is just an example set of filters, you can customize it based on your data
const filters = {
   climate: [

   ],
   terrain: [

   ],
   alignment: [

   ],

}

   const climateFilters = ['Temperate', 'Warm', 'Tropical'];
   const terrrainFilters= ['Plains', 'Desert', 'Subterranean', 'Swamp']
   const alignmentFilters = ['Neutral', 'Good', 'Non-evil', 'Chaotic Evil', 'Lawful evil', 'Neutral Evil', 'Chaotic Neutral']
  
   const minDice = 0;
   const maxDice= 50;

   const [diceValues, setDiceValues] = useState([minDice, maxDice])
   const [showResults, setShowResults] = useState(false)

console.log('values: ', diceValues)

   const resetFilters = () =>{
      setSelectedFilters(new Set())
      setDiceValues([minDice, maxDice])
   }

   const handleFilterChange = (filter) => {
     const updatedFilters = new Set(selectedFilters);
     if (updatedFilters.has(filter)) {
       updatedFilters.delete(filter);
     } else {
       updatedFilters.add(filter);
     }
     setSelectedFilters(updatedFilters);
     console.log(updatedFilters)
   };
 
   const toggleResults = () => {
      setShowResults(!showResults)
      window.scrollTo(0, 0)
   }

   return (
      <div className="m-4 mb-12">
        {!showResults ? (
         <div>  
      <h3 className="font-semibold">Hit Dice:</h3>
      <div className="text-sm mt-1"><span className="font-semibold">Min:</span> {diceValues[0]} <span className="font-semibold">Max:</span> {diceValues[1]} </div>
         <Slider
            onChange={setDiceValues}
            className="my-4 slider lg:w-1/3 bg-violet-400 rounded flex "
            value={diceValues}
            min={minDice}
            max={maxDice}
         />
       <h3 className="font-semibold">Climate:</h3>
       {climateFilters.map((filter) => (
         <label key={filter} className="ml-4 m-2 flex" >
           <input
             type="checkbox"
             value={filter}
             checked={selectedFilters.has(filter)}
             onChange={() => handleFilterChange(filter)}
           />
           &nbsp; {filter}
         </label>
       ))}
       <h3 className="font-semibold">Terrain:</h3>
       {terrrainFilters.map((filter) => (
         <label key={filter} className="ml-4 m-2 flex">
           <input
             type="checkbox"
             value={filter}
             checked={selectedFilters.has(filter)}
             onChange={() => handleFilterChange(filter)}
           />
          &nbsp; {filter}
         </label>
       ))}
       <h3 className="font-semibold mt-4">Alignment:</h3>
       {alignmentFilters.map((filter) => (
         <label key={filter} className="ml-4 m-2 flex">
           <input
             type="checkbox"
             value={filter}
             checked={selectedFilters.has(filter)}
             onChange={() => handleFilterChange(filter)}
           />
            &nbsp; {filter}
         </label>
       ))}
         <div>
       <button className="bg-violet-700 text-gray-50 tracking-wide font-semibold rounded-md m-2 px-4 py-2 active:bg-violet-900 hover:bg-violet-800"
               onClick={()=>toggleResults()}
       >
         See results
       </button>
       <button className="bg-gray-500 text-gray-50 tracking-wide font-semibold rounded-md m-2 px-4 py-2 active:bg-gray-900 hover:bg-gray-800"
               onClick={()=> resetFilters()}
       >
         Reset Filters


       </button>
       </div>
       </div>
        ): (
            <FilterResults 
               toggleResults={toggleResults}
               monsters={monsters}
               selectedFilters={selectedFilters}
               diceValues={diceValues}
            />

         
        )}
         
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

// import { Fragment } from "react";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/20/solid";

// const filters = {
//   price: [
//     { value: "0", label: "$0 - $25", checked: false },
//     { value: "25", label: "$25 - $50", checked: false },
//     { value: "50", label: "$50 - $75", checked: false },
//     { value: "75", label: "$75+", checked: false },
//   ],
//   color: [
//     { value: "white", label: "White", checked: false },
//     { value: "beige", label: "Beige", checked: false },
//     { value: "blue", label: "Blue", checked: true },
//     { value: "brown", label: "Brown", checked: false },
//     { value: "green", label: "Green", checked: false },
//     { value: "purple", label: "Purple", checked: false },
//   ],
//   size: [
//     { value: "xs", label: "XS", checked: false },
//     { value: "s", label: "S", checked: true },
//     { value: "m", label: "M", checked: false },
//     { value: "l", label: "L", checked: false },
//     { value: "xl", label: "XL", checked: false },
//     { value: "2xl", label: "2XL", checked: false },
//   ],
//   category: [
//     { value: "all-new-arrivals", label: "All New Arrivals", checked: false },
//     { value: "tees", label: "Tees", checked: false },
//     { value: "objects", label: "Objects", checked: false },
//     { value: "sweatshirts", label: "Sweatshirts", checked: false },
//     { value: "pants-and-shorts", label: "Pants & Shorts", checked: false },
//   ],
// };
// const sortOptions = [
//   { name: "Most Popular", href: "#", current: true },
//   { name: "Best Rating", href: "#", current: false },
//   { name: "Newest", href: "#", current: false },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Example() {
//   return (
//     <div className="bg-white">
//       {/* <div className="px-4 py-16 text-center sm:px-6 lg:px-8">
//         <h1 className="text-4xl font-bold tracking-tight text-gray-900">
//           Workspace
//         </h1>
//         <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
//           The secret to a tidy desk? Don't get rid of anything, just put it in
//           really really nice looking containers.
//         </p>
//       </div> */}

//       {/* Filters */}
//       <Disclosure
//         as="section"
//         aria-labelledby="filter-heading"
//         className="grid items-center border-b border-t border-gray-200"
//       >
//         <h2 id="filter-heading" className="sr-only">
//           Filters
//         </h2>
//         <div className="relative col-start-1 row-start-1 py-4">
//           <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
//             <div>
//               <Disclosure.Button className="group flex items-center font-medium text-gray-700">
//                 <FunnelIcon
//                   className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
//                   aria-hidden="true"
//                 />
//                 2 Filters
//               </Disclosure.Button>
//             </div>
//             <div className="pl-6">
//               <button type="button" className="text-gray-500">
//                 Clear all
//               </button>
//             </div>
//           </div>
//         </div>
//         <Disclosure.Panel className="border-t border-gray-200 py-10">
//           <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
//             <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
//               <fieldset>
//                 <legend className="block font-medium">Price</legend>
//                 <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
//                   {filters.price.map((option, optionIdx) => (
//                     <div
//                       key={option.value}
//                       className="flex items-center text-base sm:text-sm"
//                     >
//                       <input
//                         id={`price-${optionIdx}`}
//                         name="price[]"
//                         defaultValue={option.value}
//                         type="checkbox"
//                         className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                         defaultChecked={option.checked}
//                       />
//                       <label
//                         htmlFor={`price-${optionIdx}`}
//                         className="ml-3 min-w-0 flex-1 text-gray-600"
//                       >
//                         {option.label}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </fieldset>
//               <fieldset>
//                 <legend className="block font-medium">Color</legend>
//                 <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
//                   {filters.color.map((option, optionIdx) => (
//                     <div
//                       key={option.value}
//                       className="flex items-center text-base sm:text-sm"
//                     >
//                       <input
//                         id={`color-${optionIdx}`}
//                         name="color[]"
//                         defaultValue={option.value}
//                         type="checkbox"
//                         className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                         defaultChecked={option.checked}
//                       />
//                       <label
//                         htmlFor={`color-${optionIdx}`}
//                         className="ml-3 min-w-0 flex-1 text-gray-600"
//                       >
//                         {option.label}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </fieldset>
//             </div>
//             <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
//               <fieldset>
//                 <legend className="block font-medium">Size</legend>
//                 <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
//                   {filters.size.map((option, optionIdx) => (
//                     <div
//                       key={option.value}
//                       className="flex items-center text-base sm:text-sm"
//                     >
//                       <input
//                         id={`size-${optionIdx}`}
//                         name="size[]"
//                         defaultValue={option.value}
//                         type="checkbox"
//                         className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                         defaultChecked={option.checked}
//                       />
//                       <label
//                         htmlFor={`size-${optionIdx}`}
//                         className="ml-3 min-w-0 flex-1 text-gray-600"
//                       >
//                         {option.label}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </fieldset>
//               <fieldset>
//                 <legend className="block font-medium">Category</legend>
//                 <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
//                   {filters.category.map((option, optionIdx) => (
//                     <div
//                       key={option.value}
//                       className="flex items-center text-base sm:text-sm"
//                     >
//                       <input
//                         id={`category-${optionIdx}`}
//                         name="category[]"
//                         defaultValue={option.value}
//                         type="checkbox"
//                         className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                         defaultChecked={option.checked}
//                       />
//                       <label
//                         htmlFor={`category-${optionIdx}`}
//                         className="ml-3 min-w-0 flex-1 text-gray-600"
//                       >
//                         {option.label}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </fieldset>
//             </div>
//           </div>
//         </Disclosure.Panel>
//         <div className="col-start-1 row-start-1 py-4">
//           <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
//             <Menu as="div" className="relative inline-block">
//               <div className="flex">
//                 <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
//                   Sort
//                   <ChevronDownIcon
//                     className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
//                     aria-hidden="true"
//                   />
//                 </Menu.Button>
//               </div>

//               <Transition
//                 as={Fragment}
//                 enter="transition ease-out duration-100"
//                 enterFrom="transform opacity-0 scale-95"
//                 enterTo="transform opacity-100 scale-100"
//                 leave="transition ease-in duration-75"
//                 leaveFrom="transform opacity-100 scale-100"
//                 leaveTo="transform opacity-0 scale-95"
//               >
//                 <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
//                   <div className="py-1">
//                     {sortOptions.map((option) => (
//                       <Menu.Item key={option.name}>
//                         {({ active }) => (
//                           <a
//                             href={option.href}
//                             className={classNames(
//                               option.current
//                                 ? "font-medium text-gray-900"
//                                 : "text-gray-500",
//                               active ? "bg-gray-100" : "",
//                               "block px-4 py-2 text-sm"
//                             )}
//                           >
//                             {option.name}
//                           </a>
//                         )}
//                       </Menu.Item>
//                     ))}
//                   </div>
//                 </Menu.Items>
//               </Transition>
//             </Menu>
//           </div>
//         </div>
//       </Disclosure>
//     </div>
//   );
// }
