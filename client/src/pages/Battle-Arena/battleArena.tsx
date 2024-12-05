import React, { useState } from "react";
import HeroCard from "../HeroesGallery/HeroCard/heroCard";
import { HeroStats } from "../../classes/heroStats";
import { heavyStats, demonStats, ninjaStats } from "../../characters/heroData";
import { useNavigate } from "react-router-dom";
import "./styless.css";

const heroes: HeroStats[] = [heavyStats, demonStats, ninjaStats];

const BattleArena: React.FC = () => {
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const navigate = useNavigate();

    const handleHeroSelect = (hero: HeroStats) => {
        const heroCard = document.querySelector(".hero-card-wrapper");
        heroCard?.classList.add("click");
        setTimeout(() => {
            navigate("/waiting-room", { state: { hero } });
        }, 500); // Delay to allow animation to complete
    };

    const handleNextHero = () => {
        setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroes.length);
    };

    const handlePreviousHero = () => {
        setCurrentHeroIndex((prevIndex) =>
            prevIndex === 0 ? heroes.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="battle-arena-container">
            <div className="return-div">
                <button onClick={() => navigate("/dashboard")} className="return-btn">
                    Back to Main Menu
                </button>
            </div>
            <h1 className="title">Select Your Hero</h1>
            <div className="hero-navigation">
                <button onClick={handlePreviousHero} className="nav-btn">
                    &lt;&lt;&lt;
                </button>
                <div className="hero-card-wrapper">
                    <HeroCard hero={heroes[currentHeroIndex]} onSelect={handleHeroSelect} />
                </div>
                <button onClick={handleNextHero} className="nav-btn">
                    &gt;&gt;&gt;
                </button>
            </div>
        </div>
    );
};

export default BattleArena;

