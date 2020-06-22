"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const DatabaseConfig_1 = __importDefault(require("./config/DatabaseConfig"));
const SessionController_1 = __importDefault(require("./controller/SessionController"));
const UserController_1 = __importDefault(require("./controller/UserController"));
const typeorm_1 = require("typeorm");
const console_colors_1 = require("./util/console.colors");
class Server {
    constructor() {
        this.express = express_1.default();
        this.startDatabase()
            .then(_ => {
            this.middleware();
            this.routes();
        })
            .catch(e => {
            console.log(console_colors_1.ConsoleColors.FgRed, '\nUnable to Start-Up Project\n');
            console.trace(e);
        });
    }
    get origins() {
        const isDev = process.env.NODE_ENV === 'development';
        const prodURL = ['https://cadeonibus.web.app', 'https://cadeonibus.com.br'];
        if (isDev) {
            return [
                'http://localhost:4200',
                'http://localhost:3000',
                ...prodURL,
            ];
        }
        return prodURL;
    }
    async startDatabase() {
        try {
            await typeorm_1.createConnection(DatabaseConfig_1.default);
            console.log(console_colors_1.ConsoleColors.FgGreen, '\nSuccessfully connected to the Database\n');
        }
        catch (e) {
            console.log(console_colors_1.ConsoleColors.FgRed, '\nUnable to connect to the Database\n');
            console.trace(e);
        }
    }
    middleware() {
        this.express.use(helmet_1.default());
        this.express.use(cors_1.default({
            origin: this.origins,
        }));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        this.express.use(morgan_1.default('dev'));
    }
    routes() {
        this.express.use([
            SessionController_1.default,
            UserController_1.default,
        ]);
    }
}
exports.default = new Server();
