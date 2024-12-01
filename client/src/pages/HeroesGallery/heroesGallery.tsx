import React, { useState } from 'react';
import './styles.css';
import HeroCard from './HeroCard/heroCard';
import HeroDetails from './HeroDetails/heroDetails';
import { Hero } from '../../interfaces/Hero';

import TankImage from '../../assets/heavy.svg';
import DemonImage from '../../assets/power.svg';
import NinjaImage from '../../assets/speed.svg';

import { heavyStats, demonStats, ninjaStats } from './../../heroData';

const heroes: Hero[] = [
    { id: 1, name: 'Tank', description: 'A strong and brave fighter.', image: TankImage, stats: heavyStats },
    { id: 2, name: 'Demon', description: 'A master of magical spells.', image: DemonImage, stats: demonStats },
    { id: 3, name: 'Ninja', description: 'A sharpshooter with unparalleled accuracy.', image: NinjaImage, stats: ninjaStats },
];

const HeroesGallery: React.FC = () => {
    const [selectedHero, setSelectedHero] = useState<Hero | null>(null);;

    const handleHeroSelect = (hero: any) => {
        setSelectedHero(hero);
    };

    const handleReturn = () => {
        setSelectedHero(null);
    };

    return (
        <div className="heroes-gallery-container">
            {selectedHero ? (
                <HeroDetails hero={selectedHero.stats} onReturn={handleReturn} />
            ) : (
                <>
                    <h1>Heroes Gallery</h1>
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

