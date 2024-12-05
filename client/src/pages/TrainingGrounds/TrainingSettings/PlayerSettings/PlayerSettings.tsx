import { useState } from "react";
import HeroCard from "../../../HeroesGallery/HeroCard/heroCard";
import { heavyStats, demonStats, ninjaStats } from '../../../../characters/heroData';
import { Navigate, useNavigate } from "react-router-dom";
import { Hero } from "../../../../interfaces/Hero";
import './PlayerSettings.css'


const heroes: Hero[] = [ heavyStats, demonStats, ninjaStats];

interface Props {
  handleHero: (hero: Hero) => void;
}
const PlayerSettings = ({handleHero} : Props) => {

  
  return (
    <>
      
      <div className="player-settings-container">
        <h1>Choose your robot</h1>
        <div className="heroes-grid">
            {heroes.map((hero) => (
              <div onClick={()=>handleHero(hero)}>
                <HeroCard key={hero.id} hero={hero} onSelect={function (hero: Hero): void {
                  throw new Error("Function not implemented.");
                } } />
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default PlayerSettings