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
exports.deleteUserById = exports.updateUserById = exports.fetchById = exports.fetchAllUser = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const user_model_1 = require("../models/user.model");
const mongodb_1 = require("mongodb");
const fetchAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.userModel
            .find({ active: true })
            .select("-password -deletedAt")
            .lean();
        res.send({ message: "Fetched All Users.", users });
    }
    catch (error) {
        next(error);
    }
});
exports.fetchAllUser = fetchAllUser;
const fetchById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield user_model_1.userModel.findById(userId).select("-password").lean();
        if (!user)
            throw http_errors_1.default.NotFound("User not found...");
        res.send({ message: "Successfully fetched.", user });
    }
    catch (error) {
        next(error);
    }
});
exports.fetchById = fetchById;
const updateUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { name, email } = req.body;
        let user = yield user_model_1.userModel.findById(userId).select("-password").lean();
        if (!user)
            throw http_errors_1.default.NotFound("User not found...");
        let payload = { name, email };
        user = yield user_model_1.userModel.findByIdAndUpdate({ _id: userId }, { $set: { payload } }, { new: true });
        res.send({ message: "Successfully updated.", user });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { role: userRole, _id: loggedUser } = req.user;
        if (user_model_1.USER_ROLES.ADMIN !== userRole)
            throw http_errors_1.default.Unauthorized("You have not sufficient permission to delete any user !");
        const user = yield user_model_1.userModel.findById(new mongodb_1.ObjectId(userId)).lean();
        if ((user === null || user === void 0 ? void 0 : user.active) == false)
            throw http_errors_1.default.NotFound("User already deleted.");
        if (!user)
            throw http_errors_1.default.NotFound("User not found !");
        yield user_model_1.userModel.findByIdAndUpdate({ _id: new mongodb_1.ObjectId(userId) }, { $set: { deletedAt: new Date(), active: false, deletedBy: loggedUser } }, { new: true });
        res.send({ message: "user deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUserById = deleteUserById;
