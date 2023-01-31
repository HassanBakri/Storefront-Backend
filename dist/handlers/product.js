"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../models/product");
const Autherization_1 = __importDefault(require("../middleware/Autherization"));
const hassanconfig_1 = __importDefault(require("../hassanconfig"));
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    const p = await store.index().catch((err) => {
        console.log(`Error in ${__filename} in ${index.name} Endpoint`);
        console.log(err.message);
        res.status(500);
        if (hassanconfig_1.default.ENV?.trim() === 'dev' || hassanconfig_1.default.ENV?.trim() === 'test') {
            res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
            return;
        }
        else {
            res.json({ status: 'faild' });
            return;
        }
    });
    res.json(p);
};
const show = async (_req, res) => {
    if (!parseInt(_req.params.id)) {
        res.status(400);
        res.json({ status: ' improper request ' });
        return;
    }
    const p = await store.show(parseInt(_req.params.id)).catch((err) => {
        console.log(`Error in ${__filename} in ${show.name} Endpoint`);
        console.log(err.message);
        res.status(500);
        if (hassanconfig_1.default.ENV?.trim() === 'dev' || hassanconfig_1.default.ENV?.trim() === 'test') {
            res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
            return;
        }
        else {
            res.json({ status: 'faild' });
            return;
        }
    });
    res.json(p);
};
const destroy = async (_req, res) => {
    if (!parseInt(_req.params.id)) {
        res.status(400);
        res.json({ status: ' improper request ' });
        return;
    }
    const deleted = await store.delete(parseInt(_req.params.id)).catch((err) => {
        console.log(`Error in ${__filename} in ${destroy.name} Endpoint`);
        console.log(err.message);
        res.status(500);
        if (hassanconfig_1.default.ENV?.trim() === 'dev' || hassanconfig_1.default.ENV?.trim() === 'test') {
            res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
            return;
        }
        else {
            res.json({ status: 'faild' });
            return;
        }
    });
    res.json(deleted);
};
const create = async (_req, res) => {
    const Id = 0;
    const Name = _req.body.name;
    const Description = _req.body.description;
    const Price = _req.body.price;
    const CreateTime = new Date();
    const CreatedBy = _req.currentUser.id;
    const CategoryId = _req.body.categoryId;
    const Available_Items = _req.body.available_Items;
    console.log("req body", _req.body);
    console.log(!Name, !Description, isNaN(Price), isNaN(CategoryId), !Available_Items, !Price, !CategoryId);
    if (!Name || !Description || isNaN(Price) || isNaN(CategoryId) || !Available_Items || !Price || !CategoryId) {
        res.status(400);
        res.json({ status: ' improper request ' });
        return;
    }
    const p = {
        Id: Id,
        Name: Name,
        Description: Description,
        Price: Price,
        CreateTime: CreateTime,
        CreatedBy: CreatedBy,
        CategoryId: CategoryId,
        Available_Items: Available_Items,
    };
    const np = await store.Create(p).catch((err) => {
        console.log(`Error in ${__filename} in ${create.name} Endpoint`);
        console.log(err.message);
        res.status(500);
        if (hassanconfig_1.default.ENV?.trim() === 'dev' || hassanconfig_1.default.ENV?.trim() === 'test') {
            res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
            return;
        }
        else {
            res.json({ status: 'faild' });
            return;
        }
    });
    res.json(np);
};
const update = async (_req, res) => {
    const Id = _req.body.id;
    const Name = _req.body.name;
    const Description = _req.body.description;
    const Price = _req.body.price;
    const CreateTime = new Date();
    const CreatedBy = _req.currentUser.id;
    const CategoryId = _req.body.categoryId;
    const Available_Items = _req.body.available_Items;
    if (!Name || !Description || isNaN(Price) || isNaN(Id) || isNaN(CategoryId) || !Available_Items || !Price || !Id || !CategoryId) {
        res.status(400);
        res.json({ status: ' improper request ' });
        return;
    }
    const p = {
        Id: Id,
        Name: Name,
        Description: Description,
        Price: Price,
        CreateTime: CreateTime,
        CreatedBy: CreatedBy,
        CategoryId: CategoryId,
        Available_Items: Available_Items,
    };
    const np = await store.Update(p).catch((err) => {
        console.log(`Error in ${__filename} in ${update.name} Endpoint`);
        console.log(err.message);
        res.status(500);
        if (hassanconfig_1.default.ENV?.trim() === 'dev' || hassanconfig_1.default.ENV?.trim() === 'test') {
            res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
            return;
        }
        else {
            res.json({ status: 'faild' });
            return;
        }
    });
    res.json(np);
};
const ProductRoutes = (0, express_1.Router)();
const Routes = (app) => {
    ProductRoutes.route('/product').get(index);
    ProductRoutes.route('/product/:id').get(show);
    ProductRoutes.route('/product').post(Autherization_1.default, create);
    ProductRoutes.route('/product').put(Autherization_1.default, update);
    ProductRoutes.route('/product/:id').delete(Autherization_1.default, destroy);
    app.use(ProductRoutes);
};
exports.default = Routes;
