import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserProgressDto } from './dto/create-user-progress.dto';
import { UpdateUserProgressDto } from './dto/update-user-progress.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Step } from '../steps/entities/step.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Journey } from '../journeys/entities/journey.entity';
import { User } from '../users/entities/user.entity';
import { UserProgress } from './entities/user-progress.entity';
import { StepStatus } from './enums/step-status.enum';

@Injectable()
export class UserProgressService {
  constructor(
    @InjectRepository(Step)
    private readonly stepsRepository: Repository<Step>,
    @InjectRepository(Journey)
    private readonly journeyRepository: Repository<Journey>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserProgress)
    private readonly userProgressRepository: Repository<UserProgress>,
  ) {}
  async create(createUserProgressDto: CreateUserProgressDto) {
    try {
      await this.userRepository.findOneByOrFail({
        userId: createUserProgressDto.userAccountId,
      });
      const journey = await this.journeyRepository.findOneByOrFail({
        id: createUserProgressDto.journeyId,
      });
      const step = await this.stepsRepository.findOneByOrFail({
        id: createUserProgressDto.stepId,
      });
      const previousStep = await this.stepsRepository.findOneBy({
        nextStepId: step.id,
      });

      if (
        await this.userProgressRepository.findOneBy({
          userAccountId: createUserProgressDto.userAccountId,
          stepId: createUserProgressDto.stepId,
          journeyId: createUserProgressDto.journeyId,
        })
      ) {
        throw new BadRequestException('This step was already started');
      }

      if (
        previousStep &&
        (await this.userProgressRepository.findOneBy({
          stepId: previousStep.id,
          userAccountId: createUserProgressDto.userAccountId,
          stepStatus: StepStatus.Completed,
        })) === null
      ) {
        throw new BadRequestException(
          'Previous step with id ' + previousStep.id + ' is not completed',
        );
      }

      if (step.journeyId !== journey.id) {
        throw new BadRequestException(
          'Step with id ' +
            step.id +
            ' does not belong to journey with id ' +
            journey.id,
        );
      }

      return this.userProgressRepository.save({
        ...createUserProgressDto,
        startedAt: new Date(),
      });
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(err.message);
      }
      throw new BadRequestException(err);
    }
  }

  async completeUserProgress(stepId: number, userId: string) {
    try {
      const step = await this.stepsRepository.findOneByOrFail({ id: stepId });
      const nextStep = await this.stepsRepository.findOneBy({
        previousStepId: step.id,
      });
      const stepUserProgress =
        await this.userProgressRepository.findOneByOrFail({
          stepId: stepId,
          userAccountId: userId,
        });
      let nextStepUserProgress;

      if (nextStep) {
        nextStepUserProgress = await this.userProgressRepository.findOneBy({
          stepId: nextStep.id,
          userAccountId: userId,
        });
      }

      if (!stepUserProgress) {
        throw new BadRequestException(
          'Step with id ' + stepId + ' is not yet started',
        );
      }

      if (nextStep && !nextStepUserProgress) {
        await this.userProgressRepository.save({
          stepId: nextStep.id,
          journeyId: nextStep.journeyId,
          userAccountId: userId,
          startedAt: new Date(),
        });
      }

      await this.userProgressRepository.save({
        ...stepUserProgress,
        stepStatus: 1,
        completedAt: new Date(),
      });
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(err.message);
      }
      throw new BadRequestException(err.message);
    }
  }

  async getExperienceSumByUserId(userId: string) {
    try {
      const user = await this.userRepository.findOneByOrFail({
        userId: userId,
      });
      const userProgresses = await this.userProgressRepository.findBy({
        userAccountId: userId,
      });
      const filteredUserProgresses = userProgresses.filter(
        (progress) => progress.stepStatus === StepStatus.Completed,
      );
      const completedSteps = [];
      for (const userProgress of filteredUserProgresses) {
        const step = await this.stepsRepository.findOneBy({
          id: userProgress.stepId,
        });
        if (step) {
          completedSteps.push(step);
        }
      }

      return completedSteps.reduce(
        (sum, step) => sum + step.experienceAmount,
        0,
      );
    } catch (err) {}
  }

  findAll() {
    return `This action returns all userProgress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userProgress`;
  }

  update(id: number, updateUserProgressDto: UpdateUserProgressDto) {
    return `This action updates a #${id} userProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} userProgress`;
  }
}
