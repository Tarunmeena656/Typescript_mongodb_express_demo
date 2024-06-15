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
exports.userModel = exports.USER_ROLES = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const config_1 = require("../config");
var USER_ROLES;
(function (USER_ROLES) {
    USER_ROLES["USER"] = "user";
    USER_ROLES["ADMIN"] = "admin";
})(USER_ROLES || (exports.USER_ROLES = USER_ROLES = {}));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: USER_ROLES, default: USER_ROLES.USER },
    active: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null },
    deletedBy: { type: mongoose_1.Schema.Types.ObjectId, default: null }
}, { timestamps: true, versionKey: false });
userSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const hashPassword = yield (0, bcrypt_1.hash)(this.password, config_1.APP_CONFIG.SALT_ROUNDS);
        this.password = hashPassword;
    });
});
userSchema.methods.comparePassword = function (password) {
    return (0, bcrypt_1.compare)(password, this.password);
};
exports.userModel = (0, mongoose_1.model)("user", userSchema);
