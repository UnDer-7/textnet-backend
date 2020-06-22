"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    createUserWithEmail(user) {
        console.log('CREATE USER: ', user);
    }
}
exports.default = new UserService();
