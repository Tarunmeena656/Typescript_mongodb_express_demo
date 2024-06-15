"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.fetchUserById = exports.userLogin = exports.createUser = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createUser = {
    body: joi_1.default.object({
        name: joi_1.default.string().required().label("name required"),
        email: joi_1.default.string().email().required().label("Email required"),
        password: joi_1.default.string().min(8).max(12).required().label("password required"),
        role: joi_1.default.string().label("password required"),
    }),
};
exports.userLogin = {
    body: joi_1.default.object({
        email: joi_1.default.string().email().required().label(" Email required"),
        password: joi_1.default.string().min(8).max(12).required().label("password required"),
    }),
};
exports.fetchUserById = {
    params: joi_1.default.object({
        userId: joi_1.default.string().required().label("UserId required"),
    }),
};
exports.deleteUserById = {
    params: joi_1.default.object({
        userId: joi_1.default.string().required().label("UserId required"),
    }),
};
exports.updateUserById = {
    params: joi_1.default.object({
        userId: joi_1.default.string().required().label("user required"),
    }),
    body: joi_1.default.object({
        email: joi_1.default.string().email().required().label(" Email required"),
        password: joi_1.default.string().min(8).max(12).required().label("password required"),
    }),
};
