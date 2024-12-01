import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Battle } from "../../clases/battle";
import { goblinEnemy } from "../../characters/EnemyData";
import "./styles.css";

const BattleComponent: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { hero } = location.state || {};

    if (!hero) {
        return <div>No hero selected for battle.</div>;
    }

    const [battleLog, setBattleLog] = useState<string[]>([]);
    const [battle] = useState(new Battle(hero, goblinEnemy));
    const [isBattleOver, setIsBattleOver] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);

    const handleHeroAttack = (skill: any) => {
        const heroTurnLog = battle.heroAttack(skill);
        setBattleLog((prev) => [...prev, heroTurnLog]);

        if (battle.isBattleOver()) {
            setWinner(hero.currentHealth > 0 ? hero.characterName : goblinEnemy.name);
            setIsBattleOver(true);
            return;
        }

        const enemyTurnLog = battle.enemyAttack();
        setBattleLog((prev) => [...prev, enemyTurnLog]);

        if (battle.isBattleOver()) {
            setWinner(hero.currentHealth > 0 ? hero.characterName : goblinEnemy.name);
            setIsBattleOver(true);
        }
    };

    const handleReturn = () => {
        navigate("/heroes-gallery");
    };

    return (
        <div className="battle-container">
            <div className="battle-screen">
                <div className="character-info hero-info">
                    <p className="character-name">{hero.characterName}</p>
                    <div className="health-bar">
                        <div
                            className="health-bar-fill"
                            style={{ width: `${(hero.currentHealth / hero.maxHealth) * 100}%` }}
                        ></div>
                    </div>
                    <p>{hero.currentHealth} / {hero.maxHealth} HP</p>
                </div>
                <div className="character-info enemy-info">
                    <p className="character-name">{goblinEnemy.name}</p>
                    <div className="health-bar">
                        <div
                            className="health-bar-fill"
                            style={{ width: `${(goblinEnemy.currentHealth / goblinEnemy.maxHealth) * 100}%` }}
                        ></div>
                    </div>
                    <p>{goblinEnemy.currentHealth} / {goblinEnemy.maxHealth} HP</p>
                </div>
            </div>

            <div className="battle-log">
                <h3>Battle Log</h3>
                <div className="log-content">
                    {battleLog.map((log, index) => (
                        <p key={index}>{log}</p>
                    ))}
                </div>
            </div>

            <div className="actions">
                {isBattleOver ? (
                    <div>
                        <h2>{winner} Wins!</h2>
                        <button onClick={handleReturn} className="return-button">Return to Heroes</button>
                    </div>
                ) : (
                    hero.defaultSkills.map((skill: any) => (
                        <button
                            key={skill.skillName}
                            onClick={() => handleHeroAttack(skill)}
                            className="action-button"
                        >
                            {skill.skillName}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export default BattleComponent;
