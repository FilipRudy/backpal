import { Module } from '@nestjs/common';
import { JourneysService } from './journeys.service';
import { JourneysController } from './journeys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Journey } from './entities/journey.entity';
import { StepsModule } from '../steps/steps.module';
import { StepsService } from '../steps/steps.service';
import { Step } from '../steps/entities/step.entity';
import { UserProgress } from '../user-progress/entities/user-progress.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Journey, Step, UserProgress, User])],
  controllers: [JourneysController],
  providers: [JourneysService, StepsService],
})
export class JourneysModule {}
