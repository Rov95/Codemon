import React, { useState } from 'react';
import './styles.css';
import HeroCard from './HeroCard/heroCard';
import HeroDetails from './HeroDetails/heroDetails';
import { Hero } from '../../interfaces/Hero';

import { heavyStats, demonStats, ninjaStats } from '../../characters/heroData';
import { useNavigate } from 'react-router-dom';

const heroes: Hero[] = [ heavyStats, demonStats, ninjaStats];

heroes.forEach(hero => {
    if (!hero.id || !hero.name || !hero.defaultSkills) {
        console.error("Invalid hero data:", hero);
    }
});

const HeroesGallery: React.FC = () => {
    const navigate = useNavigate();
    const [selectedHero, setSelectedHero] = useState<Hero | null>(null);;

    const handleHeroSelect = (hero: Hero) => {
        setSelectedHero(hero);
    };

    const handleReturn = () => {
        setSelectedHero(null);
    };

    return (
        <div className="heroes-gallery-container">
            {selectedHero ? (
                <HeroDetails hero={ selectedHero } onReturn={handleReturn} />
            ) : (
                <>
                    <div className='return-div'>
                        <button onClick={() => navigate('/')} className='return-btn'>Back to Main Menu</button>
                    </div>
                    
                    <h1>Select your Hero</h1>
                    <div className="heroes-grid">
                        {heroes.map((hero) => (
                            <HeroCard key={hero.id} hero={hero} onSelect={handleHeroSelect} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default HeroesGallery;

