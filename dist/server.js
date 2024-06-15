"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Import Utilities
 */
const index_1 = require("./config/index");
const connection_1 = __importDefault(require("./utils/connection"));
const port = index_1.APP_CONFIG.PORT;
const http_1 = require("http");
const app_1 = __importDefault(require("./app/app"));
const server = (0, http_1.createServer)(app_1.default);
(0, connection_1.default)()
    .then(() => {
    server.listen(port, () => {
        console.log("===============================================");
        console.log(`🚀 Server is running on http://localhost:${port} 🚀`);
        console.log("===============================================");
    });
})
    .catch((error) => {
    console.log(error);
});
