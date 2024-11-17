import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Journey } from '../journeys/entities/journey.entity';
import { EntityNotFoundError, IsNull, Repository } from 'typeorm';
import { Step } from './entities/step.entity';
import { UserProgress } from '../user-progress/entities/user-progress.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class StepsService {
  constructor(
    @InjectRepository(Step)
    private readonly stepsRepository: Repository<Step>,
    @InjectRepository(Journey)
    private readonly journeysRepository: Repository<Journey>,
    @InjectRepository(UserProgress)
    private readonly userProgressesRepository: Repository<UserProgress>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async create(createStepDto: CreateStepDto) {
    try {
      const journey = await this.journeysRepository.findOneByOrFail({
        id: createStepDto.journeyId,
      });
      const lastStep = await this.stepsRepository.findOneBy({
        journeyId: journey.id,
        nextStepId: IsNull(),
      });
      if (!lastStep) {
        return await this.stepsRepository.save(createStepDto);
      } else {
        const newStep = await this.stepsRepository.save({
          ...createStepDto,
          previousStepId: lastStep.id,
        });
        await this.stepsRepository.update(lastStep.id, {
          nextStepId: newStep.id,
        });
        return newStep;
      }
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(
          'Journey with id ' + createStepDto.journeyId + ' could not be found',
        );
      }
      throw new BadRequestException(err);
    }
  }

  async findAllByJourneyId(journeyId: number) {
    return await this.stepsRepository.findBy({ journeyId: journeyId });
  }
  async findAllByJourneyIdAndUserId(journeyId: number, userId: string) {
    try {
      await this.journeysRepository.findOneByOrFail({ id: journeyId });
      await this.usersRepository.findOneByOrFail({ userId: userId });

      const steps = await this.findAllByJourneyId(journeyId);
      const stepsWithStatus = [];

      for (const step of steps) {
        const userStepProgress = await this.userProgressesRepository.findOneBy({
          stepId: step.id,
        });
        if (userStepProgress && userStepProgress.stepStatus === 1) {
          stepsWithStatus.push({ ...step, status: 'completed' });
        } else if (userStepProgress && userStepProgress.stepStatus === 0) {
          stepsWithStatus.push({ ...step, status: 'started' });
        } else {
          stepsWithStatus.push({ ...step, status: 'not started' });
        }
      }
      return stepsWithStatus;
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(err.message);
      }
      throw new BadRequestException(err);
    }
  }

  async findAllCompletedStepsByUserId(userId: number) {}

  async findOne(id: number) {
    try {
      return await this.stepsRepository.findOneByOrFail({ id: id });
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(
          'Step with id ' + id + ' could not be found',
        );
      }
      throw new BadRequestException(err);
    }
  }

  async update(id: number, updateStepDto: UpdateStepDto) {
    try {
      await this.stepsRepository.findOneByOrFail({
        id: id,
      });
      return await this.stepsRepository.update({ id: id }, updateStepDto);
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`Step with ID ${id} not found`);
      }
      throw new BadRequestException(err);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} step`;
  }
}
