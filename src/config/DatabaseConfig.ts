import { ConnectionOptions } from 'typeorm';
import EnvironmentVariable from '../util/EnvironmentVariable';

const isDev = EnvironmentVariable.ENVIRONMENT === 'development';
const entityPath = isDev
  ? 'src/model/entity/**/*.ts'
  : 'build/model/entity/**/*.js';
const migrationPath = isDev
  ? 'src/migration/**/*.ts'
  : 'build/migration/**/*.js';

const DATABASE_CONFIG: ConnectionOptions = {
  type: EnvironmentVariable.DATABASE_TYPE as 'postgres',
  host: EnvironmentVariable.DATABASE_HOST,
  port: Number(EnvironmentVariable.DATABASE_PORT),
  username: EnvironmentVariable.DATABASE_USERNAME,
  password: EnvironmentVariable.DATABASE_PASSWORD,
  database: EnvironmentVariable.DATABASE_DATABASE_NAME,
  logging: true,
  synchronize: false,
  migrationsRun: false,
  entities: [entityPath],
  migrations: [migrationPath]
}

export default DATABASE_CONFIG;
