"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class RouterConfig {
    constructor() {
        this.routerInstance = express_1.Router();
    }
    static getRouter() {
        if (!this.instance) {
            RouterConfig.instance = new RouterConfig();
        }
        return this.instance.routerInstance;
    }
    static buildURL(path) {
        return `/api/v1/${path}`;
    }
}
exports.default = RouterConfig;
