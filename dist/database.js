"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// psql -h localhost -U full_stack_user -d full_stack_dev
//import dotenv from 'dotenv'
const pg_1 = require("pg");
const hassanconfig_1 = __importDefault(require("./hassanconfig"));
//dotenv.config()
// const {
//   POSTGRES_HOST,
//   POSTGRES_DB,
//   POSTGRES_USER,
//   POSTGRES_PASSWORD } = process.env
const client = new pg_1.Pool({
    host: hassanconfig_1.default.POSTGRES_HOST,
    database: hassanconfig_1.default.POSTGRES_DB,
    user: hassanconfig_1.default.POSTGRES_USER,
    password: hassanconfig_1.default.POSTGRES_PASSWORD,
});
exports.default = client;
