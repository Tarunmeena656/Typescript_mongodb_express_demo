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
exports.checkRole = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const passport_1 = __importDefault(require("passport"));
const http_errors_1 = __importDefault(require("http-errors"));
const passport_jwt_1 = require("passport-jwt");
const passport_jwt_2 = require("passport-jwt");
const passport_local_1 = require("passport-local");
const user_model_1 = require("../models/user.model");
const config_1 = require("../config");
//check login and give token to user
passport_1.default.use("local", new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
    session: false,
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.userModel.findOne({ email });
        if (!user)
            throw http_errors_1.default.Unauthorized("Invalid email");
        const validatePassword = yield user.comparePassword(password);
        if (!validatePassword)
            throw http_errors_1.default.Unauthorized("Invalid");
        const payload = { _id: user._id, role: user.role };
        const token = (0, jsonwebtoken_1.sign)(payload, config_1.APP_CONFIG.JWT_SECRETS, {
            expiresIn: "7d",
        });
        done(null, { token });
    }
    catch (error) {
        done(error);
    }
})));
// verify a token
passport_1.default.use("jwt", new passport_jwt_2.Strategy({
    secretOrKey: config_1.APP_CONFIG.JWT_SECRETS,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
}, (token, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = token;
        const user = yield user_model_1.userModel.findById(_id).lean();
        if (!user)
            throw http_errors_1.default.Unauthorized("Invalid user");
        return done(null, user);
    }
    catch (error) {
        done(error);
    }
})));
//check role
// export function hasRole(roles: string[]) {
//   return function (req: Request, res: Response, next: NextFunction) {
//     if (roles.includes((req.user as IUser)?.role)) {
//       return next();
//     } else {
//       return next(new Error("You don't have sufficient access to this route."));
//     }
//   };
// }
const checkRole = (roles) => (req, res, next) => {
    if (roles.includes(req.user.role)) {
        return next();
    }
    else {
        return next(new Error("You don't have sufficient access to this route."));
    }
};
exports.checkRole = checkRole;
