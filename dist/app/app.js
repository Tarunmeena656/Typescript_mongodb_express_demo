"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Import Modules
 */
const hpp_1 = __importDefault(require("hpp"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
/**
 * Import Utilities
 */
const index_route_1 = __importDefault(require("../routes/index.route"));
const error_middleware_1 = require("../middlewares/error.middleware");
require("../middlewares/auth.middleware");
(0, dotenv_1.config)();
/*Middleware */
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, hpp_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(passport.initialize());
app.use(index_route_1.default);
app.use(error_middleware_1.notFoundHandler);
app.use(error_middleware_1.mainErrorHandler);
exports.default = app;
