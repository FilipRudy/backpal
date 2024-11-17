import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Length } from 'class-validator';
import { Journey } from '../../journeys/entities/journey.entity';
import { UserProgress } from '../../user-progress/entities/user-progress.entity';

@Entity()
export class Step {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  journeyId: number;

  @Column({ nullable: true })
  previousStepId: number;

  @Column({ nullable: true })
  nextStepId: number;

  @Length(5, 150)
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  isFreeTierEligible: boolean;

  @Column()
  experienceAmount: number;

  @Column()
  taskContent: string;

  @Column()
  initialCode: string;

  @Column()
  theoreticalIntro: string;

  @Column()
  lambdaUrl: string;

  @Column()
  repositoryLink: string;

  @ManyToOne(() => Journey, (journey) => journey.steps)
  journey: Journey;

  @OneToMany(() => UserProgress, (userProgress) => userProgress.step)
  userProgresses: UserProgress[];
}
