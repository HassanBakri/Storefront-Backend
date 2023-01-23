"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hassanconfig_1 = __importDefault(require("../hassanconfig"));
const store = new user_1.UserStore();
const index = async (_req, res) => {
    const Users = await store.index();
    res.json(Users);
};
const show = async (_req, res) => {
    const User = await store.show(_req.body.id);
    res.json(User);
};
const auth = async (_req, res) => {
    const User = await store.authenticate(_req.body.username, _req.body.password);
    const token = jsonwebtoken_1.default.sign({ User: User }, hassanconfig_1.default.JWTSECRIT);
    res.json(token);
};
const create = async (_req, res) => {
    try {
        console.log('Request Body\t' + _req.body + '\t' + _req.body.username);
        const User = {
            id: 0,
            FirstName: _req.body.firstname,
            LastName: _req.body.lastname,
            UserName: _req.body.username,
            Email: _req.body.email,
            PhoneNumber: _req.body.phnenumber,
            Password: _req.body.password,
        };
        const newUser = await store.create(User);
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
    try {
        console.log('Request Body\t' + _req.body + '\t' + _req.body.username);
        const User = {
            id: _req.body.id,
            FirstName: _req.body.firstname,
            LastName: _req.body.lastname,
            UserName: _req.body.username,
            Email: _req.body.email,
            PhoneNumber: _req.body.phnenumber,
            Password: _req.body.password,
        };
        const updatedUser = await store.Update(User);
        //const token = jwt.sign({ User: updatedUser }, config.JWTSECRIT as string);
        res.json(updatedUser);
    }
    catch (err) {
        console.log(err);
        res.status(400);
        res.json(err);
    }
};
const destroy = async (_req, res) => {
    const deleted = await store.delete(_req.body.id);
    res.json(deleted);
};
const UserRoutes = (app) => {
    app.get('/users', index);
    app.get('/users/{:id}', show);
    app.post('/users/auth', auth);
    app.post('/users', create);
    app.put('/users', update);
    app.delete('/users', destroy);
};
exports.default = UserRoutes;
