import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserProgressDto {
  @IsNotEmpty()
  journeyId: number;

  @IsNotEmpty()
  userAccountId: string;

  @IsNotEmpty()
  stepId: number;

  @IsDateString()
  @IsOptional()
  completedAt: Date;
}
