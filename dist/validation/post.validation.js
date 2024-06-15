"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostById = exports.fetchPostById = exports.createPost = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createPost = {
    body: joi_1.default.object({
        title: joi_1.default.string().required().label(" title is required"),
        description: joi_1.default.string().required().label("description required"),
    }),
};
exports.fetchPostById = {
    params: joi_1.default.object({
        postId: joi_1.default.string().required().label("postId required"),
    }),
};
exports.updatePostById = {
    params: joi_1.default.object({
        postId: joi_1.default.string().required().label("user required"),
    }),
    body: joi_1.default.object({
        title: joi_1.default.string().required().label(" title required"),
        description: joi_1.default.string().required().label("description required"),
    }),
};
