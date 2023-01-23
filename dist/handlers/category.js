"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = require("../models/Category");
const store = new Category_1.Categorytore();
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
    const name = _req.body.Name;
    const description = _req.body.Description;
    const icon = _req.body.icon;
    const c = {
        Id: 0,
        Name: name,
        Description: description,
        CreateTime: new Date(),
        icon: icon,
        CreatedBy: 0,
    };
    const nc = await store.Create(c);
    res.json(nc);
};
const update = async (_req, res) => {
    const id = _req.body.id;
    const name = _req.body.Name;
    const description = _req.body.Description;
    const date = _req.body.date;
    const icon = _req.body.icon;
    const c = {
        Id: id,
        Name: name,
        Description: description,
        CreateTime: new Date(Date.parse(date)),
        icon: icon,
        CreatedBy: 0,
    };
    const nc = await store.Update(c);
    res.json(nc);
};
const Routes = (app) => {
    app.get('/category', index);
    app.get('/category/{:id}', show);
    app.post('/category', create);
    app.put('/category', update);
    app.delete('/category', destroy);
};
exports.default = Routes;
