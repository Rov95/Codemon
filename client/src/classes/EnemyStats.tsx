import { Skill } from "../interfaces/Skills";
import EnemyProps from '../interfaces/Enemy'

export class Enemy {
    id: number;
    name: string;
    image: string;
    maxHealth: number;
    baseHealth: number;
    currentHealth: number;
    basePower: number;
    baseSpeed: number;
    baseDefense: number;
    skills: Skill[];

    constructor({ id,name, image, baseHealth, basePower, baseSpeed, baseDefense, skills, maxHealth }: EnemyProps) {
        this.id = id;
        this.name = name;
        this.image= image;
        this.baseHealth= baseHealth;
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

    clone(): Enemy {
        return new Enemy({
            id: this.id,
            name: this.name,
            image: this.image,
            baseHealth: this.maxHealth,
            basePower: this.basePower,
            baseSpeed: this.baseSpeed,
            baseDefense: this.baseDefense,
            skills: this.skills,
            maxHealth: this.maxHealth,
        });
    }
}
