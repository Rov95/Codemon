import React, { useState } from 'react'
import HeroCard from '../../HeroesGallery/HeroCard/heroCard';


const heroes = [
  { 
      id: 1, name: 'Tank', 
      description: 'A strong and brave fighter.', 
      image: '/assets/heavy.png' 
  },
  { 
      id: 2, name: 'Demon', 
      description: 'A master of magical spells.', 
      image: '/assets/mage.png' 
  },
  { 
      id: 3, name: 'Ninja', 
      description: 'A sharpshooter with unparalleled accuracy.', 
      image: '/assets/archer.png' 
  },
];
interface Props {
  handleStep: (step: number) => void;
}
const OpponentSettings = ({handleStep} : Props) => {

  const [opponentHero, selectOpponentHero] = useState('');
  return (
    <>
      <div>
        <p>Choose your opponent</p>
        <div className="heroes-grid">
            {heroes.map((hero) => (
            <div onClick={()=>selectOpponentHero(hero.name)}>
            <HeroCard key={hero.id} hero={hero} />
          </div>
            ))}
        </div>
      </div>
      <button onClick={() => handleStep(0)}>Back</button>
      <button onClick={() => handleStep(2)} disabled={opponentHero ? false : true}>Next</button>
    </>
  )
}

export default OpponentSettings