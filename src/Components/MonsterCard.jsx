import React from 'react'



export default function MonsterCard({ monster, keysToRender, monsterKey }) {
   return (
     <div className='flex flex-col'>
         <div>
        <h2 className='uppercase font-semibold text-xl ml-8'>{monsterKey}</h2>
        </div>
       {Object.entries(monster.monster_data.statblock).map(([variation, stats]) => (
          <div className="border border-2 p-4 border-gray-300 rounded-lg m-2 w-1/4 items-start" key={variation}>
           <h3 className='font-semibold text-lg'>{variation}</h3>
           {keysToRender.map((key) => (
             <p key={key}
                className='text-sm'             
             >
               <strong className='font-semibold'>{key}:</strong> {stats[key] || 'N/A'}
             </p>
           ))}
         </div>
       ))}
     </div>
   );
 }

// export default function MonsterCard({ monster, monsterKey, keysToRender }) 
// {
//    return (

      
//      <div key={monster.monster_key}>
//        {/* <h2>{monsterKey}</h2> */}
//        {Object.entries(monster.monster_data.statblock).map(([variation, stats]) => (
//          <div className="monster-card" key={variation}>
//            <h3>{variation}</h3>
//            {keysToRender.map((key) => (
//              <p key={key}>
//                <strong>{key}:</strong> {stats[key] || 'N/A'}
//              </p>
//            ))}
//          </div>
//        ))}
//      </div>
//    );
//  }