import { HeroStats } from "./heroStats";
import { Enemy } from "./EnemyStats";
import { Skill } from "../interfaces/Skills";

export class Battle {
    hero: HeroStats;
    enemy: Enemy;

    constructor(hero: HeroStats, enemy: Enemy) {
        this.hero = hero;
        this.enemy = enemy;
    }

    heroAttack(skill: Skill): string {
        const damage = this.calculateSkillDamage(this.hero, this.enemy, skill);
        const isEnemyAlive = this.enemy.takeDamage(damage);
        return isEnemyAlive
            ? `${this.hero.name} dealt ${damage} damage! Enemy ${this.enemy.name} has ${this.enemy.currentHealth} health left.`
            : `${this.enemy.name} is defeated!`;
    }

    enemyAttack(): string {
        const damage = this.enemy.calculateDamage();
        const isHeroAlive = this.hero.takeDamage(damage);
        return isHeroAlive
            ? `${this.enemy.name} dealt ${damage} damage! Hero ${this.hero.name} has ${this.hero.currentHealth} health left.`
            : `${this.hero.name} is defeated!`;
    }

    calculateSkillDamage(attacker: HeroStats | Enemy, defender: HeroStats | Enemy, skill: Skill): number {
        const baseDamage = attacker.basePower;
        const defenseReduction = defender.baseDefense * 0.1;
        const skillModifier = skill.slotRequired;
        return Math.max(baseDamage + skillModifier - defenseReduction, 1);
    }

    static calculateOnlineDamage(attacker: HeroStats, skill: Skill): number {
        const baseDamage = attacker.currentPower;
        const skillModifier = skill.slotRequired * 5; // Adjust multiplier as needed
        return Math.max(Math.floor(baseDamage * 0.5) + skillModifier, 1);
    }

    isBattleOver(): boolean {
        return this.hero.currentHealth <= 0 || this.enemy.currentHealth <= 0;
    }
}
