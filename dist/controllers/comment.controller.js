"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = void 0;
const comment_model_1 = require("../models/comment.model");
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { comment } = req.body;
        const { _id: userId } = req.user;
        const commentData = yield comment_model_1.commentModel.create({ comment, post: postId, postBy: userId });
        res.send({ message: "Comment created successfully ", commentData });
    }
    catch (error) {
        next(error);
    }
});
exports.createComment = createComment;
