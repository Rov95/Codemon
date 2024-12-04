import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeroStats, HeroStatsProps } from "../../../classes/heroStats";
import HeroInfo from "../../Battle/HeroInfo/heroInfo";
import EnemyInfo from "../../Battle/EnemyInfo/enemyInfo";
import BattleLog from "../../Battle/BattleLog/battleLog";
import BattleActions from "../../Battle/BattleActions/battleActions";
import { socketService } from "../../../services/socketService";

interface OnlineBattleProps {
    hero: HeroStatsProps | null | undefined; // Handle raw or invalid hero data
    room: string | null | undefined; // Handle invalid room data
}

const OnlineBattle: React.FC<OnlineBattleProps> = ({ hero, room }) => {
    const navigate = useNavigate();

    // Debug: Log incoming props
    console.log("OnlineBattle Props:", { hero, room });

    // Validate and reconstruct hero
    const [reconstructedHero, setReconstructedHero] = useState<HeroStats | null>(null);
    const [enemy, setEnemy] = useState<HeroStats | null>(null);
    const [battleLog, setBattleLog] = useState<string[]>([]);
    const [currentTurn, setCurrentTurn] = useState<"Hero" | "Enemy">("Hero");
    const [isBattleOver, setIsBattleOver] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);

    useEffect(() => {
        if (!hero || !room) {
            console.error("Missing hero or room data:", { hero, room });
            navigate("/battle-arena");
            return;
        }

        // Reconstruct hero and validate required properties
        try {
            const constructedHero = new HeroStats(hero);
            setReconstructedHero(constructedHero);
            console.log("Reconstructed Hero:", constructedHero);
        } catch (error) {
            console.error("Failed to reconstruct hero:", error);
            navigate("/battle-arena");
            return;
        }

        // Connect to the server and join the room
        socketService.connect("http://localhost:3000");
        socketService.emit("join_match", { room });

        socketService.on("update_game", ({ action }) => {
            setBattleLog((prev) => [...prev, action.log]);
            setEnemy(action.enemy);
            setCurrentTurn(action.nextTurn || "Hero");
        });

        socketService.on("player_disconnected", () => {
            setBattleLog((prev) => [...prev, "Opponent disconnected. You win!"]);
            setWinner(reconstructedHero?.name || "Hero");
            setIsBattleOver(true);
        });

        return () => {
            socketService.disconnect();
        };
    }, [hero, room, navigate]);

    const handleHeroAttack = (skill: any) => {
        if (isBattleOver || currentTurn !== "Hero") return;

        const actionLog = `${reconstructedHero?.name} used ${skill.skillName}!`;
        setBattleLog((prev) => [...prev, actionLog]);

        socketService.emit("game_action", {
            room,
            action: {
                hero: reconstructedHero,
                skill,
                log: actionLog,
                nextTurn: "Enemy",
            },
        });

        setCurrentTurn("Enemy");
    };

    const handleReturn = () => {
        socketService.disconnect();
        navigate("/battle-arena");
    };

    return reconstructedHero ? (
        <div className="battle-container">
            <div className="character-images">
                <div className="hero-container">
                    <HeroInfo hero={reconstructedHero} />
                    <img src={reconstructedHero.image} alt="Hero" className="character-image hero-image" />
                </div>
                {enemy && (
                    <div className="enemy-container">
                        <EnemyInfo enemy={enemy} />
                        <img src={enemy.image} alt="Enemy" className="character-image enemy-image" />
                    </div>
                )}
            </div>
            <BattleLog battleLog={battleLog} />
            <BattleActions
                isBattleOver={isBattleOver}
                winner={winner}
                currentTurn={currentTurn}
                heroSkills={reconstructedHero.defaultSkills || []}
                onHeroAttack={handleHeroAttack}
                onResetBattle={() => {}}
                onReturn={handleReturn}
            />
        </div>
    ) : (
        <div>
            <p>Loading hero and room data...</p>
        </div>
    );
};

export default OnlineBattle;
