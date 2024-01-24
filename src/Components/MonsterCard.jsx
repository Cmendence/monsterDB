import React from 'react';

export default function MonsterCard({ monster, keysToRender, monsterKey }) {
  const variations = Object.keys(monster.monster_data.statblock);
  const isMultipleVariations = variations.length > 1;

  return (
    <div className=''>
      {variations.map((variation, index) => (
        <div className="border-2 p-4 border-teal-700 rounded-lg mx-4 my-2" key={variation}>
          {isMultipleVariations && (
            <h2 className='font-semibold text-md'>{monsterKey} -</h2>
          )}
          <h3 className={`font-semibold ${isMultipleVariations ? 'text-sm' : 'text-md'}`}>{variation}</h3>
          {keysToRender.map((key) => (
            <p key={key} className='text-xs'>
              <strong className='font-semibold'>{key}:</strong> {monster.monster_data.statblock[variation][key] || 'N/A'}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
//    const variations = Object.keys(monster.monster_data.statblock);

//    return (
//      <div className=''>
//        {variations.map((variation, index) => (
//          <div className="border-2 p-4 border-teal-700 rounded-lg m-2" key={variation}>
//            {variations.length > 1 && index === 0 && (
//              <h2 className='uppercase font-semibold text-lg'>{monsterKey}</h2>
//            )}
//            <h3 className='font-semibold text-sm'>{variation}</h3>
//            {keysToRender.map((key) => (
//              <p key={key} className='text-xs'>
//                <strong className='font-semibold'>{key}:</strong> {monster.monster_data.statblock[variation][key] || 'N/A'}
//              </p>
//            ))}
//          </div>
//        ))}
//      </div>
//    );
//  }

   // return (
   //   <div className=''>
   //     {Object.entries(monster.monster_data.statblock).map(([variation, stats]) => (
   //        <div className=" border-2 p-4 border-teal-700 rounded-lg m-2 " key={variation}>
   //           <h2 className='uppercase font-semibold text-lg '>{monsterKey}</h2>
   //         <h3 className='font-semibold text-sm'>{variation}</h3>
   //         {keysToRender.map((key) => (
   //           <p key={key}
   //              className='text-xs'             
   //           >
   //             <strong className='font-semibold'>{key}:</strong> {stats[key] || 'N/A'}
   //           </p>
   //         ))}
   //       </div>
   //     ))}
   //   </div>
   // );
