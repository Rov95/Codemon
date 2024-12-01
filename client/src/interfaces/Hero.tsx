import { HeroStats } from "../clases/heroStats";
import { Skill } from "./Skills";

export interface Hero {
    id: number;
    name?: string;
    description?: string;
    image?: string; 
    characterName?: string; 
    baseHealth?: number; 
    basePower?: number;
    baseSpeed?: number;
    baseDefense?: number;
    defaultSkills?: Skill[]; 
    stats?: HeroStats;
}
