import { Enemy } from "../classes/EnemyStats";

import goblinImage from '../assets/goblin.svg';

export const goblinEnemy = new Enemy({
    name: "Goblin",
    image: goblinImage,
    baseHealth: 200,
    basePower: 30,
    baseSpeed: 25,
    baseDefense: 10,
    skills: [{ skillName: "Scratch", slotRequired: 0 }, { skillName: "Bite", slotRequired: 1 }],
    maxHealth: 200
});
