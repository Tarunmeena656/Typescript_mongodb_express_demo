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
exports.userLogin = exports.createUser = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const user_model_1 = require("../models/user.model");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, role } = req.body;
        const userExist = yield user_model_1.userModel.findOne({ email }).lean();
        if (userExist)
            throw http_errors_1.default.Conflict('Email already use !');
        const user = yield user_model_1.userModel.create({ name, email, password, role });
        res.status(200).json({ message: "User created successfully", user });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        res.send({ message: "User Successfully Logged....", user });
    }
    catch (error) {
        next(error);
    }
});
exports.userLogin = userLogin;
