"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
module.exports = {
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_TEST_DB: process.env.POSTGRES_TEST_DB,
    BCRYPT_PASSWORD: process.env.BCRYPT_PASSWORD,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    JWTSECRIT: process.env.JWTSECRIT,
    endpoint: process.env.API_URL,
    masterKey: process.env.API_KEY,
    port: process.env.PORT,
};
