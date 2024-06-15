"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postModel = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    postBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true, versionKey: false });
exports.postModel = (0, mongoose_1.model)("post", postSchema);
