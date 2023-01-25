"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// psql -h localhost -U shopping_user -d shopping
//import dotenv from 'dotenv'
var pg_1 = require("pg");
var hassanconfig_1 = __importDefault(require("./hassanconfig"));
//dotenv.config()
// const {
//   POSTGRES_HOST,
//   POSTGRES_DB,
//   POSTGRES_USER,
//   POSTGRES_PASSWORD } = process.env
var client = new pg_1.Pool({
    host: hassanconfig_1["default"].POSTGRES_HOST,
    database: hassanconfig_1["default"].POSTGRES_DB,
    user: hassanconfig_1["default"].POSTGRES_USER,
    password: hassanconfig_1["default"].POSTGRES_PASSWORD
});
exports["default"] = client;
