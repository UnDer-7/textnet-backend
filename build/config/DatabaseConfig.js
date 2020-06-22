"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EnvironmentVariable_1 = __importDefault(require("../util/EnvironmentVariable"));
const isDev = EnvironmentVariable_1.default.ENVIRONMENT === 'development';
const entityPath = isDev
    ? 'src/model/entity/*.ts'
    : 'build/model/entity/*.js';
const migrationPath = isDev
    ? 'src/migration/*.ts'
    : 'build/migration/*.js';
const DATABASE_CONFIG = {
    type: EnvironmentVariable_1.default.DATABASE_TYPE,
    host: EnvironmentVariable_1.default.DATABASE_HOST,
    port: Number(EnvironmentVariable_1.default.DATABASE_PORT),
    username: EnvironmentVariable_1.default.DATABASE_USERNAME,
    password: EnvironmentVariable_1.default.DATABASE_PASSWORD,
    database: EnvironmentVariable_1.default.DATABASE_DATABASE_NAME,
    logging: true,
    synchronize: false,
    migrationsRun: false,
    entities: [entityPath],
    migrations: [migrationPath]
};
exports.default = DATABASE_CONFIG;
