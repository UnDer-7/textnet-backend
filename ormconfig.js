'use strict';

function getVariable (name, withPrefix = true) {
  function notNull (value, errorMessage) {
    if (value === null || value === undefined) {
      throw new Error(errorMessage);
    }
  }

  function notBlank (value, msg) {
    notNull(value, msg);
    if (!value.toString().replace(/\s/g, '').length) {
      throw new Error(msg)
    }
  }

  const envName = withPrefix
    ? `TEXTNET_${name}`
    : name;

  const env = process.env[envName]
  notBlank(env, `Environment Variable [${envName}] Not Fount`);
  return env;
}

const isDev = getVariable('ENVIRONMENT', false) === 'development';

const entitiesDir = isDev
  ? 'src/model/entity'
  : 'build/model/entity';
const migrationsDir = isDev
  ? 'src/migration'
  : 'build/migration'

const entitiesPath = isDev
  ? `${entitiesDir}/**/*.ts`
  : `${entitiesDir}/**/*.js`;
const migrationsPath = isDev
  ? `${migrationsDir}/**/*.ts`
  : `${migrationsDir}/**/*.js`;


module.exports = {
  type: getVariable('DATABASE_TYPE'),
  host: getVariable('DATABASE_HOST'),
  port: getVariable('DATABASE_PORT'),
  username: getVariable('DATABASE_USERNAME'),
  password: getVariable('DATABASE_PASSWORD'),
  database: getVariable('DATABASE_DATABASE_NAME'),
  synchronize: false,
  logging: true,
  entities: [entitiesPath],
  migrations: [migrationsPath],
  cli: {
    entitiesDir,
    migrationsDir,
  }
}
