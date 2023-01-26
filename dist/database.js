"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const hassanconfig_1 = __importDefault(require("./hassanconfig"));
/**
 * // psql -h localhost -U shopping_user -d shopping
// psql -h localhost -d full_stack_dev -d full_stack_user
//import dotenv from 'dotenv'
 */
let client;
console.log('con.ENV value', hassanconfig_1.default.ENV, hassanconfig_1.default.ENV == 'test');
console.log('con.ENV value', hassanconfig_1.default.ENV + '' === 'test');
console.log('con.ENV value', hassanconfig_1.default.ENV.valueOf() === 'test');
if (true) { //(con.ENV as string) === 'test'
    client = new pg_1.Pool({
        host: hassanconfig_1.default.POSTGRES_HOST,
        database: hassanconfig_1.default.POSTGRES_TEST_DB,
        user: hassanconfig_1.default.POSTGRES_USER,
        password: hassanconfig_1.default.POSTGRES_PASSWORD,
    });
    //console.log("client :"+client)
}
if (hassanconfig_1.default.ENV === 'dev') {
    client = new pg_1.Pool({
        host: hassanconfig_1.default.POSTGRES_HOST,
        database: hassanconfig_1.default.POSTGRES_DB,
        user: hassanconfig_1.default.POSTGRES_USER,
        password: hassanconfig_1.default.POSTGRES_PASSWORD,
    });
}
//@ts-ignore
exports.default = client;
