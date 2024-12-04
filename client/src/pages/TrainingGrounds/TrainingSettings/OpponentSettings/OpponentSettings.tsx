import React, { useState } from 'react'
import HeroCard from '../../../HeroesGallery/HeroCard/heroCard';
import { Hero } from '../../../../interfaces/Hero';
import { goblinEnemy, sargeantEnemy } from '../../../../characters/EnemyData';
import Enemy from '../../../../interfaces/Enemy';
import './OpponentSettings.css'



const enemies: Enemy[] = [ goblinEnemy, sargeantEnemy ];


interface Props {
  handleEnemy: (enemy: Enemy) => void;
}

const OpponentSettings = ({handleEnemy} : Props) => {
  return (
    <>
      <div className='opponent-settings-container'>
        <h1>Choose your opponent</h1>
        <div className="heroes-grid">
            {enemies.map((enemy) => (
            <div onClick={()=>handleEnemy(enemy)}>
              <HeroCard key={enemy.id} hero={enemy} onSelect={function (enemy: Enemy): void {
                    throw new Error('Function not implemented.');
                  } } />
            </div>
            ))}
        </div>
      </div>
      
    </>
  )
}

export default OpponentSettings