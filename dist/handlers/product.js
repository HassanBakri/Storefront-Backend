"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    const Users = await store.index();
    res.json(Users);
};
const show = async (_req, res) => {
    const User = await store.show(_req.body.id);
    res.json(User);
};
const destroy = async (_req, res) => {
    const deleted = await store.delete(_req.body.id);
    res.json(deleted);
};
const create = async (_req, res) => {
    const Id = 0;
    const Name = _req.body.name;
    const Description = _req.body.description;
    const Price = _req.body.price;
    const CreateTime = new Date();
    const CreatedBy = 0;
    const CategoryId = _req.body.categoryId;
    const Available_Items = _req.body.available_Items;
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
    const np = store.Create(p);
    res.send(np);
};
const update = async (_req, res) => {
    const Id = _req.body.id;
    const Name = _req.body.name;
    const Description = _req.body.description;
    const Price = _req.body.price;
    const CreateTime = new Date();
    const CreatedBy = 0;
    const CategoryId = _req.body.categoryId;
    const Available_Items = _req.body.available_Items;
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
    const np = store.Create(p);
    res.send(np);
};
const Routes = (app) => {
    app.get('/product', index);
    app.get('/product/{:id}', show);
    app.post('/product', create);
    app.put('/product', update);
    app.delete('/product', destroy);
};
exports.default = Routes;
