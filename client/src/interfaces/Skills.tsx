export interface Skill {
    skillName: string;
    slotRequired: number;
    description?: string; 
}

export interface PassiveSkill extends Skill {
    isPassive: boolean;
}

export interface TrapSkill extends Skill {
    trapEffect: string; 
}