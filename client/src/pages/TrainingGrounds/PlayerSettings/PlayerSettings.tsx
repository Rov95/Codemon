import { useState } from "react";
import HeroesGallery from "../../HeroesGallery/heroesGallery";
import HeroCard from "../../HeroesGallery/HeroCard/heroCard";
import { Navigate, useNavigate } from "react-router-dom";


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
const PlayerSettings = ({handleStep} : Props) => {
  const navigate = useNavigate();

  const [playerHero, selectPlayerHero] = useState('');
  return (
    <>
      <button onClick={() => navigate('/')}>Back to Main Menu</button>
      <div>
        <p>Choose your robot</p>
        <div className="heroes-grid">
            {heroes.map((hero) => (
              <div onClick={()=>selectPlayerHero(hero.name)}>
                <HeroCard key={hero.id} hero={hero} />
              </div>
           
            ))}
        </div>
      </div>
      <button onClick={() => handleStep(1)} disabled={playerHero ? false : true}>Next</button>
      
    </>
  )
}

export default PlayerSettings