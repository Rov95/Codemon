import React from 'react';
import './styles.css';

interface Hero {
    id: number;
    name: string;
    description: string;
    image: string;
}

const HeroCard: React.FC<{ hero: Hero }> = ({ hero }) => {
    return (
        <div className="hero-card">
        <img src={hero.image} alt={hero.name} className="hero-image" />
        <h2 className="hero-name">{hero.name}</h2>
        <p className="hero-description">{hero.description}</p>
        </div>
    );
};

export default HeroCard;
