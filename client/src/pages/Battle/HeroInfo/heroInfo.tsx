import React from "react";
import './styles.css'

const HeroInfo: React.FC<{
    hero: any;
    // getHealthBarColor: (currentHealth: number, maxHealth: number) => string;
}> = ({ 
    hero, 
    // getHealthBarColor 
}) => (
    <div className="character-info hero-info">
        <p className="character-name">{hero.name}</p>
        <p>
            {hero.currentHealth} / {hero.maxHealth} HP
        </p>
    </div>
);

export default HeroInfo;
