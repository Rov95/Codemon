import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HeroStats } from "../../../classes/heroStats";
import HeroInfo from "../../Battle/HeroInfo/heroInfo";
import EnemyInfo from "../../Battle/EnemyInfo/enemyInfo";
import BattleLog from "../../Battle/BattleLog/battleLog";
import BattleActions from "../../Battle/BattleActions/battleActions";
import { socketService } from "../../../services/socketService";
import { Skill } from "../../../interfaces/Skills";
import './styles.css'

const OnlineBattle: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { hero, room }: { hero: HeroStats; room: string } = location.state || {};

    const healthBarColors = ["#4caf50", "#ffa500", "#ff0000"]; // Green, Orange, Red

    const getHealthBarColor = (currentHealth: number, maxHealth: number) => {
        const healthBars = healthBarColors.length;
        const healthPerBar = maxHealth / healthBars;
        const index = Math.floor((maxHealth - currentHealth) / healthPerBar);
        return healthBarColors[Math.min(index, healthBars - 1)];
    };

    const [reconstructedHero, setReconstructedHero] = useState<HeroStats | null>(null);
    const [opponentHero, setOpponentHero] = useState<HeroStats | null>(null);
    const [battleLog, setBattleLog] = useState<string[]>([]);
    const [isMyTurn, setIsMyTurn] = useState(false);
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

        socketService.on("match_ready", () => {
            socketService.sendHeroInfo(room, hero);
            //who goes first is random, 
            //we should add animations for this
            const firstTurn = Math.random() < 0.5 ? "Hero" : "Enemy";
            setCurrentTurn(firstTurn);
            setIsMyTurn(firstTurn === "Hero");
        });

        socketService.onGameUpdate(({ action }) => {
            // Handle opponent's action
            setBattleLog((prev) => [...prev, action.log]);
            setOpponentHero((prev) => {
                if (!prev) return null;
                const updatedHero = new HeroStats(prev);
                if (action.type === 'attack') {
                    updatedHero.takeDamage(action.damage);
                }
                return updatedHero;
            });
            
            // Switch turns
            setCurrentTurn("Hero");
            setIsMyTurn(true);
        });

        socketService.onReceiveHeroInfo((receivedHero) => {
            setOpponentHero(new HeroStats(receivedHero));
        });

        socketService.on("update_game", ({ action }) => {
            setBattleLog((prev) => [...prev, action.log]);
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

    const handleHeroAttack = (skill: Skill) => {
        if (!isMyTurn || !reconstructedHero || !opponentHero) return;

        // Calculate damage based on the skill and hero's current power
        const damage = Math.max(0, Math.floor(reconstructedHero.currentPower * 0.5));
        
        const action = {
            type: 'attack',
            log: `${reconstructedHero.name} used ${skill.skillName} for ${damage} damage!`,
            damage,
            skillName: skill.skillName
        };

        // Send action to opponent
        socketService.sendGameAction(room, action);

        // Update local battle log and switch turn
        setBattleLog((prev) => [...prev, action.log]);
        setCurrentTurn("Enemy");
        setIsMyTurn(false);

        // Optionally, check if opponent is defeated
        if (!opponentHero.takeDamage(damage)) {
            setIsBattleOver(true);
            setWinner(reconstructedHero.name);
        }
    };

    if (!reconstructedHero) {
        return <div>Loading hero and room data...</div>;
    }

    return (
        <div className="battle-container">
            <div className="character-images">
                <div className="hero-container">
                    <HeroInfo hero={reconstructedHero} />
                    <img src={reconstructedHero.image} alt="Hero" className="character-image hero-image" />
                <div
                    className="health-bar"
                    style={{
                        width: `${(hero.currentHealth / hero.maxHealth) * 100}%`,
                        backgroundColor: getHealthBarColor(hero.currentHealth, hero.maxHealth),
                    }}
                ></div>
                </div>
                {opponentHero && (
                    <div className="enemy-container">
                        <EnemyInfo enemy={opponentHero} />
                        <img src={opponentHero.image} alt="Enemy" className="character-image enemy-image" />
                        <div
                        className="health-bar"
                        style={{
                            width: `${(opponentHero.currentHealth / opponentHero.maxHealth) * 100}%`,
                            backgroundColor: getHealthBarColor(opponentHero.currentHealth, opponentHero.maxHealth),
                        }}
                    ></div>
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
                onReturn={() => navigate("/battle-arena")}
            />
        </div>
    );
};

export default OnlineBattle;
