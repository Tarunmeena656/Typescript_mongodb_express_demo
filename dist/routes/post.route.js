"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController = __importStar(require("../controllers/post.controller"));
const passport_1 = __importDefault(require("passport"));
const express_validation_1 = require("express-validation");
const post_validation_1 = require("../validation/post.validation");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const postRouter = (0, express_1.Router)();
postRouter.post("/", (0, express_validation_1.validate)(post_validation_1.createPost), (0, auth_middleware_1.checkRole)(["user", "admin"]), passport_1.default.authenticate("jwt", { session: false }), postController.createPost);
postRouter.get("/allpost", (0, auth_middleware_1.checkRole)(["user", "admin"]), passport_1.default.authenticate("jwt", { session: false }), postController.fetchAllPost);
postRouter.get("/:postId", (0, auth_middleware_1.checkRole)(["user", "admin"]), (0, express_validation_1.validate)(post_validation_1.fetchPostById), passport_1.default.authenticate("jwt", { session: false }), postController.fetchPostById);
postRouter.put("/:postId", (0, auth_middleware_1.checkRole)(["user", "admin"]), (0, express_validation_1.validate)(post_validation_1.updatePostById), passport_1.default.authenticate("jwt", { session: false }), postController.updatePostById);
exports.default = postRouter;
