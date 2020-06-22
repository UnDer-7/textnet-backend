"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Assert_1 = __importDefault(require("./Assert"));
class EnvironmentVariable {
    static getVariable(name, withPrefix = true) {
        const env = withPrefix
            ? process.env[`TEXTNET_${name}`]
            : process.env[name];
        Assert_1.default.notBlank(env, { errorMessage: `Environment Variable [${name}] Not Fount` });
        // @ts-ignore
        return env;
    }
}
exports.default = EnvironmentVariable;
EnvironmentVariable.ENVIRONMENT = EnvironmentVariable.getVariable('ENVIRONMENT', false);
EnvironmentVariable.DATABASE_TYPE = EnvironmentVariable.getVariable('DATABASE_TYPE');
EnvironmentVariable.DATABASE_HOST = EnvironmentVariable.getVariable('DATABASE_HOST');
EnvironmentVariable.DATABASE_PORT = EnvironmentVariable.getVariable('DATABASE_PORT');
EnvironmentVariable.DATABASE_USERNAME = EnvironmentVariable.getVariable('DATABASE_USERNAME');
EnvironmentVariable.DATABASE_PASSWORD = EnvironmentVariable.getVariable('DATABASE_PASSWORD');
EnvironmentVariable.DATABASE_DATABASE_NAME = EnvironmentVariable.getVariable('DATABASE_DATABASE_NAME');
