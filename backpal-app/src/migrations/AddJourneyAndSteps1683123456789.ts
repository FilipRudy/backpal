import { MigrationInterface, QueryRunner } from 'typeorm';
import { StepsService } from '../steps/steps.service';
import { Step } from '../steps/entities/step.entity';
import { Journey } from '../journeys/entities/journey.entity';
import { UserProgress } from '../user-progress/entities/user-progress.entity';
import { User } from '../users/entities/user.entity';

export class AddJourneyAndSteps1683123456789 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const stepsService = new StepsService(
      queryRunner.manager.getRepository(Step),
      queryRunner.manager.getRepository(Journey),
      queryRunner.manager.getRepository(UserProgress),
      queryRunner.manager.getRepository(User),
    );

    const journeyResult = await queryRunner.query(
      `INSERT INTO "journey" ("name", "description", "difficultyLevel") 
       VALUES ('Simple To-Do Api', 'In this journey, you will learn the absolute basics of creating APIs using the NestJS framework. You will start by creating simple entities, then move through services and controllers, and finish by creating modules for your entities. After each step, you can always check our official proposed solution and test the app by yourself!', '0') 
       RETURNING "id"`,
    );
    const journeyId = journeyResult[0].id;

    await stepsService.create({
      journeyId: journeyId,
      name: 'Add user entity',
      description: 'Learn how to create basic entity',
      isFreeTierEligible: true,
      experienceAmount: 100,
      taskContent:
        'Your task here is to create a simple user entity. It needs to have 3 different fields:\\n -id of type number, with ',
      initialCode:
        "import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';\n",
      theoreticalIntro: 'This is an introduction to programming.',
      lambdaUrl:
        'https://qpty7nmtmpy4lb342iwgjz266e0vgezy.lambda-url.eu-north-1.on.aws/',
      repositoryLink: 'https://github.com/FilipRudy',
    });
    await stepsService.create({
      journeyId: journeyId,
      name: 'Add task entity',
      description: 'Practice your ability to create entities',
      isFreeTierEligible: true,
      experienceAmount: 100,
      taskContent:
        'Your task here is to create a simple user entity. It needs to have 3 different fields:\\n -id of type number, with ',
      initialCode:
        "import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';\n",
      theoreticalIntro: 'This is an introduction to programming.',
      lambdaUrl:
        'https://tsfsc7sg4dwhtjvfgddbk4m4im0vixfm.lambda-url.eu-north-1.on.aws/',
      repositoryLink: 'https://github.com/FilipRudy',
    });
    await stepsService.create({
      journeyId: journeyId,
      name: 'Step 1: Introduction',
      description: 'This is the introductory step.',
      isFreeTierEligible: true,
      experienceAmount: 100,
      taskContent: 'Write a Hello World function.',
      initialCode: 'console.log("Hello World");',
      theoreticalIntro: 'This is an introduction to programming.',
      lambdaUrl: 'https://example.com/lambda1',
      repositoryLink: 'https://github.com/FilipRudy',
    });
    await stepsService.create({
      journeyId: journeyId,
      name: 'Step 1: Introduction',
      description: 'This is the introductory step.',
      isFreeTierEligible: true,
      experienceAmount: 100,
      taskContent: 'Write a Hello World function.',
      initialCode: 'console.log("Hello World");',
      theoreticalIntro: 'This is an introduction to programming.',
      lambdaUrl: 'https://example.com/lambda1',
      repositoryLink: 'https://github.com/FilipRudy',
    });
    await stepsService.create({
      journeyId: journeyId,
      name: 'Step 1: Introduction',
      description: 'This is the introductory step.',
      isFreeTierEligible: true,
      experienceAmount: 100,
      taskContent: 'Write a Hello World function.',
      initialCode: 'console.log("Hello World");',
      theoreticalIntro: 'This is an introduction to programming.',
      lambdaUrl: 'https://example.com/lambda1',
      repositoryLink: 'https://github.com/FilipRudy',
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "step" WHERE "journeyId" IN (SELECT "id" FROM "journey" WHERE "name" = 'Beginner Journey')`,
    );
    await queryRunner.query(
      `DELETE FROM "journey" WHERE "name" = 'Beginner Journey'`,
    );
  }
}
