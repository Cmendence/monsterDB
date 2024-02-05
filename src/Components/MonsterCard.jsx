import React, { useState } from 'react';

 export default function MonsterCard({ monsters, keysToRender, }) {
  const [showFullCard, setShowFullCard] = useState(false);

  const cardBg = showFullCard ? 'bg-emerald-900' : 'bg-teal-800';

  const toggleFullCard = () => {
    setShowFullCard(!showFullCard);
  };

  return (
    <div
      className={`monsterCard p-4 shadow-md ${cardBg} rounded-lg mx-4 my-3 text-stone-50 cursor-pointer`}
      onClick={toggleFullCard}
    >
      <h3 className="font-semibold text-md">{monsters['Name']}</h3>
      {showFullCard ? (
        <div>
          {Object.entries(monsters).map(([key, value]) => (
            <p key={key} className="text-xs">
              <strong className="font-semibold">{key}:</strong> {value || 'N/A'}
            </p>
          ))}
        </div>
      ) : (
        <div>
          {keysToRender.map((key) => (
            <p key={key} className="text-xs">
              <strong className="font-semibold">{key}:</strong> {monsters[key] || 'N/A'}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}