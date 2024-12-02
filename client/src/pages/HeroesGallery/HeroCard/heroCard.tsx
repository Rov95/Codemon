import React, {useState} from 'react';
import './styles.css';
import { Hero } from '../../../interfaces/Hero';

interface HeroCardProps {
    hero: Hero;
    onSelect: (hero: Hero) => void;
}

const HeroCard: React.FC< HeroCardProps > = ({ hero, onSelect }) => {
    
    const [clicked, setClicked] = useState(false);

    const handleCardClick = () => {
        setClicked(true);
        setTimeout(() => {
            setClicked(false); 
            onSelect(hero)
        }, 500); 
    };

    return (
        <div
            className={`hero-card ${clicked ? 'clicked' : ''}`}
            onClick={handleCardClick}
        >
        <img src={hero.image} alt={hero.name} className="hero-image" />
        <h2 className="hero-name">{hero.name}</h2>
        <p className="hero-description">{hero.description}</p>
        </div>
    );
};

export default HeroCard;
