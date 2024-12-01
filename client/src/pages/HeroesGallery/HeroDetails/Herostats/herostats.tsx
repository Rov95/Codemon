import React from 'react';

interface HeroStatsProps {
    hero: {
        image?: string;
        characterName: string;
        baseHealth: number;
        basePower: number;
        baseSpeed: number;
        baseDefense: number;
    };
}

const HeroStats: React.FC<HeroStatsProps> = ({ hero }) => {
    return (
        <div className="hero-stats">
            <img src={hero.image} alt={`${hero.characterName} icon`} className="hero-icon" />
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
