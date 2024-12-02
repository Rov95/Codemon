import React from "react";
import './styless.css';

const BattleActions: React.FC<{
    isBattleOver: boolean;
    winner: string | null;
    currentTurn: "Hero" | "Enemy";
    heroSkills: any[];
    onHeroAttack: (skill: any) => void;
    onResetBattle: () => void;
    onReturn: () => void;
}> = ({
    isBattleOver,
    winner,
    currentTurn,
    heroSkills,
    onHeroAttack,
    onResetBattle,
    onReturn,
}) => (
    <div className="actions">
        {isBattleOver ? (
            <div>
                <h2>{winner} Wins!</h2>
                <button onClick={onResetBattle} className="action-button">
                    Restart
                </button>
                <button onClick={onReturn} className="return-button">
                    Return to Heroes
                </button>
            </div>
        ) : (
            <>
                <p>Current Turn: {currentTurn}</p>
                {currentTurn === "Hero" && (
                    <div className="actions-grid">
                        {heroSkills.map((skill) => (
                            <button
                                key={skill.skillName}
                                onClick={() => onHeroAttack(skill)}
                                className="action-button"
                            >
                                {skill.skillName}
                            </button>
                        ))}
                    </div>
                )}
            </>
        )}
    </div>
);

export default BattleActions;

