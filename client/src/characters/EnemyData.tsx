import { Enemy } from "../classes/EnemyStats";

import goblinImage from '../assets/goblin.svg';
import sargeantImage from '../assets/sargeant.webp';

export const goblinEnemy = new Enemy({
    id: 1,
    name: "Goblin",
    image: goblinImage,
    baseHealth: 200,
    basePower: 30,
    baseSpeed: 25,
    baseDefense: 10,
    skills: [{ skillName: "Scratch", slotRequired: 0 }, { skillName: "Bite", slotRequired: 1 }],
    maxHealth: 200
});

export const sargeantEnemy = new Enemy({
    id: 2,
    name: "Sargeant",
    image: sargeantImage,
    baseHealth: 200,
    basePower: 30,
    baseSpeed: 25,
    baseDefense: 10,
    skills: [{ skillName: "Scratch", slotRequired: 0 }, { skillName: "Bite", slotRequired: 1 }],
    maxHealth: 200
});