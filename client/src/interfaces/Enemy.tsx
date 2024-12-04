import { Skill } from "./Skills";

export default interface EnemyProps {
    id: number;
    name: string;
    image: string;
    baseHealth: number;
    basePower: number;
    baseSpeed: number;
    baseDefense: number;
    skills: Skill[];
    maxHealth:number;
}