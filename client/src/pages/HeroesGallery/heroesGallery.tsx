import React from 'react';
import './styles.css';
import HeroCard from './HeroCard/heroCard';

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

const HeroesGallery: React.FC = () => {
    return (
        <div className="heroes-gallery-container">
        <h1>Heroes Gallery</h1>
        <div className="heroes-grid">
            {heroes.map((hero) => (
            <HeroCard key={hero.id} hero={hero} />
            ))}
        </div>
        </div>
    );
};

export default HeroesGallery;
