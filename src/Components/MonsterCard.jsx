// import React, { useState } from 'react';

// export default function MonsterCard({ monster, keysToRender, monsterKey }) {
//   const variations = Object.keys(monster.monster_data.statblock);
//   const isMultipleVariations = variations.length > 1;

//   const [showFullCard, setShowFullCard] = useState(false)

//  const toggleFullCard = () => {
//    setShowFullCard(!showFullCard)
//  }

//   return (
//     <div className=''>
//       {variations.map((variation, index) => (
//         <div className="border-2 p-4 shadow-md border-teal-800 bg-teal-800 rounded-lg mx-4 my-3 text-stone-50" key={variation}>
//           {isMultipleVariations && (
//             <h2 className='font-semibold text-md'>{monsterKey} -</h2>
//           )}
//           <h3 className={`font-semibold ${isMultipleVariations ? 'text-sm' : 'text-md'}`}>{variation}</h3>
//           {keysToRender.map((key) => (
//             <p key={key} className='text-xs'>
//               <strong className='font-semibold'>{key}:</strong> {monster.monster_data.statblock[variation][key] || 'N/A'}
//             </p>
//           ))}
//         </div>
//       ))}
//     </div>

//    <div
//    className="border-2 p-4 shadow-md border-teal-800 bg-teal-800 rounded-lg mx-4 my-3 text-stone-50 cursor-pointer"
//    onClick={toggleFullCard}
//  >
//    {variations.map((variation, index) => (
//      <div key={variation}>
//        {isMultipleVariations && (
//          <h2 className="font-semibold text-md">{monsterKey} -</h2>
//        )}
//        <h3 className={`font-semibold ${isMultipleVariations ? 'text-sm' : 'text-md'}`}>{variation}</h3>
//        {showFullCard && (
//          <div>
//            {Object.keys(monster.monster_data.statblock[variation]).map((key) => (
//              <p key={key} className="text-xs">
//                <strong className="font-semibold">{key}:</strong> {monster.monster_data.statblock[variation][key] || 'N/A'}
//              </p>
//            ))}
//          </div>
//        )}
//      </div>
//    ))}
//  </div>


//   );
// } 


import React, { useState } from 'react';

export default function MonsterCard({ monster, keysToRender, monsterKey }) {
  const variations = Object.keys(monster.monster_data.statblock);
  const isMultipleVariations = variations.length > 1;

  return (
    <div className="">
      {variations.map((variation, index) => (
        <MonsterCardVariation
          key={index}
          monster={monster}
          monsterKey={isMultipleVariations ? monsterKey : null}
          variation={variation}
          keysToRender={keysToRender}
        />
      ))}
    </div>
  );
}

function MonsterCardVariation({ monster, monsterKey, variation, keysToRender }) {
  const [showFullCard, setShowFullCard] = useState(false);

  const handleClick = () => {
    setShowFullCard(!showFullCard);
  };

  return (
    <div
      className="border-2 p-4 shadow-md border-teal-800 bg-teal-800 rounded-lg mx-4 my-3 text-stone-50 cursor-pointer"
      onClick={handleClick}
    >
      {monsterKey && <h2 className="font-semibold text-md">{monsterKey} -</h2>}
      <h3 className="font-semibold text-md">{variation}</h3>
      {showFullCard ? (
        <div>
          {Object.keys(monster.monster_data.statblock[variation]).map((key) => (
            <p key={key} className="text-xs">
              <strong className="font-semibold">{key}:</strong> {monster.monster_data.statblock[variation][key] || 'N/A'}
            </p>
          ))}
        </div>
      ) : (
        <div>
          {keysToRender.map((key) => (
            <p key={key} className="text-xs">
              <strong className="font-semibold">{key}:</strong> {monster.monster_data.statblock[variation][key] || 'N/A'}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}