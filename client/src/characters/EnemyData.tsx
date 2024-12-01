import { Enemy } from "../clases/EnemyStats";

export const goblinEnemy = new Enemy({
    name: "Goblin",
    baseHealth: 200,
    basePower: 30,
    baseSpeed: 25,
    baseDefense: 10,
    skills: [{ skillName: "Scratch", slotRequired: 0 }, { skillName: "Bite", slotRequired: 1 }],
    maxHealth: 200
});
