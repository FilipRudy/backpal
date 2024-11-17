import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Journey } from './src/journeys/entities/journey.entity';
import { Step } from './src/steps/entities/step.entity';
import { UserProgress } from './src/user-progress/entities/user-progress.entity';
import { User } from './src/users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env['POSTGRES_HOST'],
  port: parseInt(process.env['POSTGRES_PORT']),
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  entities: [Journey, Step, UserProgress, User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
