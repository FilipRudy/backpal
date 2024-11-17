import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Journey } from '../../journeys/entities/journey.entity';
import { StepStatus } from '../enums/step-status.enum';
import { User } from '../../users/entities/user.entity';
import { Step } from '../../steps/entities/step.entity';

@Entity()
export class UserProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  journeyId: number;

  @Column()
  userAccountId: string;

  @Column()
  stepId: number;

  @Column({ default: 0 })
  stepStatus: StepStatus;

  @Column({ type: 'timestamptz' })
  startedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  completedAt: Date;

  @ManyToOne(() => Journey, (journey) => journey.userProgresses)
  journey: Journey;

  @ManyToOne(() => Step, (step) => step.userProgresses)
  step: Step;

  @ManyToOne(() => User, (user) => user.userProgresses)
  user: User;
}
