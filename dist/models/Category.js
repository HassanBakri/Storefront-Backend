"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categorytore = void 0;
const database_1 = __importDefault(require("../database"));
class Categorytore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM Category';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get Category. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM Category WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find Category ${id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM Category WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const book = result.rows[0];
            conn.release();
            return book;
        }
        catch (err) {
            throw new Error(`Could not delete Category ${id}. Error: ${err}`);
        }
    }
    async Create(c) {
        try {
            const sql = 'insert into Category (Name, Description,icon,CreatedBy) values ($1,$2,$3,$4)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [c.Name, c.Description, c.icon, c.CreatedBy]);
            c = result.rows[0];
            conn.release();
            return c;
        }
        catch (error) {
            throw new Error(`Could not add new Category ${c.Name}. Error: ${error}`);
        }
    }
    async Update(c) {
        try {
            const sql = 'Update Category set Name=$1, Description=$2,icon=$3 where id= $4';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [c.Name, c.Description, c.icon, c.Id]);
            c = result.rows[0];
            conn.release();
            return c;
        }
        catch (error) {
            throw new Error(`Could not Update Category ${c.Name}. Error: ${error}`);
        }
    }
}
exports.Categorytore = Categorytore;
