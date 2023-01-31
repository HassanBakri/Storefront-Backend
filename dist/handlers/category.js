"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Category_1 = require("../models/Category");
const Autherization_1 = __importDefault(require("../middleware/Autherization"));
const hassanconfig_1 = __importDefault(require("../hassanconfig"));
const store = new Category_1.Categorytore();
const index = async (_req, res) => {
    const categories = await store.index().catch((err) => {
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
    res.json(categories);
};
const show = async (_req, res) => {
    if (!parseInt(_req.params.id)) {
        res.status(400);
        res.json({ status: ' improper request ' });
        return;
    }
    const category = await store.show(parseInt(_req.params.id)).catch((err) => {
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
    res.json(category);
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
async function create(_req, res) {
    const name = _req.body.name;
    const description = _req.body.description;
    const icon = _req.body.icon;
    console.log('this is create category', name, description, icon);
    if (!name || !description || !icon) {
        res.status(400);
        res.json({ status: ' improper request ' });
        return;
    }
    const c = {
        Id: 0,
        Name: name,
        Description: description,
        CreateTime: new Date(),
        icon: icon,
        CreatedBy: _req.currentUser.id,
    };
    const nc = await store.Create(c).catch((err) => {
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
    res.json(nc);
}
const update = async (_req, res) => {
    const id = _req.body.id;
    const name = _req.body.name;
    const description = _req.body.description;
    const date = _req.body.date;
    const icon = _req.body.icon;
    console.log(!name, !description, !icon, !id);
    if (!name || !description || !icon || !id) {
        res.status(400);
        res.json({ status: ' improper request ' });
        return;
    }
    const c = {
        Id: id,
        Name: name,
        Description: description,
        CreateTime: new Date(Date.parse(date)),
        icon: icon,
        CreatedBy: 0,
    };
    const nc = await store.Update(c).catch((err) => {
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
    res.json(nc);
};
const CategoryRoutes = (0, express_1.Router)();
const Routes = (app) => {
    CategoryRoutes.route('/category').get(index);
    CategoryRoutes.route('/category/:id').get(show);
    CategoryRoutes.route('/category').put(update);
    CategoryRoutes.route('/category/:id').delete(destroy);
    CategoryRoutes.route('/category').post(Autherization_1.default, create);
    app.use(CategoryRoutes);
};
exports.default = Routes;
