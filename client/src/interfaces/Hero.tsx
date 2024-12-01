import { heavyStats } from '../heroData';

export interface Hero {
    id: number;
    name: string;
    description: string;
    image: string;
    stats: typeof heavyStats; //I need to change this later to herostats type
}