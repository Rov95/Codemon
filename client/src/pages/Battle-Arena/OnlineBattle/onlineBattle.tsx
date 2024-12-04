import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HeroStats } from "../../../classes/heroStats";
import HeroInfo from "../../Battle/HeroInfo/heroInfo";
import EnemyInfo from "../../Battle/EnemyInfo/enemyInfo";
import BattleLog from "../../Battle/BattleLog/battleLog";
import BattleActions from "../../Battle/BattleActions/battleActions";
import { socketService } from "../../../services/socketService";

const OnlineBattle: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { hero, room }: { hero: HeroStats; room: string } = location.state || {};

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

        try {
            setReconstructedHero(new HeroStats(hero));
        } catch (error) {
            console.error("Error reconstructing hero:", error);
            navigate("/battle-arena");
            return;
        }

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

    if (!reconstructedHero) {
        return <div>Loading hero and room data...</div>;
    }

    return (
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
                onHeroAttack={() => {}}
                onResetBattle={() => {}}
                onReturn={() => navigate("/battle-arena")}
            />
        </div>
    );
};

export default OnlineBattle;
