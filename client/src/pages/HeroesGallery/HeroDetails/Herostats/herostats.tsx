import React from 'react';
import { Hero } from '../../../../interfaces/Hero';
import './styles.css'

interface HeroStatsProps {
    hero: Hero
}

const HeroStats: React.FC<HeroStatsProps> = ({ hero }) => {
    return (
        <div className="hero-stats">
            <div className="hero-image-container">
                <img src={hero.image} alt={`${hero.name} icon`} className="hero-icon" />
            </div>
            <div className="stats">
                <p>Health: {hero.baseHealth}</p>
                <p>Power: {hero.basePower}</p>
                <p>Speed: {hero.baseSpeed}</p>
                <p>Defense: {hero.baseDefense}</p>
            </div>
        </div>
    );
};

export default HeroStats;
