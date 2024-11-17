import { IsEnum, Length } from 'class-validator';
import { DifficultyLevel } from '../enums/difficulty-level.enum';

export class CreateJourneyDto {
  @Length(5, 150)
  name: string;

  @Length(5)
  description: string;

  @IsEnum(DifficultyLevel)
  difficultyLevel: DifficultyLevel;
}
