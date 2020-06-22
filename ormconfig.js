// import EnvironmentVariable from "./src/util/EnvironmentVariable";

// module.exports = {
//   'type': EnvironmentVariable.DATABASE_TYPE,
//   'host': EnvironmentVariable.DATABASE_HOST,
//   'port': EnvironmentVariable.DATABASE_PORT,
//   'username': EnvironmentVariable.DATABASE_USERNAME,
//   'password': EnvironmentVariable.DATABASE_PASSWORD,
//   'database': EnvironmentVariable.DATABASE_DATABASE_NAME,
// }
module.exports = {
  'type': 'postgres',
  'host': 'localhost',
  'port': '5432',
  'username': 'userDev',
  'password': 'userDev',
  'database': 'TEXTNET',
  'entities': [
    'src/model/entity/**/*.ts'
  ],
  'migrations': [
    'src/migration/**/*.ts'
  ],
  cli: {
    entitiesDir: 'src/model/entity',
    migrationsDir: 'src/migration'
  }
}
