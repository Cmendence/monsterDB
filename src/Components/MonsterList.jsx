import React from "react";
import MonsterCard from "./MonsterCard";


export default function MonsterList({monsters}) {


   return(

      <div>
      {monsters.map((monster) => {
        if (monster.monster_data.statblock) {
          let monsterKey = monster.title;
          let keysToRender = ['Activity Cycle', 'Alignment', 'Hit Dice', 'Climate/Terrain', 'Treasure'];

          return (

            <MonsterCard 
               monster={monster}
               monsterKey={monsterKey}
               keysToRender={keysToRender}
               key={monster.title}
            />
            // <div key={monster.monster_key}>
            //   {/* <h2>{monsterKey}</h2> */}
            //   {Object.entries(monster.monster_data.statblock).map(([variation, stats]) => (
            //     <div className="monster-card" key={variation}>
            //       <h3>{variation}</h3>
            //       {keysToRender.map((key) => (
            //         <p key={key}>
            //           <strong>{key}:</strong> {stats[key] || 'N/A'}
            //         </p>
            //       ))}
            //     </div>
            //   ))}
            // </div>
          );
        }
        return null; // Skip rendering if statblock is not present
      })}
    </div>
   )
}