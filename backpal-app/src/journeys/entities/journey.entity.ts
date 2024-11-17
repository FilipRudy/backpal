import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Length } from 'class-validator';
import { DifficultyLevel } from '../enums/difficulty-level.enum';
import { Step } from '../../steps/entities/step.entity';
import { UserProgress } from '../../user-progress/entities/user-progress.entity';

@Entity()
export class Journey {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(5, 150)
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  difficultyLevel: DifficultyLevel;

  @OneToMany(() => Step, (step) => step.journey)
  steps: Step[];

  @OneToMany(() => UserProgress, (userProgress) => userProgress.journey)
  userProgresses: UserProgress[];
}
