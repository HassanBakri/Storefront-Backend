"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hassanconfig_1 = __importDefault(require("../hassanconfig"));
const store = new user_1.UserStore();
//const r=express.Router();
const index = async (_req, res) => {
    const Users = await store.index().catch((err) => {
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
    res.json(Users);
};
const show = async (_req, res) => {
    if (!parseInt(_req.params.id)) {
        res.status(400);
        res.json({ status: ' improper request ' });
        return;
    }
    const User = await store.show(parseInt(_req.params.id)).catch((err) => {
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
    res.json(User);
};
const auth = async (_req, res) => {
    if (!_req.body.username || !_req.body.password) {
        res.status(400);
        res.json({ status: ' improper request ' });
        return;
    }
    const User = await store.authenticate(_req.body.username, _req.body.password).catch((err) => {
        console.log(`Error in ${__filename} in ${auth.name} Endpoint`);
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
    if (res.headersSent)
        return;
    if (User) {
        const token = jsonwebtoken_1.default.sign({ User: User }, hassanconfig_1.default.JWTSECRIT);
        res.json(token);
    }
    else {
        res.status(400);
        res.json({ status: ' invalid username/password' });
    }
};
const create = async (_req, res) => {
    if (!_req.body.firstname || !_req.body.lastname || !_req.body.username || !_req.body.email || !_req.body.phonenumber || !_req.body.password) {
        res.status(400);
        res.json({ status: ' improper request ' });
        return;
    }
    console.log('Request Body\t' + _req.body + '\t' + _req.body.username);
    const User = {
        id: 0,
        FirstName: _req.body.firstname,
        LastName: _req.body.lastname,
        UserName: _req.body.username,
        Email: _req.body.email,
        PhoneNumber: _req.body.phonenumber,
        Password: _req.body.password,
    };
    const newUser = await store.create(User).catch((err) => {
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
    try {
        if (res.headersSent)
            return;
        const token = jsonwebtoken_1.default.sign({ User: newUser }, hassanconfig_1.default.JWTSECRIT);
        res.json(token);
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
};
const update = async (_req, res) => {
    if (!_req.body.id || !_req.body.firstname || !_req.body.lastname || !_req.body.username || !_req.body.email || !_req.body.phonenumber || !_req.body.password) {
        res.status(400);
        res.json({ status: ' improper request ' });
        return;
    }
    console.log('Request Body\t' + _req.body + '\t' + _req.body.username);
    const User = {
        id: _req.body.id,
        FirstName: _req.body.firstname,
        LastName: _req.body.lastname,
        UserName: _req.body.username,
        Email: _req.body.email,
        PhoneNumber: _req.body.phonenumber,
        Password: _req.body.password,
    };
    const updatedUser = await store.Update(User).catch((err) => {
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
    res.json(updatedUser);
};
const destroy = async (_req, res) => {
    if (!parseInt(_req.params.id)) {
        res.status(400);
        res.json({ status: ' improper request ' });
        return;
    }
    const deleted = await store.delete(_req.params.id).catch((err) => {
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
const UserRoutes = (0, express_1.Router)();
const Routes = (app) => {
    UserRoutes.route('/users').get(index);
    UserRoutes.route('/users/:id').get(show);
    UserRoutes.route('/users/auth').post(auth);
    UserRoutes.route('/users').post(create);
    UserRoutes.route('/users').put(auth, update);
    UserRoutes.route('/users/:id').delete(auth, destroy);
    app.use(UserRoutes);
};
exports.default = Routes;
