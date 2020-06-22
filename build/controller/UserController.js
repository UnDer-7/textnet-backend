"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const RouterConfig_1 = __importDefault(require("../config/RouterConfig"));
const UserService_1 = __importDefault(require("../service/UserService"));
const Validation_1 = __importDefault(require("../util/Validation"));
const ROUTER = RouterConfig_1.default.getRouter();
const PATH = RouterConfig_1.default.buildURL('users');
ROUTER.post(`${PATH}/email`, [Validation_1.default.withEmail(), Validation_1.default.withPassword()], async (req, res) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    UserService_1.default.createUserWithEmail(req.body);
    return res.json({ status: 'user created' });
});
exports.default = ROUTER;
