import React from 'react';

export default function MonsterCard({ monster, keysToRender, monsterKey }) {
  const variations = Object.keys(monster.monster_data.statblock);
  const isMultipleVariations = variations.length > 1;

  return (
    <div className=''>
      {variations.map((variation, index) => (
        <div className="border-2 p-4 shadow-md border-teal-800 bg-teal-800 rounded-lg mx-4 my-3 text-stone-50" key={variation}>
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
