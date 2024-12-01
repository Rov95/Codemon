import { Skill } from "./Skills";

export default interface EnemyProps {
    name: string;
    baseHealth: number;
    basePower: number;
    baseSpeed: number;
    baseDefense: number;
    skills: Skill[];
    maxHealth:number;
}