import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { AuthenticationService } from '../iam/authentication/authentication.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { EntityNotFoundError, In, Repository } from 'typeorm';
import { HashingService } from '../iam/hashing/hashing.service';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../iam/config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenIdsStorage } from '../iam/authentication/refresh-token-ids.storage/refresh-token-ids.storage';
import { MailerService } from '@nestjs-modules/mailer';
import { Journey } from './entities/journey.entity';
import { Step } from '../steps/entities/step.entity';
import { StepsService } from '../steps/steps.service';
import { UserProgress } from '../user-progress/entities/user-progress.entity';

@Injectable()
export class JourneysService {
  constructor(
    @InjectRepository(Journey)
    private readonly journeysRepository: Repository<Journey>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(UserProgress)
    private readonly userProgressesRepository: Repository<UserProgress>,
    private readonly stepsService: StepsService,
  ) {}
  async create(createJourneyDto: CreateJourneyDto) {
    try {
      return await this.journeysRepository.save(createJourneyDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findAll() {
    return await this.journeysRepository.find();
  }

  async findAllStartedByUserId(userId: string) {
    try {
      await this.usersRepository.findOneByOrFail({ userId: userId });
      const userProgresses = await this.userProgressesRepository.findBy({
        userAccountId: userId,
      });

      const startedJourneysIds = userProgresses
        .map((progress) => progress.journeyId)
        .filter((id, index, self) => self.indexOf(id) === index);

      const journeys = await this.journeysRepository.findBy({
        id: In(startedJourneysIds),
      });

      const journeysWithSteps = [];

      for (const journey of journeys) {
        const steps = await this.stepsService.findAllByJourneyIdAndUserId(
          journey.id,
          userId,
        );
        journeysWithSteps.push({ journey, steps });
      }

      return journeysWithSteps;
    } catch (err) {}
  }

  async findOne(id: number) {
    try {
      return await this.journeysRepository.findOneByOrFail({ id: id });
    } catch (err) {
      throw new NotFoundException(`Journey with ID ${id} not found`);
    }
  }
  async findJourneysWithSteps() {
    try {
      const journeys = await this.journeysRepository.find();
      const journeysWithSteps = [];
      for (const journey of journeys) {
        const steps = await this.stepsService.findAllByJourneyId(journey.id);
        journeysWithSteps.push({ journey, steps });
      }

      return { journeysWithSteps };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  async findJourneyWithSteps(id: number) {
    try {
      const journey = await this.journeysRepository.findOneByOrFail({ id: id });
      const steps = await this.stepsService.findAllByJourneyId(id);
      return { journey, steps };
    } catch (err) {
      throw new NotFoundException(`Journey with ID ${id} not found`);
    }
  }

  async update(id: number, updateJourneyDto: UpdateJourneyDto) {
    try {
      return await this.journeysRepository.update({ id: id }, updateJourneyDto);
    } catch (err) {
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(`Journey with ID ${id} not found`);
      }
      throw new BadRequestException(err);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} journey`;
  }
}
