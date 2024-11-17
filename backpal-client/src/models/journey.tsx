import {DifficultyLevel} from "./difficultyLevel";

export interface Journey {
    id: number;
    name: string;
    description: string;
    difficultyLevel: DifficultyLevel;
}