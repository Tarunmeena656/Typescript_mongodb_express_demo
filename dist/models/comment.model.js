"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentModel = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    comment: { type: String, required: true },
    postBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "user" },
    post: { type: mongoose_1.Schema.Types.ObjectId, ref: "post" },
});
exports.commentModel = (0, mongoose_1.model)('comment', commentSchema);
