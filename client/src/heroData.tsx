import { HeroStats, Skill, PassiveSkill, TrapSkill } from './clases/heroStats';

const defaultSkills: Skill[] = [
    { skillName: "Basic Attack", slotRequired: 0 },
    { skillName: "Power Strike", slotRequired: 1 },
    { skillName: "Speed Boost", slotRequired: 1 },
    { skillName: "Shield Block", slotRequired: 1 },
];

const passiveSkill: PassiveSkill = { skillName: "Regeneration", isPassive: true, slotRequired: 0 };

const trapSkill: TrapSkill = { skillName: "Stun Trap", trapEffect: "Stun", slotRequired: 2 };

export const heavyStats = new HeroStats({
    characterName: "Heavy",
    baseHealth: 120,
    basePower: 40,
    baseSpeed: 20,
    baseDefense: 50,
    defaultSkills,
    passiveSkill,
    trapSkills: [trapSkill],
    availablePoints: 5,
});

export const demonStats = new HeroStats({
    characterName: "Demon",
    baseHealth: 100,
    basePower: 50,
    baseSpeed: 30,
    baseDefense: 40,
    defaultSkills,
    passiveSkill,
    trapSkills: [],
    availablePoints: 5,
});

export const ninjaStats = new HeroStats({
    characterName: "Ninja",
    baseHealth: 80,
    basePower: 60,
    baseSpeed: 50,
    baseDefense: 30,
    defaultSkills,
    passiveSkill,
    trapSkills: [],
    availablePoints: 5,
});
