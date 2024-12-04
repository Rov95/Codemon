import React, { useState } from "react";
import HeroCard from "../HeroesGallery/HeroCard/heroCard";
import { Hero } from "../../interfaces/Hero";
import { heavyStats, demonStats, ninjaStats } from "../../characters/heroData";
import { useNavigate } from "react-router-dom";
import "./styless.css";

const heroes: Hero[] = [heavyStats, demonStats, ninjaStats];

const BattleArena: React.FC = () => {
    const navigate = useNavigate();
    const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

    const handleHeroSelect = (hero: Hero) => {
        setSelectedHero(hero);
        navigate("/waiting-room", { state: { hero } });
    };

    return (
        <div className="Battle-Arena-container">
            <div className="return-div">
                <button onClick={() => navigate("/dashboard")} className="return-btn">
                    Back to Main Menu
                </button>
            </div>
            <h1>Select your Hero</h1>
            <div className="heroes-grid">
                {heroes.map((hero) => (
                    <HeroCard key={hero.id} hero={hero} onSelect={handleHeroSelect} />
                ))}
            </div>
        </div>
    );
};

export default BattleArena;
