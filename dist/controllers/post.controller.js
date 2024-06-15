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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostById = exports.fetchPostById = exports.fetchAllPost = exports.createPost = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const post_model_1 = require("../models/post.model");
const mongodb_1 = require("mongodb");
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const { _id } = req.user;
        const post = yield post_model_1.postModel.create({ title, description, postBy: _id });
        res.send({ message: "Post created successfully", post });
    }
    catch (error) {
        next(error);
    }
});
exports.createPost = createPost;
const fetchAllPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_model_1.postModel.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "postBy",
                    foreignField: "_id",
                    as: "posts",
                },
            },
            {
                $project: {
                    name: { $first: "$posts.name" },
                    email: { $first: "$posts.email" },
                    active: { $first: "$posts.active" },
                    role: { $first: "$posts.role" },
                    title: 1,
                    description: 1,
                },
            },
        ]);
        res.send({ message: "Fetched All post.", posts });
    }
    catch (error) {
        next(error);
    }
});
exports.fetchAllPost = fetchAllPost;
const fetchPostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const post = yield post_model_1.postModel.aggregate([
            { $match: { _id: new mongodb_1.ObjectId(postId) } },
            {
                $lookup: {
                    from: "users",
                    localField: "postBy",
                    foreignField: "_id",
                    as: "posts",
                },
            },
            {
                $project: {
                    name: { $first: "$posts.name" },
                    email: { $first: "$posts.email" },
                    active: { $first: "$posts.active" },
                    role: { $first: "$posts.role" },
                    title: 1,
                    description: 1,
                },
            },
        ]);
        if (!post)
            throw http_errors_1.default.NotFound("Post not found...");
        res.send({ message: "Successfully fetched.", post });
    }
    catch (error) {
        next(error);
    }
});
exports.fetchPostById = fetchPostById;
const updatePostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const { title, description } = req.body;
        let post = yield post_model_1.postModel.findById(postId).lean();
        if (!post)
            throw http_errors_1.default.NotFound("Post not found...");
        let payload = { title, description };
        post = yield post_model_1.postModel.findByIdAndUpdate({ _id: postId }, { $set: payload }, { new: true });
        res.send({ message: "Successfully updated.", post });
    }
    catch (error) {
        next(error);
    }
});
exports.updatePostById = updatePostById;
