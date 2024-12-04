import { useEffect, useState } from "react";
import PlayerSettings from "./PlayerSettings/PlayerSettings"
import OpponentSettings from "./OpponentSettings/OpponentSettings";
import './TrainingSettings.css'
import { useNavigate } from "react-router-dom";
import { Hero } from "../../../interfaces/Hero";
import EnemyProps from "../../../interfaces/Enemy";


const TrainingSettings = () => {

  const navigate = useNavigate();

  const [playerHero, setPlayerHero] = useState<Hero | null>(null);
  const [opponentHero, setOpponentHero] = useState<EnemyProps | null>(null);;



  function handleSelectHero(hero: Hero) {
    setTimeout(() => {
      setPlayerHero(hero)
    }, 500)
    
  }

  function handleSelectOpponent(enemy: EnemyProps) {
    navigate("/training-battle", { state: { hero: {...playerHero}, enemy: {...enemy} } }); // Spread to prevent reference issues
    setOpponentHero(enemy)
  }


  return (
    <>
    <div className="settings-container">

      {!playerHero && 
      <>
      <button onClick={() => navigate('/')} className="back-to-menu-bttn">Back to Main Menu</button>
      <PlayerSettings handleHero={handleSelectHero}/>
      </>}
      
        {playerHero && 
        <>
          <OpponentSettings handleEnemy={handleSelectOpponent}/>
          <div className="bttns-container">
            <button onClick={() => {
              setPlayerHero(null) 
              setOpponentHero(null)
            }}>Back</button>
          </div>
          
        </>
      }
    
    </div>
      
    </>
  )
}

export default TrainingSettings