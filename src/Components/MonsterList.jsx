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
          );
        }
        return null; // Skip rendering if statblock is not present
      })}
    </div>
   )
}