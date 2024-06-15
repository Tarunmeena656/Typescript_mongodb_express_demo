"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainErrorHandler = exports.notFoundHandler = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const express_validation_1 = require("express-validation");
function getResponseMessage(err) {
    var _a, _b, _c, _d, _e, _f;
    let message;
    if ((_a = err.details) === null || _a === void 0 ? void 0 : _a.body)
        return (message = (_b = err.details) === null || _b === void 0 ? void 0 : _b.body[0].message);
    if ((_c = err.details) === null || _c === void 0 ? void 0 : _c.params)
        return (message = (_d = err.details) === null || _d === void 0 ? void 0 : _d.params[0].message);
    if ((_e = err.details) === null || _e === void 0 ? void 0 : _e.query)
        return (message = (_f = err.details) === null || _f === void 0 ? void 0 : _f.query[0].message);
}
const notFoundHandler = (req, res, next) => {
    return next(http_errors_1.default.NotFound("Resource not found"));
};
exports.notFoundHandler = notFoundHandler;
const mainErrorHandler = (err, req, res, next) => {
    if (err instanceof express_validation_1.ValidationError) {
        res.status(err.statusCode).send(`MESSAGE: ${getResponseMessage(err)}`);
    }
    else {
        const status = err.status || 500;
        const message = err.message || "Something went wrong ";
        res.status(status).send(`MESSAGE: ${message}`);
    }
};
exports.mainErrorHandler = mainErrorHandler;
