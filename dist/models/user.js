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
            const sql = 'SELECT id,FirstName, LastName,UserName,Email,PhoneNumber,CreateDate FROM Users';
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
            const sql = 'SELECT * FROM Users WHERE id=$1 ;';
            // @ts-ignore
            const conn = await database_1.default.connect();
            console.log('show User ID', id);
            const result = await conn.query(sql, [id]);
            conn.release();
            console.log('user after show', result.rows[0]);
            if (result.rows[0] == undefined)
                return undefined;
            const u = {
                id: result.rows[0].id,
                FirstName: result.rows[0].firstname,
                LastName: result.rows[0].lastname,
                UserName: result.rows[0].username,
                Password: 'dd',
                Email: result.rows[0].email,
                PhoneNumber: result.rows[0].phonenumber,
            };
            console.log("Show User return value ", u);
            return u;
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
            console.log(salt + '\t' + pepper + '\t' + saltRounds, u.FirstName, u.LastName, u.Email, u.UserName);
            u.Password = bcrypt_1.default.hashSync(u.Password + pepper, salt);
            const sql = 'INSERT INTO Users (FirstName, LastName,UserName,Email,PhoneNumber,Password) VALUES($1, $2, $3, $4,$5,$6) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            //console.log(conn)
            const result = await conn.query(sql, [u.FirstName, u.LastName, u.UserName, u.Email, u.PhoneNumber, u.Password]);
            //const newuser = result.rows[0];
            conn.release();
            console.log(u.FirstName, u.LastName, u.UserName, u.Email, u.PhoneNumber, u.Password);
            const uy = {
                id: result.rows[0].id,
                FirstName: result.rows[0].firstname,
                LastName: result.rows[0].lastname,
                UserName: result.rows[0].username,
                Password: 'dd',
                Email: result.rows[0].email,
                PhoneNumber: result.rows[0].phonenumber,
            };
            return uy;
        }
        catch (err) {
            throw new Error(`Could not add new User ${u.Email}. Error: ${err}`);
        }
    }
    async setPassword(id, password) {
        try {
            const pepper = process.env.BCRYPT_PASSWORD;
            const saltRounds = parseInt(process.env.SALT_ROUNDS);
            const salt = bcrypt_1.default.genSaltSync(saltRounds);
            console.log(salt + '\t' + pepper + '\t' + saltRounds);
            const Password = bcrypt_1.default.hashSync(password + pepper, salt);
            const sql = 'update users set password=$1 where id=$2';
            const conn = await database_1.default.connect();
            await conn.query(sql, [Password, id]);
        }
        catch (error) {
            throw new Error(`Could not Update user ${id}. password: ${error}`);
        }
        return;
    }
    async Update(u) {
        try {
            console.log('brfore update ', u.id, u.FirstName, u.LastName, u.UserName, u.Email, u.PhoneNumber);
            const sql = 'Update Users set FirstName = $1, LastName= $2,UserName=$3,Email=$4,PhoneNumber=$5 where id=$6  ;';
            // @ts-ignore
            const conn = await database_1.default.connect();
            await conn.query(sql, [u.FirstName, u.LastName, u.UserName, u.Email, u.PhoneNumber, u.id]);
            // const sql1 = 'SELECT id,FirstName, LastName,UserName,Email,PhoneNumber,CreateDate FROM Users WHERE id=$1';
            // const resultq = await conn.query(sql1, [u.id]);
            conn.release();
            const user = (await this.show(u.id));
            console.log('after update ', user.FirstName, user.LastName, user.UserName, user.Email, user.PhoneNumber);
            return user;
        }
        catch (err) {
            console.log("error stack", err);
            throw new Error(`Could not Update user ${u.Email}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM Users WHERE id=$1;';
            // @ts-ignore
            const conn = await database_1.default.connect();
            await conn.query(sql, [id]);
            conn.release();
            return;
        }
        catch (err) {
            throw new Error(`Could not delete User ${id}. Error: ${err}`);
        }
    }
    //bcrypt.compareSync(password+pepper, user.password)
    async authenticate(username, password) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM users WHERE username=$1 ;';
        const pepper = process.env.BCRYPT_PASSWORD;
        //const saltRounds: number = parseInt(process.env.BCRYPT_PASSWORD as string);
        const result = await conn.query(sql, [username]);
        console.log(username, password + '\t' + pepper + '\t' + result.rows.length);
        if (result.rows.length) {
            const user = {
                id: result.rows[0].id,
                FirstName: result.rows[0].firstname,
                LastName: result.rows[0].lastname,
                UserName: result.rows[0].username,
                Password: result.rows[0].password,
                Email: result.rows[0].email,
                PhoneNumber: result.rows[0].phonenumber,
            };
            console.log(result.rows[0], user.Email, user.id, user.Password, user.FirstName);
            if (bcrypt_1.default.compareSync(password + pepper, user.Password)) {
                return user;
            }
        }
        return null;
    }
}
exports.UserStore = UserStore;
