"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM Users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get Users. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM Users WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find User ${id}. Error: ${err}`);
        }
    }
    async create(u) {
        try {
            const pepper = process.env.BCRYPT_PASSWORD;
            const saltRounds = parseInt(process.env.SALT_ROUNDS);
            const salt = bcrypt_1.default.genSaltSync(saltRounds);
            console.log(salt + '\t' + pepper + '\t' + saltRounds);
            u.Password = bcrypt_1.default.hashSync(u.Password + pepper, salt);
            const sql = 'INSERT INTO Users (FirstName, LastName,UserName,Email,PhoneNumber,Password) VALUES($1, $2, $3, $4,$5,$6) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [u.FirstName, u.LastName, u.UserName, u.Email, u.PhoneNumber, u.Password]);
            const book = result.rows[0];
            conn.release();
            console.log(u.FirstName, u.LastName, u.UserName, u.Email, u.PhoneNumber, u.Password);
            return book;
        }
        catch (err) {
            throw new Error(`Could not add new book ${u.Email}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM Users WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const book = result.rows[0];
            conn.release();
            return book;
        }
        catch (err) {
            throw new Error(`Could not delete User ${id}. Error: ${err}`);
        }
    }
    //bcrypt.compareSync(password+pepper, user.password_digest)
    async authenticate(username, password) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT password_digest FROM users WHERE username=($1)';
        const pepper = process.env.BCRYPT_PASSWORD;
        //const saltRounds: number = parseInt(process.env.BCRYPT_PASSWORD as string);
        const result = await conn.query(sql, [username]);
        console.log(password + pepper);
        if (result.rows.length) {
            const user = result.rows[0];
            console.log(user);
            if (bcrypt_1.default.compareSync(password + pepper, user.Password)) {
                return user;
            }
        }
        return null;
    }
}
exports.UserStore = UserStore;
