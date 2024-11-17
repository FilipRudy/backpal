import { Module } from '@nestjs/common';
import { UserProgressService } from './user-progress.service';
import { UserProgressController } from './user-progress.controller';
import { StepsService } from '../steps/steps.service';
import { UsersModule } from '../users/users.module';
import { JourneysService } from '../journeys/journeys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step } from '../steps/entities/step.entity';
import { Journey } from '../journeys/entities/journey.entity';
import { User } from '../users/entities/user.entity';
import { UserProgress } from './entities/user-progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Step, Journey, User, UserProgress])],
  controllers: [UserProgressController],
  providers: [UserProgressService, JourneysService, StepsService, UsersModule],
})
export class UserProgressModule {}
