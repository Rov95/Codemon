import { Skill } from "../interfaces/Skills";
import EnemyProps from './../interfaces/Enemy'

export class Enemy {
    name: string;
    currentHealth: number;
    basePower: number;
    baseSpeed: number;
    baseDefense: number;
    skills: Skill[];
    maxHealth: number;

    constructor({ name, baseHealth, basePower, baseSpeed, baseDefense, skills, maxHealth }: EnemyProps) {
        this.name = name;
        this.currentHealth = baseHealth;
        this.basePower = basePower;
        this.baseSpeed = baseSpeed;
        this.baseDefense = baseDefense;
        this.skills = skills;
        this.maxHealth = maxHealth;
    }

    takeDamage(damage: number): boolean {
        this.currentHealth -= damage;
        return this.currentHealth > 0;
    }

    calculateDamage(): number {
        return Math.max(this.basePower - Math.random() * 10, 1);
    }
}
