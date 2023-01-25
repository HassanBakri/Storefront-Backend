"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM Product';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get Product. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM Product WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find Product ${id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM Product WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const book = result.rows[0];
            conn.release();
            return book;
        }
        catch (err) {
            throw new Error(`Could not delete Product ${id}. Error: ${err}`);
        }
    }
    async Create(p) {
        try {
            const sql = 'insert into Product (Name, Description,Price,Available_Items,CreatedBy,CategoryId) values ($1,$2,$3,$4,$5,$6)   RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [p.Name, p.Description, p.Price, p.Available_Items, p.CreatedBy, p.CategoryId]);
            p = result.rows[0];
            conn.release();
            return p;
        }
        catch (error) {
            throw new Error(`Could not add new Product ${p.Name}. Error: ${error}`);
        }
    }
    async Update(p) {
        try {
            const sql = 'Update Product set Name=$1 , Description = $2 ,Price = $3, Available_Items = $4 ,CreatedBy = $5,CategoryId=$6 where Id=$7   RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [p.Name, p.Description, p.Price, p.Available_Items, p.CreatedBy, p.CategoryId, p.Id]);
            p = result.rows[0];
            conn.release();
            return p;
        }
        catch (error) {
            throw new Error(`Could not Update Product ${p.Name}. Error: ${error}`);
        }
    }
}
exports.ProductStore = ProductStore;
