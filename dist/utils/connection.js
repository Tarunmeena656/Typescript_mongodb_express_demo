"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const index_1 = require("../config/index");
function connectDatabase() {
    return (0, mongoose_1.connect)(index_1.APP_CONFIG.DB_URL);
}
mongoose_1.connection.on("connected", () => {
    console.log("💥 Database connected successfully... 💥");
});
mongoose_1.connection.on('error', () => {
    console.log(" Database connection failed..😡 ");
});
exports.default = connectDatabase;
