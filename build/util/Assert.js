"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("./Exceptions");
class Assert {
    static notNull(value, errorMessage) {
        if (value === null || value === undefined) {
            if (!errorMessage) {
                // eslint-disable-next-line no-param-reassign
                errorMessage = 'Not Null assertion failed';
            }
            throw new Exceptions_1.AssertException(errorMessage);
        }
    }
    static notBlank(value, options) {
        let errorMessage = options === null || options === void 0 ? void 0 : options.errorMessage;
        const handleNull = (options === null || options === void 0 ? void 0 : options.handleNull) || true;
        if (handleNull)
            Assert.notNull(value, errorMessage);
        if (!value.toString().replace(/\s/g, '').length) {
            if (!errorMessage) {
                // eslint-disable-next-line no-param-reassign
                errorMessage = 'Not Empty assertion failed';
            }
            throw new Exceptions_1.AssertException(errorMessage);
        }
    }
    static isTrue(value, errorMessage) {
        const msg = errorMessage || `Is True assertion failed\nValue: ${value} is not true`;
        if (value !== true) {
            throw new Exceptions_1.AssertException(msg);
        }
    }
}
exports.default = Assert;
