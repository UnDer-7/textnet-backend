"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class Validation {
    static withEmail() {
        return express_validator_1.body('email')
            .trim()
            .isEmail()
            .withMessage('Email inválido');
    }
    static withPassword() {
        return express_validator_1.body('password')
            .trim()
            .isLength({ min: 3 })
            .withMessage('Senha com tamanho inválido, tamanho mínimo é 3');
    }
}
exports.default = Validation;
