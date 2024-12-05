import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Battle } from "../../classes/battle";
import { goblinEnemy } from "../../characters/EnemyData";
import { HeroStats } from "../../classes/heroStats";
import HeroInfo from "./HeroInfo/heroInfo";
import EnemyInfo from "./EnemyInfo/enemyInfo";
import BattleLog from "./BattleLog/battleLog";
import BattleActions from "./BattleActions/battleActions";
import "./styles.css";

const BattleComponent: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { hero: rawHero } = location.state || {};

    if (!rawHero) {
        console.error("No hero found in location.state. Ensure it is passed correctly.");
        return <div>No hero selected for battle.</div>;
    }

    const healthBarColors = ["#4caf50", "#ffa500", "#ff0000"]; // Green, Orange, Red

    const getHealthBarColor = (currentHealth: number, maxHealth: number) => {
        const healthBars = healthBarColors.length;
        const healthPerBar = maxHealth / healthBars;
        const index = Math.floor((maxHealth - currentHealth) / healthPerBar);
        return healthBarColors[Math.min(index, healthBars - 1)];
    };

    const [hero, setHero] = useState(() => new HeroStats(rawHero));
    const [enemy, setEnemy] = useState(() => goblinEnemy.clone());
    const [battle, setBattle] = useState(() => new Battle(hero, enemy));
    const [battleLog, setBattleLog] = useState<string[]>([]);
    const [isBattleOver, setIsBattleOver] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);
    const [currentTurn, setCurrentTurn] = useState<"Hero" | "Enemy">("Hero");
    const [shakeHero, setShakeHero] = useState(false);
    const [shakeEnemy, setShakeEnemy] = useState(false);

    useEffect(() => {
        if (battle.isBattleOver()) finalizeBattle();
    }, [battle]);

    const handleHeroAttack = (skill: any) => {
        if (isBattleOver) return;

        const heroTurnLog = battle.heroAttack(skill);
        setBattleLog((prev) => [...prev, `Hero's Turn: ${heroTurnLog}`]);
        setShakeEnemy(true);
        setTimeout(() => setShakeEnemy(false), 500);

        setHero(battle.hero);
        setEnemy(battle.enemy);

        if (battle.isBattleOver()) {
            finalizeBattle();
            return;
        }

        setCurrentTurn("Enemy");
        setTimeout(() => {
            const enemyTurnLog = battle.enemyAttack();
            setBattleLog((prev) => [...prev, `Enemy's Turn: ${enemyTurnLog}`]);
            setShakeHero(true);
            setTimeout(() => setShakeHero(false), 500);

            setHero(battle.hero);
            setEnemy(battle.enemy);

            if (battle.isBattleOver()) {
                finalizeBattle();
                return;
            }

            setCurrentTurn("Hero");
        }, 1000);
    };

    const finalizeBattle = () => {
        const battleWinner = hero.currentHealth <= 0 ? enemy.name : hero.name;
        setWinner(battleWinner);
        setIsBattleOver(true);
    };

    const resetBattle = () => {
        const newEnemy = goblinEnemy.clone();
        setEnemy(newEnemy);
        setHero(new HeroStats(rawHero));
        setBattle(new Battle(new HeroStats(rawHero), newEnemy));
        setBattleLog([]);
        setIsBattleOver(false);
        setWinner(null);
        setCurrentTurn("Hero");
    };

    const handleReturn = () => {
        resetBattle();
        navigate("/heroes-gallery");
    };

    return (
        <div className="battle-container">
            <div className="character-images">
                <div className="hero-container">
                    <HeroInfo hero={hero} /*getHealthBarColor={getHealthBarColor}*/ />
                    <img
                        src={hero.image}
                        alt="Hero"
                        className={`character-image hero-image ${shakeHero ? "shake" : ""}`}
                    />
                    <div
                        className="health-bar"
                        style={{
                            width: `${(hero.currentHealth / hero.maxHealth) * 100}%`,
                            backgroundColor: getHealthBarColor(hero.currentHealth, hero.maxHealth),
                        }}
                    ></div>
                </div>
                <div className="enemy-container">
                    <EnemyInfo enemy={enemy} />
                    <img
                        src={enemy.image}
                        alt="Enemy"
                        className={`character-image enemy-image ${shakeEnemy ? "shake" : ""}`}
                    />
                    <div
                        className="health-bar"
                        style={{
                            width: `${(enemy.currentHealth / enemy.maxHealth) * 100}%`,
                            backgroundColor: getHealthBarColor(enemy.currentHealth, enemy.maxHealth),
                        }}
                    ></div>
                </div>
            </div>
            <BattleLog battleLog={battleLog} />
            <BattleActions
                isBattleOver={isBattleOver}
                winner={winner}
                currentTurn={currentTurn}
                heroSkills={hero.defaultSkills}
                onHeroAttack={handleHeroAttack}
                onResetBattle={resetBattle}
                onReturn={handleReturn}
            />
        </div>
    );
};

export default BattleComponent;
