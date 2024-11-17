import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum';
import { UserProgress } from '../../user-progress/entities/user-progress.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  userId: string;

  @Column()
  password: string;

  @Column({ unique: true })
  verificationCode: string;

  @Column()
  isConfirmed: boolean;

  @Column({ enum: Role, default: Role.Regular })
  role: Role;

  @OneToMany(() => UserProgress, (userProgress) => userProgress.user)
  userProgresses: UserProgress[];
}
