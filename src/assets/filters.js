const filters = {
   Activity: [
      { value: "any", label: "Any" },
      { value: "day", label: "Day" },
      { value: "night", label: "Night" },
    ],
   Climate: [
     { value: "subarctic", label: "Subarctic" },
     { value: "arctic", label: "Arctic" },
     { value: "cold", label: "Cold" },
     { value: "temperate", label: "Temperate" },
     { value: "warm", label: "Warm" },
     { value: "tropical", label: "Tropical" },
     { value: "subtropical", label: "Subtropical" },
   ],
   Terrain: [
     { value: "desert", label: "Desert" },
     { value: "forest", label: "Forest" },
     { value: "hill", label: "Hills" },
     { value: "mountain", label: "Mountains" },
     { value: "jungle", label: "Jungle" },
     { value: "plains", label: "Plains" },
     { value: "subterranean", label: "Subterranean" },
     { value: "swamp", label: "Swamp" },
     { value: "marsh", label: "Marsh" },
     { value: "water", label: "Water" },
     { value: "ocean", label: "Ocean" },
     { value: "sea", label: "Sea" },
     { value: "coast", label: "Coast" },
   ],
   Plane: [
     { value: "astral", label: "Astral" },
     { value: "ethereal", label: "Ethereal" },
     { value: "air", label: "Plane of Air" },
     { value: "earth", label: "Plane of Earth" },
     { value: "fire", label: "Plane of Fire" },
     { value: "water", label: "Plane of Water" },
     { value: "lower", label: "Lower Planes" },
     { value: "shadow", label: "Shadow Planes" },
   ],

   Movement: [
     { value: "fl", label: "Flying" },
     { value: "sw", label: "Swimming" },
     { value: "br", label: "Burrowing" },
   ],
   Frequency: [
     { value: "common", label: "Common" },
     { value: "uncommon", label: "Uncommon" },
     { value: "rare", label: "Rare" },
     { value: "very rare", label: "Very Rare" },
   ],
   // World: [
   //    {value: "athas", label: "Athas"},
   //    {value: "ravenloft", label: "Ravenloft"},
   // ]
 };

 export default filters