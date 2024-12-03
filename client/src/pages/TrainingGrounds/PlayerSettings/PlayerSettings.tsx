import { useState } from "react";
import HeroCard from "../../HeroesGallery/HeroCard/heroCard";
import { heavyStats, demonStats, ninjaStats } from '../../../characters/heroData';
import { Navigate, useNavigate } from "react-router-dom";
import { Hero } from "../../../interfaces/Hero";


const heroes: Hero[] = [ heavyStats, demonStats, ninjaStats];

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
                <HeroCard key={hero.id} hero={hero} onSelect={function (hero: Hero): void {
                  throw new Error("Function not implemented.");
                } } />
              </div>
            ))}
        </div>
      </div>
      <button onClick={() => handleStep(1)} disabled={playerHero ? false : true}>Next</button>
      
    </>
  )
}

export default PlayerSettings