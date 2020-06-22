"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RouterConfig_1 = __importDefault(require("../config/RouterConfig"));
const ROUTER = RouterConfig_1.default.getRouter();
const PATH = RouterConfig_1.default.buildURL('session');
ROUTER.post(`${PATH}/email`, (req, res) => {
    console.log('LOGIN EMAIL');
    return res.status(200).json({ eae: 'eae' });
});
exports.default = ROUTER;
