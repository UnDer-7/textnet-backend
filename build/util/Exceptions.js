"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssertException = exports.JWTInvalidException = void 0;
class Exception extends Error {
    constructor(message, error) {
        super(message);
        this.message = message;
        this.error = error;
        // eslint-disable-next-line no-console
        console.warn('Thrown error: ', error);
    }
}
class JWTInvalidException extends Exception {
    constructor(message, error) {
        super(message, error);
        this.message = message;
        this.error = error;
    }
}
exports.JWTInvalidException = JWTInvalidException;
class AssertException extends Exception {
    constructor(message) {
        super(message, null);
        this.message = message;
    }
}
exports.AssertException = AssertException;
