"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_CONFIG = void 0;
const dotenv_1 = require("dotenv");
const envalid_1 = require("envalid");
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV}` || ".env.development" });
exports.APP_CONFIG = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.num)({ devDefault: 3000, desc: "PORT number missing " }),
    DB_URL: (0, envalid_1.url)({ desc: " Database url missing" }),
    SALT_ROUNDS: (0, envalid_1.num)({ desc: "Salt round missing " }),
    JWT_SECRETS: (0, envalid_1.str)({ desc: "JWT secrets value missing" }),
});
