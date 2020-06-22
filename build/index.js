"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const Server_1 = __importDefault(require("./Server"));
const port = process.env.PORT || 8080;
Server_1.default.express.listen(port, () => {
    console.log('\n----------------------');
    console.log(`URL:             http://localhost:${port}`);
    console.log(`ENVIRONMENT:     ${process.env.NODE_ENV}`);
    console.log(`SERVER VERSION:  ${process.env.npm_package_version}`);
    console.log(`Allowed origins: ${Server_1.default.origins.join(' | ')}`);
    console.log('----------------------\n');
});
