import { Column } from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateStepDto {
  @IsNotEmpty()
  journeyId: number;

  @Length(5, 150)
  name: string;

  @Length(5)
  description: string;

  isFreeTierEligible: boolean;

  @IsNotEmpty()
  experienceAmount: number;

  @Length(5)
  taskContent: string;

  @Length(5)
  theoreticalIntro: string;

  @Length(5)
  lambdaUrl: string;

  @Length(5)
  initialCode: string;

  @Length(5)
  repositoryLink: string;
}
