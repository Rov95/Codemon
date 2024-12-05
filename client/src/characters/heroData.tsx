import { HeroStats, Skill, PassiveSkill, TrapSkill } from '../classes/heroStats';

import TankImage from '../assets/heavy.svg';
import DemonImage from '../assets/power.svg';
import NinjaImage from '../assets/speed.svg';

const defaultSkills: Skill[] = [
    { skillName: "Basic Attack", slotRequired: 0 },
    { skillName: "Power Strike", slotRequired: 1 },
    { skillName: "Speed Boost", slotRequired: 1 },
    { skillName: "Shield Block", slotRequired: 1 },
];

const passiveSkill: PassiveSkill = { skillName: "Regeneration", isPassive: true, slotRequired: 0 };

const trapSkill: TrapSkill = { skillName: "Stun Trap", trapEffect: "Stun", slotRequired: 2 };

export const heavyStats = new HeroStats({
    id: 1,
    name: "Heavy",
    description: 'A strong and brave fighter.',
    image: TankImage,
    maxHealth: 70,
    baseHealth: 70,
    basePower: 40,
    baseSpeed: 20,
    baseDefense: 50,
    defaultSkills,
    passiveSkill,
    trapSkills: [trapSkill],
    availablePoints: 5,
});

export const demonStats = new HeroStats({
    id: 2,
    name: "Demon",
    description: 'A powerful and evil being.',
    image: DemonImage,
    maxHealth: 50,
    baseHealth: 50,
    basePower: 50,
    baseSpeed: 30,
    baseDefense: 40,
    defaultSkills,
    passiveSkill,
    trapSkills: [],
    availablePoints: 5,
});

export const ninjaStats = new HeroStats({
    id: 3,
    name: "Ninja",
    description: 'A stealthy and agile fighter.',
    image: NinjaImage,
    maxHealth: 70,
    baseHealth: 70,
    basePower: 60,
    baseSpeed: 50,
    baseDefense: 30,
    defaultSkills,
    passiveSkill,
    trapSkills: [],
    availablePoints: 5,
});
